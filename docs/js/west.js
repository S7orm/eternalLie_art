
    	//=========================================
	//                                      stats
	//=========================================
        
let stats = {    
    vision: {//opens upgrades//
        callString: 'vision',
        string: 'Vision',
        description: 'The key to unlocking the mysteries of the universe.',
        current: 10000000,
        unlocked: true
    },
    charm: {//cultist max//
        callString: 'charm',
        string: 'Charm',
        description: 'With enough Charisma, West can convince people of anything.',
        current: 1000000,
        unlocked: false,
          active: false,
        unlock: ['vision', 1]
    },
    health: {
        callString: 'health',
        string: 'Health',
        description: 'Essential',
        current: 88,
        max: 88,
        unlocked: true,
        dyingB: false,
        dyingCounter: [0, 2],
        coma: false
    },
    radiance: {//energy//
        callString: 'radiance',
        string: 'Radiance',
        description: 'A reward from the Outer Gods, probably',
        current: 10000,
        unlocked: false,
          active: false,
        unlock: ['radiance', 1]
    },
    shards: {//god energy
        callString: 'shards',
        string: 'Shards',
        description: "Fragments of the Divine, they multiply West's influence.",
        current: 0,
        unlocked: false,
          active: false,
        unlock: ['shards', 1]
    },
    madness: { //main stat//
        callString: 'madness',
        string: 'Madness',
        description: 'Madness rides the star-wind...',
        current: 0,
        madCap: 88,
        unlocked: true,
        madActionBoxUnlocked: false
    }
    //something for resets bigger than radiance
};
let firstBook = 'Necronomicon';

    	//=========================================
	//                      West Actions
	//=========================================

 
let actions = {
    study: {
        string: 'Study Tome',
        description: ['Research into Abyssal Horrors.', 'Cost: Sanity', 'Benefit: Vision'],
        level: 1.4,
        madnessChance: 0.88,
        unlocked: true,
        purchased: true
    }, 
    chant: {
        string: 'Chant',
        description: ['Reciting arcane passages imbues West with unearthly Charm', 'Cost: Sanity', 'Benefit: Charm'],
        level: 1.4,
        madnessChance: 0.88,
        toggleBool: false,//for dom
        toggle: false,
        ticCounter: 0,
        ticsNeeded: 2,
        unlocked: false,
          active: false,
        purchased: false,
        lockText: "Chant the Words.  Cost: 4 Vision",
        unlockCost: 4,
        comment: 'What a beautiful voice you have.'
    },    
    dream: {
        string: 'Dream',
        description: ['Restful sleep improves Health but dreaming can be dangerous.', 'Cost: Sanity', 'Benefits: Health and Vision'],
        level: 1.4,
        madnessChance: 0.88,
        type: 'mindAlone',
        madCost: 5,
        toggle: false,
        toggleBool: false,//for dom
        unlocked: false,
          active: false,
        purchased: false,
        lockText: "Sleep is not enough.  Cost: 16 Vision",
        unlockCost: 16,
        comment: 'Break the Silver Tether and be lost to the Realms of Dream forever.'
    },
    preach: {
        string: 'Preach   ',
        description: ['Using his Charms, West can bring in the Faithful.', ' Cost: Charm ', 'Benefit: Followers'],
        level: 1,
        cost: 8,
        benefit: 1,
        timer: 2000,
        multiplier: 16,
        audio: 0,
        unlocked: false,
          active: false,
        purchased: false,
        lockText: "Preach to the Faithful Cost: 8 Vision",
        unlockCost: 8,
        comment: 'So many lost and fearful. Bring them into the fold.'
    }
};
    	//=========================================
	//                      West Action Functions
	//=========================================
function study(){
  plays(studying);
  var element = document.getElementById("studyProgress");   
  var width = 1;
  var identity = setInterval(study, 5);
     let temp =  document.getElementById('studyWrap');
     temp.classList.add("studyPulse");
     let tempTimer = 444;
     setTimeout(()=>{temp.classList.remove("studyPulse");}, tempTimer);
  function study() {
    if (width >= 100) {
        let madChance = Math.random();   
        if(madChance <= actions.study.madnessChance){
             numberChange('stats', 'madness', Math.floor(actions.study.level) , '#FE2EF7', 'blue');  
            }
         numberChange('stats', 'vision', actions.study.level , '#40E0D0', 'red'); 
         numberChange('stats', 'health',  -1 , 'blue', 'red');  
        clearInterval(identity); 
        width = 0; 
        element.style.width = width + '%'; 
        } else {
      width++; 
      element.style.width = width + '%'; 
      }
  }
}

