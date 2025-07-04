/* 
 * 3 books needed azat damn necro
 * 2 locations mountain and antart
 * 2 dreams moon kadath
 * choir
 * 
 */
let permanentChanges = {
    totalShards: 1000,
    immortality: false,
    mist: false
};
function immortality(statsTemp){
    stats = statsTemp; //load stats
    for(i=0;i<statKeys.length; i++){
        document.getElementById(statKeys[i]).innerHTML = Math.floor(stats[statKeys[i]].current);    
        stats[statKeys[i]].unlocked = true; 
        document.getElementById(statKeys[i] + 'Box').style.display='block';
    }
    domUnlocks.sacrarium = true;
    relics.immortality.unlocked = true;
    document.getElementById('sacrariumTab').style.display='block';
    document.getElementById('immortalityWrap').style.display='block';
}
function shardsBoughtLoad(){// loading from saves,  updating after resets
        var nyarTest = localStorage.getItem('savedNyarStats'); 
        var mistTest = localStorage.getItem('savedMistStats'); 
    var resetRunStats = localStorage.getItem("resetRunStats");  //save test
        if(nyarTest !== null || mistTest !== null || resetRunStats !== null){
           if(permanentChanges.mist === true){
                stats.madness.madCap = 88 * 4; //resetting madCap and x4  in case immortality before updating
                actions.study.level += 4;
                actions.dream.level += 4; 
            }
        }
    let savedShardBuys = localStorage.getItem("savedShardBuys"); 
    if (savedShardBuys) {
        shardBuys = JSON.parse(savedShardBuys);
        // Double loop to update divs
        for (let category in shardBuys) { // First loop for categories doublers madreducers
            for (let key in shardBuys[category]) { // Second loop for items in category
                let item = shardBuys[category][key];
                document.getElementById(key + 'Level').innerText = shardBuys[category][key].level;
                document.getElementById(key + 'Cost').innerText = shardBuys[category][key].cost;
                // Update actions based on benefitType on reset
                let benefit =  item.benefitType;
                if(nyarTest !== null || mistTest !== null || resetRunStats !== null){// code only used during resets
                    if (category === "shardDoublers") {
                        if(benefit === "preach"){
                            actions[benefit].level = 1;//resetting
                        }else{
                            actions[benefit].level = 1.4;//resetting
                        }
                        actions[benefit].level *= Math.pow(2, item.level-1);// Multiply action level
                    } else if (category === "madReducers" && benefit !== 'madness') {
                        actions[benefit].madnessChance = 0.88 * Math.pow(0.875, item.level-1);
                    }else if(category === "others"){
                        if (benefit === 'shardHealth') {
                            stats.health.max += (item.level * 88);
                        } else if (benefit === 'shardChanterCost') {
                            loveCrafts.convertChanter.costMultiplier -= (item.level * 4);
                        } else if (benefit === 'shardSentinelCost') {
                            terrorCrafts.convertsentinel.costMultiplier -= (item.level * 4);
                        } else if (benefit === 'shardChanterDoubler') {
                            cult.chanters.outMultiplier *= Math.pow(2, item.level);
                        } else if (benefit === 'shardSentinelDoubler') {
                            cult.sentinels.outMultiplier *= Math.pow(2, item.level);
                        }
                    }
                }
            }
        }
    }
}

