import { Vector3D } from "./vector3D.js";
import { Scene } from "./scene.js";
import { Camera } from "./camera.js";
import { Plane } from "./plane.js";
import { RayCaster } from "./raycaster.js";
import { Sphere } from "./sphere.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const camera = new Camera(new Vector3D(0, 0, 1));
const plane = new Plane(new Vector3D(-1, 1, 0), new Vector3D(1, 1, 0), new Vector3D(-1, -1, 0), new Vector3D(1, -1, 0));
const sphere1 = new Sphere(new Vector3D(-1, 0.6, -2), 0.2, "red");
const sphere2 = new Sphere(new Vector3D(0, -0.2, -2), 0.5, "green");
const sphere3 = new Sphere(new Vector3D(0.8, -0.2, -2), 0.4, "blue");
const scene = new Scene(plane, camera,[sphere1, sphere2, sphere3]);
const raycaster = new RayCaster(camera,scene, height, width);

for(let y = 0; y < height; y++){
    for(let x = 0; x < width; x++){
        let ray = raycaster.castRay(x, y);
        for(let object of scene.objects){
            let t = object.intersect(ray);
            if(t != null){
                let color = object.color;
                drawPixel(x, y, color);
                break;
            }else{
                drawPixel(x, y, "black");
            }
        }
    }
}

function drawPixel(x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}
