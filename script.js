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
const material1 = new Material(new Color(0.5, 0.5, 0.5), new Color(1, 0.5, 0.5), new Color(0.7,0.7,0,7), 30);
const sphere1 = new Sphere(new Vector3D(-1, 0.6, -2), 0.2, material1);
const material2 = new Material(new Color(0.5, 0.5, 0.5), new Color(0.5, 1, 0.5), new Color(0.7,0.7,0,7), 30);
const sphere2 = new Sphere(new Vector3D(0, -0.2, -2), 0.5, material2);
const material3 = new Material(new Color(0.5, 0.5, 0.5), new Color(0.5, 0.5, 1), new Color(0.7,0.7,0,7), 30);
const sphere3 = new Sphere(new Vector3D(0.4, -0.0, -1), 0.4, material3);
const light1 = new Light(new Vector3D(0, 3, -1), Color.white(), Color.white()); 
const scene = new Scene(plane, camera,[sphere1, sphere2, sphere3],[light1], new Color(0.5, 0.5, 0.5));
const raycaster = new RayCaster(camera,scene, height, width);


function render(){
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            let ray = raycaster.castRay(x, y);
            let color = new Color(0, 0, 0);
            let ts = []
            for(let object of scene.objects){
                let t = object.intersect(ray);
                if(t != null){
                    ts.push({object: object ,inter: t});
                }
            }
            if(ts.length == 0){
                drawPixel(x, y, "black");
                continue;
            }
            ts.sort((a, b) => a.inter > b.inter);
            let p = ray.origin.add(ray.direction.amplitude(ts[0].inter));
            let amb = ts[0].object.material.ambiant.multiply(scene.intensity);
            color.add(amb); 
            drawPixel(x,y,color);
        }
    }
}

function drawPixel(x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}

requestAnimationFrame(render);
