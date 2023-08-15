const RadioButtons = (square, num, hexUpdate) => {
  num = num || "";
  if (num) square += num;
  return (
    <div>
      <input
        onClick={() => hexUpdate(square)}
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

export default RadioButtons;
