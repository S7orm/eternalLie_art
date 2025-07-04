                                                        //=========================================
                                                                                               // The Grid
                                                        //=========================================
function altarInfo(){
    document.getElementById('altarRoomInfo').innerHTML+=
            "<p>The Altar Room can provide bonuses to Love, Terror, and Gold. For example: A Chanter may have up to 4 Faithful surrounding them, providing up to 4 additional Love, with diminishing returns near capacity.</p>";
}
// Parameters
let rows = 4;
let columns = 4;
let blockedHoles = [];
const pegTypes = ['altar', 'faithful', 'chanters', 'sentinels', 'priests', 'hybrids'];

// Track peg placements on the grid
let gridState = {};

function initializeGridState() { 
    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
            const holeId = `hole-${row}-${col}`;
            gridState[holeId] = blockedHoles.includes(holeId) ? 'blocked' : null; 
        }
    }
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


                                                        //=========================================
                                                                                               // The Pegs
                                                        //=========================================
function updatePegCounts() {
    // Loop through each peg type and update the unplaced count in the DOM
    pegTypes.forEach((pegType) => {
        if (pegType !== "altar" ){
            const unplacedCount = cult[pegType].unplaced; // Get the unplaced count from cult object
            const pegCountDiv = document.getElementById(`${pegType}Unplaced`); // Select the corresponding peg-count div
            if (pegCountDiv) {
                pegCountDiv.innerText = unplacedCount; // Update the peg-count with the correct value
            }
        }
    });
}

// Updates peg positions when switching grids
function updatePegsOnGridChange() { // %% helper function in initilizeroom
    const newGridState = {}; // Prepare new grid state with updated dimensions %%
    const unplacedPegs = {}; // Track pegs without valid positions on the new grid %%

    // Iterate over existing gridState to reassign pegs
    for (const holeId in gridState) {
        const pegType = gridState[holeId];
        if (pegType && pegType !== 'blocked') { // Skip empty or blocked holes %%
            const [_, row, col] = holeId.split('-').map(Number); // Extract row and col from holeId %%
            const newHoleId = `hole-${row}-${col}`;
            if (row <= rows && col <= columns && !blockedHoles.includes(newHoleId)) { // Check if new hole is valid %%
                newGridState[newHoleId] = pegType; // Assign peg to new hole if valid %%
            } else {
                unplacedPegs[pegType] = (unplacedPegs[pegType] || 0) + 1; // Track peg for return to pool %%
            }
        }
    }

    gridState = newGridState; // Replace old grid state
    return unplacedPegs; // Return unplaced peg counts for pool update
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

        const count = document.createElement("div");
        count.className = "peg-count";
        count.id = `${name}Unplaced`;

        pegDiv.append(img, label, count);
        pegPool.appendChild(pegDiv);
    });
}

function addPegEvents() {
    pegTypes.forEach(name => {
        const pegElement = document.getElementById(`${name}Peg`);
        if (pegElement) {
            pegElement.addEventListener("pointerdown", event => startDrag(event, name));
        }
    });
}

