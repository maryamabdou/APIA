import React from 'react';

const HistoryTable = ({ responseData, error }) => {
  return (
    <div>
      {error && <div>Error: {error.message}</div>}
      {responseData && (
        <table>
          <thead>
            <tr>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{responseData.message}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryTable;
