// StripeService.js
//TEST
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Change this to your server's URL

const createAccount = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/create-account`, { email });
    return response.data.url;
  } catch (error) {
    console.error('Error creating account');
  }
}

const createProduct = async (name, price) => {
  try {
    const response = await axios.post(`${BASE_URL}/create-product`, { name, price });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export { createAccount, createProduct };
