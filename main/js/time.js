let totalTime = {
    total: 0,
    timeInit: 0,
    timeFinal: 0
};

function timeSpent() {
    const currentTime = Date.now();
    const timeDifference = (currentTime - totalTime.timeInit) / 60000;
    totalTime.total += timeDifference;
    totalTime.timeInit = currentTime;
    comment("We have stolen " + Math.floor(totalTime.total)+ " minutes of your life.");
}
function resetGame(){
    eventBox("images/world/crypt.jpg", "Reset Game", "Left Button resets this run only. Permanent gains kept. Right Button resets all progress.");
     let parent = document.getElementById('eventBox');
        let restartRun =  document.createElement('button');
        restartRun.className = 'eventButtonsLeft';
        restartRun.id = "restartRun";
        restartRun.innerHTML = 'Restart Run';
        parent.appendChild(restartRun);
        let resetGame =  document.createElement('button');
        resetGame.className = 'eventButtonsRight'; 
        resetGame.id = "resetGame";
        resetGame.innerHTML = 'Reset Game';
        parent.appendChild(resetGame);
        document.getElementById('restartRun').addEventListener('pointerdown', () => {
            window.removeEventListener("beforeunload", saveToLocalStorage);
            localStorage.clear();
            localStorage.setItem("resetRunStats", JSON.stringify(stats)); //stats
            localStorage.setItem("savedPermanentChanges", JSON.stringify(permanentChanges)); 
            localStorage.setItem("savedPermanentMadness", JSON.stringify(permanentMadness)); 
            localStorage.setItem("savedShardBuys", JSON.stringify(shardBuys)); 
            localStorage.setItem("savedTime", JSON.stringify(totalTime)); 
            location.reload();
        }); 
        document.getElementById('resetGame').addEventListener('pointerdown',   () => {
            window.removeEventListener("beforeunload", saveToLocalStorage);
            localStorage.clear();
            location.reload();
        }); 
}
function resetRunPost(){
    let savedStats = localStorage.getItem("resetRunStats");
    let statsTemp =  JSON.parse(savedStats);
    let savedPermanentChanges = localStorage.getItem("savedPermanentChanges");
    permanentChanges = JSON.parse(savedPermanentChanges); 
    if(permanentChanges.immortality === true){ //immortality code block moved to immortality()
         immortality(statsTemp);
    }else{
        window.console.log('dead');   
        stats.shards.current = statsTemp.shards.current;
    }
    if(statsTemp.shards.unlocked === true){
        stats.shards.unlocked === true;
        document.getElementById('shards').innerHTML = stats.shards.current;
        document.getElementById('shardsBox').style.display='block';
        stats.health.max -= stats.shards.current;
        stats.health.current -= stats.shards.current;
        document.getElementById('health').innerHTML = stats.health.current;
        shardsBoughtLoad();                                
        domUnlocks.divinity = true;
        document.getElementById('divinityTab').style.display='block';
    }
    let storedTime = localStorage.getItem("savedTime"); 
    totalTime = JSON.parse(storedTime); 
    window.console.log('Run reset');
    closeEventBox();
    saveToLocalStorage();
}

   	//=========================================
	// follower actions
	//=========================================

function faithful(tics){    
    cult.faithful.ticCounter[0] += tics;
    if(cult.faithful.ticCounter[0] >= cult.faithful.ticCounter[1]){
        cult.faithful.ticCounter[0] -= cult.faithful.ticCounter[1];
        let outputTypes = ['love', 'terror', 'gold'];
        let outputKeys = Object.keys(outputTypes);
        let outputKey = Math.floor(Math.random() * outputKeys.length);//choice made for type
        const currentValue = vault[outputTypes[outputKey]].current;//current 
        let outputTotal = Math.max((cult.faithful.current + cult.hybrids.current)* cult.faithful.outMultipliers[outputKey], 0);
        if(outputTypes[outputKey] === 'love'){
            const loveChange = applySoftcap('faithful', 'love', outputTotal, 16);
            numberChange('vault', outputTypes[outputKey], loveChange, '#FF559D', 'red');
        }else if(outputTypes[outputKey] === 'terror'){
            if(madBools[0] === true){
                outputTotal += Math.sqrt(Math.max(1, cult.faithful.current));// scaling of terror to current madness
            }
            outputTotal = applySoftcap('faithful', 'terror', outputTotal, 16);
            numberChange('vault', outputTypes[outputKey], outputTotal, 'red', 'red');
        }
        if(outputTypes[outputKey] === 'gold'){
            numberChange('vault', outputTypes[outputKey], outputTotal, 'yellow', 'red');
        }
    }
}

