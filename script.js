import { Vector3D } from "./vector3D.js";
import { Scene } from "./scene.js";
import { Camera } from "./camera.js";
import { Plane } from "./plane.js";
import { RayCaster } from "./raycaster.js";
import { Sphere } from "./sphere.js";
import { Color } from "./color.js";
import { Light } from "./light.js";
import { Material } from "./material.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const camera = new Camera(new Vector3D(0, 0, 1));
const plane = new Plane(new Vector3D(-1, 1, 0), new Vector3D(1, 1, 0), new Vector3D(-1, -1, 0), new Vector3D(1, -1, 0));
const material1 = new Material(new Color(0.6, 0.3, 0.3), new Color(1, 0.2, 0.2), new Color(0.8,0.8,0.8), 30);
const sphere1 = new Sphere(new Vector3D(-1, -1, -1), 0.2, material1);
const material2 = new Material(new Color(0.2, 0.7, 0.2), new Color(0.5, 1, 0.5), new Color(0.8,0.8,0.8), 30);
const sphere2 = new Sphere(new Vector3D(0, 0.0, -1), 0.5, material2);
const material3 = new Material(new Color(0.5, 0.5, 1), new Color(0.5, 0.5, 1), new Color(0.8,0.8,0.8), 30);
const sphere3 = new Sphere(new Vector3D(1.2, -0.0, -1.5), 0.4, material3);
const light1 = new Light(new Vector3D(-2, 0,0), new Color(1, 1,1), Color.white()); 
const scene = new Scene(plane, camera,[sphere1, sphere2, sphere3],[light1], new Color(1, 1, 1));
const raycaster = new RayCaster(camera,scene, height, width);


function render(timestamp){
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            let ray = raycaster.castRay(x, y);
            let ts = scene.computeInterserct(ray);
            if(ts.length == 0){
                drawPixel(x, y, "black");
                continue;
            }
            let color = scene.computeColor(ray, ts[0]);
            drawPixel(x, y, color);
        }
    }
    requestAnimationFrame(render);
}

function drawPixel(x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            camera.placement.y += 0.1;
            break;
        case "ArrowDown":
            camera.placement.y -= 0.1;
            break;
        case "ArrowLeft":
            camera.placement.x -= 0.1;
            break;
        case "ArrowRight":
            camera.placement.x += 0.1;
            break;
        case "w":
            camera.placement.z -= 0.1;
            break;
        case "s":
            camera.placement.z += 0.1;
            break;
    }
});

requestAnimationFrame(render);
