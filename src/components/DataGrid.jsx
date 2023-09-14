import React, { useState } from 'react';
import './DataGrid.css';

const DataGrid = ({ data }) => {
  const itemsPerPage = 12;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  // Setting state variables for filters
  const [nameFilter, setNameFilter] = useState('');
  const [agencyFilter, setAgencyFilter] = useState('');
  const [launchesFilter, setLaunchesFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Create filter function
  const filteredData = data.filter(item => {
    const nameMatch = item.name.toLowerCase().includes(nameFilter.toLowerCase());
    const agencyMatch = agencyFilter ? item.agency.toLowerCase() === agencyFilter.toLowerCase() : true;
    const launchesMatch = launchesFilter ? item.launches.length === parseInt(launchesFilter) : true;
    const statusMatch = statusFilter ? item.status.toLowerCase() === statusFilter.toLowerCase() : true;

    return nameMatch && agencyMatch && launchesMatch && statusMatch;
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSelectedItem(null);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex); // Use filtered data

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  return (
    <div className="data-grid">
      {/* Add filter form */}
      <h1 className="heading">Search Filter</h1>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        {/* Add select options for Agency */}
        <select
          value={agencyFilter}
          onChange={(e) => setAgencyFilter(e.target.value)}
        >
          <option value="">Select Agency</option>
          <option value="NASA">NASA</option>
          <option value="JAXA">JAXA</option>
          <option value="ESA">ESA</option>
          <option value="SpaceX">SpaceX</option>
          <option value="Axiom Space">Axiom Space</option>
          <option value="Roscosmos">Roscosmos</option>
        </select>
        {/* Add select options for Launches */}
        <select
          value={launchesFilter}
          onChange={(e) => setLaunchesFilter(e.target.value)}
        >
          <option value="">Select Launches</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {/* Add select options for Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="retired">Retired</option>
        </select>
        {/* Add a search button */}
        <button className='btn-filter' onClick={() => handlePageChange(1)}>Search</button>
      </div>

      <h1 className="heading space">SpaceX Crews</h1> 

      <div className="item-container">
        <ul>
          {currentData.map((item, index) => (
            <li key={index} className="card" onClick={() => handleItemClick(item)}>
              <img className='responsive-img' src={item.image} alt={item.name} style={{ width: '100%', height: '250px' }} />
              <h2>{item.name}</h2>
            </li>
          ))}
        </ul>
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {selectedItem && (
        <div className="popup-overlay">
          <div className="popup">
            <span className="close-btn" onClick={closePopup}>
              &times;
            </span>
            <h2 className='popup-name'>{selectedItem.name}</h2>
            <img src={selectedItem.image} alt={selectedItem.name} style={{ width: '100%', height: '250px'}} />
            <p><span className="popup-title">Agency:</span> {selectedItem.agency}</p>
            <p><span className="popup-title">Launches:</span> {selectedItem.launches.length}</p>
            <p className='status'><span className="popup-title">Status:</span> {selectedItem.status === "active" ? ( <span className='green-status'>{selectedItem.status}</span>) : ( <span className='red-status'>{selectedItem.status}</span>)}</p>
            <p className='wikipedia-btn-container'><a href="{selectedItem.wikipedia}">Read More On Wikipedia</a></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataGrid;
