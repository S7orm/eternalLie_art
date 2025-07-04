                                                        //=========================================
                                                                                               // The Cult
                                                        //=========================================
let cult = {
        faithful:{
            string: 'Faithful',
            description:["Men, women who have heard the call. They provide Love, Terror and Gold and increase the Cult's capacity for emotions. "],
            current: 100,
            purchased: 100,
            unplaced: 100,
            placed: 0,
            ticCounter: [0, 8],
            outMultipliers: [1.4, 0.8, 0.4],//love, terror, gold
            unlocked: false
        },
        chanters:{
            string: 'Chanters',
            description: ["Given scraps of writing from the Book, these cultists chant endlessly. They increase Love, the Cult's capacity for Love, and add to West's Charm."],
            current: 010,
            unplaced: 010,
            placed: 0,
            ticCounter: [0, 8],
            outMultiplier: 0.8,
            unlocked: false,
          active: false,
            cost: ['charm', 10]
        },
        sentinels:{
            string: 'Sentinels',
            cost: ['charm', 25],
            description:["Silent and dangerous, Sentinels increase Terror in the Faithful, the Cult's Capacity for Terror, and assist in Expeditions."],
            current: 010,
            unplaced: 010,
            placed: 0,
            ticCounter: [0, 8],
            outMultiplier: 0.8,
            unlocked: false,
          active: false,
            unlock: ['charm', 50]
        },
        priests:{
            string: 'Priests',
            description: ['Dedicated followers gifted a dangeous Tome, they can do many things.'],
            current: 8,
            unplaced: 8,
            placed: 0,
            altar: false,
            vaultActions: false,
            vaultAction: null,
            vaultCounter: 0,
            vaultNeeded: 4, 
            conversionCounter: 0, 
            conversionTicsNeeded: 88,
            recruitInnocents: false,
            convertFaithful: false
        },
        scribes:{
            string: 'Scribes',
            description: ['Priests tuned to channel lost wisdom through automatic writing. (produces Pages)'],
            current: 0,
            level: 1,
            ticCounter: [0, 4]
        },
        innocents:{
            string: 'Innocents',
            description: ['Spouses, children, and former loved ones, they are offered up by the Faithful. They may be turned to the cause or sacrificed to it.'],
            current: 0,
            chance: 10,
            unlocked: false
        },
        insane:{
            string: 'The Insane',
            description: ['The weakest fall to madness forever and are only useful as sacrifice to the Dark Gods.'],
            current: 000,
            unlocked: false,
          active: false,
            unlock: ['madness', 50]
        },
        hybrids:{
            string: 'Hybrids',
            cost: ['charm', 100],
            description: ['Human enough to pass in a crowd, but terrible to behold in a dark alley. (count as both Faithful and  Sentinel)'],
            current: 0,
            unplaced: 0,
            placed: 0,
            unlocked: false,
          active: false,
            unlock: ['charm', 500]
        }
};

                                                //=========================================
                                                                                // The Vault
                                                //=========================================
        
let vault = {
        love:{// love from faithful burn love to force them to unspeakable acts
            callString: 'love',
            string: 'Love',
            description: ['Idolatry, like true Love, is a potent tool.'],
            current: 10000000,
            unlocked: true,
            unlock: ['vision', 10]
        },
        terror:{
            callString: 'terror',
            string: 'Terror',
            description: ['While Love helps, Terror is essential.'],
            current: 1000000,
            unlocked: true,
            unlock: ['vision', 10]
        },
        gold:{ //spend as charm bonus or for one offs
            callString: 'gold',
            string: 'Gold',
            description: ['Gold always has its purpose.'],
            current:1000000000,
            unlocked: true,
            unlock: ['vision', 10]
        },
        flesh:{//feed to deep ones, build servitors
            callString: 'flesh',
            string: 'Flesh',
            description: ['The Natives used every part of the buffalo.'],
            current: 10000,
            unlocked: false
        },
        tomes:{
            callString: 'tomes',
            string: 'Tome',
            description: ['Found in forgotten places, these can be given to the Faithful to convert them into Priests.'],
            current: 10,
            unlocked: false,
          active: false,
            pageCounter: 0,
            pagesNeeded: 88,
            pageMultiplier: 4
        },
        ichor:{
            callString: 'ichor',
            string: 'Ichor',
            description: ['Concentrated Essence of Life itself.'],
            current: 10,
            unlocked: false
        },
        tyog:{
            callString: 'tomes',
            string: 'Tyog',
            description: ["T'yog can translate Rituals to motivate the Faithful."],
            current: 0,
            unlocked: false
        }
//        keys:{ //need a key to unlock a gate
//            callString: 'keys',
//            string: 'Key',
//            description: ['A key is a simple thing. What it unlocks could rip this world apart.'],
//            current: 0,
//            unlocked: false,
//            unlock: ['vision', 1000]
//        },
//        gates:{ //each gate opens the way for an outer god
//            callString: 'gates',
//            string: 'Gate',
//            description: ['Each larger than the last, Gates must be built from... must be built to open the way.'],
//            current: 0,
//            unlocked: false,
//            unlock: ['radiance', 100]
 //       }
};
let cultKeys = Object.keys(cult);
let vaultKeys = Object.keys(vault);

    	//=========================================
	// Build Cult and Vault
	//=========================================
        
function cultLoad(){   
    for(i=0;i<cultKeys.length; i++){
    document.getElementById('left').innerHTML +=
            "<div class='cultWraps' id='" + cultKeys[i] +"Wrap'><div class='ids'>" + cult[cultKeys[i]].string + "</div><div class='number' id='" + cultKeys[i] + "'>" + cult[cultKeys[i]].current + "</div>";  
    }
    for(i=0;i<vaultKeys.length; i++){
        let temp =  vaultKeys[i];
    document.getElementById('vault').innerHTML +=
            "<button class='vaultWraps' id='" + temp + "Wrap'>" +
            "<img class='vaultPng' src='images/vault/" + temp + ".jpg' alt='?'/>" +
            "<span class='vaultText'>" + vault[vaultKeys[i]].string + "</span>" +
            "<span class='vaultNum' id='" +temp + "'>" + vault[vaultKeys[i]].current + "</span>" +
            "</button>";
    
    }
        document.getElementById('faithfulWrap').style.display='block';
        document.getElementById('loveWrap').style.display='block';
        document.getElementById('terrorWrap').style.display='block';
        document.getElementById('goldWrap').style.display='block';
};
cultLoad();

                                                        //=========================================
                                                        //                                      Crafts 
                                                        //=========================================

//=========================
//                                      LoveCrafts
//=========================
let loveCrafts = { 
    adoration:{
        callString: 'adoration',
        string: 'Adoration',
        description:['Use their Love to appear more Charming.', 'Cost: Love '],
        func: adoration,  
        cost: 40,
        benefit: 8,
        unlocked: true,
        purchased: true,
        permanent: true
    },    
    terrorize:{
        callString: 'terrorize',
        string: 'Terrorize',
        description: ["We have such sights to show you.", 'Cost: Love '],
        func: 'vaultConversion',  
        vaultCost: 'love',        
        vaultBenefit: 'terror',    
        cost: 4,
        benefit: 2,
        unlocked: true,
        purchased: true,
        permanent: true
    },    
    requestGold:{
        callString: 'requestGold',
        string: 'Request Gold',
        description: ['While the Faithful will provide Gold and trinkets, it looks bad having to ask.', 'Cost: Love '],
        func: 'vaultConversion',  
        vaultCost: 'love',        
        vaultBenefit: 'gold',    
        cost: 4,
        benefit: 2,
        unlocked: true,
        purchased: true,
        permanent: true
    },
    convertChanter:{
        callString: 'convertChanter',
        string: 'Chanter Subjugation',
        description: ['Their endless Chanting enhances the Love of the Faithful.', 'Costs: Faithful 1, Love  ', 'Benefits: Idle Charm and Love'],
        func: cChant,
        comment: 'Almost as essential as the Faithful themselves. ( idle Charm and Love)',
        unlockText: 'Chanters?',
        lockCost: 'Vision: 24',
        unlockCost: 24,
        cost: 24,
        benefit: 1,
        multiplier: 24,
        shardMultiplier: 1,
        unlocked: true,
        purchased: false,
        permanent: true
    },
    basement:{
        callString: 'basement',
        string: 'School Basement',
        description: ['More private than the woods, offered up by the Faithful.', 'Cost: Love ', "Benefit: larger Altar Room"],
        func: basement,  
        cost: 848,
        unlocked: true,
        purchased: false,
        permanent: false
    },
    lodge:{
        callString: 'lodge',
        string: 'Masonic Lodge Hall',
        description: ['Their rituals are easily co-opted.', 'Cost: Love  ', "Benefit: larger Altar Room"],
        func: lodge,  
        cost: 4848,
        unlocked: false,
          active: false,
        purchased: false,
        permanent: false
    },
    cathedral:{
        callString: 'cathedral',
        string: 'Cathedral',
        description: ['With so much Love, there is no longer any need to hide.', 'Cost: 1 Priest, 44 Chanters, Love  ', "Benefit: larger Altar Room"],
        func: cathedral,  
        cost: 48484,
        unlocked: false,
          active: false,
        purchased: false,
        permanent: false
    },
    oakAltar:{
        callString: 'oakAltar',
        string: 'Carved Oak Altar',
        description: ['Carved with Love by the Faithful.', 'Cost: Love ', 'Benefit: Chanters adjacent to the Altar are twice as effective.'],
        func: oakAltar,  
        cost: 888,
        unlocked: false,
          active: false,
        purchased: false,
        permanent: false
    }
};

