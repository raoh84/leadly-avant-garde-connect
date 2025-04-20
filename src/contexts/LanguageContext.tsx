
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.login': 'Login',
    'nav.getStarted': 'Get Started Free',
    
    // Hero Section
    'hero.title': 'Turn More Leads into Clients. Instantly.',
    'hero.subtitle': 'Instant lead alerts, messaging templates, and smart tracking – all in one app.',
    'hero.cta1': 'Get Started Free',
    'hero.cta2': 'See Pricing',
    
    // Features Section
    'features.title': 'Everything You Need to Convert More Leads',
    'features.subtitle': 'Leadly provides all the tools your team needs to capture, engage, and convert more leads.',
    'features.leadCapture.title': 'Lead Capture',
    'features.leadCapture.description': 'Capture leads from multiple sources including Facebook, Instagram, websites, and more.',
    'features.instantAlerts.title': 'Instant Alerts',
    'features.instantAlerts.description': 'Get notified immediately when new leads come in so you never miss an opportunity.',
    'features.teamManagement.title': 'Team Management',
    'features.teamManagement.description': 'Distribute leads automatically to your team members based on rules you set.',
    'features.templates.title': 'Message Templates',
    'features.templates.description': 'Create and use templates to quickly respond to leads with personalized messages.',
    
    // Pricing Section
    'pricing.title': 'Simple, Transparent Pricing',
    'pricing.subtitle': 'Choose the plan that works best for your business',
    'pricing.monthly': 'Monthly',
    'pricing.yearly': 'Yearly',
    'pricing.free.title': 'Free',
    'pricing.free.price': 'Free Forever',
    'pricing.free.description': 'For small teams or solo entrepreneurs just getting started',
    'pricing.free.cta': 'Get Started',
    'pricing.pro.title': 'Pro',
    'pricing.pro.price': '$35',
    'pricing.pro.period': '/month per user',
    'pricing.pro.yearlyPrice': '$25',
    'pricing.pro.yearDiscount': 'Save $120/year',
    'pricing.pro.description': 'For growing teams that need more power and flexibility',
    'pricing.pro.cta': 'Start 14-Day Trial',
    'pricing.ultimate.title': 'Ultimate',
    'pricing.ultimate.price': 'Custom',
    'pricing.ultimate.description': 'For large teams with advanced needs and custom requirements',
    'pricing.ultimate.cta': 'Contact Sales',
    'pricing.compare': 'Compare all features',
    
    // Feature comparison
    'compare.feature': 'Feature',
    'compare.free': 'Free',
    'compare.pro': 'Pro',
    'compare.ultimate': 'Ultimate',
    'compare.teamMembers': 'Team Members',
    'compare.teamMembers.free': 'Up to 3',
    'compare.teamMembers.pro': 'Unlimited',
    'compare.teamMembers.ultimate': '20+',
    'compare.leadSources': 'Lead Source Integrations',
    'compare.leadSources.free': 'Unlimited',
    'compare.leadSources.pro': 'Unlimited',
    'compare.leadSources.ultimate': 'Unlimited',
    'compare.leadAlerts': 'Lead Alerts',
    'compare.leadAlerts.free': 'App only',
    'compare.leadAlerts.pro': 'App + Email',
    'compare.leadAlerts.ultimate': 'App + Email + WhatsApp',
    'compare.templates': 'Templates',
    'compare.templates.free': 'Up to 10',
    'compare.templates.pro': 'Unlimited',
    'compare.templates.ultimate': 'Unlimited',
    'compare.leadEngagement': 'Lead Engagement',
    'compare.leadEngagement.free': '10 most recent',
    'compare.leadEngagement.pro': 'Unlimited',
    'compare.leadEngagement.ultimate': 'Unlimited',
    'compare.aiParsing': 'AI Lead Parsing',
    'compare.customBranding': 'Custom Branding',
    'compare.advancedTeam': 'Advanced Team Management',
    
    // Testimonials Section
    'testimonials.title': 'What Our Clients Say',
    'testimonials.subtitle': 'Businesses of all sizes trust Leadly to manage their leads and grow their customer base.',
    
    // FAQ Section
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Have more questions? Contact our support team',
    'faq.q1': 'Is there a free plan?',
    'faq.a1': 'Yes, Leadly offers a Free Forever plan that includes all the basic features for up to 3 team members.',
    'faq.q2': 'Can I add my team?',
    'faq.a2': 'Absolutely! You can add up to 3 team members on the Free plan or unlimited team members on the Pro plan.',
    'faq.q3': 'What\'s included in the trial?',
    'faq.a3': 'The 14-day trial includes all Pro plan features with no credit card required. You can upgrade or downgrade at the end of the trial.',
    'faq.q4': 'How does lead distribution work?',
    'faq.a4': 'Leadly can automatically distribute leads to your team members based on rules you set, such as round-robin, skills, or availability.',
    'faq.q5': 'Can I integrate with other tools?',
    'faq.a5': 'Yes, Leadly integrates with Facebook Lead Ads, Zapier, Google Forms, and many other platforms via webhooks.',
    
    // Footer
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.terms': 'Terms',
    'footer.privacy': 'Privacy',
    'footer.copyright': '© 2025 Leadly. All rights reserved.',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.features': 'Fonctionnalités',
    'nav.pricing': 'Tarifs',
    'nav.faq': 'FAQ',
    'nav.login': 'Connexion',
    'nav.getStarted': 'Commencer Gratuitement',
    
    // Hero Section
    'hero.title': 'Transformez Plus de Prospects en Clients. Instantanément.',
    'hero.subtitle': 'Alertes de prospects instantanées, modèles de messages et suivi intelligent – tout en une seule application.',
    'hero.cta1': 'Commencer Gratuitement',
    'hero.cta2': 'Voir les Tarifs',
    
    // Features Section
    'features.title': 'Tout ce Dont Vous Avez Besoin pour Convertir Plus de Prospects',
    'features.subtitle': 'Leadly fournit tous les outils dont votre équipe a besoin pour capturer, engager et convertir plus de prospects.',
    'features.leadCapture.title': 'Capture de Prospects',
    'features.leadCapture.description': 'Capturez des prospects à partir de multiples sources, notamment Facebook, Instagram, sites web, et plus encore.',
    'features.instantAlerts.title': 'Alertes Instantanées',
    'features.instantAlerts.description': 'Soyez notifié immédiatement lorsque de nouveaux prospects arrivent pour ne jamais manquer une opportunité.',
    'features.teamManagement.title': 'Gestion d\'Équipe',
    'features.teamManagement.description': 'Distribuez automatiquement les prospects à vos membres d\'équipe selon les règles que vous définissez.',
    'features.templates.title': 'Modèles de Messages',
    'features.templates.description': 'Créez et utilisez des modèles pour répondre rapidement aux prospects avec des messages personnalisés.',
    
    // Pricing Section
    'pricing.title': 'Tarification Simple et Transparente',
    'pricing.subtitle': 'Choisissez le forfait qui convient le mieux à votre entreprise',
    'pricing.monthly': 'Mensuel',
    'pricing.yearly': 'Annuel',
    'pricing.free.title': 'Gratuit',
    'pricing.free.price': 'Gratuit à Vie',
    'pricing.free.description': 'Pour les petites équipes ou entrepreneurs individuels qui débutent',
    'pricing.free.cta': 'Commencer',
    'pricing.pro.title': 'Pro',
    'pricing.pro.price': '35€',
    'pricing.pro.period': '/mois par utilisateur',
    'pricing.pro.yearlyPrice': '25€',
    'pricing.pro.yearDiscount': 'Économisez 120€/an',
    'pricing.pro.description': 'Pour les équipes en croissance qui ont besoin de plus de puissance et de flexibilité',
    'pricing.pro.cta': 'Essai de 14 Jours',
    'pricing.ultimate.title': 'Ultimate',
    'pricing.ultimate.price': 'Sur Mesure',
    'pricing.ultimate.description': 'Pour les grandes équipes avec des besoins avancés et des exigences personnalisées',
    'pricing.ultimate.cta': 'Contacter les Ventes',
    'pricing.compare': 'Comparer toutes les fonctionnalités',
    
    // Feature comparison
    'compare.feature': 'Fonctionnalité',
    'compare.free': 'Gratuit',
    'compare.pro': 'Pro',
    'compare.ultimate': 'Ultimate',
    'compare.teamMembers': 'Membres d\'Équipe',
    'compare.teamMembers.free': 'Jusqu\'à 3',
    'compare.teamMembers.pro': 'Illimité',
    'compare.teamMembers.ultimate': '20+',
    'compare.leadSources': 'Sources de Prospects',
    'compare.leadSources.free': 'Illimité',
    'compare.leadSources.pro': 'Illimité',
    'compare.leadSources.ultimate': 'Illimité',
    'compare.leadAlerts': 'Alertes de Prospects',
    'compare.leadAlerts.free': 'App uniquement',
    'compare.leadAlerts.pro': 'App + Email',
    'compare.leadAlerts.ultimate': 'App + Email + WhatsApp',
    'compare.templates': 'Modèles',
    'compare.templates.free': 'Jusqu\'à 10',
    'compare.templates.pro': 'Illimité',
    'compare.templates.ultimate': 'Illimité',
    'compare.leadEngagement': 'Engagement des Prospects',
    'compare.leadEngagement.free': '10 plus récents',
    'compare.leadEngagement.pro': 'Illimité',
    'compare.leadEngagement.ultimate': 'Illimité',
    'compare.aiParsing': 'Analyse IA des Prospects',
    'compare.customBranding': 'Personnalisation de Marque',
    'compare.advancedTeam': 'Gestion d\'Équipe Avancée',
    
    // Testimonials Section
    'testimonials.title': 'Ce Que Disent Nos Clients',
    'testimonials.subtitle': 'Des entreprises de toutes tailles font confiance à Leadly pour gérer leurs prospects et développer leur clientèle.',
    
    // FAQ Section
    'faq.title': 'Questions Fréquentes',
    'faq.subtitle': 'Vous avez d\'autres questions? Contactez notre équipe d\'assistance',
    'faq.q1': 'Y a-t-il un plan gratuit?',
    'faq.a1': 'Oui, Leadly propose un plan Gratuit à Vie qui inclut toutes les fonctionnalités de base pour jusqu\'à 3 membres d\'équipe.',
    'faq.q2': 'Puis-je ajouter mon équipe?',
    'faq.a2': 'Absolument! Vous pouvez ajouter jusqu\'à 3 membres d\'équipe sur le plan Gratuit ou un nombre illimité de membres sur le plan Pro.',
    'faq.q3': 'Qu\'est-ce qui est inclus dans l\'essai?',
    'faq.a3': 'L\'essai de 14 jours inclut toutes les fonctionnalités du plan Pro sans carte de crédit requise. Vous pouvez mettre à niveau ou rétrograder à la fin de l\'essai.',
    'faq.q4': 'Comment fonctionne la distribution des prospects?',
    'faq.a4': 'Leadly peut distribuer automatiquement les prospects à vos membres d\'équipe selon les règles que vous définissez, comme le round-robin, les compétences ou la disponibilité.',
    'faq.q5': 'Puis-je intégrer avec d\'autres outils?',
    'faq.a5': 'Oui, Leadly s\'intègre avec Facebook Lead Ads, Zapier, Google Forms et de nombreuses autres plateformes via des webhooks.',
    
    // Footer
    'footer.about': 'À Propos',
    'footer.contact': 'Contact',
    'footer.terms': 'Conditions',
    'footer.privacy': 'Confidentialité',
    'footer.copyright': '© 2025 Leadly. Tous droits réservés.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
