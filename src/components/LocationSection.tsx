import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { TranslationSet } from '../translations';

interface LocationSectionProps {
  lang: 'en' | 'te';
  t: TranslationSet;
}

export default function LocationSection({ lang, t }: LocationSectionProps) {
  // Google Maps Deep-link for Directions
  const mapsDeepLink = "https://maps.app.goo.gl/QjrZv2tSAtznTDbu9";

  return (
    <section id="location" className="py-20 bg-slate-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            {t.locationTitle}
          </h2>
          <div className="w-16 h-1 bg-teal-600 mx-auto mb-6 rounded-full"></div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info Side (Timings and Addresses) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Address Block */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t.addressTitle}
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed mb-4 font-medium">
                {t.addressText}
              </p>
              <div className="bg-teal-50/50 border border-teal-100/60 rounded-xl p-3 text-xs text-teal-700 font-medium">
                📍 {t.landmarkText}
              </div>
            </div>

            {/* Timings Block */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {t.timingsTitle}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                  <span className="text-slate-600 font-medium">{lang === 'en' ? 'Monday – Saturday' : 'సోమవారం – శనివారం'}</span>
                  <span className="text-slate-900 font-bold">10:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-sm pb-1 text-rose-600">
                  <span className="font-medium">{lang === 'en' ? 'Sunday' : 'ఆదివారం'}</span>
                  <span className="font-bold uppercase tracking-wider">{lang === 'en' ? 'Closed' : 'సెలవు దినం'}</span>
                </div>
              </div>
            </div>

            {/* Contact Call Strip */}
            <a
              href="tel:+919490786566"
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-2xl p-6 shadow-sm transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-teal-100 uppercase tracking-widest font-sans">{lang === 'en' ? 'Call to consult' : 'ఫోన్ లో సంప్రదించండి'}</p>
                  <p className="text-lg font-bold font-sans">+91 94907 86566</p>
                </div>
              </div>
              <Navigation className="w-5 h-5 text-teal-100 group-hover:translate-x-1 transition-transform" />
            </a>

          </div>

          {/* Embedded Map Side */}
          <div className="lg:col-span-7 h-[420px] lg:h-auto min-h-[400px] flex flex-col">
            <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-md flex-1 flex flex-col overflow-hidden">
              <iframe
                title="Sai Shankar Netralayam Google Map Location"
                src="https://maps.google.com/maps?q=Sai%20Shankar%20Netralayam,%20Lingamparthi%20Road,%20Yeleswaram&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full rounded-2xl border-0 flex-1 min-h-[300px]"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer"
              ></iframe>

              {/* Directions Button */}
              <div className="p-4 pt-4 border-t border-slate-50 flex justify-end shrink-0">
                <a
                  href={mapsDeepLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{t.getDirections}</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
