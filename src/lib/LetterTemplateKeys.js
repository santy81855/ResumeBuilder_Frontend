import MinimalTemplate from "../components/letter-templates/MinimalTemplate";
import CharmTemplate from "../components/letter-templates/CharmTemplate";
import ImpactTemplate from "../components/letter-templates/ImpactTemplate";

const templateToString = {
    0: "minimal",
    1: "charm",
    2: "impact",
};

const templateToInt = {
    minimal: 0,
    charm: 1,
    impact: 2,
};

const templateNameToExport = {
    0: "minimal-template",
    minimal: "minimal-template",
    1: "charm-template",
    charm: "charm-template",
    2: "impact-template",
    impact: "impact-template",
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
        case "charm":
            return (
                <CharmTemplate
                    letterData={data.json}
                    isPreview={data.isPreview}
                    handleSectionChange={data.handleSectionChange}
                    isExport={data.isExport}
                />
            );
        case "impact":
            return (
                <ImpactTemplate
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
