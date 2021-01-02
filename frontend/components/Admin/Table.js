import React from 'react';
import PropTypes from 'prop-types';
import './styles/Table.css';

function Table({ title, rows, handleClickRow, className, handleDelete }) {
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
            {title === 'Ideas' ? (
              <td>
                <div>
                  <span>{row.idea}</span>
                  <i className='fas fa-trash-alt' onClick={handleDelete}></i>
                </div>
              </td>
            ) : (
              <td>{row.title || row.ingredient}</td>
            )}
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
  className: PropTypes.string,
  handleDelete: PropTypes.func
};

export default Table;
