import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

// =====================================================
// SUPABASE CONFIGURATION
// Replace with your Supabase project credentials
// =====================================================
const SUPABASE_URL = 'https://lzgevkzjuxwpnafudxwe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6Z2V2a3pqdXh3cG5hZnVkeHdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNzY3NjAsImV4cCI6MjA4Mjk1Mjc2MH0.e4quPaPpu-Z-xBBYvcI0ZPDfCA5HjkzZZSpUkz8ei3A';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =====================================================
// CONSTANTS
// =====================================================
const PAYMENT_METHODS = ['Cash', 'Zelle', 'CashApp', 'Venmo', 'Bank Transfer', 'Check', 'Other'];
const LOCAL_STORAGE_KEY = 'nikom_ni_mankon_offline_v1';

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

const TATechLogo = () => (
  <div className="flex items-center gap-1 text-xs">
    <span className="font-bold text-emerald-200">TA</span>
    <span className="text-emerald-300">TECHSOLUTIONS</span>
  </div>
);

// =====================================================
// MAIN APP COMPONENT
// =====================================================
export default function NikomNiMankon() {
  // Connection & Loading State
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState('synced'); // synced, syncing, offline, error
  const [lastSynced, setLastSynced] = useState(null);

  // Auth & Admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [rememberLogin, setRememberLogin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminPassword, setAdminPassword] = useState('nikom2026');
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [appSettingsId, setAppSettingsId] = useState(null);

  // Core Data State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMeeting, setSelectedMeeting] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [lateFeeRecords, setLateFeeRecords] = useState([]);
  const [beneficiaryOverrides, setBeneficiaryOverrides] = useState([]);
  const [meetingAgendas, setMeetingAgendas] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [activityLog, setActivityLog] = useState([]);

  // Settings
  const [visibility, setVisibility] = useState({ njangi: false, savings: false, hostFee: false });
  const [whatsAppOptions, setWhatsAppOptions] = useState({ includeNjangi: true, includeSavings: false, includeHostFee: true, includeNotes: true });

  // UI State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [showEditMemberModal, setShowEditMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [showBeneficiaryModal, setShowBeneficiaryModal] = useState(false);
  const [editingBeneficiary, setEditingBeneficiary] = useState({ meetingId: null, groupId: null });
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [editingNotes, setEditingNotes] = useState({ meetingId: null, note: '' });
  const [showReportModal, setShowReportModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showWhatsAppOptionsModal, setShowWhatsAppOptionsModal] = useState(false);
  const [pendingWhatsAppType, setPendingWhatsAppType] = useState(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberGroup, setNewMemberGroup] = useState(null);
  const [showMemberDetailsModal, setShowMemberDetailsModal] = useState(false);
  const [selectedMemberDetails, setSelectedMemberDetails] = useState(null);
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);
  const [paymentDetailsInfo, setPaymentDetailsInfo] = useState({});
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showAddMeetingModal, setShowAddMeetingModal] = useState(false);
  const [newMeeting, setNewMeeting] = useState({ date: '', host: '', city: '' });
  const [showEditMeetingModal, setShowEditMeetingModal] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [showAgendaModal, setShowAgendaModal] = useState(false);
  const [showRemindersModal, setShowRemindersModal] = useState(false);
  const [showLateFeeModal, setShowLateFeeModal] = useState(false);
  const [lateFeeInfo, setLateFeeInfo] = useState({});
  const [showChartsModal, setShowChartsModal] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const reportRef = useRef(null);

  // =====================================================
  // COMPUTED VALUES
  // =====================================================
  const groupedMembers = useMemo(() => {
    const grouped = {};
    groups.forEach(g => { grouped[g.id] = []; });
    members.filter(m => !m.is_archived).forEach(m => {
      if (grouped[m.group_id]) grouped[m.group_id].push(m);
    });
    // Sort by sort_order
    Object.keys(grouped).forEach(gId => {
      grouped[gId].sort((a, b) => a.sort_order - b.sort_order);
    });
    return grouped;
  }, [groups, members]);

  const totalMembers = useMemo(() => members.filter(m => !m.is_archived).length, [members]);

  const currentMeeting = meetings[selectedMeeting];
  const currentGroup = groups[selectedGroup];

  // =====================================================
  // ONLINE/OFFLINE DETECTION
  // =====================================================
  useEffect(() => {
    const handleOnline = () => { setIsOnline(true); syncData(); };
    const handleOffline = () => { setIsOnline(false); setSyncStatus('offline'); };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // =====================================================
  // PWA INSTALL PROMPT
  // =====================================================
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallPrompt(false);
    }
    setDeferredPrompt(null);
  };

  // =====================================================
  // INITIAL DATA LOAD
  // =====================================================
  useEffect(() => {
    loadData();
    setupRealtimeSubscriptions();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setSyncStatus('syncing');

    try {
      // Load all data in parallel
      const [
        { data: settingsData },
        { data: groupsData },
        { data: membersData },
        { data: meetingsData },
        { data: paymentsData },
        { data: attendanceData },
        { data: lateFeesData },
        { data: overridesData },
        { data: agendasData },
        { data: remindersData },
        { data: logData }
      ] = await Promise.all([
        supabase.from('app_settings').select('*').limit(1).single(),
        supabase.from('groups').select('*').order('sort_order'),
        supabase.from('members').select('*').order('sort_order'),
        supabase.from('meetings').select('*').order('meeting_number'),
        supabase.from('payments').select('*'),
        supabase.from('attendance').select('*'),
        supabase.from('late_fees').select('*'),
        supabase.from('beneficiary_overrides').select('*'),
        supabase.from('meeting_agendas').select('*').order('sort_order'),
        supabase.from('reminders').select('*').order('reminder_date'),
        supabase.from('activity_log').select('*').order('created_at', { ascending: false }).limit(500)
      ]);

      if (settingsData) {
        setAppSettingsId(settingsData.id);
        setAdminPassword(settingsData.admin_password_hash);
        if (settingsData.visibility) setVisibility(settingsData.visibility);
        if (settingsData.whatsapp_options) setWhatsAppOptions(settingsData.whatsapp_options);
      }

      if (groupsData) setGroups(groupsData);
      if (membersData) setMembers(membersData);
      if (meetingsData) setMeetings(meetingsData);
      if (paymentsData) setPayments(paymentsData);
      if (attendanceData) setAttendanceRecords(attendanceData);
      if (lateFeesData) setLateFeeRecords(lateFeesData);
      if (overridesData) setBeneficiaryOverrides(overridesData);
      if (agendasData) setMeetingAgendas(agendasData);
      if (remindersData) setReminders(remindersData);
      if (logData) setActivityLog(logData);

      // Check for remembered login
      const remembered = localStorage.getItem('nikom_remember_login');
      if (remembered === 'true') {
        setIsAdmin(true);
        setRememberLogin(true);
      }

      setSyncStatus('synced');
      setLastSynced(new Date());
    } catch (error) {
      console.error('Error loading data:', error);
      setSyncStatus('error');
      // Try to load from local storage as fallback
      loadFromLocalStorage();
    }

    setIsLoading(false);
  };

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.groups) setGroups(data.groups);
        if (data.members) setMembers(data.members);
        if (data.meetings) setMeetings(data.meetings);
        if (data.payments) setPayments(data.payments);
      } catch (e) {
        console.error('Error loading local data:', e);
      }
    }
  };

  const saveToLocalStorage = () => {
    const data = { groups, members, meetings, payments, lastSaved: new Date().toISOString() };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  const syncData = async () => {
    if (!isOnline) return;
    setSyncStatus('syncing');
    await loadData();
  };

  // =====================================================
  // REALTIME SUBSCRIPTIONS
  // =====================================================
  const setupRealtimeSubscriptions = () => {
    const paymentsChannel = supabase
      .channel('payments-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'payments' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setPayments(prev => [...prev, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setPayments(prev => prev.map(p => p.id === payload.new.id ? payload.new : p));
        } else if (payload.eventType === 'DELETE') {
          setPayments(prev => prev.filter(p => p.id !== payload.old.id));
        }
      })
      .subscribe();

    const attendanceChannel = supabase
      .channel('attendance-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'attendance' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setAttendanceRecords(prev => [...prev, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setAttendanceRecords(prev => prev.map(a => a.id === payload.new.id ? payload.new : a));
        }
      })
      .subscribe();

    const membersChannel = supabase
      .channel('members-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'members' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setMembers(prev => [...prev, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setMembers(prev => prev.map(m => m.id === payload.new.id ? payload.new : m));
        } else if (payload.eventType === 'DELETE') {
          setMembers(prev => prev.filter(m => m.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(paymentsChannel);
      supabase.removeChannel(attendanceChannel);
      supabase.removeChannel(membersChannel);
    };
  };

  // =====================================================
  // AUTH FUNCTIONS
  // =====================================================
  const handleLogin = () => {
    if (passwordInput === adminPassword) {
      setIsAdmin(true);
      setShowLoginModal(false);
      setPasswordInput('');
      setLoginError('');
      if (rememberLogin) {
        localStorage.setItem('nikom_remember_login', 'true');
      }
      logActivity('auth', 'Admin logged in');
    } else {
      setLoginError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setRememberLogin(false);
    localStorage.removeItem('nikom_remember_login');
    logActivity('auth', 'Admin logged out');
  };

  const handleChangePassword = async () => {
    if (passwordInput !== adminPassword) {
      setLoginError('Current password is incorrect');
      return;
    }
    if (newPassword.length < 4) {
      setLoginError('New password must be at least 4 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setLoginError('New passwords do not match');
      return;
    }

    try {
      const { error } = await supabase
        .from('app_settings')
        .update({ admin_password_hash: newPassword, updated_at: new Date().toISOString() })
        .eq('id', appSettingsId);

      if (error) throw error;

      setAdminPassword(newPassword);
      setShowChangePasswordModal(false);
      setPasswordInput('');
      setNewPassword('');
      setConfirmPassword('');
      setLoginError('');
      logActivity('system', 'Admin password changed');
      triggerConfetti();
    } catch (error) {
      console.error('Error changing password:', error);
      setLoginError('Failed to save password. Please try again.');
    }
  };

  // =====================================================
  // ACTIVITY LOGGING
  // =====================================================
  const logActivity = async (actionType, action, memberName = '') => {
    const entry = {
      action_type: actionType,
      action: action,
      member_name: memberName,
      performed_by: 'Admin'
    };

    try {
      const { data, error } = await supabase.from('activity_log').insert([entry]).select();
      if (!error && data) {
        setActivityLog(prev => [data[0], ...prev].slice(0, 500));
      }
    } catch (e) {
      console.error('Error logging activity:', e);
    }
  };

  // =====================================================
  // PAYMENT FUNCTIONS
  // =====================================================
  const getPayment = (meetingId, memberId, type) => {
    return payments.find(p => p.meeting_id === meetingId && p.member_id === memberId && p.payment_type === type);
  };

  const togglePayment = async (meetingId, memberId, type, amount) => {
    if (!isAdmin) return;

    const existing = getPayment(meetingId, memberId, type);
    const member = members.find(m => m.id === memberId);

    try {
      if (existing) {
        const { error } = await supabase
          .from('payments')
          .update({ is_paid: !existing.is_paid, paid_at: !existing.is_paid ? new Date().toISOString() : null })
          .eq('id', existing.id);

        if (error) throw error;
        setPayments(prev => prev.map(p => p.id === existing.id ? { ...p, is_paid: !p.is_paid } : p));
        logActivity(type, existing.is_paid ? 'Marked UNPAID' : 'Marked PAID', member?.name);
      } else {
        const newPayment = {
          meeting_id: meetingId,
          member_id: memberId,
          payment_type: type,
          amount: amount,
          is_paid: true,
          paid_at: new Date().toISOString()
        };
        const { data, error } = await supabase.from('payments').insert([newPayment]).select();
        if (error) throw error;
        setPayments(prev => [...prev, data[0]]);
        logActivity(type, 'Marked PAID', member?.name);

        setPaymentDetailsInfo({ paymentId: data[0].id, type, memberId });
        setShowPaymentDetailsModal(true);
      }
      triggerConfetti();
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  const updatePaymentDetails = async (paymentId, method, receipt) => {
    try {
      const { error } = await supabase
        .from('payments')
        .update({ payment_method: method, receipt_number: receipt })
        .eq('id', paymentId);

      if (error) throw error;
      setPayments(prev => prev.map(p => p.id === paymentId ? { ...p, payment_method: method, receipt_number: receipt } : p));
    } catch (error) {
      console.error('Error updating payment details:', error);
    }
    setShowPaymentDetailsModal(false);
  };

  // =====================================================
  // ATTENDANCE FUNCTIONS
  // =====================================================
  const getAttendance = (meetingId, memberId) => {
    return attendanceRecords.find(a => a.meeting_id === meetingId && a.member_id === memberId);
  };

  const toggleAttendance = async (meetingId, memberId) => {
    if (!isAdmin) return;

    const existing = getAttendance(meetingId, memberId);
    const member = members.find(m => m.id === memberId);

    try {
      if (existing) {
        const { error } = await supabase
          .from('attendance')
          .update({ is_present: !existing.is_present })
          .eq('id', existing.id);

        if (error) throw error;
        setAttendanceRecords(prev => prev.map(a => a.id === existing.id ? { ...a, is_present: !a.is_present } : a));
      } else {
        const newAttendance = { meeting_id: meetingId, member_id: memberId, is_present: true };
        const { data, error } = await supabase.from('attendance').insert([newAttendance]).select();
        if (error) throw error;
        setAttendanceRecords(prev => [...prev, data[0]]);
      }
      logActivity('attendance', existing?.is_present ? 'Marked ABSENT' : 'Marked PRESENT', member?.name);
      triggerConfetti();
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  // =====================================================
  // BENEFICIARY FUNCTIONS
  // =====================================================
  const getBeneficiary = (groupId, meetingId) => {
    const override = beneficiaryOverrides.find(o => o.group_id === groupId && o.meeting_id === meetingId);
    const groupMembers = groupedMembers[groupId] || [];
    const meetingIdx = meetings.findIndex(m => m.id === meetingId);

    if (override) {
      const member = members.find(m => m.id === override.member_id);
      return { member, isOverride: true };
    }

    const beneficiaryIdx = meetingIdx % groupMembers.length;
    return { member: groupMembers[beneficiaryIdx], isOverride: false };
  };

  const setBeneficiaryOverride = async (meetingId, groupId, memberId) => {
    if (!isAdmin) return;

    const existing = beneficiaryOverrides.find(o => o.group_id === groupId && o.meeting_id === meetingId);
    const member = members.find(m => m.id === memberId);

    try {
      if (existing) {
        const { error } = await supabase
          .from('beneficiary_overrides')
          .update({ member_id: memberId })
          .eq('id', existing.id);

        if (error) throw error;
        setBeneficiaryOverrides(prev => prev.map(o => o.id === existing.id ? { ...o, member_id: memberId } : o));
      } else {
        const newOverride = { meeting_id: meetingId, group_id: groupId, member_id: memberId };
        const { data, error } = await supabase.from('beneficiary_overrides').insert([newOverride]).select();
        if (error) throw error;
        setBeneficiaryOverrides(prev => [...prev, data[0]]);
      }
      logActivity('beneficiary', 'Beneficiary changed', member?.name);
      setShowBeneficiaryModal(false);
      triggerConfetti();
    } catch (error) {
      console.error('Error setting beneficiary:', error);
    }
  };

  const clearBeneficiaryOverride = async (meetingId, groupId) => {
    const existing = beneficiaryOverrides.find(o => o.group_id === groupId && o.meeting_id === meetingId);
    if (!existing) return;

    try {
      const { error } = await supabase.from('beneficiary_overrides').delete().eq('id', existing.id);
      if (error) throw error;
      setBeneficiaryOverrides(prev => prev.filter(o => o.id !== existing.id));
      logActivity('beneficiary', 'Beneficiary reset to default');
      setShowBeneficiaryModal(false);
    } catch (error) {
      console.error('Error clearing beneficiary:', error);
    }
  };

  // =====================================================
  // MEMBER MANAGEMENT
  // =====================================================
  const addMember = async () => {
    if (!newMemberName.trim() || !newMemberGroup) return;

    const groupMembers = groupedMembers[newMemberGroup] || [];
    const newMember = {
      group_id: newMemberGroup,
      name: newMemberName.trim(),
      sort_order: groupMembers.length + 1
    };

    try {
      const { data, error } = await supabase.from('members').insert([newMember]).select();
      if (error) throw error;
      setMembers(prev => [...prev, data[0]]);
      logActivity('member', 'New member added', newMemberName);
      setNewMemberName('');
      setShowAddMemberModal(false);
      triggerConfetti();
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const updateMember = async (memberId, updates) => {
    try {
      const { error } = await supabase
        .from('members')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', memberId);

      if (error) throw error;
      setMembers(prev => prev.map(m => m.id === memberId ? { ...m, ...updates } : m));
      logActivity('member', 'Member updated', members.find(m => m.id === memberId)?.name);
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  const archiveMember = async (memberId) => {
    const member = members.find(m => m.id === memberId);
    try {
      const { error } = await supabase
        .from('members')
        .update({ is_archived: true, archived_at: new Date().toISOString() })
        .eq('id', memberId);

      if (error) throw error;
      setMembers(prev => prev.map(m => m.id === memberId ? { ...m, is_archived: true } : m));
      logActivity('member', 'Member archived', member?.name);
      setShowMemberDetailsModal(false);
    } catch (error) {
      console.error('Error archiving member:', error);
    }
  };

  const restoreMember = async (memberId) => {
    const member = members.find(m => m.id === memberId);
    try {
      const { error } = await supabase
        .from('members')
        .update({ is_archived: false, archived_at: null })
        .eq('id', memberId);

      if (error) throw error;
      setMembers(prev => prev.map(m => m.id === memberId ? { ...m, is_archived: false, archived_at: null } : m));
      logActivity('member', 'Member restored', member?.name);
      triggerConfetti();
    } catch (error) {
      console.error('Error restoring member:', error);
    }
  };

  // =====================================================
  // MEETING MANAGEMENT
  // =====================================================
  const addMeeting = async () => {
    if (!newMeeting.date || !newMeeting.host) return;

    const dateObj = new Date(newMeeting.date);
    const fullDate = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const meeting = {
      meeting_number: meetings.length + 1,
      date: newMeeting.date,
      full_date: fullDate,
      host: newMeeting.host,
      city: newMeeting.city || 'TBD'
    };

    try {
      const { data, error } = await supabase.from('meetings').insert([meeting]).select();
      if (error) throw error;
      setMeetings(prev => [...prev, data[0]]);
      logActivity('meeting', 'New meeting added', fullDate);
      setNewMeeting({ date: '', host: '', city: '' });
      setShowAddMeetingModal(false);
      triggerConfetti();
    } catch (error) {
      console.error('Error adding meeting:', error);
    }
  };

  const updateMeeting = async () => {
    if (!editingMeeting) return;

    const dateObj = new Date(editingMeeting.date);
    const fullDate = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    try {
      const { error } = await supabase
        .from('meetings')
        .update({
          date: editingMeeting.date,
          full_date: fullDate,
          host: editingMeeting.host,
          city: editingMeeting.city,
          notes: editingMeeting.notes
        })
        .eq('id', editingMeeting.id);

      if (error) throw error;
      setMeetings(prev => prev.map(m => m.id === editingMeeting.id ? { ...m, ...editingMeeting, full_date: fullDate } : m));
      logActivity('meeting', 'Meeting updated', fullDate);
      setShowEditMeetingModal(false);
      triggerConfetti();
    } catch (error) {
      console.error('Error updating meeting:', error);
    }
  };

  // =====================================================
  // SETTINGS FUNCTIONS
  // =====================================================
  const saveSettings = async () => {
    try {
      const { error } = await supabase
        .from('app_settings')
        .update({ visibility, whatsapp_options: whatsAppOptions, updated_at: new Date().toISOString() })
        .eq('id', appSettingsId);

      if (error) throw error;
      logActivity('system', 'Settings updated');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  useEffect(() => {
    if (appSettingsId && isAdmin) {
      saveSettings();
    }
  }, [visibility, whatsAppOptions]);

  // =====================================================
  // STATS FUNCTIONS
  // =====================================================
  const getGroupMeetingStats = (meetingId, groupId) => {
    const groupMembers = groupedMembers[groupId] || [];
    const beneficiary = getBeneficiary(groupId, meetingId);
    let paid = 0, collected = 0;

    groupMembers.forEach(member => {
      if (member.id !== beneficiary.member?.id) {
        const payment = getPayment(meetingId, member.id, 'njangi');
        if (payment?.is_paid) {
          paid++;
          collected += 1000;
        }
      }
    });

    const total = groupMembers.length - 1; // Exclude beneficiary
    return { paid, total, collected, target: total * 1000, percentage: total > 0 ? Math.round((paid / total) * 100) : 0 };
  };

  const getMeetingStats = (meetingId, type) => {
    const amount = type === 'njangi' ? 1000 : type === 'savings' ? 100 : 20;
    let paid = 0;

    members.filter(m => !m.is_archived).forEach(member => {
      const payment = getPayment(meetingId, member.id, type);
      if (payment?.is_paid) paid++;
    });

    return { paid, total: totalMembers, collected: paid * amount, target: totalMembers * amount, percentage: Math.round((paid / totalMembers) * 100) };
  };

  const getOverallStats = () => {
    let totalNjangi = 0, totalSavings = 0, totalHostFee = 0, totalLateFees = 0;

    payments.forEach(p => {
      if (p.is_paid) {
        if (p.payment_type === 'njangi') totalNjangi += p.amount;
        else if (p.payment_type === 'savings') totalSavings += p.amount;
        else if (p.payment_type === 'hostfee') totalHostFee += p.amount;
      }
    });

    lateFeeRecords.forEach(lf => {
      if (lf.is_paid) totalLateFees += lf.amount;
    });

    return { totalNjangi, totalSavings, totalHostFee, totalLateFees, total: totalNjangi + totalSavings + totalHostFee + totalLateFees };
  };

  const overallStats = getOverallStats();

  // =====================================================
  // UI HELPERS
  // =====================================================
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(whatsAppMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(whatsAppMessage)}`, '_blank');
  };

  // =====================================================
  // VISIBILITY CHECK
  // =====================================================
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

  // =====================================================
  // CONFETTI COMPONENT
  // =====================================================
  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <div key={i} className="absolute text-2xl" style={{
          left: `${Math.random() * 100}%`,
          top: `-30px`,
          animation: `fall ${2 + Math.random()}s linear forwards`,
          animationDelay: `${Math.random() * 0.5}s`
        }}>
          {['🌴', '💰', '🌿', '🎉', '✨'][Math.floor(Math.random() * 5)]}
        </div>
      ))}
      <style>{`@keyframes fall { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } }`}</style>
    </div>
  );

  // =====================================================
  // LOADING STATE
  // =====================================================
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <RaffiaPalmSVG className="w-24 h-40 mx-auto animate-pulse" />
          <h1 className="text-2xl font-bold text-emerald-700 mt-4">Nikom Ni Mankon</h1>
          <p className="text-emerald-600 mt-2">Loading...</p>
          <div className="mt-4">
            <div className="w-48 h-2 bg-emerald-200 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full animate-pulse" style={{ width: '60%' }} />
            </div>
          </div>
          <TATechLogo />
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

      {/* Install Prompt */}
      {showInstallPrompt && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-xl shadow-2xl p-4 z-50 border-2 border-emerald-500">
          <h3 className="font-bold text-gray-800">📲 Install App</h3>
          <p className="text-sm text-gray-600 mt-1">Add Nikom to your home screen for quick access!</p>
          <div className="flex gap-2 mt-3">
            <button onClick={handleInstallClick} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-medium text-sm">Install</button>
            <button onClick={() => setShowInstallPrompt(false)} className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg text-sm">Later</button>
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
                <h4 className="font-bold text-gray-700 mb-3">👁️ Tab Visibility</h4>
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
                <h4 className="font-bold text-gray-700 mb-3">📡 Sync Status</h4>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${syncStatus === 'synced' ? 'bg-green-100 text-green-700' : syncStatus === 'syncing' ? 'bg-blue-100 text-blue-700' : syncStatus === 'offline' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {syncStatus === 'synced' ? '✓ Synced' : syncStatus === 'syncing' ? '↻ Syncing...' : syncStatus === 'offline' ? '⚠ Offline' : '✗ Error'}
                  </span>
                  <button onClick={syncData} disabled={!isOnline} className="text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400">↻ Refresh</button>
                </div>
                {lastSynced && <p className="text-xs text-gray-500 mt-2">Last synced: {lastSynced.toLocaleString()}</p>}
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-3">📜 Activity Log</h4>
                <button onClick={() => { setShowSettingsModal(false); setShowHistoryModal(true); }} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">📜 View History ({activityLog.length})</button>
              </div>

              {members.filter(m => m.is_archived).length > 0 && (
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-bold text-gray-700 mb-3">🗄️ Archived Members</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {members.filter(m => m.is_archived).map(m => (
                      <div key={m.id} className="flex items-center justify-between bg-white p-2 rounded-lg">
                        <span className="text-sm">{m.name}</span>
                        <button onClick={() => restoreMember(m.id)} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200">Restore</button>
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

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[80vh] flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📜 Activity Log</h3>
            <div className="flex-1 overflow-y-auto space-y-2">
              {activityLog.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No activity yet</p>
              ) : activityLog.map((h) => (
                <div key={h.id} className="bg-gray-50 p-3 rounded-lg text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{h.action}</span>
                    <span className="text-xs text-gray-400">{new Date(h.created_at).toLocaleString()}</span>
                  </div>
                  {h.member_name && <p className="text-gray-600 text-xs">👤 {h.member_name}</p>}
                  <p className="text-gray-400 text-xs">Type: {h.action_type} • By: {h.performed_by}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setShowHistoryModal(false)} className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-all">Close</button>
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
              {/* Sync Status */}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${isOnline ? 'bg-green-400 text-green-900' : 'bg-yellow-400 text-yellow-900'}`}>
                {isOnline ? '🟢 Online' : '🟡 Offline'}
              </span>

              {isAdmin ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">🔓 Admin</span>
                  <button onClick={() => setShowSettingsModal(true)} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition-all">⚙️</button>
                  <button onClick={() => setShowRemindersModal(true)} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition-all">🔔</button>
                  <button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition-all">Logout</button>
                </div>
              ) : (
                <button onClick={() => setShowLoginModal(true)} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2">
                  🔐 Admin Login
                </button>
              )}
            </div>
          </div>
        </div>
        
        {!isAdmin && (
          <div className="bg-yellow-400 text-yellow-900 text-center py-2 text-sm font-medium">
            👀 View-Only Mode - Login as admin to make changes
          </div>
        )}
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-40 border-b-4 border-emerald-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {visibleTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap text-sm ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-emerald-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-4 text-white shadow-lg">
                <p className="text-emerald-100 text-xs">Members</p>
                <p className="text-3xl font-bold">{totalMembers}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-4 text-white shadow-lg">
                <p className="text-green-100 text-xs">Njangi</p>
                <p className="text-2xl font-bold">${(overallStats.totalNjangi/1000).toFixed(0)}k</p>
              </div>
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-4 text-white shadow-lg">
                <p className="text-teal-100 text-xs">Host Fees</p>
                <p className="text-2xl font-bold">${overallStats.totalHostFee.toLocaleString()}</p>
              </div>
              {isAdmin && (
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-4 text-white shadow-lg relative">
                  <span className="absolute top-1 right-2 text-xs bg-red-500 px-1.5 py-0.5 rounded">🔒</span>
                  <p className="text-purple-100 text-xs">Savings</p>
                  <p className="text-2xl font-bold">${overallStats.totalSavings.toLocaleString()}</p>
                </div>
              )}
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-4 text-white shadow-lg">
                <p className="text-cyan-100 text-xs">Total</p>
                <p className="text-2xl font-bold">${(overallStats.total/1000).toFixed(1)}k</p>
              </div>
            </div>

            {/* Admin Quick Actions */}
            {isAdmin && (
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="font-bold">⚙️ Admin Panel</h3>
                    <p className="text-purple-200 text-sm">Quick actions</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => setShowSettingsModal(true)} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium">⚙️ Settings</button>
                    <button onClick={() => setShowAddMemberModal(true)} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium">➕ Add Member</button>
                    <button onClick={() => setShowAddMeetingModal(true)} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium">📅 Add Meeting</button>
                    <button onClick={() => setShowChartsModal(true)} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium">📊 Charts</button>
                  </div>
                </div>
              </div>
            )}

            {/* Next Meeting Card */}
            {meetings.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-4 text-white flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-lg font-bold">🗓️ Next: {meetings[0]?.full_date}</h3>
                    <p className="text-emerald-100 text-sm">🏠 {meetings[0]?.host} • {meetings[0]?.city}</p>
                  </div>
                  <span className="bg-white text-emerald-600 text-xs font-bold px-3 py-1 rounded-full">UPCOMING</span>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-800 mb-3">💰 Beneficiaries:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {groups.map(group => {
                      const beneficiary = getBeneficiary(group.id, meetings[0]?.id);
                      const stats = getGroupMeetingStats(meetings[0]?.id, group.id);
                      return (
                        <div key={group.id} className="rounded-lg p-3 border-2 relative" style={{ borderColor: group.color, backgroundColor: group.color + '10' }}>
                          {beneficiary.isOverride && <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">!</span>}
                          <p className="text-xs font-bold" style={{ color: group.color }}>{group.name}</p>
                          <p className="font-bold text-gray-800 text-sm mt-1 truncate">{beneficiary.member?.name}</p>
                          <div className="mt-2 bg-gray-200 rounded-full h-2">
                            <div className="h-full rounded-full transition-all" style={{ width: `${stats.percentage}%`, backgroundColor: group.color }} />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{stats.percentage}%</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Payment Summary */}
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

        {/* Other tabs would go here... */}
        {activeTab === 'members' && (
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h3 className="font-bold text-gray-800">👥 All {totalMembers} Members</h3>
              <div className="flex gap-2">
                {isAdmin && (
                  <button onClick={() => setShowAddMemberModal(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm font-medium">➕ Add</button>
                )}
                <input type="text" placeholder="🔍 Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-sm w-48" />
              </div>
            </div>
            <div className="space-y-4">
              {groups.map(group => {
                const gMembers = (groupedMembers[group.id] || []).filter(m => !searchTerm || m.name.toLowerCase().includes(searchTerm.toLowerCase()));
                if (gMembers.length === 0 && searchTerm) return null;
                return (
                  <div key={group.id} className="border rounded-xl overflow-hidden">
                    <div className="p-3 flex items-center justify-between" style={{ backgroundColor: group.color, color: 'white' }}>
                      <span className="font-bold">{group.name}</span>
                      <span className="text-sm opacity-80">{groupedMembers[group.id]?.length || 0} members</span>
                    </div>
                    <div className="p-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {(searchTerm ? gMembers : groupedMembers[group.id] || []).map(member => (
                          <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer" onClick={() => { setSelectedMemberDetails(member); setShowMemberDetailsModal(true); }}>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: group.color }}>
                                {member.sort_order}
                              </div>
                              <div>
                                <span className="font-medium text-gray-800 text-sm">{member.name}</span>
                                {member.phone && <p className="text-xs text-gray-400">📞 {member.phone}</p>}
                              </div>
                            </div>
                            <span className="text-gray-400">→</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="space-y-4">
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

        {/* Placeholder for other tabs */}
        {!['dashboard', 'members', 'rules'].includes(activeTab) && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-500">Select a meeting and view payment status</p>
            <p className="text-sm text-gray-400 mt-2">Data syncs in real-time across all devices</p>
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
            <a href="tel:+15714472698" className="text-emerald-300 text-xs hover:text-white transition-colors">
              📞 (571) 447-2698
            </a>
          </div>
          <p className="text-emerald-400 text-xs mt-3">🇨🇲 × 🇺🇸</p>
        </div>
      </footer>
    </div>
  );
}