function applySoftcap(pegType, resource, potentialIncrease, baseMultiplier) {
    let softcap = 0;
    if(pegType === "faithful"){
            softcap = (cult.faithful.current + cult.hybrids.current) * 16;
    }else{
        softcap = (cult[pegType].current * (cult.faithful.current + cult.hybrids.current)) * baseMultiplier;
    }
    const currentResource = vault[resource].current; // Current value in vault (love, terror, or gold)
    const remainingCapacity = softcap - currentResource;
    if (remainingCapacity <= 0) {
        return 0; // Cap reached, no increase allowed
    }
    // Apply reduction only when currentResource exceeds 80% of softcap
    const threshold = 0.8 * softcap;
    let diminishingFactor = 1;
    if (currentResource > threshold) {
        const excess = currentResource - threshold;
        const effectiveCapacity = softcap - threshold; // Only the last 20% of the softcap is reduced
        diminishingFactor = 1 - excess / effectiveCapacity; // Linearly reduce from 1 to 0
    }
    const delta = potentialIncrease * Math.max(diminishingFactor, 0); // Ensure no negative values
    return Math.min(Math.floor(delta), remainingCapacity);

}

function chanters(tics) {
    if (cult.faithful.current + cult.hybrids.current > 0) {
        cult.chanters.ticCounter[0] += tics;
        if (cult.chanters.ticCounter[0] >= cult.chanters.ticCounter[1]) {
            cult.chanters.ticCounter[0] -= cult.chanters.ticCounter[1];
            let loveBump = 0;
            let charmBump = 0;
            loveBump += cult.chanters.outMultiplier * (cult.chanters.current + (cult.faithful.current + cult.hybrids.current)/4);
            charmBump += cult.chanters.outMultiplier * (cult.chanters.current +  (cult.faithful.current + cult.hybrids.current)/4);
            const loveChange = applySoftcap('chanters', 'love', loveBump, 16);
            numberChange('vault', 'love', loveChange, '#FF559D', 'red');
            if(tics !== 4){
                numberChange('stats', 'charm', charmBump, '#FFFF00', 'red');
            }
        }
    }
}

function sentinels(tics) {
    if (cult.faithful.current + cult.hybrids.current > 0) {
        cult.sentinels.ticCounter[0] += tics;
        if (cult.sentinels.ticCounter[0] >= cult.sentinels.ticCounter[1]) {
            cult.sentinels.ticCounter[0] -= cult.sentinels.ticCounter[1];
            const terrorBump = cult.sentinels.outMultiplier * (cult.sentinels.current + cult.hybrids.current + cult.faithful.current + cult.hybrids.current); 
            const terrorChange = applySoftcap('sentinels', 'terror', terrorBump, 16);
            numberChange('vault', 'terror', terrorChange, 'red', 'blue');
        }
    }
}
function scribes(tics) {
    cult.scribes.ticCounter[0] += tics;
    window.console.log(tics,  cult.scribes.ticCounter);
    if (cult.scribes.ticCounter[0] >= cult.scribes.ticCounter[1]) {
        cult.scribes.ticCounter[0] -= cult.scribes.ticCounter[1];
        vault.tomes.pageCounter += cult.scribes.current;
        document.getElementById('pages').innerHTML = Math.floor(vault.tomes.pageCounter);
    }
}

