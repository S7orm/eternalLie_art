/* 
local storage
 */
//adding set for major dom unlocks
let domUnlocks = {
    versionNumber: 0.55,
    cult: false,
    expeditions: false,
    sacrarium: false,
    divinity: false
};
let currentVersionNumber = 0.55;
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
            	//=========================================
	//  Expeditions
	//=========================================
localStorage.setItem("savedWorld", JSON.stringify(world)); //world
localStorage.setItem("savedDreamEx", JSON.stringify(dreamEx)); //dream ex
              	//=========================================
	//  Sacrarium
	//=========================================
localStorage.setItem("savedGods", JSON.stringify(gods)); //gods
localStorage.setItem("savedRelics", JSON.stringify(relics)); //relics
                //grid
  localStorage.setItem("savedGridState", JSON.stringify(gridState)); 
  localStorage.setItem("savedGridChosen", JSON.stringify(gridChosen)); //current
  localStorage.setItem("savedAltars", JSON.stringify(altars)); 
  localStorage.setItem("savedAltar", JSON.stringify(currentAltar)); 
                            //Time
  localStorage.setItem("savedTime", JSON.stringify(totalTime)); 
	//  Divinity / Shards
  localStorage.setItem("savedShardBuys", JSON.stringify(shardBuys)); 
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
        domKeys = Object.keys(domUnlocks);
        for(i=0;i<domKeys.length;i++){
            if(domUnlocks[domKeys[i]] === true){
                document.getElementById(domKeys[i] + 'Tab').style.display='block';
            }
        }
    }
