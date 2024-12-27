import React from "react";

function Checkout({ cart=[] }) {
  console.log("Cart contents:", cart); // Debugging log
  return (
    <div className="mt-8 p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {cart.length>0 ? (
        <ul>
          {cart.map((product, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{product.name}</span>
              <span>${product.price}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products in the checkout.</p>
      )}
    </div>
  );
}

export default Checkout;