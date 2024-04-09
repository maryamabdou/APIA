import React from 'react';
import './History.css';

const HistoryTable = ({ data }) => {
  if (!data || !data.message || data.message.length === 0) {
    return (
      <div className='card'>
        <p>No History To Display</p>
      </div>
    );
  }

  const displayRows = data.message.slice(0, 30);

  return (
    <div className='tableContainer'>
      <table>
        <thead>
          <tr>
            <th>Time</th> 
            <th>Eye Score</th>
            <th>Face Score</th>
            <th>Answer Score</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
            {displayRows.map((row, index) => (
              <tr key={index}>
                <td>{row[0]}</td>
                <td>{row[2]}</td>
                <td>{row[3]}</td>
                <td>{row[4]}</td>
                <td>{row[5]}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
