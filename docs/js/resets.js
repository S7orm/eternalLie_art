

                                                        //=========================================
                                                                                               // Reset button
                                                        //=========================================
function resetGame(){
    eventBox("images/world/crypt.jpg", "Reset Game", "Left Button restarts this run only. Permanent gains from previous lives kept. Right Button resets all progress.");
    let parent = document.getElementById('eventBox');
    // Restart Run button
    let restartRun = document.createElement('button');
    restartRun.className = 'eventButtonsLeft';
    restartRun.id = "restartRun";
    restartRun.innerHTML = 'Restart Run';
    parent.appendChild(restartRun);
    // Full Reset button
    let resetGame = document.createElement('button');
    resetGame.className = 'eventButtonsRight'; 
    resetGame.id = "resetGame";
    resetGame.innerHTML = 'Reset Game';
    parent.appendChild(resetGame);
    // Restart Run listener
    document.getElementById('restartRun').addEventListener('pointerdown', () => {
        window.removeEventListener("beforeunload", saveToLocalStorage);
        permanentChanges.resetting= true;
        permanentChanges.lastReset = "restart";
        // Save everything else
        localStorage.clear();
        localStorage.setItem("savedPermanentChanges", JSON.stringify(permanentChanges));
        localStorage.setItem("savedPermanentMadness", JSON.stringify(permanentMadness));
        localStorage.setItem("savedShardBuys", JSON.stringify(permanentChanges.shardBuys));
        localStorage.setItem("savedTime", JSON.stringify(totalTime));
        location.reload();
    }); 
    // Full Reset listener
    document.getElementById('resetGame').addEventListener('pointerdown', () => {
        window.removeEventListener("beforeunload", saveToLocalStorage);
        localStorage.clear();
        location.reload();
    }); 
}


                                                        //=========================================
                                                                                               // Reset helpers
                                                        //=========================================
function saveResetData(resetType) {
    permanentChanges.resetting = true;
    localStorage.clear();
    // Save stats into immortalStats (canonical reset vehicle)
    permanentChanges.immortalStats = JSON.parse(JSON.stringify(stats));
    // Save shard buys
    permanentChanges.shardBuys = JSON.parse(JSON.stringify(shardBuys));
    // Track last reset
    permanentChanges.lastReset = resetType;
    // Push everything back
    localStorage.setItem("savedPermanentChanges", JSON.stringify(permanentChanges));
    localStorage.setItem("savedPermanentMadness", JSON.stringify(permanentMadness));
    localStorage.setItem("savedShardBuys", JSON.stringify(shardBuys));
    localStorage.setItem("savedTime", JSON.stringify(totalTime));
    window.removeEventListener("beforeunload", saveToLocalStorage);
    location.reload();
}


                                                        //=========================================
                                                                                               // Nyar
                                                        //=========================================
function nyarReset() {
    cancelShakeAnimation();
    closeEventBox();
    let shards = ((cult.faithful.current + cult.hybrids.current) / 4 ) 
               + cult.chanters.current
               + cult.sentinels.current
               + cult.priests.current * 2
               + (cult.innocents.current / 8)
               + (cult.insane.current / 4);
    stats.shards.current += Math.floor(shards);
    permanentChanges.totalShards += Math.floor(shards);
    saveResetData("nyar");
}


                                                        //=========================================
                                                                                               // Mist
                                                        //=========================================
function mistReset() {
    closeEventBox();
    let shards = ((cult.faithful.current + cult.hybrids.current) / 2 ) 
               + cult.chanters.current
               + cult.sentinels.current
               + cult.priests.current * 2
               + (cult.innocents.current / 4)
               + (cult.insane.current / 2);
    stats.shards.current += Math.floor(shards);
    permanentChanges.totalShards += Math.floor(shards);
    saveResetData("mist");
}


                                                        //=========================================
                                                                                               // Darkness
                                                        //=========================================


