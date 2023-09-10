import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Navbar from '../Components/ngoNavbar';
import './ngoDashboard.css';
import axios from 'axios';
import ProjectDisplay from '../Components/ngoModal';

// const cardsData = [
//     {
//       "_id": "649d4c5463d373af6c0521dd",
//       "projectName": "Spread Smiles",
//       "projectImage": "https://indiaforensic.com/certifications/wp-content/uploads/2014/03/ngo.jpg",
//       "description": "We go to children in slums to teach them on weekends.",
//       "isDeleted": false,
//       "motto": "Spread knowledge",
//       "place": "Kanpur",
//       "NGO": "649b5203f2ae5cc25261804c",
//       "projectstat": [],
//       "numOfOpenings": 10,
//       "remainingOpen": 0,
//       "createdAt": "2023-06-29T09:18:12.293Z",
//       "__v": 0
//     },
//     {
//       "_id": "649d4d0f63d373af6c0521e1",
//       "projectName": "Helping hands",
//       "projectImage": "https://www.bailinson-oleary.com/wp-content/uploads/2019/08/NGO.jpg",
//       "description": "Helping Hands Foundation is a non-profit organization dedicated to providing humanitarian aid and support to vulnerable communities. Our initiatives include providing food, shelter, healthcare, and educational opportunities to those in need. Together, we strive to make a positive impact and create a better world for all.",
//       "isDeleted": false,
//       "motto": "For providing better living conditions",
//       "place": "Mumbai",
//       "NGO": "649b5203f2ae5cc25261804c",
//       "projectstat": [],
//       "numOfOpenings": 20,
//       "remainingOpen": 0,
//       "createdAt": "2023-06-29T09:21:19.637Z",
//       "__v": 0
//     },
//     {
//       "_id": "649d4d3a63d373af6c0521e5",
//       "projectName": "Bright Futures Foundation",
//       "projectImage": "https://www.bailinson-oleary.com/wp-content/uploads/2019/08/NGOs-In-Child-Support-1024x576.jpg",
//       "description": "Bright Futures Foundation focuses on empowering underprivileged children and youth through education. We provide scholarships, mentorship programs, and vocational training to equip them with the necessary skills for a brighter future. Together, we can break the cycle of poverty and create opportunities for a better tomorrow.",
//       "isDeleted": false,
//       "motto": "Fighting poverty and building economic opportunities",
//       "place": "Kolkata",
//       "NGO": "649b5203f2ae5cc25261804c",
//       "projectstat": [],
//       "numOfOpenings": 5,
//       "remainingOpen": 0,
//       "createdAt": "2023-06-29T09:22:02.834Z",
//       "__v": 0
//     },
//     {
//       "_id": "649d4d7d63d373af6c0521e9",
//       "projectImage": "https://www.bailinson-oleary.com/wp-content/uploads/2019/08/Child-Support.jpg",
//       "projectName": "UNESCO",
//       "description": "Health for All Initiative is dedicated to improving healthcare access and promoting wellness in underserved communities. We organize medical camps, provide essential healthcare services, and advocate for affordable and quality healthcare. Join us in our mission to ensure that everyone has the right to good health and well-being.",
//       "isDeleted": false,
//       "motto": "prividing better healthcare",
//       "place": "Agartala",
//       "NGO": "649b5203f2ae5cc25261804c",
//       "projectstat": [],
//       "numOfOpenings": 50,
//       "remainingOpen": 0,
//       "createdAt": "2023-06-29T09:23:09.344Z",
//       "__v": 0
//     }
//   ];


const Dashboard = () => {

    const [nameFilter, setNameFilter] = useState('');
    const [openingsFilter, setOpeningsFilter] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [show, setShow] = useState(false);
    const [project,setProject]=useState([]);
    const [proj,setProj]=useState({});
    const [cardsData, setCardsData] = useState([]);

    

    useEffect(() => {
        getData()
    }, [])

    const getData=async()=>{
        await axios.post('http://localhost:5000/ngo/fetchproject',{}, {
            headers: {
                authorization: `Token ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            console.log(res);
            setCardsData(res.data.projectList.projects);
            console.log(cardsData);
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

    return (
        <div className="parent">
            <ProjectDisplay show={show} setShow={setShow} project={proj}/>
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
                                        <img src={card.projectImage} alt="image" className="card-image" />
                                    </div>
                                    <div className="card-column">
                                        <div className="card-info">
                                            <p className='heading'>{card.projectName}</p>
                                            <h3 className='sub-heading'>{card.ngoName}</h3>
                                            <p className="description">Description: {card.description}</p>
                                            <Button className='button' variant="primary" onClick={() => {setShow(true); setProj(card)}}>View Details</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
