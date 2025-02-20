import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// CSS2D Renderer
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';  // ✅ Allow OrbitControls to work
document.body.appendChild(labelRenderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.update();

// Create Notecard (HTML Element)
const notecardDiv = document.createElement('div');
notecardDiv.className = 'notecard';
notecardDiv.textContent = 'I follow the cube!';
notecardDiv.style.padding = '10px';
notecardDiv.style.background = 'rgba(255,255,255,0.8)';
notecardDiv.style.border = '1px solid black';

// Attach to Three.js Object
const notecardLabel = new CSS2DObject(notecardDiv);
notecardLabel.position.set(0, 1, 0);

// Periodic Table Elements with Groups (Full Table)
const elements = [
    { symbol: 'H', atomicNumber: 1, row: 0, col: 1, group: 'nonmetal' },
    { symbol: 'He', atomicNumber: 2, row: 0, col: 18, group: 'noble_gas' },
    
    { symbol: 'Li', atomicNumber: 3, row: 1, col: 1, group: 'alkali_metal' },
    { symbol: 'Be', atomicNumber: 4, row: 1, col: 2, group: 'alkaline_earth' },
    { symbol: 'B', atomicNumber: 5, row: 1, col: 13, group: 'metalloid' },
    { symbol: 'C', atomicNumber: 6, row: 1, col: 14, group: 'nonmetal' },
    { symbol: 'N', atomicNumber: 7, row: 1, col: 15, group: 'nonmetal' },
    { symbol: 'O', atomicNumber: 8, row: 1, col: 16, group: 'nonmetal' },
    { symbol: 'F', atomicNumber: 9, row: 1, col: 17, group: 'halogen' },
    { symbol: 'Ne', atomicNumber: 10, row: 1, col: 18, group: 'noble_gas' },

    { symbol: 'Na', atomicNumber: 11, row: 2, col: 1, group: 'alkali_metal' },
    { symbol: 'Mg', atomicNumber: 12, row: 2, col: 2, group: 'alkaline_earth' },
    { symbol: 'Al', atomicNumber: 13, row: 2, col: 13, group: 'post_transition' },
    { symbol: 'Si', atomicNumber: 14, row: 2, col: 14, group: 'metalloid' },
    { symbol: 'P', atomicNumber: 15, row: 2, col: 15, group: 'nonmetal' },
    { symbol: 'S', atomicNumber: 16, row: 2, col: 16, group: 'nonmetal' },
    { symbol: 'Cl', atomicNumber: 17, row: 2, col: 17, group: 'halogen' },
    { symbol: 'Ar', atomicNumber: 18, row: 2, col: 18, group: 'noble_gas' },

    { symbol: 'K', atomicNumber: 19, row: 3, col: 1, group: 'alkali_metal' },
    { symbol: 'Ca', atomicNumber: 20, row: 3, col: 2, group: 'alkaline_earth' },
    { symbol: 'Sc', atomicNumber: 21, row: 3, col: 3, group: 'transition_metal' },
    { symbol: 'Ti', atomicNumber: 22, row: 3, col: 4, group: 'transition_metal' },
    { symbol: 'V', atomicNumber: 23, row: 3, col: 5, group: 'transition_metal' },
    { symbol: 'Cr', atomicNumber: 24, row: 3, col: 6, group: 'transition_metal' },
    { symbol: 'Mn', atomicNumber: 25, row: 3, col: 7, group: 'transition_metal' },
    { symbol: 'Fe', atomicNumber: 26, row: 3, col: 8, group: 'transition_metal' },
    { symbol: 'Co', atomicNumber: 27, row: 3, col: 9, group: 'transition_metal' },
    { symbol: 'Ni', atomicNumber: 28, row: 3, col: 10, group: 'transition_metal' },
    { symbol: 'Cu', atomicNumber: 29, row: 3, col: 11, group: 'transition_metal' },
    { symbol: 'Zn', atomicNumber: 30, row: 3, col: 12, group: 'transition_metal' },
    { symbol: 'Ga', atomicNumber: 31, row: 3, col: 13, group: 'post_transition' },
    { symbol: 'Ge', atomicNumber: 32, row: 3, col: 14, group: 'metalloid' },
    { symbol: 'As', atomicNumber: 33, row: 3, col: 15, group: 'metalloid' },
    { symbol: 'Se', atomicNumber: 34, row: 3, col: 16, group: 'nonmetal' },
    { symbol: 'Br', atomicNumber: 35, row: 3, col: 17, group: 'halogen' },
    { symbol: 'Kr', atomicNumber: 36, row: 3, col: 18, group: 'noble_gas' },

    { symbol: "Rb", atomicNumber: 37, row: 4, col: 1, group: "alkali_metal" },
    { symbol: "Sr", atomicNumber: 38, row: 4, col: 2, group: "alkaline_earth" },
    { symbol: "Y", atomicNumber: 39, row: 4, col: 3, group: "transition_metal" },
    { symbol: "Zr", atomicNumber: 40, row: 4, col: 4, group: "transition_metal" },
    { symbol: "Nb", atomicNumber: 41, row: 4, col: 5, group: "transition_metal" },
    { symbol: "Mo", atomicNumber: 42, row: 4, col: 6, group: "transition_metal" },
    { symbol: "Tc", atomicNumber: 43, row: 4, col: 7, group: "transition_metal" },
    { symbol: "Ru", atomicNumber: 44, row: 4, col: 8, group: "transition_metal" },
    { symbol: "Rh", atomicNumber: 45, row: 4, col: 9, group: "transition_metal" },
    { symbol: "Pd", atomicNumber: 46, row: 4, col: 10, group: "transition_metal" },
    { symbol: "Ag", atomicNumber: 47, row: 4, col: 11, group: "transition_metal" },
    { symbol: "Cd", atomicNumber: 48, row: 4, col: 12, group: "transition_metal" },
    { symbol: "In", atomicNumber: 49, row: 4, col: 13, group: "post_transition" },
    { symbol: "Sn", atomicNumber: 50, row: 4, col: 14, group: "post_transition" },
    { symbol: "Sb", atomicNumber: 51, row: 4, col: 15, group: "metalloid" },
    { symbol: "Te", atomicNumber: 52, row: 4, col: 16, group: "metalloid" },
    { symbol: "I", atomicNumber: 53, row: 4, col: 17, group: "halogen" },
    { symbol: "Xe", atomicNumber: 54, row: 4, col: 18, group: "noble_gas" },
    { symbol: "Cs", atomicNumber: 55, row: 5, col: 1, group: "alkali_metal" },
    { symbol: "Ba", atomicNumber: 56, row: 5, col: 2, group: "alkaline_earth" },

    // Lanthanides & Actinides placed in their own row (row 5 & 6 for consistency)
    { symbol: 'La', atomicNumber: 57, row: 5, col: 3, group: 'lanthanide' },
    { symbol: 'Ce', atomicNumber: 58, row: 8, col: 4, group: 'lanthanide' },
    { symbol: 'Pr', atomicNumber: 59, row: 8, col: 5, group: 'lanthanide' },
    { symbol: 'Nd', atomicNumber: 60, row: 8, col: 6, group: 'lanthanide' },
    { symbol: 'Pm', atomicNumber: 61, row: 8, col: 7, group: 'lanthanide' },
    { symbol: 'Sm', atomicNumber: 62, row: 8, col: 8, group: 'lanthanide' },
    { symbol: 'Eu', atomicNumber: 63, row: 8, col: 9, group: 'lanthanide' },
    { symbol: 'Gd', atomicNumber: 64, row: 8, col: 10, group: 'lanthanide' },
    { symbol: 'Tb', atomicNumber: 65, row: 8, col: 11, group: 'lanthanide' },
    { symbol: 'Dy', atomicNumber: 66, row: 8, col: 12, group: 'lanthanide' },
    { symbol: 'Ho', atomicNumber: 67, row: 8, col: 13, group: 'lanthanide' },
    { symbol: 'Er', atomicNumber: 68, row: 8, col: 14, group: 'lanthanide' },
    { symbol: 'Tm', atomicNumber: 69, row: 8, col: 15, group: 'lanthanide' },
    { symbol: 'Yb', atomicNumber: 70, row: 8, col: 16, group: 'lanthanide' },
    { symbol: 'Lu', atomicNumber: 71, row: 8, col: 17, group: 'lanthanide' },

    { symbol: "Hf", atomicNumber: 72, row: 5, col: 4, group: "transition_metal" },
    { symbol: "Ta", atomicNumber: 73, row: 5, col: 5, group: "transition_metal" },
    { symbol: "W", atomicNumber: 74, row: 5, col: 6, group: "transition_metal" },
    { symbol: "Re", atomicNumber: 75, row: 5, col: 7, group: "transition_metal" },
    { symbol: "Os", atomicNumber: 76, row: 5, col: 8, group: "transition_metal" },
    { symbol: "Ir", atomicNumber: 77, row: 5, col: 9, group: "transition_metal" },
    { symbol: "Pt", atomicNumber: 78, row: 5, col: 10, group: "transition_metal" },
    { symbol: "Au", atomicNumber: 79, row: 5, col: 11, group: "transition_metal" },
    { symbol: "Hg", atomicNumber: 80, row: 5, col: 12, group: "transition_metal" },
    { symbol: "Tl", atomicNumber: 81, row: 5, col: 13, group: "post_transition" },
    { symbol: "Pb", atomicNumber: 82, row: 5, col: 14, group: "post_transition" },
    { symbol: "Bi", atomicNumber: 83, row: 5, col: 15, group: "post_transition" },
    { symbol: "Po", atomicNumber: 84, row: 5, col: 16, group: "metalloid" },
    { symbol: "At", atomicNumber: 85, row: 5, col: 17, group: "halogen" },
    { symbol: "Rn", atomicNumber: 86, row: 5, col: 18, group: "noble_gas" },
    { symbol: "Fr", atomicNumber: 87, row: 6, col: 1, group: "alkali_metal" },
    { symbol: "Ra", atomicNumber: 88, row: 6, col: 2, group: "alkaline_earth" },

    { symbol: 'Ac', atomicNumber: 89, row: 6, col: 3, group: 'actinide' },
    { symbol: 'Th', atomicNumber: 90, row: 9, col: 4, group: 'actinide' },
    { symbol: 'Pa', atomicNumber: 91, row: 9, col: 5, group: 'actinide' },
    { symbol: 'U', atomicNumber: 92, row: 9, col: 6, group: 'actinide' },
    { symbol: 'Np', atomicNumber: 93, row: 9, col: 7, group: 'actinide' },
    { symbol: 'Pu', atomicNumber: 94, row: 9, col: 8, group: 'actinide' },
    { symbol: 'Am', atomicNumber: 95, row: 9, col: 9, group: 'actinide' },
    { symbol: 'Cm', atomicNumber: 96, row: 9, col: 10, group: 'actinide' },
    { symbol: 'Bk', atomicNumber: 97, row: 9, col: 11, group: 'actinide' },
    { symbol: 'Cf', atomicNumber: 98, row: 9, col: 12, group: 'actinide' },
    { symbol: 'Es', atomicNumber: 99, row: 9, col: 13, group: 'actinide' },
    { symbol: 'Fm', atomicNumber: 100, row: 9, col: 14, group: 'actinide' },
    { symbol: 'Md', atomicNumber: 101, row: 9, col: 15, group: 'actinide' },
    { symbol: 'No', atomicNumber: 102, row: 9, col: 16, group: 'actinide' },
    { symbol: 'Lr', atomicNumber: 103, row: 9, col: 17, group: 'actinide' },

    { symbol: "Rf", atomicNumber: 104, row: 6, col: 4, group: "transition_metal" },
    { symbol: "Db", atomicNumber: 105, row: 6, col: 5, group: "transition_metal" },
    { symbol: "Sg", atomicNumber: 106, row: 6, col: 6, group: "transition_metal" },
    { symbol: "Bh", atomicNumber: 107, row: 6, col: 7, group: "transition_metal" },
    { symbol: "Hs", atomicNumber: 108, row: 6, col: 8, group: "transition_metal" },
    { symbol: "Mt", atomicNumber: 109, row: 6, col: 9, group: "transition_metal" },
    { symbol: "Ds", atomicNumber: 110, row: 6, col: 10, group: "transition_metal" },
    { symbol: "Rg", atomicNumber: 111, row: 6, col: 11, group: "transition_metal" },
    { symbol: "Cn", atomicNumber: 112, row: 6, col: 12, group: "transition_metal" },
    { symbol: "Nh", atomicNumber: 113, row: 6, col: 13, group: "post_transition" },
    { symbol: "Fl", atomicNumber: 114, row: 6, col: 14, group: "post_transition" },
    { symbol: "Mc", atomicNumber: 115, row: 6, col: 15, group: "post_transition" },
    { symbol: "Lv", atomicNumber: 116, row: 6, col: 16, group: "post_transition" },
    { symbol: "Ts", atomicNumber: 117, row: 6, col: 17, group: "halogen" },
    { symbol: "Og", atomicNumber: 118, row: 6, col: 18, group: "noble_gas" }
];


// Group colors
const groupColors = {
    'alkali_metal': 0xff6666,        // Soft Red-Orange
    'alkaline_earth': 0xffcc66,      // Warm Yellow-Orange
    'transition_metal': 0xff9900,    // Deep Orange
    'metalloid': 0x66cc99,           // Soft Green-Blue
    'nonmetal': 0x66ccff,            // Light Blue
    'halogen': 0xcc66ff,             // Purple
    'noble_gas': 0xcccccc,           // Light Gray

    // Newly added groups:
    'post_transition': 0xa0a0a0,     // Neutral Gray (Slightly darker than noble gases)
    'lanthanide': 0xff99cc,         // Soft Pinkish-Red (To differentiate rare-earth elements)
    'actinide': 0xff6699,           // Warm Magenta-Pink (To contrast lanthanides)
};

// Function to compute bounding box of all objects
function computeBoundingBox(objects) {
    const box = new THREE.Box3();
    objects.forEach(obj => {
        box.expandByObject(obj);
    });
    return box;
}

// Function to adjust camera to bounding box
function adjustCameraToBoundingBox(box) {
    const center = new THREE.Vector3();
    box.getCenter(center);

    const size = new THREE.Vector3();
    box.getSize(size);

    // Determine the distance to fit the entire bounding box with padding
    const maxDim = Math.max(size.x, size.y, size.z);
    const padding = 1.2; // Scale factor for padding
    const fovRad = THREE.MathUtils.degToRad(camera.fov);
    let distance = (maxDim / 2) / Math.tan(fovRad / 2) * padding;

    camera.position.set(center.x, center.y, distance);
    camera.lookAt(center);

    controls.target.set(center.x, center.y, 0);
    controls.update();
}


// Function to create a text texture
function createTextTexture(symbol, atomicNumber, groupColor, width = 512, height = 256) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Enable anti-aliasing
    ctx.imageSmoothingEnabled = true;

    // Set background color
    ctx.fillStyle = `rgb(${(groupColor >> 16) & 255}, ${(groupColor >> 8) & 255}, ${groupColor & 255})`;
    ctx.fillRect(0, 0, width, height);

    // Set text properties
    ctx.fillStyle = 'white'; // Keep text white for contrast
    ctx.textAlign = 'center';

    ctx.letterSpacing = "20px";

    // Render atomic number (top)
    ctx.font = 'Bold 60px "Roboto Mono", monospace';
    //ctx.font = 'Bold 60px "Helvetica", sans-serif';
    //ctx.font = 'Bold 65px Montserrat, sans-serif'; // ✅ Apply Montserrat
    ctx.fillText(atomicNumber, width / 2, height / 4);

    // Render element symbol (center)
    ctx.font = 'Bold 140px "Roboto Mono", monospace';
    //ctx.font = 'Bold 140px "Helvetica", sans-serif';
    //ctx.font = 'Bold 140px Montserrat, sans-serif'; // ✅ Apply Montserrat
    ctx.fillText(symbol, width / 2, height / 1.4);

    return new THREE.CanvasTexture(canvas);
}

