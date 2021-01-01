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
        { $limit: parseInt(process.env.RECIPE_BATCH_LIMIT, 10) }
      ])
      .toArray();

    return { general, initialRecipes };
  } catch (err) {
    throw err;
  }
};

export const getTopFives = (db, topFives) => {
  try {
    const facet = {};
    let topFive;
    for (let i = 0; i < topFives.length; i++) {
      topFive = topFives[i];
      switch (topFive) {
        case 'Popular':
          facet[topFive] = [
            { $match: { isPublished: true } },
            { $sort: { views: -1 } }
          ];
          break;
        case 'Quick Meals':
          facet[topFive] = [
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
            { $sort: { views: -1 } }
          ];
          break;
        case 'Simple Sides':
          facet[topFive] = [
            { $match: { isPublished: true, categories: { $in: ['Sides'] } } },
            { $sort: { views: -1 } }
          ];
          break;
        case 'Large Meals':
          facet[topFive] = [
            {
              $match: {
                isPublished: true,
                categories: {
                  $in: ['Breakfast', 'Lunch', 'Dinner']
                },
                $expr: {
                  $or: [
                    {
                      $gte: [{ $arrayElemAt: ['$servings', 0] }, 7]
                    },
                    {
                      $gte: [{ $arrayElemAt: ['$servings', 1] }, 7]
                    }
                  ]
                }
              }
            },
            { $sort: { views: -1 } }
          ];
          break;
        case 'Latest':
          facet[topFive] = [
            { $match: { isPublished: true } },
            { $sort: { createdAt: -1 } }
          ];
          break;
      }

      facet[topFive].push(
        { $limit: 5 },
        {
          $project: {
            _id: false,
            title: true,
            slug: true,
            cardAndHeroImage: true
          }
        }
      );
    }

    return db
      .collection('recipes')
      .aggregate([{ $facet: facet }])
      .toArray()
      .then(([topFiveAggResults]) => {
        return Object.keys(topFiveAggResults).map(key => {
          return {
            title: key,
            recipes: topFiveAggResults[key]
          };
        });
      });
  } catch (err) {
    throw err;
  }
};
