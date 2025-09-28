

/* 
local storage
 */
//adding set for major dom unlocks
let domUnlocks = {
    versionNumber: 0.8,
    cult: false,
    expeditions: false,
    sacrarium: false,
    divinity: false,
    achievements: false
};
let currentVersionNumber = 0.8;
// Function to save data to local storage
function saveToLocalStorage() {
     timeSpent();
     totalTime.timeFinal = Date.now();
     let offlineTimestamp = Date.now();//  - 600000;
     localStorage.setItem("savedOfflineTimestamp", JSON.stringify(offlineTimestamp)); //time off
    //dom
  localStorage.setItem("savedDomUnlocks", JSON.stringify(domUnlocks)); //dom
        	//=========================================
	//  West 
	//=========================================
  localStorage.setItem("savedStats", JSON.stringify(stats)); //stats
  localStorage.setItem("savedActions", JSON.stringify(actions));  //actions
  localStorage.setItem("savedMadAct", JSON.stringify(madActions));  //mad actions
  localStorage.setItem("savedMadUps", JSON.stringify(madUps));  //mad actions
  localStorage.setItem("savedActionUpgrades", JSON.stringify(actionUpgrades));  // actionUpgrades
          	//=========================================
	//  Cult
	//=========================================
  localStorage.setItem("savedCult", JSON.stringify(cult)); //cult
  localStorage.setItem("savedVault", JSON.stringify(vault)); //vault
  localStorage.setItem("savedLove", JSON.stringify(loveCrafts)); //crafts
  localStorage.setItem("savedTerror", JSON.stringify(terrorCrafts)); //crafts
  localStorage.setItem("savedGold", JSON.stringify(goldCrafts)); //crafts
  localStorage.setItem("savedFlesh", JSON.stringify(fleshCrafts)); //crafts
  localStorage.setItem("savedTome", JSON.stringify(tomeCrafts)); //crafts
  localStorage.setItem("savedIchor", JSON.stringify(ichorCrafts)); //crafts
  localStorage.setItem("savedTyog", JSON.stringify(tyogCrafts)); //crafts
            	//=========================================
	//  Expeditions
	//=========================================
localStorage.setItem("savedWorld", JSON.stringify(world)); //world
localStorage.setItem("savedDreamEx", JSON.stringify(dreamEx)); //dream ex
              	//=========================================
	//  Sacrarium
	//=========================================
localStorage.setItem("savedGods", JSON.stringify(gods)); //gods
localStorage.setItem("savedGodsAppeased", JSON.stringify(godsAppeased)); //godsAppeased
localStorage.setItem("savedRelics", JSON.stringify(relics)); //relics
                //grid 
  localStorage.setItem("savedAdjacentNumbers", JSON.stringify(adjacentNumbers)); 
  localStorage.setItem("savedGridState", JSON.stringify(gridState)); 
  localStorage.setItem("savedGridChosen", JSON.stringify(gridChosen)); //current
  localStorage.setItem("savedAltars", JSON.stringify(altars)); 
  localStorage.setItem("savedAltar", JSON.stringify(currentAltar)); 
                            //Time
  localStorage.setItem("savedTime", JSON.stringify(totalTime)); 
	//  Divinity / Shards
  localStorage.setItem("savedShardBuys", JSON.stringify(shardBuys)); 
	//  Achievements
  localStorage.setItem("savedAchievements", JSON.stringify(achievements)); 
  localStorage.setItem("savedPermanentChanges", JSON.stringify(permanentChanges)); 
  localStorage.setItem("savedPermanentMadness", JSON.stringify(permanentMadness));
}
// Function to load data from local storage

