import MinimalTemplate from "../components/letter-templates/MinimalTemplate";

const templateToString = {
    0: "minimal",
};

const templateToInt = {
    minimal: 0,
};

const templateNameToExport = {
    0: "minimal-template",
    minimal: "minimal-template",
};

const getTemplateComponent = (data) => {
    switch (data.template) {
        case "minimal":
            return (
                <MinimalTemplate
                    letterData={data.json}
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
