const colorGrid = (color1, color2) => {
  return (
    <div
      class="w-64"
      style={{
        background: `linear-gradient(${color1}, ${color2}`,
      }}
    >
      <br></br>
    </div>
  );
};

export default colorGrid;
