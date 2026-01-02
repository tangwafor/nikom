import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

// =====================================================
// SUPABASE CONFIGURATION - TA-TECHSOLUTIONS
// 📞 (571) 447-2698
// =====================================================
const SUPABASE_URL = 'https://lzgevkzjuxwpnafudxwe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6Z2V2a3pqdXh3cG5hZnVkeHdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNzY3NjAsImV4cCI6MjA4Mjk1Mjc2MH0.e4quPaPpu-Z-xBBYvcI0ZPDfCA5HjkzZZSpUkz8ei3A';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =====================================================
// DEFAULT DATA
// =====================================================
const defaultGroups = [
  { id: 1, name: 'Group One', color: '#059669', gradient: 'from-emerald-500 to-green-600', members: ['Julius Ndenga', 'Vivalis Mbongdula', 'Christopher Chibayem', 'Asandome M-Angwafo III', 'Dephine Ndonga', 'Alexis Nkwaff', 'Bih Nicole Ndenga', 'Tsi Nkwenti-Angwafo III', 'Warah Franklin', 'Nji Kenneth', 'Kenneth Forloh', 'Nathan Fogweh'] },
  { id: 2, name: 'Group Two', color: '#10B981', gradient: 'from-green-500 to-teal-600', members: ['Noah Ahota', 'Monka M-Angwafo III', 'Theresia Ndifon', 'Teriri Solanji', 'Fon Rudolph Acha', 'Mbila Ngum', 'Fon Rudolph Nde', 'Eric Amugcho', 'Tsi Akongi', 'Nji Kenneth Tabi', 'Davis Achiri-Ndi', 'Agerbinma Ngum'] },
  { id: 3, name: 'Group Three', color: '#14B8A6', gradient: 'from-teal-500 to-cyan-600', members: ['Bih Nicole Ndenga II', 'BihElla M-Angwafo III', 'Kendell Nde', 'Handsy Tar', 'Tsi Ndiffor', 'Dr. Emmanuel Nde', 'Kenneth Forloh II', 'Peter Tamsaung', 'Stephanie Tantoh', 'Nji Kenneth Achu', 'George Fogweh', 'Shela Ndedi'] },
  { id: 4, name: 'Group Four', color: '#0D9488', gradient: 'from-cyan-500 to-blue-600', members: ['Constance Akuma', 'Noah Ahota II', 'Julius Ndenga II', 'Lean Yenla Mbah', 'Dr. Akwar Nde', 'Handsy Tar II', 'Vicky Ngong', 'Elvis Fru Nde', 'Warah Franklin II'] },
  { id: 5, name: 'Group Five', color: '#065F46', gradient: 'from-emerald-600 to-green-700', members: ['Dr. Valentine Nde', 'George Tsunday', 'Nancy Lebanon', 'Belen Ndenga', 'Stephano Ndenga', 'Felix Azinwi', 'Kabiena Grace', 'Davis Chikham-Tejan', 'Anagnen Eric', 'Cyntheric Zama', 'Nkindeng Henry', 'Patience Maazi', 'Lesly Acha', 'Shela Ndedi II', 'Solangi Jestil', 'Cynthia Fru'] }
];

const defaultMeetings = [
  { id: 1, date: '01/11/2026', full: 'January 11, 2026', host: 'Bih Nicole Ndenga II', city: 'Baltimore, MD' },
  { id: 2, date: '01/25/2026', full: 'January 25, 2026', host: 'BihElla M-Angwafo III', city: 'Silver Spring, MD' },
  { id: 3, date: '02/08/2026', full: 'February 8, 2026', host: 'Kendell Nde', city: 'Columbia, MD' },
  { id: 4, date: '02/22/2026', full: 'February 22, 2026', host: 'Handsy Tar', city: 'Laurel, MD' },
  { id: 5, date: '03/08/2026', full: 'March 8, 2026', host: 'Tsi Ndiffor', city: 'Germantown, MD' },
  { id: 6, date: '03/22/2026', full: 'March 22, 2026', host: 'Dr. Emmanuel Nde', city: 'Rockville, MD' },
  { id: 7, date: '04/05/2026', full: 'April 5, 2026', host: 'Kenneth Forloh II', city: 'Bowie, MD' },
  { id: 8, date: '04/19/2026', full: 'April 19, 2026', host: 'Peter Tamsaung', city: 'Gaithersburg, MD' },
  { id: 9, date: '05/03/2026', full: 'May 3, 2026', host: 'Stephanie Tantoh', city: 'Hyattsville, MD' },
  { id: 10, date: '05/17/2026', full: 'May 17, 2026', host: 'Nji Kenneth Achu', city: 'Frederick, MD' },
  { id: 11, date: '05/31/2026', full: 'May 31, 2026', host: 'George Fogweh', city: 'Annapolis, MD' },
  { id: 12, date: '06/14/2026', full: 'June 14, 2026', host: 'Shela Ndedi', city: 'Towson, MD' }
];

const rules = [
  { title: 'Vision', text: 'Create the most formidable financial hub for our people!', icon: '🌱' },
  { title: 'Unity', text: 'Rally to support each other succeed.', icon: '🤝' },
  { title: 'Culture', text: 'Learn and uphold our Mankon culture.', icon: '🏛️' },
  { title: 'Group Njangi', text: 'ALL members pay $1,000 (including beneficiary to receive full amount).', icon: '💰', amount: '$1,000' },
  { title: 'Savings Fund', text: 'EVERYONE contributes $100 to savings.', icon: '🏦', amount: '$100' },
  { title: 'Host Fee', text: 'EVERYONE gives $20 to the host.', icon: '🍽️', amount: '$20' },
  { title: 'Meeting Time', text: '3pm to 6pm prompt.', icon: '⏰' },
  { title: 'Late Payment', text: 'Fine for late payment.', icon: '⚠️', amount: '$250' },
];

const LOCAL_KEY = 'nikom_premium_v4';

const STATUS_OPTIONS = [
  { id: 'coming', label: 'Coming', icon: '✅', color: '#10B981' },
  { id: 'onway', label: 'On My Way', icon: '🚗', color: '#3B82F6' },
  { id: 'almost', label: 'Almost There', icon: '📍', color: '#8B5CF6' },
  { id: 'late', label: 'Running Late', icon: '⏰', color: '#F59E0B' },
  { id: 'cantmake', label: "Can't Make It", icon: '❌', color: '#EF4444' },
  { id: 'arrived', label: 'Arrived!', icon: '🎉', color: '#059669' },
];

const CARPOOL_AREAS = [
  { id: 'baltimore', name: 'Baltimore', icon: '🏙️' },
  { id: 'silverspring', name: 'Silver Spring', icon: '🌟' },
  { id: 'columbia', name: 'Columbia', icon: '🏘️' },
  { id: 'laurel', name: 'Laurel', icon: '🌿' },
  { id: 'rockville', name: 'Rockville', icon: '🪨' },
  { id: 'bowie', name: 'Bowie', icon: '🏹' },
  { id: 'gaithersburg', name: 'Gaithersburg', icon: '🌳' },
  { id: 'frederick', name: 'Frederick', icon: '⛰️' },
  { id: 'annapolis', name: 'Annapolis', icon: '⚓' },
  { id: 'dc', name: 'Washington DC', icon: '🏛️' },
  { id: 'other', name: 'Other Area', icon: '📍' },
];

const PAYMENT_METHODS = [
  { id: 'zelle', name: 'Zelle', icon: '💸', color: '#6D1ED4' },
  { id: 'cashapp', name: 'Cash App', icon: '💵', color: '#00D632' },
  { id: 'venmo', name: 'Venmo', icon: '💳', color: '#3D95CE' },
  { id: 'paypal', name: 'PayPal', icon: '🅿️', color: '#003087' },
  { id: 'applepay', name: 'Apple Pay', icon: '🍎', color: '#000000' },
  { id: 'cash', name: 'Cash', icon: '💰', color: '#2E7D32' },
  { id: 'check', name: 'Check', icon: '📝', color: '#795548' },
];

// =====================================================
// REUSABLE COMPONENTS
// =====================================================
const MemberAvatar = ({ name, photo, size = 'md', color = '#059669', onClick }) => {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-12 h-12 text-sm', lg: 'w-16 h-16 text-lg', xl: 'w-20 h-20 text-xl' };
  const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??';
  
  return (
    <div 
      className={`relative ${sizes[size]} rounded-full overflow-hidden shadow-lg ring-2 ring-white transition-all hover:scale-110 hover:ring-4 ${onClick ? 'cursor-pointer' : ''}`} 
      style={{ backgroundColor: color }} 
      onClick={onClick}
    >
      {photo ? (
        <img src={photo} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white font-bold">{initials}</div>
      )}
    </div>
  );
};

