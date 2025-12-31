import React, { useState, useMemo, useEffect } from 'react';

// Admin password - change this to your secure password!
const ADMIN_PASSWORD = 'nikom2026';

// Groups with members
const groups = [
  { 
    name: 'Group One', 
    color: '#059669',
    gradient: 'from-emerald-500 to-green-600',
    members: [
      'Julius Ndenga', 'Vivalis Mbongdula', 'Christopher Chibayem', 'Anandome M-Angwafo III',
      'Dephine Ndonga', 'Alexis Nkwaff', 'Bih Nicole Ndenga', 'Tsi Nkwenti-Angwafo III',
      'Warah Franklin', 'Nji Kenneth', 'Kenneth Forloh', 'Nathan Fogweh'
    ]
  },
  { 
    name: 'Group Two', 
    color: '#10B981',
    gradient: 'from-green-500 to-teal-600',
    members: [
      'Noah Ahota', 'Monka M-Angwafo III', 'Theresia Ndifon', 'Teriri Solanji',
      'Fon Rudolph Acha', 'Mbila Ngum', 'Fon Rudolph Nde', 'Eric Amugcho',
      'Tsi Akongi', 'Nji Kenneth Tabi', 'Davis Achiri-Ndi', 'Agerbinma Ngum'
    ]
  },
  { 
    name: 'Group Three', 
    color: '#14B8A6',
    gradient: 'from-teal-500 to-cyan-600',
    members: [
      'Bih Nicole Ndenga II', 'BihElla M-Angwafo III', 'Kendell Nde', 'Handsy Tar',
      'Tsi Ndiffor', 'Dr. Emmanuel Nde', 'Kenneth Forloh II', 'Peter Tamsaung',
      'Stephanie Tantoh', 'Nji Kenneth Achu', 'George Fogweh', 'Shela Ndedi'
    ]
  },
  { 
    name: 'Group Four', 
    color: '#0D9488',
    gradient: 'from-cyan-500 to-blue-600',
    members: [
      'Constance Akuma', 'Noah Ahota II', 'Julius Ndenga II', 'Lean Yenla Mbah',
      'Dr. Akwar Nde', 'Handsy Tar II', 'Vicky Ngong', 'Elvis Fru Nde', 'Warah Franklin II'
    ]
  },
  { 
    name: 'Group Five', 
    color: '#065F46',
    gradient: 'from-emerald-600 to-green-700',
    members: [
      'Dr. Valentine Nde', 'George Tsunday', 'Nancy Lebanon', 'Belen Ndenga',
      'Stephano Ndenga', 'Felix Azinwi', 'Kabiena Grace', 'Davis Chikham-Tejan',
      'Anagnen Eric', 'Cyntheric Zama', 'Nkindeng Henry', 'Patience Maazi',
      'Lesly Acha', 'Shela Ndedi II', 'Solangi Jestil', 'Cynthia Fru'
    ]
  }
];

const meetings = [
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
  { title: 'Host Fee ($20)', text: 'EVERYONE gives $20 to the host.', icon: '🎊' },
  { title: 'Meeting Time', text: '3pm to 6pm prompt.', icon: '⏰' },
  { title: 'Late Payment Fine', text: '$250.00', icon: '⚠️' },
  { title: 'Lateness Fine', text: '$50.00', icon: '🚨' },
  { title: 'Confirmation', text: 'Confirm before 6pm cutoff.', icon: '✅' },
  { title: 'No Excuses', text: 'Plan ahead!', icon: '📋' }
];

