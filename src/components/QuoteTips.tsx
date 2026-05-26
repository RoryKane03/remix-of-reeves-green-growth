import { Lightbulb, Camera, FileText, Zap, CheckCircle2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import OptimizedImage from '@/components/ImageOptimization';
import annotatedTreeExample from '@/assets/examples/annotated-tree-example.png';

const QuoteTips = () => {
  return (
    <section className="py-6 px-4 lg:px-8 xl:px-12 max-w-[1400px] w-full mx-auto">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem 
          value="quote-tips" 
          className="border border-amber-200 bg-amber-50/50 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <AccordionTrigger className="hover:no-underline py-5 text-left">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex items-center justify-center shadow-sm">
                <Lightbulb size={20} className="text-white" />
              </div>
              <div className="flex-1 pr-4">
                <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">
                  Get an Instant Quote - Read These Tips First
                </h2>
                <p className="text-sm text-gray-600 font-normal">
                  Save time and potentially receive your quote without a site visit
                </p>
              </div>
            </div>
          </AccordionTrigger>
          
          <AccordionContent className="pt-2 pb-6">
            <div className="bg-white rounded-lg p-6 space-y-6 border border-amber-100">
              {/* Introduction */}
              <p className="text-gray-700 leading-relaxed">
                Following these simple tips can help speed up your quote and may even result in an <strong className="text-green-700">instant quote with no site visit necessary</strong>, saving you time and allowing us to get your project started faster.
              </p>

              {/* Photos Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Camera size={16} className="text-green-700" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">Photos & Videos</h3>
                </div>
                
                <ul className="space-y-2 ml-10">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <Zap size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Close-up shots:</strong> Clear photos of the tree trunk, branches, and overall condition</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <Zap size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Wide-angle shots:</strong> Full tree view showing size and surroundings</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <Zap size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Access routes:</strong> Photos showing how we can reach the work area</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <Zap size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Obstacles & obstructions:</strong> Sheds, greenhouses, fences, powerlines, telephone cables, nearby buildings</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <Zap size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Videos:</strong> A walk-around video can provide excellent context</span>
                  </li>
                </ul>
              </div>

              {/* Visual Example Section */}
              <div className="space-y-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <Camera size={16} className="text-white" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">📸 Visual Example: How to Annotate Your Photos</h3>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="max-w-md mx-auto">
                    <OptimizedImage
                      src={annotatedTreeExample}
                      alt="Example of annotated tree photo showing clear markup with arrows and labels indicating which branches need removal"
                      className="w-full h-auto rounded-lg border-2 border-gray-200 shadow-sm"
                      loading="eager"
                    />
                  </div>
                  <div className="mt-4 flex items-start gap-2 text-sm text-gray-700 bg-green-50 rounded-lg p-3 border border-green-200">
                    <CheckCircle2 size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <p>
                      <strong className="text-green-700">Perfect example!</strong> Use photo editing tools (even your phone's built-in markup tools) to draw arrows, circles, and add text labels showing exactly what needs attention. This helps us provide accurate quotes faster.
                    </p>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText size={16} className="text-green-700" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">Detailed Description of Work Required</h3>
                </div>
                
                <ul className="space-y-2 ml-10">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <Zap size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Specify heights:</strong> "Reduce hedge to 6 feet" or "Lower tree canopy by 3 meters"</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <Zap size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Mark up photos:</strong> Draw lines or arrows on images showing exactly what needs work (see the visual example above for how to do this perfectly!)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <Zap size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Identify specific branches:</strong> "Remove overhanging branches on north side"</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <Zap size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Mention deadwood or disease:</strong> Help us understand urgency and safety concerns</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <Zap size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Stump removal preferences:</strong> Grinding depth, access constraints, replanting plans</span>
                  </li>
                </ul>
              </div>

              {/* Result */}
              <div className="bg-gradient-to-r from-green-50 to-amber-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-gray-800 font-medium flex items-start gap-2">
                  <Zap size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-green-700">The more detail you provide, the faster we can quote.</strong> Many customers receive same-day quotes without waiting for a site visit!
                  </span>
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default QuoteTips;
