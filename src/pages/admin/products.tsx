import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "@/client-api-service/product.service";
import { Product } from "@/models/Product";
import Header from "@/components/ui/Header";
import Filters from "@/components/ui/Filters";
// import ProductList from "@/components/ProductList";
import LoadMoreButton from "@/components/ui/LoadMoreButton";
// import { Dialog } from "@headlessui/react";
import ProductForm from "@/components/product/ProductForm";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import ProductCard from "@/components/product/ProductCard";

const categories = ["All", "electronics", "men's clothing", "women's clothing", "jewelery"];
const priceRanges = [
  { label: "All", min: undefined, max: undefined },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $500", min: 100, max: 500 },
];

export default function AdminProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [nextCursor, setNextCursor] = useState<undefined | string>(undefined);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState(priceRanges[0]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const { products } = await getAllProducts(
        undefined,
        selectedCategory !== "All" ? selectedCategory : undefined,
        selectedPrice.min,
        selectedPrice.max
      );
      setProducts(products);
      setNextCursor(products.length > 0 ? products[products.length - 1].uid : null);
    };
    fetchProducts();
  }, [selectedCategory, selectedPrice]);

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product.uid !== id));
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  return (
    <>
      <Header title="Admin - Product List" />
      <main className="container mx-auto py-8 px-4 relative">
        <Filters
          categories={categories}
          priceRanges={priceRanges}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
        />

        <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.uid} className="relative group">
              <div className="absolute top-2 right-2 hidden group-hover:flex items-center gap-2">
                <button
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  onClick={() => handleDelete(product.uid)}
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="cursor-pointer">
                <ProductCard product={product} onClick={() => handleEdit(product)} />
              </div>
            </div>
          ))}
        </div>

        <LoadMoreButton
          nextCursor={nextCursor}
          setNextCursor={setNextCursor}
          setProducts={setProducts}
          selectedCategory={selectedCategory}
          selectedPrice={selectedPrice}
        />

        {/* Floating Action Button (FAB) for Adding Product */}
        <button
          className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
          onClick={() => {
            setSelectedProduct(null);
            setIsFormOpen(true);
          }}
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </main>

      {/* Product Form Popup */}
      {/* <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4"> */}
      {/* <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"> */}
      <ProductForm
        existingProduct={selectedProduct}
        onClose={() => setIsFormOpen(false)}
        isOpen={isFormOpen}
        onSuccess={(updatedProduct) => {
          setProducts((prev) =>
            prev.map((p) => (p.uid === updatedProduct.uid ? updatedProduct : p))
          );
        }}
      />
      {/* </Dialog.Panel> */}
      {/* </div>
      </Dialog> */}
    </>
  );
}
