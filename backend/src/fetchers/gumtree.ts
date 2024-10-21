import axios from "axios";
import * as cheerio from "cheerio";
import { Car } from "@shared/Car";

// Fetch from Gumtree
export const fetchCars = async (query: string): Promise<Car[]> => {
  const url = `https://www.gumtree.com/search?search_category=all&q=${encodeURIComponent(query)}&keyword_correction=auto&search_location=United%20Kingdom`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const cars: Car[] = [];

  $(".css-yp998y").each((_, element) => {
    const car: Car = {
      title: $(element).find(".css-1de61eh").text() || "Not found",
      year: $(element).find('[data-q="motors-year"]').text() || "Not found",
      price: $(element).find('[data-q="tile-price"]').text() || "Not found",
      mileage: $(element).find('[data-q="motors-mileage"]').text() || "Not found",
      location: $(element).find(".css-30gart").text() || "Not found",
      url: $(element).find('a[data-q="search-result-anchor"]').attr('href') 
        ? `https://www.gumtree.com${$(element).find('a[data-q="search-result-anchor"]').attr('href')}` 
        : "Not found",
    };

    cars.push(car);
  });

  return cars;
};

export const fetchFromGumtree = async (query: string): Promise<Car[]> => {
  const carsFromGumtree = await fetchCars(query);

  return [...carsFromGumtree];
};