export class Sphere{
    constructor(position,radius,material){
        this.position = position;
        this.radius = radius;
        this.material = material;
    }

    intersect(ray){
        const cprim = ray.origin.sub(this.position);
        const a = ray.direction.dot(ray.direction);
        const b = 2 * ray.direction.dot(cprim);
        const c =  cprim.dot(cprim) - this.radius * this.radius;
        const delta = b * b - 4 * a * c;
        if(delta < 0){
            return null;
        }
        const t1 = (-b - Math.sqrt(delta)) / (2 * a);
        const t2 = (-b + Math.sqrt(delta)) / (2 * a);
        const t = Math.min(t1, t2);
        return t > 0 ? t : null;
    }

    normal(point){
        return point.sub(this.position).normalized();
    }
    
}