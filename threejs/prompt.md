## 搭建一个最简单的 threejs 页面需要那些 three 元素,比如 scene

- 场景（Scene）：用于存储和管理所有的 3D 对象、灯光和相机。您可以使用 THREE.Scene()构造函数创建一个场景
- 相机（Camera）：定义了观察场景的位置和方向。在 Three.js 中有多种类型的相机可供选择，如透视相机(THREE.PerspectiveCamera)和正交相机(THREE.OrthographicCamera)。您需要将相机添加到场景中。
- 渲染器（Renderer）：用于将场景渲染到屏幕上。常见的渲染器包括 WebGL 渲染器(THREE.WebGLRenderer)和 Canvas 渲染器(THREE.CanvasRenderer)。您需要通过 new THREE.WebGLRenderer()或 new THREE.CanvasRenderer()来创建一个渲染器，并将其添加到页面中。
- 几何体（Geometry）：由顶点和面组成，用于定义模型的形状。Three.js 提供了许多内置的几何体，如立方体(THREE.BoxGeometry)和球体(THREE.SphereGeometry)等，您也可以通过自定义顶点和面来创建自己的几何体。
- 材质（Material）：用于定义几何体的外观，如颜色、纹理等。在 Three.js 中有许多类型的材质可供选择，如基础材质(THREE.MeshBasicMaterial)、光泽材质(THREE.MeshPhongMaterial)等。
- 网格（Mesh）：将几何体和材质结合起来，用于在场景中显示 3D 模型。您需要创建一个网格对象，并将其添加到场景中

### 最小代码

```js
// 1.scene
const scene = new THREE.Scene();
// 2.camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 3.renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4.render scene camera
renderer.render(scene, camera);
```

## 相机

### 设置相机阻尼感

### 透视相机与正交相机

## 光源

## geometry【几何体】

## 材质

## 纹理

## 材质与纹理区别

### 顶点

- 一个顶点（Vertex）是由其三维坐标组成的一个点
- 在渲染 3D 场景时，每个物体都是由许多个顶点构成的，这些顶点连接在一起形成了面（Face），每个面则决定了物体的外观和形状

### uv

- UV 是指一种纹理坐标系统，用于将纹理映射到几何形状上。UV 坐标通常被定义为一个二元组 (u, v)，它们描述了纹理上的位置
- 每个顶点都可以分配一个或多个 UV 坐标，以确定其在纹理图像中所处的位置。这些 UV 坐标随后与几何形状的三角形面相对应，从而将纹理映射到几何形状

### normal

- 是指一个三角面片上的法向量。法向量是垂直于平面的向量，用来描述几何形状的朝向和方向
- 每个三角形面片都有一个法向量，它是由三角形面片的三个顶点生成的。在向量空间中，法向量通常被标准化为长度为 1 的单位向量，以便进行计算和比较。
- 过使用法向量，我们可以计算出表面上的光照效果，并确定物体是否对光线产生反射或折射等影响。例如，在渲染一个球体时，法向量可以帮助我们确定光线从哪个方向照射到球体表面，并根据光源和材质属性计算出表面上每个点的颜色和亮度。

## gsap 动画

## three.js 自适应屏幕

```js
window.addEventListener("resize", () => {
  // 更新摄像机的长宽比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像头投影
  camera.updateProjectionMatrix();
  // 更新渲染器的尺寸
  renderer.setSize(window.innerWidth, window.innerHeight);
});
```

## three.js 全屏

- 指定 three.js 渲染元素全屏`renderer.domElement.requestFullscreen()`
- 退出全屏`document.exitFullscreen()`
- 判断元素全屏`document.fullscreenElement`

## dat.gui 的使用
