function validateRecipe(recipe) {
  const result = Object.keys(recipe).reduce((acc, key) => {
    acc[key] = undefined;
    return acc;
  }, {});

  console.log(result);
}

export default validateRecipe;
