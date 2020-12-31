/* eslint-disable no-useless-catch */

export const getGeneralAndIntialRecipes = async db => {
  try {
    // get general
    const general = await db.collection('general').findOne({ meta: true });
    general.topFives = await getTopFives(db, general.topFives);

    // get initial recipes
    const initialRecipes = await db
      .collection('recipes')
      .aggregate([
        { $match: { isPublished: true } },
        { $sort: { createdAt: -1 } },
        { $limit: 20 }
      ])
      .toArray();

    return { general, initialRecipes };
  } catch (err) {
    throw err;
  }
};

export const getTopFives = async (db, topFives) => {
  try {
    const aggregatedTopFives = [];
    for (let i = 0; i < topFives.length; i++) {
      switch (topFives[i]) {
        case 'Popular':
          aggregatedTopFives.push({
            title: 'Popular',
            recipes: await getPopular(db)
          });
          break;
        case 'Quick Meals':
          aggregatedTopFives.push({
            title: 'Quick Meals',
            recipes: await getQuickMeals(db)
          });
          break;
        case 'Simple Sides':
          aggregatedTopFives.push({
            title: 'Simple Sides',
            recipes: await getSimpleSides(db)
          });
          break;
        case 'Large Meals':
          aggregatedTopFives.push({
            title: 'Large Meals',
            recipes: await getLargeMeals(db)
          });
          break;
        case 'Latest':
          aggregatedTopFives.push({
            title: 'Latest',
            recipes: await getLatest(db)
          });
          break;
        default:
          aggregatedTopFives.push({
            title: 'Coming Soon',
            recipes: [
              {
                title: 'Apricot Chicken',
                slug: '-',
                cardAndHeroImage: 'https://via.placeholder.com/1000'
              }
            ]
          });
      }
    }

    return aggregatedTopFives;
  } catch (err) {
    throw err;
  }
};

const getTopFiveData = recipe => ({
  title: recipe.title,
  slug: recipe.slug,
  cardAndHeroImage: recipe.cardAndHeroImage
});

const getPopular = async db => {
  try {
    return await db
      .collection('recipes')
      .aggregate([
        { $match: { isPublished: true } },
        { $sort: { views: -1 } },
        { $limit: 5 }
      ])
      .toArray()
      .then(recipes => recipes.map(getTopFiveData));
  } catch (err) {
    throw err;
  }
};

const getQuickMeals = async db => {
  try {
    return await db
      .collection('recipes')
      .aggregate([
        {
          $match: {
            isPublished: true,
            $expr: {
              $lte: [
                {
                  $add: ['$time.prep', '$time.cook']
                },
                30
              ]
            },
            categories: { $in: ['Breakfast', 'Lunch', 'Dinner'] }
          }
        },
        { $sort: { views: -1 } },
        { $limit: 5 }
      ])
      .toArray()
      .then(recipes => recipes.map(getTopFiveData));
  } catch (err) {
    throw err;
  }
};

const getSimpleSides = async db => {
  try {
    return await db
      .collection('recipes')
      .aggregate([
        { $match: { isPublished: true, categories: { $in: ['Sides'] } } },
        { $sort: { views: -1 } },
        { $limit: 5 }
      ])
      .toArray()
      .then(recipes => recipes.map(getTopFiveData));
  } catch (err) {
    throw err;
  }
};

const getLargeMeals = async db => {
  try {
    return await db
      .collection('recipes')
      .aggregate([
        {
          $match: {
            isPublished: true,
            $or: [
              {
                'servings.0': { $gte: 7 }
              },
              {
                'servings.1': { $gte: 7 }
              }
            ],
            categories: {
              $in: ['Breakfast', 'Lunch', 'Dinner']
            }
          }
        },
        { $sort: { views: -1 } },
        { $limit: 5 }
      ])
      .toArray()
      .then(recipes => recipes.map(getTopFiveData));
  } catch (err) {
    throw err;
  }
};

const getLatest = async db => {
  try {
    return await db
      .collection('recipes')
      .aggregate([
        { $match: { isPublished: true } },
        { $sort: { createdAt: -1 } },
        { $limit: 5 }
      ])
      .toArray()
      .then(recipes => recipes.map(getTopFiveData));
  } catch (err) {
    throw err;
  }
};
