import React from 'react';
import  './Candle.module.css'; // Assuming you will use CSS modules
import  './Candle.css'; // Assuming you will use CSS modules

const Candle = () => {
  return (
    <div class="holder ">
    <div class="candle">
      <div class="blinking-glow"></div>
      <div class="thread"></div>
      <div class="glow"></div>
      <div class="flame"></div>
    </div>
  </div>
  
  );
};

export default Candle;
