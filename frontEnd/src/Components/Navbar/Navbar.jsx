import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Navbar.css"
export default function Navbar() {
    const navigate = useNavigate();
    return (
        <header className="Navbar">
            <div className="Navbar-left">
                <div className="logo-symbol">
                    <div className="logo-square">
                        <div className="logo-parallelogram">
                            <div className="logo-line"></div>
                        </div>
                    </div>
                </div>
                <div className="logo-text">
                    <h1 onClick={() => navigate("/")}>HSTORA</h1>
                    <p>Professional_TikTok_Downloader</p>
                </div>
            </div>
            <div className="Navbar-right">
                <p><strong>status:</strong> ENCRYPTED</p>
                <p><strong>Engine:</strong> v2.0_CORE</p>
            </div>
        </header>
    )
}
