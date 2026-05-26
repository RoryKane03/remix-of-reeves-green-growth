import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQ {
  question: string;
  answer: string;
  category?: 'general' | 'safety' | 'legal' | 'pricing' | 'technical';
}

interface EnhancedFAQsProps {
  title?: string;
  faqs: FAQ[];
  showCategories?: boolean;
}

const EnhancedFAQs = ({ 
  title = "Frequently Asked Questions", 
  faqs, 
  showCategories = false 
}: EnhancedFAQsProps) => {

  // Comprehensive FAQs for different service types
  const getServiceFAQs = (serviceType: 'domestic' | 'commercial' | 'emergency') => {
    const baseFAQs = [
      {
        question: "Do I need permission to carry out tree work?",
        answer: "Tree work may require permission if your tree is protected by a Tree Preservation Order (TPO) or you're in a conservation area. We can check this for you and help with any necessary applications to the local council.",
        category: 'legal' as const
      },
      {
        question: "Are you fully insured and qualified?",
        answer: "Yes, we carry comprehensive public liability insurance up to £2 million and our team are fully qualified with NPTC certificates. All work is carried out to BS3998 standards.",
        category: 'safety' as const
      },
      {
        question: "How do you calculate the cost of tree work?",
        answer: "Costs depend on several factors including tree size, location, complexity of access, disposal requirements, and safety considerations. We always provide free, detailed quotes with no hidden charges.",
        category: 'pricing' as const
      },
      {
        question: "What happens to the waste material?",
        answer: "We can remove all waste as part of our service, or leave logs/woodchip for your use. All green waste is recycled responsibly, and we can arrange for logs to be seasoned for firewood if requested.",
        category: 'general' as const
      },
      {
        question: "When is the best time for tree surgery?",
        answer: "Most tree work is best carried out during the dormant season (October-March), but emergency work and some species benefit from summer pruning. We'll advise the optimal timing for your specific requirements.",
        category: 'technical' as const
      }
    ];

    if (serviceType === 'domestic') {
      return [
        ...baseFAQs,
        {
          question: "Can you work in small gardens with limited access?",
          answer: "Yes, we specialize in working in confined spaces. We have compact equipment and experienced climbers who can safely work in tight spaces without causing damage to your property.",
          category: 'technical' as const
        },
        {
          question: "Will tree surgery damage my lawn or plants?",
          answer: "We take great care to protect your garden. We use protective mats, plan our access routes carefully, and can work from neighboring properties with permission if needed to minimize impact.",
          category: 'general' as const
        },
        {
          question: "Do you offer ongoing maintenance contracts?",
          answer: "Yes, we provide annual maintenance plans that include regular inspections, seasonal pruning, and priority emergency response. This often works out more cost-effective than ad-hoc work.",
          category: 'general' as const
        }
      ];
    }

    if (serviceType === 'commercial') {
      return [
        ...baseFAQs,
        {
          question: "Do you work outside normal hours for commercial clients?",
          answer: "Yes, we offer flexible scheduling including evenings and weekends to minimize disruption to your business operations. Emergency response is available 24/7.",
          category: 'general' as const
        },
        {
          question: "Can you provide ongoing maintenance contracts?",
          answer: "Absolutely. We offer comprehensive maintenance contracts tailored to commercial properties, including scheduled inspections, preventive care, and priority emergency response.",
          category: 'general' as const
        },
        {
          question: "Do you have experience with health and safety regulations?",
          answer: "Yes, we're fully trained in commercial health and safety requirements, including CDM regulations, risk assessments, and method statements. We can work as part of your contractor management system.",
          category: 'safety' as const
        },
        {
          question: "Can you help with planning applications and consultancy?",
          answer: "Yes, we provide arboricultural consultancy including tree surveys, impact assessments, and planning application support. Our qualified arborists can represent you in planning matters.",
          category: 'legal' as const
        }
      ];
    }

    if (serviceType === 'emergency') {
      return [
        {
          question: "Do you provide 24/7 emergency tree services?",
          answer: "Yes, our emergency response team is available 24/7 for dangerous tree situations, storm damage, and trees blocking roads or damaging property.",
          category: 'safety' as const
        },
        {
          question: "How quickly can you respond to emergencies?",
          answer: "We aim to respond to genuine emergencies within 2-4 hours, often sooner. For life-threatening situations, we can typically be on-site within 1 hour across our West Midlands service area.",
          category: 'safety' as const
        },
        {
          question: "Will insurance cover emergency tree work?",
          answer: "Most home insurance policies cover emergency tree work if the tree has caused damage to property. We can work directly with insurance companies and provide all necessary documentation.",
          category: 'legal' as const
        },
        {
          question: "What constitutes a tree emergency?",
          answer: "Emergencies include: trees fallen on buildings/roads, large branches hanging dangerously, trees leaning after storms, or any tree posing immediate risk to people or property.",
          category: 'safety' as const
        }
      ];
    }

    return baseFAQs;
  };

  return (
    <section className="py-12 lg:py-16">
      <div className="container-premium">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{
            fontFamily: 'Inter, sans-serif',
            color: 'var(--text-900)'
          }}>
            {title}
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{
            backgroundColor: 'var(--accent-emerald)'
          }} />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6 py-2">
                <AccordionTrigger 
                  className="text-left text-lg font-semibold hover:no-underline py-4" 
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--text-900)'
                  }}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent 
                  className="text-base leading-relaxed pb-4" 
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--text-700)'
                  }}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

