import React from "react";
import Feature from "./Feature";

const Features = () => {
  return (
    <>
      <Feature
        id="container-3"
        headingText="Web accessibility"
        headingPara="I design web apps with a touch of magic, making them accessible to all by weaving the threads of inclusivity into every line of code."
        isAImage={false}
        videoSrc="https://www.youtube.com/embed/0jjR-d2XnzE?si=G8VoZiB3sVsoQ4Kc"
        bgColor="#A1EEBD"
        titleColor="black"
        paraColor="black"
      />
      <Feature
        headingText="RESPONSIVE & DARK CONTRAST"
        headingPara="I ensure that the app shines across all device sizes. Additionally, if you experience color blindness and require the website in dark contrast, the app is always accessible."
        isAImage={true}
        textOnLeft={false}
        imageSrc="/images/responsiveContrast.png"
        bgColor="#2F58CD"
      />
      <Feature
        headingText="Byteping Functionality"
        headingPara="Your time is valuable, so there's no need to attempt guest credentials and wait for the free serverless API of Render to restart. I have all the functionalities recorded."
        isAImage={false}
        videoSrc="https://www.youtube.com/embed/GfginJ1uzgk?si=6CQiJBELzmBRUg-6"
        bgColor="#FFD1DA"
        titleColor="black"
        paraColor="black"
      />
      <Feature
        headingText="Maintainable Code"
        headingPara="I ensure the maintainability of my code by consistently incorporating proper commits, tags, and automatic linting and prettifying processes, along with app releases setup for efficient code management."
        isAImage={true}
        textOnLeft={false}
        imageSrc="/images/githubCode.png"
        bgColor="#B31312"
        haveAButton
        linkText="Github"
        linkUrl="https://github.com/arjunan-k/byteping"
        buttonText="Check out the code in"
      />
      <Feature
        headingText="E2E Testing"
        headingPara="I write tests that embrace failure gracefully and ironically, struggle to craft ones that always succeed. It's a coding paradox."
        isAImage={false}
        videoSrc="https://www.youtube.com/embed/VBgdEkmweQQ?si=UGqnG__0caal4oX7"
        bgColor="#F6F7C4"
        titleColor="black"
        paraColor="black"
      />
      <Feature
        headingText="Performance Optimization"
        headingPara="I intricately test to guarantee peak performance, consistently attaining stellar Lighthouse scores with unwavering finesse."
        isAImage={true}
        textOnLeft={false}
        imageSrc="/images/lightHouse.png"
        bgColor="#FF4C29"
      />
    </>
  );
};

export default Features;
