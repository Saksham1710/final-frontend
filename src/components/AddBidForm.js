import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BidForm(key) {
  const [name, setName] = useState('');
  const [bid, setBid] = useState('');
  const [art, setArt] = useState([]);

  const getArt = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/art/'+key.id);
      setArt(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getArt();
  });

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Assuming `art` is your original art object and includes current bids
    const updatedBids = [...art.bids, { user: name, bid: bid }]; // Append new bid to existing bids

    // Construct the full updated art object
    const updatedArt = {
        artName: art.artName,
        serial: art.serial,
        src: art.src,
        alt: art.alt,
        bids: updatedBids
    };

    try {
        const response = await axios.put(`http://localhost:5000/api/art/${art._id}`, updatedArt);
        console.log('Updated art:', response.data);
    } catch (error) {
        console.error('Error updating art:', error);
    }
};

  return (
    <div className="addbid">
      <form className="comment-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Add a higher bid" value={bid} onChange={(e) => setBid(e.target.value)} />
        <button type="submit">Submit Your Higher Bid</button>
      </form>
    </div>
  );
}

export default BidForm;
