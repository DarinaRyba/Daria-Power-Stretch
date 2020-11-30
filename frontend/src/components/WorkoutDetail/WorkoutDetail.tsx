import React from 'react';
import './WorkoutDetail.css';
/* import { Button } from 'react-bootstrap' */

function WorkoutDetail() {
  return (
    <main>

      <section className="image-detail">
        

        <div className="image-box">
          <img
            className="image"
            src="https://trello-attachments.s3.amazonaws.com/5fc0f7845fca4370bc8c6bca/5fc3bc45c0a989730344a696/1cdf9a4f390c4d42f788c736be0c6246/Stretching-detail.png"
            alt=""
          />
        </div>
        <div className="image-detail__card">
        <div className="name-detail">
          <h3>Stretching</h3>
        </div>
        <div className="description-detail">
          <p>Stretching is a form of physical exercise in which a specific muscle or tendon (or muscle group) is deliberately flexed or stretched in order to improve the muscle's felt elasticity and achieve comfortable muscle tone. The result is a feeling of increased muscle control, flexibility, and range of motion. Stretching is also used therapeutically to alleviate cramps and to improve function in daily activities by increasing range of motion</p>
        </div>
        <div className="price-detail">
          <p>Price: 35€</p>
        </div>
        <div className="btn-wrapper">
       {/*  <Button variant="light">Book</Button> */}
        </div>
        </div>
      </section>

    </main>
  );
}

export default WorkoutDetail;
