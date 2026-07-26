/*
  Site configuration — edit this file to re-skin and re-brand this template
  for a new buyer/client. No other file needs to change.

  theme    -> maps to CSS custom properties in style.css :root (colors + fonts)
  business -> the site owner's name, bio, contact info, and photos
*/
window.SITE_CONFIG = {
  theme: {
    colorPrimary: '#123B36',
    colorSecondary: '#1E5048',
    colorAccent: '#D7A45C',
    colorBg: '#FAF8F4',
    colorCard: '#FFFFFF',
    colorBorder: '#ECE8E2',
    colorText: '#16332F',
    colorTextSecondary: '#6C6C6C',
    colorSuccess: '#3FA36A',

    fontHeading: "'Amiri', 'Playfair Display', Georgia, serif",
    fontBody: "'Cairo', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontScript: "'Aref Ruqaa', cursive",
  },

  business: {
    name: 'د. أحمد محمد',
    firstName: 'د. أحمد',
    lastName: 'محمد',
    role: 'اختصاصي طب الأسرة',
    signature: 'أحمد محمد، دكتوراه في الطب',

    heroSubtitle: 'مكرّس لصحة عائلتك وسعادتها',
    heroDesc: 'رعاية إنسانية. تشخيص دقيق. غدٍ أكثر صحة لك ولعائلتك.',
    aboutDesc: 'أنا طبيب طب أسرة معتمد، ولديّ أكثر من 12 عاماً من الخبرة في تقديم رعاية صحية شاملة لجميع الفئات العمرية.',
    quote: 'صحتكم أولويتي. معاً، يمكننا تحقيق حياة أكثر صحة وسعادة.',
    contactDesc: 'أنا هنا لمساعدتك أنت وعائلتك على حياة أكثر صحة.',

    email: 'ahmed.mohamed@example.com',
    phone: '+1 (555) 123-4567',
    address: 'شارع فوزي معاذ الاسكندرية',

    facebook: '',
    linkedin: '',
    instagram: '',
    twitter: '',

    heroImage: 'assets/placeholder.png',
    aboutImage: 'assets/placeholder.png',
    contactImage: 'assets/placeholder.png',
    cvFile: '',

    year: new Date().getFullYear(),
  },
};
