import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Shield, Phone, Mail, CheckCircle2, Star, TreePine, Users, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAuthorSchema } from '@/utils/structuredData';
import { handlePhoneClick } from '@/utils/phoneTracking';

const AuthorProfile = () => {
  const authorSchema = getAuthorSchema("John Reeves");

  return (
    <>
      <Helmet>
        <title>John Reeves - Master Arborist & Director | Reeves Tree Surgeons</title>
        <meta name="description" content="Meet John Reeves, Master Arborist and Director of Reeves Tree Surgeons. NPTC certified with over 20 years experience serving the West Midlands since 2002." />
        <meta name="keywords" content="John Reeves arborist, NPTC certified tree surgeon, West Midlands arborist, professional tree surgeon, ARB approved contractor" />
        <link rel="canonical" href="/team/john-reeves" />
        <script type="application/ld+json">
          {JSON.stringify(authorSchema)}
        </script>
      </Helmet>

      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-forest-900 via-forest-800 to-forest-700 text-white py-20">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container-premium relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Badge className="bg-gold text-forest-900 font-semibold text-base px-4 py-1">
                      Master Arborist
                    </Badge>
                    <Badge className="bg-white/10 backdrop-blur text-white font-semibold text-base px-4 py-1 border border-white/20">
                      Company Director
                    </Badge>
                  </div>
                  
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                    John Reeves
                  </h1>
                  
                  <p className="text-xl text-white/90 mb-6 leading-relaxed">
                    NPTC Qualified Arborist with over 20 years of professional experience serving the West Midlands
                  </p>

                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 text-white/80">
                      <Calendar size={18} />
                      <span>Est. 2002</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <Shield size={18} />
                      <span>Fully Insured</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <Award size={18} />
                      <span>ARB Approved</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/contact">
                      <Button 
                        className="btn-primary-green"
                      >
                        <Phone size={18} />
                        Get Expert Advice
                      </Button>
                    </Link>
                    <Button 
                      onClick={() => handlePhoneClick('01527874143')}
                      className="btn-outline-white"
                    >
                      01527 874143
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gold/20 to-forest-600/20 rounded-2xl backdrop-blur border border-white/10 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <TreePine size={120} className="text-white/20" />
                    </div>
                    {/* Professional photo would go here */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-forest-900 to-transparent p-6">
                      <p className="text-white text-sm font-medium">Professional Arborist Since 2002</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Bio */}
        <section className="section-padding">
          <div className="container-premium">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">About John Reeves</h2>
              
              <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
                <p className="text-xl leading-relaxed">
                  With over two decades of hands-on experience in arboriculture, John Reeves has established himself as one of the West Midlands' most trusted and respected tree surgeons. Since founding Reeves Tree Surgeons in 2002, John has built a reputation for delivering exceptional tree care services with an unwavering commitment to safety, professionalism, and customer satisfaction.
                </p>

                <p className="leading-relaxed">
                  John's journey into arboriculture began with a deep appreciation for the natural environment and a desire to work outdoors. After completing his initial training, he recognized the growing need for professional, qualified tree surgery services in the West Midlands region. What started as a small operation has grown into a comprehensive tree care business, serving both domestic and commercial clients across Birmingham, Coventry, Wolverhampton, and surrounding areas.
                </p>

                <p className="leading-relaxed">
                  Throughout his career, John has remained dedicated to continuous professional development, ensuring that Reeves Tree Surgeons stays at the forefront of industry standards and best practices. His hands-on approach means he personally oversees major projects, ensuring every job meets the exacting standards that have become synonymous with the Reeves name.
                </p>

                <p className="leading-relaxed">
                  Beyond the technical aspects of tree surgery, John takes pride in educating clients about proper tree care and maintenance. He believes that informed property owners make better decisions about their trees, leading to healthier landscapes and safer environments. This educational approach, combined with transparent pricing and honest advice, has earned Reeves Tree Surgeons countless five-star reviews and repeat business.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Qualifications & Certifications */}
        <section className="section-padding bg-neutral-050">
          <div className="container-premium">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">Qualifications & Certifications</h2>
                <p className="text-xl text-muted-foreground">
                  Industry-recognized credentials ensuring the highest standards of tree care
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Award,
                    title: 'NPTC Certified Arborist',
                    description: 'Holds multiple National Proficiency Tests Council certifications covering all aspects of professional tree surgery operations',
                    credentials: ['CS30 - Chainsaw Maintenance', 'CS31 - Felling Trees', 'CS38 - Tree Climbing', 'CS39 - Aerial Rescue']
                  },
                  {
                    icon: Shield,
                    title: 'ARB Approved Contractor',
                    description: 'Approved by the Arboricultural Association, demonstrating commitment to professional standards and continuous development',
                    credentials: ['Regular competency assessments', 'Adherence to BS3998 standards', 'Professional indemnity insurance', 'Public liability cover']
                  },
                  {
                    icon: CheckCircle2,
                    title: 'Health & Safety Certified',
                    description: 'Comprehensive health and safety training ensuring safe working practices on every project',
                    credentials: ['Risk assessment trained', 'First aid qualified', 'LOLER certified', 'Method statement expertise']
                  },
                  {
                    icon: TreePine,
                    title: 'Specialized Expertise',
                    description: 'Advanced knowledge in specialized areas of arboriculture and urban tree management',
                    credentials: ['Tree Preservation Orders', 'Emergency storm damage', 'Heritage tree care', 'Commercial site management']
                  }
                ].map((qualification, index) => (
                  <Card key={index} className="card-premium h-full">
                    <CardHeader>
                      <div className="icon-premium mb-4">
                        <qualification.icon className="text-white" size={24} />
                      </div>
                      <CardTitle className="text-xl mb-2">{qualification.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {qualification.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2">
                        {qualification.credentials.map((credential, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 size={16} className="text-forest-600 flex-shrink-0 mt-0.5" />
                            <span>{credential}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Achievements */}
        <section className="section-padding">
          <div className="container-premium">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">Experience & Achievements</h2>
                <p className="text-xl text-muted-foreground">
                  Two decades of excellence in arboriculture across the West Midlands
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  { icon: Calendar, value: '20+', label: 'Years Experience' },
                  { icon: Users, value: '1000+', label: 'Projects Completed' },
                  { icon: Star, value: '5-Star', label: 'Customer Rating' }
                ].map((stat, index) => (
                  <Card key={index} className="card-premium text-center">
                    <CardContent className="pt-6">
                      <div className="icon-premium mx-auto mb-4">
                        <stat.icon className="text-white" size={28} />
                      </div>
                      <div className="text-4xl font-bold text-forest-600 mb-2">{stat.value}</div>
                      <div className="text-muted-foreground font-medium">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-6">
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="text-forest-600" />
                      Notable Projects & Specializations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      'Emergency storm damage response across West Midlands commercial properties',
                      'Heritage tree preservation work in Birmingham conservation areas',
                      'Large-scale site clearance for major development projects',
                      'Complex tree removal operations in confined urban spaces',
                      'TPO compliance and local authority liaison services',
                      'Commercial contract work for schools, hospitals, and local councils'
                    ].map((achievement, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-forest-600 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{achievement}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="card-premium bg-forest-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="icon-premium">
                        <TreePine className="text-white" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Professional Philosophy</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          "I believe in treating every tree with respect and every client with honesty. Trees are valuable assets to our environment and communities. My approach combines decades of practical experience with ongoing professional development to deliver tree care solutions that are safe, effective, and environmentally responsible. Whether it's a single garden tree or a major commercial project, every job receives the same level of expertise and attention to detail."
                        </p>
                        <p className="text-muted-foreground mt-3 font-medium">- John Reeves, Director</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Memberships */}
        <section className="section-padding bg-neutral-050">
          <div className="container-premium">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Professional Memberships</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: 'Arboricultural Association',
                    description: 'Professional body representing arborists across the UK',
                    status: 'ARB Approved Contractor'
                  },
                  {
                    title: 'NPTC Registered',
                    description: 'National Proficiency Tests Council certified professional',
                    status: 'Multiple CS Units Certified'
                  }
                ].map((membership, index) => (
                  <Card key={index} className="card-premium">
                    <CardHeader>
                      <CardTitle className="text-lg">{membership.title}</CardTitle>
                      <CardDescription>{membership.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge className="bg-forest-600 text-white">{membership.status}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="card-premium">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Insurance & Liability Coverage</h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start gap-2">
                      <Shield className="text-forest-600 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <div className="font-medium">Public Liability Insurance</div>
                        <div className="text-sm text-muted-foreground">£2 million coverage</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="text-forest-600 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <div className="font-medium">Professional Indemnity</div>
                        <div className="text-sm text-muted-foreground">Comprehensive coverage</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="text-forest-600 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <div className="font-medium">Employers Liability</div>
                        <div className="text-sm text-muted-foreground">Full team coverage</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="text-forest-600 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <div className="font-medium">Equipment Insurance</div>
                        <div className="text-sm text-muted-foreground">All specialist tools covered</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="section-padding">
          <div className="container-premium">
            <Card className="card-premium bg-gradient-to-br from-forest-900 to-forest-700 text-white border-0">
              <CardContent className="pt-12 pb-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Get Expert Tree Care Advice</h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Speak directly with John about your tree surgery needs. Over 20 years of experience at your service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button 
                      className="btn-primary-gold text-lg px-8 py-4 h-auto"
                    >
                      <Mail size={20} />
                      Request a Quote
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => handlePhoneClick('01527874143')}
                    className="bg-white text-forest-900 hover:bg-white/90 text-lg px-8 py-4 h-auto"
                  >
                    <Phone size={20} />
                    Call: 01527 874143
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AuthorProfile;
