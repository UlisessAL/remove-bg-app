import { useCallback, useEffect, useId, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";
import { useCloudinaryContext } from "../../context/cloudinaryContext";
import ResultContainer from "./ResultContainer/ResultContainer";
import "../../scss/EffectsContainer.scss";
import Effect from "./Effect/Effect";
import loadingImg from "../../img/loading-img.png";
import RecommendedSection from "../RecommendedSection/RecommendedSection";

const EffectsContainer = () => {
  const paramsId = useParams();
  const [image, setImage] = useState("");
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [coordinateX, setCoordinateX] = useState();
  const [coordinateY, setCoordinateY] = useState();
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const inputH = useId();
  const inputW = useId();
  const inputX = useId();
  const inputY = useId();

  const {
    functionName,
    getFunctionByParams,
    imageWithoutBg,
    effect,
    getEffectByParams,
    processing,
    count,
    url,
  } = useCloudinaryContext();

  useEffect(() => {
    getFunctionByParams(paramsId.effectname);
    getEffectByParams(paramsId.effectname);
  }, [paramsId]);

  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  console.log(paramsId.effectname);
  console.log(effect.funct);

  const onClickFunction = () => {
    if (
      width === undefined ||
      height === undefined ||
      width === 0 ||
      height === 0
    ) {
      setError(true);
    } else if (paramsId.effectname == "cropImage") {
      if (coordinateX === undefined || coordinateY === undefined) {
        setError(true);
      } else {
        functionName.function(image, width, height, coordinateX, coordinateY);
        setLoader(true);
        setImage("");
        setError(false)
      }
    } else {
      functionName.function(image, width, height);
      setLoader(true);
      setImage("");
      setError(false)
    }
  };

  return (
    <section className="section-ef">
      <h1>{effect.effect}</h1>

      <div className="div-input">
        <div className="form-control">
          <label className="label">
            {error && (
              <span className="label-text text-red-600">
                This field is required
              </span>
            )}
          </label>
          <label className="input-group" htmlFor={inputH}>
            <span>Height</span>
            <input
              type="number"
              placeholder="400"
              className={error ? "border-2 border-rose-500 input input-bordered" : "input input-bordered"}
              onChange={(e) => setHeight(e.target.value)}
              id={inputH}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            {error && (
              <span className="label-text text-red-600">
                This field is required
              </span>
            )}
          </label>
          <label className="input-group" htmlFor={inputW}>
            <span> Width</span>
            <input
              type="number"
              placeholder="800"
              className={error ? "border-2 border-rose-500 input input-bordered" : "input input-bordered"}
              onChange={(e) => setWidth(e.target.value)}
              id={inputW}
            />
          </label>
        </div>

        {paramsId.effectname == "cropImage" && (
          <>
            {" "}
            <div className="form-control">
              <label className="label">
                {error && (
                  <span className="label-text text-red-600">
                    This field is required
                  </span>
                )}
              </label>
              <label className="input-group" htmlFor={inputX}>
                <span>Coordinate X</span>
                <input
                  type="number"
                  placeholder="400"
                  className={error ? "border-2 border-rose-500 input input-bordered" : "input input-bordered"}
                  onChange={(e) => setCoordinateX(e.target.value)}
                  id={inputH}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                {error && (
                  <span className="label-text text-red-600">
                    This field is required
                  </span>
                )}
              </label>
              <label className="input-group" htmlFor={inputY}>
                <span>Coordinate Y</span>
                <input
                  type="number"
                  placeholder="800"
                  className={error ? "border-2 border-rose-500 input input-bordered" : "input input-bordered"}
                  onChange={(e) => setCoordinateY(e.target.value)}
                  id={inputW}
                />
              </label>
            </div>{" "}
          </>
        )}
      </div>

      <Effect
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        image={image}
        onClickFunction={onClickFunction}
      />

      {loader && (
        <>
          <div className="result-cont">
            <ResultContainer
              processing={processing}
              loadingImg={loadingImg}
              imageWithoutBg={imageWithoutBg}
              count={count}
              url={url}
            />
          </div>
          <RecommendedSection />
        </>
      )}
    </section>
  );
};
export default EffectsContainer;
