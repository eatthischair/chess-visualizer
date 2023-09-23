const colorGrid = (color1, color2) => {
  console.log("COLORGRID", color1, color2);
  return (
    <div
      style={{
        background: `linear-gradient(${color1}, ${color2}`,
      }}
    >
      '
    </div>
  );
};

export default colorGrid;
