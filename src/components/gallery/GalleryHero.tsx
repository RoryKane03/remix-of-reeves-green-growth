const GalleryHero = () => {
  return (
    <section className="relative overflow-hidden bg-neutral-050">
      {/* Hero Image with Enhanced Gradient Overlay */}
      <div className="relative h-[50vh] lg:h-[60vh] max-h-[550px]">
        <img 
          src="/lovable-uploads/f3ae2a98-d484-4b4f-8320-2236d94d3904-1280.webp"
          srcSet="/lovable-uploads/f3ae2a98-d484-4b4f-8320-2236d94d3904-800.webp 800w, /lovable-uploads/f3ae2a98-d484-4b4f-8320-2236d94d3904-1280.webp 1280w"
          sizes="100vw"
          width={1280}
          height={720}
          alt="Professional tree surgeons and equipment in action at work site"
          className="w-full h-full object-cover"
          style={{
            objectPosition: 'center 25%',
            filter: 'saturate(1.1) contrast(1.05)'
          }}
          loading="eager"
          {...({ fetchpriority: 'high' } as Record<string, string>)}
          decoding="async"
        />
        {/* Elegant gradient overlay matching homepage style */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to top, rgba(14, 45, 35, 0.75) 0%, rgba(22, 58, 43, 0.5) 35%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0) 100%)'
          }} 
        />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto max-w-7xl px-4 lg:px-6 pb-28 lg:pb-36">
            <div className="max-w-3xl animate-fade-in-up">
              <p className="text-sm font-semibold tracking-wide mb-4 text-white/90 uppercase">
                Portfolio
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-white leading-tight">
                Our Work Gallery
              </h1>
              <p className="text-lg lg:text-xl mb-8 text-white/95 leading-relaxed max-w-2xl">
                Explore our recent projects showcasing professional tree surgery, hedge maintenance, stump grinding, and site clearance across the West Midlands.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryHero;