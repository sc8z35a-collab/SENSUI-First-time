// simple collider primitives for props (spheres, oriented boxes)
import * as THREE from 'three';

const _p = new THREE.Vector3(), _q = new THREE.Vector3();

export class SphereCollider {
  constructor(center, radius) { this.center = center.clone(); this.radius = radius; }
  test(p, r) {
    const d = p.distanceTo(this.center);
    const pen = this.radius + r - d;
    if (pen <= 0) return null;
    return { depth: pen, normal: p.clone().sub(this.center).divideScalar(d || 1) };
  }
}

export class BoxCollider {
  // matrix: world transform of a unit box scaled by half extents
  constructor(center, half, quat = new THREE.Quaternion()) {
    this.center = center.clone(); this.half = half.clone(); this.quat = quat.clone(); this.inv = quat.clone().invert();
    this.radius = half.length();
  }
  test(p, r) {
    _p.copy(p).sub(this.center).applyQuaternion(this.inv);
    _q.set(THREE.MathUtils.clamp(_p.x, -this.half.x, this.half.x), THREE.MathUtils.clamp(_p.y, -this.half.y, this.half.y), THREE.MathUtils.clamp(_p.z, -this.half.z, this.half.z));
    const inside = _q.equals(_p);
    if (inside) {
      // push out along the smallest penetration axis
      const dx = this.half.x - Math.abs(_p.x), dy = this.half.y - Math.abs(_p.y), dz = this.half.z - Math.abs(_p.z);
      const n = new THREE.Vector3();
      let depth;
      if (dx < dy && dx < dz) { n.set(Math.sign(_p.x), 0, 0); depth = dx + r; } else if (dy < dz) { n.set(0, Math.sign(_p.y), 0); depth = dy + r; } else { n.set(0, 0, Math.sign(_p.z)); depth = dz + r; }
      return { depth, normal: n.applyQuaternion(this.quat) };
    }
    const d = _p.distanceTo(_q);
    if (d >= r) return null;
    return { depth: r - d, normal: _p.clone().sub(_q).divideScalar(d || 1).applyQuaternion(this.quat) };
  }
}
