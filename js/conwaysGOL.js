$(document).ready(function() {
    const NODE_DIAMETER = 10;
    const NODE_RADIUS = NODE_DIAMETER/2;
    const WIDTH = $(window).width();
    const HEIGHT = $(window).height();
    const ROW_LENGTH = WIDTH/NODE_DIAMETER;
    const COLUMN_LENGTH = HEIGHT/NODE_DIAMETER;
    console.log(ROW_LENGTH);
    console.log(COLUMN_LENGTH);


    class Node {
        constructor(posx, posy, status){
            this.posx = posx;
            this.posy = posy;
            this.status = status;
        }

        step(){
            this.neighbors = this.count_neighbors();
            /*
            Any live cell with fewer than two live neighbors dies, as if by under population.
            Any live cell with two or three live neighbors lives on to the next generation.
            Any live cell with more than three live neighbors dies, as if by overpopulation.
            Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
            */
            if (this.neighbors < 2  && this.status == 1) {
                this.status = 0;
            }
            // if ((this.neighbors == 2 || this.neighbors == 3) && this.status == 1) 
            if (this.neighbors > 3  && this.status == 1) this.status = 0;
            if (this.neighbors == 3 && this.status == 0) this.status = 1;
        }


        count_neighbors(){
            let count = 0;
            for (i = -1; i < 2; i++) {
                for(j = -1; j < 2; j++) {
                    if (i == 0 && j == 0) continue;
                    if (MAP[(this.posx+i) % ROW_LENGTH][(this.posy+j) % COLUMN_LENGTH].status > 0) {
                        count += 1;
                    }
                }
            }
            return count;
        }
    }

    let MAP = make_map();

    function make_map(){
        let tmp = [];
        for (i = 0; i < ROW_LENGTH; i++) { 
            tmp.push([]);
            $("#map").append("<span id='row"+i.toString()+"' style='width: "+WIDTH.toString()+" px;'></span>");
            for (j = 0; j < COLUMN_LENGTH; j++) {
                let status = Math.round(Math.random() * .55);
                const stat_hash = {0:"dead", 1:"alive"};
                tmp[i].push(new Node(i, j, status));
                $("#row"+i.toString()).append("<span id='("+i.toString()+","+j.toString()+")' class='"+stat_hash[status]+"' style='width: "+NODE_DIAMETER+";'></span>");
            }
        }
        return tmp;
    }

    function draw_map(the_map){
        for(i = 0; i < the_map.length; i++){

        }
    }

    function update_nodes(){

    }
});