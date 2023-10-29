import styled from "styled-components";

interface InputProps {
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  textAlign?: string;
  $border?: string;
  $outline?: string;
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
  $flex?: string;
  $fontSize?: string;
  hBoxShadow?: string;
  hTransform?: string;
  $hBackgroundColor?: string;
  $pTextColor: string;
  $pFontSize?: string;
  $pFontFamily?: string;
  $pLineHeight?: string;
  $pFontStyle?: string;
  $pFontWeight?: string;
  $pLetterSpacing?: string;
  $pWordSpacing?: string;
  mPadding?: string;
  mMargin?: string;
  mWidth?: string;
  mHeight?: string;
  mTextAlign?: string;
  mFlexDirection?: string;
  mGap?: string;
  mAlignItems?: string;
  mJustifyContent?: string;
}

const Input = styled.input<InputProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  text-align: ${({ textAlign }) => textAlign};
  border: ${({ $border }) => $border};
  outline: ${({ $outline }) => $outline};
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
  flex: ${({ $flex }) => $flex};
  font-size: ${({ $fontSize }) => $fontSize};

  &:hover {
    box-shadow: ${({ hBoxShadow }) => hBoxShadow};
    transform: ${({ hTransform }) => hTransform};
    background-color: ${({ $hBackgroundColor }) => $hBackgroundColor};
  }

  &::placeholder {
    color: ${({ $pTextColor }) => $pTextColor};
    font-size: ${({ $pFontSize }) => $pFontSize};
    font-family: ${({ $pFontFamily }) => $pFontFamily};
    line-height: ${({ $pLineHeight }) => $pLineHeight};
    font-style: ${({ $pFontStyle }) => $pFontStyle};
    font-weight: ${({ $pFontWeight }) => $pFontWeight};
    letter-spacing: ${({ $pLetterSpacing }) => $pLetterSpacing};
    word-spacing: ${({ $pWordSpacing }) => $pWordSpacing};
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
  }
`;

export default Input;
