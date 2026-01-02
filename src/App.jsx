import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

// =====================================================
// SUPABASE CONFIGURATION - TA-TECHSOLUTIONS
// =====================================================
const SUPABASE_URL = 'https://lzgevkzjuxwpnafudxwe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6Z2V2a3pqdXh3cG5hZnVkeHdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNzY3NjAsImV4cCI6MjA4Mjk1Mjc2MH0.e4quPaPpu-Z-xBBYvcI0ZPDfCA5HjkzZZSpUkz8ei3A';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =====================================================
// DEFAULT DATA (Fallback if Supabase fails)
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
  { title: 'Group Njangi ($1,000)', text: 'Pay $1,000 to your GROUP\'s beneficiary.', icon: '💰' },
  { title: 'Savings Fund ($100)', text: 'EVERYONE contributes $100 to savings.', icon: '🏦' },
  { title: 'Host/Food Fee ($20)', text: 'EVERYONE gives $20 to the host for entertainment.', icon: '🍽️' },
  { title: 'Meeting Time', text: '3pm to 6pm prompt.', icon: '⏰' },
  { title: 'Late Payment Fine', text: '$250.00', icon: '⚠️' },
  { title: 'Lateness Fine', text: '$50.00', icon: '🚨' },
  { title: 'Confirmation', text: 'Confirm before 6pm cutoff.', icon: '✅' }
];

const PAYMENT_METHODS = ['Cash', 'Zelle', 'CashApp', 'Venmo', 'Bank Transfer', 'Check', 'Other'];
const LOCAL_KEY = 'nikom_supabase_local_v1';

// =====================================================
// SVG COMPONENTS
// =====================================================
const RaffiaPalmSVG = ({ className }) => (
  <svg viewBox="0 0 120 180" className={className}>
    <path d="M55 180 L55 90 Q55 85 60 85 Q65 85 65 90 L65 180" fill="#5D4037"/>
    <path d="M57 180 L57 95 Q57 90 60 90 Q63 90 63 95 L63 180" fill="#6D4C41"/>
    <path d="M60 85 Q20 60 5 30 Q15 50 60 82" fill="#1B5E20"/>
    <path d="M60 82 Q25 55 10 20 Q20 45 60 78" fill="#2E7D32"/>
    <path d="M60 85 Q100 60 115 30 Q105 50 60 82" fill="#1B5E20"/>
    <path d="M60 82 Q95 55 110 20 Q100 45 60 78" fill="#2E7D32"/>
    <path d="M60 80 Q58 40 50 5 Q58 35 60 75" fill="#1B5E20"/>
    <path d="M60 80 Q62 40 70 5 Q62 35 60 75" fill="#2E7D32"/>
    <ellipse cx="60" cy="88" rx="10" ry="6" fill="#5D4037"/>
  </svg>
);

