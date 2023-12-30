import * as THREE from 'three'
import "./style.css"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

//material
const scene = new THREE.Scene();
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({color:"#B0BF1A", })
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//light
const light = new THREE.PointLight(0xffffff, 300, 100)
light.position.set(-10, 10 ,10)
scene.add(light)

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height)
camera.position.z = 20
scene.add(camera)

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2) //smooth edges
renderer.render(scene, camera)

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//set autoRotate and its speed
controls.autoRotate=true;
controls.autoRotateSpeed =5

//disable moving and zooming the mesh
// controls.enablePan = false
// controls.enableZoom = false

//Resize
window.addEventListener('resize', () =>{
  //update Sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //update Camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () =>{
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}

loop()

//Timeline
const tl = gsap.timeline({defaults:{duration:1}})
tl.fromTo(mesh.scale, {x:0, y:0, z:0}, {x:1, y:1, z:1})
tl.fromTo("nav", {y: "-100%"}, { y: "0%"})
tl.fromTo(".title", {opacity: 0}, {opacity:1})

//Mouse Event
let mouseDown = false
let rgb = []
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))

window.addEventListener('mousemove', (e)=>{
  if(mouseDown){
    rgb = [
      Math.round((e.pageX / sizes.width)*255),
      Math.round((e.pageY / sizes.height)*255),
      150,
    ]

    //Animate Color
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`)
    gsap.to(mesh.material.color,{
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    })
  }
})