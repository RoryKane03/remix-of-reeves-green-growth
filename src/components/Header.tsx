import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Menu, X, ChevronDown, ChevronRight, ArrowUpRight, Phone, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/reeves-logo-hq.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isServicesMobileOpen, setIsServicesMobileOpen] = useState(false);
  const [isAreasOpen, setIsAreasOpen] = useState(false);
  const [isAreasMobileOpen, setIsAreasMobileOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<'domestic' | 'commercial' | null>(null);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<'domestic' | 'commercial' | null>(null);
  const [closeMenuTimeout, setCloseMenuTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  // Helper function to check if current route is active
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (href: string, type: string) => {
    setIsMobileMenuOpen(false);
    
    if (type === 'route') {
      navigate(href);
    } else if (type === 'anchor') {
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // Handle dropdown mouse enter - clear any pending close timeouts
  const handleDropdownMouseEnter = () => {
    if (closeMenuTimeout) {
      clearTimeout(closeMenuTimeout);
      setCloseMenuTimeout(null);
    }
  };

  // Handle dropdown mouse leave - start close timeout
  const handleDropdownMouseLeave = (setIsOpen: (value: boolean) => void) => {
    const timeout = setTimeout(() => {
      setIsOpen(false);
      setActiveSubmenu(null);
    }, 600); // 600ms grace period for smoother transitions
    setCloseMenuTimeout(timeout);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (closeMenuTimeout) {
        clearTimeout(closeMenuTimeout);
      }
    };
  }, [closeMenuTimeout]);

  const navigationItems = [
    { href: "/", label: "Home", type: "route" },
    { href: "/about", label: "About", type: "route" },
    { 
      label: "Services", 
      type: "dropdown",
      dropdownType: "services",
      items: [
        { 
          href: "/domestic-services", 
          label: "Domestic Services",
          hasSubmenu: true,
          submenuKey: "domestic" as const,
          submenuItems: [
            { href: "/tree-work", label: "Tree Work" },
            { href: "/hedge-cutting", label: "Hedge Cutting & Maintenance" },
            { href: "/stump-grinding", label: "Stump Grinding & Removal" }
          ]
        },
        { 
          href: "/commercial-services", 
          label: "Commercial Services",
          hasSubmenu: true,
          submenuKey: "commercial" as const,
          submenuItems: [
            { href: "/services/commercial/site-clearance", label: "Site Clearance" },
            { href: "/commercial/tree-work", label: "Commercial Tree Work" },
            { href: "/commercial/hedge-cutting", label: "Hedge Cutting & Maintenance" },
            { href: "/commercial/stump-grinding", label: "Stump Grinding" }
          ]
        }
      ]
    },
    { 
      label: "Areas We Cover", 
      type: "dropdown",
      dropdownType: "areas",
      items: [
        { href: "/locations/birmingham", label: "Birmingham Tree Services" },
        { href: "/locations/worcester", label: "Worcester Tree Services" },
        { href: "/locations/warwick", label: "Warwick Tree Services" }
      ]
    },
    { href: "/our-work", label: "Our Work", type: "route" },
  ];

  return (
    <>
      {/* Main Header - Responsive Height */}
      <style>{`
        :root {
          --header-height: 70px;
          --top-bar-height: 0px;
        }
        @media (min-width: 768px) {
          :root {
            --header-height: 90px;
          }
        }
        @media (min-width: 1024px) {
          :root {
            --header-height: 110px;
            --top-bar-height: 40px;
          }
        }
        
        /* Adjust header position for desktop only */
        @media (min-width: 1024px) {
          header {
            top: var(--top-bar-height) !important;
          }
        }
      `}</style>
      {/* Top Contact Info Bar - Desktop Only */}
      <div 
        className="hidden lg:block fixed top-0 left-0 right-0 z-[52]"
        style={{
          backgroundColor: '#1F4C2E',
          height: '40px',
          borderBottom: '1px solid rgba(212, 175, 55, 0.15)'
        }}
      >
        <div className="container mx-auto max-w-7xl h-full px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-full">
            {/* Left: Phone & Email */}
            <div className="flex items-center gap-6 text-sm">
              {/* Phone */}
              <a 
                href="tel:01527874143" 
                className="flex items-center gap-2 text-white/90 hover:text-gold transition-colors duration-200"
              >
                <Phone className="h-3.5 w-3.5" />
                <span className="font-medium">01527 874143</span>
              </a>
              
              {/* Divider */}
              <div className="h-4 w-px bg-white/20" />
              
              {/* Email */}
              <a 
                href="mailto:info@reevestreesurgeons.co.uk" 
                className="flex items-center gap-2 text-white/90 hover:text-gold transition-colors duration-200"
              >
                <Mail className="h-3.5 w-3.5" />
                <span className="font-medium">info@reevestreesurgeons.co.uk</span>
              </a>
            </div>
            
            {/* Right: Social Media */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/reevestreesurgeons"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-200"
                aria-label="Visit us on Facebook"
              >
                <svg 
                  className="w-4 h-4 text-white"
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@reevestreesurgeons"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-200"
                aria-label="Visit us on TikTok"
              >
                <svg 
                  className="w-4 h-4 text-white"
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
                className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-200"
                aria-label="Visit us on Instagram"
              >
                <svg
                  className="w-4 h-4 text-white"
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

      <header 
        className="fixed left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b"
        style={{ 
          top: '0px',
          background: 'linear-gradient(135deg, rgba(45, 95, 63, 0.95) 0%, rgba(31, 76, 46, 0.98) 100%)',
          height: 'var(--header-height)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12), 0 8px 48px rgba(0, 0, 0, 0.08)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
        }}
      >
        <div className="container mx-auto max-w-7xl px-2 sm:px-4 lg:pl-2 lg:pr-6 xl:pl-2 xl:pr-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo - Responsive Sizing */}
            <Link 
              to="/" 
              className="flex-shrink-0 transition-all duration-300 hover:scale-105 hover:brightness-110"
            >
              <img 
                src={logo}
                alt="Reeves Tree Surgeons"
                className="h-28 sm:h-32 lg:h-40 transition-all duration-300 drop-shadow-md"
                style={{ width: 'auto', objectFit: 'contain' }}
              />
            </Link>

            {/* Desktop: Nav + CTA grouped on right */}
            <div className="hidden md:flex items-center gap-10 ml-auto">
              <nav className="flex items-center gap-10">
                {navigationItems.map((item, index) => {
                if (item.type === 'dropdown') {
                  const isDropdownActive = item.items?.some(subItem => isActive(subItem.href));
                  const isAreasDropdown = item.dropdownType === 'areas';
                  const isOpen = isAreasDropdown ? isAreasOpen : isServicesOpen;
                  const setIsOpen = isAreasDropdown ? setIsAreasOpen : setIsServicesOpen;
                  
                  return (
                    <div 
                      key={index} 
                      className="relative group"
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpen(!isOpen);
                        }}
                        className={`
                          inline-flex items-center gap-1.5 py-2
                          text-[15px] font-medium tracking-wide
                          transition-all duration-300 ease-in-out
                          relative
                          after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] 
                          after:bg-gold after:origin-left after:transition-transform after:duration-300
                          ${isDropdownActive 
                            ? 'text-white after:scale-x-100' 
                            : 'text-white/85 hover:text-white after:scale-x-0 hover:after:scale-x-100'
                          }
                        `}
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                      >
                        {item.label}
                        <ChevronDown 
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {isOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-40"
                            onClick={() => {
                              setIsOpen(false);
                              setActiveSubmenu(null);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Escape') {
                                setIsOpen(false);
                                setActiveSubmenu(null);
                              }
                            }}
                          />
                          <div 
                            className="absolute top-full left-0 mt-2 min-w-[260px] bg-white/95 backdrop-blur-md rounded-[16px] z-50 animate-fade-in border border-[#2D5F3F]/10"
                            style={{
                              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)'
                            }}
                            role="menu"
                          >
                            {item.items?.map((subItem, subIndex) => (
                              <div 
                                key={subIndex}
                                className="relative"
                                onMouseEnter={() => {
                                  if (subItem.hasSubmenu && subItem.submenuKey) {
                                    setActiveSubmenu(subItem.submenuKey);
                                  } else {
                                    setActiveSubmenu(null);
                                  }
                                }}
                              >
                                {subIndex > 0 && (
                                  <div 
                                    className="mx-4" 
                                    style={{ 
                                      height: '1px', 
                                      backgroundColor: 'rgba(31, 76, 46, 0.1)' 
                                    }}
                                  />
                                )}
                                {subItem.hasSubmenu ? (
                                  <Link
                                    to={subItem.href}
                                    onClick={() => {
                                      setIsOpen(false);
                                      setActiveSubmenu(null);
                                    }}
                                    className={`
                                      flex items-center justify-between px-4 py-3 text-[15px] font-medium text-[#1F4C2E] hover:bg-[#D6E7DA] transition-all duration-150 cursor-pointer
                                      ${subIndex === 0 ? 'rounded-t-[12px]' : ''} 
                                      ${subIndex === item.items.length - 1 && !activeSubmenu ? 'rounded-b-[12px]' : ''}
                                    `}
                                    role="menuitem"
                                    aria-haspopup="true"
                                    aria-expanded={activeSubmenu === subItem.submenuKey}
                                  >
                                    <span>{subItem.label}</span>
                                    <ChevronRight className="h-3.5 w-3.5 ml-2" />
                                  </Link>
                                ) : (
                                  <Link
                                    to={subItem.href}
                                    onClick={() => {
                                      setIsOpen(false);
                                      setActiveSubmenu(null);
                                    }}
                                    className={`
                                      block px-4 py-3 text-[15px] font-medium text-[#1F4C2E] hover:bg-[#D6E7DA] transition-all duration-150
                                      ${subIndex === 0 ? 'rounded-t-[12px]' : ''} 
                                      ${subIndex === item.items.length - 1 ? 'rounded-b-[12px]' : ''}
                                    `}
                                    style={{
                                      outline: 'none'
                                    }}
                                    onFocus={(e) => {
                                      e.currentTarget.style.outline = '2px solid rgba(31, 76, 46, 0.6)';
                                      e.currentTarget.style.outlineOffset = '-2px';
                                    }}
                                    onBlur={(e) => {
                                      e.currentTarget.style.outline = 'none';
                                    }}
                                    role="menuitem"
                                    tabIndex={0}
                                  >
                                    {subItem.label}
                                  </Link>
                                )}

                                {/* Flyout Submenu */}
                                {subItem.hasSubmenu && activeSubmenu === subItem.submenuKey && subItem.submenuItems && (
                                  <div
                                    className="absolute left-full top-0 -ml-4 min-w-[280px] bg-[#E9F2EA] rounded-[12px] z-51 animate-fade-in"
                                    style={{
                                      boxShadow: '0 8px 20px rgba(0,0,0,0.08)'
                                    }}
                                    role="menu"
                                    aria-label={`${subItem.label} submenu`}
                                    onMouseEnter={handleDropdownMouseEnter}
                                  >
                                    {subItem.submenuItems.map((nestedItem, nestedIndex) => (
                                      <>
                                        {nestedIndex > 0 && (
                                          <div 
                                            className="mx-4" 
                                            style={{ 
                                              height: '1px', 
                                              backgroundColor: 'rgba(31, 76, 46, 0.1)' 
                                            }}
                                          />
                                        )}
                                        <Link
                                          key={nestedIndex}
                                          to={nestedItem.href}
                                          onClick={() => {
                                            setIsOpen(false);
                                            setActiveSubmenu(null);
                                          }}
                                          className={`
                                            block px-4 py-3 text-[15px] font-medium text-[#1F4C2E] hover:bg-[#D6E7DA] transition-all duration-150
                                            ${nestedIndex === 0 ? 'rounded-t-[12px]' : ''} 
                                            ${nestedIndex === subItem.submenuItems!.length - 1 ? 'rounded-b-[12px]' : ''}
                                          `}
                                          style={{
                                            outline: 'none'
                                          }}
                                          onFocus={(e) => {
                                            e.currentTarget.style.outline = '2px solid rgba(31, 76, 46, 0.6)';
                                            e.currentTarget.style.outlineOffset = '-2px';
                                          }}
                                          onBlur={(e) => {
                                            e.currentTarget.style.outline = 'none';
                                          }}
                                          role="menuitem"
                                          tabIndex={0}
                                        >
                                          {nestedItem.label}
                                        </Link>
                                      </>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                }

                const isItemActive = item.type === 'route' && isActive(item.href);
                
                return (
                  <div key={index} className="relative group">
                    {item.type === 'route' ? (
                      <Link
                        to={item.href}
                        className={`
                          inline-flex items-center py-2
                          text-[15px] font-medium tracking-wide
                          transition-all duration-300 ease-in-out
                          relative
                          after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] 
                          after:bg-gold after:origin-left after:transition-transform after:duration-300
                          ${isItemActive 
                            ? 'text-white after:scale-x-100' 
                            : 'text-white/85 hover:text-white after:scale-x-0 hover:after:scale-x-100'
                          }
                        `}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className={`
                          inline-flex items-center py-2
                          text-[15px] font-medium tracking-wide
                          transition-all duration-300 ease-in-out
                          relative
                          after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] 
                          after:bg-gold after:origin-left after:transition-transform after:duration-300
                          text-white/85 hover:text-white after:scale-x-0 hover:after:scale-x-100
                        `}
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                );
              })}
              </nav>

              {/* Desktop CTA Button */}
              <Link to="/contact">
                <Button
                  className="inline-flex items-center gap-1.5 rounded-full px-6 h-11 text-[15px] font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gold/30"
                  style={{ 
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)',
                    color: '#1F4C2E'
                  }}
                >
                  Contact
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="min-h-11 min-w-11 text-white hover:text-gold hover:bg-white/10"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              
              {/* Mobile Menu Content */}
              <SheetContent 
                side="right" 
                className="w-full sm:max-w-sm bg-white p-0 flex flex-col h-full"
              >
                {/* Mobile Menu Header */}
                <div className="flex justify-start items-center p-4 border-b" style={{ backgroundColor: '#2D5F3F' }}>
                  <img 
                    src="/lovable-uploads/7cb05a94-944c-423f-a219-45f2919721d7.png"
                    alt="Reeves Tree Surgeons"
                    className="h-16 w-auto"
                  />
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-2">
                    {navigationItems.map((item, index) => {
                      if (item.type === 'dropdown') {
                        const isAreasDropdown = item.dropdownType === 'areas';
                        const isOpen = isAreasDropdown ? isAreasMobileOpen : isServicesMobileOpen;
                        const setIsOpen = isAreasDropdown ? setIsAreasMobileOpen : setIsServicesMobileOpen;
                        
                        return (
                          <Collapsible 
                            key={index}
                            open={isOpen} 
                            onOpenChange={setIsOpen}
                          >
                            <CollapsibleTrigger 
                              className="w-full flex items-center justify-between min-h-12 px-4 text-base font-semibold text-[#2B2B2B] hover:bg-gray-100 rounded-lg transition-colors"
                              aria-haspopup="true"
                              aria-expanded={isOpen}
                            >
                              {item.label}
                              <ChevronDown 
                                className={`h-4 w-4 transition-transform duration-200 ${
                                  isOpen ? 'rotate-180' : ''
                                }`} 
                              />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-1 mt-1" style={{ paddingLeft: '12px' }}>
                              {item.items?.map((subItem, subIndex) => {
                                const isSubItemActive = isActive(subItem.href);
                                
                                if (subItem.hasSubmenu && subItem.submenuItems) {
                                  const isNestedOpen = activeMobileSubmenu === subItem.submenuKey;
                                  
                                  return (
                                    <Collapsible
                                      key={subIndex}
                                      open={isNestedOpen}
                                      onOpenChange={(open) => {
                                        setActiveMobileSubmenu(open ? subItem.submenuKey! : null);
                                      }}
                                    >
                                      <div className="w-full flex items-center justify-between min-h-12 rounded-lg transition-colors hover:bg-gray-100">
                                        <Link
                                          to={subItem.href}
                                          onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            setIsOpen(false);
                                            setActiveMobileSubmenu(null);
                                          }}
                                          className="flex-1 px-4 py-3 text-sm font-medium text-[#2B2B2B]"
                                          style={{ minHeight: '44px' }}
                                        >
                                          {subItem.label}
                                        </Link>
                                        <CollapsibleTrigger className="px-4 py-3">
                                          <ChevronDown 
                                            className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                              isNestedOpen ? 'rotate-180' : ''
                                            }`} 
                                          />
                                        </CollapsibleTrigger>
                                      </div>
                                      <CollapsibleContent className="space-y-1 mt-1" style={{ paddingLeft: '16px' }}>
                                        {subItem.submenuItems.map((nestedItem, nestedIndex) => {
                                          const isNestedActive = isActive(nestedItem.href);
                                          return (
                                            <Link
                                              key={nestedIndex}
                                              to={nestedItem.href}
                                              onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                setIsOpen(false);
                                                setActiveMobileSubmenu(null);
                                              }}
                                              className={`
                                                flex items-center min-h-11 px-4 text-sm font-medium rounded-lg transition-colors
                                                ${isNestedActive 
                                                  ? 'bg-[#2D5F3F] text-white' 
                                                  : 'text-[#6B7280] hover:bg-gray-100 hover:text-[#2B2B2B]'
                                                }
                                              `}
                                              style={{
                                                minHeight: '44px'
                                              }}
                                            >
                                              {nestedItem.label}
                                            </Link>
                                          );
                                        })}
                                      </CollapsibleContent>
                                    </Collapsible>
                                  );
                                }
                                
                                return (
                                  <Link
                                    key={subIndex}
                                    to={subItem.href}
                                    onClick={() => {
                                      setIsMobileMenuOpen(false);
                                      setIsOpen(false);
                                    }}
                                    className={`
                                      flex items-center min-h-12 px-4 text-base font-semibold rounded-lg transition-colors
                                      ${isSubItemActive 
                                        ? 'bg-[#2D5F3F] text-white' 
                                        : 'text-[#6B7280] hover:bg-gray-100 hover:text-[#2B2B2B]'
                                      }
                                    `}
                                    style={{
                                      minHeight: '44px',
                                      ...(isSubItemActive ? {
                                        borderLeft: '3px solid #2D5F3F',
                                        paddingLeft: 'calc(1rem - 3px)'
                                      } : {})
                                    }}
                                  >
                                    {subItem.label}
                                  </Link>
                                );
                              })}
                            </CollapsibleContent>
                          </Collapsible>
                        );
                      }

                      const isItemActive = item.type === 'route' && isActive(item.href);
                      
                      return (
                        <button
                          key={index}
                          onClick={() => handleNavClick(item.href, item.type)}
                          className={`
                            w-full flex items-center min-h-12 px-4 text-base font-semibold rounded-lg transition-colors text-left
                            ${isItemActive 
                              ? 'bg-[#2D5F3F] text-white' 
                              : 'text-[#2B2B2B] hover:bg-gray-100'
                            }
                          `}
                          style={isItemActive ? {
                            borderLeft: '3px solid #2D5F3F',
                            paddingLeft: 'calc(1rem - 3px)'
                          } : {}}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </nav>

                {/* Mobile CTA Button */}
                <div className="p-4 border-t">
                  <Link to="/contact" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      className="w-full flex items-center justify-center gap-2 h-12 rounded-full font-semibold shadow-lg"
                      style={{ backgroundColor: '#D4AF37', color: '#2D5F3F' }}
                    >
                      Contact
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

    </>
  );
};

export default Header;
