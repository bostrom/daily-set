import React from 'react';
import Svg from './Svg';
import Path from './Path';

export default {
  title: 'Path - Swiggly',
  component: Path,
};

export const Hollow = () => (
  <Svg>
    <Path shape="swiggly" fill="hollow" />
  </Svg>
);

export const Solid = () => (
  <Svg>
    <Path shape="swiggly" fill="solid" />
  </Svg>
);

export const Striped = () => (
  <Svg>
    <Path shape="swiggly" fill="striped" />
  </Svg>
);

export const AllWithColors = () => (
  <>
    <Svg>
      <Path shape="swiggly" fill="hollow" color="green" />
    </Svg>
    <Svg>
      <Path shape="swiggly" fill="solid" color="purple" />
    </Svg>
    <Svg>
      <Path shape="swiggly" fill="striped" color="red" />
    </Svg>
  </>
);
