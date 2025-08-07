import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Footer } from "@/components/Footer";
import { SignupForm } from "@/components/SignupForm";

const Index = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  // Show signup form on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSignupOpen(true);
    }, 1000); // Show after 1 second

    return () => clearTimeout(timer);
  }, []);

  const handleSignupClick = () => {
    setIsSignupOpen(true);
  };

  const handleSignupClose = () => {
    setIsSignupOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection onSignupClick={handleSignupClick} />
      <ServicesGrid />
      <ReviewsSection />
      <Footer />
      
      <SignupForm 
        isOpen={isSignupOpen} 
        onClose={handleSignupClose} 
      />
    </div>
  );
};

export default Index;
