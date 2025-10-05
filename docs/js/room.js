//=========================================
                                                                                               // The Grid
                                                        //=========================================
function altarInfo(){
    document.getElementById('altarRoomInfo').innerHTML=
            "<p>The Altar Room activates with each toll of the bell. Drag and drop Cultists to fill the room. Doubleclick/doubletap to remove. Hover on sidebar elements for details.</p>";
}
// Parameters
let rows = 4;
let columns = 4;
let blockedHoles = [];
const pegTypes = ['west', 'altar', 'faithful', 'chanters', 'sentinels', 'priests', 'hybrids', 'reanimated'];
let gridState = {};

function initializeGridState() { 
    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
            const holeId = `hole-${row}-${col}`;
            gridState[holeId] = blockedHoles.includes(holeId) ? 'blocked' : null; 
        }
    }
}

// CHANGE: New function to determine default altar position based on grid configuration
function getDefaultAltarPosition() {
    // For even width grids, place left of center; for odd width, use true center
    const centerRow = Math.ceil(rows / 2);
    const centerCol = columns % 2 === 0 ? (columns / 2) : Math.ceil(columns / 2);
    
    // For even height grids, place top of center; for odd height, use true center  
    const altarRow = rows % 2 === 0 ? (rows / 2) : centerRow;
    const altarCol = centerCol;
    
    const altarHole = `hole-${altarRow}-${altarCol}`;
    
    // If calculated position is blocked, find the first available position
    if (blockedHoles.includes(altarHole)) {
        for (let row = 1; row <= rows; row++) {
            for (let col = 1; col <= columns; col++) {
                const holeId = `hole-${row}-${col}`;
                if (!blockedHoles.includes(holeId)) {
                    return { row, col, holeId };
                }
            }
        }
    }
    
    return { row: altarRow, col: altarCol, holeId: altarHole };
}

// CHANGE: New function to determine default west position (directly below altar)
function getDefaultWestPosition() {
    const altarPos = getDefaultAltarPosition();
    const westRow = altarPos.row + 1;
    const westCol = altarPos.col;
    const westHole = `hole-${westRow}-${westCol}`;
    
    // If directly below altar is valid and not blocked, use it
    if (westRow <= rows && !blockedHoles.includes(westHole)) {
        return { row: westRow, col: westCol, holeId: westHole };
    }
    
    // Otherwise find first available position
    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
            const holeId = `hole-${row}-${col}`;
            if (!blockedHoles.includes(holeId) && holeId !== altarPos.holeId) {
                return { row, col, holeId };
            }
        }
    }
    return { row: 1, col: 1, holeId: 'hole-1-1' }; // fallback
}

// CHANGE: Modified to place default altar and west pegs, clearing any existing pegs in those positions
function placeDefaultPegs() {
    const altarPos = getDefaultAltarPosition();
    const westPos = getDefaultWestPosition();
    
    // Clear and return any existing pegs in the default positions to pool
    [altarPos, westPos].forEach(pos => {
        const hole = document.getElementById(pos.holeId);
        if (hole && gridState[pos.holeId] && gridState[pos.holeId] !== 'blocked') {
            const existingPegType = gridState[pos.holeId];
            
            // Only return non-default pegs to pool
            if (existingPegType !== 'altar' && existingPegType !== 'west') {
                const pegDiv = hole.querySelector('.peg');
                if (pegDiv) {
                    hole.removeChild(pegDiv);
                }
                
                // Return to pool if it has a cult entry
                if (cult[existingPegType]) {
                    cult[existingPegType].unplaced++;
                    cult[existingPegType].placed--;
                    const countDisplay = document.querySelector(`#${existingPegType}Unplaced`);
                    if (countDisplay) countDisplay.innerText = cult[existingPegType].unplaced;
                }
            }
            gridState[pos.holeId] = null;
        }
    });
    
    // Place altar peg
    placePegInHole('altar', altarPos.holeId, altarPos.row, altarPos.col, true);
    
    // Place west peg  
    placePegInHole('west', westPos.holeId, westPos.row, westPos.col, true);
}

