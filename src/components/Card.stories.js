import React from 'react';
import Card from './Card';

export default {
  title: 'Card',
  component: Card,
};

export const Basic = () => <Card code="0221" />;

export const Responsive = () => (
  <div
    style={{
      width: '100px',
      border: '1px solid grey',
    }}
  >
    <Card code="1122" />
  </div>
);
