

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({ product, onAddToCart, onClick }) {
  return (
    <Card 
      onClick={onClick}
      className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-zinc-800 bg-zinc-900"
    >
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <Badge className="absolute top-3 right-3 bg-black/70 hover:bg-black">
          {product.category}
        </Badge>
      </div>

      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-semibold text-lg leading-tight">{product.name}</h4>
            <p className="text-sm text-zinc-400 mt-1">{product.category}</p>
          </div>
          <p className="font-bold text-2xl text-orange-500">${product.price}</p>
        </div>

        <Button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full bg-black"
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

// export default function ProductCard({ product, onAddToCart, onClick }) {
//   return (
//     <div 
//       onClick={onClick}
//       className="bg-zinc-900 rounded-2xl overflow-hidden group hover:scale-105 transition-transform duration-300 cursor-pointer"
//     >
//       <div className="aspect-square overflow-hidden">
//         <img 
//           src={product.image} 
//           alt={product.name}
//           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//         />
//       </div>

//       <div className="p-6">
//         <div className="flex justify-between items-start mb-3">
//           <div>
//             <h4 className="font-semibold text-lg">{product.name}</h4>
//             <p className="text-zinc-400 text-sm">{product.category}</p>
//           </div>
//           <p className="font-bold text-xl">${product.price}</p>
//         </div>

//         <button 
//           onClick={(e) => {
//             e.stopPropagation();   // Prevent opening modal when clicking button
//             onAddToCart(product);
//           }}
//           className="w-full bg-white text-black py-3 rounded-xl font-medium hover:bg-orange-500 hover:text-white transition mt-4"
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }