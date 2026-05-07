'use client';

import { useState } from 'react';
import { User, Lock, Bell, LogOut, Globe, Moon, Save } from 'lucide-react';

export function UserSettingsModule() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'Administrator',
    email: 'admin@ethioagencyhub.com',
    phone: '+251-911-123456',
    title: 'System Administrator',
    department: 'Administration'
  });
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    documentUpdates: true,
    travelSchedules: true,
    weeklyReport: true,
    systemNotifications: false
  });
  const [preferences, setPreferences] = useState({
    language: 'English',
    timezone: 'Africa/Addis_Ababa',
    theme: 'light'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-ink">User Settings</h2>
        <p className="mt-2 text-slate-600">
          Manage your personal account preferences, security, and notification settings.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-4 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-brand-600 text-brand-600'
                    : 'border-transparent text-slate-600 hover:text-ink'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-ink mb-6">Profile Information</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-brand-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-brand-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-brand-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Job Title</label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-brand-600 focus:outline-none"
              />
            </div>
          </div>
          <button className="mt-6 flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-2 font-medium text-white hover:bg-brand-700">
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-ink mb-4">Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-brand-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-brand-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-brand-600 focus:outline-none"
                />
              </div>
              <button className="flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-2 font-medium text-white hover:bg-brand-700">
                <Lock className="h-4 w-4" />
                Update Password
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-ink mb-4">Active Sessions</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                <div>
                  <p className="font-medium text-ink">Current Session</p>
                  <p className="text-sm text-slate-600">Windows Chrome • 192.168.1.100</p>
                </div>
                <span className="text-xs font-semibold text-emerald-600">Active</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                <div>
                  <p className="font-medium text-ink">Mobile</p>
                  <p className="text-sm text-slate-600">iOS Safari • 192.168.1.101</p>
                </div>
                <button className="text-xs font-medium text-red-600 hover:text-red-700">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-ink mb-6">Notification Preferences</h3>
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span className="font-medium text-slate-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </label>
            ))}
          </div>
          <button className="mt-6 flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-2 font-medium text-white hover:bg-brand-700">
            <Save className="h-4 w-4" />
            Save Preferences
          </button>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-ink mb-6">System Preferences</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Language</label>
              <select
                value={preferences.language}
                onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-brand-600 focus:outline-none"
              >
                <option>English</option>
                <option>Amharic</option>
                <option>Oromo</option>
                <option>Arabic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Timezone</label>
              <select
                value={preferences.timezone}
                onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-brand-600 focus:outline-none"
              >
                <option>Africa/Addis_Ababa</option>
                <option>Asia/Riyadh</option>
                <option>Asia/Dubai</option>
                <option>Asia/Doha</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-600 mb-2">Theme</label>
              <div className="flex gap-4">
                {['light', 'dark'].map((theme) => (
                  <label key={theme} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value={theme}
                      checked={preferences.theme === theme}
                      onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                      className="h-4 w-4"
                    />
                    <span className="capitalize font-medium text-slate-700">{theme}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <button className="mt-6 flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-2 font-medium text-white hover:bg-brand-700">
            <Save className="h-4 w-4" />
            Save Preferences
          </button>
        </div>
      )}

      {/* Danger Zone */}
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
        <button className="flex items-center gap-2 rounded-lg border border-red-600 px-6 py-2 font-medium text-red-600 hover:bg-red-50">
          <LogOut className="h-4 w-4" />
          Sign Out Everywhere
        </button>
      </div>
    </div>
  );
}
