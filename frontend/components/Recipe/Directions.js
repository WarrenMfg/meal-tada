import React from 'react';
import steak1 from '../../images/steak1.jpg';
import steak2 from '../../images/steak2.jpg';
import steak3 from '../../images/steak3.jpg';
import steak4 from '../../images/steak4.jpg';
import '../styles/Directions.css';

function Directions() {
  return (
    <section className='directions'>
      <h2 className='mb-4'>Directions</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta feugiat nisi feugiat
        lacinia. Donec a malesuada metus. Phasellus posuere libero vel nisi auctor dictum. In eget
        odio eu nisl interdum auctor. Aliquam efficitur quis ex in pretium. Vestibulum vitae
        vehicula urna, eu fermentum neque. Morbi mollis justo et neque porttitor, in fermentum arcu
        blandit. Nunc pharetra efficitur ex eget rhoncus. Nulla sed porta urna. In hac habitasse
        platea dictumst. Nunc quis laoreet metus, a ornare lacus. Vivamus quis tortor nec mi
        faucibus tincidunt. Nulla elementum enim ac laoreet ultrices.
      </p>
      <img className='img-fluid' src={steak1} />
      <p>
        Ut rhoncus massa lorem, a hendrerit lacus tristique in. Vivamus in pellentesque urna. Duis
        ipsum velit, ornare hendrerit purus a, lobortis porttitor lacus. Maecenas congue justo
        felis. Etiam id sem ac sapien efficitur elementum. Vivamus dapibus nisi eu bibendum auctor.
        Curabitur ullamcorper ex nibh, semper sodales enim feugiat et. Proin venenatis, nunc sed
        condimentum consectetur, ligula dolor pulvinar libero, vitae vestibulum tortor velit a elit.
        Ut laoreet ultricies lacus blandit ultricies. Suspendisse id sapien eget diam volutpat
        pretium. Etiam at feugiat eros, ac sollicitudin augue. Proin pretium, nisl id interdum
        porta, purus ex tristique lacus, sed vestibulum tortor nisi in sem.
      </p>
      <img className='img-fluid' src={steak2} />
      <p>
        Vivamus fringilla sem et libero interdum malesuada. Phasellus dolor leo, mattis at turpis
        ac, sagittis pellentesque orci. Curabitur cursus massa ut ligula pellentesque, vel interdum
        ante fermentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat
        volutpat. Pellentesque sed risus purus. Integer tincidunt eu nulla in tincidunt. Quisque
        vitae enim lectus. Integer consectetur cursus gravida. Sed vel vulputate ante.
      </p>
      <img className='img-fluid' src={steak3} />
      <p>
        In aliquam pellentesque turpis, sit amet auctor sapien scelerisque vitae. Donec suscipit
        augue sit amet arcu tincidunt, consectetur consectetur libero malesuada. Integer id congue
        felis. Phasellus vel leo nulla. Maecenas vel congue elit. Suspendisse sed nisi ut nunc
        ornare accumsan. Vestibulum mollis rutrum tincidunt. Proin dui ipsum, porta in enim sit
        amet, cursus cursus erat. Vivamus vitae egestas odio, et lobortis metus.
      </p>
      <img className='img-fluid' src={steak4} />
    </section>
  );
}

export default Directions;
