const Checkbox = ({ title, state, onChange }) => {
  return (
    <div>
      <input
        className="form-checkbox h-4 w-4 text-blue-600 mr-5"
        type="checkbox"
        onChange={onChange}
        checked={state}
      />
      <label>{title}</label>
    </div>
  );
};

export default Checkbox;
