import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')
  
  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin@123!', 12)
  
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@wexodz.com' },
    update: {},
    create: {
      email: 'admin@wexodz.com',
      password: hashedPassword,
      name: 'Admin',
    },
  })
  
  console.log('✅ Admin created:', admin.email)
  
  // Create services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { id: 'service-1' },
      update: {},
      create: {
        id: 'service-1',
        icon: 'globe',
        titleEn: 'Custom Website Design',
        titleFr: 'Design Web Personnalisé',
        titleAr: 'تصميم مواقع مخصص',
        descEn: 'Unique, beautiful websites tailored to your brand and business goals.',
        descFr: 'Des sites web uniques et beaux adaptés à votre marque et vos objectifs.',
        descAr: 'مواقع فريدة وجميلة مصممة خصيصاً لعلامتك التجارية وأهدافك.',
        order: 1,
      },
    }),
    prisma.service.upsert({
      where: { id: 'service-2' },
      update: {},
      create: {
        id: 'service-2',
        icon: 'zap',
        titleEn: 'Fast & Optimized',
        titleFr: 'Rapide & Optimisé',
        titleAr: 'سريع ومحسّن',
        descEn: 'Lightning-fast websites that load quickly and rank higher on search engines.',
        descFr: 'Des sites ultra-rapides qui se chargent vite et se classent mieux sur les moteurs de recherche.',
        descAr: 'مواقع سريعة للغاية تُحمّل بسرعة وتحتل مراتب أعلى في محركات البحث.',
        order: 2,
      },
    }),
    prisma.service.upsert({
      where: { id: 'service-3' },
      update: {},
      create: {
        id: 'service-3',
        icon: 'smartphone',
        titleEn: 'Mobile Responsive',
        titleFr: 'Responsive Mobile',
        titleAr: 'متوافق مع الجوال',
        descEn: 'Perfect experience on all devices - phones, tablets, and desktops.',
        descFr: 'Une expérience parfaite sur tous les appareils - téléphones, tablettes et ordinateurs.',
        descAr: 'تجربة مثالية على جميع الأجهزة - الهواتف والأجهزة اللوحية والحواسيب.',
        order: 3,
      },
    }),
  ])
  
  console.log(`✅ ${services.length} services created`)
  
  // Create website types
  const websiteTypes = await Promise.all([
    prisma.websiteType.upsert({
      where: { slug: 'one-page' },
      update: {},
      create: {
        slug: 'one-page',
        titleEn: 'One Page Website',
        titleFr: 'Site One Page',
        titleAr: 'موقع صفحة واحدة',
        descEn: 'Perfect for personal brands and small businesses.',
        descFr: 'Parfait pour les marques personnelles et petites entreprises.',
        descAr: 'مثالي للعلامات الشخصية والأعمال الصغيرة.',
        featuresEn: ['Single page design', 'Mobile responsive', 'Contact form', 'SEO optimized'],
        featuresFr: ['Design page unique', 'Responsive mobile', 'Formulaire de contact', 'Optimisé SEO'],
        featuresAr: ['تصميم صفحة واحدة', 'متوافق مع الجوال', 'نموذج اتصال', 'محسّن SEO'],
        priceUSD: 299,
        priceEUR: 279,
        priceDZD: 45000,
        icon: 'file',
        order: 1,
      },
    }),
    prisma.websiteType.upsert({
      where: { slug: 'business' },
      update: {},
      create: {
        slug: 'business',
        titleEn: 'Business Website',
        titleFr: 'Site Entreprise',
        titleAr: 'موقع أعمال',
        descEn: 'Complete solution for growing businesses.',
        descFr: 'Solution complète pour les entreprises en croissance.',
        descAr: 'حل متكامل للأعمال النامية.',
        featuresEn: ['5-10 pages', 'Blog section', 'Google Analytics', '3 months support'],
        featuresFr: ['5-10 pages', 'Section blog', 'Google Analytics', '3 mois de support'],
        featuresAr: ['5-10 صفحات', 'قسم مدونة', 'تحليلات جوجل', '3 أشهر دعم'],
        priceUSD: 599,
        priceEUR: 549,
        priceDZD: 90000,
        icon: 'building',
        isPopular: true,
        order: 2,
      },
    }),
    prisma.websiteType.upsert({
      where: { slug: 'ecommerce' },
      update: {},
      create: {
        slug: 'ecommerce',
        titleEn: 'E-commerce Website',
        titleFr: 'Site E-commerce',
        titleAr: 'موقع تجارة إلكترونية',
        descEn: 'Full online store with payment integration.',
        descFr: 'Boutique en ligne complète avec paiement intégré.',
        descAr: 'متجر إلكتروني كامل مع تكامل الدفع.',
        featuresEn: ['Unlimited products', 'Shopping cart', 'Payment gateway', '12 months support'],
        featuresFr: ['Produits illimités', 'Panier', 'Passerelle de paiement', '12 mois de support'],
        featuresAr: ['منتجات غير محدودة', 'سلة تسوق', 'بوابة دفع', '12 شهر دعم'],
        priceUSD: 1299,
        priceEUR: 1199,
        priceDZD: 200000,
        icon: 'shopping-cart',
        order: 3,
      },
    }),
  ])
  
  // Create projects (Real Data)
  const projects = await Promise.all([
    prisma.portfolioProject.upsert({
      where: { slug: 'avant-garde-fashion' },
      update: {},
      create: {
        id: 'project-1',
        slug: 'avant-garde-fashion',
        titleEn: 'Avant-Garde Fashion',
        titleFr: 'Mode Avant-Garde',
        titleAr: 'أزياء الطليعة',
        descEn: 'A high-end e-commerce experience for a luxury fashion brand featuring smooth interactions and 3D product previews.',
        descFr: 'Une expérience e-commerce haut de gamme pour une marque de luxe avec des interactions fluides et des aperçus 3D.',
        descAr: 'تجربة تجارة إلكترونية راقية لعلامة تجارية فاخرة تتميز بتفاعلات سلسة ومعاينة منتجات ثلاثية الأبعاد.',
        contentEn: 'We designed a completely custom e-commerce experience that reflects the bold identity of Avant-Garde. The focus was on immersion, using large visuals, micro-animations, and a seamless checkout process.',
        contentFr: 'Nous avons conçu une expérience e-commerce entièrement personnalisée qui reflète l\'identité audacieuse d\'Avant-Garde. L\'accent a été mis sur l\'immersion, utilisant de grands visuels, des micro-animations et un processus de paiement fluide.',
        contentAr: 'لقد صممنا تجربة تجارة إلكترونية مخصصة تمامًا تعكس الهوية الجريئة لـ Avant-Garde. كان التركيز على الانغماس، باستخدام صور كبيرة، ورسوم متحركة دقيقة، وعملية دفع سلسة.',
        client: 'Avant-Garde Paris',
        industry: 'Fashion',
        websiteType: 'E-commerce',
        technologies: ['Next.js', 'Shopify Storefront API', 'WebGL', 'Tailwind CSS'],
        featuresEn: ['3D Product Viewer', 'Custom Checkout', 'Animation System', 'CMS Integration'],
        featuresFr: ['Visualiseur Produit 3D', 'Paiement Personnalisé', 'Système d\'Animation', 'Intégration CMS'],
        featuresAr: ['عارض منتجات ثلاثي الأبعاد', 'دفع مخصص', 'نظام رسوم متحركة', 'تكامل نظام إدارة المحتوى'],
        challengeEn: 'The client needed to stand out in a saturated market with a website that felt more like an art gallery than a store, without sacrificing conversion rates.',
        challengeFr: 'Le client devait se démarquer dans un marché saturé avec un site web ressemblant plus à une galerie d\'art qu\'à une boutique, sans sacrifier les taux de conversion.',
        challengeAr: 'احتاج العميل إلى التميز في سوق مشبع بموقع يبدو وكأنه معرض فني أكثر من كونه متجرًا، دون التضحية بمعدلات التحويل.',
        solutionEn: 'We implemented a headless architecture using Shopify for backend and Next.js for frontend, allowing us to build a unique UI with WebGL effects for product displays.',
        solutionFr: 'Nous avons mis en œuvre une architecture headless utilisant Shopify pour le backend et Next.js pour le frontend, nous permettant de créer une interface utilisateur unique avec des effets WebGL.',
        solutionAr: 'لقد نفذنا بنية headless باستخدام Shopify للنظام الخلفي و Next.js للواجهة الأمامية، مما سمح لنا ببناء واجهة مستخدم فريدة مع تأثيرات WebGL.',
        resultsEn: 'Conversion rate increased by 45% compared to their previous platform, and average session duration doubled.',
        resultsFr: 'Le taux de conversion a augmenté de 45% par rapport à leur plateforme précédente, et la durée moyenne des sessions a doublé.',
        resultsAr: 'زاد معدل التحويل بنسبة 45٪ مقارنة بمنصتهم السابقة، وتضاعف متوسط مدة الجلسة.',
        deliveryTime: '8 Weeks',
        category: 'E-commerce',
        imageUrl: '/images/portfolio/ecommerce.png',
        galleryImages: ['/images/portfolio/ecommerce-1.png', '/images/portfolio/ecommerce-2.png'],
        liveUrl: 'https://example.com',
        isFeatured: true,
        order: 1,
      },
    }),
    prisma.portfolioProject.upsert({
      where: { slug: 'aurum-estates' },
      update: {},
      create: {
        id: 'project-2',
        slug: 'aurum-estates',
        titleEn: 'Aurum Estates',
        titleFr: 'Domaines Aurum',
        titleAr: 'عقارات أوروم',
        descEn: 'Luxury real estate platform with virtual tours and advanced property filtering.',
        descFr: 'Plateforme immobilière de luxe avec visites virtuelles et filtrage avancé.',
        descAr: 'منصة عقارية فاخرة مع جولات افتراضية وتصفية متقدمة للممتلكات.',
        contentEn: 'Aurum Estates required a platform that matched the elegance of their properties. We built a high-performance listing site with map integration and VR tour capabilities.',
        contentFr: 'Aurum Estates avait besoin d\'une plateforme correspondant à l\'élégance de leurs propriétés. Nous avons construit un site performant avec intégration de cartes et visites VR.',
        contentAr: 'احتاجت Aurum Estates إلى منصة تتناسب مع أناقة عقاراتهم. قمنا ببناء موقع قوائم عالي الأداء مع تكامل الخرائط وقدرات جولة الواقع الافتراضي.',
        client: 'Aurum International',
        industry: 'Real Estate',
        websiteType: 'Corporate Portal',
        technologies: ['Next.js', 'PostgreSQL', 'Google Maps API', 'Prisma'],
        featuresEn: ['Advanced Search', 'Map View', 'Virtual Tours', 'Agent Portal'],
        featuresFr: ['Recherche Avancée', 'Vue Carte', 'Visites Virtuelles', 'Portail Agent'],
        featuresAr: ['بحث متقدم', 'عرض الخريطة', 'جولات افتراضية', 'بوابة الوكيل'],
        challengeEn: 'Handling thousands of high-resolution images and delivering complex search queries efficiently was the main bottleneck.',
        challengeFr: 'Gérer des milliers d\'images haute résolution et livrer des requêtes de recherche complexes efficacement était le principal goulot d\'étranglement.',
        challengeAr: 'كان التعامل مع آلاف الصور عالية الدقة وتقديم استعلامات بحث معقدة بكفاءة هو العقبة الرئيسية.',
        solutionEn: 'We optimized image delivery with Next.js Image component and implemented a faceted search utilizing efficient database indexing.',
        solutionFr: 'Nous avons optimisé la livraison d\'images avec Next.js et implémenté une recherche à facettes utilisant une indexation de base de données efficace.',
        solutionAr: 'قمنا بتحسين تسليم الصور باستخدام مكون Next.js Image ونفذنا بحثًا متعدد الأوجه باستخدام فهرسة قاعدة بيانات فعالة.',
        resultsEn: 'Page load speeds under 1 second and a 30% increase in lead generation for agents.',
        resultsFr: 'Vitesses de chargement de page inférieures à 1 seconde et augmentation de 30% de la génération de leads pour les agents.',
        resultsAr: 'سرعات تحميل الصفحة أقل من ثانية واحدة وزيادة بنسبة 30٪ في توليد العملاء المحتملين للوكلاء.',
        deliveryTime: '10 Weeks',
        category: 'Real Estate',
        imageUrl: '/images/portfolio/realestate.png',
        galleryImages: ['/images/portfolio/realestate-1.png'],
        liveUrl: 'https://example.com',
        isFeatured: true,
        order: 2,
      },
    }),
     prisma.portfolioProject.upsert({
      where: { slug: 'nexus-analytics' },
      update: {},
      create: {
        id: 'project-3',
        slug: 'nexus-analytics',
        titleEn: 'Nexus Analytics',
        titleFr: 'Analytique Nexus',
        titleAr: 'تحليلات نيكساس',
        descEn: 'Comprehensive SaaS dashboard for data visualization and business intelligence.',
        descFr: 'Tableau de bord SaaS complet pour la visualisation des données et l\'informatique décisionnelle.',
        descAr: 'لوحة تحكم SaaS شاملة لتصور البيانات وذكاء الأعمال.',
        contentEn: 'A powerful tool for data scientists to visualize complex datasets. The UI focused on clarity, dark mode support, and real-time data updates.',
        contentFr: 'Un outil puissant pour les data scientists. L\'interface utilisateur s\'est concentrée sur la clarté, le mode sombre et les mises à jour en temps réel.',
        contentAr: 'أداة قوية لعلماء البيانات. ركزت واجهة المستخدم على الوضوح، ودعم الوضع المظلم، وتحديثات البيانات في الوقت الفعلي.',
        client: 'Nexus Tech',
        industry: 'Technology',
        websiteType: 'SaaS Dashboard',
        technologies: ['React', 'D3.js', 'Node.js', 'Socket.io'],
        featuresEn: ['Real-time Charts', 'Data Export', 'Team Collaboration', 'Dark Mode'],
        featuresFr: ['Graphiques Temps Réel', 'Export Données', 'Collaboration Équipe', 'Mode Sombre'],
        featuresAr: ['رسوم بيانية في الوقت الفعلي', 'تصدير البيانات', 'تعاون الفريق', 'وضع مظلم'],
        challengeEn: 'Rendering massive datasets in the browser without UI lag.',
        challengeFr: 'Rendu de jeux de données massifs dans le navigateur sans décalage de l\'interface utilisateur.',
        challengeAr: 'عرض مجموعات بيانات ضخمة في المتصفح دون تأخير في واجهة المستخدم.',
        solutionEn: 'Utilized Web Workers for data processing and optimized D3.js rendering pipelines.',
        solutionFr: 'Utilisé Web Workers pour le traitement des données et optimisé les pipelines de rendu D3.js.',
        solutionAr: 'استخدمنا Web Workers لمعالجة البيانات وتحسين خطوط أنابيب عرض D3.js.',
        resultsEn: 'Capable of plotting 100k+ points smoothly, trusted by 50+ enterprise clients.',
        resultsFr: 'Capable de tracer plus de 100 000 points en douceur, approuvé par plus de 50 clients d\'entreprise.',
        resultsAr: 'قادرة على رسم أكثر من 100 ألف نقطة بسلاسة، وموثوقة من قبل أكثر من 50 عميلًا مؤسسيًا.',
        deliveryTime: '12 Weeks',
        category: 'SaaS',
        imageUrl: '/images/portfolio/saas.png',
        galleryImages: [],
        liveUrl: 'https://example.com',
        isFeatured: true,
        order: 3,
      },
    }),
  ])
  
  console.log(`✅ ${projects.length} projects created`)

  // Create testimonials
  const testimonials = await Promise.all([
    prisma.testimonial.upsert({
      where: { id: 'testimonial-1' },
      update: {},
      create: {
        id: 'testimonial-1',
        clientName: 'Sarah Johnson',
        profession: 'CEO, FashionBrand',
        feedbackEn: 'The redesign transformed our business. Sales increased by 200% in the first month. Incredible attention to detail.',
        feedbackFr: 'La refonte a transformé notre entreprise. Les ventes ont augmenté de 200%.',
        feedbackAr: 'أعاد التصميم تشكيل عملنا. زادت المبيعات بنسبة 200٪.',
        rating: 5,
        avatarUrl: '/images/testimonials/avatar1.png'
      },
    }),
    prisma.testimonial.upsert({
      where: { id: 'testimonial-2' },
      update: {},
      create: {
        id: 'testimonial-2',
        clientName: 'David Chen',
        profession: 'Director, TechStart',
        feedbackEn: 'Professional, efficient, and creative. They understood our vision perfectly and delivered ahead of schedule.',
        feedbackFr: 'Professionnel, efficace et créatif. Ils ont parfaitement compris notre vision.',
        feedbackAr: 'محترف وفعال ومبدع. لقد فهموا رؤيتنا تمامًا.',
        rating: 5,
        avatarUrl: '/images/testimonials/avatar2.png'
      },
    }),
  ])
  
  console.log(`✅ ${testimonials.length} testimonials created`)
  
  console.log('🎉 Seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
