import React from 'react';
import { Activity, Cpu, Globe, Lock } from 'lucide-react';
import './NetworkCircle.css';

export default function NetworkCircle() {
  return (
    <div className="hstora-network-circle">
      
      <h2 className="hstora-network-title">Network Status</h2>

      <div className="hstora-network-item">
        <Globe size={16} className="hstora-network-icon" />
        <span>Region: GL_EAST_NODE</span>
      </div>

      <div className="hstora-network-item">
        <Lock size={16} className="hstora-network-icon" />
        <span>Encryption: Active</span>
      </div>

      <div className="hstora-network-item">
        <Cpu size={16} className="hstora-network-icon cyan" />
        <span>CPU Load: Nominal</span>
      </div>

      <div className="hstora-network-item">
        <Activity size={16} className="hstora-network-icon pulse" />
        <span>Active Connections: 12</span>
      </div>

    </div>
  );
}
