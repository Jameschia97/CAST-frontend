import { DataGrid } from '@mui/x-data-grid';
import React, {useEffect} from "react";
import LCService from "../services/LCService";
import {useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

const columns = [
  // { field: 'id', headerName: 'ID', width: 80 },
  // { field: 'firstName', headerName: 'First name', width: 130 },
  // { field: 'lastName', headerName: 'Last name', width: 130 },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
  {field: 'lcRefId', headerName: 'lcRefId', width:60},
  {field: 'exporter', headerName: 'exporter', width:90},
  {field: 'amount', headerName: 'amount', width:80},
  {field: 'portOfDischarge', headerName: 'DischargePort', width:110},
  {field: 'portOfLoading', headerName: 'LoadingPort', width:100},
  {field: 'lcExpiryDate', headerName: 'lcExpiryDate', width:110},
  {field: 'incoTerm', headerName: 'incoTerm', width:80},
  {field: 'ptStatus', headerName: 'ptStatus', width:80},
  {field: 'vesselName', headerName: 'vesselName', width:100},
  {field: 'vesselIMO', headerName: 'vesselIMO', width:80},
  {field: 'goodsDescription', headerName: 'goodsDescription', width:130},
  {field: 'sightOrUsance', headerName: 'sightOrUsance', width:120},
  {field: 'usanceTermInDays', headerName: 'usance(Days)', width:100},
  {field: 'latestShipmentDate', headerName: 'latestShipmentDate', width:150},
];





export default function DataTable() {

  const [tutorials, setTutorials] = useState([]);
  
  const rows = [
      { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];


  useEffect(() => {
    retrieveTutorials();
  }, []);

  const navigate = useNavigate();

  const navigateAdd = () => {
    
    navigate('/lc/all');
  };

  const navigateDelete = () => {
    
    navigate('/delete');
  };


  const retrieveTutorials = () => {
    LCService.getAllLetterOfCredit()
      .then((response) => {
        console.log('ang response', response.data);
        setTutorials(response.data);
        
      })
      .catch((e) => {
        console.log(e.message);
      });
  };  
  
  return (
    <div style={{ width: '110%'}}>
      <div className="col-ml-6 ">
        <br />
        <img width= "90%" height= "90%" src={require('./logo.png')} />
        <h3>Data List</h3>
        <button onClick={navigateAdd} className='btn btn-primary'> Home </button>
      </div>
      <br />
      <DataGrid
        rows={tutorials}
        columns={columns}
        autoHeight='true'
        // pageSize={8}
        getRowId={(row) => row.lcRefId+ row.exporter}
        // rowsPerPageOptions={[8]}
        // checkboxSelection
      />
      <br /> <br />
    </div>
  );
}
