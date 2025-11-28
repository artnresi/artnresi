"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useKindeAuth, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";


type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
};

const products: Product[] = [
  { id: "coaster", title: "Resin Coaster", description: "Minimalist handmade resin coaster.", price: 350, image: "/images/coaster.jpg" },
  { id: "pendant", title: "Resin Pendant", description: "Elegant resin pendant with gold flakes.", price: 500, image: "/images/pendant.jpg" },
  { id: "tray", title: "Resin Tray", description: "Artisanal resin tray, matte finish.", price: 890, image: "/images/tray.jpg" }
];

export default function ShopPage() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const { isAuthenticated, user } = useKindeAuth();

  const addToCart = (id: string) => setCart(prev => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  const removeFromCart = (id: string) => {
    setCart(prev => {
      const next = { ...prev };
      if (!next[id]) return next;
      next[id] = next[id] - 1;
      if (next[id] <= 0) delete next[id];
      return next;
    });
  };

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find(pr => pr.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      {/* Product Grid */}
      <section>
        <h1 className="text-3xl font-serif text-brand mb-8">Our Resin Crafts</h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(p => (
            <Card key={p.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="font-serif">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-48 mb-4">
                  <Image src={p.image} alt={p.title} fill className="object-cover rounded-md" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <p className="text-sm text-gray-600 font-sans">{p.description}</p>
                <p className="mt-2 font-bold text-brand font-sans">₱{p.price}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full font-sans" onClick={() => addToCart(p.id)}>Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Cart Sidebar */}
<aside className="h-fit rounded-lg border p-4">
  <h2 className="text-lg font-semibold mb-3 font-serif">Cart</h2>
  {!isAuthenticated ? (
    <div className="space-y-3">
      <p className="text-sm text-gray-600 font-sans">Please log in to checkout.</p>
      <LoginLink className="btn-primary">Login with Kinde</LoginLink>
    </div>
  ) : (
    <>
      <p className="text-sm font-sans mb-2">Welcome, {user?.email}</p>
      {Object.keys(cart).length === 0 ? (
        <p className="text-sm text-gray-600 font-sans">Your cart is empty.</p>
      ) : (
        <div className="space-y-3">
          {Object.entries(cart).map(([id, qty]) => {
            const p = products.find(pr => pr.id === id)!;
            return (
              <div key={id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium font-sans">{p.title}</div>
                  <div className="text-xs text-gray-600 font-sans">Qty: {qty}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => removeFromCart(id)}>-</Button>
                  <Button onClick={() => addToCart(id)}>+</Button>
                </div>
              </div>
            );
          })}
          <div className="pt-3 border-t flex items-center justify-between">
            <span className="font-medium font-sans">Total</span>
            <span className="font-bold text-brand font-sans">₱{cartTotal}</span>
          </div>
          <Button className="w-full font-sans">Checkout</Button>
          <LogoutLink className="btn-outline w-full">Logout</LogoutLink>
        </div>
      )}
    </>
  )}
</aside>

    </div>
  );
}
