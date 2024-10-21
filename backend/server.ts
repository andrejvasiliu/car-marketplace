import express from 'express';
import cors from 'cors';
import { fetchFromGumtree } from './src/fetchers/gumtree';

const app = express();
const PORT = process.env.PORT || 4999;

// Middleware
app.use(cors());
app.use(express.json());

// Example Route to Test API
app.get('/', (req, res) => {
  res.send('Car Marketplace API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/api/cars', async (req, res) => {
  try {
    const searchQuery = req.query.q || '';
    
    const cars = await fetchFromGumtree(searchQuery.toString());
    
    res.json(cars);
  } catch (error) {
    console.error("Error in /api/cars:", error);
    res.status(500).json({ message: 'Failed to fetch car listings' });
  }
});

app.get('api/car/:id', (req, res) => {
  try{
    const carId = req.params.id;
    res.send(`Your car id is: ${carId}`);
  } catch (error) {
    console.error("Error in /api/car/:id:", error);
    res.status(500).send('An error occurred');
  }
});