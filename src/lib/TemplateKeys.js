import CleanTemplate from "../components/templates/CleanTemplate";
import ModernTemplate from "../components/templates/ModernTemplate";

const templateToString = {
    0: "clean",
    1: "modern",
};

const templateToInt = {
    clean: 0,
    modern: 1,
};

const templateNameToExport = {
    0: "clean-template",
    clean: "clean-template",
    1: "modern-template",
    modern: "modern-template",
};

const getTemplateComponent = (data) => {
    switch (data.template) {
        case "clean":
            return (
                <CleanTemplate
                    resumeData={data.json}
                    isPreview={data.isPreview}
                    handleSectionChange={data.handleSectionChange}
                    isExport={data.isExport}
                />
            );
        case "modern":
            return (
                <ModernTemplate
                    resumeData={data.json}
                    isPreview={data.isPreview}
                    handleSectionChange={data.handleSectionChange}
                    isExport={data.isExport}
                />
            );

        default:
            return null;
    }
};

export {
    templateToString,
    getTemplateComponent,
    templateNameToExport,
    templateToInt,
};
