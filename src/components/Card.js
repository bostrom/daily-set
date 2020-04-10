import React from 'react';
import { string, func, bool } from 'prop-types';
import styled from 'styled-components';
import Svg from './Svg';
import Path from './Path';

const shapes = {
  0: 'diamond',
  1: 'oval',
  2: 'swiggly',
};
const fills = {
  0: 'hollow',
  1: 'solid',
  2: 'striped',
};
const colors = {
  0: 'red',
  1: 'green',
  2: 'purple',
};

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1px solid gray;
  cursor: pointer;
  ${({ selected }) =>
    selected && `box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);`}
`;

const StyledSvg = styled(Svg)`
  margin: 5% 0;
`;

function Card({ code, onClick, selected }) {
  const [shape, fill, color, count] = code;

  return (
    <CardWrapper onClick={onClick} selected={selected}>
      {Array.from({ length: (Number(count) || 0) + 1 }, (k, i) => (
        <StyledSvg key={`${code}-${i}`}>
          {code !== '----' && (
            <Path
              shape={shapes[shape]}
              fill={fills[fill]}
              color={colors[color]}
            />
          )}
        </StyledSvg>
      ))}
    </CardWrapper>
  );
}

Card.propTypes = {
  code: string.isRequired,
  onClick: func,
  selected: bool,
};
Card.defaultProps = {
  onClick: () => {},
  selected: false,
};

export default Card;
