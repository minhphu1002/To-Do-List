import styled from "styled-components";

export const ContainerFluid = styled.div`
  position: fixed,
  width: 100%,
  min-height: 100%,
  background-image: url('./img/2.jpg'),
  background-size: 100%,
`;

export const Layer = styled.div`
  position: fixed,
  width: 100%,
  height: 100%,
  background-color: rgba(0,0,0,0.7),
`;

export const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.color};
  border: 5px solid ${(props) => props.theme.color};
  padding: 24px 16px;
`;
