import React, { useState } from 'react'
// import { NavLink } from 'react-router-dom'
import {useFormik} from 'formik'
import { RegistrationSchema } from './schema'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
function BookingForm() {
    const [errorMessage, setErrorMessage] = useState()
    const [selectedTime, setSelectedTime] = useState('');

    const navigate = useNavigate()

    const timeSlots = [
      '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM'
    ];

    const handleTimeSlotClick = (time) => {
      setSelectedTime(time);
      console.log(selectedTime)
    };

    const today = new Date().toISOString().split('T')[0];

    const initialValues = {
      name: '',
      email: '',
      date: '',
    }
    const {values, handleBlur, handleChange, handleSubmit, errors, touched} = useFormik({
      initialValues,
      validationSchema:RegistrationSchema,
      onSubmit: async(values, actions) => {
        console.log(values)
        try{
         const response = await axios.post('https://booking-app-mern.vercel.app/booking', {...values,
            timeSlot: selectedTime,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
         })
         console.log(response.data)
        //  console.log(response.data.message || "Successfully Registered")
         actions.resetForm()
        //  navigate('/')
        }catch(error){
            if(error.response){
              setErrorMessage(error.response.data.message)
            }
        }
      }
    })

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center w-full bg-gray-100 pt-5">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Your Slot</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder='Enter Your name'
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <div className='mt-1'>{errors.name && touched.name &&  <p className='text-red-700 text-sm'>{errors.name}</p>}</div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Enter Your email'
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <div className='mt-1'>{errors.email && touched.email && <p className='text-red-700 text-sm'>{errors.email}</p>}</div>
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            placeholder='Select Date'
            value={values.date}
            onBlur={handleBlur}
            onChange={handleChange}
            min={today}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <div className='mt-1'>{errors.date && touched.date &&  <p className='text-red-700 text-sm'>{errors.date}</p>}</div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Time Slot</label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {timeSlots.map((time) => (
              <div
                key={time}
                className={`px-3 py-2 text-center border border-gray-300 rounded-md cursor-pointer hover:bg-blue-100 ${
                  selectedTime === time ? 'bg-blue-500 text-white' : ''
                }`}
                onClick={() => {
                    handleTimeSlotClick(time)
                    setErrorMessage('');
                }}
              >
                {time}
              </div>
            ))}
          </div>
          {errorMessage && <p className="text-red-700 text-sm mt-2">{errorMessage}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Book Now
        </button>
      </form>
    </div>
    </>
  );
}

export default BookingForm;
