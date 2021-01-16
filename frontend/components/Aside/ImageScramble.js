import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Confetti from 'canvas-confetti';
import { fetchImageScramble } from '../../api/fetch';
import {
  clearImageScrambleURLs,
  updateImageScrambleURLs
} from '../../actions/generalActions';
import { setCurrentRecipe } from '../../actions/recipeActions';
import withGlobalStore from '../../store/withGlobalStore';

import PropTypes from 'prop-types';

import '../styles/ImageScramble.css';

function ImageScramble({ state }) {
  const {
    recipes: { currentRecipe },
    general: { topFives, imageScrambleURLs },
    dispatch
  } = state;

  // history
  const history = useHistory();

  // state
  const [recipe, setRecipe] = useState({});
  // counter
  const [count, setCount] = useState(0);
  // x and y offset
  const [offset, setOffset] = useState([]);
  // images
  const [images, setImages] = useState(null);
  // winner
  const [winner, setWinner] = useState(false);

  // refs/callbacks
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const confetti = useCallback(() => {
    return Confetti.create(canvasRef.current);
  }, [canvasRef.current]);
  const countRef = useRef(count);
  const offsetRef = useRef(offset);

  // lifecycle
  useEffect(() => {
    // do-while loop to mitigate landing on random recipe that is same as currentRecipe
    let localRecipe;
    do {
      // get random number for topic
      const randomTopic = Math.floor(Math.random() * topFives.length);
      const randomRecipe = Math.floor(
        Math.random() * topFives[randomTopic].recipes.length
      );
      localRecipe = topFives[randomTopic].recipes[randomRecipe];
    } while (currentRecipe._id === localRecipe._id);
    setRecipe(localRecipe);

    // on mount fetch image scramble
    dispatch(fetchImageScramble, localRecipe.slug);

    // on resize
    const updateCanvasOffsetAndImages = () => {
      // update canvas
      canvasRef.current.width = containerRef.current.clientWidth;
      canvasRef.current.height = containerRef.current.clientHeight;
      // recalculate offset
      setOffset([
        containerRef.current.clientWidth / 3,
        containerRef.current.clientHeight / 3
      ]);
    };
    window.addEventListener('resize', updateCanvasOffsetAndImages);

    // cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasOffsetAndImages);
      dispatch(clearImageScrambleURLs());
    };
  }, []);

  // update images, set offset, add Intersection Observer
  // update confetti and canvasRef width/height
  useEffect(() => {
    if (!images && containerRef.current) {
      setImages([...containerRef.current.children]);
      setOffset([
        containerRef.current.clientWidth / 3,
        containerRef.current.clientHeight / 3
      ]);
    }

    // useLayoutEffect instead?
    if (
      canvasRef.current?.width !== containerRef.current?.clientWidth &&
      canvasRef.current?.height !== containerRef.current?.clientWidth
    ) {
      // update height and width
      canvasRef.current.width = containerRef.current.clientWidth;
      canvasRef.current.height = containerRef.current.clientHeight;
    }
  });

  // add event listeners
  useEffect(() => {
    if (images) {
      addImageEventListeners(images, countRef, setCount);
    }

    if (images && containerRef.current) {
      // define intersection callback (attention getter)
      const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // triple shuffle then update DOM
            const attentionGetter = () => {
              shuffleImages()
                .then(() => shuffleImages())
                .then(() => shuffleImages())
                .finally(() => {
                  // not all images will have moved, thus triggering transitionend;
                  // so remove .move on images that didn't move
                  images.forEach(image => {
                    image.classList.remove('move');
                    image.draggable = true;
                  });
                  // dispatch
                  dispatch(
                    updateImageScrambleURLs(
                      images.map(image => image.dataset.url)
                    )
                  );
                });
            };

            // shuffle button handler
            const shuffleImages = () => {
              // return promise with setTimeout
              return new Promise(resolve => {
                // shuffle
                for (let i = images.length - 1; i > 0; i--) {
                  let j = Math.floor(Math.random() * (i + 1));
                  [images[i], images[j]] = [images[j], images[i]];
                }
                // place in grid and animate
                images.forEach((image, i) =>
                  updateImages(image, i, offsetRef.current, true)
                );
                // resolve
                setTimeout(() => {
                  resolve();
                }, 500);
              });
            };

            attentionGetter();
            observer.unobserve(containerRef.current);
          }
        });
      };

      // create observer
      const observer = new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: '0% 0% -33% 0%',
        threshold: 0
      });

      // observe ref
      observer.observe(containerRef.current);
    }
  }, [images]);

  // update DOM image elements
  useEffect(() => {
    if (offset.length && images) {
      images.forEach((image, i) => updateImages(image, i, offset, false));
    }
    offsetRef.current = offset;
  }, [offset]);

  // update imageScrambleURLs
  useEffect(() => {
    if (count && images) {
      images
        .sort((a, b) => {
          const leftA = parseInt(a.style.left.slice(0, -2), 10);
          const leftB = parseInt(b.style.left.slice(0, -2), 10);
          if (leftA < leftB) return -1;
          else if (leftA > leftB) return 1;
          else return 0;
        })
        .sort((a, b) => {
          const topA = parseInt(a.style.top.slice(0, -2), 10);
          const topB = parseInt(b.style.top.slice(0, -2), 10);
          if (topA < topB) return -1;
          else if (topA > topB) return 1;
          else return 0;
        });
      dispatch(updateImageScrambleURLs(images.map(image => image.dataset.url)));
    }
  }, [count]);

  useEffect(() => {
    // if it's worth it to check if winner
    if (images?.[0]?.dataset.i === '0' && canvasRef.current) {
      // check if winner
      checkWinner(images, canvasRef.current, confetti, setWinner);
    }
  }, [imageScrambleURLs]);

  useEffect(() => {
    if (winner) {
      const div = document.createElement('div');
      div.classList.add('image-scramble-title-card');
      const h5 = document.createElement('h5');
      h5.innerText = recipe.title;
      const button = document.createElement('button');
      button.classList.add('btn', 'btn-outline-primary');
      button.innerText = 'Go to Recipe!';
      div.append(h5, button);

      containerRef.current.append(div);
    }
  }, [winner]);

  const handleImageScrambleClick = e => {
    if (e.target.classList.contains('btn-outline-primary')) {
      history.push(`/recipe/${recipe.slug}`);
      dispatch(setCurrentRecipe(null));
    }
  };

  return (
    <>
      {imageScrambleURLs.length ? (
        <>
          <div className='image-scramble-wrapper mt-4 mb-3'>
            <div
              id='image-scramble-container'
              ref={containerRef}
              onClick={handleImageScrambleClick}
            >
              {imageScrambleURLs.map((url, i) => (
                <div
                  key={url}
                  draggable='false'
                  data-i={
                    imageScrambleURLs[i][
                      imageScrambleURLs[i].lastIndexOf('/') + 1
                    ]
                  }
                  data-url={url}
                  style={{ backgroundImage: `url(${url})` }}
                ></div>
              ))}
            </div>
            <canvas id='image-scramble-confetti' ref={canvasRef}></canvas>
            <p className='total-moves'>
              Total moves: <span id='counter'>{count}</span>
            </p>
          </div>
        </>
      ) : (
        <div className='image-scramble-wrapper image-scramble-wrapper-placeholder mt-4 mb-3'>
          <div
            id='image-scramble-container'
            className='image-pieces-placeholder'
            style={{ backgroundImage: `url(${recipe.cardAndHeroImage}.webp)` }}
          ></div>
        </div>
      )}
    </>
  );
}