function darkDevourerReset(){
    permanentChanges.darkDevourer = true;
    let shards = (cult.faithful.current + cult.hybrids.current)
               + cult.chanters.current * 2
               + cult.sentinels.current * 2
               + cult.priests.current * 8
               + (cult.innocents.current / 2)
               + (cult.insane.current);
    stats.shards.current += Math.floor(shards);
    permanentChanges.totalShards += Math.floor(shards);
    saveResetData("devourer");
}


                                                        //=========================================
                                                                                               // Post resets
                                                        //=========================================
                                                        
function basePostReset() {
    let savedPermanentChanges = localStorage.getItem("savedPermanentChanges");
    permanentChanges = JSON.parse(savedPermanentChanges);
    permanentChanges.resetting = false;
    let statsTemp = permanentChanges.immortalStats;
    if (permanentChanges.brined > 0) {
        cult.brined.current = permanentChanges.brined;
        cult.brined.unlocked = true;
        document.getElementById("brinedWrap").style.display = "block";
        comment("The Brined call out to West.");
    }
    // Handle immortality vs normal shards
    if (permanentChanges.immortality === true && statsTemp) {
        immortality(statsTemp);
    } else if (statsTemp) {
        stats.shards.current = statsTemp.shards.current;
    }
    // Shards UI setup
    if(permanentChanges.totalShards>0){
    stats.shards.unlocked = true;
    document.getElementById('shards').innerHTML = stats.shards.current;
    document.getElementById('shardsBox').style.display = 'block';
    }
    // Health adjustments
    stats.health.max -= stats.shards.current;
    document.getElementById("healthDesc").innerHTML = 
        "Health will drift up or down toward West's base Health, currently: " +
        Math.floor(stats.health.max);
    stats.health.current -= stats.shards.current;
    document.getElementById('health').innerHTML = stats.health.current;
    // Divinity tab unlock
    domUnlocks.divinity = true;
    document.getElementById('divinityTab').style.display = 'block';
    // Load shard purchases
    shardsBoughtLoad();
    // Time reload
    let storedTime = localStorage.getItem("savedTime");
    totalTime = JSON.parse(storedTime);
    // Permanent madness reload
    let savedPermanentMadness = localStorage.getItem("savedPermanentMadness");
    permanentMadness = JSON.parse(savedPermanentMadness);
    // Common shards comment
    comment(stats.shards.current + " Unspent Shards depleting West's maximum health.", 'red');
}
                                                                               
function nyarPostReset() {
    basePostReset();
    if (permanentChanges.immortality === true) {
        eventBox("images/godsAppeased/nyarAppeased.jpg", 'Columns three they marched...', 
            'The Pharaoh dances out of Nightmare, eyes shining with Divine Light. The Chosen split into columns and fall into darkness. All save West that is, who receives a sly wink and a nod instead. West laughs alone in the darkness clutching the Tome, eyes blazing ever brighter.');
    } else {
        eventBox("images/godsAppeased/nyarAppeased.jpg", 'Columns three we marched...', 
            'The Pharaoh dances out of Nightmare, eyes shining with Divine Light. The Chosen, led by West, split into columns and fell into darkness. After countless eons, West awakens alone in a dark alley, hands clutching a Tome. His eyes blaze with Shards of Divine Light.');
    }
    comment('Shall we go again?', '#9A2EFE');
    permanentMadness.level++;
    comment("Wait. What? ( +1 Permanent Madness will take its toll regularly, Total: " + permanentMadness.level + ")", '#9A2EFE');
    saveToLocalStorage();
}

