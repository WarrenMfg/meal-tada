import React, { useState } from 'react';
import PropTypes from 'prop-types';
import validateRecipe from '../../utils/validateRecipe';

function Form({ activeRecipe, dispatch }) {
  console.log('Form:', activeRecipe);
  // state
  const [title, setTitle] = useState(activeRecipe.title || '');
  const [slug, setSlug] = useState(activeRecipe.slug || '');
  const [subtitle, setSubtitle] = useState(activeRecipe.subtitle || '');
  const [categories, setCategories] = useState(activeRecipe.categories || []);
  const [ingredients, setIngredients] = useState(
    (activeRecipe.ingredients &&
      ingredientsToString(activeRecipe.ingredients)) ||
      ''
  );
  const [prepTime, setPrepTime] = useState(activeRecipe.time?.prep || '');
  const [cookTime, setCookTime] = useState(activeRecipe.time?.cook || '');
  const [servings, setServings] = useState(
    activeRecipe.servings?.join(' to ') || ''
  );
  const [summary, setSummary] = useState(activeRecipe.summary || []);
  const [directions, setDirections] = useState(
    activeRecipe.directions?.join('\n\n') || ''
  );
  const [instagram, setInstagram] = useState(activeRecipe.instagram || '');
  const [isPublished, setIsPublished] = useState(
    activeRecipe.isPublished || false
  );
  // select element helper
  const handleSetCategories = e => {
    if (!e.metaKey) return;
    const i = categories.indexOf(e.target.value);
    if (i >= 0) {
      setCategories([...categories.splice(0, i), ...categories.splice(i + 1)]);
    } else {
      setCategories([...categories, e.target.value]);
    }
  };
  // update recipe
  const handleUpdateRecipe = e => {
    e.preventDefault();

    const recipe = Object.assign({}, activeRecipe, {
      title,
      slug,
      subtitle,
      categories,
      ingredients,
      time: {
        prep: prepTime,
        cook: cookTime
      },
      servings,
      summary,
      directions,
      instagram,
      isPublished
    });

    const errors = validateRecipe(recipe);
    if (errors) {
      // show toasts
    } else {
      // dispatch upsert fetch (update activeRecipe in fetch handler)
    }
  };

  // submit recipe
  const handleSubmitRecipe = e => {
    e.preventDefault();

    const errors = validateRecipe();
    if (errors) {
      // show toasts
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
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className='form-group'>
        <label>Slug</label>
        <input
          type='text'
          className='form-control'
          placeholder='Slug'
          value={slug}
          onChange={({ target }) => setSlug(target.value)}
        />
      </div>
      <div className='form-group'>
        <label>Subtitle</label>
        <input
          type='text'
          className='form-control'
          placeholder='Subtitle'
          value={subtitle}
          onChange={({ target }) => setSubtitle(target.value)}
        />
      </div>
      <div className='form-group' multiple=''>
        <label>Categories</label>
        <small className='d-block mb-1'>Cmd/Ctrl + Click</small>
        <select
          className='form-control'
          multiple={true}
          value={categories}
          onChange={() => {}}
          onClick={handleSetCategories}
          size={6}
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
          value={ingredients}
          onChange={({ target }) => setIngredients(target.value)}
          rows={5}
        />
      </div>
      <div className='d-flex flex-column flex-sm-row mb-3'>
        <div className='flex-grow-1'>
          <label>Prep Time</label>
          <input
            type='number'
            className='form-control w-75'
            placeholder='Prep Time'
            value={prepTime}
            onChange={({ target }) => setPrepTime(target.value)}
          />
        </div>
        <div className='flex-grow-1'>
          <label>Cook Time</label>
          <input
            type='number'
            className='form-control w-75'
            placeholder='Cook Time'
            value={cookTime}
            onChange={({ target }) => setCookTime(target.value)}
          />
        </div>
        <div className='flex-grow-1'>
          <label>Servings</label>
          <input
            type='text'
            className='form-control w-75'
            placeholder='2 to 4'
            value={servings}
            onChange={({ target }) => setServings(target.value)}
          />
        </div>
      </div>
      <div className='form-group'>
        <label>Summary</label>
        <textarea
          className='form-control'
          placeholder='Summary'
          value={summary}
          onChange={({ target }) => setSummary(target.value)}
          rows={5}
        />
      </div>
      <div className='form-group'>
        <label>Directions</label>
        <textarea
          className='form-control'
          placeholder='Directions'
          value={directions}
          onChange={({ target }) => setDirections(target.value)}
          rows={10}
        />
      </div>
      <div className='form-group'>
        <label>Instagram</label>
        <input
          type='text'
          className='form-control'
          placeholder='Instagram'
          value={instagram}
          onChange={({ target }) => setInstagram(target.value)}
        />
      </div>
      <div className='custom-control custom-switch d-flex justify-content-center align-items-center'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='publish'
          value={isPublished}
          onChange={() => setIsPublished(!isPublished)}
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

// HELPER FUNCTIONS

function ingredientsToString(ingredients) {
  let str = '';
  for (let i = 0; i < ingredients.length; i += 2) {
    str += `${ingredients[i]}: ${ingredients[i + 1]}\n`;
  }

  return str;
}
