import React from 'react'
import React, { useState, useEffect } from 'react'

const PoliticianCard = React.memo(({ name, biography, position, image }) => {
  console.log('Card');
  return (
    <div className='card'>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p><strong>Posizione:</strong>{position}</p>
      <p>{biography}</p>
    </div>
  )
});


const Main = () => {

  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(err => console.error(error))
  }, []);

  const filterPoliticians = useMemo(() => {
    return politicians.filter(p => {
      const isInName = p.name.toLowerCase().includes(search.toLowerCase());
      const isInBio = p.biography.toLowerCase().includes(search.toLowerCase());
      return isInName || isInBio
    });
  }, [politicians, search]);

  return (
    <div>
      <h1 className='text-danger m-4'>Lista dei politici</h1>
      <input
        className='m-4 form-control'
        type="text"
        placeholder='Cerca per nome'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className='container'>
        {filterPoliticians.map((p) => {
          <PoliticianCard key={p.id} {...p} />
        })}
      </div>
    </div>
  )
}

export default Main