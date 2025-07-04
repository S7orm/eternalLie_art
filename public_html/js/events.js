function test(){
    window.console.log(stats.madness.madCap);
}
function eventBox(imageSource, title, text){
    let box = document.getElementById('eventBox');
        // Create an image element
    let image = document.createElement('img');
    image.src = imageSource; // Set the source of the image
    image.id = 'eventImage';
    // Create a header element
    let header = document.createElement('h1');
    header.id = 'eventTitle';
    header.textContent = title; // Set the title text

    // Create a paragraph element
    let paragraph = document.createElement('p');
    paragraph.id = 'eventBoxText';
    paragraph.textContent = text; // Set the text content
    if(title === "The Cult") {//warning text for cult
        var textToAdd = "*The number of Faithful is critical. This is the only Warning.*";
        var spanElement = document.createElement('span');
        spanElement.style.color = "red"; 
        spanElement.innerHTML = textToAdd; 
        paragraph.appendChild(spanElement);
    }
        // Create close button
    let button = document.createElement('button');
    button.id = 'closeEventButton';
    button.textContent = "X"; 
    // Clear the existing content of 'eventBox'
    box.innerHTML = '';

    // Append the new elements to 'eventBox'
    box.appendChild(button);
    box.appendChild(image);
    box.appendChild(header);
    box.appendChild(paragraph);
    document.querySelector('#closeEventButton').addEventListener('pointerdown', closeEventBox);
    openEventBox();
}

let closeCheck = false;
function closeEventBox(){
    document.getElementById('eventBox').style.display='none';
    closeCheck = true;
    timeOn();
}
function openEventBox(){
    closeCheck = false;
        timeOff();
    setTimeout(function() {
        document.getElementById('eventBox').style.display = 'block';
    }, 500);
}
    	//=========================================
	// putting eventlisteners on after everything else
	//=========================================
