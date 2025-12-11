import logoImage from '@assets/4S Logo_1756834402906.jpg';
import ascentLogo from '@assets/ascent-logo.png';
import { useLanguage } from '@/lib/i18n';
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram, ExternalLink } from 'lucide-react';

const scrollToSection = (href: string) => {
  if (href.startsWith('#')) {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

const getQuickLinks = (t: (key: string) => string) => [
  { href: '#hero', label: t('nav.home'), isExternal: false },
  { href: '#solutions', label: t('nav.solutions'), isExternal: false },
  { href: '#impact', label: t('nav.impact'), isExternal: false },
  { href: '#how-it-works', label: t('nav.howItWorks'), isExternal: false },
  { href: '#track-record', label: t('nav.trackRecord'), isExternal: false },
  { href: '#contact', label: t('nav.contact'), isExternal: false },
  { href: 'https://smartsafari.io', label: 'SmartSafari', isExternal: true },
];

const getPartnerLinks = (ascentLogoSrc: string) => [
  { 
    href: 'https://africasustainability.org/', 
    label: 'Ascent',
    logo: ascentLogoSrc
  },
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
  const partnerLinks = getPartnerLinks(ascentLogo);

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
            <h4 className="font-bold text-background mb-4">{t('nav.home') && 'Quick Links'}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  {link.isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-background/80 hover:text-primary transition-colors focus-visible text-left inline-flex items-center"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-background/80 hover:text-primary transition-colors focus-visible text-left"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
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
        
        {/* Partner Links */}
        <div className="mb-8">
          <h4 className="font-bold text-background mb-4">Partners</h4>
          <div className="flex flex-wrap gap-4 items-center">
            {/* Ascent Logo Link */}
            {partnerLinks.map((partner) => (
              <a
                key={partner.href}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-background/10 hover:bg-background/20 rounded-lg px-4 py-2 transition-colors"
                data-testid={`link-partner-${partner.label.toLowerCase()}`}
              >
                <img 
                  src={partner.logo} 
                  alt={`${partner.label} Logo`} 
                  className="h-10 w-auto"
                />
                <ExternalLink size={14} className="text-background/60" />
              </a>
            ))}
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
