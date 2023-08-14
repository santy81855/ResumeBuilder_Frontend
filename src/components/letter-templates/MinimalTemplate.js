import React, { useState, useEffect, useRef } from "react";
import "@progress/kendo-theme-default/dist/all.css";
import "../../styles/letter-templates/Minimal.css";

const MinimalTemplate = ({
    letterData,
    setletterData,
    isPreview,
    handleSectionChange,
    isExport,
}) => {
    const [divSize, setDivSize] = useState({ width: 0, height: 0 });
    const templateRef = useRef(null);

    useEffect(() => {
        const { width, height } = templateRef.current.getBoundingClientRect();
        setDivSize({ width, height });
        const template = templateRef.current;
        if (template) {
            let size = 11 * (width / 610);
            template.style.fontSize = size + "px";
        }
        // handle the text scaling
        function handleResize() {
            const { width, height } =
                templateRef.current.getBoundingClientRect();
            setDivSize({ width, height });
            const template = templateRef.current;
            if (template) {
                let size = 11 * (width / 610);
                template.style.fontSize = size + "px";
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const date = letterData.date;
    const to = letterData.to;
    const from = letterData.from;
    const content = letterData.content;
    const email = letterData.email;
    const phone = letterData.phone;
    const addressTitle = letterData.toAddressTitle;
    const addressLine1 = letterData.toAddressLine1;
    const addressLine2 = letterData.toAddressLine2;
    const addressLine3 = letterData.toAddressLine3;
    const opener = letterData.opener;
    const openerName = letterData.openerName;
    const closer = letterData.closer;
    const closerName = letterData.closerName;
    const companyName = letterData.companyName;
    const website = letterData.website;
    const position = letterData.position;
    const location = letterData.location;

    const sectionClass = isPreview
        ? "minimal-letter-section-preview"
        : "minimal-letter-section";

    const checkoverflow = () => {
        const content = document.getElementById("clean-template-content");
        // check if it is overflowing by more than like 2 pixels
        if (content.scrollHeight - content.clientHeight > 2) {
            const bigRect = content.getBoundingClientRect();

            const children = content.children;
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                const childRect = child.getBoundingClientRect();

                if (childRect.bottom > bigRect.bottom) {
                    console.log("overflow in child: ");
                    console.log(child);
                }
            }
        }
    };

    const getDate = (date) => {
        const d = new Date(date);
        const options = { year: "numeric", month: "short", day: "numeric" };
        const res = d.toLocaleDateString("en-us", options);
        return res === "Invalid Date" ? "Current" : res;
    };

    const contactSection = (
        <div
            className={sectionClass + " contact-section"}
            onClick={() => {
                handleSectionChange(0);
            }}
        >
            {letterData.templateSections.minimal.Bar && (
                <div className="horizontal-bar"></div>
            )}
            <p className="name">{from}</p>
            {letterData.templateSections.minimal.Position && (
                <p className="position">{position}</p>
            )}
            <div className="hor-container">
                <p>{phone}</p>|<p>{email}</p>|<p>{website}</p>
                {letterData.templateSections.minimal.Location && (
                    <p>{"| " + location}</p>
                )}
            </div>
        </div>
    );

    const headerSection = (
        <div
            className={sectionClass + " header-section"}
            onClick={() => {
                handleSectionChange(1);
            }}
        >
            <p>{date}</p>
            {letterData.templateSections.minimal.Address && (
                <div className="header-address">
                    <p>{companyName}</p>
                    <div>{addressTitle}</div>
                    <div>{addressLine1}</div>
                    {letterData.templateSections.minimal.Address2 && (
                        <div>{addressLine2}</div>
                    )}
                    <div>{addressLine3}</div>
                </div>
            )}
        </div>
    );

    const openerSection = (
        <div
            className={sectionClass + " opener-section"}
            onClick={() => {
                handleSectionChange(2);
            }}
        >
            {opener + " " + openerName + ","}
        </div>
    );

    const contentSection = (
        <div
            className={sectionClass + " content-section"}
            onClick={() => {
                handleSectionChange(3);
            }}
        >
            <p>{content}</p>
        </div>
    );

    const closerSection = (
        <div
            className={sectionClass + " closer-section"}
            onClick={() => {
                handleSectionChange(4);
            }}
        >
            {closer + ","}
            <div>{closerName}</div>
        </div>
    );

    return (
        <div
            className="minimal-template-container"
            id="minimal-template-container"
        >
            <div
                className="minimal-template"
                ref={templateRef}
                id={isExport ? "template-to-print" : "minimal-template"}
            >
                <div
                    className="minimal-template-content"
                    id="minimal-template-content"
                >
                    {contactSection}
                    {headerSection}
                    {openerSection}
                    {contentSection}
                    {closerSection}
                </div>
            </div>
        </div>
    );
};

export default MinimalTemplate;
