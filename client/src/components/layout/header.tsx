import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Wifi } from 'lucide-react';
import { useLowBandwidth } from '@/hooks/use-low-bandwidth';
import { useLanguage } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import logoImage from '../../assets/4S Logo_1756834402906.jpg';

const getNavigationItems = (t: (key: string) => string) => [
  { href: '#hero', label: t('nav.home') },
  { href: '#solutions', label: t('nav.solutions') },
  { href: '#impact', label: t('nav.impact') },
  { href: '#how-it-works', label: t('nav.howItWorks') },
  { href: '#track-record', label: 'Track Record' },
  { href: '#contact', label: t('nav.contact') },
];

const scrollToSection = (href: string) => {
  if (href.startsWith('#')) {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLowBandwidth, toggleLowBandwidth } = useLowBandwidth();
  const { t } = useLanguage();
  const navigationItems = getNavigationItems(t);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-40" 
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('#hero')} 
            className="flex items-center focus:outline-none cursor-pointer border-0 bg-transparent p-0"
            data-testid="link-home"
            aria-label="Home"
          >
            <img 
              src={logoImage} 
              alt="4S - Sub-Sahara Sustainability Solutions" 
              className="h-10 w-auto"
            />
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-2 text-sm font-medium transition-all focus:outline-none text-balance hover:text-primary hover:bg-primary/5 rounded-md border-0 bg-transparent"
                  data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Section - Language, Bandwidth Button and Mobile Menu */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Bandwidth Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLowBandwidth}
              data-testid="button-low-bandwidth-toggle"
              className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/85 hover:text-primary-foreground transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Wifi className="w-4 h-4 mr-2" />
              {isLowBandwidth ? 'High Bandwidth' : 'Low Bandwidth'}
            </Button>

            {/* Mobile Menu */}
            <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  data-testid="button-mobile-menu"
                  aria-label="Toggle mobile menu"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigationItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className="block px-3 py-2 text-base font-medium transition-colors text-muted-foreground hover:text-primary text-left border-0 bg-transparent focus:outline-none"
                      data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="flex gap-2 mt-4">
                    <LanguageSwitcher />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleLowBandwidth}
                    data-testid="button-low-bandwidth-toggle-mobile"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground mt-4"
                  >
                    <Wifi className="w-4 h-4 mr-2" />
                    {isLowBandwidth ? 'High Bandwidth' : 'Low Bandwidth'}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
