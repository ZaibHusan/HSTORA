import React, { useState, useEffect } from 'react';
import "./Center.css";
import AboutCircle from '../AboutCircle/AboutCircle';
import ManualCircle from '../ManualCircle/ManualCircle';
import NetworkCircle from '../NetworkCircle/NetworkCircle';
import HomeCircle from '../HomeCircle/HomeCircle';

export default function Center({ page, isLoading }) {




    return (
        <main  className={`Center ${isLoading ? 'loading' : ''}`}  >
            <div className="inner-content">
                {page === "Home" && <HomeCircle />}
                {page === "About" && <AboutCircle />}
                {page === "Network" && <NetworkCircle />}
                {page === "Help" && <ManualCircle />}
            </div>
        </main>
    );
}