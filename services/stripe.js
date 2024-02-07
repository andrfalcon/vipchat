// StripeService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Change this to your server's URL

export const createProduct = async (name, price) => {
  try {
    const response = await axios.post(`${BASE_URL}/create-product`, { name, price });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};
