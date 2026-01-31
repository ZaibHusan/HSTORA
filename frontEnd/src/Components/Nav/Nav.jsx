import React, { useState } from 'react';
import { Download, Layers, HelpCircle, Activity, Info } from 'lucide-react';
import "./Nav.css";

export default function Nav({ onSelectPage }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const pages = [
    { icon: <Download className="CurveNavs-icon" />, name: "Home" },
    { icon: <Info className="CurveNavs-icon" />, name: "About" },
    { icon: <Activity className="CurveNavs-icon" />, name: "Network" },
    { icon: <HelpCircle className="CurveNavs-icon" />, name: "Help" },
  ];

  const handleClick = (index) => {
    setActiveIndex(index);
    if (onSelectPage) onSelectPage(pages[index].name);
  };

  return (
    <nav className="Navs">
      <div className="CurveNavs">
        {pages.map((page, index) => (
          <div
            key={index}
            className={`CurveNavs-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => handleClick(index)}
          >
            {page.icon}
            <span className="CurveNavs-tooltip">{page.name}</span>
          </div>
        ))}

      </div>
    </nav>
  );
}
