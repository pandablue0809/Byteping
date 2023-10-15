import styled from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

interface ContainerProps {
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  minHeight?: string;
  textAlign?: string;
  border?: string;
  boxShadow?: string;
  transition?: string;
  borderRadius?: string;
  cursor?: string;
  hBoxShadow?: string;
  hTransform?: string;
  hBackgroundColor?: string;
  mPadding?: string;
  mMargin?: string;
  mWidth?: string;
  mHeight?: string;
  mTextAlign?: string;
}

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop)
})<ContainerProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  min-height: ${({ minHeight }) => minHeight};
  text-align: ${({ textAlign }) => textAlign};
  border: ${({ border }) => border};
  boxshadow: ${({ boxShadow }) => boxShadow};
  transition: ${({ transition }) => transition};
  border-radius: ${({ borderRadius }) => borderRadius};
  cursor: ${({ cursor }) => cursor};

  &:hover {
    box-shadow: ${({ hBoxShadow }) => hBoxShadow};
    transform: ${({ hTransform }) => hTransform};
    background-color: ${({ hBackgroundColor }) => hBackgroundColor};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ mPadding }) => mPadding};
    margin: ${({ mMargin }) => mMargin};
    width: ${({ mWidth }) => mWidth};
    height: ${({ mHeight }) => mHeight};
    text-align: ${({ mTextAlign }) => mTextAlign};
  }
`;

export default Container;
