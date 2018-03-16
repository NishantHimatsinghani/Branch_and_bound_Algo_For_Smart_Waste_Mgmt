var vertices = [];
var counter = 1;  //to maintain ID of each node
var cost_info = "";
var N = 4;
var final_path = [];
var final_res = Number.MAX_VALUE;




function setup(){
	
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	canvas.addEventListener("mousedown", mouseClick, false);
	
}

function no_nodes(){


		N =	document.getElementById("no_of_nodes").value;
		for(var i = 1; i <= N; i++){

			document.getElementById("bin" + i).style.display = "block";
			for(var j = N; j <= 9 ; j++){
					document.getElementById("label" + j + "" + i).style.display = "none";
					document.getElementById("bin" + i).elements["e" + j].style.display = "none";

			}
 
		}




}

function insert(){
	




	for(var i = 1; i <= N; i++){                    // i === bin id, j === edge number
			
		var cost_array = [];

		for(var j =1; j <N ; j++){
			//var t = j-1;
			if(j<i){			
				cost_array[j] = document.getElementById("bin" + i).elements["e" + j].value;		
			}
			else{
				cost_array[j+1] =  document.getElementById("bin" + i).elements["e" + j].value;		
			}

		}
		/*var v = {

			x : Math.floor((Math.random() * 1000) + 1),
			y : Math.floor((Math.random() * 500) + 1),
			id : counter,
			cost : [cost_array[0], cost_array[1], cost_array[2], cost_array[3], cost_array[4]]
		};*/
		var v = vertices[i-1]; 
		v.cost = cost_array;  //edited
			counter++;
			for(var k =0 ; k < v.cost.length ; k++){
				if(v.cost[k] != undefined){

				cost_info = cost_info + " "+ v.cost[k]; //cost_array[k];
				}
			}
		cost_info = cost_info + "<br/>";	
	}

	writeIntodiv2();
	algo(N);
		
}


function mouseClick(e){

	if(counter > N){
		return;
	}



	var color_array = {r : Math.floor((Math.random() * 128) + (Math.random() * 127) + 1), g: Math.floor((Math.random() * 128) + (Math.random() * 127) + 1), b : Math.floor((Math.random() * 128) + (Math.random() * 127) + 1)};
	//var color_array = {r : Math.floor((Math.random() * 255) + 1), g: Math.floor((Math.random() * 255) + 1), b : Math.floor((Math.random() * 255) + 1) };
	
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
 	

	var x;
	var y;
	if (e.pageX || e.pageY) { 
	  x = e.pageX;
	  y = e.pageY;
	}
	else { 
	  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
	  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
	} 
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;


	var v = {

		x : x,
		y : y,
		id : counter,
		color : color_array,
		cost : null

	}
	vertices.push(v);
	counter++;


	ctx.fillStyle = "rgb(" + color_array.r + "," + color_array.g + "," + color_array.b + ")";
	ctx.fillRect(x ,y, 16, 16);

	//fill(color_array.r, color_array.g, color_array.b);
	//stroke(255);
	//ellipse(v.x, v.y, 16, 16);

	if(counter > N){

		color_equiv_id();


	}


}

var dir = "";


function algo(N){


	//converting individual cost arrays into one cost matrix grid(N X N)
	
	var temp = ++N;
	N--;
	var cost_matrix = []
	
	for (var i = 0; i < temp ; i++) {
	  cost_matrix[i] = [];
	}

	

	for(var i =1; i <= N; i++){

		for(var j =1; j <=N; j++){

			if(i == j){
				cost_matrix[i][j] = 0;
				continue;
			}
			cost_matrix[i][j] = vertices[i - 1].cost[j]

		}

	}//COST MATRIX CREATED
	
	main_algo(cost_matrix, N);





}




