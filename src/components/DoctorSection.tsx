import { Star, Award, ShieldCheck } from 'lucide-react';
import { TranslationSet } from '../translations';
// Exact path of the uploaded doctor portrait
import doctorImage from '../assets/images/clinic_consultation_room_doctor.png';
import drAbhishekImage from '../assets/images/Abhishek.jpeg';

interface DoctorSectionProps {
  lang: 'en' | 'te';
  t: TranslationSet;
}

export default function DoctorSection({ lang, t }: DoctorSectionProps) {
  return (
    <section id="doctor" className="py-20 bg-slate-50/50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3.5 py-1.5 rounded-full mb-4 inline-block font-sans">
            {t.doctorSectionTitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-2 mb-4">
            {lang === 'en' ? 'Our Expert Vision Specialists' : 'మా నిపుణులైన కంటి వైద్య బృందం'}
          </h2>
          <div className="w-16 h-1 bg-teal-600 mx-auto mb-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Doctor 1: Mr. Ln Nageswararao Anusuri */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              {/* Doctor Photo & Badges */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  {/* Outer Glow Decorative Accent */}
                  <div className="absolute -inset-1.5 bg-teal-600/20 rounded-3xl blur-md group-hover:bg-teal-600/30 transition-all duration-300"></div>
                  
                  {/* Professional Doctor Photo Card */}
                  <div className="relative bg-white p-3 rounded-3xl border border-slate-100 shadow-xl overflow-hidden max-w-xs">
                    <img
                      src={doctorImage}
                      alt={t.doctorTitle}
                      className="rounded-2xl w-full h-auto object-cover aspect-[3/4] hover:scale-[1.02] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Overlay Experience tag */}
                    <div className="absolute bottom-6 right-6 bg-teal-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                      <span>{lang === 'en' ? '25+ Years Exp.' : '25+ సం. అనుభవం'}</span>
                    </div>
                  </div>
                </div>

                {/* Doctor Trust Card Row */}
                <div className="mt-6 bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center space-x-4 max-w-xs w-full">
                  <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {lang === 'en' ? 'Senior Optometrist' : 'సీనియర్ ఆప్టోమెట్రిస్ట్'}
                    </p>
                    <p className="text-xs text-slate-500 font-sans">
                      {lang === 'en' ? 'B.Optom Specialist' : 'బి.ఆప్టమ్ స్పెషలిస్ట్'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight text-center mb-2">
                  {t.doctorTitle}
                </h3>
                <p className="text-sm font-semibold text-teal-600 text-center mb-4">
                  {t.doctorQualification}
                </p>
                
                <div className="w-12 h-1 bg-teal-600 mx-auto mb-6 rounded-full"></div>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-8 text-center sm:text-left px-2">
                  {t.doctorBio}
                </p>
              </div>
            </div>

            {/* Specialties List */}
            <div className="border-t border-slate-100 pt-6 mt-auto">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 font-sans text-center">
                {lang === 'en' ? 'Core Specialties' : 'వైద్య నిపుణత గల రంగాలు'}
              </h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  lang === 'en' ? 'Comprehensive Eye Testing' : 'సమగ్ర కంటి పరీక్షలు',
                  lang === 'en' ? 'Cataract Pre & Post Care' : 'కంటి శుక్లాల చికిత్స సలహాలు',
                  lang === 'en' ? 'Glaucoma Diagnostics' : 'గ్లాకోమా నిర్ధారణ పరీక్షలు'
                ].map((spec, i) => (
                  <span
                    key={i}
                    className="bg-slate-50 border border-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-xl flex items-center space-x-1.5"
                  >
                    <ShieldCheck className="w-4 h-4 text-teal-500 shrink-0" />
                    <span>{spec}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Doctor 2: DR. APS Abhishek MBBS */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              {/* Doctor Photo & Badges */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  {/* Outer Glow Decorative Accent */}
                  <div className="absolute -inset-1.5 bg-teal-600/20 rounded-3xl blur-md group-hover:bg-teal-600/30 transition-all duration-300"></div>
                  
                  {/* Professional Doctor Photo Card */}
                  <div className="relative bg-white p-3 rounded-3xl border border-slate-100 shadow-xl overflow-hidden max-w-xs">
                    <img
                      src={drAbhishekImage}
                      alt={lang === 'en' ? 'DR. APS Abhishek MBBS' : 'డాక్టర్ ఎ.పి.ఎస్. అభిషేక్ ఎంబీబీెస్'}
                      className="rounded-2xl w-full h-auto object-cover aspect-[3/4] hover:scale-[1.02] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Overlay Experience tag */}
                    <div className="absolute bottom-6 right-6 bg-teal-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                      <span>{lang === 'en' ? 'Expert Surgeon' : 'నిపుణులైన సర్జన్'}</span>
                    </div>
                  </div>
                </div>

                {/* Doctor Trust Card Row */}
                <div className="mt-6 bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center space-x-4 max-w-xs w-full">
                  <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {lang === 'en' ? 'Eye Care Advisory' : 'కంటి సంరక్షణ సలహాదారు'}
                    </p>
                    <p className="text-xs text-slate-500 font-sans">
                      {lang === 'en' ? 'MBBS Specialist' : 'ఎంబీబీఎస్ స్పెషలిస్ట్'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight text-center mb-2">
                  {lang === 'en' ? 'DR. APS Abhishek MBBS' : 'డాక్టర్ ఎ.పి.ఎస్. అభిషేక్ ఎంబీబీఎస్'}
                </h3>
                <p className="text-sm font-semibold text-teal-600 text-center mb-4">
                  {lang === 'en' ? 'MBBS, Consultant' : 'ఎంబీబీఎస్, కన్సల్టెంట్'}
                </p>
                
                <div className="w-12 h-1 bg-teal-600 mx-auto mb-6 rounded-full"></div>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-8 text-center sm:text-left px-2">
                  {lang === 'en'
                    ? 'A highly skilled Ophthalmic Surgeon specializing in modern micro-incision cataract surgeries and advanced refractive vision correction. Dr. APS Abhishek combines state-of-the-art diagnostic technology with surgical excellence to provide compassionate, world-class vision care for all patients.'
                    : 'కంటి శుక్లాల చికిత్స మరియు అత్యాధునిక శస్త్రచికిత్సలలో నిపుణులైన డాక్టర్ ఎ.పి.ఎస్. అభిషేక్ ఎంబీబీఎస్. కంటి చూపును మెరుగుపరచడానికి మరియు ఆధునిక వైద్య సాంకేతికతతో సురక్షితమైన కంటి ఆపరేషన్లను అత్యంత విజయవంతంగా అందిస్తారు.'}
                </p>
              </div>
            </div>

            {/* Specialties List */}
            <div className="border-t border-slate-100 pt-6 mt-auto">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 font-sans text-center">
                {lang === 'en' ? 'Core Specialties' : 'వైద్య నిపుణత గల రంగాలు'}
              </h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  lang === 'en' ? 'Micro-Incision Cataract Surgery' : 'సూక్ష్మ శస్త్రచికిత్స కంటి శుక్లాలు',
                  lang === 'en' ? 'Phacoemulsification' : 'ఫాకో ఎమల్సిఫికేషన్',
                  lang === 'en' ? 'Refractive Vision Correction' : 'దృష్టి దోషాల నివారణ చికిత్స'
                ].map((spec, i) => (
                  <span
                    key={i}
                    className="bg-slate-50 border border-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-xl flex items-center space-x-1.5"
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
