/*
  Site configuration — edit this file to re-skin and re-brand this template
  for a new buyer/client. No other file needs to change.

  theme    -> maps to CSS custom properties in css/variables.css (colors + fonts)
  business -> the site owner's name, bio, contact info, and photos
*/
window.SITE_CONFIG = {
  theme: {
    bgPrimary: '#0F172A',
    bgSecondary: '#1E293B',
    bgSurface: '#273449',
    bgSurfaceHover: '#2E3C54',

    textPrimary: '#FFFFFF',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8',

    colorBlue: '#2563EB',
    colorBlueLight: '#3B82F6',
    colorBlueDark: '#1D4ED8',
    colorGold: '#F4B942',
    colorGoldDark: '#D89A1F',
    colorEmerald: '#10B981',
    colorEmeraldDark: '#0B815A',

    fontPrimary: '"Cairo", "Alexandria", "IBM Plex Sans Arabic", sans-serif',
    fontDisplay: '"Alexandria", "Cairo", sans-serif',
  },

  business: {
    name: 'أحمد محمد',
    role: 'محاسب مالي ومستشار مالي معتمد',
    eyebrow: 'محاسب مالي معتمد',
    heroDesc: 'أساعد الشركات ورواد الأعمال على تنظيم الحسابات، إعداد التقارير المالية، وتحسين الأداء المالي وفق أعلى المعايير المحاسبية.',
    footerBio: 'محاسب مالي ومستشار معتمد، أقدم خدمات محاسبية ومالية دقيقة وموثوقة للشركات ورواد الأعمال.',

    email: 'mohamed.emad45621@gmail.com',
    phone: '+966 5X XXX XXXX',
    address: 'شارع فوزي معاذ الاسكندرية',
    whatsapp: '',
    linkedin: '',

    heroImage: 'assets/placeholder.png',
    aboutImage: 'assets/placeholder.png',
    cvFile: 'assets/placeholder.png',

    year: new Date().getFullYear(),
  },
};
