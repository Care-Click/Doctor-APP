import React, { useState } from 'react';
import axios from '../assets/axiosConfig.js';

const Subscribe = () => {
  
 
  const [message, setMessage] = useState('');

const amount = 200000
 
  const onPay = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/api/payments',{amount});
      console.log(response.data);

      window.location.href = response.data.result.link; 

     
    } catch (error) {
      console.error('Payment initiation failed:', error);
      setMessage('Payment initiation failed. Please try again.');
    }
  };

  return (
    <div className='p-40 bg-gray-100 flex justify-center items-center'>
      <div className="card border-gray-300 border rounded-lg shadow-lg p-6 max-w-sm">
        <h1 className="text-xl font-semibold mb-4">Amount to Pay:</h1>
        <p className="text-3xl mb-4">{amount / 1000} TND</p> 
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onPay}
        >
          Pay Now
        </button>
      </div>
      {message && <div className="mt-4 text-red-600">{message}</div>}
    </div>
  );
};

export default Subscribe;
