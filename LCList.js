import React, { useState, useEffect, ChangeEvent } from "react";
import LCService from "../services/LCService";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from "@mui/material";
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import { createMuiTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

const LCList = () => {
  const [tutorials, setTutorials] = useState([]);
  
  

  useEffect(() => {
    retrieveTutorials();
  }, []);

  

  const retrieveTutorials = () => {
    LCService.getAllLetterOfCredit()
      .then((response) => {
        // console.log('list response', response.data);
        setTutorials(response.data);
        
      })
      .catch((e) => {
        console.log(e.message);
      });
  };  

  
  

  const navigate = useNavigate();

  const navigateAdd = () => {
    
    navigate('/add');
  };

  const navigateData = () => {
    
    navigate('/data');
  };
 
  const deleteRow = (lcRefId) => {
    console.log(lcRefId);
    LCService.removeLetterOfCredit(lcRefId)
    .catch((e) => {
      console.log(e.message);
    });
  
  }

  return (
    <Box>
      <img width= "90%" height= "90%" src={require('./logo.png')} />
      <div className="col-ml-6 ">
        
        <h3>Letter of Credit List</h3>
        <br />
        <button onClick={navigateAdd} className='btn btn-success'> Add L/C</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={navigateData} className='btn btn-success'> Analyse list </button>
      </div>
      <br />
      <TableContainer component={Paper}  sx={{ width: 'auto' }}>
      <Table className='table' sx={{ width: 'auto' }} size="large" aria-label="a dense table" >
        <TableHead sx={{bgcolor: 'lightgreen', }}>
          <TableRow>
            <TableCell>LcRefId</TableCell>
            <TableCell align="center">Update</TableCell>
            <TableCell align="center">Delete</TableCell>
            <TableCell align="right">Exporter</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Discharge Port</TableCell>
            <TableCell align="right">Loading Port</TableCell>
            <TableCell align="right">L/CExpiryDate</TableCell>
            <TableCell align="right">IncoTerm</TableCell>
            {/* <TableCell align="right">PtStatus</TableCell> */}
            <TableCell align="right">Vessel Name + IMO</TableCell>
            <TableCell align="right">Goods Description</TableCell>
            <TableCell align="right">Sight / Usance</TableCell>
            <TableCell align="right">Usance Term (days)</TableCell>
            <TableCell align="right">Latest ShipmentDate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tutorials?.sort((a,b) => b.lcRefId - a.lcRefId).map((tutorials,index) => (
            <TableRow
              key={index}
              sx={{  '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell >{tutorials.lcRefId}</TableCell>
            <TableCell>
            <Link to={"/lc/update/" + tutorials.lcRefId}>
              <Button variant="contained" >update</Button>
            </Link>
            
            </TableCell>
            <TableCell >
              <button className='btn btn-danger'  onClick={() =>{deleteRow(tutorials.lcRefId)}}>Delete</button>
            </TableCell>
            <TableCell align="right">{tutorials.exporter}</TableCell>
            <TableCell align="right">{tutorials.currency.code + ' ' + tutorials.amount.toLocaleString()}</TableCell>
            <TableCell align="right">{tutorials.portOfDischarge}</TableCell>
            <TableCell align="right">{tutorials.portOfLoading}</TableCell>
            <TableCell align="right">{String(tutorials.lcExpiryDate)}</TableCell>
            <TableCell align="right">{tutorials.incoTerm}</TableCell>
            {/* <TableCell align="right">{String(tutorials.ptStatus)}</TableCell> */}
            <TableCell align="right">{tutorials.vesselName + ' - ' + tutorials.vesselIMO}</TableCell>
            <TableCell align="right">{tutorials.goodsDescription}</TableCell>
            <TableCell align="right">{tutorials.sightOrUsance}</TableCell>
            <TableCell align="right">{tutorials.usanceTermInDays}</TableCell>
            <TableCell align="right">{tutorials.latestShipmentDate}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default LCList;