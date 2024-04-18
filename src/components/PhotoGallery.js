import React from 'react';
import PhotoContainer from './PhotoContainer';
import axios from 'axios';
import { useEffect, useState } from 'react';

function PhotoGallery() {

const [arts, setArts] = useState([]);

const getArt = async() => {
  try {
    const response = await axios.get('http://localhost:5000/api/arts');
    setArts(response.data);
  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
  getArt();
});


  return (
    <div className="photo-gallery">
      {arts.map((art) => (
        <PhotoContainer id={art._id} src={art.src} initialBid={{ user: art.bids[0].user, bid: art.bids[0].bid }} />
      ))}
    </div>
  );
}

export default PhotoGallery;
