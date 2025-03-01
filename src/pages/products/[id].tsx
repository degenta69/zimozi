import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductPage from "@/components/product/ProductDetails";
import { getAllProducts, getProductById } from "@/client-api-service/product.service";
import { Product } from "@/models/Product";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  // const [nextCursor, setNextCursor] = useState();
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchProduct(id: string) {
      try {
        const response = await getProductById(id);
        console.log(response);
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
      try {
        const allProducts = await getAllProducts(undefined, product.category);
        // const selectedProduct = allProducts.find((p: { id: number }) => p.id === Number(id));
        setRelatedProducts(allProducts.products);
        // setNextCursor(allProducts.nextCursor);
        console.log(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    if (product) fetchRelatedProduct(product);
  }, [product]);

  if (loading) return <p>Loading...</p>;
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
              <div
                key={item.uid}
                onClick={() => nav(`/products/${item.uid}`)}
                className="border p-4 rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h4 className="mt-2 font-semibold text-gray-800">{item.title}</h4>
                <p className="text-sm text-gray-600">${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
