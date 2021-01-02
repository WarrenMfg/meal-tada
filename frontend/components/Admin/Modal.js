import React from 'react';
import PropTypes from 'prop-types';

function Modal({
  idea,
  notes,
  handleInputChange,
  handleCancel,
  handleUpsertMealIdea
}) {
  return (
    <div
      className='modal fade'
      id='modal'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Meal Idea
            </h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <form onSubmit={e => e.preventDefault()}>
              <div className='form-group'>
                <label className='col-form-label'>Idea</label>
                <input
                  type='text'
                  className='form-control'
                  name='modalIdea'
                  value={idea}
                  onChange={({ target }) =>
                    handleInputChange(target.name, target.value)
                  }
                />
              </div>
              <div className='form-group'>
                <label className='col-form-label'>Notes</label>
                <textarea
                  className='form-control'
                  name='modalNotes'
                  value={notes}
                  onChange={({ target }) =>
                    handleInputChange(target.name, target.value)
                  }
                />
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-danger'
              data-dismiss='modal'
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={handleUpsertMealIdea}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  idea: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleUpsertMealIdea: PropTypes.func.isRequired
};

export default Modal;
