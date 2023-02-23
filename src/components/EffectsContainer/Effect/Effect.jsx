const Effect = ({
  getRootProps,
  getInputProps,
  isDragActive,
  image,
  onClickFunction,
}) => {
  return (
    <div className="section-effect">
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
      <button
        className="button btn btn-info mt-6 text-white"
        disabled={!image ? true : false}
        onClick={onClickFunction}
      >
        Do the magic
      </button>
    </div>
  );
};
export default Effect;
