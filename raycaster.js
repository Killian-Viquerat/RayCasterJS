import { Ray } from './ray.js';
import { Vector3D } from './vector3D.js';

export class RayCaster{
    constructor(camera, scene,height, width){
        this.camera = camera;
        this.scene = scene;
        this.height = height;
        this.width = width;
    }

    castRay(x, y) {
        let pourcentX = x / this.width;
        let pourcentY =  y / this.height;
        let top = Vector3D.lerp(this.scene.plane.topLeft, this.scene.plane.topRight, pourcentX);
        let bottom = Vector3D.lerp(this.scene.plane.bottomLeft, this.scene.plane.bottomRight, pourcentX);
        let position = Vector3D.lerp(top, bottom, pourcentY);
        return new Ray(position, position.sub(this.camera.placement));
    }
}