import ProductCard from "@/components/product/ProductCard";

interface ProductListProps {
  products: any[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.uid} product={product} />)
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
