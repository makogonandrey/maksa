import React from 'react';
import './styles.css';

const DataTable = ({ data }) => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Path</th>
          <th>Type</th>
          <th>Value Options</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.path}</td>
            <td>{item.type}</td>
            <td>
              {item.valueOptions.length > 0
                ? item.valueOptions.join(', ')
                : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;