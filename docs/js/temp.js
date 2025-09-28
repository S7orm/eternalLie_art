
function faithful(tics){    
    cult.faithful.ticCounter[0] += tics;
    if(cult.faithful.ticCounter[0] >= cult.faithful.ticCounter[1]){
        cult.faithful.ticCounter[0] -= cult.faithful.ticCounter[1];
        let outputTypes = ['love', 'terror', 'gold'];
        let outputKeys = Object.keys(outputTypes);
        let outputKey = Math.floor(Math.random() * outputKeys.length);//choice made for type
        const currentValue = vault[outputTypes[outputKey]].current;//current 
        let outputTotal = Math.max((cult.faithful.current + cult.hybrids.current + cult.brined.current)* cult.faithful.outMultipliers[outputKey], 0);
        if(outputTypes[outputKey] === 'love'){
            
            if(tyogCrafts.festival.active===true) outputTotal*=2;
            if(tyogCrafts.snakeHandling.active===true) outputTotal*=2;
            if(tyogCrafts.festival.active===true ||tyogCrafts.snakeHandling.active===true){
            numberChange('vault', "love", outputTotal, '#FF559D', 'red');
        }else{
            const loveChange = applySoftcap('faithful', 'love', outputTotal);
            numberChange('vault', "love", loveChange, '#FF559D', 'red');
            }
        }else if(outputTypes[outputKey] === 'terror'){
            if(tyogCrafts.invokeYog.active===true) outputTotal*=4;
            if(tyogCrafts.snakeHandling.active===true) outputTotal*=2;
            if(tyogCrafts.invokeYog.active===true ||tyogCrafts.snakeHandling.active===true){
            if(tyogCrafts.festival.active===true) outputTotal =outputTotal/2;
            numberChange('vault', outputTypes[outputKey], outputTotal, 'red', 'red');
            }else{
                if(tyogCrafts.festival.active===true) outputTotal =outputTotal/2;
                    outputTotal = applySoftcap('faithful', 'terror', outputTotal);
                    numberChange('vault', outputTypes[outputKey], outputTotal, 'red', 'red');
            }
        }else if(outputTypes[outputKey] === 'gold'){
            if(tyogCrafts.festival.active===true) outputTotal *=2;
            numberChange('vault', outputTypes[outputKey], outputTotal, 'yellow', 'red');
        }
    }
}
                                                        //=========================================
                                                                                               // Reset button
                                                        //=========================================

