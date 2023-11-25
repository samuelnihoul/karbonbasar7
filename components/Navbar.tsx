'use client'
import React, { useState, useEffect } from 'react';
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

const Navbar = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 600);

    const updateMedia = () => {
        setIsDesktop(window.innerWidth > 600);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return (
        <>
            {isDesktop ? <NavbarDesktop /> : <NavbarMobile />}
        </>
    );
}

export default Navbar;