//===============================
//                                     Vault Conversions
//===============================
let vaultConversionInterval; // Stores the interval ID

function vaultConversionLoop(craft) {
        vaultConversionInterval = setInterval(() => {
            executeVaultConversion(craft); // Perform the action
    }, 400);
    document.getElementById(craft.callString + "Wrap").classList.add("vaultPulse");
    // Stop the loop on pointerup
    document.addEventListener('pointerup', () => stopVaultConversion(craft), { once: true });
}
function executeVaultConversion(craft){
    if(vault[craft.vaultCost].current >= craft.cost){
        numberChange("vault", craft.vaultCost, -craft.cost, "blue", "red");
        numberChange("vault", craft.vaultBenefit, craft.benefit, "blue", "red");
    }else{
        stopVaultConversion(craft);
    }
}

function stopVaultConversion(craft) {
    document.getElementById(craft.callString + "Wrap").classList.remove("vaultPulse");
    clearInterval(vaultConversionInterval);  
}

//===============================
//                                      LoveCrafts Functions
//===============================
function adoration(){
    if(vault.love.current >= loveCrafts.adoration.cost){
        numberChange('vault', 'love', -loveCrafts.adoration.cost, '#FF559D', 'red');
        numberChange('stats', 'charm',  loveCrafts.adoration.benefit, '#FFFF00', 'red');
    }
}

function cChant(){
    if(vault.love.current >=  loveCrafts.convertChanter.cost && cult.faithful.current >= loveCrafts.convertChanter.benefit){
        comment('Another joins the choir.');
        loveCrafts.convertChanter.multiplier+=8;
        numberChange('vault', 'love', -loveCrafts.convertChanter.cost, '#FF559D', 'red');
        numberChange('cult', 'faithful', -loveCrafts.convertChanter.benefit, 'green', 'red');
        numberChange('cult', 'chanters', loveCrafts.convertChanter.benefit, 'green', 'red');
    }
};

function basement(){
    if(vault.love.current >= loveCrafts.basement.cost){
        numberChange('vault', 'love', -loveCrafts.basement.cost, '', 'red');
        replaceGrid('basement');
        gridChosen = "basement";
        flashFade('basementOneOff');
        loveCrafts.basement.purchased = true;
        document.getElementById('altarRoomTab').innerText = "Basement";
        document.getElementById('altarRoomTitle').innerText = "School Basement";
        comment('Altar Room moved to School Basement.');
        goldCrafts.motel.unlocked = true;
        document.getElementById('motelOneOff').style.display='block';
    }
}
function lodge(){
    if(vault.love.current >= loveCrafts.lodge.cost){
        numberChange('vault', 'love', -loveCrafts.lodge.cost, '', 'red');
        replaceGrid('lodge');
        gridChosen = "lodge";
        flashFade('lodgeOneOff');
        loveCrafts.lodge.purchased = true;
        document.getElementById('altarRoomTab').innerText = "Lodge";
        document.getElementById('altarRoomTitle').innerText = "Masonic Lodge";
        comment('Altar Room moved to Masonic Lodge.');
        goldCrafts.mansion.unlocked = true;
        document.getElementById('compoundOneOff').style.display='block';
    }
}
function cathedral(){
    if(vault.love.current >= loveCrafts.cathedral.cost && cult.priests.current>=1 && cult.chanters.current>=44){
        numberChange('vault', 'love', -loveCrafts.cathedral.cost, '', 'red');
        numberChange('cult', 'priests', -1, '', 'red');
        numberChange('cult', 'chanters', -44, '', 'red');
        replaceGrid('cathedral');
        gridChosen = "cathedral";
        flashFade('cathedralOneOff');
        loveCrafts.cathedral.purchased = true;
        document.getElementById('altarRoomTab').innerText = "Cathedral";
        document.getElementById('altarRoomTab').innerText= "Obscene Cathedral";
        comment('Altar Room moved to center of town.');
    }
}
function oakAltar(){
    if(vault.love.current >= 888){
        numberChange('vault', 'love', -888, 'yellow', 'red');
        loveCrafts.oakAltar.purchased = true;
        altars.oak.purchased = true;
        flashFade('oakAltarOneOff');
        document.getElementById('oakWrap').style.display='flex';
        goldCrafts.marbleAltar.unlocked = true;
        setTimeout(() => {document.getElementById('marbleAltarOneOff').style.display='block';}, 1500);
        comment('Oak Altar available for use in Altar Room.');
    }
}

//========================
//                                      Terror
//========================
let terrorCrafts = {
    mesmerize:{
        callString: 'mesmerize',
        string: 'Mesmerize',
        description: ['One can force a semblance of Love.', ' Cost: Terror '],
        func: 'vaultConversion',  
        vaultCost: 'terror',        
        vaultBenefit: 'love',    
        cost: 4,
        benefit: 2,
        unlocked: true,
        purchased: true,
        permanent: true
    },
    demandGold:{
        callString: 'demandGold',
        string: 'Demand Gold',
        description: ['Exhort the Faithful to find wealth at any cost.', ' Cost: Terror '],
        func: 'vaultConversion',  
        vaultCost: 'terror',        
        vaultBenefit: 'gold',    
        cost: 4,
        benefit: 2,
        unlocked: true,
        purchased: true,
        permanent: true
    },
    demandFlesh:{//not available possibly unlocks after canibalism?
        callString: 'demandFlesh',
        string: 'Demand Flesh',
        description: ['Exhort the Faithful to find bodies at any cost.', ' Love -', 'Flesh +4','Terror Minimum: 444'],
        madMin: " Minimum Madness: 444",
        func: demandFlesh,  
        cost: 88,
        benefit: 4,
        unlocked: false,
          active: false,
        purchased: false,
        permanent: true
    },
    convertsentinel:{
        callString: 'convertsentinel',
        string: 'Enthrall Sentinel',
        description: ['Created through trepanning, gelding and occult ritual, their existence inspires Terror in the Faithful.', ' Cost: Faithful 1, Love '],
        madMin: " Minimum Madness: 48 ",
        comment: 'Just Man&#39;s inhumanity to Man I suppose. (idle Terror)',
        func: csentinel,
        unlockText: 'Sentinels?',
        lockCost: 'Vision: 48',
        unlockCost: 48,
        cost: 48,
        benefit: 1,
        multiplier: 48,
        shardMultiplier: 1,
        unlocked: true,
        purchased: false,
        permanent: true
    },
    sacrifice:{
        callString: 'sacrifice',
        string: 'Sacrifice Innocents',
        description:['Through a ritual of blood and madness, an innocent life is spent.', 'Cost: 1 Innocent ', 'Benefits: Terror, Flesh and Radiance', ' Terror Minimum: 88 '],
        madMin: " Minimum Madness: 88 ",
        func: sacrifice, 
        terrorMin: 88,
        cost: '',
        terrorMultiplier: 1,
        type: 'innocents',
        unlocked: false,
          active: false,
        purchased: false,
        permanent: true
    },
    maw:{
        callString: 'maw',
        string: 'Devouring Maw',
        description:['Waiting with open maw, Tsathoggua proves a picky eater. ', ' Ritual Requires 8 Sentinels, Cost: 16 Faithful', "Benefits: 44 Radiance, 484 Terror"],
        madMin: " Minimum Madness: 888",
        func: maw, 
        cost: '',
        unlocked: false,
          active: false,
        purchased: true,
        permanent: true
    },
    mass:{
        callString: 'mass',
        string: 'Black Mass',
        description:["Led by T'yog, the participants are brought to the heights even as Rhan winds her tendrils throughout.", " Cost: 16 Faithful, 16 Innocents ", " Benefits: 32 Flesh, 44 Radiance"],
        func: mass, 
        cost: '',
        unlocked: false,
          active: false,
        purchased: true,
        permanent: true
    },
    box:{
        callString: 'box',
        string: 'The Box',
        description:['An immersive experience which should bring individuals into the community.', 'Cost: 1 Innocent, Patience ', 'Benefit: 1 Faithful, 88 Terror', ' Terror Minimum: 248'],
        madMin: " Minimum Madness: 248",
        unlockText: 'The Box?',
        lockCost: 'Vision: 444',
        unlockCost: 444,
        func: box, 
        terrorMin: 248,
        cost: '',
        unlocked: true,
        purchased: false,
        permanent: true
    },
    breedingPits: {//grow innocents for flesh
        callString: 'breedingPits',
        string: 'Breeding Pits',
        description: ['Lead them into pens and let nature take its course.', 'Cost: Innocents ' , 'Benefits: Passive Terror and Innocent Growth', ' Terror Minimum: 444 '],
        madMin: " Minimum Madness: 444",
        func: pits,
        cost: 4,
        level: 0,
        shub: false,
        terrorMin: 444,
        terror: 44,
        counter: [0, 40],
        unlocked: false,
          active: false,
        purchased: true,
        permanent: true
    },
    compound:{
        callString: 'compound',
        string: 'Militarized Compound',
        description: ['We are done hiding.', 'Cost: Sentinels  ', "Benefit: larger Altar Room", "Minimum Terror 4444 "],
        madMin: " Minimum Madness: 888",
        madCost: 888,
        terrorCost: 4444,
        func: compound,  
        cost: 8,
        unlocked: false,
          active: false,
        purchased: false,
        permanent: false
    },
    silo:{
        callString: 'silo',
        string: 'Abandoned Nuclear Silo',
        description: ['The tunnels can hide any number of indescretions.', 'Cost: Sentinels ', "Benefit: larger Altar Room", "Minimum Terror 8888 "],
        madMin: " Minimum Madness: 4444",
        madCost: 4444,
        terrorCost: 8888,
        func: silo,  
        cost: 44,
        unlocked: false,
          active: false,
        purchased: false,
        permanent: false
    },
    obsidianAltar:{
        callString: 'obsidianAltar',
        string: 'Obsidian Altar',
        description: ["Mined from the depths, it isn't really obsidian but something darker. Terror Minimum: 444 ", ' Cost: Faithful ', " Benefit: Sentinals adjacent to the Altar are four times as effective."],
        func: obsidianAltar,  
        cost: 88,
        unlocked: false,
          active: false,
        purchased: false,
        permanent: false
    }
};
//================================
//                                     TerrorCrafts Functions
//================================

