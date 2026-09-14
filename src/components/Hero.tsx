import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import arbApprovedBadge from '@/assets/accreditations/arb-approved-badge.png';

const Hero = () => {
  return (
    <section id="home" className="home-hero">
      <picture className="home-hero__media">
        <source
          type="image/webp"
          srcSet="/lovable-uploads/hero-tree-work-drone-400.webp 400w, /lovable-uploads/hero-tree-work-drone-800.webp 800w, /lovable-uploads/hero-tree-work-drone-1200.webp 1200w, /lovable-uploads/hero-tree-work-drone-2000.webp 2000w"
          sizes="100vw"
        />
        <img
          src="/lovable-uploads/hero-tree-work-drone.jpg"
          alt="Reeves tree surgeon working high in a tree above West Midlands rooftops"
          className="home-hero__image"
          width="1920"
          height="1080"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      <div className="home-hero__directional-overlay" aria-hidden="true" />
      <div className="home-hero__top-overlay" aria-hidden="true" />

      <div className="home-hero__inner">
        <div className="home-hero__content">
          <p className="home-hero__kicker home-hero__entrance home-hero__entrance--1">
            Family-run from Bromsgrove
          </p>

          <div className="home-hero__badge">
            <img
              src={arbApprovedBadge}
              alt="ARB Approved Contractor"
              width="160"
              height="160"
              loading="eager"
              decoding="async"
            />
            <p>Top 5% of tree surgeons</p>
          </div>

          <h1 className="home-hero__title home-hero__entrance home-hero__entrance--2">
            The West Midlands' ARB Approved tree surgeons since 2002
          </h1>

          <p className="home-hero__subtext home-hero__entrance home-hero__entrance--3">
            40,000+ jobs completed safely. Free quotes across Birmingham, Worcester, Bromsgrove and the West Midlands.
          </p>

          <div className="home-hero__actions home-hero__entrance home-hero__entrance--4">
            <Button asChild size="lg" className="home-hero__button home-hero__button--primary">
              <Link to="/contact">Get a free quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="home-hero__button home-hero__button--secondary">
              <Link to="/our-work">See recent work</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;