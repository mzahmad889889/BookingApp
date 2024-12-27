import React from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import BookingForm from "./components/BookingForm"
import ProductList from "./components/ProductList"
import Checkout from "./components/Checkout"

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/booking" element={<BookingForm/>}/>
            <Route path="/" element={<ProductList/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
