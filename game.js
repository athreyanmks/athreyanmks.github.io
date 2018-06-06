var x=0,y=10,e,score=0,k=0,t=20,health=100,laserx=0,lasery=0,flaser=0,go=0,my=0,mx=0;


var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var wall = new Image();
var jet = new Image();
var bg = new Image();
var aa = new Image();
var fb = new Image();
var lsr = new Image();

wall.src = "wall3.png";
jet.src = "deepjet.png";
bg.src ="bg5.png";
aa.src ="aa.png";
fb.src ="fireball.png";
lsr.src ="laser.png";

var fly = new Audio();

fly.src = "jet3.mp3" 

var obst = [];

obst[0] = {
    x : c.width,
    y : -102,
    faa: 0,
    aay: 0,
    projx: 0
};





function updateLocation(e)
{
	//var e = window.event;

	my=e.clientY/6;
	mx=e.clientX;
	
	y =  (e.clientY)/6;
	console.log(e.clientX);

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

	


	ctx.drawImage(bg,0,0);
	fly.play();

	if(k<y)
		k+=1.5;
	if(k>y)
		k-=1.5;


	

	

	if(flaser == 1)
        {
        	ctx.drawImage(lsr,laserx,lasery);
        }

    laserx++;    


	for(var i = 0; i < obst.length; i++){
        
        
        ctx.drawImage(wall,obst[i].x,obst[i].y);
        ctx.drawImage(wall,obst[i].x,obst[i].y+192);
             
        obst[i].x--;
        obst[i].projx-=2;

        
        
        if( obst[i].x == 200 ){
            obst.push({
                x : c.width,
                y : Math.floor(Math.random()*120)-162,
                faa : Math.random(),
                aay : 0,
                projx : 0

            });
            console.log(obst[obst.length-1].faa);
            obst[obst.length-1].aay = obst[obst.length-1].y + 173;
            obst[obst.length-1].projx = obst[obst.length-1].x + 3;
        }

        if( 40 >= obst[i].x && 20 <= obst[i].x + 14 && (k-10 <= obst[i].y + 162 || k+10 >= obst[i].y+192)){
        	--t;
             
        }

       if( laserx+3 >= obst[i].x && laserx <= obst[i].x + 14 && (lasery <= obst[i].y + 162 || lasery+2 >= obst[i].y+192)&& flaser == 1){
            flaser = 0; 
        }
        
        if(t<0)
        {
        	go=1;
        	fly.pause();
        }

        if(flaser==1 && laserx+3>obst[i].x && laserx<obst[i].x+15 && obst[i].aay<=lasery && obst[i].aay+7>=lasery+2)
        {
        	flaser = 0;
        	obst[i].faa = 0;
        }

        if(obst[i].projx<t+20 && obst[i].projx+3> t+20 && obst[i].aay+5>k-10 && obst[i].aay+2<k+10 && obst[i].faa>0.75 )
        {
        	obst[i].projx = obst[i].x-3;
        	health-=10;
        }

        

        if(obst[i].faa > 0.75)
        {
        	ctx.drawImage(aa,obst[i].x,obst[i].aay);
        	ctx.drawImage(fb,obst[i].projx,obst[i].aay+2);
        }

        if(i!=0)
        {	
        if(obst[i].projx<obst[i-1].x+14)
        {
        	obst[i].projx = obst[i].x-3;
        }
    	}

        if(health<=0)
        {
        	go=1;
        	fly.pause();
        }

    }

    

    ctx.drawImage(jet,t,k-10);

    ctx.fillStyle = "#000";
    ctx.font = "10px Verdana";
    ctx.fillText("Score : "+score,0,c.height);

    ctx.fillStyle = "#000";
    ctx.font = "10px Verdana";
    ctx.fillText("Structural Integrity : "+health,0,10);

    if(go==0)
    {
	requestAnimationFrame(draw);
	}

	if(go==1)
	{
		endScreen();
	}
}

function fire()
{
	if(go==1)
	{
		if(mx>834&&mx<1141&&my>90&&my<104)
		{
			location.reload()
		}
	}
	
	else
	{
	if(flaser==0)
	{	flaser = 1;
		lasery = k-1;
		laserx = t+20;
	}	
	}
}

function endScreen()
{

	ctx.clearRect(0,0,c.width,c.height);


	ctx.fillStyle = "#000";
    ctx.font = "40px Verdana";
    ctx.fillText("Game Over",40,80);

    ctx.rect(127,90,58,14);
    ctx.stroke();

    ctx.fillStyle = "#000";
    ctx.font = "10px Verdana";
    ctx.fillText("Play Again",130,100);


}
draw();