function chant(){
    if(stats.madness.current<=stats.madness.madCap){
        let madChance = Math.random();      
         if(madChance <= actions.chant.madnessChance){
             numberChange('stats', 'madness', actions.chant.level  , '#FE2EF7', 'blue');  
        }
        numberChange('stats', 'health',  - 1 , 'blue', 'red');
        numberChange('stats', 'charm',  actions.chant.level , '#FFFF00', 'red');  
    }else if(actions.chant.toggle === true){ //ends toggle if madCap reached
        chantToggle();
    }
};
let userInteracted = false;
document.addEventListener("pointerdown", () => {//chant checks interaction
    userInteracted = true;
}, { once: true });
function chantTimer(){
    var intervalId = null;
     let temp =  document.getElementById('chantWrap');
     document.getElementById('chantWrap').onpointerenter = function() {//calls chant every 400 mics
        intervalId = setInterval(chant, 400);
        if(userInteracted === true){
        plays(chanting);
    }
     temp.classList.add("chantPulse");
    };
    document.getElementById('chantWrap').onpointerleave = function() {
        // Clear any timers set to timeout
        clearInterval(intervalId);
        if(actions.chant.toggle===false){
            pauses(chanting);
            temp.classList.remove("chantPulse");
        }else{
            chanting.volume=0.3;
        }
    };
};

    	//=========================================
	//                  DreamChoices
	//=========================================
let dreamChoices = {
       mindAlone: {
           string: 'Mind Alone',
           description: ['Just West and the endless expanses. ' , 'Benefit: Vision and Health'] ,
           img: "images/west/dream.jpg",
           unlocked: true
       },
       lighthouse: {
           string: 'Lighthouse',
           description: ['Lighting the beacon allows to West to travel further.', 'Cost: 1 Radiance', 'Benefit: Health and increased Vision'],
           img: "images/eventImages/lighthouse.jpg",
           unlocked: false
       },
       whiteShip: {
           string: 'White Ship',
           description: ['Buy passage on the White Ship. ', 'Spend 1 Radiance for every hour of Dream Travel.', 'Benefit: Health and greatly increased Vision'],
           img: "images/eventImages/whiteShip.jpg",
           unlocked: false
       },
       blackShip: {
           string: 'Black Ship',
           description: ['Oh the vistas they offer', 'Each hour requires more Radiance than the one before.', 'Benefit: Massive Visions but reduces Health '],
           img: "images/dreamEx/dylath.jpg",
           unlocked: false
       } 
    };
let dreamKeys = Object.keys(dreamChoices);
// Toggle the dropdown menu hide added to show
function toggleDreamChoices() {
    let t = document.getElementById("dreamChoices").style.display;
    if(t === 'none' || t === ''){
        document.getElementById("dreamChoices").style.display = 'block';
    }else{
        document.getElementById("dreamChoices").style.display = 'none';
    }
}
// Select an option and update the main div text
function dreamChoice(option) {
    document.getElementById("dreamChosen").innerHTML = dreamChoices[option].string;
    document.getElementById('dreamImg').src = dreamChoices[option].img;
    actions.dream.type = option;
    document.getElementById('dreamDesc').innerHTML= dreamChoices[option].description[0];
    document.getElementById('dreamcost').innerHTML= dreamChoices[option].description[1];
    document.getElementById('dreamBenefit').innerHTML= dreamChoices[option].description[2];
    toggleDreamChoices();
}
    let startTime;
    let endTime;
    let timerInterval;
    let sequenceEnded = false;
    let typeMultiplier = 1;
