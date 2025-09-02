import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-gradient opacity-90"></div>
      
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')"
        }}
        role="img"
        aria-label="African landscape with acacia trees"
      ></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-accent leading-tight">
            AI-Powered Sustainability for<br />
            <span className="text-accent">Africa's Green Revolution</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Transforming challenges into opportunities through intelligent technology, 
            empowering communities across Sub-Saharan Africa to achieve sustainable development goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-primary px-8 py-4 text-lg font-semibold btn-seed-hover shadow-lg hover:shadow-xl"
              data-testid="button-explore-solutions"
            >
              <i className="fas fa-rocket mr-2"></i>
              Explore Our Solutions
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white px-8 py-4 text-lg font-semibold btn-seed-hover hover:bg-white hover:text-primary"
              data-testid="button-partner-hero"
            >
              <i className="fas fa-handshake mr-2"></i>
              Partner With Us
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white scroll-indicator">
        <motion.div
          className="flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm mb-2">Discover More</span>
          <i className="fas fa-chevron-down text-xl"></i>
        </motion.div>
      </div>
    </section>
  );
}
