import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Programs from '../components/Programs';
import AboutUs from '../components/AboutUs';
import Facilities from '../components/Facilities';
import RegistrationForm from '../components/RegistrationForm';
import GoogleMaps from '../components/GoogleMaps';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export default function LandingPage() {
  const [selectedSkill, setSelectedSkill] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-offwhite selection:bg-secondary/30 antialiased overflow-hidden">
      <Navbar />
      <Hero />
      <Programs setSelectedSkill={setSelectedSkill} />
      <Facilities />
      <AboutUs />
      <RegistrationForm selectedSkill={selectedSkill} />
      <GoogleMaps />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
