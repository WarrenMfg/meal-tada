import React from 'react';
import withGlobalStore from '../../store/withGlobalStore.js';
import twitterPNG from '../../images/twitter.png';
import facebookPNG from '../../images/facebook.png';
import instagramPNG from '../../images/instagram.png';
import pinterestPNG from '../../images/pinterest.png';
import PropTypes from 'prop-types';
import '../styles/SocialShare.css';

function SocialShare({ state }) {
  const {
    recipes: {
      currentRecipe: { instagram, cardAndHeroImage, title }
    }
  } = state;

  return (
    <div className='social-share mb-3'>
      <h2 className='text-center'>Share Recipe</h2>
      <div className='d-flex justify-content-center social-share-flex-container'>
        {/* Instagram */}
        <a
          href={`https://www.instagram.com/p/${instagram}/?utm_source=ig_embed`}
          rel='noreferrer'
          target='_blank'
        >
          <img src={instagramPNG} />
        </a>

        {/* Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
          rel='noreferrer'
          target='_blank'
        >
          <img src={twitterPNG} />
        </a>

        {/* Facebook */}
        <div id='fb-root'></div>
        <script
          async
          defer
          crossOrigin='anonymous'
          src='https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v8.0'
          nonce='ExDrEfi2'
        ></script>
        <div
          className='fb-share-button'
          data-href={window.location.href}
          data-layout='button'
          data-size='large'
        >
          <a
            target='_blank'
            rel='noreferrer'
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )}`}
            className='fb-xfbml-parse-ignore'
          >
            <img src={facebookPNG} />
          </a>
        </div>

        {/* Pinterest */}
        <script
          type='text/javascript'
          async
          defer
          src='//assets.pinterest.com/js/pinit.js'
          data-pin-error
        ></script>
        <a
          href={`https://www.pinterest.com/pin/create/button/?url=${window.location.href}&media=${cardAndHeroImage}.jpg&description=${title}`}
          target='_blank'
          rel='noreferrer'
          data-pin-custom='true'
          data-pin-do='buttonPin'
        >
          <img src={pinterestPNG} />
        </a>
      </div>
    </div>
  );
}

SocialShare.propTypes = {
  state: PropTypes.object.isRequired
};

export default withGlobalStore(SocialShare);
