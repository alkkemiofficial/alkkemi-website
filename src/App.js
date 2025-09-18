import React, { useState, useEffect } from 'react';

const AlkkemiWebsite = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState({});
  const [isNavDark, setIsNavDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: '',
      email: '',
      company: '',
      message: ''
    });
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
                src="/alkkemilogo.png" 
                alt="Alkkemi" 
                className="h-8 object-contain transition-opacity duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'inline-block';
                }}
              />
              <span className={`font-semibold text-lg transition-colors duration-500 hidden ${
                isNavDark ? 'text-gray-800' : 'text-white'
              }`}>
                Alkkemi
              </span>
            </div>
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
                  onClick={() => scrollToSection(item.id)}
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
              <button className={`transition-colors duration-500 ${
                isNavDark ? 'text-gray-800' : 'text-white'
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
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
            About Alkkemi
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
              { number: "25.86%", label: "Growth in Japanese Learners" },
              { number: "6.57%", label: "Japanese Learning Market CAGR" }
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
            
            <div className="text-lg lg:text-xl leading-relaxed space-y-6">
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
                initials: "RK",
                gradient: "from-pink-500 to-orange-500"
              },
              {
                name: "Deepak Pagadala",
                title: "CTO & Founder",
                education: "B.Tech in Computer Science Engineering\nMS in Data Science",
                initials: "DP",
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
                <div className={`w-32 h-32 bg-gradient-to-br ${member.gradient} rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold shadow-lg`}>
                  {member.initials}
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <div className={`bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent font-medium mb-4`}>{member.title}</div>
                <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {member.education}
                </div>
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
          
          <div 
            data-animate
            id="contact-form"
            className={`max-w-2xl mx-auto bg-white bg-opacity-5 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-white border-opacity-10 transition-all duration-1000 ${
              isVisible['contact-form'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="text-left">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm text-white placeholder-gray-300 focus:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 border border-white border-opacity-20"
                />
              </div>
              <div className="text-left">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm text-white placeholder-gray-300 focus:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 border border-white border-opacity-20"
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
                className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm text-white placeholder-gray-300 focus:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 border border-white border-opacity-20"
              />
            </div>
            
            <div className="mb-8 text-left">
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your interest in Alkkemi..."
                className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm text-white placeholder-gray-300 focus:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 resize-none border border-white border-opacity-20"
              />
            </div>
            
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-full font-medium text-lg tracking-wide uppercase transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              Send Message
            </button>
          </div>
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
      `}</style>
    </div>
  );
};

export default AlkkemiWebsite;