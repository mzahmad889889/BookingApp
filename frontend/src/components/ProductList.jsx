import React, { useState } from "react";
import CheckoutPage from "./Checkout";
import { Link } from "react-router-dom";

function ProductList() {
  const categoriesData = [
    {
      title: "Electronics",
      products: [
        { name: "Laptop", price: 1200, description: "High-performance laptop." },
        { name: "Smartphone", price: 800, description: "Latest smartphone model." },
        { name: "Headphones", price: 200, description: "Noise-cancelling headphones." },
      ],
    },
    {
      title: "Clothing",
      products: [
        { name: "T-shirt", price: 20, description: "Comfortable cotton t-shirt." },
        { name: "Jeans", price: 50, description: "Stylish denim jeans." },
        { name: "Jacket", price: 100, description: "Warm winter jacket." },
      ],
    },
    {
      title: "Books",
      products: [
        { name: "Fiction Novel", price: 15, description: "Bestselling fiction novel." },
        { name: "Cookbook", price: 25, description: "Delicious recipes cookbook." },
        { name: "Biography", price: 18, description: "Inspirational life story." },
      ],
    },
  ];

  const [categories, setCategories] = useState(categoriesData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedTab, setSelectedTab] = useState("Products");
  const [notification, setNotification] = useState({ visible: false, message: "" });

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleSort = () => {
    const sorted = categories.map((category) => ({
      ...category,
      products: [...category.products].sort((a, b) =>
        sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      ),
    }));
    setCategories(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);

    // Show notification
    setNotification({ visible: true, message: `${product.name} added to checkout.` });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ visible: false, message: "" });
    }, 3000);
  };

  const filteredCategories =
    selectedCategory === "All"
      ? categories
      : categories.filter((category) => category.title === selectedCategory);

  return (
    <div className="container mx-auto p-4 mt-20">
      {notification.visible && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          {notification.message}
        </div>
      )}

      <nav className="flex justify-around bg-gray-200 p-4 mb-6 rounded">
        <button
          onClick={() => setSelectedTab("Products")}
          className={`px-4 py-2 rounded ${
            selectedTab === "Products" ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setSelectedTab("Checkout")}
          className={`px-4 py-2 rounded ${
            selectedTab === "Checkout" ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          Checkout
        </button>
        <Link to="/booking">
          <button
            className="px-4 py-2 rounded bg-white"
          >
            Booking
          </button>
        </Link>
      </nav>

      {/* Conditional Rendering */}
      {selectedTab === "Products" && (
        <>
          <header className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className="border p-2 rounded w-full md:w-auto"
            >
              <option value="All">All</option>
              {categoriesData.map((category) => (
                <option key={category.title} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>

            <button
              onClick={handleSort}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
            >
              Sort by Name ({sortOrder === "asc" ? "Z-A" : "A-Z"})
            </button>
          </header>

          <div>
            {filteredCategories.map((category) => (
              <div
                key={category.title}
                className="border p-4 rounded shadow bg-white"
              >
                <h2 className="text-xl font-bold mb-4">{category.title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.products.map((product) => (
                    <div
                      key={product.name}
                      className="p-4 border rounded flex flex-col items-start"
                    >
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-gray-700">{product.description}</p>
                      <p className="text-blue-500 font-bold">${product.price}</p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                      >
                        Add to Checkout
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedTab === "Checkout" && <CheckoutPage cart={cart} />}
    </div>
  );
}

export default ProductList;
