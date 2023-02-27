import { useCallback, useEffect, useId, useReducer } from "react";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";
import { useCloudinaryContext } from "../../context/cloudinaryContext";
import ResultContainer from "./ResultContainer/ResultContainer";
import "../../scss/EffectsContainer.scss";
import Effect from "./Effect/Effect";
import loadingImg from "../../img/loading-img.webp";
import RecommendedSection from "../RecommendedSection/RecommendedSection";
import InputEffect from "./InputEffect/InputEffect";
import {
  formReducer,
  INITIAL_STATE,
} from "../../hooks/useTransformationReducer";

const EffectsContainer = () => {
  const paramsId = useParams();
  const inputH = useId();
  const inputW = useId();
  const inputX = useId();
  const inputY = useId();
  const inputPixel = useId();
  const inputBrightness = useId();

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
    dispatch({ type: "PARAMSID", payload: { value: paramsId.effectname } });
  }, [paramsId]);

  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const onDrop = useCallback((acceptedFiles) => {
    dispatch({ type: "CHANGE_IMAGE", payload: { value: acceptedFiles[0] } });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const onClickFunction = () => {
    dispatch({ type: "TRANSFORM" });

    switch (state.paramsId) {
      case "pixelFace":
        functionName.function(state.image, state.pixelation);
        break;

      case "imageBrightness":
        functionName.function(state.image, state.brightness);
        break;
        
      default:
        functionName.function(
          state.image,
          state.width,
          state.height,
          state.coordinateX,
          state.coordinateY
        );
        break;
    }
  };

  return (
    <section className="section-ef">
      <h1>{effect.effect}</h1>

      {paramsId.effectname !== "pixelFace" &&
        paramsId.effectname !== "imageBrightness" &&
        paramsId.effectname !== "uploadImage" &&
        paramsId.effectname !== "profileImage" && (
          <div className="div-input">
            <InputEffect
              inputId={inputH}
              name={"Height"}
              setValue={handleChange}
              inputName={"height"}
              hover={state.height}
              max={effect.max}
            />
            <InputEffect
              inputId={inputW}
              name={"Width"}
              setValue={handleChange}
              inputName={"width"}
              hover={state.width}
              max={effect.max}
            />
          </div>
        )}

      {paramsId.effectname === "cropImage" && (
        <div className="div-input">
          <InputEffect
            inputId={inputX}
            name={"Coordinate X"}
            setValue={handleChange}
            inputName={"coordinateX"}
            hover={state.coordinateX}
            max={effect.max}
          />
          <InputEffect
            inputId={inputY}
            name={"Coordinate Y"}
            setValue={handleChange}
            inputName={"coordinateY"}
            hover={state.coordinateY}
            max={effect.max}
          />
        </div>
      )}

      {paramsId.effectname === "pixelFace" && (
        <InputEffect
          inputId={inputPixel}
          name={"Pixelation"}
          setValue={handleChange}
          inputName={"pixelation"}
          hover={state.pixelation}
          max={effect.max}
        />
      )}

      {paramsId.effectname === "imageBrightness" && (
        <InputEffect
          inputId={inputBrightness}
          name={"Brightess"}
          setValue={handleChange}
          inputName={"brightness"}
          hover={state.brightness}
          max={effect.max}
        />
      )}

      <Effect
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        image={state.image}
        onClickFunction={onClickFunction}
      />

      {state.loader && (
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
