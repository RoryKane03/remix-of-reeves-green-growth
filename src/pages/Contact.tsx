import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, CheckCircle2, Upload, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { getLocalBusinessData } from '@/utils/structuredData';
import { submitQuote } from '@/features/quotes/submitQuote';
import { toast } from 'sonner';
import QuoteTips from '@/components/QuoteTips';
import { formatQuoteFileSize, processQuoteFiles } from '@/utils/quoteFileProcessing';

const Contact = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
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
    discount_code: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [discountError, setDiscountError] = useState('');
  
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const discountParam = searchParams.get('discount');
    if (discountParam) {
      setFormData(prev => ({ ...prev, discount_code: discountParam }));
    }
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'discount_code') {
      setDiscountError('');
    }
  };
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    console.log('[Contact] Files selected:', files.length, files.map(f => f.name));
    
    if (files.length === 0) {
      console.log('[Contact] No files selected');
      return;
    }
    
    setIsCompressing(true);
    
    try {
      const processedFiles = await processQuoteFiles(files);
      
      setUploadedFiles(prev => {
        const newFiles = [...prev, ...processedFiles];
        console.log('[Contact] Total files in state:', newFiles.length);
        return newFiles;
      });
      
      const totalOriginalSize = files.reduce((sum, f) => sum + f.size, 0);
      const totalProcessedSize = processedFiles.reduce((sum, f) => sum + f.size, 0);
      const savedPercentage = totalOriginalSize > 0 ? ((1 - totalProcessedSize / totalOriginalSize) * 100).toFixed(0) : '0';
      
      toast.success(
        `${files.length} photo(s) added${
          totalProcessedSize < totalOriginalSize 
            ? ` (compressed ${savedPercentage}%)` 
            : ''
        }`
      );
    } catch (error) {
      console.error('[Contact] File upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process photos. Please try again.');
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setUploadedFiles(prev => {
      const newFiles = prev.filter((_, idx) => idx !== indexToRemove);
      console.log('[Contact] File removed, remaining:', newFiles.length);
      return newFiles;
    });
    toast.info('Photo removed');
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate discount code
    const code = formData.discount_code.trim();
    if (code && code.toUpperCase() !== 'MARCH20') {
      setDiscountError('Invalid discount code');
      return;
    }
    
    console.log('[Contact] === FORM SUBMISSION ===');
    console.log('[Contact] Files from state:', uploadedFiles.length, uploadedFiles.map(f => f.name));
    
    // Validate files if any
    if (uploadedFiles.length > 0) {
      const invalidFiles = uploadedFiles.filter(f => !(f instanceof File) || f.size === 0);
      if (invalidFiles.length > 0) {
        console.error('[Contact] Invalid files detected:', invalidFiles);
        toast.error('Some files are invalid. Please re-select your photos.');
        return;
      }
      console.log('[Contact] Submitting with', uploadedFiles.length, 'files');
    } else {
      console.log('[Contact] Submitting with no files');
    }
    
    setIsSubmitting(true);
    try {
      const result = await submitQuote({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service || undefined,
        message: formData.message || undefined,
        address_line_1: formData.address_line_1,
        address_line_2: formData.address_line_2 || undefined,
        city: formData.city,
        postcode: formData.postcode,
        country: formData.country || undefined,
        discount_code: formData.discount_code || undefined
      }, uploadedFiles);
      console.log('[Contact] Submit result:', result);

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
        discount_code: ''
      });
      setUploadedFiles([]);
      // Clear the actual file input element
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: unknown) {
      console.error("[Contact] submission error:", err);
      toast.error(`Could not submit your quote. ${err instanceof Error ? err.message : ''}`.trim());
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen bg-gray-50">
      <SEO title="Contact Reeves Tree Surgeons - Get Your Free Quote Today" description="Contact Reeves Tree Surgeons for a free, no-obligation quote. Call 01527 831033 or fill out our form. Professional tree surgery services across Birmingham, Solihull, Worcester & West Midlands." keywords="contact tree surgeons, free quote tree surgery, Birmingham tree surgeons contact, West Midlands tree care quote, emergency tree services contact" url="/contact" structuredData={getLocalBusinessData()} breadcrumbs={[{
      label: 'Home',
      href: '/'
    }, {
      label: 'Contact',
      href: '/contact',
      current: true
    }]} />
      <Header />
      
      <main>
        {/* Hero Section - Clean & Minimal */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 py-12 lg:py-16">
          <div className="px-4 lg:px-8 xl:px-12 max-w-[1400px] w-full">
            <div className="max-w-4xl">
              <p className="font-bold mb-3 uppercase text-green-700" style={{
              fontSize: '14px',
              letterSpacing: '0.12em'
            }}>
                Get In Touch
              </p>
              
              <h1 className="font-extrabold mb-4 text-gray-900" style={{
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              lineHeight: '1.1'
            }}>
                Request Your Free Quote
              </h1>
              
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                Fill out the form below with details about your tree care needs, and we'll get back to you with a competitive quote within 24 hours.
              </p>
            </div>
          </div>
        </section>


        {/* Quote Tips Section */}
        <QuoteTips />

        {/* Main Content - Two Column Layout */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="px-4 lg:px-8 xl:px-12 max-w-[1400px] w-full">
            <div className="w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                
                {/* LEFT COLUMN - Quote Form (60% - Primary Focus) */}
                <div className="lg:col-span-7">
                  <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Request your free quote</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name" className="text-sm font-medium text-gray-900 mb-2 block">
                            Full name *
                          </Label>
                          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required className="h-12 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500" />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-sm font-medium text-gray-900 mb-2 block">
                            Phone number *
                          </Label>
                          <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required className="h-12 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500" />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-gray-900 mb-2 block">
                          Email address *
                        </Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="h-12 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500" />
                      </div>

                      {/* Address Section */}
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-4">Address</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="address_line_1" className="text-sm font-medium text-gray-900 mb-2 block">
                              Address line 1 *
                            </Label>
                            <Input id="address_line_1" name="address_line_1" value={formData.address_line_1} onChange={handleInputChange} placeholder="House number and street" required className="h-12 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500" />
                          </div>

                          <div>
                            <Label htmlFor="address_line_2" className="text-sm font-medium text-gray-900 mb-2 block">
                              Address line 2 (optional)
                            </Label>
                            <Input id="address_line_2" name="address_line_2" value={formData.address_line_2} onChange={handleInputChange} placeholder="Apartment, suite, unit, etc." className="h-12 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500" />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="city" className="text-sm font-medium text-gray-900 mb-2 block">
                                Town/City *
                              </Label>
                              <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required className="h-12 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500" />
                            </div>
                            <div>
                              <Label htmlFor="postcode" className="text-sm font-medium text-gray-900 mb-2 block">
                                Postcode *
                              </Label>
                              <Input id="postcode" name="postcode" value={formData.postcode} onChange={handleInputChange} required className="h-12 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500" />
                            </div>
                          </div>

                          </div>
                        </div>
                      </div>

                      {/* Service Required */}
                      <div>
                        <Label htmlFor="service" className="text-sm font-medium text-gray-900 mb-2 block">
                          Service required
                        </Label>
                        <Select value={formData.service} onValueChange={value => setFormData(prev => ({
                        ...prev,
                        service: value
                      }))}>
                          <SelectTrigger className="h-12 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500">
                            <SelectValue placeholder="Choose a service..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tree-work">Tree Work</SelectItem>
                            <SelectItem value="hedge-cutting">Hedge Cutting</SelectItem>
                            <SelectItem value="stump-grinding">Stump Grinding</SelectItem>
                            <SelectItem value="site-clearance">Site Clearance</SelectItem>
                            <SelectItem value="emergency">Emergency Service</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Project Details */}
                      <div>
                        <Label htmlFor="message" className="text-sm font-medium text-gray-900 mb-2 block">
                          Project details
                        </Label>
                        <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Please describe your tree care requirements, including location, tree type, and any specific concerns..." rows={5} className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 resize-none" />
                      </div>

                      {/* Photo Upload */}
                      <div>
                        <Label className="text-sm font-medium text-gray-900 mb-2 block">
                          Upload photos (optional)
                        </Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                          <input 
                            type="file" 
                            id="file-upload" 
                            ref={fileInputRef} 
                            multiple 
                            accept="image/*,.heic,.heif" 
                            onChange={handleFileUpload}
                            disabled={isCompressing}
                            className="hidden" 
                          />
                          <label htmlFor="file-upload" className={`flex flex-col items-center ${isCompressing ? 'cursor-wait' : 'cursor-pointer'}`}>
                            {isCompressing ? (
                              <>
                                <Loader2 size={32} className="text-green-600 mb-3 animate-spin" />
                                <span className="text-base font-medium text-gray-900 mb-1">
                                  Compressing images...
                                </span>
                                <span className="text-sm text-gray-500">
                                  Please wait while we optimize your photos
                                </span>
                              </>
                            ) : (
                              <>
                                <Upload size={32} className="text-gray-400 mb-3" />
                                <span className="text-base font-medium text-gray-900 mb-1">
                                  Click to upload photos of your trees
                                </span>
                                <span className="text-sm text-gray-500">
                                  Photos help us provide more accurate quotes
                                </span>
                              </>
                            )}
                          </label>
                        </div>
                        
                        {uploadedFiles.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <div className="text-sm font-semibold text-green-700 flex items-center gap-2">
                              <CheckCircle2 size={16} />
                              {uploadedFiles.length} photo(s) selected:
                            </div>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {uploadedFiles.map((file, idx) => (
                                <li key={`${file.name}-${idx}`} className="flex items-center justify-between bg-green-50 px-3 py-2 rounded border border-green-200">
                                  <span className="truncate mr-2 font-medium">{file.name}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-500 text-xs whitespace-nowrap">
                                      {formatQuoteFileSize(file.size)}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveFile(idx)}
                                      className="text-red-600 hover:text-red-800 font-bold text-base leading-none"
                                      aria-label="Remove file"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Discount Code */}
                      <div>
                        <Label htmlFor="discount_code" className="text-sm font-medium text-gray-900 mb-2 block">
                          Discount code (optional)
                        </Label>
                        <Input
                          id="discount_code"
                          name="discount_code"
                          value={formData.discount_code}
                          onChange={handleInputChange}
                          placeholder="Got a code from our social media? Enter it here"
                          maxLength={50}
                          className={`h-12 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 ${discountError ? 'border-red-500' : ''}`}
                        />
                        {discountError && (
                          <p className="text-sm text-red-600 mt-1">{discountError}</p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                        {isSubmitting ? <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </span> : <span className="flex items-center justify-center">
                            <Send size={18} className="mr-2" />
                            Get free quote
                          </span>}
                      </Button>

                      <p className="text-sm text-gray-500 text-center">
                        We typically respond to quote requests within 24 hours.
                      </p>
                    </form>
                  </div>
                </div>

                {/* RIGHT COLUMN - Contact Information (40%) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Contact Details Card */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                    
                    <div className="space-y-4">
                      {/* Phone */}
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                          <Phone size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Phone</p>
                          <a href="tel:01527874143" className="text-base font-semibold text-green-600 hover:text-green-700 transition-colors">
                            01527 874143
                          </a>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                          <Mail size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Email</p>
                          <a href="mailto:info@reevestreesurgeons.co.uk" className="text-base font-semibold text-green-600 hover:text-green-700 transition-colors break-all">
                            info@reevestreesurgeons.co.uk
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Area Card */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <MapPin size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Service Area</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">Birmingham, Solihull, Worcester, Dudley, Kidderminster, Stourbridge, Bromsgrove & across the West Midlands</p>
                      </div>
                    </div>
                  </div>

                  {/* Opening Hours Card */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <Clock size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Opening Hours</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Mon - Fri:</span>
                            <span className="font-semibold text-gray-900">7:00 AM - 4:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Saturday:</span>
                            <span className="font-semibold text-gray-900">Arrangement / Emergency only</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Sunday:</span>
                            <span className="font-semibold text-gray-900">Emergency only</span>
                          </div>
                          <div className="pt-2 mt-2 border-t border-gray-200">
                            <p className="text-green-700 font-semibold">24/7 Emergency Response</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Why Choose Us?</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 size={20} className="text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700 font-medium">ARB Approved Contractor</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 size={20} className="text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700 font-medium">Fully Insured - £10M Cover</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 size={20} className="text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700 font-medium">20+ Years Experience</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 size={20} className="text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700 font-medium">Free, No-Obligation Quotes</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
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
    </div>;
};
export default Contact;