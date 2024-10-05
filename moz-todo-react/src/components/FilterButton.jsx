function FilterButton(props) {
  const { name, isPressed, setFilter } = props;

  return (
    <button
      type="button"
      className={`${
        isPressed ? "font-bold border-b border-purple-950" : "font-normal"
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
