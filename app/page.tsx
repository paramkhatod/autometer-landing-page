"use client";

import { useEffect, useRef, useState } from 'react';
import { 
  Zap, 
  Sparkles, 
  Network, 
  BookOpen, 
  Clock, 
  Users,
  CheckCircle,
  ArrowDown,
  Github,
  Twitter,
  Mail,
  Star,
  Award,
  Target,
  Rocket,
  Lightbulb,
  Globe
} from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import MagneticButton from '@/components/MagneticButton';
import NoiseOverlay from '@/components/NoiseOverlay';
import GlassCard from '@/components/GlassCard';
import ScrollAnimator, { ScrollSection } from '@/components/ScrollAnimator';

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <CustomCursor />
      <Navigation />
      <NoiseOverlay />
      
      <main className="min-h-screen">
        {/* Enhanced Hero Section */}
        <ScrollSection className="relative flex items-center justify-center text-center px-8 overflow-hidden" parallax={true}>
          <div className="absolute inset-0 bg-gradient-to-br from-white via-yellow-50/30 to-white" />
          
          <div className="relative z-10 max-w-[900px] mx-auto space-y-10">
            <ScrollAnimator delay={0} direction="fade">
              <div className="space-y-6">
                <h1 className="text-hero font-black text-neutral-900 animate-scale">
                  AI Agent Builder
                  <br />
                  <span className="text-gradient">Free & Simple</span>
                </h1>
                <p className="text-large text-neutral-600 max-w-[700px] mx-auto leading-relaxed">
                  Build automation workflows like Zapier and n8n, completely free.
                  Perfect for students and teachers who want to automate their work.
                </p>
              </div>
            </ScrollAnimator>

            {/* Enhanced CTA Buttons */}
            <ScrollAnimator delay={200}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <MagneticButton variant="primary" className="min-w-[220px] glow">
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Building Free
                </MagneticButton>
                <MagneticButton 
                  variant="secondary"
                  onClick={scrollToFeatures}
                  className="min-w-[220px]"
                >
                  <Target className="w-5 h-5 mr-2" />
                  See How It Works
                </MagneticButton>
              </div>
            </ScrollAnimator>

            {/* Enhanced Trust Badges */}
            <ScrollAnimator delay={400}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[600px] mx-auto">
                <GlassCard className="p-4 text-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <span className="font-semibold text-neutral-700">100% Free Forever</span>
                </GlassCard>
                <GlassCard className="p-4 text-center">
                  <Award className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <span className="font-semibold text-neutral-700">No Credit Card</span>
                </GlassCard>
                <GlassCard className="p-4 text-center">
                  <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <span className="font-semibold text-neutral-700">For Students & Teachers</span>
                </GlassCard>
              </div>
            </ScrollAnimator>

            {/* Enhanced Scroll Indicator */}
            <ScrollAnimator delay={600}>
              <button
                onClick={scrollToFeatures}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 group"
                aria-label="Scroll down"
              >
                <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                  <ArrowDown className="w-6 h-6 text-neutral-600 animate-bounce" />
                </div>
              </button>
            </ScrollAnimator>
          </div>
        </ScrollSection>

        {/* Enhanced Problem/Solution Section */}
        <ScrollSection className="py-24 px-8 bg-white" parallax={false}>
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ScrollAnimator delay={0} direction="left">
                <GlassCard className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-full bg-red-100">
                      <Target className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-title font-black text-neutral-900">
                      Automation is too expensive and complex
                    </h2>
                  </div>
                  <p className="text-large text-neutral-700 leading-relaxed">
                    Most automation tools cost $20-50/month and have steep learning curves.
                    Students and teachers shouldn't have to pay for simple automation.
                  </p>
                </GlassCard>
              </ScrollAnimator>
              
              <ScrollAnimator delay={200} direction="right">
                <GlassCard className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-full bg-yellow-100">
                      <Lightbulb className="w-8 h-8 text-yellow-500" />
                    </div>
                    <h2 className="text-title font-black text-gradient">
                      Autometer makes it free and simple
                    </h2>
                  </div>
                  <p className="text-large text-neutral-700 leading-relaxed">
                    Zero cost, education-focused, and beginner-friendly UI.
                    Start automating in 5 minutes without any coding knowledge.
                  </p>
                </GlassCard>
              </ScrollAnimator>
            </div>

            {/* Enhanced Statistics Cards */}
            <ScrollAnimator delay={400} direction="up">
              <div className="grid md:grid-cols-3 gap-8 mt-20">
                <GlassCard className="p-8 text-center card-hover">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-black text-white">$0</span>
                  </div>
                  <div className="text-4xl font-black text-neutral-900 mb-2">/month</div>
                  <p className="text-large text-neutral-600">Always free, no hidden costs</p>
                </GlassCard>
                
                <GlassCard className="p-8 text-center card-hover">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-black text-neutral-900 mb-2">5 minutes</div>
                  <p className="text-large text-neutral-600">Setup time from start to finish</p>
                </GlassCard>
                
                <GlassCard className="p-8 text-center card-hover">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Network className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-black text-neutral-900 mb-2">No coding</div>
                  <p className="text-large text-neutral-600">Visual builder, drag and drop</p>
                </GlassCard>
              </div>
            </ScrollAnimator>
          </div>
        </ScrollSection>

        {/* Enhanced Features Section */}
        <ScrollSection className="py-32 px-8 bg-gradient-to-br from-neutral-50 to-white" parallax={true}>
          <div className="max-w-[1400px] mx-auto">
            <ScrollAnimator delay={0} direction="up">
              <div className="text-center mb-20">
                <h2 className="text-title font-black text-neutral-900 mb-6">
                  Everything you need to automate your work
                </h2>
                <p className="text-large text-neutral-600 max-w-[700px] mx-auto leading-relaxed">
                  Powerful features designed specifically for students and teachers
                </p>
              </div>
            </ScrollAnimator>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Enhanced Feature 1 */}
              <ScrollAnimator delay={100} direction="left">
                <GlassCard className="p-10 h-full card-hover">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-subtitle font-black text-neutral-900 mb-4">
                    Visual Workflow Builder
                  </h3>
                  <p className="text-body text-neutral-600 leading-relaxed">
                    Drag-and-drop interface like Zapier. Build complex automations without writing a single line of code.
                  </p>
                </GlassCard>
              </ScrollAnimator>

              {/* Enhanced Feature 2 */}
              <ScrollAnimator delay={200} direction="fade">
                <GlassCard className="p-10 h-full card-hover">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                    <Network className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-subtitle font-black text-neutral-900 mb-4">
                    1000+ Integrations
                  </h3>
                  <p className="text-body text-neutral-600 leading-relaxed">
                    Connect with Google Classroom, Slack, email, calendars, and all your favorite apps easily.
                  </p>
                </GlassCard>
              </ScrollAnimator>

              {/* Enhanced Feature 3 */}
              <ScrollAnimator delay={300} direction="right">
                <GlassCard className="p-10 h-full card-hover">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-subtitle font-black text-neutral-900 mb-4">
                    AI-Powered Automation
                  </h3>
                  <p className="text-body text-neutral-600 leading-relaxed">
                    Smart agent building with natural language. Just describe what you want, and AI builds it for you.
                  </p>
                </GlassCard>
              </ScrollAnimator>
            </div>
          </div>
        </ScrollSection>

        {/* Benefits Section with Tabs */}
        <section className="py-24 px-8 bg-white" id="benefits">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16 scroll-animate opacity-0 translate-y-5 transition-all duration-slow">
              <h2 className="text-title font-bold text-neutral-900 mb-4">
                Built for education
              </h2>
              <p className="text-large text-neutral-700 max-w-[600px] mx-auto">
                Whether you're a student or teacher, Autometer helps you save time and focus on what matters
              </p>
            </div>

            <BenefitsTabs />
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-24 px-8 bg-page" id="social-proof">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16 scroll-animate opacity-0 translate-y-5 transition-all duration-slow">
              <h2 className="text-title font-bold text-neutral-900 mb-4">
                Loved by students and teachers
              </h2>
              <p className="text-large text-neutral-700 max-w-[600px] mx-auto">
                See what our users are saying
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="card scroll-animate opacity-0 translate-y-5 transition-all duration-slow bg-surface p-8 rounded-lg shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:scale-105 duration-base ease-out">
                <p className="text-body text-neutral-700 mb-6">
                  "Autometer saved me 10 hours per week on managing assignments and deadlines. It's a game-changer for busy students!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold">
                    AS
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Alex Smith</div>
                    <div className="text-small text-neutral-500">High School Student</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="card scroll-animate opacity-0 translate-y-5 transition-all duration-slow bg-surface p-8 rounded-lg shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:scale-105 duration-base ease-out" style={{ transitionDelay: '100ms' }}>
                <p className="text-body text-neutral-700 mb-6">
                  "My students love using Autometer for their projects. It teaches them valuable automation skills while being completely free."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold">
                    MJ
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Maria Johnson</div>
                    <div className="text-small text-neutral-500">Math Teacher</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="card scroll-animate opacity-0 translate-y-5 transition-all duration-slow bg-surface p-8 rounded-lg shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:scale-105 duration-base ease-out" style={{ transitionDelay: '200ms' }}>
                <p className="text-body text-neutral-700 mb-6">
                  "Perfect for our computer science class. Students can build real-world automation without any cost barriers."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold">
                    DL
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Dr. Lisa Chen</div>
                    <div className="text-small text-neutral-500">CS Professor</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 px-8 bg-gradient-to-br from-primary-500 to-primary-600 text-white" id="cta">
          <div className="max-w-[800px] mx-auto text-center space-y-8">
            <div className="scroll-animate opacity-0 translate-y-5 transition-all duration-slow">
              <h2 className="text-title font-bold mb-4">
                Start Automating in 5 Minutes
              </h2>
              <p className="text-large opacity-90 mb-8">
                Join thousands of students and teachers already saving time with Autometer
              </p>
              <div className="flex justify-center">
                <button className="bg-white text-primary-500 px-10 py-5 rounded-md font-semibold text-lg shadow-card hover:shadow-card-hover hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 active:scale-95 transition-all duration-base ease-out">
                  Create Free Account
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm opacity-90">
              <span>No credit card required</span>
              <span>•</span>
              <span>100% Free</span>
              <span>•</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-8 bg-neutral-900 text-white" id="footer">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {/* Product */}
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-neutral-400">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#benefits" className="hover:text-white transition-colors">Benefits</a></li>
                  <li><a href="#social-proof" className="hover:text-white transition-colors">Testimonials</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-neutral-400">
                  <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="#features" className="hover:text-white transition-colors">Getting Started</a></li>
                  <li><a href="mailto:support@autometer.com" className="hover:text-white transition-colors">Support</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-neutral-400">
                  <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="mailto:hello@autometer.com" className="hover:text-white transition-colors">Contact Us</a></li>
                </ul>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-semibold mb-4">Connect</h3>
                <div className="flex gap-4">
                  <a href="https://twitter.com/autometer" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors" aria-label="Twitter">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="https://github.com/autometer" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors" aria-label="GitHub">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="mailto:hello@autometer.com" className="hover:text-primary-500 transition-colors" aria-label="Email">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-700 pt-8 text-center text-neutral-400">
              <p>&copy; 2025 Autometer. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

