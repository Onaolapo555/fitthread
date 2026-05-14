

export default function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4">
      <div className="bg-zinc-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-3xl text-zinc-400 hover:text-white z-10"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image Side */}
          <div className="md:w-1/2 p-8">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full rounded-2xl aspect-square object-cover"
            />
          </div>

          {/* Details Side */}
          <div className="md:w-1/2 p-8">
            <div className="mb-6">
              <p className="text-orange-500 text-sm font-medium tracking-widest">{product.category}</p>
              <h2 className="text-4xl font-bold mt-2">{product.name}</h2>
              <p className="text-3xl font-bold mt-4 text-orange-500">${product.price}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Description</h3>
              <p className="text-zinc-400 leading-relaxed">
                Premium {product.category.toLowerCase()} designed for maximum comfort and performance. 
                Made with high-quality fabric that moves with you. Perfect for training, running, or everyday wear.
              </p>
            </div>

            {/* Fake Size Selector */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Size</h3>
              <div className="flex gap-3">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button 
                    key={size}
                    className="w-12 h-12 border border-zinc-700 rounded-xl hover:border-orange-500 hover:text-orange-500 transition"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => onAddToCart(product)}
              className="w-full bg-orange-500 hover:bg-orange-600 py-4 rounded-2xl font-semibold text-lg transition"
            >
              Add to Cart
            </button>

            <p className="text-center text-xs text-zinc-500 mt-6">
              Free shipping on orders over $100 • 30-day return policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