function csentinel(){
    if(vault.love.current >=  terrorCrafts.convertsentinel.cost && cult.faithful.current >= terrorCrafts.convertsentinel.benefit && madMin(48)){
        comment('Forever vigilant.');
        terrorCrafts.convertsentinel.multiplier+=8;
        numberChange('vault', 'love', -terrorCrafts.convertsentinel.cost, '#FF559D', 'red');
        numberChange('cult', 'faithful', -terrorCrafts.convertsentinel.benefit, 'green', 'red');
        numberChange('cult', 'sentinels', terrorCrafts.convertsentinel.benefit, 'green', 'red');
    }
}
  	//=======
	// Sacrifice
	//=======
        
let sacrificeTypes = {
    innocents: {
        string: 'Smother an Innocent',
        description: ['Through a ritual of blood and madness, an innocent life is spent. ', ' Cost: 1 Innocent', ' Benefits: Terror, Flesh and Radiance', ' Terror Minimum: 88'],
        madMin: "Minimum Madness: 44",
        mad: 44,
        unlocked: true,
        terrorMin: 44
    },  
    faithful: {
        string: 'Drown the Faithful',
        description: ['The greater the sacrifice, the greater the reward.', 'Cost: 1 Faithful', ' Benefits: Terror, Flesh and Radiance', ' Terror minimum: 88 '],
        madMin: "Minimum Madness: 88 ",
        mad: 88,
        unlocked: true,
        terrorMin: 88
    },  
    chanters: {
        string: "Slit a Chanter's Throat",
        description: ['Silence is Golden.', ' Cost: 1 Chanter', ' Benefits: Terror, Flesh and Radiance', ' Terror Minimum: 88'],
        madMin: "Minimum Madness: 88 ",
        mad: 88,
        unlocked: true,
        terrorMin: 88
    },  
    sentinels: {
        string: 'Retire a Sentinel',
        description: ['End its suffering.', ' Cost: 1 Sentinel', ' Benefits: Flesh and Radiance', ' Terror Minimum: 88'],
        madMin: "Minimum Madness: 88 ",
        mad: 88,
        unlocked: true,
        terrorMin: 44
    },  
    insane: {
        string: 'Cleanse the Insane',
        description: ['Probably better this way.', 'Cost: 1 Insane', 'Benefits: Terror, Flesh and Radiance', 'Terror Minimum: 22 '],
        madMin: "Minimum Madness: 22 ",
        mad: 22,
        unlocked: true,
        terrorMin: 22
    }
};
function sacrifice(rhan){
    let type = terrorCrafts.sacrifice.type;   
    let altarBump = 1;
    if(altars.lagh.current===true){
        altarBump = 2;
    }
if ((cult[type].current >= 1 &&( (vault.terror.current >= sacrificeTypes[type].terrorMin && madMin(sacrificeTypes[type].mad)) || rhan === 'rhan') ) ) {
      if(type === 'innocents'){
            numberChange('cult', 'innocents', -1, 'green', 'red');
            numberChange('stats', 'radiance', (1 * altarBump), 'blue', 'red');
            numberChange('vault', 'terror', (22 * terrorCrafts.sacrifice.terrorMultiplier), 'red', 'blue');
            comment("Not a great loss (-1 Innocent, +" + (1 * altarBump) + " Radiance, + " +(22 * terrorCrafts.sacrifice.terrorMultiplier) +" Terror)", 'red');
        }else if (type === 'faithful'){
            numberChange('cult', 'faithful', -1, 'green', 'red');
            numberChange('stats', 'radiance', (2 * altarBump), 'blue', 'red');
            numberChange('vault', 'terror', (88 * terrorCrafts.sacrifice.terrorMultiplier), 'red', 'blue');
            comment("They find this too close for comfort (-1 Faithful, +" + (2 * altarBump) + " Radiance, " + (88 * terrorCrafts.sacrifice.terrorMultiplier) +" Terror ", 'red');
            actions.preach.cost = Math.max((cult.faithful.current * actions.preach.multiplier), 4);
            document.getElementById('preachCost').innerHTML = actions.preach.cost;
            document.getElementById('preachWrapCost').innerHTML = actions.preach.cost;
        }else if (type === 'chanters'){
            numberChange('cult', 'chanters', -1, 'green', 'red');
            numberChange('stats', 'radiance', (4 * altarBump), 'blue', 'red');
            numberChange('vault', 'terror', (44 * terrorCrafts.sacrifice.terrorMultiplier), 'red', 'blue');
            comment("Silence is golden (-1 Chanter, +" + (4 * altarBump) + " Radiance, " + (44 * terrorCrafts.sacrifice.terrorMultiplier) +" Terror)", 'red');
            loveCrafts.convertChanter.cost =  Math.max(cult.chanters.current * loveCrafts.convertChanter.costMultiplier, 4);
            document.getElementById('convertChanterCost').innerHTML =  loveCrafts.convertChanter.cost;
        }else if (type === 'sentinels'){
            numberChange('cult', 'sentinels', -1, 'red', 'red');
            numberChange('stats', 'radiance', (1 * altarBump), 'blue', 'red');
            numberChange('vault', 'terror',  -(Math.min(vault.terror.current, 22)), 'red', 'blue');
            comment("Everyone seems ok with this (-1 Sentinel, +" + (1 * altarBump) + " Radiance, -" + (Math.min(vault.terror.current, 22)) +" Terror)", 'pink');
            terrorCrafts.convertsentinel.cost = Math.max(cult.sentinels.current * terrorCrafts.convertsentinel.costMultiplier, 22);
            document.getElementById('convertsentinelCost').innerHTML =  terrorCrafts.convertsentinel.cost;
        }else if (type === 'insane'){
            numberChange('cult', 'insane', -1, 'green', 'red');
            numberChange('stats', 'radiance', (2 * altarBump), 'blue', 'red');
            numberChange('vault', 'terror', (22 * terrorCrafts.sacrifice.terrorMultiplier), 'red', 'blue');
            comment("Rhan seems to like this one. (-1 Insane, +" + (2 * altarBump) + " Radiance, " + (22 * terrorCrafts.sacrifice.terrorMultiplier) +" Terror)", 'red');
        }else{
        };
        numberChange('vault', 'flesh', 1, 'red', 'grey');
        relics.rhanRelic.hungerCounter = 0;
        }
};
let sacrificeKeys = Object.keys(sacrificeTypes);
// Toggle the dropdown menu/
// / Helper function to find sac buttons
function isDescendant(elements, target) {
  return Array.from(elements).some(element => element.contains(target));
}
function toggleSacrificeTypes() {
    let t = document.getElementById("sacrificeTypes").style.display;
    if(t === 'none' || t === ''){
        document.getElementById("sacrificeTypes").style.display = 'block';
    }else{
        document.getElementById("sacrificeTypes").style.display = 'none';
    }
}

function sacrificeType(typeButton) {
    type = typeButton.slice(0, -3);
     let temp = sacrificeTypes[type].string;
    document.getElementById("sacrifice").innerHTML = temp;
    terrorCrafts.sacrifice.type = type;
    document.getElementById("sacrificeDesc").innerHTML = sacrificeTypes[type].description[0];
    document.getElementById("sacrificeTerror").innerHTML = sacrificeTypes[type].description[3];
    document.getElementById("sacrificecost").innerHTML = sacrificeTypes[type].description[1];
    document.getElementById("sacrificeBenefit").innerHTML = sacrificeTypes[type].description[2];
    document.getElementById("sacrificeMadMin").innerHTML = sacrificeTypes[type].madMin;
    toggleSacrificeTypes();
}
//make the sacrifice buttons
function makeSacrificeChoices(){ //calling in crafts creation
    var sacrifice = document.getElementById("sacrificeWrap");
    var btn = document.createElement("button");
    btn.id = "sacToggle";
    btn.innerHTML  = "&#9662;";
    sacrifice.insertAdjacentElement("afterend", btn);
    var typesBox = document.createElement("div"); //div which holds sac options
    typesBox.id = "sacrificeTypes";
    var btnloc = document.getElementById("sacToggle");
    btnloc.insertAdjacentElement('afterend', typesBox);
    var typeBox = document.getElementById("sacrificeTypes");
    for(i=0;i<sacrificeKeys.length;i++){
        var temp = document.createElement('button');
        temp.classList.add("sacrificeType");
        temp.id = sacrificeKeys[i] + "Sac";
        temp.innerHTML = sacrificeTypes[sacrificeKeys[i]].string;
        typeBox.appendChild(temp);
        }
    };

