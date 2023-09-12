import React, { useState, useEffect } from 'react';
import './App.css';
import Banner from './components/Banner';
import DataGrid from './components/DataGrid';
import Footer from './components/Footer';


function App() {

  // Define state to store fetched SpaceX data
  const [spaceXData, setSpaceXData] = useState([]);

  // Fetch SpaceX data when the component mounts
  useEffect(() => {
    
    fetch('https://api.spacexdata.com/v4/crew')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((data) => {
        // Set the fetched data in state
        setSpaceXData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures this effect runs once

  return (
    <div className="App">
      <Banner/>
      <DataGrid data = {spaceXData} />
      <Footer/>
    </div>
  );
}

export default App;
