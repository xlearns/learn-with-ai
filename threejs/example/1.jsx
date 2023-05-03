import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

export default function App() {
  const clock = new THREE.Clock();

  const dom = useRef();
  // 1.scene
  const scene = new THREE.Scene();
  // 2.camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // 3.set camera position
  camera.position.set(2, 2, 10);

  // 4.add geometry
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: "red" });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // 4.renderer
  const renderer = new THREE.WebGLRenderer();

  function init() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    dom.current.appendChild(renderer.domElement);
    renderer.render(scene, camera);

    // 创建一个OrbitControls控制器，并将其绑定到相机上
    new OrbitControls(camera, renderer.domElement);

    // 创建坐标轴辅助器并添加到场景中
    const axisHelper = new THREE.AxesHelper(5); // 参数为线段的长度
    scene.add(axisHelper);

    requestAnimationFrame(animate);
  }

  function animate() {
    const deltaTime = clock.getElapsedTime();
    // x = v * t
    cube.position.x = (deltaTime * 1) % 5;

    // const deltaTime = clock.getDelta();
    // if (cube.position.x > 5) {
    //   cube.position.x = 0;
    // }
    // cube.position.x += deltaTime;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  useEffect(() => {
    init();
  }, []);

  return <div className="App" ref={dom}></div>;
}
