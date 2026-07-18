import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/home/Hero";
import Features from "../../components/home/Features";
import AboutReezo from "../../components/home/AboutReezo";
import HowItWorks from "../../components/home/HowItWorks";
import Testimonials from "../../components/home/testimonials";
import FAQ from "../../components/home/FAQ";
import CTA from "../../components/home/CTA";
import Footer from "../../components/layout/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero/>
      <Features/>
      <AboutReezo/>
      <HowItWorks/>
      <Testimonials/>  
      <FAQ/>
      <CTA/>
      <Footer/>    
    </>
  );
};

export default Home;