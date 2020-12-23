export const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json'
  };

  const token = localStorage.getItem('admin');
  if (token) {
    headers['Authorization'] = token;
  }

  return headers;
};

export const ingredientsToString = ingredients => {
  let str = '';
  for (let i = 0; i < ingredients.length; i += 2) {
    str += `${ingredients[i]}: ${ingredients[i + 1]}`;
    if (i < ingredients.length - 2) {
      str += '\n';
    }
  }
  return str;
};

const ingredientsToArray = ingredients => {
  let arr = [];
  if (!ingredients.length) return arr;

  const split = ingredients.split('\n').filter(val => val.trim());
  for (let i = 0; i < split.length; i++) {
    arr.push(...split[i].split(':').map(el => el.trim()));
  }
  return arr;
};

const isEmpty = val =>
  val === undefined ||
  val === null ||
  (typeof val === 'object' && Object.keys(val).length === 0) ||
  (typeof val === 'string' && val.trim().length === 0);

export const validateRecipe = recipe => {
  const errors = [];

  const validated = {};
  // copy over metadata
  if (recipe._id) validated._id = recipe._id;
  if (recipe.createdAt) validated.createdAt = recipe.createdAt;

  validated.title = recipe.title.trim();
  if (isEmpty(validated.title)) errors.push('title');

  validated.slug = recipe.slug; // already formatted on title entry

  validated.subtitle = recipe.subtitle.trim();
  if (isEmpty(validated.subtitle)) errors.push('subtitle');

  const aws = `https://meal-tada.s3.amazonaws.com/${validated.slug}/`;
  validated.cardAndHeroImage = validated.slug ? aws + recipe.slug : '';

  validated.categories = recipe.categories.slice();
  if (isEmpty(validated.categories)) errors.push('categories');

  validated.ingredients = ingredientsToArray(recipe.ingredients.trim());
  if (isEmpty(validated.ingredients)) errors.push('ingredients');

  validated.time = {
    prep: recipe.prepTime && parseInt(recipe.prepTime, 10),
    cook: recipe.cookTime && parseInt(recipe.cookTime, 10)
  };
  if (isEmpty(validated.time.prep)) errors.push('prepTime');
  if (isEmpty(validated.time.cook)) errors.push('cookTime');

  validated.servings =
    recipe.servings.trim().length && recipe.servings.includes('to')
      ? recipe.servings.trim().split('to')
      : [];
  if (isEmpty(validated.servings)) {
    errors.push('servings');
  } else {
    validated.servings = validated.servings.map(serving =>
      parseInt(serving.trim(), 10)
    );
    if (validated.servings.includes(NaN)) errors.push('servings');
  }

  validated.summary = recipe.summary.trim();
  if (isEmpty(validated.summary)) errors.push('summary');

  validated.directions = recipe.directions
    .trim()
    .split('\n')
    .reduce((acc, cur, i, arr) => {
      if (!cur.trim()) return acc;

      let modified = cur.trim();
      // if title is ok, then slug is ok; and if '/image', then make url
      const isImage = !errors.includes('title') && modified.includes('/image');
      if (isImage && i === arr[arr.length - 1]) {
        modified = 'tada ' + aws + modified.split('/image')[1].trim();
      } else if (isImage) {
        modified = aws + modified.split('/image')[1].trim();
      }
      // push direction or unconcatenated /image
      acc.push(modified);
      return acc;
    }, []);
  if (isEmpty(validated.directions)) errors.push('directions');

  validated.instagram = recipe.instagram.trim();

  // some older recipes don't have isPublished field; this corrects that
  // eslint-disable-next-line no-prototype-builtins
  validated.isPublished = recipe.hasOwnProperty('isPublished')
    ? recipe.isPublished
    : false;

  // overwrite isPublished if any of these conditions are met:
  // if directions has unparsed '/image' lines (due to no title), then do not publish
  if (validated.directions.some(dir => dir.includes('/image'))) {
    validated.isPublished = false;

    // if instagram has not been published, then don't publish recipe
  } else if (!validated.instagram) {
    validated.isPublished = false;
  }

  if (errors.length) {
    return errors;
  } else {
    return validated;
  }
};
