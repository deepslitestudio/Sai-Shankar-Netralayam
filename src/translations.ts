export interface TranslationSet {
  hospitalName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroSupporting: string;
  bookAppointment: string;
  callNow: string;
  experienceTitle: string;
  experienceDesc: string;
  equipmentTitle: string;
  equipmentDesc: string;
  patientTitle: string;
  patientDesc: string;
  affordableTitle: string;
  affordableDesc: string;
  doctorSectionTitle: string;
  doctorTitle: string;
  doctorQualification: string;
  doctorSpecialization: string;
  doctorBio: string;
  trustBadgeTitle: string;
  trustBadgeDesc: string;
  servicesTitle: string;
  servicesSub: string;
  whyChooseTitle: string;
  whyChooseSub: string;
  aboutTitle: string;
  aboutDesc: string;
  galleryTitle: string;
  gallerySub: string;
  testimonialsTitle: string;
  testimonialsSub: string;
  locationTitle: string;
  addressTitle: string;
  addressText: string;
  landmarkText: string;
  getDirections: string;
  timingsTitle: string;
  timingsWeekdays: string;
  timingsSunday: string;
  contactTitle: string;
  contactSub: string;
  formName: string;
  formPhone: string;
  formDate: string;
  formTimeSlot: string;
  formService: string;
  formSymptoms: string;
  submitWhatsApp: string;
  submitSave: string;
  footerRights: string;
  
  // Patient Portal & Auth
  patientPortal: string;
  signInGoogle: string;
  signOut: string;
  welcomeBack: string;
  myAppointments: string;
  bookNewAppointment: string;
  noAppointments: string;
  statusPending: string;
  statusConfirmed: string;
  statusCancelled: string;
  completeProfile: string;
  profileAge: string;
  profileLocation: string;
  profileLanguage: string;
  saveProfile: string;
  writeTestimonial: string;
  testimonialPlaceholder: string;
  submitTestimonial: string;
  testimonialSuccess: string;
  appointmentSuccess: string;
  cancelAppointment: string;
}

