import React from "react";
import HomeText from "@/components/HomeText";
import { WavyBackground } from "@/components/WavyBg";
import NavBar2 from "@/components/nav/NavBar2";

const HomePage = () => {
  return (
    <main>
      <NavBar2 />
      <WavyBackground className="pb-80">
        <HomeText />
      </WavyBackground>
    </main>
  );
};

export default HomePage;
