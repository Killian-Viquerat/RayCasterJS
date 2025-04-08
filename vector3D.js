export class Vector3D{
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    amplitude(amplitude){
        return new Vector3D(
            this.x * amplitude,
            this.y * amplitude,
            this.z * amplitude
        );
    }

    add(vector){
        return new Vector3D(
            this.x + vector.x,
            this.y + vector.y,
            this.z + vector.z
        )
    }
    
    sub(vector){
        return new Vector3D(
        this.x - vector.x,
        this.y - vector.y,
        this.z - vector.z
        )
    }

    static lerp(begin, end, t){
        return begin.amplitude(1-t).add(end.amplitude(t));
    }

}