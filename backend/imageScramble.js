/* eslint-disable no-console */

import axios from 'axios';
import sharp from 'sharp';
import AWS from 'aws-sdk';
import { parentPort } from 'worker_threads';

// size (height and width of sub-image)
const s = 300;
const extractions = [
  // top row
  { left: 0, top: 0, width: s, height: s },
  { left: s, top: 0, width: s, height: s },
  { left: s * 2, top: 0, width: s, height: s },
  // middle row
  { left: 0, top: s, width: s, height: s },
  { left: s, top: s, width: s, height: s },
  { left: s * 2, top: s, width: s, height: s },
  // bottom row
  { left: 0, top: s * 2, width: s, height: s },
  { left: s, top: s * 2, width: s, height: s },
  { left: s * 2, top: s * 2, width: s, height: s }
];

// when parent posts message to worker
parentPort.on('message', async slug => {
  try {
    // HTTP
    const res = await axios({
      method: 'GET',
      url: `https://meal-tada.s3.amazonaws.com/${slug}/${slug}.jpg`,
      responseType: 'stream',
      headers: { referer: 'http://api/' }
    });

    // SHARP
    const sharpStream = sharp({ failOnError: false });
    sharpStream.setMaxListeners(20);
    const sharpPromises = [];
    for (let i = 0; i < extractions.length; i++) {
      sharpPromises.push(
        sharpStream
          .clone()
          .rotate()
          .resize({ width: s * 3 })
          .extract(extractions[i])
          .toBuffer()
      );
    }
    await res.data.pipe(sharpStream);
    const sharpBuffers = await Promise.all(sharpPromises);

    // AWS
    AWS.config.update({ region: 'us-east-1' });
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    const awsPromises = [];
    for (let i = 0; i < sharpBuffers.length; i++) {
      // define upload params
      const uploadParams = {
        Bucket: 'meal-tada',
        Key: `_image-scramble/${i}-${slug}.jpg`,
        Body: sharpBuffers[i],
        CacheControl: 'public, max-age=604800, immutable',
        ContentType: 'image/jpeg' // jpg only--not webp
      };

      // upload image
      awsPromises.push(
        new Promise((resolve, reject) => {
          s3.upload(uploadParams, (err, data) => {
            if (err) {
              reject(err);
            }
            if (data) {
              resolve();
            }
          });
        })
      );
    }

    await Promise.all(awsPromises);
    parentPort.postMessage({ uploaded: true });
  } catch (err) {
    parentPort.postMessage(err.message);
  }
});