// Function to start the timer
function startDreamTimer(type) {
    sequenceEnded = false; 
    document.getElementById("dreamTimer").style.display = "block";
    document.getElementById('dreamWrap').classList.add("dreamPulse");
    if (type === 'coma') {
        document.removeEventListener("pointerup", endDreamTimer);
        plays(dreaming);
    } else if(type === 'toggled'){
            playWithLowVolume(dreaming);
    }else{
        plays(dreaming);
        document.addEventListener("pointerup", endDreamTimer);
        document.addEventListener('pointerleave', endDreamTimer);
    }
    startTime = Date.now();
    // Clear any existing timer interval
    clearInterval(timerInterval);
    // Update the timer display every 1seconds
    timerInterval = setInterval(() => updateTimer(), 1000);
}
function calculateCost(elapsedTime) {
    let dreamType = actions.dream.type;
    switch (dreamType) {
        case 'mindAlone':
            return 0; // no radCost
        case  'lighthouse':
            if(elapsedTime ===1){
                return 1;
            }else{
                return 0;
            }
        case  'whiteShip':
            return 1 ; // 1 per second linear increase
        case  'blackShip':
            return elapsedTime; // 1 per second per second quadratic increase
        default:
            return 0; // Default to 0 radCost
    }
}
function updateTimer() {
    const timerDisplay = document.getElementById("dreamTimer");
    const currentTime = Date.now();
    const elapsedTime = (currentTime - startTime) / 1000; // Convert to seconds
    // Get the cost formula based on dreamType
    const radCost = calculateCost(elapsedTime);
    
    // Check if the cost per second exceeds available radiance
    if (radCost > stats.radiance.current) {
        comment('We can go no further.');
        endDreamTimer(); // Stop the timer and call endDreamTimer
        timerDisplay.style.fontSize = "17dvw";
    } else {
        timerDisplay.innerText = elapsedTime.toFixed(0);

        // Update the stats every second based on the elapsed time
        if (Math.floor(elapsedTime) > 0) { // Only update if at least 1 second has passed
            let madChance = Math.random();
            let mad = 0;
         if(madChance <= actions.dream.madnessChance){
             mad = actions.dream.level;
            }
            let dHealth = 1;
            if(world.ant.unlocked === true){
                dhealth = 0.5;
            }
            const type = actions['dream']['type'];
            if (type === 'mindAlone') {
                numberChange('stats', 'madness',  mad, '#FE2EF7', 'blue');  
                numberChange('stats', 'health', 12 * dHealth, 'blue', 'red');  
                numberChange('stats', 'vision', (2 * actions.dream.level), 'blue', 'red');  
            } else if (type === 'lighthouse') {
                numberChange('stats', 'madness', mad * 4, '#FE2EF7', 'blue'); 
                numberChange('stats', 'health', 8 * dHealth, 'blue', 'red');
                numberChange('stats', 'vision', (8 * actions.dream.level), 'blue', 'red');  
                numberChange('stats', 'radiance', -radCost, 'blue', 'red');
            } else if (type === 'whiteShip') {
                numberChange('stats', 'madness', mad * 8, '#FE2EF7', 'blue'); 
                numberChange('stats', 'health',  8 * dHealth, 'blue', 'red');
                numberChange('stats', 'vision', (elapsedTime * 8 * actions.dream.level), 'blue', 'red');  
                numberChange('stats', 'radiance', -radCost, 'blue', 'red');  
            } else if (type === 'blackShip') {
                numberChange('stats', 'madness', (mad * elapsedTime * 8), '#FE2EF7', 'blue'); 
                numberChange('stats', 'health',   -8 * dHealth, 'blue', 'red');
                numberChange('stats', 'vision', (elapsedTime * elapsedTime * 8 * actions.dream.level), 'blue', 'red');  
                numberChange('stats', 'radiance', -radCost, 'blue', 'red');  
            }
        }
    }
}

// Function to end the timer and reset the display
function endDreamTimer() {   
    if (!sequenceEnded) { // Check if the sequence hasn't ended already
        sequenceEnded = true; // Set the flag to indicate the sequence has ended
        const timerDisplay = document.getElementById("dreamTimer");
        timerDisplay.style.display = "none";
        clearInterval(timerInterval);
        // Reset the timer display
        timerDisplay.style.zIndex = "1";
        timerDisplay.innerText = ""; 
        document.removeEventListener("pointerup", endDreamTimer);
       document.getElementById('dreamWrap').classList.remove("dreamPulse");
        stop(dreaming);
    }
}

//add endless dreaming

function preach() {
    if (stats.charm.current >=  actions.preach.cost) {
        if(cult.faithful.unlocked === false){
            cult.faithful.unlocked = true;
            domUnlocks.cult = true;
            eventBox("images/eventImages/cult.jpg", "The Cult", "One alone cannot accomplish Greatness. West must find and use those foolish enough to follow him into darkness.");
            setTimeout(() => {
                document.getElementById('cultTab').style.display='block';
                document.getElementById('faithfulWrap').style.display='block';
                comment('A beginning', 'red', 'pr');
            }, 1500);
        }else if(actions.preach.level>1){
            comment("We welcome more lost souls into the fold.");
        }else{
                    comment('Another lost soul joins us.');
        }
         let temp =  document.getElementById('preachWrap');
         temp.classList.add("preachPulse");
         let tempTimer = actions.preach.timer;
         setTimeout(()=>{temp.classList.remove("preachPulse");}, tempTimer);
        playPreachAudio();
         numberChange('stats', 'charm',  -actions.preach.cost , '#FE2EF7', 'blue'); 
         numberChange('cult', 'faithful',  actions.preach.level , '#FE2EF7', 'blue');
        actions.preach.cost = Math.max((cult.faithful.current * actions.preach.multiplier), 8);
        document.getElementById('preachCost').innerHTML = actions.preach.cost;
        document.getElementById('preachWrapCost').innerHTML = actions.preach.cost;
        //innocent chance
        if(vault.love.current > vault.terror.current || actionUpgrades.preach.fiction.unlocked === true){
            numberChange('cult', 'innocents',  actions.preach.level , '#FE2EF7', 'blue');
            if(cult.innocents.unlocked === false){
                cult.innocents.unlocked = true;
                document.getElementById('innocentsWrap').style.display='block';
                comment('The Faithful bring family with them if Love dominates. Grist for the mill.', 'lightblue', 'white');
            }else{
            comment('So Innocent...');
            }
        }
    }
};
// Define the audio sequence
const preachAudios = [
    'preaching.mp3',
    'believeGood.mp3',
    'believeRules.mp3',
    'godWho.mp3',
    'godRules.mp3',
    'believeFinal.mp3'
];

