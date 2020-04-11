import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
`;

export const ResultGrid = styled(Grid)`
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  max-width: 180px;

  svg {
    height: 1.5rem;
    width: auto;
  }
`;
