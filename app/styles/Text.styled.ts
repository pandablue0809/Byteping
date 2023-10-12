import styled from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

interface TextProps {
  bg?: string;
  color?: string;
  padding?: [string, string, string, string];
  margin?: [string, string, string, string];
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
  hPadding?: [string, string, string, string];
  hMargin?: [string, string, string, string];
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
  mPadding?: [string, string, string, string];
  mMargin?: [string, string, string, string];
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
}

const Text = styled.p.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop)
})<TextProps>`
  background: ${({ bg }) => bg};
  color: ${({ color }) => color};
  padding: ${({ padding = ["0", "0", "0", "0"] }) => `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`};
  margin: ${({ margin = ["0", "0", "0", "0"] }) => `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}`};
  font-size: ${({ fontSize }) => fontSize};
  font-family: ${({ fontFamily }) => fontFamily};
  line-height: ${({ lineHeight }) => lineHeight};
  font-style: ${({ fontStyle }) => fontStyle};
  font-weight: ${({ fontWeight }) => fontWeight};
  letterspacing: ${({ letterSpacing }) => letterSpacing};
  word-spacing: ${({ wordSpacing }) => wordSpacing};
  text-decoration: ${({ textDecoration }) => textDecoration};
  font-variant: ${({ fontVariant }) => fontVariant};
  text-transform: ${({ textTransform }) => textTransform};
  opacity: ${({ opacity }) => opacity};

  &:hover {
    background: ${({ hBg }) => hBg};
    color: ${({ hColor }) => hColor};
    padding: ${({ hPadding = ["0", "0", "0", "0"] }) => `${hPadding[0]} ${hPadding[1]} ${hPadding[2]} ${hPadding[3]}`};
    margin: ${({ hMargin = ["0", "0", "0", "0"] }) => `${hMargin[0]} ${hMargin[1]} ${hMargin[2]} ${hMargin[3]}`};
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
    padding: ${({ mPadding = ["0", "0", "0", "0"] }) => `${mPadding[0]} ${mPadding[1]} ${mPadding[2]} ${mPadding[3]}`};
    margin: ${({ mMargin = ["0", "0", "0", "0"] }) => `${mMargin[0]} ${mMargin[1]} ${mMargin[2]} ${mMargin[3]}`};
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
  }
`;

export default Text;
