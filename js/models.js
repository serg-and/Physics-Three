import { Vector3 } from "three";
import * as T from 'three';
import { physicsObjects } from "./engine";

const required = (name) => {throw new Error(`missing required parameter: ${name}`)};

export class PhysicsObject {
  constructor(
    mass = required('mass'),
    position = new Vector3(),
    vector = new Vector3(), 
    radius = 1
  ) {
    this.mass = mass;
    this.vector = vector;
    this.radius = radius;
    this.mesh = new T.Mesh(
      new T.SphereGeometry(radius),
      new T.MeshStandardMaterial()
    );
    this.mesh.position.set(position.x, position.y, position.z);

    physicsObjects.push(this);
  }

  applyForce = (forceVector) => {
      this.vector.add(forceVector.divideScalar(this.mass))
    }
}