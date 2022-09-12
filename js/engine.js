import { Vector3 } from "three";
import { fps, totalEnergy } from "./app";

const G = 6.617 * 1

export var physicsObjects = [];

var lastStep = Date.now();
var lastSecond = 0;
var frames = 1;

export const step = () => {
    const stepTime = Date.now()
    
    // ---- fps ----
    if (Math.floor(stepTime / 1000) !== lastSecond) {
        fps.innerText = frames
        lastSecond = Math.floor(stepTime / 1000)
        frames = 1;
    } else {frames++;}

    let updatedPositions = []

    physicsObjects.forEach(object => {
        physicsObjects.forEach(neighbour => {
            if (neighbour !== object) {
                const distance = object.mesh.position.distanceTo(neighbour.mesh.position);
                if (!distance) return

                const direction = new Vector3().subVectors(neighbour.mesh.position, object.mesh.position).normalize();
                // FUCKED, SHOULD NOT ADD GRAVITY EVERY STEP
                // TODO:
                //  - REMOVE STACKING OF GRAVITY FORCES
                object.vector.add(
                    direction.multiplyScalar(((object.mass * neighbour.mass) / (distance ** 2)) / object.mass)
                )
            }
        })

        // update position
        const positionChange = object.vector.clone().multiplyScalar((stepTime - lastStep) / 1000)
        updatedPositions.push(object.mesh.position.clone().add(positionChange))
    })

    // check collision
    physicsObjects.forEach((object, i) => {
        let newPosition = updatedPositions[i]
        
        physicsObjects.forEach(neighbour => {
            if (neighbour !== object) {
                const distance = newPosition.distanceTo(neighbour.mesh.position);
                if (!distance) return

                const minDistance = (object.radius + neighbour.radius)
                
                if (distance < minDistance) {
                    // console.log('touching', object.mass, neighbour.mass)
                    // console.log(object.vector)

                    newPosition = object.mesh.position
                    
                    // neighbour.applyForce(object.vector.clone().multiplyScalar(object.mass * 1.1))
                    // object.applyForce(neighbour.vector.clone().multiplyScalar(neighbour.mass * 1.1))
                } else {
                    // console.log('not touching', object.vector)
                }
            }
        })

        object.mesh.position.set(newPosition.x, newPosition.y, newPosition.z)
    })

    let energy = 0
    physicsObjects.forEach(object =>
        energy += (object.vector.x + object.vector.y + object.vector.z) * object.mass
    )
    totalEnergy.innerText = energy

    lastStep = Date.now()
}