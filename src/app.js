/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, OrthographicCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene } from 'scenes';

// Initialize core ThreeJS components
const scene = new SeedScene(960, 960 * window.innerHeight / window.innerWidth, document);
//const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// Set up camera
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 960;
const cameraHeight = cameraWidth / aspectRatio;
const camera = new OrthographicCamera(
    cameraWidth / -2, // left
    cameraWidth / 2, // right
    cameraHeight / 2, // top
    cameraHeight / -2, // bottom
    0, // near plane
    150 // far plane
);
camera.position.set(0, 0, 0.5);
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

var score_text = document.createElement('div');
score_text.style.position = 'absolute';
score_text.style.width = 100;
score_text.style.height = 100;
score_text.innerHTML = "Score: 0";
score_text.style.top = 0.09 * window.innerHeight + 'px';
score_text.style.left = 0.86 * window.innerWidth + 'px';
score_text.id = "score_text"
document.body.appendChild(score_text);

var game_over_text = document.createElement('div');
game_over_text.style.position = 'absolute';
game_over_text.style.width = 300;
game_over_text.style.height = 300;
game_over_text.innerHTML = "";
game_over_text.style.top = 0.5 * window.innerHeight + 'px';
game_over_text.style.left = 0.5 * window.innerWidth + 'px';
game_over_text.id = "game_over_text"
document.body.appendChild(game_over_text);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();
var dead = false;
// Render loop
const onAnimationFrameHandler = (timeStamp) => {
        controls.update();
        renderer.render(scene, camera);
        scene.update(timeStamp);
        window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();

    score_text.style.top = 0.09 * window.innerHeight + 'px';
    score_text.style.left = 0.86 * window.innerWidth + 'px';
    game_over_text.style.top = 0.5 * window.innerHeight + 'px';
    game_over_text.style.left = 0.5 * window.innerWidth + 'px';
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

document.body.onkeyup = function(e){
    if(e.key == ' '){
        scene.press();
    } else if (e.key == 'x') {
        if (scene.isDead()) {
            scene.restart();
            document.getElementById('game_over_text').innerHTML = ''
            document.getElementById('score_text').innerHTML = 'Score: 0';
        }
    }
}