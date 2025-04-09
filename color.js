export class Color{
    constructor(r,g,b){
        this.r = r;
        this.g = g;
        this.b = b;
    }
    
    add(color){
        this.r + color.r;
        this.g + color.g;
        this.b + color.b;
    }

    multiply(color){
        return new Color(
            this.r * color.r,
            this.g * color.g,
            this.b * color.b
        );
    }
    toString(){
        return `rgb(${this.transform(this.r)},${this.transform(this.g)},${this.transform(this.b)})`;
    }

    transform(value){
        return Math.floor(value * 255);
    }

    clamp(value){
        this.r = Math.max(0, Math.min(1, this.r));
        this.g = Math.max(0, Math.min(1, this.g));
        this.b = Math.max(0, Math.min(1, this.b));
    }

    static black(){
        return new Color(0,0,0);
    }
    static white(){
        return new Color(1,1,1);
    }

    static red(){
        return new Color(1,0,0);
    }
    static green(){
        return new Color(0,1,0);
    }
    static blue(){
        return new Color(0,0,1);
    }

}