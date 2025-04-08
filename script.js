import { Vector3D } from "./vector3D.js";
import { Scene } from "./scene.js";
import { Camera } from "./camera.js";
import { Plane } from "./plane.js";
import { RayCaster } from "./raycaster.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const camera = new Camera(new Vector3D(0, 0, -1));
const plane = new Plane(new Vector3D(-1, 1, 0), new Vector3D(1, 1, 0), new Vector3D(-1, -1, 0), new Vector3D(1, -1, 0));
const scene = new Scene(plane, camera);
const raycaster = new RayCaster(camera,scene, height, width);

for(let y = 0; y < height; y++){
    for(let x = 0; x < width; x++){
        let ray = raycaster.castRay(x, y);
        const r = Math.floor(map(ray.direction.x, -1, 1) * 255);
        const g = Math.floor(map(ray.direction.y, -1, 1) * 255);
        const b = Math.floor(ray.direction.z * 100);
        drawPixel(x, y, `rgb(${r},${g},${b})`);
    }
}

function map(value,min,max){
    return ((value - min) / (max - min));
}

function drawPixel(x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}