let ticC = {
  healthCounter: [0, 4],
  terrorCounter: [0, 4],
  gridCounter: [0, 4]
};
function healthCheck(){
    if(ticC.healthCounter[0] < ticC.healthCounter[1]){
        ticC.healthCounter[0]++;
    }else{
        ticC.healthCounter[0] = 0;
        if(stats.health.current < stats.health.max - 1){
            numberChange('stats', 'health', 1, 'blue', 'red');
        }else if(stats.health.current > stats.health.max + 1){
            numberChange('stats', 'health', -1, 'blue', 'red');
        }
    }
}
function loveTerrorChecks(){
    if(ticC.terrorCounter[0] < ticC.terrorCounter[1]){
        ticC.terrorCounter[0]++;
    }else{
        ticC.terrorCounter[0] = 0;
        if((vault.terror.current) > (vault.love.current * 4)  && (vault.terror.current >20) && (vault.love.current>8)){
            let diff = vault.terror.current - vault.love.current;
            if(cult.innocents.current >= 1){
                numberChange('cult', 'innocents', -1, 'green', 'red');
                numberChange('cult', 'insane', 1, 'green', 'red');
                numberChange('vault', 'terror', (-diff/4) , 'red', 'blue');
                if(cult.insane.unlocked === false){
                    cult.insane.unlocked = true;
                    document.getElementById('insaneWrap').style.display='block';
                }
                comment('One of the Innocents gone mad. There was too little Love to conquer their Terror. (Terror -' + Math.floor(diff/4) +')', 'red', 'red');
            }else if(cult.faithful.current >= 1){
                numberChange('cult', 'faithful', -1 , 'red', 'blue');
                numberChange('vault', 'terror', (-diff/2) , 'red', 'blue');
                comment('One of the Faithful has fled. There was too little Love to conquer their Terror. (Terror -' + Math.floor(diff/2) +')', 'red', 'red');
            }else{
                window.console.log('Boom!'); //should not happen
            }
        }
    }
}
function pitsOn(tics){//breeding pits 40 counter/level
    if(terrorCrafts.breedingPits.level > 0){
        if(terrorCrafts.breedingPits.counter[0] < terrorCrafts.breedingPits.counter[1]){
            terrorCrafts.breedingPits.counter[0] += tics * terrorCrafts.breedingPits.level;
        }else{
            terrorCrafts.breedingPits.counter[0] = 0;
            if(terrorCrafts.breedingPits.shub === true){
                numberChange('cult', 'innocents', 4, 'blue', '');
                comment('Iä! New lives join the fold...  (+4 Innocents come up from the Pits, Terror +88)', 'red');
                numberChange('vault', 'terror', 88, 'red', '');
            }else{
                numberChange('cult', 'innocents', 1, 'blue', '');
                comment('a new life joins the fold...  (+1 Innocent comes up from the Pits, Terror +44)', 'red');
                numberChange('vault', 'terror', 44, 'red', '');

            }
        }
    }
}
function  gridTime(tics){
        if(ticC.gridCounter[0] < ticC.gridCounter[1]){
        ticC.gridCounter[0] += tics;
    }else{
        ticC.gridCounter[0] -= ticC.gridCounter[1];
        checkAdjacencyAndApplyBonuses('time');
    }
}

    	//=========================================
	// time
	//=========================================
let timeCheck = [0,20];
function performOneTic(tics){
    if(timeCheck[0] < timeCheck[1]){ //quick check that time is working
        timeCheck[0]++;
    }else{
        timeCheck[0]=0;
        window.console.log('20 seconds');
    }
    //things to do, functions to call
    healthCheck();
    loveTerrorChecks();
    loopMadness(tics);
    checkUnlockCounter(tics);
    if(deadBool === false){
        dyingCheck();
        madCheck();
    }else{
        shardDeadCheck();
    }
    if(actions.chant.toggle === true){
        autoChant(tics);
    }
    if(cult.faithful.current >0){
        faithful(tics);
    }
    if(cult.chanters.current >0){
        chanters(tics);
    }    
    if(cult.sentinels.current >0){
        sentinels(tics);
    }
    if(cult.priests.current >0){
        priests(tics);
    }
    if(cult.scribes.current >0){
        scribes(tics);
    }
    if(goldCrafts.tithe.toggle === true){
        tithe();
    }
    gridTime(tics);
    tulu();
    pitsOn(tics);
    relicsTic(); 
};

