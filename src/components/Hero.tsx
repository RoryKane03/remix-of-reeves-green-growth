import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, FileText, Shield, Star, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useIsMobile } from '@/hooks/use-mobile';
import { useConnectionSpeed } from '@/hooks/useConnectionSpeed';
import { isInAppBrowser } from '@/utils/browserDetection';
import arbApprovedBadge from '@/assets/accreditations/arb-approved-badge.png';

const Hero = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isInApp, setIsInApp] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { shouldLoadVideo: shouldLoadBasedOnConnection, isSlowConnection } = useConnectionSpeed();

  // Detect in-app browsers (TikTok, Instagram, Facebook, etc.)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const detected = isInAppBrowser();
      setIsInApp(detected);
      if (detected) {
        console.log('In-app browser detected - showing static image instead of video');
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lazy load video - respect connection speed and device
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    // Don't load video on slow connections or if user has data saver enabled
    if (isSlowConnection && isMobile) {
      console.log('Skipping video load: slow connection detected');
      return;
    }

    // Load immediately on mobile (fast connections), delayed on desktop
    const loadTimer = setTimeout(() => {
      setShouldLoadVideo(true);
    }, isMobile ? 0 : 3000);

    return () => {
      clearTimeout(loadTimer);
    };
  }, [isMobile, isSlowConnection]);

  // Handle video playback once loaded
  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return;

    const video = videoRef.current;

    const attemptPlay = async () => {
      try {
        setVideoLoaded(true);
        await video.play();
      } catch (error) {
        console.log('Autoplay prevented, will try on user interaction');
        // Fallback: try to play on any user interaction
        const playOnInteraction = async () => {
          try {
            await video.play();
            document.removeEventListener('touchstart', playOnInteraction);
            document.removeEventListener('click', playOnInteraction);
          } catch (e) {
            console.log('Video play failed');
          }
        };
        document.addEventListener('touchstart', playOnInteraction, { once: true });
        document.addEventListener('click', playOnInteraction, { once: true });
      }
    };

    const handleCanPlay = () => {
      attemptPlay();
    };

    const handleLoadedMetadata = () => {
      // For iOS, try to play as soon as metadata is loaded
      if (isMobile) {
        attemptPlay();
      }
    };

    const handleError = () => {
      console.warn('Hero video failed to load');
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Force load on mobile
    if (isMobile) {
      video.load();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [shouldLoadVideo, isMobile]);

  const scrollToContact = () => {
    navigate('/contact');
  };

  const scrollToTestimonials = () => {
    if (typeof document === 'undefined') return;
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    if (typeof document === 'undefined') return;
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    if (typeof document === 'undefined') return;
    const aboutSection = document.getElementById('about') || document.querySelector('[id*="about"]');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative min-h-screen flex items-start md:items-center overflow-hidden"
    >
      {/* Background Video with Lazy Loading - Performance Optimized */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Static hero image (video removed due to GitHub 100 MB file limit) */}
        <img
          src="/lovable-uploads/hero-tree-work-drone.jpg"
          alt="Tree surgeon performing aerial tree work in residential garden with professional safety equipment"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 35%' }}
          width="1920"
          height="1080"
          loading="eager"
          decoding="async"
        />

        {/* Hero video removed (file exceeded GitHub's 100 MB limit). Poster image above is used as the permanent background. */}
        
        {/* Dark gradient overlay - Mobile gets lighter overlay, Desktop gets gradient */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: isMobile 
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.4))'
              : 'linear-gradient(to right, rgba(0,0,0,0.65), rgba(0,0,0,0.35), rgba(0,0,0,0.20))'
          }} 
        />
      </div>

      {/* ARB Approved Badge - Top Right */}
        <div 
          className="absolute right-4 sm:right-6 lg:right-8 xl:right-10 z-30 animate-fade-in"
          style={{ 
            top: 'calc(var(--header-height) + var(--top-bar-height) + 32px)',
            animationDelay: '600ms'
          }}
        >
        <div 
          className="group"
          role="img"
          aria-label="ARB Approved Contractor - Official accreditation by the Arboricultural Association"
        >
          {/* ARB Logo - Clean & Simple */}
          <img 
            src={arbApprovedBadge}
            alt="ARB Approved Contractor - Certified Arborist"
            className="w-24 sm:w-28 lg:w-36 xl:w-40 h-auto transition-transform duration-300 group-hover:scale-105"
            style={{
              filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.4))',
            }}
            width="160"
            height="160"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* Content Container with Safe Padding */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1400px] w-full text-left pt-36 sm:pt-20 md:pt-32 md:pb-24">
        {/* Small Badge - Smaller on Mobile */}
        <div className="mb-8 sm:mb-6 inline-block px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border animate-fade-in text-xs sm:text-sm" style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          fontWeight: '600'
        }}>
          {isMobile ? 'ARB Approved • Since 2002' : 'ARB Approved Arborists • Serving West Midlands since 2002'}
        </div>

        {/* H1 Headline - Better Mobile Scaling */}
        <h1 
          className="font-semibold text-white mb-6 sm:mb-4 leading-tight animate-slide-up max-w-4xl"
          style={{
            fontSize: 'clamp(24px, 7vw, 48px)',
            lineHeight: 'clamp(1.25, 1.3, 1.2)',
            textShadow: '2px 2px 12px rgba(0,0,0,0.9)'
          }}
        >
          Expert Tree Surgery Services in the West Midlands
        </h1>

        {/* Subheading - Better Mobile Scaling */}
        <h2 
          className="mb-14 sm:mb-8 max-w-3xl leading-relaxed animate-fade-in"
          style={{
            fontSize: 'clamp(14px, 3.5vw, 24px)',
            color: 'rgba(255, 255, 255, 0.9)',
            textShadow: '1px 1px 8px rgba(0,0,0,0.85)',
            animationDelay: '200ms',
            lineHeight: '1.5'
          }}
        >
          {isMobile 
            ? 'Trusted tree care specialists serving Birmingham, Worcester & the West Midlands'
            : 'Trusted tree care specialists delivering safe, professional, and affordable services across Birmingham, Worcester, Bromsgrove and surrounding areas'
          }
        </h2>

        {/* CTA Buttons - Full Width on Mobile */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Button 
            onClick={scrollToContact}
            size="lg"
            className="w-full sm:w-auto text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg"
            style={{
              backgroundColor: '#2D5F3F',
              minHeight: isMobile ? '44px' : '48px',
              padding: '12px 24px'
            }}
          >
            Get Free Quote
          </Button>
          
          <Button 
            onClick={scrollToServices}
            size="lg"
            variant="outline"
            className="w-full sm:w-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: 'white',
              minHeight: isMobile ? '44px' : '48px',
              padding: '12px 24px'
            }}
          >
            View Our Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
