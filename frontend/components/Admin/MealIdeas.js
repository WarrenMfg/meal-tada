import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import FilterAndSort from './FilterAndSort';
import Table from './Table';
import Modal from './Modal';
import {
  clearMealIdeaModal,
  setModalMealIdea,
  updateMealIdeaProperty
} from '../../actions/adminMealIdeasActions';
import {
  fetchAdminGetMealIdeas,
  fetchAdminUpsertMealIdea,
  fetchAdminDeleteMealIdea
} from '../../api/adminFetch';
import './styles/MealIdeas.css';

function MealIdeas({ state }) {
  const {
    admin: {
      adminUser,
      adminMealIdeasResults,
      adminMealIdeasFilter,
      adminMealIdeasFilteredResults
    },
    adminMealIdeas: { isLoadingMealIdeas, isFiltering, ...mealIdea },
    dispatch
  } = state;

  const { idea, notes, ...modalMealIdea } = mealIdea;

  const modal = useRef(null);
  useEffect(() => {
    const jQ = new Function('return $')();
    modal.current = jQ('#modal');
  }, []);

  useEffect(() => {
    if (Object.keys(adminUser).length) {
      dispatch(fetchAdminGetMealIdeas);
    }
  }, [adminUser]);

  useEffect(() => {
    if (modalMealIdea._id) {
      modal.current.modal('show');
    } else {
      modal.current.modal('hide');
    }
  }, [modalMealIdea]);

  const handleInputChange = (key, value) => {
    dispatch(updateMealIdeaProperty({ key, value }));
  };

  const handleClickRow = ({ target }) => {
    const id = target.closest('tr').id;
    const clicked = adminMealIdeasResults.find(idea => idea._id === id);
    const { idea: modalIdea, notes: modalNotes, ...restOfClicked } = clicked;
    dispatch(
      setModalMealIdea({
        modalIdea,
        modalNotes,
        ...restOfClicked
      })
    );
  };

  const handleDelete = e => {
    if (
      confirm(
        `Are you sure you want to delete ${e.target.previousElementSibling.innerText}`
      )
    ) {
      const _id = e.target.closest('tr').id;
      dispatch(fetchAdminDeleteMealIdea, _id);
    }
    e.stopPropagation();
  };

  const handleUpsertMealIdea = e => {
    if (modalMealIdea._id && !modalMealIdea.modalIdea.trim()) return;
    if (!modalMealIdea._id && !idea.trim()) return;

    e.preventDefault();

    if (modalMealIdea._id) {
      const {
        modalIdea: idea,
        modalNotes: notes,
        ...restOfModalMealIdea
      } = modalMealIdea;
      dispatch(
        fetchAdminUpsertMealIdea,
        {
          idea,
          notes,
          ...restOfModalMealIdea
        },
        false
      );
    } else {
      dispatch(fetchAdminUpsertMealIdea, { idea, notes }, true);
    }
  };

  return (
    <div className='tab-pane' role='tabpanel' id='tab-3'>
      <h2 className='text-center'>Meal Ideas</h2>

      <form className='mb-5' onSubmit={e => e.preventDefault()}>
        <div className='form-group mb-3'>
          <label>Idea</label>
          <input
            className='form-control'
            type='text'
            name='idea'
            placeholder='Idea'
            value={idea}
            onChange={({ target }) =>
              handleInputChange(target.name, target.value)
            }
          />
        </div>
        <div className='form-group mb-4'>
          <label>Notes</label>
          <textarea
            className='form-control'
            name='notes'
            placeholder='Notes'
            value={notes}
            onChange={({ target }) =>
              handleInputChange(target.name, target.value)
            }
          ></textarea>
        </div>
        <button
          className='btn btn-primary btn-block'
          type='button'
          onClick={handleUpsertMealIdea}
        >
          Submit
        </button>
      </form>

      {isLoadingMealIdeas ? (
        <Loading />
      ) : (
        <>
          <FilterAndSort state={state} />

          {isFiltering ? (
            <Loading />
          ) : adminMealIdeasFilter &&
            adminMealIdeasFilteredResults.length === 0 ? (
            <div className='p-5 no-filtered-results'>
              <h2 className='text-center'>Think of some more ideas! 🤓</h2>
            </div>
          ) : (
            <Table
              title='Ideas'
              rows={
                adminMealIdeasFilter
                  ? adminMealIdeasFilteredResults
                  : adminMealIdeasResults
              }
              handleClickRow={handleClickRow}
              className='ideas'
              handleDelete={handleDelete}
            />
          )}
        </>
      )}

      <Modal
        idea={modalMealIdea.modalIdea}
        notes={modalMealIdea.modalNotes}
        handleInputChange={handleInputChange}
        handleCancel={() => dispatch(clearMealIdeaModal())}
        handleUpsertMealIdea={handleUpsertMealIdea}
      />
    </div>
  );
}

MealIdeas.propTypes = {
  state: PropTypes.object.isRequired
};

export default MealIdeas;
