import discuss from "../../../img/discusscropped.png";

import { Link } from "react-router-dom";

export const HomeIntro = () => {


    return (
        <div className="intro-wrap">
            {/* INTRO */}
            <div className="intro">
                <div className="intro__info">
                    <h1 className="intro__info--heading">
                        A better way to discuss film.
                    </h1>
                    <h2 className="intro__info--subtitle">
                        Watch. Post. Discuss.
                    </h2>
                        <Link to="/about">
                        <button type="type" className="intro__info--btn">
                            Get Started
                        </button>
                    </Link>
                    
                </div>
                <div className="intro__photo">
                    <img
                        className="intro__photo--img"
                        src={discuss}
                        alt="picture of hands"
                    />
                </div>
            </div>
        </div>
    );
};
