import React from "react";
import "../styles/SantyAndAlaine.css";

function SantyAndAlaine() {
    return (
        <div className="our-container">
            <h1>Welcome to our page!</h1>
            <h3>This is the page of Santy and Alaine.</h3>
            <h3>Here is a short story: </h3>
            <div className="story-container">
                <div className="story-page">
                    <p>
                        As soon as Sarah stepped off the plane, she knew she was
                        in for an adventure. She had always dreamed of visiting
                        Japan, and now, she was finally here. Over the next two
                        weeks, Sarah immersed herself in the culture, trying new
                        foods, visiting temples, and even learning some basic
                        Japanese phrases. She made new friends, explored new
                        places, and had experiences she would never forget. As
                        she boarded her flight back home, she couldn't help but
                        feel grateful for the opportunity to explore a new part
                        of the world. And she knew that she would be back soon,
                        ready for whatever adventure came her way.
                    </p>
                    <div className="image-container">
                        <div className="image"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SantyAndAlaine;
