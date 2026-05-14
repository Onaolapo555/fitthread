import { Search } from "lucide-react";
export default function Filters({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) {
  const categories = ['All', 'Hoodies', 'Leggings', 'Shorts', 'Footwear', 'Tops'];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl py-3 px-5 pl-12 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
          />
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"><Search/></span>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-2xl text-sm transition ${
                selectedCategory === cat 
                  ? 'bg-orange-500 text-black font-medium' 
                  : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}