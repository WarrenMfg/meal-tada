import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateProperty } from '../../actions/adminEditorActions';
import { validateRecipe } from '../../utils/adminUtils';

function Form({ activeRecipe, dispatch }) {
  let {
    title,
    subtitle,
    categories,
    ingredients,
    prepTime,
    cookTime,
    servings,
    summary,
    directions,
    instagram,
    isPublished
  } = activeRecipe;

  // input change handler
  const handleInputChange = (key, value) => {
    dispatch(updateProperty({ key, value }));
  };

  // select element helper
  const handleSetCategories = e => {
    if (!e.metaKey) return; // TODO - what else is metaKey?
    const i = categories.indexOf(e.target.value);
    if (i >= 0) {
      handleInputChange('categories', [
        ...categories.splice(0, i),
        ...categories.splice(i + 1)
      ]);
    } else {
      handleInputChange('categories', [...categories, e.target.value]);
    }
  };

  // handle errors
  const handleErrors = errors => {
    errors.forEach(name => {
      document.querySelector(`[name=${name}]`).classList.add('is-invalid');
      window.scrollTo(0, 0);
    });
  };

  // update recipe
  const handleUpdateRecipe = e => {
    e.preventDefault();

    const validationResponse = validateRecipe(activeRecipe);
    if (Array.isArray(validationResponse)) {
      handleErrors(validationResponse);
    } else {
      // dispatch upsert fetch (update activeRecipe in fetch handler)
      console.log(validationResponse);
    }
  };

  // submit recipe
  const handleSubmitRecipe = e => {
    e.preventDefault();

    const validationResponse = validateRecipe(activeRecipe);
    if (Array.isArray(validationResponse)) {
      handleErrors(validationResponse);
    } else {
      // dispatch upsert fetch (clear activeRecipe in fetch handler)
    }
  };

  return (
    <form className='mt-4'>
      <div className='form-group'>
        <label>Title</label>
        <input
          type='text'
          className='form-control'
          placeholder='Title'
          name='title'
          value={title}
          onChange={({ target }) => {
            handleInputChange(target.name, target.value);
            handleInputChange('slug', target.value);
          }}
          onFocus={({ target }) => target.classList.remove('is-invalid')}
        />
      </div>
      <div className='form-group'>
        <label>Slug</label>
        <input
          type='text'
          className='form-control'
          placeholder='Slug'
          value={title.toLowerCase().replace(/\s+/g, '-')}
          disabled
        />
      </div>
      <div className='form-group'>
        <label>Subtitle</label>
        <input
          type='text'
          className='form-control'
          placeholder='Subtitle'
          name='subtitle'
          value={subtitle}
          onChange={({ target }) =>
            handleInputChange(target.name, target.value)
          }
          onFocus={({ target }) => target.classList.remove('is-invalid')}
        />
      </div>
      <div className='form-group' multiple=''>
        <label>Categories</label>
        <small className='d-block mb-1'>Cmd/Ctrl + Click</small>
        <select
          className='form-control'
          multiple={true}
          size={6}
          name='categories'
          value={categories}
          onChange={() => {}}
          onClick={handleSetCategories}
          onFocus={({ target }) => target.classList.remove('is-invalid')}
        >
          <option value='Breakfast'>Breakfast</option>
          <option value='Lunch'>Lunch</option>
          <option value='Dinner'>Dinner</option>
          <option value='Soups'>Soups</option>
          <option value='Salads'>Salads</option>
          <option value='Sandwiches'>Sandwiches</option>
          <option value='Smoothies'>Smoothies</option>
          <option value='Drinks'>Drinks</option>
          <option value='Desserts'>Desserts</option>
          <option value='Snacks'>Snacks</option>
          <option value='Sides'>Sides</option>
          <option value='Misc.'>Misc.</option>
        </select>
      </div>
      <div className='form-group'>
        <label>Ingredients</label>
        <textarea
          className='form-control'
          placeholder='Ingredients'
          rows={5}
          name='ingredients'
          value={ingredients}
          onChange={({ target }) =>
            handleInputChange(target.name, target.value)
          }
          onFocus={({ target }) => target.classList.remove('is-invalid')}
        />
      </div>
      <div className='d-flex flex-column flex-sm-row mb-3'>
        <div className='flex-grow-1'>
          <label>Prep Time</label>
          <input
            type='number'
            className='form-control w-75'
            placeholder='Prep Time'
            name='prepTime'
            value={prepTime}
            onChange={({ target }) =>
              handleInputChange(target.name, target.value)
            }
            onFocus={({ target }) => target.classList.remove('is-invalid')}
          />
        </div>
        <div className='flex-grow-1'>
          <label>Cook Time</label>
          <input
            type='number'
            className='form-control w-75'
            placeholder='Cook Time'
            name='cookTime'
            value={cookTime}
            onChange={({ target }) =>
              handleInputChange(target.name, target.value)
            }
            onFocus={({ target }) => target.classList.remove('is-invalid')}
          />
        </div>
        <div className='flex-grow-1'>
          <label>Servings</label>
          <input
            type='text'
            className='form-control w-75'
            placeholder='2 to 4'
            name='servings'
            value={servings}
            onChange={({ target }) =>
              handleInputChange(target.name, target.value)
            }
            onFocus={({ target }) => target.classList.remove('is-invalid')}
          />
        </div>
      </div>
      <div className='form-group'>
        <label>Summary</label>
        <textarea
          className='form-control'
          placeholder='Summary'
          rows={5}
          name='summary'
          value={summary}
          onChange={({ target }) =>
            handleInputChange(target.name, target.value)
          }
          onFocus={({ target }) => target.classList.remove('is-invalid')}
        />
      </div>
      <div className='form-group'>
        <label>Directions</label>
        <textarea
          className='form-control'
          placeholder='Directions'
          rows={10}
          name='directions'
          value={directions}
          onChange={({ target }) =>
            handleInputChange(target.name, target.value)
          }
          onFocus={({ target }) => target.classList.remove('is-invalid')}
        />
      </div>
      <div className='form-group'>
        <label>Instagram</label>
        <input
          type='text'
          className='form-control'
          placeholder='Instagram'
          name='instagram'
          value={instagram}
          onChange={({ target }) =>
            handleInputChange(target.name, target.value)
          }
        />
      </div>
      <div className='custom-control custom-switch d-flex justify-content-center align-items-center'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='publish'
          name='isPublished'
          value={isPublished}
          onChange={({ target }) =>
            handleInputChange(target.name, target.value)
          }
        />
        <label className='custom-control-label' htmlFor='publish'>
          Publish
        </label>
      </div>
      <div
        className='btn-group mt-3 w-100'
        role='group'
        aria-label='Update or Submit'
      >
        <button
          className='btn btn-info'
          type='button'
          onClick={handleUpdateRecipe}
        >
          Update
        </button>
        <button
          className='btn btn-primary'
          type='button'
          onClick={handleSubmitRecipe}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

Form.propTypes = {
  activeRecipe: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default Form;
