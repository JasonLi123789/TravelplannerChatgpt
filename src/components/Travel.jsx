import React, { useState } from 'react';
import axios from 'axios';


export default function Travel() {
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [guide, setGuide] = useState('');
  const [loading, setLoading] = useState(false);
  
  const HTTP = "http://localhost:3001/generate_guide";

  const handleSubmit = (e) =>{
    e.preventDefault();
    setLoading(true);
    axios.post(`${HTTP}`, {location, duration})
   
    .then((res)=>{
        setGuide(res.data.message);
        console.log(guide);
    })
    .catch(function(error) {
        console.log(error);
    });
   // setGuide("");
  };

  const handleLocation = (e) => setLocation(e.target.value);
  const handleduration = (e) => setDuration(e.target.value);
  

  return (
    <div className= "container container-sm p-1"> {" "}
      <h1 className= "title text-center text-darkGreen">Travel Planner</h1>

      <form className='form' onSubmit={handleSubmit}>

        <div className='form-group'>
          <label htmlFor=""> Location </label>
          <input type="text" 
                className="shadow-sm" 
                placeholder="Enter your travel location" 
                value={location}
                onChange = {handleLocation}
            />
        </div> {" "}

        <div className='form-group'>
          <label htmlFor=""> Duration </label>
          <input type="text" 
                className="shadow-sm" 
                placeholder="Enter how many days" 
                value={duration}
                onChange = {handleduration}
            />
        </div>

        <button type="submit" >
          {loading ? 'Generating...' : 'Generate Travel Guide'}
        </button>

      </form>

      <div className='bg-darkGreen mt-2 p-1 border-5' >
        <p>
            {guide.content}
        </p>
      </div>
    </div>
  );
}