// Function to play the audio for the current index
function playPreachAudio() {
    const audioIndex = actions.preach.audio;
    const audioFile = preachAudios[Math.min(audioIndex, preachAudios.length - 1)];
    const audioPath = `audio/${audioFile}`; // Assuming the audio folder is inside root
    
    // Create an audio element to play the file
    const audio = new Audio(audioPath);
    plays(audio);

    // Increment the audio index for the next time, ensuring it doesn't exceed the array length
    if (audioIndex < preachAudios.length - 1) {
        actions.preach.audio++;
    }
}


     	//=========================================
	// West Action Upgrades  Scroll of T'yog
	//=========================================
        
let actionUpgrades = { //add mad chance reduction to reading
  study: {
      pnak: {
          string: 'Pnakotic Manuscripts',
          description: ["Translation of Tomes doubles West's Studying effectivness and Mental Fortitude.", ' Cost: Vision '],
          cost: 48,
          func: pnak,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      },      
      dzyan: {//preach * 2
          string: 'Book of Dzyan',
          description: ['Pure bunk, but it is useful to learn what moves men to madness.', ' Cost: Vision '],
          cost: 84,
          func: dzyan,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      },   
      kult: {
          string: 'Unaussprechlichen Kulten',
          description: ["Old secrets, older magics.", "Cost: Vision "],
          cost: 484,
          func: kult,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      },            
      hsan: {
          string: 'Cryptical Books of Hsan',
          description: ['One can travel the Dreamlands with confidence with these maps.', 'Cost: Vision '],
          cost: 848,
          func: hsan,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      },  
      alch: { 
          string: 'Clavis Alchimiae',
          description: ['The secrets of Alchemy.', ' Cost: Vision '],
          cost: 4848,
          func: alch,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      },  
      dhol: {
          string: 'Dhol Chants',
          description: ['The words echo eternally.', ' Cost: Charm 848, Vision '],
          cost: 8484,
          func: dhol,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      },   
      vermin: {
          string: 'De Vermis Mysteriis',
          description: ['Summons a familiar.', ' Cost: Vision '],
          cost: 24848,
          func: vermin,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      },   
      //stage 2   
      eibon: {
          string: 'Book of Eibon',
          description: ['Leaving humanity behind may be the only choice. Madness Minimum: 8888', '  Cost: Vision '],
          cost: 48484,
          func: eibon,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false,
          unlocks: ['darkYoung']
      },        
      damn: {
          string: 'Liber Damnatus',
          description: ['Rebirth Yog-sothhoth. Not implemented. You can buy more tomes to add more priests', ' Cost: Vision '],
          cost: 84848,
          func: damn,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      },   
      necr: {
          string: 'Necronomicon',
          description: ['These sounds are more pleasing to the ear.', '  Cost: Vision '],
          cost: 848848,
          func: necr,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      },
      goul: {//unlocked by men of leng unlocks cannibalism
          string: 'Cultes des Goules',
          description: ['To Serve Man', '  Cost: Vision '],
          cost: 484,
          func: goul,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false,
          unlocks: ['cannibalism'],
          comment: 'A Toast: To your Health!'
      },
      azat: {//unlocked by throne of azathoth
          string: 'Book of Azathoth',
          description: ['Sign your name and end this insanity.', '  Cost: Vision '],
          cost: 88888888,
          func: azat,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      }
  },
  chant: {
    choir: {
        string: 'Eternal Choir',
        description: ['Sacrifice a chanter and capture a piece of their soul to sing forever. Probably not healthy.'],
        unlocked: false,
          active: false,
        purchased: false,
        cost: 10,
        func: choir,
        costType: 'chanters'
     }
  },
  preach: {
      fiction: {
          string: 'Fiction',
          description: ['People love funny little stories about aliens. (guarantees innocent when Preaching) '],
          cost: 88,
          func: fiction,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: true
      }
  }
};

    	//=========================================
	//                  Study upgrades
	//=========================================
 function studyMultiplier(){//multiplies study parameter and comments
        actions.study.level = actions.study.level * 2;
        comment('(Studying x 2)', 'lightgreen');
 }     
 function madCapIncrease(){
     stats.madness.madCap = stats.madness.madCap * 2;
    comment('(Madness Capacity x 2)', 'pink');
 }
