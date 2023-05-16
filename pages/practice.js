import { useState } from 'react'

export default function Practice( { car }) {

  const [selectedCar, setSelectedCar] = useState(null);

  const handleChange = (event) => {
    const carId = event.target.value;
    const selectedCar = car.find((car) => car.id === carId);
    setSelectedCar(selectedCar);
  };

  return (
    <>
      <h1>Practice Component</h1>
      <select id="car" value={selectedCar.id} onChange={handleChange}>
        <option value="">Select a car</option>
          {car.map((car) => (
            <option key={car.id} value={car.id}>
              {car.id}
            </option>
          ))}
      </select>
      
      {selectedCar && (
        <div className="card">
          <img src={selectedCar.image} alt={selectedCar.id} />
          <h2>{selectedCar.id}</h2>
        </div>
      )}
    </>
  )
}

export async function getStaticProps({ params }) {
  // Fetch JSON for individual car from the server or an external API
  const res = await fetch(`http://localhost:3000/${params.id}.json`);
  const data = await res.json();

  return {
    props: { car: data },
  };
}

export async function getStaticPaths() {
  // Fetch all car IDs from the server or an external API
  const res = await fetch('http://localhost:3000/public/cars.json');
  const data = await res.json();

  // Generate paths for all car IDs
  const paths = data.map((car) => ({ params: { id: car.id } }));

  return {
    paths,
    fallback: false, // Show 404 page if the car ID is not found
  };
}
