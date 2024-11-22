import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Offers from "../../components/Offers";
import Hero from "../Hero";
import Contact from "../../components/Contact";

const About = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Offers />
      <Contact />
      <Footer />
    </div>
  );
};

export default About;
