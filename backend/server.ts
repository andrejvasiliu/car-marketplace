import express from 'express';
import cors from 'cors';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();
const PORT = process.env.PORT || 5000;

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

// Example route to scrape car listings
app.get('/api/cars', async (req, res) => {
  try {
    const searchQuery = req.query.query || '';

    // Example: Scraping a car marketplace website
    const url = `https://example.com/cars?search=${searchQuery}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const cars: any[] = [];

    // Example: Scraping car data from the website
    $('.car-listing').each((_, element) => {
      const car = {
        id: $(element).attr('data-id'),
        make: $(element).find('.make').text(),
        model: $(element).find('.model').text(),
        price: $(element).find('.price').text(),
        mileage: $(element).find('.mileage').text(),
        location: $(element).find('.location').text(),
      };

      cars.push(car);
    });

    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch car listings' });
  }
});