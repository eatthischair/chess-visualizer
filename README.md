What is Chess Visualizer?
<br>
The Chess Visualizer is a desktop web application that colors the squares based on how many pieces can move/capture on that square per side, allowing people with 0-1000+ hrs of experiences to analyze well-known games or their own games from a new and visually exciting perspective, or share their love of the game with those who've never played.
This project was created with React, Tailwind, FontAwesome, FlowBite, and React-Color-Palette. The chess board, drag and drop feature, PGN reader (PGN is the computer-readable chess game notation), and color-changing components were all created by hand. 


How it Works
<br>
The board is comprised of 64 squares which correspond to an 8x8 matrix of strings. The strings are also keys in an object containing chess piece image elements. 

<img width="350" alt="image" src="https://github.com/eatthischair/chess-visualizer/blob/master/Screen%20Shot%202023-11-09%20at%2012.44.12%20PM.png"> =
<img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/blob/master/Screen%20Shot%202023-11-09%20at%2012.23.28%20PM.png">

The Visualization component consists of 3 parts. 
For both white and black, a matrix storing the sums of how many times all the pieces of that side can move/capture on that square. The more pink the square, the more the white pieces control that square. The more blue, the more the black pieces control it.
If the amounts of both sides are equal, then the square has the board's original color. The final matrix subtracts the sums for black from the sums for white. These values decide the CSS class for that square.



White
<br>
<img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/assets/116133810/5556e24f-cf67-4204-9419-1e669781bf34"> = <img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/assets/116133810/8e505f09-1516-42cb-b88d-ee46b5f06a54">
<br>
Black
<br>
<img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/assets/116133810/4ddf7445-ac01-4985-b31a-ec345f94ca13"> = <img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/assets/116133810/510f163f-feba-4117-ac47-3b7c0e90a971">
<br>
Together
<br>
<img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/assets/116133810/9b78f644-0f8e-4348-a470-630af71b1510"> = <img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/assets/116133810/a04356f4-075f-4ed1-b506-2844b3f32b1c">


*special features*
<br>
Absolute Pins
<br>
An Absolute Pin is where a piece cannot move because it's movement would allow the King to be captured. The piece that cannot move is said to be absolutely pinned. If an absolutely pinned pieced and the pinning piece can move in the same direction, the absolutely pinned piece travel towards/away from the pinning piece as long as the King cannot be captured. In the example below, if this is the case the black piece's square will be pink.
<br>
<img width="400" alt="image" src="https://github.com/eatthischair/chess-visualizer/blob/master/ezgif.com-gif-maker%20(1).gif">
<br>
Batteries
<br>
Generally used to refer to 2 or more pieces that can move in the same direction
<br>
<img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/blob/master/ezgif.com-crop%20(3).gif">
<img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/blob/master/ezgif.com-gif-maker.gif">

Tempos
If a piece of lower value attacks a piece of higher value, the attacked square will gain the color of the attacking side
<br>

<img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/blob/master/ezgif.com-crop%20(4).gif">
<img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/blob/master/ezgif.com-crop%20(2).gif">

Pgn Reader

The Chess visualizer can read ANY chess game (try it!), whether your own game or an old classic via the Pgn Reader I created from scratch. 
PGN is the computer-readable notation for chess games. 
<img width="600" alt="image" src="https://github.com/eatthischair/chess-visualizer/blob/master/ezgif.com-crop%20(6).gif">
<img width="600" alt="image" src="https://github.com/eatthischair/chess-visualizer/blob/master/ezgif.com-crop%20(7).gif">



*Why?* First and foremost I make this as a learning experience, and to share the beauty and complexity of the game with those who haven't played. I also made it because my brother (former math teacher and board game fanatic) says he doesn't like chess, so I thought I'd attempt to show him its greatness. 

*gif of copy paste from a database, and the game showing the same moves on both*