// helper function to place a peg in a specific hole
function placePegInHole(pegType, holeId, row, col, isDefault = false) {
    const hole = document.getElementById(holeId);
    if (!hole || hole.children.length > 0) return;
    
    const pegDiv = document.createElement('div');
    pegDiv.classList.add('peg');
    // CHANGE: Add special class for default pegs
    if (isDefault) {
        pegDiv.classList.add('default-peg');
    }
    
    let lastTap = 0;
    pegDiv.addEventListener('pointerdown', function(e) {
        // CHANGE: Prevent removal of default pegs (altar and west)
        if (pegType === 'altar' || pegType === 'west') {
            // Allow dragging but not removal for default pegs
            startDrag(e, pegType, holeId);
            return;
        }
        
        const currentTime = Date.now();
        if (currentTime - lastTap < 300) {   //double-tap detection
            removePeg(e);   
            lastTap = 0;  
            return;
        }
        lastTap = currentTime;
        startDrag(e, pegType, holeId);
    });
    
    const img = document.createElement('img');
    img.src = `images/meeple/${pegType}.jpg`;
    img.classList.add('pegInHole');
    img.alt = pegType === 'altar' ? "Altar" : pegType.charAt(0).toUpperCase() + pegType.slice(1);
    pegDiv.appendChild(img);
    hole.appendChild(pegDiv);
    gridState[holeId] = pegType;
}

// Generate grid holes
function generateGrid() {
    const grid = document.getElementById("activeAltarGrid");
    grid.innerHTML = ''; // Clear previous grid to avoid duplicates on grid switch %%

    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
            const hole = document.createElement('div');
            hole.id = `hole-${row}-${col}`;
            hole.classList.add('hole');

            // Check if the hole should be blocked and apply the class if so
            if (blockedHoles.includes(hole.id)) {
                hole.classList.add('blocked'); // Mark as blocked %%
            }
            grid.appendChild(hole);
        }
    }
}
function altarRoomImg(){
    document.getElementById("altarRoom").style.backgroundImage = "url('images/rooms/" + gridChosen + ".jpg')";
}
                                                        //=========================================
                                                                                               // The Pegs
                                                        //=========================================
function updatePegCounts() {//in peg pool
    pegTypes.forEach((pegType) => {
        if (pegType !== 'altar' && pegType !== 'west') {
            const unplacedCount = cult[pegType].unplaced; // Get the unplaced count from cult object
            const pegCountDiv = document.getElementById(`${pegType}Unplaced`); // Select the corresponding peg-count div
            if (pegCountDiv) {
                pegCountDiv.innerText = unplacedCount; // Update the peg-count with the correct value
            }
        }
    });
}

// Updates peg positions when switching grids
function updatePegsOnGridChange() { 
    const newGridState = {}; 
    const unplacedPegs = {}; 
    // Iterate over existing gridState to reassign pegs
    for (const holeId in gridState) {
        const pegType = gridState[holeId];
        if (pegType && pegType !== 'blocked') { // Skip empty or blocked holes 
            const [_, row, col] = holeId.split('-').map(Number); // Extract row and col from holeId 
            const newHoleId = `hole-${row}-${col}`;
            if (row <= rows && col <= columns && !blockedHoles.includes(newHoleId)) { // Check if new hole is valid 
                newGridState[newHoleId] = pegType; // Assign peg to new hole if valid 
            } else {
                // CHANGE: Don't return default pegs to pool, they'll be replaced by placeDefaultPegs
                if (pegType !== 'altar' && pegType !== 'west') {
                    unplacedPegs[pegType] = (unplacedPegs[pegType] || 0) + 1; // Track peg for return to pool 
                }
            }
        }
    }
    gridState = newGridState; 
    return unplacedPegs; 
}

// Initialize the room with grid and peg pool, adding rows, columns, and blocked areas as parameters
function pegPoolInit(){
    const pegPool = document.getElementById("pegPool");
    pegTypes.forEach(name => {
        const pegDiv = document.createElement("div");
        pegDiv.className = "pegPoolPeg";
        pegDiv.id = `${name}Peg`;
        
        const img = document.createElement("img");
        img.src = `images/meeple/${name}.jpg`;
        img.className = "peg-image";
        img.alt = name.charAt(0).toUpperCase() + name.slice(1);

        const label = document.createElement("div");
        label.className = "peg-label";
        label.textContent = name.charAt(0).toUpperCase() + name.slice(1);
        pegDiv.append(img, label);
        if (name !== "west" && name !== "altar") {
            const count = document.createElement("div");
            count.className = "peg-count";
            count.id = `${name}Unplaced`;
            pegDiv.append(count);
            }
        pegPool.appendChild(pegDiv);
    });
}

function addPegEvents() {
    pegTypes.forEach(name => {
        const pegElement = document.getElementById(`${name}Peg`);
        if (pegElement && name !== "west" && name !== "altar") {
            pegElement.addEventListener("pointerdown", event => startDrag(event, name));
        }
    });
}

