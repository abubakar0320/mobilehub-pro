"use client";

import { useState } from "react";
import { Save, User, Shield, BellRing, MonitorSmartphone } from "lucide-react";
import Image from "next/image";

const CARD_STYLE = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
};

const INPUT_STYLE = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "white",
};

export function SettingsForm() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: MonitorSmartphone },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: BellRing },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      
      {/* Sidebar Tabs */}
      <div className="w-full md:w-[240px] flex-shrink-0 flex flex-col gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-[12px] text-[13px] font-[700] transition-all"
              style={{
                background: isActive ? "rgba(124,58,237,0.12)" : "transparent",
                color: isActive ? "#a78bfa" : "rgba(255,255,255,0.55)",
                border: `1px solid ${isActive ? "rgba(124,58,237,0.2)" : "transparent"}`,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLElement).style.color = "white";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
                }
              }}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full rounded-[20px] overflow-hidden" style={CARD_STYLE}>
        
        {activeTab === 'general' && (
          <div className="p-8">
            <h2 className="text-[20px] font-[800] text-white mb-8">General Settings</h2>
            
            <div className="flex flex-col gap-6 max-w-[600px]">
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-[700] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Site Name</label>
                <input type="text" defaultValue="MobileHub Pro" className="w-full rounded-[10px] px-4 py-2.5 text-[14px] outline-none transition-all focus:border-[#7c3aed]" style={INPUT_STYLE} />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-[700] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Support Email</label>
                <input type="email" defaultValue="support@mobilehub.pro" className="w-full rounded-[10px] px-4 py-2.5 text-[14px] outline-none transition-all focus:border-[#7c3aed]" style={INPUT_STYLE} />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-[700] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Maintenance Mode</label>
                <div className="flex items-center justify-between rounded-[12px] p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div>
                    <span className="block text-[14px] font-[700] text-white mb-1">Disable Website</span>
                    <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.4)" }}>Show a &quot;We&apos;ll be right back&quot; page to all visitors.</span>
                  </div>
                  {/* Dummy Toggle */}
                  <div className="w-11 h-6 rounded-full relative cursor-pointer transition-colors" style={{ background: "rgba(255,255,255,0.1)" }}>
                    <div className="absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full shadow-sm opacity-50"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-8">
            <h2 className="text-[20px] font-[800] text-white mb-8">Your Profile</h2>
            
            <div className="flex flex-col gap-8 max-w-[600px]">
              
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full overflow-hidden border-2" style={{ borderColor: "rgba(124,58,237,0.3)" }}>
                  <Image src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop" alt="Admin" width={80} height={80} className="object-cover w-full h-full" />
                </div>
                <div>
                  <button className="text-[12px] font-[800] px-4 py-2 rounded-[8px] transition-all mb-2" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
                    Change Avatar
                  </button>
                  <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-[700] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>First Name</label>
                    <input type="text" defaultValue="Admin" className="w-full rounded-[10px] px-4 py-2.5 text-[14px] outline-none transition-all focus:border-[#7c3aed]" style={INPUT_STYLE} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-[700] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Last Name</label>
                    <input type="text" defaultValue="User" className="w-full rounded-[10px] px-4 py-2.5 text-[14px] outline-none transition-all focus:border-[#7c3aed]" style={INPUT_STYLE} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-[700] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Email Address</label>
                  <input type="email" defaultValue="admin@mobilehub.pro" className="w-full rounded-[10px] px-4 py-2.5 text-[14px] outline-none transition-all focus:border-[#7c3aed]" style={INPUT_STYLE} />
                </div>
              </div>

            </div>
          </div>
        )}

        {(activeTab === 'security' || activeTab === 'notifications') && (
          <div className="p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
            <div className="h-16 w-16 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {activeTab === 'security' ? <Shield className="h-8 w-8" style={{ color: "rgba(255,255,255,0.2)" }} /> : <BellRing className="h-8 w-8" style={{ color: "rgba(255,255,255,0.2)" }} />}
            </div>
            <h3 className="text-[18px] font-[800] text-white mb-2">Work in Progress</h3>
            <p className="text-[13px] max-w-[300px]" style={{ color: "rgba(255,255,255,0.4)" }}>This settings module will be available in the next platform update.</p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-5 flex justify-end" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.1)" }}>
          <button 
            id="save-settings-btn"
            onClick={() => {
              const btn = document.getElementById('save-settings-btn');
              if(btn) {
                const originalText = btn.innerText;
                btn.innerText = "Saving...";
                setTimeout(() => {
                  btn.innerText = "Saved!";
                  setTimeout(() => { btn.innerText = originalText; alert("Settings saved successfully."); }, 1000);
                }, 1000);
              }
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-[10px] text-[13px] font-[800] text-white transition-all" 
            style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", boxShadow: "0 4px 16px rgba(124,58,237,0.35)" }}
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
