export type Locale = 'en' | 'ar';
export type Theme = 'light' | 'dark';

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface ServiceItem {
  eyebrow: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  accent: string;
}

export interface DestinationItem {
  name: LocalizedText;
  description: LocalizedText;
  image: string;
  detail: LocalizedText;
}

export interface SiteCopy {
  nav: {
    services: LocalizedText;
    provisioning: LocalizedText;
    destinations: LocalizedText;
    about: LocalizedText;
    contact: LocalizedText;
    request: LocalizedText;
    menu: LocalizedText;
    close: LocalizedText;
    switchTheme: LocalizedText;
    home: LocalizedText;
    language: LocalizedText;
    slides: LocalizedText;
  };
  hero: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    body: LocalizedText;
    primary: LocalizedText;
    secondary: LocalizedText;
    scroll: LocalizedText;
  };
  sections: {
    servicesEyebrow: LocalizedText;
    servicesTitle: LocalizedText;
    servicesBody: LocalizedText;
    provisioningEyebrow: LocalizedText;
    provisioningTitle: LocalizedText;
    destinationsEyebrow: LocalizedText;
    destinationsTitle: LocalizedText;
    destinationsBody: LocalizedText;
    marinaEyebrow: LocalizedText;
    marinaTitle: LocalizedText;
    marinaBody: LocalizedText;
    marinaBulletDelivery: LocalizedText;
    marinaBulletSupport: LocalizedText;
    marinaBulletCrew: LocalizedText;
    marinaBulletSpecial: LocalizedText;
    marinaImageAlt: LocalizedText;
    hospitalityEyebrow: LocalizedText;
    hospitalityTitle: LocalizedText;
    hospitalityBody: LocalizedText;
    productsEyebrow: LocalizedText;
    productsTitle: LocalizedText;
    productsBody: LocalizedText;
    testimonialsEyebrow: LocalizedText;
    testimonialsTitle: LocalizedText;
    ctaTitle: LocalizedText;
    ctaBody: LocalizedText;
    request: LocalizedText;
    concierge: LocalizedText;
    viewCollection: LocalizedText;
    explore: LocalizedText;
  };
  featuresBand: {
    col1Title: LocalizedText;
    col1Body: LocalizedText;
    col2Title: LocalizedText;
    col2Body: LocalizedText;
    col3Title: LocalizedText;
    col3Body: LocalizedText;
  };
  form: {
    title: LocalizedText;
    subtitle: LocalizedText;
    galley: LocalizedText;
    interior: LocalizedText;
    meat: LocalizedText;
    fish: LocalizedText;
    dairy: LocalizedText;
    fruit: LocalizedText;
    bread: LocalizedText;
    beverages: LocalizedText;
    herbs: LocalizedText;
    bespoke: LocalizedText;
    general: LocalizedText;
    toiletries: LocalizedText;
    flowers: LocalizedText;
    janitorial: LocalizedText;
    crew: LocalizedText;
    name: LocalizedText;
    phone: LocalizedText;
    email: LocalizedText;
    yacht: LocalizedText;
    howCanWeHelp: LocalizedText;
    chef: LocalizedText;
    submit: LocalizedText;
    modalEyebrow: LocalizedText;
    receivedEyebrow: LocalizedText;
    receivedTitle: LocalizedText;
    receivedBody: LocalizedText;
    sending: LocalizedText;
    fieldRequired: LocalizedText;
    invalidEmail: LocalizedText;
    submissionUnavailable: LocalizedText;
    submissionFailed: LocalizedText;
    submissionErrorTitle: LocalizedText;
    tryAgain: LocalizedText;
  };
  slider: {
    goToSlide: LocalizedText;
  };
  footer: {
    descriptor: LocalizedText;
    navigation: LocalizedText;
    services: LocalizedText;
    contact: LocalizedText;
    location: LocalizedText;
    email: LocalizedText;
    emailLabel: LocalizedText;
    phone: LocalizedText;
    phoneLabel: LocalizedText;
    builtFor: LocalizedText;
    rights: LocalizedText;
  };
}