function pnak(){//unlocked by crypt
    if(stats.vision.current >= actionUpgrades.study.pnak.cost){
        numberChange('stats', 'vision', -actionUpgrades.study.pnak.cost, '', 'red');
        flashFade('pnakWrap');
        numberChange('vault', 'tomes', 1, 'blue', 'red');
        studyMultiplier();
        madCapIncrease();
        actionUpgrades.study.pnak.purchased = true;
        document.getElementById('sacrariumTab').style.display='block';
        domUnlocks.sacrarium = true;
        comment("+1 Tome in Vault, Sacrarium bookshelf");
    }
}

function dzyan(){//unlocked by tome
    if(stats.vision.current >= actionUpgrades.study.dzyan.cost){
        numberChange('stats', 'vision', -actionUpgrades.study.dzyan.cost, '', 'red');
        flashFade('dzyanWrap');
        numberChange('vault', 'tomes', 1, 'blue', 'red');
        studyMultiplier();
        madCapIncrease();
        actions.preach.level++;
        comment('Preach effectiveness increased. +1 Tome in Vault', 'lightblue');
        actionUpgrades.study.dzyan.purchased = true;
    }
}

function kult(){//unlocked by tome
    if(stats.vision.current >=actionUpgrades.study.kult.cost ){
        numberChange('stats', 'vision', -actionUpgrades.study.kult.cost, '', 'red');
        flashFade('kultWrap');
        numberChange('vault', 'tomes', 1, 'blue', 'red');
        studyMultiplier();
        madCapIncrease();
        actionUpgrades.study.kult.purchased = true;
        eventBox("images/relics/tyog.jpg", "T'yog", "Ciphered in the text is a clue to the final resting place of T'yog, High Priest of Shub-Niggurath and the key to his release. (Wax Museum, Stone Passage Expeditions updated, Scroll of T'yog in Sacrarium, +1 Tome in Vault)");
        document.getElementById('waxDesc').innerText = "Careful examination reveals all.";
        document.getElementById('waxBenefit').innerText = "";
        document.getElementById('waxWrap').style.backgroundColor='black';
        relics.tyog.unlocked = true;
        document.getElementById('tyogWrap').style.display='block'; 
        world.wax.kult = true;
    }
}

function hsan(){//unlocked by tome
    if(stats.vision.current >= actionUpgrades.study.hsan.cost){
        numberChange('stats', 'vision', -actionUpgrades.study.hsan.cost, '', 'red');
        flashFade('hsanWrap');
        numberChange('vault', 'tomes', 1, 'blue', 'red');
        studyMultiplier();
        madCapIncrease();
        dreamEx.cele.unlocked = true;
        dreamEx.dylath.unlocked = true;
        dreamEx.zar.unlocked = true;
        document.getElementById('celeWrap').style.display='block';
        document.getElementById('dylathWrap').style.display='block';
        document.getElementById('zarWrap').style.display='block';
        flash('expeditionsTab', 'lightgreen', 'white');
        comment('Maps to the Dreaming! (Dream Expeditions, +1 Tome in Vault)', 'lightgreen');
        actionUpgrades.study.hsan.purchased = true;
    }
}

function alch(){//unlocked by tome
    if(stats.vision.current >= actionUpgrades.study.alch.cost){
        numberChange('stats', 'vision', -actionUpgrades.study.alch.cost, '', 'red');
        studyMultiplier();
        madCapIncrease();
        flashFade('alchWrap');
        numberChange('vault', 'tomes', 1, 'blue', 'red');
        actionUpgrades.study.alch.purchased = true;
        fleshCrafts.transmute.unlocked = true;
        document.getElementById('transmuteWrap').style.display='block';
        tomeCrafts.enscribe.unlocked = true;
        document.getElementById('enscribeLock').style.display='block';
        comment('The secrets of Transmutation! (Ichor unlocked via FleshCrafts, Scribes unlocked in TomeCrafts, +1 Tome in Vault)', 'pink');
    }
}
//should be stage 2 cost increased
function dhol(){ //unlocked by tome
    if((stats.vision.current >= actionUpgrades.study.dhol.cost) && (stats.charm.current >= 848)){
        numberChange('stats', 'vision', -actionUpgrades.study.dhol.cost, '', 'red');
        numberChange('stats', 'charm', -848, '', 'red');
        flashFade('dholWrap');
        numberChange('vault', 'tomes', 1, 'blue', 'red');
        document.getElementById('chantToggle').style.display='block';
        document.getElementById('chantWrap').removeEventListener('pointerenter', chantTimer);
        document.getElementById('chantWrap').addEventListener('pointerdown',  chantToggle);
        studyMultiplier();
        madCapIncrease();
        comment('Endless Chanting. ( Chanting Toggle) +1 Tome in Vault', 'lightgreen');
        actionUpgrades.study.dhol.purchased = true;
        actions.chant.toggleBool = true;
    }
}

