class Point{
    constructor(x,y)
    {
        this.x=x;
        this.y=y;
       
    }
    getX()
    {
        return this.x;
    }
    getY()
    {
        return this.y;
    }
    equals(point) {
        return this.x === point.getX() && this.y === point.getY();
    }
}
class player{
    constructor()
    {
        this.Points=[];
        this.Ox=[];
        this.Oy=[];
        this.slashToRight=[];
        this.slashToLeft=[];

    }
    check(point)
    {
        if(point instanceof Point)
        {
            this.Points.push(point)
        } 
    }
    containsAllPoints(wholePoints,line) 
    {
        return line.every(lineitem => 
            wholePoints.some(item => item.equals(lineitem))
        );
    }
    checkWin()
    {      
       
        for(let i=0;i<this.Points.length;i++)
        {
            let midpoint=this.Points[i];
            //OX
            this.Ox.push(new Point(midpoint.getX()-1,midpoint.getY()))
            this.Ox.push(new Point(midpoint.getX(),midpoint.getY()))
            this.Ox.push(new Point(midpoint.getX()+1,midpoint.getY()))
           
            if(this.containsAllPoints(this.Points,this.Ox))
            {
                alert("You win Ox direction")
                break;
            }
            //OY
            this.Oy.push(new Point(midpoint.getX(),midpoint.getY()-1))
            this.Oy.push(new Point(midpoint.getX(),midpoint.getY()))
            this.Oy.push(new Point(midpoint.getX(),midpoint.getY()+1))
           
            if(this.containsAllPoints(this.Points,this.Oy))
            {
                alert("You win Oy direction")
                break;
            }
            
            //slashToRight
            this.slashToRight.push(new Point(midpoint.getX()-1,midpoint.getY()-1))
            this.slashToRight.push(new Point(midpoint.getX(),midpoint.getY()))
            this.slashToRight.push(new Point(midpoint.getX()+1,midpoint.getY()+1))
           
            if(this.containsAllPoints(this.Points,this.slashToRight))
            {
                alert("You win to right direction")
                break;
            }
            //slashToLeft
            this.slashToLeft.push(new Point(midpoint.getX()-1,midpoint.getY()+1))
            this.slashToLeft.push(new Point(midpoint.getX(),midpoint.getY()))
            this.slashToLeft.push(new Point(midpoint.getX()+1,midpoint.getY()-1))
            
            if(this.containsAllPoints(this.Points,this.slashToLeft))
            {
                alert("You win to left direction")
                break;
            }
            this.Ox=[]
            this.Oy=[]
            this.slashToLeft=[]
            this.slashToRight=[]
        }
            
    }
}
class bot{
    constructor()
    {
        this.Points=[];
        this.Ox=[];
        this.Oy=[];
        this.slashToRight=[];
        this.slashToLeft=[];

    }
    check(point)
    {
        if(point instanceof Point)
        {
            this.Points.push(point)
            return point
        } 
    }
    getRandomPoint(points) {
    let randomIndex = Math.floor(Math.random() * points.length);
    return points[randomIndex];
}
    containsAllPoints(wholePoints,line) 
    {
        return line.every(lineitem => 
            wholePoints.some(item => item.equals(lineitem))
        );
    }
    checkWin()
    {      
       
        for(let i=0;i<this.Points.length;i++)
        {
            let midpoint=this.Points[i];
            //OX
            this.Ox.push(new Point(midpoint.getX()-1,midpoint.getY()))
            this.Ox.push(new Point(midpoint.getX(),midpoint.getY()))
            this.Ox.push(new Point(midpoint.getX()+1,midpoint.getY()))
           
            if(this.containsAllPoints(this.Points,this.Ox))
            {
                alert("Bot win Ox direction")
                break;
            }
            //OY
            this.Oy.push(new Point(midpoint.getX(),midpoint.getY()-1))
            this.Oy.push(new Point(midpoint.getX(),midpoint.getY()))
            this.Oy.push(new Point(midpoint.getX(),midpoint.getY()+1))
           
            if(this.containsAllPoints(this.Points,this.Oy))
            {
                alert("Bot win Oy direction")
                break;
            }
            
            //slashToRight
            this.slashToRight.push(new Point(midpoint.getX()-1,midpoint.getY()-1))
            this.slashToRight.push(new Point(midpoint.getX(),midpoint.getY()))
            this.slashToRight.push(new Point(midpoint.getX()+1,midpoint.getY()+1))
           
            if(this.containsAllPoints(this.Points,this.slashToRight))
            {
                alert("Bot win to right direction")
                break;
            }
            //slashToLeft
            this.slashToLeft.push(new Point(midpoint.getX()-1,midpoint.getY()+1))
            this.slashToLeft.push(new Point(midpoint.getX(),midpoint.getY()))
            this.slashToLeft.push(new Point(midpoint.getX()+1,midpoint.getY()-1))
           
            if(this.containsAllPoints(this.Points,this.slashToLeft))
            {
                alert("Bot win to left direction")
                break;
            }
            this.Ox=[]
            this.Oy=[]
            this.slashToLeft=[]
            this.slashToRight=[]
        }
            
    }
}
var cells=document.querySelectorAll('.child')
var ngChoi=new player();
var ngMay= new bot();


cells.forEach(div => {
    div.addEventListener('click', function() {
        const row = Number(this.getAttribute('data-row'));
        const col = Number(this.getAttribute('data-col'));
        this.innerHTML = 'X';
        div.classList.add('player');
        ngChoi.check(new Point(col, row));
        ngChoi.checkWin();

        let emptyDivs = document.querySelectorAll('.child:not(.player):not(.bot)');
        let points = [];

        emptyDivs.forEach(emptyDiv => {
            const rowEmpty = Number(emptyDiv.getAttribute('data-row'));
            const colEmpty = Number(emptyDiv.getAttribute('data-col'));
            points.push(new Point(colEmpty, rowEmpty));
        });
        let point=ngMay.getRandomPoint(points)
        ngMay.check(point);

        let colValue = point.getX();
        let rowValue = point.getY();

        let selector = `.child:not(.player):not(.bot)[data-col="${colValue}"][data-row="${rowValue}"]`;
        let element = document.querySelector(selector);
        element.classList.add('bot');
        element.innerHTML='O'
        ngMay.checkWin();

        
    });
});





