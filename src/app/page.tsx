'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Scale,
  Phone,
  Landmark,
  Check,
  House,
  Heart,
  HeartHandshake,
  FileText,
  ShieldHalf,
  Accessibility,
  Flame,
  AlertTriangle,
  Bot,
  Send,
  FilePenLine,
  Info,
  User,
} from 'lucide-react';

// PSH Rights Knowledge Base for AI responses
const PSH_KNOWLEDGE = {
  'month-to-month':
    'Under PSH standards, your lease should auto-renew for one year. Month-to-month arrangements are a violation of PSH requirements and are typically used to make eviction easier. You can cite OhioMHAS Housing Quality Standards and HUD PSH guidelines.',
  recertification:
    "PSH recertification only requires you to report: (1) changes in student status, and (2) changes in family/household composition. Full financial recertification with extensive documentation is NOT required under PSH standards. If they're demanding more, they may be operating under LIHTC rules instead of PSH rules.",
  eviction:
    'PSH residents can only be evicted through proper legal channels under Ohio landlord-tenant law. Verbal threats, arbitrary timeline changes, and eviction for requesting accommodations are all illegal. Document everything and request all notices in writing.',
  locked:
    'OhioMHAS explicitly prohibits locked egress in PSH properties. Gates that lock from the inside, non-functioning intercoms, and any restriction on exit violate both PSH standards and fire codes. This is a serious safety violation.',
  guests:
    'You have the right to receive visitors unless your lease specifically restricts this. Arbitrary bans without documentation, due process, or lease basis are violations. Guest bans used as retaliation for complaints are also illegal.',
  ada: 'Under the ADA and Fair Housing Act, properties must provide reasonable accommodations for disabilities. Requesting extra keys/fobs for healthcare workers is a reasonable accommodation. Denying or delaying these requests, or retaliating after you make them, is illegal.',
  harassment:
    'PSH requires trauma-informed care. Staff harassment, name-calling, false reports, and creating hostile conditions violate these requirements. Document incidents with dates, times, witnesses, and exact quotes.',
  unrecertified:
    'Your PSH status cannot be arbitrarily removed. If management claims you\'re "no longer PSH" or "unrecertified," demand written documentation of the specific regulation they\'re citing. This may be an attempt to strip your protections.',
  lihtc:
    "LIHTC (Low Income Housing Tax Credit) is a different program with different rules. If your housing is PSH but they're calling it LIHTC, they may be trying to deny you PSH protections while still receiving PSH funding. This could constitute fraud.",
  help: "If you're experiencing violations, you can: (1) Document everything in writing, (2) File a HUD Fair Housing complaint, (3) Contact Disability Rights Ohio, (4) Call our hotline at (740) 637-3682 to add your story to the record.",
};

type ChatMessage = {
  sender: 'user' | 'ai';
  text: string;
};

