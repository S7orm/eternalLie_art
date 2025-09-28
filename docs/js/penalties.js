function dyingCheck(){
    if(stats.health.current <0){
        if(stats.health.max<=0 && stats.health.dead===false){
            deadLock();
        }else if (stats.health.coma === false){
            comaLock();
        }
    }else if(stats.health.max<=0 && stats.health.dead===true){
        deadUnlock();
    }
}

function comaLock() {
    comment('Tsk Tsk. Lost in Dreams... (West must sleep to regain Health)', 'red');
    changeTab('west');
    document.getElementById("mainWrapper").classList.add("disable-all-events");
    document.addEventListener("pointerdown", preventComapointerdowns, true);
    stats.health.coma = true;
    startDreamTimer('coma');
    setTimeout(comaUnlock, 8000);
}

// Helper function to block pointerdowns during coma
function preventComapointerdowns(event) {
    event.stopPropagation();
    event.preventDefault();
}

// Function to end coma state and unlock interactions
function comaUnlock() {
    document.getElementById("mainWrapper").classList.remove("disable-all-events");
    document.removeEventListener("pointerdown", preventComapointerdowns, true);
    endDreamTimer();
    stats.health.coma = false;
}

 function deadLock(){
    comment("Overcome by the Divine Shards, West's Health has failed completely. He starts to drift away from this plane but takes a moment to consider. (Divinity Tab)");
    changeTab('divinity');
    // Disable events
    document.getElementById("westTab").classList.add("disable-events");
    document.getElementById("cultTab").classList.add("disable-events");
    document.getElementById("expeditionsTab").classList.add("disable-events");
    document.getElementById("sacrariumTab").classList.add("disable-events");
    stats.health.dead=true;
}
function deadUnlock(){
    comment('One could hold more shards if they were healthy enough.', 'green');
    document.getElementById("westTab").classList.remove("disable-events");
    document.getElementById("cultTab").classList.remove("disable-events");
    document.getElementById("expeditionsTab").classList.remove("disable-events");
    document.getElementById("sacrariumTab").classList.remove("disable-events");
    stats.health.dead=false;
}

