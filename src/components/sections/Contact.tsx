import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, SectionTitle, Button } from '../ui';
import { Mail, Send, Linkedin, Github, Twitter } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  const inputClasses = "w-full bg-background-dark text-white border border-gray-800 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:border-transparent transition-colors";
  
  return (
    <Container id="contact" className="py-20">
      <SectionTitle
        title="Get In Touch"
        subtitle="Have a question, project idea, or just want to say hello? Send me a message and let's connect."
        accentColor="purple"
        centerTitle
      />
      
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-display mb-6">Let's collaborate on something amazing</h3>
          <p className="text-gray-400 mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Whether you need a developer for your quantum computing project, AI implementation, or an immersive web experience, I'm here to help.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-neon-purple" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-300">Email</h4>
                <a href="mailto:contact@quantumverse.ai" className="text-neon-purple hover:underline">contact@quantumverse.ai</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center">
                <Linkedin className="w-5 h-5 text-neon-blue" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-300">LinkedIn</h4>
                <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">linkedin.com/in/username</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-neon-teal/20 flex items-center justify-center">
                <Github className="w-5 h-5 text-neon-teal" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-300">GitHub</h4>
                <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" className="text-neon-teal hover:underline">github.com/username</a>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-neon-purple/10 to-transparent rounded-lg blur-3xl opacity-30"></div>
          
          {/* Contact form */}
          <form 
            onSubmit={handleSubmit} 
            className="relative bg-background-card border border-gray-800 rounded-lg p-6 shadow-lg"
          >
            {isSubmitted ? (
              <motion.div 
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 mx-auto bg-neon-purple/20 rounded-full flex items-center justify-center mb-4">
                  <Send className="w-8 h-8 text-neon-purple" />
                </div>
                <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                <p className="text-gray-400">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-sm text-gray-400">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm text-gray-400">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-1 mb-4">
                  <label htmlFor="subject" className="text-sm text-gray-400">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="What's this about?"
                  />
                </div>
                
                <div className="space-y-1 mb-6">
                  <label htmlFor="message" className="text-sm text-gray-400">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>
                
                <div className="text-right">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<Send size={18} />}
                    type="submit"
                    isLoading={isSubmitting}
                    glowing={true}
                  >
                    Send Message
                  </Button>
                </div>
              </>
            )}
          </form>
        </motion.div>
      </div>
      
      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-xl font-semibold mb-4">Connect on Social Media</h3>
        <div className="flex justify-center space-x-4">
          {[
            { icon: <Github size={24} />, href: "https://github.com/username", label: "GitHub" },
            { icon: <Linkedin size={24} />, href: "https://linkedin.com/in/username", label: "LinkedIn" },
            { icon: <Twitter size={24} />, href: "https://twitter.com/username", label: "Twitter" },
            { icon: <Mail size={24} />, href: "mailto:contact@quantumverse.ai", label: "Email" }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-background-card border border-gray-800 flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue transition-colors"
              aria-label={social.label}
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 0 10px rgba(67, 97, 238, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </Container>
  );
};

export default ContactForm;