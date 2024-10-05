function FilterButton(props) {
  const { name, isPressed, setFilter } = props;

  return (
    <button
      type="button"
      className={`${
        isPressed ? "border-b border-purple-950 font-bold" : "font-normal"
      }`}
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span className="hidden">Show </span>
      <span>{name}</span>
      <span className="hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
