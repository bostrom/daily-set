import React from 'react';
import Diamond from './Diamond';

export default {
  title: 'Diamond',
  component: Diamond,
};

const Svg = ({ children }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 50 90"
    width={50 * 1}
    height={90 * 1}
  >
    {children}
  </svg>
);

export const Hollow = () => (
  <Svg>
    <Diamond type="hollow" />
  </Svg>
);

export const Solid = () => (
  <Svg>
    <Diamond type="solid" />
  </Svg>
);

export const Striped = () => (
  <Svg>
    <Diamond type="striped" />
  </Svg>
);

export const Two = () => (
  <>
    <Svg>
      <Diamond type="hollow" />
    </Svg>
    <Svg>
      <Diamond type="hollow" />
    </Svg>
  </>
);
export const Three = () => (
  <>
    <Svg>
      <Diamond type="hollow" color="green" />
    </Svg>
    <Svg>
      <Diamond type="solid" color="purple" />
    </Svg>
    <Svg>
      <Diamond type="striped" color="red" />
    </Svg>
  </>
);

// export const Responsive = () => (
//   <div
//     style={{
//       width: '100px',
//       border: '1px solid grey',
//     }}
//   >
//     <Diamond code="1122" />
//   </div>
// );
