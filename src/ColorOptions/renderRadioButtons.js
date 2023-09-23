import RadioButtons from "./RadioButtons";

const renderRadioButtons = (color, hexUpdate) => {
  let buttons = [];
  for (var i = 1; i < 8; i++) {
    buttons.push(RadioButtons(color, i, hexUpdate));
  }
  return buttons;
};

export default renderRadioButtons;