function eventListeners1(){
document.addEventListener("contextmenu", (event) => event.preventDefault());// disable rightclick from tablets

    // scroll listeners
const scrollDivs = ["commentary", "world", "dreamEx"];
function setupMouseWheelListeners() {
    scrollDivs.forEach((scrollDivId) => {
        const scrollDivElement = document.getElementById(scrollDivId);
 
        // Add event listeners for each element
        scrollDivElement.addEventListener("pointerenter", function() {
            addMouseWheelListener(scrollDivElement);
        });
        scrollDivElement.addEventListener("pointerleave", function() {
            removeMouseWheelListener(scrollDivElement);
        });
    });
}
// Call the function to set up the listeners
setupMouseWheelListeners();

    //Action Upgrades
    for (i=0;i<upgradeKeys.length; i++){
        let actionColumn = upgradeKeys[i];
        let upgrades = Object.keys(actionUpgrades[actionColumn]);
        for(j=0;j<upgrades.length;j++){
            document.getElementById(upgrades[j] + 'Wrap').addEventListener('pointerdown', actionUpgrades[actionColumn][upgrades[j]].func);
        };
    };
 
    document.getElementById('sacToggle').addEventListener('pointerdown', () => toggleSacrificeTypes());

var sacTypes = document.querySelectorAll('.sacrificeType');
    sacrificeKeys = Array.from(sacTypes).map(sacTypes => sacTypes.id);
    sacrificeKeys.forEach(key => {
    var option = document.getElementById(key);
    option.addEventListener('pointerenter', function() {
    this.style.background = 'transparent';});
    option.addEventListener('pointerleave', function() {
    this.style.background = '';});
    option.addEventListener('pointerup', function() {
    sacrificeType(this.id);
    });
  });
      document.getElementById('altarToggle').addEventListener('pointerdown', toggleAltarOptions);

  var altarOptions = document.querySelectorAll('.altarOptionWraps');
    altarKeyDivs = Array.from(altarOptions).map(altarOptions => altarOptions.id);
    altarKeyDivs.forEach(key => {
    var option = document.getElementById(key);
    option.addEventListener('pointerenter', function() {
    this.style.background = 'transparent';});
    option.addEventListener('pointerleave', function() {
    this.style.background = '';});
    option.addEventListener('pointerup', function() {
    altarOptionClick(this.id);
    });
  });
    for(i=0;i<worldKeys.length;i++){
        document.getElementById(worldKeys[i] + "Wrap").addEventListener('pointerdown', world[worldKeys[i]].func);
    }
     for(i=0;i<dreamExKeys.length;i++){
        document.getElementById(dreamExKeys[i] + "Wrap").addEventListener('pointerdown', dreamEx[dreamExKeys[i]].func);
    }

}
function eventListeners2(){
    //vault scroll
    var craftBoxes = document.getElementsByClassName("craftBox");
    for (var i = 0; i < craftBoxes.length; i++) {
        let element = craftBoxes[i];
        element.addEventListener("pointerenter", function() {
        addMouseWheelListener(element);
      });
      element.addEventListener("pointerleave", function() {
        removeMouseWheelListener(element);
      });
    }
            //test buttons schTogFunc()
document.addEventListener("visibilitychange", function () { //should fix off screen weirdness
    if (document.hidden) {
        afkStamp = performance.now();
       timeOff();
    } else {
        afk();
       timeOn();
    }    
});//

document.getElementById('gear').addEventListener('pointerdown',  () =>toggleMenu());
document.getElementById('reset').addEventListener('pointerdown',  () =>resetGame());
document.getElementById('test').addEventListener('pointerdown',   () => test());  //top buttons
document.getElementById('mute').addEventListener('pointerdown',  () =>  muteToggle());
document.getElementById('save').addEventListener('pointerdown',  () =>  saveToLocalStorage());
document.getElementById('load').addEventListener('pointerdown',  () => loadpointerdown());
    //main actions and their unlocks
    document.getElementById('chantLock').addEventListener('pointerdown',  () => unlock('chant', 'actions'));
    document.getElementById('dreamLock').addEventListener('pointerdown',  () => unlock('dream', 'actions'));
    document.getElementById('preachLock').addEventListener('pointerdown',  () => unlock('preach', 'actions'));

    document.getElementById('studyWrap').addEventListener('pointerdown',  study);
    document.getElementById('chantWrap').addEventListener('pointerenter', chantTimer);
    document.getElementById('dreamWrap').addEventListener("pointerdown", startDreamTimer);
    document.getElementById('preachWrap').addEventListener('pointerdown', preach);
    //mad actions
    for(i=0;i<madKeys.length;i++){
        let temp = madKeys[i];
        document.getElementById(temp + 'Wrap').addEventListener('pointerdown', () => startMadActLoop(temp));
        document.getElementById(temp + 'Wrap').addEventListener('pointerdown', () => executeMadAction(temp) );
    };
    //vault button presses
    document.getElementById('altarRoomTab').addEventListener('pointerdown',  () => changeTab('altarRoom'));

    for(i=0;i<vaultKeys.length; i++){
        let temp = vaultKeys[i];
        document.getElementById(temp + "Wrap").addEventListener('pointerdown', () => changeCraftBox(temp));
    }
    for(let j=0; j<craftKeys.length; j++){
        let key = craftKeys[j];
        for(let k=0; k<key.length; k++){
        let craft = craftTypeKeys[j][key[k]];
            if(craft.permanent === true){
                            // Determine if this should use vaultConversion
                if (craft.func === 'vaultConversion') {
                    document.getElementById(key[k] + "Wrap").addEventListener('pointerdown', () => vaultConversionLoop(craft));
                    document.getElementById(key[k] + "Wrap").addEventListener('pointerdown', () => executeVaultConversion(craft) );
                } else {
                    document.getElementById(key[k] + "Wrap").addEventListener('pointerdown', craft.func);
                }
                if(craftTypeKeys[j][key[k]].unlockText){
                    document.getElementById(key[k]+ "Lock").addEventListener('pointerdown', () => unlock(key[k], craftStringKeys[j]));   
                }
            }
            if(craftTypeKeys[j][key[k]].permanent=== false){
                document.getElementById(key[k]+ "OneOff").addEventListener('pointerdown', craftTypeKeys[j][key[k]].func);  
            }
        }
    }
        for(i=0; i<godKeys.length; i++){
        let temp = godKeys[i];
        document.getElementById(temp + 'Wrap').addEventListener('pointerdown', gods[temp]['func']);
    };
    //altar room
    addPegEvents();
    document.getElementById('clearGrid').addEventListener('pointerdown',  () =>  clearGrid());

    //divinity
Object.keys(shardBuys.shardDoublers).forEach(actionKey => {//actionKey is doubler or reducer objects
    document.getElementById(actionKey + 'ShardBuyWrap').addEventListener('pointerdown', function() {
       shardActionDouble(actionKey);
    });
});
Object.keys(shardBuys.madReducers).forEach(actionKey => {
    document.getElementById(actionKey + 'ShardBuyWrap').addEventListener('pointerdown', function() {
       madReducer(actionKey);
    });
});
Object.keys(shardBuys.others).forEach(actionKey => {
    document.getElementById(actionKey + 'ShardBuyWrap').addEventListener('pointerdown',  shardBuys.others[actionKey].func);
});
        //    document.getElementById('divinityTab').style.display = 'block'; //temp
}

    //code for description hovers