function rhanSac(){
    let typeStorage = terrorCrafts.sacrifice.type;
    let temp;
    if(cult.insane.current >= 1){
        temp = 'insane';
    }else{
        let rhanKeys = Object.keys(sacrificeTypes);
        do {
            temp = rhanKeys[Math.floor(Math.random() * rhanKeys.length)];
        } while (cult[temp].current < 1); //ensures a sac target
    }
        terrorCrafts.sacrifice.type = temp;
    comment('Rhan was hungry...(random sacrifice can be prevented with regular feeding.)', 'red');
    sacrifice('rhan');
    terrorCrafts.sacrifice.type = typeStorage;
}
    
function demandFlesh(){
    if(madMin(444)){
        
    }
} 

function maw(){
    if(cult.faithful.current>=16 && cult.sentinels.current >=8 && madMin(888)){
        numberChange('cult', 'faithful', -16, '', 'red');
        numberChange('vault', 'terror', 484, 'red', '');
        numberChange('stats', 'radiance', 44, 'blue', '');
        relics.tsathRelic.terror =0;
        relics.tsathRelic.hungerCounter[0]=0;
        comment("He leaves nothing but the bones. (+44 Radiance Tsathoggua Terror loop reset)");
    }
}

function mass(){
    if(cult.faithful.current>=16 && cult.innocents.current >=16){
        numberChange('cult', 'faithful', -16, '', 'red');
        numberChange('cult', 'innocents', -16, '', 'red');
        numberChange('vault', "flesh", +32, 'red', 'red');
        numberChange('stats', 'radiance', 44, 'blue', '');
        relics.rhanRelic.hungerCounter=0;
        comment("Rhan is sated. (+32 Flesh, +44 Radiance)");
    }
}

function box() {
    if (cult.innocents.current >= 1 && vault.terror.current >= 248 && madMin(248)) {
        numberChange('cult', 'innocents', -1, '', 'red');
        numberChange('vault', 'terror', 88, 'red', 'red');
        var boxCry = new Audio("audio/box.mp3");
        plays(boxCry);
        // Create a progress bar if it doesn't already exist
        let progressBar = document.getElementById('box-progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.id = 'box-progress-bar';
            document.getElementById('boxWrap').appendChild(progressBar);
        }
        let boxSpan = document.getElementById("box");
        let totalDuration = 16000; // Total duration in milliseconds (16 seconds)

        // Disable the button and start the progress bar
        document.getElementById("boxWrap").classList.add("disable-events");
        progressBar.style.width = '0';  // Reset progress bar
        boxSpan.textContent = `The Box (${(totalDuration / 1000).toFixed(0)}s)`;  // Initial text
        let elapsedTime = 0;  // Track elapsed time
        // Flash background colors every second
        let flashColors = ["red", "yellow", "white"];
        let flashIndex = 0;
        let flashInterval = setInterval(() => {
            progressBar.style.backgroundColor = flashColors[flashIndex];
            flashIndex = (flashIndex + 1) % flashColors.length; // Cycle through colors
        }, 100); // Change color every 250 milliseconds
        let interval = setInterval(() => {
            elapsedTime += 100; // Increment elapsed time by 100ms
            boxSpan.textContent = `The Box ${((totalDuration - elapsedTime) / 1000).toFixed(0)}s`;  // Update text with countdown
            progressBar.style.width = `${(elapsedTime / totalDuration) * 100}%`;  // Update progress bar
            if (elapsedTime >= totalDuration) {
                clearInterval(interval);
                clearInterval(flashInterval); // Stop flashing
                progressBar.style.width = '100%';  // Complete the progress bar
                boxSpan.textContent = "The Box";  // Reset the text
                // Perform number changes after 16 seconds
                numberChange('cult', 'faithful', 1, 'blue', '');
                document.getElementById("boxWrap").classList.remove("disable-events");
                // Remove the progress bar from the DOM
                progressBar.remove(); 
                // Play oven ding sound here if needed
                // Example: new Audio('oven-ding-sound.mp3').play();
            }
        }, 100);  // Update every 100 milliseconds
    }
}



function pits(){
    if(cult.innocents.current >=  terrorCrafts.breedingPits.cost && vault.terror.current >= 444 && madMin(444)){
        numberChange('cult', 'innocents', - terrorCrafts.breedingPits.cost, 'blue', 'red');
        terrorCrafts.breedingPits.cost = terrorCrafts.breedingPits.cost * 2; 
        terrorCrafts.breedingPits.level++;
        document.getElementById('breedingPitsDesc').innerHTML = "Current stock produces an Innocent every " + Math.ceil(40/terrorCrafts.breedingPits.level) + " seconds.";
        document.getElementById('breedingPitsCost').innerHTML =  terrorCrafts.breedingPits.cost;
        document.getElementById('breedingPitsBenefit').innerHTML = "Increasing the herd size will produce an Innocent every " + Math.ceil(40/(terrorCrafts.breedingPits.level + 1)) + " seconds(+44 Terror).";
        if(terrorCrafts.breedingPits.shub === true){
            document.getElementById('breedingPitsDesc').innerHTML = "Iä! Current stock produces 4 Innocents every " + Math.ceil(40/terrorCrafts.breedingPits.level) + " seconds.";
            document.getElementById('breedingPitsBenefit').innerHTML = "Increasing the herd size will produce Innocents every " + Math.ceil(40/(terrorCrafts.breedingPits.level + 1)) + " seconds(+88 Terror).";
        }
    }
}

function compound(){
    if(cult.sentinels.current >= terrorCrafts.compound.cost && vault.terror.current >= 4444 && madMin(888)){
        numberChange('cult', 'sentinels', -terrorCrafts.compound.cost, '', 'red');
        replaceGrid('compound');
        gridChosen = "compound";
        flashFade('compoundOneOff');
        terrorCrafts.compound.purchased = true;
        document.getElementById('altarRoomTab').innerText = "Compound";
        document.getElementById('altarRoomTitle').innerText = "Militarized Compound";
        comment('Altar Room moved to Militarized Compound.');
        goldCrafts.mansion.unlocked = true;
        document.getElementById('mansionOneOff').style.display='block';
    }
}
function silo(){
    if(cult.sentinels.current >= terrorCrafts.silo.cost && vault.terror.current >= 8888 && madMin(4444)){
        numberChange('cult', 'sentinels', -terrorCrafts.silo.cost, '', 'red');
        replaceGrid('silo');
        gridChosen = "silo";
        flashFade('siloOneOff');
        terrorCrafts.silo.purchased = true;
        document.getElementById('altarRoomTab').innerText = "Silo";
        document.getElementById('altarRoomTitle').innerText = "Nuclear Silo";
        comment('Altar Room moved to Abandoned Nuclear Silo.');
        loveCrafts.cathedral.unlocked = true;
        document.getElementById('cathedralOneOff').style.display='block';
    }
}
function obsidianAltar(){
    if(cult.faithful.current >= 8 && vault.terror.current >444){
        numberChange('cult', 'faithful', -8, 'yellow', 'red');
        flashFade('obsidianAltarOneOff');
        terrorCrafts.obsidianAltar.purchased = true;
        altars.obsidian.purchased = true;
        document.getElementById('obsidianWrap').style.display='flex';
        goldCrafts.ivoryAltar.unlocked = true;        
        setTimeout(() => {document.getElementById('ivoryAltarOneOff').style.display='block';}, 1500);
        comment('Obsidian Altar available in Altar Room.');
    }  
}
//======================
//                                      Gold
//======================
let goldCrafts = {
    gifts:{
        callString: 'gifts',
        string: 'Lavish Gifts',
        description: ['Spend Gold to please the Faithful.', 'Cost: Gold '],
        func: 'vaultConversion',  
        vaultCost: 'gold',        
        vaultBenefit: 'love',    
        cost: 4,
        benefit: 2,
        unlocked: true,
        purchased: true,
        permanent: true
    },
    tithe:{
        callString: 'tithe',
        string: 'Tithe Toggle',
        description: ['Tithing is a time honored tradition. (1/8th Love converted into less Gold)'],
        unlockText: 'Tithing?',
        lockCost: 'Vision: 88 ',
        func: titheToggle,
        timeCounter: [0,4],
        toggle: false,
        comment: 'Everyone hates the tax man. (Gold at the cost of Love. Can be toggled.)',
        unlockCost: 88,
        unlocked: true,
        purchased: false,
        permanent: true
    },
    expedition:{
        callString: 'expedition',
        string: 'Expeditions?',
        description: ['Preparations are essential. Supplies must be gathered.', 'Cost: Gold 44'],
        func: expedition,
        unlocked: true,
        purchased: false,
        permanent: false
    },
    motel:{
        callString: 'motel',
        string: 'Seedy Motel',
        description: ['Old and ugly, it provides great cover and substantial space.', 'Cost: Gold ', "Benefit: larger Altar Room"],
        func: motel,  
        cost: 2488,
        unlocked: false,
          active: false,
        purchased: false,
        permanent: false
    },
    mansion:{
        callString: 'mansion',
        string: 'Isolated Mansion',
        description: ['Worth its weight in gold for the privacy it offers.', 'Cost: Gold ', "Benefit: larger Altar Room"],
        func: mansion,  
        cost: 84848,
        unlocked: false,
          active: false,
        purchased: false,
        permanent: false
    },
    marbleAltar:{
        callString: 'marbleAltar',
        string: 'Marble Altar',
        description: ['Functionally the same altar, but more impressive.', 'Cost: Gold ', "Benefit: Priests adjacent to the Altar are twice as effective."],
        func: marbleAltar,  
        cost: 4848,
        unlocked: false,
          active: false,
        purchased: false,
        permanent: false
    },
    ivoryAltar:{
        callString: 'ivoryAltar',
        string: 'Ivory Capstone',
        description: ['This flagrant display of wealth elicits better donations.', 'Cost: Gold ', "Benefit: Priests adjacent to the Altar are four times as effective and other Priests are twice as effective."],
        func: ivoryAltar,  
        cost: 8484,
        unlocked: false,
          active: false,
        purchased: false,
        permanent: false
    }
};
//=======================
//                                     GoldCrafts
//=======================