export const translations: Record<'en' | 'te', TranslationSet> = {
  en: {
    hospitalName: "Sai Shankar Netralayam",
    tagline: "Complete Eye Care • Total Vision Health",
    heroHeadline: "Better Vision. Better Life.",
    heroSubheadline: "Complete Eye Care • Total Vision Health",
    heroSupporting: "Experience high-quality eye care services at Yeleswaram. Equipped with advanced diagnostic tools and led by dedicated, compassionate specialists, we ensure that your vision is fully protected and cared for.",
    bookAppointment: "Book Appointment",
    callNow: "Call Now",
    experienceTitle: "Experienced Care",
    experienceDesc: "Led by qualified optometrists and specialists with over 10+ years of dedicated clinical experience.",
    equipmentTitle: "Modern Equipment",
    equipmentDesc: "Advanced optical imaging and diagnostics for accurate vision testing and precise disease detection.",
    patientTitle: "Patient Priority",
    patientDesc: "Our primary mission is patient safety, comfort, and providing tailored personal medical attention.",
    affordableTitle: "Affordable Care",
    affordableDesc: "Transparent pricing models making top-tier ophthalmological treatment accessible for everyone.",
    doctorSectionTitle: "Meet Our Doctor",
    doctorTitle: "Mr. Ln Nageswararao Anusuri",
    doctorQualification: "B.Optom , Senior Optometrist",
    doctorSpecialization: "Ophthalmology & Specialist in Optometry Care",
    doctorBio: "Dedicated to restoring and maintaining excellent vision health, Mr. Ln Nageswararao Anusuri combines deep optometrist expertise with a warm, patient-first approach. By understanding each patient's individual symptoms and employing advanced clinical procedures, our hospital guarantees precision, care, and reliable recovery.",
    trustBadgeTitle: "Your Health, Our Priority",
    trustBadgeDesc: "Trusted by 1000+ local patients for clear, healthier vision.",
    servicesTitle: "Our Services",
    servicesSub: "Comprehensive and reliable eye care solutions custom-tailored for your family",
    whyChooseTitle: "Why Choose Us?",
    whyChooseSub: "Dedicated to raising the standards of clinical excellence in Yeleswaram",
    aboutTitle: "About Our Clinic",
    aboutDesc: "At Sai Shankar Netralayam, we combine cutting-edge technology with the expertise of compassionate eye care professionals to deliver total vision solutions. Located conveniently near Amma Hospital in Yeleswaram, our clean, hygienic, and welcoming facility is fully equipped to treat cataracts, glaucoma, dry eye, diabetic retina checkups, and children's visual issues. Our single-minded mission is: Better Vision for a Better Life.",
    galleryTitle: "Our Facility Gallery",
    gallerySub: "A look inside our modern clinical facility and testing environments",
    testimonialsTitle: "Patient Testimonials",
    testimonialsSub: "Hear from our happy patients who have experienced life-changing vision care",
    locationTitle: "Location & Timings",
    addressTitle: "Our Hospital Address",
    addressText: "Sai Shankar Netralayam, Near Amma Hospital, Lingamparthi Road, Yeleswaram – 533429",
    landmarkText: "Landmark: Located conveniently Near Amma Hospital on Lingamparthi Road",
    getDirections: "Get Directions (Google Maps)",
    timingsTitle: "Hospital Timings",
    timingsWeekdays: "Monday – Saturday: 10:00 AM to 7:00 PM",
    timingsSunday: "Sunday: Closed (Holiday)",
    contactTitle: "Quick Consultation & Booking",
    contactSub: "Fill out the simple form below to reserve your appointment or reach out directly",
    formName: "Patient's Full Name",
    formPhone: "Mobile Number",
    formDate: "Preferred Appointment Date",
    formTimeSlot: "Preferred Time Slot",
    formService: "Select Eye Care Service",
    formSymptoms: "Brief Symptoms / Special Notes (Optional)",
    submitWhatsApp: "Book instantly via WhatsApp",
    submitSave: "Submit & Save in Dashboard",
    footerRights: "© 2026 Sai Shankar Netralayam. All Rights Reserved. Complete Eye Care for Yeleswaram and Surrounding Localities.",
    
    // Patient Portal & Auth
    patientPortal: "Patient Portal",
    signInGoogle: "Sign in with Google",
    signOut: "Sign Out",
    welcomeBack: "Welcome back",
    myAppointments: "My Appointment Bookings",
    bookNewAppointment: "Book New Appointment",
    noAppointments: "You have no appointments booked yet. Use the booking section below or tap the button above to schedule your visit.",
    statusPending: "Pending Confirmation",
    statusConfirmed: "Confirmed by Doctor",
    statusCancelled: "Cancelled",
    completeProfile: "Complete Patient Details",
    profileAge: "Age",
    profileLocation: "Your Village / Location",
    profileLanguage: "Preferred Language",
    saveProfile: "Save Profile Details",
    writeTestimonial: "Write a Testimonial",
    testimonialPlaceholder: "Write about your experience at Sai Shankar Netralayam in English or Telugu...",
    submitTestimonial: "Submit Testimonial (Awaiting Review)",
    testimonialSuccess: "Thank you! Your testimonial has been submitted successfully and is currently under moderation.",
    appointmentSuccess: "Appointment saved successfully to your portal! You can also click the button to notify us on WhatsApp.",
    cancelAppointment: "Cancel Booking"
  },
  te: {
    hospitalName: "సాయి శంకర్ నేత్రాలయం",
    tagline: "కంటి ఆరోగ్యం • సంపూర్ణ దృష్టి",
    heroHeadline: "మెరుగైన దృష్టి... మెరుగైన జీవితం!",
    heroSubheadline: "కంటి ఆరోగ్యం • సంపూర్ణ దృష్టి",
    heroSupporting: "ఆధునిక పరికరాలు, అనుభవజ్ఞులైన వైద్యులచే నాణ్యమైన కంటి వైద్య సేవలు ఇప్పుడు మీ ఏలేశ్వరంలో అందుబాటులో ఉన్నాయి. మీ చూపుని పదిలంగా ఉంచడమే మా ధ్యేయం.",
    bookAppointment: "అపాయింట్మెంట్ బుక్ చేయండి",
    callNow: "కాల్ చేయండి",
    experienceTitle: "అనుభవం",
    experienceDesc: "కంటి వైద్య రంగంలో 10+ సంవత్సరాల అనుభవం మరియు అంకితభావం కలిగిన వైద్య నిపుణులు.",
    equipmentTitle: "ఆధునిక పరికరాలు",
    equipmentDesc: "కచ్చితమైన రోగ నిర్ధారణ మరియు కంటి పరీక్షలకు అత్యాధునిక మరియు అధునాతన సాంకేతిక పరికరాలు.",
    patientTitle: "రోగి ప్రాధాన్యత",
    patientDesc: "మా వద్దకు వచ్చే ప్రతి రోగికి వ్యక్తిగత శ్రద్ధ, సురక్షితమైన వైద్యం మరియు నమ్మకమైన సేవలు.",
    affordableTitle: "అందుబాటులో ఉన్న చికిత్స",
    affordableDesc: "అత్యుత్తమ నాణ్యమైన కంటి వైద్యాన్ని అందరికీ అందుబాటులో ఉండేలా తక్కువ ఖర్చుతో అందిస్తున్నాము.",
    doctorSectionTitle: "మా వైద్యులు",
    doctorTitle: "మిస్టర్ ఎల్.ఎన్. నాగేశ్వరరావు అనుసూరి",
    doctorQualification: "బి.ఆప్టమ్, సీనియర్ ఆప్టోమెట్రిస్ట్",
    doctorSpecialization: "కంటి వైద్య నిపుణులు & ఆప్టోమెట్రీ కేర్ స్పెషలిస్ట్",
    doctorBio: "కంటి సమస్యలను సద్భావంతో అర్థం చేసుకొని, ఆధునిక వైద్య పద్ధతులతో సరైన చికిత్స అందించడం మా వైద్యుల ప్రత్యేకత. రోగుల సమస్యలకు శాశ్వత పరిష్కారం చూపిస్తూ, కంటి చూపును రక్షించడమే మా లక్ష్యం. ప్రతి రోగి పట్ల ప్రత్యేక శ్రద్ధ వహించి నాణ్యమైన సేవలను అందిస్తారు.",
    trustBadgeTitle: "మీ ఆరోగ్యమే మా ప్రాధాన్యత",
    trustBadgeDesc: "1000+ కంటే ఎక్కువ మంది స్థానిక రోగుల నమ్మకమైన కంటి ఆసుపత్రి.",
    servicesTitle: "మా సేవలు",
    servicesSub: "మీ కుటుంబ సభ్యులందరి కొరకు సమగ్రమైన మరియు విశ్వసనీయమైన కంటి చికిత్సలు",
    whyChooseTitle: "మమ్మల్ని ఎందుకు ఎంచుకోవాలి?",
    whyChooseSub: "ఏలేశ్వరం మరియు చుట్టుపక్కల గ్రామాలకు నాణ్యమైన వైద్యాన్ని అందించే నమ్మకమైన సంస్థ",
    aboutTitle: "మా గురించి",
    aboutDesc: "సాయి శంకర్ నేత్రాలయంలో అత్యాధునిక పరికరాలు, అనుభవజ్ఞులైన వైద్యుల సహాయంతో కంటి సంబంధిత అన్ని సమస్యలకు సంపూర్ణ చికిత్స అందించబడుతుంది. ఏలేశ్వరం లింగంపర్తి రోడ్డులోని అమ్మ హాస్పిటల్ పక్కన ఉన్న మా క్లినిక్, ఎల్లప్పుడూ అత్యంత పరిశుభ్రంగా, సురక్షితంగా ఉంటుంది. కంటి శుక్లాలు, గ్లాకోమా, డ్రై ఐ, డయాబెటిక్ రెటీనా స్క్రీనింగ్ మరియు చిన్న పిల్లల కంటి చూపు లోపాలను సవరించడానికి అవసరమైన అన్ని ఆధునిక సదుపాయాలు మా వద్ద కలవు. మా ఏకైక లక్ష్యం - ప్రతి ఒక్కరికీ మెరుగైన దృష్టి, మెరుగైన జీవితాన్ని ప్రసాదించడం.",
    galleryTitle: "హాస్పిటల్ గ్యాలరీ",
    gallerySub: "మా హాస్పిటల్ లోపలి వాతావరణం మరియు కంటి పరీక్షా పరికరాల చిత్రాలు",
    testimonialsTitle: "రోగుల అభిప్రాయాలు",
    testimonialsSub: "మా వద్ద చికిత్స పొంది, నయమైన స్థానిక రోగులు పంచుకున్న నిజమైన అనుభవాలు",
    locationTitle: "చిరునామా & సమయాలు",
    addressTitle: "హాస్పిటల్ చిరునామా",
    addressText: "సాయి శంకర్ నేత్రాలయం, అమ్మ హాస్పిటల్ ప్రక్కన, లింగంపర్తి రోడ్, ఏలేశ్వరం – 533429",
    landmarkText: "గుర్తు: ఏలేశ్వరం లింగంపర్తి రోడ్డులో, అమ్మ హాస్పిటల్ పక్కనే ఉంది",
    getDirections: "దూర సూచీ పొందండి (Google Maps)",
    timingsTitle: "హాస్పిటల్ సమయాలు",
    timingsWeekdays: "సోమవారం – శనివారం: ఉదయం 10:00 గంటల నుండి సాయంత్రం 7:00 గంటల వరకు",
    timingsSunday: "ఆదివారం: సెలవు దినం",
    contactTitle: "సులభమైన అపాయింట్మెంట్ బుకింగ్",
    contactSub: "క్రింది ఫారమ్‌ను పూరించడం ద్వారా మీ అపాయింట్మెంట్‌ను బుక్ చేసుకోండి లేదా నేరుగా మమ్మల్ని సంప్రదించండి",
    formName: "రోగి పూర్తి పేరు",
    formPhone: "మొబైల్ నంబర్",
    formDate: "అపాయింట్మెంట్ కోరుకునే తేదీ",
    formTimeSlot: "కోరుకునే సమయం (పూట)",
    formService: "కావలసిన కంటి చికిత్స రకం",
    formSymptoms: "కంటి సమస్య వివరాలు / ఇతర సమాచారం (ఐచ్ఛికం)",
    submitWhatsApp: "WhatsApp ద్వారా బుక్ చేసుకోండి",
    submitSave: "సమర్పించి పోర్టల్ లో భద్రపరచండి",
    footerRights: "© 2026 సాయి శంకర్ నేత్రాలయం. సర్వ హక్కులూ ప్రత్యేకించబడినవి. ఏలేశ్వరం మరియు చుట్టుపక్కల ప్రాంతాలకు సంపూర్ణ కంటి రక్షణ సేవలు.",
    
    // Patient Portal & Auth
    patientPortal: "పేషెంట్ పోర్టల్",
    signInGoogle: "గూగుల్ తో లాగిన్ అవ్వండి",
    signOut: "లాగ్ అవుట్",
    welcomeBack: "స్వాగతం",
    myAppointments: "నా అపాయింట్‌మెంట్‌లు",
    bookNewAppointment: "కొత్త అపాయింట్‌మెంట్",
    noAppointments: "మీకు ఇంకా ఎటువంటి అపాయింట్‌మెంట్‌లు బుక్ కాలేదు. క్రింది ఫారమ్ ద్వారా లేదా పైన ఉన్న బటన్ నొక్కి మీ అపాయింట్‌మెంట్‌ను బుక్ చేసుకోండి.",
    statusPending: "ధృవీకరణ పెండింగ్‌లో ఉంది",
    statusConfirmed: "వైద్యులచే ధృవీకరించబడింది",
    statusCancelled: "రద్దు చేయబడింది",
    completeProfile: "పేషెంట్ ప్రొఫైల్ వివరాలు",
    profileAge: "వయస్సు",
    profileLocation: "మీ ఊరు / గ్రామం",
    profileLanguage: "భాషా ప్రాధాన్యత",
    saveProfile: "ప్రొఫైల్ వివరాలను సేవ్ చేయండి",
    writeTestimonial: "మీ అభిప్రాయాన్ని పంచుకోండి",
    testimonialPlaceholder: "సాయి శంకర్ నేత్రాలయంలో మీ అనుభవాన్ని తెలుగు లేదా ఇంగ్లీషులో ఇక్కడ రాయండి...",
    submitTestimonial: "అభిప్రాయాన్ని సమర్పించండి (సమీక్షలో ఉంది)",
    testimonialSuccess: "ధన్యవాదాలు! మీ అభిప్రాయం విజయవంతంగా సమర్పించబడింది. అది సమీక్షించబడిన తర్వాత ఇక్కడ ప్రదర్శించబడుతుంది.",
    appointmentSuccess: "మీ అపాయింట్‌మెంట్ విజయవంతంగా పోర్టల్ లో భద్రపరచబడింది! మమ్మల్ని WhatsApp ద్వారా సంప్రదించడానికి కూడా బటన్ పై క్లిక్ చేయవచ్చు.",
    cancelAppointment: "బుకింగ్ రద్దు చేయండి"
  }
};