export const copy: SiteCopy = {
  nav: {
    services: { en: 'Services', ar: 'الخدمات' },
    provisioning: { en: 'Provisioning', ar: 'التموين' },
    destinations: { en: 'Destinations', ar: 'الوجهات' },
    about: { en: 'About MARSA', ar: 'عن مرسى' },
    contact: { en: 'Contact', ar: 'تواصل معنا' },
    request: { en: 'Request service', ar: 'اطلب خدمة' },
    menu: { en: 'Menu', ar: 'القائمة' },
    close: { en: 'Close', ar: 'إغلاق' },
    switchTheme: { en: 'Switch theme', ar: 'تغيير المظهر' },
    home: { en: 'MARSA home', ar: 'الرئيسية' },
    language: { en: 'Change language', ar: 'تغيير اللغة' },
    slides: { en: 'Hero slides', ar: 'شرائح الواجهة' },
  },
  hero: {
    eyebrow: { en: 'Saudi marine hospitality', ar: 'ضيافة بحرية سعودية' },
    title: { en: 'Saudi hospitality, delivered at sea.', ar: 'ضيافة سعودية بمعايير بحرية عالمية' },
    body: {
      en: 'Premium provisioning and marine services, carefully delivered to your yacht.',
      ar: 'نوفر لك كل ما يحتاجه يختك من تموين وخدمات بحرية، بدقة تليق برحلتك.',
    },
    primary: { en: 'Start your request', ar: 'ابدأ طلبك' },
    secondary: { en: 'Explore services', ar: 'اكتشف خدماتنا' },
    scroll: { en: 'Discover MARSA', ar: 'اكتشف مرسى' },
  },
  sections: {
    servicesEyebrow: { en: 'The MARSA standard', ar: 'معيار مرسى' },
    servicesTitle: { en: 'Everything your journey needs.', ar: 'كل ما تحتاجه رحلتك.' },
    servicesBody: {
      en: 'From the first list to the final delivery, every detail is sourced, prepared, and handled with calm precision.',
      ar: 'من أول قائمة إلى لحظة التسليم، نختار كل تفصيلة ونجهزها ونتعامل معها بدقة وهدوء.',
    },
    provisioningEyebrow: { en: 'How it works', ar: 'كيف نعمل' },
    provisioningTitle: { en: 'From request to deck, without the noise.', ar: 'من الطلب إلى سطح اليخت، بكل سلاسة.' },
    destinationsEyebrow: { en: 'Saudi Red Sea', ar: 'البحر الأحمر السعودي' },
    destinationsTitle: { en: 'Your coast. Your pace.', ar: 'ساحلك. إيقاعك.' },
    destinationsBody: {
      en: 'A considered network along the Red Sea, ready for wherever the day takes you.',
      ar: 'شبكة مدروسة على امتداد البحر الأحمر، جاهزة أينما أخذتك الرحلة.',
    },
    marinaEyebrow: { en: 'Marina support', ar: 'خدمات المرسى' },
    marinaTitle: { en: 'From berth to deck, every detail is handled.', ar: 'من المرسى إلى سطح اليخت، نهتم بكل التفاصيل.' },
    marinaBody: {
      en: 'A discreet local team for the moments that make a voyage feel effortless.',
      ar: 'فريق محلي متكامل للتفاصيل التي تجعل الرحلة أكثر سلاسة.',
    },
    marinaBulletDelivery: { en: 'Marina delivery', ar: 'التسليم في المرسى' },
    marinaBulletSupport: { en: 'Yacht support', ar: 'دعم اليخت' },
    marinaBulletCrew: { en: 'Crew assistance', ar: 'مساعدة الطاقم' },
    marinaBulletSpecial: { en: 'Special requests', ar: 'طلبات خاصة' },
    marinaImageAlt: {
      en: 'Marina at dusk',
      ar: 'مرسى اليخوت عند الغروب',
    },
    hospitalityEyebrow: { en: 'A Saudi welcome', ar: 'ترحيب سعودي' },
    hospitalityTitle: { en: 'Where every detail becomes part of the journey.', ar: 'حيث التفاصيل تصنع التجربة.' },
    hospitalityBody: {
      en: 'A new expression of Saudi hospitality shaped by the coast, the sea, and the way we welcome people to both.',
      ar: 'تجربة جديدة للضيافة السعودية، مستوحاة من الساحل والبحر وطريقتنا في الترحيب بضيوفهما.',
    },
    productsEyebrow: { en: 'Curated onboard', ar: 'مختارات على متن اليخت' },
    productsTitle: { en: 'The good things, already considered.', ar: 'كل الأشياء الجميلة، مختارة بعناية.' },
    productsBody: {
      en: 'A glimpse of the ingredients and essentials we bring to your voyage.',
      ar: 'لمحة من المكونات والمستلزمات التي نوفرها لرحلتك.',
    },
    testimonialsEyebrow: { en: 'Trusted at sea', ar: 'ثقة في البحر' },
    testimonialsTitle: { en: 'Good service is felt in the details.', ar: 'الخدمة الجيدة تُشعر بها في التفاصيل.' },
    ctaTitle: { en: 'Ready for your next voyage?', ar: 'جاهز لرحلتك القادمة؟' },
    ctaBody: {
      en: 'Tell us what would make your time on the Red Sea feel effortless.',
      ar: 'أخبرنا بما يجعل وقتك في البحر الأحمر أكثر سلاسة.',
    },
    request: { en: 'Request provisioning', ar: 'اطلب التموين' },
    concierge: { en: 'Talk to concierge', ar: 'تواصل مع خدمة الكونسيرج' },
    viewCollection: { en: 'View collection', ar: 'استعرض المجموعة' },
    explore: { en: 'Explore destination', ar: 'اكتشف الوجهة' },
  },
  featuresBand: {
    col1Title: { en: '1 HR RESPONSE TIME', ar: 'استجابة خلال ساعة' },
    col1Body: { en: 'Quick response. We are the most trusted provisioning company in the Red Sea.', ar: 'استجابة سريعة. نحن شركة التموين الأكثر ثقة في البحر الأحمر.' },
    col2Title: { en: '48 HOURS DELIVERIES', ar: 'توصيل خلال ٤٨ ساعة' },
    col2Body: { en: 'Get the provisions you need, when you need them. Offshore or anchored, we\'ve got you covered.', ar: 'احصل على التموين الذي تحتاجه متى شئت. في عرض البحر أو في المرسى، نحن نغطيك.' },
    col3Title: { en: 'FRESH & HIGH QUALITY PRODUCTS', ar: 'منتجات طازجة وعالية الجودة' },
    col3Body: { en: 'We pride ourselves on offering not only the best food and beverages available locally, but importing specialty items.', ar: 'نفتخر بتقديم أفضل الأطعمة والمشروبات المتاحة محليًا، واستيراد العناصر المتخصصة.' },
  },
  form: {
    title: { en: 'What you need?', ar: 'ماذا تحتاج؟' },
    subtitle: { en: 'Please complete this short form with your full details. On receipt we will forward our latest Provisions Directory.', ar: 'يرجى إكمال هذا النموذج القصير بتفاصيلك الكاملة. عند الاستلام، سنرسل أحدث دليل للتموين لدينا.' },
    galley: { en: 'Galley >>', ar: 'المطبخ >>' },
    interior: { en: 'Interior >>', ar: 'الداخلي >>' },
    meat: { en: 'Meat & Poultry', ar: 'اللحوم والدواجن' },
    fish: { en: 'Fish & SeaFood', ar: 'الأسماك والمأكولات البحرية' },
    dairy: { en: 'Dairy & Cheese', ar: 'الألبان والأجبان' },
    fruit: { en: 'Fruit & Vegetables', ar: 'الفواكه والخضروات' },
    bread: { en: 'Bread & Baking', ar: 'المخبوزات' },
    beverages: { en: 'Beverages & Bar Supplies', ar: 'المشروبات ومستلزمات البار' },
    herbs: { en: 'Herbs & Spice', ar: 'الأعشاب والبهارات' },
    bespoke: { en: 'A Bespoke Service', ar: 'خدمة مخصصة' },
    general: { en: 'General Groceries', ar: 'بقالة عامة' },
    toiletries: { en: 'Toiletries', ar: 'مستلزمات العناية الشخصية' },
    flowers: { en: 'Flowers & Interior Essentials', ar: 'الزهور والمستلزمات الداخلية' },
    janitorial: { en: 'Janitorial', ar: 'مستلزمات التنظيف' },
    crew: { en: 'Crew supplies', ar: 'مستلزمات الطاقم' },
    name: { en: 'Name*', ar: 'الاسم*' },
    phone: { en: 'Phone Number*', ar: 'رقم الهاتف*' },
    email: { en: 'Email*', ar: 'البريد الإلكتروني*' },
    yacht: { en: 'Yacht Name*', ar: 'اسم اليخت*' },
    howCanWeHelp: { en: 'How can we help?', ar: 'كيف نساعدك؟' },
    chef: { en: 'Chef', ar: 'الشيف' },
    submit: { en: 'Submit', ar: 'إرسال' },
    modalEyebrow: { en: 'How it works', ar: 'كيف نعمل' },
    receivedEyebrow: { en: 'Request received', ar: 'تم الاستلام' },
    receivedTitle: { en: "We'll be in touch shortly.", ar: 'سنعود إليك قريباً.' },
    receivedBody: {
      en: 'Our concierge team will follow up with the right details for your voyage.',
      ar: 'سيتواصل معك فريق الكونسيرج في أقرب وقت.',
    },
    sending: { en: 'Sending…', ar: 'جارٍ الإرسال…' },
    fieldRequired: { en: 'This field is required.', ar: 'هذا الحقل مطلوب.' },
    invalidEmail: { en: 'Please enter a valid email address.', ar: 'يرجى إدخال بريد إلكتروني صالح.' },
    submissionUnavailable: {
      en: 'Online submission is not configured yet. Please contact the concierge team directly.',
      ar: 'الإرسال الإلكتروني غير مُعدّ بعد. يرجى التواصل مع فريق الكونسيرج مباشرةً.',
    },
    submissionFailed: {
      en: 'Something went wrong while sending your request. Please try again.',
      ar: 'حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.',
    },
    submissionErrorTitle: { en: 'Request not sent', ar: 'لم يُرسل الطلب' },
    tryAgain: { en: 'Try again', ar: 'حاول مجدداً' },
  },
  slider: {
    goToSlide: { en: 'Go to slide', ar: 'الانتقال إلى الشريحة' },
  },
  footer: {
    descriptor: { en: 'Saudi Marine Hospitality & Provisioning', ar: 'الضيافة والتموين البحري السعودي' },
    navigation: { en: 'Navigate', ar: 'تصفح' },
    services: { en: 'Services', ar: 'الخدمات' },
    contact: { en: 'Contact', ar: 'تواصل' },
    location: { en: 'Jeddah, Saudi Arabia', ar: 'جدة، المملكة العربية السعودية' },
    email: { en: 'concierge@marsa.sa', ar: 'concierge@marsa.sa' },
    emailLabel: { en: 'Email the concierge team', ar: 'راسل فريق الكونسيرج' },
    phone: { en: '+966 12 000 0000', ar: '+966 12 000 0000' },
    phoneLabel: { en: 'Call the concierge team', ar: 'اتصل بفريق الكونسيرج' },
    builtFor: { en: 'Built for the Red Sea', ar: 'صُنع للبحر الأحمر' },
    rights: { en: '© 2026 MARSA. All rights reserved.', ar: '© ٢٠٢٦ مرسى. جميع الحقوق محفوظة.' },
  },
};

