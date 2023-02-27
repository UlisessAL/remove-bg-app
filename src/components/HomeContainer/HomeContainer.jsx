import "../../scss/HomeContainer.scss";
import firstExample from "../../img/publicity.webp";
import { Link } from "react-router-dom";
import RecommendedSection from "../RecommendedSection/RecommendedSection";

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
              Ready to remove yours <strong>background's photos?</strong>
            </h2>
            <p>Let's begin!</p>
          </div>
        </div>
        <div className="go-bg">
          <Link className="btn btn-wide btn-info upload-btn-info" to="/effect/uploadImage">Upload Image</Link>
        </div>
      </div>
      <div className="other-features"></div>

      <RecommendedSection/>
    </main>
  );
};
export default HomeContainer;
