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
  display?: string;
  flexDirection?: string;
  mFlexDirection?: string;
  gap?: string;
  mGap?: string;
  alignItems?: string;
  mAlignItems?: string;
  justifyContent?: string;
  mJustifyContent?: string;
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
  box-shadow: ${({ boxShadow }) => boxShadow};
  transition: ${({ transition }) => transition};
  display: ${({ display = "flex" }) => display};
  flex-direction: ${({ flexDirection = "row" }) => flexDirection};
  gap: ${({ gap = "0px" }) => gap};
  align-items: ${({ alignItems = "flex-start" }) => alignItems};
  justify-content: ${({ justifyContent = "flex-start" }) => justifyContent};

  &:hover {
    box-shadow: ${({ hBoxShadow }) => hBoxShadow};
    transform: ${({ hTransform }) => hTransform};
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: ${({ mPadding = [0, 0, 0, 0] }) => `${mPadding[0]}px ${mPadding[1]}px ${mPadding[2]}px ${mPadding[3]}px`};
    margin: ${({ mMargin = [0, 0, 0, 0] }) => `${mMargin[0]}px ${mMargin[1]}px ${mMargin[2]}px ${mMargin[3]}px`};
    width: ${({ mWidth }) => mWidth};
    height: ${({ mHeight }) => mHeight};
    text-align: ${({ mTextAlign = "center" }) => mTextAlign};
    flex-direction: ${({ mFlexDirection }) => mFlexDirection};
    gap: ${({ mGap }) => mGap};
    align-items: ${({ mAlignItems }) => mAlignItems};
    justify-content: ${({ mJustifyContent }) => mJustifyContent};
  }
`;

export default Flex;
