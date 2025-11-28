export default function CheckoutPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          placeholder="Address"
          className="w-full border rounded p-2"
        />
        <button className="px-4 py-2 bg-green-600 text-white rounded">
          Place Order
        </button>
      </form>
    </main>
  );
}