ImageScramble.propTypes = {
  state: PropTypes.object.isRequired
};

export default withGlobalStore(ImageScramble);

// update image placement
const updateImages = (image, i, offset, isShuffling) => {
  // transition top and left css rules
  isShuffling && image.classList.add('move');

  // update left and top properties
  switch (i) {
    case 0:
      image.style.left = '0px';
      image.style.top = '0px';
      break;
    case 1:
      image.style.left = `${offset[0]}px`;
      image.style.top = '0px';
      break;
    case 2:
      image.style.left = `${offset[0] * 2}px`;
      image.style.top = '0px';
      break;

    case 3:
      image.style.left = '0px';
      image.style.top = `${offset[1]}px`;
      break;
    case 4:
      image.style.left = `${offset[0]}px`;
      image.style.top = `${offset[1]}px`;
      break;
    case 5:
      image.style.left = `${offset[0] * 2}px`;
      image.style.top = `${offset[1]}px`;
      break;

    case 6:
      image.style.left = '0px';
      image.style.top = `${offset[1] * 2}px`;
      break;
    case 7:
      image.style.left = `${offset[0]}px`;
      image.style.top = `${offset[1] * 2}px`;
      break;
    case 8:
      image.style.left = `${offset[0] * 2}px`;
      image.style.top = `${offset[1] * 2}px`;
      break;
    default:
      image.style.left = '0px';
      image.style.top = '0px';
      break;
  }
};

// swap images
const swapImages = (dragging, entering) => {
  // move image on top
  entering.classList.add('move');
  // swap
  const tempLeft = dragging.style.left;
  const tempTop = dragging.style.top;
  dragging.style.left = entering.style.left;
  dragging.style.top = entering.style.top;
  entering.style.left = tempLeft;
  entering.style.top = tempTop;
};

