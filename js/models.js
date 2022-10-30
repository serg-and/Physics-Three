import { Vector3 } from "three";
import * as T from 'three';
import { physicsObjects } from "./engine";
import { scene } from "./app";
import settings from "./settings";

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
    this.lastGravityVector = new Vector3();

    physicsObjects.push(this);

    if (settings.renderVectorLine) this.createVectorLine()
    if (settings.renderForceVectorLine) this.createForceVectorLine()
  }

  applyForce = (forceVector) => {
      this.vector.add(forceVector.divideScalar(this.mass))
    }
  
  createVectorLine = () => {
    this.vectorLine = new T.Line(
      new T.BufferGeometry().setFromPoints([]),
      new T.LineBasicMaterial( { color: 0x00ff00, depthTest: false } )
    )
    this.updateVectorLine()
    this.vectorLine.renderOrder = 1
    scene.add(this.vectorLine)
  }

  updateVectorLine = () => {
    const vectorEndPoint = new Vector3().copy(this.mesh.position)
    vectorEndPoint.add(this.vector)

    this.vectorLine.geometry.setFromPoints([
      this.mesh.position,
      vectorEndPoint
    ])
  }

  createForceVectorLine = () => {
    this.forceVectorLine = new T.Line(
      new T.BufferGeometry().setFromPoints([]),
      new T.LineBasicMaterial( { color: 0x0000ff, depthTest: false } )
    )
    this.updateVectorLine()
    this.forceVectorLine.renderOrder = 1
    scene.add(this.forceVectorLine)
  }

  updateForceVectorLine = forceVector => {
    const forceVectorEndPoint = new Vector3().copy(this.mesh.position)
    forceVectorEndPoint.add(forceVector)

    this.forceVectorLine.geometry.setFromPoints([
      this.mesh.position,
      forceVectorEndPoint
    ])
  }
}