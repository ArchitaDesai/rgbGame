var colors = []; // rgb color array

var trueIndex; // index of correct square
var trueColor; // color of correct square

//setup keys for modes => modes["EASY"] will be 1
var modes = { EASY:1, MEDIUM:2 , HARD:3 };

// If not picked, initially it'll be medium mode, hence 6 squares
var numberOfSquares = 6;

var heading = document.querySelector("h1");
var colorValueHeading = document.querySelector("#colorValue");
var resetButton = document.querySelector("#reset");
var message = document.querySelector("#message");
var modeButtons = document.querySelectorAll(".mode");
var squares = document.querySelectorAll(".square");

init();

resetButton.addEventListener("click",reset);


function reset(){

	//change text of reset button to NEW COLORS
	resetButton.textContent = "NEW COLORS";
	//empty message "Correct!" from previous game
	message.textContent = "";
	//reset heading display color to body color
	heading.style.backgroundColor = "steelblue";

	init();
}

function init(){
	
	// get color array with random rgb colors
	colors = generateColorArray();
	// pick a random index from color array
	trueIndex = pickAnIndex();
	trueColor = colors[trueIndex];
	colorValueHeading.textContent = trueColor;
	assignInitialColors();
	squareListeners();
	setModeListeners();
}

function generateColorArray(){
	var colorArray = [];

	for (var i = 0; i < numberOfSquares; i++) {
		//get random color and push into array
		colorArray.push(randomColor());
	}
	return colorArray;
}

function randomColor(){
	//pick red, green, blue from 0 to 255
	red = Math.floor(Math.random()*256);
	green = Math.floor(Math.random()*256);
	blue = Math.floor(Math.random()*256);
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function pickAnIndex(){
	return Math.floor(Math.random()*numberOfSquares);
}


function assignInitialColors(){

	//squares.length will be total squares overall, i.e. 9
	for (var i = 0; i < squares.length; i++){
		//add initial colors to squares
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		//for easy mode, since there'll be 3 squares for display, bottom 6 will have no display
		else
			squares[i].style.display = "none";
	}
}


function squareListeners(){
	for (var i = 0; i < numberOfSquares; i++){
		squares[i].addEventListener("click",function(){
			clickedColor = this.style.backgroundColor;
			if(clickedColor!=trueColor){
				this.style.backgroundColor = "inherit";
				message.textContent = "Try again";
			}
			else
				wonTheGame();
		});
	}
}


function wonTheGame(){

	//change display heading color to match new color
	heading.style.backgroundColor = trueColor;

	//depending on whether there are 3 colors in array or 6, for easy and hard mode, change background.
	for(var i=0; i<numberOfSquares ; i++){
				squares[i].style.backgroundColor = trueColor;
	}
	message.textContent = "Correct!";
	resetButton.textContent = "Play again?";
}



function setModeListeners(){
	//2 modes - easy,hard
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click",function(){
			//remove class selected from everything else.
			for (var j = 0; j < modeButtons.length; j++){
				modeButtons[j].classList.remove("selected");
			}
			//add class selected to easy
			this.classList.add("selected");

			numberOfSquares = modes[this.textContent]*3;
			reset();

		});

		
	}
}