function loadpointerdown(){
    location.reload();
}
function loadFromLocalStorage() {
  //localStorage.clear();
   // window.console.log('load');
    //dom

    let storedDomUnlocks = localStorage.getItem("savedDomUnlocks"); 
    if (storedDomUnlocks) {
        domUnlocks = JSON.parse(storedDomUnlocks); //replace dom
    window.console.log("v", domUnlocks.versionNumber);
        domKeys = Object.keys(domUnlocks);
        for(i=0;i<domKeys.length;i++){
            if(domUnlocks[domKeys[i]] === true){
                document.getElementById(domKeys[i] + 'Tab').style.display='block';
            }
        }
    }
if(!domUnlocks.versionNumber || domUnlocks.versionNumber < currentVersionNumber){//old versions keep the essential bits
        console.log("old");
        let savedPermanentChanges = localStorage.getItem("savedPermanentChanges");
        permanentChanges = JSON.parse(savedPermanentChanges); 
        if(permanentChanges.immortality === true){ 
            domUnlocks.sacrarium = true;
            relics.immortality.unlocked = true;
            document.getElementById('sacrariumTab').style.display='block';
            document.getElementById('immortalityWrap').style.display='block';
        }
       if(permanentChanges.mist === true){
            stats.madness.madCap = 88 * 4; //resetting madCap and x4  in case immortality before updating
            updateMadnessSlider();
            document.getElementById("madnessDesc").innerHTML= "Madness rides the star-wind... MadCap: " + Math.floor(stats.madness.madCap);
            actions.study.level += 4;
            actions.dream.level += 4; 
        }
        let savedPermanentMadness = localStorage.getItem("savedPermanentMadness");
        if (savedPermanentMadness) {
            permanentMadness = JSON.parse(savedPermanentMadness); 
        }
        let savedTime = localStorage.getItem("savedTime");
        totalTime = JSON.parse(savedTime); 
    if(permanentChanges.totalShards >0){
        stats.shards.unlocked=true;
        stats.shards.current= permanentChanges.totalShards;
        numberChange("stats", "shards",  stats.shards.current, "blue");
        domUnlocks.divinity = true;
        document.getElementById('divinityTab').style.display='block';
    }
        domUnlocks.versionNumber = currentVersionNumber;
        console.log("?");
        eventBox("images/eventImages/cult.jpg", 'Game Updated: v' + domUnlocks.versionNumber, 'Big updates break saves so your game has been reset. Shard purchases are refunded, but all other permanent changes are  preserved. If you would prefer to start fresh, the option in is the settings menu.');
        localStorage.clear();
        saveToLocalStorage();
}else if (domUnlocks.versionNumber >= currentVersionNumber){
        console.log("new");
    let savedPermanentChanges = localStorage.getItem("savedPermanentChanges");
    if(savedPermanentChanges){
        permanentChanges = JSON.parse(savedPermanentChanges); 
        let savedPermanentMadness = localStorage.getItem("savedPermanentMadness");
        if (savedPermanentMadness) {
            permanentMadness = JSON.parse(savedPermanentMadness); 
        }
            //time
        let storedTime = localStorage.getItem("savedTime"); 
        if (storedTime) {
            totalTime = JSON.parse(storedTime); 
            totalTime.timeInit = Date.now();
        }
                    //=========================================
            //  West 
            //=========================================
                                                                             //stats
        let storedStats = localStorage.getItem("savedStats"); 
        if (storedStats) {
            stats = JSON.parse(storedStats); //replace stats
            //update dom
            for(i=0;i<statKeys.length;i++){
                document.getElementById(statKeys[i]).innerHTML = Math.floor(stats[statKeys[i]].current);
                if(stats[statKeys[i]].unlocked === true){
                    document.getElementById(statKeys[i] + "Box").style.display='block';
                }
            };
            document.getElementById("healthDesc").innerHTML= "Health will drift up or down toward West's base Health, currently: " + Math.floor(stats.health.max);
            document.getElementById("madnessDesc").innerHTML= "Madness rides the star-wind... MadCap: " + Math.floor(stats.madness.madCap);
            } else {
        console.log("stats missing.");
        }
                                                                             //actions
        let storedActions = localStorage.getItem("savedActions"); 
        if (storedActions) {
            actions = JSON.parse(storedActions); //replace 
            //update dom
            for(i=1;i<actionKeys.length;i++){
                if(actions[actionKeys[i]].purchased === true){
                    document.getElementById(actionKeys[i] + "Lock").style.display='none';
                    document.getElementById(actionKeys[i] + "Wrap").style.display='block';
                }else{
                    document.getElementById(actionKeys[i] + "Lock").style.display='block';
                }
            };
            document.getElementById('preachWrapCost').innerHTML = actions.preach.cost;
            document.getElementById('preachCost').innerHTML = actions.preach.cost;
            if(actions.chant.toggleBool === true){
                document.getElementById('chantToggle').style.display='block';
                document.getElementById('chantWrap').addEventListener('pointerdown',  chantToggle);
                if(actions.chant.toggle === true){
                    document.getElementById('chantToggle').style.backgroundColor='green';
                }
            }
            if(actions.dream.type !== "mindAlone"){
                let option = actions.dream.type;
                document.getElementById("dreamChosen").innerHTML = dreamChoices[option].string;
                document.getElementById('dreamImg').src = dreamChoices[option].img;
                document.getElementById('dreamDesc').innerHTML= dreamChoices[option].description[0];
                document.getElementById('dreamcost').innerHTML= dreamChoices[option].description[1];
                document.getElementById('dreamBenefit').innerHTML= dreamChoices[option].description[2];
            }
            if(actions.dream.toggleBool === true){
                document.getElementById('dreamToggle').style.display='block';
                document.getElementById('dreamWrap').removeEventListener("pointerdown", startDreamTimer);
                document.getElementById('dreamWrap').addEventListener('pointerdown',  dreamToggle);
                if(actions.dream.toggle === true){
                    document.getElementById('dreamToggle').style.backgroundColor='green';
                    startDreamTimer('toggled');
                }
            }
        }
                                                                        //actionUpgrades
        let storedActionUpgrades = localStorage.getItem("savedActionUpgrades"); 
        if (storedActionUpgrades) {
            actionUpgrades = JSON.parse(storedActionUpgrades); //replace 
            //update dom
            for(i=0;i<upgradeKeys.length;i++){
                let upgrades = Object.keys(actionUpgrades[upgradeKeys[i]]);
                for(j=0;j< upgrades.length;j++){
                    if(actionUpgrades[upgradeKeys[i]][upgrades[j]].unlocked === true && actionUpgrades[upgradeKeys[i]][upgrades[j]].purchased === false){
                        document.getElementById(upgrades[j] + "Wrap").style.display='block';
                        if(document.getElementById(upgrades[j] + "Cost")){
                            document.getElementById(upgrades[j] + "Cost").innerHTML= actionUpgrades[upgradeKeys[i]][upgrades[j]].cost;
                        }
                    }
                }
            }
        };
        if(actionUpgrades.preach.fiction.unlocked===true){
            document.getElementById("fictionCost").innerHTML=actionUpgrades.preach.fiction.cost;
        }
                                                                             //mad actions
        let storedMadAct = localStorage.getItem("savedMadAct"); 
        if (storedMadAct) {
            madActions = JSON.parse(storedMadAct); //replace 
            //update dom
            if(stats.madness.madActionBoxUnlocked === true){
                document.getElementById('madActionBox').style.display='block';
            }
            for(i=0;i<madKeys.length;i++){
                if(madActions[madKeys[i]].unlocked === true){
                    document.getElementById(madKeys[i] + "Wrap").style.display='block';
                }
            };
        } else {
        console.log("mad actions missing.");
        }
                                                                    //madups
        let storedMadUps = localStorage.getItem("savedMadUps"); 
        if (storedMadUps) {
            madUps = JSON.parse(storedMadUps); //replace 
            for(i=0;i<madUpsKeys.length;i++){
                if(madUps[madUpsKeys[i]].unlocked === true && madUps[madUpsKeys[i]].purchased === false){
                    document.getElementById(madUpsKeys[i] + "OneOff").style.display='block';
                }else if(madUps[madUpsKeys[i]].purchased === true){
                    document.getElementById(madUpsKeys[i] + "OneOff").style.display="none";
                }
            };
        } else {
        console.log("mad upgrades missing.");
        }


                    //=========================================
            //  Cult
            //=========================================

        let storedCult = localStorage.getItem("savedCult"); //cult
        if (storedCult) {
            cult = JSON.parse(storedCult); //replace 
            //update dom
            for(i=0;i<cultKeys.length;i++){
                if(cult[cultKeys[i]].unlocked === true){
                    document.getElementById(cultKeys[i] + "Wrap").style.display='block';
                    document.getElementById(cultKeys[i]).innerHTML = cult[cultKeys[i]].current;
                if (pegTypes.includes(cultKeys[i])) {
                        // Show the Peg element
                        document.getElementById(cultKeys[i] + "Peg").style.display = 'block';
                        document.getElementById(cultKeys[i] + "Unplaced").innerText = cult[cultKeys[i]].unplaced;
                    }
                }
            };
            document.getElementById('faithfulDesc').innerHTML = cult.faithful.description + "Faithful Love and Terror Capacity: " + Math.ceil(Math.pow(cult.faithful.current + cult.hybrids.current + cult.brined.current, cult.faithful.capMultiplier) + 88);
            document.getElementById('chantersDesc').innerHTML = cult.chanters.description + "Chanter Love Capacity: " + (cult.chanters.current * (cult.faithful.current + cult.hybrids.current+ cult.brined.current)) * 16;
            document.getElementById('sentinelsDesc').innerHTML = cult.sentinels.description + "Sentinels Terror Capacity: " + ((cult.sentinels.current + cult.hybrids.current) * (cult.faithful.current + cult.hybrids.current+ cult.brined.current)) * 16;
        } else {
        console.log("cult missing.");
        }
        let storedVault = localStorage.getItem("savedVault"); //vault
        if (storedVault) {
            vault = JSON.parse(storedVault); //replace 
            //update dom
            for(i=0;i<vaultKeys.length;i++){
                if(vault[vaultKeys[i]].unlocked === true){
                    document.getElementById(vaultKeys[i] + "Wrap").style.display='block';
                    document.getElementById(vaultKeys[i]).innerHTML=Math.floor(vault[vaultKeys[i]].current);
                }
            };
        } else {
        console.log("vault missing.");
        }

        //crafts
    // Load saved data from localStorage
        if (localStorage.getItem("savedLove")) {
            loveCrafts = JSON.parse(localStorage.getItem("savedLove"));
        }
        if (localStorage.getItem("savedTerror")) {
            terrorCrafts = JSON.parse(localStorage.getItem("savedTerror"));
        }
        if (localStorage.getItem("savedGold")) {
            goldCrafts = JSON.parse(localStorage.getItem("savedGold"));
        }
        if (localStorage.getItem("savedFlesh")) {
            fleshCrafts = JSON.parse(localStorage.getItem("savedFlesh"));
        }
        if (localStorage.getItem("savedTome")) {
            tomeCrafts = JSON.parse(localStorage.getItem("savedTome"));
        }
        if (localStorage.getItem("savedIchor")) {
            ichorCrafts = JSON.parse(localStorage.getItem("savedIchor"));
        }
        if (localStorage.getItem("savedTyog")) {
            tyogCrafts = JSON.parse(localStorage.getItem("savedTyog"));
        }
        updateCrafts();
                // Special cases for permanents
            //lovecrafts
        document.getElementById('convertChanterCost').innerHTML = loveCrafts.convertChanter.cost;
        document.getElementById('muralsCost').innerHTML = loveCrafts.murals.cost;
        document.getElementById("polygamycost").innerHTML="Cost:" +  loveCrafts.polygamy.innocents + " Innocents, Love ";
        document.getElementById("polygamyCost").innerHTML= loveCrafts.polygamy.cost;
        //terror
        document.getElementById('convertSentinelCost').innerHTML = terrorCrafts.convertSentinel.cost;
        document.getElementById("demandFleshCost").innerHTML=  terrorCrafts.demandFlesh.cost;
        document.getElementById("demandFleshBenefit").innerHTML=  "Benefit: Flesh +" + terrorCrafts.demandFlesh.benefit;
        if(terrorCrafts.sacrifice.type !=="innocents"){
            let type=terrorCrafts.sacrifice.type;
            document.getElementById("sacrificeWrap").querySelector(".craftLabels").innerHTML = sacrificeTypes[type].string;
            document.getElementById("sacrificeDesc").innerHTML = sacrificeTypes[type].description[0];
            document.getElementById("sacrificeTerror").innerHTML = sacrificeTypes[type].description[3];
            document.getElementById("sacrificecost").innerHTML = sacrificeTypes[type].description[1];
            document.getElementById("sacrificeBenefit").innerHTML = sacrificeTypes[type].description[2];
                }
        if(terrorCrafts.sacrifice.purchased===true) document.getElementById('sacToggle').style.display = 'block';
        if (terrorCrafts.breedingPits.level > 0 && godsAppeased.shubAppeased.unlocked===false) {
            document.getElementById('breedingPitsDesc').innerHTML = "Current stock produces an Innocent every " + Math.ceil(40 / terrorCrafts.breedingPits.level) + " seconds. ";
            document.getElementById('breedingPitsCost').innerHTML = terrorCrafts.breedingPits.cost;
            document.getElementById('breedingPitsBenefit').innerHTML = "Increased herd size will produce an Innocent every " + Math.ceil(40 / (terrorCrafts.breedingPits.level + 1)) + " seconds.";
        }else if(terrorCrafts.breedingPits.level > 0 && godsAppeased.shubAppeased.unlocked===true){
            document.getElementById('breedingPitsCost').innerHTML = terrorCrafts.breedingPits.cost;
            document.getElementById('breedingPitsDesc').innerHTML = "Iä! Current stock produces 4 Innocents every " + Math.ceil(40/terrorCrafts.breedingPits.level) + " seconds.";
            document.getElementById('breedingPitsBenefit').innerHTML = "Increasing the herd size will produce Innocents every " + Math.ceil(40/(terrorCrafts.breedingPits.level + 1)) + " seconds(+88 Terror).";
            }
        document.getElementById("syringeBenefit").innerHTML= "Benefits: 1 Flesh, 1 Radiance, 88 Terror, " + terrorCrafts.syringe.madnessGain + " Madness";
        //gold
        if (goldCrafts.tithe.purchased===true) document.getElementById('titheToggle').style.display = 'block';
        if (goldCrafts.tithe.toggle===true) document.getElementById('titheToggle').style.backgroundColor = 'green';
        document.getElementById("incenseCost").innerHTML=goldCrafts.incense.cost;
        //flesh
        document.getElementById('leatherBindingcost').innerHTML = 'Cost: ' + vault.tome.pagesNeeded + ' Pages, Flesh: ';
        document.getElementById('leatherBindingCost').innerHTML = fleshCrafts.leatherBinding.cost;
        document.getElementById('sculptCost').innerHTML = fleshCrafts.sculpt.cost;
        document.getElementById('sculptBenefit').innerHTML = "Benefit: Gold: " + fleshCrafts.sculpt.benefit;
        if (fleshCrafts.cannibalism.tentacle === true) {
            fleshCrafts.cannibalism.description[0] = "Watching West's second mouth eat horrifies the Faithful (increased Terror)";
            fleshCrafts.cannibalism.description[2] = "Benefits: Health, Madness, Terror, and Radiance";
        }
        document.getElementById('deepTradeCost').innerHTML =  fleshCrafts.deepTrade.cost;
        document.getElementById('deepTradeBenefit').innerHTML = "Benefit: Gold " +  fleshCrafts.deepTrade.benefit;
        //tome
        if (cult.priests.vaultActions===true) document.getElementById('priestActions').style.display = 'flex';
        if (cult.priests.vaultAction) document.getElementById(cult.priests.vaultAction + "Light").style.backgroundColor = 'green';
        document.getElementById('pages').innerHTML = Math.floor(vault.tome.pageCounter);
        document.getElementById('ordainCost').innerHTML = Math.floor(tomeCrafts.ordain.cost);
        document.getElementById('enscribeCost').innerHTML = tomeCrafts.enscribe.cost;
        document.getElementById('feedHungryCost').innerHTML = fleshCrafts.feedHungry.cost;
        document.getElementById('feedHungryBenefit').innerHTML = "Benefit: Innocents " + fleshCrafts.feedHungry.benefit;

                            //=========================================
            //  Expeditions
            //=========================================
        let storedWorld = localStorage.getItem("savedWorld"); //world
        if (storedWorld) {
            world = JSON.parse(storedWorld); //replace 
            //update dom
            for(i=0;i<worldKeys.length;i++){
                if(world[worldKeys[i]].purchased=== true && world[worldKeys[i]].permanent=== false){
                    document.getElementById(worldKeys[i] + "OneOff").style.display="none";
                }else if(world[worldKeys[i]].unlocked === true && world[worldKeys[i]].purchased=== false && world[worldKeys[i]].permanent=== false){
                    document.getElementById(worldKeys[i] + "OneOff").style.display="block";
                }else if(world[worldKeys[i]].unlocked === true && world[worldKeys[i]].permanent=== true){
                    document.getElementById(worldKeys[i] + "Wrap").style.display="block";
                }
                if(world[worldKeys[i]].stage && world[worldKeys[i]].stage>1){
                    document.getElementById(worldKeys[i] + 'Desc').innerHTML = world[worldKeys[i]]['description' + world[worldKeys[i]].stage][0];
                    document.getElementById(worldKeys[i] + 'cost').innerHTML = world[worldKeys[i]]['description' + world[worldKeys[i]].stage][1];
                    document.getElementById(worldKeys[i] + 'Cost').innerHTML = world[worldKeys[i]].cost;
                    document.getElementById(worldKeys[i] + 'Benefit').innerHTML = world[worldKeys[i]]['description' + world[worldKeys[i]].stage][2];
                }
                if(world[worldKeys[i]].purchased===true){
                    if(worldKeys[i] === "ant"){
                        document.getElementById('antWrap').classList.add("pulsingDarkness");
                    }else if (world[worldKeys[i]].permanent===true){
                        document.getElementById(worldKeys[i] + 'Wrap').style.backgroundColor = '#301934';
                    }
                }
            };
            for(let i = 0; i < worldKeys.length; i++) {
                if(world[worldKeys[i]].stage && world[worldKeys[i]].stage > 1) {
                    document.getElementById(worldKeys[i] + "Desc").innerHTML = world[worldKeys[i]]["description" + world[worldKeys[i]].stage][0];
                    if(world[worldKeys[i]].madMin){ document.getElementById(worldKeys[i] + "MadMin").innerHTML = world[worldKeys[i]].madMin;}
                    document.getElementById(worldKeys[i] + "cost").innerHTML = world[worldKeys[i]]["description" + world[worldKeys[i]].stage][1];
                    document.getElementById(worldKeys[i] + "Cost").innerHTML = world[worldKeys[i]].cost;
                    document.getElementById(worldKeys[i] + "Benefit").innerHTML = world[worldKeys[i]]["description" + world[worldKeys[i]].stage][2];
                }
            }
            if(world.wax.kult===true){
                document.getElementById('waxDesc').innerText = "Careful examination reveals all. Madness Minimum: 164 ";
                document.getElementById('waxBenefit').innerText = "Benefit: ?";
                document.getElementById('waxWrap').style.backgroundColor='black';
            }
        } else {
        console.log("world missing.");
        }
        let storedDreamEx = localStorage.getItem("savedDreamEx"); //dream ex
        if (storedDreamEx) {
            dreamEx = JSON.parse(storedDreamEx); //replace 
            //update dom
            if(dreamEx.pillar.dreamUnlocked === true){
                document.getElementById('dreamEx').style.display='flex';
            }
            if(dreamEx.pillar.purchased === true){
                document.getElementById('dreamChosen').style.display='block';
                document.getElementById('dreamDropBtn').style.display='block';
                document.getElementById('mindAloneChoice').style.display='block';
                document.getElementById('lighthouseChoice').style.display='block';
            }
            for(i=0;i<dreamExKeys.length;i++){
                if(dreamEx[dreamExKeys[i]].unlocked === true && dreamEx[dreamExKeys[i]].purchased === false){
                    document.getElementById(dreamExKeys[i] + "Wrap").style.display='block';
                }else if(dreamEx[dreamExKeys[i]].unlocked === true && dreamEx[dreamExKeys[i]].purchased === true){
                    document.getElementById(dreamExKeys[i] + "Wrap").style.display='none';
                }
            };
            if(dreamEx.pillar.purchased === true){
                dreamChoice(actions.dream.type);
                toggleDreamChoices();
            }
            if(dreamEx.zoog.purchased === true){
            document.getElementById('drinkCost').innerHTML= madActions.drink.cost;
            document.getElementById('drinkBenefit').innerHTML= " Benefit: -" +madActions.drink.benefit + " Madness";  
            }
            if(dreamEx.zoog.purchased === true){  
            document.getElementById('smokeCost').innerHTML= madActions.smoke.cost;
            document.getElementById('smokeBenefit').innerHTML= " Benefit: -" +madActions.smoke.benefit + " Madness";
            }
            if(dreamEx.cele.purchased === true){
                dreamChoices.whiteShip.unlocked = true;
                document.getElementById('whiteShipChoice').style.display='block';
            }
            if(dreamEx.dylath.purchased === true){
                dreamChoices.blackShip.unlocked = true;
            document.getElementById('blackShipChoice').style.display='block';
            }
        } else {
        console.log("dream ex missing.");
        }
                            //=========================================
            //  Sacrarium
            //=========================================
        let storedGods = localStorage.getItem("savedGods"); 
        if (storedGods) {
            gods = JSON.parse(storedGods); //replace gods
            //update dom
            for(i=0;i<godKeys.length;i++){
                if(gods[godKeys[i]].unlocked === true && gods[godKeys[i]].purchased === false){
                    document.getElementById(godKeys[i] + "Wrap").style.display='block';
                }
            };
        } else {
        console.log("gods missing.");
        }
        let storedGodsAppeased = localStorage.getItem("savedGodsAppeased"); 
        if (storedGodsAppeased) {
            godsAppeased = JSON.parse(storedGodsAppeased); //replace gods
            //update dom
            for(i=0;i<godsAppeasedKeys.length;i++){
                if(godsAppeased[godsAppeasedKeys[i]].unlocked === true){
                    document.getElementById(godsAppeasedKeys[i] + "Wrap").style.display='block';
                }
            };
        } else {
        console.log("godsAppeased missing.");
        }
        let storedRelics = localStorage.getItem("savedRelics"); 
        if (storedRelics) {
            relics = JSON.parse(storedRelics); //replace relics
            //update dom
            for(i=0;i<relicKeys.length;i++){
                if(relics[relicKeys[i]].unlocked === true){
                    document.getElementById(relicKeys[i] + "Wrap").style.display='block';
                    if(relicKeys[i] === "viol"){
                        document.getElementById("chantBenefit").innerHTML= "Benefits: Love and Charm";
                    }
                }
            };
        } else {
        console.log("relics missing.");
        }
                            //=========================================
            //  Altar Room
            //=========================================
    const savedGridChosen = localStorage.getItem("savedGridChosen");
    if(savedGridChosen){
        gridChosen = JSON.parse(savedGridChosen);
        document.getElementById('altarRoomTab').innerText = grids[gridChosen].tab;
        document.getElementById('altarRoomTitle').innerText = grids[gridChosen].title;
        const savedGridState = localStorage.getItem("savedGridState");
        if (savedGridState){
            // Reset unplaced numbers before integrating grid
            pegTypes.forEach(pegType => {
                 if (pegType !== "west" && pegType !== "altar" && pegType !== 'blocked'){
                    cult[pegType].unplaced = cult[pegType].current;
                    cult[pegType].placed = 0;
                }
            });
            // Remove the default altar and west pegs before restoring save
        ["altar", "west"].forEach(defaultType => {
            for (let pos in gridState) {
                if (gridState[pos] === defaultType) {
                    const hole = document.getElementById(pos);
                    if (hole) {
                        const pegDiv = hole.querySelector('.peg');
                        if (pegDiv) hole.removeChild(pegDiv);
                    }
                    gridState[pos] = null;
                }
            }
        });
            const savedGrid = JSON.parse(savedGridState);
            // Update grid parameters if different from default
            if (gridChosen !== "grove") {
                ({ rows, columns, blockedHoles } = grids[gridChosen]);
                const grid = document.getElementById("activeAltarGrid");
                grid.innerHTML = '';
                Object.keys(gridState).forEach(key => delete gridState[key]);
                generateGrid();
                initializeGridState();
                updateGridConfig();
            }
            Object.keys(savedGrid).forEach(position => {
                const pegType = savedGrid[position];
                if (pegType && pegType !== 'blocked') {
                    const [_, row, col] = position.split('-');
                    placePegInHole(pegType, position, parseInt(row), parseInt(col), pegType === 'altar' || pegType === 'west');
                    if (pegType !== 'altar' && pegType !== 'west' && cult[pegType]) {
                        cult[pegType].unplaced--;
                        cult[pegType].placed++;
                    }
                }
            });

            updatePegCounts();
        }
    }

    // Altar restoration (only if saved data exists)
    let storedAltars = localStorage.getItem("savedAltars"); 
    if (storedAltars) {
        altars = JSON.parse(storedAltars); 
        for(i=0;i<altarKeys.length;i++){
            if(altars[altarKeys[i]].purchased === true){
                document.getElementById(altarKeys[i] + "Wrap").style.display='block';
            }
        };
    }

    let storedAltar = localStorage.getItem("savedAltar"); 
    if (storedAltar) {
        currentAltar = JSON.parse(storedAltar); 
        altarOptionClick(currentAltar + "Wrap");
        toggleAltarOptions();
    }

    // Only run adjacency check if we restored anything
    if (savedGridChosen || storedAltar) {
        checkAdjacencyAndApplyBonuses();
    }
                            //=========================================
            //  Divinity  / Shards
            //=========================================
        let savedShardBuys = localStorage.getItem("savedShardBuys");//keeps funcs intact
        if (savedShardBuys) {
            const parsed = JSON.parse(savedShardBuys);
            for (const category in parsed) {
                const savedUpgrades = parsed[category];
                for (const key in savedUpgrades) {
                    if (shardBuys[category] && shardBuys[category][key]) {
                        // Only restore cost and level from saved data
                        shardBuys[category][key].level = savedUpgrades[key].level;
                        shardBuys[category][key].cost = savedUpgrades[key].cost;
                    }
                }
            }
        }
        for (let category in shardBuys) {
            for (let key in shardBuys[category]) {
                let item = shardBuys[category][key];
                // Update display
                document.getElementById(key + 'Level').innerText = item.level;
                document.getElementById(key + 'Cost').innerText = item.cost;
                document.getElementById(key + 'ButtonCost').innerText = item.description[1] + item.cost;
                if(item.permanent===false && item.purchased===true){
                        document.getElementById(key + "ShardBuyOneOff").style.display="none";
                        document.getElementById(key + "SliderBox").style.display="inline-block";
                        updateMadnessSlider();
                }
            }
        }
            console.log(permanentChanges);
        if(permanentChanges.darkDevourer === true){
            devourTextChanges();
            document.getElementById("radianceText").style.fontSize="1dvw";
            document.getElementById("radianceBox").style.boxShadow = "inset 0 0 20px 10px rgba(190, 180, 60, 0.4), inset 0 0 40px 15px rgba(140, 130, 30, 0.2)";
        }
                            //=========================================
            //  Achievements
            //=========================================
    let savedAchievements = localStorage.getItem("savedAchievements");
        achievements = JSON.parse(savedAchievements);
        for (let i = 0; i < achievementsKeys.length; i++) {
            const category = achievementsKeys[i];
            const categoryAchievements = Object.keys(achievements[category]);
            for (let j = 0; j < categoryAchievements.length; j++) {
                const achievement = categoryAchievements[j];
                const achievementData = achievements[category][achievement];
                if(achievementData.achieved===true) document.getElementById(achievement + "Wrap").style.display = "flex";
                if (achievements[category][achievement].hasOwnProperty('level')) {
                    let displayText = achievements[category][achievement].string + ' ' + achievements[category][achievement].level;
                    document.getElementById(achievement + "Text").innerHTML = displayText;
                    document.getElementById(achievement + "Cost").innerHTML=  achievements[category][achievement].req[1];
                }
            }
        }
        eventBox("images/eventImages/opener.jpg", "A beginning...", "Waking as if out of a dream, dream West stands alone in a darkened alley, hands feverishly clutching an ancient manuscript. A soothing voice in his mind calmly hints at future greatness.");
        updateMadnessSlider();
       //closeEventBox();
       timeOn();
       }
   }
};
