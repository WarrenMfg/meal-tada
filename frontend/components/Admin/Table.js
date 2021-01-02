import React from 'react';
import PropTypes from 'prop-types';
import './styles/Table.css';

function Table({ title, rows, handleClickRow, className }) {
  return (
    <table
      id='example'
      className='table table-striped border'
      cellSpacing='0'
      width='100%'
    >
      <thead className='shadow-sm'>
        <tr>
          <th className='border-0'>{title}</th>
        </tr>
      </thead>
      <tbody className={className}>
        {rows.map(row => (
          <tr key={row._id} id={row._id} onClick={handleClickRow}>
            <td>{row.title || row.ingredient || row.idea}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.defaultProps = {
  className: ''
};

Table.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  handleClickRow: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default Table;
