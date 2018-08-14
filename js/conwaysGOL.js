let WIDTH = $(window).width()*3;
let HEIGHT = $(window).height()*3;
let NODE_SIZE = 60;
let NODE_DIAMETER = Math.round(WIDTH/(NODE_SIZE*3));
let NODE_RADIUS = NODE_DIAMETER/2;
let ROW_LENGTH = Math.floor(HEIGHT/NODE_DIAMETER);
let COLUMN_LENGTH = Math.floor(WIDTH/NODE_DIAMETER);


$(document).ready(function() {
    let MAP = make_map();
    window.setInterval(function (){
        update(MAP);
    }, 1000);
});


class Node {
    constructor(posx, posy, status){
        this.posx = posx;
        this.posy = posy;
        this.status = status;
    }

    step(MAP){
        this.neighbors = this.count_neighbors(MAP);
        /*
        Any live cell with fewer than two live neighbors dies, as if by under population.
        Any live cell with two or three live neighbors lives on to the next generation.
        Any live cell with more than three live neighbors dies, as if by overpopulation.
        Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
        */
        if (this.neighbors < 2 && this.status == 1) {
            this.status = 0;
            $("#\\("+this.posx+"\\,"+this.posy+"\\)").removeClass('alive').addClass('dead');
        }
        // if ((this.neighbors == 2 || this.neighbors == 3) && this.status == 1) 
        if (this.neighbors > 3 && this.status == 1) {
            this.status = 0;
            $("#\\("+this.posx+"\\,"+this.posy+"\\)").removeClass('alive').addClass('dead');
        }
        if (this.neighbors == 3 && this.status == 0) {
            this.status = 1;
            $("#\\("+this.posx+"\\,"+this.posy+"\\)").removeClass('dead').addClass('alive');
        }
    }

    modulo(num, max){
        return Math.floor((num % max + max) % max);
    }

    nodeState(MAP, x, y) {
        return MAP[this.modulo((this.posx+x), ROW_LENGTH)][this.modulo((this.posy+y), COLUMN_LENGTH)].status;
    }

    count_neighbors(MAP){
        let count = 0;
        if (this.nodeState(MAP, -1, -1) > 0) count++;
        if (this.nodeState(MAP,  0, -1) > 0) count++;
        if (this.nodeState(MAP,  1, -1) > 0) count++;
        if (this.nodeState(MAP, -1,  0) > 0) count++;
        if (this.nodeState(MAP,  1,  0) > 0) count++;
        if (this.nodeState(MAP, -1,  1) > 0) count++;
        if (this.nodeState(MAP,  0,  1) > 0) count++;
        if (this.nodeState(MAP,  1,  1) > 0) count++;
        // console.log(count.toString());
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
            $("#row"+i.toString()).append("<div id='("+i.toString()+","+j.toString()+")' class='"+stat_hash[status]+"' style='width: "+(NODE_DIAMETER).toString()+"px; height: "+(NODE_DIAMETER).toString()+"px;'></div>");
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
}