function initializeRoom() {
    pegPoolInit();
    const unplacedPegs = updatePegsOnGridChange(); // Adjust pegs for new grid %%
    initializeGridState();
    generateGrid();
    altarRoomImg();
    // CHANGE: Place default pegs after generating grid
    placeDefaultPegs();
    updateGridConfig();
    updatePegCounts();

    // Update pool counts for pegs that returned to the pool
    for (const pegType in unplacedPegs) {
        cult[pegType].unplaced += unplacedPegs[pegType]; // Increment unplaced count %%
        cult[pegType].placed -= unplacedPegs[pegType]; // Decrement placed count %%
        const countDisplay = document.querySelector(`#${pegType}Unplaced`);
        countDisplay.innerText = cult[pegType].unplaced; // Update DOM with new unplaced count %%
    }
}
                                                        //=========================================
                                                                                               // Drag and drop
                                                        //=========================================

// Consolidated drag info object
let pegDragInfo = {
    activePeg: null,
    offsetX: 0,
    offsetY: 0,
    draggedPeg: null,
    draggedFromHole: null,
    initialParent: null,
    initialNextSibling: null
};

function startDrag(event, pegType, holeId) { // initiates dragging of a peg
    if (event.target.setPointerCapture) { // ensures pointer events stay with this target
        event.target.setPointerCapture(event.pointerId); // captures the pointer for consistent drag tracking
    }
    // CHANGE: Modified condition to handle altar and west pegs differently
    if (!holeId && cult[pegType] && cult[pegType].unplaced <= 0) { // prevents drag if no hole and no unplaced pegs left
        event.preventDefault(); // stops default behavior
        return; // exit function
    }
    const originalPeg = event.target.closest('.pegPoolPeg') || event.target.closest('.peg'); // find the peg element being dragged
    if (!originalPeg) return; // abort if not found
    pegDragInfo.draggedPeg = pegType; 
    pegDragInfo.draggedFromHole = holeId; 
    const img = originalPeg.querySelector('img'); 
    const dragCopy = img.cloneNode(true); 
    dragCopy.className = "draggingClone";
    dragCopy.style.pointerEvents = 'none';
    document.body.appendChild(dragCopy); // add clone to body for free movement
    pegDragInfo.activePeg = dragCopy; // track active drag element
    const rect = img.getBoundingClientRect(); // get original image position
    pegDragInfo.offsetX = event.clientX - rect.left; // calculate horizontal offset for pointer
    pegDragInfo.offsetY = event.clientY - rect.top; // calculate vertical offset for pointer
    document.addEventListener('pointermove', movePeg); // listen for movement
    document.addEventListener('pointerup', dropPeg, { once: true }); // handle drop once
    document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false }); // prevent scrolling during touch drag
}


function movePeg(event) {
    event.preventDefault();
    if (!pegDragInfo.activePeg) return;
    // Update position following the pointer, using the offset
    pegDragInfo.activePeg.style.left = (event.clientX - pegDragInfo.offsetX) + 'px';
    pegDragInfo.activePeg.style.top = (event.clientY - pegDragInfo.offsetY) + 'px';
}

function dropPeg(event, row, col) {
    if (event.pointerId && event.target && event.target.releasePointerCapture) {
        event.target.releasePointerCapture(event.pointerId);
    }
    document.removeEventListener('pointermove', movePeg);
    document.removeEventListener('pointerup', dropPeg);
    let targetHole;
    if (typeof row !== 'undefined' && typeof col !== 'undefined') {
        targetHole = document.getElementById(`hole-${row}-${col}`);
    } else {
        if (pegDragInfo.activePeg) {
            pegDragInfo.activePeg.style.display = 'none';
        }
        const dropElem = document.elementFromPoint(event.clientX, event.clientY);
        if (pegDragInfo.activePeg) {
            pegDragInfo.activePeg.style.display = '';
        }
        targetHole = dropElem && dropElem.closest('[id^="hole-"]');
    }
    // If no valid targetHole is found or the hole is occupied/blocked, revert the peg.
    if (!targetHole || targetHole.children.length > 0 || targetHole.classList.contains('blocked')) {
        cleanupPegDragInfo();
        return;
    }
    const pegType = pegDragInfo.draggedPeg;
    if (pegType) {
        // If dragging from an existing hole, remove the peg from its original location.
        if (pegDragInfo.draggedFromHole) {
            const originalHole = document.getElementById(pegDragInfo.draggedFromHole);
            if (originalHole) {
                const pegDiv = originalHole.querySelector('.peg');
                if (pegDiv) {
                    originalHole.removeChild(pegDiv);
                    gridState[pegDragInfo.draggedFromHole] = null;
                }
            }
        } else {
            // If coming from the pool, update counts (altar and west don't have counts)
            if (cult[pegType]) {
                cult[pegType].unplaced--;
                cult[pegType].placed++;
                const countDisplay = document.querySelector(`#${pegType}Unplaced`);
                if (countDisplay) countDisplay.innerText = cult[pegType].unplaced;
            }
        }
        
        // CHANGE: Use the helper function to place peg, marking as default if it's altar or west
        const isDefault = (pegType === 'altar' || pegType === 'west');
        placePegInHole(pegType, targetHole.id, row, col, isDefault);

        // Update bonuses (if applicable). In restore mode, row and col are provided.
        checkAdjacencyAndApplyBonuses(row, col);
        cleanupPegDragInfo();
    }
}

