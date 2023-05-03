import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import * as dat from "dat.gui";

const gui = new dat.GUI();

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

  // gsap
  const cube_position_animate = gsap.to(cube.position, {
    x: 5,
    duration: 5,
    yoyo: true,
    repeat: -1
  });

  window.addEventListener("resize", () => {
    // 更新摄像机的长宽比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像头投影
    camera.updateProjectionMatrix();
    // 更新渲染器的尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  window.addEventListener("dblclick", () => {
    if (cube_position_animate.isActive()) {
      cube_position_animate.pause();
    } else {
      cube_position_animate.resume();
    }
  });

  function init() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    dom.current.appendChild(renderer.domElement);
    renderer.render(scene, camera);

    // 创建一个OrbitControls控制器，并将其绑定到相机上
    new OrbitControls(camera, renderer.domElement);

    // 创建坐标轴辅助器并添加到场景中
    const axisHelper = new THREE.AxesHelper(5); // 参数为线段的长度
    scene.add(axisHelper);

    //gui
    gui.add(cube.position, "z").min(-10).max(10).name("z轴");
    gui.add(cube.position, "y", -10, 10).name("y轴");
    gui
      .addColor(
        {
          color: "#dc2727"
        },
        "color"
      )
      .onChange((value) => {
        cube.material.color.set(value);
      });
    requestAnimationFrame(animate);
  }

  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  useEffect(() => {
    init();
  }, []);

  return <div className="App" ref={dom}></div>;
}
