import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchResultsPage: React.FC = () => {
  const [carResults, setCarResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('query') || '';

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch(`http://localhost:4999/api/cars?q=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch car listings');
        }
        const data = await response.json();
        setCarResults(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchCars();
    }
  }, [searchTerm]);

  const handleCarClick = (car: any) => {
    navigate(`/car/${car.id}`, { state: { car } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Search Results for "{searchTerm}"</h1>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="mt-8 w-full max-w-lg">
        {carResults.length > 0 && (
          <ul>
            {carResults.map((car: any, index) => (
              <li
                key={index}
                className="mb-4 border p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition"
                onClick={() => handleCarClick(car)}
              >
                <h3 className="text-lg font-bold">{car.title}</h3>
                <p>Year: {car.year}</p>
                <p>Mileage: {car.mileage}</p>
                <p>Price: {car.price}</p>
                <p>Location: {car.location}</p>
                <a href={car.url} target='_blank' className="text-blue-500"  onClick={(e) => e.stopPropagation()}>View on Marketplace</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;