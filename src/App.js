import React, { useState, useEffect } from 'react';

const AlkkemiWebsite = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState({});
  const [isNavDark, setIsNavDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // GA4 Event Tracking Function with debugging
  const trackEvent = (eventName, parameters = {}) => {
    console.log('🔍 Tracking event:', eventName, parameters);
    console.log('🔍 GA4 available:', !!window.gtag);
    
    if (window.gtag) {
      console.log('✅ Firing GA4 event:', eventName);
      window.gtag('event', eventName, parameters);
    } else {
      console.log('❌ GA4 not loaded');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Close mobile menu on scroll
      setIsMobileMenuOpen(false);
      
      const sections = ['hero', 'about', 'mission', 'team', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Determine if nav should be dark based on current section
      const navPosition = window.scrollY + 100; // Nav bar height consideration
      const aboutSection = document.getElementById('about');
      const teamSection = document.getElementById('team');
      
      let shouldBeDark = false;
      
      if (aboutSection && teamSection) {
        const aboutTop = aboutSection.offsetTop;
        const aboutBottom = aboutTop + aboutSection.offsetHeight;
        const teamTop = teamSection.offsetTop;
        const teamBottom = teamTop + teamSection.offsetHeight;
        
        // Nav should be dark when over light sections (about and team)
        shouldBeDark = (navPosition >= aboutTop && navPosition <= aboutBottom) ||
                       (navPosition >= teamTop && navPosition <= teamBottom);
      }
      
      setIsNavDark(shouldBeDark);

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveSection(section);
          }
        }
      });
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({
      behavior: 'smooth'
    });
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Track form submission attempt
    trackEvent('form_submit_attempt', {
      form_type: 'contact',
      has_name: !!formData.name,
      has_email: !!formData.email,
      has_company: !!formData.company,
      has_message: !!formData.message
    });
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('Please fill in all required fields.');
      trackEvent('form_validation_error', {
        form_type: 'contact',
        error: 'missing_required_fields'
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('');
    
    try {
      // Using Formspree - fallback to direct endpoint if env var not found
      const formspreeEndpoint = process.env.REACT_APP_FORMSPREE_ENDPOINT || 'https://formspree.io/f/YOUR_ACTUAL_ENDPOINT_HERE';
      
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          _replyto: formData.email,
          _subject: `New contact from ${formData.name} - Alkkemi Website`
        }),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        });
        
        // Track successful form submission
        trackEvent('form_submit_success', {
          form_type: 'contact',
          user_has_company: !!formData.company
        });
        
      } else {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error(`HTTP ${response.status}: ${errorData}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      
      // Track form submission error
      trackEvent('form_submit_error', {
        form_type: 'contact',
        error_message: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-500 ${
        isNavDark 
          ? 'bg-white bg-opacity-80 border-gray-200 shadow-sm' 
          : 'bg-white bg-opacity-5 border-white border-opacity-10'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Alkkemi" 
                className="h-12 object-contain transition-opacity duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'inline-block';
                }}
                onClick={() => {
                  trackEvent('logo_click', {
                    location: 'header'
                  });
                }}
              />
              <span className={`font-semibold text-lg transition-colors duration-500 hidden ${
                isNavDark ? 'text-gray-800' : 'text-white'
              }`}>
                Alkkemi
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'mission', label: 'Mission' },
                { id: 'team', label: 'Team' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    trackEvent('navigation_click', {
                      section: item.label,
                      location: 'header'
                    });
                    scrollToSection(item.id);
                  }}
                  className={`transition-colors duration-500 ${
                    isNavDark 
                      ? `text-gray-700 hover:text-blue-600 ${
                          activeSection === item.id ? 'text-blue-600 font-medium' : ''
                        }`
                      : `text-white hover:text-blue-200 ${
                          activeSection === item.id ? 'text-blue-200 font-medium' : ''
                        }`
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                className={`transition-colors duration-500 ${
                  isNavDark ? 'text-gray-800' : 'text-white'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  trackEvent('mobile_menu_click', {
                    location: 'header',
                    action: isMobileMenuOpen ? 'close' : 'open'
                  });
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    // X icon when menu is open
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    // Hamburger icon when menu is closed
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className={`md:hidden border-t transition-all duration-300 ${
              isNavDark 
                ? 'bg-white bg-opacity-90 border-gray-200' 
                : 'bg-white bg-opacity-5 border-white border-opacity-10'
            }`}>
              <div className="px-6 py-4 space-y-4">
                {[
                  { id: 'hero', label: 'Home' },
                  { id: 'about', label: 'About' },
                  { id: 'mission', label: 'Mission' },
                  { id: 'team', label: 'Team' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      trackEvent('mobile_navigation_click', {
                        section: item.label,
                        location: 'mobile_menu'
                      });
                      scrollToSection(item.id);
                      setIsMobileMenuOpen(false); // Close menu after click
                    }}
                    className={`block w-full text-left py-2 transition-colors duration-500 ${
                      isNavDark 
                        ? `text-gray-700 hover:text-blue-600 ${
                            activeSection === item.id ? 'text-blue-600 font-medium' : ''
                          }`
                        : `text-white hover:text-blue-200 ${
                            activeSection === item.id ? 'text-blue-200 font-medium' : ''
                          }`
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="hero" 
        className="min-h-screen flex items-center justify-center text-white relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.3), transparent),
            radial-gradient(ellipse 60% 50% at 80% 50%, rgba(255, 119, 198, 0.3), transparent),
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(59, 130, 246, 0.3), transparent),
            linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)
          `
        }}
      >
        <div className="text-center z-10">
          <div className="mb-8 animate-fade-in-up">
            <img 
              src="/alkkemilogo.png" 
              alt="Alkkemi" 
              className="h-32 mx-auto mb-4 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <h1 className="text-6xl lg:text-8xl font-light tracking-widest hidden">Alkkemi</h1>
          </div>
          <p className="text-xl lg:text-2xl font-light opacity-90 animate-fade-in-up animation-delay-500">
            It doesn't have to be often, it just has to be consistent.
          </p>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          {/* Animated orbs */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-80 h-80 bg-gradient-to-r from-green-400 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className="min-h-screen flex items-center justify-center py-20 pt-24 relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 100% 100% at 50% 0%, rgba(59, 130, 246, 0.1), transparent 50%),
            radial-gradient(ellipse 80% 60% at 0% 50%, rgba(147, 51, 234, 0.1), transparent 50%),
            radial-gradient(ellipse 80% 60% at 100% 50%, rgba(59, 130, 246, 0.1), transparent 50%),
            linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)
          `
        }}
      >
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 
            data-animate
            id="about-title"
            className={`text-4xl lg:text-5xl font-light text-gray-800 mb-16 transition-all duration-1000 ${
              isVisible['about-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Experience Alkkemi
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {[
              {
                title: "Self-Determination",
                description: "Learn at your own pace with personalized content that adapts to your learning style and schedule."
              },
              {
                title: "All Resources in One App",
                description: "Books, podcasts, games, AI conversations, and more - everything you need in a single platform."
              },
              {
                title: "Niche Market Focus",
                description: "Specialized in Japanese and Korean language learning with authentic, culturally relevant content."
              }
            ].map((feature, index) => (
              <div
                key={index}
                data-animate
                id={`feature-${index}`}
                className={`bg-white bg-opacity-70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-white border-opacity-20 ${
                  isVisible[`feature-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => {
                  trackEvent('feature_card_click', {
                    feature_name: feature.title,
                    section: 'about'
                  });
                }}
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "$184B", label: "Mobile Learning Market by 2028" },
              { number: "1.47M", label: "Japanese Proficiency Test Takers (2024)" },
              { number: "74.14%", label: "Gap Covered in Japanese Learners" },
              { number: "1.14x", label: "TOPIK Korean Test Takers (2024)" }
            ].map((stat, index) => (
              <div
                key={index}
                data-animate
                id={`stat-${index}`}
                className={`text-center transition-all duration-1000 ${
                  isVisible[`stat-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <section 
        id="app-showcase" 
        className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 150% 100% at 50% 0%, rgba(139, 92, 246, 0.2), transparent 50%),
            radial-gradient(ellipse 100% 80% at 80% 50%, rgba(59, 130, 246, 0.1), transparent 50%),
            radial-gradient(ellipse 100% 80% at 20% 50%, rgba(236, 72, 153, 0.1), transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)
          `
        }}
      >
        <div className="container mx-auto px-6 text-center max-w-7xl relative z-10">
          <h2 
            data-animate
            id="showcase-title"
            className={`text-4xl lg:text-5xl font-light text-white mb-8 transition-all duration-1000 ${
              isVisible['showcase-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            See Alkkemi In Action
          </h2>
          
          <p 
            data-animate
            id="showcase-subtitle"
            className={`text-lg text-blue-200 mb-4 max-w-3xl mx-auto transition-all duration-1000 ${
              isVisible['showcase-subtitle'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            From AI conversations to comprehensive dictionaries, discover the complete language learning experience we've built for you.
          </p>

          <p 
            data-animate
            id="test-ready"
            className={`text-xl text-gradient bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent font-semibold mb-16 transition-all duration-1000 ${
              isVisible['test-ready'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            See if you're ready to take the language test
          </p>

          {/* Phone Mockups in a Row */}
          <div 
            data-animate
            id="mockups-container"
            className={`relative max-w-7xl mx-auto transition-all duration-1000 ${
              isVisible['mockups-container'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
              {[
                {
                  title: "Sentence Correction",
                  description: "Get instant feedback and corrections on your writing",
                  image: "mockup4.png", 
                  width: 200,
                  height: Math.round(200 * (641/332))
                },
                {
                  title: "Voice Mode", 
                  description: "Perfect your pronunciation with AI-powered feedback",
                  image: "mockup2.png",
                  width: 200,
                  height: Math.round(200 * (714/375))
                },
                {
                  title: "Real-time Conversation",
                  description: "Practice conversations with intelligent AI language partners", 
                  image: "mockup3.png",
                  width: 200,
                  height: Math.round(200 * (772/387))
                },
                {
                  title: "Dictionary",
                  description: "Comprehensive Japanese & Korean dictionary with examples",
                  image: "mockup1.png",
                  width: 200,
                  height: Math.round(200 * (903/469))
                },
                {
                  title: "Podcasts",
                  description: "Learn through engaging audio content and stories",
                  image: "mockup5.png",
                  width: 200,
                  height: Math.round(200 * (739/364))
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center transition-all duration-500 hover:scale-105 cursor-pointer"
                  data-index={index}
                  onClick={() => {
                    trackEvent('mockup_click', {
                      feature_name: feature.title,
                      mockup_index: index,
                      section: 'app_showcase'
                    });
                  }}
                >
                  <div className="relative mb-6">
                    <div 
                      className="shadow-2xl hover:shadow-3xl transition-shadow duration-300 mx-auto rounded-[2rem] overflow-hidden"
                      style={{ 
                        width: `${feature.width}px`, 
                        height: `${Math.min(feature.height, 400)}px`
                      }}
                    >
                      <img 
                        src={`/${feature.image}`} 
                        alt={feature.title}
                        className="w-full h-full object-contain rounded-[2rem]"
                        onError={(e) => {
                          const parent = e.target.parentNode;
                          parent.innerHTML = `
                            <div class="flex flex-col items-center justify-center h-full text-gray-400 bg-gray-900 rounded-[2rem]">
                              <svg class="w-16 h-16 mb-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                              </svg>
                              <span class="text-sm font-medium">${feature.title}</span>
                            </div>
                          `;
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-center max-w-xs">
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-blue-200 opacity-90 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div 
            data-animate
            id="cta-section"
            className={`mt-16 transition-all duration-1000 ${
              isVisible['cta-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-blue-200 text-lg mb-6">Ready to transform your language learning journey?</p>
            <button 
              onClick={() => {
                trackEvent('cta_click', {
                  button_text: 'Join the Waitlist',
                  section: 'app_showcase'
                });
                scrollToSection('contact');
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-full font-medium text-lg tracking-wide uppercase transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/25 text-white"
            >
              Join the Waitlist
            </button>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-32 left-16 w-48 h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-64 h-64 bg-gradient-to-r from-pink-600 to-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse animation-delay-2000"></div>
        </div>
      </section>

      {/* Mission Section */}
      <section 
        id="mission" 
        className="min-h-screen flex items-center justify-center text-white py-20 relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 150% 100% at 50% 0%, rgba(139, 92, 246, 0.3), transparent 50%),
            radial-gradient(ellipse 100% 80% at 80% 50%, rgba(59, 130, 246, 0.2), transparent 50%),
            radial-gradient(ellipse 100% 80% at 20% 50%, rgba(236, 72, 153, 0.2), transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)
          `
        }}
      >
        <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
          <h2 
            data-animate
            id="mission-title"
            className={`text-4xl lg:text-5xl font-light mb-16 transition-all duration-1000 ${
              isVisible['mission-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Our Mission
          </h2>
          
          <div 
            data-animate
            id="mission-content"
            className={`transition-all duration-1000 ${
              isVisible['mission-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <blockquote className="text-2xl lg:text-3xl font-light italic mb-8 opacity-90 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              "It doesn't have to be often, it just has to be consistent."
            </blockquote>
            
            <div className="text-lg lg:text-xl leading-relaxed space-y-6 mb-12">
              <p>
                We believe that language learning should be accessible, engaging, and sustainable. 
                Our mission is to create a comprehensive platform that brings together all the tools 
                you need to master Japanese and Korean languages.
              </p>
              <p>
                Through innovative features like AI conversation practice, curated content, and 
                gamified learning experiences, we're revolutionizing how people approach language 
                acquisition in the digital age.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl border border-white border-opacity-20">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Hone Language Skills</h3>
                <p className="text-base leading-relaxed opacity-90">
                  To hone second language skills in reading, listening, and speaking by providing fun materials, 
                  real-world context, and resources that foster study responsibility.
                </p>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl border border-white border-opacity-20">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Build Confidence</h3>
                <p className="text-base leading-relaxed opacity-90">
                  To be the go-to resource for language learners to become fluent in a language and help users 
                  become more confident in their skills.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-32 left-16 w-48 h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-64 h-64 bg-gradient-to-r from-pink-600 to-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        id="team" 
        className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 0%, rgba(236, 72, 153, 0.1), transparent 50%),
            radial-gradient(ellipse 80% 100% at 0% 50%, rgba(59, 130, 246, 0.1), transparent 50%),
            radial-gradient(ellipse 80% 100% at 100% 50%, rgba(139, 92, 246, 0.1), transparent 50%),
            linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)
          `
        }}
      >
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 
            data-animate
            id="team-title"
            className={`text-4xl lg:text-5xl font-light text-gray-800 mb-16 transition-all duration-1000 ${
              isVisible['team-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Meet the Founders
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              {
                name: "Rachel Krantz",
                title: "CEO & Founder", 
                education: "BA in Entrepreneurship & Business Analytics\nEast Asian Languages",
                image: "rachel.jpg",
                linkedin: "https://linkedin.com/in/rakrantz/",
                gradient: "from-pink-500 to-orange-500"
              },
              {
                name: "Deepak Pagadala",
                title: "CTO & Founder",
                education: "B.Tech in Computer Science Engineering\nMS in Data Science",
                image: "deepak.jpg",
                linkedin: "https://linkedin.com/in/nagadeepakpagadala",
                gradient: "from-blue-500 to-purple-600"
              }              
            ].map((member, index) => (
              <div
                key={index}
                data-animate
                id={`member-${index}`}
                className={`bg-white bg-opacity-70 backdrop-blur-sm p-8 lg:p-12 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-white border-opacity-20 ${
                  isVisible[`member-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="relative mx-auto mb-6 w-32 h-32">
                  <img 
                    src={`/${member.image}`} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className={`w-32 h-32 bg-gradient-to-br ${member.gradient} rounded-full hidden items-center justify-center text-white text-3xl font-bold shadow-lg`}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <div className={`bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent font-medium mb-4`}>{member.title}</div>
                <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line mb-6">
                  {member.education}
                </div>
                
                <a 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent('social_link_click', {
                      platform: 'linkedin',
                      member_name: member.name,
                      member_role: member.title
                    });
                  }}
                  className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${member.gradient} text-white rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
                >
                  <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className="min-h-screen flex items-center justify-center text-white py-20 relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 120% 100% at 50% 0%, rgba(59, 130, 246, 0.3), transparent 50%),
            radial-gradient(ellipse 100% 80% at 0% 100%, rgba(139, 92, 246, 0.3), transparent 50%),
            radial-gradient(ellipse 100% 80% at 100% 100%, rgba(236, 72, 153, 0.3), transparent 50%),
            linear-gradient(135deg, #1e293b 0%, #334155 25%, #475569 75%, #64748b 100%)
          `
        }}
      >
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 
            data-animate
            id="contact-title"
            className={`text-4xl lg:text-5xl font-light mb-16 transition-all duration-1000 ${
              isVisible['contact-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Get In Touch
          </h2>
          
          <form 
            data-animate
            id="contact-form"
            onSubmit={handleSubmit}
            className={`max-w-2xl mx-auto bg-white bg-opacity-5 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-white border-opacity-10 transition-all duration-1000 ${
              isVisible['contact-form'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500 bg-opacity-20 border border-green-400 rounded-xl text-green-200 text-center">
                Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-400 rounded-xl text-red-200 text-center">
                Sorry, there was an error sending your message. Please try again or email us directly.
              </div>
            )}
            
            {submitStatus && submitStatus !== 'success' && submitStatus !== 'error' && (
              <div className="mb-6 p-4 bg-yellow-500 bg-opacity-20 border border-yellow-400 rounded-xl text-yellow-200 text-center">
                {submitStatus}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="text-left">
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm text-white placeholder-gray-300 focus:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 border border-white border-opacity-20 disabled:opacity-50"
                />
              </div>
              <div className="text-left">
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm text-white placeholder-gray-300 focus:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 border border-white border-opacity-20 disabled:opacity-50"
                />
              </div>
            </div>
            
            <div className="mb-6 text-left">
              <label className="block text-sm font-medium mb-2">Company (Optional)</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm text-white placeholder-gray-300 focus:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 border border-white border-opacity-20 disabled:opacity-50"
              />
            </div>
            
            <div className="mb-8 text-left">
              <label className="block text-sm font-medium mb-2">Message *</label>
              <textarea
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleInputChange}
                disabled={isSubmitting}
                placeholder="Tell us about your interest in Alkkemi..."
                className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm text-white placeholder-gray-300 focus:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 resize-none border border-white border-opacity-20 disabled:opacity-50"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => {
                trackEvent('form_submit_click', {
                  form_type: 'contact',
                  section: 'contact'
                });
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed px-8 py-4 rounded-full font-medium text-lg tracking-wide uppercase transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/25 disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center min-w-[200px]"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-pink-600 to-orange-600 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse animation-delay-3000"></div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1.5s ease-out;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        /* Hide scrollbar for webkit browsers */
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default AlkkemiWebsite;