function expedition(){
    if(vault.gold.current >= 44){
        numberChange('vault', 'gold', -44, 'yellow', 'red');
        document.getElementById('expeditionsTab').style.display = 'block';
        document.getElementById('waxWrap').style.display = 'block';
        document.getElementById('cryptWrap').style.display = 'block';
        document.getElementById('towerWrap').style.display = 'block';
        document.getElementById('passageWrap').style.display='block';
        document.getElementById('estateWrap').style.display = 'block';
        flashFade('expeditionOneOff');
        eventBox("images/eventImages/expeditions.jpg", "Far off places...", "Having gathered supplies and weathered maps, West is driven to seek out the lost and isolated places where secrets may be uncovered. (Expeditions unlocked)");
        comment('You must find what was lost.', 'lightgreen', 'ex');
        flash('expeditionsTab', 'lightgreen', 'white');
        goldCrafts.expedition.purchased = true;
        domUnlocks.expeditions = true;
        world.wax.unlocked = true;
        world.crypt.unlocked = true;
        world.tower.unlocked = true;
        world.estate.unlocked = true;
    }
}
function titheToggle(){
    if(goldCrafts.tithe.toggle === false){
    goldCrafts.tithe.toggle = true;
    document.getElementById('titheToggle').style.backgroundColor='green';
    }else{
    goldCrafts.tithe.toggle = false;
    document.getElementById('titheToggle').style.backgroundColor='red';
    }
}
function tithe(){
    if(vault.love.current>=16){
        if(goldCrafts.tithe.timeCounter[0] < goldCrafts.tithe.timeCounter[1]){
            goldCrafts.tithe.timeCounter[0]++;
        }else{
            goldCrafts.tithe.timeCounter[0] = 0;
            let delta = vault.love.current/8;
            numberChange('vault', 'love', -Math.floor(delta), 'pink', 'red');
            numberChange('vault', 'gold', Math.floor(delta/4), 'gold', 'red');
        }
    }
}
function addTithe(){//called at crafts creation
    let titheW = document.getElementById('titheWrap');
    const button = document.createElement("button");
    button.textContent = " ";
    button.style.display='none';
    button.id="titheToggle"; // Apply the CSS class for the button
    titheW.appendChild(button);
    }
function motel(){
    if(vault.gold.current >= goldCrafts.motel.cost){
        numberChange('vault', 'gold', -goldCrafts.motel.cost, '', 'red');
        replaceGrid('motel');
        gridChosen = "motel";
        flashFade('motelOneOff');
        goldCrafts.motel.purchased = true;
        document.getElementById('altarRoomTab').innerText = "Motel";
        document.getElementById('altarRoomTitle').innerText = "Motel Courtyard";
        comment('Altar Room moved to Motel Courtyard.');
        loveCrafts.lodge.unlocked = true;
        document.getElementById('lodgeOneOff').style.display='block';
    }
}
function mansion(){
    if(vault.gold.current >= goldCrafts.mansion.cost){
        numberChange('vault', 'gold', -goldCrafts.mansion.cost, '', 'red');
        replaceGrid('mansion');
        gridChosen = "mansion";
        flashFade('mansionOneOff');
        goldCrafts.mansion.purchased = true;
        document.getElementById('altarRoomTab').innerText = "Mansion";
        document.getElementById('altarRoomTitle').innerText = "Isolated Mansion";
        comment('Altar Room moved to Isolated Mansion.');
        terrorCrafts.silo.unlocked = true;
        document.getElementById('siloOneOff').style.display='block';
    }
}

function marbleAltar(){
    if(vault.gold.current >= 4848){
        numberChange('vault', 'gold', -4848, 'yellow', 'red');
        flashFade('marbleAltarOneOff');
        goldCrafts.marbleAltar.purchased = true;
        altars.marble.purchased = true;
        document.getElementById('marbleWrap').style.display='flex';
        terrorCrafts.obsidianAltar.unlocked = true;        
        setTimeout(() => {document.getElementById('obsidianAltarOneOff').style.display='block';}, 1500);
        comment('Marble Altar available in Altar Room.');
    }    
}

function ivoryAltar(){
    if(vault.gold.current >= 8484){
        numberChange('vault', 'gold', -8484, 'yellow', 'red');
        flashFade('ivoryAltarOneOff');
        goldCrafts.ivoryAltar.purchased = true;
        altars.ivory.purchased = true;
        document.getElementById('ivoryWrap').style.display='flex';
        fleshCrafts.boneAltar.unlocked = true;        
        setTimeout(() => {document.getElementById('boneAltarOneOff').style.display='block';}, 1500);
        comment('Ivory Altar available in Altar Room.');
    }    
}
//=======================
//                                      Flesh
//=======================

let fleshCrafts = {
    leatherBinding: {
        callString: 'leatherBinding',
        string: 'Leather Bound Tomes',
        description: ['For a true Tome to be forged, it must be bound in Flesh. ', 'Cost: Pages 88 Flesh '], 
        madMin: "Minimum Madness: 88 ",
        unlockText: 'Leather?',
        lockCost: 'Vision: 88',
        unlockCost: 88,
        func: leatherBinding,
        cost: 8,
        unlocked: true,
        purchased: false,
        permanent: true,
        tomeList: [ 'dzyan', 'kult', 'hsan', 'alch', 'dhol', 'vermin', 'eibon', 'damn', 'necr']
    },
    cannibalism : {
        callString: 'cannibalism',
        string: 'Cannibalism',
        description: ['Some hungers go deeper. ', 'Cost: Flesh ', 'Benefits: Health, Madness, and Terror'],
        madMin: "Minimum Madness: 484",
        func: cannibalism,
        cost: 1,
        tentacle: false,
        unlocked: false,
          active: false,
        purchased: false,
        permanent: true
    },
    deepTrade:{
        callString: 'deepTrade',
        string: 'Trade with Deep Ones.',
        description: ['The need is ever growing. ', 'Cost: Flesh ', 'Benefit: Gold '],
        madMin: "Minimum Madness: 888",
        func: deepTrade,
        cost: 2,
        benefit: 444,
        multiplier: 4,
        unlocked: false,
          active: false,
        purchased: true,
        permanent: true
    },
    sculpt:{
        callString: 'sculpt',
        string: 'Sculpture',
        description: ['Create Terrifying Artwork for the Museum. ', 'Cost: Flesh ', 'Benefit: Gold 444'],
        madMin: "Minimum Madness: 248",
        comment: 'reminiscent of Geiger...',
        func: sculpt,
        cost: 8,
        benefit: 444,
        unlockText: 'Art?',
        lockCost: 'Vision: 164',
        unlockCost: 164,
        unlocked: true,
        purchased: false,
        permanent: true
    },
    dreadRevel: {
        callString: 'dreadRevel',
        string: 'Dread Revel',
        description: ['Antagonize the Chosen with unique party guests. ',  'Cost: Flesh 16, Love -', 'Benefit: +848 Terror'],
        madMin: "Minimum Madness: 444",
        func: dreadRevel,
        unlockText: 'Revelry?',
        lockCost: 'Vision: 444',
        unlockCost: 444,
        fleshCost: 16,
        cost: 484,
        benefit: 848,
        unlocked: true,
        purchased: false,
        permanent: true
    },
    transmute:{
        callString: 'transmute',
        string: 'Transmute',
        description: ['The Health benefits are amazing. ', 'Cost: Flesh ', 'Benefit: Ichor '],
        madMin: "Minimum Madness: 888 ",
        comment: 'How inspired! (+1 Ichor)',
        func: transmute,
        cost: 8,
        benefit: 1,
        unlocked: false,
          active: false,
        purchased: true,
        permanent: true
    },
    robes:{
        callString: 'robes',
        string: 'Ceremonial Robes',
        description: ["Woven with gold thread and covered in arcane sigils, the material still bears distinctive scars and tatoos.", 'Cost: Flesh ', "Benefit: Doubles Terror from Faithful."],
        madMin: "Minimum Madness: 888",
        func: bloodAltar,  
        cost: 16,
        unlocked: false,
          active: false,
        purchased: false,
        permanent: false
    },
    bloodAltar:{
        callString: 'bloodAltar',
        string: 'Blood Stained Slab',
        description: ["The stains are a constant reminder.", 'Cost: Flesh ', "Benefit: Sentinals adjacent to the Altar are twice as effective."],
        madMin: "Minimum Madness: 88",
        func: bloodAltar,  
        cost: 4,
        unlocked: true,
        purchased: false,
        permanent: false
    },
    boneAltar: {
        callString: 'boneAltar',
        string: 'Bone Altar Stone',
        description: ['A finely wrought lattice of bone covering the Altar is a terrifying thing to behold.', 'Cost 88 Flesh', "Benefit: Sentinals adjacent to the Altar are four times as effective and other Sentinals are twice as effective."],
        madMin: "Minimum Madness: 888",
        func: boneAltar,
        cost: 88,
        unlocked: false,
          active: false,
        purchased: false,
        permanent: false
    }
};
//===============================
//                                      FleshCrafts Actions
//===============================



