'use client';

import { User, Lock, Bell } from 'lucide-react';
import Link from 'next/link';

export function UserSettingsModule() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">User Settings</h1>
        <p className="mt-2 text-slate-500">Manage your profile, security, and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/user-settings/profile" className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-md transition-all">
          <div className="rounded-lg bg-blue-100 p-3 text-blue-600 w-fit mb-4 group-hover:bg-blue-200">
            <User className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-ink">Profile</h3>
          <p className="text-sm text-slate-500 mt-2">Update your name, email, and avatar</p>
          <div className="mt-4 text-sm font-medium text-blue-600 group-hover:text-blue-700">Edit Profile →</div>
        </Link>

        <Link href="/user-settings/security" className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-md transition-all">
          <div className="rounded-lg bg-red-100 p-3 text-red-600 w-fit mb-4 group-hover:bg-red-200">
            <Lock className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-ink">Security</h3>
          <p className="text-sm text-slate-500 mt-2">Change password and manage sessions</p>
          <div className="mt-4 text-sm font-medium text-red-600 group-hover:text-red-700">Manage Security →</div>
        </Link>

        <Link href="/user-settings/notifications" className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-md transition-all">
          <div className="rounded-lg bg-green-100 p-3 text-green-600 w-fit mb-4 group-hover:bg-green-200">
            <Bell className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-ink">Notifications</h3>
          <p className="text-sm text-slate-500 mt-2">Manage email and system notifications</p>
          <div className="mt-4 text-sm font-medium text-green-600 group-hover:text-green-700">Configure Notifications →</div>
        </Link>
      </div>

      {/* Current Settings Overview */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-bold text-ink mb-4">Current Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-slate-600">Email Notifications</span>
            <span className="font-semibold text-slate-700">Enabled</span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-slate-600">Two-Factor Authentication</span>
            <span className="font-semibold text-slate-700">Enabled</span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-slate-600">Language</span>
            <span className="font-semibold text-slate-700">English</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Theme</span>
            <span className="font-semibold text-slate-700">Light</span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6">
        <h3 className="text-lg font-bold text-red-900 mb-3">Danger Zone</h3>
        <p className="text-sm text-red-800 mb-4">These actions are irreversible. Proceed with caution.</p>
        <button className="rounded-lg border border-red-300 bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-200 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}
