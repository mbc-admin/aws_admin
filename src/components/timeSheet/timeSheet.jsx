
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@material-ui/core';
import './timeSheet.css';

const TimeSheet = ({ data }) => {
  return (
    <TableContainer component={Paper} className="timeScrollableTable">
      <Table>
        <TableHead className="tableHead">
          <TableRow>
            <TableCell >Lunes</TableCell>
            <TableCell >Martes</TableCell>
            <TableCell >Miercoles</TableCell>
            <TableCell >Jueves</TableCell>
            <TableCell >Viernes</TableCell>
            <TableCell >Sabado</TableCell>
            <TableCell >Domingo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {data.map((data) => ( */}
            <TableRow>
              <TableCell className='tableTd'>
              --
              </TableCell>
              <TableCell  className='tableTd'>--</TableCell>
              <TableCell  className='tableTd'>--</TableCell>
              <TableCell  className='tableTd'>--</TableCell>
              <TableCell  className='tableTd'>--</TableCell>
              <TableCell  className='tableTd'>--</TableCell>
              <TableCell  className='tableTd'>--</TableCell>
            </TableRow>
          {/* ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TimeSheet;
