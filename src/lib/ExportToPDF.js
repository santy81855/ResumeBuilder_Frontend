import { savePDF } from "@progress/kendo-react-pdf";

const exportToPDF = (data) => {
    const element = document.getElementById("template-to-print");
    if (element) {
        const { width, height } = element.getBoundingClientRect();
        let size = 11 * (width / 610);
        element.style.fontSize = size + "px";
    }
    savePDF(data.content, {
        paperSize: "auto",
        //paperSize: "Letter",
        margin: 0,
        fileName: data.fileName,
        landscape: false,
        pdf: {
            multiPage: true,
        },
    });
};

export { exportToPDF };
