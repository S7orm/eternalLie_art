function test(){
      nyarReset();
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
  //localStorage.clear();
//document.addEventListener("contextmenu", (event) => event.preventDefault());// disable rightclick from tablets add back in for release
    // scroll listeners
    function setupScrollActions(element) {
      let lastY = 0, velocity = 0, isDown = false;
      element.addEventListener("wheel", (e) => {
        e.preventDefault();
        element.scrollTop += e.deltaY;
      }, { passive: false });
      element.addEventListener("pointerdown", e => {
        isDown = true;
        lastY = e.clientY;
        velocity = 0;
      });
      element.addEventListener("pointermove", e => {
        if (!isDown) return;
        velocity = lastY - e.clientY;
        element.scrollTop += velocity;
        lastY = e.clientY;
        e.preventDefault();
      }, { passive: false });
      element.addEventListener("pointerup", () => {
        isDown = false;
        requestAnimationFrame(function momentum() {
          if (Math.abs(velocity) > 0.1) {
            element.scrollTop += velocity;
            velocity *= 0.95;
            requestAnimationFrame(momentum);
          }
        });
      });
    }
    const scrollDivs = ["commentary", "preachColumn", "vault", "world", "dreamEx", "sacLeft", "gods", "godsAppeased", "relics", "divinityLeft", "divinityRight"];
    scrollDivs.forEach((divId) => {
      const scrollDivElement = document.getElementById(divId);
      if (scrollDivElement) {
        setupScrollActions(scrollDivElement);
      }
    });
    //vault scroll
    const craftBoxes = document.getElementsByClassName("craftBox");
    for (var i = 0; i < craftBoxes.length; i++) {
      setupScrollActions(craftBoxes[i]);
    }
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
        if(world[worldKeys[i]].permanent===true){
        document.getElementById(worldKeys[i] + "Wrap").addEventListener('pointerdown', world[worldKeys[i]].func);
        }else{
        document.getElementById(worldKeys[i] + "OneOff").addEventListener('pointerdown', world[worldKeys[i]].func);
        }
    }
     for(i=0;i<dreamExKeys.length;i++){
        document.getElementById(dreamExKeys[i] + "Wrap").addEventListener('pointerdown', dreamEx[dreamExKeys[i]].func);
    }

}
function eventListeners2(){

            //test buttons schTogFunc()
    document.addEventListener("visibilitychange", function () { //should fix off screen weirdness
        if (document.hidden) {
            afkStamp = performance.now();
           timeOff();
        } else {
            afk();
           timeOn();
        }    
    });
    document.getElementById('gear').addEventListener('pointerdown',  () =>toggleMenu());
    document.getElementById('reset').addEventListener('pointerdown',  () =>resetGame());
    //document.getElementById('test').addEventListener('pointerdown',   () => test());  //top buttons
    document.getElementById('mute').addEventListener('pointerdown',  () =>  muteToggle());
    document.getElementById('save').addEventListener('pointerdown',  () =>  saveToLocalStorage());
    document.getElementById('load').addEventListener('pointerdown',  () => loadpointerdown());
    document.getElementById('chantLock').addEventListener('pointerdown',  () => unlock('chant', 'actions'));
    document.getElementById('dreamLock').addEventListener('pointerdown',  () => unlock('dream', 'actions'));
    document.getElementById('preachLock').addEventListener('pointerdown',  () => unlock('preach', 'actions'));
    document.getElementById('studyWrap').addEventListener('pointerdown',  study);
    document.getElementById('chantWrap').addEventListener('pointerover', chantTimer);
    document.getElementById('dreamWrap').addEventListener("pointerdown", startDreamTimer);
    document.getElementById('preachWrap').addEventListener('pointerdown', preach);
    //mad actions
    for(i=0;i<madKeys.length;i++){
        let temp = madKeys[i];
        document.getElementById(temp + 'Wrap').addEventListener('pointerdown', () => startMadActLoop(temp));
        document.getElementById(temp + 'Wrap').addEventListener('pointerdown', () => executeMadAction(temp) );
    };
    for(i=0;i<madUpsKeys.length;i++){
        let temp = madUpsKeys[i];
        document.getElementById(temp + 'OneOff').addEventListener('pointerdown', madUps[madUpsKeys[i]].func);
    };
    //vault button presses
    document.getElementById('altarRoomTab').addEventListener('pointerdown',  () => changeTab('altarRoom'));
    for(i=0;i<vaultKeys.length; i++){
        let temp = vaultKeys[i];
        document.getElementById(temp + "Wrap").addEventListener('pointerdown', () => changeCraftBox(temp + "Crafts"));
    }
    let craftTypeKeys = [loveCrafts, terrorCrafts, goldCrafts, fleshCrafts, tomeCrafts, ichorCrafts, tyogCrafts];
    for (let i = 0; i < craftKeys.length; i++) {
        for (let j = 0; j < craftKeys[i].length; j++) {
            let key = craftKeys[i][j];
            let craft = craftTypeKeys[i][key];
                if(craft.unlockText){
                    document.getElementById(key+ "Lock").addEventListener('pointerdown', () => unlock(key, craftStringKeys[i]));   
                }
            if(craft.permanent === true){
                            // Determine if this should use vaultConversion
                if (craft.func === 'vaultConversion') {
                    document.getElementById(key + "Wrap").addEventListener('pointerdown', () => vaultConversionLoop(craft));
                    document.getElementById(key + "Wrap").addEventListener('pointerdown', () => executeVaultConversion(craft));
                } else if(key === "pagesDiv"){
                }else{
                    document.getElementById(key + "Wrap").addEventListener('pointerdown', craft.func);
                }
            }
            if(craft.permanent === false){
                if(craft.func === cultistUpgrade){
                    document.getElementById(key + "OneOff").addEventListener('pointerdown', function() {
                        cultistUpgrade(craft.callString);
                    });
                }else{
                document.getElementById(key + "OneOff").addEventListener('pointerdown', craft.func);  
                }
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
    // Iterate over all categories in shardBuys
    Object.keys(shardBuys).forEach(category => {
        const categoryItems = shardBuys[category];
        Object.keys(categoryItems).forEach(actionKey => {
            const item = categoryItems[actionKey];
            const elementSuffix = item.permanent === true ? 'ShardBuyWrap' : 'ShardBuyOneOff';
            const elementId = actionKey + elementSuffix;
            const element = document.getElementById(elementId);
            if (element) {
                let eventHandler;
                switch (category) {
                    case 'actions':
                        eventHandler = function() {
                            shardActionMultiplier(actionKey, false);
                        };
                        break;
                    case 'madReducers':
                        eventHandler = function() {
                            madReducer(actionKey, false);
                        };
                        break;
                    case 'cultists':
                        if (item.func) {
                            if (actionKey.startsWith('shardFaithfulMultiplier')) {
                                const index = actionKey.replace('shardFaithfulMultiplier', '');
                                eventHandler = function() {
                                    shardFaithfulMultiplier(parseInt(index), false);
                                };
                            } else {
                                eventHandler = function() { item.func(false);};
                            }
                        }
                        break;
                    default:
                       eventHandler = function() { item.func(false);};
                        break;
                }
                element.addEventListener('pointerdown', eventHandler);
            }
        });
    });
}

    //code for description hovers
function addCommentsToButtons(setArray) {
    setArray.forEach(singleSet => {
        const setKeys = Object.keys(singleSet);  
        setKeys.forEach(function (setKey) {
            const box = document.getElementById(setKey +'Box'); // Find button by ID using the key
            const wraps = document.getElementById(setKey +'Wrap'); // Find button by ID using the key
            const OneOff = document.getElementById(setKey +'OneOff');
            const locks = document.getElementById(setKey +'Lock');
            const choices = document.getElementById(setKey + 'Choice');
            const shardBuyP = document.getElementById(setKey + 'ShardBuyWrap');
            const shardBuyT = document.getElementById(setKey + 'ShardBuyOneOff');
            const container = shardBuyP || shardBuyT || box || wraps || OneOff || choices;
            if (container) {
                const descriptionBox = document.createElement('div'); //main description
                descriptionBox.classList.add('descriptionBox');
                if(singleSet === stats){
                    descriptionBox.classList.add('statDescriptions');
                };
                const targetSets = [actions, actionUpgrades.study, actionUpgrades.chant, actionUpgrades.dream, actionUpgrades.preach, dreamChoices];
                if (targetSets.includes(singleSet)) {
                    descriptionBox.classList.add('actionDescriptions');
                }
                if(singleSet === cult){
                    descriptionBox.classList.add('cultDescription');
                };
                if ([loveCrafts, terrorCrafts, goldCrafts, fleshCrafts, tomeCrafts, ichorCrafts, tyogCrafts].includes(singleSet)) {
                    descriptionBox.classList.add('craftDescription');
                };
                if(singleSet === madActions){
                    descriptionBox.classList.add('madDescription');
                };
                if(singleSet === world){
                    descriptionBox.classList.add('worldDescription');
                };
                if(singleSet === gods){
                    descriptionBox.classList.add('godsDescription');
                };
                if(singleSet === relics){
                    descriptionBox.classList.add('relicsDescription');
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
    const descParents = document.querySelectorAll(".westStatBox, .actionWraps, .dreamChoice, .actionUpgradeWraps, .madActionWraps, .madUps, .cultWraps, .craftWraps, .craftLocks, .craftOneOffs, .worldWraps, .dreamExWraps, .godsWraps, .godsAppeasedWraps, .relicWraps, .altarOptionWraps, .shardBuyWraps, .shardBuyOneOffs, .achievementsWraps");
    descParents.forEach(function (parent) {
        const descriptionBox = parent.querySelector(".descriptionBox");
        let showTimeout, hideTimeout;
        let isHovering = false;
        parent.addEventListener("pointerenter", function () {
            isHovering = true;
            clearTimeout(hideTimeout); // Prevent hiding if it was scheduled
            showTimeout = setTimeout(function () {
                descriptionBox.classList.add("show");
            }, 400);
        });
        parent.addEventListener("pointerleave", function () {
            isHovering = false;
            clearTimeout(showTimeout); // Prevent showing if not already shown
            hideTimeout = setTimeout(function () {
                if (!isHovering) {
                    descriptionBox.classList.remove("show");
                }
            }, 800);
        });
       //console.log(parent);
        descriptionBox.addEventListener("pointerenter", function () {
            isHovering = true; // Prevent hiding when re-entering the descriptionBox
            clearTimeout(hideTimeout);
        });
         descriptionBox.addEventListener("pointerleave", function (e) {
            // same parent dont hide
            if (e.relatedTarget && parent.contains(e.relatedTarget)) {
                isHovering = true;
                return;
            }
            isHovering = false;
            hideTimeout = setTimeout(function () {
                if (!isHovering) descriptionBox.classList.remove("show");
            }, 800);
        });
    });
}

//single use description adds
function addDesc(targetDiv, descriptionText) {
    targetDiv = document.getElementById(targetDiv);
    const descriptionBox = document.createElement('div');
    descriptionBox.classList.add('descriptionBox');
    targetDiv.appendChild(descriptionBox);
    const description = document.createElement('p');
    description.textContent = descriptionText;
    description.classList.add('desc');
    descriptionBox.appendChild(description);
    let showTimeout, hideTimeout;
    let isHovering = false;
    targetDiv.addEventListener("pointerenter", function () {
        isHovering = true;
        clearTimeout(hideTimeout);
        showTimeout = setTimeout(function () {
            descriptionBox.classList.add("show");
        }, 500);
    });
    targetDiv.addEventListener("pointerleave", function () {
        isHovering = false;
        clearTimeout(showTimeout);
        hideTimeout = setTimeout(function () {
            if (!isHovering) {
                descriptionBox.classList.remove("show");
            }
        }, 500);
    });
    descriptionBox.addEventListener("pointerenter", function () {
        isHovering = true;
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
}

document.addEventListener("DOMContentLoaded", function () {  //start of page after init and before load
    //localStorage.clear();
    totalTime.timeInit = Date.now();
    shadows();
    addCommentsToButtons([stats, actions, actionUpgrades.study, actionUpgrades.chant, actionUpgrades.dream, actionUpgrades.preach, dreamChoices, madActions, madUps, cult, vault, dreamEx, world, gods, godsAppeased, relics, loveCrafts, terrorCrafts, goldCrafts, fleshCrafts, tomeCrafts, ichorCrafts, tyogCrafts, altars, shardBuys.stats, shardBuys.actions, shardBuys.madActions, shardBuys.madReducers, shardBuys.cultists, shardBuys.altarRoom, achievements.west, achievements.cult, achievements.vault, achievements.relics, achievements.gods]);
    if(localStorage.getItem("savedPermanentChanges")){
        let savedPermanentChanges = localStorage.getItem("savedPermanentChanges");
        permanentChanges = JSON.parse(savedPermanentChanges); 
    }
    commentListeners();
    addDesc("pagesDiv", 'Pages can be found during several expeditions, which can be repeated at ever increasing costs.');
    eventListeners1();
    eventListeners2();
    window.console.log("loading...");
    if (!domUnlocks.versionNumber || permanentChanges.resetting===false) {
        window.console.log("V " +domUnlocks.versionNumber );
        loadFromLocalStorage();
        window.console.log('loaded');
        offlineProgress();
        totalTime.timeSession=0; //reset session time after offline
    }else if (permanentChanges.lastReset === "restart") {
        window.console.log('restartRun');
        basePostReset();
        closeEventBox();
    }else if (permanentChanges.lastReset==="nyar"){
        window.console.log('nyarload');
        nyarPostReset();
    }else if(permanentChanges.lastReset==="mist"){
        mistPostReset();
    }else if(permanentChanges.lastReset==="devourer"){
        console.log("devoured?");
        darkDevourerPostReset();
    }
    permanentChanges.resetting=false;
    window.addEventListener("beforeunload", saveToLocalStorage);  
});


