import styled from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

interface TextProps {
  bg?: string;
  color?: string;
  padding?: string;
  margin?: string;
  fontSize?: string;
  fontFamily?: string;
  lineHeight?: string;
  fontStyle?: string;
  fontWeight?: string;
  letterSpacing?: string;
  wordSpacing?: string;
  textDecoration?: string;
  fontVariant?: string;
  textTransform?: string;
  opacity?: string;
  hBg?: string;
  hColor?: string;
  hPadding?: string;
  hMargin?: string;
  hFontSize?: string;
  hFontFamily?: string;
  hLineHeight?: string;
  hFontStyle?: string;
  hFontWeight?: string;
  hLetterSpacing?: string;
  hWordSpacing?: string;
  hTextDecoration?: string;
  hFontVariant?: string;
  hTextTransform?: string;
  hOpacity?: string;
  mBg?: string;
  mColor?: string;
  mPadding?: string;
  mMargin?: string;
  mFontSize?: string;
  mFontFamily?: string;
  mLineHeight?: string;
  mFontStyle?: string;
  mFontWeight?: string;
  mLetterSpacing?: string;
  mWordSpacing?: string;
  mTextDecoration?: string;
  mFontVariant?: string;
  mTextTransform?: string;
  mOpacity?: string;
  mDisplay?: string;
}

const Text = styled.p.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop)
})<TextProps>`
  background: ${({ bg }) => bg};
  color: ${({ color }) => color};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  font-size: ${({ fontSize }) => fontSize};
  font-family: ${({ fontFamily }) => fontFamily};
  line-height: ${({ lineHeight }) => lineHeight};
  font-style: ${({ fontStyle }) => fontStyle};
  font-weight: ${({ fontWeight }) => fontWeight};
  letter-spacing: ${({ letterSpacing }) => letterSpacing};
  word-spacing: ${({ wordSpacing }) => wordSpacing};
  text-decoration: ${({ textDecoration }) => textDecoration};
  font-variant: ${({ fontVariant }) => fontVariant};
  text-transform: ${({ textTransform }) => textTransform};
  opacity: ${({ opacity }) => opacity};

  &:hover {
    background: ${({ hBg }) => hBg};
    color: ${({ hColor }) => hColor};
    padding: ${({ hPadding }) => hPadding};
    margin: ${({ hMargin }) => hMargin};
    font-size: ${({ hFontSize }) => hFontSize};
    font-family: ${({ hFontFamily }) => hFontFamily};
    line-height: ${({ hLineHeight }) => hLineHeight};
    font-style: ${({ hFontStyle }) => hFontStyle};
    font-weight: ${({ hFontWeight }) => hFontWeight};
    letter-spacing: ${({ hLetterSpacing }) => hLetterSpacing};
    word-spacing: ${({ hWordSpacing }) => hWordSpacing};
    text-decoration: ${({ hTextDecoration }) => hTextDecoration};
    font-variant: ${({ hFontVariant }) => hFontVariant};
    text-transform: ${({ hTextTransform }) => hTextTransform};
    opacity: ${({ hOpacity }) => hOpacity};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    background: ${({ mBg }) => mBg};
    color: ${({ mColor }) => mColor};
    padding: ${({ mPadding }) => mPadding};
    margin: ${({ mMargin }) => mMargin};
    font-size: ${({ mFontSize }) => mFontSize};
    font-family: ${({ mFontFamily }) => mFontFamily};
    line-height: ${({ mLineHeight }) => mLineHeight};
    font-style: ${({ mFontStyle }) => mFontStyle};
    font-weight: ${({ mFontWeight }) => mFontWeight};
    letter-spacing: ${({ mLetterSpacing }) => mLetterSpacing};
    word-spacing: ${({ mWordSpacing }) => mWordSpacing};
    text-decoration: ${({ mTextDecoration }) => mTextDecoration};
    font-variant: ${({ mFontVariant }) => mFontVariant};
    text-transform: ${({ mTextTransform }) => mTextTransform};
    opacity: ${({ mOpacity }) => mOpacity};
    display: ${({ mDisplay }) => mDisplay};
  }
`;

export default Text;