let previousTimestamp = 0;
let partialTics = 0;
let ticDuration = 800;
let tics = 0;
let stamp;
function gameTimer(timestamp) {
    //calculate tics
    let timeDifference = timestamp - previousTimestamp;
    previousTimestamp = timestamp;
    partialTics += timeDifference;
    tics = Math.floor(partialTics / ticDuration);
    if(tics >0){
        //removes timestamps equal to tics being used
    partialTics = partialTics - (tics*ticDuration);
    //calls perform one tic
    performOneTic(tics);
    }
    //resets timer so the loop continues
    if(schTogg){
    requestAnimationFrame(gameTimer);
    }
}
//turns time on and off
let schTogg = null;
function timeOn() {
        previousTimestamp = performance.now(); //should update regular time
        schTogg = window.requestAnimationFrame(gameTimer);
    }
function timeOff(){ 
        window.cancelAnimationFrame(schTogg);
        schTogg = null;
}
function schTogFunc(){
    if(!schTogg){
        timeOn();
    }else{
        timeOff();
    }
}

//return from afk
let afkStamp = performance.now();
function afk(){
    let currentTimestamp = performance.now();
    let timePassed = currentTimestamp - afkStamp;
    let tics = timePassed/800;
    //window.console.log("tics ", tics);
    let afks={
        madness:0,
        love:0,
        terror:0,
        gold:0
    };
    if(tics >=8){
        for (let i = 1; i < tics; i +=4) {//4tics for almost everything
            // Faithful Output (Love, Terror, Gold)
            if(cult.faithful.current >0){
                faithful(2);
                faithful(2);
            }
            if(cult.chanters.current >0){
                chanters(4);
                afks.love += adjacentNumbers.chantersTotal;
                afks.love = applySoftcap('chanters', 'love', afks.love, 16);
            }    
            if(cult.sentinels.current >0){
                sentinels(4);
                afks.terror += adjacentNumbers.sentinelsTotal;
                afks.terror = applySoftcap('sentinels', 'terror', afks.terror, 16);
            }  
            afks.gold += adjacentNumbers.priestsTotal;
            if(cult.priests.vaultAction && cult.priests.vaultActions === true && cult.priests.current >0){
                const choice = cult.priests.vaultAction;
                // Split the choice at the "-" to get first and second assets
                const [firstAsset, secondAsset] = choice.split('-');
                const firstAssetAmount = vault[firstAsset].current + afks[firstAsset];
                if(firstAssetAmount >= 16){
                    const priestCount = cult.priests.current;
                    let loss =  firstAssetAmount/8;
                    let gain =  loss/(16/(1 + priestCount));
                    afks[firstAsset] -= loss; //1/8th
                    afks[secondAsset] = gain; 
                }
            }
            if(goldCrafts.tithe.toggle === true &&  (vault.love.current + afks.love) >= 16){
                let loss = (vault.love.current + afks.love)/8;
                afks.love -= loss;
                afks.gold += loss/8;
                window.console.log(loss, "loss");
            }
            //sacrarium gods and such
            if(domUnlocks.sacrarium === true){//relics all set to 4 tics at current
                    relicsTic(4);
            }
            //shards madness
            if(permanentMadness >=1){
            afks.madness += permanentMadness/2;
            }
        }
        //math for time
        let timeAfk = Math.floor(timePassed / 60000);
        comment("West was idle for " + timeAfk + " minutes but the Cult remained active. (West stats do not change, toggles deactivated.)");
        //end updates
        numberChange("stats", "madness", afks.madness, "blue", "");
        numberChange('vault', 'love', afks.love, '#FF559D', 'red');
        numberChange('vault', 'terror', afks.terror, 'red', 'blue');
        numberChange('vault', 'gold', afks.gold, 'yellow', 'red');
        window.console.log(tics, "tics", afks);
    }
}
// off time recorded in save
function offlineProgress(){
    // Retrieve last offline timestamp from storage
    let lastOffline = localStorage.getItem("savedOfflineTimestamp") 
    ? JSON.parse(localStorage.getItem("savedOfflineTimestamp")) 
    : performance.now();
    let currentTimestamp = Date.now();
    let timePassed = currentTimestamp - lastOffline; // Time in ms
    // Cap offline duration at 88 minutes (88 * 75 * 1000 ms) and calculate tics
    let tics = Math.min(timePassed / 1000, 44 * 75); // Cap tics at equivalent of 88 minutes
    let decayRate = 0.04; // 4% decay every 75 tics
    let offlineOutput = {
        love: 0,
        terror: 0,
        gold: 0
    };
    // Loop through each 75-tic chunk
    if(tics >= 75){
        for (let i = 0; i < tics; i += 75) {
            // Calculate decay for each 75-tic interval
            let decayMultiplier = Math.exp(-decayRate * Math.floor(i / 75));
            // Faithful Output (Love, Terror, Gold)
            if (cult.faithful.current >= 1) {
                if((vault.love.current + offlineOutput.love) <= ((cult.faithful.current +cult.hybrids.current) * 16)){
                    offlineOutput.love += cult.faithful.current * cult.faithful.outMultipliers[0] / 6 * 75 * decayMultiplier;
                }
                if((vault.terror.current + offlineOutput.terror) <= ((cult.faithful.current +cult.hybrids.current) * 16)){
                    offlineOutput.terror += cult.faithful.current * cult.faithful.outMultipliers[1] / 6 * 75 * decayMultiplier;
                }
                    offlineOutput.gold += cult.faithful.current * cult.faithful.outMultipliers[2] / 6 * 75 * decayMultiplier;
                }
            // Chanters Output (Love)
            if (cult.chanters.current >= 1) {
                if((vault.love.current + offlineOutput.love) <= (cult.chanters.current *(cult.faithful.current +cult.hybrids.current) * 16)){
                    offlineOutput.love += adjacentNumbers.chantersTotal * tics/4 * decayMultiplier;
                    let chanterBase = cult.chanters.outMultiplier * (cult.chanters.current + (cult.faithful.current + cult.hybrids.current) / 4);
                    offlineOutput.love += chanterBase * 1 / 8 * 75 * decayMultiplier;
                }
            }
            // Sentinels Output (Terror)
            if (cult.sentinels.current >= 1) {
                if((vault.terror.current + offlineOutput.terror) <= (cult.sentinels.current *(cult.faithful.current +cult.hybrids.current) * 16)){
                    offlineOutput.terror += adjacentNumbers.sentinelsTotal * tics/4 * decayMultiplier;
                    let sentinelBase = cult.sentinels.outMultiplier * (cult.sentinels.current + (cult.faithful.current + cult.hybrids.current) / 4);
                    offlineOutput.terror += sentinelBase * 1 / 8 * 75 * decayMultiplier;
                }
            }
            offlineOutput.gold += adjacentNumbers.priestsTotal * tics/4 * decayMultiplier;
            offlineOutput.love = applySoftcap('chanters', 'love', offlineOutput.love, 16);
            offlineOutput.terror = applySoftcap('sentinels', 'terror', offlineOutput.terror, 16);
        }
    }
    numberChange('vault', 'love', offlineOutput.love, '#FF559D', 'red');
    numberChange('vault', 'terror', offlineOutput.terror, 'red', 'blue');
    numberChange('vault', 'gold', offlineOutput.gold, 'yellow', 'red');
    eventBox("images/eventImages/opener.jpg", "Welcome Back", "As soon as West left, the Priests grew indolent, the Chanters voices' fell and the Sentinels relaxed. Without West, the Sacrarium darkened and the Gods slept. (While offline, West's stats do not change. Priests stop all activities and tithing ceases. Cultist output diminishes over 88 minutes to zero. The Gods do not feed and occult objects lie dormant.) ");
}