import React from "react";

function Product({ name, price, description, onAddToCart }) {
  return (
    <div className="border p-4 rounded shadow-md flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">{description}</p>
        <p className="text-blue-600 font-bold mt-2">${price}</p>
      </div>
      <button
        onClick={onAddToCart}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add to Checkout
      </button>
    </div>
  );
}

export default Product;
