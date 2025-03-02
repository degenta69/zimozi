import { getAllProducts } from "@/client-api-service/product.service";
import { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import Filters from "@/components/ui/Filters";
import ProductList from "@/components/product/ProductList";
import LoadMoreButton from "@/components/ui/LoadMoreButton";
import { Product } from "@/models/Product";
import { useLoading } from "@/context/LodingContext";

const categories = ["All", "electronics", "men's clothing", "women's clothing", "jewelery"];
const priceRanges = [
  { label: "All", min: undefined, max: undefined },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $500", min: 100, max: 500 },
];

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [nextCursor, setNextCursor] = useState<undefined | string>(undefined);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState(priceRanges[0]);
  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { products } = await getAllProducts(
          undefined,
          selectedCategory !== "All" ? selectedCategory : undefined,
          selectedPrice.min,
          selectedPrice.max
        );
        setProducts(products);
        setNextCursor(products.length > 0 ? products[products.length - 1].uid : null);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, selectedPrice]);

  return (
    <>
      <Header title="Dashboard" />
      <main className="container mx-auto py-8 px-4">
        <Filters
          categories={categories}
          priceRanges={priceRanges}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
        />
        <ProductList products={products} />
        <LoadMoreButton
          nextCursor={nextCursor}
          setNextCursor={setNextCursor}
          setProducts={setProducts}
          selectedCategory={selectedCategory}
          selectedPrice={selectedPrice}
        />
      </main>
    </>
  );
}