/* 
function draw(){


	while(counter < N){

		return;

	}

	//background(51);
	dir = "";


	var reached = [];
	var unreached = [];
	
	for(var i =0; i < vertices.length ; i++){        //since initially, all of the nodes are unreached
		unreached.push(vertices[i]);
	}   

	reached.push(unreached[0]);  //picking up a random starting point and putting it in our reached array !!!PROBLEM!!!

	unreached.splice(0,1);       //removing that starting point from the unreached array
	


	//MAIN ALGO STARTS HERE

	while(unreached.length > 0){
		var record = Number.MAX_VALUE;   //to evaluate the minimum of all the distances from our curr_index to the evaluated dest_index
		var curr_index;
		var dest_index;
		//var v1;
		//var v2;


		for(var i =0; i < reached.length ; i++){                //two for loops----for every element in the reached array, we loop over all elements of the unreached array

			for(var j = 0; j < unreached.length; j++){

				var v1 = reached[i];
				var v2 = unreached[j];

				//var d = dist(v1.x, v1.y, v2.x, v2.y);               //the dist() function will calculate thr edge weights based on the cartesian co-ordinates of that node in the canvas
				
				var d = v1.cost[v2.id];

				if(d < record){

					record = d;
					curr_index = i;	                        
					dest_index = j;

				}

			}

		}                               //at the end of these two loops..we get the indexes of the 
		stroke(255);
		
		line(reached[curr_index].x, reached[curr_index].y, unreached[dest_index].x, unreached[dest_index].y);

		dir = dir +  reached[curr_index].id + " -> " + unreached[dest_index].id + "<br/>";	

		reached.push(unreached[dest_index]);             // Now that we have found that nearest node, we add dt node into reaached array and remove from our unreached array
		unreached.splice(dest_index,1);
		

		if(unreached.length == 0){

			line(reached[0].x, reached[0].y, reached[reached.length-1].x, reached[reached.length -1].y);
			dir = dir +  reached[reached.length-1].id + " -> " + reached[0].id  + "<br/>";
			writeIntodiv1();		


		}

	}

	for(var i =0; i < vertices.length; i++){

		var color_array = {r : 0, g: 0, b : 0};

		if(i == 0)color_array = {r : 255, g : 0, b : 0};
		if(i == 1)color_array = {r : 0, g : 255, b : 0};
		if(i == 2)color_array = {r : 0, g : 0, b : 255};
		if(i == 3)color_array = {r : 0, g : 0, b : 0};
		
		




		 

	}
	

}
*/

function writeIntodiv1(){

	document.getElementById('directions').innerHTML = dir;


}

function writeIntodiv2(){

	document.getElementById("cost_info").innerHTML = cost_info;
	

}

function color_equiv_id(){

	var r;
	var g;
	var b;

	var table = document.getElementById("color_info");
	var head = table.insertRow(0);
	var cell1 = head.insertCell(0);
	var cell2 = head.insertCell(1);
	cell1.innerHTML = "COLOR";
	cell2.innerHTML = "BIN ID";


	//var x = document.createElement("TABLE");

	for(var i = 1; i <= N; i++){
		head = table.insertRow(i);
		cell1 = head.insertCell(0);
		cell2 = head.insertCell(1);
		r = vertices[i-1].color.r;
		g = vertices[i-1].color.g;
		b = vertices[i-1].color.b;
		cell1.style.background = "rgb(" +r+ "," + g + "," + b + ")";
		cell2.innerHTML = vertices[i-1].id; 


	}


}



function main_algo(cost_matrix, N){

	var final_path = [];
	var curr_path = [];
	var verify = document.getElementById("info_verify");
	var text = "";
	var temp = ++N;
	N--;
	var visited = [];
	/*for(var i = 1; i < temp;i++ ){

		for(var j = 1 ; j < temp; j++){

			text = text + cost_matrix[i][j] + " ";
			
		}

	text = text + "<br>"


	}
	*/
	//end of for loops
	//verify.innerHTML = text;


	var curr_bound = 0;
	for (var i=1; i<=N; i++){
        	curr_bound += (parseInt(firstMin(cost_matrix, i, N)) + parseInt(secondMin(cost_matrix, i, N)));

	}
	curr_bound = (curr_bound % 2 == 1)? curr_bound/2 + 1 :curr_bound/2;

	visited[1] = true;
	for(var i =2; i <= N; i++){

		visited[i] = false;

	}

	curr_path[0] = 1;
	TSPRec(cost_matrix, curr_bound, 0, 1, curr_path, final_path, N, visited);

	draw_lines(final_path, N);	

	var path = "<br>";
	for(var i = 0; i <N ; i++){

		path += final_path[i] + " -> ";
	}
	path += final_path[N] + "<br>" + "Total Cost for taking the above path : " + final_res;
	verify.innerHTML = path;

    
}



