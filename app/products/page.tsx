export default function ProductsPage() {
  const products = [
    { id: 1, name: "Resin Coaster", price: "₱250" },
    { id: 2, name: "Resin Pendant", price: "₱180" },
    { id: 3, name: "Resin Tray", price: "₱450" },
  ];

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-gray-600">{p.price}</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
