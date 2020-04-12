import React, { memo } from 'react';
import { oneOf } from 'prop-types';

const paths = {
  diamond: `M 25  5
            L 45 45
            L 25 85
            L  5 45
            Z`,
  oval: `   M  5 25
            a 20 20 0 0 1  40 0
            l  0 40
            a 20 20 0 0 1 -40 0
            Z`,
  swiggly: `M   7  25
            c -20 -25  25 -25  35  0
            s -20  25   0  45
            s -30  25 -35   0
            s  20 -30   0 -45
            z`,
};

function Path({ shape, fill, color }) {
  return (
    <>
      <defs>
        <clipPath id="diamondClip">
          <path d={paths.diamond} />
        </clipPath>
        <clipPath id="ovalClip">
          <path d={paths.oval} />
        </clipPath>
        <clipPath id="swigglyClip">
          <path d={paths.swiggly} />
        </clipPath>
      </defs>
      <path
        className="Path"
        stroke={color}
        strokeWidth="4"
        strokeLinejoin="round"
        fill={fill === 'solid' ? color : 'none'}
        d={paths[shape]}
      />
      {fill === 'striped' && (
        <path
          className="Path-stripes"
          stroke={color}
          strokeWidth="4"
          strokeLinejoin="round"
          fill="none"
          d={`M 0 15 H 50
              M 0 25 H 50
              M 0 35 H 50
              M 0 45 H 50
              M 0 55 H 50
              M 0 65 H 50
              M 0 75 H 50`}
          clipPath={`url(#${shape}Clip)`}
        />
      )}
    </>
  );
}

Path.propTypes = {
  shape: oneOf(['diamond', 'oval', 'swiggly']).isRequired,
  fill: oneOf(['hollow', 'solid', 'striped']),
  color: oneOf(['red', 'green', 'purple']),
};
Path.defaultProps = {
  fill: 'hollow',
  color: 'red',
};

export default memo(Path);
