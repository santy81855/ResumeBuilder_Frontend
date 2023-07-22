import React from "react";

const createResumeTile = ({ createResume }) => {
    return (
        <div
            className="CreateResumeTile"
            id="CreateResumeTile"
            onClick={createResume}
        >
            <div className="EmptyResumePic">
                <div className="ResumePlusIcon"></div>
            </div>
        </div>
    );
};

export default createResumeTile;
