import { type Locale } from '@/lib/i18n'
import prisma from '@/lib/db'
import TestimonialsClient from './TestimonialsClient'

import en from '@/translations/en.json'
import fr from '@/translations/fr.json'
import ar from '@/translations/ar.json'

const translations = { en, fr, ar }

interface TestimonialsPageProps {
  params: Promise<{ locale: string }>
}

async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    return []
  }
}

export default async function TestimonialsPage({ params }: TestimonialsPageProps) {
  const { locale } = await params
  const t = translations[locale as Locale] || translations.en
  const testimonials = await getTestimonials()
  
  // Default testimonials if none from DB
  const defaultTestimonials = [
    {
      id: '1',
      clientName: 'Sarah Johnson',
      profession: 'Restaurant Owner',
      feedbackEn: 'Amazing work! They delivered exactly what we needed. Our online orders increased by 200% after launching the new website.',
      feedbackFr: 'Travail incroyable ! Ils ont livré exactement ce dont nous avions besoin. Nos commandes en ligne ont augmenté de 200% après le lancement du nouveau site.',
      feedbackAr: 'عمل مذهل! لقد قدموا بالضبط ما كنا نحتاجه. زادت طلباتنا عبر الإنترنت بنسبة 200٪ بعد إطلاق الموقع الجديد.',
      rating: 5,
      avatarUrl: null,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      clientName: 'Ahmed Mohamed',
      profession: 'Lawyer',
      feedbackEn: 'Very professional team. The website perfectly represents our firm\'s values and expertise. We\'ve seen a significant increase in client inquiries.',
      feedbackFr: 'Équipe très professionnelle. Le site représente parfaitement les valeurs et l\'expertise de notre cabinet. Nous avons constaté une augmentation significative des demandes clients.',
      feedbackAr: 'فريق محترف جداً. الموقع يمثل قيم وخبرة مكتبنا بشكل مثالي. لاحظنا زيادة كبيرة في استفسارات العملاء.',
      rating: 5,
      avatarUrl: null,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      clientName: 'Marie Dupont',
      profession: 'Boutique Owner',
      feedbackEn: 'Our e-commerce site is beautiful and easy to manage. Sales have doubled since launch! The team\'s attention to detail is remarkable.',
      feedbackFr: 'Notre site e-commerce est magnifique et facile à gérer. Les ventes ont doublé depuis le lancement ! L\'attention aux détails de l\'équipe est remarquable.',
      feedbackAr: 'موقع التجارة الإلكترونية الخاص بنا جميل وسهل الإدارة. تضاعفت المبيعات منذ الإطلاق! اهتمام الفريق بالتفاصيل ملحوظ.',
      rating: 5,
      avatarUrl: null,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      clientName: 'James Wilson',
      profession: 'Fitness Studio Owner',
      feedbackEn: 'The website has transformed our business. Online bookings are up 300% and we love how easy it is to update content ourselves.',
      feedbackFr: 'Le site a transformé notre entreprise. Les réservations en ligne ont augmenté de 300% et nous adorons la facilité de mise à jour du contenu.',
      feedbackAr: 'لقد حوّل الموقع أعمالنا. زادت الحجوزات عبر الإنترنت بنسبة 300٪ ونحب مدى سهولة تحديث المحتوى بأنفسنا.',
      rating: 5,
      avatarUrl: null,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '5',
      clientName: 'Dr. Fatima Hassan',
      profession: 'Medical Doctor',
      feedbackEn: 'The booking system they built has saved us countless hours. Patients love how easy it is to schedule appointments online.',
      feedbackFr: 'Le système de réservation qu\'ils ont créé nous a fait gagner d\'innombrables heures. Les patients adorent la facilité de prise de rendez-vous en ligne.',
      feedbackAr: 'نظام الحجز الذي بنوه وفر لنا ساعات لا حصر لها. المرضى يحبون سهولة جدولة المواعيد عبر الإنترنت.',
      rating: 5,
      avatarUrl: null,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '6',
      clientName: 'Omar Benali',
      profession: 'Tech Entrepreneur',
      feedbackEn: 'They understood our vision from day one. The landing page they created converts at an incredible rate. Highly recommended!',
      feedbackFr: 'Ils ont compris notre vision dès le premier jour. La landing page qu\'ils ont créée convertit à un taux incroyable. Hautement recommandé !',
      feedbackAr: 'فهموا رؤيتنا من اليوم الأول. صفحة الهبوط التي أنشأوها تحقق معدل تحويل مذهل. موصى به بشدة!',
      rating: 5,
      avatarUrl: null,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
  
  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials
  
  return (
    <TestimonialsClient 
      locale={locale as Locale} 
      translations={t} 
      testimonials={displayTestimonials}
    />
  )
}
