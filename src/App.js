import React, { useState, useEffect } from 'react'; 
import { useForm } from 'react-hook-form';

import './App.css';
import Modal from './Modal.js';
import axios from "axios"; 


function SearchBar(){
  return(
    <input className="search-bar" placeholder ="Search"></input>
    )
}

function CardComponent() {
  //let arr = ["Hella", "Hello", "Harry","test","test 2"];
  const [data, setData] = useState(); 
  
    useEffect(() => { 
      axios.get('http://localhost:8080/jobs/posts').then( 
        response => { 
            setData(response.data); 
            //console.log(response.data);
        } 
      ).catch(error => { 
        console.error(error); 
      }) 
    }, []) 

 
  
  let mockArray = [
    {
      "id": 1,
      "profile": "Full Stack Developer",
      "desc": "Mern Stack Developer Needed",
      "yoe": 3,
      "techStack": ["Node", "Express", "MongoDB", "React"]
    },
    {
      "id": 2,
      "profile": "Frontend Developer",
      "desc": "Passionate about building user-friendly interfaces",
      "yoe": 2,
      "techStack": ["React", "JavaScript", "HTML", "CSS"]
    },
    {
      "id": 3,
      "profile": "Backend Engineer",
      "desc": "Experienced in designing RESTful APIs",
      "yoe": 4,
      "techStack": ["Java", "Spring Boot", "MySQL"]
    },
    {
      "id": 4,
      "profile": "Data Scientist",
      "desc": "Analyzing large datasets with Python",
      "yoe": 5,
      "techStack": ["Python", "Pandas", "NumPy", "Scikit-Learn"]
    },
    {
      "id": 5,
      "profile": "Mobile App Developer",
      "desc": "Creating cross-platform apps using Flutter",
      "yoe": 2,
      "techStack": ["Flutter", "Dart", "Firebase"]
    },
    {
      "id": 6,
      "profile": "DevOps Engineer",
      "desc": "Automating deployment pipelines",
      "yoe": 3,
      "techStack": ["Jenkins", "Docker", "Kubernetes", "AWS"]
    },
    {
      "id": 7,
      "profile": "UI/UX Designer",
      "desc": "Crafting delightful user experiences",
      "yoe": 2,
      "techStack": ["Figma", "Sketch", "InVision"]
    }];
  

  return (
    <div class="card-container-div">
      {data?.map((item, index) => (
        <div class="card-div" key={index}>
        <div key={index} className="card">
          <div class ="card-header">{item.profile}</div>
          <div class ="card-body">
            <p>{item.desc}</p>
            </div>
            <div>
              <p><span class ="attrLabel">Experience: </span> {item.yoe} years</p>
              <p><span class ="attrLabel">Skills Required: </span> {item.techStack.toString()}</p>
              <button class="card-button">show more</button>
            </div>
        </div>
        </div>
      ))}
    </div>
  );
}


function MainHeader(){

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
      setOpen(false);
  };

  const handleOpen = () => {
      setOpen(true);
  };

  let handlePostRequest = (data) =>{

    console.log("Inside Post Request Data");
      /* let formData = new FormData();
      formData.append("json1",JSON.stringify({
        "id": 7,
        "profile": "UI/UX Designer",
        "desc": "Crafting delightful user experiences",
        "yoe": 2,
        "techStack": ["Figma", "Sketch", "InVision"]
      })) */
      let jsonString = data ? JSON.stringify( data ) : JSON.stringify({ "id": 7, "profile": "UI/UX Designer", "desc": "Crafting delightful user experiences", "yoe":  2, "techStack": ["Figma", "Sketch", "InVision"] });

      fetch("http://localhost:8080/jobs/post",{

      method: 'POST', 
      mode: 'cors', 
      body: jsonString, // body data type must match "Content-Type" header
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
  }

  const { register, handleSubmit, getValues } = useForm();

  const onSubmit = (data) => {
    console.log('Form data:', data);
    data['techStack'] = data['techStack'].split(",").map((item) => item.trim());
    handlePostRequest(data);
    handleClose();
    window.location.reload(false); // Set to true for a complete server refresh
  };

  return(
    <header className="main-header">
      <nav class = "site-title">My Job Site</nav>
      <nav class = "nav-links" type ="button" onClick={handleOpen}>Add Job</nav>
     {/*  <Modal isOpen={open} onClose={handleClose}> */}
      <Modal isOpen={open}>
              <>
                  <div class ="modal-header">
                    <h4>Job Fillup</h4>
                    <button type="button" onClick={handleClose}>X</button>
                  </div>                  
                  <h3>Fill up the form to add a new job!</h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-row">
                    <div className="form-wrapper m-r-2">
                      <label>Job Title:</label>
                      <input  {...register('profile')} type="text" id="jobTitle" name="profile" />
                    </div>
                    <div className="form-wrapper">
                      <label>Company:</label>
                      <input {...register('company')} type="text" id="company" name="company" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-wrapper m-r-2">
                        <label>Years of Experience:</label>
                        <input  {...register('yoe')} type="number" id="yoe" name="yoe" />
                    </div>
                    <div className="form-wrapper">
                        <label>Skills:</label>
                        <input {...register('techStack')} type="text" id="skills" name="techStack" />
                      </div>
                  </div>
                  <div className="form-row">
                      <div className="form-wrapper">
                        <label>Job Description:</label>
                        <textarea {...register('desc')} rows="7"  id="jobDescription" name="desc" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-wrapper">
                        <button type="submit">
                          Add Job
                        </button>
                      </div>
                  </div>
                  </form>
              </>
       </Modal> 
    </header>
  )
}

function MainBody(){
  return(
    <div className="AppContainer">
      <CardComponent/>
    </div>
  )
}


function App(){
  return(
    <div class ="main-container">
      <MainHeader/>
      <SearchBar/>
      <MainBody/>
    </div>
    )
}

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */

export default App;
