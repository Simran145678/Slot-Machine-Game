var UIObjects;
(function (UIObjects) {
    class Button extends Core.GameObject {
        //private fields
        //constructors
        constructor(bitmap_asset, x = 0, y = 0, isCentered = false) {
            super(bitmap_asset, x, y, isCentered);
            this.isCentered = isCentered;
            //mouse events
            this.on("mouseover", this.m_mouseOver);
            this.on("mouseout", this.m_mouseOut);
        }
        //private methods
        m_mouseOver() {
            this.alpha = 0.7;
        }
        m_mouseOut() {
            this.alpha = 1.0;
        }
    }
    UIObjects.Button = Button;
})(UIObjects || (UIObjects = {}));
//# sourceMappingURL=button.js.map