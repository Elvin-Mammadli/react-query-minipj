import { useState } from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async (page) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  return res.json();
}

const People = () => {
  const [page, setPage] = useState(1)
  const { data, status } = useQuery(['people', page], () => fetchPeople(page), {
    keepPreviousData: true,
  });

  return (
    <div>
      <h2>People</h2>

      <button disabled = {page === 1} onClick={() => setPage(prev => prev === 1 ? 1 : prev - 1)}>Previous page</button>
      <p style={{display: "inline-block"}}>Page: {page}</p>
      <button disabled = {page === 9} onClick={() => setPage(prev => prev === 9 ? 9 : prev + 1)}>Next page</button>


      {status === 'loading' && (
        <div>Loading data...</div>
      )}

      {status === 'error' && (
        <div>Error during fetch</div>
      )}

      {status === 'success' && (
        <div>
          { data.results.map(person => <Person key={person.name} person={person} />)}
        </div>
      )}
    </div>
  )
}

export default People;