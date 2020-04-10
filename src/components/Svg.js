import React from 'react';
import { node, string } from 'prop-types';

function Svg({ children, className }) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 50 90"
      width="50"
      height="90"
      className={className}
    >
      {children}
    </svg>
  );
}

Svg.propTypes = {
  children: node.isRequired,
  className: string,
};
Svg.defaultProps = {
  className: '',
};

export default Svg;