function vermin(){ //unlocked by tome
    if(stats.vision.current >= actionUpgrades.study.vermin.cost){
        numberChange('stats', 'vision', -actionUpgrades.study.vermin.cost, '', 'red');
        flashFade('verminWrap');
        numberChange('vault', 'tomes', 1, 'blue', 'red');
        studyMultiplier();
        madCapIncrease();
        actionUpgrades.study.vermin.purchased = true;
        eventBox("images/relics/jenkin.jpg", "Brown Jenkin", "Summoned through a dark ritual encoded in the text, the man faced rat offers to show West passages to the deepest layer of the Dreaming. Its strangly human hands wring in anticipation. (Brown Jenkin in Sacrarium, Throne of Azathoth dream expedition available)");
        relics.jenkin.unlocked = true;
        document.getElementById('jenkinWrap').style.display="block";
        dreamEx.throne.unlocked = true;
        document.getElementById('throneWrap').style.display="block";
    }
}

function eibon(){//unlocked by tome tentacle bonus
    if(stats.vision.current >= actionUpgrades.study.eibon.cost && madMin(8888)){
        numberChange('stats', 'vision', -actionUpgrades.study.eibon.cost, '', 'red');
        studyMultiplier();
        madCapIncrease();
        flashFade('eibonWrap');
        numberChange('vault', 'tomes', 1, 'blue', 'red');
        actionUpgrades.study.eibon.purchased = true;
        fleshCrafts.cannibalism.tentacle = true;
        fleshCrafts.cannibalism.description[0] = "Watching West's second mouth eat horrifies the Faithful (increased Terror)";
        fleshCrafts.cannibalism.description[2] = "Benefits: Health, Madness, Terror, and Radiance";
        comment("A hungry tentacle now emerges from West's head while he eats. (Cannibalism now also provides Radiance, Madness, and increased Terror. +1 Tome in Vault)");
    }
}

function damn(){//unlocked by tome unlocks yog sothoth via the twins
     if(stats.vision.current >= actionUpgrades.study.damn.cost){
        numberChange('stats', 'vision', -actionUpgrades.study.damn.cost, '', 'red');
        studyMultiplier();
        madCapIncrease();
        flashFade('damnWrap');
        numberChange('vault', 'tomes', 1, 'blue', 'red');
        actionUpgrades.study.damn.purchased = true;
        comment("Not implemented (+1 Tome in Vault)");
    }
}

function necr(){//unlocked by tome
    if(stats.vision.current >= actionUpgrades.study.necr.cost){
        numberChange('stats', 'vision', -actionUpgrades.study.necr.cost, '', 'red');
        studyMultiplier();
        madCapIncrease();
        flashFade('necrWrap');
        numberChange('vault', 'tomes', 1, 'blue', 'red');
        actionUpgrades.study.necr.purchased = true;
        comment("Not implemented (+1 Tome in Vault)");
    }
}

function goul(){//unlocked by men of leng unlocks cannibalism
    if(stats.vision.current >= actionUpgrades.study.goul.cost){
        numberChange('stats', 'vision', -actionUpgrades.study.goul.cost, '', 'red');
        studyMultiplier();
        madCapIncrease();
        flashFade('goulWrap');
        numberChange('vault', 'tomes', 1, 'blue', 'red');
        actionUpgrades.study.goul.purchased = true;
        fleshCrafts.cannibalism.unlocked = true;
        fleshCrafts.cannibalism.purchased = true;
        document.getElementById('cannibalismWrap').style.display='block';
        comment('Tome title translated: To Serve Man (Cannibalism unlocked in FleshCrafts, +1 Tome in Vault)');
    }
}

function azat(){//unlocked by azat ex
    const currentTime = Date.now();
    const timeDifference = (currentTime - totalTime.timeInit) / 3600000;
    totalTime.total += timeDifference;
    eventBox("/images/gods/azat.jpg", "Azathoth", "It ends here. Outside the ordered universe, at the center of infinity, lies the boundless daemon sultan Azathoth gnawing hungrily amidst the beating of vile drums and the monotonous whine of accursed flutes. As you sign your name, the pipes and drums rise to a furious pace and then cease forever. All of creation falls into nothing. Thanks for playing. The Gods have taken " + Math.floor(totalTime.total) + " hours of your life.");
}
    	//=========================================
	//                  Chant Toggle
	//=========================================

function chantToggle(){
    if(actions.chant.toggle === false){
        if(actions.dream.toggle === true){
             dreamToggle();
        }
    actions.chant.toggle = true;
    playWithLowVolume(chanting);
    document.getElementById('chantToggle').style.backgroundColor='green';
    }else{
    actions.chant.toggle = false;
        pauses(chanting);
        chanting.volume=1;
    document.getElementById('chantToggle').style.backgroundColor='red';
    document.getElementById('chantWrap').classList.remove("chantPulse");
    }
}
function autoChant(tics){
    if(tics >= 1){
            chant();
            document.getElementById('chantWrap').classList.add("chantPulse");//visual cue that it is working
        }
}

