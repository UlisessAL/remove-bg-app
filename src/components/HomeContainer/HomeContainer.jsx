import "../../scss/HomeContainer.scss";
import firstExample from "../../img/example-1.png";
import { Link } from "react-router-dom";

const HomeContainer = () => {
  return (
    <main className="main-home">
      <h1 className="welcome font-mono font-bold text-3xl">
        Welcome to ByeByeBackground!
      </h1>
      <div className="recommend-bg">
        <div className="presentation">
          <img src={firstExample} alt="An example of background remove" />
          <div className="info">
            <h2>
              Ready to remove yours <strong>background photos?</strong>
            </h2>
            <p>Lets begin!</p>
          </div>
        </div>
        <div className="go-bg">
          <Link className="btn btn-wide btn-info upload-btn-info" to="/remove-background">Upload Image</Link>
        </div>
      </div>
      <div className="other-features"></div>
    </main>
  );
};
export default HomeContainer;
