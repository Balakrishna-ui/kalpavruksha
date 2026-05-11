import React from 'react';
import { Settings as SettingsIcon, UserPlus, Shield, Bell, Save } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold text-slate-800">System Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Admin Account Section */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <UserPlus size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Create Admin User</h3>
              <p className="text-[11px] text-slate-400 font-medium">Add a new administrator to the system</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400">Full Name</label>
              <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-blue-500" placeholder="e.g. John Doe" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400">Email Address</label>
              <input type="email" className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-blue-500" placeholder="admin@kalpavruksha.co" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400">Role</label>
              <select className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-blue-500">
                <option>Select Role</option>
                <option>Super Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </div>
            <button className="w-full bg-[#11213F] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2 mt-2">
              <Shield size={14} />
              Create Admin
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Bell size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Notification Preferences</h3>
              <p className="text-[11px] text-slate-400 font-medium">Control how you receive system alerts</p>
            </div>
          </div>
          
          <div className="space-y-4 pt-2">
            {[
              { label: 'New Lead Alerts', desc: 'Get notified when a user submits an enquiry' },
              { label: 'Order Notifications', desc: 'Receive alerts for new product orders' },
              { label: 'System Updates', desc: 'Stay informed about platform changes' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-700">{item.label}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
                </div>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            ))}
            <button className="w-full bg-white border border-slate-200 text-slate-600 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <Save size={14} />
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
