import Dropdown from "@/components/ui/Dropdown";

interface FiltersProps {
  categories: string[];
  priceRanges: { label: string; min?: number; max?: number }[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedPrice: { label: string; min?: number; max?: number };
  setSelectedPrice: React.Dispatch<
    React.SetStateAction<
      | {
          label: string;
          min: undefined;
          max: undefined;
        }
      | {
          label: string;
          min: number;
          max: number;
        }
    >
  >;
}

export default function Filters({
  categories,
  priceRanges,
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
}: FiltersProps) {
  return (
    <div className="flex gap-4 mb-6">
      <Dropdown
        label="Category"
        name="category"
        onChange={(e) => setSelectedCategory(e.target.value)}
        options={categories.map((category) => ({ value: category, label: category }))}
        value={selectedCategory}
      />

      <Dropdown
        label="Price"
        name="price"
        onChange={(e) => {
          const selectedRange = priceRanges.find((range) => range.label === e.target.value);
          setSelectedPrice({
            label: selectedRange?.label ?? priceRanges[0].label,
            min: selectedRange?.min ?? priceRanges[0].min ?? 0,
            max: selectedRange?.max ?? priceRanges[0].max ?? Infinity,
          });
        }}
        options={priceRanges.map((range) => ({ value: range.label, label: range.label }))}
        value={selectedPrice.label}
      />
    </div>
  );
}
