const RadioButtons = (square, num, updateFunc) => {
  let className = square + num;
  num = num || "";
  return (
    <div>
      <input
        onClick={() => updateFunc(className)}
        type="radio"
        name="radio-1"
        className="radio"
      />
      <label
        for="radio-1"
        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {square} Color {num}
      </label>
    </div>
  );
};

// module.exports = RadioButtons;
export default RadioButtons;
