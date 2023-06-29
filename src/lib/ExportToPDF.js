import { savePDF } from "@progress/kendo-react-pdf";

const exportToPDF = (data) => {
    savePDF(data.content, {
        // paperSize: "auto",
        paperSize: "Letter",
        margin: 0,
        fileName: data.fileName,
        landscape: false,
        pdf: {
            multiPage: false,
            font: "Arial",
        },
    });
};

export { exportToPDF };
