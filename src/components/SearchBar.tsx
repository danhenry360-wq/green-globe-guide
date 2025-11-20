// src/components/SearchBar.tsx
export const SearchBar = ({ placeholder }: { placeholder?: string }) => (
  <div className="w-full max-w-xl mx-auto">
    <input
      type="text"
      placeholder={placeholder ?? "Search…"}
      className="input input-bordered w-full"
    />
  </div>
);
