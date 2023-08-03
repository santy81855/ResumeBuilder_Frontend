import React from "react";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-list">
                <a
                    href="https://myairesumes.com/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Privacy Policy
                </a>
                |
                <a
                    href="https://myairesumes.com/cookie-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Cookie Policy
                </a>
                |
                <a
                    href="https://myairesumes.com/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Terms & Conditions
                </a>
            </div>
        </footer>
    );
};

export default Footer;
