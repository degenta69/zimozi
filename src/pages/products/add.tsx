import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { createProduct } from "@/client-api-service/product.service";
import { Product } from "@/models/Product";
import Dropdown from "@/components/ui/Dropdown";
import InputComponent from "@/components/ui/Input";
import { UserRoles } from "@/typings/enum";

const category = ["All", "electronics", "men's clothing", "women's clothing", "jewelery"].map(
  (category) => ({ label: category, value: category })
);
let initialValue = {
  title: "",
  category: "",
  image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
  // rating: { count: 0, rate: 0 },
  stock: 0,
  price: 0,
  description: "",
};
const add = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [productData, setProductData] = useState<Omit<Product, "uid" | "rating">>(initialValue);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== UserRoles.ADMIN) {
      console.log("User is not admin", user);
      navigate("/products");
    }
  }, [user, navigate]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const num = Number(e.target.value);
    if (!isNaN(num)) {
      setProductData({ ...productData, [e.target.name]: num });
      return;
    }
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await createProduct({
        ...productData,
        rating: { count: 0, rate: 0 },
      });
      setSuccess("Product added successfully!");
      setProductData(initialValue);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Add Product</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputComponent
          type="text"
          name="title"
          label="Product Title"
          placeholder="Product Title"
          value={productData.title}
          onChange={handleChange}
          required
        />
        <InputComponent
          type="number"
          name="price"
          label="Product Price"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
          required
        />
        <InputComponent
          disabled
          type="text"
          name="image"
          label="Product Image URL"
          placeholder="Image URL"
          value={productData.image}
          onChange={handleChange}
          required
        />
        <InputComponent
          type="number"
          name="stock"
          label="Product Stock"
          placeholder="Stock"
          value={productData.stock}
          onChange={handleChange}
          required
        />
        <Dropdown
          name="category"
          aria-placeholder="Category"
          options={category}
          label="Category"
          value={productData.category}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={productData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default add;
