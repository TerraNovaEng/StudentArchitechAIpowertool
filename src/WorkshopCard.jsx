import React from 'react';

function WorkshopCard({ title, description, date, price, onRegister }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      {date ? <p><strong>Date:</strong> {date}</p> : null}
      {price !== undefined && price !== null ? <p><strong>Price:</strong> ${price}</p> : null}
      <button onClick={onRegister}>Register for Workshop</button>
    </div>
  );
}

export default WorkshopCard;
