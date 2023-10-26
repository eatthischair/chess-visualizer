This is a project I started during bootcamp. 

How it Works
The board is comprised of 64 cells which correspond to an 8x8 matrix of strings, and the strings are also keys in an object holding all the chess piece images. 

*image of matrix*

The Visualization component consists of 3 parts. For both white and black, a matrix storing the sums of how many times all the pieces of that side can move/capture on that square. The more pink the square, the more the white pieces control that square. The more blue, the more the black pieces control it. If a square's value is 0, then its color is the board's original color. The final matrix subtracts the sums for black from the sums for white. The values of the final matrix correspond to css classes which gives the cell its pink/blue/neutral color. If a cell contains a piece, the divs inner contents are the url corresponding to that piece.

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



