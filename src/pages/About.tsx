import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Award, Users, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import AccreditationCarousel from "@/components/AccreditationCarousel";
import SEO from "@/components/SEO";
import { getLocalBusinessData } from "@/utils/structuredData";
import arbLogo from "@/assets/accreditations/arb-logo.png";
import { handlePhoneClick } from "@/utils/phoneTracking";
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCallUs = () => {
    handlePhoneClick('01527874143');
  };
  const credentials = [
    {
      icon: Award,
      title: "Qualified Arborists",
      description:
        "Our 20-person team holds NPTC, Lantra, CSCS, and IPAF certifications, ensuring every job is completed to the highest industry standards.",
    },
    {
      icon: Shield,
      title: "Safety First",
      description:
        "Every project includes a full site-specific risk assessment. We're fully insured for your peace of mind.",
    },
    {
      icon: Users,
      title: "Trusted Locally",
      description:
        "From small domestic projects to large national contracts, we deliver reliable service trusted by our community since 2002.",
    },
  ];
  const values = [
    "Customer-first service",
    "Honest, transparent quotes",
    "Safe, professional practices",
    "Long-term care for trees & landscapes",
    "Environmental responsibility",
    "24/7 emergency availability",
  ];

  const trustBadges = [
    { icon: Award, text: "ARB Approved" },
    { icon: Users, text: "20+ Years" },
    { icon: Shield, text: "Fully Insured" },
    { icon: CheckCircle2, text: "NPTC Certified" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About Reeves Tree Surgeons - ARB Approved Since 2002 | West Midlands"
        description="Meet the team at Reeves Tree Surgeons — ARB Approved Contractor with 20 fully qualified NPTC arborists and over 20 years of professional tree care experience across Birmingham, Worcester, Solihull, and the West Midlands."
        keywords="about reeves tree surgeons, tree surgery company, ARB approved contractor, qualified arborists, NPTC certified, West Midlands tree care, professional tree surgeons, Birmingham tree surgeons, Worcester arborists, Solihull tree care"
        url="/about"
        structuredData={getLocalBusinessData()}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about", current: true },
        ]}
      />
      <Header />

      <main>
        {/* Compact Page Header */}
        <section className="bg-background pt-24 md:pt-28 pb-8 md:pb-12">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-green-50 text-green-700 hover:bg-green-100 px-4 py-2 text-sm font-semibold">
                About Reeves Tree Surgeons
              </Badge>

              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Trusted Tree Surgeons Since 2002</h1>

              <p className="text-lg lg:text-xl text-muted-foreground mb-8">
                Over 20 years of professional tree care across Birmingham, Worcester, Solihull, and the West Midlands
              </p>

              {/* Trust Badges Row */}
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                {trustBadges.map((badge, index) => {
                  const IconComponent = badge.icon;
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-green-700" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{badge.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Company Story Section */}
        <section className="py-16 lg:py-20 bg-muted">
          <div className="container mx-auto px-4 lg:px-6">
            {/* Centered Heading */}
            <div className="text-center mb-12">
              <p className="text-green-600 uppercase tracking-wide font-semibold text-sm mb-3">Our Story</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Professional Tree Care You Can Trust
              </h2>
            </div>

            {/* Featured Team Image - Centered */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
                <img
                  src="/lovable-uploads/26fe9352-cca5-4102-aedb-6ba7f5c2de66.png"
                  alt="Reeves Tree Surgeons team - 20 fully qualified NPTC and Lantra certified arborists with 20+ years experience across Birmingham, Worcester, Solihull, and West Midlands"
                  className="w-full h-auto object-contain"
                  width="900"
                  height="600"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Two-Column Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {/* Left: Company Story Text */}
              <div className="space-y-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2002, Reeves Tree Surgeons is an{" "}
                  <strong className="text-foreground">ARB Approved Contractor</strong> delivering professional tree care
                  across the West Midlands. With a team of{" "}
                  <strong className="text-foreground">20 fully qualified tree surgeons</strong>, we've completed over{" "}
                  <strong className="text-foreground">40,000 projects</strong> for homeowners and businesses throughout
                  Birmingham, Worcester, Solihull, Dudley, Kidderminster, Stourbridge, Wolverhampton, Bromsgrove, and
                  Redditch, since 2002.
                </p>

                <p>
                  Our team holds comprehensive{" "}
                  <strong className="text-foreground">NPTC, Lantra, CSCS, and IPAF certifications</strong>, ensuring
                  every job meets the highest industry standards. Every project includes full site-specific risk
                  assessments, and we maintain{" "}
                  <strong className="text-foreground">£10 million public liability insurance</strong> for complete peace
                  of mind.
                </p>

                <p>
                  Led by founder <strong className="text-foreground">James Matthews</strong>, a fully qualified and
                  highly experienced Arborist with over 20 years of hands-on experience, our team combines traditional
                  craftsmanship with modern safety standards. This commitment to excellence has built our reputation for
                  safe, reliable, and high-quality tree care.
                </p>
              </div>

              {/* Right: Key Credentials Box */}
              <div className="bg-card border-l-4 border-primary rounded-lg p-6 lg:p-8 space-y-3 h-fit shadow-md">
                <h3 className="text-xl font-semibold text-foreground mb-4">Key Credentials:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">ARB Approved Contractor</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">NPTC & Lantra Qualified Team</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">CSCS & IPAF Certified</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">£10M Public Liability Insurance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">First Aid Certified</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Cards Section */}
        <section className="py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Expertise & Qualifications</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Decades of experience backed by industry-leading certifications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {credentials.map((credential, index) => {
                const IconComponent = credential.icon;
                return (
                  <Card
                    key={index}
                    className="h-full bg-card border-border hover:border-green-200 hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
                        <IconComponent size={32} className="text-white" />
                      </div>
                      <CardTitle className="text-xl font-semibold">{credential.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center px-6 pb-8">
                      <p className="text-muted-foreground leading-relaxed">{credential.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* ARB Accreditation Spotlight */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-green-50 to-green-100">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-xl">
              <div className="text-center">
                <img
                  src={arbLogo}
                  alt="ARB Approved Contractor Logo"
                  className="w-40 h-40 lg:w-48 lg:h-48 mx-auto mb-6 object-contain"
                  width="192"
                  height="192"
                  loading="lazy"
                />

                <Badge className="mb-4 bg-green-600 text-white hover:bg-green-700 px-4 py-2 text-sm font-semibold">
                  ARB Approved Contractor
                </Badge>

                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Accredited Excellence Since 2020
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  As an ARB Approved Contractor, we meet the highest professional standards in arboriculture. This
                  prestigious accreditation is only awarded to tree care companies who demonstrate exceptional technical
                  competence, safety practices, and customer service. Our ARB status is your guarantee of quality,
                  professionalism, and peace of mind.
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-green-600" />
                    <span className="text-sm font-medium">TrustMark Approved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-6 h-6 text-green-600" />
                    <span className="text-sm font-medium">SafeContractor Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-muted to-muted/50 rounded-2xl p-8 lg:p-12">
                <div className="text-center mb-10">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">What We Stand For</h2>
                  <p className="text-lg text-muted-foreground">Our core values guide everything we do</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <Check size={18} className="text-white" />
                      </div>
                      <span className="text-lg text-foreground font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Accreditation Carousel */}
        <section className="py-12 lg:py-16 bg-muted">
          <div className="container mx-auto px-4 lg:px-6">
            <AccreditationCarousel />
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-brand">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="container mx-auto max-w-4xl px-6 relative z-10">
            <div className="text-center space-y-6">
              {/* Heading */}
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Ready to Transform Your Outdoor Space?
              </h2>

              {/* Subheading */}
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Get a free, no-obligation quote from West Midlands' most trusted tree surgeons. Professional service
                since 2002.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button
                  onClick={() => (window.location.href = "/contact")}
                  size="lg"
                  className="font-semibold px-8 py-6 text-lg w-full sm:w-auto shadow-md hover:shadow-lg transition-all duration-200"
                  style={{ backgroundColor: "#D4AF37", color: "#2D5F3F" }}
                >
                  Get Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  onClick={handleCallUs}
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary font-semibold px-8 py-6 text-lg w-full sm:w-auto"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us Now
                </Button>
              </div>

              {/* Trust indicator */}
              <p className="text-sm text-white/70 pt-2">
                ✓ Free quotes ✓ Fully insured ✓ NPTC qualified ✓ Available 24/7
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default About;
