import React from 'react';
import BidForm from './AddBidForm';
import axios from 'axios';
import { useEffect, useState } from 'react';

function PhotoContainer({ id,src, initialBid }) {
  const key = id;

  const [art, setArt] = useState([]);

  const getArt = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/art/'+key);
      //console.log("Data",response.data);
      setArt(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getArt();
  });


  return (
    <div className="photo-container">
      <div className="photo">
        <img src={src} alt="" width="200" />
      </div>
      <div className="comments-section">
        <h4>Bids</h4>
        <ul>
          {art.bids.map((bid) => (
            <li key={bid._id}>
              <p>
                <strong>{bid.user}</strong> - ${bid.bid}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <BidForm id={key}/>
      <hr />
    </div>
  );
}

export default PhotoContainer;
 