function initializeRoom() {
    pegPoolInit();
    const unplacedPegs = updatePegsOnGridChange(); // Adjust pegs for new grid %%
    initializeGridState();
    generateGrid();
    updateGridConfig(gridChosen);
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

function startDrag(event, pegType, holeId) {
    if (event.target.setPointerCapture) {
    event.target.setPointerCapture(event.pointerId);
}
    // Prevent dragging if from the pool and there are no unplaced pegs left
    if (pegType !== 'altar' && !holeId && cult[pegType].unplaced <= 0) {
        event.preventDefault();
        return;
    }
    // Identify the original peg element: either from the peg pool or grid
    const originalPeg = event.target.closest('.pegPoolPeg') || event.target.closest('.peg');
    if (!originalPeg) return;
    
    // Store the peg type and source for later use
    pegDragInfo.draggedPeg = pegType;
    pegDragInfo.draggedFromHole = holeId;
    
    // Create a copy of the image only (the ghost that will follow the pointer)
    const img = originalPeg.querySelector('img');
    if (!img) return;
    const dragCopy = img.cloneNode(true);
    
    dragCopy.style.width = "4.8dvw";
    dragCopy.style.height = "4.8dvw";
    // Style the clone for dragging: absolute positioning and a high z-index
    dragCopy.style.position = 'absolute';
    dragCopy.style.zIndex = 1000;
    // Optionally, add a slight opacity for visual feedback
    dragCopy.style.opacity = "0.8";
    dragCopy.classList.add('dragging-clone');//for easy cleanup
        //Prevent the clone from capturing pointer events so it doesn't trigger pointerup prematurely.
   // dragCopy.style.pointerEvents = 'none';
    // Append the clone to the document body so it can be freely positioned
    document.body.appendChild(dragCopy);
    pegDragInfo.activePeg = dragCopy;
    
    // Calculate the offset so that the image doesn't jump to the pointer's top left
    const rect = img.getBoundingClientRect();
    pegDragInfo.offsetX = event.clientX - rect.left;
    pegDragInfo.offsetY = event.clientY - rect.top;
    
    // Register pointermove and pointerup listeners for dragging
    document.addEventListener('pointermove', movePeg);
    document.addEventListener('pointerup', dropPeg, { once: true });
    document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

    window.console.log("started drag");
}


function movePeg(event) {
    event.preventDefault();
    if (!pegDragInfo.activePeg) return;
    // Update position following the pointer, using the offset
    pegDragInfo.activePeg.style.left = (event.clientX - pegDragInfo.offsetX) + 'px';
    pegDragInfo.activePeg.style.top = (event.clientY - pegDragInfo.offsetY) + 'px';
}

function dropPeg(event, row, col) {
    // Release pointer capture only if event.pointerId exists and event.target supports it.
    if (event.pointerId && event.target && event.target.releasePointerCapture) {
        event.target.releasePointerCapture(event.pointerId);
    }
    // Remove pointermove and pointerup listeners if present
    document.removeEventListener('pointermove', movePeg);
    document.removeEventListener('pointerup', dropPeg);

    let targetHole;
    // If row and col are provided, we're in restore mode.
    if (typeof row !== 'undefined' && typeof col !== 'undefined') {
        targetHole = document.getElementById(`hole-${row}-${col}`);
    } else {
        // Normal drop: temporarily hide the dragged copy to detect the underlying hole.
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
        revertPeg();
        cleanupPegDragInfo();
        return;
    }

    // Use stored peg type from pegDragInfo.
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
            // If coming from the pool (and not "altar"), update counts.
            if (pegType !== "altar") {
                cult[pegType].unplaced--;
                cult[pegType].placed++;
                const countDisplay = document.querySelector(`#${pegType}Unplaced`);
                if (countDisplay) countDisplay.innerText = cult[pegType].unplaced;
            }
        }

        // Create the new peg element to place into the target hole.
        const pegDiv = document.createElement('div');
        pegDiv.classList.add('peg');
        
// Attach pointerdown listener for both drag start and double-tap removal.
// Each pegDiv gets its own 'lastTap' variable in this closure.
    let lastTap = 0;
    pegDiv.addEventListener('pointerdown', function(e) {
        const currentTime = Date.now();
        // If the time between taps is less than 300ms, treat it as a double-tap.
        if (currentTime - lastTap < 300) {   //double-tap detection
            removePeg(e);                   // remove the peg on double-tap
            lastTap = 0;                    //  reset the tap timer
            // Do not start dragging when double-tap is detected.
            return;
        }
        lastTap = currentTime;
        // Start dragging if it isn't a double-tap.
        startDrag(e, pegType, targetHole.id);
    });
        const img = document.createElement('img');
        img.src = `images/meeple/${pegType}.jpg`;
        img.classList.add('pegInHole');
        img.alt = cult[pegType]?.string || "Altar";
        pegDiv.appendChild(img);
        targetHole.appendChild(pegDiv);
        gridState[targetHole.id] = pegType;

        // Update bonuses (if applicable). In restore mode, row and col are provided.
        checkAdjacencyAndApplyBonuses(row, col);
        cleanupPegDragInfo();
    }
}

