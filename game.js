var x=0,y=10,e,score=0;


var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var wall = new Image();

wall.src = "wall.png";

var obst = [];

obst[0] = {
    x : c.width,
    y : -102
};

function updateLocation(e)
{
	//var e = window.event;

	
	y =  (e.clientY)/6;
	console.log(e.clientY);

	if(y>140)
	{
		y=140;
		x=(e.clientY)/20;
	}
	if(y<10)
	{
		y=10;
		x=(e.clientY)/20;
	}

	
}


function draw()
{
	//ctx.drawImage(wall,100,-162);
	//ctx.drawImage(wall,100,25);

	ctx.clearRect(0,0,c.width,c.height);



	ctx.beginPath();
	ctx.arc(30,y,10,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();
	ctx.closePath();




	for(var i = 0; i < obst.length; i++){
        
        
        ctx.drawImage(wall,obst[i].x,obst[i].y);
        ctx.drawImage(wall,obst[i].x,obst[i].y+192);
             
        obst[i].x--;

        score++;
        
        if( obst[i].x == 225 ){
            obst.push({
                x : c.width,
                y : Math.floor(Math.random()*120)-162
            }); 
        }

        if( 40 >= obst[i].x && 20 <= obst[i].x + 14 && (y-10 <= obst[i].y + 162 || y+10 >= obst[i].y+192)){
            location.reload(); // reload the page
        }
        
        
    }

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,c.height-20);

	requestAnimationFrame(draw);
}

draw();