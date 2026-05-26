
import { Shield, Star, Clock } from 'lucide-react';

const TrustBadgeBar = () => {
  return (
    <section className="relative z-30 -mt-16 lg:-mt-20 pb-8 lg:pb-12">
      <div className="container mx-auto max-w-screen-sm lg:max-w-6xl px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-center">
          {/* Years Experience Badge */}
          <div className="flex items-center gap-3 bg-primary text-primary-foreground px-6 py-4 rounded-full shadow-md min-w-[200px] sm:min-w-0">
            <Shield size={20} className="flex-shrink-0" />
            <span className="font-semibold text-sm lg:text-base whitespace-nowrap">20+ Years Experience</span>
          </div>

          {/* 5-Star Rated Badge */}
          <div className="flex items-center gap-3 bg-accent text-accent-foreground px-6 py-4 rounded-full shadow-md min-w-[200px] sm:min-w-0">
            <Star size={20} className="fill-current flex-shrink-0" />
            <span className="font-semibold text-sm lg:text-base whitespace-nowrap">5-Star Rated</span>
          </div>

          {/* 24/7 Emergency Badge */}
          <div className="flex items-center gap-3 bg-foreground text-background px-6 py-4 rounded-full shadow-md min-w-[200px] sm:min-w-0">
            <Clock size={20} className="flex-shrink-0" />
            <span className="font-semibold text-sm lg:text-base whitespace-nowrap">24/7 Emergency Callouts</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadgeBar;
