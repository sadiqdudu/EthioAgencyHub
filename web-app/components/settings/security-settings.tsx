'use client';

import { useState } from 'react';
import { Save, Key, Lock, Shield, Eye, EyeOff } from 'lucide-react';

export function SecuritySettings() {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordChange = async () => {
    setError('');
    
    if (passwords.new !== passwords.confirm) {
      setError('New passwords do not match');
      return;
    }
    
    if (passwords.new.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setSaving(true);
    try {
      await fetch('/api/settings/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: passwords.current, newPassword: passwords.new })
      });
      setSaved(true);
      setPasswords({ current: '', new: '', confirm: '' });
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError('Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  const InputPassword = ({ value, onChange, show, onToggle, placeholder }: any) => (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 py-2.5 pr-10"
      />
      <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-amber-100 p-2">
            <Lock className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Change Password</h3>
            <p className="text-sm text-slate-500">Update your password to keep your account secure.</p>
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Current Password</label>
            <InputPassword
              value={passwords.current}
              onChange={(e: any) => setPasswords({ ...passwords, current: e.target.value })}
              show={showPasswords.current}
              onToggle={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
              placeholder="Enter current password"
            />
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-medium">New Password</label>
            <InputPassword
              value={passwords.new}
              onChange={(e: any) => setPasswords({ ...passwords, new: e.target.value })}
              show={showPasswords.new}
              onToggle={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
              placeholder="Enter new password"
            />
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-medium">Confirm New Password</label>
            <InputPassword
              value={passwords.confirm}
              onChange={(e: any) => setPasswords({ ...passwords, confirm: e.target.value })}
              show={showPasswords.confirm}
              onToggle={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
              placeholder="Confirm new password"
            />
          </div>
          
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <button
          onClick={handlePasswordChange}
          disabled={saving || !passwords.current || !passwords.new || !passwords.confirm}
          className="mt-6 flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-2.5 font-medium text-white disabled:opacity-50"
        >
          <Key className="h-4 w-4" />
          {saving ? 'Updating...' : saved ? 'Updated!' : 'Update Password'}
        </button>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-emerald-100 p-2">
            <Shield className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Two-Factor Authentication</h3>
            <p className="text-sm text-slate-500">Add an extra layer of security to your account.</p>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="font-medium">Status: Not Enabled</p>
            <p className="text-sm text-slate-500">Enable 2FA for enhanced security</p>
          </div>
          <button className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white">
            Enable 2FA
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold">Active Sessions</h3>
        <p className="mt-1 text-sm text-slate-500">Manage your active login sessions.</p>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
            <div>
              <p className="font-medium">Current Session</p>
              <p className="text-sm text-slate-500">Chrome on Windows - Addis Ababa, ET</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">Active</span>
          </div>
        </div>
        
        <button className="mt-4 text-sm font-medium text-red-600 hover:text-red-700">
          Sign out of all other sessions
        </button>
      </section>
    </div>
  );
}