function nyarReset(){ //reset 1
    cancelShakeAnimation();
    closeEventBox();
    let shards = ((cult.faithful.current + cult.hybrids.current) / 4 )+ (cult.chanters.current / 2) + (cult.sentinels.current/2) + (cult.priests.current) +(cult.innocents.current/8);
    stats.shards.current += Math.floor(shards);
    permanentChanges.totalShards +=Math.floor(shards);
    localStorage.clear();
    localStorage.setItem("savedNyarStats", JSON.stringify(stats)); //stats
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
    if(permanentChanges.immortality === true){ //immortality code block moved to immortality()
         immortality(statsTemp);
        eventBox("images/gods/nyar.jpg", 'Columns three they marched...', 'The Pharoah danced out of Nightmare, eyes shining with Shards of the Divine. The Chosen split into columns and fall into darkness. All save West, who recieved a sly wink and a nod. West laughs alone in the darkness clutching a Tome, eyes blazing ever brighter.');
    }else{
            stats.shards.current = statsTemp.shards.current;
            eventBox("images/gods/nyar.jpg", 'Columns three we marched...', 'The Pharoah danced out of Nightmare, eyes shining with Shards of the Divine. The Chosen, led by West, split into columns and fell into darkness. After countless eons, West awakens alone in a dark alley, hands clutching a Tome. His eyes blaze with Shards of Light');
    }
    stats.shards.unlocked =true;
    domUnlocks.divinity = true;
    document.getElementById('divinityTab').style.display='block';
    document.getElementById('shards').innerHTML = stats.shards.current;
    document.getElementById('shardsBox').style.display='block';
    stats.health.max -= stats.shards.current;
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


function mistReset() { //reset 2 - 
    closeEventBox();
    let shards =   2 * ((cult.faithful.current + cult.hybrids.current)  / 4 )+ (cult.chanters.current / 2) + (cult.sentinels.current/2) + (cult.priests.current) +(cult.innocents.current/8);
    stats.shards.current += Math.floor(shards);
    permanentChanges.totalShards +=Math.floor(shards);
    localStorage.clear();
    localStorage.setItem("savedMistStats", JSON.stringify(stats)); //stats
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
    if(relics.immortality.unlocked === true){ 
        immortality(statsTemp);
        eventBox("images/mist.jpg", 'The Nameless Mist...',
            'West is caught in the Mist and spends an Eon lost and blind, only a distant feminine laughter luring him endlessly in circles. When West finds his way back, the world seems to sparkle with clarity. (Permanent Changes on first encounter with the Nameless Mist: Study and Dream actions 4x more effective. Madness Capacity x4.');
        }else{
            stats.shards.current = statsTemp.shards.current;
            eventBox("images/mist.jpg", 'The Nameless Mist...',
            'West is caught in the Mist and spends a lifetime lost and blind, only a distant feminine laughter luring him on. West awakens alone in a dark alley, hands clutching a Tome, the world sparkling with clarity. (Permanent Changes on first encounter with the Nameless Mist: Study and Dream actions 4x more effective. Madness Capacity x4. ');
        }
    stats.shards.unlocked = true;
    stats.shards.current = statsTemp.shards.current;
    document.getElementById('shards').innerHTML = stats.shards.current;
    document.getElementById('shardsBox').style.display = 'block';
    stats.health.max -= stats.shards.current;
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

/* 
shards 
upgrade list:
44 shards guarantees innocent when preaching
  444 shards combine to make a seal of r'yleth reduces god costs
shards can be put into health and madness tolerance directly
improves world expedition results
improves dream ex results
followers no longer flee
innocents go insane at double the rate.
secret tentacle can sacrifice without rhan
upgrade cult actions x8 for 8 etc x2 



terrifying ritual uses charm, and innocents to convert innocents in bulk to faithful 44% , 44% insane 22% dead.
 */
let shardBuys = {
    shardDoublers: {//also madReducers
        studyD: {
            string: 'Deeper Insight',
            description: ['Permanently doubles gains from Studying', 'Shards: '],
            cost: 4,
            benefitType: "study",
            color: "#105954",
            level: 1,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        chantD: {
            string: 'Choir of the Lost.',
            description: ['Permanently doubles gains from Chanting', 'Shards: '],
            cost: 4,
            benefitType: "chant",
            color: "#105954",
            level: 1,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        dreamD: {
            string: "Raven's Wings",
            description: ['Permanently doubles Vision gains from Dreaming', 'Shards: '],
            cost: 4,
            benefitType: "dream",
            color: "#105954",
            level: 1,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        preachD: {
            string: 'Aura Intensity',
            description: ['Permanently doubles Faithful and Innocent gain from Preaching', 'Shards: '],
            cost: 8,
            benefitType: "preach",
            color: "#105954",
            level: 1,
            unlocked: true,
            purchased: true,
            permanent: true
        }
    },
    madReducers: {
        studyM: {
            string: 'Broader Thought',
            description: ['Reduces current Madness chance from Studying by 1/8.', 'Shards: '],
            cost: 4,
            benefitType: "study",
            color: "#240048",
            level: 1,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        chantM: {
            string: 'Perfect Pitch',
            description: ['Reduces current Madness chance from Chanting by 1/8.', 'Shards: '],
            cost: 4,
            benefitType: "chant",
            color: "#240048",
            level: 1,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        dreamM: {
            string: "Lucidity",
            description: ['Reduces current Madness chance from Dreaming by 1/8', 'Shards: '],
            cost: 4,
            benefitType: "dream",
            color: "#240048",
            level: 1,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        pMadReducer: {
            string: "Clarity",
            description: ['Reduces permanent Madness by 4', 'Shards: '],
            cost: 44,
            benefitType: "madness",
            color: "#240048",
            level: 1,
            unlocked: true,
            purchased: true,
            permanent: true
        }
    },
    others: {
        shardHealth: {
            string: "Crystal Infusion",
            description: ['+88 Health maximum', 'Shards: '],
            cost: 8,
            benefitType: "health",
            color: "#004000",
            level: 1,
            func: shardHealth,
            para:"",
            unlocked: true,
            purchased: true,
            permanent: true
        },
        shardChanterCost: {
            string: "Captivating Gaze",
            description: ['Reduce Chanter cost by 8%', 'Shards: '],
            cost: 16,
            benefitType: "health",
            color: "#6e0a1e",
            level: 1,
            func: shardChanterCost,
            para: "chanters",
            unlocked: true,
            purchased: true,
            permanent: true
        },
        shardChanterDoubler: {
            string: "Choral Resonance",
            description: ['Double Chanter effectiveness', 'Shards: '],
            cost: 16,
            benefitType: "health",
            color: "#6e0a1e",
            level: 1,
            func: shardChanterDoubler,
            para: "chanters",
            unlocked: true,
            purchased: true,
            permanent: true
        },
        shardSentinelCost: {
            string: "Will Siphon",
            description: ['Reduce Sentinel cost by 8%', 'Shards: '],
            cost: 16,
            benefitType: "health",
            color: "#6e0a1e",
            level: 1,
            func: shardSentinelCost,
            para: "sentinels",
            unlocked: true,
            purchased: true,
            permanent: true
        },
        shardSentinelDoubler: {
            string: "Dread Infusion",
            description: ['Double Sentinel effectiveness', 'Shards: '],
            cost: 16,
            benefitType: "health",
            color: "#6e0a1e",
            level: 1,
            func: shardSentinelDoubler,
            para: "sentinels",
            unlocked: true,
            purchased: true,
            permanent: true
        }
    }
};
function shardActionDouble(action) {
    // Check if there are enough shards (4 shards cost)
    if (stats.shards.current >= shardBuys.shardDoublers[action].cost) {
        // Deduct 4 shards using numberChange
        numberChange('stats', 'shards', -shardBuys.shardDoublers[action].cost, "blue", "red");
        // Perform the doubling of the action level
        let actionD = action.slice(0, -1);           
        actions[actionD].level *= 2;//actual doubler
        shardBuys.shardDoublers[action].level++;
        shardBuys.shardDoublers[action].cost *= 4;
        if(action === "preachD"){
            shardBuys.shardDoublers[action].cost *= 2;
        }
        document.getElementById(action + 'Level').innerText = shardBuys.shardDoublers[action].level;
        document.getElementById(action + 'Cost').innerText = shardBuys.shardDoublers[action].cost;
        comment(`West can now ${actionD} more effectively.`, "green");
    }
};

function madReducer(action){
    if (stats.shards.current >= shardBuys.madReducers[action].cost) {
        numberChange('stats', 'shards', -shardBuys.madReducers[action].cost, "blue", "red");
        shardBuys.madReducers[action].level++;
        shardBuys.madReducers[action].cost *=4;
        document.getElementById(action + 'Level').innerText = shardBuys.madReducers[action].level;
        document.getElementById(action + 'Cost').innerText =  shardBuys.madReducers[action].cost;
         if(action === 'pMadReducer'){
            let temp = Math.min(permanentMadness.level, 4);
            permanentMadness.level -= temp;
            comment("Permanent Madness reduced by " + temp, "blue");
        }else{
            let actionD = action.slice(0, -1);           
            actions[actionD].madnessChance = actions[actionD].madnessChance * (1/8);
            comment(actionD + ` Madness chance reduced by (1/8).`, "blue");
        }
    }
};
function shardHealth(){
        if (stats.shards.current >= shardBuys.others.shardHealth.cost) {
        numberChange('stats', 'shards', -shardBuys.others.shardHealth.cost, "blue", "red");
        stats.health.max+=88;
        comment("+88 maximum Health");
        shardBuys.others.shardHealth.level++;
        shardBuys.others.shardHealth.cost +=8;
        document.getElementById('shardHealthLevel').innerText = shardBuys.others.shardHealth.level;
        document.getElementById('shardHealthCost').innerText =  shardBuys.others.shardHealth.cost;
    }
}

function shardChanterCost() {
    if (stats.shards.current >= shardBuys.others.shardChanterCost.cost) {
        numberChange("stats", "shards", -shardBuys.others.shardChanterCost.cost, "blue", "red");
        shardBuys.others.shardChanterCost.level++;
        shardBuys.others.shardChanterCost.cost *=4;
        document.getElementById('shardChanterCostLevel').innerText = shardBuys.others.shardChanterCost.level;
        document.getElementById('shardChanterCostCost').innerText = shardBuys.others.shardChanterCost.cost;
        loveCrafts.convertChanter.shardMultiplier -= 0.08;
        comment("Chanter cost reduced by 8%");
        if(  loveCrafts.convertChanter.shardMultiplier <= 0.36){//8 levels at 8%
            document.getElementById('shardChanterCostShardBuyWrap').style.backgroundColor = "grey";
            shardBuys.others.shardChanterCost.cost = "Max Level";
            document.getElementById('shardChanterCostCost').innerText = shardBuys.others.shardChanterCost.cost;
        }
    }
}
function shardSentinelCost() {
    if (stats.shards.current >= shardBuys.others.shardSentinelCost.cost) {
        terrorCrafts.convertsentinel.multiplier -= 4;
        numberChange("stats", "shards", -shardBuys.others.shardSentinelCost.cost, "blue", "red");
        shardBuys.others.shardSentinelCost.level++;
        shardBuys.others.shardSentinelCost.cost *= 4;
        document.getElementById('shardSentinelCostLevel').innerText = shardBuys.others.shardSentinelCost.level;
        document.getElementById('shardSentinelCostCost').innerText = shardBuys.others.shardSentinelCost.cost;
        terrorCrafts.convertSentinel.shardMultiplier -= 0.08;
        comment("Sentinel cost reduced by 8%");
        if( terrorCrafts.convertSentinel.shardMultiplier <= 0.2){
            document.getElementById('shardSentinelCostShardBuyWrap').style.backgroundColor = "grey";
            shardBuys.others.shardSentinelCost.cost = "Max Level";
            document.getElementById('shardSentinelCostCost').innerText = shardBuys.others.shardSentinelCost.cost;
        }
    }
}

function shardChanterDoubler() {
    if (stats.shards.current >= shardBuys.others.shardChanterDoubler.cost) {
        numberChange("stats", "shards", -shardBuys.others.shardChanterDoubler.cost, "blue", "red");
        cult.chanters.outMultiplier*=2;
        comment("All Chanter output doubled.");
        shardBuys.others.shardChanterDoubler.level++;
        shardBuys.others.shardChanterDoubler.cost *= 4;
        document.getElementById('shardChanterDoublerLevel').innerText = shardBuys.others.shardChanterDoubler.level;
        document.getElementById('shardChanterDoublerCost').innerText = shardBuys.others.shardChanterDoubler.cost;
    }
}

function shardSentinelDoubler() {
    if (stats.shards.current >= shardBuys.others.shardSentinelDoubler.cost) {
        numberChange("stats", "shards", -shardBuys.others.shardSentinelDoubler.cost, "blue", "red");
        cult.sentinels.outMultiplier*=2;
        comment("All Sentinel output doubled.");
        shardBuys.others.shardSentinelDoubler.level++;
        shardBuys.others.shardSentinelDoubler.cost *= 4;
        document.getElementById('shardSentinelDoublerLevel').innerText = shardBuys.others.shardSentinelDoubler.level;
        document.getElementById('shardSentinelDoublerCost').innerText = shardBuys.others.shardSentinelDoubler.cost;
    }
}

function buildDivinity() {
    const divinity = document.getElementById('divinity');
    // Title
    divinity.innerHTML = "<div id='divinityTitle'>Divinity</div>";
    const shardBuyBox = document.createElement('div');
    shardBuyBox.className = 'shardUpgradesBox';
    // basic action upgrades
    for (const setKey in shardBuys.shardDoublers) {
        if (shardBuys.shardDoublers.hasOwnProperty(setKey)) {
            const button = document.createElement('button');
            button.className = 'shardBuyWraps';
            button.id = setKey + 'ShardBuyWrap';
            button.style.backgroundColor = shardBuys.shardDoublers[setKey].color;
            const textDiv = document.createElement('div'); // Create a div for the string
            textDiv.className = 'shardBuyText'; // Optional class for styling
            textDiv.textContent = shardBuys.shardDoublers[setKey].string; // Set the main string
            const levelTextDiv = document.createElement('div'); // Create a div for "Level:"
            levelTextDiv.className = 'shardLvlTxt'; // Apply the specified class
            levelTextDiv.textContent = "Level: "; // Set the text content
            const levelDiv = document.createElement('div'); // Create a div for the level number
            levelDiv.className = 'shardBuyLevel'; // Optional class for styling
            levelDiv.id = setKey + 'Level'; // Assign the requested ID
            levelDiv.textContent = shardBuys.shardDoublers[setKey].level; // Set the level text
            // Append the divs to the button
            button.appendChild(textDiv);
            button.appendChild(levelTextDiv);
            button.appendChild(levelDiv);
            // Add the button to shardBuyBox
            shardBuyBox.appendChild(button);
        }
    }
    
   
    //basic madness reducers
    for (const setKey in shardBuys.madReducers) {
        if (shardBuys.madReducers.hasOwnProperty(setKey)) {
            const button = document.createElement('button');
            button.className = 'shardBuyWraps';
            button.id = setKey + 'ShardBuyWrap';
            button.style.backgroundColor = shardBuys.madReducers[setKey].color;
            const textDiv = document.createElement('div'); // Create a div for the string
            textDiv.className = 'shardBuyText'; // Optional class for styling
            textDiv.textContent = shardBuys.madReducers[setKey].string; // Set the main string
            const levelTextDiv = document.createElement('div'); // Create a div for "Level:"
            levelTextDiv.className = 'shardLvlTxt'; // Apply the specified class
            levelTextDiv.textContent = "Level: "; // Set the text content
            const levelDiv = document.createElement('div'); // Create a div for the level number
            levelDiv.className = 'shardBuyLevel'; // Optional class for styling
            levelDiv.id = setKey + 'Level'; // Assign the requested ID
            levelDiv.textContent = shardBuys.madReducers[setKey].level; // Set the level text
            // Append the divs to the button
            button.appendChild(textDiv);
            button.appendChild(levelTextDiv);
            button.appendChild(levelDiv);
            // Add the button to shardBuyBox
            shardBuyBox.appendChild(button);
        }
    }
    //all the others
        for (const setKey in shardBuys.others) {
        if (shardBuys.others.hasOwnProperty(setKey)) {
            const button = document.createElement('button');
            button.className = 'shardBuyWraps';
            button.id = setKey + 'ShardBuyWrap';
            button.style.backgroundColor = shardBuys.others[setKey].color;
            const textDiv = document.createElement('div'); // Create a div for the string
            textDiv.className = 'shardBuyText'; // Optional class for styling
            textDiv.textContent = shardBuys.others[setKey].string; // Set the main string
            const levelTextDiv = document.createElement('div'); // Create a div for "Level:"
            levelTextDiv.className = 'shardLvlTxt'; // Apply the specified class
            levelTextDiv.textContent = "Level: "; // Set the text content
            const levelDiv = document.createElement('div'); // Create a div for the level number
            levelDiv.className = 'othersLevel'; // Optional class for styling
            levelDiv.id = setKey + 'Level'; // Assign the requested ID
            levelDiv.textContent = shardBuys.others[setKey].level; // Set the level text
            // Append the divs to the button
            button.appendChild(textDiv);
            button.appendChild(levelTextDiv);
            button.appendChild(levelDiv);
            // Add the button to shardBuyBox
            shardBuyBox.appendChild(button);
        }
    }
    divinity.appendChild(shardBuyBox);
};

buildDivinity();
