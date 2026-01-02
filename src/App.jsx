import React, { useState, useMemo, useEffect, useRef } from 'react';

const ADMIN_PASSWORD = 'nikom2026';

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

const STORAGE_KEY = 'nikom_ni_mankon_data_v4';

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMeeting, setSelectedMeeting] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState(defaultGroups);
  const [meetings, setMeetings] = useState(defaultMeetings);
  const [njangiPayments, setNjangiPayments] = useState({});
  const [hostFeePayments, setHostFeePayments] = useState({});
  const [savingsFundPayments, setSavingsFundPayments] = useState({});
  const [hostInfo, setHostInfo] = useState(defaultMeetings.map(m => ({ address: '', phone: '' })));
  const [beneficiaryOverrides, setBeneficiaryOverrides] = useState({});
  const [meetingNotes, setMeetingNotes] = useState({});
  
  // VISIBILITY CONTROLS - Admin decides what members can see
  const [visibility, setVisibility] = useState({
    njangi: false,      // Can members see Njangi tab?
    savings: false,     // Can members see Savings tab?
    hostFee: false      // Can members see Host Fee tab?
  });
  
  // WHATSAPP INCLUDE OPTIONS
  const [whatsAppOptions, setWhatsAppOptions] = useState({
    includeNjangi: true,
    includeSavings: false,
    includeHostFee: true,
    includeNotes: true
  });
  
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
  const reportRef = useRef(null);

  const totalMembers = useMemo(() => groups.reduce((a, g) => a + g.members.length, 0), [groups]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setNjangiPayments(data.njangiPayments || {});
        setHostFeePayments(data.hostFeePayments || {});
        setSavingsFundPayments(data.savingsFundPayments || {});
        setHostInfo(data.hostInfo || defaultMeetings.map(() => ({ address: '', phone: '' })));
        setBeneficiaryOverrides(data.beneficiaryOverrides || {});
        setMeetingNotes(data.meetingNotes || {});
        if (data.groups) setGroups(data.groups);
        if (data.meetings) setMeetings(data.meetings);
        if (data.visibility) setVisibility(data.visibility);
        if (data.whatsAppOptions) setWhatsAppOptions(data.whatsAppOptions);
      } catch (e) { console.error('Error loading data:', e); }
    }
  }, []);

  useEffect(() => {
    const data = { njangiPayments, hostFeePayments, savingsFundPayments, hostInfo, beneficiaryOverrides, meetingNotes, groups, meetings, visibility, whatsAppOptions };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [njangiPayments, hostFeePayments, savingsFundPayments, hostInfo, beneficiaryOverrides, meetingNotes, groups, meetings, visibility, whatsAppOptions]);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) { setIsAdmin(true); setShowLoginModal(false); setPasswordInput(''); setLoginError(''); }
    else { setLoginError('Incorrect password'); }
  };

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
    if (!njangiPayments[key]) triggerConfetti();
  };

  const toggleHostFee = (meetingIdx, groupIdx, memberIdx) => {
    if (!isAdmin) return;
    const key = `${meetingIdx}-${groupIdx}-${memberIdx}`;
    setHostFeePayments(prev => ({ ...prev, [key]: !prev[key] }));
    if (!hostFeePayments[key]) triggerConfetti();
  };

  const toggleSavingsFund = (meetingIdx, groupIdx, memberIdx) => {
    if (!isAdmin) return;
    const key = `${meetingIdx}-${groupIdx}-${memberIdx}`;
    setSavingsFundPayments(prev => ({ ...prev, [key]: !prev[key] }));
    if (!savingsFundPayments[key]) triggerConfetti();
  };

  const getGroupMeetingStats = (meetingIdx, groupIdx) => {
    const group = groups[groupIdx];
    let njangiPaid = 0, hostFeePaid = 0, savingsPaid = 0;
    group.members.forEach((_, mIdx) => {
      if (njangiPayments[`${meetingIdx}-${groupIdx}-${mIdx}`]) njangiPaid++;
      if (hostFeePayments[`${meetingIdx}-${groupIdx}-${mIdx}`]) hostFeePaid++;
      if (savingsFundPayments[`${meetingIdx}-${groupIdx}-${mIdx}`]) savingsPaid++;
    });
    return { njangiPaid, njangiTotal: group.members.length, njangiCollected: njangiPaid * 1000, njangiTarget: group.members.length * 1000,
      njangiPercentage: Math.round((njangiPaid / group.members.length) * 100), hostFeePaid, hostFeeCollected: hostFeePaid * 20, savingsPaid, savingsCollected: savingsPaid * 100 };
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

  const getOverallStats = () => {
    let totalNjangi = 0, totalHostFee = 0, totalSavings = 0;
    Object.values(njangiPayments).forEach(v => { if (v) totalNjangi++; });
    Object.values(hostFeePayments).forEach(v => { if (v) totalHostFee++; });
    Object.values(savingsFundPayments).forEach(v => { if (v) totalSavings++; });
    return { totalNjangiCollected: totalNjangi * 1000, totalHostFeeCollected: totalHostFee * 20, totalSavingsCollected: totalSavings * 100,
      totalCollected: (totalNjangi * 1000) + (totalHostFee * 20) + (totalSavings * 100) };
  };

  const overallStats = getOverallStats();
  const currentMeeting = meetings[selectedMeeting];
  const hostFeeStats = getMeetingHostFeeStats(selectedMeeting);
  const savingsStats = getMeetingSavingsStats(selectedMeeting);

  const saveHostInfo = (meetingIdx) => { if (!isAdmin) return; setHostInfo(prev => prev.map((h, i) => i === meetingIdx ? editForm : h)); setEditingHost(null); triggerConfetti(); };
  const triggerConfetti = () => { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 2000); };

  const saveMemberName = () => {
    if (!isAdmin) return;
    const { groupIdx, memberIdx, name } = editingMember;
    setGroups(prev => prev.map((g, gIdx) => { if (gIdx === groupIdx) { const newMembers = [...g.members]; newMembers[memberIdx] = name; return { ...g, members: newMembers }; } return g; }));
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

  const saveMeetingNotes = () => { if (!isAdmin) return; setMeetingNotes(prev => ({ ...prev, [editingNotes.meetingIdx]: editingNotes.note })); setShowNotesModal(false); triggerConfetti(); };

  // Generate WhatsApp message with options
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
    if (isAdmin) {
      setPendingWhatsAppType(type);
      setShowWhatsAppOptionsModal(true);
    } else {
      // Non-admin uses default options
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

  const printReport = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<html><head><title>Nikom Ni Mankon - Meeting Report</title><style>body{font-family:Arial,sans-serif;padding:20px}h1{color:#059669;text-align:center}h2{color:#10B981;border-bottom:2px solid #10B981;padding-bottom:5px}table{width:100%;border-collapse:collapse;margin:10px 0}th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background-color:#059669;color:white}.confidential{background-color:#FEE2E2;border:2px solid #DC2626;padding:15px;border-radius:8px;margin:15px 0}@media print{body{print-color-adjust:exact;-webkit-print-color-adjust:exact}}</style></head><body>${reportRef.current.innerHTML}</body></html>`);
    printWindow.document.close(); printWindow.print();
  };

  const Confetti = () => (<div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">{[...Array(30)].map((_, i) => (<div key={i} className="absolute text-2xl" style={{ left: `${Math.random() * 100}%`, top: `-30px`, animation: `fall ${2 + Math.random()}s linear forwards`, animationDelay: `${Math.random() * 0.5}s` }}>{['🌴', '💰', '🌿', '🎉', '✨'][Math.floor(Math.random() * 5)]}</div>))}<style>{`@keyframes fall { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } }`}</style></div>);

  // Check if tab should be visible
  const canViewTab = (tabId) => {
    if (isAdmin) return true;
    if (tabId === 'njangi') return visibility.njangi;
    if (tabId === 'savings') return visibility.savings;
    if (tabId === 'hostfee') return visibility.hostFee;
    return true; // Other tabs always visible
  };

  // Get visible tabs
  const visibleTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'njangi', label: 'Group Njangi', icon: '💰' },
    { id: 'savings', label: 'Savings', icon: '🏦' },
    { id: 'hostfee', label: 'Host/Food Fee', icon: '🍽️' },
    { id: 'schedule', label: 'Schedule', icon: '📅' },
    { id: 'members', label: 'Members', icon: '👥' },
    { id: 'whatsapp', label: 'WhatsApp', icon: '📱' },
    { id: 'rules', label: 'Rules', icon: '📜' }
  ].filter(tab => canViewTab(tab.id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-teal-50">
      {showConfetti && <Confetti />}
      
      {/* Login Modal */}
      {showLoginModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"><h3 className="text-xl font-bold text-gray-800 mb-4">🔐 Admin Login</h3><p className="text-gray-600 text-sm mb-4">Enter the admin password to make changes.</p><input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleLogin()} placeholder="Password" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-2" />{loginError && <p className="text-red-500 text-sm mb-2">{loginError}</p>}<div className="flex gap-2 mt-4"><button onClick={handleLogin} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all">Login</button><button onClick={() => { setShowLoginModal(false); setPasswordInput(''); setLoginError(''); }} className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button></div></div></div>)}

      {/* Settings Modal - Visibility Controls */}
      {showSettingsModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"><h3 className="text-xl font-bold text-gray-800 mb-2">⚙️ Admin Settings</h3><p className="text-gray-600 text-sm mb-4">Control what members can see when not logged in as admin.</p>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <h4 className="font-bold text-gray-700 mb-3">👁️ Tab Visibility for Members</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-2 bg-white rounded-lg cursor-pointer hover:bg-emerald-50">
                <span className="flex items-center gap-2"><span>💰</span> Group Njangi</span>
                <input type="checkbox" checked={visibility.njangi} onChange={(e) => setVisibility({...visibility, njangi: e.target.checked})} className="w-5 h-5 text-emerald-500 rounded" />
              </label>
              <label className="flex items-center justify-between p-2 bg-white rounded-lg cursor-pointer hover:bg-emerald-50">
                <span className="flex items-center gap-2"><span>🏦</span> Savings Fund</span>
                <input type="checkbox" checked={visibility.savings} onChange={(e) => setVisibility({...visibility, savings: e.target.checked})} className="w-5 h-5 text-emerald-500 rounded" />
              </label>
              <label className="flex items-center justify-between p-2 bg-white rounded-lg cursor-pointer hover:bg-emerald-50">
                <span className="flex items-center gap-2"><span>🍽️</span> Host/Food Fee</span>
                <input type="checkbox" checked={visibility.hostFee} onChange={(e) => setVisibility({...visibility, hostFee: e.target.checked})} className="w-5 h-5 text-emerald-500 rounded" />
              </label>
            </div>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-700">
            <strong>💡 Note:</strong> When unchecked, members cannot see these tabs. Only admin can view and manage them.
          </div>
        </div>
        <div className="flex gap-2 mt-6"><button onClick={() => { setShowSettingsModal(false); triggerConfetti(); }} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all">💾 Save Settings</button><button onClick={() => setShowSettingsModal(false)} className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button></div></div></div>)}

      {/* WhatsApp Options Modal */}
      {showWhatsAppOptionsModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"><h3 className="text-xl font-bold text-gray-800 mb-2">📱 WhatsApp Message Options</h3><p className="text-gray-600 text-sm mb-4">Choose what to include in this message.</p>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-emerald-50">
            <span className="flex items-center gap-2"><span>💰</span> Group Njangi Status</span>
            <input type="checkbox" checked={whatsAppOptions.includeNjangi} onChange={(e) => setWhatsAppOptions({...whatsAppOptions, includeNjangi: e.target.checked})} className="w-5 h-5 text-emerald-500 rounded" />
          </label>
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-emerald-50">
            <span className="flex items-center gap-2"><span>🏦</span> Savings Fund Status</span>
            <input type="checkbox" checked={whatsAppOptions.includeSavings} onChange={(e) => setWhatsAppOptions({...whatsAppOptions, includeSavings: e.target.checked})} className="w-5 h-5 text-emerald-500 rounded" />
          </label>
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-emerald-50">
            <span className="flex items-center gap-2"><span>🍽️</span> Host/Food Fee Status</span>
            <input type="checkbox" checked={whatsAppOptions.includeHostFee} onChange={(e) => setWhatsAppOptions({...whatsAppOptions, includeHostFee: e.target.checked})} className="w-5 h-5 text-emerald-500 rounded" />
          </label>
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-emerald-50">
            <span className="flex items-center gap-2"><span>📝</span> Meeting Notes</span>
            <input type="checkbox" checked={whatsAppOptions.includeNotes} onChange={(e) => setWhatsAppOptions({...whatsAppOptions, includeNotes: e.target.checked})} className="w-5 h-5 text-emerald-500 rounded" />
          </label>
        </div>
        <div className="flex gap-2 mt-6"><button onClick={confirmWhatsAppOptions} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition-all">📱 Generate Message</button><button onClick={() => setShowWhatsAppOptionsModal(false)} className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button></div></div></div>)}

      {/* Edit Member Modal */}
      {showEditMemberModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"><h3 className="text-xl font-bold text-gray-800 mb-4">✏️ Edit Member Name</h3><p className="text-gray-600 text-sm mb-4">{groups[editingMember.groupIdx]?.name} - Member #{editingMember.memberIdx + 1}</p><input type="text" value={editingMember.name} onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })} placeholder="Member name" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-4" /><div className="flex gap-2"><button onClick={saveMemberName} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all">💾 Save</button><button onClick={() => setShowEditMemberModal(false)} className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button></div></div></div>)}

      {/* Edit Beneficiary Modal */}
      {showBeneficiaryModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[80vh] flex flex-col"><h3 className="text-xl font-bold text-gray-800 mb-2">🔄 Change Beneficiary</h3><p className="text-gray-600 text-sm mb-4">{meetings[editingBeneficiary.meetingIdx]?.full} - {groups[editingBeneficiary.groupIdx]?.name}</p><div className="flex-1 overflow-y-auto space-y-2 mb-4">{groups[editingBeneficiary.groupIdx]?.members.map((member, idx) => { const currentBeneficiary = getBeneficiary(editingBeneficiary.groupIdx, editingBeneficiary.meetingIdx); const isCurrentBeneficiary = idx === currentBeneficiary.index; return (<button key={idx} onClick={() => saveBeneficiaryOverride(idx)} className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${isCurrentBeneficiary ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-gray-50 hover:bg-emerald-50 border-2 border-transparent'}`}><span>{member}</span>{isCurrentBeneficiary && <span className="text-yellow-600 font-bold">⭐ Current</span>}</button>); })}</div><div className="flex gap-2">{beneficiaryOverrides[`${editingBeneficiary.meetingIdx}-${editingBeneficiary.groupIdx}`] !== undefined && (<button onClick={clearBeneficiaryOverride} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition-all">↩️ Reset to Default</button>)}<button onClick={() => setShowBeneficiaryModal(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button></div></div></div>)}

      {/* Notes Modal */}
      {showNotesModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl"><h3 className="text-xl font-bold text-gray-800 mb-2">📝 Meeting Notes</h3><p className="text-gray-600 text-sm mb-4">{meetings[editingNotes.meetingIdx]?.full}</p><textarea value={editingNotes.note} onChange={(e) => setEditingNotes({ ...editingNotes, note: e.target.value })} placeholder="Add notes for this meeting..." rows={5} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-4" /><div className="flex gap-2"><button onClick={saveMeetingNotes} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all">💾 Save Notes</button><button onClick={() => setShowNotesModal(false)} className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button></div></div></div>)}

      {/* WhatsApp Modal */}
      {showWhatsAppModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[80vh] flex flex-col"><h3 className="text-xl font-bold text-gray-800 mb-4">📱 Share to WhatsApp</h3><div className="flex-1 overflow-auto mb-4"><pre className="bg-gray-100 p-4 rounded-xl text-sm whitespace-pre-wrap font-sans text-gray-700">{whatsAppMessage}</pre></div><div className="flex gap-2"><button onClick={copyToClipboard} className={`flex-1 py-3 rounded-xl font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>{copied ? '✓ Copied!' : '📋 Copy'}</button><button onClick={shareToWhatsApp} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition-all">Open WhatsApp</button></div><button onClick={() => setShowWhatsAppModal(false)} className="mt-2 text-gray-500 hover:text-gray-700 text-sm">Close</button></div></div>)}

      {/* Report Modal */}
      {showReportModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-6 w-full max-w-4xl shadow-2xl max-h-[90vh] flex flex-col"><div className="flex items-center justify-between mb-4"><h3 className="text-xl font-bold text-gray-800">🖨️ Print Meeting Report (CONFIDENTIAL)</h3><div className="flex gap-2"><select value={reportMeeting} onChange={(e) => setReportMeeting(parseInt(e.target.value))} className="px-3 py-2 rounded-lg border-2 border-gray-200">{meetings.map((m, idx) => (<option key={idx} value={idx}>Meeting #{idx + 1}: {m.date}</option>))}</select><button onClick={printReport} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold transition-all">🖨️ Print</button><button onClick={() => setShowReportModal(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-all">Close</button></div></div><div className="flex-1 overflow-auto border rounded-xl p-4 bg-white" ref={reportRef}><h1 style={{ textAlign: 'center', color: '#059669' }}>🌴 NIKOM NI MANKON 🌴</h1><h2 style={{ textAlign: 'center', color: '#333' }}>Meeting Report - {meetings[reportMeeting]?.full}</h2><p style={{ textAlign: 'center', color: '#666' }}>Host: {meetings[reportMeeting]?.host} | {meetings[reportMeeting]?.city}{hostInfo[reportMeeting]?.address && ` | ${hostInfo[reportMeeting].address}`}{hostInfo[reportMeeting]?.phone && ` | ${hostInfo[reportMeeting].phone}`}</p>{meetingNotes[reportMeeting] && (<div style={{ backgroundColor: '#F3F4F6', padding: '15px', borderRadius: '8px', margin: '15px 0' }}><strong>📝 Notes:</strong> {meetingNotes[reportMeeting]}</div>)}<div style={{ backgroundColor: '#FEE2E2', border: '2px solid #DC2626', padding: '15px', borderRadius: '8px', margin: '15px 0' }}><h3 style={{ color: '#DC2626', margin: '0 0 10px 0' }}>🔒 CONFIDENTIAL - SAVINGS FUND (Admin Only)</h3><p><strong>Meeting #{reportMeeting + 1} Savings:</strong> ${getMeetingSavingsStats(reportMeeting).collected.toLocaleString()} of ${getMeetingSavingsStats(reportMeeting).target.toLocaleString()} ({getMeetingSavingsStats(reportMeeting).paid}/{getMeetingSavingsStats(reportMeeting).total} members)</p><p style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#DC2626', marginTop: '10px' }}>💰 TOTAL SAVINGS FUND: ${overallStats.totalSavingsCollected.toLocaleString()}</p></div><h2 style={{ color: '#10B981', borderBottom: '2px solid #10B981', paddingBottom: '5px' }}>💰 Group Njangi Summary</h2>{groups.map((group, gIdx) => { const beneficiary = getBeneficiary(gIdx, reportMeeting); const stats = getGroupMeetingStats(reportMeeting, gIdx); return (<div key={gIdx} style={{ marginBottom: '20px' }}><h3 style={{ color: group.color }}>{group.name} - Beneficiary: {beneficiary.name} {beneficiary.isOverride ? '(Changed)' : ''}</h3><p>Collected: ${stats.njangiCollected.toLocaleString()} of ${stats.njangiTarget.toLocaleString()} ({stats.njangiPercentage}%)</p><table style={{ width: '100%', borderCollapse: 'collapse', margin: '10px 0' }}><thead><tr><th style={{ backgroundColor: group.color, color: 'white', padding: '8px', border: '1px solid #ddd' }}>#</th><th style={{ backgroundColor: group.color, color: 'white', padding: '8px', border: '1px solid #ddd' }}>Member</th><th style={{ backgroundColor: group.color, color: 'white', padding: '8px', border: '1px solid #ddd' }}>Njangi</th><th style={{ backgroundColor: group.color, color: 'white', padding: '8px', border: '1px solid #ddd' }}>Host</th><th style={{ backgroundColor: group.color, color: 'white', padding: '8px', border: '1px solid #ddd' }}>Savings</th></tr></thead><tbody>{group.members.map((member, mIdx) => { const njangiPaid = njangiPayments[`${reportMeeting}-${gIdx}-${mIdx}`]; const hostPaid = hostFeePayments[`${reportMeeting}-${gIdx}-${mIdx}`]; const savingsPaid = savingsFundPayments[`${reportMeeting}-${gIdx}-${mIdx}`]; const isBeneficiary = mIdx === beneficiary.index; return (<tr key={mIdx} style={isBeneficiary ? { backgroundColor: '#FEF3C7' } : {}}><td style={{ padding: '8px', border: '1px solid #ddd' }}>{mIdx + 1}</td><td style={{ padding: '8px', border: '1px solid #ddd' }}>{member} {isBeneficiary && '⭐'}</td><td style={{ padding: '8px', border: '1px solid #ddd', color: isBeneficiary ? '#D97706' : njangiPaid ? '#059669' : '#DC2626', fontWeight: 'bold', textAlign: 'center' }}>{isBeneficiary ? 'RECEIVES' : njangiPaid ? '✓' : '✗'}</td><td style={{ padding: '8px', border: '1px solid #ddd', color: hostPaid ? '#059669' : '#DC2626', fontWeight: 'bold', textAlign: 'center' }}>{hostPaid ? '✓' : '✗'}</td><td style={{ padding: '8px', border: '1px solid #ddd', color: savingsPaid ? '#059669' : '#DC2626', fontWeight: 'bold', textAlign: 'center' }}>{savingsPaid ? '✓' : '✗'}</td></tr>); })}</tbody></table></div>); })}<h2 style={{ color: '#0D9488', borderBottom: '2px solid #0D9488', paddingBottom: '5px' }}>🍽️ Host/Food Fee Summary</h2><p>Host: {meetings[reportMeeting]?.host} | Collected: ${getMeetingHostFeeStats(reportMeeting).collected.toLocaleString()} of ${getMeetingHostFeeStats(reportMeeting).target.toLocaleString()}</p><div style={{ textAlign: 'center', marginTop: '30px', color: '#666' }}><p>🌴 Nikom Ni Mankon - The Fertile Raffia Groves of Asonka 🌴</p><p>Generated on {new Date().toLocaleDateString()} - CONFIDENTIAL ADMIN REPORT</p></div></div></div></div>)}

      {/* Header */}
      <header className="relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-green-600 to-teal-700" /><div className="absolute left-4 bottom-0 opacity-30"><RaffiaPalmSVG className="w-16 h-28" /></div><div className="absolute right-4 bottom-0 opacity-30" style={{ transform: 'scaleX(-1)' }}><RaffiaPalmSVG className="w-16 h-28" /></div><div className="relative max-w-7xl mx-auto px-4 py-5"><div className="flex flex-col md:flex-row items-center justify-between gap-4"><div className="flex items-center gap-4"><div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"><RaffiaPalmSVG className="w-12 h-20" /></div><div className="text-white"><h1 className="text-2xl md:text-3xl font-bold">NIKOM NI MANKON</h1><p className="text-emerald-200 text-sm">🌿 The Fertile Raffia Groves of Asonka</p></div></div><div className="flex items-center gap-3 flex-wrap justify-center">{isAdmin ? (<div className="flex items-center gap-2"><span className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">🔓 Admin Mode</span><button onClick={() => setShowSettingsModal(true)} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition-all">⚙️ Settings</button><button onClick={() => setIsAdmin(false)} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition-all">Logout</button></div>) : (<button onClick={() => setShowLoginModal(true)} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2">🔐 Admin Login</button>)}{isAdmin && (<button onClick={() => setShowReportModal(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2">🖨️ Report</button>)}<button onClick={() => openWhatsAppWithOptions('reminder')} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2">📱 Share</button></div></div></div>{!isAdmin && (<div className="bg-yellow-400 text-yellow-900 text-center py-2 text-sm font-medium">👀 View-Only Mode - Contact admin to update payments</div>)}</header>

      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-40 border-b-4 border-emerald-500"><div className="max-w-7xl mx-auto px-4"><div className="flex gap-1 overflow-x-auto py-2">{visibleTabs.map(tab => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap text-sm ${activeTab === tab.id ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg' : 'text-gray-600 hover:bg-emerald-50'}`}><span>{tab.icon}</span>{tab.label}</button>))}</div></div></nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (<div className="space-y-6">
          {/* Admin Controls Banner */}
          {isAdmin && (<div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-4 text-white"><div className="flex items-center justify-between flex-wrap gap-3"><div><h3 className="font-bold flex items-center gap-2">⚙️ Admin Controls</h3><p className="text-purple-200 text-sm">Control what members can see</p></div><div className="flex gap-2 flex-wrap"><button onClick={() => setShowSettingsModal(true)} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-all">👁️ Visibility Settings</button></div></div><div className="mt-3 flex flex-wrap gap-2">{[{key: 'njangi', label: 'Njangi', icon: '💰'}, {key: 'savings', label: 'Savings', icon: '🏦'}, {key: 'hostFee', label: 'Host Fee', icon: '🍽️'}].map(item => (<span key={item.key} className={`px-3 py-1 rounded-full text-xs font-bold ${visibility[item.key] ? 'bg-green-400 text-green-900' : 'bg-red-400 text-red-900'}`}>{item.icon} {item.label}: {visibility[item.key] ? 'PUBLIC' : 'ADMIN ONLY'}</span>))}</div></div>)}
          
          {/* Stats */}
          <div className={`grid ${isAdmin ? 'grid-cols-2 md:grid-cols-5' : 'grid-cols-2 md:grid-cols-4'} gap-4`}><div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-4 text-white shadow-lg"><p className="text-emerald-100 text-xs">Members</p><p className="text-3xl font-bold">{totalMembers}</p></div><div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-4 text-white shadow-lg"><p className="text-green-100 text-xs">Njangi</p><p className="text-3xl font-bold">${overallStats.totalNjangiCollected.toLocaleString()}</p></div><div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-4 text-white shadow-lg"><p className="text-teal-100 text-xs">Host/Food Fees</p><p className="text-3xl font-bold">${overallStats.totalHostFeeCollected.toLocaleString()}</p></div>{isAdmin && (<div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-4 text-white shadow-lg relative"><span className="absolute top-1 right-2 text-xs bg-red-500 px-1.5 py-0.5 rounded">🔒</span><p className="text-purple-100 text-xs">Savings Fund</p><p className="text-3xl font-bold">${overallStats.totalSavingsCollected.toLocaleString()}</p></div>)}<div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-4 text-white shadow-lg"><p className="text-cyan-100 text-xs">Total</p><p className="text-3xl font-bold">${(overallStats.totalNjangiCollected + overallStats.totalHostFeeCollected).toLocaleString()}</p></div></div>

          {/* Next Meeting */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden"><div className="bg-gradient-to-r from-emerald-500 to-green-500 p-4 text-white flex items-center justify-between flex-wrap gap-2"><div><h3 className="text-lg font-bold">🗓️ Next: {meetings[0].full}</h3><p className="text-emerald-100 text-sm">🏠 {meetings[0].host} • {meetings[0].city}</p></div><div className="flex gap-2">{isAdmin && (<button onClick={() => { setEditingNotes({ meetingIdx: 0, note: meetingNotes[0] || '' }); setShowNotesModal(true); }} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-all">📝 Notes</button>)}<button onClick={() => openWhatsAppWithOptions('reminder')} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-all">📱 Share Reminder</button></div></div>{meetingNotes[0] && (<div className="bg-yellow-50 px-4 py-2 border-b text-sm"><span className="font-bold text-yellow-700">📝 Notes:</span> {meetingNotes[0]}</div>)}<div className="p-4"><h4 className="font-bold text-gray-800 mb-3">💰 Beneficiaries:</h4><div className="grid grid-cols-2 md:grid-cols-5 gap-3">{groups.map((group, gIdx) => { const beneficiary = getBeneficiary(gIdx, 0); const stats = getGroupMeetingStats(0, gIdx); return (<div key={gIdx} className="rounded-lg p-3 border-2 relative" style={{ borderColor: group.color, backgroundColor: group.color + '10' }}>{beneficiary.isOverride && (<span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">Changed</span>)}<p className="text-xs font-bold" style={{ color: group.color }}>{group.name}</p><p className="font-bold text-gray-800 text-sm mt-1">{beneficiary.name}</p><div className="mt-2 bg-gray-200 rounded-full h-2"><div className="h-full rounded-full transition-all" style={{ width: `${stats.njangiPercentage}%`, backgroundColor: group.color }}/></div><p className="text-xs text-gray-500 mt-1">{stats.njangiPercentage}% collected</p>{isAdmin && (<button onClick={() => { setEditingBeneficiary({ meetingIdx: 0, groupIdx: gIdx }); setShowBeneficiaryModal(true); }} className="mt-2 text-xs text-blue-600 hover:text-blue-700">🔄 Change</button>)}</div>); })}</div></div></div>

          {/* Payment Summary */}
          <div className="bg-white rounded-xl shadow-lg p-4"><h3 className="font-bold text-gray-800 mb-3">💵 What Each Member Pays Per Meeting</h3><div className="grid grid-cols-2 md:grid-cols-4 gap-3"><div className="bg-emerald-50 p-3 rounded-lg text-center"><p className="text-emerald-600 font-bold text-lg">$1,000</p><p className="text-xs text-gray-600">Group Njangi</p></div><div className="bg-purple-50 p-3 rounded-lg text-center"><p className="text-purple-600 font-bold text-lg">$100</p><p className="text-xs text-gray-600">Savings Fund</p></div><div className="bg-teal-50 p-3 rounded-lg text-center"><p className="text-teal-600 font-bold text-lg">$20</p><p className="text-xs text-gray-600">Host/Food Fee</p></div><div className="bg-blue-50 p-3 rounded-lg text-center"><p className="text-blue-600 font-bold text-lg">$1,120</p><p className="text-xs text-gray-600">Total Per Meeting</p></div></div></div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-4"><h3 className="font-bold text-gray-800 mb-3">⚡ Quick Actions</h3><div className="grid grid-cols-2 md:grid-cols-4 gap-3"><button onClick={() => openWhatsAppWithOptions('summary')} className="bg-green-100 hover:bg-green-200 text-green-700 p-4 rounded-xl text-sm font-medium transition-all text-center">📊 Share Summary</button><button onClick={() => openWhatsAppWithOptions('reminder')} className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-4 rounded-xl text-sm font-medium transition-all text-center">🔔 Share Reminder</button><button onClick={() => setActiveTab('njangi')} className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 p-4 rounded-xl text-sm font-medium transition-all text-center">💰 Track Njangi</button>{isAdmin && (<button onClick={() => setShowReportModal(true)} className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-4 rounded-xl text-sm font-medium transition-all text-center">🖨️ Print Report</button>)}</div></div>
        </div>)}

        {/* Group Njangi Tab */}
        {activeTab === 'njangi' && (isAdmin || visibility.njangi) && (<div className="space-y-4"><div className="bg-white rounded-xl shadow-lg p-4 space-y-3"><div><p className="text-sm font-medium text-gray-600 mb-2">📅 Meeting</p><div className="flex gap-2 overflow-x-auto pb-2">{meetings.map((m, idx) => (<button key={idx} onClick={() => setSelectedMeeting(idx)} className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedMeeting === idx ? 'bg-emerald-500 text-white' : 'bg-gray-100 hover:bg-emerald-100'}`}>{m.date}</button>))}</div></div><div><p className="text-sm font-medium text-gray-600 mb-2">👥 Group</p><div className="flex gap-2 overflow-x-auto">{groups.map((g, idx) => (<button key={idx} onClick={() => setSelectedGroup(idx)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedGroup === idx ? 'text-white' : 'bg-gray-100 hover:opacity-80'}`} style={selectedGroup === idx ? { backgroundColor: g.color } : {}}>{g.name}</button>))}</div></div></div>{(() => { const group = groups[selectedGroup]; const beneficiary = getBeneficiary(selectedGroup, selectedMeeting); const stats = getGroupMeetingStats(selectedMeeting, selectedGroup); return (<><div className={`bg-gradient-to-r ${group.gradient} rounded-xl p-4 text-white shadow-lg`}><div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"><div><p className="text-white/80 text-sm">{currentMeeting.full}</p><h2 className="text-xl font-bold">{group.name}</h2><div className="mt-2 bg-white/20 rounded-lg px-3 py-2 inline-block relative">{beneficiary.isOverride && (<span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">Changed</span>)}<p className="text-white/80 text-xs">⭐ BENEFICIARY</p><p className="font-bold">{beneficiary.name}</p>{isAdmin && (<button onClick={() => { setEditingBeneficiary({ meetingIdx: selectedMeeting, groupIdx: selectedGroup }); setShowBeneficiaryModal(true); }} className="text-xs text-white/80 hover:text-white underline mt-1">🔄 Change Beneficiary</button>)}</div></div><div className="bg-white/20 rounded-xl p-4 text-center"><p className="text-3xl font-bold">${stats.njangiCollected.toLocaleString()}</p><p className="text-white/80 text-sm">of ${stats.njangiTarget.toLocaleString()}</p><div className="bg-white/30 rounded-full h-2 mt-2 w-24"><div className="bg-white h-full rounded-full" style={{ width: `${stats.njangiPercentage}%` }}/></div></div></div><div className="mt-3 flex gap-2 flex-wrap"><button onClick={() => openWhatsAppWithOptions('group')} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm transition-all">📱 Share Group Update</button>{isAdmin && (<button onClick={() => { setEditingNotes({ meetingIdx: selectedMeeting, note: meetingNotes[selectedMeeting] || '' }); setShowNotesModal(true); }} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm transition-all">📝 Add Notes</button>)}</div></div>{meetingNotes[selectedMeeting] && (<div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4"><p className="font-bold text-yellow-700 text-sm">📝 Meeting Notes:</p><p className="text-gray-700 mt-1">{meetingNotes[selectedMeeting]}</p></div>)}<div className="bg-white rounded-xl shadow-lg overflow-hidden"><div className="overflow-x-auto"><table className="w-full"><thead><tr className="bg-gray-50"><th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">#</th><th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Member</th><th className="px-4 py-3 text-center text-sm font-semibold" style={{ color: group.color }}>$1,000</th><th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Status</th>{isAdmin && <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Edit</th>}</tr></thead><tbody>{group.members.map((member, mIdx) => { const isPaid = njangiPayments[`${selectedMeeting}-${selectedGroup}-${mIdx}`]; const isBeneficiary = mIdx === beneficiary.index; return (<tr key={mIdx} className={`border-b ${isBeneficiary ? 'bg-yellow-50' : isPaid ? 'bg-emerald-50' : ''}`}><td className="px-4 py-3 text-gray-500">{mIdx + 1}</td><td className="px-4 py-3"><span className="font-medium text-gray-800">{member}</span>{isBeneficiary && (<span className="ml-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">⭐ BENEFICIARY</span>)}</td><td className="px-4 py-3 text-center">{isBeneficiary ? (<span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm font-bold">RECEIVES</span>) : (<button onClick={() => toggleNjangi(selectedMeeting, selectedGroup, mIdx)} disabled={!isAdmin} className={`w-24 py-2 rounded-lg font-bold text-sm transition-all ${isPaid ? 'text-white' : 'bg-gray-100 text-gray-600'} ${isAdmin ? 'hover:opacity-80 cursor-pointer' : 'cursor-not-allowed opacity-80'}`} style={isPaid ? { backgroundColor: group.color } : {}}>{isPaid ? '✓ PAID' : '$1,000'}</button>)}</td><td className="px-4 py-3 text-center">{isBeneficiary ? (<span className="text-yellow-600 text-sm font-bold">⭐</span>) : isPaid ? (<span className="text-emerald-600 text-sm font-bold">✓</span>) : (<span className="text-red-500 text-sm font-bold">⏳</span>)}</td>{isAdmin && (<td className="px-4 py-3 text-center"><button onClick={() => { setEditingMember({ groupIdx: selectedGroup, memberIdx: mIdx, name: member }); setShowEditMemberModal(true); }} className="text-blue-600 hover:text-blue-700 text-sm">✏️</button></td>)}</tr>); })}</tbody></table></div></div></>); })()}</div>)}

        {/* Savings Tab */}
        {activeTab === 'savings' && (isAdmin || visibility.savings) && (<div className="space-y-4"><div className="bg-white rounded-xl shadow-lg p-4"><p className="text-sm font-medium text-gray-600 mb-2">📅 Meeting</p><div className="flex gap-2 overflow-x-auto pb-2">{meetings.map((m, idx) => (<button key={idx} onClick={() => setSelectedMeeting(idx)} className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedMeeting === idx ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-purple-100'}`}>{m.date}</button>))}</div></div><div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-4 text-white shadow-lg"><div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"><div><p className="text-purple-100 text-sm">{currentMeeting.full}</p><h2 className="text-xl font-bold">🏦 Savings Fund ($100/member)</h2><p className="text-purple-200 text-sm mt-1">Building our community's financial future</p></div><div className="bg-white/20 rounded-xl p-4 text-center"><p className="text-3xl font-bold">${savingsStats.collected.toLocaleString()}</p><p className="text-purple-100 text-sm">of ${savingsStats.target.toLocaleString()}</p><p className="text-xs text-purple-200 mt-1">{savingsStats.paid}/{savingsStats.total} paid</p></div></div>{isAdmin && (<div className="mt-4 bg-red-500/30 border border-red-300 rounded-lg p-3"><p className="text-xs text-red-200 mb-1">🔒 CONFIDENTIAL - Admin Only</p><p className="text-2xl font-bold">Total Savings Fund: ${overallStats.totalSavingsCollected.toLocaleString()}</p></div>)}</div><div className="bg-white rounded-xl shadow-lg p-4"><div className="flex items-center justify-between mb-4"><h3 className="font-bold text-gray-800">All {totalMembers} Members → $100 to Savings</h3></div><input type="text" placeholder="🔍 Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none mb-4 text-sm" /><div className="space-y-3">{groups.map((group, gIdx) => { const filteredMembers = group.members.filter(m => !searchTerm || m.toLowerCase().includes(searchTerm.toLowerCase())); if (filteredMembers.length === 0) return null; const paidCount = group.members.filter((_, mIdx) => savingsFundPayments[`${selectedMeeting}-${gIdx}-${mIdx}`]).length; return (<div key={gIdx} className="border rounded-lg overflow-hidden"><div className="p-2 flex items-center justify-between" style={{ backgroundColor: group.color + '15' }}><span className="font-bold text-sm" style={{ color: group.color }}>{group.name}</span><span className="text-xs" style={{ color: group.color }}>{paidCount}/{group.members.length}</span></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">{filteredMembers.map((member) => { const actualIdx = group.members.indexOf(member); const isPaid = savingsFundPayments[`${selectedMeeting}-${gIdx}-${actualIdx}`]; return (<div key={member} className={`flex items-center justify-between p-2 rounded-lg text-sm ${isPaid ? 'bg-purple-50' : 'bg-gray-50'}`}><span className="font-medium text-gray-800 truncate">{member}</span><button onClick={() => toggleSavingsFund(selectedMeeting, gIdx, actualIdx)} disabled={!isAdmin} className={`px-3 py-1 rounded text-xs font-bold transition-all ${isPaid ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600'} ${isAdmin ? 'hover:opacity-80' : 'cursor-not-allowed'}`}>{isPaid ? '✓' : '$100'}</button></div>); })}</div></div>); })}</div></div>{!isAdmin && (<div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center"><p className="text-purple-700">🔒 Total savings fund amount is only visible to admin</p></div>)}</div>)}

        {/* Host Fee Tab */}
        {activeTab === 'hostfee' && (isAdmin || visibility.hostFee) && (<div className="space-y-4"><div className="bg-white rounded-xl shadow-lg p-4"><p className="text-sm font-medium text-gray-600 mb-2">📅 Meeting</p><div className="flex gap-2 overflow-x-auto pb-2">{meetings.map((m, idx) => (<button key={idx} onClick={() => setSelectedMeeting(idx)} className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedMeeting === idx ? 'bg-teal-500 text-white' : 'bg-gray-100 hover:bg-teal-100'}`}>{m.date}</button>))}</div></div><div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl p-4 text-white shadow-lg"><div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"><div><p className="text-teal-100 text-sm">{currentMeeting.full}</p><h2 className="text-xl font-bold">🍽️ Host/Food Fee ($20/member)</h2><p className="text-teal-200 text-sm mt-1">Host: {currentMeeting.host} • {currentMeeting.city}</p>{hostInfo[selectedMeeting]?.address && (<p className="text-teal-100 text-sm mt-1">📍 {hostInfo[selectedMeeting].address}</p>)}{hostInfo[selectedMeeting]?.phone && (<p className="text-teal-100 text-sm">📞 {hostInfo[selectedMeeting].phone}</p>)}</div><div className="bg-white/20 rounded-xl p-4 text-center"><p className="text-3xl font-bold">${hostFeeStats.collected.toLocaleString()}</p><p className="text-teal-100 text-sm">of ${hostFeeStats.target.toLocaleString()}</p><p className="text-xs text-teal-200 mt-1">{hostFeeStats.paid}/{hostFeeStats.total} paid</p></div></div>{isAdmin && (<div className="mt-3 flex gap-2 flex-wrap"><button onClick={() => { setEditingHost(selectedMeeting); setEditForm(hostInfo[selectedMeeting] || { address: '', phone: '' }); }} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm transition-all">✏️ Edit Host Info</button><button onClick={() => { setEditingNotes({ meetingIdx: selectedMeeting, note: meetingNotes[selectedMeeting] || '' }); setShowNotesModal(true); }} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm transition-all">📝 Add Notes</button></div>)}</div>{editingHost === selectedMeeting && (<div className="bg-blue-50 rounded-xl p-4 border border-blue-200"><h4 className="font-bold text-blue-800 mb-3">✏️ Edit Host Information</h4><div className="flex flex-col md:flex-row gap-3"><input type="text" placeholder="Address" value={editForm.address} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} className="flex-1 px-4 py-2 rounded-lg border" /><input type="text" placeholder="Phone" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className="w-full md:w-48 px-4 py-2 rounded-lg border" /><button onClick={() => saveHostInfo(selectedMeeting)} className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-600">💾 Save</button><button onClick={() => setEditingHost(null)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">Cancel</button></div></div>)}{meetingNotes[selectedMeeting] && (<div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4"><p className="font-bold text-yellow-700 text-sm">📝 Meeting Notes:</p><p className="text-gray-700 mt-1">{meetingNotes[selectedMeeting]}</p></div>)}<div className="bg-white rounded-xl shadow-lg p-4"><div className="flex items-center justify-between mb-4"><h3 className="font-bold text-gray-800">All {totalMembers} Members → $20 to Host</h3></div><input type="text" placeholder="🔍 Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none mb-4 text-sm" /><div className="space-y-3">{groups.map((group, gIdx) => { const filteredMembers = group.members.filter(m => !searchTerm || m.toLowerCase().includes(searchTerm.toLowerCase())); if (filteredMembers.length === 0) return null; const paidCount = group.members.filter((_, mIdx) => hostFeePayments[`${selectedMeeting}-${gIdx}-${mIdx}`]).length; return (<div key={gIdx} className="border rounded-lg overflow-hidden"><div className="p-2 flex items-center justify-between" style={{ backgroundColor: group.color + '15' }}><span className="font-bold text-sm" style={{ color: group.color }}>{group.name}</span><span className="text-xs" style={{ color: group.color }}>{paidCount}/{group.members.length}</span></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">{filteredMembers.map((member) => { const actualIdx = group.members.indexOf(member); const isPaid = hostFeePayments[`${selectedMeeting}-${gIdx}-${actualIdx}`]; return (<div key={member} className={`flex items-center justify-between p-2 rounded-lg text-sm ${isPaid ? 'bg-teal-50' : 'bg-gray-50'}`}><span className="font-medium text-gray-800 truncate">{member}</span><button onClick={() => toggleHostFee(selectedMeeting, gIdx, actualIdx)} disabled={!isAdmin} className={`px-3 py-1 rounded text-xs font-bold transition-all ${isPaid ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'} ${isAdmin ? 'hover:opacity-80' : 'cursor-not-allowed'}`}>{isPaid ? '✓' : '$20'}</button></div>); })}</div></div>); })}</div></div></div>)}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (<div className="space-y-4">{meetings.map((meeting, idx) => { const hostStats = getMeetingHostFeeStats(idx); const info = hostInfo[idx] || { address: '', phone: '' }; return (<div key={idx} className={`bg-white rounded-xl shadow-lg overflow-hidden ${idx === 0 ? 'ring-2 ring-emerald-400' : ''}`}><div className={`p-3 flex items-center justify-between ${idx === 0 ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white' : 'bg-gray-50'}`}><div><span className={`text-xs font-bold ${idx === 0 ? 'text-emerald-100' : 'text-gray-500'}`}>Meeting #{idx + 1}</span><p className={`font-bold ${idx === 0 ? 'text-white' : 'text-gray-800'}`}>{meeting.full}</p></div><div className="text-right flex items-center gap-2"><div><p className={`text-sm ${idx === 0 ? 'text-emerald-100' : 'text-gray-500'}`}>🏠 {meeting.host}</p><p className={`text-xs ${idx === 0 ? 'text-emerald-200' : 'text-gray-400'}`}>{meeting.city}</p></div>{idx === 0 && (<button onClick={() => { setSelectedMeeting(0); setActiveTab('njangi'); }} className="bg-white text-emerald-600 text-xs font-bold px-3 py-1 rounded-full hover:bg-emerald-50 transition-all">NEXT →</button>)}</div></div>{meetingNotes[idx] && (<div className="px-3 py-2 bg-yellow-50 border-b text-sm"><span className="font-bold text-yellow-700">📝 Notes:</span> {meetingNotes[idx]}</div>)}{isAdmin && (<div className="px-3 py-2 bg-gray-50 border-b">{editingHost === idx ? (<div className="flex flex-col md:flex-row gap-2"><input type="text" placeholder="Address" value={editForm.address} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} className="flex-1 px-3 py-1.5 rounded-lg border text-sm" /><input type="text" placeholder="Phone" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className="w-full md:w-40 px-3 py-1.5 rounded-lg border text-sm" /><div className="flex gap-1"><button onClick={() => saveHostInfo(idx)} className="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-600">💾 Save</button><button onClick={() => setEditingHost(null)} className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-400">Cancel</button></div></div>) : (<div className="flex items-center justify-between flex-wrap gap-2"><div className="text-sm text-gray-600">{info.address || info.phone ? (<>{info.address && <span>📍 {info.address}</span>}{info.address && info.phone && <span className="mx-2">•</span>}{info.phone && <span>📞 {info.phone}</span>}</>) : (<span className="text-gray-400 italic">No address/phone added</span>)}</div><div className="flex gap-2"><button onClick={() => { setEditingHost(idx); setEditForm(info); }} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs font-medium hover:bg-blue-200">✏️ Edit Host Info</button><button onClick={() => { setEditingNotes({ meetingIdx: idx, note: meetingNotes[idx] || '' }); setShowNotesModal(true); }} className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-xs font-medium hover:bg-yellow-200">📝 Notes</button></div></div>)}</div>)}{!isAdmin && (info.address || info.phone) && (<div className="px-3 py-2 bg-gray-50 border-b text-sm text-gray-600">{info.address && <span>📍 {info.address}</span>}{info.address && info.phone && <span className="mx-2">•</span>}{info.phone && <span>📞 {info.phone}</span>}</div>)}<div className="p-3"><div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center">{groups.map((group, gIdx) => { const beneficiary = getBeneficiary(gIdx, idx); const stats = getGroupMeetingStats(idx, gIdx); return (<div key={gIdx} onClick={() => { setSelectedMeeting(idx); setSelectedGroup(gIdx); setActiveTab('njangi'); }} className="p-2 rounded-lg border text-sm cursor-pointer hover:shadow-md transition-all relative" style={{ borderColor: group.color + '50' }}>{beneficiary.isOverride && (<span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">!</span>)}<p className="text-xs font-bold" style={{ color: group.color }}>{group.name}</p><p className="font-medium text-gray-800 truncate">{beneficiary.name}</p><div className="bg-gray-200 rounded-full h-1.5 mt-1"><div className="h-full rounded-full" style={{ width: `${stats.njangiPercentage}%`, backgroundColor: group.color }}/></div></div>); })}</div><div className="mt-2 pt-2 border-t flex items-center justify-between"><span className="text-xs text-gray-500">🍽️ Host fee: {hostStats.paid}/{hostStats.total} paid (${hostStats.collected.toLocaleString()})</span><button onClick={() => { setSelectedMeeting(idx); setActiveTab('hostfee'); }} className="text-xs text-teal-600 hover:text-teal-700 font-medium">View Details →</button></div></div></div>); })}</div>)}

        {/* Members Tab */}
        {activeTab === 'members' && (<div className="space-y-4"><div className="bg-white rounded-xl shadow-lg p-4"><div className="flex items-center justify-between mb-4"><h3 className="font-bold text-gray-800">👥 All {totalMembers} Members</h3><input type="text" placeholder="🔍 Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-sm w-48" /></div>{isAdmin && (<div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm text-blue-700">💡 <strong>Tip:</strong> Click ✏️ next to any name to fix typos or update member names.</div>)}<div className="space-y-4">{groups.map((group, gIdx) => { const filteredMembers = group.members.filter(m => !searchTerm || m.toLowerCase().includes(searchTerm.toLowerCase())); if (filteredMembers.length === 0 && searchTerm) return null; return (<div key={gIdx} className="border rounded-xl overflow-hidden"><div className="p-3 flex items-center justify-between" style={{ backgroundColor: group.color, color: 'white' }}><span className="font-bold">{group.name}</span><span className="text-sm opacity-80">{group.members.length} members</span></div><div className="p-3"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">{(searchTerm ? filteredMembers : group.members).map((member) => { const actualIdx = group.members.indexOf(member); return (<div key={actualIdx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div className="flex items-center gap-2"><span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: group.color }}>{actualIdx + 1}</span><span className="font-medium text-gray-800">{member}</span></div>{isAdmin && (<button onClick={() => { setEditingMember({ groupIdx: gIdx, memberIdx: actualIdx, name: member }); setShowEditMemberModal(true); }} className="text-blue-600 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50">✏️</button>)}</div>); })}</div></div></div>); })}</div></div></div>)}

        {/* WhatsApp Tab */}
        {activeTab === 'whatsapp' && (<div className="space-y-6"><div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"><h2 className="text-2xl font-bold flex items-center gap-2">📱 WhatsApp Integration</h2><p className="text-green-100 mt-2">Generate and share updates with your Nikom WhatsApp group!</p>{isAdmin && (<p className="text-green-200 text-sm mt-2">💡 As admin, you can choose what to include in each message.</p>)}</div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="bg-white rounded-xl shadow-lg p-5"><h3 className="font-bold text-gray-800 mb-3">📊 Full Meeting Summary</h3><p className="text-gray-600 text-sm mb-4">Share complete status of all groups for a meeting.</p><select onChange={(e) => setSelectedMeeting(parseInt(e.target.value))} value={selectedMeeting} className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 mb-3">{meetings.map((m, idx) => (<option key={idx} value={idx}>Meeting #{idx + 1}: {m.full}</option>))}</select><button onClick={() => openWhatsAppWithOptions('summary')} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition-all">📱 Generate Summary</button></div><div className="bg-white rounded-xl shadow-lg p-5"><h3 className="font-bold text-gray-800 mb-3">💰 Group-Specific Update</h3><p className="text-gray-600 text-sm mb-4">Share payment status for a specific group.</p><div className="grid grid-cols-2 gap-2 mb-3"><select onChange={(e) => setSelectedMeeting(parseInt(e.target.value))} value={selectedMeeting} className="px-3 py-2 rounded-lg border-2 border-gray-200 text-sm">{meetings.map((m, idx) => (<option key={idx} value={idx}>#{idx + 1}: {m.date}</option>))}</select><select onChange={(e) => setSelectedGroup(parseInt(e.target.value))} value={selectedGroup} className="px-3 py-2 rounded-lg border-2 border-gray-200 text-sm">{groups.map((g, idx) => (<option key={idx} value={idx}>{g.name}</option>))}</select></div><button onClick={() => openWhatsAppWithOptions('group')} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all">📱 Generate Group Update</button></div><div className="bg-white rounded-xl shadow-lg p-5"><h3 className="font-bold text-gray-800 mb-3">🔔 Meeting Reminder</h3><p className="text-gray-600 text-sm mb-4">Share upcoming meeting details and beneficiaries.</p><select onChange={(e) => setSelectedMeeting(parseInt(e.target.value))} value={selectedMeeting} className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 mb-3">{meetings.map((m, idx) => (<option key={idx} value={idx}>Meeting #{idx + 1}: {m.full}</option>))}</select><button onClick={() => openWhatsAppWithOptions('reminder')} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all">📱 Generate Reminder</button></div><div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-5"><h3 className="font-bold text-gray-800 mb-3">📖 How to Use</h3><ol className="text-sm text-gray-600 space-y-2"><li><span className="font-bold text-emerald-600">1.</span> Admin updates payments in the app</li><li><span className="font-bold text-emerald-600">2.</span> Generate a WhatsApp message here</li><li><span className="font-bold text-emerald-600">3.</span> {isAdmin ? 'Choose what to include' : 'Copy or share directly'}</li><li><span className="font-bold text-emerald-600">4.</span> Paste in your Nikom WhatsApp group!</li></ol></div></div></div>)}

        {/* Rules Tab */}
        {activeTab === 'rules' && (<div className="space-y-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-3">{rules.map((rule, idx) => (<div key={idx} className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-emerald-500"><div className="flex items-start gap-3"><span className="text-2xl">{rule.icon}</span><div><span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">#{idx + 1}</span><h3 className="font-bold text-gray-800">{rule.title}</h3><p className="text-gray-600 text-sm">{rule.text}</p></div></div></div>))}</div><div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-5 text-white"><h3 className="font-bold text-lg mb-4">💰 Per Meeting Summary</h3><div className="grid md:grid-cols-3 gap-4"><div className="bg-white/20 rounded-lg p-4"><h4 className="font-bold mb-2">Group Njangi ($1,000)</h4><div className="text-sm space-y-1">{groups.map((g, i) => (<div key={i} className="flex justify-between"><span>{g.name}:</span><span>${(g.members.length * 1000).toLocaleString()}</span></div>))}</div></div><div className="bg-white/20 rounded-lg p-4"><h4 className="font-bold mb-2">Savings Fund ($100)</h4><p className="text-3xl font-bold">${(totalMembers * 100).toLocaleString()}</p><p className="text-sm text-white/80">{totalMembers} × $100</p></div><div className="bg-white/20 rounded-lg p-4"><h4 className="font-bold mb-2">Host/Food Fee ($20)</h4><p className="text-3xl font-bold">${(totalMembers * 20).toLocaleString()}</p><p className="text-sm text-white/80">{totalMembers} × $20</p></div></div><div className="mt-4 bg-white/20 rounded-lg p-4 text-center"><p className="text-sm">Each member pays per meeting:</p><p className="text-3xl font-bold">$1,120</p><p className="text-sm text-white/80">$1,000 + $100 + $20</p></div></div></div>)}
      </main>

      {/* Footer */}
      <footer className="bg-emerald-800 text-white py-6 mt-8"><div className="max-w-7xl mx-auto px-4 text-center"><p className="font-bold">🌴 Nikom Ni Mankon 🌴</p><p className="text-emerald-300 text-sm">Maryland, USA • Growing Together</p><p className="text-emerald-400 text-xs mt-2">🇨🇲 × 🇺🇸</p></div></footer>
    </div>
  );
}
