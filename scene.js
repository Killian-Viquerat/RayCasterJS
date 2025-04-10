import { Color } from "./color.js";

export class Scene{
    constructor(plane,camera,objects,lights,intensity) {
        this.plane = plane;
        this.camera = camera;
        this.objects = objects;
        this.lights = lights;
        this.intensity = intensity;
    }

    computeInterserct(ray){
        let ts = []
        for(let object of this.objects){
            let t = object.intersect(ray);
            if(t != null){
                ts.push({object: object,inter: t});
            }
        }
        return ts.sort((a, b) => a.inter > b.inter);
    }

    computeColor(ray, t){
        let p = ray.origin.add(ray.direction.amplitude(t.inter));
        let n = t.object.normal(p);
        let color = Color.black();
        for(let light of this.lights){
            let l = light.position.sub(p).normalized();
            let d = n.dot(l);
            if(d > 0){
                let diff = t.object.material.diffuse.multiply(light.diffuse).scale(d);
                color.add(diff);
            }
            let r = n.amplitude(2 * d).sub(l);
            let v = this.camera.placement.sub(p).normalized();
            let s = t.object.material.specular.multiply(light.specular).scale(Math.pow(v.dot(r), t.object.material.shininess));
            color.add(s);
        }
        let amb = t.object.material.ambiant.multiply(this.intensity);
        color.add(amb); 
        color.clamp();
        return color;
    }
}