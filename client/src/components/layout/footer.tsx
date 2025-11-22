import logoImage from '@assets/4S Logo_1756834402906.jpg';
import { useLanguage } from '@/lib/i18n';

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
];

const socialLinks = [
  { icon: 'fab fa-twitter', href: 'https://twitter.com/4ssolutions', label: 'Twitter' },
  { icon: 'fab fa-linkedin', href: 'https://linkedin.com/company/4ssolutions', label: 'LinkedIn' },
  { icon: 'fab fa-facebook', href: 'https://facebook.com/4ssolutions', label: 'Facebook' },
  { icon: 'fab fa-instagram', href: 'https://instagram.com/4ssolutions', label: 'Instagram' },
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
                  <i className={`${social.icon} text-xl font-bold`}></i>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-background mb-4">{t('nav.home') && 'Quick Links'}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-background/80 hover:text-primary transition-colors focus-visible text-left"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-background mb-4">{t('nav.contact')}</h4>
            <ul className="space-y-3 text-background/80">
              <li>
                <i className="fas fa-envelope mr-2"></i>
                info@4ssolutions.com
              </li>
              <li>
                <i className="fas fa-phone mr-2"></i>
                +254 (0) 123 456 7890
              </li>
              <li>
                <i className="fas fa-map-marker-alt mr-2"></i>
                Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8 text-center md:text-left">
          <p className="text-background/60 text-sm">
            © 2025 4S - Sub-Saharan Sustainability Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