function addCommentsToButtons(setArray) {
    setArray.forEach(singleSet => {
        const setKeys = Object.keys(singleSet);  
        setKeys.forEach(function (setKey) {
            const parent = document.getElementById(setKey +'Wrap'); // Find button by ID using the key
            const OneOff = document.getElementById(setKey +'OneOff');
            const locks = document.getElementById(setKey +'Lock');
            const choices = document.getElementById(setKey + 'Choice');
            const shardbuyTemp = document.getElementById(setKey + 'ShardBuyWrap');
            const container = shardbuyTemp || parent || OneOff || choices;
            if (container) {
                const descriptionBox = document.createElement('div'); //main description
                descriptionBox.classList.add('descriptionBox');

                if ([loveCrafts, terrorCrafts, goldCrafts, fleshCrafts, tomeCrafts, ichorCrafts, tyogCrafts].includes(singleSet)) {
                    descriptionBox.classList.add('craftDescription');
                };
                if(singleSet === madActions){
                    descriptionBox.classList.add('madDescription');
                };
                if(singleSet === world){
                    descriptionBox.classList.add('worldDescription');
                };
                container.appendChild(descriptionBox);

                const description = document.createElement('p');
                description.textContent = singleSet[setKey].description[0];
                description.classList.add('desc'); 
                const Id = setKey + 'Desc'; 
                description.id = Id; 
                descriptionBox.appendChild(description);

                if(singleSet[setKey].description[3]){ //adding terror mins
                    const terror = document.createElement('span');
                    terror.textContent = singleSet[setKey].description[3];
                    terror.classList.add('desc'); 
                    const Id = setKey + 'Terror'; 
                    terror.id = Id; 
                    descriptionBox.appendChild(terror);
                }
                if(singleSet[setKey].madMin){ //adding mad mins
                    const madMinDesc = document.createElement('span');
                    madMinDesc.textContent = singleSet[setKey].madMin;
                    madMinDesc.classList.add('desc'); 
                    const Id = setKey + 'MadMin'; 
                    madMinDesc.id = Id; 
                    descriptionBox.appendChild(madMinDesc);
                }
                if(singleSet[setKey].description[1]){
                    const cost = document.createElement('span');
                    cost.textContent = singleSet[setKey].description[1];
                    cost.classList.add('desc'); 
                    const Id = setKey + 'cost'; 
                    cost.id = Id;
                    descriptionBox.appendChild(cost);
                    if(singleSet[setKey].cost){
                        const costs = document.createElement('span');
                        costs.textContent = singleSet[setKey].cost;
                        costs.classList.add('costs'); 
                        const Id = setKey + 'Cost'; 
                        costs.id = Id; 
                        descriptionBox.appendChild(costs);
                    }
                }
                if(singleSet[setKey].description[2]){
                    const benefit = document.createElement('span');
                    benefit.textContent = singleSet[setKey].description[2];
                    benefit.classList.add('desc'); 
                    const Id = setKey + 'Benefit'; 
                    benefit.id = Id;
                    descriptionBox.appendChild(benefit);
                }
            }
            if (locks) {
                const descriptionBox = document.createElement('div'); //main description
                descriptionBox.classList.add('descriptionBox');
                descriptionBox.classList.add('lockDesc');
                locks.appendChild(descriptionBox);
                const description = document.createElement('p');
                description.textContent = singleSet[setKey].lockCost;
                description.classList.add('desc'); 
                const Id = setKey + 'Desc'; 
                description.id = Id; 
                descriptionBox.appendChild(description);
            }
        });
    });
}


