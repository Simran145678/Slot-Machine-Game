module UIObjects
{
    export class Button extends Core.GameObject
    {
       //private fields
   

        //constructors
        constructor(bitmap_asset:string,x:number=0,y:number=0,isCentered:boolean=false)
        {
            super(bitmap_asset,x,y,isCentered)

            this.isCentered=isCentered;

        

            //mouse events
        this.on("mouseover", this.m_mouseOver);

        this.on("mouseout", this.m_mouseOut);

        }
        //private methods
       

        private m_mouseOver():void
        {
            this.alpha=0.7;
        }
        private m_mouseOut():void
        {
            this.alpha=1.0;
        }
        //public methods
        
    }
}