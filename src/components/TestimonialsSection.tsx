import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Testimonial } from '../types';
import { TranslationSet } from '../translations';
import { Star, Quote, MapPin, CheckCircle } from 'lucide-react';

interface TestimonialsSectionProps {
  lang: 'en' | 'te';
  t: TranslationSet;
}

export default function TestimonialsSection({ lang, t }: TestimonialsSectionProps) {
  const [dbTestimonials, setDbTestimonials] = useState<Testimonial[]>([]);

  // Default hardcoded trusted patient reviews from flyers
  const defaultTestimonials: {
    authorName: string;
    rating: number;
    content: Record<'en' | 'te', string>;
    location: Record<'en' | 'te', string>;
  }[] = [
    {
      authorName: "Anusuri Srinivasa Rao",
      rating: 5,
      content: {
        en: "I had cataract surgery performed at Sai Shankar Netralayam. The treatment was completely stitchless, painless, and highly affordable compared to city hospitals. Dr. Nageswar is extremely knowledgeable.",
        te: "నేను సాయి శంకర్ నేత్రాలయంలో కంటి శుక్లాల ఆపరేషన్ చేయించుకున్నాను. కుట్టు లేకుండా, నొప్పి లేకుండా చాలా సులువగా జరిగింది. ట్రీట్మెంట్ ఖర్చులు నగరాల్లోని ఆసుపత్రుల కంటే చాలా తక్కువగా ఉన్నాయి."
      },
      location: {
        en: "Yeleswaram",
        te: "ఏలేశ్వరం"
      }
    },
    {
      authorName: "K. Lakshmi Devi",
      rating: 5,
      content: {
        en: "Excellent clinical eye testing facility! The diagnostic machines are automated and very modern. The doctor examined my grandfather very patiently and prescribed perfect reading glasses.",
        te: "కంటి పరీక్షల కొరకు ఇక్కడ అత్యాధునిక ఆటోమేటిక్ మిషన్లు ఉన్నాయి. మా తాతయ్యకు కంటి సమస్య ఉంటే డాక్టర్ గారు చాలా ఓపికగా పరీక్షించి, సరైన కళ్లద్దాలు ఇచ్చారు. ఇప్పుడు ఆయనకు అంతా స్పష్టంగా కనిపిస్తోంది."
      },
      location: {
        en: "Lingamparthi",
        te: "లింగంపర్తి"
      }
    },
    {
      authorName: "Ch. Satyanarayana",
      rating: 5,
      content: {
        en: "Highly hygienic clinic and very disciplined staff. Best ophthalmology hospital in the Yeleswaram area for daily eye checkups, allergies, and retina advice.",
        te: "ఆసుపత్రి లోపలి వాతావరణం చాలా శుభ్రంగా ఉంటుంది. సిబ్బంది కూడా చాలా మర్యాదగా ప్రవర్తిస్తారు. కంటి అలర్జీలు, దురదలు లేదా సాధారణ కంటి చెకప్స్ కొరకు ఏలేశ్వరం ప్రాంతంలో ఇది అత్యుత్తమ వైద్యశాల."
      },
      location: {
        en: "Yeleswaram",
        te: "ఏలేశ్వరం"
      }
    }
  ];

  useEffect(() => {
    // Read and merge any real-time approved testimonials submitted via the portal
    const testimonialsPath = 'testimonials';
    const q = query(collection(db, testimonialsPath), where('isApproved', '==', true));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: Testimonial[] = [];
        snapshot.forEach((doc) => {
          list.push(doc.data() as Testimonial);
        });
        setDbTestimonials(list);
      },
      (error) => {
        // Safe bypass since rules are highly secure, but log cleanly
        handleFirestoreError(error, OperationType.LIST, testimonialsPath);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3.5 py-1.5 rounded-full mb-4 inline-block font-sans">
            {lang === 'en' ? 'PATIENT STORIES' : 'రోగుల అనుభవాలు'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-2 mb-4">
            {t.testimonialsTitle}
          </h2>
          <div className="w-16 h-1 bg-teal-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-slate-600 font-sans">
            {t.testimonialsSub}
          </p>
        </div>

        {/* Testimonials Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Approved Live DB Testimonials */}
          {dbTestimonials.map((review) => (
            <div
              key={review.id}
              className="bg-slate-50 border border-slate-100 rounded-3xl p-8 relative flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-teal-600/10 rotate-180 shrink-0" />
              
              <div>
                {/* Stars */}
                <div className="flex items-center space-x-1 mb-5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0" />
                  ))}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic relative z-10">
                  "{review.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="border-t border-slate-100/80 pt-5 mt-auto flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 flex items-center">
                    <span>{review.authorName}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-teal-500 ml-1.5" />
                  </h4>
                  <p className="text-xs text-slate-400 flex items-center mt-0.5">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{review.location || 'Yeleswaram'}</span>
                  </p>
                </div>
                <span className="text-[10px] bg-teal-100 text-teal-700 font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider font-sans">
                  {lang === 'en' ? 'Verified' : 'ధృవీకరించబడింది'}
                </span>
              </div>
            </div>
          ))}

          {/* Fallback Hardcoded Testimonials */}
          {defaultTestimonials.map((review, i) => (
            <div
              key={`default-${i}`}
              className="bg-slate-50 border border-slate-100 rounded-3xl p-8 relative flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-teal-600/10 rotate-180 shrink-0" />
              
              <div>
                {/* Stars */}
                <div className="flex items-center space-x-1 mb-5">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0" />
                  ))}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic relative z-10">
                  "{review.content[lang]}"
                </p>
              </div>

              {/* Author Info */}
              <div className="border-t border-slate-100/80 pt-5 mt-auto flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 flex items-center">
                    <span>{review.authorName}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-teal-500 ml-1.5" />
                  </h4>
                  <p className="text-xs text-slate-400 flex items-center mt-0.5">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{review.location[lang]}</span>
                  </p>
                </div>
                <span className="text-[10px] bg-teal-100 text-teal-700 font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider font-sans">
                  {lang === 'en' ? 'Verified' : 'ధృవీకరించబడింది'}
                </span>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
