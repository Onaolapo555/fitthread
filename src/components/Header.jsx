
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ShoppingCart } from 'lucide-react';

export default function Header({ 
  totalItems, 
  onCartClick, 
  onAuthClick, 
  user, 
  onLogout 
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-zinc-800 py-5 sticky top-0 bg-zinc-950 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-3xl font-bold tracking-tight">FitThread</h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-orange-500 transition">Shop</a>
            <a href="#" className="hover:text-orange-500 transition">About</a>
            <a href="#" className="hover:text-orange-500 transition">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onCartClick}
              className="relative text-xl"
            >
              <ShoppingCart/>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* User / Auth */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback>
                        {user.user_metadata?.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block text-sm font-medium">
                      {user.user_metadata?.full_name?.split(" ")[0] || "User"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onLogout} className="text-red-500 cursor-pointer border-gray-700 bg-black">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={onAuthClick}>
                Sign in
              </Button>
            )}

            {/* Burger Menu */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden text-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? '✕' : '☰'}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 py-6 border-t border-zinc-800">
            <nav className="flex flex-col gap-6 text-lg">
              <a href="#" className="hover:text-orange-500">Shop</a>
              <a href="#" className="hover:text-orange-500">About</a>
              <a href="#" className="hover:text-orange-500">Contact</a>
              {/* <a href="#" className="hover:text-orange-500">Logout</a> */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

