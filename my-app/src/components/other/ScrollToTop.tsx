/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// Imports all dependencies
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the top of web page
 *
 * @param null
 * @return null
 */
export default function ScrollToTop() {
    var { pathname } = useLocation();

    useEffect(() => {
        // "document.documentElement.scrollTo" is the magic for React Router Dom v6
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
        });
    }, [pathname]);

    return null;
}