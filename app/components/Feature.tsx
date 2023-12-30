import Container from "@/styles/Container.styled";
import Flex from "@/styles/Flex.styled";
import Text from "@/styles/Text.styled";
import React, { useEffect } from "react";
import { gsap, ScrollTrigger } from "gsap/all";

interface FeatureProps {
  textOnLeft?: boolean;
  isAImage?: boolean;
  haveAButton?: boolean;
  imageSrc?: string;
  imageAltText?: string;
  videoSrc?: string;
  videoAltText?: string;
  headingText?: string;
  headingPara?: string;
  titleColor?: string;
  paraColor?: string;
  bgColor?: string;
  linkText?: string;
  linkUrl?: string;
  buttonText?: string;
  id?: string;
}

const Feature = ({
  textOnLeft = true,
  isAImage = false,
  haveAButton = false,
  linkText,
  linkUrl,
  buttonText,
  imageSrc,
  videoSrc,
  imageAltText,
  videoAltText,
  headingText,
  headingPara,
  titleColor = "white",
  paraColor = "white",
  bgColor = "black",
  id
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
      id={id}
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
      background={bgColor}
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
            color={titleColor}
            tabIndex={0}
            className="focus-outline"
          >
            {headingText}
          </Text>
          <Text as={"p"} fontSize="18px" fontWeight="400" tabIndex={0} className="focus-outline" color={paraColor}>
            {headingPara}
          </Text>
          {haveAButton && (
            <Text color={paraColor}>
              {buttonText}{" "}
              <Text as={"a"} href={linkUrl} className="featureButtonLink focus-outline" color={paraColor}>
                {linkText}
              </Text>{" "}
            </Text>
          )}
        </Flex>
      )}
      <Container as={"aside"} width="45%" mWidth="100%" className="featureAsset">
        {isAImage ? (
          <Container $position="relative" className="featureImageContainer">
            {
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={
                  imageSrc
                    ? imageSrc
                    : "https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                style={{ objectFit: "contain" }}
                alt={imageAltText ? imageAltText : "This is a image"}
                className="featureImage focus-outline"
                tabIndex={0}
              />
            }
          </Container>
        ) : (
          <iframe
            tabIndex={0}
            className="featureVideo focus-outline"
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
            color={titleColor}
            tabIndex={0}
            className="focus-outline"
          >
            {headingText}
          </Text>
          <Text as={"p"} fontSize="18px" fontWeight="400" tabIndex={0} className="focus-outline" color={paraColor}>
            {headingPara}
          </Text>
          {haveAButton && (
            <Text color={paraColor}>
              {buttonText}{" "}
              <Text as={"a"} href={linkUrl} className="featureButtonLink focus-outline" color={paraColor}>
                {linkText}
              </Text>{" "}
            </Text>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default Feature;
