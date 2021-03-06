import React from 'react';
import Svg from './Svg';
import Path from './Path';

export default {
  title: 'Path - Oval',
  component: Path,
};

export const Hollow = () => (
  <Svg>
    <Path shape="oval" fill="hollow" />
  </Svg>
);

export const Solid = () => (
  <Svg>
    <Path shape="oval" fill="solid" />
  </Svg>
);

export const Striped = () => (
  <Svg>
    <Path shape="oval" fill="striped" />
  </Svg>
);

export const AllWithColors = () => (
  <>
    <Svg>
      <Path shape="oval" fill="hollow" color="green" />
    </Svg>
    <Svg>
      <Path shape="oval" fill="solid" color="purple" />
    </Svg>
    <Svg>
      <Path shape="oval" fill="striped" color="red" />
    </Svg>
  </>
);
