import styled from "styled-components";

interface NavProps {
  $backgroundColor?: string;
  $borderRadius?: string;
  $padding?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $borderBottom?: string;
  $transition?: string;
  $height?: string;
}

const Nav = styled.div<NavProps>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  padding: ${({ $padding }) => $padding};
  display: flex;
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: ${({ $alignItems }) => $alignItems};
  border-bottom: ${({ $borderBottom }) => $borderBottom};
  transition: ${({ $transition }) => $transition};
  height: ${({ $height }) => $height};
`;

export default Nav;
