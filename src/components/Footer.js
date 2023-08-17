import React from "react";
import "../styles/Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { i18n, t } = useTranslation();
    return (
        <footer className="footer">
            <div className="footer-list">
                <a
                    href="https://myairesumes.com/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t("footer.privacy")}
                </a>
                <a
                    href="https://myairesumes.com/cookie-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t("footer.cookie")}
                </a>
                <a
                    href="https://myairesumes.com/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t("footer.terms")}
                </a>
            </div>
        </footer>
    );
};

export default Footer;
