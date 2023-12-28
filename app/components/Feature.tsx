import Container from "@/styles/Container.styled";
import Flex from "@/styles/Flex.styled";
import Text from "@/styles/Text.styled";
import Image from "next/image";
import React, { useEffect } from "react";
import { gsap, ScrollTrigger } from "gsap/all";

interface FeatureProps {
  textOnLeft?: boolean;
  isAImage?: boolean;
  imageSrc?: string;
  imageAltText?: string;
  videoSrc?: string;
  videoAltText?: string;
  headingText?: string;
  headingPara?: string;
}

const Feature = ({
  textOnLeft = true,
  isAImage = false,
  imageSrc,
  videoSrc,
  imageAltText,
  videoAltText,
  headingText,
  headingPara
}: FeatureProps) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const features = document.querySelectorAll(".featureContainer");
    features.forEach((feature) => {
      const featureText = feature.querySelector(".featureText");
      const featureAsset = feature.querySelector(".featureAsset");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: feature,
          start: "top bottom",
          end: "bottom 90%",
          scrub: true
        }
      });
      tl.fromTo(featureText, { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: 1 });
      tl.fromTo(featureAsset, { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1 }, "<");
    });
  }, []);
  return (
    <Flex
      className="featureContainer"
      as={"section"}
      mFlexDirection={textOnLeft ? "column" : "column-reverse"}
      height="100vh"
      padding="48px"
      mPadding="24px"
      alignItems="center"
      justifyContent="center"
      gap="64px"
      mGap="48px"
    >
      {textOnLeft && (
        <Flex
          as={"main"}
          gap="24px"
          flexDirection="column"
          width="calc(45% - 64px)"
          mWidth="100%"
          className="featureText"
        >
          <Text
            as={"h2"}
            fontSize="48px"
            mFontSize="28px"
            fontWeight="900"
            letterSpacing="2px"
            textTransform="uppercase"
            fontFamily="sans-serif"
            color="#707172"
            tabIndex={0}
            className="focus-outline"
          >
            {headingText}
          </Text>
          <Text as={"p"} fontSize="18px" fontWeight="400" tabIndex={0} className="focus-outline">
            {headingPara}
          </Text>
        </Flex>
      )}
      <Container as={"aside"} width="45%" mWidth="100%" className="featureAsset">
        {isAImage ? (
          <Image
            src={imageSrc ? imageSrc : "This is a image"}
            fill
            alt={imageAltText ? imageAltText : ""}
            className="featureImage"
          />
        ) : (
          <iframe
            className="featureVideo"
            width="100%"
            height="360"
            allowFullScreen
            frameBorder={0}
            src={videoSrc ? videoSrc : "https://www.youtube.com/embed/ElZfdU54Cp8?si=Bsr85Bsc_wbeTEkG"}
            title={videoAltText ? videoAltText : "This is a video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        )}
      </Container>
      {!textOnLeft && (
        <Flex
          as={"main"}
          gap="24px"
          flexDirection="column"
          width="calc(45% - 64px)"
          mWidth="100%"
          className="featureText"
        >
          <Text
            as={"h2"}
            fontSize="48px"
            mFontSize="28px"
            fontWeight="900"
            letterSpacing="2px"
            textTransform="uppercase"
            fontFamily="sans-serif"
            color="#707172"
            tabIndex={0}
            className="focus-outline"
          >
            {headingText}
          </Text>
          <Text as={"p"} fontSize="18px" fontWeight="400" tabIndex={0} className="focus-outline">
            {headingPara}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Feature;
