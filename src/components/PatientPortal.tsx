import React, { useState, useEffect } from 'react';
import { signInWithPopup, signOut as firebaseSignOut, User } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';
import {
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  OperationType
} from '../firebase';
import { Appointment, UserProfile } from '../types';
import { TranslationSet, servicesData } from '../translations';
import {
  Calendar,
  Clock,
  User as UserIcon,
  MessageSquare,
  LogOut,
  Star,
  CheckCircle,
  AlertCircle,
  Trash2,
  Lock,
  Loader2,
  Check,
  Send,
  X
} from 'lucide-react';

interface PatientPortalProps {
  lang: 'en' | 'te';
  t: TranslationSet;
}

export default function PatientPortal({ lang, t }: PatientPortalProps) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);

  // Profile Form State
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');

  // Testimonial Form State
  const [rating, setRating] = useState(5);
  const [testimonialContent, setTestimonialContent] = useState('');
  const [submittingTestimonial, setSubmittingTestimonial] = useState(false);
  const [testimonialMessage, setTestimonialMessage] = useState<string | null>(null);

  // Standard Appointment Booking State (inside Portal for signed in users)
  const [bookingPatientName, setBookingPatientName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTimeSlot, setBookingTimeSlot] = useState('Morning (10:00 AM - 1:00 PM)');
  const [bookingService, setBookingService] = useState('cataract');
  const [bookingSymptoms, setBookingSymptoms] = useState('');
  const [bookingSaving, setBookingSaving] = useState(false);
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);

  // 1. Auth Listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setProfile(null);
        setAppointments([]);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  // 2. Load User Profile and Appointments when Authenticated
  useEffect(() => {
    if (!user) return;
    setLoading(true);

    const userProfilePath = `users/${user.uid}`;
    // Fetch profile
    getDoc(doc(db, 'users', user.uid))
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile;
          setProfile(data);
          setPhone(data.phone || '');
          setAge(data.age ? String(data.age) : '');
          setLocation(data.location || '');
        } else {
          // Create default profile on first login
          const newProfile: UserProfile = {
            userId: user.uid,
            displayName: user.displayName || 'Patient',
            email: user.email || '',
            preferredLanguage: lang,
            createdAt: new Date().toISOString()
          };
          setDoc(doc(db, 'users', user.uid), newProfile)
            .then(() => setProfile(newProfile))
            .catch((err) => handleFirestoreError(err, OperationType.CREATE, userProfilePath));
        }
      })
      .catch((err) => handleFirestoreError(err, OperationType.GET, userProfilePath));

    // Listen to user's appointments in real-time
    const appointmentsPath = 'appointments';
    const q = query(collection(db, appointmentsPath), where('userId', '==', user.uid));
    
    const unsubscribeAppointments = onSnapshot(
      q,
      (snapshot) => {
        const list: Appointment[] = [];
        snapshot.forEach((doc) => {
          list.push(doc.data() as Appointment);
        });
        // Sort appointments by date descending
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setAppointments(list);
        setLoading(false);
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, appointmentsPath);
        setLoading(false);
      }
    );

    return () => {
      unsubscribeAppointments();
    };
  }, [user]);

  // 3. Login Flow
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google Sign-in failed:', error);
    }
  };

  // 4. Logout Flow
  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Signout failed:', error);
    }
  };

  // 5. Save Patient Profile details
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSavingProfile(true);
    setProfileMessage(null);

    const profileDocPath = `users/${user.uid}`;
    try {
      const updatedData = {
        phone: phone.trim(),
        age: age ? parseInt(age) : undefined,
        location: location.trim(),
        preferredLanguage: lang
      };

      await updateDoc(doc(db, 'users', user.uid), updatedData);
      setProfile((prev) => prev ? { ...prev, ...updatedData } : null);
      setProfileMessage(lang === 'en' ? 'Profile details saved successfully!' : 'ప్రొఫైల్ వివరాలు సేవ్ చేయబడ్డాయి!');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, profileDocPath);
    } finally {
      setSavingProfile(false);
    }
  };

  // 6. Submit Review/Testimonial (moderation queued)
  const handleSubmitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !testimonialContent.trim()) return;
    setSubmittingTestimonial(true);
    setTestimonialMessage(null);

    const testimonialId = `t_${user.uid}_${Date.now()}`;
    const testimonialPath = `testimonials/${testimonialId}`;

    try {
      const payload = {
        id: testimonialId,
        userId: user.uid,
        authorName: user.displayName || 'Anonymous Patient',
        rating: rating,
        content: testimonialContent.trim(),
        location: location.trim() || 'Yeleswaram',
        isApproved: false,
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'testimonials', testimonialId), payload);
      setTestimonialContent('');
      setTestimonialMessage(t.testimonialSuccess);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, testimonialPath);
    } finally {
      setSubmittingTestimonial(false);
    }
  };

  // 7. Save Appointment booking inside portal
  const handleSaveAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!bookingPatientName.trim() || !bookingPhone.trim() || !bookingDate) return;

    setBookingSaving(true);
    setBookingMessage(null);

    const appointmentId = `app_${user.uid}_${Date.now()}`;
    const appointmentPath = `appointments/${appointmentId}`;

    try {
      const payload: Appointment = {
        id: appointmentId,
        userId: user.uid,
        patientName: bookingPatientName.trim(),
        phone: bookingPhone.trim(),
        preferredDate: bookingDate,
        preferredTimeSlot: bookingTimeSlot,
        serviceId: bookingService,
        symptoms: bookingSymptoms.trim(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'appointments', appointmentId), payload);
      setBookingMessage(t.appointmentSuccess);
      
      // Clear fields
      setBookingSymptoms('');
      
      // Send WhatsApp trigger as secondary confirmation mechanism
      triggerWhatsAppNotification(payload);

    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, appointmentPath);
    } finally {
      setBookingSaving(false);
    }
  };

  // Trigger cancel booking
  const handleCancelBooking = async (id: string) => {
    if (!confirm(lang === 'en' ? 'Are you sure you want to cancel this booking?' : 'ఈ అపాయింట్‌మెంట్‌ను రద్దు చేయాలనుకుంటున్నారా?')) return;
    const appointmentPath = `appointments/${id}`;
    try {
      await updateDoc(doc(db, 'appointments', id), {
        status: 'cancelled',
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, appointmentPath);
    }
  };

  // Secondary helper to trigger WhatsApp deep-link message
  const triggerWhatsAppNotification = (appDetails: Appointment) => {
    const selectedSvcName = servicesData.find(s => s.id === appDetails.serviceId)?.title[lang] || appDetails.serviceId;
    const whatsappMsg = `Hello Sai Shankar Netralayam, I would like to schedule an eye appointment.\n\n` +
      `- Patient Name: ${appDetails.patientName}\n` +
      `- Phone Number: ${appDetails.phone}\n` +
      `- Preferred Date: ${appDetails.preferredDate}\n` +
      `- Preferred Time Slot: ${appDetails.preferredTimeSlot}\n` +
      `- Eye Care Service: ${selectedSvcName}\n` +
      (appDetails.symptoms ? `- Details: ${appDetails.symptoms}\n` : '') +
      `- Saved securely in patient portal. Please confirm. Thanks.`;

    const encodedText = encodeURIComponent(whatsappMsg);
    const waUrl = `https://wa.me/919490786566?text=${encodedText}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div id="patient-portal-section" className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden p-6 sm:p-10 font-sans">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-b border-slate-100 pb-8 mb-8 gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center shrink-0">
            <UserIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 leading-tight">
              {t.patientPortal}
            </h3>
            <p className="text-xs text-slate-500 font-sans">
              {lang === 'en' ? 'Secure Clinical Login & Dashboard' : 'కంటి ఆసుపత్రి అపాయింట్మెంట్ పోర్టల్'}
            </p>
          </div>
        </div>

        {user ? (
          <div className="flex items-center space-x-3 bg-slate-50 rounded-2xl p-2 pl-3 border border-slate-100">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || ''}
                className="w-8 h-8 rounded-full border border-slate-200"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {user.displayName?.charAt(0) || 'P'}
              </div>
            )}
            <div className="text-left hidden xs:block">
              <p className="text-xs text-slate-400 font-medium">{t.welcomeBack}</p>
              <p className="text-sm font-bold text-slate-800 line-clamp-1 max-w-[120px]">{user.displayName?.split(' ')[0]}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
              title={t.signOut}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleGoogleLogin}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-sm shadow-teal-600/10"
          >
            <Lock className="w-4 h-4 text-teal-200" />
            <span>{t.signInGoogle}</span>
          </button>
        )}
      </div>

      {/* Guest Booking Form when not logged in */}
      {!user && (
        <div className="text-center py-10 bg-slate-50 border border-slate-100/80 rounded-2xl max-w-xl mx-auto px-6">
          <div className="w-12 h-12 bg-teal-100/80 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 mb-2">
            {lang === 'en' ? 'Manage your Eye Care online' : 'మీ కంటి పరీక్షలను ఆన్‌లైన్‌లో చూసుకోండి'}
          </h4>
          <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
            {lang === 'en' 
              ? 'Log in using your secure Google account to save patient profiles, track appointment status, cancel visits, and submit testimonials directly!'
              : 'మీ గూగుల్ అకౌంట్ ద్వారా సులభంగా లాగిన్ అయ్యి మీ కంటి పరీక్షలను సేవ్ చేసుకోవచ్చు, వాటి స్టేటస్ ట్రాక్ చేయవచ్చు మరియు అభిప్రాయాలను ఇక్కడ సమర్పించవచ్చు!'}
          </p>
          <button
            onClick={handleGoogleLogin}
            className="inline-flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl transition-all cursor-pointer"
          >
            <Lock className="w-4 h-4 text-teal-200" />
            <span>{t.signInGoogle}</span>
          </button>
        </div>
      )}

      {/* Authenticated Dashboard */}
      {user && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Middle: List Appointments & Book Form */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Book Appointment Sub-section */}
            <div className="bg-slate-50 border border-slate-100/80 rounded-2xl p-6 sm:p-8">
              <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-teal-600" />
                <span>{lang === 'en' ? 'Schedule New Eye Appointment' : 'కొత్త కంటి పరీక్షను బుక్ చేసుకోండి'}</span>
              </h4>

              <form onSubmit={handleSaveAppointment} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-500 mb-1.5 uppercase font-sans">{t.formName}</label>
                  <input
                    type="text"
                    required
                    value={bookingPatientName}
                    onChange={(e) => setBookingPatientName(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 focus:outline-hidden font-sans font-medium text-slate-800"
                    placeholder="e.g. Ln. Nageswarao"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-500 mb-1.5 uppercase font-sans">{t.formPhone}</label>
                  <input
                    type="tel"
                    required
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 focus:outline-hidden font-sans font-medium text-slate-800"
                    placeholder="9490786566"
                  />
                </div>

                {/* Preferred Date */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-500 mb-1.5 uppercase font-sans">{t.formDate}</label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 focus:outline-hidden font-sans font-medium text-slate-800"
                  />
                </div>

                {/* Time slot dropdown */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-500 mb-1.5 uppercase font-sans">{t.formTimeSlot}</label>
                  <select
                    value={bookingTimeSlot}
                    onChange={(e) => setBookingTimeSlot(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 focus:outline-hidden font-sans font-medium text-slate-800 cursor-pointer"
                  >
                    <option value="Morning (10:00 AM - 1:00 PM)">{lang === 'en' ? 'Morning (10:00 AM - 1:00 PM)' : 'ఉదయం (10:00 నుండి 1:00 వరకు)'}</option>
                    <option value="Afternoon (1:00 PM - 4:00 PM)">{lang === 'en' ? 'Afternoon (1:00 PM - 4:00 PM)' : 'మధ్యాహ్నం (1:00 నుండి 4:00 వరకు)'}</option>
                    <option value="Evening (4:00 PM - 7:00 PM)">{lang === 'en' ? 'Evening (4:00 PM - 7:00 PM)' : 'సాయంత్రం (4:00 నుండి 7:00 వరకు)'}</option>
                  </select>
                </div>

                {/* Service Dropdown */}
                <div className="sm:col-span-2 flex flex-col">
                  <label className="text-xs font-bold text-slate-500 mb-1.5 uppercase font-sans">{t.formService}</label>
                  <select
                    value={bookingService}
                    onChange={(e) => setBookingService(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 focus:outline-hidden font-sans font-medium text-slate-800 cursor-pointer"
                  >
                    {servicesData.map((svc) => (
                      <option key={svc.id} value={svc.id}>
                        {svc.title[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Symptoms / Details */}
                <div className="sm:col-span-2 flex flex-col">
                  <label className="text-xs font-bold text-slate-500 mb-1.5 uppercase font-sans">{t.formSymptoms}</label>
                  <textarea
                    rows={3}
                    value={bookingSymptoms}
                    onChange={(e) => setBookingSymptoms(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 focus:outline-hidden font-sans font-medium text-slate-800 resize-none"
                    placeholder={lang === 'en' ? "Describe eye concerns briefly..." : "కంటి సమస్య వివరాలు ఇక్కడ రాయండి..."}
                  ></textarea>
                </div>

                {bookingMessage && (
                  <div className="sm:col-span-2 bg-teal-50 border border-teal-100 text-teal-800 rounded-xl p-4 text-xs font-semibold flex items-center space-x-2">
                    <Check className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{bookingMessage}</span>
                  </div>
                )}

                {/* Submit button */}
                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={bookingSaving}
                    className="inline-flex items-center justify-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl transition-all disabled:opacity-50 w-full sm:w-auto cursor-pointer"
                  >
                    {bookingSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>{lang === 'en' ? 'Saving Booking...' : 'భద్రపరుస్తున్నాము...'}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t.submitSave}</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>

            {/* My Appointments List */}
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-5 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-teal-600" />
                <span>{t.myAppointments}</span>
              </h4>

              {loading ? (
                <div className="flex items-center justify-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
                  <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
                </div>
              ) : appointments.length === 0 ? (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center font-sans">
                  <p className="text-slate-500 text-sm">{t.noAppointments}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((app) => {
                    const selectedServiceObj = servicesData.find((s) => s.id === app.serviceId);
                    return (
                      <div
                        key={app.id}
                        className="bg-slate-50/50 border border-slate-100 hover:border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                      >
                        <div>
                          <div className="flex items-center space-x-2.5 mb-2 flex-wrap gap-1.5">
                            <span className="text-sm font-bold text-slate-900">{app.patientName}</span>
                            <span className="text-slate-300">|</span>
                            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-sans">
                              {selectedServiceObj?.title[lang].split(' (')[0] || app.serviceId}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1 text-xs text-slate-500">
                            <div className="flex items-center space-x-1.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>{app.preferredDate}</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span className="font-sans text-slate-600">{app.preferredTimeSlot}</span>
                            </div>
                            {app.symptoms && (
                              <p className="text-slate-500 mt-1 italic max-w-lg text-xs leading-relaxed">
                                "{app.symptoms}"
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Status Tag & Cancel controls */}
                        <div className="flex items-center space-x-3 shrink-0 self-end sm:self-center">
                          {app.status === 'pending' && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
                              <AlertCircle className="w-3.5 h-3.5 mr-1 text-amber-500" />
                              {t.statusPending}
                            </span>
                          )}
                          {app.status === 'confirmed' && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-teal-50 text-teal-700 border border-teal-100">
                              <CheckCircle className="w-3.5 h-3.5 mr-1 text-teal-500" />
                              {t.statusConfirmed}
                            </span>
                          )}
                          {app.status === 'cancelled' && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100">
                              <X className="w-3.5 h-3.5 mr-1 text-rose-500" />
                              {t.statusCancelled}
                            </span>
                          )}

                          {app.status === 'pending' && (
                            <button
                              onClick={() => handleCancelBooking(app.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title={t.cancelAppointment}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Profile & Testimonial Feed */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Patient Profile Form Card */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <UserIcon className="w-4.5 h-4.5 text-teal-600" />
                <span>{t.completeProfile}</span>
              </h4>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                {/* Age */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-500 mb-1 uppercase font-sans">{t.profileAge}</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-sans font-medium text-slate-800 focus:outline-hidden focus:border-teal-500"
                    placeholder="e.g. 45"
                  />
                </div>

                {/* Location */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-500 mb-1 uppercase font-sans">{t.profileLocation}</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-sans font-medium text-slate-800 focus:outline-hidden focus:border-teal-500"
                    placeholder="e.g. Yeleswaram"
                  />
                </div>

                {profileMessage && (
                  <div className="bg-teal-50 border border-teal-100 text-teal-800 rounded-lg p-3 text-xs font-semibold flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{profileMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={savingProfile}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1 cursor-pointer"
                >
                  {savingProfile ? (
                    <Loader2 className="w-3 h-3 animate-spin text-white" />
                  ) : (
                    <span>{t.saveProfile}</span>
                  )}
                </button>
              </form>
            </div>

            {/* Testimonial review Submission Card */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <MessageSquare className="w-4.5 h-4.5 text-teal-600" />
                <span>{t.writeTestimonial}</span>
              </h4>

              <form onSubmit={handleSubmitTestimonial} className="space-y-4">
                
                {/* Rating selection (Interactive stars) */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-500 mb-1.5 uppercase font-sans">
                    {lang === 'en' ? 'Select Rating' : 'స్టార్ రేటింగ్'}
                  </label>
                  <div className="flex items-center space-x-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-hidden cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 transition-transform hover:scale-110 ${
                            star <= rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Testimonial text */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-500 mb-1 uppercase font-sans">
                    {lang === 'en' ? 'Review Content' : 'మీ అనుభవం'}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={testimonialContent}
                    onChange={(e) => setTestimonialContent(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-sans font-medium text-slate-800 focus:outline-hidden focus:border-teal-500 resize-none"
                    placeholder={t.testimonialPlaceholder}
                  ></textarea>
                </div>

                {testimonialMessage && (
                  <div className="bg-teal-50 border border-teal-100 text-teal-800 rounded-lg p-3 text-xs font-semibold flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{testimonialMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submittingTestimonial || !testimonialContent.trim()}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1 cursor-pointer disabled:opacity-50"
                >
                  {submittingTestimonial ? (
                    <Loader2 className="w-3 h-3 animate-spin text-white" />
                  ) : (
                    <span>{t.submitTestimonial}</span>
                  )}
                </button>
              </form>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