function getTome() {
  if( fleshCrafts.leatherBinding.tomeList.length === 0) {
    return null;
  }
  const Tome = fleshCrafts.leatherBinding.tomeList[0];
  // Remove the first item from the array
  fleshCrafts.leatherBinding.tomeList.shift();
  return Tome;
}
function leatherBinding(){
    if(vault.flesh.current>= fleshCrafts.leatherBinding.cost && vault.tomes.pageCounter >= vault.tomes.pagesNeeded && madMin(88)){
        numberChange('vault', 'flesh', -fleshCrafts.leatherBinding.cost, 'red', 'red');
        fleshCrafts.leatherBinding.cost = Math.ceil(fleshCrafts.leatherBinding.cost * 1.4);
        vault.tomes.pageCounter -= vault.tomes.pagesNeeded;
        vault.tomes.pagesNeeded =  Math.ceil(vault.tomes.pagesNeeded * 2.4);
        document.getElementById('pages').innerHTML = Math.floor(vault.tomes.pageCounter);
        document.getElementById('leatherBindingcost').innerHTML = 'Cost: ' + vault.tomes.pagesNeeded  + ' Pages, Flesh: ';
        document.getElementById('leatherBindingCost').innerHTML = fleshCrafts.leatherBinding.cost;
        const Tome = getTome();
        if(Tome){
        actionUpgrades.study[Tome].unlocked = true;
        document.getElementById(Tome + "Wrap").style.display='block';
        comment('The completed Tome hums slightly and is warm to the touch. (Tome ready for translation in West tab)', 'blue');
        }else{
        numberChange('vault', 'tomes', 1, 'blue', 'red');
        studyMultiplier();
        madCapIncrease();
        comment("There are no more unique Tomes to find.");
        }
    }
}
function cannibalism(){
    if(vault.flesh.current >=1 && madMin(484)){
        numberChange('vault', 'flesh', -1, 'red', 'red');
        numberChange('stats', 'madness', 44, 'red', 'blue');
        numberChange('stats', 'health', 88, 'blue', 'red');
        if(fleshCrafts.cannibalism.tentacle === true){
        numberChange('stats', 'radiance', 1, 'blue', 'red');
        numberChange('vault', 'terror', 444, 'red', 'green');
        comment("Where does the little guy hide when he's not eating? (Madness +44 Terror +444, Health +88 Radiance +1)");
        }else{
        numberChange('vault', 'terror', 88, 'red', 'green');
        comment('Waste not, want not (Madness +44 Terror +88, Health +88)');
        }
    }
}
function deepTrade(){
    if(vault.flesh.current >= fleshCrafts.deepTrade.cost && madMin(888)){
        numberChange('vault', 'flesh', -fleshCrafts.deepTrade.cost, 'red', 'red');
        numberChange('vault', 'gold', fleshCrafts.deepTrade.benefit, 'yellow', 'red');
        fleshCrafts.deepTrade.cost = fleshCrafts.deepTrade.cost * 4;
        fleshCrafts.deepTrade.benefit = fleshCrafts.deepTrade.benefit * 2;
        document.getElementById('deepTradeCost').innerHTML = fleshCrafts.deepTrade.cost;
        document.getElementById('deepTradeBenefit').innerHTML = "Benefit: Gold " + fleshCrafts.deepTrade.benefit;
        comment('As the Deep Ones sink beneath the waves, oddly carved chests begin to wash ashore. ( +' + fleshCrafts.deepTrade.benefit + ' Gold)');
    }
}

function sculpt(){
    if(vault.flesh.current >=fleshCrafts.sculpt.cost && madMin(248)){
        numberChange('vault', 'flesh', -fleshCrafts.sculpt.cost, 'red', 'red');
        numberChange('vault', 'terror', (fleshCrafts.sculpt.cost * 4), 'red', 'blue');
        numberChange('vault', 'gold', fleshCrafts.sculpt.benefit, 'yellow', 'red');
        fleshCrafts.sculpt.cost = Math.floor(fleshCrafts.sculpt.cost * 1.2);
        fleshCrafts.sculpt.benefit = Math.floor(fleshCrafts.sculpt.benefit * 1.2);
        document.getElementById('sculptCost').innerHTML = fleshCrafts.sculpt.cost;
        document.getElementById('sculptBenefit').innerHTML = "Benefit: Gold: " + fleshCrafts.sculpt.benefit;
        comment('Stunning use of the media.');
    }
}

function dreadRevel(){
    if(vault.flesh.current >= fleshCrafts.dreadRevel.fleshCost && vault.love.current >= fleshCrafts.dreadRevel.cost && madMin(444)){
        numberChange('vault', 'flesh', -fleshCrafts.dreadRevel.fleshCost, 'red', 'red');
        numberChange('vault', 'love', -fleshCrafts.dreadRevel.cost, 'pink', 'red');
        numberChange('vault', 'terror', fleshCrafts.dreadRevel.benefit, 'red', 'red');
        comment("The party is quite a grave affair.(-" + fleshCrafts.dreadRevel.fleshCost + " Flesh, -" + fleshCrafts.dreadRevel.cost + " Love, +" + fleshCrafts.dreadRevel.benefit + " Terror)");
        fleshCrafts.dreadRevel.fleshCost *= Math.floor(fleshCrafts.dreadRevel.fleshCost*1.4);
        fleshCrafts.dreadRevel.cost *=Math.floor(fleshCrafts.dreadRevel.cost*1.4);
        fleshCrafts.dreadRevel.benefit *=Math.floor(fleshCrafts.dreadRevel.benefit*1.4);
        document.getElementById('leatherBindingcost').innerHTML = 'Cost: ' + fleshCrafts.dreadRevel.fleshCost  + ' Flesh,  ';
        document.getElementById('leatherBindingCost').innerHTML = fleshCrafts.dreadRevel.cost + " Love";
        document.getElementById('leatherBindingBenefit').innerHTML = "Benefit: -" + fleshCrafts.dreadRevel.benefit + " Terror";

    }
}

function transmute(){
    if(vault.flesh.current>=fleshCrafts.transmute.cost && madMin(888)){
        numberChange('vault', 'flesh', -fleshCrafts.transmute.cost, '', 'red');
        numberChange('vault', 'ichor', fleshCrafts.transmute.benefit, 'blue', 'red');
        if(vault.ichor.unlocked === false){
            vault.ichor.unlocked = true;
            document.getElementById('ichorWrap').style.display='block';
        }
    }
}

function robes(){
    if(vault.flesh.current >= 16 && madMin(888)){
        numberChange('vault', 'flesh', -16, 'yellow', 'red');
         fleshCrafts.robes.purchased = true;
        flashFade('robesOneOff');
        cult.faithful.outMultipliers[1] *=2;
        comment('Probably should have used more lotion on that. (Faithful produce twice as much Terror.)');
    }
}

function bloodAltar(){
    if(vault.flesh.current >= 4 && madMin(88)){
        numberChange('vault', 'flesh', -4, 'yellow', 'red');
         fleshCrafts.bloodAltar.purchased = true;
        altars.blood.purchased = true;
        flashFade('bloodAltarOneOff');
        document.getElementById('bloodWrap').style.display='flex';
        loveCrafts.oakAltar.unlocked = true;
        setTimeout(() => {document.getElementById('oakAltarOneOff').style.display='block';}, 1500);
        comment('Blood Stained Altar available for use in Altar Room.');
    }
}

function boneAltar(){
    if(vault.flesh.current >= 88 && madMin(888)){
        numberChange('vault', 'flesh', -88, 'yellow', 'red');
        flashFade('boneAltarOneOff');
        fleshCrafts.boneAltar.purchased = true;
        altars.bone.purchased = true;    
        document.getElementById('boneWrap').style.display='flex';
        comment('Bone Altar available in Altar Room.');
    }
}
 
//=======================
//                                      TomeCrafts
//=======================