function TSPRec(cost_matrix, curr_bound, curr_weight,level,curr_path, final_path, N, visited)
{
    // base case is when we have reached level N which
    // means we have covered all the nodes once
    if (level==N)
    {
        // check if there is an edge from last vertex in
        // path back to the first vertex
        if (cost_matrix[curr_path[level-1]][curr_path[0]] != 0)
        {
            // curr_res has the total weight of the
            // solution we got
            var curr_res = parseInt(curr_weight) +
                    parseInt(cost_matrix[curr_path[level-1]][curr_path[0]]);
 
            // Update final result and final path if
            // current result is better.
            if (curr_res < final_res)
            {
                copyToFinal(curr_path, final_path);
                final_res = curr_res;
            }     
        }
        return;
    }
 
    // for any other level iterate for all vertices to
    // build the search space tree recursively
    for (var i=1; i<=N; i++)
    {
        // Consider next vertex if it is not same (diagonal
        // entry in adjacency matrix and not visited
        // already)
        if (cost_matrix[curr_path[level-1]][i] != 0 &&
            visited[i] == false)
        {
            var temp = curr_bound;
            curr_weight += parseInt(cost_matrix[curr_path[level-1]][i]);
                        
            // different computation of curr_bound for
            // level 2 from the other levels
            if (level==1){
              curr_bound -= ((firstMin(cost_matrix, curr_path[level-1], N) +
                             firstMin(cost_matrix, i, N))/2);
            }
            else{
              curr_bound -= ((secondMin(cost_matrix, curr_path[level-1], N) +
                             firstMin(cost_matrix, i, N))/2);
            }
 
            // curr_bound + curr_weight is the actual lower bound
            // for the node that we have arrived on
            // If current lower bound < final_res, we need to explore
            // the node further
            if (curr_bound + curr_weight < final_res)             //THIS IS WHERE THE BOUNDING HAPPENS
            {
                curr_path[level] = i;
                visited[i] = true;
 
                // call TSPRec for the next level
                TSPRec(cost_matrix, curr_bound, curr_weight, parseInt(level)+1,
                       curr_path, final_path, N, visited);
            }
 
            // Else we have to prune the node by resetting
            // all changes to curr_weight and curr_bound
            curr_weight -= cost_matrix[curr_path[level-1]][i];
            curr_bound = temp;
 
            // Also reset the visited array
            for(var j = 1; j <= N; j++){
            	visited[j] = false;
            }
            for (var j=0; j<=level-1; j++)
                visited[curr_path[j]] = true;
        }
    }
}





function secondMin(cost_matrix, i, N)
{
    var first = Number.MAX_VALUE; 
    var	second = Number.MAX_VALUE;
    for (var j=1; j<=N; j++)
    {
        if (i == j)
            continue;
 
        if (cost_matrix[i][j] <= first)
        {
            second = first;
            first = cost_matrix[i][j];
        }
        else if (cost_matrix[i][j] <= second &&
                 cost_matrix[i][j] != first)
            second = cost_matrix[i][j];
    }
    return parseInt(second);
}

function firstMin(cost_matrix, i, N)
{
    var min = Number.MAX_VALUE;
    for (var k=1; k<=N; k++)
        if (cost_matrix[i][k]<min && i != k)
            min = cost_matrix[i][k];
    return parseInt(min);
}

function copyToFinal(curr_path, final_path)
{
    for (var i=0; i<N; i++)
        final_path[i] = curr_path[i];
    final_path[N] = curr_path[0];
}

function draw_lines(final_path, N){
	var v1;
	var v2;

	
	for(var i =0; i < N; i++){
		v1 = vertices[final_path[i]-1];
		v2 = vertices[final_path[i + 1]-1];
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.lineWidth=5;
		ctx.beginPath();
		ctx.moveTo(v1.x,v1.y);
		ctx.lineTo(v2.x, v2.y);
		ctx.stroke();

	}



}