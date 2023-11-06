import { Link } from "react-router-dom";
import { ArrowBackIcon } from "../../components/Icons";

import * as Page from ".."

const Routes = (props) => {
    const { page } = props;
    if (page === "dashboard")
        return <Page.DashboardPage />
    else if (page === "investment")
        return <Page.InvestmentPage />
    else
        return (
            <div id="page">
                <Link to="/">
                    <button className="btn">
                        <ArrowBackIcon /> Back to Home
                    </button>
                </Link>
                {page}
            </div>
        );
};

export default Routes;