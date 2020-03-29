import React from 'react';
import { ReactSVG } from 'react-svg';
import { string, func, bool } from 'prop-types';
import styled from 'styled-components';
import svg00 from '../assets/00.svg';
import svg01 from '../assets/01.svg';
import svg02 from '../assets/02.svg';
import svg10 from '../assets/10.svg';
import svg11 from '../assets/11.svg';
import svg12 from '../assets/12.svg';
import svg20 from '../assets/20.svg';
import svg21 from '../assets/21.svg';
import svg22 from '../assets/22.svg';

const svgs = {
  svg00,
  svg01,
  svg02,
  svg10,
  svg11,
  svg12,
  svg20,
  svg21,
  svg22,
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
  ${({ selected }) =>
    selected &&
    `
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
  `}
`;

const StyledSvg = styled(ReactSVG)`
  flex-basis: 25%;
  margin: 2%;
  svg {
    height: auto;
    width: 100%;
  }
  path {
    stroke: ${({ color }) => colors[color]};
    stroke-width: 6px;
    fill: ${({ color, 'x-filled': isFilled }) =>
      isFilled === 'true' ? colors[color] : 'transparent'};
  }
`;

function Card({ code, onClick, selected }) {
  const [shape, pattern, color, count] = code;

  return (
    <CardWrapper onClick={onClick} selected={selected}>
      {Array.from({ length: Number(count) + 1 }, (k, i) => (
        <StyledSvg
          key={`${code}-${i}`}
          src={svgs[`svg${shape}${pattern}`]}
          color={color}
          x-filled={String(pattern === '1')}
        />
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