function createElement(symbol, atomicNumber, x, y, group) {
    const groupObj = new THREE.Group(); // Container for text, bar, and frame

    // Get color for group
    const elementColor = groupColors[group] || 0xffffff; // Default to white if not found

    // ✅ Create the element plane with group-colored background
    const textMaterial = new THREE.MeshBasicMaterial({
        map: createTextTexture(symbol, atomicNumber, elementColor),
        side: THREE.DoubleSide,
    });
    textMaterial.map.minFilter = THREE.LinearFilter;
    const textGeometry = new THREE.PlaneGeometry(0.8, 0.8);
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(0, 0, 0.011);

    // // ✅ Add a thin gray frame
    // const frameGeometry = new THREE.PlaneGeometry(1, 1);
    // const frameMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    // const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
    // frameMesh.position.set(0, 0, 0.01);

    // ✅ Create extruding bar with default 120% glow
    const barGeometry = new THREE.BoxGeometry(0.72, 0.72, 0.01);
    const barMaterial = new THREE.MeshStandardMaterial({
        color: elementColor,
        transparent: true,
        opacity: 0.0,
        emissive: new THREE.Color(elementColor), // Set emissive color same as element
        emissiveIntensity: 1.2, // Default glow at 120%
    });
    const bar = new THREE.Mesh(barGeometry, barMaterial);
    bar.position.set(0, 0, 0.05);

    // Add event listeners for hover glow effect
    bar.onPointerOver = () => {
        bar.material.emissiveIntensity = 2; // Increase brightness on hover
    };
    bar.onPointerOut = () => {
        bar.material.emissiveIntensity = 1.2; // Reset to default 60% glow
    };

    // Group elements together
    //groupObj.add(frameMesh);
    groupObj.add(textMesh);
    groupObj.add(bar);
    groupObj.position.set(x, y, 0);

    // Store reference for click interaction
    groupObj.userData = { bar, textMesh, expanded: false, atomicNumber, elementColor};

    return groupObj;
}