// Export pre-configured FAQ sets for different service types
export const DomesticFAQs = () => (
  <EnhancedFAQs 
    title="FAQs – Domestic Tree Surgery in West Midlands"
    faqs={[
      {
        question: "Do I need permission to remove a tree from my garden?",
        answer: "If your tree is protected by a Tree Preservation Order (TPO) or you live in a conservation area, you'll need council approval. We can advise you before carrying out any work and help with any necessary applications.",
        category: 'legal'
      },
      {
        question: "How much does tree surgery cost?",
        answer: "Tree surgery costs vary based on tree size, location, complexity, and disposal needs. Small tree pruning might cost £200-500, while large tree removal can range from £800-2000+. We provide free detailed quotes.",
        category: 'pricing'
      },
      {
        question: "Are you insured and qualified?",
        answer: "Yes, we carry £2 million public liability insurance and our team are qualified arborists with NPTC certifications. All work follows British Standard BS3998.",
        category: 'safety'
      },
      {
        question: "When is the best time for tree pruning?",
        answer: "Most trees are best pruned during dormancy (November-March). However, some species like cherry trees should be pruned in summer to prevent disease. We'll advise on optimal timing.",
        category: 'technical'
      },
      {
        question: "Can you work in small spaces and protect my garden?",
        answer: "Absolutely. We specialize in confined space work and use protective measures to prevent damage to lawns, plants, and property. Our team is experienced in urban tree surgery.",
        category: 'technical'
      },
      {
        question: "What happens to the wood and debris?",
        answer: "We can remove all debris or leave logs for your use. All green waste is recycled responsibly. We can also arrange seasoning of logs for firewood if you prefer.",
        category: 'general'
      },
      {
        question: "Do you offer emergency call-outs?",
        answer: "Yes, we provide 24/7 emergency response for dangerous trees, storm damage, and urgent situations across the West Midlands.",
        category: 'safety'
      },
      {
        question: "How do I know if my tree is dangerous?",
        answer: "Warning signs include cracks in the trunk, dead branches, fungal growth, leaning after storms, or root damage. If you're concerned, we offer free safety assessments.",
        category: 'safety'
      }
    ]}
  />
);

export const CommercialFAQs = () => (
  <EnhancedFAQs 
    title="FAQs – Commercial Tree Services in West Midlands"
    faqs={[
      {
        question: "Do you provide commercial quotes and contracts?",
        answer: "Yes, we provide detailed commercial quotes with transparent pricing and can establish ongoing maintenance contracts for regular grounds care.",
        category: 'general'
      },
      {
        question: "Can you work outside normal business hours?",
        answer: "Absolutely. We offer flexible scheduling including evenings, weekends, and bank holidays to minimize disruption to your business operations.",
        category: 'general'
      },
      {
        question: "Do you have commercial insurance and certifications?",
        answer: "Yes, we carry comprehensive commercial insurance including £2 million public liability. Our team hold all relevant certifications and we can work within your contractor management systems.",
        category: 'safety'
      },
      {
        question: "Can you handle large-scale projects and site clearance?",
        answer: "Yes, we have the equipment and expertise for large commercial projects including complete site clearance, development preparation, and ongoing estate management.",
        category: 'technical'
      },
      {
        question: "Do you provide tree surveys and consultancy?",
        answer: "Yes, we offer professional arboricultural surveys, risk assessments, management plans, and planning application support from our qualified consultants.",
        category: 'legal'
      },
      {
        question: "How do you ensure minimal disruption to business operations?",
        answer: "We plan work carefully, coordinate with your schedule, use appropriate signage and barriers, and can work in phases to maintain access and operations.",
        category: 'general'
      },
      {
        question: "Can you work with health and safety requirements?",
        answer: "Absolutely. We're experienced in commercial H&S requirements, provide full risk assessments and method statements, and can integrate with your safety management systems.",
        category: 'safety'
      },
      {
        question: "Do you offer ongoing maintenance contracts?",
        answer: "Yes, we provide tailored maintenance contracts covering scheduled inspections, preventive care, emergency response, and compliance monitoring.",
        category: 'general'
      }
    ]}
  />
);

export default EnhancedFAQs;