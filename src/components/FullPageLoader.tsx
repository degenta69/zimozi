import { useLoading } from "@/context/LodingContext";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function FullPageLoader() {
  const { loading } = useLoading();

  return (
    <Transition show={loading} as={Fragment}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50/05 to-indigo-50/05 backdrop-blur-sm">
        <Transition.Child
          as={Fragment}
          enter="transition-all duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-300 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative flex flex-col items-center justify-center bg-transparent border-0">
            {/* Multi-layer spinner */}
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full bg-blue-900/50 animate-ping" />

              {/* Main spinner */}
              <div className="h-24 w-24 animate-spin rounded-full border-[8px] border-solid border-indigo-400 border-r-white" />
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}
