This is a project I started during bootcamp. 

How it Works
The board is comprised of 64 cells which correspond to an 8x8 matrix of strings, and the strings are also keys in an object holding all the chess piece images. 

*image of matrix*

The Visualization component consists of 3 parts. 
For both white and black, a matrix storing the sums of how many times all the pieces of that side can move/capture on that square. The more pink the square, the more the white pieces control that square. The more blue, the more the black pieces control it.
If a square's value is 0, then the square has the board's original color. The final matrix subtracts the sums for black from the sums for white. These values decide the CSS class for that square.



White
<br>
<img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/assets/116133810/5556e24f-cf67-4204-9419-1e669781bf34">
<img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/assets/116133810/8e505f09-1516-42cb-b88d-ee46b5f06a54">
<br>
Black
<br>
<img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/assets/116133810/4ddf7445-ac01-4985-b31a-ec345f94ca13">
<img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/assets/116133810/510f163f-feba-4117-ac47-3b7c0e90a971">
<br>
Together
<br>
<img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/assets/116133810/9b78f644-0f8e-4348-a470-630af71b1510">
<img width="300" alt="image" src="https://github.com/eatthischair/chess-visualizer/assets/116133810/a04356f4-075f-4ed1-b506-2844b3f32b1c">





*special features*
Batteries (fischer game)

*in check functions*

*tempo moves*
(other fischer game)
![](https://github.com/eatthischair/chess-visualizer/blob/master/ezgif.com-crop%20(2).gif)

Pgn Reader

The Chess visualizer can read any chess game, whether your own game or an old classic via the Pgn Reader I created from scratch. 
PGN is the computer-readable notation for chess games. 

*Why?* First and foremost I make this as a learning experience, and to share the beauty and complexity of the game with those who haven't played. I also made it because my brother (former math teacher and board game fanatic) says he doesn't like chess, so I thought I'd attempt to show him its greatness. 

*gif of copy paste from a database, and the game showing the same moves on both*



