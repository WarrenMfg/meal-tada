export const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json'
  };

  const token = sessionStorage.getItem('admin');
  if (token) {
    headers['Authorization'] = token;
  }

  return headers;
};

export const ingredientsToString = ingredients => {
  let str = '';
  for (let i = 0; i < ingredients.length; i += 2) {
    str += `${ingredients[i]}: ${ingredients[i + 1] || ''}`;
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

  // title
  validated.title = recipe.title.trim() || 'WIP';
  if (isEmpty(validated.title) || validated.title === 'WIP')
    errors.push('title');

  // slug
  validated.slug = recipe.slug || 'wip'; // already formatted on title entry

  // subtitle
  validated.subtitle = recipe.subtitle.trim();
  if (isEmpty(validated.subtitle)) errors.push('subtitle');

  // cardAndHeroImage
  const aws = `https://meal-tada.s3.amazonaws.com/${validated.slug}/`;
  validated.cardAndHeroImage = validated.slug ? aws + recipe.slug : '';

  // categories
  validated.categories = recipe.categories.slice();
  if (isEmpty(validated.categories)) errors.push('categories');

  // ingredients
  validated.ingredients = ingredientsToArray(recipe.ingredients.trim());
  if (isEmpty(validated.ingredients)) errors.push('ingredients');

  // time
  validated.time = {
    prep: recipe.prepTime && parseInt(recipe.prepTime, 10),
    cook: recipe.cookTime && parseInt(recipe.cookTime, 10)
  };
  if (isEmpty(validated.time.prep)) errors.push('prepTime');
  if (isEmpty(validated.time.cook)) errors.push('cookTime');

  // servings
  validated.servings = [recipe.servings0, recipe.servings1];
  if (isEmpty(validated.servings[0])) {
    errors.push('servings0');
  }
  if (isEmpty(validated.servings[1])) {
    errors.push('servings1');
  }
  if (errors.length && !errors[errors.length - 1].includes('servings')) {
    validated.servings = validated.servings.map(serving =>
      Math.abs(parseInt(serving, 10))
    );
    if (validated.servings.includes(NaN)) errors.push('servings');
  }

  // summary
  validated.summary = recipe.summary.trim();
  if (isEmpty(validated.summary)) errors.push('summary');

  // instagram
  validated.instagram = recipe.instagram.trim();
  if (isEmpty(validated.instagram)) errors.push('instagram');

  // isPublished
  // some older recipes don't have isPublished field; this corrects that
  // eslint-disable-next-line no-prototype-builtins
  validated.isPublished = recipe.hasOwnProperty('isPublished')
    ? recipe.isPublished
    : false;

  // directions
  // if no errors and wants to publish, make urls
  validated.directions = recipe.directions
    .trim()
    .split('\n')
    .reduce((acc, cur, i, arr) => {
      if (!cur.trim()) return acc;

      let modified = cur.trim();

      if (!errors.length && validated.isPublished) {
        // if title is ok, then slug is ok; and if '/image', then make url
        const isImage = modified.includes('/image');
        if (isImage && i === arr.length - 1) {
          modified = 'tada ' + aws + modified.split('/image')[1].trim();
        } else if (isImage) {
          modified = aws + modified.split('/image')[1].trim();
        }
      }

      // push direction or unconcatenated /image
      acc.push(modified);
      return acc;
    }, []);
  if (isEmpty(validated.directions)) errors.push('directions');

  // return result
  if (recipe.isPublished && errors.length) {
    return errors;
  } else {
    return validated;
  }
};
