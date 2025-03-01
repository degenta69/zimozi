import { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { createProduct, updateProduct } from "@/client-api-service/product.service";
import { Product } from "@/models/Product";
import Dropdown from "@/components/ui/Dropdown";
import InputComponent from "@/components/ui/Input";

const categories = ["electronics", "men's clothing", "women's clothing", "jewelery"].map(
  (category) => ({ label: category, value: category })
);

const initialProduct = {
  title: "",
  category: "",
  image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
  stock: 0,
  price: 0,
  description: "",
};

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingProduct?: Product | null;
  onSuccess: (productData: Product) => void;
}

export default function ProductFormModal({
  isOpen,
  onClose,
  existingProduct,
  onSuccess,
}: ProductFormModalProps) {
  const [productData, setProductData] = useState(initialProduct);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingProduct) {
      setProductData(existingProduct);
    } else {
      setProductData(initialProduct);
    }
  }, [existingProduct]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let data;
      if (existingProduct) {
        data = await updateProduct(existingProduct.uid, productData);
      } else {
        data = await createProduct({ ...productData, rating: { count: 0, rate: 0 } });
      }
      onSuccess(data);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: isNaN(value as any) ? value : Number(value) }));
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white/10 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title className="text-lg font-semibold">
                  {existingProduct ? "Edit Product" : "Add Product"}
                </Dialog.Title>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
                    label="Category"
                    options={categories}
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
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-300 rounded"
                      onClick={onClose}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : existingProduct ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
