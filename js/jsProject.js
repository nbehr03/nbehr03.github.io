// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);


// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//generate color function!
//on the page load, it randomly generates between 3 color schemes

var num = random(1,3);

function generateColor(i) 
{
    
//instead of generating a random color, this function assigns each ball a color between red and green, according to the volume the ball represents
//the higher the volume, the greener the ball
//the lower the volume, the redder the ball
    if (num === 1)
    {
        if (i === 0)
        {
            return `rgb(255, 0, 0)`;
        }

        if (i < 51)
        {
            return `rgb(255, ${i*5} ,0)`;
        }

        if (i > 50 && i < 100)
        {
            return `rgb(${255 - (5*(100-i))}, 255, 0)`;
        }

        if (i === 100)
        {
            return `rgb(0,255,0)`;
        }
    }

//this function returns a random color between red and purple, no green
    if (num === 2)
    {
    return `rgb(${random(0, 255)},0,${random(0, 255)})`;
    }

//this function will always have the r be 0, but random otherwise
    if (num === 3)
    {
        return `rgb(0,${random(0, 255)},${random(0, 255)})`;
    }
}

//generatePassword: the same as the function before, but it returns only the R value

function generatePassword(i) 
{

    if (i < 51)
    {
        return 255;
    }

    if (i > 50 && i < 100)
    {
        return (255 - (5*(100-i)));
    }

    if (i === 100)
    {
        return 0;
    }

}

class Ball
{
    constructor(x,y, velX, velY, color, size, volume, pass)
    {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
        this.volume = volume;
        this.pass = pass;
    }

    draw()
    {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.font = "22px Arial";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillText(this.volume, this.x, this.y);

    }

    update()
    {
        // this.x = this.x + this.velX;
        // this.y = this.y + this.velY;

        if ((this.x + this.size) >= width)
        {
            this.velX = - this.velX;
        }

        if ((this.x + this.size) <= 50)
        {
            this.velX = - this.velX;
        }

        if ((this.y + this.size) >= height)
        {
            this.velY = - this.velY;
        }

        if ((this.y + this.size) <= 50 )
        {
            this.velY = - this.velY;
        }

        this.x += this.velX;
        this.y += this.velY;

    }

    collisionDetect()
    {
        for (const ball of balls)
        {
            if (this !== ball)
            {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size)
                {

                    //making the balls bounce off each other
                    //if collision is detected,
                    //swap the velocities of the two balls

                    const temp = this.velX;
                    this.velX = ball.velX;
                    ball.velX = temp;

                    const temp2 = this.velY;
                    this.velY = ball.velY;
                    ball.velY = temp2;

                }
            }
        }
    }

}


const balls = [];

let i = 0; //creating the numbers on the balls
while (balls.length < 101)
{
    const size = 30;
    const ball = new Ball
    (
        //constructor(x,y, velX, velY, color, size)
        random(0 + size, width - size), // x position
        random(0 +size, height - size), // y position
        random (-6,6), // x velocity
        random(-6,6), // y velocity
        generateColor(i), //making each ball a color on the red/green gradient
        20, // size 20
        i, // assigning each ball a number
        generatePassword(i), //give a password for each ball
    );

    balls.push(ball); //add to array of balls

    i++; //increment i 
}

function loop()
{
    ctx.fillStyle = "rgb(0 0 0 / 25%)";
    ctx.fillRect(0,0, width, height);

    for (const ball of balls)
    {
        ball.draw();
        ball.update();
        ball.collisionDetect();

    }

    requestAnimationFrame(loop);

}


//function for when the user clicks a ball
//listening for a click on the canvas, then checking if it was in the range of a ball

canvas.addEventListener('click', function(ballClicked)
{
    const mouseX = ballClicked.clientX;
    const mouseY = ballClicked.clientY;

    for (ball of balls) // iterate through all the balls to check if any are where the user clicked
    {
        const dx = mouseX - ball.x; //distance mouse is from center of ball in x direction
        const dy = mouseY - ball.y; //distance in y direction
        const distance = Math.sqrt(dx * dx + dy * dy); // a^2 + b^2 = c^2

        if (distance < ball.size) // if the click did happen on a ball
        {
            password(ball);
            break;
        }

    }
    
});


function password(ball) //run this function when a ball is clicked
{
    const correctPassword = ball.pass; //correct password for this specific ball

    //promt the user for their guess
    var guess = prompt('You selected volume ' + ball.volume + '!' + '\n' +
    "Before the volume is changed, what's the password?" + '\n' +
    'Hint: it is the value of R in the RGB value of the ball you just clicked!');

    //keep asking the user if they keep getting it wrong
    while (guess != correctPassword.toString())
    {

        if (guess === null) //if the user clicks cancel
        {
            break;
        }

        guess = prompt("Wrong! Try again!");

    }

    //if the user guesses correctly
    if (guess === correctPassword.toString()) //convert int to string
    {
        alert('Correct! Volume has been changed.');
    }

}

loop();