// Benefits Tabs Component
function BenefitsTabs() {
  const [activeTab, setActiveTab] = useState<'students' | 'teachers'>('students');

  return (
    <div className="scroll-animate opacity-0 translate-y-5 transition-all duration-slow">
      {/* Tab Buttons */}
      <div className="flex justify-center gap-4 mb-12 border-b border-neutral-200">
        <button
          onClick={() => setActiveTab('students')}
          className={`px-6 py-3 font-medium transition-all duration-base relative ${
            activeTab === 'students'
              ? 'text-primary-500'
              : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50'
          }`}
        >
          For Students
          {activeTab === 'students' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 transition-all duration-base ease-out" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('teachers')}
          className={`px-6 py-3 font-medium transition-all duration-base relative ${
            activeTab === 'teachers'
              ? 'text-primary-500'
              : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50'
          }`}
        >
          For Teachers
          {activeTab === 'teachers' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 transition-all duration-base ease-out" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {activeTab === 'students' ? (
          <>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <BookOpen className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Automate homework tracking</h4>
                  <p className="text-body text-neutral-700">Never miss a deadline with automated reminders and task management</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Network className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Connect learning tools</h4>
                  <p className="text-body text-neutral-700">Sync Notion, Google Drive, Calendar, and all your study apps</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Sparkles className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Build portfolio projects</h4>
                  <p className="text-body text-neutral-700">Create impressive automation projects to showcase your skills</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Zap className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Learn valuable tech skills</h4>
                  <p className="text-body text-neutral-700">Gain automation experience without any coding required</p>
                </div>
              </div>
            </div>
            <div className="bg-primary-50 rounded-lg p-8 flex items-center justify-center">
              <BookOpen className="w-32 h-32 text-primary-500" />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Automate grading and attendance</h4>
                  <p className="text-body text-neutral-700">Save hours each week with automated classroom management</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Personalized communications</h4>
                  <p className="text-body text-neutral-700">Send customized updates to students and parents automatically</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Network className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Manage classroom workflows</h4>
                  <p className="text-body text-neutral-700">Streamline assignment collection, feedback, and progress tracking</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Save 5+ hours per week</h4>
                  <p className="text-body text-neutral-700">Focus on teaching while automation handles repetitive tasks</p>
                </div>
              </div>
            </div>
            <div className="bg-primary-50 rounded-lg p-8 flex items-center justify-center">
              <Users className="w-32 h-32 text-primary-500" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
