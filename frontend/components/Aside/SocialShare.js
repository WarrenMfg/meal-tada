import React from 'react';
import twitter from '../../images/twitter.png';
import facebook from '../../images/facebook.png';
import '../styles/SocialShare.css';

function SocialShare() {
  return (
    <div className='social-share mb-3'>
      <h2 className='text-center'>Share Recipe</h2>
      <div className='d-flex justify-content-center social-share-flex-container'>
        {/* Twitter */}
        <a
          href='https://twitter.com/share?ref_src=twsrc%5Etfw'
          className='twitter-share-button'
          data-size='large'
          data-show-count='false'
        >
          <img src={twitter} />
        </a>
        <script
          async
          src='https://platform.twitter.com/widgets.js'
          charSet='utf-8'
        ></script>
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
            <img src={facebook} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default SocialShare;