function resetGame(){
    eventBox("images/world/crypt.jpg", "Reset Game", "Left Button restarts this run only. Permanent gains from previous lives kept. Right Button resets all progress.");
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
        //check for previous saves
        if(permanentChanges.lastReset==="nyar"){
            stats = localStorage.getItem("savedNyarStats");
            stats =  JSON.parse(stats);//load original stats from nyar reset
            let savedNyarShardBuys = localStorage.getItem("savedNyarShardBuys");
            permanentChanges.shardBuys =  JSON.parse(savedNyarShardBuys);//load original shard buys from nyar reset
            localStorage.clear();
            localStorage.setItem("savedNyarStats", JSON.stringify(stats)); //stats
            localStorage.setItem("savedPermanentChanges", JSON.stringify(permanentChanges)); 
            localStorage.setItem("savedPermanentMadness", JSON.stringify(permanentMadness));
            localStorage.setItem("savedNyarShardBuys",  JSON.stringify(permanentChanges.shardBuys)); 
            localStorage.setItem("savedShardBuys", JSON.stringify(permanentChanges.shardBuys)); 
            localStorage.setItem("savedTime", JSON.stringify(totalTime)); 

        }else if(permanentChanges.lastReset==="mist"){
            stats = localStorage.getItem("savedMistStats");
            stats =  JSON.parse(stats);
            let savedMistShardBuys = localStorage.getItem("savedMistShardBuys");
            permanentChanges.shardBuys =  JSON.parse(savedMistShardBuys);//load original shard buys from nyar reset//load original shard buys from nyar reset
            localStorage.clear();
            localStorage.setItem("savedMistStats", JSON.stringify(stats)); //stats
            localStorage.setItem("savedPermanentChanges", JSON.stringify(permanentChanges)); 
            localStorage.setItem("savedPermanentMadness", JSON.stringify(permanentMadness));
            localStorage.setItem("savedMistShardBuys",  JSON.stringify(permanentChanges.shardBuys)); 
            localStorage.setItem("savedShardBuys", JSON.stringify(permanentChanges.shardBuys)); 
            localStorage.setItem("savedTime", JSON.stringify(totalTime)); 
        }else if(permanentChanges.lastReset==="devourer"){
            stats = localStorage.getItem("savedDevourerStats");
            stats =  JSON.parse(stats);
            let savedDevourerShardBuys = localStorage.getItem("savedDevourerShardBuys");
            permanentChanges.shardBuys =  JSON.parse(savedDevourerShardBuys);//load original shard buys from nyar reset//load original shard buys from nyar reset
            localStorage.clear();
            localStorage.setItem("savedDevourerStats", JSON.stringify(stats)); //stats
            localStorage.setItem("savedPermanentChanges", JSON.stringify(permanentChanges)); 
            localStorage.setItem("savedPermanentMadness", JSON.stringify(permanentMadness));
            localStorage.setItem("savedDevourerShardBuys",  JSON.stringify(permanentChanges.shardBuys)); 
            localStorage.setItem("savedShardBuys", JSON.stringify(permanentChanges.shardBuys)); 
            localStorage.setItem("savedTime", JSON.stringify(totalTime)); 
        }else{
            localStorage.clear();
        }
        localStorage.setItem("savedTime", JSON.stringify(totalTime)); 
        location.reload();
    }); 
    document.getElementById('resetGame').addEventListener('pointerdown',   () => {
        window.removeEventListener("beforeunload", saveToLocalStorage);
        localStorage.clear();
        localStorage.setItem("reset", true); 
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
    console.log(statsTemp, stats);
    if(statsTemp.shards.unlocked === true){
        stats.shards.unlocked = true;
        document.getElementById('shards').innerHTML = stats.shards.current;
        document.getElementById('shardsBox').style.display='block';
        stats.health.max -= stats.shards.current;
        document.getElementById("healthDesc").innerHTML= "Health will drift up or down toward West's base Health, currently: " + Math.floor(stats.health.max);
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
                                                                                               // Nyar
                                                        //=========================================

function nyarReset(){ //reset 1
    cancelShakeAnimation();
    closeEventBox();
    let shards = ((cult.faithful.current + cult.hybrids.current) / 4 )+ (cult.chanters.current / 2) + (cult.sentinels.current/2) + (cult.priests.current) +(cult.innocents.current/8);
    stats.shards.current += Math.floor(shards);
    permanentChanges.totalShards +=Math.floor(shards);
    localStorage.clear();
    localStorage.setItem("savedNyarStats", JSON.stringify(stats)); //stats
    localStorage.setItem("savedNyarShardBuys",  JSON.stringify(shardBuys)); 
    permanentChanges.lastReset= "nyar";
    localStorage.setItem("savedPermanentChanges", JSON.stringify(permanentChanges)); 
    localStorage.setItem("savedPermanentMadness", JSON.stringify(permanentMadness)); 
    localStorage.setItem("savedShardBuys", JSON.stringify(shardBuys)); 
    localStorage.setItem("savedTime", JSON.stringify(totalTime)); 
    window.removeEventListener("beforeunload", saveToLocalStorage);
    location.reload(); //reload game state
}
function nyarPostReset(){
    window.console.log('nyarPost');
    let savedStats = localStorage.getItem("savedNyarStats");
    let statsTemp =  JSON.parse(savedStats);
    let savedPermanentChanges = localStorage.getItem("savedPermanentChanges");
    permanentChanges = JSON.parse(savedPermanentChanges); 
    if(permanentChanges.brined>0){
        cult.brined.current=permanentChanges.brined;
        cult.brined.unlocked=true;
        document.getElementById("brinedWrap").style.display="block";
        comment("The Brined call out to West.");
    }
    if(permanentChanges.immortality === true){ //immortality code block moved to immortality()
         immortality(statsTemp);
        eventBox("images/godsAppeased/nyarAppeased.jpg", 'Columns three they marched...', 'The Pharoah danced out of Nightmare, eyes shining with Shards of the Divine. The Chosen split into columns and fall into darkness. All save West, who recieved a sly wink and a nod. West laughs alone in the darkness clutching a Tome, eyes blazing ever brighter.');
    }else{
            stats.shards.current = statsTemp.shards.current;
            eventBox("images/godsAppeased/nyarAppeased.jpg", 'Columns three we marched...', 'The Pharoah danced out of Nightmare, eyes shining with Shards of the Divine. The Chosen, led by West, split into columns and fell into darkness. After countless eons, West awakens alone in a dark alley, hands clutching a Tome. His eyes blaze with Shards of Light');
    }
    stats.shards.unlocked =true;
    domUnlocks.divinity = true;
    document.getElementById('divinityTab').style.display='block';
    document.getElementById('shards').innerHTML = stats.shards.current;
    document.getElementById('shardsBox').style.display='block';
    stats.health.max -= stats.shards.current;
    document.getElementById("healthDesc").innerHTML= "Health will drift up or down toward West's base Health, currently: " + Math.floor(stats.health.max);
    stats.health.current -= stats.shards.current;
    document.getElementById('health').innerHTML = stats.health.current;
    shardsBoughtLoad();                                
    let storedTime = localStorage.getItem("savedTime"); 
    totalTime = JSON.parse(storedTime); 
    comment('Shall we go again?', '#9A2EFE');
    comment(stats.shards.current + " Unspent Shards depleting West's maximum health.", 'red');
    let savedPermanentMadness = localStorage.getItem("savedPermanentMadness");
    permanentMadness = JSON.parse(savedPermanentMadness); 
    permanentMadness.level++;
    comment('Wait. What? ( +1 Permanent Madness will take its toll regularly.)', '#9A2EFE');
    window.console.log('Ny-end');
    saveToLocalStorage();
}

                                                        //=========================================
                                                                                               // Mist
                                                        //=========================================


function mistReset() { //reset 2 - 
    closeEventBox();
    let shards =   2 * ((cult.faithful.current + cult.hybrids.current)  / 4 )+ (cult.chanters.current / 2) + (cult.sentinels.current/2) + (cult.priests.current) +(cult.innocents.current/8);
    stats.shards.current += Math.floor(shards);
    permanentChanges.totalShards +=Math.floor(shards);
    localStorage.clear();
    localStorage.setItem("savedMistStats", JSON.stringify(stats)); //stats
    localStorage.setItem("savedMistShardBuys",  JSON.stringify(shardBuys)); 
    permanentChanges.lastReset= "mist";
    localStorage.setItem("savedPermanentChanges", JSON.stringify(permanentChanges)); 
    localStorage.setItem("savedPermanentMadness", JSON.stringify(permanentMadness)); // Divinity save
    localStorage.setItem("savedShardBuys", JSON.stringify(shardBuys)); 
    localStorage.setItem("savedTime", JSON.stringify(totalTime)); 
    window.removeEventListener("beforeunload", saveToLocalStorage);
    location.reload(); // Reload the game state
}

function mistPostReset() {
    permanentChanges.mist = true;
    window.console.log('mistPostReset');
    //loading divinity
    let savedPermanentMadness = localStorage.getItem("savedPermanentMadness");
    permanentMadness = JSON.parse(savedPermanentMadness); 
    let savedStats = localStorage.getItem("savedMistStats");
    let statsTemp =  JSON.parse(savedStats); 
    let savedPermanentChanges = localStorage.getItem("savedPermanentChanges");
    permanentChanges = JSON.parse(savedPermanentChanges); 
    if(permanentChanges.brined>0){
        cult.brined.current=permanentChanges.brined;
        cult.brined.unlocked=true;
        document.getElementById(brinedWrap).style.display="block";
        comment("The Brined call out to West.");
    }
    if(permanentChanges.immortality === true){ 
        immortality(statsTemp);
        eventBox("images/godsAppeased/mistAppeased.jpg", 'The Nameless Mist...',
            'West is caught in the Mist and spends an Eon lost and blind, only a distant feminine laughter luring him endlessly in circles. When West finds his way back, the world seems to sparkle with clarity. (Permanent Changes on first encounter with the Nameless Mist: Study and Dream actions 4x more effective. Madness Capacity x4.)');
        }else{
            stats.shards.current = statsTemp.shards.current;
            eventBox("images/godsAppeased/mistAppeased.jpg", 'The Nameless Mist...',
            'West is caught in the Mist and spends a lifetime lost and blind, only a distant feminine laughter luring him on. West awakens alone in a dark alley, hands clutching a Tome, the world sparkling with clarity. (Permanent Changes on first encounter with the Nameless Mist: Study and Dream actions 4x more effective. Madness Capacity x4.) ');
        }
    stats.shards.unlocked = true;
    stats.shards.current = statsTemp.shards.current;
    document.getElementById('shards').innerHTML = stats.shards.current;
    document.getElementById('shardsBox').style.display = 'block';
    stats.health.max -= stats.shards.current;
    document.getElementById("healthDesc").innerHTML= "Health will drift up or down toward West's base Health, currently: " + Math.floor(stats.health.max);
    stats.health.current -= stats.shards.current;
    document.getElementById('health').innerHTML = stats.health.current;
    domUnlocks.divinity = true;
    document.getElementById('divinityTab').style.display='block';
    let storedTime = localStorage.getItem("savedTime"); 
    totalTime = JSON.parse(storedTime); 
    // Post-reset messages
    comment('SO BRIGHT. SO LOUD. ( +1 Permanent Madness will take its toll regularly.)', '#9A2EFE');
    permanentMadness.level++;
    shardsBoughtLoad();
    numberChange('stats', 'madness', stats.madness.madCap - 44, 'red', 'red');
    saveToLocalStorage(); 
    window.console.log('Mist Reset Complete');
}


                                                        //=========================================
                                                                                               // Darkness
                                                        //=========================================

let dean = "sam did we unleash the darkness?";

//list of changes to darkness run
//Antarctic –Magnum Tenebrosum
//eventbox  -the darkness apocalypse world, finding faithful in the darkness amidst the ruins of the world.
//    wipes everything except immortality bonus
//     	Dark Flame of Yeb
//    	Ialdagorth -The Dark Devourer
//    	all gods unlocked but costs quadrupled.
//function to run through all objects and where cost is , quarduple that number
//second function run through cost multipliers and quadruple them
//Dark Radiance is used to purchase upgrades in divinity and are an alternate payment for upgrades in divinity.
//flavor text should indicate this is the last cycle. that everything will fall into permanent darkness unless west meets azathoth.
//function to replace flavor text in various places.
//azathoth wakes and west becomes aware that even darkness is a thing, as it fades away to drumming and piping gods.


let devourText = {
    open: "It seems the end of all things, as the Dark Devourer consumes the light. Survivors willing to join West are all broken in some way. The only path forward is to seek Azathoth himself at the center of the universe. Waking the mad God is foolhardy at best, but here we are. (Costs are quadrupled, Capacities quartered, Cult output skewed toward Terror, Dark Radiance available) ",
    radiance: "Dark Radiance",
    radianceDesc: "Gained like Radiance, can also be spent like Shards."
};

function devourTextChanges(){
    document.getElementById("radianceText").innerHTML=devourText.radiance;
    
}

function quadrupler(setArray) {
    setArray.forEach(singleSet => {
        const setKeys = Object.keys(singleSet);  
        setKeys.forEach(function (setKey) {
            const item = singleSet[setKey];
            if (item && Array.isArray(item.children)) {
                item.children.forEach(child => {
                    if (child.cost !== undefined) {
                        child.cost *= 4;
                    }
                    if (child.costMultiplier !== undefined) {
                        child.costMultiplier *= 4;
                    }
                });
            }
        });
    });
}
function darkCaps(){
    cult.faithful.capMultiplier= Math.floor(cult.faithful.capMultiplier/4);
    cult.chanters.capMultiplier= Math.floor(cult.chanters.capMultiplier/4);
    cult.sentinels.capMultiplier= Math.floor(cult.sentinels.capMultiplier/4);
    stats.madness.madCap = Math.floor(stats.madness.madCap/4);
}


function darkDevourerReset(){
    permanentChanges.darkDevourer=true;
    let shards = ((cult.faithful.current + cult.hybrids.current) / 4 )+ (cult.chanters.current / 2) + (cult.sentinels.current/2) + (cult.priests.current) +(cult.innocents.current/8);
    stats.shards.current += Math.floor(shards);
    permanentChanges.totalShards +=Math.floor(shards);
    permanentChanges.lastReset="devourer";
    localStorage.clear();
    localStorage.setItem("savedDevourerStats", JSON.stringify(stats)); //stats
    localStorage.setItem("savedDevourerShardBuys",  JSON.stringify(shardBuys)); 
    permanentChanges.lastReset= "devourer";
    localStorage.setItem("savedPermanentChanges", JSON.stringify(permanentChanges)); 
    localStorage.setItem("savedPermanentMadness", JSON.stringify(permanentMadness)); 
    localStorage.setItem("savedShardBuys", JSON.stringify(shardBuys)); 
    localStorage.setItem("savedTime", JSON.stringify(totalTime)); 
    window.removeEventListener("beforeunload", saveToLocalStorage);
    location.reload(); //reload game state
};

function darkDevourerPostReset(){
    window.console.log('devourerPost');
    let savedStats = localStorage.getItem("savedDevourerStats");
    let statsTemp =  JSON.parse(savedStats);
    let savedPermanentChanges = localStorage.getItem("savedPermanentChanges");
    permanentChanges = JSON.parse(savedPermanentChanges); 
    if(permanentChanges.brined>0){
        cult.brined.current=permanentChanges.brined;
        cult.brined.unlocked=true;
        document.getElementById(brinedWrap).style.display="block";
        comment("The Brined call out to West.");
    }
    if(permanentChanges.immortality === true){ //immortality code block moved to immortality()
         immortality(statsTemp);
    }else{
            stats.shards.current = statsTemp.shards.current;
    }
    eventBox("images/godsAppeased/darkness.jpg", 'Dark Devourer', devourText.open);
    stats.shards.unlocked =true;
    domUnlocks.divinity = true;
    domUnlocks.expeditions= true;
    dreamEx.throne.unlocked=true;
    document.getElementById("expeditionsTab").style.display = "block";
    document.getElementById("throneWrap").style.display = "block";
    document.getElementById('divinityTab').style.display='block';
    document.getElementById('shards').innerHTML = stats.shards.current;
    document.getElementById('shardsBox').style.display='block';
    stats.health.max -= stats.shards.current;
    document.getElementById("healthDesc").innerHTML= "Health will drift up or down toward West's base Health, currently: " + Math.floor(stats.health.max);
    stats.health.current -= stats.shards.current;
    document.getElementById('health').innerHTML = stats.health.current;
    shardsBoughtLoad();                                
    let storedTime = localStorage.getItem("savedTime"); 
    totalTime = JSON.parse(storedTime); 
    comment(stats.shards.current + " Unspent Shards depleting West's maximum health.", 'red');
    let savedPermanentMadness = localStorage.getItem("savedPermanentMadness");
    permanentMadness = JSON.parse(savedPermanentMadness); 
    permanentMadness.level+=4;
    comment('Darkness Falls. (+4 Permanent Madness)', '#9A2EFE');
    saveToLocalStorage();
    devourTextChanges();
    quadrupler([actions, actionUpgrades.study, actionUpgrades.chant, actionUpgrades.preach, madActions, madUps, loveCrafts, terrorCrafts, goldCrafts, fleshCrafts, tomeCrafts, ichorCrafts, tyogCrafts, dreamEx, world, gods, relics, altars]);
    darkCaps();
    saveToLocalStorage();
}