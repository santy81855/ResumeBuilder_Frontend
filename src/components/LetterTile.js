import React from "react";
import { useNavigate } from "react-router-dom";

const LetterTile = ({
    letterData,
    getLetterQuery,
    deleteLetterMutation,
    openModal,
    getTemplateComponent,
    keyString,
}) => {
    const navigate = useNavigate();
    const handleLetterUnhover = (event, id) => {
        // get the ResumePic element
        const div = event.currentTarget;
        // get the Template component
        const child = div.children;
        // show the template component
        child[0].style.display = "flex";
        // hide the options menu
        child[1].style.display = "none";
    };

    const handleLetterHover = (event, id) => {
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
        // add the letterId to the local storage
        localStorage.setItem("letterId", id);
        // go to edit resume page
        navigate("/u/edit-cover-letter");
    };

    const handleDeleteClick = (event, id) => {
        deleteLetterMutation.mutate({
            id: id,
        });
    };

    const handleExportClick = (event, id) => {
        localStorage.setItem("letterId", id);
        getLetterQuery.refetch();
        openModal();
    };

    const { letterTitle, _id, lastFetched, template, json } = letterData;
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
                onMouseLeave={(event) => handleLetterUnhover(event, _id)}
            >
                {templateToShow}
                <div className="ResumeOptionsMenu">
                    <button
                        className="EditResume"
                        onClick={(event) => handleEditClick(event, _id)}
                    >
                        Edit
                    </button>
                    <button
                        className="ExportResume"
                        onClick={(event) => handleExportClick(event, _id)}
                    >
                        Export
                    </button>
                    <button
                        className="DeleteResume"
                        onClick={(event) =>
                            handleDeleteClick(event, _id, keyString)
                        }
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div className="ResumeDetails">
                <h2>{letterTitle}</h2>
                <div className="DateButtonContainer">
                    <p>{formattedDate}</p>
                    <button
                        className="ResumeTileOptionsButton"
                        onClick={(event) => handleLetterHover(event, _id)}
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default LetterTile;
