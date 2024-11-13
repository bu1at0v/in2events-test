import React from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  clearSearch,
}) => {
  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Search by name, username or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow p-2 border rounded-md bg-black"
      />
      <button
        onClick={clearSearch}
        className="ml-2 p-2 border rounded-md bg-black text-white"
      >
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
