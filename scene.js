export class Scene{
    constructor(plane,camera,objects,lights,intensity) {
        this.plane = plane;
        this.camera = camera;
        this.objects = objects;
        this.lights = lights;
        this.intensity = intensity;
    }
}