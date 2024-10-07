import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type CarDetailsParams = {
  id: string;
};

const CarDetailsPage: React.FC = () => {
  const { id } = useParams<CarDetailsParams>();
  const [car, setCar] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/car/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div>
      {car ? (
        <div>
          <h1>{car.make} {car.model}</h1>
          <p>Price: {car.price}</p>
          <p>Mileage: {car.mileage}</p>
          <p>Location: {car.location}</p>
          <a href={car.url} target="_blank" rel="noopener noreferrer">View on Marketplace</a>
        </div>
      ) : (
        <p>Loading car details...</p>
      )}
    </div>
  );
};

export default CarDetailsPage;