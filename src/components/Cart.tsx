import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { getProductsByIds } from "@/client-api-service/product.service";
import { CartProduct, Product } from "@/models/Product";
import { checkout } from "@/client-api-service/checkout.services";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, open, setOpen } = useCart();
  const { user } = useAuth();
  const [product, setProducts] = useState<CartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const nav = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await getProductsByIds(cart.map((item) => item.productId));
      console.log(response);
      let cartProducts = response.products.map((item: Product) => {
        return {
          ...item,
          quantity: cart.find((cartItem) => cartItem.productId === item.uid)?.quantity || 0,
        };
      });
      setProducts(cartProducts);
      let price = response.products.reduce(
        (total: number, item: { price: number; uid: string }) =>
          total +
          item.price * (cart.find((cartItem) => cartItem.productId === item.uid)?.quantity || 0),
        0
      );
      console.log("Total price:", price);
      setTotalPrice(price);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await checkout({
        items: cart.map((item) => ({ productId: item.productId, quantity: item.quantity })),
        // status: OrderStatus.PENDING,
        totalAmount: totalPrice,
        // userId
      });
      clearCart();
      setOpen(false);
      nav("/orders");
      console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    if (open && cart.length > 0) {
      fetchProducts();
    }
  }, [cart, open]);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      {cart.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                      ) : (
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {product.map((product) => (
                            <li key={product.uid} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  alt={product.description}
                                  src={product.image}
                                  className="size-full object-cover"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={`/product/${product.uid}`} target="_blank">
                                        {product.title}
                                      </a>
                                    </h3>
                                    <p className="ml-4">${product.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {product.description}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="flex items-center">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateQuantity(
                                          product.uid,
                                          Math.max(1, product.quantity - 1)
                                        )
                                      }
                                      className="px-2 py-1 text-gray-600 border border-gray-300 rounded-l-md hover:bg-gray-200"
                                    >
                                      -
                                    </button>
                                    <p className="px-3">{product.quantity}</p>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateQuantity(product.uid, product.quantity + 1)
                                      }
                                      className="px-2 py-1 text-gray-600 border border-gray-300 rounded-r-md hover:bg-gray-200"
                                    >
                                      +
                                    </button>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => removeFromCart(product.uid)}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${totalPrice.toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <button
                        disabled={cart.length === 0 || !user}
                        onClick={handleCheckout}
                        className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                      >
                        Checkout
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setOpen(false);
                            // nav("/products");
                          }}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => clearCart()}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
