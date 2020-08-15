module UIObjects
{
export class Label extends createjs.Text
{
//private fields
private m_isCentered: boolean;

//public properties
get isCentered():boolean
{
    return this.m_isCentered;
}

set isCentered(value:boolean)
{
    if(value)
        {
           this.m_recalculateSize();
        }
    else
    {
        this.regX =0;
        this.regY =0;
    }
    this.m_isCentered=value;
}

//constructor
constructor(text:string="", font_size:string="20px", font_family:string="Consolas", font_colour:string="000000",x:number=0,y:number=0,isCentered:boolean=false)
{
    super(text,font_size+" "+font_family,font_colour);

    this.isCentered=isCentered;
        

        
        this.x =x;
        this.y =y;
}


//private methods
m_recalculateSize():void
{
    this.regX=this.getMeasuredWidth()*0.5;
    this.regX=this.getMeasuredHeight()*0.5;

}

//public methods
public setText(new_text:string):void
    {
        this.text=new_text;
        if(this.isCentered)
        {
            this.m_recalculateSize();
        }
    }





}
}