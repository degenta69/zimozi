import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLoading } from "@/context/LodingContext";
import ProductPage from "@/components/product/ProductDetails";
import { getAllProducts, getProductById } from "@/client-api-service/product.service";
import { Product } from "@/models/Product";
import ProductCard from "@/components/product/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { setLoading } = useLoading();
  const nav = useNavigate();

  useEffect(() => {
    async function fetchProduct(id: string) {
      setLoading(true);
      try {
        const response = await getProductById(id);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct(id);
    } else nav(-1);
  }, [id]);

  useEffect(() => {
    async function fetchRelatedProduct(product: Product) {
      setLoading(true);
      try {
        const allProducts = await getAllProducts(undefined, product.category);
        setRelatedProducts(allProducts.products);
        console.log(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    if (product) fetchRelatedProduct(product);
  }, [product]);

  if (!product) return <p>Product not found</p>;

  return (
    <>
      <ProductPage key={1} product={product} />

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-12 px-4">
          <h3 className="text-xl font-semibold text-gray-900">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.uid} product={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
