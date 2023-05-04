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

  // 4.renderer
  const renderer = new THREE.WebGLRenderer();

  // 4.add geometry
  const geometry = new THREE.BoxGeometry();

  const material = new THREE.MeshBasicMaterial({
    // map: textureLoader
  });

  // 给材质添加纹理
  // load是异步的所以需要依靠回调函数
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    "https://docs-cn.aircode.io/_images/chatGPT-index/wecom-demo.jpg",
    (texture) => {
      material.map = texture;
      material.needsUpdate = true;
    }
  );

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // gsap
  const cube_position_animate = gsap.to(cube.position, {
    x: 5,
    duration: 5,
    yoyo: true,
    repeat: -1,
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




