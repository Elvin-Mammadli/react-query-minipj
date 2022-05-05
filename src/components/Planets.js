import { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (page) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
}

const Planets = () => {
  const [page, setPage] = useState(1)
  const { data, status } = useQuery(['planets', page], () => fetchPlanets(page), {
    keepPreviousData: true,
  });

  return (
    <div>
      <h2>Planets</h2>

      <button disabled = {page === 1} onClick={() => setPage(prev => prev === 1 ? 1 : prev - 1)}>Previous page</button>
      <p style={{display: "inline-block"}}>Page: {page}</p>
      <button disabled = {page === 6} onClick={() => setPage(prev => prev === 6 ? 6 : prev + 1)}>Next page</button>

      {status === 'loading' && (
        <div>Loading data...</div>
      )}

      {status === 'error' && (
        <div>Error during fetch</div>
      )}

      {status === 'success' && (
        <div>
          { data.results.map(planet => <Planet key={planet.name} planet={planet} />)}
        </div>
      )}
    </div>
  )
}

export default Planets;