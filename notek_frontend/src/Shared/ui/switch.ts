import React from "react";

export const switchStyles: Record<string, React.CSSProperties> = {
    switch: {
      position: 'relative',
      display: 'inline-block',
      width: '50px',
      height: '24px',
    },
    switchInput: {
      opacity: 0,
      width: 0,
      height: 0,
    },
    slider: {
      position: 'absolute',
      cursor: 'pointer',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#ccc',
      transition: 'background-color .4s, box-shadow .4s',
      borderRadius: '20px',
    },
    sliderBefore: {
      position: 'absolute',
      content: "''",
      height: '16px',
      width: '16px',
      left: '4px',
      bottom: '4px',
      backgroundColor: 'white',
      transition: 'transform .4s',
    },
    checkedSlider: {
      backgroundColor: '#2196F3',
    },
    focusSlider: {
      boxShadow: '0 0 1px #2196F3',
    },
    checkedSliderBefore: {
      transform: 'translateX(26px)',
    },
    roundSlider: {
      borderRadius: '34px',
    },
    roundSliderBefore: {
      borderRadius: '50%',
    },
  };
  