export interface ServiceDetail {
  id: string;
  title: Record<'en' | 'te', string>;
  description: Record<'en' | 'te', string>;
  icon: string;
}

export const servicesData: ServiceDetail[] = [
  {
    id: "cataract",
    title: {
      en: "Cataract Surgery (కంటి శుక్లం శస్త్రచికిత్స)",
      te: "కేటరాక్ట్ శస్త్రచికిత్స (కంటి శుక్లం)"
    },
    description: {
      en: "Advanced and stitchless Phacoemulsification surgery with premium Intraocular lens (IOL) options to restore crystal-clear vision.",
      te: "ఫెకో ఎమల్సిఫికేషన్ తో అత్యాధునిక కుట్టు లేని కంటి శుక్ల శస్త్రచికిత్స మరియు నాణ్యమైన లెన్స్ అమరిక ద్వారా అద్భుతమైన దృష్టి పునరుద్ధరణ."
    },
    icon: "Eye"
  },
  {
    id: "laser",
    title: {
      en: "Laser Vision Correction (లేజర్ దృష్టి సవరణ)",
      te: "లేజర్ దృష్టి సవరణ (LASIK/PRK)"
    },
    description: {
      en: "Modern clinical laser therapies including LASIK, PRK, and refractive surgeries to permanently reduce dependence on spectacles.",
      te: "కళ్లజోళ్లతో పనిలేకుండా శాశ్వత పరిష్కారం చూపే LASIK, PRK వంటి అత్యాధునిక కంటి లేజర్ చికిత్సలు."
    },
    icon: "Sparkles"
  },
  {
    id: "retina",
    title: {
      en: "Retina Treatment (కంటి రెటీనా చికిత్స)",
      te: "కంటి రెటీనా చికిత్స (రెటీనా కేర్)"
    },
    description: {
      en: "Comprehensive screening, laser photocoagulation, and medical treatment for Diabetic Retinopathy, AMD, and vitreoretinal issues.",
      te: "డయాబెటిక్ రెటీనా, మక్యులర్ డిజెనరేషన్ మరియు ఇతర ముఖ్యమైన రెటీనా వ్యాధులకు నాణ్యమైన కంటి వెనుక పొర పరీక్షలు & అత్యుత్తమ చికిత్స."
    },
    icon: "Activity"
  },
  {
    id: "pediatric",
    title: {
      en: "Pediatric Eye Care (పిల్లల కంటి వైద్యం)",
      te: "పిల్లల కంటి వైద్యం"
    },
    description: {
      en: "Child-friendly visual exams to detect squint, lazy eyes (amblyopia), and correct childhood refractive issues early.",
      te: "పిల్లల్లో వచ్చే మెల్లకన్ను, బద్దకపు కన్ను (అంబ్లియోపియా) మరియు కంటి చూపు లోపాలను ముందుగానే గుర్తించి నివారించే ప్రత్యేక వైద్య పరీక్షలు."
    },
    icon: "Baby"
  },
  {
    id: "lenses",
    title: {
      en: "Contact Lens Clinic (కాంటాక్ట్ లెన్స్ క్లినిక్)",
      te: "కాంటాక్ట్ లెన్స్ క్లినిక్"
    },
    description: {
      en: "Professional fitting and training for soft contact lenses, custom rigid lenses (RGP), and specialty therapeutic options.",
      te: "సురక్షితమైన సాఫ్ట్ కాంటాక్ట్ లెన్స్ అమరిక, కస్టమ్ లెన్స్ డిజైన్స్ మరియు వాటి సంరక్షణపై నిపుణుల శిక్షణ."
    },
    icon: "CircleDot"
  },
  {
    id: "dryeye",
    title: {
      en: "Dry Eye & Allergy Treatment (డ్రై ఐ & ఇతర సమస్యలు)",
      te: "డ్రై ఐ & కంటి ఇతర సమస్యలు"
    },
    description: {
      en: "Effective, targeted diagnosis and long-term relief for dry eye syndrome, clinical eye allergies, glaucoma, and chronic redness.",
      te: "డ్రై ఐ సమస్య, కంటి అలర్జీలు, గ్లాకోమా, తరచూ వచ్చే కంటి ఇన్ఫెక్షన్లు మరియు దురదల నుండి శాశ్వత ఉపశమనం కలిగించే అధునాతన చికిత్సలు."
    },
    icon: "Droplets"
  },
  {
    id: "checkup",
    title: {
      en: "Comprehensive Eye Checkup (సమగ్ర కంటి పరీక్ష)",
      te: "సమగ్ర కంటి పరీక్షలు"
    },
    description: {
      en: "Full routine checkups utilizing automated refraction, slit lamp biomicroscopy, and intraocular pressure checks.",
      te: "ఆటోమేటిక్ మిషన్ రీడింగ్స్, స్లిట్ ల్యాంప్ పరీక్ష మరియు కంటి ఒత్తిడి (ప్రెజర్) నిర్ధారించే సమగ్ర రొటీన్ చెకప్స్."
    },
    icon: "Search"
  }
];

