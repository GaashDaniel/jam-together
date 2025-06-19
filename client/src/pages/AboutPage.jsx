import React from "react";
import { Box } from "@mui/material";
import AboutHeroSection from "../components/About/AboutHeroSection";
import AboutMissionSection from "../components/About/AboutMissionSection";
import AboutHowItWorksSection from "../components/About/AboutHowItWorksSection";
import AboutFeaturesSection from "../components/About/AboutFeaturesSection";
import AboutGenresSection from "../components/About/AboutGenresSection";
import AboutValuesSection from "../components/About/AboutValuesSection";
import AboutJoinSection from "../components/About/AboutJoinSection";
export default function AboutPage() {
  return (
    <Box>
      <AboutHeroSection />
      <AboutMissionSection />
      <AboutHowItWorksSection />
      <AboutFeaturesSection />
      <AboutGenresSection />
      <AboutValuesSection />
      <AboutJoinSection />
    </Box>
  );
}