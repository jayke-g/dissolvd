import React from "react";
import { Link } from "react-router-dom";
import logobd from "../../img/logobd.svg";
import SearchBar from "../SearchBar/SearchBar";


import "./Header.css";

export const Header = ({ setQuery, query }) => {

    return (
        <div className="header-wrap">
            <header className="header">
                {/* NAV BAR LOGOS */}
                <div className="logo" onClick={() => setQuery('')}>
                    {/*  LOGO FOR BROWSER VERSION */}
                    <Link to="/">
                        <img
                            className="logo--big"
                            src={logobd}
                            alt="dissolvd_logo"
                        />
                    </Link>
                </div>
                {/* NAV BAR DESKTOP */}
                <div className="desktop open">
                    <SearchBar setQuery={setQuery} query={query} />
                </div>
            </header>
        </div>
    );
};
