import React, { useState, useMemo, useEffect, useRef } from 'react';

const DEFAULT_PASSWORD = 'nikom2026';

const defaultGroups = [
  { name: 'Group One', color: '#059669', gradient: 'from-emerald-500 to-green-600',
    members: ['Julius Ndenga', 'Vivalis Mbongdula', 'Christopher Chibayem', 'Anandome M-Angwafo III', 'Dephine Ndonga', 'Alexis Nkwaff', 'Bih Nicole Ndenga', 'Tsi Nkwenti-Angwafo III', 'Warah Franklin', 'Nji Kenneth', 'Kenneth Forloh', 'Nathan Fogweh'] },
  { name: 'Group Two', color: '#10B981', gradient: 'from-green-500 to-teal-600',
    members: ['Noah Ahota', 'Monka M-Angwafo III', 'Theresia Ndifon', 'Teriri Solanji', 'Fon Rudolph Acha', 'Mbila Ngum', 'Fon Rudolph Nde', 'Eric Amugcho', 'Tsi Akongi', 'Nji Kenneth Tabi', 'Davis Achiri-Ndi', 'Agerbinma Ngum'] },
  { name: 'Group Three', color: '#14B8A6', gradient: 'from-teal-500 to-cyan-600',
    members: ['Bih Nicole Ndenga II', 'BihElla M-Angwafo III', 'Kendell Nde', 'Handsy Tar', 'Tsi Ndiffor', 'Dr. Emmanuel Nde', 'Kenneth Forloh II', 'Peter Tamsaung', 'Stephanie Tantoh', 'Nji Kenneth Achu', 'George Fogweh', 'Shela Ndedi'] },
  { name: 'Group Four', color: '#0D9488', gradient: 'from-cyan-500 to-blue-600',
    members: ['Constance Akuma', 'Noah Ahota II', 'Julius Ndenga II', 'Lean Yenla Mbah', 'Dr. Akwar Nde', 'Handsy Tar II', 'Vicky Ngong', 'Elvis Fru Nde', 'Warah Franklin II'] },
  { name: 'Group Five', color: '#065F46', gradient: 'from-emerald-600 to-green-700',
    members: ['Dr. Valentine Nde', 'George Tsunday', 'Nancy Lebanon', 'Belen Ndenga', 'Stephano Ndenga', 'Felix Azinwi', 'Kabiena Grace', 'Davis Chikham-Tejan', 'Anagnen Eric', 'Cyntheric Zama', 'Nkindeng Henry', 'Patience Maazi', 'Lesly Acha', 'Shela Ndedi II', 'Solangi Jestil', 'Cynthia Fru'] }
];

