import { useEffect, useState } from "react";
import ProjectDisplay from "../Components/ViewProject";
import { Button } from "react-bootstrap";
import React from 'react';
import Navbar from '../Components/volNavbar';
import './volDashboard.css';
import axios from "axios"

// const cardsData = [
//   { id: 1, projectName: "Happy", projectImage: 'https://media.istockphoto.com/id/870402320/photo/a-social-worker-meeting-with-a-group-of-villagers.jpg?s=1024x1024&w=is&k=20&c=D7VStYA3q4pgZ85OsEDgVawhcqFGDPZyHwX3AZBb0i4=', description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam ipsa ut deleniti quod commodi laboriosam non incidunt id pariatur fugiat reiciendis, aliquid, quam quos atque aliquam dolorem alias impedit ducimus.", moto: 'Job 1', place: 'Thane', ngoName: 'HappyAll', openings: 5 },
//   { id: 2, projectName: "Happy Hello", projectImage: 'image2.jpg', description: "Hey ajdb this is...", moto: 'Job 2', place: 'Airoli', ngoName: 'HappyAll', openings: 3 },
//   { id: 3, projectName: "Happy Say", projectImage: 'image3.jpg', description: "Hey this is what...", moto: 'Job 3', place: 'Pune', ngoName: 'HappyAll', openings: 8 }
//   // Add more card data as needed
// ];

const Dashboard = () => {
  const [nameFilter, setNameFilter] = useState('');
  const [openingsFilter, setOpeningsFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    console.log("hy")
    getData()
    // console.log(cardsData);
}, [])

const getData=async()=>{
    await axios.post('http://localhost:5000/vol/fetchprojects',{}, {
        headers: {
            authorization: `Token ${localStorage.getItem("token")}`
        }
    }).then((res) => {
        console.log(res);
        setCardsData(res.data.projList);
        
    })
    .catch(err => {
        console.log(err);
    })
}

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleOpeningsFilterChange = (event) => {
    setOpeningsFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  let filteredCards = cardsData;

  if (nameFilter !== '') {
    filteredCards = filteredCards.filter(card => card.projectName.toLowerCase().includes(nameFilter.toLowerCase()));
  }

  if (openingsFilter !== '') {
    filteredCards = filteredCards.filter(card => card.openings.toString().includes(openingsFilter));
  }

  if (sortBy === 'name') {
    filteredCards = [...filteredCards].sort((a, b) => a.projectName.localeCompare(b.projectName));
  } else if (sortBy === 'openings') {
    filteredCards = [...filteredCards].sort((a, b) => a.openings - b.openings);
  }
    const [show, setShow] = useState(false);
    const [project,setProject]=useState([]);
    const [proj,setProj]=useState({});
    const BASE_URL=process.env.BASE_URL
    // useEffect(()=>{
    //   fetchProjects();
    // })

    // const fetchProjects=async()=>{
    //   try{
    //   const {projList}=await axios.post(`${BASE_URL}/vol/fetchprojects`,{
    //     headers:{
    //       authorization: `Token ${localStorage.getItem("Voltoken")}`
    //     }
    //   })
    //   setProject(projList)
    // }catch(err){
    //   console.log(err)
    // }
      
    // }
  return (
    <div>
      {/* {console.log(proj)} */}
      {/* <ProjectDisplay show={show} setShow={setShow} project={proj}/>
      <Button variant="primary" onClick={() => setShow(true)}>
        Custom Width Modal
      </Button> */}
      {/* <ProjectDisplay show={show} setShow={setShow} project={proj}/> */}
          <div className="parent">
      <Navbar />
      <div className="dashboard">
        <div className="filter-section" id='sidebar'>
          <div>
            <h1>Filters</h1>
          </div>
          <label htmlFor="name-filter" className="filter-name">Search:</label>
          <input type="text" id="name-filter" value={nameFilter} onChange={handleNameFilterChange} />

          <label htmlFor="sort-by" className="filter-name">Sort by:</label>
          <select id="sort-by" value={sortBy} onChange={handleSortChange}>
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="openings">Openings</option>
          </select>
        </div>
        <div className="card-container" id="content">
          <div id="content-inner">
            {filteredCards.map((card) => (
              <div className="card" key={card.id}>
                <div className="card-content">
                  <div className="card-column">
                    <img src={card.projectImage} alt={card.projectName} className="card-image" />
                  </div>
                  <div className="card-column">
                    <div className="card-info">
                      <p className='heading'>{card.projectName}</p>
                      <h3 className='sub-heading'>{card.ngoName}</h3>
                      <p className="description">Description: {card.description}</p>
                      <Button className='button' onClick={() => {setShow(true); setProj(card)}} variant="primary">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
