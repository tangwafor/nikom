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
  { title: 'Group Njangi', text: 'Pay $1,000 to your GROUP\'s beneficiary.', icon: '💰', amount: '$1,000' },
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
        memberLocations, carpoolOffers, carpoolRequests, beneficiaryOverrides, 
        meetingNotes, groups, isAdmin, visibility 
      };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
    }
  }, [adminPassword, recoveryPhone, njangiPayments, hostFeePayments, savingsFundPayments, attendance, memberPhotos, memberContacts, memberStatuses, statusMessages, memberLocations, carpoolOffers, carpoolRequests, beneficiaryOverrides, meetingNotes, groups, isAdmin, visibility, isLoading]);

  // =====================================================
  // AUTH FUNCTIONS WITH PHONE RECOVERY
  // =====================================================
  const handleLogin = () => {
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
    return { njangiPaid, njangiTotal: group.members.length, njangiCollected: njangiPaid * 1000, njangiTarget: group.members.length * 1000, njangiPercentage: Math.round((njangiPaid / group.members.length) * 100) };
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
    let msg = `🌴 *NIKOM NI MANKON* 🌴\n📅 *${meeting.full}*\n🏠 Host: ${meeting.host}\n📍 ${meeting.city}\n\n`;
    
    if (type === 'summary') {
      msg += `💰 *PAYMENT STATUS*\n\n`;
      groups.forEach((g, gIdx) => {
        const ben = getBeneficiary(gIdx, selectedMeeting);
        const stats = getGroupMeetingStats(selectedMeeting, gIdx);
        msg += `*${g.name}*\n⭐ ${ben.name}\n✅ ${stats.njangiPaid}/${stats.njangiTotal-1} paid ($${stats.njangiCollected.toLocaleString()})\n\n`;
      });
    } else {
      msg += `💵 *CONTRIBUTIONS*\n• $1,000 Njangi\n• $100 Savings\n• $20 Host Fee\n\n⭐ *BENEFICIARIES*\n`;
      groups.forEach((g, gIdx) => { msg += `• ${g.name}: ${getBeneficiary(gIdx, selectedMeeting).name}\n`; });
    }
    msg += `\n🌿 _Growing together!_ 🌿\n\n_Powered by TA-TECHSOLUTIONS_\n📞 (571) 447-2698`;
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

            <button onClick={() => setShowMemberModal(false)} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Close</button>
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
                  <button onClick={() => { setShowSettingsModal(false); setShowChangePasswordModal(true); }} className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all text-left">
                    🔑 Change Password
                  </button>
                  <button onClick={() => { setShowSettingsModal(false); setShowSetupRecoveryModal(true); }} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all text-left">
                    📱 {recoveryPhone ? 'Update' : 'Setup'} Recovery Phone
                  </button>
                  {recoveryPhone && (
                    <p className="text-xs text-gray-500 mt-1">Current: {recoveryPhone}</p>
                  )}
                </div>
              </div>
              
              {/* Visibility Section */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-3">👁️ Non-Admin Visibility</h4>
                <div className="space-y-2">
                  {[{key: 'njangi', label: 'Njangi Payments', icon: '💰'}, {key: 'savings', label: 'Savings Fund', icon: '🏦'}, {key: 'hostFee', label: 'Host Fee', icon: '🍽️'}].map(item => (
                    <label key={item.key} className="flex items-center justify-between p-3 bg-white rounded-lg cursor-pointer hover:shadow-md transition-all">
                      <span className="flex items-center gap-2"><span>{item.icon}</span> {item.label}</span>
                      <div className={`w-12 h-6 rounded-full p-1 transition-all ${visibility[item.key] ? 'bg-emerald-500' : 'bg-gray-300'}`} onClick={() => setVisibility({...visibility, [item.key]: !visibility[item.key]})}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-all ${visibility[item.key] ? 'translate-x-6' : ''}`}/>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <button onClick={() => setShowSettingsModal(false)} className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Close</button>
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
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">🔒</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-500 text-xs uppercase tracking-wide">Savings</p>
                      <p className="text-3xl font-bold text-purple-600 mt-1"><AnimatedCounter value={overallStats.totalSavingsCollected} prefix="$" /></p>
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
                  </div>
                  <button onClick={() => openWhatsApp('reminder')} className="bg-white/20 hover:bg-white/30 backdrop-blur px-4 py-2 rounded-xl font-medium transition-all">📱 Share</button>
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
                              {isAdmin && (
                                <button 
                                  onClick={() => openBeneficiaryModal(selectedMeeting, selectedGroup)} 
                                  className="text-xs text-white/80 underline hover:text-white"
                                >
                                  🔄 Change
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center bg-white/20 backdrop-blur rounded-xl p-4">
                        <p className="text-3xl font-bold">${stats.njangiCollected.toLocaleString()}</p>
                        <p className="text-white/80 text-sm">of ${stats.njangiTarget.toLocaleString()}</p>
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
                                    <span className="bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 px-4 py-2 rounded-xl text-sm font-bold inline-block">💎 RECEIVES</span>
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
            <div className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-600 rounded-2xl p-5 text-white shadow-xl">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-purple-100 text-sm">{currentMeeting?.full}</p>
                  <h2 className="text-2xl font-bold">🏦 Savings Fund</h2>
                  <p className="text-purple-200 text-sm mt-1">$100 per member</p>
                </div>
                <div className="text-center bg-white/20 backdrop-blur rounded-xl p-4">
                  <p className="text-3xl font-bold">${savingsStats.collected.toLocaleString()}</p>
                  <p className="text-purple-100 text-sm">of ${savingsStats.target.toLocaleString()}</p>
                </div>
              </div>
              {isAdmin && (
                <div className="mt-4 bg-red-500/30 border border-red-300 rounded-xl p-3 backdrop-blur">
                  <p className="text-xs text-red-200 mb-1">🔒 CONFIDENTIAL - Admin Only</p>
                  <p className="text-2xl font-bold">Total Savings: ${overallStats.totalSavingsCollected.toLocaleString()}</p>
                </div>
              )}
            </div>
            <GlassCard className="p-4 shadow-lg">
              <input type="text" placeholder="🔍 Search members..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none mb-4" />
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
                          const isPaid = savingsFundPayments[`${selectedMeeting}-${gIdx}-${actualIdx}`];
                          return (
                            <div key={member} className={`flex items-center justify-between p-3 rounded-xl text-sm transition-all ${isPaid ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50 hover:bg-gray-100'}`}>
                              <div className="flex items-center gap-2">
                                <MemberAvatar name={member} photo={getMemberPhoto(gIdx, actualIdx)} size="sm" color={group.color} onClick={() => openMemberModal(gIdx, actualIdx)} />
                                <span className="font-medium text-gray-800 truncate">{member}</span>
                              </div>
                              <button onClick={() => toggleSavingsFund(selectedMeeting, gIdx, actualIdx)} disabled={!isAdmin} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 ${isPaid ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600'} ${!isAdmin && 'cursor-not-allowed opacity-70'}`}>{isPaid ? '✓' : '$100'}</button>
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
              return (
                <GlassCard key={idx} className={`overflow-hidden shadow-lg transition-all hover:-translate-y-1 ${idx === 0 ? 'ring-2 ring-emerald-400 ring-offset-2' : ''}`}>
                  <div className={`p-4 flex items-center justify-between ${idx === 0 ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' : 'bg-gray-50'}`}>
                    <div>
                      <span className={`text-xs font-bold ${idx === 0 ? 'text-emerald-100' : 'text-gray-500'}`}>Meeting #{idx + 1}</span>
                      <p className={`font-bold text-lg ${idx === 0 ? 'text-white' : 'text-gray-800'}`}>{meeting.full}</p>
                    </div>
                    {idx === 0 && <span className="bg-white text-emerald-600 text-xs font-bold px-3 py-1 rounded-full animate-pulse">🔥 NEXT</span>}
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-3">🏠 {meeting.host} • 📍 {meeting.city}</p>
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
                      <span>✋ {aStats.present}/{aStats.total} attendance</span>
                    </div>
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
              <h2 className="text-3xl font-bold">📱 WhatsApp</h2>
              <p className="text-green-100 mt-2">Share updates with the community</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GlassCard className="p-6 shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <span className="text-3xl">📊</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">Full Summary</h3>
                  <p className="text-gray-500 text-sm">Complete payment status</p>
                </div>
                <select onChange={(e) => setSelectedMeeting(parseInt(e.target.value))} value={selectedMeeting} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 mb-4">
                  {meetings.map((m, idx) => (<option key={idx} value={idx}>#{idx + 1}: {m.full}</option>))}
                </select>
                <button onClick={() => openWhatsApp('summary')} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all">📱 Generate Summary</button>
              </GlassCard>
              <GlassCard className="p-6 shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <span className="text-3xl">🔔</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">Meeting Reminder</h3>
                  <p className="text-gray-500 text-sm">Remind members</p>
                </div>
                <select onChange={(e) => setSelectedMeeting(parseInt(e.target.value))} value={selectedMeeting} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 mb-4">
                  {meetings.map((m, idx) => (<option key={idx} value={idx}>#{idx + 1}: {m.full}</option>))}
                </select>
                <button onClick={() => openWhatsApp('reminder')} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all">📱 Generate Reminder</button>
              </GlassCard>
            </div>
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
