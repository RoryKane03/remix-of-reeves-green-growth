import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { trackQuoteConversion } from '@/utils/gtagConversion';
import { trackPhoneCall } from '@/utils/phoneTracking';

const ThankYou = () => {
  useEffect(() => {
    trackQuoteConversion();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Thank You - Quote Received | Reeves Tree Surgeons"
        description="Thank you for submitting your quote request. Our team will review your requirements and get back to you within 24 hours."
        url="/thank-you"
        
      />
      <Header />

      <main className="flex items-center justify-center py-20 px-4">
        <div className="max-w-lg w-full text-center space-y-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Quote Submitted!
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Thank you for your enquiry. Our team will review your requirements
              and get back to you within <strong>24 hours</strong>.
            </p>
          </div>

          <div className="bg-muted/50 rounded-xl p-6 text-left space-y-3">
            <h2 className="font-semibold text-foreground">What happens next?</h2>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                We'll review your photos and requirements
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                A member of our team will contact you to discuss the job
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                We'll arrange a free site visit if needed
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                You'll receive a detailed, no-obligation quote
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="default" size="lg">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="tel:01527874143" onClick={() => trackPhoneCall('01527874143')}>
                <Phone className="h-4 w-4 mr-2" />
                Call Us: 01527 874143
              </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
