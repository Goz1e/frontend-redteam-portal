import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface LandingPageProps {
  onEnterDashboard: () => void;
}

export function LandingPage({ onEnterDashboard }: LandingPageProps) {
  const [loaded, setLoaded] = useState(false);

  const heroImage = "https://images.unsplash.com/photo-1584461800203-e8b0a2fd55ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwcmVkJTIwdGVhbXxlbnwxfHx8fDE3NTYyNzQzNTd8MA&ixlib=rb-4.1.0&q=80&w=1080";
  const networkImage = "https://images.unsplash.com/photo-1639322537231-2f206e06af84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwbmV0d29yayUyMG5vZGVzfGVufDF8fHx8MTc1NjI3NDM2MHww&ixlib=rb-4.1.0&q=80&w=1080";
  const aiSecurityImage = "https://images.unsplash.com/photo-1694954960354-f671619ea37d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwc2VjdXJpdHl8ZW58MXx8fHwxNzU2Mjc0MzYzfDA&ixlib=rb-4.1.0&q=80&w=1080";

  const stats = [
    { value: '24/7', label: 'Network Uptime' },
    { value: '100+', label: 'Active Miners' },
    { value: '1M+', label: 'Tests Completed' }
  ];

  const features = [
    {
      icon: '🔒',
      title: 'AI Safety Testing',
      description: 'Comprehensive adversarial testing to identify vulnerabilities in AI systems before deployment.'
    },
    {
      icon: '🌐',
      title: 'Decentralized Network',
      description: 'Distributed infrastructure ensuring no single point of failure and maximum security.'
    },
    {
      icon: '💰',
      title: 'Incentivized Mining',
      description: 'Earn rewards for contributing computational resources and finding AI vulnerabilities.'
    },
    {
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Monitor network performance, mining statistics, and security metrics in real-time.'
    },
    {
      icon: '🛡️',
      title: 'Advanced Validation',
      description: 'Multi-layer validation ensures the quality and authenticity of all security assessments.'
    },
    {
      icon: '🚀',
      title: 'Scalable Architecture',
      description: 'Built to handle enterprise-scale AI systems with unlimited growth potential.'
    }
  ];

  const workflowSteps = [
    {
      title: 'Submit AI Models',
      description: 'Researchers submit AI models or systems for comprehensive security testing and vulnerability assessment.'
    },
    {
      title: 'Miners Execute Tests',
      description: 'Network miners run sophisticated red teaming attacks to identify potential vulnerabilities and weaknesses.'
    },
    {
      title: 'Validators Verify',
      description: 'Validators confirm the quality and accuracy of test results, ensuring reliable security assessments.'
    },
    {
      title: 'Rewards Distributed',
      description: 'Successful miners and validators receive cryptocurrency rewards based on their contributions to network security.'
    }
  ];

  const techStack = [
    { name: 'Bittensor', icon: '⚡' },
    { name: 'Blockchain', icon: '🔗' },
    { name: 'AI/ML', icon: '🤖' },
    { name: 'Cybersecurity', icon: '🛡️' }
  ];

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-auto">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Cybersecurity Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-primary/20"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo/Brand */}
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
                Red<span className="text-primary">Team</span>
              </h1>
              <div className="h-1 w-32 bg-primary mx-auto rounded-full"></div>
            </div>

            {/* Main Tagline */}
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-primary bg-clip-text text-transparent">
              Decentralized AI Red Teaming
            </h2>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              The world's first decentralized subnet for AI safety testing, vulnerability assessment, 
              and adversarial evaluation powered by blockchain technology.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.button 
                onClick={onEnterDashboard}
                className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enter Dashboard
              </motion.button>
              <motion.button 
                onClick={scrollToAbout}
                className="px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about-section" className="py-20 px-6 bg-gradient-to-b from-black to-card/20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">What is RedTeam Subnet?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A revolutionary approach to AI safety through decentralized red teaming, 
              powered by Bittensor's blockchain infrastructure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div 
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold mb-6 text-primary">Decentralized AI Testing</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                RedTeam operates as a subnet within the Bittensor network, enabling miners to contribute 
                computational resources for AI safety testing while validators ensure quality and effectiveness 
                of red teaming attempts.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Distributed vulnerability assessment
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Incentivized security research
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Blockchain-verified results
                </li>
              </ul>
            </motion.div>
            <motion.div 
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src={networkImage} 
                  alt="Blockchain Network"
                  className="w-full h-80 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-primary text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-card/20 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">How RedTeam Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A sophisticated ecosystem where miners, validators, and AI systems work together 
              to enhance AI safety through adversarial testing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src={aiSecurityImage} 
                alt="AI Security"
                className="w-full h-80 object-cover rounded-lg"
              />
            </motion.div>
            <div className="space-y-8">
              {workflowSteps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-card/20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Built on Cutting-Edge Technology</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              RedTeam leverages the latest in blockchain, AI, and cybersecurity technologies 
              to create a robust and scalable red teaming platform.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {techStack.map((tech, index) => (
              <motion.div 
                key={index}
                className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl mb-3">{tech.icon}</div>
                <h4 className="font-semibold">{tech.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-card/20 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Secure AI's Future?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the RedTeam network and contribute to making AI systems safer, 
              more robust, and more trustworthy for everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                onClick={onEnterDashboard}
                className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
              </motion.button>
              <motion.a 
                href="https://docs.theredteam.io" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read Documentation
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}