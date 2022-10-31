import React, { useState, useEffect } from "react";
import LCService from "../services/LCService";
import { useNavigate } from "react-router-dom";
import { color, textAlign } from "@mui/system";
import { grey, red } from "@mui/material/colors";

const AddLC = () => {
  const initialTutorialState = {
    exporter: "",
    amount: "",
    portOfDischarge: "",
    portOfLoading: "",
    lcExpiryDate: "",
    incoTerm: "",
    ptStatus: "",
    vesselName: "",
    vesselIMO: "",
    goodsDescription: "",
    sightOrUsance: "",
    usanceTermInDays: "",
    latestShipmentDate: "",
  };


  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);
  const [currency, setCurrency] = useState();
  const [currentCurrency, setCurrentCurrency] = useState("1");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };



  
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/lc/all`;
    navigate(path);
  };

  useEffect(() => {
    retrieveCurrency();
  }, []);

  

  const retrieveCurrency = () => {
    LCService.getAllCurrency()
      .then((response) => {
        setCurrency(response.data);
        
      })
      .catch((e) => {
        console.log(e.message);
      });
  };  

  var importerId = 1;
  var userId = 1;
  var currencyId = currentCurrency;

  const saveTutorial = () => {
    var data = {
      exporter: tutorial.exporter,
      amount: tutorial.amount,
      portOfDischarge: tutorial.portOfDischarge,
      portOfLoading: tutorial.portOfLoading,
      lcExpiryDate: tutorial.lcExpiryDate,
      incoTerm: tutorial.incoTerm,
      ptStatus: tutorial.ptStatus,
      vesselName: tutorial.vesselName,
      vesselIMO: tutorial.vesselIMO,
      goodsDescription: tutorial.goodsDescription,
      sightOrUsance: tutorial.sightOrUsance,
      usanceTermInDays: tutorial.usanceTermInDays,
      latestShipmentDate: tutorial.latestShipmentDate,
      
    };

    LCService.create(userId,currencyId, importerId, data)
      .then((response) => {
        setTutorial(response.data);
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    saveTutorial();
    console.log(tutorial);
    setTutorial(initialTutorialState);
    
  };
  return (
    <div className="submit-form">
      <img width= "90%" height= "90%" src={require('./logo.png')} />
      <h2>Add L/C application</h2>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={routeChange}>
            Return
          </button>
        </div>
      ) : (
      
        <div>
          <br></br>
          <h5>Beneficiary Details</h5>
          <hr></hr>
          <div className="form-group">
            <label htmlFor="exporter">Exporter</label>
            <input
              type="text"
              className="form-control"
              id="exporter"
              required
              value={tutorial.exporter}
              onChange={handleInputChange}
              name="exporter"
              placeholder="Beneficiary's Name"
            />
          </div>
          <br></br>
          <br></br>
          <h5>LC Details</h5>
          <hr></hr>

          <div>Currency</div>
          <select 
          name="currency" 
          id={currencyId} 
          value={currentCurrency} 
          onChange={e => setCurrentCurrency(e.target.value)}>
            {currency?.map((row) => {
              return <option key={row.code} value={row.currencyId} >
                {row.code} - {row.description}
                </option>})}
          </select>


          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              className="form-control"
              id="amount"
              required
              value={tutorial.amount}
              onChange={handleInputChange}
              name="amount"
              placeholder="0.00"
            />
          </div>
          
          
          <div>Sight/Usance</div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="sightOrUsance"
              required
              value= 'Sight'
              onChange={handleInputChange}
              name="sightOrUsance"
              placeholder="Sight/Usance"
            />
            <label className="form-check-label" htmlFor="sightOrUsance">Sight</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="sightOrUsance"
              required
              value= 'Usance'
              onChange={handleInputChange}
              name="sightOrUsance"
              placeholder="Sight/Usance"
            />
            <label className="form-check-label" htmlFor="sightOrUsance">Usance</label>
          </div>

          <div className="form-group">
            <label htmlFor="goodsDescription">Goods Description</label>
            <input
              type="text"
              className="form-control"
              id="goodsDescription"
              required
              value={tutorial.goodsDescription}
              onChange={handleInputChange}
              name="goodsDescription"
              placeholder='Description of goods'
    
            />
          </div>

          <div className="form-group">
            <label htmlFor="latestShipmentDate">Latest Shipment Date</label>
            <input
              type="text"
              placeholder="YYYY/MM/DD"
              className="form-control"
              id="latestShipmentDate"
              required
              value={tutorial.latestShipmentDate}
              onChange={handleInputChange}
              name="latestShipmentDate"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lcExpiryDate">LC Expiry Date</label>
            <input
              type="text"
              placeholder="YYYY/MM/DD"
              className="form-control"
              id="lcExpiryDate"
              required
              value={tutorial.lcExpiryDate}
              onChange={handleInputChange}
              name="lcExpiryDate"
            />
          </div>

          <br></br>
          <br></br>
          <h5>Shipping Details</h5>
          <hr></hr>
          <div className="form-group">
            <label htmlFor="portOfLoading">Port of Loading</label>
            <input
              type="text"
              className="form-control"
              id="portOfLoading"
              required
              value={tutorial.portOfLoading}
              onChange={handleInputChange}
              name="portOfLoading"
              placeholder=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="portOfDischarge">Port of Discharge</label>
            <input
              type="text"
              className="form-control"
              id="portOfDischarge"
              required
              value={tutorial.portOfDischarge}
              onChange={handleInputChange}
              name="portOfDischarge"
            />
          </div>

          <div className="form-group">
            <label htmlFor="vesselName">Vessel Name</label>
            <input
              type="text"
              className="form-control"
              id="vesselName"
              required
              value={tutorial.vesselName}
              onChange={handleInputChange}
              name="vesselName"
              placeholder="Eg. SS Felicia"
            />
          </div>

          <div className="form-group">
            <label htmlFor="vesselIMO">Vessel IMO</label>
            <input
              type="text"
              className="form-control"
              id="vesselIMO"
              required
              value={tutorial.vesselIMO}
              onChange={handleInputChange}
              name="vesselIMO"
              placeholder="Eg. 9177884"
            />
          </div>

          <div className="form-group">
            <label htmlFor="incoTerm">IncoTerm</label>
            <input
              type="text"
              className="form-control"
              id="incoTerm"
              required
              value={tutorial.incoTerm}
              onChange={handleInputChange}
              name="incoTerm"
              placeholder="Eg. FOB/CFR/CIF/FCA"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ptStatus">PT Status</label>
            <input
              type="text"
              className="form-control"
              id="ptStatus"
              placeholder= "true/false"
              required
              value={tutorial.ptStatus}
              onChange={handleInputChange}
              name="ptStatus"
            />
          </div>

          <div className="form-group">
            <label htmlFor="usanceTermInDays">Term</label>
            <input
              type="text"
              className="form-control"
              id="usanceTermInDays"
              required
              value={tutorial.usanceTermInDays}
              onChange={handleInputChange}
              name="usanceTermInDays"
              placeholder="Eg. 30"
            />
          </div>
          <br /> <br />
          <button onClick={newTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddLC;
