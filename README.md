This is a project I started during bootcamp. 

How it Works
The board is comprised of 64 cells which correspond to an 8x8 matrix of strings, and the strings are also keys in an object holding all the chess piece images. 

*image of matrix*

The Visualization component consists of 3 parts. For both white and black, a matrix storing the sums of how many times all the pieces of that side can move/capture on that square. The more pink the square, the more the white pieces control that square. The more blue, the more the black pieces control it. If a square's value is 0, then its color is the board's original color. The final matrix subtracts the sums for black from the sums for white. The values of the final matrix correspond to css classes which gives the cell its pink/blue/neutral color. If a cell contains a piece, the divs inner contents are the url corresponding to that piece.



this
![image](https://github.com/eatthischair/chess-visualizer/assets/116133810/2ce69065-5dab-43e5-a2ed-7453da5c88b4)
corresponds to
White
<img width="603" alt="image" src="https://github.com/eatthischair/chess-visualizer/assets/116133810/8e505f09-1516-42cb-b88d-ee46b5f06a54">

and this
![image](https://github.com/eatthischair/chess-visualizer/assets/116133810/02e54ee9-13c1-49e4-b805-3f48e9201ba7)
corresponds to
<img width="603" alt="image" src="https://github.com/eatthischair/chess-visualizer/assets/116133810/510f163f-feba-4117-ac47-3b7c0e90a971">

Together they become
![image](https://github.com/eatthischair/chess-visualizer/assets/116133810/dabb9f19-2b98-43b3-bd81-93b326d36a2a)
this
![image](https://github.com/eatthischair/chess-visualizer/assets/116133810/04f55276-7cd8-494d-83c3-acdd9aaffa72)


*special features*
Batteries (fischer game)

*in check functions*

*tempo moves*
(other fischer game)


Pgn Reader

The Chess visualizer can read any chess game, whether your own game or an old classic via the Pgn Reader I created from scratch. 
PGN is the computer-readable notation for chess games. 

*Why?* First and foremost I make this as a learning experience, and to share the beauty and complexity of the game with those who haven't played. I also made it because my brother (former math teacher and board game fanatic) says he doesn't like chess, so I thought I'd attempt to show him its greatness. 

*gif of copy paste from a database, and the game showing the same moves on both*



