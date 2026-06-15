import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Phone, Mail, MapPin, Clock, Upload, Send, CheckCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import { submitQuote } from '@/features/quotes/submitQuote';
import { supabase } from '@/integrations/supabase/client';
import { formatQuoteFileSize, processQuoteFiles } from '@/utils/quoteFileProcessing';

// Photo upload fix - synced 2025-11-03 14:52
const ContactForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isServiceAreaExpanded, setIsServiceAreaExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    postcode: '',
    country: 'United Kingdom',
    service: '',
    message: '',
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsCompressing(true);
    try {
      const processedFiles = await processQuoteFiles(files);
      const originalSize = files.reduce((sum, file) => sum + file.size, 0);
      const processedSize = processedFiles.reduce((sum, file) => sum + file.size, 0);
      const saved = originalSize > 0 ? Math.max(0, Math.round((1 - processedSize / originalSize) * 100)) : 0;

      setUploadedFiles(prev => [...prev, ...processedFiles]);
      toast.success(`${processedFiles.length} photo(s) ready${saved > 0 ? ` (compressed ${saved}%)` : ''}`);
    } catch (error) {
      console.error('[ContactForm] file processing error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process photos. Please try again.');
    } finally {
      setIsCompressing(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    console.log("[ContactForm] submitting quote request with", uploadedFiles.length, "files");
    
    try {
      // Submit the quote
      const result = await submitQuote(
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service || undefined,
          message: formData.message || undefined,
          address_line_1: formData.address_line_1 || undefined,
          address_line_2: formData.address_line_2 || undefined,
          city: formData.city || undefined,
          postcode: formData.postcode || undefined,
          country: formData.country || undefined,
          discount_code: formData.discount_code || undefined,
        },
        uploadedFiles
      );
      
      console.log("[ContactForm] quote submission completed successfully");

      // Redirect to thank you page (handles conversion tracking)
      navigate('/thank-you');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        postcode: '',
        country: 'United Kingdom',
        service: '',
        message: '',
        discount_code: '',
      });
      setUploadedFiles([]);
    } catch (err: unknown) {
      console.error("[ContactForm] submission error:", err);
      toast.error(`Could not submit your quote. ${err instanceof Error ? err.message : ''}`.trim());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-neutral-050">
      <div className="container-premium">
        <div className="text-center mb-12 lg:mb-16">
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            color: 'var(--text-900)'
          }}>
            Get your free quote today
          </h2>
          <div className="w-24 h-1 mx-auto mt-6 mb-8 rounded-full" style={{
            background: 'var(--accent-emerald)'
          }} />
          <p className="text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto" style={{
            color: 'var(--text-700)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '400'
          }}>
            Ready to discuss your tree care needs? Contact us for a free, no-obligation quote. 
            Upload photos for a more accurate assessment.
          </p>
        </div>

        {/* Grid Layout: Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 lg:space-y-8">
            {/* Phone Card */}
            <Card className="card-premium">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-8 text-lg font-semibold" style={{
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--text-900)'
                }}>
                  <Phone className="text-forest-600" size={20} />
                  <span>Call us direct</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-semibold text-sm mb-1" style={{
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--text-900)'
                  }}>
                    General enquiries
                  </div>
                  <a href="tel:01527874143" className="text-forest-600 hover:text-emerald transition-colors font-medium focus-premium" style={{
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    01527 874143
                  </a>
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1" style={{
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--text-900)'
                  }}>
                    24/7 emergency
                  </div>
                  <a href="tel:01527874143" className="text-gold hover:brightness-110 font-semibold transition-all duration-200 focus-premium" style={{
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    01527 874143
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Email Card */}
            <Card className="card-premium">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-8 text-lg font-semibold" style={{
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--text-900)'
                }}>
                  <Mail className="text-forest-600" size={20} />
                  <span>Email us</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:info@reevestreesurgeons.co.uk" className="text-forest-600 hover:text-emerald break-all transition-colors focus-premium" style={{
                  fontFamily: 'Inter, sans-serif'
                }}>
                  info@reevestreesurgeons.co.uk
                </a>
              </CardContent>
            </Card>

            {/* Service Area Card */}
            <Card className="card-premium">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-8 text-lg font-semibold" style={{
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--text-900)'
                }}>
                  <MapPin className="text-forest-600" size={20} />
                  <span>Service area</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Collapsible open={isServiceAreaExpanded} onOpenChange={setIsServiceAreaExpanded}>
                  <div className="text-base leading-relaxed" style={{
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--text-700)'
                  }}>
                    Birmingham, Solihull, Worcester, Dudley, Kidderminster, Stourbridge
                    <CollapsibleContent className="CollapsibleContent">
                      <span>, Wolverhampton, Bromsgrove, Redditch and all surrounding areas</span>
                    </CollapsibleContent>
                  </div>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-forest-600 hover:text-emerald transition-colors" style={{
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      <span className="text-sm font-medium">
                        {isServiceAreaExpanded ? 'View less' : 'View more'}
                      </span>
                      {isServiceAreaExpanded ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                </Collapsible>
              </CardContent>
            </Card>

            {/* Opening Hours Card - Updated Saturday hours */}
            <Card className="card-premium">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-8 text-lg font-semibold" style={{
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--text-900)'
                }}>
                  <Clock className="text-forest-600" size={20} />
                  <span>Opening hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1.5" style={{
                  fontFamily: 'Inter, sans-serif'
                }}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{
                      color: 'var(--text-700)',
                      fontSize: '14px'
                    }}>
                      Mon - Fri:
                    </span>
                    <span className="text-sm font-medium" style={{
                      color: 'var(--text-900)',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      7:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{
                      color: 'var(--text-700)',
                      fontSize: '14px'
                    }}>
                      Saturday:
                    </span>
                    <span className="text-sm font-medium" style={{
                      color: 'var(--text-900)',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      Arrangement/ Emergency only
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{
                      color: 'var(--text-700)',
                      fontSize: '14px'
                    }}>
                      Sunday:
                    </span>
                    <span className="text-sm font-medium" style={{
                      color: 'var(--text-900)',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      Emergency only
                    </span>
                  </div>
                  <div className="text-gold font-semibold mt-3 pt-2 border-t border-neutral-200" style={{
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    24/7 emergency response
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="text-xl lg:text-2xl" style={{
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--text-900)',
                  fontWeight: '600'
                }}>
                  Request your free quote
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form id="quote-form" onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium mb-2 block" style={{
                        fontFamily: 'Inter, sans-serif',
                        color: 'var(--text-900)'
                      }}>
                        Full name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="h-14 rounded-2xl border-neutral-200 focus:border-emerald transition-colors focus-premium"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium mb-2 block" style={{
                        fontFamily: 'Inter, sans-serif',
                        color: 'var(--text-900)'
                      }}>
                        Phone number *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="h-14 rounded-2xl border-neutral-200 focus:border-emerald transition-colors focus-premium"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium mb-2 block" style={{
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--text-900)'
                    }}>
                      Email address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-14 rounded-2xl border-neutral-200 focus:border-emerald transition-colors focus-premium"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>

                  {/* New Address Section */}
                  <div>
                    <h3 className="text-base font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-900)' }}>
                      Address
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="address_line_1" className="text-sm font-medium mb-2 block" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-900)' }}>
                          Address line 1
                        </Label>
                        <Input
                          id="address_line_1"
                          name="address_line_1"
                          value={formData.address_line_1}
                          onChange={handleInputChange}
                          placeholder="House number and street"
                          className="h-14 rounded-2xl border-neutral-200 focus:border-emerald transition-colors focus-premium"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        />
                      </div>

                      <div>
                        <Label htmlFor="address_line_2" className="text-sm font-medium mb-2 block" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-900)' }}>
                          Address line 2 (optional)
                        </Label>
                        <Input
                          id="address_line_2"
                          name="address_line_2"
                          value={formData.address_line_2}
                          onChange={handleInputChange}
                          placeholder="Apartment, suite, unit, etc."
                          className="h-14 rounded-2xl border-neutral-200 focus:border-emerald transition-colors focus-premium"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="sm:col-span-1">
                          <Label htmlFor="city" className="text-sm font-medium mb-2 block" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-900)' }}>
                            Town/City
                          </Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="h-14 rounded-2xl border-neutral-200 focus:border-emerald transition-colors focus-premium"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>
                        <div className="sm:col-span-1">
                          <Label htmlFor="postcode" className="text-sm font-medium mb-2 block" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-900)' }}>
                            Postcode
                          </Label>
                          <Input
                            id="postcode"
                            name="postcode"
                            value={formData.postcode}
                            onChange={handleInputChange}
                            className="h-14 rounded-2xl border-neutral-200 focus:border-emerald transition-colors focus-premium uppercase"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="service" className="text-sm font-medium mb-2 block" style={{
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--text-900)'
                    }}>
                      Service required
                    </Label>
                    <Select value={formData.service} onValueChange={value => setFormData(prev => ({
                      ...prev,
                      service: value
                    }))}>
                      <SelectTrigger className="h-14 rounded-2xl border-neutral-200 focus:border-emerald transition-colors focus-premium" style={{
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        <SelectValue placeholder="Choose a service..." />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-000 rounded-2xl" style={{
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        <SelectItem value="tree-felling">Tree felling & removal</SelectItem>
                        <SelectItem value="pruning">Tree pruning & trimming</SelectItem>
                        <SelectItem value="crown-reduction">Crown reduction</SelectItem>
                        <SelectItem value="stump-grinding">Stump grinding</SelectItem>
                        <SelectItem value="emergency">Emergency service</SelectItem>
                        <SelectItem value="commercial">Commercial contract</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium mb-2 block" style={{
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--text-900)'
                    }}>
                      Project details
                    </Label>
                    <Textarea id="message" name="message" rows={4} placeholder="Please describe your tree care requirements, including location, tree type, and any specific concerns..." value={formData.message} onChange={handleInputChange} className="rounded-2xl border-neutral-200 focus:border-emerald transition-colors focus-premium" style={{
                      fontFamily: 'Inter, sans-serif'
                    }} />
                  </div>


                  {/* File Upload */}
                  <div>
                    <Label htmlFor="photos" className="text-sm font-medium mb-2 block" style={{
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--text-900)'
                    }}>
                      Upload photos (optional)
                    </Label>
                    <div className="border-2 border-dashed rounded-2xl p-4 sm:p-8 text-center hover:border-forest-500 transition-colors cursor-pointer" style={{
                      borderColor: 'var(--forest-600)'
                    }}>
                      <input id="photos" type="file" multiple accept="image/*,.heic,.heif" onChange={handleFileUpload} className="hidden" disabled={isSubmitting || isCompressing} />
                      <label htmlFor="photos" className="cursor-pointer">
                        <Upload className="mx-auto mb-4 text-forest-600" size={32} />
                        <p className="text-base font-medium mb-2" style={{
                          fontFamily: 'Inter, sans-serif',
                          color: 'var(--text-900)'
                        }}>
                          {isCompressing ? 'Compressing photos...' : 'Click to upload photos of your trees'}
                        </p>
                        <p className="text-sm" style={{
                          fontFamily: 'Inter, sans-serif',
                          color: 'var(--text-500)'
                        }}>
                          Photos help us provide more accurate quotes
                        </p>
                      </label>
                    </div>
                    
                    {uploadedFiles.length > 0 && <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file, index) => <div key={index} className="flex items-center space-8 text-sm text-emerald" style={{
                          fontFamily: 'Inter, sans-serif'
                        }}>
                            <CheckCircle size={16} />
                            <span>{file.name} ({formatQuoteFileSize(file.size)})</span>
                          </div>)}
                      </div>}
                  </div>

                  {/* Discount Code */}
                  <div>
                    <Label htmlFor="discount_code" className="text-sm font-medium mb-2 block" style={{
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--text-900)'
                    }}>
                      Discount code (optional)
                    </Label>
                    <Input
                      id="discount_code"
                      name="discount_code"
                      value={formData.discount_code}
                      onChange={handleInputChange}
                      placeholder="Got a code from our social media? Enter it here"
                      maxLength={50}
                      className={`h-14 rounded-2xl border-neutral-200 focus:border-emerald transition-colors focus-premium ${discountError ? 'border-red-500' : ''}`}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                    {discountError && (
                      <p className="text-sm text-red-600 mt-1">{discountError}</p>
                    )}
                  </div>

                  <div className="pt-4">
                    <button type="submit" className="btn-primary-green w-full justify-center focus-premium flex items-center space-12 h-14 text-lg disabled:opacity-50 disabled:pointer-events-none" disabled={isSubmitting} style={{
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {isSubmitting ? <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Submitting...</span>
                        </> : <>
                          <Send size={20} />
                          <span>Get free quote</span>
                        </>}
                    </button>
                  </div>

                  <p className="text-sm text-center" style={{
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--text-500)'
                  }}>
                    We typically respond to quote requests within 24 hours.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="max-w-md rounded-xl">
          <AlertDialogHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-green-50">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-gray-900">
              Quote Submitted!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-gray-700 pt-2">
              Thank you for your request. Our team will review your requirements and get back to you within 24 hours.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center pt-4">
            <AlertDialogAction className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8">
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default ContactForm;
