import React from 'react'
import { useState, useEffect } from 'react'

const Main = () => {

  const [politicians, setPoliticians] = useState([]);

  useEffect(() => {
    fetch("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(err => console.error(error))
  }, []);

  console.log(politicians);

  return (
    <div>
      <h1 className='text-danger m-4'>Lista dei politici</h1>
      <div className='container'>
        {politicians.map((p) => {
          <div className='card' key={p.id}>
            <img src={p.image} alt={p.name} />
            <h2>{p.name}</h2>
            <p><strong>Posizione:</strong>{p.position}</p>
            <p>{p.biography}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default Main