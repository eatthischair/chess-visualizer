import { ColorPicker, useColor } from "react-color-palette";

const renderColorPalletes = (color1, colorChange1, color2, colorChange2) => {
  return (
    <div>
      <ColorPicker
        width={256}
        height={128}
        color={color1}
        hideHSV
        dark
        alpha
        onChange={(e) => {
          colorChange1(e);
        }}
      />

      <ColorPicker
        width={256}
        height={128}
        color={color2}
        hideHSV
        dark
        alpha
        onChange={(e) => {
          colorChange2(e);
        }}
      />
    </div>
  );
};

export default renderColorPalletes;