function commentListeners() {
    const descParents = document.querySelectorAll(".actionWraps, .dreamChoice, .actionUpgradeWraps, .madActionWraps, .cultWraps, .craftWraps, .craftLocks, .craftOneOff, .worldWraps, .dreamExWraps, .godsWraps, .relicWraps, .altarOptionWraps, .shardBuyWraps");
    descParents.forEach(function (container) {
        const parent = container;
        const descriptionBox = container.querySelector(".descriptionBox");
        let showTimeout, hideTimeout;
        let isHovering = false;
        parent.addEventListener("pointerenter", function () {
            isHovering = true;
            clearTimeout(hideTimeout); // Prevent hiding if it was scheduled
            showTimeout = setTimeout(function () {
                descriptionBox.classList.add("show");
            }, 500);
        });
        parent.addEventListener("pointerleave", function () {
            isHovering = false;
            clearTimeout(showTimeout); // Prevent showing if not already shown
            hideTimeout = setTimeout(function () {
                if (!isHovering) {
                    descriptionBox.classList.remove("show");
                }
            }, 500);
        });
        descriptionBox.addEventListener("pointerenter", function () {
            isHovering = true; // Prevent hiding when re-entering the descriptionBox
            clearTimeout(hideTimeout);
        });
        descriptionBox.addEventListener("pointerleave", function () {
            isHovering = false;
            hideTimeout = setTimeout(function () {
                if (!isHovering) {
                    descriptionBox.classList.remove("show");
                }
            }, 500);
        });    
    });
} 

document.addEventListener("DOMContentLoaded", function () {  //start of page after init and before load
//localStorage.clear();
    totalTime.timeInit = Date.now();
    shadows();
    addCommentsToButtons([actions, actionUpgrades.study, actionUpgrades.chant, actionUpgrades.preach, dreamChoices, madActions, cult, vault, dreamEx, world, gods, relics, loveCrafts, terrorCrafts, goldCrafts, fleshCrafts, tomeCrafts, ichorCrafts, tyogCrafts, altars, shardBuys.shardDoublers, shardBuys.madReducers, shardBuys.others]);
    document.getElementById('visionBox').style.display='block';
    document.getElementById('healthBox').style.display='block';
    document.getElementById('menuBox').style.display='none';
    document.getElementById('studyWrap').style.display='block';
    document.getElementById('studyColumn').style.display='block';
    document.getElementById('westTab').style.display='block';
    var saveTest = localStorage.getItem("savedDomUnlocks");  //save test
    var resetRunStats = localStorage.getItem("resetRunStats");  //save test
    var nyarTest = localStorage.getItem('savedNyarStats'); //saved only in nyar resets
    var mistTest = localStorage.getItem('savedMistStats'); //saved only in mist resets
    commentListeners();
    eventListeners1();
    eventListeners2();
    window.console.log("loading...");
    if (saveTest !== null) {
        window.console.log("V " +domUnlocks.versionNumber );
        window.console.log("save found");
        loadFromLocalStorage();
        window.console.log('loaded');
        //after load on return to page run offlineProgress
        if(domUnlocks.versionNumber !== null && domUnlocks.versionNumber === currentVersionNumber){
            window.console.log("Version current, loading offline");
            offlineProgress();
        }else{
        domUnlocks.versionNumber = 0.55;
        window.console.log("updated version to " + domUnlocks.versionNumber );
        }
    }else if (resetRunStats !== null){
        window.console.log('resetRun');
        resetRunPost();//in time
        localStorage.removeItem('resetRunStats');
    }else if (nyarTest !== null){
        window.console.log('nyarload');
        nyarPostReset();
        localStorage.removeItem('savedNyarStats');
    }else if(mistTest !== null){
        mistPostReset();
        localStorage.removeItem('savedMistStats');
    }else{
        eventBox("images/eventImages/opener.jpg", "A beginning...", "Waking as if out of a dream, dream West stands alone in a darkened alley, hands feverishly clutching an ancient manuscript. A soothing voice in his mind calmly hints at future greatness.");
    }
window.addEventListener("beforeunload", saveToLocalStorage);

});


        	//=========================================
	// Locks
	//========================================= 

        	//=========================================
	// Unlocks and updates
	//========================================= 

