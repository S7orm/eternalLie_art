let totalTime = {
    total: 0,
    timeInit: 0,
    timeFinal: 0,
    timeSession: 0
};

function timeSpent() {
    const currentTime = Date.now();
    const timeDifference = (currentTime - totalTime.timeInit) / 60000;
    totalTime.total += timeDifference;
    totalTime.timeSession += currentTime - totalTime.timeInit;
    totalTime.timeInit = currentTime;
    comment("We have stolen " + Math.floor(totalTime.total)+ " minutes of your life.");
}


   	//=========================================
	// follower actions
	//=========================================

function faithful(tics) {
    cult.faithful.ticCounter[0] += tics;
    if (cult.faithful.ticCounter[0] >= cult.faithful.ticCounter[1]) {
        cult.faithful.ticCounter[0] -= cult.faithful.ticCounter[1];
        const totalFollowers = cult.faithful.current + cult.hybrids.current + cult.brined.current;
        const baseOutput = Math.max(totalFollowers, 0);
        const resources = [
            { type: 'love', multiplierIndex: 0, color: '#FF559D', bgColor: 'red' },
            { type: 'terror', multiplierIndex: 1, color: 'red', bgColor: 'red' },
            { type: 'gold', multiplierIndex: 2, color: 'yellow', bgColor: 'red' }
        ];
        const basePerResource = Math.floor(baseOutput / 3);
        const remainder = baseOutput % 3;
        resources.forEach((resource, index) => {
            let amount = basePerResource + (index < remainder ? 1 : 0);
            amount *= cult.faithful.outMultipliers[resource.multiplierIndex];
            if (resource.type === 'love') {
                if (tyogCrafts.festival.active) amount *= 2;
                if (tyogCrafts.snakeHandling.active) amount *= 2;
            } else if (resource.type === 'terror') {
                if (tyogCrafts.invokeYog.active) amount *= 4;
                if (tyogCrafts.snakeHandling.active) amount *= 2;
                if (tyogCrafts.festival.active) amount /= 2;
            } else if (resource.type === 'gold') {
                if (tyogCrafts.festival.active) amount *= 2;
            }
            let hasActiveCrafts = false;
            if (resource.type === 'love') {
                hasActiveCrafts = tyogCrafts.festival.active || tyogCrafts.snakeHandling.active;
            } else if (resource.type === 'terror') {
                hasActiveCrafts = tyogCrafts.invokeYog.active || tyogCrafts.snakeHandling.active;
            }
            if (!hasActiveCrafts && resource.type!=="gold") {
                amount = applySoftcap('faithful', resource.type, amount);
            }
            if (amount > 0) {
                numberChange('vault', resource.type, amount, resource.color, resource.bgColor);
            }
        });
    }
}


