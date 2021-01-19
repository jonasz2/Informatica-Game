let player = null;
let explosions = [];
let shootTimer = 0;
let explosionLife = 100;
let shotsPerSecond = 2;
let friendlyMissiles = [];
let gun = null;
function setup() {
    createCanvas(600, 400);

    player = createSprite(width / 2, height / 2, 20, 20);
    player.draw = DrawPlayer;

    gun = createSprite(width / 2, -50, 25, 25);

}

function draw() {
    background(0, 0, 0);

    MovePlayer();

    drawSprites();

    RemoveDeadExplosions();

    Shoot();

}

function CreateFriendlyMissiles() {
    let startPosition = gun.position;
    let endPosition = player.position;
    let direction = p5.vector.sub(endPosition, startPosition);

    let missile = createSprite(startPosition.x, startPosition.y, 5, 5);

}

function RemoveDeadExplosions() {
    if (explosions.length > 0 && explosions[0].life == 0) {
        explosions.shift();
    }
}

function Shoot() {
    shootTimer += deltaTime;
    if (keyIsDown(32) && shootTimer >= 1000 / shotsPerSecond) {
        CreateExplosion(player.position.x, player.position.y);
        shootTimer = 0;
    }
}

function CreateExplosion(x, y) {
    let explosion = createSprite(x, y, 5, 5);
    explosion.life = explosionLife;
    explosion.draw = DrawExplosion;
    explosions.push(explosion);
}

function DrawExplosion() {
    circle(0, 0, this.width);
    this.width++;
    this.height++;
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