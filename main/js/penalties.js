/* 
penalties for low health and charm, high madness, low love, high terror
vision never goes down.
 */
// Function to start coma state and lock interactions
function comaLock() {
    comment('Tsk Tsk. Lost in Dreams... (West fell into a coma)', 'red');
    changeTab('west');

    // Disable all interactions by adding disable-all-events class
    document.getElementById("mainWrapper").classList.add("disable-all-events");

    // Lock out all pointerdowns during coma
    document.addEventListener("pointerdown", preventComapointerdowns, true);
    
    // Set coma state in stats and start the timer
    stats.health.coma = true;
    startDreamTimer('coma');

    // Set timeout to unlock coma state after 8 seconds
    setTimeout(comaUnlock, 8000);
}

// Helper function to block pointerdowns during coma
function preventComapointerdowns(event) {
    event.stopPropagation();
    event.preventDefault();
}

// Function to end coma state and unlock interactions
function comaUnlock() {
    // Remove the disable-all-events class from appContainer to re-enable interactions
    document.getElementById("mainWrapper").classList.remove("disable-all-events");

    // Remove pointerdown blocker for coma
    document.removeEventListener("pointerdown", preventComapointerdowns, true);
    endDreamTimer();
    // Reset coma status
    stats.health.coma = false;
}


function dyingCheck(){
    if(stats.health.dyingCounter[0] <stats.health.dyingCounter[1]){
        stats.health.dyingCounter[0]++;
    }else{
        stats.health.dyingCounter[0] = 0;
        if(stats.health.current < 20 && stats.health.dyingB === false){
            stats.health.dyingB = true;
            comment('It would be a pity to end the game so soon. (low health)', 'pink');
        }else if(stats.health.current <0 &&  stats.health.coma === false){
            if(stats.health.max <=0){
                deadLock();
            }else{
             comaLock();
         }
        }else if(stats.health.current > 40 && stats.health.dyingB === true){
            dyingB= false;
        }
    }
}
 let deadBool = false;
 function deadLock(){
                comment("Overcome by the Divine Shards, West's Health has failed completely. He starts to drift away from this plane but takes a moment to consider. (Divinity Tab)");
    changeTab('divinity');
// Disable events
document.getElementById("westTab").classList.add("disable-events");
document.getElementById("cultTab").classList.add("disable-events");
document.getElementById("expeditionsTab").classList.add("disable-events");
document.getElementById("sacrariumTab").classList.add("disable-events");
deadBool = true;
}
function deadUnlock(){
    comment('One could hold more shards if they were healthy enough.', 'green');
    document.getElementById("westTab").classList.remove("disable-events");
    document.getElementById("cultTab").classList.remove("disable-events");
    document.getElementById("expeditionsTab").classList.remove("disable-events");
    document.getElementById("sacrariumTab").classList.remove("disable-events");
}
function shardDeadCheck(){
    if(deadBool === true){
        if(stats.health.max >0){
            deadBool = false;
            deadUnlock();
        }
    }
}
