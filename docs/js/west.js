
    	//=========================================
	//                                      stats
	//=========================================
        
let stats = {    
    vision: {//opens upgrades//
        callString: 'vision',
        string: 'Vision',
        description: ['The key to unlocking the mysteries of the universe.'],
        current:0,
        unlocked: true
    },
    charm: {//cultist max//
        callString: 'charm',
        string: 'Charm',
        description:['With enough Charisma, West can convince people of anything.'],
        current: 0,
        unlocked: false,
          active: false,
        unlock: ['vision', 1]
    },
    health: {
        callString: 'health',
        string: 'Health',
        description: ["Health will drift up or down toward West's natural Health."],
        current: 88,
        max: 88,
        unlocked: true,
        dead: false,
        coma: false
    },
    radiance: {//energy//
        callString: 'radiance',
        string: 'Radiance',
        description: ["A reward from the Outer Gods, probably"],
        current: 0,
        unlocked: false,
          active: false,
        unlock: ['radiance', 1]
    },
    shards: {//god energy
        callString: 'shards',
        string: 'Shards',
        description:["Fragments of the Divine, they multiply West's influence."],
        current: 0,
        unlocked: false,
          active: false,
        unlock: ['shards', 1]
    },
    madness: { //main stat//
        callString: 'madness',
        string: 'Madness',
        description: ['Madness rides the star-wind...'],
        current:0,
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
        level: 1.6,
        madnessChance: 0.88,
        unlocked: true,
        purchased: true
    }, 
    chant: {
        string: 'Chant',
        description: ['Reciting arcane passages imbues West with unearthly Charm', 'Cost: Sanity', 'Benefit: Charm'],
        level: 1.6,
        madnessChance: 0.88,
        toggleBool: false,//for dom
        toggle: false,
        theftTicCounter: [0,4],
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
        level: 1.6,
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
        totalDreaming: 0,
        comment: 'Break the Silver Tether and be lost to the Realms of Dream forever.'
    },
    preach: {
        string: 'Preach   ',
        description: ['Using his Charms, West can bring in the Faithful.', ' Cost: Charm ', 'Benefit: Followers'],
        level: 1,
        cost: 8,
        benefit: 1,
        timer: 2000,
        multiplier: 8,
        shardDiscount: 1,
        audio: 0,
        unlocked: false,
        purchased: false,
        innocents:true,
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
             numberChange('stats', 'madness', actions.study.level , '#FE2EF7', 'blue');  
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
        if(relics.viol.unlocked===true){
            numberChange('vault', 'love',  (actions.chant.level * 4) , '#FFFF00', 'red');  
        }
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
    let temp = document.getElementById('chantWrap');
    intervalId = setInterval(chant, 800);
        if(userInteracted === true){
        plays(chanting);
    }
    temp.classList.add("chantPulse");
    document.getElementById('chantWrap').onpointerout = function() {
        clearInterval(intervalId);
        if(actions.chant.toggle === false){
            pauses(chanting);
            temp.classList.remove("chantPulse");
        } else {
            chanting.volume = 0.3;
        }
    };
}

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
// Function to start the timer
function startDreamTimer(type) {
    sequenceEnded = false; 
    document.getElementById("dreamTimer").style.display = "block";
    document.getElementById('dreamWrap').classList.add("dreamPulse");
    if (type === 'coma' || type === 'laudanum' || type === 'absinthe' || type === 'mushroomTea' || type === 'mandrake') {
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
    timerInterval = setInterval(() => updateTimer(type), 1000);
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

function updateTimer(type) {
    let timerDisplay = document.getElementById("dreamTimer");
    let currentTime = Date.now();
    let elapsedTime = (currentTime - startTime) / 1000; // Convert to seconds
    let radCost = calculateCost(elapsedTime);
    // Check if the cost per second exceeds available radiance
    if (radCost > stats.radiance.current) {
        comment('West lacks the Radiance to continue.');
        endDreamTimer(); 
        timerDisplay.style.fontSize = "17dvw";
    } else {
        timerDisplay.innerText = elapsedTime.toFixed(0);
        // Update the stats every second based on the elapsed time
        if (Math.floor(elapsedTime) > 0) { // Only update if at least 1 second has passed
            actions.dream.totalDreaming++;
            let madChance = Math.random();
            let mad = 0;
             if(madChance <= actions.dream.madnessChance){
                 mad = actions.dream.level;
            }
            let  dHealth= actions.dream.level;
            if(world.ant.unlocked === true){
                dHealth *= 0.5;
            }
            let vision = actions.dream.level;
            if (type === 'laudanum'){
                vision*=4;
            }else if (type === 'absinthe'){
                vision*=8;
                numberChange("vault", "love", vision, "green", "");
            }else if (type === 'mushroomTea'){
                vision*=8;
                numberChange("vault", "terror", vision, "green", "");
            }else if (type === 'mandrake') {
                vision*=16;
            }
            let dreamType = actions['dream']['type'];
            if(type==="coma"){
                dreamType= 'mindAlone';
            }
            if (dreamType === 'mindAlone') {
                numberChange('stats', 'madness',  mad, '#FE2EF7', 'blue');  
                numberChange('stats', 'health', 8 * dHealth, 'blue', 'red');  
                numberChange('stats', 'vision', (2 * vision), 'blue', 'red');  
            } else if (dreamType === 'lighthouse') {
                numberChange('stats', 'madness', mad * 4, '#FE2EF7', 'blue'); 
                numberChange('stats', 'health', 8 * dHealth, 'blue', 'red');
                numberChange('stats', 'vision', (8 * vision), 'blue', 'red');  
                numberChange('stats', 'radiance', -radCost, 'blue', 'red');
            } else if (dreamType === 'whiteShip') {
                numberChange('stats', 'madness', mad * 8, '#FE2EF7', 'blue'); 
                numberChange('stats', 'health',  8 * dHealth, 'blue', 'red');
                numberChange('stats', 'vision', (elapsedTime * 8 * vision), 'blue', 'red');  
                numberChange('stats', 'radiance', -radCost, 'blue', 'red');  
            } else if (dreamType === 'blackShip') {
                numberChange('stats', 'madness', (mad * elapsedTime * 8), '#FE2EF7', 'blue'); 
                numberChange('stats', 'health',   -8 * dHealth, 'blue', 'red');
                numberChange('stats', 'vision', (elapsedTime * elapsedTime * 8 * vision), 'blue', 'red');  
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
            eventBox("images/eventImages/cult.jpg", "The Cult", "One alone cannot accomplish Greatness. West must find and use those foolish enough to walk into darkness.");
            setTimeout(() => {
                document.getElementById('cultTab').style.display='block';
                document.getElementById('faithfulWrap').style.display='block';
                comment('A beginning', 'red', 'pr');
            }, 1500);
        }
        if(actions.preach.level>1){
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
        //innocent chance
        if(vault.love.current > vault.terror.current){
            if(actions.preach.innocents===true){
                numberChange('cult', 'innocents',  actions.preach.level , '#FE2EF7', 'blue');
                if(cult.innocents.unlocked === false){
                    cult.innocents.unlocked = true;
                    document.getElementById('innocentsWrap').style.display='block';
                    comment('The Faithful bring family with them if Love dominates. Grist for the mill.', 'lightblue', 'white');
                }else{
                comment('So Innocent...');
                }
            }else{
                comment("There are no Innocents left in the Darkness West has wrought.");
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
      sublimate: {
          string: 'Sublimate',
          description: ["Sublimate excess Vision into Radiance through the Trapezohedron.", ' Cost: Vision ', "Benefit: 1 Radiance"],
          cost: 888,
          func: sublimate,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      },      
      damn: {
          string: 'Liber Damnatus',
          description: ["An ancient Tome.", ' Cost: Vision '],
          cost: 48,
          func: damn,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      },        
      pnak: {
          string: 'Pnakotic Manuscripts',//unlock museum
          description: ["The eighth fragment is most interesting.", ' Cost: Vision '],
          cost: 84,
          func: pnak,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      },   
      dzyan: {//preach * 2
          string: 'Book of Dzyan',
          description: ['Pure drivel, but it is useful to learn what moves men to madness.', ' Cost: Vision '],
          cost: 168,
          func: dzyan,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      },     
      hsan: {
          string: 'Cryptical Books of Hsan',
          description: ['One can travel the Dreamlands with confidence with these maps.', 'Cost: Vision '],
          cost: 248,
          func: hsan,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      },  
      alch: { 
          string: 'Clavis Alchimiae',
          description: ['The lost secrets of Alchemy.', ' Cost: Vision '],
          cost: 484,
          func: alch,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      },      
      dhol: {
          string: 'Dhol Chants',
          description: ['An eternity of song.', ' Cost: Charm 848, Vision '],
          cost: 4848,
          func: dhol,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      }, 
      kult: {
          string: 'Unaussprechlichen Kulten',
          description: ["The Black Book of von Junzt.", "Cost: Vision "],
          cost: 2484,
          func: kult,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      },   
      necr: {
          string: 'Necronomicon',
          description: ['Most copies are missing the ritual on page 848.', '  Cost: Vision '],
          cost: 848,
          func: necr,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      },  
      eibon: {
          string: 'Book of Eibon',
          description: ['Leaving humanity behind may be the only choice. Madness Minimum: 888', '  Cost: Vision '],
          cost: 24848,
          func: eibon,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false,
          unlocks: ['darkYoung']
      },  
      vermin: {
          string: 'De Vermis Mysteriis',
          description: ['Summons a familiar.', ' Cost: Vision '],
          cost: 8484,
          func: vermin,
          costType: 'vision',
          unlocked: false,
          active: false,
          purchased: false
      },   
      //stage 2   
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
          cost: 848484,
          func: azat,
          unlocked: false,
          active: false,
          purchased: false
      }
  },
  chant: {
    regalia:{
        callString: 'regalia',
        string: 'Regalia?',
        description: ["Cost: Vision 484"],
        func: regalia,
        cost: 484,
        unlocked: false,
        purchased: false,
        permanent: false
    },
    silkRobes:{
        callString: 'silkRobes',
        string: 'Silk Robes',
        description: ['Embroidered with arcane sigils, its beauty is worth the cost alone.', 'Cost: Gold ', "Benefit: improves West's Chanting"],
        func: silkRobes,
        cost: 484,
        unlocked: false,
        purchased: false,
        permanent: false
    },
    goldHeaddress:{
        callString: 'goldHeaddress',
        string: 'Golden Headdress',
        description: ['Encrusted with odd gems, it impresses to say the least.', 'Cost: Gold ', "Benefit: improves West's Chanting"],
        func: goldHeaddress,
        cost: 848,
        unlocked: false,
        purchased: false,
        permanent: false
    },
    scepter:{
        callString: 'scepter',
        string: 'Emerald Scepter',
        description: ["Rare and valuable, it emanates power.", 'Cost: Gold ', "Benefit:  improves West's Chanting."],
        func: scepter,  
        cost: 4884,
        unlocked: false,
        purchased: false,
        permanent: false
    },
    mantle:{
        callString: 'mantle',
        string: 'Fleshweave Mantle',
        description: ["Woven with gold thread and covered in arcane sigils, the material still bears distinctive scars and tatoos.", 'Cost: Flesh ', "Benefit:  improves West's Chanting, Terror from Faithful."],
        madMin: "Minimum Madness: 484",
        func: mantle,  
        cost: 88,
        unlocked: false,
        purchased: false,
        permanent: false
    },
    halo:{
        callString: 'halo',
        string: 'Radiant Halo',
        description: ["It costs little to awe the masses.", 'Cost: Radiance ', "Benefit:  improves West's Chanting, Love from Faithful."],
        func: halo,  
        cost: 88,
        unlocked: false,
        purchased: false,
        permanent: false
    },
    goldenThrone:{
        callString: 'goldenThrone',
        string: 'Golden Throne',
        description: ["Nicer than Saddam's.", 'Cost: Gold ', "Benefit:  improves West's Chanting, Faithful, Chanter, and Sentinel capacities increased."],
        func: goldenThrone,  
        cost: 488884,
        unlocked: false,
        purchased: false,
        permanent: false
    },
    choir: {
        string: 'Eternal Choir',
        description: ['Sacrifice a chanter and capture a piece of their soul to sing forever. Probably not healthy.', "Cost: 1 Radiance, 1 Chanter ", "Benefits: minor passive Charm, minor passive Madness, 1 Flesh"],
        cost: "",
        counter:[0,8],
        benefitLevel: 0,
        func: choir,
        unlocked: false,
        purchased: false,
        permanent: true
     },
    ucharan: {
        string: 'Ucharan Guru',
        description: ['A specialized voice coach.', "Cost: Gold ", "Benefit: improved Chanting"],
        cost: 4884,
        func: ucharan,
        unlocked: false,
        purchased: false,
        permanent: false
     },
    possession: {
        string: 'Possession?',
        description: ["Cost: Vision 8448"],
        cost: 8448,
        func: possession,
        unlocked: false,
        purchased: false,
        permanent: false
     },
    bodyTheft: {
        string: 'Body Theft',
        description: ["The simple minded will follow beauty more easily.", "Cost: Radiance ", "Benefits: +88 max Health, passive Charm"],
        cost: 88,
        func: bodyTheft,
        unlocked: false,
        purchased: false,
        permanent: false
     },
    perfection: {
        string: 'Perfection',
        description: ['Why settle for what nature provides? Build a perfect vessel.', "Cost: Flesh 484, Ichor 84, Radiance ", "Benefits: +88 max Health, increased Health regeneration, passive Charm"],
        cost: 484,
        func: perfection,
        unlocked: false,
        purchased: false,
        permanent: false
     }
  },
    dream: {//drugs start the dream loop with varying lengths of time lol
        laudanum: {
            string: 'Laudanum',
            description: ["So easy to drift away.", "Cost: Gold ", "Benefit: drugged sleep with improved Dreaming"],
            func: laudanum,
            cost: 88,
            unlocked: false,
            purchased: false,
            permanent: true
        },
        absinthe: {
            string: 'Absinthe',
            description: ["Quaff, oh quaff this kind nepenthe and forget this lost Lenore!", "Cost: Gold ", "Benefit: drugged sleep with improved Dreaming, also produces Terror"],
            func: absinthe,
            cost: 248,
            unlocked: false,
            purchased: false,
            permanent: true
        },
        mushroomTea: {
            string: 'Mushroom Tea',
            description: ["Every mushroom is edible at least once.", "Cost: Gold ", "Benefit: drugged sleep with improved Dreaming, also produces Love"],
            func: mushroomTea,
            cost: 484,
            unlocked: false,
            purchased: false,
            permanent: true
        },
        mandrake: {
            string: 'Mandrake Tincture',
            description: ["Fatal, shmatal.", "Cost: Gold ", "Benefit: drugged sleep with greatly improved Dreaming,"],
            func: mandrake,
            cost: 848,
            unlocked: false,
            purchased: false,
            permanent: true
        }
    },
    preach: {
        fiction: {
          string: 'Science Fiction',
          description: ['People love funny little stories about aliens. Minimum Madness = Vision cost ', "Cost: Vision ", "Benefits: Innocents, Faithful based on cost"],
          func: fiction,
          cost: 248,
          unlocked: false,
          purchased: false,
          permanent: true
        },
        attendants: {
          string: 'Attendants',
          description: ['Faithful trained to soothe.', "Cost: Vision 48484, Love ", "Benefit: Faithful reduce four times as much Madness in Altar Room."],
          func: attendants,
          cost: 48484,
          unlocked: false,
          purchased: false,
          permanent: false
        },
        conduits: {
          string: 'Choral Conduits',
          description: ["Chanters trained to harmonize with West", "Cost: Vision 48484 Love ", "Benefit: West gains four times as much Charm from Chanters in Altar Room."],
          func: conduits,
          cost: 48484,
          unlocked: false,
          purchased: false,
          permanent: false
        },
        oblations : {
          string: 'Oblations ',
          description: ["It isn't quite the same as a protection racket. Terror Minimum: 48484", "Cost: Vision 48484 Love ", "Benefit: Sentinals induce four times more generosity toward West in the Altar Room."],
          func: oblations ,
          cost: 48484,
          unlocked: false,
          purchased: false,
          permanent: false
        },
        eloquence : {
          string: 'Eloquence ',
          description: ['West knows even the most idle thoughts could hide wisdom.', "Cost: Vision 84848 Charm ", "Benefits: Priests adjacent to West produce four times as many pages when active."],
          func: eloquence ,
          cost: 84848,
          unlocked: false,
          purchased: false,
          permanent: false
        }
    }
};

    	//=========================================
	//                  Study upgrades
	//=========================================
        
function sublimate(){
    if(stats.vision.current>=888){
        buttonGlow("sublimateWrap");
        numberChange("stats", "vision", -888, "", "blue");
        numberChange("stats", "health", -88, "", "blue");
        numberChange("stats", "radiance", 1, "", "blue"); 
    }
}        
        
function studyMultiplier(){//multiplies study parameter and comments
    actions.study.level +=0.8;
    comment('(Study action is more effective)', 'lightgreen');
}     

function madCapIncrease(){
    stats.madness.madCap +=88;
    document.getElementById("madnessDesc").innerHTML= "Madness rides the star-wind... MadCap: " + Math.floor(stats.madness.madCap);
    updateMadnessSlider();
    comment('(+88 Madness Capacity)', 'pink');
}

function damn(){
     if(stats.vision.current >= actionUpgrades.study.damn.cost){
        numberChange('stats', 'vision', -actionUpgrades.study.damn.cost, '', 'red');
        studyMultiplier();
        madCapIncrease();
        flashFade('damnWrap');
        numberChange('vault', 'tome', 1, 'blue', 'red');
        actionUpgrades.study.damn.purchased = true;
        eventBox("images/west/study.jpg", "Liber Damnatus", "West begins to see the connections between conflicting thoughts. (translating Tomes increases West's Study action and capacity for Madness. Tomes can be manufactured from fragments in FleshCrafts. (TomeCrafts unlocked, +1 Tome in Vault)");

    }
}
function pnak(){//unlocked by crypt
    if(stats.vision.current >= actionUpgrades.study.pnak.cost){
        numberChange('stats', 'vision', -actionUpgrades.study.pnak.cost, '', 'red');
        flashFade('pnakWrap');
        numberChange('vault', 'tome', 1, 'blue', 'red');
        studyMultiplier();
        madCapIncrease();
        actionUpgrades.study.pnak.purchased = true;
        world.wax.unlocked=true;
        document.getElementById("waxWrap").style.display="block";
        eventBox("images/west/study.jpg", "Pnakotic Manuscripts", "The 8th fragment describes a dark and bloody ritual, but it is the address scribbled in the margin that catches West's eye. (Wax Museum expedition unlocked, +1 Tome in Vault)");
        comment("+1 Tome in Vault");
    }
}

function dzyan(){//unlocked by tome
    if(stats.vision.current >= actionUpgrades.study.dzyan.cost){
        numberChange('stats', 'vision', -actionUpgrades.study.dzyan.cost, '', 'red');
        flashFade('dzyanWrap');
        numberChange('vault', 'tome', 1, 'blue', 'red');
        studyMultiplier();
        madCapIncrease();
        actions.preach.level++;
        comment('Preach effectiveness increased. +1 Tome in Vault', 'lightblue');
        actionUpgrades.study.dzyan.purchased = true;
    }
}

function hsan(){//unlocked by tome
    if(stats.vision.current >= actionUpgrades.study.hsan.cost){
        numberChange('stats', 'vision', -actionUpgrades.study.hsan.cost, '', 'red');
        flashFade('hsanWrap');
        numberChange('vault', 'tome', 1, 'blue', 'red');
        studyMultiplier();
        madCapIncrease();
        dreamEx.cele.unlocked = true;
        dreamEx.zar.unlocked = true;
        document.getElementById('celeWrap').style.display='block';
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
        numberChange('vault', 'tome', 1, 'blue', 'red');
        actionUpgrades.study.alch.purchased = true;
        fleshCrafts.transmute.unlocked = true;
        document.getElementById('transmuteWrap').style.display='block';
        comment('The secrets of Transmutation! (Ichor unlocked via FleshCrafts, +1 Tome in Vault)', 'pink');
    }
}

function dhol(){ //unlocked by tome
    if((stats.vision.current >= actionUpgrades.study.dhol.cost) && (stats.charm.current >= 848)){
        numberChange('stats', 'vision', -actionUpgrades.study.dhol.cost, '', 'red');
        numberChange('stats', 'charm', -848, '', 'red');
        flashFade('dholWrap');
        numberChange('vault', 'tome', 1, 'blue', 'red');
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

function kult(){//unlocked by tome
    if(stats.vision.current >=actionUpgrades.study.kult.cost ){
        numberChange('stats', 'vision', -actionUpgrades.study.kult.cost, '', 'red');
        flashFade('kultWrap');
        numberChange('vault', 'tome', 1, 'blue', 'red');
        studyMultiplier();
        madCapIncrease();
        actionUpgrades.study.kult.purchased = true;
        eventBox("images/world/wax.jpg", "T'yog", "Ciphered in the text is a clue to the final resting place of T'yog, High Priest of Shub-Niggurath and the key to his release. (Wax Museum expedition updated, Scroll of T'yog in Sacrarium, +1 Tome in Vault)");
        document.getElementById('waxDesc').innerText = "Careful examination reveals all. Madness Minimum: 164 ";
        document.getElementById('waxBenefit').innerText = "Benefit: ?";
        world.wax.madMin=248;
        document.getElementById("waxMadMin").innerHTML=world.wax.madMin;
        document.getElementById('waxWrap').style.backgroundColor='black';
        relics.scrollTyog.unlocked = true;
        document.getElementById('scrollTyogWrap').style.display='block'; 
        world.wax.kult = true;
    }
}

function necr(){//unlocked by tome
    if(stats.vision.current >= actionUpgrades.study.necr.cost){
        numberChange('stats', 'vision', -actionUpgrades.study.necr.cost, '', 'red');
        studyMultiplier();
        madCapIncrease();
        flashFade('necrWrap');
        numberChange('vault', 'tome', 1, 'blue', 'red');
        actionUpgrades.study.necr.purchased = true;
        tyogCrafts.invokeYog.unlocked=true;
        document.getElementById("invokeYogLock").style.display = "block";
        if(permanentChanges.totalShards>0){
            tyogCrafts.summonYog.purchased=true;
            document.getElementById("invokeYogLock").style.display = "none";
            document.getElementById("invokeYogWrap").style.display = "block";
            document.getElementById("summonYogOneOff").style.display = "block";
            comment("The final work of the mad Arab Abdul Alhazred contains secrets older than the earth, older than the stars themselves. West percieves hidden depths with the aid of the Shards. (invoke/summon Yog-Sothoth in TyogCrafts, +1 Tome in Vault)");
        }else{
            comment("The final work of the mad Arab Abdul Alhazred contains secrets older than the earth, older than the stars themselves. (invoke Yog-Sothoth in TyogCrafts, +1 Tome in Vault)");
        }
    }
}

function eibon(){//unlocked by tome tentacle bonus
    if(stats.vision.current >= actionUpgrades.study.eibon.cost && madMin(888)){
        numberChange('stats', 'vision', -actionUpgrades.study.eibon.cost, '', 'red');
        studyMultiplier();
        madCapIncrease();
        flashFade('eibonWrap');
        numberChange('vault', 'tome', 1, 'blue', 'red');
        actionUpgrades.study.eibon.purchased = true;
        fleshCrafts.cannibalism.tentacle = true;
        fleshCrafts.cannibalism.description[0] = "Watching West's second mouth eat horrifies the Faithful (increased Terror)";
        fleshCrafts.cannibalism.description[2] = "Benefits: Health, Madness, Terror, and Radiance";
        comment("A hungry tentacle now emerges from West's head while he eats. (Cannibalism now also provides Radiance in addition to increased Madness, and Terror. +1 Tome in Vault)");
    }
}

function vermin(){ //unlocked by tome
    if(stats.vision.current >= actionUpgrades.study.vermin.cost){
        numberChange('stats', 'vision', -actionUpgrades.study.vermin.cost, '', 'red');
        flashFade('verminWrap');
        numberChange('vault', 'tome', 1, 'blue', 'red');
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


//      needs to be after tyog unlocks the mound
//        tomeCrafts.apprentice.unlocked=true;
//        document.getElementById("apprentices").style.display="block";
//        comment("Ia! Apprentices could save much time (Apprentices in TomeCrafts, +1 Tome in Vault)");



function goul(){//unlocked by men of leng unlocks cannibalism
    if(stats.vision.current >= actionUpgrades.study.goul.cost){
        numberChange('stats', 'vision', -actionUpgrades.study.goul.cost, '', 'red');
        studyMultiplier();
        madCapIncrease();
        flashFade('goulWrap');
        numberChange('vault', 'tome', 1, 'blue', 'red');
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
    eventBox("/images/godsAppeased/azat.jpg", "Azathoth", "It ends here. Outside the ordered universe, at the center of infinity, lies the boundless daemon sultan Azathoth gnawing hungrily amidst the beating of vile drums and the monotonous whine of accursed flutes. As you sign your name, the pipes and drums rise to a furious pace and then cease forever. All of creation ceases. Thanks for playing. The Gods have taken " + Math.floor(totalTime.total) + " hours of your life.");
}
    	//=========================================
	//                  Chant 
	//=========================================
function regalia(){
    if(stats.vision.current>=actionUpgrades.chant.regalia.cost){
        numberChange("stats", "vision", -actionUpgrades.chant.regalia.cost, "", "red");
        flashFade("regaliaWrap");
        actionUpgrades.chant.regalia.purchased=true;
        actionUpgrades.chant.silkRobes.unlocked=true;
        setTimeout(() => {
        document.getElementById("silkRobesWrap").style.display="block";
        }, 800);
    }
}

function silkRobes(){
    if(vault.gold.current>= actionUpgrades.chant.silkRobes.cost){
        numberChange("vault", "gold", -actionUpgrades.chant.silkRobes.cost, "", "red");
        flashFade("silkRobesWrap");
        actionUpgrades.chant.silkRobes.purchased = true;
        actionUpgrades.chant.goldHeaddress.unlocked=true;
        setTimeout(() => {
        document.getElementById("goldHeaddressWrap").style.display="block";
        }, 800);
        actions.chant.level+=0.8;
        comment("Chant action improved.");
    }
}

function goldHeaddress(){
    if(vault.gold.current>= actionUpgrades.chant.goldHeaddress.cost){
        numberChange("vault", "gold", -actionUpgrades.chant.goldHeaddress.cost, "", "red");
        flashFade("goldHeaddressWrap");
        actionUpgrades.chant.goldHeaddress.purchased = true;
        actionUpgrades.chant.scepter.unlocked=true;
        setTimeout(() => {
        document.getElementById("scepterWrap").style.display="block";
        }, 800);
        actions.chant.level+=0.8;
        comment("Chant action improved.");
    }
}

function scepter(){
    if(vault.gold.current>= actionUpgrades.chant.scepter.cost){
        numberChange("vault", "gold", -actionUpgrades.chant.scepter.cost, "", "red");
        flashFade("scepterWrap");
        actionUpgrades.chant.scepter.purchased = true;
        actions.chant.level+=1.6;
        comment("Chant action improved.");
    }
}

function mantle(){
    if(vault.flesh.current >= actionUpgrades.chant.mantle.cost && madMin(484)){
        numberChange('vault', 'flesh', -actionUpgrades.chant.mantle.cost, 'yellow', 'red');
        actionUpgrades.chant.mantle.purchased = true;
        flashFade('mantleWrap');
        actionUpgrades.chant.halo.unlocked=true;
        setTimeout(() => {
        document.getElementById("haloWrap").style.display="block";
        }, 800);
        actions.chant.level+=1.6;
        cult.faithful.outMultipliers[1] +=0.8;
        cult.faithful.capMultiplier+=0.04;
        comment('Probably should have used more lotion on that. Chant action improved. (Faithful produce more Terror, and have increased emotional capacity.)');
    }
}

function halo(){
    if(stats.radiance.current>= actionUpgrades.chant.halo.cost){
        numberChange("stats", "radiance", -actionUpgrades.chant.halo.cost, "", "red");
        flashFade("haloWrap");
        actionUpgrades.chant.halo.purchased = true;
        actionUpgrades.chant.goldenThrone.unlocked=true;
        setTimeout(() => {
        document.getElementById("goldenThroneWrap").style.display="block";
        }, 800);
        actions.chant.level+=1.6;
        cult.faithful.outMultipliers[0] +=0.8;
        cult.faithful.capMultiplier+=0.04;
        comment("Chant action improved. (Faithful produce more Love, and have increased emotional capacity.)");
    }
}

function goldenThrone(){
    if(vault.gold.current>= actionUpgrades.chant.goldenThrone.cost){
        numberChange("vault", "gold", -actionUpgrades.chant.goldenThrone.cost, "", "red");
        flashFade("goldenThroneWrap");
        actionUpgrades.chant.goldenThrone.purchased = true;
        actions.chant.level*=2;
        cult.faithful.capMultiplier*=2;
        cult.chanters.capMultiplier*=2;
        cult.sentinels.capMultiplier*=2;
        comment("Simple and down to earth. (Chant effectiveness doubled, Faithful, Chanter, and Sentinel capacities doubled.)");
    }
}

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

function choir(){
    if(cult.chanters.current>=1 && stats.radiance.current >=1){
        buttonGlow("choirWrap");
        numberChange("cult", "chanters", -1, "", "red");
        numberChange("stats", "radiance", -1, "", "red");
        numberChange("vault", "flesh", 1, "red", "");
         actionUpgrades.chant.choir.purchased = true;
        actionUpgrades.chant.choir.benefitLevel += 0.4;
        comment("Do you hear the lambs, Clarice?");
    }
}
function choirSing(){
    actionUpgrades.chant.choir.counter[0]++;
    if(actionUpgrades.chant.choir.counter[0] >= actionUpgrades.chant.choir.counter[1]){
        actionUpgrades.chant.choir.counter[0] = 0;
        numberChange("stats", "charm", actionUpgrades.chant.choir.benefitLevel, "#FFFF00", "");
        numberChange("stats", "madness", actionUpgrades.chant.choir.benefitLevel/2, "", "");
    }
}

function ucharan(){
    if(vault.gold.current >= 4884){
        numberChange("vault", "gold", -4884, "", "red");
        actions.chant.level+= 0.4;
        flashFade("ucharanWrap");
    }
}

function possession(){
    if(stats.vision.current>= actionUpgrades.chant.possession.cost){
        numberChange("stats", "vision", -actionUpgrades.chant.possession.cost, "", "red");
        flashFade("possessionWrap");
        actionUpgrades.chant.possession.purchased = true;
        actionUpgrades.chant.bodyTheft.unlocked = true;
        document.getElementById("bodyTheftWrap").style.display = "block";
    }
}

function bodyTheft(){
    if(stats.radiance.current>= actionUpgrades.chant.bodyTheft.cost){
        numberChange("stats", "radiance", -actionUpgrades.chant.bodyTheft.cost, "", "red");
        flashFade("bodyTheftWrap");
        actionUpgrades.chant.bodyTheft.purchased = true;
        actionUpgrades.chant.perfection.unlocked = true;
        document.getElementById("perfectionWrap").style.display = "block";
        stats.health.max+=88;
        comment("Did you do something to your hair? (+88 max Health, passive Charm");
    }
}

function perfection(){
    if(stats.radiance.current>= actionUpgrades.chant.perfection.cost && vault.flesh.current >=484 && vault.ichor.current>=84){
        numberChange("stats", "radiance", -actionUpgrades.chant.perfection.cost, "", "red");
        numberChange("vault", "flesh", -484, "", "red");
        numberChange("vault", "ichor", -84, "", "red");
        flashFade("perfectionWrap");
        actionUpgrades.chant.perfection.purchased = true;
        stats.health.max+=88;
        comment("Did you do something to your hair? (+88 max Health, increased Health regeneration, passive Charm");
    }
}

    	//=========================================
	//                  Dream Upgrades
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

function drugged(drug) {
    document.getElementById("mainWrapper").classList.add("disable-all-events");
    document.addEventListener("pointerdown", preventComapointerdowns, true);//prevent in penalties
    startDreamTimer(drug);
    let drugTimer=0;
    if(drug === "laudanum"){ drugTimer = 12000;}
    else if(drug === "absinthe"){ drugTimer = 16000;}
    else if(drug === "mushroomTea"){ drugTimer = 24000;}
    else if(drug === "mandrake"){ drugTimer = 48000;}
    setTimeout(() => druggedWakeUp(drug), drugTimer);
}

function druggedWakeUp(drug) {
    document.getElementById("mainWrapper").classList.remove("disable-all-events");
    document.removeEventListener("pointerdown", preventComapointerdowns, true);
    document.getElementById(drug + "Wrap").classList.remove("drugged");
    document.getElementById("dreamWrap").classList.remove("drugged");
    endDreamTimer();
}


function laudanum(){
    if(vault.gold.current>=actionUpgrades.dream.laudanum.cost){
        numberChange("vault", "gold", -actionUpgrades.dream.laudanum.cost, "", "green");
        actionUpgrades.dream.laudanum.cost*=2;
        document.getElementById("laudanumCost").innerHTML= actionUpgrades.dream.laudanum.cost;
        document.getElementById("laudanumWrap").classList.add("drugged");
        document.getElementById("dreamWrap").classList.add("drugged");
        drugged("laudanum");
        comment('Need you take so much?', 'red');
    }
}
function absinthe(){
    if(vault.gold.current>=actionUpgrades.dream.absinthe.cost){
        numberChange("vault", "gold", -actionUpgrades.dream.absinthe.cost, "", "green");
        actionUpgrades.dream.absinthe.cost*=2;
        document.getElementById("absintheCost").innerHTML= actionUpgrades.dream.absinthe.cost;
        document.getElementById("absintheWrap").classList.add("drugged");
        document.getElementById("dreamWrap").classList.add("drugged");
        drugged("absinthe");
        comment('...dreaming dreams no mortal ever dared to dream before.', 'red');
    }
}
function mushroomTea(){
    if(vault.gold.current>=actionUpgrades.dream.mushroomTea.cost){
        numberChange("vault", "gold", -actionUpgrades.dream.mushroomTea.cost, "", "green");
        actionUpgrades.dream.mushroom.cost*=2;
        document.getElementById("mushroomCost").innerHTML= actionUpgrades.dream.mushroom.cost;
        document.getElementById("mushroomTeaWrap").classList.add("drugged");
        document.getElementById("dreamWrap").classList.add("drugged");
        drugged("mushroomTea");
        comment('Are you talking to a caterpillar?', 'red');
    }
}
function mandrake(){
    if(vault.gold.current>=actionUpgrades.dream.mandrake.cost){
        numberChange("vault", "gold", -actionUpgrades.dream.mandrake.cost, "", "green");
        actionUpgrades.dream.mandrake.cost*=2;
        document.getElementById("mandrakeCost").innerHTML= actionUpgrades.dream.mandrake.cost;
        document.getElementById("mandrakeWrap").classList.add("drugged");
        document.getElementById("dreamWrap").classList.add("drugged");
        drugged("mandrake");
        comment('Did it scream when you bit into it?', 'red');
    }
}

    	//=========================================
	//                  Preach upgrades
	//=========================================

function fiction(){
    if(stats.vision.current >= actionUpgrades.preach.fiction.cost && madMin(actionUpgrades.preach.fiction.cost)){
        let delta =  actionUpgrades.preach.fiction.cost;
        numberChange("stats", "vision", -delta, "", "purple");
        let innocents = Math.floor(Math.log(delta / 80) * 4);
        let faithful = delta >= 400 ? Math.floor(innocents / 4) : 0;
        numberChange("cult", "innocents", innocents, "green");
        if(faithful > 0) {
            numberChange("cult", "faithful", faithful, "green");
        }
        let commentText = `West has drawn in ${innocents} Innocent${innocents > 1 ? 's' : ''}`;
        if(faithful > 0) {
            commentText += ` and ${faithful} Faithful`;
        }
        comment(commentText);
        actionUpgrades.preach.fiction.cost*=2;
        document.getElementById("fictionCost").innerHTML=actionUpgrades.preach.fiction.cost;
    }
}

function attendants() {
    if(stats.vision.current>=actionUpgrades.preach.attendants.cost && vault.love.current>=actionUpgrades.preach.attendants.cost){
        numberChange("stats", "vision", -actionUpgrades.preach.attendants.cost, "", "red");
        numberChange("vault", "love", -actionUpgrades.preach.attendants.cost, "", "red"); 
        actionUpgrades.preach.attendants.purchased=true;
        flashFade("attendantsWrap");
    }
}

function conduits() {
    if(stats.vision.current>=actionUpgrades.preach.conduits.cost && vault.love.current>=actionUpgrades.preach.conduits.cost){
        numberChange("stats", "vision", -actionUpgrades.preach.conduits.cost, "", "red");
        numberChange("vault", "love", -actionUpgrades.preach.conduits.cost, "", "red"); 
        actionUpgrades.preach.conduits.purchased=true;
        flashFade("conduitsWrap");
    }
}

function oblations() {
    if(stats.vision.current>=actionUpgrades.preach.oblations.cost && vault.love.current>=actionUpgrades.preach.oblations.cost && vault.terror.current>=actionUpgrades.preach.oblations.cost ){
        numberChange("stats", "vision", -actionUpgrades.preach.oblations.cost, "", "red");
        numberChange("vault", "love", -actionUpgrades.preach.oblations.cost, "", "red"); 
        actionUpgrades.preach.oblations.purchased=true;
        flashFade("oblationsWrap");
    }
}

function eloquence() {
    if(stats.vision.current>=actionUpgrades.preach.eloquence.cost && stats.charm.current>=actionUpgrades.preach.eloquence.cost){
        numberChange("stats", "vision", -actionUpgrades.preach.eloquence.cost, "", "red");
        numberChange("stats", "charm", -actionUpgrades.preach.eloquence.cost, "", "red"); 
        actionUpgrades.preach.eloquence.purchased=true;
        flashFade("eloquenceWrap");
    }
}

    	//=========================================
	//                  Madness Actions
	//=========================================
        
let madActIntervalId; // Specific name for the interval
let madActFrequency = 1; // Frequency starts at 1 iteration per second
let stopHandler;
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
    stopHandler = () => stopMadActLoop(madAction);
    document.getElementById(madAction + "Wrap").classList.add("madActPulse");
    document.addEventListener('pointerup', stopHandler, { once: true });
    document.getElementById(madAction + "Wrap").addEventListener('pointerleave', stopHandler, { once: true });
    }
}

function stopMadActLoop(madAction) {
    clearInterval(madActIntervalId); // Stop the interval
    document.getElementById(madAction + "Wrap").removeEventListener('pointerleave', stopHandler);
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
        //addictions
        if(madAction === "drink" && madUps.alcoholism.unlocked === false){
            madUps.alcoholism.drinkingCounter[0]++;
            if(madUps.alcoholism.drinkingCounter[0] >= madUps.alcoholism.drinkingCounter[1]){
                madUps.alcoholism.unlocked = true;
                document.getElementById("alcoholismMadUp").style.display="block";
            }
        }else if (madAction === "drink" && madUps.alcoholism.active === true){
            numberChange("stats", "health", -2, "", "red");
        }
        if(madAction === "smoke" && madUps.addiction.unlocked === false){
            madUps.addiction.smokingCounter[0]++;
            if(madUps.addiction.smokingCounter[0] >= madUps.addiction.smokingCounter[1]){
                madUps.addiction.unlocked = true;
                document.getElementById("addictionMadUp").style.display="block";
            }
        }else if (madAction === "smoke" && madUps.addiction.active === true){
            numberChange("stats", "health", -2, "", "red");
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

//mad upgrades
madUps={
    alcoholism:{
        string: "Alcoholism",
        description: ["Drinking can become a habit", "Cost: Drinking also reduces health.", "Benefit: West drinks often."],
        comment: "A foolish choice",
        unlocked: false,
        purchased:false,
        active: false,
        counter: [0,8],
        drinkingCounter: [0, 88],
        madMaintain: 0,
        func: alcoholism
    },
    addiction:{
        string: "Addiction",
        description: ["Sometimes the occasional puff isn't enough.", "Cost: Smoking also reduces health.", "Benefit: West smokes often."],
        comment: "A foolish choice",
        unlocked: false,
        purchased:false,
        active: false,
        counter: [0,8],
        smokingCounter: [0, 88],
        madMaintain: 0,
        func: addiction
    }
};

function alcoholism(){
    madUps.alcoholism.active = true;
    madUps.alcoholism.purchased = true;
    flashFade("alcoholismOneOff");
}
function addiction(){
    madUps.addiction.active = true;
    madUps.addiction.purchased = true;
    flashFade("addictionOneOff");
}
function autoMadAction(madAction) {
    //first checking for shard upgrades
    let upgradeKey = madAction === "drink" ? "functionalAlcoholic" : madAction === "smoke" ? "functionalAddict" : null;
    let madUpKey = madAction === "drink" ? "alcoholism" : madAction === "smoke" ? "addiction" : null;
    if (shardBuys.madActions[upgradeKey].purchased===true) {
        if (stats.madness.current <= madUps[madUpKey].madMaintain) return;
    }
    if (stats[madActions[madAction].costStat].current >= madActions[madAction].cost) {
        numberChange("stats", madActions[madAction].costStat, -madActions[madAction].cost, "blue", "red");
        if (stats.madness.current > madActions[madAction].benefit) {
            numberChange("stats", "madness", -madActions[madAction].benefit, "red", "blue");
        } else {
            numberChange("stats", "madness", -stats.madness.current, "red", "blue");
        }
        numberChange("stats", "health", -2, "", "red");
        document.getElementById(madAction + "Wrap").classList.add("madActPulse");
        setTimeout(() => document.getElementById(madAction + "Wrap").classList.remove("madActPulse"), 200);
    }
}


    	//=========================================
	// Build West and Stats HTML
	//=========================================
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
        
        
        
let statKeys = Object.keys(stats);
let actionKeys = Object.keys(actions);     
let madKeys = Object.keys(madActions);
let upgradeKeys = Object.keys(actionUpgrades);
let madUpsKeys = Object.keys(madUps);
function west(){      
    for(i=0;i<statKeys.length;i++){
            document.getElementById('statBox').innerHTML +=
            "<div class='westStatBox' id='" + statKeys[i] + "Box'>" +
            "<span id='" + statKeys[i] + "Text'>" + stats[statKeys[i]].string + "</span>" +
            "<span class='westNumbers'  id='" + statKeys[i] + "'></span>" +
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
            "<button class='menuItem' id='reset'>Reset</button>";
           // "<button class='menuItem' id='test'>Test</button>";
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
         "<div id='preachRow'>" +
         "<span id='preachText'>Preach</span>" +
        "<span id='preachWrapCost'>" + actions.preach.cost + "</span>" +
        "</div>";
    makeDreamChoices();
        //Action Upgrades
    for (i=0;i<upgradeKeys.length; i++){
        let actionColumn = upgradeKeys[i];
        let upgrades = Object.keys(actionUpgrades[actionColumn]);
        for(j=0;j<upgrades.length;j++){
            document.getElementById(actionColumn + "Column").innerHTML += 
                "<button class='actionUpgradeWraps' id='" + upgrades[j] + "Wrap'>" + actionUpgrades[actionColumn][upgrades[j]].string + "</button>";
            if(upgrades[j] === "sublimate"){
                document.getElementById("sublimateWrap").innerHTML = 
                     "<img class='actionPng' src='images/west/sublimate.jpg' alt='?'/>" +
                     "<div class= actionText>" + actionUpgrades[actionColumn][upgrades[j]].string + "</div>";
                document.getElementById("sublimateWrap").classList.replace("actionUpgradeWraps", "actionWraps");
            }
            if(upgrades[j] === "fiction"){
                    document.getElementById("fictionWrap").innerHTML = 
                         "<img class='actionPng' src='images/west/fiction.jpg' alt='?'/>" +
                         "<div class= actionText>" + actionUpgrades[actionColumn][upgrades[j]].string + "</div>";
                 document.getElementById("fictionWrap").classList.replace("actionUpgradeWraps", "actionWraps");
                }
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
    //madups
    for(i=0;i<madUpsKeys.length;i++){
            document.getElementById('madActionBox').innerHTML +=
                    "<button class='madUps' id='" +madUpsKeys[i] + "OneOff'>" +
                    "<span>" + madUps[madUpsKeys[i]].string + "</span>" +
                    "</button>";
            if(madUps[madUpsKeys[i]].purchased === true){
                document.getElementById(madUpsKeys[i] + "OneOff").style.display="none";
            }
    };
};   
west();