const defaultMeetings = [
  { date: '01/11/2026', full: 'January 11, 2026', host: 'Bih Nicole Ndenga II', city: 'Baltimore, MD' },
  { date: '01/25/2026', full: 'January 25, 2026', host: 'BihElla M-Angwafo III', city: 'Silver Spring, MD' },
  { date: '02/08/2026', full: 'February 8, 2026', host: 'Kendell Nde', city: 'Columbia, MD' },
  { date: '02/22/2026', full: 'February 22, 2026', host: 'Handsy Tar', city: 'Laurel, MD' },
  { date: '03/08/2026', full: 'March 8, 2026', host: 'Tsi Ndiffor', city: 'Germantown, MD' },
  { date: '03/22/2026', full: 'March 22, 2026', host: 'Dr. Emmanuel Nde', city: 'Rockville, MD' },
  { date: '04/05/2026', full: 'April 5, 2026', host: 'Kenneth Forloh II', city: 'Bowie, MD' },
  { date: '04/19/2026', full: 'April 19, 2026', host: 'Peter Tamsaung', city: 'Gaithersburg, MD' },
  { date: '05/03/2026', full: 'May 3, 2026', host: 'Stephanie Tantoh', city: 'Hyattsville, MD' },
  { date: '05/17/2026', full: 'May 17, 2026', host: 'Nji Kenneth Achu', city: 'Frederick, MD' },
  { date: '05/31/2026', full: 'May 31, 2026', host: 'George Fogweh', city: 'Annapolis, MD' },
  { date: '06/14/2026', full: 'June 14, 2026', host: 'Shela Ndedi', city: 'Towson, MD' }
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
const STORAGE_KEY = 'nikom_ni_mankon_data_v5';

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

export default function NikomNiMankon() {
  // Auth & Admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [rememberLogin, setRememberLogin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminPassword, setAdminPassword] = useState(DEFAULT_PASSWORD);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Core State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMeeting, setSelectedMeeting] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState(defaultGroups);
  const [meetings, setMeetings] = useState(defaultMeetings);
  const [njangiPayments, setNjangiPayments] = useState({});
  const [hostFeePayments, setHostFeePayments] = useState({});
  const [savingsFundPayments, setSavingsFundPayments] = useState({});
  const [hostInfo, setHostInfo] = useState(defaultMeetings.map(() => ({ address: '', phone: '' })));
  const [beneficiaryOverrides, setBeneficiaryOverrides] = useState({});
  const [meetingNotes, setMeetingNotes] = useState({});
  
  // Visibility & WhatsApp
  const [visibility, setVisibility] = useState({ njangi: false, savings: false, hostFee: false });
  const [whatsAppOptions, setWhatsAppOptions] = useState({ includeNjangi: true, includeSavings: false, includeHostFee: true, includeNotes: true });
  
  // New Features
  const [memberContacts, setMemberContacts] = useState({}); // key: "groupIdx-memberIdx", value: {phone, email}
  const [memberPhotos, setMemberPhotos] = useState({}); // key: "groupIdx-memberIdx", value: base64
  const [archivedMembers, setArchivedMembers] = useState([]); // [{groupIdx, memberIdx, name, archivedAt}]
  const [paymentMethods, setPaymentMethods] = useState({}); // key: "type-meetingIdx-groupIdx-memberIdx", value: method
  const [receiptNumbers, setReceiptNumbers] = useState({}); // key: "type-meetingIdx-groupIdx-memberIdx", value: receipt
  const [lateFees, setLateFees] = useState({}); // key: "meetingIdx-groupIdx-memberIdx", value: {amount, paid, date}
  const [paymentHistory, setPaymentHistory] = useState([]); // [{action, type, member, amount, timestamp, by}]
  const [attendance, setAttendance] = useState({}); // key: "meetingIdx-groupIdx-memberIdx", value: boolean
  const [meetingAgendas, setMeetingAgendas] = useState({}); // key: meetingIdx, value: [{item, completed}]
  const [reminders, setReminders] = useState([]); // [{id, title, date, sent}]
  
  // UI State
  const [editingHost, setEditingHost] = useState(null);
  const [editForm, setEditForm] = useState({ address: '', phone: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [showEditMemberModal, setShowEditMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState({ groupIdx: 0, memberIdx: 0, name: '' });
  const [showBeneficiaryModal, setShowBeneficiaryModal] = useState(false);
  const [editingBeneficiary, setEditingBeneficiary] = useState({ meetingIdx: 0, groupIdx: 0 });
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [editingNotes, setEditingNotes] = useState({ meetingIdx: 0, note: '' });
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportMeeting, setReportMeeting] = useState(0);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showWhatsAppOptionsModal, setShowWhatsAppOptionsModal] = useState(false);
  const [pendingWhatsAppType, setPendingWhatsAppType] = useState(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberGroup, setNewMemberGroup] = useState(0);
  const [showMemberDetailsModal, setShowMemberDetailsModal] = useState(false);
  const [selectedMemberDetails, setSelectedMemberDetails] = useState({ groupIdx: 0, memberIdx: 0 });
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);
  const [paymentDetailsInfo, setPaymentDetailsInfo] = useState({});
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showAddMeetingModal, setShowAddMeetingModal] = useState(false);
  const [newMeeting, setNewMeeting] = useState({ date: '', full: '', host: '', city: '' });
  const [showEditMeetingModal, setShowEditMeetingModal] = useState(false);
  const [editingMeetingIdx, setEditingMeetingIdx] = useState(0);
  const [showAgendaModal, setShowAgendaModal] = useState(false);
  const [showRemindersModal, setShowRemindersModal] = useState(false);
  const [showLateFeeModal, setShowLateFeeModal] = useState(false);
  const [lateFeeInfo, setLateFeeInfo] = useState({});
  const [showChartsModal, setShowChartsModal] = useState(false);
  const reportRef = useRef(null);
  const fileInputRef = useRef(null);

  const totalMembers = useMemo(() => groups.reduce((a, g) => a + g.members.length, 0), [groups]);

  // Load Data
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.adminPassword) setAdminPassword(data.adminPassword);
        if (data.njangiPayments) setNjangiPayments(data.njangiPayments);
        if (data.hostFeePayments) setHostFeePayments(data.hostFeePayments);
        if (data.savingsFundPayments) setSavingsFundPayments(data.savingsFundPayments);
        if (data.hostInfo) setHostInfo(data.hostInfo);
        if (data.beneficiaryOverrides) setBeneficiaryOverrides(data.beneficiaryOverrides);
        if (data.meetingNotes) setMeetingNotes(data.meetingNotes);
        if (data.groups) setGroups(data.groups);
        if (data.meetings) setMeetings(data.meetings);
        if (data.visibility) setVisibility(data.visibility);
        if (data.whatsAppOptions) setWhatsAppOptions(data.whatsAppOptions);
        if (data.memberContacts) setMemberContacts(data.memberContacts);
        if (data.memberPhotos) setMemberPhotos(data.memberPhotos);
        if (data.archivedMembers) setArchivedMembers(data.archivedMembers);
        if (data.paymentMethods) setPaymentMethods(data.paymentMethods);
        if (data.receiptNumbers) setReceiptNumbers(data.receiptNumbers);
        if (data.lateFees) setLateFees(data.lateFees);
        if (data.paymentHistory) setPaymentHistory(data.paymentHistory);
        if (data.attendance) setAttendance(data.attendance);
        if (data.meetingAgendas) setMeetingAgendas(data.meetingAgendas);
        if (data.reminders) setReminders(data.reminders);
        if (data.rememberLogin && data.isLoggedIn) setIsAdmin(true);
      } catch (e) { console.error('Error loading data:', e); }
    } else {
      setShowSetupModal(true);
    }
  }, []);

  // Save Data
  useEffect(() => {
    const data = {
      adminPassword, njangiPayments, hostFeePayments, savingsFundPayments, hostInfo,
      beneficiaryOverrides, meetingNotes, groups, meetings, visibility, whatsAppOptions,
      memberContacts, memberPhotos, archivedMembers, paymentMethods, receiptNumbers,
      lateFees, paymentHistory, attendance, meetingAgendas, reminders,
      rememberLogin, isLoggedIn: rememberLogin && isAdmin
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [adminPassword, njangiPayments, hostFeePayments, savingsFundPayments, hostInfo,
      beneficiaryOverrides, meetingNotes, groups, meetings, visibility, whatsAppOptions,
      memberContacts, memberPhotos, archivedMembers, paymentMethods, receiptNumbers,
      lateFees, paymentHistory, attendance, meetingAgendas, reminders, rememberLogin, isAdmin]);

  // Auth Functions
  const handleLogin = () => {
    if (passwordInput === adminPassword) {
      setIsAdmin(true); setShowLoginModal(false); setPasswordInput(''); setLoginError('');
    } else { setLoginError('Incorrect password'); }
  };

  const handleSetupPassword = () => {
    if (newPassword.length < 4) { setLoginError('Password must be at least 4 characters'); return; }
    if (newPassword !== confirmPassword) { setLoginError('Passwords do not match'); return; }
    setAdminPassword(newPassword); setShowSetupModal(false); setIsAdmin(true);
    setNewPassword(''); setConfirmPassword(''); setLoginError('');
    addToHistory('system', 'Admin password created', '', 'System');
    triggerConfetti();
  };

  const handleChangePassword = () => {
    if (passwordInput !== adminPassword) { setLoginError('Current password is incorrect'); return; }
    if (newPassword.length < 4) { setLoginError('New password must be at least 4 characters'); return; }
    if (newPassword !== confirmPassword) { setLoginError('New passwords do not match'); return; }
    setAdminPassword(newPassword); setShowChangePasswordModal(false);
    setPasswordInput(''); setNewPassword(''); setConfirmPassword(''); setLoginError('');
    addToHistory('system', 'Admin password changed', '', 'Admin');
    triggerConfetti();
  };

  // History Logging
  const addToHistory = (type, action, member, by = 'Admin') => {
    const entry = { type, action, member, by, timestamp: new Date().toISOString() };
    setPaymentHistory(prev => [entry, ...prev].slice(0, 500));
  };

  // Core Functions
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

  const togglePayment = (type, meetingIdx, groupIdx, memberIdx, setFunc, payments) => {
    if (!isAdmin) return;
    const key = `${meetingIdx}-${groupIdx}-${memberIdx}`;
    const memberName = groups[groupIdx].members[memberIdx];
    const newVal = !payments[key];
    setFunc(prev => ({ ...prev, [key]: newVal }));
    
    const amounts = { njangi: 1000, hostFee: 20, savings: 100 };
    addToHistory(type, newVal ? 'Marked as PAID' : 'Marked as UNPAID', memberName);
    
    if (newVal) {
      triggerConfetti();
      setPaymentDetailsInfo({ type, meetingIdx, groupIdx, memberIdx, key: `${type}-${key}` });
      setShowPaymentDetailsModal(true);
    }
  };

  const toggleNjangi = (m, g, i) => togglePayment('njangi', m, g, i, setNjangiPayments, njangiPayments);
  const toggleHostFee = (m, g, i) => togglePayment('hostFee', m, g, i, setHostFeePayments, hostFeePayments);
  const toggleSavingsFund = (m, g, i) => togglePayment('savings', m, g, i, setSavingsFundPayments, savingsFundPayments);

  const toggleAttendance = (meetingIdx, groupIdx, memberIdx) => {
    if (!isAdmin) return;
    const key = `${meetingIdx}-${groupIdx}-${memberIdx}`;
    const memberName = groups[groupIdx].members[memberIdx];
    const newVal = !attendance[key];
    setAttendance(prev => ({ ...prev, [key]: newVal }));
    addToHistory('attendance', newVal ? 'Marked PRESENT' : 'Marked ABSENT', memberName);
    if (newVal) triggerConfetti();
  };

  // Stats Functions
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
    let totalNjangi = 0, totalHostFee = 0, totalSavings = 0, totalLateFees = 0;
    Object.values(njangiPayments).forEach(v => { if (v) totalNjangi++; });
    Object.values(hostFeePayments).forEach(v => { if (v) totalHostFee++; });
    Object.values(savingsFundPayments).forEach(v => { if (v) totalSavings++; });
    Object.values(lateFees).forEach(v => { if (v.paid) totalLateFees += v.amount; });
    return {
      totalNjangiCollected: totalNjangi * 1000,
      totalHostFeeCollected: totalHostFee * 20,
      totalSavingsCollected: totalSavings * 100,
      totalLateFeesCollected: totalLateFees,
      totalCollected: (totalNjangi * 1000) + (totalHostFee * 20) + (totalSavings * 100) + totalLateFees
    };
  };

  const overallStats = getOverallStats();
  const currentMeeting = meetings[selectedMeeting];
  const hostFeeStats = getMeetingHostFeeStats(selectedMeeting);
  const savingsStats = getMeetingSavingsStats(selectedMeeting);
  const attendanceStats = getMeetingAttendanceStats(selectedMeeting);

  // Member Management
  const addNewMember = () => {
    if (!newMemberName.trim()) return;
    setGroups(prev => prev.map((g, idx) => {
      if (idx === newMemberGroup) {
        return { ...g, members: [...g.members, newMemberName.trim()] };
      }
      return g;
    }));
    addToHistory('member', 'Added new member', newMemberName.trim());
    setNewMemberName(''); setShowAddMemberModal(false); triggerConfetti();
  };

  const archiveMember = (groupIdx, memberIdx) => {
    const memberName = groups[groupIdx].members[memberIdx];
    setArchivedMembers(prev => [...prev, { groupIdx, memberIdx, name: memberName, archivedAt: new Date().toISOString() }]);
    setGroups(prev => prev.map((g, gIdx) => {
      if (gIdx === groupIdx) {
        return { ...g, members: g.members.filter((_, mIdx) => mIdx !== memberIdx) };
      }
      return g;
    }));
    addToHistory('member', 'Archived member', memberName);
    setShowMemberDetailsModal(false);
  };

  const restoreMember = (archived, index) => {
    setGroups(prev => prev.map((g, gIdx) => {
      if (gIdx === archived.groupIdx) {
        return { ...g, members: [...g.members, archived.name] };
      }
      return g;
    }));
    setArchivedMembers(prev => prev.filter((_, i) => i !== index));
    addToHistory('member', 'Restored member', archived.name);
    triggerConfetti();
  };

  // Photo Upload
  const handlePhotoUpload = (e, groupIdx, memberIdx) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const key = `${groupIdx}-${memberIdx}`;
      setMemberPhotos(prev => ({ ...prev, [key]: event.target.result }));
      addToHistory('member', 'Photo uploaded', groups[groupIdx].members[memberIdx]);
    };
    reader.readAsDataURL(file);
  };

  // Meeting Management
  const addMeeting = () => {
    if (!newMeeting.date || !newMeeting.host) return;
    const dateObj = new Date(newMeeting.date);
    const fullDate = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const shortDate = dateObj.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    const meeting = { date: shortDate, full: fullDate, host: newMeeting.host, city: newMeeting.city || 'TBD' };
    setMeetings(prev => [...prev, meeting]);
    setHostInfo(prev => [...prev, { address: '', phone: '' }]);
    addToHistory('meeting', 'Added new meeting', fullDate);
    setNewMeeting({ date: '', full: '', host: '', city: '' }); setShowAddMeetingModal(false); triggerConfetti();
  };

  const updateMeeting = () => {
    const dateObj = new Date(newMeeting.date);
    const fullDate = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const shortDate = dateObj.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    setMeetings(prev => prev.map((m, idx) => {
      if (idx === editingMeetingIdx) {
        return { date: shortDate, full: fullDate, host: newMeeting.host, city: newMeeting.city };
      }
      return m;
    }));
    addToHistory('meeting', 'Updated meeting', fullDate);
    setShowEditMeetingModal(false); triggerConfetti();
  };

  const deleteMeeting = (idx) => {
    if (!window.confirm('Delete this meeting? This cannot be undone.')) return;
    const meetingName = meetings[idx].full;
    setMeetings(prev => prev.filter((_, i) => i !== idx));
    setHostInfo(prev => prev.filter((_, i) => i !== idx));
    addToHistory('meeting', 'Deleted meeting', meetingName);
  };

  // Late Fees
  const addLateFee = () => {
    const { meetingIdx, groupIdx, memberIdx, amount } = lateFeeInfo;
    if (!amount || amount <= 0) return;
    const key = `${meetingIdx}-${groupIdx}-${memberIdx}`;
    const memberName = groups[groupIdx].members[memberIdx];
    setLateFees(prev => ({ ...prev, [key]: { amount: parseFloat(amount), paid: false, date: new Date().toISOString() } }));
    addToHistory('lateFee', `Late fee of $${amount} added`, memberName);
    setShowLateFeeModal(false); triggerConfetti();
  };

  const toggleLateFeePaid = (key) => {
    setLateFees(prev => ({ ...prev, [key]: { ...prev[key], paid: !prev[key].paid } }));
  };

  // Agenda
  const addAgendaItem = (meetingIdx, item) => {
    if (!item.trim()) return;
    setMeetingAgendas(prev => ({
      ...prev,
      [meetingIdx]: [...(prev[meetingIdx] || []), { item: item.trim(), completed: false }]
    }));
  };

  const toggleAgendaItem = (meetingIdx, itemIdx) => {
    setMeetingAgendas(prev => ({
      ...prev,
      [meetingIdx]: prev[meetingIdx].map((item, idx) => idx === itemIdx ? { ...item, completed: !item.completed } : item)
    }));
  };

  const removeAgendaItem = (meetingIdx, itemIdx) => {
    setMeetingAgendas(prev => ({
      ...prev,
      [meetingIdx]: prev[meetingIdx].filter((_, idx) => idx !== itemIdx)
    }));
  };

  // Reminders
  const addReminder = (title, date) => {
    const reminder = { id: Date.now(), title, date, sent: false };
    setReminders(prev => [...prev, reminder]);
    addToHistory('reminder', 'Reminder created', title);
  };

  const deleteReminder = (id) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  // Export/Import
  const exportData = () => {
    const data = {
      version: 'v5',
      exportedAt: new Date().toISOString(),
      adminPassword, njangiPayments, hostFeePayments, savingsFundPayments, hostInfo,
      beneficiaryOverrides, meetingNotes, groups, meetings, visibility, whatsAppOptions,
      memberContacts, memberPhotos, archivedMembers, paymentMethods, receiptNumbers,
      lateFees, paymentHistory, attendance, meetingAgendas, reminders
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nikom_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToHistory('system', 'Data exported', '');
  };

  const handleImport = () => {
    try {
      const data = JSON.parse(importData);
      if (data.adminPassword) setAdminPassword(data.adminPassword);
      if (data.njangiPayments) setNjangiPayments(data.njangiPayments);
      if (data.hostFeePayments) setHostFeePayments(data.hostFeePayments);
      if (data.savingsFundPayments) setSavingsFundPayments(data.savingsFundPayments);
      if (data.hostInfo) setHostInfo(data.hostInfo);
      if (data.beneficiaryOverrides) setBeneficiaryOverrides(data.beneficiaryOverrides);
      if (data.meetingNotes) setMeetingNotes(data.meetingNotes);
      if (data.groups) setGroups(data.groups);
      if (data.meetings) setMeetings(data.meetings);
      if (data.visibility) setVisibility(data.visibility);
      if (data.whatsAppOptions) setWhatsAppOptions(data.whatsAppOptions);
      if (data.memberContacts) setMemberContacts(data.memberContacts);
      if (data.memberPhotos) setMemberPhotos(data.memberPhotos);
      if (data.archivedMembers) setArchivedMembers(data.archivedMembers);
      if (data.paymentMethods) setPaymentMethods(data.paymentMethods);
      if (data.receiptNumbers) setReceiptNumbers(data.receiptNumbers);
      if (data.lateFees) setLateFees(data.lateFees);
      if (data.paymentHistory) setPaymentHistory(data.paymentHistory);
      if (data.attendance) setAttendance(data.attendance);
      if (data.meetingAgendas) setMeetingAgendas(data.meetingAgendas);
      if (data.reminders) setReminders(data.reminders);
      addToHistory('system', 'Data imported', '');
      setShowImportModal(false); setImportData(''); triggerConfetti();
      alert('Data imported successfully!');
    } catch (e) {
      alert('Invalid backup file. Please check the data format.');
    }
  };

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImportData(event.target.result);
    };
    reader.readAsText(file);
  };

  // UI Helpers
  const triggerConfetti = () => { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 2000); };
  const saveHostInfo = (meetingIdx) => { if (!isAdmin) return; setHostInfo(prev => prev.map((h, i) => i === meetingIdx ? editForm : h)); setEditingHost(null); triggerConfetti(); };
  const saveMemberName = () => {
    if (!isAdmin) return;
    const { groupIdx, memberIdx, name } = editingMember;
    const oldName = groups[groupIdx].members[memberIdx];
    setGroups(prev => prev.map((g, gIdx) => { if (gIdx === groupIdx) { const newMembers = [...g.members]; newMembers[memberIdx] = name; return { ...g, members: newMembers }; } return g; }));
    addToHistory('member', `Name changed from "${oldName}" to "${name}"`, name);
    setShowEditMemberModal(false); triggerConfetti();
  };
  const saveBeneficiaryOverride = (memberIdx) => {
    if (!isAdmin) return;
    const { meetingIdx, groupIdx } = editingBeneficiary;
    setBeneficiaryOverrides(prev => ({ ...prev, [`${meetingIdx}-${groupIdx}`]: memberIdx }));
    addToHistory('beneficiary', 'Beneficiary changed', groups[groupIdx].members[memberIdx]);
    setShowBeneficiaryModal(false); triggerConfetti();
  };
  const clearBeneficiaryOverride = () => {
    const { meetingIdx, groupIdx } = editingBeneficiary;
    setBeneficiaryOverrides(prev => { const n = { ...prev }; delete n[`${meetingIdx}-${groupIdx}`]; return n; });
    addToHistory('beneficiary', 'Beneficiary reset to default', groups[groupIdx].name);
    setShowBeneficiaryModal(false);
  };
  const saveMeetingNotes = () => { if (!isAdmin) return; setMeetingNotes(prev => ({ ...prev, [editingNotes.meetingIdx]: editingNotes.note })); addToHistory('notes', 'Meeting notes updated', meetings[editingNotes.meetingIdx].full); setShowNotesModal(false); triggerConfetti(); };

  // WhatsApp Functions
  const generateMeetingSummary = (meetingIdx, options = whatsAppOptions) => {
    const meeting = meetings[meetingIdx];
    const hostStats = getMeetingHostFeeStats(meetingIdx);
    const savingsStatsM = getMeetingSavingsStats(meetingIdx);
    let message = `🌴 *NIKOM NI MANKON* 🌴\n📅 *Meeting #${meetingIdx + 1}: ${meeting.full}*\n🏠 Host: ${meeting.host} (${meeting.city})\n\n`;
    if (options.includeNjangi) {
      message += `━━━━━━━━━━━━━━━━━━━━━\n💰 *GROUP NJANGI STATUS*\n━━━━━━━━━━━━━━━━━━━━━\n\n`;
      groups.forEach((group, gIdx) => {
        const beneficiary = getBeneficiary(gIdx, meetingIdx);
        const stats = getGroupMeetingStats(meetingIdx, gIdx);
        const unpaid = group.members.filter((_, mIdx) => mIdx !== beneficiary.index && !njangiPayments[`${meetingIdx}-${gIdx}-${mIdx}`]);
        message += `*${group.name}*\n⭐ Beneficiary: ${beneficiary.name}${beneficiary.isOverride ? ' (changed)' : ''}\n✅ Paid: ${stats.njangiPaid}/${stats.njangiTotal - 1}\n💵 Collected: $${stats.njangiCollected.toLocaleString()} / $${stats.njangiTarget.toLocaleString()}\n`;
        if (unpaid.length > 0 && unpaid.length <= 5) message += `⏳ Pending: ${unpaid.join(', ')}\n`;
        else if (unpaid.length > 5) message += `⏳ Pending: ${unpaid.length} members\n`;
        message += `\n`;
      });
    }
    if (options.includeHostFee) {
      message += `━━━━━━━━━━━━━━━━━━━━━\n🍽️ *HOST/FOOD FEE STATUS*\n━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `Host: ${meeting.host}\n✅ Paid: ${hostStats.paid}/${hostStats.total}\n💵 Collected: $${hostStats.collected.toLocaleString()} / $${hostStats.target.toLocaleString()}\n\n`;
    }
    if (options.includeSavings) {
      message += `━━━━━━━━━━━━━━━━━━━━━\n🏦 *SAVINGS FUND STATUS*\n━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `✅ Paid: ${savingsStatsM.paid}/${savingsStatsM.total}\n💵 Collected: $${savingsStatsM.collected.toLocaleString()} / $${savingsStatsM.target.toLocaleString()}\n\n`;
    }
    if (options.includeNotes && meetingNotes[meetingIdx]) {
      message += `━━━━━━━━━━━━━━━━━━━━━\n📝 *NOTES*\n${meetingNotes[meetingIdx]}\n\n`;
    }
    message += `━━━━━━━━━━━━━━━━━━━━━\n🌿 _Growing together in fertile ground!_ 🌿`;
    return message;
  };

  const generateGroupUpdate = (meetingIdx, groupIdx, options = whatsAppOptions) => {
    const meeting = meetings[meetingIdx];
    const group = groups[groupIdx];
    const beneficiary = getBeneficiary(groupIdx, meetingIdx);
    const stats = getGroupMeetingStats(meetingIdx, groupIdx);
    const paid = group.members.filter((_, mIdx) => njangiPayments[`${meetingIdx}-${groupIdx}-${mIdx}`]);
    const unpaid = group.members.filter((_, mIdx) => mIdx !== beneficiary.index && !njangiPayments[`${meetingIdx}-${groupIdx}-${mIdx}`]);
    let message = `🌴 *NIKOM NI MANKON* 🌴\n📅 Meeting: ${meeting.full}\n\n💰 *${group.name} UPDATE*\n\n⭐ *Beneficiary: ${beneficiary.name}*${beneficiary.isOverride ? ' (changed)' : ''}\n💵 Target: $${stats.njangiTarget.toLocaleString()}\n✅ Collected: $${stats.njangiCollected.toLocaleString()} (${stats.njangiPercentage}%)\n\n`;
    if (paid.length > 0) { message += `✅ *PAID (${paid.length}):*\n`; paid.forEach(m => { message += `• ${m}\n`; }); message += `\n`; }
    if (unpaid.length > 0) { message += `⏳ *PENDING (${unpaid.length}):*\n`; unpaid.forEach(m => { message += `• ${m}\n`; }); message += `\n`; }
    message += `━━━━━━━━━━━━━━━━━━━━━\n🌿 _Let's complete our contributions!_ 🌿`;
    return message;
  };

  const generateReminder = (meetingIdx, options = whatsAppOptions) => {
    const meeting = meetings[meetingIdx];
    let message = `🌴 *NIKOM NI MANKON REMINDER* 🌴\n\n📅 *Next Meeting: ${meeting.full}*\n🏠 Host: ${meeting.host}\n📍 ${meeting.city}\n`;
    if (hostInfo[meetingIdx]?.address) message += `🗺️ ${hostInfo[meetingIdx].address}\n`;
    if (hostInfo[meetingIdx]?.phone) message += `📞 ${hostInfo[meetingIdx].phone}\n`;
    message += `⏰ Time: 3pm - 6pm\n\n💰 *CONTRIBUTIONS:*\n`;
    if (options.includeNjangi) message += `• $1,000 to your group's beneficiary\n`;
    if (options.includeSavings) message += `• $100 to savings fund\n`;
    if (options.includeHostFee) message += `• $20 to host for food/entertainment\n`;
    if (options.includeNjangi) {
      message += `\n⭐ *BENEFICIARIES:*\n`;
      groups.forEach((group, gIdx) => { const beneficiary = getBeneficiary(gIdx, meetingIdx); message += `• ${group.name}: ${beneficiary.name}${beneficiary.isOverride ? ' *' : ''}\n`; });
    }
    if (options.includeNotes && meetingNotes[meetingIdx]) message += `\n📝 *NOTES:* ${meetingNotes[meetingIdx]}\n`;
    message += `\n🌿 _See you there! Growing together!_ 🌿`;
    return message;
  };

  const openWhatsAppWithOptions = (type) => {
    if (isAdmin) { setPendingWhatsAppType(type); setShowWhatsAppOptionsModal(true); }
    else {
      let message = '';
      if (type === 'summary') message = generateMeetingSummary(selectedMeeting, whatsAppOptions);
      else if (type === 'group') message = generateGroupUpdate(selectedMeeting, selectedGroup, whatsAppOptions);
      else if (type === 'reminder') message = generateReminder(selectedMeeting, whatsAppOptions);
      openWhatsAppShare(message);
    }
  };

  const confirmWhatsAppOptions = () => {
    let message = '';
    if (pendingWhatsAppType === 'summary') message = generateMeetingSummary(selectedMeeting, whatsAppOptions);
    else if (pendingWhatsAppType === 'group') message = generateGroupUpdate(selectedMeeting, selectedGroup, whatsAppOptions);
    else if (pendingWhatsAppType === 'reminder') message = generateReminder(selectedMeeting, whatsAppOptions);
    setShowWhatsAppOptionsModal(false);
    openWhatsAppShare(message);
  };

  const openWhatsAppShare = (message) => { setWhatsAppMessage(message); setShowWhatsAppModal(true); setCopied(false); };
  const copyToClipboard = () => { navigator.clipboard.writeText(whatsAppMessage); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const shareToWhatsApp = () => { window.open(`https://wa.me/?text=${encodeURIComponent(whatsAppMessage)}`, '_blank'); };

  // Visibility Check
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

  const Confetti = () => (<div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">{[...Array(30)].map((_, i) => (<div key={i} className="absolute text-2xl" style={{ left: `${Math.random() * 100}%`, top: `-30px`, animation: `fall ${2 + Math.random()}s linear forwards`, animationDelay: `${Math.random() * 0.5}s` }}>{['🌴', '💰', '🌿', '🎉', '✨'][Math.floor(Math.random() * 5)]}</div>))}<style>{`@keyframes fall { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } }`}</style></div>);

  // Simple Bar Chart Component
  const SimpleBarChart = ({ data, title }) => {
    const maxVal = Math.max(...data.map(d => d.value));
    return (
      <div className="bg-white rounded-xl p-4 shadow">
        <h4 className="font-bold text-gray-800 mb-3">{title}</h4>
        <div className="space-y-2">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-20 text-xs text-gray-600 truncate">{d.label}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div className="h-full rounded-full transition-all" style={{ width: `${(d.value / maxVal) * 100}%`, backgroundColor: d.color || '#059669' }} />
              </div>
              <span className="w-16 text-xs font-bold text-right">${d.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-teal-50">
      {showConfetti && <Confetti />}
      
      {/* First Time Setup Modal */}
      {showSetupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-2">🌴 Welcome to Nikom Ni Mankon!</h3>
            <p className="text-gray-600 text-sm mb-4">Set up your admin password to get started.</p>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Create password (min 4 characters)" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-2" />
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-2" />
            {loginError && <p className="text-red-500 text-sm mb-2">{loginError}</p>}
            <button onClick={handleSetupPassword} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all mt-2">🔐 Set Password & Start</button>
            <button onClick={() => { setAdminPassword(DEFAULT_PASSWORD); setShowSetupModal(false); }} className="w-full text-gray-500 hover:text-gray-700 py-2 text-sm mt-2">Use default password (nikom2026)</button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🔐 Admin Login</h3>
            <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleLogin()} placeholder="Password" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-2" />
            <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <input type="checkbox" checked={rememberLogin} onChange={(e) => setRememberLogin(e.target.checked)} className="rounded" />
              Remember me on this device
            </label>
            {loginError && <p className="text-red-500 text-sm mb-2">{loginError}</p>}
            <div className="flex gap-2 mt-4">
              <button onClick={handleLogin} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all">Login</button>
              <button onClick={() => { setShowLoginModal(false); setPasswordInput(''); setLoginError(''); }} className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🔑 Change Password</h3>
            <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Current password" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-2" />
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password (min 4 characters)" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-2" />
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-2" />
            {loginError && <p className="text-red-500 text-sm mb-2">{loginError}</p>}
            <div className="flex gap-2 mt-4">
              <button onClick={handleChangePassword} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all">💾 Save</button>
              <button onClick={() => { setShowChangePasswordModal(false); setPasswordInput(''); setNewPassword(''); setConfirmPassword(''); setLoginError(''); }} className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">⚙️ Admin Settings</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-3">🔐 Password</h4>
                <button onClick={() => { setShowSettingsModal(false); setShowChangePasswordModal(true); }} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">🔑 Change Password</button>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-3">👁️ Tab Visibility for Members</h4>
                <div className="space-y-2">
                  {[{key: 'njangi', label: 'Group Njangi', icon: '💰'}, {key: 'savings', label: 'Savings Fund', icon: '🏦'}, {key: 'hostFee', label: 'Host/Food Fee', icon: '🍽️'}].map(item => (
                    <label key={item.key} className="flex items-center justify-between p-2 bg-white rounded-lg cursor-pointer hover:bg-emerald-50">
                      <span className="flex items-center gap-2"><span>{item.icon}</span> {item.label}</span>
                      <input type="checkbox" checked={visibility[item.key]} onChange={(e) => setVisibility({...visibility, [item.key]: e.target.checked})} className="w-5 h-5 text-emerald-500 rounded" />
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-3">💾 Data Management</h4>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => { setShowSettingsModal(false); exportData(); }} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">📤 Export Backup</button>
                  <button onClick={() => { setShowSettingsModal(false); setShowImportModal(true); }} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">📥 Import Backup</button>
                  <button onClick={() => { setShowSettingsModal(false); setShowHistoryModal(true); }} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">📜 View History</button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-3">📊 Reports & Charts</h4>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => { setShowSettingsModal(false); setShowReportModal(true); }} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">🖨️ Print Report</button>
                  <button onClick={() => { setShowSettingsModal(false); setShowChartsModal(true); }} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">📈 View Charts</button>
                </div>
              </div>

              {archivedMembers.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-bold text-gray-700 mb-3">🗄️ Archived Members ({archivedMembers.length})</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {archivedMembers.map((m, i) => (
                      <div key={i} className="flex items-center justify-between bg-white p-2 rounded-lg">
                        <span className="text-sm">{m.name} <span className="text-gray-400">({groups[m.groupIdx]?.name})</span></span>
                        <button onClick={() => restoreMember(m, i)} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200">Restore</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => setShowSettingsModal(false)} className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Close</button>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📥 Import Backup</h3>
            <p className="text-gray-600 text-sm mb-4">Upload a backup file or paste the JSON data.</p>
            <input type="file" ref={fileInputRef} accept=".json" onChange={handleFileImport} className="mb-3" />
            <textarea value={importData} onChange={(e) => setImportData(e.target.value)} placeholder="Or paste backup JSON here..." rows={6} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-4 text-xs font-mono" />
            <div className="flex gap-2">
              <button onClick={handleImport} disabled={!importData} className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-bold transition-all">📥 Import</button>
              <button onClick={() => { setShowImportModal(false); setImportData(''); }} className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[80vh] flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📜 Payment History Log</h3>
            <div className="flex-1 overflow-y-auto space-y-2">
              {paymentHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No history yet</p>
              ) : paymentHistory.map((h, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-lg text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{h.action}</span>
                    <span className="text-xs text-gray-400">{new Date(h.timestamp).toLocaleString()}</span>
                  </div>
                  {h.member && <p className="text-gray-600 text-xs">👤 {h.member}</p>}
                  <p className="text-gray-400 text-xs">Type: {h.type} • By: {h.by}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setShowHistoryModal(false)} className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Close</button>
          </div>
        </div>
      )}

      {/* Charts Modal */}
      {showChartsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Charts & Analytics</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <SimpleBarChart title="💰 Njangi by Group (All Meetings)" data={groups.map((g, gIdx) => {
                let total = 0;
                meetings.forEach((_, mIdx) => {
                  g.members.forEach((_, memberIdx) => {
                    if (njangiPayments[`${mIdx}-${gIdx}-${memberIdx}`]) total += 1000;
                  });
                });
                return { label: g.name, value: total, color: g.color };
              })} />
              <SimpleBarChart title="📅 Collections by Meeting" data={meetings.slice(0, 6).map((m, mIdx) => {
                let total = 0;
                groups.forEach((g, gIdx) => {
                  g.members.forEach((_, memberIdx) => {
                    if (njangiPayments[`${mIdx}-${gIdx}-${memberIdx}`]) total += 1000;
                    if (hostFeePayments[`${mIdx}-${gIdx}-${memberIdx}`]) total += 20;
                    if (savingsFundPayments[`${mIdx}-${gIdx}-${memberIdx}`]) total += 100;
                  });
                });
                return { label: m.date, value: total, color: '#10B981' };
              })} />
              <div className="bg-white rounded-xl p-4 shadow">
                <h4 className="font-bold text-gray-800 mb-3">📈 Overall Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between"><span>Total Njangi:</span><span className="font-bold text-emerald-600">${overallStats.totalNjangiCollected.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Total Host Fees:</span><span className="font-bold text-teal-600">${overallStats.totalHostFeeCollected.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Total Savings:</span><span className="font-bold text-purple-600">${overallStats.totalSavingsCollected.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Late Fees Collected:</span><span className="font-bold text-red-600">${overallStats.totalLateFeesCollected.toLocaleString()}</span></div>
                  <div className="border-t pt-2 flex justify-between"><span className="font-bold">GRAND TOTAL:</span><span className="font-bold text-2xl text-emerald-600">${overallStats.totalCollected.toLocaleString()}</span></div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow">
                <h4 className="font-bold text-gray-800 mb-3">👥 Member Stats</h4>
                <div className="space-y-2">
                  <div className="flex justify-between"><span>Total Members:</span><span className="font-bold">{totalMembers}</span></div>
                  <div className="flex justify-between"><span>Archived Members:</span><span className="font-bold">{archivedMembers.length}</span></div>
                  <div className="flex justify-between"><span>Total Meetings:</span><span className="font-bold">{meetings.length}</span></div>
                  <div className="flex justify-between"><span>History Entries:</span><span className="font-bold">{paymentHistory.length}</span></div>
                </div>
              </div>
            </div>
            <button onClick={() => setShowChartsModal(false)} className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Close</button>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">➕ Add New Member</h3>
            <input type="text" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} placeholder="Member name" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-3" />
            <select value={newMemberGroup} onChange={(e) => setNewMemberGroup(parseInt(e.target.value))} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-4">
              {groups.map((g, i) => <option key={i} value={i}>{g.name} ({g.members.length} members)</option>)}
            </select>
            <div className="flex gap-2">
              <button onClick={addNewMember} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all">➕ Add</button>
              <button onClick={() => { setShowAddMemberModal(false); setNewMemberName(''); }} className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Member Details Modal */}
      {showMemberDetailsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            {(() => {
              const { groupIdx, memberIdx } = selectedMemberDetails;
              const member = groups[groupIdx]?.members[memberIdx];
              const contactKey = `${groupIdx}-${memberIdx}`;
              const contact = memberContacts[contactKey] || { phone: '', email: '' };
              const photo = memberPhotos[contactKey];
              return (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {photo ? <img src={photo} alt="" className="w-full h-full object-cover" /> : <span className="text-3xl">👤</span>}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{member}</h3>
                      <p className="text-sm text-gray-500">{groups[groupIdx]?.name}</p>
                    </div>
                  </div>
                  {isAdmin && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">📸 Photo</label>
                      <input type="file" accept="image/*" onChange={(e) => handlePhotoUpload(e, groupIdx, memberIdx)} className="text-sm" />
                    </div>
                  )}
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">📞 Phone</label>
                      <input type="tel" value={contact.phone} onChange={(e) => setMemberContacts(prev => ({ ...prev, [contactKey]: { ...contact, phone: e.target.value } }))} disabled={!isAdmin} placeholder="Phone number" className="w-full px-3 py-2 rounded-lg border text-sm disabled:bg-gray-100" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">📧 Email</label>
                      <input type="email" value={contact.email} onChange={(e) => setMemberContacts(prev => ({ ...prev, [contactKey]: { ...contact, email: e.target.value } }))} disabled={!isAdmin} placeholder="Email address" className="w-full px-3 py-2 rounded-lg border text-sm disabled:bg-gray-100" />
                    </div>
                  </div>
                  {isAdmin && (
                    <div className="flex gap-2 mb-4">
                      <button onClick={() => { setEditingMember({ groupIdx, memberIdx, name: member }); setShowMemberDetailsModal(false); setShowEditMemberModal(true); }} className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg text-sm font-medium hover:bg-blue-200">✏️ Edit Name</button>
                      <button onClick={() => { if (window.confirm(`Archive ${member}? They can be restored later.`)) archiveMember(groupIdx, memberIdx); }} className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg text-sm font-medium hover:bg-red-200">🗄️ Archive</button>
                    </div>
                  )}
                  <button onClick={() => setShowMemberDetailsModal(false)} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Close</button>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Payment Details Modal */}
      {showPaymentDetailsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">💳 Payment Details</h3>
            {(() => {
              const { type, meetingIdx, groupIdx, memberIdx, key } = paymentDetailsInfo;
              const member = groups[groupIdx]?.members[memberIdx];
              const method = paymentMethods[key] || '';
              const receipt = receiptNumbers[key] || '';
              return (
                <>
                  <p className="text-gray-600 mb-4">Recording payment for <strong>{member}</strong></p>
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">💳 Payment Method</label>
                      <select value={method} onChange={(e) => setPaymentMethods(prev => ({ ...prev, [key]: e.target.value }))} className="w-full px-3 py-2 rounded-lg border">
                        <option value="">Select method...</option>
                        {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">🧾 Receipt/Reference #</label>
                      <input type="text" value={receipt} onChange={(e) => setReceiptNumbers(prev => ({ ...prev, [key]: e.target.value }))} placeholder="Optional reference number" className="w-full px-3 py-2 rounded-lg border text-sm" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setShowPaymentDetailsModal(false)} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all">✓ Done</button>
                    <button onClick={() => setShowPaymentDetailsModal(false)} className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Skip</button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Add Meeting Modal */}
      {showAddMeetingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">➕ Add New Meeting</h3>
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">📅 Date</label>
                <input type="date" value={newMeeting.date} onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})} className="w-full px-3 py-2 rounded-lg border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">🏠 Host</label>
                <input type="text" value={newMeeting.host} onChange={(e) => setNewMeeting({...newMeeting, host: e.target.value})} placeholder="Host name" className="w-full px-3 py-2 rounded-lg border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">📍 City</label>
                <input type="text" value={newMeeting.city} onChange={(e) => setNewMeeting({...newMeeting, city: e.target.value})} placeholder="City, State" className="w-full px-3 py-2 rounded-lg border" />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={addMeeting} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all">➕ Add Meeting</button>
              <button onClick={() => setShowAddMeetingModal(false)} className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Meeting Modal */}
      {showEditMeetingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">✏️ Edit Meeting</h3>
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">📅 Date</label>
                <input type="date" value={newMeeting.date} onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})} className="w-full px-3 py-2 rounded-lg border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">🏠 Host</label>
                <input type="text" value={newMeeting.host} onChange={(e) => setNewMeeting({...newMeeting, host: e.target.value})} placeholder="Host name" className="w-full px-3 py-2 rounded-lg border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">📍 City</label>
                <input type="text" value={newMeeting.city} onChange={(e) => setNewMeeting({...newMeeting, city: e.target.value})} placeholder="City, State" className="w-full px-3 py-2 rounded-lg border" />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={updateMeeting} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all">💾 Save</button>
              <button onClick={() => setShowEditMeetingModal(false)} className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Late Fee Modal */}
      {showLateFeeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">⚠️ Add Late Fee</h3>
            <p className="text-gray-600 mb-4">Adding late fee for <strong>{groups[lateFeeInfo.groupIdx]?.members[lateFeeInfo.memberIdx]}</strong></p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">💰 Amount</label>
              <input type="number" value={lateFeeInfo.amount || ''} onChange={(e) => setLateFeeInfo({...lateFeeInfo, amount: e.target.value})} placeholder="250" className="w-full px-3 py-2 rounded-lg border" />
              <p className="text-xs text-gray-500 mt-1">Standard late fee: $250</p>
            </div>
            <div className="flex gap-2">
              <button onClick={addLateFee} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold transition-all">⚠️ Add Fee</button>
              <button onClick={() => setShowLateFeeModal(false)} className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Agenda Modal */}
      {showAgendaModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[80vh] flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-2">📋 Meeting Agenda</h3>
            <p className="text-gray-600 text-sm mb-4">{meetings[selectedMeeting]?.full}</p>
            {isAdmin && (
              <div className="flex gap-2 mb-4">
                <input type="text" id="newAgendaItem" placeholder="Add agenda item..." className="flex-1 px-3 py-2 rounded-lg border text-sm" onKeyPress={(e) => { if (e.key === 'Enter') { addAgendaItem(selectedMeeting, e.target.value); e.target.value = ''; }}} />
                <button onClick={() => { const input = document.getElementById('newAgendaItem'); addAgendaItem(selectedMeeting, input.value); input.value = ''; }} className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium">Add</button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto space-y-2">
              {(meetingAgendas[selectedMeeting] || []).length === 0 ? (
                <p className="text-gray-400 text-center py-4">No agenda items yet</p>
              ) : (meetingAgendas[selectedMeeting] || []).map((item, i) => (
                <div key={i} className={`flex items-center gap-2 p-2 rounded-lg ${item.completed ? 'bg-green-50' : 'bg-gray-50'}`}>
                  <input type="checkbox" checked={item.completed} onChange={() => toggleAgendaItem(selectedMeeting, i)} disabled={!isAdmin} className="w-5 h-5" />
                  <span className={`flex-1 ${item.completed ? 'line-through text-gray-400' : ''}`}>{item.item}</span>
                  {isAdmin && <button onClick={() => removeAgendaItem(selectedMeeting, i)} className="text-red-500 hover:text-red-700">✕</button>}
                </div>
              ))}
            </div>
            <button onClick={() => setShowAgendaModal(false)} className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Close</button>
          </div>
        </div>
      )}

      {/* Reminders Modal */}
      {showRemindersModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[80vh] flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🔔 Reminders</h3>
            {isAdmin && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <input type="text" id="reminderTitle" placeholder="Reminder title..." className="w-full px-3 py-2 rounded-lg border text-sm mb-2" />
                <input type="datetime-local" id="reminderDate" className="w-full px-3 py-2 rounded-lg border text-sm mb-2" />
                <button onClick={() => {
                  const title = document.getElementById('reminderTitle').value;
                  const date = document.getElementById('reminderDate').value;
                  if (title && date) { addReminder(title, date); document.getElementById('reminderTitle').value = ''; document.getElementById('reminderDate').value = ''; }
                }} className="w-full bg-emerald-500 text-white py-2 rounded-lg font-medium">➕ Add Reminder</button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto space-y-2">
              {reminders.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No reminders set</p>
              ) : reminders.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{r.title}</p>
                    <p className="text-xs text-gray-500">{new Date(r.date).toLocaleString()}</p>
                  </div>
                  {isAdmin && <button onClick={() => deleteReminder(r.id)} className="text-red-500 hover:text-red-700">🗑️</button>}
                </div>
              ))}
            </div>
            <button onClick={() => setShowRemindersModal(false)} className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Close</button>
          </div>
        </div>
      )}

      {/* Other Existing Modals... */}
      {showEditMemberModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"><h3 className="text-xl font-bold text-gray-800 mb-4">✏️ Edit Member Name</h3><p className="text-gray-600 text-sm mb-4">{groups[editingMember.groupIdx]?.name} - Member #{editingMember.memberIdx + 1}</p><input type="text" value={editingMember.name} onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })} placeholder="Member name" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-4" /><div className="flex gap-2"><button onClick={saveMemberName} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all">💾 Save</button><button onClick={() => setShowEditMemberModal(false)} className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button></div></div></div>)}

      {showBeneficiaryModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[80vh] flex flex-col"><h3 className="text-xl font-bold text-gray-800 mb-2">🔄 Change Beneficiary</h3><p className="text-gray-600 text-sm mb-4">{meetings[editingBeneficiary.meetingIdx]?.full} - {groups[editingBeneficiary.groupIdx]?.name}</p><div className="flex-1 overflow-y-auto space-y-2 mb-4">{groups[editingBeneficiary.groupIdx]?.members.map((member, idx) => { const currentBeneficiary = getBeneficiary(editingBeneficiary.groupIdx, editingBeneficiary.meetingIdx); const isCurrentBeneficiary = idx === currentBeneficiary.index; return (<button key={idx} onClick={() => saveBeneficiaryOverride(idx)} className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${isCurrentBeneficiary ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-gray-50 hover:bg-emerald-50 border-2 border-transparent'}`}><span>{member}</span>{isCurrentBeneficiary && <span className="text-yellow-600 font-bold">⭐ Current</span>}</button>); })}</div><div className="flex gap-2">{beneficiaryOverrides[`${editingBeneficiary.meetingIdx}-${editingBeneficiary.groupIdx}`] !== undefined && (<button onClick={clearBeneficiaryOverride} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition-all">↩️ Reset to Default</button>)}<button onClick={() => setShowBeneficiaryModal(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button></div></div></div>)}

      {showNotesModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl"><h3 className="text-xl font-bold text-gray-800 mb-2">📝 Meeting Notes</h3><p className="text-gray-600 text-sm mb-4">{meetings[editingNotes.meetingIdx]?.full}</p><textarea value={editingNotes.note} onChange={(e) => setEditingNotes({ ...editingNotes, note: e.target.value })} placeholder="Add notes for this meeting..." rows={5} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-4" /><div className="flex gap-2"><button onClick={saveMeetingNotes} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all">💾 Save Notes</button><button onClick={() => setShowNotesModal(false)} className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button></div></div></div>)}

      {showWhatsAppModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[80vh] flex flex-col"><h3 className="text-xl font-bold text-gray-800 mb-4">📱 Share to WhatsApp</h3><div className="flex-1 overflow-auto mb-4"><pre className="bg-gray-100 p-4 rounded-xl text-sm whitespace-pre-wrap font-sans text-gray-700">{whatsAppMessage}</pre></div><div className="flex gap-2"><button onClick={copyToClipboard} className={`flex-1 py-3 rounded-xl font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>{copied ? '✓ Copied!' : '📋 Copy'}</button><button onClick={shareToWhatsApp} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition-all">Open WhatsApp</button></div><button onClick={() => setShowWhatsAppModal(false)} className="mt-2 text-gray-500 hover:text-gray-700 text-sm">Close</button></div></div>)}

      {showWhatsAppOptionsModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"><h3 className="text-xl font-bold text-gray-800 mb-2">📱 WhatsApp Message Options</h3><p className="text-gray-600 text-sm mb-4">Choose what to include in this message.</p><div className="space-y-3">{[{key: 'includeNjangi', label: 'Group Njangi Status', icon: '💰'}, {key: 'includeSavings', label: 'Savings Fund Status', icon: '🏦'}, {key: 'includeHostFee', label: 'Host/Food Fee Status', icon: '🍽️'}, {key: 'includeNotes', label: 'Meeting Notes', icon: '📝'}].map(item => (<label key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-emerald-50"><span className="flex items-center gap-2"><span>{item.icon}</span> {item.label}</span><input type="checkbox" checked={whatsAppOptions[item.key]} onChange={(e) => setWhatsAppOptions({...whatsAppOptions, [item.key]: e.target.checked})} className="w-5 h-5 text-emerald-500 rounded" /></label>))}</div><div className="flex gap-2 mt-6"><button onClick={confirmWhatsAppOptions} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition-all">📱 Generate Message</button><button onClick={() => setShowWhatsAppOptionsModal(false)} className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button></div></div></div>)}

      {/* Report Modal */}
      {showReportModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-6 w-full max-w-4xl shadow-2xl max-h-[90vh] flex flex-col"><div className="flex items-center justify-between mb-4"><h3 className="text-xl font-bold text-gray-800">🖨️ Print Report</h3><div className="flex gap-2"><select value={reportMeeting} onChange={(e) => setReportMeeting(parseInt(e.target.value))} className="px-3 py-2 rounded-lg border-2 border-gray-200">{meetings.map((m, idx) => (<option key={idx} value={idx}>Meeting #{idx + 1}: {m.date}</option>))}</select><button onClick={() => { const printWindow = window.open('', '_blank'); printWindow.document.write(`<html><head><title>Report</title><style>body{font-family:Arial;padding:20px}h1{color:#059669}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background:#059669;color:white}.conf{background:#FEE2E2;border:2px solid #DC2626;padding:15px;border-radius:8px;margin:15px 0}</style></head><body>${reportRef.current.innerHTML}</body></html>`); printWindow.document.close(); printWindow.print(); }} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold transition-all">🖨️ Print</button><button onClick={() => setShowReportModal(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-all">Close</button></div></div><div className="flex-1 overflow-auto border rounded-xl p-4 bg-white" ref={reportRef}><h1 style={{ textAlign: 'center', color: '#059669' }}>🌴 NIKOM NI MANKON 🌴</h1><h2 style={{ textAlign: 'center' }}>Meeting Report - {meetings[reportMeeting]?.full}</h2><p style={{ textAlign: 'center', color: '#666' }}>Host: {meetings[reportMeeting]?.host} | {meetings[reportMeeting]?.city}</p><div className="conf"><h3 style={{ color: '#DC2626', margin: '0 0 10px 0' }}>🔒 CONFIDENTIAL - Admin Only</h3><p><strong>Savings:</strong> ${getMeetingSavingsStats(reportMeeting).collected.toLocaleString()} / ${getMeetingSavingsStats(reportMeeting).target.toLocaleString()}</p><p style={{ fontSize: '1.3em', fontWeight: 'bold', color: '#DC2626' }}>Total Savings: ${overallStats.totalSavingsCollected.toLocaleString()}</p></div>{groups.map((group, gIdx) => { const beneficiary = getBeneficiary(gIdx, reportMeeting); const stats = getGroupMeetingStats(reportMeeting, gIdx); return (<div key={gIdx} style={{ marginBottom: '20px' }}><h3 style={{ color: group.color }}>{group.name} - Beneficiary: {beneficiary.name}</h3><p>Collected: ${stats.njangiCollected.toLocaleString()} of ${stats.njangiTarget.toLocaleString()}</p><table><thead><tr><th style={{ backgroundColor: group.color }}>#</th><th style={{ backgroundColor: group.color }}>Member</th><th style={{ backgroundColor: group.color }}>Njangi</th><th style={{ backgroundColor: group.color }}>Host</th><th style={{ backgroundColor: group.color }}>Savings</th><th style={{ backgroundColor: group.color }}>Method</th></tr></thead><tbody>{group.members.map((member, mIdx) => { const nPaid = njangiPayments[`${reportMeeting}-${gIdx}-${mIdx}`]; const hPaid = hostFeePayments[`${reportMeeting}-${gIdx}-${mIdx}`]; const sPaid = savingsFundPayments[`${reportMeeting}-${gIdx}-${mIdx}`]; const isBen = mIdx === beneficiary.index; const method = paymentMethods[`njangi-${reportMeeting}-${gIdx}-${mIdx}`] || '-'; return (<tr key={mIdx} style={isBen ? { backgroundColor: '#FEF3C7' } : {}}><td>{mIdx + 1}</td><td>{member} {isBen && '⭐'}</td><td style={{ color: isBen ? '#D97706' : nPaid ? '#059669' : '#DC2626', fontWeight: 'bold', textAlign: 'center' }}>{isBen ? 'RECEIVES' : nPaid ? '✓' : '✗'}</td><td style={{ color: hPaid ? '#059669' : '#DC2626', fontWeight: 'bold', textAlign: 'center' }}>{hPaid ? '✓' : '✗'}</td><td style={{ color: sPaid ? '#059669' : '#DC2626', fontWeight: 'bold', textAlign: 'center' }}>{sPaid ? '✓' : '✗'}</td><td style={{ fontSize: '0.8em' }}>{method}</td></tr>); })}</tbody></table></div>); })}<p style={{ textAlign: 'center', marginTop: '30px', color: '#666' }}>Generated: {new Date().toLocaleString()}</p></div></div></div>)}

      {/* Header */}
      <header className="relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-green-600 to-teal-700" /><div className="absolute left-4 bottom-0 opacity-30"><RaffiaPalmSVG className="w-16 h-28" /></div><div className="absolute right-4 bottom-0 opacity-30" style={{ transform: 'scaleX(-1)' }}><RaffiaPalmSVG className="w-16 h-28" /></div><div className="relative max-w-7xl mx-auto px-4 py-5"><div className="flex flex-col md:flex-row items-center justify-between gap-4"><div className="flex items-center gap-4"><div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"><RaffiaPalmSVG className="w-12 h-20" /></div><div className="text-white"><h1 className="text-2xl md:text-3xl font-bold">NIKOM NI MANKON</h1><p className="text-emerald-200 text-sm">🌿 The Fertile Raffia Groves of Asonka</p></div></div><div className="flex items-center gap-3 flex-wrap justify-center">{isAdmin ? (<div className="flex items-center gap-2 flex-wrap"><span className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">🔓 Admin</span><button onClick={() => setShowSettingsModal(true)} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition-all">⚙️</button><button onClick={() => setShowRemindersModal(true)} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition-all">🔔</button><button onClick={() => { setIsAdmin(false); setRememberLogin(false); }} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition-all">Logout</button></div>) : (<button onClick={() => setShowLoginModal(true)} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2">🔐 Admin Login</button>)}<button onClick={() => openWhatsAppWithOptions('reminder')} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2">📱 Share</button></div></div></div>{!isAdmin && (<div className="bg-yellow-400 text-yellow-900 text-center py-2 text-sm font-medium">👀 View-Only Mode - Login as admin to make changes</div>)}</header>

      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-40 border-b-4 border-emerald-500"><div className="max-w-7xl mx-auto px-4"><div className="flex gap-1 overflow-x-auto py-2">{visibleTabs.map(tab => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap text-sm ${activeTab === tab.id ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg' : 'text-gray-600 hover:bg-emerald-50'}`}><span>{tab.icon}</span><span className="hidden sm:inline">{tab.label}</span></button>))}</div></div></nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (<div className="space-y-6">
          {isAdmin && (<div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-4 text-white"><div className="flex items-center justify-between flex-wrap gap-3"><div><h3 className="font-bold flex items-center gap-2">⚙️ Admin Panel</h3><p className="text-purple-200 text-sm">Quick actions</p></div><div className="flex gap-2 flex-wrap"><button onClick={() => setShowSettingsModal(true)} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-all">⚙️ Settings</button><button onClick={() => setShowAddMemberModal(true)} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-all">➕ Add Member</button><button onClick={() => setShowAddMeetingModal(true)} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-all">📅 Add Meeting</button><button onClick={() => setShowChartsModal(true)} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-all">📊 Charts</button></div></div></div>)}
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-4 text-white shadow-lg"><p className="text-emerald-100 text-xs">Members</p><p className="text-3xl font-bold">{totalMembers}</p></div>
            <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-4 text-white shadow-lg"><p className="text-green-100 text-xs">Njangi</p><p className="text-2xl font-bold">${(overallStats.totalNjangiCollected/1000).toFixed(0)}k</p></div>
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-4 text-white shadow-lg"><p className="text-teal-100 text-xs">Host Fees</p><p className="text-2xl font-bold">${overallStats.totalHostFeeCollected.toLocaleString()}</p></div>
            {isAdmin && (<div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-4 text-white shadow-lg relative"><span className="absolute top-1 right-2 text-xs bg-red-500 px-1.5 py-0.5 rounded">🔒</span><p className="text-purple-100 text-xs">Savings</p><p className="text-2xl font-bold">${overallStats.totalSavingsCollected.toLocaleString()}</p></div>)}
            {isAdmin && overallStats.totalLateFeesCollected > 0 && (<div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-xl p-4 text-white shadow-lg"><p className="text-red-100 text-xs">Late Fees</p><p className="text-2xl font-bold">${overallStats.totalLateFeesCollected.toLocaleString()}</p></div>)}
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-4 text-white shadow-lg"><p className="text-cyan-100 text-xs">Total</p><p className="text-2xl font-bold">${(overallStats.totalCollected/1000).toFixed(1)}k</p></div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden"><div className="bg-gradient-to-r from-emerald-500 to-green-500 p-4 text-white flex items-center justify-between flex-wrap gap-2"><div><h3 className="text-lg font-bold">🗓️ Next: {meetings[0]?.full}</h3><p className="text-emerald-100 text-sm">🏠 {meetings[0]?.host} • {meetings[0]?.city}</p></div><div className="flex gap-2">{isAdmin && (<><button onClick={() => setShowAgendaModal(true)} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-all">📋 Agenda</button><button onClick={() => { setEditingNotes({ meetingIdx: 0, note: meetingNotes[0] || '' }); setShowNotesModal(true); }} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-all">📝 Notes</button></>)}<button onClick={() => openWhatsAppWithOptions('reminder')} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-all">📱 Share</button></div></div>{meetingNotes[0] && (<div className="bg-yellow-50 px-4 py-2 border-b text-sm"><span className="font-bold text-yellow-700">📝 Notes:</span> {meetingNotes[0]}</div>)}<div className="p-4"><h4 className="font-bold text-gray-800 mb-3">💰 Beneficiaries:</h4><div className="grid grid-cols-2 md:grid-cols-5 gap-3">{groups.map((group, gIdx) => { const beneficiary = getBeneficiary(gIdx, 0); const stats = getGroupMeetingStats(0, gIdx); return (<div key={gIdx} className="rounded-lg p-3 border-2 relative" style={{ borderColor: group.color, backgroundColor: group.color + '10' }}>{beneficiary.isOverride && (<span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">!</span>)}<p className="text-xs font-bold" style={{ color: group.color }}>{group.name}</p><p className="font-bold text-gray-800 text-sm mt-1 truncate">{beneficiary.name}</p><div className="mt-2 bg-gray-200 rounded-full h-2"><div className="h-full rounded-full transition-all" style={{ width: `${stats.njangiPercentage}%`, backgroundColor: group.color }}/></div><p className="text-xs text-gray-500 mt-1">{stats.njangiPercentage}%</p>{isAdmin && (<button onClick={() => { setEditingBeneficiary({ meetingIdx: 0, groupIdx: gIdx }); setShowBeneficiaryModal(true); }} className="mt-2 text-xs text-blue-600 hover:text-blue-700">🔄 Change</button>)}</div>); })}</div></div></div>

          <div className="bg-white rounded-xl shadow-lg p-4"><h3 className="font-bold text-gray-800 mb-3">💵 Per Meeting: <span className="text-emerald-600">$1,120</span></h3><div className="grid grid-cols-4 gap-3 text-center"><div className="bg-emerald-50 p-2 rounded-lg"><p className="text-emerald-600 font-bold">$1,000</p><p className="text-xs text-gray-600">Njangi</p></div><div className="bg-purple-50 p-2 rounded-lg"><p className="text-purple-600 font-bold">$100</p><p className="text-xs text-gray-600">Savings</p></div><div className="bg-teal-50 p-2 rounded-lg"><p className="text-teal-600 font-bold">$20</p><p className="text-xs text-gray-600">Host</p></div><div className="bg-red-50 p-2 rounded-lg"><p className="text-red-600 font-bold">$250</p><p className="text-xs text-gray-600">Late Fee</p></div></div></div>
        </div>)}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (<div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg p-4"><p className="text-sm font-medium text-gray-600 mb-2">📅 Meeting</p><div className="flex gap-2 overflow-x-auto pb-2">{meetings.map((m, idx) => (<button key={idx} onClick={() => setSelectedMeeting(idx)} className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedMeeting === idx ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-blue-100'}`}>{m.date}</button>))}</div></div>
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 text-white shadow-lg"><div className="flex items-center justify-between"><div><p className="text-blue-100 text-sm">{currentMeeting?.full}</p><h2 className="text-xl font-bold">✋ Attendance</h2></div><div className="bg-white/20 rounded-xl p-3 text-center"><p className="text-2xl font-bold">{attendanceStats.present}/{attendanceStats.total}</p><p className="text-xs text-blue-100">{attendanceStats.percentage}% present</p></div></div></div>
          <div className="bg-white rounded-xl shadow-lg p-4"><input type="text" placeholder="🔍 Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none mb-4 text-sm" /><div className="space-y-3">{groups.map((group, gIdx) => { const filteredMembers = group.members.filter(m => !searchTerm || m.toLowerCase().includes(searchTerm.toLowerCase())); if (filteredMembers.length === 0) return null; const presentCount = group.members.filter((_, mIdx) => attendance[`${selectedMeeting}-${gIdx}-${mIdx}`]).length; return (<div key={gIdx} className="border rounded-lg overflow-hidden"><div className="p-2 flex items-center justify-between" style={{ backgroundColor: group.color + '15' }}><span className="font-bold text-sm" style={{ color: group.color }}>{group.name}</span><span className="text-xs" style={{ color: group.color }}>{presentCount}/{group.members.length} present</span></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">{filteredMembers.map((member) => { const actualIdx = group.members.indexOf(member); const isPresent = attendance[`${selectedMeeting}-${gIdx}-${actualIdx}`]; return (<div key={member} className={`flex items-center justify-between p-2 rounded-lg text-sm ${isPresent ? 'bg-blue-50' : 'bg-gray-50'}`}><span className="font-medium text-gray-800 truncate">{member}</span><button onClick={() => toggleAttendance(selectedMeeting, gIdx, actualIdx)} disabled={!isAdmin} className={`px-3 py-1 rounded text-xs font-bold transition-all ${isPresent ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} ${isAdmin ? 'hover:opacity-80' : 'cursor-not-allowed'}`}>{isPresent ? '✓ Present' : 'Absent'}</button></div>); })}</div></div>); })}</div></div>
        </div>)}

        {/* Njangi Tab */}
        {activeTab === 'njangi' && (isAdmin || visibility.njangi) && (<div className="space-y-4"><div className="bg-white rounded-xl shadow-lg p-4 space-y-3"><div><p className="text-sm font-medium text-gray-600 mb-2">📅 Meeting</p><div className="flex gap-2 overflow-x-auto pb-2">{meetings.map((m, idx) => (<button key={idx} onClick={() => setSelectedMeeting(idx)} className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedMeeting === idx ? 'bg-emerald-500 text-white' : 'bg-gray-100 hover:bg-emerald-100'}`}>{m.date}</button>))}</div></div><div><p className="text-sm font-medium text-gray-600 mb-2">👥 Group</p><div className="flex gap-2 overflow-x-auto">{groups.map((g, idx) => (<button key={idx} onClick={() => setSelectedGroup(idx)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedGroup === idx ? 'text-white' : 'bg-gray-100 hover:opacity-80'}`} style={selectedGroup === idx ? { backgroundColor: g.color } : {}}>{g.name}</button>))}</div></div></div>{(() => { const group = groups[selectedGroup]; const beneficiary = getBeneficiary(selectedGroup, selectedMeeting); const stats = getGroupMeetingStats(selectedMeeting, selectedGroup); return (<><div className={`bg-gradient-to-r ${group.gradient} rounded-xl p-4 text-white shadow-lg`}><div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"><div><p className="text-white/80 text-sm">{currentMeeting?.full}</p><h2 className="text-xl font-bold">{group.name}</h2><div className="mt-2 bg-white/20 rounded-lg px-3 py-2 inline-block relative">{beneficiary.isOverride && (<span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">!</span>)}<p className="text-white/80 text-xs">⭐ BENEFICIARY</p><p className="font-bold">{beneficiary.name}</p>{isAdmin && (<button onClick={() => { setEditingBeneficiary({ meetingIdx: selectedMeeting, groupIdx: selectedGroup }); setShowBeneficiaryModal(true); }} className="text-xs text-white/80 hover:text-white underline mt-1">🔄 Change</button>)}</div></div><div className="bg-white/20 rounded-xl p-4 text-center"><p className="text-3xl font-bold">${stats.njangiCollected.toLocaleString()}</p><p className="text-white/80 text-sm">of ${stats.njangiTarget.toLocaleString()}</p></div></div></div><div className="bg-white rounded-xl shadow-lg overflow-hidden"><div className="overflow-x-auto"><table className="w-full"><thead><tr className="bg-gray-50"><th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">#</th><th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Member</th><th className="px-4 py-3 text-center text-sm font-semibold" style={{ color: group.color }}>$1,000</th><th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Method</th>{isAdmin && <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Actions</th>}</tr></thead><tbody>{group.members.map((member, mIdx) => { const isPaid = njangiPayments[`${selectedMeeting}-${selectedGroup}-${mIdx}`]; const isBeneficiary = mIdx === beneficiary.index; const method = paymentMethods[`njangi-${selectedMeeting}-${selectedGroup}-${mIdx}`]; const lateFee = lateFees[`${selectedMeeting}-${selectedGroup}-${mIdx}`]; return (<tr key={mIdx} className={`border-b ${isBeneficiary ? 'bg-yellow-50' : isPaid ? 'bg-emerald-50' : ''}`}><td className="px-4 py-3 text-gray-500">{mIdx + 1}</td><td className="px-4 py-3"><span className="font-medium text-gray-800">{member}</span>{isBeneficiary && (<span className="ml-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">⭐</span>)}{lateFee && (<span className={`ml-2 text-xs font-bold px-2 py-0.5 rounded-full ${lateFee.paid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>⚠️ ${lateFee.amount}</span>)}</td><td className="px-4 py-3 text-center">{isBeneficiary ? (<span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm font-bold">RECEIVES</span>) : (<button onClick={() => toggleNjangi(selectedMeeting, selectedGroup, mIdx)} disabled={!isAdmin} className={`w-24 py-2 rounded-lg font-bold text-sm transition-all ${isPaid ? 'text-white' : 'bg-gray-100 text-gray-600'} ${isAdmin ? 'hover:opacity-80 cursor-pointer' : 'cursor-not-allowed opacity-80'}`} style={isPaid ? { backgroundColor: group.color } : {}}>{isPaid ? '✓ PAID' : '$1,000'}</button>)}</td><td className="px-4 py-3 text-center text-xs text-gray-500">{method || '-'}</td>{isAdmin && (<td className="px-4 py-3 text-center"><button onClick={() => { setSelectedMemberDetails({ groupIdx: selectedGroup, memberIdx: mIdx }); setShowMemberDetailsModal(true); }} className="text-blue-600 hover:text-blue-700 text-sm mr-2">👤</button>{!isBeneficiary && !lateFee && (<button onClick={() => { setLateFeeInfo({ meetingIdx: selectedMeeting, groupIdx: selectedGroup, memberIdx: mIdx, amount: 250 }); setShowLateFeeModal(true); }} className="text-red-600 hover:text-red-700 text-sm">⚠️</button>)}</td>)}</tr>); })}</tbody></table></div></div></>); })()}</div>)}

        {/* Savings Tab */}
        {activeTab === 'savings' && (isAdmin || visibility.savings) && (<div className="space-y-4"><div className="bg-white rounded-xl shadow-lg p-4"><p className="text-sm font-medium text-gray-600 mb-2">📅 Meeting</p><div className="flex gap-2 overflow-x-auto pb-2">{meetings.map((m, idx) => (<button key={idx} onClick={() => setSelectedMeeting(idx)} className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedMeeting === idx ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-purple-100'}`}>{m.date}</button>))}</div></div><div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-4 text-white shadow-lg"><div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"><div><p className="text-purple-100 text-sm">{currentMeeting?.full}</p><h2 className="text-xl font-bold">🏦 Savings Fund ($100/member)</h2></div><div className="bg-white/20 rounded-xl p-4 text-center"><p className="text-3xl font-bold">${savingsStats.collected.toLocaleString()}</p><p className="text-purple-100 text-sm">of ${savingsStats.target.toLocaleString()}</p></div></div>{isAdmin && (<div className="mt-4 bg-red-500/30 border border-red-300 rounded-lg p-3"><p className="text-xs text-red-200 mb-1">🔒 CONFIDENTIAL</p><p className="text-2xl font-bold">Total: ${overallStats.totalSavingsCollected.toLocaleString()}</p></div>)}</div><div className="bg-white rounded-xl shadow-lg p-4"><input type="text" placeholder="🔍 Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none mb-4 text-sm" /><div className="space-y-3">{groups.map((group, gIdx) => { const filteredMembers = group.members.filter(m => !searchTerm || m.toLowerCase().includes(searchTerm.toLowerCase())); if (filteredMembers.length === 0) return null; const paidCount = group.members.filter((_, mIdx) => savingsFundPayments[`${selectedMeeting}-${gIdx}-${mIdx}`]).length; return (<div key={gIdx} className="border rounded-lg overflow-hidden"><div className="p-2 flex items-center justify-between" style={{ backgroundColor: group.color + '15' }}><span className="font-bold text-sm" style={{ color: group.color }}>{group.name}</span><span className="text-xs" style={{ color: group.color }}>{paidCount}/{group.members.length}</span></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">{filteredMembers.map((member) => { const actualIdx = group.members.indexOf(member); const isPaid = savingsFundPayments[`${selectedMeeting}-${gIdx}-${actualIdx}`]; return (<div key={member} className={`flex items-center justify-between p-2 rounded-lg text-sm ${isPaid ? 'bg-purple-50' : 'bg-gray-50'}`}><span className="font-medium text-gray-800 truncate">{member}</span><button onClick={() => toggleSavingsFund(selectedMeeting, gIdx, actualIdx)} disabled={!isAdmin} className={`px-3 py-1 rounded text-xs font-bold transition-all ${isPaid ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600'} ${isAdmin ? 'hover:opacity-80' : 'cursor-not-allowed'}`}>{isPaid ? '✓' : '$100'}</button></div>); })}</div></div>); })}</div></div></div>)}

        {/* Host Fee Tab */}
        {activeTab === 'hostfee' && (isAdmin || visibility.hostFee) && (<div className="space-y-4"><div className="bg-white rounded-xl shadow-lg p-4"><p className="text-sm font-medium text-gray-600 mb-2">📅 Meeting</p><div className="flex gap-2 overflow-x-auto pb-2">{meetings.map((m, idx) => (<button key={idx} onClick={() => setSelectedMeeting(idx)} className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedMeeting === idx ? 'bg-teal-500 text-white' : 'bg-gray-100 hover:bg-teal-100'}`}>{m.date}</button>))}</div></div><div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl p-4 text-white shadow-lg"><div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"><div><p className="text-teal-100 text-sm">{currentMeeting?.full}</p><h2 className="text-xl font-bold">🍽️ Host/Food Fee ($20/member)</h2><p className="text-teal-200 text-sm mt-1">Host: {currentMeeting?.host} • {currentMeeting?.city}</p></div><div className="bg-white/20 rounded-xl p-4 text-center"><p className="text-3xl font-bold">${hostFeeStats.collected.toLocaleString()}</p><p className="text-teal-100 text-sm">of ${hostFeeStats.target.toLocaleString()}</p></div></div></div><div className="bg-white rounded-xl shadow-lg p-4"><input type="text" placeholder="🔍 Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none mb-4 text-sm" /><div className="space-y-3">{groups.map((group, gIdx) => { const filteredMembers = group.members.filter(m => !searchTerm || m.toLowerCase().includes(searchTerm.toLowerCase())); if (filteredMembers.length === 0) return null; const paidCount = group.members.filter((_, mIdx) => hostFeePayments[`${selectedMeeting}-${gIdx}-${mIdx}`]).length; return (<div key={gIdx} className="border rounded-lg overflow-hidden"><div className="p-2 flex items-center justify-between" style={{ backgroundColor: group.color + '15' }}><span className="font-bold text-sm" style={{ color: group.color }}>{group.name}</span><span className="text-xs" style={{ color: group.color }}>{paidCount}/{group.members.length}</span></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">{filteredMembers.map((member) => { const actualIdx = group.members.indexOf(member); const isPaid = hostFeePayments[`${selectedMeeting}-${gIdx}-${actualIdx}`]; return (<div key={member} className={`flex items-center justify-between p-2 rounded-lg text-sm ${isPaid ? 'bg-teal-50' : 'bg-gray-50'}`}><span className="font-medium text-gray-800 truncate">{member}</span><button onClick={() => toggleHostFee(selectedMeeting, gIdx, actualIdx)} disabled={!isAdmin} className={`px-3 py-1 rounded text-xs font-bold transition-all ${isPaid ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'} ${isAdmin ? 'hover:opacity-80' : 'cursor-not-allowed'}`}>{isPaid ? '✓' : '$20'}</button></div>); })}</div></div>); })}</div></div></div>)}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (<div className="space-y-4">{isAdmin && (<div className="flex justify-end mb-2"><button onClick={() => setShowAddMeetingModal(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">➕ Add Meeting</button></div>)}{meetings.map((meeting, idx) => { const hostStats = getMeetingHostFeeStats(idx); const attStats = getMeetingAttendanceStats(idx); return (<div key={idx} className={`bg-white rounded-xl shadow-lg overflow-hidden ${idx === 0 ? 'ring-2 ring-emerald-400' : ''}`}><div className={`p-3 flex items-center justify-between ${idx === 0 ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white' : 'bg-gray-50'}`}><div><span className={`text-xs font-bold ${idx === 0 ? 'text-emerald-100' : 'text-gray-500'}`}>Meeting #{idx + 1}</span><p className={`font-bold ${idx === 0 ? 'text-white' : 'text-gray-800'}`}>{meeting.full}</p></div><div className="flex items-center gap-2">{isAdmin && (<button onClick={() => { setEditingMeetingIdx(idx); setNewMeeting({ date: '', host: meeting.host, city: meeting.city }); setShowEditMeetingModal(true); }} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">✏️</button>)}{idx === 0 && (<span className="bg-white text-emerald-600 text-xs font-bold px-3 py-1 rounded-full">NEXT</span>)}</div></div><div className="p-3"><p className="text-sm text-gray-600 mb-2">🏠 {meeting.host} • {meeting.city}</p><div className="grid grid-cols-2 md:grid-cols-5 gap-2">{groups.map((group, gIdx) => { const beneficiary = getBeneficiary(gIdx, idx); const stats = getGroupMeetingStats(idx, gIdx); return (<div key={gIdx} onClick={() => { setSelectedMeeting(idx); setSelectedGroup(gIdx); setActiveTab('njangi'); }} className="p-2 rounded-lg border text-sm cursor-pointer hover:shadow-md transition-all" style={{ borderColor: group.color + '50' }}><p className="text-xs font-bold truncate" style={{ color: group.color }}>{group.name}</p><p className="font-medium text-gray-800 truncate text-xs">{beneficiary.name}</p><div className="bg-gray-200 rounded-full h-1.5 mt-1"><div className="h-full rounded-full" style={{ width: `${stats.njangiPercentage}%`, backgroundColor: group.color }}/></div></div>); })}</div><div className="mt-2 pt-2 border-t flex items-center justify-between text-xs text-gray-500"><span>🍽️ {hostStats.paid}/{hostStats.total} paid</span><span>✋ {attStats.present}/{attStats.total} attended</span></div></div></div>); })}</div>)}

        {/* Members Tab */}
        {activeTab === 'members' && (<div className="space-y-4"><div className="bg-white rounded-xl shadow-lg p-4"><div className="flex items-center justify-between mb-4 flex-wrap gap-2"><h3 className="font-bold text-gray-800">👥 All {totalMembers} Members</h3><div className="flex gap-2">{isAdmin && (<button onClick={() => setShowAddMemberModal(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all">➕ Add Member</button>)}<input type="text" placeholder="🔍 Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-sm w-48" /></div></div><div className="space-y-4">{groups.map((group, gIdx) => { const filteredMembers = group.members.filter(m => !searchTerm || m.toLowerCase().includes(searchTerm.toLowerCase())); if (filteredMembers.length === 0 && searchTerm) return null; return (<div key={gIdx} className="border rounded-xl overflow-hidden"><div className="p-3 flex items-center justify-between" style={{ backgroundColor: group.color, color: 'white' }}><span className="font-bold">{group.name}</span><span className="text-sm opacity-80">{group.members.length} members</span></div><div className="p-3"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">{(searchTerm ? filteredMembers : group.members).map((member) => { const actualIdx = group.members.indexOf(member); const photo = memberPhotos[`${gIdx}-${actualIdx}`]; const contact = memberContacts[`${gIdx}-${actualIdx}`]; return (<div key={actualIdx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer" onClick={() => { setSelectedMemberDetails({ groupIdx: gIdx, memberIdx: actualIdx }); setShowMemberDetailsModal(true); }}><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden" style={!photo ? { backgroundColor: group.color, color: 'white', fontSize: '12px', fontWeight: 'bold' } : {}}>{photo ? <img src={photo} alt="" className="w-full h-full object-cover" /> : actualIdx + 1}</div><div><span className="font-medium text-gray-800 text-sm">{member}</span>{contact?.phone && <p className="text-xs text-gray-400">📞 {contact.phone}</p>}</div></div><span className="text-gray-400">→</span></div>); })}</div></div></div>); })}</div></div></div>)}

        {/* WhatsApp Tab */}
        {activeTab === 'whatsapp' && (<div className="space-y-6"><div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"><h2 className="text-2xl font-bold flex items-center gap-2">📱 WhatsApp</h2><p className="text-green-100 mt-2">Generate and share updates</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="bg-white rounded-xl shadow-lg p-5"><h3 className="font-bold text-gray-800 mb-3">📊 Full Summary</h3><select onChange={(e) => setSelectedMeeting(parseInt(e.target.value))} value={selectedMeeting} className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 mb-3">{meetings.map((m, idx) => (<option key={idx} value={idx}>#{idx + 1}: {m.full}</option>))}</select><button onClick={() => openWhatsAppWithOptions('summary')} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition-all">📱 Generate</button></div><div className="bg-white rounded-xl shadow-lg p-5"><h3 className="font-bold text-gray-800 mb-3">💰 Group Update</h3><div className="grid grid-cols-2 gap-2 mb-3"><select onChange={(e) => setSelectedMeeting(parseInt(e.target.value))} value={selectedMeeting} className="px-3 py-2 rounded-lg border-2 border-gray-200 text-sm">{meetings.map((m, idx) => (<option key={idx} value={idx}>#{idx + 1}</option>))}</select><select onChange={(e) => setSelectedGroup(parseInt(e.target.value))} value={selectedGroup} className="px-3 py-2 rounded-lg border-2 border-gray-200 text-sm">{groups.map((g, idx) => (<option key={idx} value={idx}>{g.name}</option>))}</select></div><button onClick={() => openWhatsAppWithOptions('group')} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all">📱 Generate</button></div><div className="bg-white rounded-xl shadow-lg p-5"><h3 className="font-bold text-gray-800 mb-3">🔔 Reminder</h3><select onChange={(e) => setSelectedMeeting(parseInt(e.target.value))} value={selectedMeeting} className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 mb-3">{meetings.map((m, idx) => (<option key={idx} value={idx}>#{idx + 1}: {m.full}</option>))}</select><button onClick={() => openWhatsAppWithOptions('reminder')} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all">📱 Generate</button></div><div className="bg-gray-100 rounded-xl p-5"><h3 className="font-bold text-gray-800 mb-3">📖 Tips</h3><ol className="text-sm text-gray-600 space-y-1"><li>1. Update payments first</li><li>2. Generate message here</li><li>3. Copy or share directly</li><li>4. Paste in WhatsApp group</li></ol></div></div></div>)}

        {/* Rules Tab */}
        {activeTab === 'rules' && (<div className="space-y-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-3">{rules.map((rule, idx) => (<div key={idx} className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-emerald-500"><div className="flex items-start gap-3"><span className="text-2xl">{rule.icon}</span><div><h3 className="font-bold text-gray-800">{rule.title}</h3><p className="text-gray-600 text-sm">{rule.text}</p></div></div></div>))}</div><div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-5 text-white"><h3 className="font-bold text-lg mb-4">💰 Per Meeting</h3><div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"><div className="bg-white/20 rounded-lg p-3"><p className="text-2xl font-bold">$1,000</p><p className="text-sm">Njangi</p></div><div className="bg-white/20 rounded-lg p-3"><p className="text-2xl font-bold">$100</p><p className="text-sm">Savings</p></div><div className="bg-white/20 rounded-lg p-3"><p className="text-2xl font-bold">$20</p><p className="text-sm">Host Fee</p></div><div className="bg-white/20 rounded-lg p-3"><p className="text-2xl font-bold">$1,120</p><p className="text-sm">TOTAL</p></div></div></div></div>)}
      </main>

      <footer className="bg-emerald-800 text-white py-6 mt-8"><div className="max-w-7xl mx-auto px-4 text-center"><p className="font-bold">🌴 Nikom Ni Mankon 🌴</p><p className="text-emerald-300 text-sm">Maryland, USA • Growing Together</p><p className="text-emerald-400 text-xs mt-2">🇨🇲 × 🇺🇸</p></div></footer>
    </div>
  );
}
