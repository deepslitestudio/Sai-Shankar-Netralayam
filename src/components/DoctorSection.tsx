import { UserCheck, Star, Award, ShieldCheck } from 'lucide-react';
import { TranslationSet } from '../translations';
// Exact path of the generated doctor portrait
import doctorImage from '../assets/images/attached_doctor_portrait_1782894513184.jpg';

interface DoctorSectionProps {
  lang: 'en' | 'te';
  t: TranslationSet;
}

export default function DoctorSection({ lang, t }: DoctorSectionProps) {
  return (
    <section id="doctor" className="py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Doctor Professional Image & Badges */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group">
              {/* Outer Glow Decorative Accent */}
              <div className="absolute -inset-1.5 bg-teal-600/20 rounded-3xl blur-md group-hover:bg-teal-600/30 transition-all duration-300"></div>
              
              {/* Professional Doctor Photo Card */}
              <div className="relative bg-white p-3 rounded-3xl border border-slate-100 shadow-xl overflow-hidden max-w-sm sm:max-w-md">
                <img
                  src={doctorImage}
                  alt={t.doctorTitle}
                  className="rounded-2xl w-full h-auto object-cover aspect-[3/4] hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Experience tag */}
                <div className="absolute bottom-6 right-6 bg-teal-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                  <span>{lang === 'en' ? '10+ Years Exp.' : '10+ సం. అనుభవం'}</span>
                </div>
              </div>
            </div>

            {/* Doctor Trust Card Row */}
            <div className="mt-8 bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-center space-x-4 max-w-sm w-full">
              <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  {lang === 'en' ? 'B.Opt Specialist' : 'బి.ఆప్ట్ స్పెషలిస్ట్'}
                </p>
                <p className="text-xs text-slate-500 font-sans">
                  {lang === 'en' ? 'Experienced Clinical Optometry' : 'కంటి సంరక్షణ మరియు రోగ నిర్ధారణ నిపుణులు'}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Detailed Qualifications & Bio */}
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3.5 py-1.5 rounded-full mb-4 inline-block font-sans">
              {t.doctorSectionTitle}
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-2 mb-3">
              {t.doctorTitle}
            </h2>
            
            <p className="text-lg font-semibold text-teal-600 leading-snug mb-6">
              {t.doctorQualification}
            </p>

            <div className="w-12 h-1 bg-teal-600 mb-6 rounded-full"></div>

            {/* Doctor Bio */}
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              {t.doctorBio}
            </p>

            {/* Specialty Tag list */}
            <div className="border-t border-slate-100 pt-8">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 font-sans">
                {lang === 'en' ? 'Core Specialties' : 'వైద్య నిపుణత గల రంగాలు'}
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  lang === 'en' ? 'Comprehensive Eye Testing' : 'సమగ్ర కంటి పరీక్షలు',
                  lang === 'en' ? 'Cataract Pre & Post Care' : 'కంటి శుక్లాల చికిత్స సలహాలు',
                  lang === 'en' ? 'Glaucoma Diagnostics' : 'గ్లాకోమా నిర్ధారణ పరీక్షలు',
                  lang === 'en' ? 'Pediatric Optometry' : 'పిల్లల కంటి వైద్యం',
                  lang === 'en' ? 'Contact Lens Fitting' : 'కాంటాక్ట్ లెన్స్ అమరిక',
                  lang === 'en' ? 'Diabetic Eye Screenings' : 'షుగర్ వ్యాధి రోగులకు కంటి పరీక్షలు'
                ].map((spec, i) => (
                  <span
                    key={i}
                    className="bg-slate-50 border border-slate-100 text-slate-700 text-xs font-medium px-4 py-2 rounded-xl flex items-center space-x-1.5"
                  >
                    <ShieldCheck className="w-4 h-4 text-teal-500 shrink-0" />
                    <span>{spec}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
