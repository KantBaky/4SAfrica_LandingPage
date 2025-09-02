import { Link } from 'wouter';

const footerSections = [
  {
    title: 'Solutions',
    links: [
      { href: '/solutions?filter=energy', label: 'Energy Access' },
      { href: '/solutions?filter=agriculture', label: 'Smart Agriculture' },
      { href: '/solutions?filter=water', label: 'Water Management' },
      { href: '/solutions?filter=education', label: 'Digital Education' },
      { href: '/solutions?filter=climate', label: 'Climate Action' },
    ]
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/team', label: 'Our Team' },
      { href: '/careers', label: 'Careers' },
      { href: '/press', label: 'Press' },
      { href: '/contact', label: 'Contact' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { href: '/insights', label: 'Blog' },
      { href: '/research', label: 'Research' },
      { href: '/case-studies', label: 'Case Studies' },
      { href: '/docs', label: 'Documentation' },
      { href: '/support', label: 'Support' },
    ]
  }
];

const socialLinks = [
  { icon: 'fab fa-twitter', href: 'https://twitter.com/4ssolutions', label: 'Twitter' },
  { icon: 'fab fa-linkedin', href: 'https://linkedin.com/company/4ssolutions', label: 'LinkedIn' },
  { icon: 'fab fa-facebook', href: 'https://facebook.com/4ssolutions', label: 'Facebook' },
  { icon: 'fab fa-instagram', href: 'https://instagram.com/4ssolutions', label: 'Instagram' },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <div className="text-3xl font-bold text-primary font-accent mb-4">4S</div>
            <p className="text-background/80 leading-relaxed mb-6">
              Transforming Sub-Saharan Africa through AI-powered sustainability solutions, 
              creating lasting impact for communities and the environment.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/60 hover:text-primary transition-colors focus-visible"
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                  aria-label={social.label}
                >
                  <i className={`${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>
          
          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-background mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-background/80 hover:text-primary transition-colors focus-visible"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm">
            © 2024 4S - Sub-Saharan Sustainability Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-background/60 hover:text-primary text-sm transition-colors focus-visible"
              data-testid="link-privacy-policy"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-background/60 hover:text-primary text-sm transition-colors focus-visible"
              data-testid="link-terms-of-service"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-background/60 hover:text-primary text-sm transition-colors focus-visible"
              data-testid="link-cookie-policy"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
