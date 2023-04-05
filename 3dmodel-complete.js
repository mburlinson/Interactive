<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" integrity="sha512-334uBDwY0iZ2TklV1OtDtBW9vp7jjP7SWRzT7Ehu1fdtPIjTpCwTSFb8HI/YBau9L1/kRBEOALrS229Kry4yFQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.141.0/examples/js/loaders/GLTFLoader.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.141.0/examples/js/controls/OrbitControls.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.min.js"></script>

<script>
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 1
    camera.position.y = 1
    camera.position.z = 1
    scene.add(camera)

    // Controls
    const controls = new THREE.OrbitControls(camera, canvas)
    controls.enableDamping = true

// Lights
 
// Ambient light
const ambientLight = new THREE.AmbientLight(0x404040)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(1, 1, 1)
scene.add(directionalLight)

// Point light
const pointLight = new THREE.PointLight(0xffffff, 1, 100)
pointLight.position.set(0, 3, 3)
scene.add(pointLight)


/**
 * GLTF Model
 */
const loader = new THREE.GLTFLoader();
let model;
loader.load('https://mburlinson.github.io/Interactive/scene.gltf', function (gltf) {
  console.log('Model loaded:', gltf.scene);
  model = gltf.scene;
  model.scale.set(1, 1, 1);
  scene.add(model);
  zoomCameraToFit(model); // Call zoomCameraToFit() here

  // Compute the centroid of the model
  const bbox = new THREE.Box3().setFromObject(model);
  const centroid = new THREE.Vector3();
  bbox.getCenter(centroid);

  // Set the initial camera position to the centroid
  camera.position.copy(centroid);
  controls.target.copy(centroid);
  controls.update();

  // Enable the buttons
  const buttons = document.querySelectorAll('.button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('disabled');
    buttons[i].classList.add('enabled');
  }

  // Set the model to fit the screen
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3()).length();
  const center = box.getCenter(new THREE.Vector3());
  const boundingSphereRadius = box.getBoundingSphere(new THREE.Sphere()).radius;

  // Update camera position and target
  camera.position.copy(center);
  camera.position.z += size;
  controls.target.copy(center);

  // Set the minimum distance to the model to be the model's radius
  controls.minDistance = boundingSphereRadius * 2;


});




/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let lastElapsedTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    // Update controls
    controls.update()

    // Model animation
    // model.rotation.y += 0.01

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

/**
 * Helper functions
 */
function zoomCameraToFit(object) {
  const boundingBox = new THREE.Box3()
  if (object) {
    boundingBox.setFromObject(object)
  } else {
    console.warn('Unable to zoom camera to fit: object is undefined')
    return
  }
  
  const center = boundingBox.getCenter(new THREE.Vector3())
  const size = boundingBox.getSize(new THREE.Vector3()).length()
  const offset = size / Math.sqrt(3)
  const direction = controls.target.clone().sub(camera.position).normalize()
  camera.position.copy(center)
  camera.position.add(direction.multiplyScalar(offset))
  controls.target.copy(center)
}


function animateToPosition(targetPos, targetQuaternion, duration) {
  const startPos = camera.position.clone()
  const startQuaternion = camera.quaternion.clone()

  const endTime = performance.now() + duration

  function animate() {
    const time = performance.now()
    const t = Math.min(1, (time - endTime) / duration)

    const pos = startPos.clone().lerp(targetPos, t)
    const quaternion = startQuaternion.clone().slerp(targetQuaternion, t)

    camera.position.copy(pos)
    camera.quaternion.copy(quaternion)

    if (t < 1) {
      requestAnimationFrame(animate)
    }
  }

  animate()




  const direction = controls.target.clone().sub(camera.position).normalize()
  camera.position.copy(center)
  camera.position.add(direction.multiplyScalar(offset))
  controls.target.copy(center)
}


function setViewPosition1() {
  const center = new THREE.Vector3(0, 0, 0);
  camera.position.set(0, 3, 0);
  camera.lookAt(center);
  controls.target.copy(center);
  zoomCameraToFit(model);
  const targetPos = new THREE.Vector3(0, 3, 0)
  const targetQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI)
  animateToPosition(targetPos, targetQuaternion, 1000)

}

function setViewPosition2() {
  const center = new THREE.Vector3(0, 0, 0);
  camera.position.set(0, 0, -3);
  camera.lookAt(center);
  controls.target.copy(center);
  zoomCameraToFit(model);
  const targetPos = new THREE.Vector3(0, 0, -3);
  const targetQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
  animateToPosition(targetPos, targetQuaternion, 1000)

}

function setViewPosition3() {
  const center = new THREE.Vector3(0, 0, 0);
  camera.position.set(-3, 0, 0);
  camera.lookAt(center);
  controls.target.copy(center);
  zoomCameraToFit(model);
  const targetPos = new THREE.Vector3(-3, 0, 0);
  const targetQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
  animateToPosition(targetPos, targetQuaternion, 1000)

}

</script>
