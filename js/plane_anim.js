/* 3D Plane Animation Logic */

let planeModel = null;
let isFlying = false;
let onCompleteCallback = null;
let renderer = null;
let container = null;

function initPlaneAnimation() {
    container = document.getElementById('three-container');
    if (!container) return;

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 0, 300); // Fixed camera
    camera.lookAt(0, 0, 0);

    // RENDERER
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // LIGHTS
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 200, 100);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Add blue point light for sci-fi effect
    const blueLight = new THREE.PointLight(0x3b82f6, 2, 500);
    blueLight.position.set(0, -50, 50);
    scene.add(blueLight);

    // MODEL LOADING
    const loader = new THREE.FBXLoader();

    loader.load('download/falcon2.fbx', function (object) {
        planeModel = object;

        // Normalize size
        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        // Scale to be reasonably large on screen
        const scaleFactor = 100 / maxDim;
        object.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // Position at bottom of screen
        // In this camera setup (z=300), visible Y range is approx -120 to +120
        object.position.y = -200; // Start completely off-screen bottom
        object.position.x = 0;
        object.position.z = 0;

        // Orientation
        // Make sure it faces UP and Top of plane faces camera or similar
        // Adjust these based on the specific model axis
        object.rotation.x = Math.PI / 2; // Usually faces +Z, rotate 90deg X to face Up (+Y)
        object.rotation.y = Math.PI; // Flip if needed to show top/bottom correctly

        scene.add(object);

    }, undefined, function (e) {
        console.error("Error loading falcon2.fbx:", e);
    });

    // ANIMATION LOOP
    function animate() {
        requestAnimationFrame(animate);

        if (planeModel && isFlying) {
            // Accelerate plane
            planeModel.position.y += 3.5;

            // Camera Follow Logic REMOVED - Fixed camera

            // Add slight roll/sway to plane for realism
            planeModel.rotation.z = Math.sin(Date.now() * 0.005) * 0.05;

            // Termination condition
            if (planeModel.position.y > 300) { // Reduced limit since camera is at 0
                isFlying = false;
                if (onCompleteCallback) {
                    onCompleteCallback();
                }
            }
        }

        renderer.render(scene, camera);
    }
    animate();

    // RESIZE HANDLER
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Global Launch Function
window.launchPlane = function (callback) {
    // If scene not inited yet (should be), try init
    if (!renderer) initPlaneAnimation();

    if (container) {
        container.style.display = 'block'; // Make visible
    }

    isFlying = true;
    onCompleteCallback = callback;
};

// Initialize scene immediately to load assets
document.addEventListener('DOMContentLoaded', () => {
    initPlaneAnimation();
});
