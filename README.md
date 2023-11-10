## What is Chess Visualizer?
<br>
The Chess Visualizer is a desktop web application that colors squares given how many pieces can move/capture on that square for each side. 
<br>
The purpose of this project was to allow people across the world with 0-1000+ hrs of experiences to analyze well-known games or their own games from a new and visually exciting perspective, or share their love of the game with those who've never played. Originally created with the intention of sharing my love of chess with my older brother, Chess Visualizer now features a fully functional game reader capable of playing 4,000,000+ games, customizable color options and more.
<br>
This project was created with React, Tailwind, FontAwesome, FlowBite, and React-Color-Palette.
<br>
<br>
The chess board, Drag and Drop feature, PGN(computer-readable chess game notation) reader, and color-changing components were all created by hand. 


### How it Works
The board is comprised of 64 squares which correspond to an 8x8 matrix of strings. The strings are also keys in an object containing chess piece image elements. 

<img width="350" alt="image" src="https://github.com/eatthischair/chess-visualizer/blob/master/ReadmeGifs/Screen%20Shot%202023-11-09%20at%2012.44.12%20PM.png"> =
<img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/blob/master/ReadmeGifs/Screen%20Shot%202023-11-09%20at%2012.23.28%20PM.png">

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


### Special Features
Absolute Pins
<br>
An Absolute Pin is where a piece cannot move because it's movement would allow the King to be captured. The piece that cannot move is said to be absolutely pinned. If an absolutely pinned pieced and the pinning piece can move in the same direction, the absolutely pinned piece travel towards/away from the pinning piece as long as the King cannot be captured. In the example below, if this is the case the black piece's square will be pink.
<br>
<img width="400" alt="image" src="https://github.com/eatthischair/chess-visualizer/blob/master/ReadmeGifs/ezgif.com-gif-maker%20(1).gif">
<br>
Batteries
<br>
A battert refers to 2 or more pieces that can move in the same direction focusing an attack on one or more squares
<br>
<img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/blob/master/ReadmeGifs/ezgif.com-crop%20(2).gif">
<img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/blob/master/ReadmeGifs/ezgif.com-gif-maker.gif">

Tempos
The concept of Tempo in chess is very complicated, but it is implemented visually in a limited fashion here, when a piece of lower value attacks a piece of higher value. The attacked square will gain the color of the attacking side to better illustrate forks and other maneuvers.
<br>

<img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/blob/master/ReadmeGifs/ezgif.com-crop%20(4).gif">
<img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/blob/master/ReadmeGifs/ezgif.com-resize.gif">

### Pgn Reader

The Chess visualizer can read ANY chess game (try it!), whether your own game or an old classic via the Pgn Reader I created from scratch. 
PGN is the computer-readable notation for chess games. 
<img width="600" alt="image" src="https://github.com/eatthischair/chess-visualizer/blob/master/ReadmeGifs/ezgif.com-crop%20(6).gif">
<img width="600" alt="image" src="https://github.com/eatthischair/chess-visualizer/blob/master/ReadmeGifs/ezgif.com-crop%20(7).gif">


### Caveats
There is one situation I have yet to solve. When a Queen and another piece make a battery,  attack a minor piece defended by another minor piece
<img width="300" alt="Screen Shot 2023-11-10 at 12 49 52 PM" src="https://github.com/eatthischair/chess-visualizer/assets/116133810/b0cf316a-ed2e-4ac6-a243-b8dd3f959dfb">
<img width="300" alt="Screen Shot 2023-11-10 at 12 50 07 PM" src="https://github.com/eatthischair/chess-visualizer/assets/116133810/af208b04-460f-4799-9e2d-3fc4e10dc458">
<br>
In this situation practically, the Queen and Rook do not REALLY control this square even though it is attacked more times than it is defended because it's rarely advisable to give up a queen for two minor pieces.
Chess Visualizer also does not take into tactics into account, so sometimes a square might not really be controlled by the color it shows (chess is hard). The solution to this issue might be to add StockFish support. Later on, I will garner advice from more experienced players/teachers on what elements of the game would be best displayed visually for themselves or their students.

### Future Enhancements
<br>
Mobile version
FEN Input for puzzles and Chess960
Other features such as as saving games, accounts and others dependent on user feedback and suggestions.

### Thanks
<br>
Special thanks to all my friends and family who enjoyed this project and encouraged me when it was overwhelmingly difficult. In no order, Miles, Nick, James, Eric, Conner, Tori, Jack, Mom & Dad, and Jack H.



