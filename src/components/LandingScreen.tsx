import React from 'react';
import { ASSET_IMAGES } from '../data/mockData';

interface LandingScreenProps {
  onStart: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
  return (
    <div className="bg-[#FFFDF9] text-[#131b1c] min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-5 py-8">
      {/* Subtle Radial Glow */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#9ecedb]/20 via-[#FFFDF9] to-[#F2EBE1]" />

      <main className="relative z-10 flex flex-col items-center justify-between w-full max-w-2xl mx-auto h-full my-auto text-center py-6">
        {/* Synexa Logo */}
        <div className="mb-6 flex flex-col items-center animate-fade-in-up">
          <img
            src={ASSET_IMAGES.synexaLogo}
            alt="Synexa Logo"
            className="h-20 md:h-24 w-auto object-contain drop-shadow-sm transition-transform hover:scale-105 duration-300"
          />
        </div>

        {/* Character / Student Illustration */}
        <div className="relative mb-8 animate-fade-in-up">
          <div className="absolute -inset-4 bg-[#9ecedb]/20 rounded-full blur-2xl pointer-events-none" />
          <img
            src={ASSET_IMAGES.studentIllustration}
            alt="Student Mascot Greeting"
            className="relative h-64 md:h-80 w-auto object-contain drop-shadow-xl rounded-2xl transition-transform hover:scale-[1.02] duration-300"
          />
        </div>

        {/* Headlines */}
        <div className="space-y-4 max-w-lg animate-fade-in-up">
          <h1 className="font-bold text-3xl md:text-5xl text-[#0a0f10] leading-tight tracking-tight">
            Learn in your language.
            <br />
            <span className="text-[#285964]">Grow into English.</span>
          </h1>

          <div className="text-lg md:text-xl text-[#3f4a4c] font-medium space-y-1">
            <p className="font-bold text-[#283f45]">तुमच्या भाषेत शिका.</p>
            <p className="text-[#6c777a]">इंग्रजीत प्रगती करा.</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 animate-fade-in-up w-full max-w-md">
          <button
            onClick={onStart}
            className="w-full bg-[#9ecedb] text-[#114651] font-bold text-lg md:text-xl px-8 py-4 rounded-full shadow-[0px_4px_20px_rgba(45,125,142,0.2)] hover:-translate-y-1 hover:bg-[#acdcea] hover:shadow-[0px_8px_28px_rgba(45,125,142,0.3)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>Get Started</span>
            <span className="text-[#32626e] text-sm font-semibold">(सुरु करा)</span>
            <span className="material-symbols-outlined ml-1">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  );
};
