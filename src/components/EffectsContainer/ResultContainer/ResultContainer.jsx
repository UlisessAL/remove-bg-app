import { Link } from "react-router-dom";
import "../../../scss/RemoveBgContainer.scss"

const ResultContainer = ({processing, loadingImg, imageWithoutBg, count, url}) => {
  return (
    <div className="results-container">
      <h2 className="title-res">Your results!</h2>
      <div className="container-img">
        <div className="before-img">
          {!url ? (
            <>
              <h2>Loading...</h2>
              <img src={loadingImg} style={{ width: "400px" }} alt="loading image" />
            </>
          ) : (
            <>
              <h2 className="h2-before">Your image before</h2>
              <img src={url} alt="Image provided for the user" style={{ width: "400px" }}/>
            </>
          )}
        </div>
        <div className="after-img">
          {!processing || !imageWithoutBg ? (
            <>
              <h2>Loading...</h2>
              <img src={loadingImg} style={{ width: "400px" }} alt="loading image" />
            </>
          ) : (
            <>
              <h2 className="h2-now">Your image now!</h2>
              <img src={`${imageWithoutBg} ${count}`} alt="Image without background" style={{ width: "400px" }}/>
              <a href={imageWithoutBg} download target="_blank"  >Download new image</a>
            </>
          )}
        </div>
      </div>
      <Link to="/" className="btn btn-info mt-10">Go backwards</Link>
    </div>
  )
}
export default ResultContainer