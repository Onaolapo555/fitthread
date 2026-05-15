import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';

import Header from './components/Header';
import Filters from './components/Filters';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import AuthModal from './components/AuthModal';

// Lazy loaded pages
const Success = lazy(() => import('./pages/Success'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('fitthread-cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [addedProductName, setAddedProductName] = useState('');

  // Auth Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'SIGNED_IN') setIsAuthOpen(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem('fitthread-cart', JSON.stringify(cart));
  }, [cart]);

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*').order('id');
      setProducts(data || []);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    setAddedProductName(product.name);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <p className="text-xl">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header 
        totalItems={totalItems} 
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setIsAuthOpen(true)}
        user={user}
        onLogout={handleLogout}
      />

      {showAddedMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-8 py-3 rounded-2xl shadow-lg z-[300] flex items-center gap-3">
          ✅ {addedProductName} added to cart
        </div>
      )}

      <Routes>
        <Route path="/" element={
          <>
            <div className="max-w-7xl mx-auto px-6 py-16 text-center">
              <h2 className="text-6xl font-bold tracking-tighter mb-4">
                Premium Activewear
              </h2>
              <p className="text-xl text-zinc-400 mb-8 max-w-md mx-auto">
                Move better. Look better. Built for the grind.
              </p>
            </div>

            <Filters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <div className="max-w-7xl mx-auto px-6 pb-20">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-semibold">
                  {selectedCategory === 'All' ? 'Our Collection' : selectedCategory}
                </h3>
                <p className="text-zinc-400">
                  Showing {filteredProducts.length} products
                </p>
              </div>

              {filteredProducts.length === 0 ? (
                <p className="text-center text-zinc-400 py-20 text-xl">
                  No products found. Try different search or category.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={addToCart}
                      onClick={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        } />

        <Route path="/success" element={
          <Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Loading...</div>}>
            <Success />
          </Suspense>
        } />

        <Route path="/auth/callback" element={
          <Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Completing login...</div>}>
            <AuthCallback />
          </Suspense>
        } />
      </Routes>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      <ProductModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}

export default App;