function mistPostReset() {
    permanentChanges.mist = true;
    basePostReset();
    if (permanentChanges.immortality === true) {
        eventBox("images/godsAppeased/mistAppeased.jpg", 'The Nameless Mist...', 
            'West is caught in the Mist and spends years lost and blind, a distant feminine laughter luring him in circles. When West finally returns, the world sparkles with new clarity. (Permanent Changes on first encounter with the Nameless Mist: Study and Dream actions 4x more effective. Madness Capacity x4.)');
    } else {
        eventBox("images/godsAppeased/mistAppeased.jpg", 'The Nameless Mist...', 
            'West is caught in the Mist and spends Eons lost and blind, a distant feminine laughter luring him on endlessly. West awakens alone in a dark alley, hands clutching a Tome, the world sparkling with new clarity. (Permanent Changes on first encounter with the Nameless Mist: Study and Dream actions 4x more effective. Madness Capacity x4.)');
    }
    stats.madness.madCap*=4;
    actions.study.level*=4;
    actions.dream.level*=4; 
    updateMadnessSlider();
    document.getElementById("madnessDesc").innerHTML = "Madness rides the star-wind... MadCap: " + Math.floor(stats.madness.madCap);
        
    comment("SO BRIGHT. SO LOUD. ( +2 Permanent Madness, Total: " + permanentMadness.level + ")", '#9A2EFE');
    permanentMadness.level+=2;
    numberChange('stats', 'madness', stats.madness.madCap - 44, 'red', 'red');
    saveToLocalStorage();
}

let devourText = {
    open: "It seems the end of all things, as the Dark Devourer consumes the light. The only path forward is to seek Azathoth at the center of the universe. Waking the mad God is foolhardy at best, but here we are. ( Faithful joining West have no Innocents left to claim, Costs are quadrupled, Capacities quartered, Cult output skewed toward Terror, Dark Radiance available) ",
    radiance: "Dark Radiance",
    radianceDesc: "Gained like Radiance, can be spent like Shards in Divinity Tab."
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
    document.getElementById('faithfulDesc').innerHTML = cult.faithful.description + "Faithful Love and Terror Capacity: " +  Math.ceil(Math.pow(cult.faithful.current + cult.hybrids.current + cult.brined.current, cult.faithful.capMultiplier) + 88);
    document.getElementById('chantersDesc').innerHTML = cult.chanters.description + "Chanter Love Capacity: " + (cult.chanters.current * (cult.faithful.current + cult.hybrids.current + cult.brined.current)) * cult.chanters.capMultiplier;
    document.getElementById('sentinelsDesc').innerHTML = cult.sentinels.description + "Sentinels Terror Capacity: " + ((cult.sentinels.current + cult.hybrids.current) * (cult.faithful.current + cult.hybrids.current + cult.brined.current)) * cult.sentinels.capMultiplier;
    document.getElementById("madnessDesc").innerHTML = "Madness rides the star-wind... MadCap: " + Math.floor(stats.madness.madCap);
}

function darkDevourerPostReset() {
    basePostReset();
    console.log(permanentMadness);
    eventBox("images/godsAppeased/devourerAppeased.jpg", 'Dark Devourer', devourText.open);
    domUnlocks.expeditions = true;
    domUnlocks.sacrarium = true;
    godsAppeased.devourerAppeased.unlocked=true;
    document.getElementById("devourerAppeasedWrap").style.display = "block";
    dreamEx.throne.unlocked = true;
    dreamEx.pillar.dreamUnlocked=true;
    stats.radiance.unlocked=true;
    document.getElementById("radianceBox").style.display="block";
    document.getElementById("radianceBox").style.boxShadow = "inset 0 0 20px 10px rgba(190, 180, 60, 0.4), inset 0 0 40px 15px rgba(140, 130, 30, 0.2)";
    document.getElementById('dreamEx').style.display = 'flex';
    document.getElementById("sacrariumTab").style.display = "block";
    document.getElementById("expeditionsTab").style.display = "block";
    document.getElementById("throneWrap").style.display = "block";
    permanentMadness.level += 4;
    comment("Darkness Falls. (+4 Permanent Madness, Total: " + permanentMadness.level + ")", '#9A2EFE');
    devourTextChanges();
    quadrupler([actions, actionUpgrades.study, actionUpgrades.chant, actionUpgrades.preach, madActions, madUps, loveCrafts, terrorCrafts, goldCrafts, fleshCrafts, tomeCrafts, ichorCrafts, tyogCrafts, dreamEx, world, gods, relics, altars]);
    darkCaps();
    //no free innocents
    actions.preach.innocents=false;
    document.getElementById("radianceText").style.fontSize="1dvw";
    saveToLocalStorage();
}

