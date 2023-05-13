// dynamic component - brackets [] make the route dynamic

import { useRouter } from 'next/router';

export default function Car( { car }) {
  
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <h1>Hello {id}</h1>
      <img src={car.image} width="300px" />
    </>
  )
}

// getStaticProps() - tells Next to prerender page

export async function getStaticProps({ params }) {
  // fetch json for individual car so it can be used in html
  const req = await fetch(`http://localhost:3000/${params.id}.json`);
  const data = await req.json();

  return {
    props: { car: data},
  }
}

// tells Next know which dynamic pages to render
export async function getStaticPaths() {
  // can also request data from api or database
  const req = await fetch('http://localhost:3000/cars.json');
  const data = await req.json();
  
  const paths = data.map(car => {
    return { params: { id: car } }
  })
  
  // returns paths object from every route
  return {
    paths,
    fallback: false
  }
}