function cleanupPegDragInfo() {
    document.querySelectorAll('.draggingClone').forEach(el => el.remove());//gets rid of clones
    pegDragInfo.activePeg = null;
    pegDragInfo.draggedPeg = null;
    pegDragInfo.draggedFromHole = null;
    pegDragInfo.initialParent = null;
    pegDragInfo.initialNextSibling = null;
}

// CHANGE: Modified removePeg to prevent removal of default pegs (altar and west)
function removePeg(event) {
    const pegDiv = event.target.closest('.peg'); // Get the peg div
    const hole = pegDiv.parentNode; // Get the parent hole
    const pegType = gridState[hole.id]; // Get the peg type from the grid state
    
    // CHANGE: Prevent removal of altar and west pegs
    if (pegType === 'altar' || pegType === 'west') {
        return; // Don't remove default pegs
    }
    
    if (pegType) {
        // Remove the peg from the hole
        hole.removeChild(pegDiv);

        // Update the grid state to reflect that the hole is empty
        gridState[hole.id] = null;

        // CHANGE: Only update cult object for non-default pegs
        if (cult[pegType]) {
            // Update the cult object: add back to unplaced, subtract from placed
            cult[pegType].unplaced++;
            cult[pegType].placed--;
            // Update the peg count display in the peg pool
            const countDisplay = document.querySelector(`#${pegType}Unplaced`);
            countDisplay.innerText = cult[pegType].unplaced;
        }
        // Check adjacency and update the bonuses
        checkAdjacencyAndApplyBonuses();
    }
}

// Function to remove pegs from the grid during numberChange
function removePegsFromGrid(pegType, count) {
    let removed = 0;
    // Loop through the grid and remove pegs of the specified type
    for (let row = 1; row <= rows && removed < count; row++) {
        for (let col = 1; col <= columns && removed < count; col++) {
            const holeId = `hole-${row}-${col}`;
            const hole = document.getElementById(holeId);
            // If the peg in this hole matches the pegType, remove it
            if (gridState[holeId] === pegType) {
                const pegDiv = hole.querySelector('.peg');
                if (pegDiv) {
                    hole.removeChild(pegDiv);  // Remove from the DOM
                    gridState[holeId] = null;  // Clear grid state
                    removed++;  // Increment removed count
// Check adjacency and update the bonus box
        checkAdjacencyAndApplyBonuses();
                }
            }
        }
    }
}

                                                        //=========================================
                                                                                               // The Grids locations
                                                        //=========================================
const grids = { 
    grove: { 
        tab: "Grove",
        title: "Moonlit Grove",
        rows: 4, 
        columns: 4, 
        muralBool:false,
        blockedHoles: []  // 0 holes
    }, 
    basement: { 
        tab: "Basement",
        title: "School Basement",
        rows: 5,
        columns: 5, 
        muralCost: 484,
        muralBool:false,
        blockedHoles: [ 
            'hole-2-2'  // CHANGED: moved from hole-3-3 to avoid west peg conflict
        ] 
    }, 
    motel: { 
        tab: "Motel",
        title: "Seedy Motel",
        rows: 6, 
        columns: 6, 
        muralCost: 1616,
        muralBool:false,
        blockedHoles: [ 
            'hole-2-2', 'hole-4-4'  // 2 holes
        ] 
    }, //second run
    lodge: { 
        tab: "Lodge",
        title: "Masonic Lodge",
        rows: 6, 
        columns: 8, 
        muralCost: 2424,
        muralBool:false,
        blockedHoles: [ 
            'hole-3-2', 'hole-3-6', 'hole-5-4'  // CHANGED: moved hole-3-4 to hole-5-4 to avoid west peg conflict
        ] 
    }, 
    compound: { 
        tab: "Compound",
        title: "Militant Compound",
        rows: 7, 
        columns: 10, 
        muralCost: 2484,
        muralBool:false,
        blockedHoles: [ 
            'hole-2-2', 'hole-4-4', 'hole-6-6', 'hole-5-5' // 4 holes
        ] 
    }, 
    mansion: { 
        tab: "Mansion",
        title: "Isolated Mansion",
        rows: 8, 
        columns: 12, 
        muralCost: 16248,
        muralBool:false,
        blockedHoles: [ 
            'hole-1-1', 'hole-8-12', 'hole-1-12', 'hole-8-1', 'hole-4-6'  // 5 holes
        ] 
    }, 
    silo: { 
        tab: "Silo",
        title: "Nuclear Silo",
        rows: 8, 
        columns: 14, 
        muralCost: 16248,
        muralBool:false,
        blockedHoles: [ 
            'hole-2-4', 'hole-6-8', 'hole-2-8', 'hole-6-4', 'hole-2-12', 'hole-6-12'  // 6 holes
        ] 
    }, 
    cathedral: { 
        tab: "Cathedral",
        title: "Obscene Cathedral",
        rows: 8, 
        columns: 16, 
        muralCost: 24242,
        muralBool:false,
        blockedHoles: [ 
            'hole-2-2', 'hole-2-3', 'hole-4-6', 'hole-5-6', 'hole-7-11', 'hole-7-12', 'hole-8-16'  // 7 holes
        ] 
    }
};
let gridKeys = Object.keys(grids);
let gridChosen = "grove";
function updateGridConfig() {
    const maxBoxSize = 66; // Maximum bounding box in viewport units (dvh)
    
    // Calculate cell size to fit within the bounding box, based on the larger dimension
    const cellHeight = maxBoxSize / rows; 
    const gridDiv = document.getElementById("activeAltarGrid"); // %% Get the active grid element
    // Set CSS properties dynamically
    gridDiv.style.gridTemplateColumns = `repeat(${columns}, ${cellHeight}dvh)`;
    gridDiv.style.gridTemplateRows = `repeat(${rows}, ${cellHeight}dvh)`;
    gridDiv.style.width = `${columns * cellHeight}dvh`;
    gridDiv.style.height = `${rows * cellHeight}dvh`;
    const holes = document.getElementsByClassName("hole"); // Get all elements with the specified class
    for (let i = 0; i < holes.length; i++) {
    holes[i].style.width = `${cellHeight}dvh`; // Change the width
    holes[i].style.height = `${cellHeight}dvh`; // Change the height`+*
    }
}
                                                        //=========================================
                                                                                               // The Grid change
                                                        //=========================================
