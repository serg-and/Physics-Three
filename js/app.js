import * as THREE from 'three';
import { SkeletonHelper } from 'three';
import { Vector3 } from 'three';
import { step } from './engine';
import {PhysicsObject} from './models';

// <-- Setup Scene
export const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);

const pointLight = new THREE.PointLight(0xFF0000);
pointLight.position.set(15, 50, 5);
scene.add(pointLight);
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.4);
scene.add(ambientLight);
// Setup Scene -->


{ 
  const statsText = document.createElement('div')
  statsText.style.position = 'absolute'
  statsText.style.color = 'white'
  document.body.appendChild(statsText)

  const totalEnergyText = document.createElement('div')
  totalEnergyText.style.display = 'flex'
  statsText.appendChild(totalEnergyText)

  const prefixTotalEnergy = document.createElement('div')
  prefixTotalEnergy.innerText = 'Total energry:'
  totalEnergyText.appendChild(prefixTotalEnergy)

  var totalEnergyValue = document.createElement('div')
  totalEnergyValue.innerText = '0'
  totalEnergyValue.style.marginLeft = '10px'
  totalEnergyText.appendChild(totalEnergyValue)

  const fpsText = document.createElement('div')
  fpsText.style.display = 'flex'
  statsText.appendChild(fpsText)

  const prefixFps = document.createElement('div')
  prefixFps.innerText = 'FPS:'
  fpsText.appendChild(prefixFps)

  var fpsValue = document.createElement('div')
  fpsValue.style.marginLeft = '10px'
  fpsText.appendChild(fpsValue)
}
export const totalEnergy = totalEnergyValue
export const fps = fpsValue

// const object1 = new PhysicsObject(10, new Vector3(0, 0, 0), new Vector3(0, 0, 0), 3);
// scene.add(object1.mesh)

// const object2 = new PhysicsObject(10, new Vector3(6, 0, 0));
// scene.add(object2.mesh)
// object2.applyForce(new Vector3(0, 50, 0))

const object3 = new PhysicsObject(10, new Vector3(0, -20, 0));
scene.add(object3.mesh)
object3.applyForce(new Vector3(-3, 0, 0))

const object4 = new PhysicsObject(10, new Vector3(0, 20, 0));
scene.add(object4.mesh)
object4.applyForce(new Vector3(3, 0, 0))

// const object4 = new PhysicsObject(2, new Vector3(-5, 0, 0));
// scene.add(object4.mesh)
// const object5 = new PhysicsObject(2, new Vector3(5, 0, 0));
// scene.add(object5.mesh)

// const object3 = new PhysicsObject(1, new Vector3(-9, 0, 0));
// scene.add(object3.mesh)
// object3.applyForce(new Vector3(0, -110, 0))


// for (let i = 0; i < 50; i++) {
//   const r = new PhysicsObject(
//     Math.floor((Math.random() * 18) + 10) / 10,
//     new Vector3(
//       Math.floor(Math.random() * 80) - 40,
//       Math.floor(Math.random() * 80) - 40,
//       0
//     ),
//     // new Vector3(
//     //   Math.floor(Math.random() * 80) - 40,
//     //   Math.floor(Math.random() * 80) - 40,
//     //   Math.floor(Math.random() * 80) - 40
//     // )
//   )

//   scene.add(r.mesh)
// }

// const line = new THREE.Line(
//   new THREE.BufferGeometry().setFromPoints([
//     new Vector3(-10, 0, 0),
//     new Vector3(10, 0, 0)
//   ]),
//   new THREE.LineBasicMaterial( { color: 0x00ff00 } )
// )
// scene.add(line)

const renderLoop = async () => {
  requestAnimationFrame(renderLoop)
  step();
  renderer.render(scene, camera)
}
renderLoop()