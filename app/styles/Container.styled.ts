import styled from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

interface ContainerProps {
  backgroundColor?: string;
  textColor?: string;
  padding?: [string, string, string, string];
  margin?: [string, string, string, string];
  width?: string;
  height?: string;
  minHeight?: string;
  textAlign?: string;
  border?: string;
  boxShadow?: string;
  transition?: string;
  borderRadius?: string;
  hBoxShadow?: string;
  hTransform?: string;
  mPadding?: [string, string, string, string];
  mMargin?: [string, string, string, string];
  mWidth?: string;
  mHeight?: string;
  mTextAlign?: string;
}

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop)
})<ContainerProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
  padding: ${({ padding = ["0", "0", "0", "0"] }) => `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`};
  margin: ${({ margin = ["0", "0", "0", "0"] }) => `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}`};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  min-height: ${({ minHeight }) => minHeight};
  text-align: ${({ textAlign }) => textAlign};
  border: ${({ border }) => border};
  boxshadow: ${({ boxShadow }) => boxShadow};
  transition: ${({ transition }) => transition};
  border-radius: ${({ borderRadius = "0" }) => borderRadius};

  &:hover {
    box-shadow: ${({ hBoxShadow }) => hBoxShadow};
    transform: ${({ hTransform }) => hTransform};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ mPadding = ["0", "0", "0", "0"] }) => `${mPadding[0]} ${mPadding[1]} ${mPadding[2]} ${mPadding[3]}`};
    margin: ${({ mMargin = ["0", "0", "0", "0"] }) => `${mMargin[0]} ${mMargin[1]} ${mMargin[2]} ${mMargin[3]}`};
    width: ${({ mWidth }) => mWidth};
    height: ${({ mHeight }) => mHeight};
    text-align: ${({ mTextAlign }) => mTextAlign};
  }
`;

export default Container;
