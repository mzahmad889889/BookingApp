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
            <Route path="/" element={<ProductList/>}/>
            <Route path="checkout" element={<Checkout/>}/>
            <Route path="booking" element={<BookingForm/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
