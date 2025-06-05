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
  const [selectPosition, setSelectPosition] = useState('');

  useEffect(() => {
    fetch("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(err => console.error(error))
  }, []);

  const positions = useMemo(() => {
    const uniquePositions = [];
    politicians.forEach(p => {
      if (!uniquePositions.includes(p.position)) {
        uniquePositions.push(p.position);
      }
    });
    return uniquePositions;
  }, [politicians]);

  const filterPoliticians = useMemo(() => {
    return politicians.filter(p => {
      const isInName = p.name.toLowerCase().includes(search.toLowerCase());
      const isInBio = p.biography.toLowerCase().includes(search.toLowerCase());
      const isPositionValid = selectPosition === '' || p.position === selectPosition;
      return (isInName || isInBio) && isPositionValid;
    });
  }, [politicians, search, selectPosition]);

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
      <select
        value={selectPosition}
        onChange={e => setSelectPosition(e.target.value)}
      >
        <option value=''>Tutte le posizioni</option>
        {positions.map((position, index) => (
          <option key={index} value={position}>{position}</option>
        ))}
      </select>
      <div className='container'>
        {filterPoliticians.map((p) => {
          <PoliticianCard key={p.id} {...p} />
        })}
      </div>
    </div>
  )
}

export default Main