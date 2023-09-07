import { ColorPicker, useColor } from "react-color-palette";

const renderColorPalletes = (color1, colorChange1, color2, colorChange2) => {
  return (
    <div class="grid grid-cols-2 w-[490px] h-[110px] ">
      <ColorPicker
        width={200}
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
        width={200}
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