export const services: ServiceItem[] = [
  {
    eyebrow: '01',
    title: { en: 'Yacht provisioning', ar: 'تموين اليخوت' },
    description: { en: 'Everything your yacht needs, sourced and delivered with precision.', ar: 'كل ما يحتاجه يختك، يتم اختياره وتجهيزه وتسليمه بدقة.' },
    image: '/assets/marsa-provisioning.jpg',
    accent: 'teal',
  },
  {
    eyebrow: '02',
    title: { en: 'Marine concierge', ar: 'الكونسيرج البحري' },
    description: { en: 'Personalized support for every detail of your journey.', ar: 'خدمة شخصية تهتم بكل تفاصيل رحلتك.' },
    image: '/assets/marsa-concierge.jpg',
    accent: 'sand',
  },
  {
    eyebrow: '03',
    title: { en: 'Fresh food', ar: 'أطعمة طازجة' },
    description: { en: 'Fresh produce and premium ingredients selected for your voyage.', ar: 'مكونات طازجة ومنتجات مختارة بعناية لرحلتك.' },
    image: '/assets/marsa-produce.jpg',
    accent: 'coral',
  },
  {
    eyebrow: '04',
    title: { en: 'Yacht services', ar: 'خدمات اليخوت' },
    description: { en: 'Reliable support across the Saudi Red Sea.', ar: 'خدمات بحرية موثوقة في أنحاء البحر الأحمر السعودي.' },
    image: '/assets/marsa-seafood.jpg',
    accent: 'blue',
  },
];