export interface WhyChooseUsItem {
  id: string;
  title: Record<'en' | 'te', string>;
  description: Record<'en' | 'te', string>;
  icon: string;
}

export const whyChooseData: WhyChooseUsItem[] = [
  {
    id: "doctors",
    title: {
      en: "Experienced & Caring Doctor",
      te: "అనుభవజ్ఞులైన వైద్యులు"
    },
    description: {
      en: "Led by Mr. Ln Nageswararao Anusuri with over 25+ years of clinical vision care expertise treating patients with compassion.",
      te: "కంటి వైద్య రంగంలో 25 సంవత్సరాలకు పైగా విస్తృత అనుభవం ఉన్న నిపుణులైన డాక్టర్ ఎల్.ఎన్. నాగేశ్వరరావు అనుసూరి ద్వారా సురక్షితమైన కంటి వైద్య సేవలు."
    },
    icon: "UserCheck"
  },
  {
    id: "tech",
    title: {
      en: "Advanced Diagnostic Technology",
      te: "అత్యధునిక సాంకేతికత"
    },
    description: {
      en: "Equipped with state-of-the-art diagnostic testing equipment to detect subtle optical issues with total accuracy.",
      te: "కంటి సమస్యలను కచ్చితత్వంతో నిర్ధారించడానికి మరియు తగిన చికిత్సను సూచించడానికి ఆసుపత్రిలో అత్యాధునిక మెడికల్ టెక్నాలజీ పరికరాలు."
    },
    icon: "Cpu"
  },
  {
    id: "safe",
    title: {
      en: "Safe & Trusted Care",
      te: "సురక్షితమైన చికిత్స"
    },
    description: {
      en: "Following strict hygienic, clinical safety protocols trusted by more than 1000+ local families.",
      te: "ఎప్పటికప్పుడు శానిటైజ్ చేయబడే అత్యంత పరిశుభ్రమైన వాతావరణం మరియు స్థానిక ప్రజలచే నమ్మబడిన క్లినికల్ సేఫ్టీ నియమాలు."
    },
    icon: "ShieldCheck"
  },
  {
    id: "pricing",
    title: {
      en: "Affordable & Transparent",
      te: "సరసమైన ఖర్చులు"
    },
    description: {
      en: "High-quality eye treatments designed transparently to suit the budget of local and rural families.",
      te: "అత్యుత్తమ కంటి సంరక్షణ సేవలను ఏలేశ్వరం మరియు చుట్టుపక్కల పేద, మధ్యతరగతి కుటుంబాలకు కూడా అందుబాటులో ఉండేలా అతి తక్కువ వ్యయంతో అందిస్తాము."
    },
    icon: "Coins"
  }
];
