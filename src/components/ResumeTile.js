import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const ResumeTile = ({
    resumeData,
    getResumeQuery,
    deleteResumeMutation,
    openModal,
    getTemplateComponent,
    keyString,
}) => {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const handleResumeUnhover = (event, id) => {
        // get the ResumePic element
        const div = event.currentTarget;
        // get the Template component
        const child = div.children;
        // show the template component
        child[0].style.display = "flex";
        // hide the options menu
        child[1].style.display = "none";
    };

    const handleResumeHover = (event, id) => {
        // get the ResumePic element
        //const div = event.currentTarget;
        const div = document.getElementById(id);
        // get the Template component
        const child = div.children;
        // hide the template component
        child[0].style.display = "none";
        // show the options menu
        child[1].style.display = "flex";
    };

    const handleEditClick = (event, id) => {
        // add the resumeid to the local storage
        localStorage.setItem("resumeId", id);
        // go to edit resume page
        navigate("/u/edit-resume");
    };

    const handleDeleteClick = (event, id) => {
        deleteResumeMutation.mutate({
            id: id,
        });
    };

    const handleExportClick = (event, id) => {
        localStorage.setItem("resumeId", id);
        getResumeQuery.refetch();
        openModal();
    };

    const { resumeTitle, _id, lastFetched, template, json } = resumeData;
    const dateString = lastFetched;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("en-US", {
        weekday: "long",
        month: "short",
        day: "2-digit",
        year: "numeric",
    });

    // determine the correct template
    const templateToShow = getTemplateComponent({
        json: json,
        isPreview: true,
        handleSectionChange: () => {},
        template: template,
    });

    return (
        <div className="ResumeTile" key={keyString}>
            <div
                className="ResumePic"
                id={_id}
                onMouseLeave={(event) => handleResumeUnhover(event, _id)}
            >
                {templateToShow}
                <div className="ResumeOptionsMenu">
                    <button
                        className="EditResume"
                        onClick={(event) => handleEditClick(event, _id)}
                    >
                        {t("resumeTile.edit")}
                    </button>
                    <button
                        className="ExportResume"
                        onClick={(event) => handleExportClick(event, _id)}
                    >
                        {t("resumeTile.export")}
                    </button>
                    <button
                        className="DeleteResume"
                        onClick={(event) =>
                            handleDeleteClick(event, _id, keyString)
                        }
                    >
                        {t("resumeTile.delete")}
                    </button>
                </div>
            </div>
            <div className="ResumeDetails">
                <h2>{resumeTitle}</h2>
                <div className="DateButtonContainer">
                    <p>{formattedDate}</p>
                    <button
                        className="ResumeTileOptionsButton"
                        onClick={(event) => handleResumeHover(event, _id)}
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default ResumeTile;
