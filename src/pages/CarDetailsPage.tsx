import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Car } from '@shared/Car';

type CarDetailsParams = {
  id: string;
};

const CarDetailsPage: React.FC = () => {
  const { id } = useParams<CarDetailsParams>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`/api/car/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch car details');
        }
        const data = await response.json();
        setCar(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) {
    return <p>Loading car details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {car ? (
        <div>
          <h1>{car.title}</h1>
          <p>Year: {car.year}</p>
          <p>Price: {car.price}</p>
          <p>Mileage: {car.mileage}</p>
          <p>Location: {car.location}</p>
          <a href={car.url} target="_blank" rel="noopener noreferrer">View on Marketplace</a>
        </div>
      ) : (
        <p>No car details available</p>
      )}
    </div>
  );
};

export default CarDetailsPage;