function replaceGrid(newGridConfig) { // %% New function to replace the grid
    gridChosen = newGridConfig;
    altarRoomImg();
    const grid = document.getElementById("activeAltarGrid"); // %% Get the active grid element
    // Store current pegs before clearing the grid
    const existingPegs = {}; // %% Object to hold current pegs
    for (const holeId in gridState) { // %% Loop through existing grid state
        const pegType = gridState[holeId]; 
        if (pegType && pegType !== 'blocked') { 
            existingPegs[holeId] = pegType; 
        }
    }
    // Clear the current grid layout and reset grid state
    while (grid.firstChild) { 
        grid.removeChild(grid.firstChild);
    }
    Object.keys(gridState).forEach(key => delete gridState[key]); 
    ({ rows, columns, blockedHoles } = grids[newGridConfig]);
    for (let row = 1; row <= rows; row++) { //  Loop through new rows
        for (let col = 1; col <= columns; col++) { //  Loop through new columns
            const holeId = `hole-${row}-${col}`; 
            gridState[holeId] = null; 
            // Create new holes
            const hole = document.createElement('div'); 
            hole.id = holeId; 
            hole.classList.add('hole'); 
            if (blockedHoles.includes(holeId)) { 
                hole.classList.add('blocked');
            } 
            grid.appendChild(hole); 
        }
    }
    placeDefaultPegs();
    for (const [holeId, pegType] of Object.entries(existingPegs)) { 
        if (pegType === 'altar' || pegType === 'west') continue;
        const originalRowCol = holeId.split('-').slice(1); 
        const newHoleId = `hole-${originalRowCol[0]}-${originalRowCol[1]}`; 
        // If the new hole is not blocked and is empty, place the peg
        if (gridState[newHoleId] === null && !document.getElementById(newHoleId).classList.contains('blocked')) { // %% Check for valid placement
            // Create peg element using helper function
            placePegInHole(pegType, newHoleId);
        } else {
            if (cult[pegType]) {
                cult[pegType].unplaced++; 
                cult[pegType].placed--; 
                const countDisplay = document.querySelector(`#${pegType}Unplaced`);
                countDisplay.innerText = cult[pegType].unplaced; 
            }
        }
    }
    updateGridConfig();
    updatePegCounts(); 
}
function clearGrid() {
    const grid = document.getElementById("activeAltarGrid");
    for (const holeId in gridState) {
        const pegType = gridState[holeId];
        if (pegType && pegType !== 'altar' && pegType !== 'west') { // Don't clear default pegs
            if (cult[pegType]) {
                cult[pegType].unplaced++;
                cult[pegType].placed--;
                const countDisplay = document.querySelector(`#${pegType}Unplaced`);
                countDisplay.innerText = cult[pegType].unplaced;
            }
            gridState[holeId] = null;
            const hole = document.getElementById(holeId);
            const pegDiv = hole.querySelector('.peg');
            if (pegDiv) pegDiv.remove();
        }
    }
    updatePegCounts();
}




                                                        //=========================================
                                                                                               // The Altar
                                                        //=========================================
