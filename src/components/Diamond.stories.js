import React from 'react';
import Svg from './Svg';
import Path from './Path';

export default {
  title: 'Path - Diamond',
  component: Path,
};

export const Hollow = () => (
  <Svg>
    <Path shape="diamond" fill="hollow" />
  </Svg>
);

export const Solid = () => (
  <Svg>
    <Path shape="diamond" fill="solid" />
  </Svg>
);

export const Striped = () => (
  <Svg>
    <Path shape="diamond" fill="striped" />
  </Svg>
);

export const AllWithColors = () => (
  <>
    <Svg>
      <Path shape="diamond" fill="hollow" color="green" />
    </Svg>
    <Svg>
      <Path shape="diamond" fill="solid" color="purple" />
    </Svg>
    <Svg>
      <Path shape="diamond" fill="striped" color="red" />
    </Svg>
  </>
);
