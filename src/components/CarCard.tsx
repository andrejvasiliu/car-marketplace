import React from 'react';

type CarProps = {
  car: {
    id: string;
    make: string;
    model: string;
    price: number;
    mileage: number;
    location: string;
  };
};

// const CarCard: React.FC<CarProps> = ({ car }) => {
//   return (
//     <div className="car-card">
//       <h2>{car.make} {car.model}</h2>
//       <p>Price: {car.price}</p>
//       <p>Mileage: {car.mileage}</p>
//       <p>Location: {car.location}</p>
//       <a href={`/car/${car.id}`}>View Details</a>
//     </div>
//   );
// };

const CarCard: React.FC<CarProps> = ({ car }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-2">
        {car.make} {car.model}
      </h2>
      <p className="text-gray-700">Price: £{car.price}</p>
      <p className="text-gray-700">Mileage: {car.mileage} miles</p>
      <p className="text-gray-700">Location: {car.location}</p>
      <a
        href={`/car/${car.id}`}
        className="text-blue-500 hover:underline mt-2 inline-block"
      >
        View Details
      </a>
    </div>
  );
};

export default CarCard;