//altars
let altars={
    crate:{
        string:'Shipping Crate',
        description:["It serves... barely."],
        purchased: true,
        current: true
    },
    blood:{
        string: 'Blood Stained Slab',
        description: ['Doubles adjacent Sentinels output'],
        purchased: false,
        current: false
    },
    oak:{
        string: 'Carved Oak',
        description: ['Doubles adjacent Chanters output'],
        purchased: false,
        current: false
    },
    marble:{
        string: 'Marble',
        description:["Doubles Priests adjacent to Altar."],
        purchased: false,
        current: false
    },
    obsidian:{
        string: 'Obsidian',
        description: ['Quadruples Sentinels adjacent to Altar.'],
        purchased: false,
        current: false
    },
    ivory:{
        string: 'Ivory',
        description:["Quadruples Priests adjacent to Altar., doubles all Priests."],
        purchased: false,
        current: false
    },
    bone:{
        string: 'Bone',
        description:["Quadruples Sentinels adjacent to Altar, doubles all Sentinels."],
        purchased: false,
        current: false
    },
    laghA:{
        string: 'Lagh',
        description:["Doubles Sacrifice Radiance benefit"],
        purchased: false,
        current: false
    },
    tulu:{
        string: 'Tulu',
        description:["Passive Radiance, -health and cultist loss periodically"],
        purchased: false,
        current: false,
        radCounter: [0,8],
        sacCounter: [0,88]
    }
};
let currentAltar = 'crate';
let altarKeys = Object.keys(altars);
function buildAltarOptions(){
    for (i=0;i<altarKeys.length;i++){
            const altarOptionWrap = document.createElement('div');
            altarOptionWrap.textContent = altars[altarKeys[i]].string;
            altarOptionWrap.classList.add('altarOptionWraps');
            altarOptionWrap.id = altarKeys[i] + 'Wrap';
            // Append the wrapper to the altarOptions container
            altarOptions.appendChild(altarOptionWrap);
    }
}
 buildAltarOptions();
 document.getElementById('crateWrap').style.display='flex';
 function toggleAltarOptions() {
    let t = document.getElementById("altarOptions").style.display;
    if(t === 'none' || t === ''){
        document.getElementById("altarOptions").style.display = 'block';
    }else{
        document.getElementById("altarOptions").style.display = 'none';
    }
}
function altarOptionClick(optionChosen) {
    optionChosen = optionChosen.slice(0, -4);
     let temp = altars[optionChosen].string;
    document.getElementById("currentAltarDiv").innerHTML = temp;
    Object.values(altars).forEach(child => {
    child.current = false;
    });
    altars[optionChosen].current = true;
    currentAltar = optionChosen;
    checkAdjacencyAndApplyBonuses();
    toggleAltarOptions();
}
                                                        //=========================================
                                                                                               // Tulu metal
                                                        //=========================================
 //passive radiance, health reduction, nearest cultists to altar random death
 function tulu(tics){
     if(altars.tulu.current === true){
         altars.tulu.radCounter[0]+=tics;
         if(altars.tulu.radCounter[0] >= altars.tulu.radCounter[1]){
             altars.tulu.radCounter[0] -= altars.tulu.radCounter[1];
             numberChange('stats', 'radiance', 1, 'blue');
             numberChange('stats', 'health', -4, '', 'red');
         }
         altars.tulu.sacCounter[0]+=tics;
         if(altars.tulu.sacCounter[0] >= altars.tulu.sacCounter[1]){
             altars.tulu.sacCounter[0] -= altars.tulu.radCounter[1];
             let temp;
             let tuluKeys = Object.keys(sacrificeTypes);
            do {
                temp = tuluKeys[Math.floor(Math.random() * tuluKeys.length)];
            } while (cult[temp].current < 1); //ensures a sac target
            numberChange('cult', temp, -1, '', 'red');
            comment("A " + temp + " has died. There is something unclean about that Tulu metal.");
         }
     }
 }
 
 
                                                        //=========================================
                                                                                               // The Grid Doin stuff
                                                        //=========================================

let adjacentNumbers = {
    west:0,
    westCharm:0,
    westPages:0,
    westMadness:0,
    westTerror:0,
    westGold:0,
    chantersTotal: 0,
    sentinelsTotal: 0,
    priestsTotal: 0,
    reanimatedPegTotal: 0,
    reanimatedTotal:0,
    all: 1,
    shardLove: 1,
    shardTerror: 1,
    shardGold: 1,
    shardAll: 1
};

