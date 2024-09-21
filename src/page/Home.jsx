import React from 'react';
import Row from '../components/Row';
import requests from '../Requests';
import Trending from '../components/Trending';



function Home() {
  return (
    <>
        <Trending rowID='1' title='Trending' fetchURL={requests.requestTrending} />
        <Row rowID='2' title='Recommended for you' fetchURL={requests.requestTopRated} />
        <Row rowID='3' title='' fetchURL={requests.requestTopRated} />
        
      </>
  );
}

export default Home;