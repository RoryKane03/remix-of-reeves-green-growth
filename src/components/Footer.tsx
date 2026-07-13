import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MapPin, TreePine, CheckCircle, AlertTriangle } from 'lucide-react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { trackPhoneCall } from '@/utils/phoneTracking';
import facebookIcon from '@/assets/social/facebook-icon.webp';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const {
    resetConsent
  } = useCookieConsent();
  return <>
      {/* Gradient separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent mt-16 mb-6" />
      
      <footer className="text-white pt-16 md:pt-20 lg:pt-24" style={{
      backgroundColor: '#2D5F3F'
    }}>
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-10 pb-16 md:pb-20 lg:pb-24">
          {/* Main Footer Content - 4 Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-8">
            
            {/* Column 1: Company Info & Accreditations */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <TreePine className="text-white" size={22} />
                <h3 className="text-lg font-bold font-heading text-white leading-tight">Reeves Tree Surgeons</h3>
              </div>
              
              <p className="text-white/90 text-sm leading-relaxed">
                Professional tree care services in Bromsgrove and surrounding areas.
              </p>

              {/* Compact Inline Badges */}
              <div className="flex flex-wrap gap-1.5">
                <Badge className="bg-white hover:bg-white border-0 text-xs px-1.5 py-0.5 font-medium" style={{
                color: '#2D5F3F'
              }}>
                  NPTC Qualified
                </Badge>
                <Badge className="bg-white hover:bg-white border-0 text-xs px-1.5 py-0.5 font-medium" style={{
                color: '#2D5F3F'
              }}>
                  Fully Insured
                </Badge>
                <Badge className="bg-gold hover:bg-gold text-forest-900 border-0 text-xs px-1.5 py-0.5 font-medium">Est. 2002</Badge>
              </div>

              {/* Accreditation Logos - Horizontal Compact */}
              <div className="space-y-2 pt-3 pb-4">
                <h4 className="text-xs font-semibold font-heading uppercase tracking-wide text-white/70">
                  Accreditations
                </h4>
                <div className="flex items-center gap-3 flex-wrap">
                  <img src="/lovable-uploads/fe5345fd-6675-451b-ba65-1dc38a1fbea6.png" alt="ARB" className="h-9 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" loading="lazy" />
                  <img src="/lovable-uploads/safecontractor-logo.png" alt="SafeContractor Approved" className="h-9 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" loading="lazy" />
                  <img src="/lovable-uploads/65db11fc-0fcf-4c16-81ae-7f7cc45d1b75.png" alt="Trustmark" className="h-9 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" loading="lazy" />
                </div>
              </div>
            </div>

            {/* Column 2: Our Services */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold font-heading uppercase tracking-wide text-white mb-3">Our Services</h4>
              
              {/* Domestic Services */}
              <div className="space-y-2">
                <h5 className="text-xs font-semibold text-white/80 mb-1.5">Domestic</h5>
                <ul className="space-y-1.5 text-white/90 text-sm">
                  <li><a href="/tree-work" className="hover:text-gold transition-colors hover:underline">Tree Work</a></li>
                  <li><a href="/hedge-cutting" className="hover:text-gold transition-colors hover:underline">Hedge Cutting</a></li>
                  <li><a href="/stump-grinding" className="hover:text-gold transition-colors hover:underline">Stump Grinding</a></li>
                </ul>
              </div>

              {/* Commercial Services */}
              <div className="space-y-2">
                <h5 className="text-xs font-semibold text-white/80 mb-1.5">Commercial</h5>
                <ul className="space-y-1.5 text-white/90 text-sm">
                  <li><a href="/commercial-site-clearance" className="hover:text-gold transition-colors hover:underline">Site Clearance</a></li>
                  <li><a href="/commercial-tree-work" className="hover:text-gold transition-colors hover:underline">Commercial Tree Work</a></li>
                  <li><a href="/commercial-hedge-cutting" className="hover:text-gold transition-colors hover:underline">Commercial Hedge Cutting</a></li>
                  <li><a href="/commercial-stump-grinding" className="hover:text-gold transition-colors hover:underline">Commercial Stump Grinding</a></li>
                </ul>
              </div>
            </div>

            {/* Column 3: Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold font-heading uppercase tracking-wide text-white mb-3">Quick Links</h4>
              <ul className="space-y-2 text-white/90 text-sm">
                <li><a href="/" className="hover:text-gold transition-colors hover:underline inline-block py-0.5 min-h-[32px] flex items-center">Home</a></li>
                <li><a href="/about" className="hover:text-gold transition-colors hover:underline inline-block py-0.5 min-h-[32px] flex items-center">About Us</a></li>
                <li><a href="/our-work" className="hover:text-gold transition-colors hover:underline inline-block py-0.5 min-h-[32px] flex items-center">Our Work</a></li>
                <li><a href="/locations/birmingham" className="hover:text-gold transition-colors hover:underline inline-block py-0.5 min-h-[32px] flex items-center">Birmingham</a></li>
                <li><a href="/locations/worcester" className="hover:text-gold transition-colors hover:underline inline-block py-0.5 min-h-[32px] flex items-center">Worcester</a></li>
                
                <li><a href="/contact" className="hover:text-gold transition-colors hover:underline inline-block py-0.5 min-h-[32px] flex items-center">Get Quote</a></li>
                <li><a href="/privacy-policy" className="hover:text-gold transition-colors hover:underline inline-block py-0.5 min-h-[32px] flex items-center">Privacy Policy</a></li>
                <li>
                  <button onClick={resetConsent} className="hover:text-gold transition-colors hover:underline text-left focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-forest-900 rounded py-0.5 min-h-[32px] flex items-center" aria-label="Cookie Settings">
                    Cookie Settings
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold font-heading uppercase tracking-wide text-white mb-3">Contact Us</h4>
              
              <div className="space-y-2.5">
                <div className="flex items-start gap-2">
                  <Phone className="text-white mt-0.5 flex-shrink-0" size={14} />
                  <div className="text-sm">
                    <a href="tel:01527874143" onClick={() => trackPhoneCall('01527874143')} className="hover:text-gold transition-colors text-white hover:underline">
                      01527 874143
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Mail className="text-white mt-0.5 flex-shrink-0" size={14} />
                  <div className="text-sm">
                    <a href="mailto:info@reevestreesurgeons.co.uk" className="hover:text-gold transition-colors text-white hover:underline break-all">
                      info@reevestreesurgeons.co.uk
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <MapPin className="text-white mt-0.5 flex-shrink-0" size={14} />
                  <div className="text-sm text-white/90">
                    Bromsgrove, Worcestershire
                  </div>
                </div>

                {/* Compact Emergency Box */}
                <div className="bg-gold rounded-md p-3 mt-3">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle size={14} className="text-forest-900" />
                    <span className="text-xs font-semibold text-forest-900">24/7 Emergency</span>
                  </div>
                  <a href="tel:01527874143" onClick={() => trackPhoneCall('01527874143')} className="text-forest-900 font-bold text-base hover:text-forest-800 transition-colors">
                    01527 874143
                  </a>
                </div>

                {/* Social Media */}
                <div className="mt-4">
                  <h5 className="text-xs font-semibold text-white/80 mb-2">Follow Us</h5>
                  <div className="flex items-center gap-3">
                    <a 
                      href="https://www.facebook.com/reevestreesurgeons" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block hover:opacity-80 transition-opacity"
                      aria-label="Visit our Facebook page"
                    >
                      <img 
                        src={facebookIcon} 
                        alt="Facebook" 
                        className="h-8 w-8 object-contain"
                      />
                    </a>
                    <a 
                      href="https://www.tiktok.com/@reevestreesurgeons" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-200"
                      aria-label="Visit our TikTok page"
                    >
                      <svg 
                        className="w-5 h-5 text-white"
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                      </svg>
                    </a>
                    <a
                      href="https://instagram.com/reevestreesurgeons/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-200"
                      aria-label="Visit our Instagram page"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.975 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.975-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.142 0-3.512.012-4.752.069-1.04.047-1.605.218-1.98.362-.498.193-.853.424-1.227.798-.374.374-.605.729-.798 1.227-.144.375-.315.94-.362 1.98C3.013 9.488 3.001 9.858 3.001 13s.012 3.512.069 4.752c.047 1.04.218 1.605.362 1.98.193.498.424.853.798 1.227.374.374.729.605 1.227.798.375.144.94.315 1.98.362 1.24.057 1.61.069 4.752.069s3.512-.012 4.752-.069c1.04-.047 1.605-.218 1.98-.362.498-.193.853-.424 1.227-.798.374-.374.605-.729.798-1.227.144-.375.315-.94.362-1.98.057-1.24.069-1.61.069-4.752s-.012-3.512-.069-4.752c-.047-1.04-.218-1.605-.362-1.98a3.298 3.298 0 00-.798-1.227 3.298 3.298 0 00-1.227-.798c-.375-.144-.94-.315-1.98-.362C15.512 4.013 15.142 4.001 12 4.001zm0 3.064A4.935 4.935 0 1112 17a4.935 4.935 0 010-9.935zm0 8.135a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zm6.406-8.845a1.153 1.153 0 11-2.306 0 1.153 1.153 0 012.306 0z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Legal & Copyright */}
          <div className="mt-10 pt-7 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-white/70">
              <div className="space-y-0.5">
                <div>© {currentYear} Reeves Tree Surgeons. All rights reserved.</div>
                <div>Reeves Tree Surgeons Limited | Registered office 4e Heathfield Road, Kings Heath, Birmingham B14 7DB. | Registered in England No. 05491186</div>
              </div>
              <div className="text-gold font-semibold text-sm">Established 2002</div>
            </div>
          </div>
        </div>
      </footer>
    </>;
};
export default Footer;