// check winner after every dragend
const checkWinner = (images, canvas, confetti, setWinner) => {
  let imageIndex;
  for (let i = 0; i < images.length; i++) {
    imageIndex = parseInt(images[i].dataset.i, 10);
    // if in order, continue
    if (imageIndex === i) continue;
    else return;
  }

  // if did not return, then add .winner
  images.forEach(image => {
    image.draggable = false;
    image.classList.add('winner');
  });
  // move canvas forward
  canvas.style.zIndex = 'initial';
  // confetti
  confetti()({
    particleCount: 100,
    origin: { x: 0.5, y: 1 }
  });
  // toggle winner
  setWinner(true);
};

// add image event listeners
const addImageEventListeners = (images, countRef, setCount) => {
  let dragging;
  let firstTouch;
  let lastTouch;

  // add event listeners to each image
  images.forEach(image => {
    /**
     * TOUCH
     */

    // touchstart
    image.addEventListener(
      'touchstart',
      e => {
        e.preventDefault();
        // prevent multiple touches (reset in transitionend)
        if (firstTouch) return;
        // otherwise, assign
        firstTouch = e.touches[0];
        dragging = image;
      },
      { passive: false }
    );

    // touchmove
    image.addEventListener(
      'touchmove',
      e => {
        e.preventDefault();
        // repeatedly assign current touch items present touch data
        lastTouch = e.touches[0];
      },
      { passive: false }
    );

    // touchend
    image.addEventListener('touchend', () => {
      // if did not move, reset firstTouch and dragging
      if (!lastTouch) {
        firstTouch = null;
        dragging = null;
        return;
      }
      // if touch occurs before variable reset (in transitionend),
      // firstTouch will have been reassigned to null
      // by the time 'touchend' handler is invoked
      if (!firstTouch) return;

      // check if x was largest directional move
      const isXLargest =
        Math.abs(lastTouch.clientX - firstTouch.clientX) >
        Math.abs(lastTouch.clientY - firstTouch.clientY);

      // get index of image
      const index = images.indexOf(image);

      // move along x-axis
      if (isXLargest) {
        const isMovingRight = lastTouch.clientX - firstTouch.clientX > 0;
        if (isMovingRight && [0, 1, 3, 4, 6, 7].includes(index)) {
          swapImages(dragging, images[index + 1]);
        } else if (!isMovingRight && [1, 2, 4, 5, 7, 8].includes(index)) {
          swapImages(dragging, images[index - 1]);
        }
        // move along y-axis
      } else {
        const isMovingDown = lastTouch.clientY - firstTouch.clientY > 0;
        if (isMovingDown && [0, 1, 2, 3, 4, 5].includes(index)) {
          swapImages(dragging, images[index + 3]);
        } else if (!isMovingDown && [3, 4, 5, 6, 7, 8].includes(index)) {
          swapImages(dragging, images[index - 3]);
        }
      }
    });

    /**
     * MOUSE
     */

    // dragstart
    image.addEventListener('dragstart', () => {
      // opacity
      image.classList.add('dragging');
      // keep ref of what's being dragged
      dragging = image;
    });

    // dragenter
    image.addEventListener('dragenter', e => {
      e.preventDefault();

      // if enter same div, return
      if (image === dragging) return;
      // if already in transition, return
      if (image.classList.contains('move')) return;

      swapImages(dragging, image);
    });

    // dragover
    image.addEventListener('dragover', e => {
      e.preventDefault();
    });

    // dragend
    image.addEventListener('dragend', () => {
      dragging = null;
      // revert opacity
      image.classList.remove('dragging');
      // update counter
      setCount(++countRef.current);
    });

    /**
     * TRANSITION
     */

    // transitionend
    image.addEventListener('transitionend', () => {
      // remove top and left transition
      image.classList.remove('move');

      // if touchend calculation resulted in image swap,
      // transitionend will be called.
      // here is where the DOM update should occur,
      // so as to not cutoff any transitions.
      // check if lastTouch (if movement occurred)
      if (lastTouch) {
        // update counter
        setCount(++countRef.current);
        // reset variables
        firstTouch = null;
        lastTouch = null;
        dragging = null;
      }
    });
    // transitioncancel
    image.addEventListener('transitioncancel', () => {
      // remove top and left transition
      image.classList.remove('move');
    });
  });
};

// IntersectionObserver triggers this on scroll
// setTimeout(() => attentionGetter(), 500);

/*
- image is for recipe other than current page
- add instructions below
- once solved, instructions change to summary, and image and summary link to recipe
*/
