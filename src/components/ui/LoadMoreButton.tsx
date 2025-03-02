import { getAllProducts } from "@/client-api-service/product.service";
import { useLoading } from "@/context/LodingContext";

interface LoadMoreProps {
  nextCursor?: string | null;
  setNextCursor: React.Dispatch<React.SetStateAction<undefined | string>>;
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
  selectedCategory: string;
  selectedPrice: { label: string; min?: number; max?: number };
}

export default function LoadMoreButton({
  nextCursor,
  setNextCursor,
  setProducts,
  selectedCategory,
  selectedPrice,
}: LoadMoreProps) {
  const { loading, setLoading } = useLoading();

  if (!nextCursor) return null;

  return (
    <div className="flex justify-center mt-8">
      <button
        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
        onClick={async () => {
          setLoading(true);
          try {
            const { products: moreProducts } = await getAllProducts(
              nextCursor,
              selectedCategory !== "All" ? selectedCategory : undefined,
              selectedPrice.min,
              selectedPrice.max
            );
            setProducts((prev: any[]) => [...prev, ...moreProducts]);
            setNextCursor(
              moreProducts.length > 0 ? moreProducts[moreProducts.length - 1].uid : null
            );
          } finally {
            setLoading(false);
          }
        }}
        disabled={loading}
      >
        Load More
      </button>
    </div>
  );
}
