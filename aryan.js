/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/


function Box(x, y, W, H = box_h) {
    this.x = x;
    this.y = y;
    this.w = W;
    this.h = H;
    this.m = false;

    this.draw = function () {
        ctx.beginPath();
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 0.6;
        ctx.fillStyle = clr;
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    this.move = function () {
        if (this.m) {
            this.x += v;
            if (this.x > w || this.x < -this.w) {
                v = -v;
            }
        }
    }
}


// main
//canvas variables
var canvas, ctx, h, w, run;
var box_h, box_x, box_w, temp = null;
var v = 5;
var stack_arr = [], score = 0, best = 0;
var colors = ['#04756F', '#FF8C00', '#FF2E00', '#D90000', '#2E0927'], clr;

//event listeners
window.addEventListener('load', init);
window.addEventListener('resize', () => {
    window.location.reload();
});

//initial program
function init() {

    //play function
    document.getElementById('play').addEventListener('click', () => {
        document.getElementsByClassName('start')[0].style.display = 'none';

        //game start
        game();
    })
    //canvas setup
    canvas = document.getElementById('canvas');
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');

    //when canvas is clicked
    canvas.addEventListener('click', canvas_update);

    //initial setup
    stack_arr = [];
    score = 0;
    best =  0;
    document.getElementById('best').innerText = best;
    clr = colors[Math.floor(Math.random() * (colors.length - 1))];

    box_h = Math.floor(h / 20);
    box_w = Math.floor(w / 2.3);
    box_x = (w / 2 - (box_w / 2));

    //initial ground
    let box1 = new Box(box_x, h - 4 * box_h, box_w, h);
    box1.draw();
    stack_arr.push(box1);
}

//draw function
function draw() {
    //clear canvas
    let grd = ctx.createLinearGradient(0, 0, h, w);
    grd.addColorStop(1, "#240b36");
    grd.addColorStop(0, "#c31432");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);

    //updating score
    updating_score();

    //draw boxes
    if (temp) {
        temp.draw(); temp.move();
    }
    for (let i = 0; i < stack_arr.length; i++) {
        stack_arr[i].draw();
    }

    run = requestAnimationFrame(draw);

}

//game function
function game() {
    //initial setup
    stack_arr = [];
    score = 0;
    v = 5;
    clr = colors[Math.floor(Math.random() * (colors.length - 1))];
    canvas.style.filter = 'blur(0px)';
    box_h = Math.floor(h / 20);
    box_w = Math.floor(w / 2.3);
    box_x = (w / 2 - (box_w / 2));

    //initial ground
    let box1 = new Box(box_x, h - 4 * box_h, box_w, h);
    box1.draw();
    stack_arr.push(box1);

    //create temporary box
    let len = stack_arr.length - 1;
    temp = new Box(-stack_arr[len].w, stack_arr[len].y - box_h, stack_arr[len].w);
    temp.m = true;
    draw();
}

//update score
function updating_score() {
    let s = document.getElementById('score');
    let b = document.getElementById('best');

    if (score < 10) {
        s.innerText = '0' + score;
    } else {
        s.innerText = score;
    }

    if (best <= score) {
        best = score;
        
    }
    if (best < 10) {
        b.innerText = '0' + best;
    } else {
        b.innerText = best;
    }

}

//canvas update
function canvas_update() {

    //lowering the tower
    if (stack_arr[stack_arr.length - 1].y < 8 * box_h) {
        for (let i = 0; i < stack_arr.length; i++) {
            stack_arr[i].y += 3 * box_h;
        }
        temp.y += 3 * box_h;
    }

    //losing case
    if (temp.x + temp.w < box_x || temp.x > box_x + box_w) {
        cancelAnimationFrame(run);
        canvas.style.filter = 'blur(4px)';
        document.getElementsByClassName('start')[0].style.display = 'flex';
        //update score
        updating_score();
    }

    //new width
    if (temp.x <= box_x) {
        box_w = temp.x + temp.w - box_x;
        score += 2;
    } else if (temp.x + temp.w >= box_x + box_w) {
        box_w = box_x + box_w - temp.x;
        score += 2;
        box_x = temp.x;
    }

    //update score
    updating_score();

    //increasing speed
    if (score % 8 == 0) {
        v *= 1.12;
    }

    //when all good
    let temp_box = new Box(box_x, temp.y, box_w);
    stack_arr.push(temp_box);

    //another temp box
    let a = stack_arr[stack_arr.length - 1];
    let b;
    if (stack_arr.length % 2 == 1) {
        b = -a.w;
    } else {
        b = w - 2;
    }
    temp = new Box(b, a.y - box_h, box_w);
    if (b < 0) {
        if (v < 0) {
            v = -v;
        }
    } else if (b > 0) {
        if (v > 0) {
            v = -v;
        }
    }

    temp.m = true;
}

/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/