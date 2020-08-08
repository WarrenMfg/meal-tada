import React from 'react';

function Aside() {
  return (
    <div className='col-12 col-lg-3'>
      <aside>
        <div className='search-container' style='margin-top: 0;'>
          <input type='text' className='search-input' name='search-bar' placeholder='Search...' />
          <button className='btn btn-light search-btn' type='button'>
            <i className='fa fa-search' />
          </button>
        </div>
        <div>
          <h2 className='text-center' style='font-size: 1.5em;'>
            Top Recipes
          </h2>
          <ul className='list-unstyled top-recipes mt-3'>
            <li style='padding: 1rem;background-color: #ebebeb;border-bottom: 1px solid #b1b1b1 ;'>
              <span className='pr-2'>1</span>
              <span>Garlic Aoli</span>
            </li>
            <li style='padding: 1rem;background-color: #ebebeb;border-bottom: 1px solid #b1b1b1 ;'>
              <span className='pr-2'>2</span>
              <span>Chicken Tacos</span>
            </li>
            <li style='padding: 1rem;background-color: #ebebeb;border-bottom: 1px solid #b1b1b1 ;'>
              <span className='pr-2'>3</span>
              <span>Greek Salad</span>
            </li>
            <li style='padding: 1rem;background-color: #ebebeb;border-bottom: 1px solid #b1b1b1 ;'>
              <span className='pr-2'>4</span>
              <span>Summer Pasta Salad</span>
            </li>
            <li style='padding: 1rem;background-color: #ebebeb;'>
              <span className='pr-2'>5</span>
              <span>Immunity Smoothie</span>
            </li>
          </ul>
        </div>
        <div>
          <h2 className='text-center mt-5' style='font-size: 1.5em;'>
            Summer Smoothies
          </h2>
          <ul className='list-unstyled top-recipes mt-3'>
            <li style='padding: 1rem;background-color: #ebebeb;border-bottom: 1px solid #b1b1b1 ;'>
              <span className='pr-2'>1</span>
              <span>Immunity Charger</span>
            </li>
            <li style='padding: 1rem;background-color: #ebebeb;border-bottom: 1px solid #b1b1b1 ;'>
              <span className='pr-2'>2</span>
              <span>Protein Power</span>
            </li>
            <li style='padding: 1rem;background-color: #ebebeb;border-bottom: 1px solid #b1b1b1 ;'>
              <span className='pr-2'>3</span>
              <span>Candy Crush</span>
            </li>
            <li style='padding: 1rem;background-color: #ebebeb;border-bottom: 1px solid #b1b1b1 ;'>
              <span className='pr-2'>4</span>
              <span>Banana Boat</span>
            </li>
            <li style='padding: 1rem;background-color: #ebebeb;'>
              <span className='pr-2'>5</span>
              <span>Green Goddess</span>
            </li>
          </ul>
        </div>
        <div>
          <h2 className='text-center mt-5' style='font-size: 1.5em;'>
            Most Shared
          </h2>
          <ul className='list-unstyled top-recipes mt-3'>
            <li style='padding: 1rem;background-color: #ebebeb;border-bottom: 1px solid #b1b1b1 ;'>
              <span className='pr-2'>1</span>
              <span>Taco Salad</span>
            </li>
            <li style='padding: 1rem;background-color: #ebebeb;border-bottom: 1px solid #b1b1b1 ;'>
              <span className='pr-2'>2</span>
              <span>Cranberry Cookies</span>
            </li>
            <li style='padding: 1rem;background-color: #ebebeb;border-bottom: 1px solid #b1b1b1 ;'>
              <span className='pr-2'>3</span>
              <span>PB&amp;J Oatmeal</span>
            </li>
            <li style='padding: 1rem;background-color: #ebebeb;border-bottom: 1px solid #b1b1b1 ;'>
              <span className='pr-2'>4</span>
              <span>Pork Tenderloin</span>
            </li>
            <li style='padding: 1rem;background-color: #ebebeb;'>
              <span className='pr-2'>5</span>
              <span>Greek Faro Salad</span>
            </li>
          </ul>
        </div>
        <div>
          <h2 className='text-center mt-5' style='font-size: 1.5em;'>
            20 Minute Meals
          </h2>
          <ul className='list-unstyled top-recipes mt-3'>
            <li style='padding: 1rem;background-color: #ebebeb;border-bottom: 1px solid #b1b1b1 ;'>
              <span className='pr-2'>1</span>
              <span>Roasted Veggies</span>
            </li>
            <li style='padding: 1rem;background-color: #ebebeb;border-bottom: 1px solid #b1b1b1 ;'>
              <span className='pr-2'>2</span>
              <span>Tater Tot Nachos</span>
            </li>
            <li style='padding: 1rem;background-color: #ebebeb;border-bottom: 1px solid #b1b1b1 ;'>
              <span className='pr-2'>3</span>
              <span>Breakfast Burritos</span>
            </li>
            <li style='padding: 1rem;background-color: #ebebeb;border-bottom: 1px solid #b1b1b1 ;'>
              <span className='pr-2'>4</span>
              <span>Hummus Pizza</span>
            </li>
            <li style='padding: 1rem;background-color: #ebebeb;'>
              <span className='pr-2'>5</span>
              <span>Steak &amp; Cheese Subs</span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Aside;
