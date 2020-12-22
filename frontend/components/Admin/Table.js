import React from 'react';
import PropTypes from 'prop-types';

function Table({ title, rows, handleClickRow }) {
  return (
    <table
      id='example'
      className='table table-striped table-bordered'
      cellSpacing='0'
      width='100%'
    >
      <thead>
        <tr>
          <th>{title}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row._id} id={row._id} onClick={handleClickRow}>
            <td>{row.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  handleClickRow: PropTypes.func.isRequired
};

export default Table;