tomeCrafts = {
    ordain:{
        callString: 'ordain',
        string: 'Ordain Priest',
        description: ['Priests can do many things, with enough imagination.', 'Cost: Faithful 1, Tome 1, Gold '],
        func: ordain,
        cost: 444,
        costMultiplier: 2.4,
        unlocked: true,
        purchased: true,
        permanent: true
    },
    inn:{
        callString: 'inn',
        string: 'Outreach',
        description: ['Priests lure Innocents into the Flock up to 4x the number of Faithful. The time taken is related to the number of Priests.', 'Cost: 248 Vision, 248 Charm '],
        func: unlockPriestInn,
        cost: '',
        unlocked: true,
        purchased: false,
        permanent: false
    },
    priestVaultActions:{
        callString: 'priestVaultActions',
        string: 'Vault Conversions',
        description: ['Priests can be taught to convert Love, Terror, and Gold into each other much like tithing. Gain/Loss ratio tied to Priest count.', 'Cost: 484 Vision, 4 Chanters, 8 Faithful, 4 Sentinels '],
        func: unlockPriestVault,
        cost: '',
        unlocked: true,
        purchased: false,
        permanent: false
    },
    evangelism:{
        callString: 'evangelism',
        string: 'Evangelical Priests',
        description: ['Priests can be taught to fleece the Faithful in the Altar Room.(Priests will produce Gold placement bonuses)', 'Cost: 848 Vision, 4848 Gold '],
        func: evangelism,
        cost: '',
        unlocked: true,
        purchased: false,
        permanent: false
    },
    faith:{
        callString: 'faith',
        string: 'Indoctrination',
        description: ['Priests convert Innocents into Faithful once the Innocent capacity has been reached. More Priests decreases time.', 'Cost: 8484 Vision, 1 Tome '],
        func: unlockPriestFaith,
        cost: '',
        unlocked: true,
        purchased: false,
        permanent: false
    },
    enscribe:{
        callString: 'enscribe',
        string: 'Scribe Attunement',
        description: ["A Priest may be further attuned to the Gods, though the result isn't attractive and requires attendants. Scribes recieve lost wisdom through automatic writing. (passive Page creation)", "Cost: 1 Priest, 4 Faithful, "," Radiance Benefit: 1 Scribe "],
        unlockText: 'Scribe?',
        lockCost: 'Vision: 24842',
        unlockCost: 24842,
        func: enscribe,
        cost: 44,
        unlocked: false,
          active: false,
        purchased: false,
        permanent: true
    }
};



//=============================
//                                      TomeCrafts actions
//=============================
function pages(){
            document.getElementById('tomesBox').innerHTML+=
                "<div id='pagesDiv'>" +
                "<span id='pagesTitle'>Loose Pages: </span>" +
                "<span id='pages'>0</span>" +
                "</div";
}
function ordain(){ 
    if(cult.faithful.current>0 && vault.tomes.current>0 && vault.gold.current >= tomeCrafts.ordain.cost){
        numberChange('cult', 'faithful', -1, 'blue', 'red');
        numberChange('cult', 'priests', 1, 'blue', 'red');
        numberChange('vault', 'gold', -tomeCrafts.ordain.cost, 'yellow', 'red');
        numberChange('vault', 'tomes', -1, 'blue', 'red');
        tomeCrafts.ordain.cost =  Math.floor(tomeCrafts.ordain.cost *  tomeCrafts.ordain.costMultiplier);
        document.getElementById('ordainCost').innerHTML= tomeCrafts.ordain.cost;
        actions.preach.cost = Math.max((cult.faithful.current * actions.preach.multiplier), 4);
        document.getElementById('preachCost').innerHTML = actions.preach.cost;
        document.getElementById('preachWrapCost').innerHTML = actions.preach.cost;
        cult.priests.unlocked = true;
        document.getElementById('priestsWrap').style.display='block';
        document.getElementById('priestsPeg').style.display= 'block';
        comment('So much easier this way');
    }
};
//unlocks
function unlockPriestInn(){
    if(stats.vision.current >= 248 && stats.charm.current >=248){
        numberChange('stats', 'vision', -248, '', 'red');
        numberChange('stats', 'charm', -248, '', 'red');
        cult.priests.recruitInnocents = true;
        tomeCrafts.inn.purchased= true;
        flashFade('innOneOff');
    }
}
function unlockPriestVault(){
    if(stats.vision.current >= 484 && cult.chanters.current>=4 && cult.faithful.current >=8 && cult.sentinels.current >=4){
        numberChange('stats', 'vision', -484, '', 'red');
        numberChange('cult', 'chanters', -4, '', 'red');
        numberChange('cult', 'faithful', -8, '', 'red');
        numberChange('cult', 'sentinels', -4, '', 'red');
        document.getElementById('priestActions').style.display='flex';
        cult.priests.vaultActions = true;
        tomeCrafts.priestVaultActions.purchased= true;
        flashFade('priestVaultActionsOneOff');
    }
}
function evangelism(){
    if(stats.vision.current >= 848 && vault.gold.current>=4848){
        numberChange('stats', 'vision', -848, '', 'red');
        numberChange('vault', 'gold', -4848, '', 'red');
        cult.priests.altar= true;
        tomeCrafts.evangelism.purchased= true;
        flashFade('evangelismOneOff');
    }
}
function unlockPriestFaith(){
    if(stats.vision.current >= 8484 && vault.tomes.current>=1){
        numberChange('stats', 'vision', -8484, '', 'red');
        numberChange('vault', 'tomes', -1, '', 'red');
        cult.priests.convertFaithful = true;
        tomeCrafts.faith.purchased= true;
        flashFade('faithOneOff');
    }
}
//priests should start out doing nothing
//set priests to convert vault items. effectiveness increases with every priest. 8-1, 7-1, etc 242 Vision 2 Chanters, 4 Faithful, 2 Sentinels described as staff neededor something 
//gold in altar room 484 Vision, 848 Gold 
//upgrade to provide innocents only, stopping at 4x faithful. 848 Vision, 848 Charm teach them to be charming
//convert innocents into faithful 848 Vision, 1 Tome
//priest actions
function priests(tics) {
    cult.priests.vaultCounter += tics;
    cult.priests.conversionCounter += tics;
    if (cult.priests.vaultCounter >= cult.priests.vaultNeeded) {
        cult.priests.vaultCounter -= cult.priests.vaultNeeded;
        if(cult.priests.vaultAction && cult.priests.vaultActions === true){
            priestVaultAction();
        }
    }
    if (cult.priests.conversionCounter >= cult.priests.conversionTicsNeeded) {//innocent and faithful conversion
        cult.priests.conversionCounter -= cult.priests.conversionTicsNeeded;
        if (cult.priests.recruitInnocents === true) {
            if (cult.innocents.current < cult.faithful.current * 4) {
                recruitInnocents();
            } else if(cult.priests.convertFaithful === true) {
                convertFaithfulInnocents();
            }
        }
    }
}

// Task-specific functions

function recruitInnocents() {
    numberChange('cult', 'innocents', 1, 'red', 'blue');
    comment('Priests have recruited an Innocent into the fold.');
    if( cult.innocents.unlocked === false){
        cult.innocents.unlocked = true;
        document.getElementById('innocentsWrap').style.display = 'block';
    }
}

function convertFaithfulInnocents() {
    numberChange('cult', 'innocents', -1, 'red', 'blue');
    numberChange('cult', 'faithful', 1, 'red', 'blue');
    comment('Priests have converted one of the Innocents into a Faithful follower.');
}

// Priest Vault Action function
function priestVaultAction() {
    const choice = cult.priests.vaultAction;
    // Split the choice at the "-" to get first and second assets
    const [firstAsset, secondAsset] = choice.split('-');
    const firstAssetAmount = vault[firstAsset].current;
    const priestCount = cult.priests.current;
    const loss = firstAssetAmount/8; //1/8th
    let gain = loss/(16/(1 + priestCount)); //diminishing gains per priest to avoid infinity extra 1 to bring it to 1/8 for first
    // Check 8th min
        window.console.log(firstAsset, -loss, secondAsset, gain);
    if (firstAssetAmount >= 16 && cult.priests.current>=1) {
        window.console.log(firstAsset, -loss, secondAsset, gain);
        numberChange('vault', firstAsset, -loss, 'blue', 'red');
        numberChange('vault', secondAsset, gain, 'blue', 'red');
    }
}
function buildPriestActions() {
    const tomesBox = document.getElementById('tomesBox');
    const pagesDiv = document.getElementById('pagesDiv');
    const priestActionsBox = document.createElement('div');
    priestActionsBox.id = 'priestActions';
    const actions = [
        { id: 'love-terror', text: 'Love \n  ->\n Terror' },
        { id: 'love-gold', text: 'Love \n  ->\n Gold' },
        { id: 'terror-love', text: 'Terror \n  ->\n Love' },
        { id: 'terror-gold', text: 'Terror \n  ->\n Gold' },
        { id: 'gold-love', text: 'Gold \n  ->\n Love' }
    ];
    
    actions.forEach(action => {
        // Create the main div for each toggle
        const toggleDiv = document.createElement('div');
        toggleDiv.className = 'priestToggleDivs';
        
        // Create the light indicator
        const light = document.createElement('div');
        light.className = 'priestToggleLights';
        light.id = `${action.id}Light`; // Unique ID for each light

        // Create the text element
        const text = document.createElement('div');
        text.className = 'priestToggleText';
        text.innerText = action.text;
        text.id = `${action.id}Text`; // Unique ID for each text

        // Append light and text to the toggleDiv
        toggleDiv.appendChild(light);
        toggleDiv.appendChild(text);

        // Set an ID for each button div and append to main box
        toggleDiv.id = `${action.id}Toggle`;
        priestActionsBox.appendChild(toggleDiv);
        toggleDiv.addEventListener('pointerdown', () => priestActionsToggle(action.id));
    });
    tomesBox.insertBefore(priestActionsBox, pagesDiv.nextSibling);
}
function priestActionsToggle(selectedId) {
    const selectedIndicator = document.getElementById(`${selectedId}Light`);

    // If the selected indicator is currently green, turn it off and reset vaultAction to null
    if (selectedIndicator.style.backgroundColor === 'green') {
        selectedIndicator.style.backgroundColor = 'red';
        cult.priests.vaultAction = null;

    } else {
        // Turn off all indicators and reset vaultAction
        document.querySelectorAll('.priestToggleLights').forEach(indicator => {
            indicator.style.backgroundColor = 'red';
        });

        // Turn on the selected indicator and set vaultAction
        selectedIndicator.style.backgroundColor = 'green';
        cult.priests.vaultAction = selectedId;  // Set vaultAction to the selected action
    }
}

