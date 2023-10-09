import styled from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

interface FlexProps {
  backgroundColor?: string;
  textColor?: string;
  padding?: [number, number, number, number];
  mPadding?: [number, number, number, number];
  margin?: [number, number, number, number];
  mMargin?: [number, number, number, number];
  width?: string;
  mWidth?: string;
  height?: string;
  mHeight?: string;
  textAlign?: string;
  mTextAlign?: string;
  border?: string;
  boxShadow?: string;
  hBoxShadow?: string;
  transition?: string;
  hTransform?: string;
  borderRadius?: string;
}

const Flex = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop)
})<FlexProps>`
  background-color: ${({ theme, backgroundColor = theme.colors.primary }) => backgroundColor};
  color: ${({ theme, textColor = theme.colors.secondary }) => textColor};
  padding: ${({ padding = [0, 0, 0, 0] }) => `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`};
  margin: ${({ margin = [0, 0, 0, 0] }) => `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  text-align: ${({ textAlign = "left" }) => textAlign};
  border-radius: ${({ borderRadius = "0px" }) => borderRadius};
  border: ${({ border = "1px solid #000" }) => border};
  box-shadow: ${({ boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)" }) => boxShadow};
  transition: ${({ transition = "transform 0.3s, box-shadow 0.3s" }) => transition};

  &:hover {
    box-shadow: ${({ hBoxShadow = "0 0 20px rgba(0, 0, 0, 0.6)" }) => hBoxShadow};
    transform: ${({ hTransform = "scale(1.025)" }) => hTransform};
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: ${({ mPadding = [0, 0, 0, 0] }) => `${mPadding[0]}px ${mPadding[1]}px ${mPadding[2]}px ${mPadding[3]}px`};
    margin: ${({ mMargin = [0, 0, 0, 0] }) => `${mMargin[0]}px ${mMargin[1]}px ${mMargin[2]}px ${mMargin[3]}px`};
    width: ${({ mWidth }) => mWidth};
    height: ${({ mHeight }) => mHeight};
    text-align: ${({ mTextAlign = "center" }) => mTextAlign};
  }
`;

export default Flex;
