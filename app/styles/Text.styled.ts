import styled from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

interface TextProps {
  bg?: string;
  color?: string;
  padding?: [number, number, number, number];
  margin?: [number, number, number, number];
  hBg?: string;
  hColor?: string;
  hPadding?: [number, number, number, number];
  hMargin?: [number, number, number, number];
  mBg?: string;
  mColor?: string;
  mPadding?: [number, number, number, number];
  mMargin?: [number, number, number, number];
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
}

const Text = styled.p.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop)
})<TextProps>`
  background: ${({ bg = "transparent" }) => bg};
  color: ${({ color = "black" }) => color};
  padding: ${({ padding = [0, 0, 0, 0] }) => `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`};
  margin: ${({ margin = [0, 0, 0, 0] }) => `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`};
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

  &:hover {
    background: ${({ hBg = "transparent" }) => hBg};
    color: ${({ hColor = "black" }) => hColor};
    padding: ${({ hPadding = [0, 0, 0, 0] }) => `${hPadding[0]}px ${hPadding[1]}px ${hPadding[2]}px ${hPadding[3]}px`};
    margin: ${({ hMargin = [0, 0, 0, 0] }) => `${hMargin[0]}px ${hMargin[1]}px ${hMargin[2]}px ${hMargin[3]}px`};
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
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    background: ${({ mBg = "transparent" }) => mBg};
    color: ${({ mColor = "black" }) => mColor};
    padding: ${({ mPadding = [0, 0, 0, 0] }) => `${mPadding[0]}px ${mPadding[1]}px ${mPadding[2]}px ${mPadding[3]}px`};
    margin: ${({ mMargin = [0, 0, 0, 0] }) => `${mMargin[0]}px ${mMargin[1]}px ${mMargin[2]}px ${mMargin[3]}px`};
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
  }
`;

export default Text;