function cleanupPegDragInfo() {
    document.querySelectorAll('.dragging-clone').forEach(el => el.remove());//gets rid of clones
    pegDragInfo.activePeg = null;
    pegDragInfo.draggedPeg = null;
    pegDragInfo.draggedFromHole = null;
    pegDragInfo.initialParent = null;
    pegDragInfo.initialNextSibling = null;
}


function revertPeg() {
    // Return the dragged peg to its original container if available
    if (pegDragInfo.initialParent && pegDragInfo.activePeg) {
        if (pegDragInfo.initialNextSibling) {
            pegDragInfo.initialParent.insertBefore(pegDragInfo.activePeg, pegDragInfo.initialNextSibling);
        } else {
            pegDragInfo.initialParent.appendChild(pegDragInfo.activePeg);
        }
    }
    // Clear any inline styling
    if (pegDragInfo.activePeg) {
        pegDragInfo.activePeg.style.position = '';
        pegDragInfo.activePeg.style.left = '';
        pegDragInfo.activePeg.style.top = '';
        pegDragInfo.activePeg.style.zIndex = '';
    }
}


function removePeg(event) {
    const pegDiv = event.target.closest('.peg'); // Get the peg div
    const hole = pegDiv.parentNode; // Get the parent hole
    const pegType = gridState[hole.id]; // Get the peg type from the grid state
    if (pegType) {
        // Remove the peg from the hole
        hole.removeChild(pegDiv);

        // Update the grid state to reflect that the hole is empty
        gridState[hole.id] = null;

        if(pegType !== "altar"){
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
        blockedHoles: []  // 0 holes
    }, 
    basement: { 
        tab: "Basement",
        title: "School Basement",
        rows: 5,
        columns: 5, 
        blockedHoles: [ 
            'hole-3-3'  // 1 hole
        ] 
    }, 
    motel: { 
        tab: "Motel",
        title: "Seedy Motel",
        rows: 6, 
        columns: 6, 
        blockedHoles: [ 
            'hole-2-2', 'hole-4-4'  // 2 holes
        ] 
    }, //second run
    lodge: { 
        tab: "Lodge",
        title: "Masonic Lodge",
        rows: 6, 
        columns: 8, 
        blockedHoles: [ 
            'hole-3-2', 'hole-3-4', 'hole-3-6'  // 3 holes
        ] 
    }, 
    compound: { 
        tab: "Compound",
        title: "Militant Compound",
        rows: 7, 
        columns: 10, 
        blockedHoles: [ 
            'hole-2-2', 'hole-4-4', 'hole-6-6', 'hole-5-5' // 4 holes
        ] 
    }, 
    mansion: { 
        tab: "Mansion",
        title: "Isolated Mansion",
        rows: 8, 
        columns: 12, 
        blockedHoles: [ 
            'hole-1-1', 'hole-8-12', 'hole-1-12', 'hole-8-1', 'hole-4-6'  // 5 holes
        ] 
    }, 
    silo: { 
        tab: "Silo",
        title: "Nuclear Silo",
        rows: 8, 
        columns: 14, 
        blockedHoles: [ 
            'hole-2-4', 'hole-6-8', 'hole-2-8', 'hole-6-4', 'hole-2-12', 'hole-6-12'  // 6 holes
        ] 
    }, 
    cathedral: { 
        tab: "Cathedral",
        title: "Obscene Cathedral",
        rows: 8, 
        columns: 16, 
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
    holes[i].style.height = `${cellHeight}dvh`; // Change the height
    }
}
                                                        //=========================================
                                                                                               // The Grid change
                                                        //=========================================
function replaceGrid(newGridConfig) { // %% New function to replace the grid
    gridChosen = newGridConfig;
    const grid = document.getElementById("activeAltarGrid"); // %% Get the active grid element
    // Store current pegs before clearing the grid
    const existingPegs = {}; // %% Object to hold current pegs
    for (const holeId in gridState) { // %% Loop through existing grid state
        const pegType = gridState[holeId]; // %% Get the peg type in the current hole
        if (pegType) { // %% If there is a peg
            existingPegs[holeId] = pegType; // %% Store peg type and its hole ID
        }
    }
    // Clear the current grid layout and reset grid state
    while (grid.firstChild) { // %% Remove all current holes from the grid
        grid.removeChild(grid.firstChild);
    }
    // Reset the gridState object
    Object.keys(gridState).forEach(key => delete gridState[key]); // %% Clear existing grid state

    // Update rows and columns based on new configuration
    ({ rows, columns, blockedHoles } = grids[newGridConfig]);//replaces grid variables
    for (let row = 1; row <= rows; row++) { // %% Loop through new rows
        for (let col = 1; col <= columns; col++) { // %% Loop through new columns
            const holeId = `hole-${row}-${col}`; // %% Generate hole ID
            gridState[holeId] = null; // %% Initialize new holes as empty

            // Create new holes
            const hole = document.createElement('div'); // %% Create a new hole element
            hole.id = holeId; // %% Set the ID for the new hole
            hole.classList.add('hole'); // %% Add hole class

            // Check if this hole is blocked and apply styles
            if (blockedHoles.includes(holeId)) { // %% Check if the hole is blocked
                hole.classList.add('blocked'); // %% Mark the hole as blocked
            } 
            // Append the new hole to the grid
            grid.appendChild(hole); // %% Add the new hole to the grid
        }
    }
    // Attempt to reassign pegs to the new grid layout
    for (const [holeId, pegType] of Object.entries(existingPegs)) { // %% Loop through stored pegs
        const originalRowCol = holeId.split('-').slice(1); // %% Get row and column from holeId
        const newHoleId = `hole-${originalRowCol[0]}-${originalRowCol[1]}`; // %% Calculate new hole ID

        // If the new hole is not blocked and is empty, place the peg
        if (gridState[newHoleId] === null && !document.getElementById(newHoleId).classList.contains('blocked')) { // %% Check for valid placement
            // Create peg element
            const pegDiv = document.createElement('div'); // %% Create new peg div
            pegDiv.classList.add('peg'); // %% Add peg class
            // Use pointer events exclusively
            pegDiv.onpointerdown = (event) => startDrag(event, pegType, holeId);
            pegDiv.ondblpointerdown = (event) => removePeg(event);
        // Create peg label
        const text = document.createElement('div'); // %% Create text element
        text.classList.add('pegInHole'); // %% Add class for styling
        if (pegType !== "altar") {
            text.textContent = cult[pegType].string; // %% Set text from cult string
        } else {
            text.textContent = "Altar"; // %% Fallback text
        }
        // Append text to peg div
        pegDiv.appendChild(text); // %% Append text to peg div

            document.getElementById(newHoleId).appendChild(pegDiv); // %% Add peg to new hole

            // Update grid state
            gridState[newHoleId] = pegType; // %% Update grid state for new hole
        } else {
            if(pegType !== "altar"){
                // If not placeable, return to pool
                cult[pegType].unplaced++; // %% Increment unplaced count
                cult[pegType].placed--; // %% Decrement placed count
                // Update the peg count display in the peg pool
                const countDisplay = document.querySelector(`#${pegType}Unplaced`); // %% Get the peg count display
                countDisplay.innerText = cult[pegType].unplaced; // %% Update displayed count
            }
        }
    }
    updateGridConfig();
    // Call updatePegCounts to refresh counts in the UI
    updatePegCounts(); // %% Refresh peg counts
    
}

function clearGrid() {
    const grid = document.getElementById("activeAltarGrid");
    for (const holeId in gridState) {
        const pegType = gridState[holeId];
        if (pegType) {
            if (pegType !== "altar") {
                cult[pegType].unplaced++;
                cult[pegType].placed--;
                const countDisplay = document.querySelector(`#${pegType}Unplaced`);
                countDisplay.innerText = cult[pegType].unplaced;
            }
            gridState[holeId] = null;
        }
    }
    const pegs = grid.querySelectorAll('.peg');
    pegs.forEach(peg => peg.remove());
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
    lagh:{
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
let altarPlaced = false;
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
 function tulu(){
     if(altars.tulu.current === true){
         altars.tulu.radCounter[0]++;
         if(altars.tulu.radCounter[0] >= altars.tulu.radCounter[1]){
             altars.tulu.radCounter[0] = 0;
             numberChange('stats', 'radiance', 1, 'blue');
             numberChange('stats', 'health', -4, '', 'red');
         }
         altars.tulu.sacCounter[0]++;
         if(altars.tulu.sacCounter[0] >= altars.tulu.sacCounter[1]){
             altars.tulu.sacCounter[0] = 0;
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
    chantersTotal: 0,
    sentinelsTotal: 0,
    priestsTotal: 0
};

function checkAdjacencyAndApplyBonuses(time) {
    // Reset adjacency counters for each type
    adjacentNumbers.chantersTotal = 0;
    adjacentNumbers.sentinelsTotal = 0;
    adjacentNumbers.priestsTotal = 0;
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

            // Hybrids can act as sentinels for terror bonuses and faithful for others
            if (currentPeg === 'chanters' || currentPeg === 'sentinels' || currentPeg === 'priests' || currentPeg === 'hybrids') {
                let adjacentFaithfulCount = 0;
                let isAdjacentToAltar = false;

                // Check adjacency to faithful or hybrid pegs and altar for each direction
                directions.forEach(([dx, dy]) => {
                    const adjRow = row + dx;
                    const adjCol = col + dy;
                    const adjacentHole = `hole-${adjRow}-${adjCol}`;

                    if (gridState[adjacentHole] === 'faithful' || gridState[adjacentHole] === 'hybrids') {
                        adjacentFaithfulCount += 1;
                    }
                    if (gridState[adjacentHole] === 'altar') {
                        isAdjacentToAltar = true;
                    }
                });

                // Increment totals for each peg type based on adjacency
                if (currentPeg === 'chanters') {
                    if (isAdjacentToAltar && currentAltar === 'oak') {
                        adjacentFaithfulCount *= 2; // Apply oak altar multiplier
                    }
                     adjacentFaithfulCount *= Math.max(1, Math.ceil(cult.chanters.outMultiplier)); //shard multiplier
                    adjacentNumbers.chantersTotal += adjacentFaithfulCount;
                } else if (currentPeg === 'sentinels' || currentPeg === 'hybrids') {
                    if (isAdjacentToAltar) {
                        if (currentAltar === 'blood') {
                            adjacentFaithfulCount *= 2;
                        } else if (currentAltar === 'obsidian' || currentAltar === 'bone') {
                            adjacentFaithfulCount *= 4;
                        }
                    }
                     adjacentFaithfulCount *= Math.max(1, Math.ceil(cult.sentinels.outMultiplier));//shard multiplier
                    adjacentNumbers.sentinelsTotal += adjacentFaithfulCount;
                } else if (currentPeg === 'priests') {
                    if (isAdjacentToAltar) {
                        if (currentAltar === 'marble') {
                            adjacentFaithfulCount *= 2;
                        } else if (currentAltar === 'ivory') {
                            adjacentFaithfulCount *= 4;
                        }
                    }
                    adjacentNumbers.priestsTotal += adjacentFaithfulCount;
                }
            }
        }
    }
//final calculations
    // Update the info box with the adjacency totals
        document.getElementById('loveBonus').innerText = adjacentNumbers.chantersTotal;
        adjacentNumbers.chantersTotal = applySoftcap('chanters', 'love', adjacentNumbers.chantersTotal, 16);

        document.getElementById('terrorBonus').innerText = adjacentNumbers.sentinelsTotal;
        adjacentNumbers.sentinelsTotal = applySoftcap('sentinels', 'terror', adjacentNumbers.sentinelsTotal, 16);
        
        if(cult.priests.altar=== true){
            adjacentNumbers.priestsTotal*=2;
            document.getElementById('goldBonus').innerText = adjacentNumbers.priestsTotal;
        }

    if(time === 'time'){
        
        numberChange('vault', 'love', adjacentNumbers.chantersTotal, 'pink', 'red'); // Apply total love from adjacency with softcap
        numberChange('vault', 'terror', adjacentNumbers.sentinelsTotal, 'red', 'blue'); // Apply total terror from adjacency with softcap
        numberChange('vault', 'gold', adjacentNumbers.priestsTotal, 'yellow', 'red'); // Apply total gold from adjacency 
    }
}

altarInfo();
initializeRoom();