function enscribe(){
    if(cult.priests.current >=1 && cult.faithful.current>=4 && stats.radiance.current >= tomeCrafts.enscribe.cost){
        numberChange("cult", "priests", -1, "", "purple");
        numberChange("cult", "faithful", -4, "", "purple");
        numberChange("stats", "radiance", -tomeCrafts.enscribe.cost, "", "purple");
        tomeCrafts.enscribe.cost *=2;
        document.getElementById('enscribeCost').innerHTML = tomeCrafts.enscribe.cost;
        if(cult.scribes.current === 0){
            document.getElementById('scribesWrap').style.display = 'block';
        }
        numberChange("cult", "scribes", 1, "purple", "");
        comment("The drool is a little off putting. (+1 Scribe with attendants)");        
    }
};

//=======================
//                                      IchorCrafts
//=======================
let ichorCrafts = {
  drinkIchor: {
        callString: 'drink',
        string: 'Drink',
        description: ['Too salty by far, with a boiled pork scent.', 'Cost: Ichor ', 'Benefit: 50 Health Maximum'],
        func: drinkIchor,
        unlocked: true,
        purchased: true,
        permanent: true
  }
};
//unlocks for tulu and lagh
//=============================
//                                      IchorCrafts actions
//=============================
function drinkIchor(){
    if(vault.ichor.current>=1){
        numberChange('vault', 'ichor', -1, 'red', 'red');
        comment('+50 Maximum Health', 'green');
        stats.health.max += 50;
        numberChange('stats', 'health', (stats.health.max-stats.health.current), 'green', '');
    }
}

                                                                                //=========================================
                                                                                //                                      Tyog Crafts
                                                                                //=========================================
                                                                                
tyogCrafts = {
    riteSpring: {
        callString: 'riteSpring',
        string: 'Rite of Spring',
        description: ["We sacrifice our Love for Abundance", 'Cost: 1 Chanter, Love ', ' Increases Pit production for 888 tics.'],
        unlockText: '',
        lockCost: 'Vision: 24',
        unlockCost: 24,
        func: ordain,
        cost: 444,
        costMultiplier: 2.4,
        unlocked: false,
        active: false,
        purchased: false,
        permanent: false
    },
    invokeYog: {
        callString: 'invokeYog',
        string: 'Invocation of Yog-Sothoth',
        description: ["Bringing him forth is a dangerous proposition.", 'Cost: 2 Faithful, Radiance ', 'Increases Terror from Faithful for 888 tics'],
        unlockText: '',
        lockCost: 'Vision: 24',
        unlockCost: 24,
        func: ordain,
        cost: 444,
        costMultiplier: 2.4,
        unlocked: false,
          active: false,
        purchased: false,
        permanent: false
    },
    carnival: {
        callString: 'carnival',
        string: 'Carnival',
        description: ['Eat drink and be merry, for tomorrow you die.', "Cost: 4 Faithful", '.'],
        unlockText: '',
        lockCost: 'Vision: 24',
        unlockCost: 24,
        func: ordain,
        cost: 444,
        costMultiplier: 2.4,
        unlocked: false,
          active: false,
        purchased: false,
        permanent: false
    },
    litanyDoomed: {
        callString: 'litanyDoomed',
        string: 'Litany of the Doomed',
        description: ['Convert 16 Innocents.', 'Gain 4 Faithful who proved their worth.'],
        unlockText: '',
        lockCost: 'Vision: 24',
        unlockCost: 24,
        func: ordain,
        cost: 444,
        costMultiplier: 2.4,
        unlocked: false,
          active: false,
        purchased: false,
        permanent: false
    },
    hymnAgape: {
        callString: 'hymnAgape',
        string: 'Hymn of Agape',
        description: ['Toggle below Chanting in West.', 'Doubles Love from Chanters, increases Madness.'],
        unlockText: '',
        lockCost: 'Vision: 24',
        unlockCost: 24,
        func: ordain,
        cost: 444,
        costMultiplier: 2.4,
        unlocked: false,
          active: false,
        purchased: false,
        permanent: false
    }
};


                                                                                //=========================================
                                                                                //                                      Build Crafts
                                                                                //=========================================
function unlockedAtStart(){
    document.getElementById('convertChanterLock').style.display='block';
    document.getElementById('basementOneOff').style.display='block';
    document.getElementById('convertsentinelLock').style.display='block';
    document.getElementById('titheLock').style.display='block';
    document.getElementById('expeditionOneOff').style.display='block';
    document.getElementById('dreadRevelLock').style.display='block';
    document.getElementById('leatherBindingLock').style.display='block';
    document.getElementById('deepTradeWrap').style.display='none';
    document.getElementById('bloodAltarOneOff').style.display='block';
} 
 
let craftStringKeys = ['loveCrafts', 'terrorCrafts', 'goldCrafts', 'fleshCrafts', 'tomeCrafts', 'ichorCrafts', 'tyogCrafts'];
let craftTypeKeys = [loveCrafts, terrorCrafts, goldCrafts, fleshCrafts, tomeCrafts, ichorCrafts, tyogCrafts];
    let loveKeys = Object.keys(loveCrafts);
    let terrorKeys = Object.keys(terrorCrafts);
    let goldKeys = Object.keys(goldCrafts);
    let fleshKeys = Object.keys(fleshCrafts);
    let tomeKeys = Object.keys(tomeCrafts);
    let ichorKeys = Object.keys(ichorCrafts);
    let tyogKeys = Object.keys(tyogCrafts);
let craftKeys = [loveKeys, terrorKeys, goldKeys, fleshKeys, tomeKeys, ichorKeys, tyogKeys];
function buildCraftBoxes(callString, craft){
    let item = vault[callString];
    document.getElementById('right').innerHTML += 
            "<div class='craftBox' id='" + callString +"Box' ><h2 class='craftTitles'>" + item.string + " Crafts</h2></div>";
    if(item.string === 'Tome'){//adding pages counter
        pages();
    } 
    let craftKeys = Object.keys(craft);
    for(let i=0; i<craftKeys.length; i++){
        if(craft[craftKeys[i]].permanent === true){
            document.getElementById(callString + "Box").innerHTML += 
                "<button class='craftWraps' id= '" +craftKeys[i] + "Wrap'>" +
                "<span class='craftLabels'  id= '" +craftKeys[i] + "'>" + craft[craftKeys[i]].string + "</span>" +
                "</button>";
                if(craft[craftKeys[i]].purchased === false || craft[craftKeys[i]].unlocked === false){
                    document.getElementById(craftKeys[i] + "Wrap").style.display='none';
                }
        }
        if(craft[craftKeys[i]].unlockText && craft[craftKeys[i]].permanent === true){
           document.getElementById(callString + "Box").innerHTML += 
                    "<button class='craftLocks' id= '" +craftKeys[i] + "Lock'>" +
                    "<span class='unlockText'>" + craft[craftKeys[i]].unlockText + "</span>" +
                    "</button>";      
            if(craft[craftKeys[i]].unlocked === true && craft[craftKeys[i]].purchased === false){
                document.getElementById(craftKeys[i] + "Lock").style.display='block';
                document.getElementById(craftKeys[i] + "Wrap").style.display='none';
            }
        }else if (craft[craftKeys[i]].permanent === false) {
            var button = document.createElement("button");
            button.classList.add('craftOneOff');
            button.id = craftKeys[i] + "OneOff";
            if (callString === 'tomes') {
                button.style.display = 'block';
            }
            var span = document.createElement("span");
            span.classList.add('craftLabels');
            span.innerHTML = craft[craftKeys[i]].string;
            button.appendChild(span);
            document.getElementById(callString + "Box").appendChild(button);
        }
    };
};
buildCraftBoxes('love', loveCrafts);
buildCraftBoxes('terror', terrorCrafts);
buildCraftBoxes('gold', goldCrafts);
buildCraftBoxes('flesh', fleshCrafts);
buildCraftBoxes('tomes', tomeCrafts);
buildCraftBoxes('ichor', ichorCrafts);
buildCraftBoxes('tyog', tyogCrafts);
makeSacrificeChoices();
addTithe();
 buildPriestActions() ;
unlockedAtStart();


//priests

