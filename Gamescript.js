let player = null;


function setup() {
    createCanvas(600, 400);

    player = createSprite(width / 2, height / 2, 20, 20);
    player.draw = DrawPlayer;

}

function draw() {
    background(0, 0, 0);

    MovePlayer();

    drawSprites();

}

function DrawPlayer() {
    fill(0, 0, 0);
    stroke(255, 255, 255);
    strokeWeight(3);
    circle(0, 0, this.width);

    line(0, 5, 0, 20);
    line(0, -5, 0, -20);
    line(5, 0, 20, 0);
    line(-5, 0, -20, 0)


    /* line(0, 0, 0, 50);
     line(0, 50, -10, 70);
     line(0, 50, 10, 70);
     line(0, 25, -20, 0);
     line(0, 25, 20, 40);
 
     rect(30, 50, 30, 20, 5) */
}

function MovePlayer() {
    let playerSpeed = 5;
    if (keyIsDown(DOWN_ARROW)) {
        player.position.y += playerSpeed;
    }

    if (keyIsDown(UP_ARROW)) {
        player.position.y -= playerSpeed;
    }

    if (keyIsDown(LEFT_ARROW)) {
        player.position.x -= playerSpeed;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        player.position.x += playerSpeed;
    }

}