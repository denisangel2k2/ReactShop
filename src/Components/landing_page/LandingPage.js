import {Link} from "react-router-dom";

export function LandingPage() {
    return (
        <div className={"landing-page"}>
            <div className={"landing-container"}>
                <h1 className={"animate-character"}>THRIFT SHOP!</h1>
                <h1 className={"animate-character"}>THRIFT SHOP!</h1>

            </div>
            <Link to="shop" className={"landing-link"}>Go to the home page</Link>
        </div>
    );
}