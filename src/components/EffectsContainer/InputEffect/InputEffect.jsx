const InputEffect = ({ inputId, name, setValue, inputName, hover, max }) => {
  return (
    <div className="form-control">
      <label className="label">
      </label>
      <label className="input-group" htmlFor={inputId}>
        <span>{name}</span>
        <input
          min={10}
          max={max}
          value={hover}
          required
          type="range"
          placeholder="400"
          name={inputName}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 justify-center"
          onChange={setValue}
          id={inputId}
        />
        <span>{hover}</span>
      </label>
    </div>
  );
};
export default InputEffect;