function checkAdjacencyAndApplyBonuses(time) {
    // Reset adjacency counters for each type
    adjacentNumbers.west=0;
    adjacentNumbers.westCharm=0;
    adjacentNumbers.westPages=0;
    adjacentNumbers.westMadness=0;
    adjacentNumbers.westTerror=0;
    adjacentNumbers.westGold=0;
    adjacentNumbers.chantersTotal = 0;
    adjacentNumbers.sentinelsTotal = 0;
    adjacentNumbers.priestsTotal = 0;
    adjacentNumbers.reanimatedPegTotal = 0;
    adjacentNumbers.reanimatedTotal = 0;
    adjacentNumbers.all = 1;
if (grids[gridChosen].muralBool) {
    adjacentNumbers.all = adjacentNumbers.all + loveCrafts.murals.benefit;
}
    const directions = [
        [-1, 0], // up
        [1, 0],  // down
        [0, -1], // left
        [0, 1]   // right
    ];
    // Iterate through all holes in the grid to check adjacency
    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
            const currentPeg = gridState[`hole-${row}-${col}`];
            if (currentPeg === 'faithful'){
                adjacentNumbers.reanimatedTotal++;
            }
            if(currentPeg === "reanimated"){
                adjacentNumbers.reanimatedPegTotal++;
            }
            // Hybrids can act as sentinels for terror bonuses and faithful for others
            if (currentPeg === 'west' || currentPeg === 'chanters' || currentPeg === 'sentinels' || currentPeg === 'priests' || currentPeg === 'hybrids') {
                let westBool = false;
                let adjacentFaithfulCount = 0;
                let isAdjacentToAltar = false;
                // Check adjacency to faithful or hybrid pegs and altar for each direction
                directions.forEach(([dx, dy]) => {
                    const adjRow = row + dx;
                    const adjCol = col + dy;
                    const adjacentHole = `hole-${adjRow}-${adjCol}`;
                    if (gridState[adjacentHole] === 'faithful' || gridState[adjacentHole] === 'hybrids' || gridState[adjacentHole] === 'reanimated') {
                        adjacentFaithfulCount += 1;
                    }
                    if (gridState[adjacentHole] === 'west') {
                        westBool = true;
                    }
                    if (gridState[adjacentHole] === 'altar') {
                        isAdjacentToAltar = true;
                    }
                });

                // Increment totals for each peg type based on adjacency
                if (currentPeg === 'west') {
                    adjacentNumbers.westMadness += adjacentFaithfulCount;
                    adjacentNumbers.westTerror += adjacentFaithfulCount;
                }else if (currentPeg === 'chanters') {
                    if (isAdjacentToAltar && currentAltar === 'oak') {
                        adjacentFaithfulCount *= 2; // Apply oak altar multiplier
                    }
                     adjacentFaithfulCount *= Math.max(1, Math.ceil(cult.chanters.outMultiplier)); 
                     if(westBool === true){
                         adjacentNumbers.westCharm+= adjacentFaithfulCount;
                     }else{
                        adjacentNumbers.chantersTotal += adjacentFaithfulCount;
                    }
                } else if (currentPeg === 'sentinels' || currentPeg === 'hybrids') {
                    if (isAdjacentToAltar) {
                        if (currentAltar === 'blood') {
                            adjacentFaithfulCount *= 2;
                        } else if (currentAltar === 'obsidian' || currentAltar === 'bone') {
                            adjacentFaithfulCount *= 4;
                        }
                    }
                     adjacentFaithfulCount *= Math.max(1, Math.ceil(cult.sentinels.outMultiplier));
                  if(westBool === true){
                         adjacentNumbers.westGold+= adjacentFaithfulCount;
                     }else{
                    adjacentNumbers.sentinelsTotal += adjacentFaithfulCount;
                    }
                } else if (currentPeg === 'priests') {
                    if (isAdjacentToAltar) {
                        if (currentAltar === 'marble') {
                            adjacentFaithfulCount *= 2;
                        } else if (currentAltar === 'ivory') {
                            adjacentFaithfulCount *= 4;
                        }
                    }
                  if(cult.priests.altar=== true){//unlocked by evangelism, priests dont do anything before then
                       adjacentFaithfulCount*=2;//just making priests more effective
                      if(westBool === true){
                             adjacentNumbers.westPages+= adjacentFaithfulCount;
                         }else{
                            adjacentNumbers.priestsTotal += adjacentFaithfulCount;
                        }
                    }
                }
            }
        }
    }  