if(domUnlocks.versionNumber == null || domUnlocks.versionNumber < currentVersionNumber){//old versions keep the essential bits
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
            actions.study.level += 4;
            actions.dream.level += 4; 
        }
        let savedPermanentMadness = localStorage.getItem("savedPermanentMadness");
        if (savedPermanentMadness) {
            permanentMadness = JSON.parse(savedPermanentMadness); 
        }
        if(permanentChanges.totalShards >0){
            numberChange("stats", "shards", permanentChanges.totalShards, "blue");
            domUnlocks.divinity = true;
            document.getElementById('divinityTab').style.display='block';
        }  
        eventBox("images/eventImages/cult.jpg", 'Game Updated: v' + domUnlocks.versionNumber, 'Big updates break saves so your game has been reset. Shard purchases are refunded, but all other permanent changes are  preserved. If you would prefer to start fresh, the option in is the settings menu.');
}else{
        	//=========================================
	//  West 
	//=========================================
                                                                         //stats
                                                                                 window.console.log("3");
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
                }
            }
        }
    };
 
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
    let crafts = ['Love', 'Terror', 'Gold', 'Flesh', 'Tome', 'Ichor'];
    let craftData = {
        Love: { stored: 'savedLove', object: loveCrafts },
        Terror: { stored: 'savedTerror', object: terrorCrafts },
        Gold: { stored: 'savedGold', object: goldCrafts },
        Flesh: { stored: 'savedFlesh', object: fleshCrafts },
        Tome: { stored: 'savedTome', object: tomeCrafts },
        Ichor: { stored: 'savedIchor', object: ichorCrafts }
    };
    crafts.forEach(craft => {
        let storedCraft = localStorage.getItem(craftData[craft].stored);
        if (storedCraft) {
            Object.assign(craftData[craft].object, JSON.parse(storedCraft));
            craftData[craft].keys = Object.keys(craftData[craft].object); // Generate keys dynamically
            craftData[craft].keys.forEach(key => {
                let item = craftData[craft].object[key];
                let callString = item.callString;
                if (item.unlocked && item.purchased && item.permanent) { 
                    // Permanent and purchased
                    document.getElementById(callString + "Wrap").style.display = 'block';
                    if (item.unlockText) {
                        document.getElementById(callString + "Lock").style.display = 'none';
                    }
                    // Special cases for permanents
                    if (craft === 'Terror' && callString === 'sacrifice') {
                        let type = craftData.Terror.object.sacrifice.type;
                        document.getElementById("sacrifice").innerHTML = sacrificeTypes[type].string;
                        document.getElementById("sacrificeDesc").innerHTML = sacrificeTypes[type].description[0];
                        document.getElementById("sacrificeTerror").innerHTML = sacrificeTypes[type].description[3];
                        document.getElementById("sacrificecost").innerHTML = sacrificeTypes[type].description[1];
                        document.getElementById("sacrificeBenefit").innerHTML = sacrificeTypes[type].description[2];
                        document.getElementById('sacToggle').style.display = 'block';
                    }
                    if (craft === 'Gold' && callString === 'tithe') {
                        document.getElementById('titheToggle').style.display = 'block';
                        if (craftData.Gold.object.tithe.toggle) {
                            document.getElementById('titheToggle').style.backgroundColor = 'green';
                        }
                    }
                    if (craft === 'Flesh' && key === 'leatherBinding') {
                        document.getElementById('leatherBindingcost').innerHTML = 'Cost: ' + vault.tomes.pagesNeeded  + ' Pages, Flesh: ';
                        document.getElementById('leatherBindingCost').innerHTML = fleshCrafts.leatherBinding.cost;
                    }
                    if (craft === 'Flesh' && key === 'sculpt') {
                        document.getElementById('sculptCost').innerHTML = item.cost;
                        document.getElementById('sculptBenefit').innerHTML = "Benefit: Gold: " + item.benefit;
                    }
                    if(fleshCrafts.cannibalism.tentacle === true){
                        fleshCrafts.cannibalism.description[0] = "Watching West's second mouth eat horrifies the Faithful (increased Terror)";
                        fleshCrafts.cannibalism.description[2] = "Benefits: Health, Madness, Terror, and Radiance";
                    }
                } else if (item.unlocked && item.purchased && !item.permanent) {                     // Purchased OneOffs
                    document.getElementById(callString + "OneOff").style.display = 'none';
                    if (craft === 'Tome' && key === 'priestVaultActions' && item.purchased) {
                        document.getElementById('priestActions').style.display = 'flex';
                        if(cult.priests.vaultAction){
                            document.getElementById(cult.priests.vaultAction + "Light").style.backgroundColor = 'green';
                        }
                    }
                } else if (item.unlocked && !item.purchased && item.permanent) {                    // Unlockable for vision buy
                    document.getElementById(callString + "Lock").style.display = 'block';
                    document.getElementById(callString + "Wrap").style.display = 'none';
                } else if (item.unlocked && !item.purchased && !item.permanent) {                   //  unlocking  OneOffa
                    document.getElementById(callString + "OneOff").style.display = 'block';
                }
            });
            // Special craft-specific updates
            if (craft === 'Terror' && craftData.Terror.object.breedingPits.level > 0) {
                document.getElementById('breedingPitsDesc').innerHTML = "Current stock produces an Innocent every " + Math.ceil(40 / craftData.Terror.object.breedingPits.level) + " seconds. ";
                document.getElementById('breedingPitsCost').innerHTML = craftData.Terror.object.breedingPits.cost;
                document.getElementById('breedingPitsBenefit').innerHTML = "Increased herd size will produce an Innocent every " + Math.ceil(40 / (craftData.Terror.object.breedingPits.level + 1)) + " seconds.";
            }
            if (craft === 'Love') {
                document.getElementById('convertChanterCost').innerHTML = craftData.Love.object.convertChanter.cost;
            }
            if (craft === 'Terror') {
                document.getElementById('convertsentinelCost').innerHTML = craftData.Terror.object.convertsentinel.cost;
            }
            if (craft === 'Tome') {
                document.getElementById('pages').innerHTML = Math.floor(vault.tomes.pageCounter);
                document.getElementById('ordainCost').innerHTML = Math.floor(craftData.Tome.object.ordain.cost);
                document.getElementById('enscribeCost').innerHTML = tomeCrafts.enscribe.cost;

            }
            if (craft === 'Ichor') {
                document.getElementById('deepTradeCost').innerHTML = fleshCrafts.deepTrade.cost;
                document.getElementById('deepTradeBenefit').innerHTML = "Benefit: Gold " + fleshCrafts.deepTrade.benefit;
            }  
        }
    });
                	//=========================================
	//  Expeditions
	//=========================================
    let storedWorld = localStorage.getItem("savedWorld"); //world
    if (storedWorld) {
        world = JSON.parse(storedWorld); //replace 
        //update dom
        for(i=0;i<worldKeys.length;i++){
            if(world[worldKeys[i]].unlocked === true){
                document.getElementById(worldKeys[i] + "Wrap").style.display='block';
            }
            if(world[worldKeys[i]].purchased === true){
                document.getElementById(worldKeys[i] + 'Desc').innerHTML= world[worldKeys[i]].description2[0];
                document.getElementById(worldKeys[i] + 'cost').innerHTML= world[worldKeys[i]].description2[1];
                document.getElementById(worldKeys[i] + 'Cost').innerHTML= world[worldKeys[i]].cost;
                document.getElementById(worldKeys[i] + 'Benefit').innerHTML = world[worldKeys[i]].description2[2];
                document.getElementById(worldKeys[i] + 'Wrap').style.backgroundColor='grey';
            }
        };
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
    let storedRelics = localStorage.getItem("savedRelics"); 
    if (storedRelics) {
        relics = JSON.parse(storedRelics); //replace relics
        //update dom
        for(i=0;i<relicKeys.length;i++){
            if(relics[relicKeys[i]].unlocked === true){
                document.getElementById(relicKeys[i] + "Wrap").style.display='block';
            }
        };
    } else {
    console.log("relics missing.");
    }
                    	//=========================================
	//  Altar Room
	//=========================================
        
    const savedGridChosen= localStorage.getItem("savedGridChosen");
    if(savedGridChosen){
    gridChosen = JSON.parse(savedGridChosen);
        document.getElementById('altarRoomTab').innerText = grids[gridChosen].tab;
        document.getElementById('altarRoomTitle').innerText = grids[gridChosen].title;
    const savedGridState = localStorage.getItem("savedGridState");
    if (savedGridState){
        const savedGridChosen= localStorage.getItem("savedGridChosen");
        gridChosen = JSON.parse(savedGridChosen);
        //resettting the unplaced numbers before integrating grid
        pegTypes.forEach(pegType => {
            if(pegType !== "altar"){
                cult[pegType].unplaced = cult[pegType].current;  // Set unplaced to current count
                cult[pegType].placed = 0;  // Reset placed count to 0
            }
        });
        // Parse the saved grid state into a separate variable (savedGrid)
        const savedGrid = JSON.parse(savedGridState);
        replaceGrid(gridChosen);
        // Iterate through each saved grid position
        Object.keys(savedGrid).forEach(position => {
            const pegType = savedGrid[position];
            // Ensure there's a peg saved at this position
            if (pegType) {
                            // **Set drag info for restoration:**
                pegDragInfo.draggedPeg = pegType;
                pegDragInfo.draggedFromHole = null;
                // Extract row and col from the position (e.g., 'hole-1-2')
                const [_, row, col] = position.split('-');  // Splits into ['hole', '1', '2']

                // Use the saved peg type to drop pegs back into the default gridState
                const fakeEvent = {
                    preventDefault: () => {}, 
                    dataTransfer: { getData: () => pegType }  // Get peg type from savedGrid
                };

                // Call dropPeg with the extracted row, col, and fakeEvent
                dropPeg(fakeEvent, row, col);
            }
        });
    }else {
    console.log("grid state missing.");
    }
}else {
    console.log("chosen grid missing.");
    }
    //altar
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
    
    //time
    let storedTime = localStorage.getItem("savedTime"); 
    if (storedTime) {
        totalTime = JSON.parse(storedTime); 
        totalTime.timeInit = Date.now();
    }
    
    
                    	//=========================================
	//  Divinity  / Shards
	//=========================================
        shardsBoughtLoad();
    let savedPermanentChanges = localStorage.getItem("savedPermanentChanges");
    permanentChanges = JSON.parse(savedPermanentChanges); 
    if(permanentChanges.immortality === true){ 
        domUnlocks.sacrarium = true;
        relics.immortality.unlocked = true;
        document.getElementById('sacrariumTab').style.display='block';
        document.getElementById('immortalityWrap').style.display='block';
    }
    let savedPermanentMadness = localStorage.getItem("savedPermanentMadness");
    if (savedPermanentMadness) {
        permanentMadness = JSON.parse(savedPermanentMadness); 
    }
    
    //change cost updates in dom
   closeEventBox();
   timeOn();
   }
};
