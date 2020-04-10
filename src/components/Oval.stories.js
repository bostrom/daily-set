import React from 'react';
import Figure from './Figure';

export default {
  title: 'Figure - Oval',
  component: Figure,
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
    <Figure shape="oval" type="hollow" />
  </Svg>
);

export const Solid = () => (
  <Svg>
    <Figure shape="oval" type="solid" />
  </Svg>
);

export const Striped = () => (
  <Svg>
    <Figure shape="oval" type="striped" />
  </Svg>
);

export const Two = () => (
  <>
    <Svg>
      <Figure shape="oval" type="hollow" />
    </Svg>
    <Svg>
      <Figure shape="oval" type="hollow" />
    </Svg>
  </>
);
export const Three = () => (
  <>
    <Svg>
      <Figure shape="oval" type="hollow" color="green" />
    </Svg>
    <Svg>
      <Figure shape="oval" type="solid" color="purple" />
    </Svg>
    <Svg>
      <Figure shape="oval" type="striped" color="red" />
    </Svg>
  </>
);