//add shard and all modifiers
    adjacentNumbers.chantersTotal = adjacentNumbers.chantersTotal * adjacentNumbers.all * adjacentNumbers.shardLove * adjacentNumbers.shardAll;
    adjacentNumbers.sentinelsTotal = adjacentNumbers.sentinelsTotal * adjacentNumbers.all * adjacentNumbers.shardTerror * adjacentNumbers.shardAll;
    adjacentNumbers.priestsTotal = adjacentNumbers.priestsTotal * adjacentNumbers.all * adjacentNumbers.shardGold * adjacentNumbers.shardAll;
    // Update the info box with the adjacency totals
    document.getElementById('loveBonus').innerText = Math.floor(adjacentNumbers.chantersTotal);
    adjacentNumbers.chantersTotal = applySoftcap('chanters', 'love', adjacentNumbers.chantersTotal, 16);
    let reanimatedTotal= adjacentNumbers.reanimatedTotal * adjacentNumbers.reanimatedPegTotal;
    document.getElementById('terrorBonus').innerText = Math.floor(adjacentNumbers.sentinelsTotal + reanimatedTotal + adjacentNumbers.westTerror);
    adjacentNumbers.sentinelsTotal = applySoftcap('sentinels', 'terror', adjacentNumbers.sentinelsTotal, 16);
    //west
    if(actionUpgrades.preach.attendants.purchased===true){
        adjacentNumbers.westMadness*=4;
    }
    if(actionUpgrades.preach.conduits.purchased===true){
        adjacentNumbers.westCharm*=4;
    }
    if(actionUpgrades.preach.oblations.purchased===true){
        adjacentNumbers.westGold*=4;
    }
    if(actionUpgrades.preach.eloquence.purchased===true){
        adjacentNumbers.westPages*=4;
    }
    
    document.getElementById('goldBonus').innerText = Math.floor(adjacentNumbers.priestsTotal + adjacentNumbers.westGold);
    document.getElementById('charmBonus').innerText = Math.floor(adjacentNumbers.westCharm);
    document.getElementById('pagesBonus').innerText = Math.floor(adjacentNumbers.westPages);
    document.getElementById('madnessBonus').innerText = Math.floor(-adjacentNumbers.westMadness);
    
    if(time === 'time'){
        numberChange('vault', 'love', adjacentNumbers.chantersTotal, 'pink', 'red'); // Apply total love from adjacency with softcap
        numberChange('vault', 'terror', adjacentNumbers.sentinelsTotal + reanimatedTotal + adjacentNumbers.westTerror, 'red', 'blue'); // Apply total terror from adjacency with softcap
        numberChange('vault', 'gold', adjacentNumbers.priestsTotal + adjacentNumbers.westGold, 'yellow', 'red'); // Apply total gold from adjacency 
        numberChange("stats", "charm", adjacentNumbers.westCharm, "blue", "");
        if(stats.madness.current>=adjacentNumbers.westMadness){
            numberChange("stats", "madness", -adjacentNumbers.westMadness, "", "green");
        }
        if(stats.vision.current>=(adjacentNumbers.westPages * 88)){
            numberChange("stats", "vision", -(adjacentNumbers.westPages * 88), "", "");
            vault.tome.pageCounter+=adjacentNumbers.westPages;
            document.getElementById("pages").innerHTML= vault.tome.pageCounter;
        }
    }
}

altarInfo();
initializeRoom();

let pegDescriptions = {
    default: "Drag and drop to fill the room. Doubleclick/doubletap to remove. Hover on sidebar elements for details.",
    altarPeg: "Each altar provides different benefits. See description in dropdown menu to the left.",
    westPeg: "West produces differing effects for each adjacent. West converts Madness into Terror for adjacent Faithful, Love into Charm for Chanters, Terror into Gold for Sentinels, and 88 Vision per page from Priests (if possible).",
    faithfulPeg: "The fodder.",
    chantersPeg: "Produces 1 Love for each adjacent Faithful.",
    sentinelsPeg: "Produces 1 Terror for each adjacent Faithful.",
    priestsPeg: "Collects 2 Gold per adjacent Faithful once Evangelical Priests has been purchased.",
    hybridsPeg: "Produces 1 Terror for each adjacent Faithful and counts as a Faithful.",
    reanimatedPeg: "The unseemly duo of Brined and Reanimated produces 1 Terror for each Faithful in the altar room. Also counts as a Faithful."
};

function setupPegHover() {
    let infoBox = document.getElementById("altarRoomInfo");
    let pegs = document.querySelectorAll(".pegPoolPeg");
    pegs.forEach(peg => {
        let pegId = peg.id;
        if (pegId in pegDescriptions) {
            peg.addEventListener("mouseenter", () => {
                infoBox.innerHTML = pegDescriptions[pegId];
            });
            peg.addEventListener("mouseleave", () => {
                infoBox.innerHTML = pegDescriptions.default;
            });
        }
    });
}
setupPegHover();