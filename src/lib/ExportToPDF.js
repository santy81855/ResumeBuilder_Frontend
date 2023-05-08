import { savePDF } from "@progress/kendo-react-pdf";

const exportPDF = (data) => {
    const content = document.getElementById("template-to-print");
    savePDF(content, {
        paperSize: "Letter",
        margin: 0,
        fileName: "resume.pdf",
        landscape: false,
        pdf: {
            multiPage: false,
            font: "Arial",
        },
    });
};

const exportPDF = () => {
    const content = document.getElementById(
        templateNameToExport[currentTemplate]
    );
    console.log(templateNameToExport[currentTemplate]);
    savePDF(content, {
        // paperSize: "auto",
        paperSize: "Letter",
        margin: 0,
        fileName: titleRef.current.value,
        landscape: false,
        pdf: {
            multiPage: false,
            font: "Arial",
        },
    });
};