// Create all elements and add to scene
const objects = [];
elements.forEach(({ symbol, atomicNumber, row, col, group }) => {
    const element = createElement(symbol, atomicNumber, col - 9, -row + 3, group);
    scene.add(element);
    objects.push(element);
});

const boundingBox = computeBoundingBox(objects);
adjustCameraToBoundingBox(boundingBox);

// Raycaster for detecting clicks & hover
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let lastHoveredBar = null; // Track the last hovered bar

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    // Find the first object that is actually a bar
    const intersects = raycaster.intersectObjects(objects.map(obj => obj.userData.bar), true);

    var hoveredElement;
    var hsl = { h: 0, s: 0, l: 0 }; // HSL forma

    if (intersects.length > 0) {
        const hoveredBar = intersects[0].object; // This is the actual bar being hovered

        // Reset previous hovered bar if different
        if (lastHoveredBar && lastHoveredBar !== hoveredBar) {
            hoveredElement = lastHoveredBar.parent.userData;
            hoveredElement.textMesh.material.color.set(0xffffff);
            lastHoveredBar.material.emissiveIntensity = 1.2; // Reset previous bar glow
            if (hoveredElement.expanded){
                lastHoveredBar.opacity = 0.5;
            }
            else{
                lastHoveredBar.opacity = 0;
            }
        }

        // Apply glow effect to new bar
        hoveredBar.material.emissiveIntensity = 2;
        lastHoveredBar = hoveredBar;
        hoveredElement = lastHoveredBar.parent.userData;
        
        new THREE.Color(hoveredElement.elementColor).getHSL(hsl);
        hsl.l = 0.8;
        hoveredElement.textMesh.material.color.setHSL(hsl.h, hsl.s, hsl.l);
        if (hoveredElement.expanded){
            lastHoveredBar.material.opacity = 0.5;
        }
        else{
            lastHoveredBar.material.opacity = 0;
        }
    } 
    else {
        // If moving to whitespace, reset the last hovered bar
        if (lastHoveredBar) {
            lastHoveredBar.material.emissiveIntensity = 1.2;
            hoveredElement = lastHoveredBar.parent.userData;
            hoveredElement.textMesh.material.color.set(0xffffff);
            if (hoveredElement.expanded){
                lastHoveredBar.material.opacity = 0.5;
            }
            else{
                lastHoveredBar.material.opacity = 0;
            }
            lastHoveredBar = null;
        }
    }
});