function choir(){// every point of radiance adds 0.1 to chant effectiveness unlocked by
    
}
    	//=========================================
	//                  Dream Toggle
	//=========================================
function dreamToggle(){
    if(actions.dream.toggle === false){
        if(actions.chant.toggle === true){
             chantToggle();
        }
    actions.dream.toggle = true;
    document.getElementById('dreamToggle').style.backgroundColor='green';
    startDreamTimer('toggled');
    }else{
    actions.dream.toggle = false;
    document.getElementById('dreamToggle').style.backgroundColor='red';
    endDreamTimer();
    }
}

    	//=========================================
	//                  Preach upgrades
	//=========================================

function fiction(){//??
    if(stats.vision.current >= 100){
        stats.vision.current -= 100;
        document.getElementById('vision').innerHTML = stats.vision.current;
        actionUpgrades.preach.fiction.purchased = true;
        document.getElementById('fictionWrap').style.display='none';
        
    }
}

    	//=========================================
	//                  Madness Actions
	//=========================================
        
let madActIntervalId; // Specific name for the interval
let madActFrequency = 1; // Frequency starts at 1 iteration per second

function startMadActLoop(madAction) {
    let stat = madActions[madAction].costStat;
    let current;
    let parent;
    if (madAction === 'drink' || madAction === 'smoke' || madAction === 'flagellate') {
        current = stats[stat].current;
        parent = "stats";
    } else {
        current = vault[stat].current;
        parent = "vault";
    }
    if (current >= madActions[madAction].cost && stats.madness.current > 0) { // check if payable and needed
    madActFrequency = 2; // Start frequency
    madActIntervalId = setInterval(() => {
        for (let i = 0; i < madActFrequency; i++) {
            executeMadAction(madAction); // Perform the action
        }
        madActFrequency++; // Increase frequency each loop
    }, 800);
    document.getElementById(madAction + "Wrap").classList.add("madActPulse");
    document.addEventListener('pointerup', () => stopMadActLoop(madAction, madActIntervalId), { once: true });
    }
}

function stopMadActLoop(madAction) {
    clearInterval(madActIntervalId); // Stop the interval
    document.getElementById(madAction + "Wrap").classList.remove("madActPulse");
}

function executeMadAction(madAction) {
    let stat = madActions[madAction].costStat;
    let current;
    let parent;
    if (madAction === 'drink' || madAction === 'smoke' || madAction === 'flagellate') {
        current = stats[stat].current;
        parent = "stats";
    } else {
        current = vault[stat].current;
        parent = "vault";
    }
    if (current >= madActions[madAction].cost && stats.madness.current > 0) { // check if payable
            numberChange(parent, stat, -madActions[madAction].cost, "blue", "red");
        if (stats.madness.current > madActions[madAction].benefit) { // don't let madness go below 0
            numberChange("stats", "madness", -madActions[madAction].benefit, "red", "blue");
        }else {
            numberChange("stats", "madness", -stats.madness.current, "red", "blue");
            stopMadActLoop(madAction, madActIntervalId);
        }
        comment(madActions[madAction].comment, "#C083EB");
    }else{
         stopMadActLoop(madAction, madActIntervalId);
    }
}


let madActions ={
  drink: {
      string: 'Drink',
      description: ['A draught to drown the whispers.', 'Cost: Vision ', 'Benefit: -2 Madness'],
      comment: 'You cannot hide forever.',
      benefit: 2,
      costStat: 'vision',
      cost: 1,
      unlocked: true
  },
  smoke: {
      string: 'Smoke',
      description: ['Veils of fog quiet the chaos within.', 'Cost: Charm ', 'Benefit: -4 Madness'],
      comment: 'There is no escape from the Truth.',
      benefit: 4,
      costStat: 'charm',
      cost: 2,
      unlocked: true
  },
  flagellate: {
      string: 'Flagellate',
      description: ['Through suffering, clarity emerges.', 'Cost: Health ', 'Benefit: -12 Madness'],
      comment: 'Is this truly necessary?',
      benefit: 12,
      costStat: 'health',
      cost: 16,
      unlocked: false,
          active: false,
      unlock: ['madness', 44]
  },
  rave: {
      string: 'Rave',
      description: ['Wail until only silence remains.', 'Cost: Love ', 'Benefit: -16 Madness'],
      comment: 'Hmmm...',
      benefit: 16,
      costStat: 'love',
      cost: 32,
      unlocked: false,
          active: false,
      unlock: ['love', 44]
  },
  doomScroll: {
      string: 'Doom Scroll',
      description: ["The mundane feed bleeds the frenzy from your mind.", 'Cost: Terror -', 'Benefit: -8 Madness'],
      comment: 'Those who are not feared cannot rule.',
      benefit: 8,
      costStat: 'terror',
      cost: 32,
      unlocked: false,
          active: false,
      unlock: ['terror', 44]
  }
};
let statKeys = Object.keys(stats);
let actionKeys = Object.keys(actions);     
let madKeys = Object.keys(madActions);
let upgradeKeys = Object.keys(actionUpgrades);


    	//=========================================
	// Build West and Stats HTML
	//=========================================
        
