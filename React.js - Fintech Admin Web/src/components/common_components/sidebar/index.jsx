import React, { useState } from "react";
import * as Component from "./styled";
import Items from "./items";
/* import BrandLogo from "./BrandLogo.svg"; */

const MOBILE_VIEW = window.innerWidth < 468;

export default function Sidebar({ children }) {

    const [displaySidebar, setDisplaySidebar] = useState(!MOBILE_VIEW);

    const handleSidebarDisplay = (e) => {
        e.preventDefault();
        if (window.innerWidth > 468)
            setDisplaySidebar(!displaySidebar);
        else
            setDisplaySidebar(false);
    };

    return (
        <React.Fragment>
            <Component.SidebarContainer displaySidebar={displaySidebar}>
                <Component.SidebarWrapper>
                    <Component.SidebarLogoWrapper displaySidebar={displaySidebar}>
                        <Component.SidebarLogo href="#">
                            <span className="app-brand-logo demo">
                                {/* <img src={BrandLogo} alt="Brand logo" /> */}
                            </span>
                            <Component.SidebarBrand
                                displaySidebar={displaySidebar}
                                className="app__brand__text"
                            >LOGO</Component.SidebarBrand>
                        </Component.SidebarLogo>
                        <Component.SidebarToggler
                            displaySidebar={displaySidebar}
                            onClick={handleSidebarDisplay}
                        >
                            <div className="outer__circle">
                                {displaySidebar ? <div className="inner__circle" /> : null}
                            </div>
                        </Component.SidebarToggler>
                    </Component.SidebarLogoWrapper>
                    <Items displaySidebar={displaySidebar} />
                </Component.SidebarWrapper>
            </Component.SidebarContainer>
            <Component.Children displaySidebar={displaySidebar}>{children}</Component.Children>
        </React.Fragment>
    );
}