let isDragging = false;
let mouseDownPos = { x: 0, y: 0 };
const dragThreshold = 5; // Pixels moved before it's considered a drag

// Capture initial mouse position on mousedown
window.addEventListener('mousedown', (event) => {
    isDragging = false; // Reset dragging state
    mouseDownPos.x = event.clientX;
    mouseDownPos.y = event.clientY;
});

// Detect if the mouse moves significantly
window.addEventListener('mousemove', (event) => {
    if (
        Math.abs(event.clientX - mouseDownPos.x) > dragThreshold ||
        Math.abs(event.clientY - mouseDownPos.y) > dragThreshold
    ) {
        isDragging = true; // Considered a drag
    }
});

// Determine if it was a click or a drag on mouseup
window.addEventListener('mouseup', (event) => {
    if (!isDragging) {
        handleClick(event);
    }
});

// Variable to track the currently selected element
let selectedElement = null;

// Click interaction
function handleClick(event)
{
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object.parent;
        if (clickedObject.userData && clickedObject.userData.bar) {
            const bar = clickedObject.userData.bar;
            const expanded = clickedObject.userData.expanded;

            var scaleTarget, positionTarget, opacityTarget;

            if (expanded) {
                scaleTarget = 0.01;
                positionTarget = 0.05;
                opacityTarget = 0.0;
                /*
                bar.scale.z = 0.01; // Collapse back
                bar.position.z = 0.05; // Reset to coplanar
                bar.material.opacity = 0.25
                */
            } 
            else {
                scaleTarget = clickedObject.userData.atomicNumber*10; // Scale proportionally
                positionTarget = scaleTarget / 200 + 0.05; // Offset forward so it grows outward
                opacityTarget = 0.5;
                /*
                bar.scale.z = clickedObject.userData.atomicNumber*10; // Scale proportionally
                bar.position.z = bar.scale.z / 200 + 0.05; // Offset forward so it grows outward
                bar.material.opacity = 0.5
                */
            }

            gsap.to(bar.scale, {
                duration: 1,
                ease: "power2.out",
                z: scaleTarget // ✅ Correct way to animate scale.z
            });
            
            gsap.to(bar.position, {
                duration: 1,
                ease: "power2.out",
                z: positionTarget // ✅ Correct way to animate position.z
            });
            
            gsap.to(bar.material, {
                duration: 1,
                ease: "power2.out",
                opacity: opacityTarget // ✅ Correct way to animate material.opacity
            });
            
            clickedObject.userData.expanded = !expanded;
        }

        if (clickedObject.userData && clickedObject.userData.atomicNumber) {    
            // Otherwise, attach the label to the new element
            notecardDiv.textContent = `Element: ${clickedObject.userData.atomicNumber}`;
            
            // Remove label from previous element (if any)
            if (selectedElement) {
                selectedElement.remove(notecardLabel);
            }
    
            // Attach to the new element
            clickedObject.add(notecardLabel);
            notecardLabel.position.set(0, 1, 0); // Adjust position
            selectedElement = clickedObject; // Update selected element
        }
    }

    else {
        if (selectedElement != null) {
            selectedElement.remove(notecardLabel)
        }
    }
}

window.addEventListener('resize', () => {
    const aspectRatio = window.innerWidth / window.innerHeight;
    
    // Adjust camera zoom or distance dynamically
    if (camera.isPerspectiveCamera) {
        camera.fov = 75 / aspectRatio; // Adjust FOV to prevent stretching
    } else if (camera.isOrthographicCamera) {
        camera.left = -aspectRatio * 2;
        camera.right = aspectRatio * 2;
        camera.top = 2;
        camera.bottom = -2;
    }
    
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);  // ✅ Render the CSS labels
}
animate();
