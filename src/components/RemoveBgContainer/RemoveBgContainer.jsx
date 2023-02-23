import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import { useCloudinaryContext } from "../../context/cloudinaryContext";
import "../../scss/RemoveBgContainer.scss";
import publicity from "../../img/publicity.png"

const RemoveBgContainer = () => {
  const [image, setImage] = useState();
  const { uploadImage } = useCloudinaryContext();

  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  console.log(image);

  return (
    <main className="main-bg">
      <h1>Upload your image to remove its background</h1>
      <div className="img-publi">
        <img src={publicity} alt="publicity image" />
      </div>
      <h2>Let's start!</h2>
      <section className="section-bg">
        {image ? (
          <div {...getRootProps()} className="div-bg-container">
            <input {...getInputProps()} />
            <p className="font-bold">Your image has been uploaded</p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-checks"
                width="25"
                height="44"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#00abfb"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 12l5 5l10 -10" />
                <path d="M2 12l5 5m5 -5l5 -5" />
              </svg>
          </div>
        ) : (
          <div {...getRootProps()} className="div-bg-container">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="font-bold">Yes, here!</p>
            ) : (
              <div>
                <p className="font-bold">Drop the file here ...</p>
                <p className="btn btn-info mt-6 text-white">Or click here</p>
              </div>
            )}
          </div>
        )}
        <button className="button" disabled={!image ? true : false}>
          <Link
            className="btn btn-info mt-6 text-white"
            to="/remove-background/results"
            onClick={() => uploadImage(image)}
          >
            Do the magic
          </Link>
        </button>
      </section>
    </main>
  );
};
export default RemoveBgContainer;