function applySoftcap(pegType, resource, potentialIncrease) {
    let softcap = 0;
    if(pegType === "faithful"){
            softcap =  Math.ceil(Math.pow(cult.faithful.current + cult.hybrids.current + cult.brined.current, cult.faithful.capMultiplier) + 88);
    }else{
        softcap = (cult[pegType].current * (cult.faithful.current + cult.hybrids.current + cult.brined.current)) * cult[pegType].capMultiplier;
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
    return Math.min(Math.ceil(delta), remainingCapacity);

}

function chanters(tics) {
    if (cult.faithful.current + cult.hybrids.current > 0) {
        cult.chanters.ticCounter[0] += tics;
        if (cult.chanters.ticCounter[0] >= cult.chanters.ticCounter[1]) {
            cult.chanters.ticCounter[0] -= cult.chanters.ticCounter[1];
            let loveBump = 0;
            let charmBump = 0;
            loveBump += cult.chanters.outMultiplier * (cult.chanters.current + cult.faithful.current + cult.hybrids.current + cult.brined.current);
            charmBump += cult.chanters.outMultiplier * (cult.chanters.current + cult.faithful.current + cult.hybrids.current + cult.brined.current)/4;
            const loveChange = applySoftcap('chanters', 'love', loveBump);
            numberChange('vault', 'love', loveChange, '#FF559D', 'red');
            numberChange('stats', 'charm', charmBump, '#FFFF00', 'red');
        }
    }
}

function sentinels(tics) {
    if (cult.faithful.current + cult.hybrids.current > 0) {
        cult.sentinels.ticCounter[0] += tics;
        if (cult.sentinels.ticCounter[0] >= cult.sentinels.ticCounter[1]) {
            cult.sentinels.ticCounter[0] -= cult.sentinels.ticCounter[1];
            const terrorBump = cult.sentinels.outMultiplier * (cult.sentinels.current + cult.hybrids.current + cult.faithful.current + cult.hybrids.current); 
            if(tyogCrafts.invokeYog.active===true){
                numberChange('vault', 'terror', terrorBump*4, 'red', 'blue');
            }else{
                const terrorChange = applySoftcap('sentinels', 'terror', terrorBump);
                numberChange('vault', 'terror', terrorChange, 'red', 'blue');
            }
        }
    }
}
function scribes(tics) {
    cult.scribes.ticCounter[0] += tics;
    if (cult.scribes.ticCounter[0] >= cult.scribes.ticCounter[1]) {
        cult.scribes.ticCounter[0] -= cult.scribes.ticCounter[1];
        vault.tome.pageCounter += cult.scribes.current * 4;
        document.getElementById('pages').innerHTML = Math.floor(vault.tome.pageCounter);
    }
}

function apprentices(tics) {
    cult.apprentices.ticCounter[0] += tics;
    if (cult.apprentices.ticCounter[0] >= cult.apprentices.ticCounter[1]) {
        cult.apprentices.ticCounter[0] -= cult.apprentices.ticCounter[1];
        vault.tome.pageCounter -= cult.apprentices.current;
        document.getElementById('pages').innerHTML = Math.floor(vault.tome.pageCounter);
        numberChange("stats", "vision", (cult.apprentices.current *16), "green", "");
    }
}

let ticC = {
  healthCounter: [0, 4],
  terrorCounter: [0, 4],
  gridCounter: [2, 8]
};
function healthCheck(){
    if(ticC.healthCounter[0] < ticC.healthCounter[1]){
        ticC.healthCounter[0]++;
    }else{
        ticC.healthCounter[0] = 0;
        if(stats.health.current < stats.health.max - 1){
            if(actionUpgrades.chant.perfection.purchased===true){
                numberChange("stats", "health", 8, "blue", "");
            }else{
                numberChange('stats', 'health', 1, 'blue', 'red');
            }
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
            let inns = terrorCrafts.breedingPits.baseOutput;
            if(tyogCrafts.riteSpring.active === true){
                inns*=2;
            }
            if(terrorCrafts.breedingPits.shub === true){
                numberChange('cult', 'innocents', (inns * 4), 'blue', '');
                comment("Iä! New lives join the fold...  (+" + (inns * 4) + " Innocents come up from the Pits, Terror +88)", 'red');
                numberChange('vault', 'terror', 88, 'red', '');
            }else{
                numberChange('cult', 'innocents', inns, 'blue', '');
                comment("new life joins the fold...  (+" + inns + " Innocent comes up from the Pits, Terror +44)", 'red');
                numberChange('vault', 'terror', 44, 'red', '');
            }
        }
    }
}

function shoggothFarmOn(tics){
    if( fleshCrafts.shoggothFarm.level > 0){
         fleshCrafts.shoggothFarm.counter[0] += tics;
        if( fleshCrafts.shoggothFarm.counter[0] <  fleshCrafts.shoggothFarm.counter[1]){
        }else{
            fleshCrafts.shoggothFarm.counter[0] = 0;
            if(vault.flesh.current>= (fleshCrafts.shoggothFarm.level*4)){
                numberChange('vault', 'flesh', -(fleshCrafts.shoggothFarm.level*4), '', 'red');
                numberChange("vault", "ichor", fleshCrafts.shoggothFarm.level, "red", "");
                comment("The stench is astounding. ( -" + fleshCrafts.shoggothFarm.level*4 + " Flesh, +" + fleshCrafts.shoggothFarm.level + " Ichor from Shoggoth harvest.", 'red');
            }else {
                comment("The Shoggoth roars and beats itself against the walls in search of Flesh. (+444 Terror", 'red');
                numberChange("vault", "terror", 444, "red", "");
            }
        }
    }
}

function  gridTime(tics){
    ticC.gridCounter[0] += tics;
    if(ticC.gridCounter[0]>=ticC.gridCounter[1]){
        ticC.gridCounter[0] -= ticC.gridCounter[1];
        checkAdjacencyAndApplyBonuses('time');
     //   plays(bell);
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
    checkUnlocks();
    dyingCheck();
    madCheck();
    if(actions.chant.toggle === true){
        autoChant(tics);
    }
    if(actionUpgrades.chant.choir.purchased===true){
         choirSing();
    }
    if(actionUpgrades.chant.bodyTheft.purchased===true){
         actions.chant.theftTicCounter[0] +=tics;
         if(actions.chant.theftTicCounter[0] >=actions.chant.theftTicCounter[1]){
             actions.chant.theftTicCounter[0]=0;
             numberChange("stats", "charm", 4, "blue", "");
             if(actionUpgrades.chant.perfection.purchased===true){
                 numberChange("stats", "charm", 8, "blue", "");
             }
         }
    }
    if(cult.faithful.current >0 ||cult.hybrids.current>=1 || cult.brined.current>=1){
        faithful(tics);
    }
    if(cult.chanters.current >0){
        chanters(tics);
    }    
    if(cult.sentinels.current >0){
        sentinels(tics);
    }
    if(goldCrafts.mortuary.active===true){
        mortuaryLoop(tics);
    }
    if(cult.priests.current >0){
        priests(tics);
    }
    if(cult.scribes.current >0){
        scribes(tics);
    }
    if(cult.apprentices.current >0){
        apprentices(tics);
    }
    if(goldCrafts.tithe.toggle === true){
        tithe(tics);
    }
    if(ichorCrafts.resonator.toggle === true){
        resonate(tics);
    }
    if(ichorCrafts.whateley.telepathyBool===true){
        whateleyTelepathy(tics);
    }
    //rites
    if(tyogCrafts.riteSpring.active === true){
        tyogCrafts.riteSpring.counter[0] +=tics;
        if( tyogCrafts.riteSpring.counter[0] >=tyogCrafts.riteSpring.counter[1]){
            tyogCrafts.riteSpring.active = false;
        }
    }
    if(tyogCrafts.festival.active === true){
        tyogCrafts.festival.counter[0] +=tics;
        if( tyogCrafts.festival.counter[0] >=tyogCrafts.festival.counter[1]){
            tyogCrafts.festival.active = false;
        }
    }
    if(tyogCrafts.invokeYog.active === true){
        tyogCrafts.invokeYog.counter[0] +=tics;
        if( tyogCrafts.invokeYog.counter[0] >=tyogCrafts.invokeYog.counter[1]){
            tyogCrafts.invokeYog.active = false;
        }
    }
    tulu(tics);
    pitsOn(tics);
    shoggothFarmOn(tics);
    gridTime(tics);
    godsTic(tics);
    relicsTic(tics);
    if(madUps.alcoholism.active === true){
        madUps.alcoholism.counter[0]+=tics;
        if(madUps.alcoholism.counter[0] >= madUps.alcoholism.counter[1]){
            madUps.alcoholism.counter[0]=0;
            autoMadAction("drink");
        }
    }
    if(madUps.addiction.active === true){
        madUps.addiction.counter[0]+=tics;
        if(madUps.addiction.counter[0] >= madUps.addiction.counter[1]){
            madUps.addiction.counter[0]=0;
            autoMadAction("smoke");
        }
    }
};

let previousTimestamp = 0;
let partialTics = 0;
let ticDuration = 800;
let tics = 0;
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
        love:0,
        terror:0,
        gold:0,
        madness:0
    };
    if(tics >=8){
        for (let i = 1; i < tics; i +=4) {//4tics for almost everything
            // Faithful Output (Love, Terror, Gold)
            if(cult.faithful.current >=1 ||cult.hybrids.current>=1 || cult.brined.current>=1){
                faithful(4);
            }
            if(cult.chanters.current >0){
                chanters(4);
            }    
            if(cult.sentinels.current >0){
                sentinels(4);
            }  
            if(cult.priests.current >0){
                priests(4);
            }
            if(cult.scribes.current >0){
                scribes(4);
            }
            if(cult.apprentices.current >0){
                apprentices(4);
            }
            if(goldCrafts.mortuary.active===true){
                mortuaryLoop(4);
            }
            if(goldCrafts.tithe.toggle === true){
                tithe(4);
            }
            if(ichorCrafts.resonator.toggle === true){
                resonate(4);
            }
            if(ichorCrafts.whateley.telepathyBool===true){
                whateleyTelepathy(4);
            }
            //rites
            if(tyogCrafts.riteSpring.active === true){
                tyogCrafts.riteSpring.counter[0]+=tics;
                if( tyogCrafts.riteSpring.counter[0] >=tyogCrafts.riteSpring.counter[1]){
                    tyogCrafts.riteSpring.active = false;
                }
            }
            if(tyogCrafts.festival.active === true){
                tyogCrafts.festival.counter[0]+=tics;
                if( tyogCrafts.festival.counter[0] >=tyogCrafts.festival.counter[1]){
                    tyogCrafts.festival.active = false;
                }
            }
            if(tyogCrafts.invokeYog.active === true){
                tyogCrafts.invokeYog.counter[0]+=tics;
                if( tyogCrafts.invokeYog.counter[0] >=tyogCrafts.invokeYog.counter[1]){
                    tyogCrafts.invokeYog.active = false;
                }
            }
            tulu(4);
            pitsOn(4);
            shoggothFarmOn(4);
            gridTime(4);
            //sacrarium gods and such
            if(domUnlocks.sacrarium === true){//relics all set to 4 tics at current
                    godsTic(4);
                    relicsTic(4);
            }
            //shards madness
            if(permanentMadness >=1){
            afks.madness += permanentMadness/2;
            }
        }
        //math for time
        let timeAfk = Math.floor(timePassed / 60000);
        if(timeAfk>=4){
            eventBox("images/meeple/west.jpg", "West Returns", "West was idle for " + timeAfk + " minutes but the Cult remained active and the Gods hunger. (West does not act but is still affected by permanent Madness and Relics.)");
        }
            //end updates
        numberChange("stats", "madness", afks.madness, "blue", "");
        numberChange('vault', 'love', afks.love, '#FF559D', 'red');
        numberChange('vault', 'terror', afks.terror, 'red', 'blue');
        numberChange('vault', 'gold', afks.gold, 'yellow', 'red');
    }
}
// off time recorded in save
function offlineProgress(){
    // Retrieve last offline timestamp from storage
    let lastOffline = localStorage.getItem("savedOfflineTimestamp") 
    ? JSON.parse(localStorage.getItem("savedOfflineTimestamp")) 
    : performance.now();
    let currentTimestamp = Date.now();
    let timePassed = Math.min((totalTime.timeSession*4), (currentTimestamp - lastOffline)); // Minimize to 4 times session length
    let tics = Math.min(timePassed / 800, 44 * 75, 88); // Cap tics at equivalent of 88 minutes
    let offlineOutput = {
        love: 0,
        terror: 0,
        gold: 0
    };
    // Loop through each 75-tic chunk
    if(tics >= 75){
        for (let i = 0; i < tics; i += 75) {
            // Faithful Output (Love, Terror, Gold)
            if (cult.faithful.current >= 1 ||cult.hybrids.current>=1 || cult.brined.current>=1) {
                let faithfulCap = Math.pow(cult.faithful.current + cult.hybrids.current + cult.brined.current, cult.faithful.capMultiplier) + 88;
                if((vault.love.current + offlineOutput.love) <= faithfulCap){
                    offlineOutput.love += (cult.faithful.current + cult.hybrids.current + cult.brined.current) * cult.faithful.outMultipliers[0] * 9;
                }else{
                    let remainingCapacity = faithfulCap - (vault.love.current + offlineOutput.love);
                    if(remainingCapacity > 0){
                        offlineOutput.love += remainingCapacity;
                    }
                }
                if((vault.terror.current + offlineOutput.terror) <= faithfulCap){
                    offlineOutput.terror += (cult.faithful.current + cult.hybrids.current + cult.brined.current) * cult.faithful.outMultipliers[1] * 9;
                }else{
                    let remainingCapacity = faithfulCap - (vault.terror.current + offlineOutput.terror);
                    if(remainingCapacity > 0){
                        offlineOutput.terror += remainingCapacity;
                    }
                }
                offlineOutput.gold += (cult.faithful.current + cult.hybrids.current + cult.brined.current) * cult.faithful.outMultipliers[2] * 9;
            }
            // Chanters Output (Love)
            if (cult.chanters.current >= 1) {
                if((vault.love.current + offlineOutput.love) <= (cult.chanters.current * (cult.faithful.current + cult.hybrids.current + cult.brined.current)) * cult.chanters.capMultiplier){
                    offlineOutput.love += adjacentNumbers.chantersTotal * 75/8  ;
                    let chanterBase = cult.chanters.outMultiplier * (cult.chanters.current + (cult.faithful.current + cult.hybrids.current + cult.brined.current) / 4);
                    offlineOutput.love += chanterBase * 9  ;
                }else{
                    let remainingCapacity = ((cult.chanters.current * (cult.faithful.current + cult.hybrids.current + cult.brined.current)) * cult.chanters.capMultiplier) - (vault.love.current + offlineOutput.love);
                    if(remainingCapacity > 0){
                        offlineOutput.love += remainingCapacity;
                    }
                }
            }
            // Sentinels Output (Terror)
            if (cult.sentinels.current >= 1) {
                if((vault.terror.current + offlineOutput.terror) <= ((cult.sentinels.current + cult.hybrids.current) * (cult.faithful.current + cult.hybrids.current + cult.brined.current)) * cult.sentinels.capMultiplier){
                    offlineOutput.terror += adjacentNumbers.sentinelsTotal * 9 ;
                    let sentinelBase = cult.sentinels.outMultiplier * (cult.sentinels.current + (cult.faithful.current + cult.hybrids.current + cult.brined.current) / 4);
                    offlineOutput.terror += sentinelBase * 9;
                }else{
                    let remainingCapacity = ((cult.sentinels.current + cult.hybrids.current) * (cult.faithful.current + cult.hybrids.current + cult.brined.current)) * cult.sentinels.capMultiplier - (vault.terror.current + offlineOutput.terror);
                    if(remainingCapacity > 0){
                        offlineOutput.terror += remainingCapacity;
                    }
                }
            }
            offlineOutput.gold += adjacentNumbers.priestsTotal * 9;
            if(cult.scribes.current >0){
                vault.tome.pageCounter += cult.scribes.current * 36;//4 pages per tic
                document.getElementById('pages').innerHTML = Math.floor(vault.tome.pageCounter);
            }
            if(cult.apprentices.current >0 && vault.tome.pageCounter >= (cult.apprentices.current * 9)){
                vault.tome.pageCounter -= cult.apprentices.current * 9;
                document.getElementById('pages').innerHTML = Math.floor(vault.tome.pageCounter);
                numberChange("stats", "vision", (cult.apprentices.current *16 * 9), "green", "");
            }
        }
    }
    numberChange('vault', 'love', offlineOutput.love, '#FF559D', 'red');
    numberChange('vault', 'terror', offlineOutput.terror, 'red', 'blue');
    numberChange('vault', 'gold', offlineOutput.gold, 'yellow', 'red');
    console.log(offlineOutput);
    eventBox("images/meeple/west.jpg", "West Returns", "After West left, the Priests grew indolent, the Sacrarium darkened and the Gods slept once more. Only the cult remains active. (Offline time = " + Math.floor(timePassed/60000) + " minutes ~ 4x last session up to 88 min.)");
}