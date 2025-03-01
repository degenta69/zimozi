import { useState } from "react";
import axios from "axios";
import { Product } from "@/models/Product";
// import ProductList from "./list";
import ProductCard from "@/components/product/ProductCard";

const SeedProducts = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const fetchAndSeedProducts = async () => {
    setLoading(true);
    setMessage("");

    try {
      // Step 1: Fetch data from FakeStoreAPI
      const { data: products } = await axios.get("https://fakestoreapi.com/products");

      // Step 2: Send products to our backend to store in Firestore
      const response = await axios.post("http://localhost:9001/product/seed", { products });

      setMessage(response.data.message);

      await getProducts();
    } catch (error: any) {
      setMessage("Error seeding products: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:9001/product");
      setProducts(data.products);
    } catch (error: any) {
      console.error("Error fetching products:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Seed Products to Firestore</h2>
      <button
        onClick={fetchAndSeedProducts}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Seeding..." : "Seed Products"}
      </button>
      {message && <p className="mt-2 text-gray-700">{message}</p>}

      <h2 className="text-lg font-bold mt-4">Products</h2>
      {/* {products.length > 0 && <ProductList products={products} />} */}
      {/* Product List */}
      <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.uid} product={product} />)
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SeedProducts;
