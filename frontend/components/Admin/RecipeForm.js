import React from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { updateProperty } from '../../actions/adminEditorActions';
import { setRecipeFormErrors } from '../../actions/adminActions';
import { validateRecipe } from '../../utils/adminUtils';
import { fetchUpsertRecipe } from '../../api/adminFetch';

function RecipeForm({ activeRecipe, dispatch }) {
  let {
    title,
    slug,
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

  const summaryWordCount = summary.trim().length
    ? summary.trim().split(' ').length
    : 0;

  // copy slug handler
  const handleCopySlug = async () => {
    if (!slug) return;
    await navigator.clipboard.writeText(slug);
    toast.success('Slug copied!');
  };

  // go to ingredients
  const handleGoToIngredients = () => {
    document.querySelector('a[href="#tab-2"]').click();
    document
      .querySelector('#notes')
      .scrollIntoView({ block: 'center', behavior: 'smooth' });
  };

  // input change handler
  const handleInputChange = (key, value) => {
    dispatch(updateProperty({ key, value }));
  };

  // select element helper
  const handleSetCategories = e => {
    const keyPress = e.ctrlKey || e.metaKey;
    if (!keyPress) return;

    const i = categories.indexOf(e.target.value);
    if (i >= 0) {
      handleInputChange('categories', [
        ...categories.slice(0, i),
        ...categories.slice(i + 1)
      ]);
    } else {
      handleInputChange('categories', [...categories, e.target.value]);
    }
  };

  // handle errors
  const handleValidationErrors = errors => {
    dispatch(setRecipeFormErrors(errors));
    window.scrollTo(0, 0);
    toast.error('Please fix form errors.');
  };

  // submit recipe
  const handleSubmitRecipe = e => {
    e.preventDefault();

    const validationResponse = validateRecipe(activeRecipe);
    if (Array.isArray(validationResponse)) {
      handleValidationErrors(validationResponse);
    } else {
      dispatch(fetchUpsertRecipe, validationResponse);
    }
  };

  return (
    <form className='mt-5'>
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
            handleInputChange(
              'slug',
              target.value.toLowerCase().replace(/\s+/g, '-').replace(/,/g, '')
            );
          }}
          onFocus={({ target }) => target.classList.remove('is-invalid')}
        />
      </div>
      <div className='form-group'>
        <label>
          Slug{' '}
          <span
            className='ml-2'
            onClick={handleCopySlug}
            role='button'
            title='Copy Slug'
          >
            <i className='fas fa-copy'></i>
          </span>
        </label>
        <input
          type='text'
          className='form-control'
          placeholder='Slug'
          value={slug}
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
        <small className='d-block mb-1'>Ingredient: Quantity</small>
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
        <small className='d-block mb-1'>
          About 60 words. Current word count: {summaryWordCount}
        </small>
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
      <div className='form-group' id='directions'>
        <label>
          Directions{' '}
          <span
            className='ml-2'
            onClick={handleGoToIngredients}
            role='button'
            title='Go to Ingredients'
          >
            <i className='fas fa-shopping-cart'></i>
          </span>
        </label>
        <small className='d-block mb-1'>
          Placeholder for images: &quot;/image descriptive-image-title&quot;
        </small>
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
        <label>Instagram ID</label>
        <input
          type='text'
          className='form-control'
          placeholder='Instagram ID'
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
          checked={isPublished}
          onChange={({ target }) =>
            handleInputChange(target.name, target.checked)
          }
        />
        <label className='custom-control-label' htmlFor='publish'>
          Publish
        </label>
      </div>

      <button
        className='btn btn-primary btn-block mt-3'
        type='button'
        onClick={handleSubmitRecipe}
      >
        Submit
      </button>
    </form>
  );
}

RecipeForm.propTypes = {
  activeRecipe: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default RecipeForm;