export const destinations: DestinationItem[] = [
  {
    name: { en: 'Jeddah', ar: 'جدة' },
    description: { en: 'A city of movement, old souks, and open water.', ar: 'مدينة الحركة والأسواق القديمة والمياه المفتوحة.' },
    detail: { en: '21° 32′ N · 39° 10′ E', ar: '٢١° ٣٢′ شمالاً · ٣٩° ١٠′ شرقاً' },
    image: '/assets/marsa-jeddah.jpg',
  },
  {
    name: { en: 'Umluj', ar: 'أملج' },
    description: { en: 'White islands, clear water, and the quiet edge of the Red Sea.', ar: 'جزر بيضاء ومياه صافية وحافة هادئة للبحر الأحمر.' },
    detail: { en: '25° 02′ N · 37° 16′ E', ar: '٢٥° ٠٢′ شمالاً · ٣٧° ١٦′ شرقاً' },
    image: '/assets/marsa-umluj.jpg',
  },
  {
    name: { en: 'AMAALA', ar: 'أمالا' },
    description: { en: 'A new horizon for art, nature, and slow coastal living.', ar: 'أفق جديد للفن والطبيعة والحياة الساحلية الهادئة.' },
    detail: { en: '27° 42′ N · 35° 15′ E', ar: '٢٧° ٤٢′ شمالاً · ٣٥° ١٥′ شرقاً' },
    image: '/assets/marsa-amaala.jpg',
  },
];
