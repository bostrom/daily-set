import React from 'react';
import { oneOf } from 'prop-types';

const paths = {
  diamond: `M 25 5
            L 45 45
            L 25 85
            L 5 45
            Z`,
  oval: `   M 5 25
            a 20 20 0 0 1 40 0
            l 0 40
            a 20 20 0 0 1 -40 0
            Z
            `,
  swiggly: 'M 25 5 L 45 45 L 25 85 L 5 45 Z',
};

function Figure({ shape, type, color }) {
  return (
    <>
      <defs>
        <clipPath id="diamondClip">
          <path d={paths.diamond} />
        </clipPath>
        <clipPath id="ovalClip">
          <path d={paths.oval} />
        </clipPath>
      </defs>
      <path
        className="Figure"
        stroke={color}
        strokeWidth="4"
        strokeLinejoin="round"
        fill={type === 'solid' ? color : 'none'}
        d={paths[shape]}
      />
      {type === 'striped' && (
        <path
          className="Figure-stripes"
          stroke={color}
          strokeWidth="4"
          strokeLinejoin="round"
          fill="none"
          d="M 0 20 H 50 M 0 30 H 50 M 0 40 H 50 M 0 50 H 50 M 0 60 H 50 M 0 70 H 50"
          clipPath={`url(#${shape}Clip)`}
        />
      )}
    </>
  );
}

Figure.propTypes = {
  shape: oneOf(['diamond', 'oval', 'swiggly']).isRequired,
  type: oneOf(['hollow', 'solid', 'striped']),
  color: oneOf(['red', 'green', 'purple']),
};
Figure.defaultProps = {
  type: 'hollow',
  color: 'red',
};

export default Figure;