// Local Storage Keys
const STORAGE_KEY = 'nikom_ni_mankon_data';

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
  // Admin state
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // App state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMeeting, setSelectedMeeting] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Payment data
  const [njangiPayments, setNjangiPayments] = useState({});
  const [hostFeePayments, setHostFeePayments] = useState({});
  const [hostInfo, setHostInfo] = useState(meetings.map(m => ({ address: '', phone: '' })));
  
  const [editingHost, setEditingHost] = useState(null);
  const [editForm, setEditForm] = useState({ address: '', phone: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const totalMembers = useMemo(() => groups.reduce((a, g) => a + g.members.length, 0), []);

  // Load data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setNjangiPayments(data.njangiPayments || {});
        setHostFeePayments(data.hostFeePayments || {});
        setHostInfo(data.hostInfo || meetings.map(() => ({ address: '', phone: '' })));
      } catch (e) {
        console.error('Error loading data:', e);
      }
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    const data = { njangiPayments, hostFeePayments, hostInfo };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [njangiPayments, hostFeePayments, hostInfo]);

  // Admin login
  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowLoginModal(false);
      setPasswordInput('');
      setLoginError('');
    } else {
      setLoginError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const getBeneficiary = (groupIdx, meetingIdx) => {
    const group = groups[groupIdx];
    const idx = meetingIdx % group.members.length;
    return { name: group.members[idx], index: idx };
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

  const getGroupMeetingStats = (meetingIdx, groupIdx) => {
    const group = groups[groupIdx];
    let njangiPaid = 0, hostFeePaid = 0;
    group.members.forEach((_, mIdx) => {
      if (njangiPayments[`${meetingIdx}-${groupIdx}-${mIdx}`]) njangiPaid++;
      if (hostFeePayments[`${meetingIdx}-${groupIdx}-${mIdx}`]) hostFeePaid++;
    });
    return {
      njangiPaid, njangiTotal: group.members.length,
      njangiCollected: njangiPaid * 1000,
      njangiTarget: group.members.length * 1000,
      njangiPercentage: Math.round((njangiPaid / group.members.length) * 100),
      hostFeePaid, hostFeeCollected: hostFeePaid * 20
    };
  };

  const getMeetingHostFeeStats = (meetingIdx) => {
    let totalPaid = 0;
    groups.forEach((group, gIdx) => {
      group.members.forEach((_, mIdx) => {
        if (hostFeePayments[`${meetingIdx}-${gIdx}-${mIdx}`]) totalPaid++;
      });
    });
    return {
      paid: totalPaid, total: totalMembers,
      collected: totalPaid * 20, target: totalMembers * 20,
      percentage: Math.round((totalPaid / totalMembers) * 100)
    };
  };

  const getOverallStats = () => {
    let totalNjangi = 0, totalHostFee = 0;
    Object.values(njangiPayments).forEach(v => { if (v) totalNjangi++; });
    Object.values(hostFeePayments).forEach(v => { if (v) totalHostFee++; });
    return {
      totalNjangiCollected: totalNjangi * 1000,
      totalHostFeeCollected: totalHostFee * 20,
      totalCollected: (totalNjangi * 1000) + (totalHostFee * 20)
    };
  };

  const overallStats = getOverallStats();
  const currentMeeting = meetings[selectedMeeting];
  const hostFeeStats = getMeetingHostFeeStats(selectedMeeting);

  const saveHostInfo = (meetingIdx) => {
    if (!isAdmin) return;
    setHostInfo(prev => prev.map((h, i) => i === meetingIdx ? editForm : h));
    setEditingHost(null);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  // Generate WhatsApp message for meeting summary
  const generateMeetingSummary = (meetingIdx) => {
    const meeting = meetings[meetingIdx];
    const hostStats = getMeetingHostFeeStats(meetingIdx);
    
    let message = `🌴 *NIKOM NI MANKON* 🌴\n`;
    message += `📅 *Meeting #${meetingIdx + 1}: ${meeting.full}*\n`;
    message += `🏠 Host: ${meeting.host} (${meeting.city})\n\n`;
    
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *GROUP NJANGI STATUS*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    groups.forEach((group, gIdx) => {
      const beneficiary = getBeneficiary(gIdx, meetingIdx);
      const stats = getGroupMeetingStats(meetingIdx, gIdx);
      const unpaid = group.members.filter((_, mIdx) => 
        mIdx !== beneficiary.index && !njangiPayments[`${meetingIdx}-${gIdx}-${mIdx}`]
      );
      
      message += `*${group.name}*\n`;
      message += `⭐ Beneficiary: ${beneficiary.name}\n`;
      message += `✅ Paid: ${stats.njangiPaid}/${stats.njangiTotal - 1}\n`;
      message += `💵 Collected: $${stats.njangiCollected.toLocaleString()} / $${stats.njangiTarget.toLocaleString()}\n`;
      
      if (unpaid.length > 0 && unpaid.length <= 5) {
        message += `⏳ Pending: ${unpaid.join(', ')}\n`;
      } else if (unpaid.length > 5) {
        message += `⏳ Pending: ${unpaid.length} members\n`;
      }
      message += `\n`;
    });
    
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🏠 *HOST FEE STATUS*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Host: ${meeting.host}\n`;
    message += `✅ Paid: ${hostStats.paid}/${hostStats.total}\n`;
    message += `💵 Collected: $${hostStats.collected.toLocaleString()} / $${hostStats.target.toLocaleString()}\n\n`;
    
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🌿 _Growing together in fertile ground!_ 🌿`;
    
    return message;
  };

  // Generate WhatsApp message for group-specific update
  const generateGroupUpdate = (meetingIdx, groupIdx) => {
    const meeting = meetings[meetingIdx];
    const group = groups[groupIdx];
    const beneficiary = getBeneficiary(groupIdx, meetingIdx);
    const stats = getGroupMeetingStats(meetingIdx, groupIdx);
    
    const paid = group.members.filter((_, mIdx) => 
      njangiPayments[`${meetingIdx}-${groupIdx}-${mIdx}`]
    );
    const unpaid = group.members.filter((_, mIdx) => 
      mIdx !== beneficiary.index && !njangiPayments[`${meetingIdx}-${groupIdx}-${mIdx}`]
    );
    
    let message = `🌴 *NIKOM NI MANKON* 🌴\n`;
    message += `📅 Meeting: ${meeting.full}\n\n`;
    message += `💰 *${group.name} UPDATE*\n\n`;
    message += `⭐ *Beneficiary: ${beneficiary.name}*\n`;
    message += `💵 Target: $${stats.njangiTarget.toLocaleString()}\n`;
    message += `✅ Collected: $${stats.njangiCollected.toLocaleString()} (${stats.njangiPercentage}%)\n\n`;
    
    if (paid.length > 0) {
      message += `✅ *PAID (${paid.length}):*\n`;
      paid.forEach(m => { message += `• ${m}\n`; });
      message += `\n`;
    }
    
    if (unpaid.length > 0) {
      message += `⏳ *PENDING (${unpaid.length}):*\n`;
      unpaid.forEach(m => { message += `• ${m}\n`; });
      message += `\n`;
    }
    
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🌿 _Let's complete our contributions!_ 🌿`;
    
    return message;
  };

  // Generate reminder message
  const generateReminder = (meetingIdx) => {
    const meeting = meetings[meetingIdx];
    
    let message = `🌴 *NIKOM NI MANKON REMINDER* 🌴\n\n`;
    message += `📅 *Next Meeting: ${meeting.full}*\n`;
    message += `🏠 Host: ${meeting.host}\n`;
    message += `📍 ${meeting.city}\n`;
    if (hostInfo[meetingIdx]?.address) {
      message += `🗺️ ${hostInfo[meetingIdx].address}\n`;
    }
    if (hostInfo[meetingIdx]?.phone) {
      message += `📞 ${hostInfo[meetingIdx].phone}\n`;
    }
    message += `⏰ Time: 3pm - 6pm\n\n`;
    
    message += `💰 *CONTRIBUTIONS:*\n`;
    message += `• $1,000 to your group's beneficiary\n`;
    message += `• $20 to host (${meeting.host})\n\n`;
    
    message += `⭐ *BENEFICIARIES:*\n`;
    groups.forEach((group, gIdx) => {
      const beneficiary = getBeneficiary(gIdx, meetingIdx);
      message += `• ${group.name}: ${beneficiary.name}\n`;
    });
    
    message += `\n🌿 _See you there! Growing together!_ 🌿`;
    
    return message;
  };

  const openWhatsAppShare = (message) => {
    setWhatsAppMessage(message);
    setShowWhatsAppModal(true);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(whatsAppMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToWhatsApp = () => {
    const encoded = encodeURIComponent(whatsAppMessage);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <div key={i} className="absolute text-2xl"
          style={{ left: `${Math.random() * 100}%`, top: `-30px`,
            animation: `fall ${2 + Math.random()}s linear forwards`,
            animationDelay: `${Math.random() * 0.5}s` }}>
          {['🌴', '💰', '🌿', '🎉', '✨'][Math.floor(Math.random() * 5)]}
        </div>
      ))}
      <style>{`@keyframes fall { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } }`}</style>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-teal-50">
      {showConfetti && <Confetti />}
      
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🔐 Admin Login</h3>
            <p className="text-gray-600 text-sm mb-4">Enter the admin password to make changes.</p>
            <input type="password" value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none mb-2" />
            {loginError && <p className="text-red-500 text-sm mb-2">{loginError}</p>}
            <div className="flex gap-2 mt-4">
              <button onClick={handleLogin}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all">
                Login
              </button>
              <button onClick={() => { setShowLoginModal(false); setPasswordInput(''); setLoginError(''); }}
                className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Share Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[80vh] flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">📱</span> Share to WhatsApp
            </h3>
            <div className="flex-1 overflow-auto mb-4">
              <pre className="bg-gray-100 p-4 rounded-xl text-sm whitespace-pre-wrap font-sans text-gray-700">
                {whatsAppMessage}
              </pre>
            </div>
            <div className="flex gap-2">
              <button onClick={copyToClipboard}
                className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2
                  ${copied ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
              <button onClick={shareToWhatsApp}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Open WhatsApp
              </button>
            </div>
            <button onClick={() => setShowWhatsAppModal(false)}
              className="mt-2 text-gray-500 hover:text-gray-700 text-sm">
              Close
            </button>
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
            
            <div className="flex items-center gap-3">
              {/* Admin Status */}
              {isAdmin ? (
                <div className="flex items-center gap-2">
                  <span className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    🔓 Admin Mode
                  </span>
                  <button onClick={handleLogout}
                    className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition-all">
                    Logout
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowLoginModal(true)}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2">
                  🔐 Admin Login
                </button>
              )}
              
              {/* WhatsApp Quick Share */}
              <button onClick={() => openWhatsAppShare(generateReminder(0))}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2">
                📱 Share
              </button>
            </div>
          </div>
        </div>
        
        {/* View-only Banner */}
        {!isAdmin && (
          <div className="bg-yellow-400 text-yellow-900 text-center py-2 text-sm font-medium">
            👀 View-Only Mode - Contact admin to update payments
          </div>
        )}
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-40 border-b-4 border-emerald-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'njangi', label: 'Group Njangi', icon: '💰' },
              { id: 'hostfee', label: 'Host Fee', icon: '🏠' },
              { id: 'schedule', label: 'Schedule', icon: '📅' },
              { id: 'whatsapp', label: 'WhatsApp', icon: '📱' },
              { id: 'rules', label: 'Rules', icon: '📜' }
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap text-sm
                  ${activeTab === tab.id ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg' : 'text-gray-600 hover:bg-emerald-50'}`}>
                <span>{tab.icon}</span>{tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-4 text-white shadow-lg">
                <p className="text-emerald-100 text-xs">Members</p>
                <p className="text-3xl font-bold">{totalMembers}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-4 text-white shadow-lg">
                <p className="text-green-100 text-xs">Njangi</p>
                <p className="text-3xl font-bold">${overallStats.totalNjangiCollected.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-4 text-white shadow-lg">
                <p className="text-teal-100 text-xs">Host Fees</p>
                <p className="text-3xl font-bold">${overallStats.totalHostFeeCollected.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-4 text-white shadow-lg">
                <p className="text-cyan-100 text-xs">Total</p>
                <p className="text-3xl font-bold">${overallStats.totalCollected.toLocaleString()}</p>
              </div>
            </div>

            {/* Next Meeting */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-4 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">🗓️ Next: {meetings[0].full}</h3>
                  <p className="text-emerald-100 text-sm">🏠 {meetings[0].host} • {meetings[0].city}</p>
                </div>
                <button onClick={() => openWhatsAppShare(generateReminder(0))}
                  className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-all">
                  📱 Share Reminder
                </button>
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
                        <p className="font-bold text-gray-800 text-sm mt-1">{beneficiary.name}</p>
                        <div className="mt-2 bg-gray-200 rounded-full h-2">
                          <div className="h-full rounded-full transition-all" style={{ width: `${stats.njangiPercentage}%`, backgroundColor: group.color }}/>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{stats.njangiPercentage}% collected</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">⚡ Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button onClick={() => openWhatsAppShare(generateMeetingSummary(0))}
                  className="bg-green-100 hover:bg-green-200 text-green-700 p-4 rounded-xl text-sm font-medium transition-all text-center">
                  📊 Share Meeting Summary
                </button>
                <button onClick={() => openWhatsAppShare(generateReminder(0))}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-4 rounded-xl text-sm font-medium transition-all text-center">
                  🔔 Share Reminder
                </button>
                <button onClick={() => setActiveTab('njangi')}
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 p-4 rounded-xl text-sm font-medium transition-all text-center">
                  💰 Track Njangi
                </button>
                <button onClick={() => setActiveTab('hostfee')}
                  className="bg-teal-100 hover:bg-teal-200 text-teal-700 p-4 rounded-xl text-sm font-medium transition-all text-center">
                  🏠 Track Host Fee
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Group Njangi Tab */}
        {activeTab === 'njangi' && (
          <div className="space-y-4">
            {/* Meeting & Group Selectors */}
            <div className="bg-white rounded-xl shadow-lg p-4 space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">📅 Meeting</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {meetings.map((m, idx) => (
                    <button key={idx} onClick={() => setSelectedMeeting(idx)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                        ${selectedMeeting === idx ? 'bg-emerald-500 text-white' : 'bg-gray-100 hover:bg-emerald-100'}`}>
                      {m.date}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">👥 Group</p>
                <div className="flex gap-2 overflow-x-auto">
                  {groups.map((g, idx) => (
                    <button key={idx} onClick={() => setSelectedGroup(idx)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                        ${selectedGroup === idx ? 'text-white' : 'bg-gray-100 hover:opacity-80'}`}
                      style={selectedGroup === idx ? { backgroundColor: g.color } : {}}>
                      {g.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Group Payment Tracking */}
            {(() => {
              const group = groups[selectedGroup];
              const beneficiary = getBeneficiary(selectedGroup, selectedMeeting);
              const stats = getGroupMeetingStats(selectedMeeting, selectedGroup);
              
              return (
                <>
                  <div className={`bg-gradient-to-r ${group.gradient} rounded-xl p-4 text-white shadow-lg`}>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div>
                        <p className="text-white/80 text-sm">{currentMeeting.full}</p>
                        <h2 className="text-xl font-bold">{group.name}</h2>
                        <div className="mt-2 bg-white/20 rounded-lg px-3 py-2 inline-block">
                          <p className="text-white/80 text-xs">⭐ BENEFICIARY</p>
                          <p className="font-bold">{beneficiary.name}</p>
                        </div>
                      </div>
                      <div className="bg-white/20 rounded-xl p-4 text-center">
                        <p className="text-3xl font-bold">${stats.njangiCollected.toLocaleString()}</p>
                        <p className="text-white/80 text-sm">of ${stats.njangiTarget.toLocaleString()}</p>
                        <div className="bg-white/30 rounded-full h-2 mt-2 w-24">
                          <div className="bg-white h-full rounded-full" style={{ width: `${stats.njangiPercentage}%` }}/>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => openWhatsAppShare(generateGroupUpdate(selectedMeeting, selectedGroup))}
                        className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm transition-all">
                        📱 Share Group Update
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">#</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Member</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold" style={{ color: group.color }}>$1,000</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.members.map((member, mIdx) => {
                            const isPaid = njangiPayments[`${selectedMeeting}-${selectedGroup}-${mIdx}`];
                            const isBeneficiary = mIdx === beneficiary.index;
                            
                            return (
                              <tr key={mIdx} className={`border-b ${isBeneficiary ? 'bg-yellow-50' : isPaid ? 'bg-emerald-50' : ''}`}>
                                <td className="px-4 py-3 text-gray-500">{mIdx + 1}</td>
                                <td className="px-4 py-3">
                                  <span className="font-medium text-gray-800">{member}</span>
                                  {isBeneficiary && (
                                    <span className="ml-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                                      ⭐ BENEFICIARY
                                    </span>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  {isBeneficiary ? (
                                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm font-bold">
                                      RECEIVES
                                    </span>
                                  ) : (
                                    <button onClick={() => toggleNjangi(selectedMeeting, selectedGroup, mIdx)}
                                      disabled={!isAdmin}
                                      className={`w-24 py-2 rounded-lg font-bold text-sm transition-all
                                        ${isPaid ? 'text-white' : 'bg-gray-100 text-gray-600'}
                                        ${isAdmin ? 'hover:opacity-80 cursor-pointer' : 'cursor-not-allowed opacity-80'}`}
                                      style={isPaid ? { backgroundColor: group.color } : {}}>
                                      {isPaid ? '✓ PAID' : '$1,000'}
                                    </button>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  {isBeneficiary ? (
                                    <span className="text-yellow-600 text-sm font-bold">⭐</span>
                                  ) : isPaid ? (
                                    <span className="text-emerald-600 text-sm font-bold">✓</span>
                                  ) : (
                                    <span className="text-red-500 text-sm font-bold">⏳</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Host Fee Tab */}
        {activeTab === 'hostfee' && (
          <div className="space-y-4">
            {/* Meeting Selector */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <p className="text-sm font-medium text-gray-600 mb-2">📅 Meeting</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {meetings.map((m, idx) => (
                  <button key={idx} onClick={() => setSelectedMeeting(idx)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                      ${selectedMeeting === idx ? 'bg-teal-500 text-white' : 'bg-gray-100 hover:bg-teal-100'}`}>
                    {m.date}
                  </button>
                ))}
              </div>
            </div>

            {/* Host Info */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl p-4 text-white shadow-lg">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <p className="text-teal-100 text-sm">{currentMeeting.full}</p>
                  <h2 className="text-xl font-bold">🏠 Host: {currentMeeting.host}</h2>
                  <p className="text-teal-100">{currentMeeting.city}</p>
                </div>
                <div className="bg-white/20 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold">${hostFeeStats.collected.toLocaleString()}</p>
                  <p className="text-teal-100 text-sm">of ${hostFeeStats.target.toLocaleString()}</p>
                  <p className="text-xs text-teal-200 mt-1">{hostFeeStats.paid}/{hostFeeStats.total} paid</p>
                </div>
              </div>
            </div>

            {/* All Members Host Fee */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">All {totalMembers} Members → $20 to Host</h3>
              </div>
              
              <input type="text" placeholder="🔍 Search..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none mb-4 text-sm" />

              <div className="space-y-3">
                {groups.map((group, gIdx) => {
                  const filteredMembers = group.members.filter(m => 
                    !searchTerm || m.toLowerCase().includes(searchTerm.toLowerCase())
                  );
                  if (filteredMembers.length === 0) return null;
                  
                  const paidCount = group.members.filter((_, mIdx) => 
                    hostFeePayments[`${selectedMeeting}-${gIdx}-${mIdx}`]
                  ).length;
                  
                  return (
                    <div key={gIdx} className="border rounded-lg overflow-hidden">
                      <div className="p-2 flex items-center justify-between" style={{ backgroundColor: group.color + '15' }}>
                        <span className="font-bold text-sm" style={{ color: group.color }}>{group.name}</span>
                        <span className="text-xs" style={{ color: group.color }}>{paidCount}/{group.members.length}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
                        {filteredMembers.map((member) => {
                          const actualIdx = group.members.indexOf(member);
                          const isPaid = hostFeePayments[`${selectedMeeting}-${gIdx}-${actualIdx}`];
                          return (
                            <div key={member} className={`flex items-center justify-between p-2 rounded-lg text-sm
                              ${isPaid ? 'bg-teal-50' : 'bg-gray-50'}`}>
                              <span className="font-medium text-gray-800 truncate">{member}</span>
                              <button onClick={() => toggleHostFee(selectedMeeting, gIdx, actualIdx)}
                                disabled={!isAdmin}
                                className={`px-3 py-1 rounded text-xs font-bold transition-all
                                  ${isPaid ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'}
                                  ${isAdmin ? 'hover:opacity-80' : 'cursor-not-allowed'}`}>
                                {isPaid ? '✓' : '$20'}
                              </button>
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
              const hostStats = getMeetingHostFeeStats(idx);
              return (
                <div key={idx} className={`bg-white rounded-xl shadow-lg overflow-hidden
                  ${idx === 0 ? 'ring-2 ring-emerald-400' : ''}`}>
                  <div className={`p-3 flex items-center justify-between
                    ${idx === 0 ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white' : 'bg-gray-50'}`}>
                    <div>
                      <span className={`text-xs font-bold ${idx === 0 ? 'text-emerald-100' : 'text-gray-500'}`}>
                        Meeting #{idx + 1}
                      </span>
                      <p className={`font-bold ${idx === 0 ? 'text-white' : 'text-gray-800'}`}>{meeting.full}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm ${idx === 0 ? 'text-emerald-100' : 'text-gray-500'}`}>🏠 {meeting.host}</p>
                      {idx === 0 && <span className="bg-white text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full">NEXT</span>}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center">
                      {groups.map((group, gIdx) => {
                        const beneficiary = getBeneficiary(gIdx, idx);
                        const stats = getGroupMeetingStats(idx, gIdx);
                        return (
                          <div key={gIdx} className="p-2 rounded-lg border text-sm" style={{ borderColor: group.color + '50' }}>
                            <p className="text-xs font-bold" style={{ color: group.color }}>{group.name}</p>
                            <p className="font-medium text-gray-800 truncate">{beneficiary.name}</p>
                            <div className="bg-gray-200 rounded-full h-1.5 mt-1">
                              <div className="h-full rounded-full" style={{ width: `${stats.njangiPercentage}%`, backgroundColor: group.color }}/>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-2 pt-2 border-t text-center text-xs text-gray-500">
                      🏠 Host fee: {hostStats.paid}/{hostStats.total} paid (${hostStats.collected.toLocaleString()})
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* WhatsApp Tab */}
        {activeTab === 'whatsapp' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Integration
              </h2>
              <p className="text-green-100 mt-2">Generate and share updates with your Nikom WhatsApp group!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Meeting Summary */}
              <div className="bg-white rounded-xl shadow-lg p-5">
                <h3 className="font-bold text-gray-800 mb-3">📊 Full Meeting Summary</h3>
                <p className="text-gray-600 text-sm mb-4">Share complete status of all groups and host fee for a meeting.</p>
                <select onChange={(e) => setSelectedMeeting(parseInt(e.target.value))} value={selectedMeeting}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 mb-3">
                  {meetings.map((m, idx) => (
                    <option key={idx} value={idx}>Meeting #{idx + 1}: {m.full}</option>
                  ))}
                </select>
                <button onClick={() => openWhatsAppShare(generateMeetingSummary(selectedMeeting))}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition-all">
                  📱 Generate & Share Summary
                </button>
              </div>

              {/* Group Update */}
              <div className="bg-white rounded-xl shadow-lg p-5">
                <h3 className="font-bold text-gray-800 mb-3">💰 Group-Specific Update</h3>
                <p className="text-gray-600 text-sm mb-4">Share payment status for a specific group.</p>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <select onChange={(e) => setSelectedMeeting(parseInt(e.target.value))} value={selectedMeeting}
                    className="px-3 py-2 rounded-lg border-2 border-gray-200 text-sm">
                    {meetings.map((m, idx) => (
                      <option key={idx} value={idx}>#{idx + 1}: {m.date}</option>
                    ))}
                  </select>
                  <select onChange={(e) => setSelectedGroup(parseInt(e.target.value))} value={selectedGroup}
                    className="px-3 py-2 rounded-lg border-2 border-gray-200 text-sm">
                    {groups.map((g, idx) => (
                      <option key={idx} value={idx}>{g.name}</option>
                    ))}
                  </select>
                </div>
                <button onClick={() => openWhatsAppShare(generateGroupUpdate(selectedMeeting, selectedGroup))}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all">
                  📱 Generate & Share Group Update
                </button>
              </div>

              {/* Meeting Reminder */}
              <div className="bg-white rounded-xl shadow-lg p-5">
                <h3 className="font-bold text-gray-800 mb-3">🔔 Meeting Reminder</h3>
                <p className="text-gray-600 text-sm mb-4">Share upcoming meeting details and beneficiaries.</p>
                <select onChange={(e) => setSelectedMeeting(parseInt(e.target.value))} value={selectedMeeting}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 mb-3">
                  {meetings.map((m, idx) => (
                    <option key={idx} value={idx}>Meeting #{idx + 1}: {m.full}</option>
                  ))}
                </select>
                <button onClick={() => openWhatsAppShare(generateReminder(selectedMeeting))}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all">
                  📱 Generate & Share Reminder
                </button>
              </div>

              {/* How to Use */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-5">
                <h3 className="font-bold text-gray-800 mb-3">📖 How to Use</h3>
                <ol className="text-sm text-gray-600 space-y-2">
                  <li><span className="font-bold text-emerald-600">1.</span> Admin updates payments in the app</li>
                  <li><span className="font-bold text-emerald-600">2.</span> Generate a WhatsApp message here</li>
                  <li><span className="font-bold text-emerald-600">3.</span> Copy or share directly to WhatsApp</li>
                  <li><span className="font-bold text-emerald-600">4.</span> Paste in your Nikom WhatsApp group!</li>
                </ol>
                <div className="mt-4 p-3 bg-white rounded-lg">
                  <p className="text-xs text-gray-500">💡 <strong>Tip:</strong> Members can view this app anytime to see live payment status. Only admin can make changes.</p>
                </div>
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
                    <div>
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">#{idx + 1}</span>
                      <h3 className="font-bold text-gray-800">{rule.title}</h3>
                      <p className="text-gray-600 text-sm">{rule.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-5 text-white">
              <h3 className="font-bold text-lg mb-4">💰 Per Meeting Summary</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Group Njangi ($1,000)</h4>
                  <div className="text-sm space-y-1">
                    {groups.map((g, i) => (
                      <div key={i} className="flex justify-between">
                        <span>{g.name}:</span>
                        <span>${(g.members.length * 1000).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Host Fee ($20)</h4>
                  <p className="text-3xl font-bold">${(totalMembers * 20).toLocaleString()}</p>
                  <p className="text-sm text-white/80">{totalMembers} × $20</p>
                </div>
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
          <p className="text-emerald-400 text-xs mt-2">🇨🇲 × 🇺🇸</p>
        </div>
      </footer>
    </div>
  );
}
