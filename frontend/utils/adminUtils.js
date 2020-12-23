export const ingredientsToString = ingredients => {
  let str = '';
  for (let i = 0; i < ingredients.length; i += 2) {
    str += `${ingredients[i]}: ${ingredients[i + 1]}\n`;
  }

  return str;
};

const ingredientsToArray = ingredients => {
  let arr = [];
  if (!ingredients.length) return arr;

  const split = ingredients.split('\n');
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
  if (recipe._id) validated._id = recipe._id;
  if (recipe.createdAt) validated.createdAt = recipe.createdAt;

  validated.title = recipe.title.trim();
  if (isEmpty(validated.title)) errors.push('title');

  validated.slug = recipe.slug; //.toLowerCase().trim();
  // if (isEmpty(validated.slug)) errors.push('slug');

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

  validated.servings = recipe.servings.trim().length
    ? recipe.servings.trim().split(' to ')
    : [];
  if (isEmpty(validated.servings)) errors.push('servings');
  else
    validated.servings = validated.servings.map(serving =>
      parseInt(serving, 10)
    );

  validated.summary = recipe.summary.trim();
  if (isEmpty(validated.summary)) errors.push('summary');

  validated.directions = recipe.directions
    .trim()
    .split('\n')
    .reduce((acc, cur) => {
      if (!cur.trim()) return acc;
      acc.push(cur.trim());
      return acc;
    }, []);
  if (isEmpty(validated.directions)) errors.push('directions');

  validated.instagram = recipe.instagram.trim();

  // eslint-disable-next-line no-prototype-builtins
  validated.isPublished = recipe.hasOwnProperty('isPublished')
    ? recipe.isPublished
    : false;
  if (validated.directions.some(dir => dir.includes('/image')))
    validated.isPublished = false;

  if (errors.length) {
    return errors;
  } else {
    return validated;
  }
};
