import styled from "styled-components";

interface FlexProps {
  bg?: string;
  color?: string;
  padding?: [number, number, number, number];
  margin?: [number, number, number, number];
  display?: string;
}

const Flex = styled.div<FlexProps>`
  background: ${({ theme, bg }) => bg || theme.colors.primary};
  color: ${({ color = "black" }) => color};
  padding: ${({ padding = [0, 0, 0, 0] }) => `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`};
  margin: ${({ margin = [0, 0, 0, 0] }) => `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`};
  "display":"flex",;
`;

export default Flex;