let ticCounterForUnlock = 1;
let ticCounter = 0;
function checkUnlockCounter(tics){
    if((ticCounter + tics) >= ticCounterForUnlock){
        ticCounter += tics;
        ticCounter -= ticCounterForUnlock;
        checkUnlocks();
    }else{
        ticCounter += tics;
    }
}

function checkUnlocks(){
    for(i=0;i<statKeys.length; i++){ ///main stats
        if(stats[statKeys[i]].unlocked === false ){
            let unlockStat = stats[statKeys[i]].unlock[0];
            let unlockNum = stats[statKeys[i]].unlock[1];
            if(stats[unlockStat].current >= unlockNum){
                stats[statKeys[i]].unlocked = true; 
                document.getElementById(statKeys[i] + 'Box').style.display='block';
            }
        }
    }
///action locks
    if(stats.vision.current >= 2 && actions.chant.unlocked === false && actions.chant.purchased === false){
        document.getElementById('chantLock').style.display='block';
        actions.chant.unlocked === true;
    }
    if(stats.vision.current >= (8) && actions.dream.unlocked === false && actions.dream.purchased === false){
        document.getElementById('dreamLock').style.display='block';
    }
    if(stats.charm.current >=4 && actions.preach.unlocked === false && actions.preach.purchased === false){
        document.getElementById('preachLock').style.display='block';
    }
    if(stats.madness.current >= 32 &&  stats.madness.madActionBoxUnlocked === false){
        stats.madness.madActionBoxUnlocked = true;
        comment("Excess won't solve your problems forever. (Madness Mitigation available)", 'lavender');
        document.getElementById('madActionBox').style.display='block';
        document.getElementById('drinkWrap').style.display='block';
        document.getElementById('smokeWrap').style.display='block';
    }
    for(i=0;i<madKeys.length; i++){ ///mad actions
        if(madActions[madKeys[i]].unlocked === false ){
            let unlockStat = madActions[madKeys[i]].unlock[0];
            let unlockNum = madActions[madKeys[i]].unlock[1];
            if(madActions[madKeys[i]].costStat === 'health'  && stats.health.current  <= 20 ){
                document.getElementById(madKeys[i] + 'Wrap').style.display='block';
                madActions[madKeys[i]].unlocked = true;
            }else if(unlockStat === 'love' && vault.love.current  >= unlockNum||unlockStat === 'terror' && vault[unlockStat].current  >= unlockNum){
                document.getElementById(madKeys[i] + 'Wrap').style.display='block';
                madActions[madKeys[i]].unlocked = true;
            }
        }
    }
}
window.onload = function() {
  const images = document.getElementsByTagName("img");
  for (let img of images) {
    if (img.src.endsWith(".jpg")) {
    }
  }
};
