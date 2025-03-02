import { useCart } from "@/context/CartContext";
import { Product } from "@/models/Product";
import { StarIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductPage({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <img src={product.image} alt={product.title} className="w-full rounded-lg object-cover" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>
          <p className="text-lg text-gray-900">${product.price}</p>
          <div className="mt-4 flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={classNames(
                  product.rating.rate > index ? "text-yellow-500" : "text-gray-200",
                  "h-5 w-5"
                )}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">({product.rating.count} reviews)</span>
          </div>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <p className="mt-2 text-gray-600">Category: {product.category}</p>
          <div className="mt-4 flex items-center space-x-2">
            <label htmlFor="quantity" className="text-sm text-gray-600">
              Quantity
            </label>
            <button
              onClick={() => setQuantity(quantity - 1)}
              className="p-1 rounded-md hover:bg-gray-200"
              disabled={quantity === 0}
            >
              -
            </button>
            <input
              type="number"
              id="quantity"
              className="w-12 p-1 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-200"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 rounded-md hover:bg-gray-200"
            >
              +
            </button>
          </div>
          <button
            onClick={() => addToCart(product.uid, quantity)}
            className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-400"
            disabled={quantity === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