function west(){      
    for(i=0;i<statKeys.length;i++){
            document.getElementById('statBox').innerHTML +=
            "<div class='westStatBox' id='" + statKeys[i] + "Box'>" +
            "<span class='" + statKeys[i] + "Text'>" + stats[statKeys[i]].string + "</span>" +
            "<span class='" + statKeys[i] + "Text westNumbers'  id='" + statKeys[i] + "'></span>" +
            "</div>";
    };
    for(i=0;i<statKeys.length; i++){
        document.getElementById(statKeys[i]).innerHTML = stats[statKeys[i]].current;
    };
    document.getElementById('menuBox').innerHTML +=
            "<button class='menuItem'> </button>" +
            "<button class='menuItem' id='mute'>Mute</button>" +
            "<button class='menuItem' id='save'>Save</button>" +
            "<button class='menuItem' id='load'>Load</button>" +
            "<button class='menuItem' id='reset'>Reset</button>" +
            "<button class='menuItem' id='test'>Test</button>";
    document.getElementById('west').innerHTML =    
            "<div id='actionBox' >" +
            "</div>" +
            "<div id='madActionBox'>" +
            "<h3 id='madTitle'>Madness Mitigation</h3>" +
            "</div>"; 
    for(i=0;i<actionKeys.length;i++){
        document.getElementById('actionBox').innerHTML +=
                "<div class='actionColumn' id='" + actionKeys[i] + "Column'>" +
                "<button type='button' class='actionWraps' id='" + actionKeys[i] + "Wrap'></button>" +
                "</div>";
        if(i>0){
            document.getElementById(actionKeys[i] + 'Column').innerHTML +=
                "<button type='button' class='actionLocks' id='" + actionKeys[i] + "Lock'>" +actions[actionKeys[i]]['lockText'] + "</button>";
        }
    }
    document.getElementById('studyWrap').innerHTML += 
         "<img class='actionPng' src='images/west/study.jpg' alt='?'/>" +
         "<span class='actionText'>Study Tome</span>" +
         "<span id='studyProgress'></span>";
    document.getElementById('chantWrap').innerHTML += 
         "<span id='chantToggle'></span>" +
         "<img class='actionPng' src='images/west/chant.jpg' alt='?'/>" +
         "<span class='actionText'>Chant</span>";
    document.getElementById('dreamWrap').innerHTML += 
         "<span id='dreamToggle'></span>" +
         "<img class='actionPng' id='dreamImg' src='images/west/dream.jpg' alt='?'/>" +
         "<span class='actionText'>Dream</span>" +
          "<span id='dreamTimer'>0</span>";
    document.getElementById('preachWrap').innerHTML += 
         "<img class='actionPng' src='images/west/preach.jpg' alt='?'/>" +
         "<span class='actionText' id='preachText'>Preach</span>" +
        "<span id='preachWrapCost'>" + actions.preach.cost + "</span>";
              
        //Action Upgrades
    for (i=0;i<upgradeKeys.length; i++){
        let actionColumn = upgradeKeys[i];
        let upgrades = Object.keys(actionUpgrades[actionColumn]);
        for(j=0;j<upgrades.length;j++){
            document.getElementById(actionColumn + "Column").innerHTML += 
                "<button class='actionUpgradeWraps' id='" + upgrades[j] + "Wrap'>" + actionUpgrades[actionColumn][upgrades[j]].string + "</button>";
        };
    };
    //mad actions
    for(i=0;i<madKeys.length;i++){
            document.getElementById('madActionBox').innerHTML +=
                    "<button class='madActionWraps' id='" +madKeys[i] + "Wrap'>" +
                    "<span class='madTitle'>" + madActions[madKeys[i]].string + "</span>" + 
                    "<img class='madActionPng' src='images/west/" + madKeys[i] + ".jpg' alt='?'/>" +
                    "</button>";
    };

};   
west();
//Build Dream buttons
function makeDreamChoices(){
    document.getElementById('dreamColumn').innerHTML +=
        "<span  id='dreamChosen'>Mind Alone</span>" +
        "<button onpointerdown='toggleDreamChoices()' id='dreamDropBtn'>&#9662;</button>" +
        "<div id='dreamChoices'></div>";
    for(i=0;i<dreamKeys.length;i++){
        document.getElementById('dreamChoices').innerHTML +=
"<button class='dreamChoice' id='" + dreamKeys[i] + "Choice' onpointerdown='dreamChoice(\"" + dreamKeys[i] + "\")'>" + dreamChoices[dreamKeys[i]].string + "</button>";
    }
};
 makeDreamChoices();
