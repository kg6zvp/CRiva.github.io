let WIDTH = $(window).width()*3;
let HEIGHT = $(window).height()*3;
let NODE_SIZE = 70;
let NODE_DIAMETER = Math.round(WIDTH/(NODE_SIZE*3));
let NODE_RADIUS = NODE_DIAMETER/2;
let ROW_LENGTH = Math.floor(HEIGHT/NODE_DIAMETER);
let COLUMN_LENGTH = Math.floor(WIDTH/NODE_DIAMETER);


$(document).ready(function() {
    let MAP = make_map();
    $('.node').click(function() {
        $(this).removeClass('alive').removeClass('dead').addClass('custom_life');
        let x = $(this).attr('id').match(/[0-9]+/g)[0]
        let y = $(this).attr('id').match(/[0-9]+/g)[1];
        MAP[x][y].status = 2;
    });
    window.setInterval(function (){
        update(MAP);
    }, 1500);
});


class Node {
    constructor(posx, posy, status){
        this.posx = posx;
        this.posy = posy;
        this.status = status;
    }

    step(MAP){
        this.neighbors_state1 = this.count_neighbors(MAP, 1);
        this.neighbors_state2 = this.count_neighbors(MAP, 2);
        this.total_neighbors = this.neighbors_state1 + this.neighbors_state2;
        this.preprocess = this.status;
        /* NORMAL RULES
        Any live cell with fewer than two live neighbors dies, as if by under population.
        Any live cell with two or three live neighbors lives on to the next generation.
        Any live cell with more than three live neighbors dies, as if by overpopulation.
        Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
        */
        if (this.total_neighbors < 2 && this.status == 1) {
            this.preprocess = 0;
            $("#\\("+this.posx+"\\,"+this.posy+"\\)").removeClass('alive').addClass('dead');
        }
        // if ((this.neighbors == 2 || this.neighbors == 3) && this.status == 1) 
        else if (this.total_neighbors > 3 && this.status == 1) {
            this.preprocess = 0;
            $("#\\("+this.posx+"\\,"+this.posy+"\\)").removeClass('alive').addClass('dead');
        }
        else if (this.total_neighbors == 3 && this.status == 0) {
            this.preprocess = 1;
            $("#\\("+this.posx+"\\,"+this.posy+"\\)").removeClass('dead').addClass('alive');
        }
        /* EXTENDED RULES
        Any live cell in state 2 with more than 5 neighbors dies by subtle overpopulation.
        Any live cell in state 2 with less than 3 neighbor will die subtle underpopulation.
        Any live cell in state 1 with exactly 1 state 2 neighbor will transform to state 2.
        Any dead cell with 5-6 state 2 neighbors will come alive.
        */
        else if (this.total_neighbors > 5 && this.status == 2) {
            this.preprocess = 0;
            $("#\\("+this.posx+"\\,"+this.posy+"\\)").removeClass('custom_life').addClass('dead');
        }
        else if (this.total_neighbors < 3 && this.status == 2) {
            this.preprocess = 0;
            $("#\\("+this.posx+"\\,"+this.posy+"\\)").removeClass('custom_life').addClass('dead');
        }
        else if (this.neighbors_state2 == 1 && this.status == 1) {
            this.preprocess = 2;
            $("#\\("+this.posx+"\\,"+this.posy+"\\)").removeClass('alive').addClass('custom_life');
        }
        else if ((this.neighbors_state2 > 4 && this.neighbors_state2 < 7) && this.status == 0) {
            this.preprocess = 2;
            $("#\\("+this.posx+"\\,"+this.posy+"\\)").removeClass('dead').addClass('custom_life');
        }
    }

    modulo(num, max){
        return Math.floor((num % max + max) % max);
    }

    nodeState(MAP, x, y) {
        return MAP[this.modulo((this.posx+x), ROW_LENGTH)][this.modulo((this.posy+y), COLUMN_LENGTH)].status;
    }

    count_neighbors(MAP, state){
        let count = 0;
        if (this.nodeState(MAP, -1, -1) == state) count++;
        if (this.nodeState(MAP,  0, -1) == state) count++;
        if (this.nodeState(MAP,  1, -1) == state) count++;
        if (this.nodeState(MAP, -1,  0) == state) count++;
        if (this.nodeState(MAP,  1,  0) == state) count++;
        if (this.nodeState(MAP, -1,  1) == state) count++;
        if (this.nodeState(MAP,  0,  1) == state) count++;
        if (this.nodeState(MAP,  1,  1) == state) count++;
        return count;
    }
}

function make_map(){
    let tmp = [];
    for (i = 0; i < ROW_LENGTH; i++) { 
        tmp.push([]);
        $("#map").append("<span id='row"+i.toString()+"' class='gol_row' style='display: inline-block; width: "+WIDTH.toString()+"px; height: "+NODE_DIAMETER+"px;'></span>");
        for (j = 0; j < COLUMN_LENGTH; j++) {
            let status = Math.round(Math.random() * .66);
            const stat_hash = {0:"dead", 1:"alive"};
            tmp[i].push(new Node(i, j, status));
            $("#row"+i.toString()).append("<div id='("+i.toString()+","+j.toString()+")' class='"+stat_hash[status]+" node' style='width: "+(NODE_DIAMETER).toString()+"px; height: "+(NODE_DIAMETER).toString()+"px;'></div>");
        }
    }
    return tmp;
}

function update(the_map){
    the_map.forEach(function(e){
        e.forEach(function(el){
            el.step(the_map);
        });
    });
    the_map.forEach(function(e){
        e.forEach(function(el){
            // console.log(el.preprocess)
            el.status = el.preprocess;
        });
    });
}