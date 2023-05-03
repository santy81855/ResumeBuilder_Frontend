import CleanTemplate from "../components/templates/CleanTemplate";
import ModernTemplate from "../components/templates/ModernTemplate";

const templateToString = {
    0: "clean",
    1: "modern",
};

const getTemplateComponent = (data) => {
    switch (data.template) {
        case "clean":
            return (
                <CleanTemplate
                    resumeData={data.json}
                    isPreview={data.isPreview}
                    handleSectionChange={data.handleSectionChange}
                />
            );
        case "modern":
            return (
                <ModernTemplate
                    resumeData={data.json}
                    isPreview={data.isPreview}
                    handleSectionChange={data.handleSectionChange}
                />
            );

        default:
            return null;
    }
};

export { templateToString, getTemplateComponent };
