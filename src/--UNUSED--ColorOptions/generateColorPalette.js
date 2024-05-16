const GenerateColorPalette = (startColor, endColor, numColors) => {
  // Convert hex to RGB
  const hexToRGB = hex => {
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  };

  // Convert RGB to hex
  const RGBToHex = rgb => {
    return rgb.map(val => val.toString(16).padStart(2, '0')).join('');
  };

  // Extract RGB components of start and end colors
  const startRGB = hexToRGB(startColor);
  const endRGB = hexToRGB(endColor);

  // Calculate step size for each RGB component
  const stepSize = startRGB.map(
    (startVal, i) => (endRGB[i] - startVal) / (numColors - 1),
  );

  // Generate the color palette
  const palette = Array.from({length: numColors}, (_, i) => {
    // Calculate the interpolated RGB values
    const interpolatedRGB = startRGB.map((startVal, j) =>
      Math.round(startVal + stepSize[j] * i),
    );

    // Convert RGB values to hex
    return RGBToHex(interpolatedRGB);
  });

  return palette;
};

export default GenerateColorPalette;
