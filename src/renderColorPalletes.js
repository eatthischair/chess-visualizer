import { ColorPicker, useColor } from "react-color-palette";

const renderColorPalletes = (color1, colorChange1, color2, colorChange2) => {
  console.log("rendcolorpalletes", color1, colorChange1, color2, colorChange2);
  return (
    <div class="grid grid-cols-2 w-[400px] h-[110px] ">
      <ColorPicker
        width={170}
        height={90}
        color={color1}
        hideHSV
        dark
        hideAlpha
        hideInput
        onChange={(e) => {
          colorChange1(e);
        }}
      />

      <ColorPicker
        width={170}
        height={90}
        color={color2}
        hideHSV
        dark
        hideAlpha
        hideInput
        onChange={(e) => {
          colorChange2(e);
        }}
      />
    </div>
  );
};

export default renderColorPalletes;
