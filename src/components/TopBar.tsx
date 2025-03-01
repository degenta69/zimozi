import { useCart } from "@/context/CartContext";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Products", href: "/products", current: false },
  { name: "Orders", href: "/orders", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function TopBar() {
  const { setOpen } = useCart();
  const { user, handleLogout } = useAuth();
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const nav = useNavigate();
  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

  useEffect(() => {
    // update current page
    setCurrentPage(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <img
                  alt="Tailwind Logo"
                  src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="size-8"
                />
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        onClick={() => nav(item.href)}
                        className={classNames(
                          item.href === currentPage
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center">
                <button
                  onClick={() => setOpen(true)}
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <ShoppingCartIcon className="size-6" />
                </button>
                <Menu as="div" className="relative ml-3">
                  <MenuButton
                    onClick={() => {
                      if (!user) {
                        nav("/login");
                      }
                    }}
                    className={`flex items-center justify-center ${user ? "w-8" : "w-15"} h-8 rounded-full bg-indigo-600 text-white text-sm font-medium`}
                  >
                    <span className="sr-only">Open user menu</span>
                    {user ? (
                      <span className="text-xl font-bold">{userInitial}</span>
                    ) : (
                      <span>Sign in</span>
                    )}
                  </MenuButton>
                  <MenuItems
                    className={`absolute ${!user ? "hidden" : "block"} right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5`}
                  >
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block w-full text-left px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
              <div className="-mr-2 flex md:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                  {open ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
                </DisclosureButton>
              </div>
            </div>
          </div>
          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  onClick={() => nav(item.href)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white text-lg font-medium">
                  {userInitial}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{user?.name || "Guest"}</div>
                  <div className="text-sm font-medium text-gray-400">
                    {user?.email || "Not Signed In"}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <DisclosureButton
                  onClick={handleLogout}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  Sign out
                </DisclosureButton>
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
