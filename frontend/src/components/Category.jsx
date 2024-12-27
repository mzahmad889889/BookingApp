import React from "react";
import Product from "./Products";

function Category({ title, products }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Product
            key={product.name}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Category;
