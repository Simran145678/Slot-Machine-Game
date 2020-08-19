//HARSIMRAN_KAUR__301088749

module Core
{
    export  class GameObject extends createjs.Bitmap   
   
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

        //constructors
        constructor(bitmap_asset:string,x:number=0,y:number=0,isCentered:boolean=false)
        {
            super(Config.Globals.AssetManifest.getResult(bitmap_asset));

            this.isCentered=isCentered;
            this.x=x;
            this.y=y;

        }
        
        //private methods
       m_recalculateSize():void
       {
        this.regX=this.getBounds().width*0.5;
        this.regX=this.getBounds().height*0.5;

       }
       

      
        
    }
}