// =====================================================
// MAIN APP COMPONENT
// =====================================================
export default function NikomNiMankon() {
  // Auth & Admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminPassword, setAdminPassword] = useState('nikom2026');
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Connection State
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState('synced');

  // Core State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMeeting, setSelectedMeeting] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState(defaultGroups);
  const [meetings, setMeetings] = useState(defaultMeetings);
  
  // Payment States (using local keys for simplicity)
  const [njangiPayments, setNjangiPayments] = useState({});
  const [hostFeePayments, setHostFeePayments] = useState({});
  const [savingsFundPayments, setSavingsFundPayments] = useState({});
  const [attendance, setAttendance] = useState({});
  const [paymentMethods, setPaymentMethods] = useState({});
  const [beneficiaryOverrides, setBeneficiaryOverrides] = useState({});
  const [meetingNotes, setMeetingNotes] = useState({});

  // Settings
  const [visibility, setVisibility] = useState({ njangi: false, savings: false, hostFee: false });
  const [whatsAppOptions, setWhatsAppOptions] = useState({ includeNjangi: true, includeSavings: false, includeHostFee: true, includeNotes: true });

  // UI State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showWhatsAppOptionsModal, setShowWhatsAppOptionsModal] = useState(false);
  const [pendingWhatsAppType, setPendingWhatsAppType] = useState(null);
  const [showBeneficiaryModal, setShowBeneficiaryModal] = useState(false);
  const [editingBeneficiary, setEditingBeneficiary] = useState({ meetingIdx: 0, groupIdx: 0 });
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [editingNotes, setEditingNotes] = useState({ meetingIdx: 0, note: '' });
  const [showEditMemberModal, setShowEditMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState({ groupIdx: 0, memberIdx: 0, name: '' });
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberGroup, setNewMemberGroup] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showChartsModal, setShowChartsModal] = useState(false);
  const reportRef = useRef(null);

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
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    
    // Try to load from Supabase first
    try {
      const { data: settingsData } = await supabase.from('app_settings').select('*').limit(1).single();
      if (settingsData) {
        if (settingsData.admin_password_hash) setAdminPassword(settingsData.admin_password_hash);
        if (settingsData.visibility) setVisibility(settingsData.visibility);
        if (settingsData.whatsapp_options) setWhatsAppOptions(settingsData.whatsapp_options);
      }
      setSyncStatus('synced');
    } catch (e) {
      console.log('Using local/default data');
      setSyncStatus('offline');
    }

    // Load local data
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.njangiPayments) setNjangiPayments(data.njangiPayments);
        if (data.hostFeePayments) setHostFeePayments(data.hostFeePayments);
        if (data.savingsFundPayments) setSavingsFundPayments(data.savingsFundPayments);
        if (data.attendance) setAttendance(data.attendance);
        if (data.paymentMethods) setPaymentMethods(data.paymentMethods);
        if (data.beneficiaryOverrides) setBeneficiaryOverrides(data.beneficiaryOverrides);
        if (data.meetingNotes) setMeetingNotes(data.meetingNotes);
        if (data.groups) setGroups(data.groups);
        if (data.isAdmin) setIsAdmin(data.isAdmin);
      } catch (e) { console.error('Error loading local data'); }
    }

    setIsLoading(false);
  };

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isLoading) {
      const data = {
        njangiPayments, hostFeePayments, savingsFundPayments, attendance,
        paymentMethods, beneficiaryOverrides, meetingNotes, groups, isAdmin
      };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
    }
  }, [njangiPayments, hostFeePayments, savingsFundPayments, attendance, paymentMethods, beneficiaryOverrides, meetingNotes, groups, isAdmin, isLoading]);

  // =====================================================
  // AUTH FUNCTIONS
  // =====================================================
  const handleLogin = () => {
    if (passwordInput === adminPassword) {
      setIsAdmin(true); setShowLoginModal(false); setPasswordInput(''); setLoginError('');
    } else { setLoginError('Incorrect password'); }
  };

  const handleLogout = () => { setIsAdmin(false); };

  const handleChangePassword = async () => {
    if (passwordInput !== adminPassword) { setLoginError('Current password incorrect'); return; }
    if (newPassword.length < 4) { setLoginError('Min 4 characters'); return; }
    if (newPassword !== confirmPassword) { setLoginError('Passwords do not match'); return; }
    
    setAdminPassword(newPassword);
    try {
      await supabase.from('app_settings').update({ admin_password_hash: newPassword }).neq('id', '');
    } catch (e) { console.log('Password saved locally only'); }
    
    setShowChangePasswordModal(false);
    setPasswordInput(''); setNewPassword(''); setConfirmPassword(''); setLoginError('');
    triggerConfetti();
  };

  // =====================================================
  // PAYMENT FUNCTIONS
  // =====================================================
  const getBeneficiary = (groupIdx, meetingIdx) => {
    const group = groups[groupIdx];
    const overrideKey = `${meetingIdx}-${groupIdx}`;
    if (beneficiaryOverrides[overrideKey] !== undefined) {
      const idx = beneficiaryOverrides[overrideKey];
      return { name: group.members[idx], index: idx, isOverride: true };
    }
    const idx = meetingIdx % group.members.length;
    return { name: group.members[idx], index: idx, isOverride: false };
  };

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
  // STATS FUNCTIONS
  // =====================================================
  const getGroupMeetingStats = (meetingIdx, groupIdx) => {
    const group = groups[groupIdx];
    let njangiPaid = 0, hostFeePaid = 0, savingsPaid = 0;
    group.members.forEach((_, mIdx) => {
      if (njangiPayments[`${meetingIdx}-${groupIdx}-${mIdx}`]) njangiPaid++;
      if (hostFeePayments[`${meetingIdx}-${groupIdx}-${mIdx}`]) hostFeePaid++;
      if (savingsFundPayments[`${meetingIdx}-${groupIdx}-${mIdx}`]) savingsPaid++;
    });
    return {
      njangiPaid, njangiTotal: group.members.length,
      njangiCollected: njangiPaid * 1000, njangiTarget: group.members.length * 1000,
      njangiPercentage: Math.round((njangiPaid / group.members.length) * 100),
      hostFeePaid, hostFeeCollected: hostFeePaid * 20,
      savingsPaid, savingsCollected: savingsPaid * 100
    };
  };

  const getMeetingHostFeeStats = (meetingIdx) => {
    let totalPaid = 0;
    groups.forEach((group, gIdx) => {
      group.members.forEach((_, mIdx) => {
        if (hostFeePayments[`${meetingIdx}-${gIdx}-${mIdx}`]) totalPaid++;
      });
    });
    return { paid: totalPaid, total: totalMembers, collected: totalPaid * 20, target: totalMembers * 20, percentage: Math.round((totalPaid / totalMembers) * 100) };
  };

  const getMeetingSavingsStats = (meetingIdx) => {
    let totalPaid = 0;
    groups.forEach((group, gIdx) => {
      group.members.forEach((_, mIdx) => {
        if (savingsFundPayments[`${meetingIdx}-${gIdx}-${mIdx}`]) totalPaid++;
      });
    });
    return { paid: totalPaid, total: totalMembers, collected: totalPaid * 100, target: totalMembers * 100, percentage: Math.round((totalPaid / totalMembers) * 100) };
  };

  const getMeetingAttendanceStats = (meetingIdx) => {
    let present = 0;
    groups.forEach((group, gIdx) => {
      group.members.forEach((_, mIdx) => {
        if (attendance[`${meetingIdx}-${gIdx}-${mIdx}`]) present++;
      });
    });
    return { present, total: totalMembers, percentage: Math.round((present / totalMembers) * 100) };
  };

  const getOverallStats = () => {
    let totalNjangi = 0, totalHostFee = 0, totalSavings = 0;
    Object.values(njangiPayments).forEach(v => { if (v) totalNjangi++; });
    Object.values(hostFeePayments).forEach(v => { if (v) totalHostFee++; });
    Object.values(savingsFundPayments).forEach(v => { if (v) totalSavings++; });
    return {
      totalNjangiCollected: totalNjangi * 1000,
      totalHostFeeCollected: totalHostFee * 20,
      totalSavingsCollected: totalSavings * 100,
      totalCollected: (totalNjangi * 1000) + (totalHostFee * 20) + (totalSavings * 100)
    };
  };

  const overallStats = getOverallStats();
  const currentMeeting = meetings[selectedMeeting];
  const hostFeeStats = getMeetingHostFeeStats(selectedMeeting);
  const savingsStats = getMeetingSavingsStats(selectedMeeting);
  const attendanceStats = getMeetingAttendanceStats(selectedMeeting);

  // =====================================================
  // MEMBER MANAGEMENT
  // =====================================================
  const addNewMember = () => {
    if (!newMemberName.trim()) return;
    setGroups(prev => prev.map((g, idx) => {
      if (idx === newMemberGroup) return { ...g, members: [...g.members, newMemberName.trim()] };
      return g;
    }));
    setNewMemberName(''); setShowAddMemberModal(false); triggerConfetti();
  };

  const saveMemberName = () => {
    if (!isAdmin) return;
    const { groupIdx, memberIdx, name } = editingMember;
    setGroups(prev => prev.map((g, gIdx) => {
      if (gIdx === groupIdx) {
        const newMembers = [...g.members];
        newMembers[memberIdx] = name;
        return { ...g, members: newMembers };
      }
      return g;
    }));
    setShowEditMemberModal(false); triggerConfetti();
  };

  const saveBeneficiaryOverride = (memberIdx) => {
    if (!isAdmin) return;
    const { meetingIdx, groupIdx } = editingBeneficiary;
    setBeneficiaryOverrides(prev => ({ ...prev, [`${meetingIdx}-${groupIdx}`]: memberIdx }));
    setShowBeneficiaryModal(false); triggerConfetti();
  };

  const clearBeneficiaryOverride = () => {
    const { meetingIdx, groupIdx } = editingBeneficiary;
    setBeneficiaryOverrides(prev => { const n = { ...prev }; delete n[`${meetingIdx}-${groupIdx}`]; return n; });
    setShowBeneficiaryModal(false);
  };

  const saveMeetingNotes = () => {
    if (!isAdmin) return;
    setMeetingNotes(prev => ({ ...prev, [editingNotes.meetingIdx]: editingNotes.note }));
    setShowNotesModal(false); triggerConfetti();
  };

  // =====================================================
  // WHATSAPP FUNCTIONS
  // =====================================================
  const generateMeetingSummary = (meetingIdx, options = whatsAppOptions) => {
    const meeting = meetings[meetingIdx];
    const hStats = getMeetingHostFeeStats(meetingIdx);
    const sStats = getMeetingSavingsStats(meetingIdx);
    let message = `🌴 *NIKOM NI MANKON* 🌴\n📅 *Meeting #${meetingIdx + 1}: ${meeting.full}*\n🏠 Host: ${meeting.host} (${meeting.city})\n\n`;
    if (options.includeNjangi) {
      message += `━━━━━━━━━━━━━━━━━━━━━\n💰 *GROUP NJANGI STATUS*\n━━━━━━━━━━━━━━━━━━━━━\n\n`;
      groups.forEach((group, gIdx) => {
        const beneficiary = getBeneficiary(gIdx, meetingIdx);
        const stats = getGroupMeetingStats(meetingIdx, gIdx);
        message += `*${group.name}*\n⭐ Beneficiary: ${beneficiary.name}\n✅ Paid: ${stats.njangiPaid}/${stats.njangiTotal - 1}\n💵 Collected: $${stats.njangiCollected.toLocaleString()}\n\n`;
      });
    }
    if (options.includeHostFee) message += `🍽️ *HOST FEE:* ${hStats.paid}/${hStats.total} paid ($${hStats.collected})\n`;
    if (options.includeSavings) message += `🏦 *SAVINGS:* ${sStats.paid}/${sStats.total} paid ($${sStats.collected})\n`;
    if (options.includeNotes && meetingNotes[meetingIdx]) message += `\n📝 *NOTES:* ${meetingNotes[meetingIdx]}\n`;
    message += `\n🌿 _Growing together in fertile ground!_ 🌿`;
    return message;
  };

  const generateReminder = (meetingIdx, options = whatsAppOptions) => {
    const meeting = meetings[meetingIdx];
    let message = `🌴 *NIKOM NI MANKON REMINDER* 🌴\n\n📅 *Next Meeting: ${meeting.full}*\n🏠 Host: ${meeting.host}\n📍 ${meeting.city}\n⏰ Time: 3pm - 6pm\n\n💰 *CONTRIBUTIONS:*\n`;
    if (options.includeNjangi) message += `• $1,000 to your group's beneficiary\n`;
    if (options.includeSavings) message += `• $100 to savings fund\n`;
    if (options.includeHostFee) message += `• $20 to host for food\n`;
    if (options.includeNjangi) {
      message += `\n⭐ *BENEFICIARIES:*\n`;
      groups.forEach((group, gIdx) => {
        const beneficiary = getBeneficiary(gIdx, meetingIdx);
        message += `• ${group.name}: ${beneficiary.name}\n`;
      });
    }
    message += `\n🌿 _See you there!_ 🌿`;
    return message;
  };

  const openWhatsAppWithOptions = (type) => {
    if (isAdmin) { setPendingWhatsAppType(type); setShowWhatsAppOptionsModal(true); }
    else {
      let message = type === 'summary' ? generateMeetingSummary(selectedMeeting) : generateReminder(selectedMeeting);
      setWhatsAppMessage(message); setShowWhatsAppModal(true);
    }
  };

  const confirmWhatsAppOptions = () => {
    let message = pendingWhatsAppType === 'summary' ? generateMeetingSummary(selectedMeeting, whatsAppOptions) : generateReminder(selectedMeeting, whatsAppOptions);
    setWhatsAppMessage(message); setShowWhatsAppOptionsModal(false); setShowWhatsAppModal(true);
  };

  const copyToClipboard = () => { navigator.clipboard.writeText(whatsAppMessage); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const shareToWhatsApp = () => { window.open(`https://wa.me/?text=${encodeURIComponent(whatsAppMessage)}`, '_blank'); };

  // =====================================================
  // UI HELPERS
  // =====================================================
  const triggerConfetti = () => { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 2000); };

  const canViewTab = (tabId) => {
    if (isAdmin) return true;
    if (tabId === 'njangi') return visibility.njangi;
    if (tabId === 'savings') return visibility.savings;
    if (tabId === 'hostfee') return visibility.hostFee;
    return true;
  };

  const visibleTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'njangi', label: 'Njangi', icon: '💰' },
    { id: 'savings', label: 'Savings', icon: '🏦' },
    { id: 'hostfee', label: 'Host Fee', icon: '🍽️' },
    { id: 'attendance', label: 'Attendance', icon: '✋' },
    { id: 'schedule', label: 'Schedule', icon: '📅' },
    { id: 'members', label: 'Members', icon: '👥' },
    { id: 'whatsapp', label: 'WhatsApp', icon: '📱' },
    { id: 'rules', label: 'Rules', icon: '📜' }
  ].filter(tab => canViewTab(tab.id));

  // Confetti Component
  const Confetti = () => (<div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">{[...Array(30)].map((_, i) => (<div key={i} className="absolute text-2xl" style={{ left: `${Math.random() * 100}%`, top: `-30px`, animation: `fall ${2 + Math.random()}s linear forwards`, animationDelay: `${Math.random() * 0.5}s` }}>{['🌴', '💰', '🌿', '🎉', '✨'][Math.floor(Math.random() * 5)]}</div>))}<style>{`@keyframes fall { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } }`}</style></div>);

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <RaffiaPalmSVG className="w-24 h-40 mx-auto animate-pulse" />
          <h1 className="text-2xl font-bold text-emerald-700 mt-4">Nikom Ni Mankon</h1>
          <p className="text-emerald-600">Loading...</p>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN RENDER
  // =====================================================
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-teal-50">
      {showConfetti && <Confetti />}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🔐 Admin Login</h3>
            <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleLogin()} placeholder="Password" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-2" />
            {loginError && <p className="text-red-500 text-sm mb-2">{loginError}</p>}
            <div className="flex gap-2 mt-4">
              <button onClick={handleLogin} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold">Login</button>
              <button onClick={() => { setShowLoginModal(false); setPasswordInput(''); setLoginError(''); }} className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🔑 Change Password</h3>
            <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Current password" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 mb-2" />
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 mb-2" />
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 mb-2" />
            {loginError && <p className="text-red-500 text-sm mb-2">{loginError}</p>}
            <div className="flex gap-2 mt-4">
              <button onClick={handleChangePassword} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold">Save</button>
              <button onClick={() => { setShowChangePasswordModal(false); setPasswordInput(''); setNewPassword(''); setConfirmPassword(''); setLoginError(''); }} className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">⚙️ Settings</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-3">🔐 Password</h4>
                <button onClick={() => { setShowSettingsModal(false); setShowChangePasswordModal(true); }} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">🔑 Change Password</button>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-3">👁️ Tab Visibility</h4>
                <div className="space-y-2">
                  {[{key: 'njangi', label: 'Group Njangi', icon: '💰'}, {key: 'savings', label: 'Savings Fund', icon: '🏦'}, {key: 'hostFee', label: 'Host/Food Fee', icon: '🍽️'}].map(item => (
                    <label key={item.key} className="flex items-center justify-between p-2 bg-white rounded-lg cursor-pointer">
                      <span>{item.icon} {item.label}</span>
                      <input type="checkbox" checked={visibility[item.key]} onChange={(e) => setVisibility({...visibility, [item.key]: e.target.checked})} className="w-5 h-5" />
                    </label>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-3">📊 Reports</h4>
                <button onClick={() => { setShowSettingsModal(false); setShowReportModal(true); }} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium mr-2">🖨️ Print Report</button>
                <button onClick={() => { setShowSettingsModal(false); setShowChartsModal(true); }} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">📈 Charts</button>
              </div>
            </div>
            <button onClick={() => setShowSettingsModal(false)} className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium">Close</button>
          </div>
        </div>
      )}

      {/* WhatsApp Options Modal */}
      {showWhatsAppOptionsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📱 Message Options</h3>
            <div className="space-y-3">
              {[{key: 'includeNjangi', label: 'Njangi Status', icon: '💰'}, {key: 'includeSavings', label: 'Savings Status', icon: '🏦'}, {key: 'includeHostFee', label: 'Host Fee Status', icon: '🍽️'}, {key: 'includeNotes', label: 'Meeting Notes', icon: '📝'}].map(item => (
                <label key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                  <span>{item.icon} {item.label}</span>
                  <input type="checkbox" checked={whatsAppOptions[item.key]} onChange={(e) => setWhatsAppOptions({...whatsAppOptions, [item.key]: e.target.checked})} className="w-5 h-5" />
                </label>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={confirmWhatsAppOptions} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold">📱 Generate</button>
              <button onClick={() => setShowWhatsAppOptionsModal(false)} className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[80vh] flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📱 Share to WhatsApp</h3>
            <div className="flex-1 overflow-auto mb-4">
              <pre className="bg-gray-100 p-4 rounded-xl text-sm whitespace-pre-wrap">{whatsAppMessage}</pre>
            </div>
            <div className="flex gap-2">
              <button onClick={copyToClipboard} className={`flex-1 py-3 rounded-xl font-bold ${copied ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>{copied ? '✓ Copied!' : '📋 Copy'}</button>
              <button onClick={shareToWhatsApp} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold">Open WhatsApp</button>
            </div>
            <button onClick={() => setShowWhatsAppModal(false)} className="mt-2 text-gray-500 text-sm">Close</button>
          </div>
        </div>
      )}

      {/* Beneficiary Modal */}
      {showBeneficiaryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[80vh] flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-2">🔄 Change Beneficiary</h3>
            <p className="text-gray-600 text-sm mb-4">{meetings[editingBeneficiary.meetingIdx]?.full} - {groups[editingBeneficiary.groupIdx]?.name}</p>
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
              {groups[editingBeneficiary.groupIdx]?.members.map((member, idx) => {
                const currentBen = getBeneficiary(editingBeneficiary.groupIdx, editingBeneficiary.meetingIdx);
                const isCurrent = idx === currentBen.index;
                return (
                  <button key={idx} onClick={() => saveBeneficiaryOverride(idx)} className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between ${isCurrent ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-gray-50 hover:bg-emerald-50'}`}>
                    <span>{member}</span>
                    {isCurrent && <span className="text-yellow-600 font-bold">⭐ Current</span>}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2">
              {beneficiaryOverrides[`${editingBeneficiary.meetingIdx}-${editingBeneficiary.groupIdx}`] !== undefined && (
                <button onClick={clearBeneficiaryOverride} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold">↩️ Reset</button>
              )}
              <button onClick={() => setShowBeneficiaryModal(false)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-2">📝 Meeting Notes</h3>
            <p className="text-gray-600 text-sm mb-4">{meetings[editingNotes.meetingIdx]?.full}</p>
            <textarea value={editingNotes.note} onChange={(e) => setEditingNotes({ ...editingNotes, note: e.target.value })} placeholder="Add notes..." rows={5} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 mb-4" />
            <div className="flex gap-2">
              <button onClick={saveMeetingNotes} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold">💾 Save</button>
              <button onClick={() => setShowNotesModal(false)} className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditMemberModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">✏️ Edit Member</h3>
            <input type="text" value={editingMember.name} onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 mb-4" />
            <div className="flex gap-2">
              <button onClick={saveMemberName} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold">💾 Save</button>
              <button onClick={() => setShowEditMemberModal(false)} className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">➕ Add Member</h3>
            <input type="text" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} placeholder="Member name" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 mb-3" />
            <select value={newMemberGroup} onChange={(e) => setNewMemberGroup(parseInt(e.target.value))} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 mb-4">
              {groups.map((g, i) => <option key={i} value={i}>{g.name}</option>)}
            </select>
            <div className="flex gap-2">
              <button onClick={addNewMember} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold">➕ Add</button>
              <button onClick={() => { setShowAddMemberModal(false); setNewMemberName(''); }} className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Charts Modal */}
      {showChartsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Charts</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {groups.map((g, gIdx) => {
                let total = 0;
                meetings.forEach((_, mIdx) => {
                  g.members.forEach((_, memberIdx) => {
                    if (njangiPayments[`${mIdx}-${gIdx}-${memberIdx}`]) total += 1000;
                  });
                });
                return (
                  <div key={gIdx} className="bg-gray-50 p-4 rounded-xl">
                    <p className="font-bold" style={{ color: g.color }}>{g.name}</p>
                    <p className="text-2xl font-bold text-gray-800">${total.toLocaleString()}</p>
                    <div className="bg-gray-200 h-3 rounded-full mt-2">
                      <div className="h-full rounded-full" style={{ width: `${Math.min((total / (g.members.length * 12 * 1000)) * 100, 100)}%`, backgroundColor: g.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <button onClick={() => setShowChartsModal(false)} className="w-full mt-4 bg-gray-200 text-gray-700 py-3 rounded-xl">Close</button>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">🖨️ Report</h3>
              <div className="flex gap-2">
                <button onClick={() => window.print()} className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold">🖨️ Print</button>
                <button onClick={() => setShowReportModal(false)} className="bg-gray-200 px-4 py-2 rounded-lg">Close</button>
              </div>
            </div>
            <div className="flex-1 overflow-auto" ref={reportRef}>
              <h1 className="text-center text-2xl font-bold text-emerald-600">🌴 NIKOM NI MANKON 🌴</h1>
              <p className="text-center text-gray-600">Report Generated: {new Date().toLocaleString()}</p>
              <div className="mt-4 p-4 bg-red-50 border-2 border-red-300 rounded-xl">
                <p className="font-bold text-red-600">🔒 CONFIDENTIAL - Total Savings: ${overallStats.totalSavingsCollected.toLocaleString()}</p>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="bg-emerald-100 p-4 rounded-xl"><p className="text-sm text-gray-600">Njangi</p><p className="text-xl font-bold text-emerald-600">${overallStats.totalNjangiCollected.toLocaleString()}</p></div>
                <div className="bg-teal-100 p-4 rounded-xl"><p className="text-sm text-gray-600">Host Fees</p><p className="text-xl font-bold text-teal-600">${overallStats.totalHostFeeCollected.toLocaleString()}</p></div>
                <div className="bg-blue-100 p-4 rounded-xl"><p className="text-sm text-gray-600">Total</p><p className="text-xl font-bold text-blue-600">${overallStats.totalCollected.toLocaleString()}</p></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-green-600 to-teal-700" />
        <div className="absolute left-4 bottom-0 opacity-30"><RaffiaPalmSVG className="w-16 h-28" /></div>
        <div className="absolute right-4 bottom-0 opacity-30" style={{ transform: 'scaleX(-1)' }}><RaffiaPalmSVG className="w-16 h-28" /></div>
        <div className="relative max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <RaffiaPalmSVG className="w-12 h-20" />
              </div>
              <div className="text-white">
                <h1 className="text-2xl md:text-3xl font-bold">NIKOM NI MANKON</h1>
                <p className="text-emerald-200 text-sm">🌿 The Fertile Raffia Groves of Asonka</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${isOnline ? 'bg-green-400 text-green-900' : 'bg-yellow-400 text-yellow-900'}`}>
                {isOnline ? '🟢 Online' : '🟡 Offline'}
              </span>
              {isAdmin ? (
                <div className="flex items-center gap-2">
                  <span className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold">🔓 Admin</span>
                  <button onClick={() => setShowSettingsModal(true)} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm">⚙️</button>
                  <button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm">Logout</button>
                </div>
              ) : (
                <button onClick={() => setShowLoginModal(true)} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium">🔐 Admin Login</button>
              )}
              <button onClick={() => openWhatsAppWithOptions('reminder')} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">📱 Share</button>
            </div>
          </div>
        </div>
        {!isAdmin && <div className="bg-yellow-400 text-yellow-900 text-center py-2 text-sm font-medium">👀 View-Only Mode</div>}
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-40 border-b-4 border-emerald-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {visibleTabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap text-sm ${activeTab === tab.id ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg' : 'text-gray-600 hover:bg-emerald-50'}`}>
                <span>{tab.icon}</span>
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
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div><h3 className="font-bold">⚙️ Admin Panel</h3><p className="text-purple-200 text-sm">Quick actions</p></div>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => setShowSettingsModal(true)} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm">⚙️ Settings</button>
                    <button onClick={() => setShowAddMemberModal(true)} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm">➕ Add Member</button>
                    <button onClick={() => setShowChartsModal(true)} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm">📊 Charts</button>
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-4 text-white shadow-lg"><p className="text-emerald-100 text-xs">Members</p><p className="text-3xl font-bold">{totalMembers}</p></div>
              <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-4 text-white shadow-lg"><p className="text-green-100 text-xs">Njangi</p><p className="text-2xl font-bold">${(overallStats.totalNjangiCollected/1000).toFixed(0)}k</p></div>
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-4 text-white shadow-lg"><p className="text-teal-100 text-xs">Host Fees</p><p className="text-2xl font-bold">${overallStats.totalHostFeeCollected.toLocaleString()}</p></div>
              {isAdmin && <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-4 text-white shadow-lg relative"><span className="absolute top-1 right-2 text-xs bg-red-500 px-1.5 py-0.5 rounded">🔒</span><p className="text-purple-100 text-xs">Savings</p><p className="text-2xl font-bold">${overallStats.totalSavingsCollected.toLocaleString()}</p></div>}
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-4 text-white shadow-lg"><p className="text-cyan-100 text-xs">Total</p><p className="text-2xl font-bold">${(overallStats.totalCollected/1000).toFixed(1)}k</p></div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-4 text-white flex items-center justify-between flex-wrap gap-2">
                <div><h3 className="text-lg font-bold">🗓️ Next: {meetings[0]?.full}</h3><p className="text-emerald-100 text-sm">🏠 {meetings[0]?.host} • {meetings[0]?.city}</p></div>
                <span className="bg-white text-emerald-600 text-xs font-bold px-3 py-1 rounded-full">NEXT</span>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-800 mb-3">💰 Beneficiaries:</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {groups.map((group, gIdx) => {
                    const beneficiary = getBeneficiary(gIdx, 0);
                    const stats = getGroupMeetingStats(0, gIdx);
                    return (
                      <div key={gIdx} className="rounded-lg p-3 border-2" style={{ borderColor: group.color, backgroundColor: group.color + '10' }}>
                        <p className="text-xs font-bold" style={{ color: group.color }}>{group.name}</p>
                        <p className="font-bold text-gray-800 text-sm mt-1 truncate">{beneficiary.name}</p>
                        <div className="mt-2 bg-gray-200 rounded-full h-2"><div className="h-full rounded-full" style={{ width: `${stats.njangiPercentage}%`, backgroundColor: group.color }}/></div>
                        <p className="text-xs text-gray-500 mt-1">{stats.njangiPercentage}%</p>
                        {isAdmin && <button onClick={() => { setEditingBeneficiary({ meetingIdx: 0, groupIdx: gIdx }); setShowBeneficiaryModal(true); }} className="mt-2 text-xs text-blue-600">🔄 Change</button>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">💵 Per Meeting: <span className="text-emerald-600">$1,120</span></h3>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-emerald-50 p-2 rounded-lg"><p className="text-emerald-600 font-bold">$1,000</p><p className="text-xs text-gray-600">Njangi</p></div>
                <div className="bg-purple-50 p-2 rounded-lg"><p className="text-purple-600 font-bold">$100</p><p className="text-xs text-gray-600">Savings</p></div>
                <div className="bg-teal-50 p-2 rounded-lg"><p className="text-teal-600 font-bold">$20</p><p className="text-xs text-gray-600">Host</p></div>
                <div className="bg-red-50 p-2 rounded-lg"><p className="text-red-600 font-bold">$250</p><p className="text-xs text-gray-600">Late Fee</p></div>
              </div>
            </div>
          </div>
        )}

        {/* Njangi Tab */}
        {activeTab === 'njangi' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-4 space-y-3">
              <div><p className="text-sm font-medium text-gray-600 mb-2">📅 Meeting</p><div className="flex gap-2 overflow-x-auto pb-2">{meetings.map((m, idx) => (<button key={idx} onClick={() => setSelectedMeeting(idx)} className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${selectedMeeting === idx ? 'bg-emerald-500 text-white' : 'bg-gray-100 hover:bg-emerald-100'}`}>{m.date}</button>))}</div></div>
              <div><p className="text-sm font-medium text-gray-600 mb-2">👥 Group</p><div className="flex gap-2 overflow-x-auto">{groups.map((g, idx) => (<button key={idx} onClick={() => setSelectedGroup(idx)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${selectedGroup === idx ? 'text-white' : 'bg-gray-100'}`} style={selectedGroup === idx ? { backgroundColor: g.color } : {}}>{g.name}</button>))}</div></div>
            </div>
            {(() => {
              const group = groups[selectedGroup];
              const beneficiary = getBeneficiary(selectedGroup, selectedMeeting);
              const stats = getGroupMeetingStats(selectedMeeting, selectedGroup);
              return (
                <>
                  <div className={`bg-gradient-to-r ${group.gradient} rounded-xl p-4 text-white shadow-lg`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/80 text-sm">{currentMeeting?.full}</p>
                        <h2 className="text-xl font-bold">{group.name}</h2>
                        <div className="mt-2 bg-white/20 rounded-lg px-3 py-2 inline-block">
                          <p className="text-white/80 text-xs">⭐ BENEFICIARY</p>
                          <p className="font-bold">{beneficiary.name}</p>
                          {isAdmin && <button onClick={() => { setEditingBeneficiary({ meetingIdx: selectedMeeting, groupIdx: selectedGroup }); setShowBeneficiaryModal(true); }} className="text-xs text-white/80 underline mt-1">🔄 Change</button>}
                        </div>
                      </div>
                      <div className="bg-white/20 rounded-xl p-4 text-center">
                        <p className="text-3xl font-bold">${stats.njangiCollected.toLocaleString()}</p>
                        <p className="text-white/80 text-sm">of ${stats.njangiTarget.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <table className="w-full">
                      <thead><tr className="bg-gray-50"><th className="px-4 py-3 text-left text-sm">#</th><th className="px-4 py-3 text-left text-sm">Member</th><th className="px-4 py-3 text-center text-sm" style={{ color: group.color }}>$1,000</th></tr></thead>
                      <tbody>
                        {group.members.map((member, mIdx) => {
                          const isPaid = njangiPayments[`${selectedMeeting}-${selectedGroup}-${mIdx}`];
                          const isBeneficiary = mIdx === beneficiary.index;
                          return (
                            <tr key={mIdx} className={`border-b ${isBeneficiary ? 'bg-yellow-50' : isPaid ? 'bg-emerald-50' : ''}`}>
                              <td className="px-4 py-3 text-gray-500">{mIdx + 1}</td>
                              <td className="px-4 py-3"><span className="font-medium text-gray-800">{member}</span>{isBeneficiary && <span className="ml-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">⭐</span>}</td>
                              <td className="px-4 py-3 text-center">
                                {isBeneficiary ? (
                                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm font-bold">RECEIVES</span>
                                ) : (
                                  <button onClick={() => toggleNjangi(selectedMeeting, selectedGroup, mIdx)} disabled={!isAdmin} className={`w-24 py-2 rounded-lg font-bold text-sm ${isPaid ? 'text-white' : 'bg-gray-100 text-gray-600'} ${isAdmin ? 'cursor-pointer' : 'cursor-not-allowed opacity-80'}`} style={isPaid ? { backgroundColor: group.color } : {}}>{isPaid ? '✓ PAID' : '$1,000'}</button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Savings Tab */}
        {activeTab === 'savings' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <p className="text-sm font-medium text-gray-600 mb-2">📅 Meeting</p>
              <div className="flex gap-2 overflow-x-auto pb-2">{meetings.map((m, idx) => (<button key={idx} onClick={() => setSelectedMeeting(idx)} className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${selectedMeeting === idx ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-purple-100'}`}>{m.date}</button>))}</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-4 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div><p className="text-purple-100 text-sm">{currentMeeting?.full}</p><h2 className="text-xl font-bold">🏦 Savings Fund ($100/member)</h2></div>
                <div className="bg-white/20 rounded-xl p-4 text-center"><p className="text-3xl font-bold">${savingsStats.collected.toLocaleString()}</p><p className="text-purple-100 text-sm">of ${savingsStats.target.toLocaleString()}</p></div>
              </div>
              {isAdmin && <div className="mt-4 bg-red-500/30 border border-red-300 rounded-lg p-3"><p className="text-xs text-red-200 mb-1">🔒 CONFIDENTIAL</p><p className="text-2xl font-bold">Total: ${overallStats.totalSavingsCollected.toLocaleString()}</p></div>}
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4">
              <input type="text" placeholder="🔍 Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 mb-4 text-sm" />
              <div className="space-y-3">
                {groups.map((group, gIdx) => {
                  const filteredMembers = group.members.filter(m => !searchTerm || m.toLowerCase().includes(searchTerm.toLowerCase()));
                  if (filteredMembers.length === 0) return null;
                  const paidCount = group.members.filter((_, mIdx) => savingsFundPayments[`${selectedMeeting}-${gIdx}-${mIdx}`]).length;
                  return (
                    <div key={gIdx} className="border rounded-lg overflow-hidden">
                      <div className="p-2 flex items-center justify-between" style={{ backgroundColor: group.color + '15' }}><span className="font-bold text-sm" style={{ color: group.color }}>{group.name}</span><span className="text-xs" style={{ color: group.color }}>{paidCount}/{group.members.length}</span></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
                        {filteredMembers.map((member) => {
                          const actualIdx = group.members.indexOf(member);
                          const isPaid = savingsFundPayments[`${selectedMeeting}-${gIdx}-${actualIdx}`];
                          return (
                            <div key={member} className={`flex items-center justify-between p-2 rounded-lg text-sm ${isPaid ? 'bg-purple-50' : 'bg-gray-50'}`}>
                              <span className="font-medium text-gray-800 truncate">{member}</span>
                              <button onClick={() => toggleSavingsFund(selectedMeeting, gIdx, actualIdx)} disabled={!isAdmin} className={`px-3 py-1 rounded text-xs font-bold ${isPaid ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600'} ${isAdmin ? '' : 'cursor-not-allowed'}`}>{isPaid ? '✓' : '$100'}</button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Host Fee Tab */}
        {activeTab === 'hostfee' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <p className="text-sm font-medium text-gray-600 mb-2">📅 Meeting</p>
              <div className="flex gap-2 overflow-x-auto pb-2">{meetings.map((m, idx) => (<button key={idx} onClick={() => setSelectedMeeting(idx)} className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${selectedMeeting === idx ? 'bg-teal-500 text-white' : 'bg-gray-100 hover:bg-teal-100'}`}>{m.date}</button>))}</div>
            </div>
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl p-4 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div><p className="text-teal-100 text-sm">{currentMeeting?.full}</p><h2 className="text-xl font-bold">🍽️ Host/Food Fee ($20/member)</h2><p className="text-teal-200 text-sm mt-1">Host: {currentMeeting?.host}</p></div>
                <div className="bg-white/20 rounded-xl p-4 text-center"><p className="text-3xl font-bold">${hostFeeStats.collected.toLocaleString()}</p><p className="text-teal-100 text-sm">of ${hostFeeStats.target.toLocaleString()}</p></div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4">
              <input type="text" placeholder="🔍 Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 mb-4 text-sm" />
              <div className="space-y-3">
                {groups.map((group, gIdx) => {
                  const filteredMembers = group.members.filter(m => !searchTerm || m.toLowerCase().includes(searchTerm.toLowerCase()));
                  if (filteredMembers.length === 0) return null;
                  const paidCount = group.members.filter((_, mIdx) => hostFeePayments[`${selectedMeeting}-${gIdx}-${mIdx}`]).length;
                  return (
                    <div key={gIdx} className="border rounded-lg overflow-hidden">
                      <div className="p-2 flex items-center justify-between" style={{ backgroundColor: group.color + '15' }}><span className="font-bold text-sm" style={{ color: group.color }}>{group.name}</span><span className="text-xs" style={{ color: group.color }}>{paidCount}/{group.members.length}</span></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
                        {filteredMembers.map((member) => {
                          const actualIdx = group.members.indexOf(member);
                          const isPaid = hostFeePayments[`${selectedMeeting}-${gIdx}-${actualIdx}`];
                          return (
                            <div key={member} className={`flex items-center justify-between p-2 rounded-lg text-sm ${isPaid ? 'bg-teal-50' : 'bg-gray-50'}`}>
                              <span className="font-medium text-gray-800 truncate">{member}</span>
                              <button onClick={() => toggleHostFee(selectedMeeting, gIdx, actualIdx)} disabled={!isAdmin} className={`px-3 py-1 rounded text-xs font-bold ${isPaid ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'} ${isAdmin ? '' : 'cursor-not-allowed'}`}>{isPaid ? '✓' : '$20'}</button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <p className="text-sm font-medium text-gray-600 mb-2">📅 Meeting</p>
              <div className="flex gap-2 overflow-x-auto pb-2">{meetings.map((m, idx) => (<button key={idx} onClick={() => setSelectedMeeting(idx)} className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${selectedMeeting === idx ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-blue-100'}`}>{m.date}</button>))}</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div><p className="text-blue-100 text-sm">{currentMeeting?.full}</p><h2 className="text-xl font-bold">✋ Attendance</h2></div>
                <div className="bg-white/20 rounded-xl p-4 text-center"><p className="text-3xl font-bold">{attendanceStats.present}/{attendanceStats.total}</p><p className="text-blue-100 text-sm">{attendanceStats.percentage}% present</p></div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4">
              <input type="text" placeholder="🔍 Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 mb-4 text-sm" />
              <div className="space-y-3">
                {groups.map((group, gIdx) => {
                  const filteredMembers = group.members.filter(m => !searchTerm || m.toLowerCase().includes(searchTerm.toLowerCase()));
                  if (filteredMembers.length === 0) return null;
                  const presentCount = group.members.filter((_, mIdx) => attendance[`${selectedMeeting}-${gIdx}-${mIdx}`]).length;
                  return (
                    <div key={gIdx} className="border rounded-lg overflow-hidden">
                      <div className="p-2 flex items-center justify-between" style={{ backgroundColor: group.color + '15' }}><span className="font-bold text-sm" style={{ color: group.color }}>{group.name}</span><span className="text-xs" style={{ color: group.color }}>{presentCount}/{group.members.length} present</span></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
                        {filteredMembers.map((member) => {
                          const actualIdx = group.members.indexOf(member);
                          const isPresent = attendance[`${selectedMeeting}-${gIdx}-${actualIdx}`];
                          return (
                            <div key={member} className={`flex items-center justify-between p-2 rounded-lg text-sm ${isPresent ? 'bg-blue-50' : 'bg-gray-50'}`}>
                              <span className="font-medium text-gray-800 truncate">{member}</span>
                              <button onClick={() => toggleAttendance(selectedMeeting, gIdx, actualIdx)} disabled={!isAdmin} className={`px-3 py-1 rounded text-xs font-bold ${isPresent ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} ${isAdmin ? '' : 'cursor-not-allowed'}`}>{isPresent ? '✓ Present' : 'Absent'}</button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-4">
            {meetings.map((meeting, idx) => {
              const hStats = getMeetingHostFeeStats(idx);
              const aStats = getMeetingAttendanceStats(idx);
              return (
                <div key={idx} className={`bg-white rounded-xl shadow-lg overflow-hidden ${idx === 0 ? 'ring-2 ring-emerald-400' : ''}`}>
                  <div className={`p-3 flex items-center justify-between ${idx === 0 ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white' : 'bg-gray-50'}`}>
                    <div>
                      <span className={`text-xs font-bold ${idx === 0 ? 'text-emerald-100' : 'text-gray-500'}`}>Meeting #{idx + 1}</span>
                      <p className={`font-bold ${idx === 0 ? 'text-white' : 'text-gray-800'}`}>{meeting.full}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isAdmin && <button onClick={() => { setEditingNotes({ meetingIdx: idx, note: meetingNotes[idx] || '' }); setShowNotesModal(true); }} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">📝</button>}
                      {idx === 0 && <span className="bg-white text-emerald-600 text-xs font-bold px-3 py-1 rounded-full">NEXT</span>}
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm text-gray-600 mb-2">🏠 {meeting.host} • {meeting.city}</p>
                    {meetingNotes[idx] && <p className="text-xs text-gray-500 mb-2 bg-yellow-50 p-2 rounded">📝 {meetingNotes[idx]}</p>}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {groups.map((group, gIdx) => {
                        const beneficiary = getBeneficiary(gIdx, idx);
                        const stats = getGroupMeetingStats(idx, gIdx);
                        return (
                          <div key={gIdx} className="p-2 rounded-lg border text-sm" style={{ borderColor: group.color + '50' }}>
                            <p className="text-xs font-bold truncate" style={{ color: group.color }}>{group.name}</p>
                            <p className="font-medium text-gray-800 truncate text-xs">{beneficiary.name}</p>
                            <div className="bg-gray-200 rounded-full h-1.5 mt-1"><div className="h-full rounded-full" style={{ width: `${stats.njangiPercentage}%`, backgroundColor: group.color }}/></div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-2 pt-2 border-t flex items-center justify-between text-xs text-gray-500">
                      <span>🍽️ {hStats.paid}/{hStats.total} paid</span>
                      <span>✋ {aStats.present}/{aStats.total}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h3 className="font-bold text-gray-800">👥 All {totalMembers} Members</h3>
              <div className="flex gap-2">
                {isAdmin && <button onClick={() => setShowAddMemberModal(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm font-medium">➕ Add</button>}
                <input type="text" placeholder="🔍 Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2 rounded-lg border-2 border-gray-200 text-sm w-48" />
              </div>
            </div>
            <div className="space-y-4">
              {groups.map((group, gIdx) => {
                const filteredMembers = group.members.filter(m => !searchTerm || m.toLowerCase().includes(searchTerm.toLowerCase()));
                if (filteredMembers.length === 0 && searchTerm) return null;
                return (
                  <div key={gIdx} className="border rounded-xl overflow-hidden">
                    <div className="p-3 flex items-center justify-between" style={{ backgroundColor: group.color, color: 'white' }}>
                      <span className="font-bold">{group.name}</span>
                      <span className="text-sm opacity-80">{group.members.length} members</span>
                    </div>
                    <div className="p-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {(searchTerm ? filteredMembers : group.members).map((member, mIdx) => {
                          const actualIdx = group.members.indexOf(member);
                          return (
                            <div key={actualIdx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: group.color }}>{actualIdx + 1}</div>
                                <span className="font-medium text-gray-800 text-sm">{member}</span>
                              </div>
                              {isAdmin && <button onClick={() => { setEditingMember({ groupIdx: gIdx, memberIdx: actualIdx, name: member }); setShowEditMemberModal(true); }} className="text-gray-400 hover:text-blue-500">✏️</button>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* WhatsApp Tab */}
        {activeTab === 'whatsapp' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <h2 className="text-2xl font-bold">📱 WhatsApp</h2>
              <p className="text-green-100 mt-2">Generate and share updates</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-5">
                <h3 className="font-bold text-gray-800 mb-3">📊 Full Summary</h3>
                <select onChange={(e) => setSelectedMeeting(parseInt(e.target.value))} value={selectedMeeting} className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 mb-3">
                  {meetings.map((m, idx) => (<option key={idx} value={idx}>#{idx + 1}: {m.full}</option>))}
                </select>
                <button onClick={() => openWhatsAppWithOptions('summary')} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold">📱 Generate</button>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-5">
                <h3 className="font-bold text-gray-800 mb-3">🔔 Reminder</h3>
                <select onChange={(e) => setSelectedMeeting(parseInt(e.target.value))} value={selectedMeeting} className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 mb-3">
                  {meetings.map((m, idx) => (<option key={idx} value={idx}>#{idx + 1}: {m.full}</option>))}
                </select>
                <button onClick={() => openWhatsAppWithOptions('reminder')} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold">📱 Generate</button>
              </div>
            </div>
          </div>
        )}

        {/* Rules Tab */}
        {activeTab === 'rules' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {rules.map((rule, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-emerald-500">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{rule.icon}</span>
                    <div><h3 className="font-bold text-gray-800">{rule.title}</h3><p className="text-gray-600 text-sm">{rule.text}</p></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-5 text-white">
              <h3 className="font-bold text-lg mb-4">💰 Per Meeting</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white/20 rounded-lg p-3"><p className="text-2xl font-bold">$1,000</p><p className="text-sm">Njangi</p></div>
                <div className="bg-white/20 rounded-lg p-3"><p className="text-2xl font-bold">$100</p><p className="text-sm">Savings</p></div>
                <div className="bg-white/20 rounded-lg p-3"><p className="text-2xl font-bold">$20</p><p className="text-sm">Host Fee</p></div>
                <div className="bg-white/20 rounded-lg p-3"><p className="text-2xl font-bold">$1,120</p><p className="text-sm">TOTAL</p></div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-emerald-800 text-white py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-bold">🌴 Nikom Ni Mankon 🌴</p>
          <p className="text-emerald-300 text-sm">Maryland, USA • Growing Together</p>
          <div className="mt-4 flex flex-col items-center gap-2">
            <p className="text-emerald-400 text-xs">Built by</p>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-xl px-4 py-2">
              <svg width="36" height="36" viewBox="0 0 100 100">
                <rect x="5" y="5" width="90" height="90" rx="18" fill="#10B981"/>
                <text x="50" y="62" fontFamily="Arial Black, sans-serif" fontSize="36" fontWeight="900" fill="white" textAnchor="middle">TA</text>
              </svg>
              <div className="flex flex-col items-start">
                <span className="font-bold text-white text-sm leading-tight">TECH</span>
                <span className="text-gray-300 text-sm leading-tight">SOLUTIONS</span>
              </div>
            </div>
            <a href="tel:+15714472698" className="text-emerald-300 text-xs hover:text-white transition-colors">📞 (571) 447-2698</a>
          </div>
          <p className="text-emerald-400 text-xs mt-3">🇨🇲 × 🇺🇸</p>
        </div>
      </footer>
    </div>
  );
}
