import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CarCard from '../components/CarCard';

// const SearchResultsPage: React.FC = () => {
//   const [cars, setCars] = useState<any[]>([]);
//   const [searchParams] = useSearchParams();

//   useEffect(() => {
//     const searchQuery = searchParams.get('query');
    
//     // Fetch car listings based on search query
//     fetch(`/api/cars?query=${searchQuery}`)
//       .then((res) => res.json())
//       .then((data) => setCars(data))
//       .catch((err) => console.error(err));
//   }, [searchParams]);

//   return (
//     <div>
//       <h1>Search Results</h1>
//       <div>
//         {cars.length > 0 ? (
//           cars.map((car) => <CarCard key={car.id} car={car} />)
//         ) : (
//           <p>No cars found</p>
//         )}
//       </div>
//     </div>
//   );
// };

const SearchResultsPage: React.FC = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get('query');

    fetch(`/api/cars?query=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error(err));
  }, [searchParams]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.length > 0 ? (
          cars.map((car) => <CarCard key={car.id} car={car} />)
        ) : (
          <p>No cars found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;