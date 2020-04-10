import React from 'react';
import { oneOf } from 'prop-types';

function Diamond({ type, color }) {
  return (
    <>
      <defs>
        <clipPath id="stripeClip">
          <path d="M 25 5 L 45 45 L 25 85 L 5 45 Z" />
        </clipPath>
      </defs>
      <path
        className="diamond"
        stroke={color}
        strokeWidth="4"
        strokeLinejoin="round"
        fill={type === 'solid' ? color : 'none'}
        d="M 25 5 L 45 45 L 25 85 L 5 45 Z"
      />
      {type === 'striped' && (
        <path
          className="diamond-stripes"
          stroke={color}
          strokeWidth="4"
          strokeLinejoin="round"
          fill="none"
          d="M 0 20 H 50 M 0 30 H 50 M 0 40 H 50 M 0 50 H 50 M 0 60 H 50 M 0 70 H 50"
          clipPath="url(#stripeClip)"
        />
      )}
    </>
  );
}

Diamond.propTypes = {
  type: oneOf(['hollow', 'solid', 'striped']),
  color: oneOf(['red', 'green', 'purple']),
};
Diamond.defaultProps = {
  type: 'hollow',
  color: 'red',
};

export default Diamond;
