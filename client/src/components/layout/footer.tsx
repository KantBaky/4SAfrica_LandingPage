import logoImage from '@assets/4S Logo_1756834402906.jpg';
import { useLanguage } from '@/lib/i18n';
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

const scrollToSection = (href: string) => {
  if (href.startsWith('#')) {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

const getQuickLinks = (t: (key: string) => string) => [
  { href: '#hero', label: t('nav.home') },
  { href: '#solutions', label: t('nav.solutions') },
  { href: '#impact', label: t('nav.impact') },
  { href: '#how-it-works', label: t('nav.howItWorks') },
  { href: '#testimonials', label: t('nav.testimonials') },
  { href: '#contact', label: t('nav.contact') },
  { href: 'https://www.smartsafari.io', label: "SmartSafari"},
];

const socialLinks = [
  { Icon: Twitter, href: 'https://twitter.com/4ssolutions', label: 'Twitter' },
  { Icon: Linkedin, href: 'https://linkedin.com/company/4ssolutions', label: 'LinkedIn' },
  { Icon: Facebook, href: 'https://facebook.com/4ssolutions', label: 'Facebook' },
  { Icon: Instagram, href: 'https://instagram.com/4ssolutions', label: 'Instagram' },
];

export function Footer() {
  const { t } = useLanguage();
  const quickLinks = getQuickLinks(t);

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <img 
              src={logoImage} 
              alt="4S Logo" 
              className="h-14 w-auto mb-4"
            />
            <p className="text-background/80 leading-relaxed mb-6">
              {t('mission.building')}
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-foreground transition-all duration-300 transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                  aria-label={social.label}
                  title={social.label}
                >
                  <social.Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-background mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => {
                const isExternal = link.href.startsWith("http");

                return (
                  <li key={link.href}>
                    {isExternal ? (
                      // External link opens in new tab
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-background/80 hover:text-primary transition-colors focus-visible text-left inline-block"
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link.label}
                      </a>
                    ) : (
                      // Internal link scroll behaviour
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-background/80 hover:text-primary transition-colors focus-visible text-left"
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>


          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-background mb-4">{t('nav.contact')}</h4>
            <ul className="space-y-3 text-background/80">
              <li className="flex items-center">
                <Mail size={18} className="mr-2" />
                info@weare4s.com
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2" />
                +254 782 999 666, +60 13 870 4808
              </li>
              <li className="flex items-center">
                <MapPin size={18} className="mr-2" />
                Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8 text-center md:text-left">
          <p className="text-background/60 text-sm">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
