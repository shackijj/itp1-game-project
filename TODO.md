Create a copy of your sketch directory from last week and rename it to something like `game-project-6`. Keep your completed project from last week safe as a reference, and make the following changes to the code in your new game directory.

4. Add lives [2 marks]

Your character should begin with three lives and, each time they fall down a canyon, the game should reset and their remaining lives decrement by one.
Create a global variable `lives`, and initialise it to `3` within `setup`.
Create a function called `checkPlayerDie`. Call this within draw.
In this function, define a conditional statement that tests if your character has fallen below the bottom of the canvas. When this is `true`, decrement the `lives` counter by one.
Create a new function called `startGame()`.
Move everything from `setup` except `createCanvas` and the initialisation of `floorPos_y` and `lives` into this new function.
At the end of your now very short `setup` function, call `startGame()`.
In `checkPlayerDie`, create a conditional statement to test if the player has used all of their lives. If there are lives remaining, call `startGame`.
Write some code using a `for` loop to draw life tokens onto the screen so that you can keep track of how many lives you have remaining.

6. Tidy your code [3 marks]

Make sure your code is elegant.
Remove all commented blocks of code.
Check all indentations.
Make your variable names consistent.
Remove any redundant code.
Refactor unwieldy drawing code.
break up long commands onto multiple lines.