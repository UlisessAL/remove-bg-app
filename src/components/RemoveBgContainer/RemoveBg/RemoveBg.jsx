import { useCloudinaryContext } from "../../../context/cloudinaryContext";
import "../../../scss/RemoveBgContainer.scss";
import loadingImg from "../../../img/loading-img.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const RemoveBg = () => {
  const { url, imageWithoutBg, count, processing } = useCloudinaryContext();
  const [disabled, setDisabled] = useState(true);
  console.log(imageWithoutBg);

  if (count != 0) {
    setDisabled(false)
  }

  console.log(count);

  return (
    <div className="results-container">
      <h2 className="title-res">Your results!</h2>
      <div className="container-img">
        <div className="before-img">
          {!url ? (
            <>
              <h2>Loading...</h2>
              <img src={loadingImg} style={{ width: "400px" }} />
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
              <img src={loadingImg} style={{ width: "400px" }} />
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
      <Link to="/remove-background" className="btn btn-info mt-10">Go backwards</Link>
    </div>
  );
};
export default RemoveBg;