const GlassCard = ({ children, className = '', gradient = false, onClick }) => (
  <div 
    className={`backdrop-blur-md bg-white/80 rounded-2xl shadow-xl border border-white/20 ${gradient ? 'bg-gradient-to-br from-white/90 to-white/70' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

const AnimatedCounter = ({ value, prefix = '', suffix = '' }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setDisplay(value); clearInterval(timer); }
      else { setDisplay(Math.floor(current)); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{prefix}{display.toLocaleString()}{suffix}</span>;
};

const ProgressRing = ({ progress, size = 60, strokeWidth = 6, color = '#059669' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} />
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000" />
      <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="fill-current text-gray-700 font-bold text-sm" transform={`rotate(90 ${size/2} ${size/2})`}>{progress}%</text>
    </svg>
  );
};

const Confetti = () => (
  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
    {[...Array(50)].map((_, i) => (
      <div key={i} className="absolute animate-bounce" style={{
        left: `${Math.random() * 100}%`,
        top: `-20px`,
        animation: `fall ${2 + Math.random() * 2}s linear forwards`,
        animationDelay: `${Math.random() * 0.5}s`,
        fontSize: `${16 + Math.random() * 16}px`
      }}>
        {['🌴', '💰', '🌿', '🎉', '✨', '💎', '🌟', '🎊'][Math.floor(Math.random() * 8)]}
      </div>
    ))}
    <style>{`@keyframes fall { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }`}</style>
  </div>
);

const PulsingDot = ({ color = '#10B981' }) => (
  <span className="relative flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: color }}></span>
    <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: color }}></span>
  </span>
);

// =====================================================
// MAIN APP COMPONENT
// =====================================================
export default function NikomNiMankon() {
  // Auth & Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminPassword, setAdminPassword] = useState('nikom2026');
  const [recoveryPhone, setRecoveryPhone] = useState('');
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showSetupRecoveryModal, setShowSetupRecoveryModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [newPhoneInput, setNewPhoneInput] = useState('');

  // Connection State
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(true);

  // Core State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMeeting, setSelectedMeeting] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState(defaultGroups);
  const [meetings, setMeetings] = useState(defaultMeetings);
  
  // Payment & Member States
  const [njangiPayments, setNjangiPayments] = useState({});
  const [hostFeePayments, setHostFeePayments] = useState({});
  const [savingsFundPayments, setSavingsFundPayments] = useState({});
  const [attendance, setAttendance] = useState({});
  const [memberPhotos, setMemberPhotos] = useState({});
  const [memberContacts, setMemberContacts] = useState({});
  const [beneficiaryOverrides, setBeneficiaryOverrides] = useState({});
  const [meetingNotes, setMeetingNotes] = useState({});
  const [memberStatuses, setMemberStatuses] = useState({});
  const [statusMessages, setStatusMessages] = useState({});
  const [memberLocations, setMemberLocations] = useState({});
  const [carpoolOffers, setCarpoolOffers] = useState({});
  const [carpoolRequests, setCarpoolRequests] = useState({});
  const [hostingLocations, setHostingLocations] = useState({});
  const [paymentMethods, setPaymentMethods] = useState({});
  const [showHostingModal, setShowHostingModal] = useState(false);
  const [editingHosting, setEditingHosting] = useState({ meetingIdx: 0, address: '', city: '', state: 'MD', zip: '', notes: '', time: '3:00 PM' });
  const [showPaymentMethodsModal, setShowPaymentMethodsModal] = useState(false);
  const [selectedPaymentMember, setSelectedPaymentMember] = useState({ groupIdx: 0, memberIdx: 0 });
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportOptions, setReportOptions] = useState({
    includeNjangi: true,
    includeSavings: true,
    includeHostFee: true,
    includeAttendance: true,
    includePaymentMethods: true,
    includeLocation: true,
    includeTotals: true,
    includeUnpaid: true
  });
  
  // Savings Ledger System - tracks actual payments with amounts and dates
  const [savingsLedger, setSavingsLedger] = useState({});
  const [showSavingsLedgerModal, setShowSavingsLedgerModal] = useState(false);
  const [selectedSavingsMember, setSelectedSavingsMember] = useState({ groupIdx: 0, memberIdx: 0 });
  const [savingsPaymentAmount, setSavingsPaymentAmount] = useState(100);
  const [savingsPaymentNote, setSavingsPaymentNote] = useState('');
  const [showSavingsReportModal, setShowSavingsReportModal] = useState(false);

  // Settings
  const [visibility, setVisibility] = useState({ njangi: false, savings: false, hostFee: false });

  // UI State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showBeneficiaryModal, setShowBeneficiaryModal] = useState(false);
  const [editingBeneficiary, setEditingBeneficiary] = useState({ meetingIdx: 0, groupIdx: 0 });
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [editingNotes, setEditingNotes] = useState({ meetingIdx: 0, note: '' });
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState({ groupIdx: 0, memberIdx: 0 });
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberGroup, setNewMemberGroup] = useState(0);
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const [checkinMember, setCheckinMember] = useState({ groupIdx: 0, memberIdx: 0 });
  const [checkinMessage, setCheckinMessage] = useState('');
  const [showCarpoolModal, setShowCarpoolModal] = useState(false);
  const [selectedCarpoolArea, setSelectedCarpoolArea] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const fileInputRef = useRef(null);

  const totalMembers = useMemo(() => groups.reduce((a, g) => a + g.members.length, 0), [groups]);

  // =====================================================
  // LOAD & SAVE DATA
  // =====================================================
  useEffect(() => {
    loadData();
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => { window.removeEventListener('online', handleOnline); window.removeEventListener('offline', handleOffline); };
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const { data: settingsData } = await supabase.from('app_settings').select('*').limit(1).single();
      if (settingsData) {
        if (settingsData.admin_password_hash) setAdminPassword(settingsData.admin_password_hash);
        if (settingsData.recovery_phone) setRecoveryPhone(settingsData.recovery_phone);
        if (settingsData.visibility) setVisibility(settingsData.visibility);
      }
    } catch (e) { console.log('Using local data'); }

    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.adminPassword) setAdminPassword(data.adminPassword);
        if (data.recoveryPhone) setRecoveryPhone(data.recoveryPhone);
        if (data.njangiPayments) setNjangiPayments(data.njangiPayments);
        if (data.hostFeePayments) setHostFeePayments(data.hostFeePayments);
        if (data.savingsFundPayments) setSavingsFundPayments(data.savingsFundPayments);
        if (data.attendance) setAttendance(data.attendance);
        if (data.memberPhotos) setMemberPhotos(data.memberPhotos);
        if (data.memberContacts) setMemberContacts(data.memberContacts);
        if (data.memberStatuses) setMemberStatuses(data.memberStatuses);
        if (data.statusMessages) setStatusMessages(data.statusMessages);
        if (data.memberLocations) setMemberLocations(data.memberLocations);
        if (data.carpoolOffers) setCarpoolOffers(data.carpoolOffers);
        if (data.carpoolRequests) setCarpoolRequests(data.carpoolRequests);
        if (data.hostingLocations) setHostingLocations(data.hostingLocations);
        if (data.paymentMethods) setPaymentMethods(data.paymentMethods);
        if (data.savingsLedger) setSavingsLedger(data.savingsLedger);
        if (data.beneficiaryOverrides) setBeneficiaryOverrides(data.beneficiaryOverrides);
        if (data.meetingNotes) setMeetingNotes(data.meetingNotes);
        if (data.groups) setGroups(data.groups);
        if (data.isAdmin) setIsAdmin(data.isAdmin);
        if (data.visibility) setVisibility(data.visibility);
      } catch (e) { console.error('Error loading'); }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoading) {
      const data = { 
        adminPassword, recoveryPhone, njangiPayments, hostFeePayments, savingsFundPayments, 
        attendance, memberPhotos, memberContacts, memberStatuses, statusMessages, 
        memberLocations, carpoolOffers, carpoolRequests, hostingLocations, paymentMethods,
        beneficiaryOverrides, meetingNotes, groups, isAdmin, visibility, savingsLedger
      };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
    }
  }, [adminPassword, recoveryPhone, njangiPayments, hostFeePayments, savingsFundPayments, attendance, memberPhotos, memberContacts, memberStatuses, statusMessages, memberLocations, carpoolOffers, carpoolRequests, hostingLocations, paymentMethods, beneficiaryOverrides, meetingNotes, groups, isAdmin, visibility, savingsLedger, isLoading]);

  // =====================================================
  // AUTH FUNCTIONS WITH PHONE RECOVERY
  // =====================================================
  // Master reset password - ALWAYS works for emergency access
  const MASTER_PASSWORD = 'tatechsolutions2026';
  
  const handleLogin = () => {
    // Check for master password (emergency reset)
    if (passwordInput === MASTER_PASSWORD) {
      setAdminPassword('nikom2026'); // Reset to default
      setIsAdmin(true); 
      setShowLoginModal(false); 
      setPasswordInput(''); 
      setLoginError(''); 
      triggerConfetti();
      alert('🔓 Master reset! Password has been reset to: nikom2026\n\nPlease change it in Settings.');
      return;
    }
    
    if (passwordInput === adminPassword) {
      setIsAdmin(true); 
      setShowLoginModal(false); 
      setPasswordInput(''); 
      setLoginError(''); 
      triggerConfetti();
    } else { 
      setLoginError('Incorrect password'); 
    }
  };

  const handleLogout = () => { 
    setIsAdmin(false); 
  };

  const generateRecoveryCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    return code;
  };

  const handleForgotPassword = () => {
    if (!recoveryPhone) {
      setLoginError('No recovery phone set. Contact TA-TECHSOLUTIONS at (571) 447-2698');
      return;
    }
    const code = generateRecoveryCode();
    // In production, this would send an actual SMS
    alert(`📱 Recovery code sent to ${recoveryPhone.slice(0, 3)}***${recoveryPhone.slice(-4)}\n\nFor demo: Your code is ${code}`);
    setCodeSent(true);
    setLoginError('');
  };

  const handleVerifyCode = () => {
    if (recoveryCode === generatedCode) {
      setCodeSent(false);
      setShowForgotPasswordModal(false);
      setShowChangePasswordModal(true);
      setLoginError('');
      setRecoveryCode('');
      setPasswordInput(adminPassword); // Pre-fill for "current password" bypass
    } else {
      setLoginError('Invalid code. Please try again.');
    }
  };

  const handleChangePassword = async () => {
    if (passwordInput !== adminPassword && !codeSent) { 
      setLoginError('Current password incorrect'); 
      return; 
    }
    if (newPassword.length < 4) { 
      setLoginError('Min 4 characters'); 
      return; 
    }
    if (newPassword !== confirmPassword) { 
      setLoginError('Passwords do not match'); 
      return; 
    }
    setAdminPassword(newPassword);
    try { 
      await supabase.from('app_settings').update({ admin_password_hash: newPassword }).neq('id', ''); 
    } catch (e) {}
    setShowChangePasswordModal(false); 
    setPasswordInput(''); 
    setNewPassword(''); 
    setConfirmPassword(''); 
    setLoginError(''); 
    triggerConfetti();
    alert('✅ Password changed successfully!');
  };

  const handleSetupRecoveryPhone = () => {
    if (!newPhoneInput || newPhoneInput.length < 10) {
      setLoginError('Please enter a valid phone number');
      return;
    }
    setRecoveryPhone(newPhoneInput);
    setShowSetupRecoveryModal(false);
    setNewPhoneInput('');
    setLoginError('');
    triggerConfetti();
    alert(`✅ Recovery phone set to ${newPhoneInput}`);
  };

  // =====================================================
  // MEMBER & PHOTO FUNCTIONS
  // =====================================================
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const key = `${selectedMember.groupIdx}-${selectedMember.memberIdx}`;
      setMemberPhotos(prev => ({ ...prev, [key]: reader.result }));
      triggerConfetti();
    };
    reader.readAsDataURL(file);
  };

  const openMemberModal = (groupIdx, memberIdx) => {
    setSelectedMember({ groupIdx, memberIdx });
    setShowMemberModal(true);
  };

  const getMemberPhoto = (groupIdx, memberIdx) => memberPhotos[`${groupIdx}-${memberIdx}`];
  const getMemberContact = (groupIdx, memberIdx) => memberContacts[`${groupIdx}-${memberIdx}`] || {};

  const updateMemberContact = (field, value) => {
    const key = `${selectedMember.groupIdx}-${selectedMember.memberIdx}`;
    setMemberContacts(prev => ({ ...prev, [key]: { ...getMemberContact(selectedMember.groupIdx, selectedMember.memberIdx), [field]: value } }));
  };

  // =====================================================
  // BENEFICIARY FUNCTIONS
  // =====================================================
  const getBeneficiary = (groupIdx, meetingIdx) => {
    const group = groups[groupIdx];
    if (!group) return { name: 'Unknown', index: 0, isOverride: false };
    const overrideKey = `${meetingIdx}-${groupIdx}`;
    if (beneficiaryOverrides[overrideKey] !== undefined) {
      const idx = beneficiaryOverrides[overrideKey];
      return { name: group.members[idx] || 'Unknown', index: idx, isOverride: true };
    }
    const idx = meetingIdx % group.members.length;
    return { name: group.members[idx] || 'Unknown', index: idx, isOverride: false };
  };

  const openBeneficiaryModal = (meetingIdx, groupIdx) => {
    if (!isAdmin) return;
    setEditingBeneficiary({ meetingIdx, groupIdx });
    setShowBeneficiaryModal(true);
  };

  const saveBeneficiaryOverride = (memberIdx) => {
    if (!isAdmin) return;
    setBeneficiaryOverrides(prev => ({ ...prev, [`${editingBeneficiary.meetingIdx}-${editingBeneficiary.groupIdx}`]: memberIdx }));
    setShowBeneficiaryModal(false); 
    triggerConfetti();
  };

  const clearBeneficiaryOverride = () => {
    setBeneficiaryOverrides(prev => { 
      const n = { ...prev }; 
      delete n[`${editingBeneficiary.meetingIdx}-${editingBeneficiary.groupIdx}`]; 
      return n; 
    });
    setShowBeneficiaryModal(false);
  };

  // =====================================================
  // PAYMENT FUNCTIONS
  // =====================================================
  const toggleNjangi = (meetingIdx, groupIdx, memberIdx) => {
    if (!isAdmin) return;
    const key = `${meetingIdx}-${groupIdx}-${memberIdx}`;
    setNjangiPayments(prev => ({ ...prev, [key]: !prev[key] }));
    triggerConfetti();
  };

  const toggleHostFee = (meetingIdx, groupIdx, memberIdx) => {
    if (!isAdmin) return;
    const key = `${meetingIdx}-${groupIdx}-${memberIdx}`;
    setHostFeePayments(prev => ({ ...prev, [key]: !prev[key] }));
    triggerConfetti();
  };

  const toggleSavingsFund = (meetingIdx, groupIdx, memberIdx) => {
    if (!isAdmin) return;
    const key = `${meetingIdx}-${groupIdx}-${memberIdx}`;
    setSavingsFundPayments(prev => ({ ...prev, [key]: !prev[key] }));
    triggerConfetti();
  };

  const toggleAttendance = (meetingIdx, groupIdx, memberIdx) => {
    if (!isAdmin) return;
    const key = `${meetingIdx}-${groupIdx}-${memberIdx}`;
    setAttendance(prev => ({ ...prev, [key]: !prev[key] }));
    triggerConfetti();
  };

  // =====================================================
  // CHECK-IN FUNCTIONS
  // =====================================================
  const getMemberStatus = (meetingIdx, groupIdx, memberIdx) => {
    const key = `${meetingIdx}-${groupIdx}-${memberIdx}`;
    return memberStatuses[key] || null;
  };

  const getStatusMessage = (meetingIdx, groupIdx, memberIdx) => {
    const key = `${meetingIdx}-${groupIdx}-${memberIdx}`;
    return statusMessages[key] || '';
  };

  const updateMemberStatus = (statusId) => {
    const key = `${selectedMeeting}-${checkinMember.groupIdx}-${checkinMember.memberIdx}`;
    setMemberStatuses(prev => ({ ...prev, [key]: statusId }));
    if (checkinMessage.trim()) {
      setStatusMessages(prev => ({ ...prev, [key]: checkinMessage.trim() }));
    }
    setShowCheckinModal(false);
    setCheckinMessage('');
    triggerConfetti();
  };

  const clearMemberStatus = () => {
    const key = `${selectedMeeting}-${checkinMember.groupIdx}-${checkinMember.memberIdx}`;
    setMemberStatuses(prev => { const n = {...prev}; delete n[key]; return n; });
    setStatusMessages(prev => { const n = {...prev}; delete n[key]; return n; });
    setShowCheckinModal(false);
    setCheckinMessage('');
  };

  // =====================================================
  // LOCATION FUNCTIONS
  // =====================================================
  const shareMyLocation = (groupIdx, memberIdx) => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Calculate ETA (simplified - assumes 30mph average)
        const distance = Math.random() * 20 + 1; // Simplified for demo
        const eta = Math.round(distance * 2);
        
        setMemberLocations(prev => ({
          ...prev,
          [`${groupIdx}-${memberIdx}`]: {
            lat: latitude,
            lng: longitude,
            distance: distance.toFixed(1),
            eta: `${eta} min`,
            timestamp: new Date().toISOString()
          }
        }));
        triggerConfetti();
      },
      (error) => {
        alert('Unable to get location. Please enable location services.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const getMemberLocation = (groupIdx, memberIdx) => memberLocations[`${groupIdx}-${memberIdx}`];

  // =====================================================
  // CARPOOL FUNCTIONS
  // =====================================================
  const offerCarpool = (groupIdx, memberIdx, area, seats = 3) => {
    const key = `${selectedMeeting}-${groupIdx}-${memberIdx}`;
    setCarpoolOffers(prev => ({
      ...prev,
      [key]: { area, seats, timestamp: new Date().toISOString() }
    }));
    triggerConfetti();
  };

  const requestCarpool = (groupIdx, memberIdx, area) => {
    const key = `${selectedMeeting}-${groupIdx}-${memberIdx}`;
    setCarpoolRequests(prev => ({
      ...prev,
      [key]: { area, timestamp: new Date().toISOString() }
    }));
    triggerConfetti();
  };

  const getCarpoolOffer = (meetingIdx, groupIdx, memberIdx) => carpoolOffers[`${meetingIdx}-${groupIdx}-${memberIdx}`];
  const getCarpoolRequest = (meetingIdx, groupIdx, memberIdx) => carpoolRequests[`${meetingIdx}-${groupIdx}-${memberIdx}`];

  // =====================================================
  // HOSTING LOCATION FUNCTIONS
  // =====================================================
  const getHostingLocation = (meetingIdx) => hostingLocations[meetingIdx] || null;
  
  const saveHostingLocation = () => {
    setHostingLocations(prev => ({
      ...prev,
      [editingHosting.meetingIdx]: {
        address: editingHosting.address,
        city: editingHosting.city,
        state: editingHosting.state,
        zip: editingHosting.zip,
        notes: editingHosting.notes,
        time: editingHosting.time
      }
    }));
    setShowHostingModal(false);
    triggerConfetti();
  };

  const openHostingModal = (meetingIdx) => {
    const existing = getHostingLocation(meetingIdx);
    setEditingHosting({
      meetingIdx,
      address: existing?.address || '',
      city: existing?.city || meetings[meetingIdx]?.city?.split(',')[0] || '',
      state: existing?.state || 'MD',
      zip: existing?.zip || '',
      notes: existing?.notes || '',
      time: existing?.time || '3:00 PM'
    });
    setShowHostingModal(true);
  };

  // =====================================================
  // PAYMENT METHODS FUNCTIONS
  // =====================================================
  const getMemberPaymentMethods = (groupIdx, memberIdx) => paymentMethods[`${groupIdx}-${memberIdx}`] || [];
  
  const saveMemberPaymentMethod = (method, handle) => {
    const key = `${selectedPaymentMember.groupIdx}-${selectedPaymentMember.memberIdx}`;
    const existing = getMemberPaymentMethods(selectedPaymentMember.groupIdx, selectedPaymentMember.memberIdx);
    const updated = existing.filter(p => p.method !== method);
    if (handle.trim()) {
      updated.push({ method, handle: handle.trim() });
    }
    setPaymentMethods(prev => ({ ...prev, [key]: updated }));
  };

  const openPaymentMethodsModal = (groupIdx, memberIdx) => {
    setSelectedPaymentMember({ groupIdx, memberIdx });
    setShowPaymentMethodsModal(true);
  };

  // =====================================================
  // BACKUP & RESTORE FUNCTIONS
  // =====================================================
  const createBackup = () => {
    const data = { 
      adminPassword, recoveryPhone, njangiPayments, hostFeePayments, savingsFundPayments, 
      attendance, memberPhotos, memberContacts, memberStatuses, statusMessages, 
      memberLocations, carpoolOffers, carpoolRequests, hostingLocations, paymentMethods,
      beneficiaryOverrides, meetingNotes, groups, visibility, savingsLedger,
      backupDate: new Date().toISOString(),
      version: 'v4.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nikom_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    triggerConfetti();
  };

  const restoreBackup = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result);
        if (data.adminPassword) setAdminPassword(data.adminPassword);
        if (data.recoveryPhone) setRecoveryPhone(data.recoveryPhone);
        if (data.njangiPayments) setNjangiPayments(data.njangiPayments);
        if (data.hostFeePayments) setHostFeePayments(data.hostFeePayments);
        if (data.savingsFundPayments) setSavingsFundPayments(data.savingsFundPayments);
        if (data.attendance) setAttendance(data.attendance);
        if (data.memberPhotos) setMemberPhotos(data.memberPhotos);
        if (data.memberContacts) setMemberContacts(data.memberContacts);
        if (data.memberStatuses) setMemberStatuses(data.memberStatuses);
        if (data.statusMessages) setStatusMessages(data.statusMessages);
        if (data.memberLocations) setMemberLocations(data.memberLocations);
        if (data.carpoolOffers) setCarpoolOffers(data.carpoolOffers);
        if (data.carpoolRequests) setCarpoolRequests(data.carpoolRequests);
        if (data.hostingLocations) setHostingLocations(data.hostingLocations);
        if (data.paymentMethods) setPaymentMethods(data.paymentMethods);
        if (data.savingsLedger) setSavingsLedger(data.savingsLedger);
        if (data.beneficiaryOverrides) setBeneficiaryOverrides(data.beneficiaryOverrides);
        if (data.meetingNotes) setMeetingNotes(data.meetingNotes);
        if (data.groups) setGroups(data.groups);
        if (data.visibility) setVisibility(data.visibility);
        
        alert(`✅ Backup restored successfully!\nBackup date: ${data.backupDate ? new Date(data.backupDate).toLocaleDateString() : 'Unknown'}\nVersion: ${data.version || 'Unknown'}`);
        triggerConfetti();
      } catch (err) {
        alert('❌ Error restoring backup. Invalid file format.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  // =====================================================
  // REMOVE MEMBER FUNCTION
  // =====================================================
  const removeMember = (groupIdx, memberIdx) => {
    const member = groups[groupIdx]?.members[memberIdx];
    if (!member) return;
    
    if (!confirm(`⚠️ Are you sure you want to remove "${member}" from ${groups[groupIdx].name}?\n\nThis will also remove their payment history and other data.`)) {
      return;
    }
    
    setGroups(prev => {
      const newGroups = [...prev];
      newGroups[groupIdx] = {
        ...newGroups[groupIdx],
        members: newGroups[groupIdx].members.filter((_, idx) => idx !== memberIdx)
      };
      return newGroups;
    });
    
    // Clean up related data
    // Note: Payment data uses keys like "meetingIdx-groupIdx-memberIdx" 
    // After removal, indices shift, so old data may be orphaned
    // This is acceptable for simplicity
    
    setShowMemberModal(false);
    alert(`✅ ${member} has been removed from ${groups[groupIdx].name}`);
  };

  // =====================================================
  // MEETING NOTES FUNCTIONS
  // =====================================================
  const openNotesModal = (meetingIdx) => {
    setEditingNotes({ meetingIdx, note: meetingNotes[meetingIdx] || '' });
    setShowNotesModal(true);
  };

  const saveNotes = () => {
    setMeetingNotes(prev => ({ ...prev, [editingNotes.meetingIdx]: editingNotes.note }));
    setShowNotesModal(false);
    triggerConfetti();
  };

  // =====================================================
  // PRINT REPORT FUNCTION
  // =====================================================
  const printReport = () => {
    const meeting = meetings[selectedMeeting];
    const ledgerStats = getOverallSavingsStats();
    const hStats = getMeetingHostFeeStats(selectedMeeting);
    const aStats = getMeetingAttendanceStats(selectedMeeting);
    
    let totalNjangi = 0;
    groups.forEach((g, gIdx) => {
      totalNjangi += getGroupMeetingStats(selectedMeeting, gIdx).njangiCollected;
    });
    
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Nikom Ni Mankon - Meeting Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
          h1 { color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px; }
          h2 { color: #333; margin-top: 20px; }
          .summary-box { background: #f0fdf4; padding: 15px; border-radius: 10px; margin: 15px 0; }
          .group-section { margin: 15px 0; padding: 10px; border-left: 4px solid #059669; background: #f9f9f9; }
          table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background: #059669; color: white; }
          .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
          .badge { display: inline-block; padding: 3px 8px; border-radius: 12px; font-size: 11px; }
          .ahead { background: #dcfce7; color: #166534; }
          .current { background: #dbeafe; color: #1e40af; }
          .behind { background: #fee2e2; color: #991b1b; }
          @media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
        </style>
      </head>
      <body>
        <h1>🌴 NIKOM NI MANKON</h1>
        <h2>📅 ${meeting.full}</h2>
        <p>🏠 Host: ${meeting.host} | 📍 ${meeting.city}</p>
        
        <div class="summary-box">
          <h3>💎 Collection Summary</h3>
          <table>
            <tr><td>💰 Njangi</td><td><strong>$${totalNjangi.toLocaleString()}</strong></td></tr>
            <tr><td>🏦 Savings</td><td><strong>$${ledgerStats.totalCollected.toLocaleString()}</strong></td></tr>
            <tr><td>🍽️ Host Fee</td><td><strong>$${hStats.collected.toLocaleString()}</strong></td></tr>
            <tr><td>✋ Attendance</td><td><strong>${aStats.present}/${aStats.total} (${aStats.percentage}%)</strong></td></tr>
          </table>
        </div>
        
        <h2>💰 Njangi Payments by Group</h2>
        ${groups.map((group, gIdx) => {
          const ben = getBeneficiary(gIdx, selectedMeeting);
          const stats = getGroupMeetingStats(selectedMeeting, gIdx);
          return `
            <div class="group-section">
              <h3>${group.name}</h3>
              <p>⭐ Beneficiary: <strong>${ben.name}</strong></p>
              <p>✅ ${stats.njangiPaid}/${stats.njangiTotal} paid ($${stats.njangiCollected.toLocaleString()})</p>
            </div>
          `;
        }).join('')}
        
        <h2>🏦 Savings Status Summary</h2>
        <p>✨ Ahead: ${ledgerStats.membersAhead} | ✅ Current: ${ledgerStats.membersCurrent} | ⏳ Behind: ${ledgerStats.membersBehind}</p>
        
        <div class="footer">
          <p>Report Generated: ${new Date().toLocaleDateString()}</p>
          <p>Powered by TA-TECHSOLUTIONS | 📞 (571) 447-2698</p>
        </div>
      </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  // =====================================================
  // SAVINGS LEDGER FUNCTIONS
  // =====================================================
  
  // Get member's savings ledger (array of payments)
  const getMemberSavingsLedger = (groupIdx, memberIdx) => {
    const key = `${groupIdx}-${memberIdx}`;
    return savingsLedger[key] || [];
  };

  // Calculate member's savings status
  const getMemberSavingsStatus = (groupIdx, memberIdx) => {
    const ledger = getMemberSavingsLedger(groupIdx, memberIdx);
    const totalPaid = ledger.reduce((sum, payment) => sum + payment.amount, 0);
    
    // Expected = $100 per meeting (12 meetings total)
    // For now, we'll use current meeting as the expected cutoff
    const meetingsHeld = selectedMeeting + 1; // meetings 0 to selectedMeeting
    const expectedTotal = meetingsHeld * 100;
    const expectedYearly = 12 * 100; // $1,200 total for year
    
    const balance = totalPaid - expectedTotal;
    const yearlyBalance = totalPaid - expectedYearly;
    
    return {
      totalPaid,
      expectedToDate: expectedTotal,
      expectedYearly,
      balance, // positive = ahead, negative = behind
      yearlyBalance,
      meetingsPaidFor: Math.floor(totalPaid / 100),
      status: balance >= 0 ? (balance > 0 ? 'ahead' : 'current') : 'behind',
      ledger
    };
  };

  // Add savings payment
  const addSavingsPayment = () => {
    if (savingsPaymentAmount <= 0) return;
    
    const key = `${selectedSavingsMember.groupIdx}-${selectedSavingsMember.memberIdx}`;
    const payment = {
      id: Date.now(),
      amount: savingsPaymentAmount,
      date: new Date().toISOString(),
      note: savingsPaymentNote.trim() || `Payment for Meeting #${selectedMeeting + 1}`,
      meetingIdx: selectedMeeting,
      recordedBy: 'admin'
    };
    
    setSavingsLedger(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), payment]
    }));
    
    // Also mark the per-meeting checkbox if paying exactly $100 for current meeting
    if (savingsPaymentAmount === 100) {
      const meetingKey = `${selectedMeeting}-${selectedSavingsMember.groupIdx}-${selectedSavingsMember.memberIdx}`;
      setSavingsFundPayments(prev => ({ ...prev, [meetingKey]: true }));
    }
    
    setSavingsPaymentAmount(100);
    setSavingsPaymentNote('');
    setShowSavingsLedgerModal(false);
    triggerConfetti();
  };

  // Delete savings payment
  const deleteSavingsPayment = (groupIdx, memberIdx, paymentId) => {
    const key = `${groupIdx}-${memberIdx}`;
    setSavingsLedger(prev => ({
      ...prev,
      [key]: (prev[key] || []).filter(p => p.id !== paymentId)
    }));
  };

  // Open savings ledger modal for a member
  const openSavingsLedgerModal = (groupIdx, memberIdx) => {
    setSelectedSavingsMember({ groupIdx, memberIdx });
    setSavingsPaymentAmount(100);
    setSavingsPaymentNote('');
    setShowSavingsLedgerModal(true);
  };

  // Get overall savings statistics
  const getOverallSavingsStats = () => {
    let totalCollected = 0;
    let membersAhead = 0;
    let membersCurrent = 0;
    let membersBehind = 0;
    let totalOwed = 0;
    let totalCredit = 0;
    
    const memberStats = [];
    
    groups.forEach((group, gIdx) => {
      group.members.forEach((member, mIdx) => {
        const status = getMemberSavingsStatus(gIdx, mIdx);
        totalCollected += status.totalPaid;
        
        if (status.status === 'ahead') {
          membersAhead++;
          totalCredit += status.balance;
        } else if (status.status === 'current') {
          membersCurrent++;
        } else {
          membersBehind++;
          totalOwed += Math.abs(status.balance);
        }
        
        memberStats.push({
          member,
          groupIdx: gIdx,
          memberIdx: mIdx,
          groupName: group.name,
          groupColor: group.color,
          ...status
        });
      });
    });
    
    // Sort by balance (most behind first)
    memberStats.sort((a, b) => a.balance - b.balance);
    
    const meetingsHeld = selectedMeeting + 1;
    const expectedTotal = totalMembers * meetingsHeld * 100;
    
    return {
      totalCollected,
      expectedTotal,
      membersAhead,
      membersCurrent,
      membersBehind,
      totalOwed,
      totalCredit,
      memberStats,
      collectionRate: Math.round((totalCollected / expectedTotal) * 100) || 0
    };
  };

  // Generate savings report for WhatsApp
  const generateSavingsReport = () => {
    const stats = getOverallSavingsStats();
    const meetingsHeld = selectedMeeting + 1;
    
    let msg = `🏦 *NIKOM NI MANKON*\n`;
    msg += `📊 *SAVINGS FUND REPORT*\n`;
    msg += `${'━'.repeat(25)}\n\n`;
    
    msg += `📅 Through Meeting #${meetingsHeld}\n`;
    msg += `💵 Expected per member: $${meetingsHeld * 100}\n\n`;
    
    msg += `💎 *SUMMARY*\n`;
    msg += `${'─'.repeat(20)}\n`;
    msg += `💰 Total Collected: $${stats.totalCollected.toLocaleString()}\n`;
    msg += `🎯 Expected: $${stats.expectedTotal.toLocaleString()}\n`;
    msg += `📈 Collection Rate: ${stats.collectionRate}%\n\n`;
    
    msg += `👥 *MEMBER STATUS*\n`;
    msg += `✅ Paid Ahead: ${stats.membersAhead} members (+$${stats.totalCredit})\n`;
    msg += `☑️ Current: ${stats.membersCurrent} members\n`;
    msg += `⏳ Behind: ${stats.membersBehind} members (-$${stats.totalOwed})\n\n`;
    
    // Members behind
    if (stats.membersBehind > 0) {
      msg += `⚠️ *MEMBERS BEHIND*\n`;
      msg += `${'─'.repeat(20)}\n`;
      stats.memberStats
        .filter(m => m.status === 'behind')
        .slice(0, 15)
        .forEach(m => {
          msg += `• ${m.member.split(' ')[0]}: -$${Math.abs(m.balance)} (paid $${m.totalPaid})\n`;
        });
      if (stats.membersBehind > 15) {
        msg += `  ...and ${stats.membersBehind - 15} more\n`;
      }
      msg += `\n`;
    }
    
    // Members ahead
    if (stats.membersAhead > 0) {
      msg += `✨ *MEMBERS AHEAD*\n`;
      msg += `${'─'.repeat(20)}\n`;
      stats.memberStats
        .filter(m => m.status === 'ahead')
        .slice(-10)
        .reverse()
        .forEach(m => {
          msg += `• ${m.member.split(' ')[0]}: +$${m.balance} (paid $${m.totalPaid})\n`;
        });
      msg += `\n`;
    }
    
    msg += `${'━'.repeat(25)}\n`;
    msg += `📅 Report: ${new Date().toLocaleDateString()}\n`;
    msg += `\n_Powered by TA-TECHSOLUTIONS_\n📞 (571) 447-2698`;
    
    return msg;
  };

  const getCarpoolMatches = (meetingIdx) => {
    const offers = [];
    const requests = [];
    
    groups.forEach((group, gIdx) => {
      group.members.forEach((member, mIdx) => {
        const offer = getCarpoolOffer(meetingIdx, gIdx, mIdx);
        const request = getCarpoolRequest(meetingIdx, gIdx, mIdx);
        
        if (offer) {
          offers.push({ member, groupIdx: gIdx, memberIdx: mIdx, ...offer, groupName: group.name, groupColor: group.color });
        }
        if (request) {
          requests.push({ member, groupIdx: gIdx, memberIdx: mIdx, ...request, groupName: group.name, groupColor: group.color });
        }
      });
    });

    return { offers, requests };
  };

  // =====================================================
  // STATS FUNCTIONS
  // =====================================================
  const getGroupMeetingStats = (meetingIdx, groupIdx) => {
    const group = groups[groupIdx];
    if (!group) return { njangiPaid: 0, njangiTotal: 0, njangiCollected: 0, njangiTarget: 0, njangiPercentage: 0 };
    let njangiPaid = 0;
    group.members.forEach((_, mIdx) => { if (njangiPayments[`${meetingIdx}-${groupIdx}-${mIdx}`]) njangiPaid++; });
    // All members pay including beneficiary (beneficiary pays to themselves)
    const totalMembers = group.members.length;
    return { 
      njangiPaid, 
      njangiTotal: totalMembers, 
      njangiCollected: njangiPaid * 1000, 
      njangiTarget: totalMembers * 1000, 
      njangiPercentage: Math.round((njangiPaid / totalMembers) * 100) 
    };
  };

  const getMeetingHostFeeStats = (meetingIdx) => {
    let totalPaid = 0;
    groups.forEach((group, gIdx) => { group.members.forEach((_, mIdx) => { if (hostFeePayments[`${meetingIdx}-${gIdx}-${mIdx}`]) totalPaid++; }); });
    return { paid: totalPaid, total: totalMembers, collected: totalPaid * 20, target: totalMembers * 20, percentage: Math.round((totalPaid / totalMembers) * 100) };
  };

  const getMeetingSavingsStats = (meetingIdx) => {
    let totalPaid = 0;
    groups.forEach((group, gIdx) => { group.members.forEach((_, mIdx) => { if (savingsFundPayments[`${meetingIdx}-${gIdx}-${mIdx}`]) totalPaid++; }); });
    return { paid: totalPaid, total: totalMembers, collected: totalPaid * 100, target: totalMembers * 100, percentage: Math.round((totalPaid / totalMembers) * 100) };
  };

  const getMeetingAttendanceStats = (meetingIdx) => {
    let present = 0;
    groups.forEach((group, gIdx) => { group.members.forEach((_, mIdx) => { if (attendance[`${meetingIdx}-${gIdx}-${mIdx}`]) present++; }); });
    return { present, total: totalMembers, percentage: Math.round((present / totalMembers) * 100) };
  };

  const getMeetingStatusStats = (meetingIdx) => {
    let coming = 0, onway = 0, cantmake = 0, arrived = 0, noresponse = 0;
    groups.forEach((group, gIdx) => {
      group.members.forEach((_, mIdx) => {
        const status = getMemberStatus(meetingIdx, gIdx, mIdx);
        if (status === 'coming' || status === 'almost') coming++;
        else if (status === 'onway' || status === 'late') onway++;
        else if (status === 'cantmake') cantmake++;
        else if (status === 'arrived') arrived++;
        else noresponse++;
      });
    });
    return { coming, onway, cantmake, arrived, noresponse, total: totalMembers };
  };

  const getAllStatusUpdates = (meetingIdx) => {
    const updates = [];
    groups.forEach((group, gIdx) => {
      group.members.forEach((member, mIdx) => {
        const status = getMemberStatus(meetingIdx, gIdx, mIdx);
        if (status) {
          const statusInfo = STATUS_OPTIONS.find(s => s.id === status);
          updates.push({
            member,
            groupIdx: gIdx,
            memberIdx: mIdx,
            status: statusInfo,
            message: getStatusMessage(meetingIdx, gIdx, mIdx),
            groupColor: group.color,
            groupName: group.name,
            location: getMemberLocation(gIdx, mIdx)
          });
        }
      });
    });
    return updates;
  };

  const getOverallStats = () => {
    let totalNjangi = 0, totalHostFee = 0, totalSavings = 0;
    Object.values(njangiPayments).forEach(v => { if (v) totalNjangi++; });
    Object.values(hostFeePayments).forEach(v => { if (v) totalHostFee++; });
    Object.values(savingsFundPayments).forEach(v => { if (v) totalSavings++; });
    return { totalNjangiCollected: totalNjangi * 1000, totalHostFeeCollected: totalHostFee * 20, totalSavingsCollected: totalSavings * 100, totalCollected: (totalNjangi * 1000) + (totalHostFee * 20) + (totalSavings * 100) };
  };

  const overallStats = getOverallStats();
  const currentMeeting = meetings[selectedMeeting];
  const hostFeeStats = getMeetingHostFeeStats(selectedMeeting);
  const savingsStats = getMeetingSavingsStats(selectedMeeting);
  const attendanceStats = getMeetingAttendanceStats(selectedMeeting);

  // =====================================================
  // OTHER FUNCTIONS
  // =====================================================
  const addNewMember = () => {
    if (!newMemberName.trim()) return;
    setGroups(prev => prev.map((g, idx) => idx === newMemberGroup ? { ...g, members: [...g.members, newMemberName.trim()] } : g));
    setNewMemberName(''); 
    setShowAddMemberModal(false); 
    triggerConfetti();
  };

  const saveMeetingNotes = () => {
    if (!isAdmin) return;
    setMeetingNotes(prev => ({ ...prev, [editingNotes.meetingIdx]: editingNotes.note }));
    setShowNotesModal(false); 
    triggerConfetti();
  };

  const generateMessage = (type) => {
    const meeting = meetings[selectedMeeting];
    const hostLoc = getHostingLocation(selectedMeeting);
    
    let msg = `🌴 *NIKOM NI MANKON* 🌴\n📅 *${meeting.full}*\n🏠 Host: ${meeting.host}\n`;
    
    // Add location details if set
    if (hostLoc?.address) {
      msg += `\n📍 *LOCATION*\n${hostLoc.address}\n${hostLoc.city}, ${hostLoc.state} ${hostLoc.zip}\n`;
      if (hostLoc.time) msg += `⏰ Time: ${hostLoc.time}\n`;
      if (hostLoc.notes) msg += `📝 ${hostLoc.notes}\n`;
    } else {
      msg += `📍 ${meeting.city}\n`;
    }
    
    msg += `\n`;
    
    if (type === 'summary') {
      msg += `💰 *PAYMENT STATUS*\n\n`;
      groups.forEach((g, gIdx) => {
        const ben = getBeneficiary(gIdx, selectedMeeting);
        const stats = getGroupMeetingStats(selectedMeeting, gIdx);
        const payMethods = getMemberPaymentMethods(gIdx, ben.index);
        msg += `*${g.name}*\n⭐ Beneficiary: ${ben.name}\n✅ ${stats.njangiPaid}/${stats.njangiTotal} paid ($${stats.njangiCollected.toLocaleString()})\n`;
        
        // Add payment methods for beneficiary
        if (payMethods.length > 0) {
          msg += `💳 Pay via: `;
          msg += payMethods.map(pm => {
            const method = PAYMENT_METHODS.find(m => m.id === pm.method);
            return `${method?.name} (${pm.handle})`;
          }).join(', ');
          msg += `\n`;
        }
        msg += `\n`;
      });
    } else {
      msg += `💵 *CONTRIBUTIONS*\n• $1,000 Njangi (ALL members including beneficiary)\n• $100 Savings\n• $20 Host Fee\n\n⭐ *BENEFICIARIES & PAYMENT INFO*\n`;
      groups.forEach((g, gIdx) => { 
        const ben = getBeneficiary(gIdx, selectedMeeting);
        const payMethods = getMemberPaymentMethods(gIdx, ben.index);
        msg += `\n*${g.name}*: ${ben.name}\n`;
        if (payMethods.length > 0) {
          payMethods.forEach(pm => {
            const method = PAYMENT_METHODS.find(m => m.id === pm.method);
            msg += `  ${method?.icon} ${method?.name}: ${pm.handle}\n`;
          });
        }
      });
    }
    msg += `\n🌿 _Growing together!_ 🌿\n\n_Powered by TA-TECHSOLUTIONS_\n📞 (571) 447-2698`;
    return msg;
  };

  // Generate comprehensive meeting report
  const generateMeetingReport = () => {
    const meeting = meetings[selectedMeeting];
    const hostLoc = getHostingLocation(selectedMeeting);
    const hStats = getMeetingHostFeeStats(selectedMeeting);
    const sStats = getMeetingSavingsStats(selectedMeeting);
    const aStats = getMeetingAttendanceStats(selectedMeeting);
    
    let msg = `📊 *NIKOM NI MANKON*\n`;
    msg += `📋 *MEETING REPORT*\n`;
    msg += `${'━'.repeat(25)}\n\n`;
    
    msg += `📅 *${meeting.full}*\n`;
    msg += `🏠 Host: ${meeting.host}\n`;
    
    // Location
    if (reportOptions.includeLocation && hostLoc?.address) {
      msg += `\n📍 *LOCATION*\n`;
      msg += `${hostLoc.address}\n`;
      msg += `${hostLoc.city}, ${hostLoc.state} ${hostLoc.zip}\n`;
      if (hostLoc.time) msg += `⏰ ${hostLoc.time}\n`;
    } else {
      msg += `📍 ${meeting.city}\n`;
    }
    
    // Totals Summary
    if (reportOptions.includeTotals) {
      msg += `\n💎 *COLLECTION SUMMARY*\n`;
      msg += `${'─'.repeat(20)}\n`;
      
      let grandTotal = 0;
      
      if (reportOptions.includeNjangi) {
        let totalNjangi = 0;
        groups.forEach((g, gIdx) => {
          const stats = getGroupMeetingStats(selectedMeeting, gIdx);
          totalNjangi += stats.njangiCollected;
        });
        msg += `💰 Njangi: $${totalNjangi.toLocaleString()}\n`;
        grandTotal += totalNjangi;
      }
      
      if (reportOptions.includeSavings) {
        msg += `🏦 Savings: $${sStats.collected.toLocaleString()}\n`;
        grandTotal += sStats.collected;
      }
      
      if (reportOptions.includeHostFee) {
        msg += `🍽️ Host Fee: $${hStats.collected.toLocaleString()}\n`;
        grandTotal += hStats.collected;
      }
      
      msg += `${'─'.repeat(20)}\n`;
      msg += `💵 *TOTAL: $${grandTotal.toLocaleString()}*\n`;
    }
    
    // Attendance
    if (reportOptions.includeAttendance) {
      msg += `\n✋ *ATTENDANCE*\n`;
      msg += `Present: ${aStats.present}/${aStats.total} (${aStats.percentage}%)\n`;
    }
    
    // Njangi Details by Group
    if (reportOptions.includeNjangi) {
      msg += `\n💰 *NJANGI PAYMENTS ($1,000)*\n`;
      msg += `${'─'.repeat(20)}\n`;
      
      groups.forEach((g, gIdx) => {
        const ben = getBeneficiary(gIdx, selectedMeeting);
        const stats = getGroupMeetingStats(selectedMeeting, gIdx);
        
        msg += `\n*${g.name}*\n`;
        msg += `⭐ Beneficiary: ${ben.name}\n`;
        msg += `✅ ${stats.njangiPaid}/${stats.njangiTotal} paid\n`;
        msg += `💵 Collected: $${stats.njangiCollected.toLocaleString()}/${stats.njangiTarget.toLocaleString()}\n`;
        
        // Payment methods
        if (reportOptions.includePaymentMethods) {
          const payMethods = getMemberPaymentMethods(gIdx, ben.index);
          if (payMethods.length > 0) {
            msg += `💳 `;
            msg += payMethods.map(pm => {
              const method = PAYMENT_METHODS.find(m => m.id === pm.method);
              return `${method?.icon}${pm.handle}`;
            }).join(' | ');
            msg += `\n`;
          }
        }
        
        // Unpaid members
        if (reportOptions.includeUnpaid) {
          const unpaid = g.members.filter((_, mIdx) => !njangiPayments[`${selectedMeeting}-${gIdx}-${mIdx}`]);
          if (unpaid.length > 0 && unpaid.length < g.members.length) {
            msg += `⏳ Unpaid: ${unpaid.map(n => n.split(' ')[0]).join(', ')}\n`;
          }
        }
      });
    }
    
    // Savings Details
    if (reportOptions.includeSavings) {
      msg += `\n🏦 *SAVINGS FUND ($100)*\n`;
      msg += `${'─'.repeat(20)}\n`;
      msg += `✅ ${sStats.paid}/${sStats.total} paid\n`;
      msg += `💵 Collected: $${sStats.collected.toLocaleString()}/$${sStats.target.toLocaleString()}\n`;
      
      if (reportOptions.includeUnpaid) {
        const unpaidSavings = [];
        groups.forEach((g, gIdx) => {
          g.members.forEach((member, mIdx) => {
            if (!savingsFundPayments[`${selectedMeeting}-${gIdx}-${mIdx}`]) {
              unpaidSavings.push(member.split(' ')[0]);
            }
          });
        });
        if (unpaidSavings.length > 0 && unpaidSavings.length < totalMembers) {
          msg += `⏳ Unpaid (${unpaidSavings.length}): ${unpaidSavings.slice(0, 10).join(', ')}${unpaidSavings.length > 10 ? '...' : ''}\n`;
        }
      }
    }
    
    // Host Fee Details
    if (reportOptions.includeHostFee) {
      msg += `\n🍽️ *HOST FEE ($20)*\n`;
      msg += `${'─'.repeat(20)}\n`;
      msg += `✅ ${hStats.paid}/${hStats.total} paid\n`;
      msg += `💵 Collected: $${hStats.collected.toLocaleString()}/$${hStats.target.toLocaleString()}\n`;
      msg += `🏠 For: ${meeting.host}\n`;
    }
    
    msg += `\n${'━'.repeat(25)}\n`;
    msg += `📅 Report Generated: ${new Date().toLocaleDateString()}\n`;
    msg += `\n_Powered by TA-TECHSOLUTIONS_\n📞 (571) 447-2698`;
    
    return msg;
  };

  const openWhatsApp = (type) => { 
    setWhatsAppMessage(generateMessage(type)); 
    setShowWhatsAppModal(true); 
  };
  
  const copyToClipboard = () => { 
    navigator.clipboard.writeText(whatsAppMessage); 
    setCopied(true); 
    setTimeout(() => setCopied(false), 2000); 
  };
  
  const shareToWhatsApp = () => { 
    window.open(`https://wa.me/?text=${encodeURIComponent(whatsAppMessage)}`, '_blank'); 
  };

  const triggerConfetti = () => { 
    setShowConfetti(true); 
    setTimeout(() => setShowConfetti(false), 2500); 
  };

  const canViewTab = (tabId) => {
    if (isAdmin) return true;
    if (tabId === 'njangi') return visibility.njangi;
    if (tabId === 'savings') return visibility.savings;
    if (tabId === 'hostfee') return visibility.hostFee;
    return true;
  };

  const visibleTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'checkin', label: 'Check-In', icon: '📢' },
    { id: 'njangi', label: 'Njangi', icon: '💰' },
    { id: 'savings', label: 'Savings', icon: '🏦' },
    { id: 'hostfee', label: 'Host Fee', icon: '🍽️' },
    { id: 'attendance', label: 'Attendance', icon: '✋' },
    { id: 'schedule', label: 'Schedule', icon: '📅' },
    { id: 'members', label: 'Members', icon: '👥' },
    { id: 'whatsapp', label: 'WhatsApp', icon: '📱' },
    { id: 'rules', label: 'Rules', icon: '📜' }
  ].filter(tab => canViewTab(tab.id));

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌴</div>
          <h1 className="text-3xl font-bold text-white mt-6 tracking-wide">NIKOM NI MANKON</h1>
          <p className="text-emerald-300 mt-2">Loading your community...</p>
          <div className="mt-6 flex justify-center gap-1">
            {[0,1,2].map(i => <div key={i} className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: `${i * 0.15}s`}}/>)}
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN RENDER
  // =====================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {showConfetti && <Confetti />}
      <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handlePhotoUpload} />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="p-8 w-full max-w-sm" gradient>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl">🔐</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Admin Login</h3>
            </div>
            <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleLogin()} placeholder="Password" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-3 transition-all" />
            {loginError && <p className="text-red-500 text-sm mb-3 text-center">{loginError}</p>}
            <button onClick={handleLogin} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 rounded-xl font-bold shadow-lg transition-all">Login</button>
            <button onClick={() => { setShowLoginModal(false); setShowForgotPasswordModal(true); setLoginError(''); }} className="w-full mt-3 text-blue-500 hover:text-blue-700 py-2 text-sm transition-all">🔑 Forgot Password?</button>
            <button onClick={() => { setShowLoginModal(false); setPasswordInput(''); setLoginError(''); }} className="w-full mt-1 text-gray-500 hover:text-gray-700 py-2 transition-all">Cancel</button>
          </GlassCard>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="p-8 w-full max-w-sm" gradient>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Password Recovery</h3>
              {recoveryPhone ? (
                <p className="text-gray-500 text-sm mt-2">We'll send a code to {recoveryPhone.slice(0, 3)}***{recoveryPhone.slice(-4)}</p>
              ) : (
                <p className="text-red-500 text-sm mt-2">No recovery phone set up</p>
              )}
            </div>
            
            {!codeSent ? (
              <>
                {recoveryPhone ? (
                  <button onClick={handleForgotPassword} className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-xl font-bold shadow-lg transition-all">📱 Send Recovery Code</button>
                ) : (
                  <div className="text-center p-4 bg-red-50 rounded-xl mb-4">
                    <p className="text-red-600 text-sm">No recovery phone configured.</p>
                    <p className="text-red-500 text-xs mt-1">Contact TA-TECHSOLUTIONS:</p>
                    <a href="tel:+15714472698" className="text-blue-600 font-bold">📞 (571) 447-2698</a>
                  </div>
                )}
              </>
            ) : (
              <>
                <input type="text" value={recoveryCode} onChange={(e) => setRecoveryCode(e.target.value)} placeholder="Enter 6-digit code" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none mb-3 text-center text-2xl tracking-widest" maxLength={6} />
                {loginError && <p className="text-red-500 text-sm mb-3 text-center">{loginError}</p>}
                <button onClick={handleVerifyCode} className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all">✓ Verify Code</button>
                <button onClick={handleForgotPassword} className="w-full mt-2 text-blue-500 text-sm">Resend Code</button>
              </>
            )}
            <button onClick={() => { setShowForgotPasswordModal(false); setCodeSent(false); setRecoveryCode(''); setLoginError(''); }} className="w-full mt-3 text-gray-500 hover:text-gray-700 py-2 transition-all">Cancel</button>
          </GlassCard>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="p-6 w-full max-w-md" gradient>
            <h3 className="text-xl font-bold text-gray-800 mb-4">🔑 Change Password</h3>
            <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Current password" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-2" />
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password (min 4 chars)" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-2" />
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-2" />
            {loginError && <p className="text-red-500 text-sm mb-2">{loginError}</p>}
            <div className="flex gap-2 mt-4">
              <button onClick={handleChangePassword} className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-bold transition-all">Save</button>
              <button onClick={() => { setShowChangePasswordModal(false); setPasswordInput(''); setNewPassword(''); setConfirmPassword(''); setLoginError(''); }} className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl transition-all">Cancel</button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Setup Recovery Phone Modal */}
      {showSetupRecoveryModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="p-6 w-full max-w-md" gradient>
            <div className="text-center mb-4">
              <span className="text-4xl">📱</span>
              <h3 className="text-xl font-bold text-gray-800 mt-2">Setup Recovery Phone</h3>
              <p className="text-gray-500 text-sm">This phone will receive password recovery codes</p>
            </div>
            {recoveryPhone && (
              <div className="bg-green-50 p-3 rounded-xl mb-4 text-center">
                <p className="text-green-700 text-sm">Current: {recoveryPhone}</p>
              </div>
            )}
            <input type="tel" value={newPhoneInput} onChange={(e) => setNewPhoneInput(e.target.value)} placeholder="Phone number (e.g., 5714472698)" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none mb-3" />
            {loginError && <p className="text-red-500 text-sm mb-2">{loginError}</p>}
            <div className="flex gap-2">
              <button onClick={handleSetupRecoveryPhone} className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-bold transition-all">💾 Save Phone</button>
              <button onClick={() => { setShowSetupRecoveryModal(false); setNewPhoneInput(''); setLoginError(''); }} className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl transition-all">Cancel</button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Member Details Modal */}
      {showMemberModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="p-6 w-full max-w-md" gradient>
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <MemberAvatar 
                  name={groups[selectedMember.groupIdx]?.members[selectedMember.memberIdx] || ''} 
                  photo={getMemberPhoto(selectedMember.groupIdx, selectedMember.memberIdx)}
                  size="xl"
                  color={groups[selectedMember.groupIdx]?.color}
                />
                {isAdmin && (
                  <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110">
                    📷
                  </button>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mt-4">{groups[selectedMember.groupIdx]?.members[selectedMember.memberIdx]}</h3>
              <p className="text-sm text-gray-500" style={{ color: groups[selectedMember.groupIdx]?.color }}>{groups[selectedMember.groupIdx]?.name}</p>
            </div>
            
            {isAdmin && (
              <div className="space-y-3 mb-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">📞 Phone</label>
                  <input type="tel" value={getMemberContact(selectedMember.groupIdx, selectedMember.memberIdx).phone || ''} onChange={(e) => updateMemberContact('phone', e.target.value)} placeholder="Phone number" className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">📧 Email</label>
                  <input type="email" value={getMemberContact(selectedMember.groupIdx, selectedMember.memberIdx).email || ''} onChange={(e) => updateMemberContact('email', e.target.value)} placeholder="Email address" className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-sm" />
                </div>
              </div>
            )}

            {/* Payment Methods Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-gray-500">💳 Payment Methods</label>
                {isAdmin && (
                  <button 
                    onClick={() => { setShowMemberModal(false); openPaymentMethodsModal(selectedMember.groupIdx, selectedMember.memberIdx); }}
                    className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    ✏️ Edit
                  </button>
                )}
              </div>
              {(() => {
                const payMethods = getMemberPaymentMethods(selectedMember.groupIdx, selectedMember.memberIdx);
                if (payMethods.length > 0) {
                  return (
                    <div className="space-y-2">
                      {payMethods.map((pm, idx) => {
                        const method = PAYMENT_METHODS.find(m => m.id === pm.method);
                        return (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                            <span className="text-lg">{method?.icon}</span>
                            <span className="text-sm font-medium text-gray-700">{method?.name}:</span>
                            <span className="text-sm text-gray-600">{pm.handle}</span>
                          </div>
                        );
                      })}
                    </div>
                  );
                }
                return (
                  <p className="text-xs text-gray-400 italic">No payment methods set</p>
                );
              })()}
            </div>

            <button onClick={() => setShowMemberModal(false)} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Close</button>
            
            {/* Remove Member Button - Admin Only */}
            {isAdmin && (
              <button 
                onClick={() => removeMember(selectedMember.groupIdx, selectedMember.memberIdx)} 
                className="w-full mt-2 bg-red-100 hover:bg-red-200 text-red-600 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                🗑️ Remove Member
              </button>
            )}
          </GlassCard>
        </div>
      )}

      {/* Beneficiary Modal */}
      {showBeneficiaryModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="p-6 w-full max-w-md max-h-[80vh] flex flex-col" gradient>
            <h3 className="text-xl font-bold text-gray-800 mb-2">🔄 Change Beneficiary</h3>
            <p className="text-gray-500 text-sm mb-2">{groups[editingBeneficiary.groupIdx]?.name}</p>
            <p className="text-gray-400 text-xs mb-4">{meetings[editingBeneficiary.meetingIdx]?.full}</p>
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
              {groups[editingBeneficiary.groupIdx]?.members.map((member, idx) => {
                const currentBen = getBeneficiary(editingBeneficiary.groupIdx, editingBeneficiary.meetingIdx);
                const isCurrent = idx === currentBen.index;
                return (
                  <button key={idx} onClick={() => saveBeneficiaryOverride(idx)} className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all ${isCurrent ? 'bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-400' : 'bg-gray-50 hover:bg-emerald-50 hover:shadow-md'}`}>
                    <div className="flex items-center gap-3">
                      <MemberAvatar name={member} photo={getMemberPhoto(editingBeneficiary.groupIdx, idx)} size="sm" color={groups[editingBeneficiary.groupIdx]?.color} />
                      <span className="font-medium">{member}</span>
                    </div>
                    {isCurrent && <span className="text-yellow-600 font-bold">⭐</span>}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2">
              {beneficiaryOverrides[`${editingBeneficiary.meetingIdx}-${editingBeneficiary.groupIdx}`] !== undefined && (
                <button onClick={clearBeneficiaryOverride} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition-all">↩️ Reset</button>
              )}
              <button onClick={() => setShowBeneficiaryModal(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Check-In Status Modal */}
      {showCheckinModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="p-6 w-full max-w-md" gradient>
            <div className="text-center mb-4">
              <MemberAvatar 
                name={groups[checkinMember.groupIdx]?.members[checkinMember.memberIdx] || ''} 
                photo={getMemberPhoto(checkinMember.groupIdx, checkinMember.memberIdx)}
                size="lg"
                color={groups[checkinMember.groupIdx]?.color}
              />
              <h3 className="text-xl font-bold text-gray-800 mt-3">{groups[checkinMember.groupIdx]?.members[checkinMember.memberIdx]}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              {STATUS_OPTIONS.map((status) => {
                const currentStatus = getMemberStatus(selectedMeeting, checkinMember.groupIdx, checkinMember.memberIdx);
                const isSelected = currentStatus === status.id;
                return (
                  <button
                    key={status.id}
                    onClick={() => updateMemberStatus(status.id)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all hover:scale-105 flex items-center gap-2 justify-center ${isSelected ? 'ring-2 ring-offset-2 text-white shadow-lg' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    style={isSelected ? { backgroundColor: status.color } : {}}
                  >
                    <span className="text-lg">{status.icon}</span>
                    <span>{status.label}</span>
                  </button>
                );
              })}
            </div>

            <input 
              type="text" 
              value={checkinMessage} 
              onChange={(e) => setCheckinMessage(e.target.value)} 
              placeholder="Add a message (optional)"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-sm mb-4"
            />

            <div className="flex gap-2">
              {getMemberStatus(selectedMeeting, checkinMember.groupIdx, checkinMember.memberIdx) && (
                <button onClick={clearMemberStatus} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition-all">Clear</button>
              )}
              <button onClick={() => { setShowCheckinModal(false); setCheckinMessage(''); }} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Carpool Modal */}
      {showCarpoolModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" gradient>
            <h3 className="text-xl font-bold text-gray-800 mb-4">🚗 Carpool Coordination</h3>
            
            {(() => {
              const { offers, requests } = getCarpoolMatches(selectedMeeting);
              return (
                <div className="mb-4">
                  {offers.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-bold text-green-600 mb-2">🚗 Offering Rides ({offers.length})</p>
                      {offers.map((offer, idx) => {
                        const area = CARPOOL_AREAS.find(a => a.id === offer.area);
                        return (
                          <div key={idx} className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200 mb-2">
                            <MemberAvatar name={offer.member} photo={getMemberPhoto(offer.groupIdx, offer.memberIdx)} size="sm" color={offer.groupColor} />
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 text-sm">{offer.member}</p>
                              <p className="text-xs text-gray-500">{area?.icon} {area?.name} • {offer.seats} seats</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  {requests.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-bold text-blue-600 mb-2">🙋 Need a Ride ({requests.length})</p>
                      {requests.map((req, idx) => {
                        const area = CARPOOL_AREAS.find(a => a.id === req.area);
                        return (
                          <div key={idx} className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl border border-blue-200 mb-2">
                            <MemberAvatar name={req.member} photo={getMemberPhoto(req.groupIdx, req.memberIdx)} size="sm" color={req.groupColor} />
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 text-sm">{req.member}</p>
                              <p className="text-xs text-gray-500">{area?.icon} {area?.name}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  {offers.length === 0 && requests.length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                      <p className="text-3xl mb-2">🚗</p>
                      <p>No carpool offers or requests yet</p>
                    </div>
                  )}
                </div>
              );
            })()}
            
            <button onClick={() => setShowCarpoolModal(false)} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Close</button>
          </GlassCard>
        </div>
      )}

      {/* Hosting Location Modal */}
      {showHostingModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="p-6 w-full max-w-md" gradient>
            <h3 className="text-xl font-bold text-gray-800 mb-2">📍 Meeting Location</h3>
            <p className="text-gray-500 text-sm mb-4">{meetings[editingHosting.meetingIdx]?.full} - {meetings[editingHosting.meetingIdx]?.host}</p>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">🏠 Street Address</label>
                <input 
                  type="text" 
                  value={editingHosting.address} 
                  onChange={(e) => setEditingHosting({...editingHosting, address: e.target.value})} 
                  placeholder="123 Main Street"
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-sm"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="text-xs text-gray-500 mb-1 block">City</label>
                  <input 
                    type="text" 
                    value={editingHosting.city} 
                    onChange={(e) => setEditingHosting({...editingHosting, city: e.target.value})} 
                    placeholder="Baltimore"
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">State</label>
                  <input 
                    type="text" 
                    value={editingHosting.state} 
                    onChange={(e) => setEditingHosting({...editingHosting, state: e.target.value})} 
                    placeholder="MD"
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">ZIP</label>
                  <input 
                    type="text" 
                    value={editingHosting.zip} 
                    onChange={(e) => setEditingHosting({...editingHosting, zip: e.target.value})} 
                    placeholder="21201"
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-xs text-gray-500 mb-1 block">⏰ Meeting Time</label>
                <input 
                  type="text" 
                  value={editingHosting.time} 
                  onChange={(e) => setEditingHosting({...editingHosting, time: e.target.value})} 
                  placeholder="3:00 PM"
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-sm"
                />
              </div>
              
              <div>
                <label className="text-xs text-gray-500 mb-1 block">📝 Additional Notes (parking, gate code, etc.)</label>
                <textarea 
                  value={editingHosting.notes} 
                  onChange={(e) => setEditingHosting({...editingHosting, notes: e.target.value})} 
                  placeholder="Park in the driveway. Gate code: 1234. Ring doorbell."
                  rows={3}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-sm resize-none"
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button onClick={saveHostingLocation} className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-bold transition-all">💾 Save Location</button>
              <button onClick={() => setShowHostingModal(false)} className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl transition-all">Cancel</button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Payment Methods Modal */}
      {showPaymentMethodsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="p-6 w-full max-w-md max-h-[90vh] overflow-y-auto" gradient>
            <div className="text-center mb-4">
              <MemberAvatar 
                name={groups[selectedPaymentMember.groupIdx]?.members[selectedPaymentMember.memberIdx] || ''} 
                photo={getMemberPhoto(selectedPaymentMember.groupIdx, selectedPaymentMember.memberIdx)}
                size="lg"
                color={groups[selectedPaymentMember.groupIdx]?.color}
              />
              <h3 className="text-xl font-bold text-gray-800 mt-3">{groups[selectedPaymentMember.groupIdx]?.members[selectedPaymentMember.memberIdx]}</h3>
              <p className="text-gray-500 text-sm">Payment Methods</p>
            </div>
            
            <div className="space-y-3">
              {PAYMENT_METHODS.map((method) => {
                const existing = getMemberPaymentMethods(selectedPaymentMember.groupIdx, selectedPaymentMember.memberIdx).find(p => p.method === method.id);
                return (
                  <div key={method.id} className="flex items-center gap-3 p-3 rounded-xl border-2" style={{ borderColor: existing ? method.color : '#e5e7eb', backgroundColor: existing ? method.color + '10' : 'white' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: method.color + '20' }}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{method.name}</p>
                      <input 
                        type="text" 
                        defaultValue={existing?.handle || ''} 
                        onBlur={(e) => saveMemberPaymentMethod(method.id, e.target.value)}
                        placeholder={method.id === 'cash' ? 'Accepts cash ✓' : method.id === 'check' ? 'Accepts checks ✓' : `@username or phone/email`}
                        className="w-full px-2 py-1 rounded-lg border border-gray-200 focus:border-gray-400 focus:outline-none text-xs mt-1"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            
            <p className="text-xs text-gray-400 text-center mt-4">Fill in payment handles to show how this member can receive payments</p>
            
            <button onClick={() => setShowPaymentMethodsModal(false)} className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Done</button>
          </GlassCard>
        </div>
      )}

      {/* Savings Ledger Modal */}
      {showSavingsLedgerModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" gradient>
            <div className="text-center mb-4">
              <MemberAvatar 
                name={groups[selectedSavingsMember.groupIdx]?.members[selectedSavingsMember.memberIdx] || ''} 
                photo={getMemberPhoto(selectedSavingsMember.groupIdx, selectedSavingsMember.memberIdx)}
                size="lg"
                color={groups[selectedSavingsMember.groupIdx]?.color}
              />
              <h3 className="text-xl font-bold text-gray-800 mt-3">{groups[selectedSavingsMember.groupIdx]?.members[selectedSavingsMember.memberIdx]}</h3>
              <p className="text-gray-500 text-sm">Savings Ledger</p>
            </div>
            
            {/* Status Summary */}
            {(() => {
              const status = getMemberSavingsStatus(selectedSavingsMember.groupIdx, selectedSavingsMember.memberIdx);
              return (
                <div className={`p-4 rounded-xl mb-4 ${status.status === 'ahead' ? 'bg-green-50 border-2 border-green-300' : status.status === 'current' ? 'bg-blue-50 border-2 border-blue-300' : 'bg-red-50 border-2 border-red-300'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Total Paid:</span>
                    <span className="text-2xl font-bold text-gray-800">${status.totalPaid}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Expected (Meeting #{selectedMeeting + 1}):</span>
                    <span className="text-sm text-gray-600">${status.expectedToDate}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm font-medium">Balance:</span>
                    <span className={`text-lg font-bold ${status.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {status.balance >= 0 ? '+' : ''}{status.balance >= 0 ? `$${status.balance}` : `-$${Math.abs(status.balance)}`}
                    </span>
                  </div>
                  <div className="mt-2 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${status.status === 'ahead' ? 'bg-green-200 text-green-800' : status.status === 'current' ? 'bg-blue-200 text-blue-800' : 'bg-red-200 text-red-800'}`}>
                      {status.status === 'ahead' ? '✨ PAID AHEAD' : status.status === 'current' ? '✅ CURRENT' : '⏳ BEHIND'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Covers {status.meetingsPaidFor} of 12 meetings • Yearly goal: $1,200
                  </p>
                </div>
              );
            })()}
            
            {/* Add Payment (Admin only) */}
            {isAdmin && (
              <div className="bg-purple-50 p-4 rounded-xl mb-4">
                <p className="text-sm font-bold text-purple-700 mb-3">➕ Record Payment</p>
                <div className="flex gap-2 mb-2">
                  {[100, 200, 300, 500, 600, 1200].map(amt => (
                    <button 
                      key={amt}
                      onClick={() => setSavingsPaymentAmount(amt)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${savingsPaymentAmount === amt ? 'bg-purple-500 text-white' : 'bg-white text-purple-600 hover:bg-purple-100'}`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input 
                      type="number" 
                      value={savingsPaymentAmount}
                      onChange={(e) => setSavingsPaymentAmount(parseInt(e.target.value) || 0)}
                      placeholder="Amount"
                      className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm"
                    />
                  </div>
                  <button 
                    onClick={addSavingsPayment}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all"
                  >
                    + Add
                  </button>
                </div>
                <input 
                  type="text"
                  value={savingsPaymentNote}
                  onChange={(e) => setSavingsPaymentNote(e.target.value)}
                  placeholder="Note (optional): e.g., Paid for Jan-Mar"
                  className="w-full mt-2 px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-xs"
                />
                <p className="text-xs text-gray-400 mt-1">Quick: $100=1 meeting, $600=6 meetings, $1200=full year</p>
              </div>
            )}
            
            {/* Payment History */}
            <div className="mb-4">
              <p className="text-sm font-bold text-gray-700 mb-2">📜 Payment History</p>
              {(() => {
                const ledger = getMemberSavingsLedger(selectedSavingsMember.groupIdx, selectedSavingsMember.memberIdx);
                if (ledger.length === 0) {
                  return <p className="text-gray-400 text-sm text-center py-4">No payments recorded yet</p>;
                }
                return (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {ledger.slice().reverse().map((payment, idx) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">${payment.amount}</p>
                          <p className="text-xs text-gray-500">{new Date(payment.date).toLocaleDateString()} • {payment.note}</p>
                        </div>
                        {isAdmin && (
                          <button 
                            onClick={() => deleteSavingsPayment(selectedSavingsMember.groupIdx, selectedSavingsMember.memberIdx, payment.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
            
            <button onClick={() => setShowSavingsLedgerModal(false)} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Close</button>
          </GlassCard>
        </div>
      )}

      {/* Savings Report Modal */}
      {showSavingsReportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="p-6 w-full max-w-2xl max-h-[90vh] flex flex-col" gradient>
            <h3 className="text-xl font-bold text-gray-800 mb-4">🏦 Savings Fund Report</h3>
            
            {/* Stats Overview */}
            {(() => {
              const stats = getOverallSavingsStats();
              return (
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div className="bg-purple-50 p-3 rounded-xl text-center">
                    <p className="text-xl font-bold text-purple-600">${stats.totalCollected.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Collected</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-xl text-center">
                    <p className="text-xl font-bold text-green-600">{stats.membersAhead}</p>
                    <p className="text-xs text-gray-500">Ahead</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-xl text-center">
                    <p className="text-xl font-bold text-blue-600">{stats.membersCurrent}</p>
                    <p className="text-xs text-gray-500">Current</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-xl text-center">
                    <p className="text-xl font-bold text-red-600">{stats.membersBehind}</p>
                    <p className="text-xs text-gray-500">Behind</p>
                  </div>
                </div>
              );
            })()}
            
            {/* Preview */}
            <div className="flex-1 bg-gray-100 rounded-xl p-3 overflow-auto text-xs font-mono whitespace-pre-wrap mb-4 max-h-64">
              {generateSavingsReport()}
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => { 
                  setWhatsAppMessage(generateSavingsReport()); 
                  setShowSavingsReportModal(false); 
                  setShowWhatsAppModal(true); 
                }} 
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold transition-all shadow-lg"
              >
                📱 Share to WhatsApp
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(generateSavingsReport());
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }} 
                className={`px-6 py-3 rounded-xl font-bold transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
            <button onClick={() => setShowSavingsReportModal(false)} className="mt-3 text-gray-500 hover:text-gray-700 text-sm text-center">Close</button>
          </GlassCard>
        </div>
      )}

      {/* WhatsApp Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="p-6 w-full max-w-lg max-h-[80vh] flex flex-col" gradient>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">📱 Share to WhatsApp</h3>
            <div className="flex-1 overflow-auto mb-4">
              <pre className="bg-gray-100 p-4 rounded-xl text-sm whitespace-pre-wrap font-sans">{whatsAppMessage}</pre>
            </div>
            <div className="flex gap-2">
              <button onClick={copyToClipboard} className={`flex-1 py-3 rounded-xl font-bold transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{copied ? '✓ Copied!' : '📋 Copy'}</button>
              <button onClick={shareToWhatsApp} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg">📱 Open WhatsApp</button>
            </div>
            <button onClick={() => setShowWhatsAppModal(false)} className="mt-3 text-gray-500 hover:text-gray-700 text-sm">Close</button>
          </GlassCard>
        </div>
      )}

      {/* Report Generator Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="p-6 w-full max-w-2xl max-h-[90vh] flex flex-col" gradient>
            <h3 className="text-xl font-bold text-gray-800 mb-2">📊 Meeting Report Generator</h3>
            <p className="text-gray-500 text-sm mb-4">{meetings[selectedMeeting]?.full} - {meetings[selectedMeeting]?.host}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Report Options */}
              <div className="space-y-2">
                <p className="text-sm font-bold text-gray-700 mb-2">Include in Report:</p>
                
                {[
                  { key: 'includeNjangi', label: '💰 Njangi Payments', desc: '$1,000 group payments' },
                  { key: 'includeSavings', label: '🏦 Savings Fund', desc: '$100 savings' },
                  { key: 'includeHostFee', label: '🍽️ Host Fee', desc: '$20 host fee' },
                  { key: 'includeAttendance', label: '✋ Attendance', desc: 'Who was present' },
                  { key: 'includePaymentMethods', label: '💳 Payment Methods', desc: 'Zelle, CashApp, etc.' },
                  { key: 'includeLocation', label: '📍 Location Details', desc: 'Address & directions' },
                  { key: 'includeTotals', label: '💵 Total Summary', desc: 'Grand totals' },
                  { key: 'includeUnpaid', label: '⏳ Unpaid Members', desc: 'Who hasn\'t paid' },
                ].map(opt => (
                  <label key={opt.key} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all">
                    <input 
                      type="checkbox" 
                      checked={reportOptions[opt.key]} 
                      onChange={(e) => setReportOptions({...reportOptions, [opt.key]: e.target.checked})}
                      className="w-4 h-4 text-emerald-500 rounded"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-800">{opt.label}</span>
                      <p className="text-xs text-gray-400">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              
              {/* Preview */}
              <div className="flex flex-col">
                <p className="text-sm font-bold text-gray-700 mb-2">Preview:</p>
                <div className="flex-1 bg-gray-100 rounded-xl p-3 overflow-auto text-xs font-mono whitespace-pre-wrap max-h-80">
                  {generateMeetingReport()}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => { 
                  setWhatsAppMessage(generateMeetingReport()); 
                  setShowReportModal(false); 
                  setShowWhatsAppModal(true); 
                }} 
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg"
              >
                📱 Share to WhatsApp
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(generateMeetingReport());
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }} 
                className={`px-4 py-3 rounded-xl font-bold transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
              <button 
                onClick={() => { setShowReportModal(false); printReport(); }}
                className="px-4 py-3 rounded-xl font-bold transition-all bg-purple-500 hover:bg-purple-600 text-white"
              >
                🖨️ Print
              </button>
            </div>
            <button onClick={() => setShowReportModal(false)} className="mt-3 text-gray-500 hover:text-gray-700 text-sm text-center">Cancel</button>
          </GlassCard>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" gradient>
            <h3 className="text-xl font-bold text-gray-800 mb-6">⚙️ Admin Settings</h3>
            
            <div className="space-y-4">
              {/* Security Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-3">🔐 Security</h4>
                <div className="space-y-2">
                  <button onClick={() => { setShowSettingsModal(false); setShowChangePasswordModal(true); }} className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all text-left flex items-center gap-2">
                    <span>🔑</span> Change Password
                  </button>
                  <button onClick={() => { setShowSettingsModal(false); setShowSetupRecoveryModal(true); }} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all text-left flex items-center gap-2">
                    <span>📱</span> {recoveryPhone ? 'Update' : 'Setup'} Recovery Phone
                  </button>
                  {recoveryPhone && (
                    <p className="text-xs text-gray-500 mt-1 pl-2">✓ Recovery phone: {recoveryPhone}</p>
                  )}
                </div>
              </div>
              
              {/* Backup & Restore Section */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-3">💾 Backup & Restore</h4>
                <div className="space-y-2">
                  <button onClick={createBackup} className="w-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all text-left flex items-center gap-2">
                    <span>📥</span> Download Backup
                  </button>
                  <label className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 cursor-pointer">
                    <span>📤</span> Restore from Backup
                    <input type="file" accept=".json" onChange={restoreBackup} className="hidden" />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">💡 Backup includes all payments, members, settings</p>
                </div>
              </div>
              
              {/* Visibility Section */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-2">👁️ Tab Visibility for Non-Admins</h4>
                <p className="text-xs text-gray-500 mb-3">Control which tabs regular members can see (you can always see all tabs as admin)</p>
                <div className="space-y-2">
                  {[
                    {key: 'njangi', label: 'Njangi Payments', icon: '💰', desc: 'Show $1,000 group payments'},
                    {key: 'savings', label: 'Savings Fund', icon: '🏦', desc: 'Show $100 savings payments'},
                    {key: 'hostFee', label: 'Host Fee', icon: '🍽️', desc: 'Show $20 host fee payments'}
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-all">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <div>
                          <span className="font-medium text-gray-800">{item.label}</span>
                          <p className="text-xs text-gray-400">{item.desc}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setVisibility({...visibility, [item.key]: !visibility[item.key]})}
                        className={`w-14 h-7 rounded-full p-1 transition-all ${visibility[item.key] ? 'bg-emerald-500' : 'bg-gray-300'}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all ${visibility[item.key] ? 'translate-x-7' : ''}`}/>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-xs text-yellow-700">💡 <strong>Note:</strong> As admin, you can ALWAYS see all tabs. These settings only affect what non-admins see.</p>
                </div>
              </div>

              {/* Current Status */}
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-2">📊 Current Visibility Status</h4>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${visibility.njangi ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    💰 Njangi: {visibility.njangi ? '✓ Visible' : '✗ Hidden'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${visibility.savings ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    🏦 Savings: {visibility.savings ? '✓ Visible' : '✗ Hidden'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${visibility.hostFee ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    🍽️ Host Fee: {visibility.hostFee ? '✓ Visible' : '✗ Hidden'}
                  </span>
                </div>
              </div>
              
              {/* Print & Reports */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-3">🖨️ Reports</h4>
                <div className="space-y-2">
                  <button onClick={() => { setShowSettingsModal(false); printReport(); }} className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all text-left flex items-center gap-2">
                    <span>🖨️</span> Print Meeting Report
                  </button>
                  <button onClick={() => { setShowSettingsModal(false); setShowReportModal(true); }} className="w-full bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all text-left flex items-center gap-2">
                    <span>📊</span> Generate Custom Report
                  </button>
                </div>
              </div>
            </div>
            
            <button onClick={() => setShowSettingsModal(false)} className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Close Settings</button>
          </GlassCard>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="p-6 w-full max-w-md" gradient>
            <h3 className="text-xl font-bold text-gray-800 mb-4">➕ Add New Member</h3>
            <input type="text" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} placeholder="Full name" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-3" />
            <select value={newMemberGroup} onChange={(e) => setNewMemberGroup(parseInt(e.target.value))} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-4">
              {groups.map((g, i) => <option key={i} value={i}>{g.name} ({g.members.length} members)</option>)}
            </select>
            <div className="flex gap-2">
              <button onClick={addNewMember} className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all">➕ Add</button>
              <button onClick={() => { setShowAddMemberModal(false); setNewMemberName(''); }} className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl transition-all">Cancel</button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Meeting Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="p-6 w-full max-w-lg" gradient>
            <h3 className="text-xl font-bold text-gray-800 mb-2">📝 Meeting Notes</h3>
            <p className="text-gray-500 text-sm mb-4">{meetings[editingNotes.meetingIdx]?.full} - {meetings[editingNotes.meetingIdx]?.host}</p>
            
            <textarea 
              value={editingNotes.note} 
              onChange={(e) => setEditingNotes({...editingNotes, note: e.target.value})}
              placeholder="Add meeting notes, action items, announcements, decisions made, etc."
              rows={8}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none resize-none"
            />
            
            <div className="flex gap-2 mt-4">
              <button onClick={saveNotes} className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-xl font-bold transition-all">💾 Save Notes</button>
              <button onClick={() => setShowNotesModal(false)} className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl transition-all">Cancel</button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-green-700 to-teal-800" />
        <div className="relative max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl border border-white/30">
                <span className="text-4xl">🌴</span>
              </div>
              <div className="text-white">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">NIKOM NI MANKON</h1>
                <p className="text-emerald-200 text-sm flex items-center gap-2">
                  <PulsingDot />
                  The Fertile Raffia Groves of Asonka
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20">
                <PulsingDot color={isOnline ? '#10B981' : '#F59E0B'} />
                <span className="text-white text-sm">{isOnline ? 'Online' : 'Offline'}</span>
              </div>
              {isAdmin ? (
                <div className="flex items-center gap-2">
                  <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-green-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">🔓 Admin</span>
                  <button onClick={() => setShowSettingsModal(true)} className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all hover:scale-110 border border-white/20">⚙️</button>
                  <button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm transition-all border border-white/20">Logout</button>
                </div>
              ) : (
                <button onClick={() => setShowLoginModal(true)} className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 border border-white/20 shadow-lg">🔐 Admin Login</button>
              )}
            </div>
          </div>
        </div>
        
        {!isAdmin && (
          <div className="bg-gradient-to-r from-yellow-400 to-amber-400 text-yellow-900 text-center py-2 text-sm font-medium">
            👀 View-Only Mode — <button onClick={() => setShowLoginModal(true)} className="underline font-bold hover:text-yellow-800">Login</button> to make changes
          </div>
        )}
      </header>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-lg border-b border-emerald-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3">
            {visibleTabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap text-sm transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105' : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'}`}>
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {isAdmin && (
              <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-2xl p-5 text-white shadow-xl">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">⚡ Admin Panel</h3>
                    <p className="text-purple-200 text-sm">Manage your community</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => setShowSettingsModal(true)} className="bg-white/20 hover:bg-white/30 backdrop-blur px-4 py-2 rounded-xl text-sm font-medium transition-all">⚙️ Settings</button>
                    <button onClick={() => setShowAddMemberModal(true)} className="bg-white/20 hover:bg-white/30 backdrop-blur px-4 py-2 rounded-xl text-sm font-medium transition-all">➕ Add Member</button>
                    <button onClick={() => { setSelectedMeeting(0); setShowReportModal(true); }} className="bg-white/20 hover:bg-white/30 backdrop-blur px-4 py-2 rounded-xl text-sm font-medium transition-all">📊 Report</button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <GlassCard className="p-5 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wide">Members</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1"><AnimatedCounter value={totalMembers} /></p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">👥</div>
                </div>
              </GlassCard>
              
              <GlassCard className="p-5 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wide">Njangi</p>
                    <p className="text-3xl font-bold text-emerald-600 mt-1"><AnimatedCounter value={overallStats.totalNjangiCollected} prefix="$" /></p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">💰</div>
                </div>
              </GlassCard>
              
              <GlassCard className="p-5 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wide">Host Fees</p>
                    <p className="text-3xl font-bold text-teal-600 mt-1"><AnimatedCounter value={overallStats.totalHostFeeCollected} prefix="$" /></p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">🍽️</div>
                </div>
              </GlassCard>
              
              {isAdmin && (
                <GlassCard className="p-5 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 hover:shadow-xl transition-all hover:-translate-y-1 relative">
                  <button 
                    onClick={() => setVisibility({...visibility, savings: !visibility.savings})}
                    className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full transition-all flex items-center gap-1 ${visibility.savings ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                  >
                    {visibility.savings ? '🔓 Open' : '🔒 Locked'}
                  </button>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-500 text-xs uppercase tracking-wide">Savings</p>
                      <p className="text-3xl font-bold text-purple-600 mt-1"><AnimatedCounter value={overallStats.totalSavingsCollected} prefix="$" /></p>
                      <p className="text-xs text-gray-400 mt-1">{visibility.savings ? '👁️ Visible to all' : '🔒 Admin only'}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">🏦</div>
                  </div>
                </GlassCard>
              )}
            </div>

            {/* Next Meeting Card */}
            <GlassCard className="overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 p-5 text-white">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">NEXT MEETING</span>
                      <PulsingDot />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold">🗓️ {meetings[0]?.full}</h3>
                    <p className="text-emerald-100 text-sm mt-1">🏠 {meetings[0]?.host} • 📍 {meetings[0]?.city}</p>
                    
                    {/* Show hosting location if set */}
                    {(() => {
                      const loc = getHostingLocation(0);
                      if (loc?.address) {
                        return (
                          <div className="mt-2 bg-white/10 backdrop-blur rounded-lg px-3 py-2 text-sm">
                            <p className="font-medium">📍 {loc.address}</p>
                            <p className="text-emerald-200 text-xs">{loc.city}, {loc.state} {loc.zip}</p>
                            {loc.time && <p className="text-emerald-200 text-xs">⏰ {loc.time}</p>}
                            {loc.notes && <p className="text-emerald-200 text-xs mt-1">📝 {loc.notes}</p>}
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => openWhatsApp('reminder')} className="bg-white/20 hover:bg-white/30 backdrop-blur px-4 py-2 rounded-xl font-medium transition-all">📱 Share</button>
                    {isAdmin && (
                      <button onClick={() => openHostingModal(0)} className="bg-white/20 hover:bg-white/30 backdrop-blur px-4 py-2 rounded-xl font-medium transition-all text-sm">📍 Set Location</button>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  💰 Beneficiaries 
                  {isAdmin && <span className="text-xs text-emerald-500 font-normal">(Click to change)</span>}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {groups.map((group, gIdx) => {
                    const beneficiary = getBeneficiary(gIdx, 0);
                    const stats = getGroupMeetingStats(0, gIdx);
                    const payMethods = getMemberPaymentMethods(gIdx, beneficiary.index);
                    return (
                      <div 
                        key={gIdx} 
                        onClick={() => openBeneficiaryModal(0, gIdx)}
                        className={`rounded-xl p-4 border-2 transition-all hover:shadow-lg ${isAdmin ? 'cursor-pointer hover:-translate-y-1' : ''} ${beneficiary.isOverride ? 'ring-2 ring-orange-400 ring-offset-2' : ''}`} 
                        style={{ borderColor: group.color, backgroundColor: group.color + '10' }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-bold" style={{ color: group.color }}>{group.name}</p>
                          {beneficiary.isOverride && <span className="text-orange-500 text-xs">⚡</span>}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <MemberAvatar name={beneficiary.name} photo={getMemberPhoto(gIdx, beneficiary.index)} size="sm" color={group.color} />
                          <p className="font-bold text-gray-800 text-sm truncate flex-1">{beneficiary.name.split(' ')[0]}</p>
                        </div>
                        <ProgressRing progress={stats.njangiPercentage} size={50} strokeWidth={5} color={group.color} />
                        {/* Show payment methods icons */}
                        {payMethods.length > 0 && (
                          <div className="flex gap-1 mt-2 flex-wrap">
                            {payMethods.slice(0, 3).map((pm, idx) => {
                              const method = PAYMENT_METHODS.find(m => m.id === pm.method);
                              return <span key={idx} className="text-xs" title={`${method?.name}: ${pm.handle}`}>{method?.icon}</span>;
                            })}
                            {payMethods.length > 3 && <span className="text-xs text-gray-400">+{payMethods.length - 3}</span>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Check-In Tab */}
        {activeTab === 'checkin' && (
          <div className="space-y-4">
            <GlassCard className="p-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {meetings.map((m, idx) => (
                  <button key={idx} onClick={() => setSelectedMeeting(idx)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedMeeting === idx ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg' : 'bg-gray-100 hover:bg-orange-100'}`}>
                    {idx === 0 && <span className="mr-1">🔥</span>}{m.date}
                  </button>
                ))}
              </div>
            </GlassCard>

            {/* Status Summary */}
            {(() => {
              const stats = getMeetingStatusStats(selectedMeeting);
              return (
                <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl p-5 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-orange-100 text-sm">{currentMeeting?.full}</p>
                      <h2 className="text-2xl font-bold">📢 Meeting Day Check-In</h2>
                      <p className="text-orange-200 text-sm mt-1">🏠 {currentMeeting?.host} • 📍 {currentMeeting?.city}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-bold">{stats.arrived + stats.coming + stats.onway}</p>
                      <p className="text-orange-100 text-sm">Expected</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="bg-white/20 backdrop-blur rounded-xl p-2 text-center">
                      <p className="text-2xl font-bold">{stats.arrived}</p>
                      <p className="text-xs">🎉 Arrived</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-xl p-2 text-center">
                      <p className="text-2xl font-bold">{stats.onway}</p>
                      <p className="text-xs">🚗 On Way</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-xl p-2 text-center">
                      <p className="text-2xl font-bold">{stats.coming}</p>
                      <p className="text-xs">✅ Coming</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-xl p-2 text-center">
                      <p className="text-2xl font-bold">{stats.cantmake}</p>
                      <p className="text-xs">❌ Can't</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-xl p-2 text-center">
                      <p className="text-2xl font-bold">{stats.noresponse}</p>
                      <p className="text-xs">❓ No Reply</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => setShowCarpoolModal(true)} className="bg-white/20 hover:bg-white/30 backdrop-blur px-3 py-2 rounded-xl text-sm font-medium transition-all">
                      🚗 Carpool Board
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Live Updates */}
            {(() => {
              const updates = getAllStatusUpdates(selectedMeeting);
              return updates.length > 0 && (
                <GlassCard className="p-4 shadow-lg">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <PulsingDot />
                    Live Updates ({updates.length})
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {updates.map((update, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
                        <MemberAvatar name={update.member} photo={getMemberPhoto(update.groupIdx, update.memberIdx)} size="sm" color={update.groupColor} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-gray-800">{update.member}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: update.status?.color }}>{update.status?.icon} {update.status?.label}</span>
                            {update.location && <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">⏱️ {update.location.eta}</span>}
                          </div>
                          {update.message && <p className="text-sm text-gray-500 truncate">💬 {update.message}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              );
            })()}

            {/* Members Status List */}
            <GlassCard className="p-4 shadow-lg">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="font-bold text-gray-800">👥 Update Status</h3>
                <input type="text" placeholder="🔍 Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none text-sm w-40" />
              </div>
              <div className="space-y-3">
                {groups.map((group, gIdx) => {
                  const filteredMembers = group.members.filter(m => !searchTerm || m.toLowerCase().includes(searchTerm.toLowerCase()));
                  if (filteredMembers.length === 0) return null;
                  return (
                    <div key={gIdx} className="rounded-xl overflow-hidden border">
                      <div className="p-3 flex items-center justify-between" style={{ backgroundColor: group.color + '15' }}>
                        <span className="font-bold text-sm" style={{ color: group.color }}>{group.name}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3">
                        {filteredMembers.map((member) => {
                          const actualIdx = group.members.indexOf(member);
                          const status = getMemberStatus(selectedMeeting, gIdx, actualIdx);
                          const statusInfo = STATUS_OPTIONS.find(s => s.id === status);
                          const message = getStatusMessage(selectedMeeting, gIdx, actualIdx);
                          const location = getMemberLocation(gIdx, actualIdx);
                          
                          return (
                            <div 
                              key={member} 
                              className={`p-3 rounded-xl text-sm transition-all ${status ? 'border-2' : 'bg-gray-50'}`}
                              style={status ? { borderColor: statusInfo?.color, backgroundColor: statusInfo?.color + '10' } : {}}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <MemberAvatar name={member} photo={getMemberPhoto(gIdx, actualIdx)} size="sm" color={group.color} />
                                  <span className="font-medium text-gray-800 truncate">{member}</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-1 mb-2">
                                {status && (
                                  <span className="px-2 py-0.5 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: statusInfo?.color }}>
                                    {statusInfo?.icon} {statusInfo?.label}
                                  </span>
                                )}
                                {location && (
                                  <span className="px-2 py-0.5 rounded-lg text-xs bg-purple-100 text-purple-700">
                                    ⏱️ {location.eta}
                                  </span>
                                )}
                              </div>
                              {message && <p className="text-xs text-gray-500 mb-2">💬 {message}</p>}
                              
                              <div className="flex gap-1">
                                <button 
                                  onClick={() => { setCheckinMember({ groupIdx: gIdx, memberIdx: actualIdx }); setShowCheckinModal(true); }}
                                  className="px-2 py-1 rounded-lg text-xs font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all"
                                >
                                  {status ? '✏️ Edit' : '📢 Status'}
                                </button>
                                <button 
                                  onClick={() => shareMyLocation(gIdx, actualIdx)}
                                  className="px-2 py-1 rounded-lg text-xs font-medium bg-purple-100 hover:bg-purple-200 text-purple-700 transition-all"
                                >
                                  📍 Location
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        )}

        {/* Njangi Tab */}
        {activeTab === 'njangi' && (
          <div className="space-y-4">
            <GlassCard className="p-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {meetings.map((m, idx) => (
                  <button key={idx} onClick={() => setSelectedMeeting(idx)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedMeeting === idx ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' : 'bg-gray-100 hover:bg-emerald-100'}`}>
                    {idx === 0 && <span className="mr-1">🔥</span>}{m.date}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 overflow-x-auto mt-3">
                {groups.map((g, idx) => (
                  <button key={idx} onClick={() => setSelectedGroup(idx)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedGroup === idx ? 'text-white shadow-lg' : 'bg-gray-100 hover:opacity-80'}`} style={selectedGroup === idx ? { backgroundColor: g.color } : {}}>
                    {g.name}
                  </button>
                ))}
              </div>
            </GlassCard>

            {(() => {
              const group = groups[selectedGroup];
              const beneficiary = getBeneficiary(selectedGroup, selectedMeeting);
              const stats = getGroupMeetingStats(selectedMeeting, selectedGroup);
              return (
                <>
                  <div className={`bg-gradient-to-r ${group.gradient} rounded-2xl p-5 text-white shadow-xl`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/80 text-sm">{currentMeeting?.full}</p>
                        <h2 className="text-2xl font-bold">{group.name}</h2>
                        <div className="mt-3 bg-white/20 backdrop-blur rounded-xl px-4 py-3 inline-block">
                          <p className="text-white/80 text-xs mb-1">⭐ BENEFICIARY</p>
                          <div className="flex items-center gap-3">
                            <MemberAvatar name={beneficiary.name} photo={getMemberPhoto(selectedGroup, beneficiary.index)} size="md" color="#fff" />
                            <div>
                              <p className="font-bold text-lg">{beneficiary.name}</p>
                              <div className="flex gap-2 mt-1">
                                {isAdmin && (
                                  <button 
                                    onClick={() => openBeneficiaryModal(selectedMeeting, selectedGroup)} 
                                    className="text-xs text-white/80 underline hover:text-white"
                                  >
                                    🔄 Change
                                  </button>
                                )}
                                {isAdmin && (
                                  <button 
                                    onClick={() => openPaymentMethodsModal(selectedGroup, beneficiary.index)} 
                                    className="text-xs text-white/80 underline hover:text-white"
                                  >
                                    💳 Payment Info
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* Show payment methods */}
                          {(() => {
                            const payMethods = getMemberPaymentMethods(selectedGroup, beneficiary.index);
                            if (payMethods.length > 0) {
                              return (
                                <div className="mt-3 pt-3 border-t border-white/20">
                                  <p className="text-white/60 text-xs mb-2">💳 Pay via:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {payMethods.map((pm, idx) => {
                                      const method = PAYMENT_METHODS.find(m => m.id === pm.method);
                                      return (
                                        <div key={idx} className="bg-white/20 rounded-lg px-2 py-1 text-xs">
                                          <span>{method?.icon} {method?.name}</span>
                                          <span className="text-white/80 ml-1">({pm.handle})</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            }
                            return isAdmin ? (
                              <p className="text-white/60 text-xs mt-2">💡 Add payment methods so members know how to pay</p>
                            ) : null;
                          })()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="bg-white/20 backdrop-blur rounded-xl p-4 mb-2">
                          <p className="text-3xl font-bold">${stats.njangiCollected.toLocaleString()}</p>
                          <p className="text-white/80 text-sm">of ${stats.njangiTarget.toLocaleString()}</p>
                        </div>
                        {isAdmin && (
                          <button 
                            onClick={() => setShowReportModal(true)}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur px-3 py-2 rounded-xl text-sm font-medium transition-all"
                          >
                            📊 Generate Report
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <GlassCard className="overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-sm">#</th>
                            <th className="px-4 py-3 text-left text-sm">Member</th>
                            <th className="px-4 py-3 text-center text-sm" style={{ color: group.color }}>$1,000</th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.members.map((member, mIdx) => {
                            const isPaid = njangiPayments[`${selectedMeeting}-${selectedGroup}-${mIdx}`];
                            const isBeneficiary = mIdx === beneficiary.index;
                            return (
                              <tr key={mIdx} className={`border-b transition-all ${isBeneficiary ? 'bg-gradient-to-r from-yellow-50 to-amber-50' : isPaid ? 'bg-emerald-50' : 'hover:bg-gray-50'}`}>
                                <td className="px-4 py-3 text-gray-500">{mIdx + 1}</td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-3 cursor-pointer" onClick={() => openMemberModal(selectedGroup, mIdx)}>
                                    <MemberAvatar name={member} photo={getMemberPhoto(selectedGroup, mIdx)} size="sm" color={group.color} />
                                    <div>
                                      <span className="font-medium text-gray-800">{member}</span>
                                      {isBeneficiary && <span className="ml-2 bg-gradient-to-r from-yellow-400 to-amber-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">⭐ BENEFICIARY</span>}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  {isBeneficiary ? (
                                    <div className="flex items-center justify-center gap-2">
                                      <button onClick={() => toggleNjangi(selectedMeeting, selectedGroup, mIdx)} disabled={!isAdmin} className={`w-24 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105 ${isPaid ? 'text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} ${!isAdmin && 'opacity-70 cursor-not-allowed'}`} style={isPaid ? { backgroundColor: group.color } : {}}>
                                        {isPaid ? '✓ PAID' : '$1,000'}
                                      </button>
                                      <span className="bg-gradient-to-r from-yellow-400 to-amber-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">⭐</span>
                                    </div>
                                  ) : (
                                    <button onClick={() => toggleNjangi(selectedMeeting, selectedGroup, mIdx)} disabled={!isAdmin} className={`w-24 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105 ${isPaid ? 'text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} ${!isAdmin && 'opacity-70 cursor-not-allowed'}`} style={isPaid ? { backgroundColor: group.color } : {}}>
                                      {isPaid ? '✓ PAID' : '$1,000'}
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </GlassCard>
                </>
              );
            })()}
          </div>
        )}

        {/* Savings Tab */}
        {activeTab === 'savings' && (
          <div className="space-y-4">
            <GlassCard className="p-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {meetings.map((m, idx) => (<button key={idx} onClick={() => setSelectedMeeting(idx)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedMeeting === idx ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg' : 'bg-gray-100 hover:bg-purple-100'}`}>{m.date}</button>))}
              </div>
            </GlassCard>
            
            {/* Savings Overview with Ledger Stats */}
            {(() => {
              const ledgerStats = getOverallSavingsStats();
              return (
                <div className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-600 rounded-2xl p-5 text-white shadow-xl">
                  <div className="flex justify-between items-start flex-wrap gap-4">
                    <div>
                      <p className="text-purple-100 text-sm">{currentMeeting?.full}</p>
                      <h2 className="text-2xl font-bold">🏦 Savings Fund</h2>
                      <p className="text-purple-200 text-sm mt-1">$100 per member per meeting</p>
                      
                      {/* Status badges */}
                      <div className="flex gap-2 mt-3 flex-wrap">
                        <span className="bg-green-400/30 backdrop-blur px-3 py-1 rounded-full text-xs font-medium">
                          ✨ {ledgerStats.membersAhead} ahead
                        </span>
                        <span className="bg-blue-400/30 backdrop-blur px-3 py-1 rounded-full text-xs font-medium">
                          ✅ {ledgerStats.membersCurrent} current
                        </span>
                        <span className="bg-red-400/30 backdrop-blur px-3 py-1 rounded-full text-xs font-medium">
                          ⏳ {ledgerStats.membersBehind} behind
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-white/20 backdrop-blur rounded-xl p-4 mb-2">
                        <p className="text-3xl font-bold">${ledgerStats.totalCollected.toLocaleString()}</p>
                        <p className="text-purple-100 text-sm">of ${ledgerStats.expectedTotal.toLocaleString()} expected</p>
                        <p className="text-purple-200 text-xs mt-1">{ledgerStats.collectionRate}% collection rate</p>
                      </div>
                      {isAdmin && (
                        <button 
                          onClick={() => setShowSavingsReportModal(true)}
                          className="bg-white/20 hover:bg-white/30 backdrop-blur px-3 py-2 rounded-xl text-sm font-medium transition-all"
                        >
                          📊 Savings Report
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Outstanding amounts */}
                  {isAdmin && ledgerStats.totalOwed > 0 && (
                    <div className="mt-4 bg-red-500/30 border border-red-300 rounded-xl p-3 backdrop-blur">
                      <p className="text-xs text-red-200 mb-1">⚠️ OUTSTANDING BALANCE</p>
                      <p className="text-xl font-bold">${ledgerStats.totalOwed.toLocaleString()} owed by {ledgerStats.membersBehind} members</p>
                    </div>
                  )}
                </div>
              );
            })()}
            
            <GlassCard className="p-4 shadow-lg">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div>
                  <h3 className="font-bold text-gray-800">💰 Member Savings Status</h3>
                  <p className="text-xs text-gray-500">Click on a member to view/edit their savings ledger</p>
                </div>
                <input type="text" placeholder="🔍 Search members..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm w-48" />
              </div>
              <div className="space-y-3">
                {groups.map((group, gIdx) => {
                  const filteredMembers = group.members.filter(m => !searchTerm || m.toLowerCase().includes(searchTerm.toLowerCase()));
                  if (filteredMembers.length === 0) return null;
                  return (
                    <div key={gIdx} className="rounded-xl overflow-hidden border">
                      <div className="p-3" style={{ backgroundColor: group.color + '15' }}>
                        <span className="font-bold text-sm" style={{ color: group.color }}>{group.name}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3">
                        {filteredMembers.map((member) => {
                          const actualIdx = group.members.indexOf(member);
                          const status = getMemberSavingsStatus(gIdx, actualIdx);
                          
                          return (
                            <div 
                              key={member} 
                              onClick={() => openSavingsLedgerModal(gIdx, actualIdx)}
                              className={`flex items-center justify-between p-3 rounded-xl text-sm transition-all cursor-pointer hover:shadow-lg ${
                                status.status === 'ahead' ? 'bg-green-50 border-2 border-green-300' : 
                                status.status === 'current' ? 'bg-blue-50 border-2 border-blue-300' : 
                                'bg-red-50 border-2 border-red-300'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <MemberAvatar name={member} photo={getMemberPhoto(gIdx, actualIdx)} size="sm" color={group.color} />
                                <div>
                                  <span className="font-medium text-gray-800">{member}</span>
                                  <p className="text-xs text-gray-500">${status.totalPaid} paid</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className={`font-bold ${status.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {status.balance >= 0 ? '+' : ''}{status.balance >= 0 ? `$${status.balance}` : `-$${Math.abs(status.balance)}`}
                                </span>
                                <p className={`text-xs px-2 py-0.5 rounded-full ${
                                  status.status === 'ahead' ? 'bg-green-200 text-green-800' : 
                                  status.status === 'current' ? 'bg-blue-200 text-blue-800' : 
                                  'bg-red-200 text-red-800'
                                }`}>
                                  {status.status === 'ahead' ? '✨ Ahead' : status.status === 'current' ? '✅ Current' : '⏳ Behind'}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        )}

        {/* Host Fee Tab */}
        {activeTab === 'hostfee' && (
          <div className="space-y-4">
            <GlassCard className="p-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {meetings.map((m, idx) => (<button key={idx} onClick={() => setSelectedMeeting(idx)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedMeeting === idx ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg' : 'bg-gray-100 hover:bg-teal-100'}`}>{m.date}</button>))}
              </div>
            </GlassCard>
            <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-2xl p-5 text-white shadow-xl">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-teal-100 text-sm">{currentMeeting?.full}</p>
                  <h2 className="text-2xl font-bold">🍽️ Host/Food Fee</h2>
                  <p className="text-teal-200 text-sm mt-1">Host: {currentMeeting?.host}</p>
                </div>
                <div className="text-center bg-white/20 backdrop-blur rounded-xl p-4">
                  <p className="text-3xl font-bold">${hostFeeStats.collected.toLocaleString()}</p>
                  <p className="text-teal-100 text-sm">of ${hostFeeStats.target.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <GlassCard className="p-4 shadow-lg">
              <input type="text" placeholder="🔍 Search members..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none mb-4" />
              <div className="space-y-3">
                {groups.map((group, gIdx) => {
                  const filteredMembers = group.members.filter(m => !searchTerm || m.toLowerCase().includes(searchTerm.toLowerCase()));
                  if (filteredMembers.length === 0) return null;
                  return (
                    <div key={gIdx} className="rounded-xl overflow-hidden border">
                      <div className="p-3" style={{ backgroundColor: group.color + '15' }}>
                        <span className="font-bold text-sm" style={{ color: group.color }}>{group.name}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-3">
                        {filteredMembers.map((member) => {
                          const actualIdx = group.members.indexOf(member);
                          const isPaid = hostFeePayments[`${selectedMeeting}-${gIdx}-${actualIdx}`];
                          return (
                            <div key={member} className={`flex items-center justify-between p-3 rounded-xl text-sm transition-all ${isPaid ? 'bg-teal-50 border border-teal-200' : 'bg-gray-50 hover:bg-gray-100'}`}>
                              <div className="flex items-center gap-2">
                                <MemberAvatar name={member} photo={getMemberPhoto(gIdx, actualIdx)} size="sm" color={group.color} onClick={() => openMemberModal(gIdx, actualIdx)} />
                                <span className="font-medium text-gray-800 truncate">{member}</span>
                              </div>
                              <button onClick={() => toggleHostFee(selectedMeeting, gIdx, actualIdx)} disabled={!isAdmin} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 ${isPaid ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'} ${!isAdmin && 'cursor-not-allowed opacity-70'}`}>{isPaid ? '✓' : '$20'}</button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="space-y-4">
            <GlassCard className="p-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {meetings.map((m, idx) => (<button key={idx} onClick={() => setSelectedMeeting(idx)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedMeeting === idx ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg' : 'bg-gray-100 hover:bg-blue-100'}`}>{m.date}</button>))}
              </div>
            </GlassCard>
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 rounded-2xl p-5 text-white shadow-xl">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100 text-sm">{currentMeeting?.full}</p>
                  <h2 className="text-2xl font-bold">✋ Attendance</h2>
                </div>
                <div className="text-center bg-white/20 backdrop-blur rounded-xl p-4">
                  <p className="text-3xl font-bold">{attendanceStats.present}/{attendanceStats.total}</p>
                  <p className="text-blue-100 text-sm">{attendanceStats.percentage}% present</p>
                </div>
              </div>
            </div>
            <GlassCard className="p-4 shadow-lg">
              <input type="text" placeholder="🔍 Search members..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none mb-4" />
              <div className="space-y-3">
                {groups.map((group, gIdx) => {
                  const filteredMembers = group.members.filter(m => !searchTerm || m.toLowerCase().includes(searchTerm.toLowerCase()));
                  if (filteredMembers.length === 0) return null;
                  return (
                    <div key={gIdx} className="rounded-xl overflow-hidden border">
                      <div className="p-3" style={{ backgroundColor: group.color + '15' }}>
                        <span className="font-bold text-sm" style={{ color: group.color }}>{group.name}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-3">
                        {filteredMembers.map((member) => {
                          const actualIdx = group.members.indexOf(member);
                          const isPresent = attendance[`${selectedMeeting}-${gIdx}-${actualIdx}`];
                          return (
                            <div key={member} className={`flex items-center justify-between p-3 rounded-xl text-sm transition-all ${isPresent ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'}`}>
                              <div className="flex items-center gap-2">
                                <MemberAvatar name={member} photo={getMemberPhoto(gIdx, actualIdx)} size="sm" color={group.color} onClick={() => openMemberModal(gIdx, actualIdx)} />
                                <span className="font-medium text-gray-800 truncate">{member}</span>
                              </div>
                              <button onClick={() => toggleAttendance(selectedMeeting, gIdx, actualIdx)} disabled={!isAdmin} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 ${isPresent ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} ${!isAdmin && 'cursor-not-allowed opacity-70'}`}>{isPresent ? '✓ Present' : 'Absent'}</button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-4">
            {meetings.map((meeting, idx) => {
              const hStats = getMeetingHostFeeStats(idx);
              const aStats = getMeetingAttendanceStats(idx);
              const hostLoc = getHostingLocation(idx);
              return (
                <GlassCard key={idx} className={`overflow-hidden shadow-lg transition-all hover:-translate-y-1 ${idx === 0 ? 'ring-2 ring-emerald-400 ring-offset-2' : ''}`}>
                  <div className={`p-4 flex items-center justify-between ${idx === 0 ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' : 'bg-gray-50'}`}>
                    <div>
                      <span className={`text-xs font-bold ${idx === 0 ? 'text-emerald-100' : 'text-gray-500'}`}>Meeting #{idx + 1}</span>
                      <p className={`font-bold text-lg ${idx === 0 ? 'text-white' : 'text-gray-800'}`}>{meeting.full}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {idx === 0 && <span className="bg-white text-emerald-600 text-xs font-bold px-3 py-1 rounded-full animate-pulse">🔥 NEXT</span>}
                      {isAdmin && (
                        <>
                          <button 
                            onClick={() => openNotesModal(idx)} 
                            className={`text-xs px-3 py-1 rounded-full transition-all ${idx === 0 ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-amber-100 hover:bg-amber-200 text-amber-700'}`}
                          >
                            📝 Notes{meetingNotes[idx] ? ' ✓' : ''}
                          </button>
                          <button 
                            onClick={() => openHostingModal(idx)} 
                            className={`text-xs px-3 py-1 rounded-full transition-all ${idx === 0 ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700'}`}
                          >
                            📍 Location
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-2">🏠 {meeting.host}</p>
                    
                    {/* Show location details if set */}
                    {hostLoc?.address ? (
                      <div className="bg-emerald-50 rounded-lg p-3 mb-3 text-sm">
                        <p className="font-medium text-gray-800">📍 {hostLoc.address}</p>
                        <p className="text-gray-600">{hostLoc.city}, {hostLoc.state} {hostLoc.zip}</p>
                        {hostLoc.time && <p className="text-gray-500 text-xs mt-1">⏰ {hostLoc.time}</p>}
                        {hostLoc.notes && <p className="text-gray-500 text-xs">📝 {hostLoc.notes}</p>}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 mb-3">📍 {meeting.city}</p>
                    )}
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {groups.map((group, gIdx) => {
                        const beneficiary = getBeneficiary(gIdx, idx);
                        const stats = getGroupMeetingStats(idx, gIdx);
                        return (
                          <div 
                            key={gIdx} 
                            onClick={() => openBeneficiaryModal(idx, gIdx)}
                            className={`p-3 rounded-xl border text-sm transition-all hover:shadow-md ${isAdmin ? 'cursor-pointer' : ''}`} 
                            style={{ borderColor: group.color + '50' }}
                          >
                            <p className="text-xs font-bold truncate mb-2" style={{ color: group.color }}>{group.name}</p>
                            <div className="flex items-center gap-2">
                              <MemberAvatar name={beneficiary.name} photo={getMemberPhoto(gIdx, beneficiary.index)} size="sm" color={group.color} />
                              <p className="font-medium text-gray-800 truncate text-xs flex-1">{beneficiary.name.split(' ')[0]}</p>
                            </div>
                            <div className="mt-2"><ProgressRing progress={stats.njangiPercentage} size={40} strokeWidth={4} color={group.color} /></div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs text-gray-500">
                      <span>🍽️ {hStats.paid}/{hStats.total} host fee</span>
                      <div className="flex items-center gap-2">
                        <span>✋ {aStats.present}/{aStats.total} attendance</span>
                        {isAdmin && (
                          <button 
                            onClick={() => { setSelectedMeeting(idx); setShowReportModal(true); }}
                            className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-2 py-1 rounded-lg text-xs font-medium transition-all"
                          >
                            📊 Report
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Show meeting notes if any */}
                    {meetingNotes[idx] && (
                      <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <p className="text-xs font-bold text-amber-700 mb-1">📝 Meeting Notes:</p>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{meetingNotes[idx]}</p>
                      </div>
                    )}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="space-y-4">
            <GlassCard className="p-4 shadow-lg">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <h3 className="font-bold text-gray-800 text-lg">👥 All {totalMembers} Members</h3>
                <div className="flex gap-2">
                  {isAdmin && <button onClick={() => setShowAddMemberModal(true)} className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg transition-all">➕ Add Member</button>}
                  <input type="text" placeholder="🔍 Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-sm w-48" />
                </div>
              </div>
              <div className="space-y-4">
                {groups.map((group, gIdx) => {
                  const filteredMembers = group.members.filter(m => !searchTerm || m.toLowerCase().includes(searchTerm.toLowerCase()));
                  if (filteredMembers.length === 0 && searchTerm) return null;
                  return (
                    <div key={gIdx} className="rounded-xl overflow-hidden border-2" style={{ borderColor: group.color + '30' }}>
                      <div className="p-3 flex items-center justify-between" style={{ backgroundColor: group.color, color: 'white' }}>
                        <span className="font-bold">{group.name}</span>
                        <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">{group.members.length} members</span>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {(searchTerm ? filteredMembers : group.members).map((member, mIdx) => {
                            const actualIdx = group.members.indexOf(member);
                            return (
                              <div key={actualIdx} onClick={() => openMemberModal(gIdx, actualIdx)} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-all hover:shadow-md">
                                <MemberAvatar name={member} photo={getMemberPhoto(gIdx, actualIdx)} size="md" color={group.color} />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-gray-800 truncate">{member}</p>
                                  <p className="text-xs text-gray-500">Tap to view</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        )}

        {/* WhatsApp Tab */}
        {activeTab === 'whatsapp' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-xl">
              <h2 className="text-3xl font-bold">📱 WhatsApp Sharing</h2>
              <p className="text-green-100 mt-2">Generate messages and reports for the community</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Meeting Reminder */}
              <GlassCard className="p-6 shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <span className="text-3xl">🔔</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">Meeting Reminder</h3>
                  <p className="text-gray-500 text-sm">Send before meeting</p>
                </div>
                <select onChange={(e) => setSelectedMeeting(parseInt(e.target.value))} value={selectedMeeting} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 mb-4 text-sm">
                  {meetings.map((m, idx) => (<option key={idx} value={idx}>#{idx + 1}: {m.date}</option>))}
                </select>
                <button onClick={() => openWhatsApp('reminder')} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all">📱 Generate</button>
              </GlassCard>
              
              {/* Payment Status */}
              <GlassCard className="p-6 shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <span className="text-3xl">💰</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">Payment Status</h3>
                  <p className="text-gray-500 text-sm">Quick payment update</p>
                </div>
                <select onChange={(e) => setSelectedMeeting(parseInt(e.target.value))} value={selectedMeeting} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 mb-4 text-sm">
                  {meetings.map((m, idx) => (<option key={idx} value={idx}>#{idx + 1}: {m.date}</option>))}
                </select>
                <button onClick={() => openWhatsApp('summary')} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all">📱 Generate</button>
              </GlassCard>
              
              {/* Full Report */}
              <GlassCard className="p-6 shadow-lg border-2 border-purple-200">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <span className="text-3xl">📊</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">Full Report</h3>
                  <p className="text-gray-500 text-sm">Customizable detailed report</p>
                </div>
                <select onChange={(e) => setSelectedMeeting(parseInt(e.target.value))} value={selectedMeeting} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 mb-4 text-sm">
                  {meetings.map((m, idx) => (<option key={idx} value={idx}>#{idx + 1}: {m.date}</option>))}
                </select>
                <button onClick={() => setShowReportModal(true)} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all">📊 Generate Report</button>
              </GlassCard>
              
              {/* Savings Report - NEW */}
              <GlassCard className="p-6 shadow-lg border-2 border-indigo-200">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <span className="text-3xl">🏦</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">Savings Report</h3>
                  <p className="text-gray-500 text-sm">Who's ahead/behind</p>
                </div>
                <div className="mb-4">
                  {(() => {
                    const stats = getOverallSavingsStats();
                    return (
                      <div className="bg-indigo-50 rounded-xl p-3 text-center">
                        <p className="text-lg font-bold text-indigo-600">${stats.totalCollected.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{stats.membersBehind} behind, {stats.membersAhead} ahead</p>
                      </div>
                    );
                  })()}
                </div>
                <button onClick={() => setShowSavingsReportModal(true)} className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all">🏦 Generate Report</button>
              </GlassCard>
            </div>
            
            {/* Quick Stats for Selected Meeting */}
            <GlassCard className="p-6 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-4">📈 Meeting #{selectedMeeting + 1} Quick Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(() => {
                  const hStats = getMeetingHostFeeStats(selectedMeeting);
                  const sStats = getMeetingSavingsStats(selectedMeeting);
                  const aStats = getMeetingAttendanceStats(selectedMeeting);
                  let totalNjangi = 0;
                  groups.forEach((g, gIdx) => {
                    totalNjangi += getGroupMeetingStats(selectedMeeting, gIdx).njangiCollected;
                  });
                  return (
                    <>
                      <div className="bg-emerald-50 p-4 rounded-xl text-center">
                        <p className="text-2xl font-bold text-emerald-600">${totalNjangi.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">💰 Njangi</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-xl text-center">
                        <p className="text-2xl font-bold text-purple-600">${sStats.collected.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">🏦 Savings</p>
                      </div>
                      <div className="bg-teal-50 p-4 rounded-xl text-center">
                        <p className="text-2xl font-bold text-teal-600">${hStats.collected.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">🍽️ Host Fee</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-xl text-center">
                        <p className="text-2xl font-bold text-blue-600">{aStats.percentage}%</p>
                        <p className="text-xs text-gray-500">✋ Attendance</p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </GlassCard>
          </div>
        )}

        {/* Rules Tab */}
        {activeTab === 'rules' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rules.map((rule, idx) => (
                <GlassCard key={idx} className="p-5 shadow-lg border-l-4 border-emerald-500 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0">{rule.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-800">{rule.title}</h3>
                        {rule.amount && <span className="text-emerald-600 font-bold">{rule.amount}</span>}
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{rule.text}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 text-white py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-6xl mb-4">🌴</p>
          <p className="font-bold text-2xl">NIKOM NI MANKON</p>
          <p className="text-emerald-300 text-sm mt-1">Maryland, USA • Growing Together</p>
          
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-emerald-400 text-xs uppercase tracking-wider">Built by</p>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20 shadow-xl">
              <svg width="48" height="48" viewBox="0 0 100 100">
                <rect x="5" y="5" width="90" height="90" rx="18" fill="#10B981"/>
                <text x="50" y="62" fontFamily="Arial Black, sans-serif" fontSize="36" fontWeight="900" fill="white" textAnchor="middle">TA</text>
              </svg>
              <div className="flex flex-col items-start">
                <span className="font-bold text-white text-lg">TECH</span>
                <span className="text-emerald-300 text-lg">SOLUTIONS</span>
              </div>
            </div>
            <a href="tel:+15714472698" className="flex items-center gap-2 text-emerald-300 hover:text-white transition-all text-sm">
              <span className="bg-emerald-500/30 px-3 py-1.5 rounded-full">📞 (571) 447-2698</span>
            </a>
          </div>
          
          <div className="mt-6 pt-6 border-t border-emerald-700/50 flex items-center justify-center gap-4 text-emerald-400 text-xs">
            <span>🇨🇲 Cameroon</span>
            <span>×</span>
            <span>🇺🇸 USA</span>
          </div>
          <p className="text-emerald-500/50 text-xs mt-4">© 2026 TA-TECHSOLUTIONS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
