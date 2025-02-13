import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// Setup scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.update();

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
    { symbol: 'Ce', atomicNumber: 58, row: 9, col: 4, group: 'lanthanide' },
    { symbol: 'Pr', atomicNumber: 59, row: 9, col: 5, group: 'lanthanide' },
    { symbol: 'Nd', atomicNumber: 60, row: 9, col: 6, group: 'lanthanide' },
    { symbol: 'Pm', atomicNumber: 61, row: 9, col: 7, group: 'lanthanide' },
    { symbol: 'Sm', atomicNumber: 62, row: 9, col: 8, group: 'lanthanide' },
    { symbol: 'Eu', atomicNumber: 63, row: 9, col: 9, group: 'lanthanide' },
    { symbol: 'Gd', atomicNumber: 64, row: 9, col: 10, group: 'lanthanide' },
    { symbol: 'Tb', atomicNumber: 65, row: 9, col: 11, group: 'lanthanide' },
    { symbol: 'Dy', atomicNumber: 66, row: 9, col: 12, group: 'lanthanide' },
    { symbol: 'Ho', atomicNumber: 67, row: 9, col: 13, group: 'lanthanide' },
    { symbol: 'Er', atomicNumber: 68, row: 9, col: 14, group: 'lanthanide' },
    { symbol: 'Tm', atomicNumber: 69, row: 9, col: 15, group: 'lanthanide' },
    { symbol: 'Yb', atomicNumber: 70, row: 9, col: 16, group: 'lanthanide' },
    { symbol: 'Lu', atomicNumber: 71, row: 9, col: 17, group: 'lanthanide' },

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
    { symbol: 'Th', atomicNumber: 90, row: 10, col: 4, group: 'actinide' },
    { symbol: 'Pa', atomicNumber: 91, row: 10, col: 5, group: 'actinide' },
    { symbol: 'U', atomicNumber: 92, row: 10, col: 6, group: 'actinide' },
    { symbol: 'Np', atomicNumber: 93, row: 10, col: 7, group: 'actinide' },
    { symbol: 'Pu', atomicNumber: 94, row: 10, col: 8, group: 'actinide' },
    { symbol: 'Am', atomicNumber: 95, row: 10, col: 9, group: 'actinide' },
    { symbol: 'Cm', atomicNumber: 96, row: 10, col: 10, group: 'actinide' },
    { symbol: 'Bk', atomicNumber: 97, row: 10, col: 11, group: 'actinide' },
    { symbol: 'Cf', atomicNumber: 98, row: 10, col: 12, group: 'actinide' },
    { symbol: 'Es', atomicNumber: 99, row: 10, col: 13, group: 'actinide' },
    { symbol: 'Fm', atomicNumber: 100, row: 10, col: 14, group: 'actinide' },
    { symbol: 'Md', atomicNumber: 101, row: 10, col: 15, group: 'actinide' },
    { symbol: 'No', atomicNumber: 102, row: 10, col: 16, group: 'actinide' },
    { symbol: 'Lr', atomicNumber: 103, row: 10, col: 17, group: 'actinide' },

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


const groupColors = {
    'alkali_metal': 'rgba(255, 102, 102, 0.8)',        // Soft Red-Orange
    'alkaline_earth': 'rgba(255, 204, 102, 0.8)',      // Warm Yellow-Orange
    'transition_metal': 'rgba(255, 153, 0, 0.8)',      // Deep Orange
    'metalloid': 'rgba(102, 204, 153, 0.8)',          // Soft Green-Blue
    'nonmetal': 'rgba(102, 204, 255, 0.8)',           // Light Blue
    'halogen': 'rgba(204, 102, 255, 0.8)',            // Purple
    'noble_gas': 'rgba(204, 204, 204, 0.8)',          // Light Gray

    // Newly added groups:
    'post_transition': 'rgba(160, 160, 160, 0.8)',    // Neutral Gray (Slightly darker than noble gases)
    'lanthanide': 'rgba(255, 153, 204, 0.8)',        // Soft Pinkish-Red (To differentiate rare-earth elements)
    'actinide': 'rgba(255, 102, 153, 0.8)',         // Warm Magenta-Pink (To contrast lanthanides)
};


// Compute bounding box
let minCol = Infinity, maxCol = -Infinity, minRow = Infinity, maxRow = -Infinity;
elements.forEach(elem => {
    minCol = Math.min(minCol, elem.col);
    maxCol = Math.max(maxCol, elem.col);
    minRow = Math.min(minRow, elem.row);
    maxRow = Math.max(maxRow, elem.row);
});

const elementSize = 100;

const centerX = (minCol + maxCol) / 2 * elementSize * 1.5;
const centerY = -(minRow + maxRow) / 2 * elementSize * 1.5;
const width = (maxCol - minCol + 1) * elementSize * 1.5;
const height = (maxRow - minRow + 1) * elementSize * 1.5;
const maxDimension = Math.max(width, height);

camera.position.set(centerX, centerY, maxDimension);
controls.target.set(centerX, centerY, 0);
controls.update();

// Create Elements
const objects = [];


elements.forEach((elem) => {
    // Create transparent bar
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.width = `${elementSize}px`;
    bar.style.height = `0px`; // Start at 0 height
    bar.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    bar.style.position = 'absolute';
    bar.style.bottom = '100%';
    bar.style.left = '0';
    bar.style.transition = 'height 0.5s ease';
    const div = document.createElement('div');
    div.className = 'element';
    div.style.width = `${elementSize}px`;
    div.style.height = `${elementSize}px`;
    div.style.backgroundColor = groupColors[elem.group] || 'rgba(255, 255, 255, 0.7)';
    
    const number = document.createElement('div');
    number.className = 'number';
    number.textContent = elem.atomicNumber;
    div.appendChild(number);
    
    const symbol = document.createElement('div');
    symbol.className = 'symbol';
    symbol.textContent = elem.symbol;
    div.appendChild(symbol);
    div.appendChild(bar);
    
    const object = new CSS3DObject(div);
    object.userData = { bar: bar, expanded: false }; // Store reference to bar
    object.position.set(elem.col * elementSize * 1.5, -elem.row * elementSize * 1.5, 0);
    scene.add(object);
    objects.push(object);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle resizing
window.addEventListener('resize', () => {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const adjustedMaxDimension = maxDimension / Math.min(1.5, aspectRatio);
    camera.position.set(centerX, centerY, adjustedMaxDimension);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// CSS Styles
const style = document.createElement('style');
style.innerHTML = `
    body { margin: 0; overflow: hidden; }
    .element { display: flex; flex-direction: column; align-items: center; justify-content: center; 
               font-family: Arial, sans-serif; color: white; border-radius: 10px; border: 2px solid white; }
    .number { font-size: 20px; font-weight: bold; }
    .symbol { font-size: 30px; font-weight: bold; }
`;
document.head.appendChild(style);

// Click interaction
window.addEventListener('click', (event) => {
    const clickedElement = objects.find(obj => obj.element.contains(event.target));
    if (clickedElement) {
        const bar = clickedElement.userData.bar;
        const expanded = clickedElement.userData.expanded;
        if (expanded) {
            bar.style.height = '0px';
        } else {
            bar.style.height = `${clickedElement.element.children[0].textContent * 10}px`; // Scale by atomic number
        }
        clickedElement.userData.expanded = !expanded;
    }
});
