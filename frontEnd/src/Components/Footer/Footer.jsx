import React from 'react';
import { Globe, Lock, Cpu, Activity } from 'lucide-react';
import './Footer.css';
export default function Footer() {
  return (
    <footer className="Footer">
      

      <div className="Footer-left">
        <div className="Footer-item">
          <Globe size={12} className="Footer-icon" />
          <span>Region: GL_EAST_NODE</span>
        </div>
        <div className="Footer-item">
          <Lock size={12} className="Footer-icon" />
          <span>Encryption: Active</span>
        </div>
        <div className="Footer-item">
          <Cpu size={12} className="Footer-icon cyan" />
          <span>CPU Load: Nominal</span>
        </div>
      </div>

      {/* Right Side: Activity / Session */}
      <div className="Footer-right">
        <div className="Footer-item">
          <Activity size={12} className="Footer-icon pulse" />
          <span>Root // 0xAF4..2E1</span>
        </div>
        <span className="Footer-session">Session Active</span>
      </div>
    </footer>
  );
}
