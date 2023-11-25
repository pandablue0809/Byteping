import styled from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

interface FlexProps {
  backgroundColor?: string;
  background?: string;
  textColor?: string;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  textAlign?: string;
  border?: string;
  boxShadow?: string;
  transition?: string;
  borderRadius?: string;
  display?: string;
  flexDirection?: string;
  gap?: string;
  alignItems?: string;
  justifyContent?: string;
  borderBottom?: string;
  $position?: string;
  $top?: string;
  $bottom?: string;
  $right?: string;
  $left?: string;
  $textWrap?: string;
  $cursor?: string;
  $zIndex?: string;
  $borderLeft?: string;
  $flex?: string;
  $flexWrap?: string;
  $overflowY?: string;
  $scrollbarWidth?: string;
  $alignSelf?: string;
  $visibility?: string;
  hBoxShadow?: string;
  hTransform?: string;
  $hBackgroundColor?: string;
  mPadding?: string;
  mMargin?: string;
  mWidth?: string;
  mHeight?: string;
  mTextAlign?: string;
  mFlexDirection?: string;
  mGap?: string;
  mAlignItems?: string;
  mJustifyContent?: string;
  $mDisplay?: string;
}

const Flex = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop)
})<FlexProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  background: ${({ background }) => background};
  color: ${({ textColor }) => textColor};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  text-align: ${({ textAlign }) => textAlign};
  border: ${({ border }) => border};
  box-shadow: ${({ boxShadow }) => boxShadow};
  transition: ${({ transition }) => transition};
  border-radius: ${({ borderRadius }) => borderRadius};
  display: ${({ display = "flex" }) => display};
  flex-direction: ${({ flexDirection }) => flexDirection};
  gap: ${({ gap }) => gap};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  border-bottom: ${({ borderBottom }) => borderBottom};
  position: ${({ $position }) => $position};
  top: ${({ $top }) => $top};
  bottom: ${({ $bottom }) => $bottom};
  right: ${({ $right }) => $right};
  left: ${({ $left }) => $left};
  text-wrap: ${({ $textWrap }) => $textWrap};
  cursor: ${({ $cursor }) => $cursor};
  z-index: ${({ $zIndex }) => $zIndex};
  border-left: ${({ $borderLeft }) => $borderLeft};
  flex: ${({ $flex }) => $flex};
  flex-wrap: ${({ $flexWrap }) => $flexWrap};
  overflow-y: ${({ $overflowY }) => $overflowY};
  scrollbar-width: ${({ $scrollbarWidth }) => $scrollbarWidth};
  align-self: ${({ $alignSelf }) => $alignSelf};
  visibility: ${({ $visibility }) => $visibility};

  &:hover {
    box-shadow: ${({ hBoxShadow }) => hBoxShadow};
    transform: ${({ hTransform }) => hTransform};
    background-color: ${({ $hBackgroundColor }) => $hBackgroundColor};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ mPadding }) => mPadding};
    margin: ${({ mMargin }) => mMargin};
    width: ${({ mWidth }) => mWidth};
    height: ${({ mHeight }) => mHeight};
    text-align: ${({ mTextAlign }) => mTextAlign};
    flex-direction: ${({ mFlexDirection }) => mFlexDirection};
    gap: ${({ mGap }) => mGap};
    align-items: ${({ mAlignItems }) => mAlignItems};
    justify-content: ${({ mJustifyContent }) => mJustifyContent};
    display: ${({ $mDisplay }) => $mDisplay};
  }
`;

export default Flex;
