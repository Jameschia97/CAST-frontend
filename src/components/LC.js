import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import LCService from "../services/LCService";


const LC = () => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");
  const [tutorial, setTutorial] = useState(initialTutorialState);

  const getTutorial = (id) => {
    LCService.get(id)
      .then((response) => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  
  const routeChange = () =>{ 
    let path = `/home`; 
    navigate(path);}

  useEffect(() => {
    if (id)
      getTutorial(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = (status) => {
    var data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status
    };

    LCService.update(currentTutorial.id, data)
      .then((response) => {
        console.log(response.data);
        setCurrentTutorial({ ...currentTutorial, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    LCService.update(currentTutorial.id, currentTutorial)
      .then((response) => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };



  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Edit L/C application</h4>
          <form>
          <div className="form-group">
            <label htmlFor="title">Invoice number</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
            <div className="form-group">
            <label htmlFor="title">Importer company</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div><div className="form-group">
            <label htmlFor="title">Exporter company</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
            <div className="form-group">
            <label htmlFor="title">Port of Loading</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Port of discharge</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Incoterms</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <br /> <br />

          <button 
          className="btn btn-success"
          onClick = {routeChange}>
            Submit
          </button>
          </form>

          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a L/C to view...</p>
        </div>
      )}
    </div>
  );
};

export default LC;