export default function Home() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: "Hello! I'm here to help you understand your rights as a PSH resident. You can ask me questions like:\n• \"Can they put me on a month-to-month lease?\"\n• \"What do I need for recertification?\"\n• \"Can they ban my visitors?\"\n• \"What if they threaten to evict me?\"",
    },
  ]);
  const [toastMessage, setToastMessage] = useState('');

  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const findBestResponse = (question: string) => {
    const q = question.toLowerCase();

    if (q.includes('month') || q.includes('lease') || q.includes('year')) {
      return PSH_KNOWLEDGE['month-to-month'];
    }
    if (q.includes('recert') || q.includes('certification') || q.includes('paperwork') || q.includes('document')) {
      return PSH_KNOWLEDGE['recertification'];
    }
    if (q.includes('evict') || q.includes('kick') || q.includes('remove') || q.includes('threat')) {
      return PSH_KNOWLEDGE['eviction'];
    }
    if (q.includes('lock') || q.includes('gate') || q.includes('exit') || q.includes('trap') || q.includes('fob')) {
      return PSH_KNOWLEDGE['locked'];
    }
    if (q.includes('guest') || q.includes('visitor') || q.includes('ban') || q.includes('friend') || q.includes('family')) {
      return PSH_KNOWLEDGE['guests'];
    }
    if (q.includes('ada') || q.includes('disab') || q.includes('accommodat') || q.includes('accessibility') || q.includes('medical')) {
      return PSH_KNOWLEDGE['ada'];
    }
    if (q.includes('harass') || q.includes('staff') || q.includes('mean') || q.includes('name') || q.includes('hostile')) {
      return PSH_KNOWLEDGE['harassment'];
    }
    if (q.includes('uncertif') || q.includes('no longer') || q.includes('removed') || q.includes('status')) {
      return PSH_KNOWLEDGE['unrecertified'];
    }
    if (q.includes('lihtc') || q.includes('tax credit') || q.includes('low income')) {
      return PSH_KNOWLEDGE['lihtc'];
    }
    if (q.includes('help') || q.includes('what can') || q.includes('what do') || q.includes('file') || q.includes('complain')) {
      return PSH_KNOWLEDGE['help'];
    }

    return "I understand you're asking about PSH rights. Could you be more specific? You can ask about: leases, recertification, eviction, locked gates, guest bans, ADA accommodations, staff harassment, or how to get help.";
  };

  const sendMessage = () => {
    const input = chatInputRef.current;
    if (!input || !input.value.trim()) return;

    const userMessage = input.value.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    
    const aiResponse = findBestResponse(userMessage);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 500);

    input.value = '';
  };
  
  const handleReportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const violations = formData.getAll('violation');
    
    const report = {
      property: formData.get('report-property'),
      role: formData.get('report-role'),
      violations: violations,
      description: formData.get('report-description'),
      contact: formData.get('report-contact'),
      timestamp: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const reports = JSON.parse(localStorage.getItem('psh-reports') || '[]');
      reports.push(report);
      localStorage.setItem('psh-reports', JSON.stringify(reports));
    } catch (error) {
      console.error("Could not save to localStorage", error);
    }


    // Show toast
    setToastMessage('Report submitted. Thank you for documenting your experience.');
    setTimeout(() => setToastMessage(''), 5000);

    // Reset form
    form.reset();
  };

  useEffect(() => {
    // Scroll to bottom of chat
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (this: HTMLAnchorElement, e: MouseEvent) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId) {
          document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }, [chatMessages]);

  return (
    <div className="bg-stone-50 text-gray-900">
      <header className="bg-stone-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3">
                <Scale className="text-amber-400 text-2xl" />
                <div>
                  <h1 className="text-xl font-bold">
                    Ohio PSH Rights Research Portal
                  </h1>
                  <p className="text-stone-400 text-sm">
                    Permanent Supportive Housing Legal Framework & Tenant Protections
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <a href="#framework" className="hover:text-amber-400 transition">
                Legal Framework
              </a>
              <a href="#protections" className="hover:text-amber-400 transition">
                Your Rights
              </a>
              <a href="#violations" className="hover:text-amber-400 transition">
                Common Violations
              </a>
              <a href="#assistant" className="hover:text-amber-400 transition">
                Ask AI
              </a>
              <a
                href="#hotline"
                className="bg-amber-500 text-black px-4 py-2 rounded font-semibold hover:bg-amber-400 transition"
              >
                <Phone className="mr-2 h-4 w-4 inline" />
                Hotline
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-b from-stone-800 to-stone-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Know Your Rights Under Permanent Supportive Housing
          </h2>
          <p className="text-xl text-stone-300 mb-8">
            PSH residents have specific federal and state protections that many property managers don't tell you about. This research portal breaks down the legal framework so you can protect yourself.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#framework"
              className="bg-amber-500 text-black px-8 py-3 rounded-lg font-bold hover:bg-amber-400 transition"
            >
              Read the Research
            </a>
            <a
              href="#assistant"
              className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Ask the AI Assistant
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-stone-200 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-600">3</div>
              <div className="text-sm text-gray-600">Core Principles Required</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600">1 Year</div>
              <div className="text-sm text-gray-600">Minimum Lease Auto-Renewal</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600">2</div>
              <div className="text-sm text-gray-600">Recertification Requirements</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600">0</div>
              <div className="text-sm text-gray-600">Locked Egress Allowed</div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <section id="framework" className="mb-16 scroll-mt-20">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Landmark className="text-amber-600 text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Legal Framework</h2>
              <p className="text-gray-600">Federal and Ohio state requirements for PSH programs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded mr-3">FEDERAL</span>
                HUD Requirements
              </h3>
              <div className="legal-text space-y-4 text-gray-700">
                <p>
                  The U.S. Department of Housing and Urban Development (HUD) mandates that Permanent Supportive Housing programs follow the <strong>Housing First</strong> model, which requires:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <Check className="text-green-600 mt-1 mr-3 h-4 w-4 flex-shrink-0" />
                    <span>Housing provided without preconditions (sobriety, treatment compliance, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-600 mt-1 mr-3 h-4 w-4 flex-shrink-0" />
                    <span>Services are voluntary and tenant-driven</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-600 mt-1 mr-3 h-4 w-4 flex-shrink-0" />
                    <span>Standard lease agreements with full tenant rights</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-600 mt-1 mr-3 h-4 w-4 flex-shrink-0" />
                    <span>Eviction only through normal legal processes</span>
                  </li>
                </ul>
                <p className="citation">Source: HUD Exchange, Permanent Supportive Housing Program Guidelines</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded mr-3">OHIO</span>
                OhioMHAS Requirements
              </h3>
              <div className="legal-text space-y-4 text-gray-700">
                <p>
                  The Ohio Department of Mental Health and Addiction Services (OhioMHAS) sets additional requirements for PSH programs receiving state funding:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <Check className="text-green-600 mt-1 mr-3 h-4 w-4 flex-shrink-0" />
                    <span>Legally enforceable lease with standard tenant protections</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-600 mt-1 mr-3 h-4 w-4 flex-shrink-0" />
                    <span><strong>No locked egress or institutional interventions</strong></span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-600 mt-1 mr-3 h-4 w-4 flex-shrink-0" />
                    <span>Right to receive visitors unless specifically restricted in lease</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-600 mt-1 mr-3 h-4 w-4 flex-shrink-0" />
                    <span>Due process required for evictions, bans, or removals</span>
                  </li>
                </ul>
                <p className="citation">Source: OhioMHAS Housing Quality Standards</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-200">
            <h3 className="text-xl font-bold mb-6 text-center">The Three Required PSH Principles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <House className="text-green-600 text-xl" />
                </div>
                <h4 className="font-bold text-center mb-2">Housing First</h4>
                <p className="text-sm text-gray-600 text-center">
                  Housing is provided immediately without requiring sobriety, treatment, or program compliance as a condition.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Heart className="text-blue-600 text-xl" />
                </div>
                <h4 className="font-bold text-center mb-2">Harm Reduction</h4>
                <p className="text-sm text-gray-600 text-center">
                  Substance use is not grounds for eviction. Recovery is supported without punishment for relapse.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <HeartHandshake className="text-purple-600 text-xl" />
                </div>
                <h4 className="font-bold text-center mb-2">Trauma-Informed Care</h4>
                <p className="text-sm text-gray-600 text-center">
                  Staff are trained to recognize and respond to trauma. Retaliation against residents is prohibited.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="protections" className="mb-16 scroll-mt-20">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ShieldHalf className="text-green-600 text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Your Rights as a PSH Resident</h2>
              <p className="text-gray-600">Protections that cannot be waived or denied</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-200">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FileText className="text-amber-600 mr-3" />
                Lease &amp; Tenancy Protections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">✓ Automatic Yearly Renewal</h4>
                  <p className="text-sm text-gray-700">PSH leases auto-renew for one year. Month-to-month arrangements violate PSH standards.</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">✓ Minimal Recertification</h4>
                  <p className="text-sm text-gray-700">You only need to report: (1) Student status changes, (2) Family/household changes. No full financial review required.</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">✓ Due Process for Eviction</h4>
                  <p className="text-sm text-gray-700">Eviction must follow Ohio landlord-tenant law. Threats without proper notice are illegal.</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">✓ Guest Rights</h4>
                  <p className="text-sm text-gray-700">You can receive visitors unless specifically restricted in your lease. Arbitrary bans violate your rights.</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-b border-stone-200">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Accessibility className="text-blue-600 mr-3" />
                ADA &amp; Disability Protections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">✓ Reasonable Accommodations</h4>
                  <p className="text-sm text-gray-700">Property must provide accommodations for disabilities. This includes keys/fobs for healthcare access.</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">✓ No Retaliation</h4>
                  <p className="text-sm text-gray-700">You cannot be punished for requesting accommodations or filing complaints.</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Flame className="text-red-600 mr-3" />
                Safety &amp; Access Protections
              </h3>
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">⚠️ NO LOCKED EGRESS</h4>
                <p className="text-sm text-gray-700">
                  Under OhioMHAS standards and fire code, PSH properties <strong>cannot lock residents inside</strong>. Gates that prevent exit without a fob, non-functioning intercoms, and restricted egress are all violations. This is both a PSH violation and a fire code violation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="violations" className="mb-16 scroll-mt-20">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-red-600 text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Common Violations to Watch For</h2>
              <p className="text-gray-600">If you're experiencing any of these, your rights may be violated</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
              <h4 className="font-bold mb-2">Month-to-Month Leases</h4>
              <p className="text-sm text-gray-600">PSH requires yearly auto-renewal. Month-to-month is a violation designed to make eviction easier.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
              <h4 className="font-bold mb-2">Full Financial Recertification</h4>
              <p className="text-sm text-gray-600">You only need to report student status and family changes. Extensive financial documentation is not required.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
              <h4 className="font-bold mb-2">Locked Gates/Restricted Exit</h4>
              <p className="text-sm text-gray-600">Any restriction on your ability to exit is illegal. EMTs, nurses, and visitors must be able to leave.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
              <h4 className="font-bold mb-2">Arbitrary Guest Bans</h4>
              <p className="text-sm text-gray-600">Banning visitors without documentation, due process, or lease basis is a violation of tenant rights.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
              <h4 className="font-bold mb-2">Eviction Threats for Accommodation Requests</h4>
              <p className="text-sm text-gray-600">Threatening eviction after you request ADA accommodations is illegal retaliation.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
              <h4 className="font-bold mb-2">Staff Harassment</h4>
              <p className="text-sm text-gray-600">Staff calling residents names, making false reports, or creating hostile conditions violates trauma-informed care requirements.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
              <h4 className="font-bold mb-2">"Unrecertifying" PSH Status</h4>
              <p className="text-sm text-gray-600">Your PSH status cannot be arbitrarily removed. If management claims you're "no longer PSH," demand documentation.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
              <h4 className="font-bold mb-2">Calling It "LIHTC" Instead of "PSH"</h4>
              <p className="text-sm text-gray-600">If they refer to your housing as LIHTC (tax credit housing), they may be trying to deny you PSH protections.</p>
            </div>
          </div>
        </section>

        <section id="assistant" className="mb-16 scroll-mt-20">
            <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Bot className="text-purple-600 text-xl" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">PSH Rights AI Assistant</h2>
                    <p className="text-gray-600">Ask questions about your rights and get instant answers</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="bg-purple-50 px-6 py-4 border-b border-stone-200">
                    <p className="text-sm text-purple-800 flex items-center">
                        <Info className="h-4 w-4 mr-2" />
                        This AI is trained on PSH regulations, Ohio housing law, and tenant rights. Ask about your specific situation.
                    </p>
                </div>
                <div ref={chatMessagesRef} className="chat-container p-4 space-y-4 overflow-y-auto bg-gray-50">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        {msg.sender === 'ai' && (
                          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                           <Bot className="text-white h-4 w-4" />
                          </div>
                        )}
                        <div className={`rounded-lg p-3 shadow-sm max-w-md ${msg.sender === 'user' ? 'bg-amber-100' : 'bg-white'}`}>
                            <p className="text-sm text-gray-700" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                        </div>
                         {msg.sender === 'user' && (
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                           <User className="text-gray-600 h-4 w-4" />
                          </div>
                        )}
                      </div>
                    ))}
                </div>
                <div className="p-4 border-t border-stone-200 bg-white">
                    <div className="flex space-x-3">
                        <input 
                            type="text" 
                            ref={chatInputRef} 
                            placeholder="Ask about your PSH rights..." 
                            className="flex-grow border border-stone-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none" 
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button onClick={sendMessage} className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <section id="hotline" className="mb-16 scroll-mt-20">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-8 text-center text-black">
            <h2 className="text-3xl font-bold mb-4">Need Help? Call the PSH Rights Hotline</h2>
            <p className="text-lg mb-6 opacity-90">Leave a message describing your situation. All calls are documented.</p>
            <a href="tel:+17406373682" className="inline-flex items-center space-x-3 bg-black text-white px-8 py-4 rounded-lg text-2xl font-bold hover:bg-gray-800 transition">
              <Phone />
              <span>(740) 637-3682</span>
            </a>
            <p className="mt-4 text-sm opacity-75">Voicemails are transcribed and added to our documentation system</p>
          </div>
        </section>

        <section id="report" className="mb-16 scroll-mt-20">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <FilePenLine className="text-amber-600 text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Document Your Experience</h2>
              <p className="text-gray-600">Your story helps build the record and protect others</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
            <form onSubmit={handleReportSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="report-property" className="block text-sm font-semibold text-gray-700 mb-2">Property/Location (Optional)</label>
                  <input type="text" id="report-property" name="report-property" placeholder="e.g., City, County, or Property Name" className="w-full border border-stone-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="report-role" className="block text-sm font-semibold text-gray-700 mb-2">Your Role</label>
                  <select id="report-role" name="report-role" className="w-full border border-stone-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none">
                    <option value="">Select...</option>
                    <option value="current-resident">Current PSH Resident</option>
                    <option value="former-resident">Former PSH Resident</option>
                    <option value="banned-guest">Banned Guest/Visitor</option>
                    <option value="family">Family Member</option>
                    <option value="worker">Healthcare/Social Worker</option>
                    <option value="advocate">Advocate/Legal Aid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">What violations have you witnessed or experienced?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="violation" value="month-to-month" className="rounded text-amber-600" />
                    <span className="text-sm">Month-to-month leases instead of yearly</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="violation" value="recert" className="rounded text-amber-600" />
                    <span className="text-sm">Excessive recertification requirements</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="violation" value="locked-gates" className="rounded text-amber-600" />
                    <span className="text-sm">Locked gates/restricted exit</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="violation" value="guest-bans" className="rounded text-amber-600" />
                    <span className="text-sm">Arbitrary guest bans</span>
                  </label>
                   <label className="flex items-center space-x-2">
                    <input type="checkbox" name="violation" value="ada-denial" className="rounded text-amber-600" />
                    <span className="text-sm">ADA accommodation denial</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="violation" value="eviction-threats" className="rounded text-amber-600" />
                    <span className="text-sm">Improper eviction threats</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="violation" value="harassment" className="rounded text-amber-600" />
                    <span className="text-sm">Staff harassment</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="violation" value="other" className="rounded text-amber-600" />
                    <span className="text-sm">Other violations</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="report-description" className="block text-sm font-semibold text-gray-700 mb-2">Describe Your Experience</label>
                <textarea id="report-description" name="report-description" rows={5} placeholder="What happened? When? Who was involved?" className="w-full border border-stone-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"></textarea>
              </div>

              <div>
                <label htmlFor="report-contact" className="block text-sm font-semibold text-gray-700 mb-2">Contact (Optional - for follow-up)</label>
                <input type="text" id="report-contact" name="report-contact" placeholder="Phone or email" className="w-full border border-stone-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none" />
              </div>

              <button type="submit" className="w-full bg-amber-500 text-black font-bold py-4 rounded-lg hover:bg-amber-400 transition">
                <Send className="h-4 w-4 mr-2 inline" />
                Submit Report
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-stone-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li><a href="https://www.hud.gov/program_offices/fair_housing_equal_opp/online-complaint" target="_blank" rel="noopener noreferrer" className="hover:text-white">HUD Fair Housing Complaint</a></li>
                <li><a href="https://disabilityrightsohio.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Disability Rights Ohio</a></li>
                <li><a href="https://mha.ohio.gov/" target="_blank" rel="noopener noreferrer" className="hover:text-white">OhioMHAS</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal Framework</h4>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li>Fair Housing Act</li>
                <li>Americans with Disabilities Act (ADA)</li>
                <li>Section 504 of the Rehabilitation Act</li>
                <li>Ohio Revised Code - Landlord-Tenant</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Hotline</h4>
              <p className="text-2xl font-bold text-amber-400">(740) 637-3682</p>
              <p className="text-stone-400 text-sm mt-2">Leave a message. We document everything.</p>
            </div>
          </div>
          <div className="border-t border-stone-700 pt-6 text-center text-stone-500 text-sm">
            <p>This research portal provides educational information about PSH tenant rights. It is not legal advice.</p>
          </div>
        </div>
      </footer>
      
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
