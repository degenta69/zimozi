import { Product } from "@/models/Product";
import { useNavigate } from "react-router";
import { BsCurrencyDollar } from "react-icons/bs";

const ProductCard = ({ product, onClick }: { product: Product; onClick?: (e: any) => void }) => {
  const nav = useNavigate();
  const openDetail = () => {
    nav(`/products/${product.uid}`);
  };
  return (
    <div key={product.uid} className="group relative">
      <img
        alt={product.title}
        src={product.image}
        className="aspect-square w-full rounded-md bg-transparent object-contain group-hover:opacity-75 lg:aspect-auto lg:h-80"
      />
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a onClick={onClick ? onClick : openDetail} className="font-medium text-gray-900">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>

        <p className="text-sm font-medium text-gray-900">
          <span className="inline-flex items-center">
            <BsCurrencyDollar className="self-center" /> <span>{product.price}</span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
