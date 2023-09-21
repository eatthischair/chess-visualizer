const RadioButtons = (square, num, hexUpdate) => {
  num = num || "";
  let hexObjCallArg = square + num;
  num ? (square += " " + num) : (square += "s");

  //this is a bunch of voodoo to turn the hexobj key names into readable radio button labels
  let squareString = square
    .split("S")
    .join(" s")
    .split(" ")
    .map((word, index) => {
      if (index <= 1) {
        let split = word.split("");
        split[0] = split[0].toUpperCase();
        word = split.join("");
      }
      return word;
    })
    .join(" ");

  return (
    <div>
      <input
        onClick={() => hexUpdate(hexObjCallArg)}
        type="radio"
        name="radio-1"
        className="radio w-[15px] border-2 h-[15px]"
      />
      <label
        for="radio-1"
        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {squareString}
      </label>
    </div>
  );
};

export default RadioButtons;
