                                                        //=========================================
                                                                                               // The Cult
                                                        //=========================================
let cult = {//why
        faithful:{
            string: 'Faithful',
            description:["Men, women who have heard the call. They provide Love, Terror and Gold."],
            current: 0,
            purchased: 0,
            unplaced: 0,
            placed: 0,
            ticCounter: [2, 8],
            capMultiplier: 2.40,
            outMultipliers: [1.6, 0.8, 0.4],//love, terror, gold
            unlocked: false
        },
        chanters:{
            string: 'Chanters',
            description: ["Given scraps of writing from the Book, these cultists chant endlessly. They increase Love and add to West's Charm."],
            current: 0,
            unplaced:0,
            placed: 0,
            ticCounter: [4, 8],
            capMultiplier: 16,
            outMultiplier: 0.8,
            unlocked: false,
            goldBool: false
        },
        sentinels:{
            string: 'Sentinels',
            description:["Silent and dangerous, Sentinels increase Terror in the Faithful and assist in Expeditions."],
            current: 0,
            unplaced: 0,
            placed: 0,
            ticCounter: [0, 8],
            capMultiplier: 16,
            outMultiplier: 0.8,
            unlocked: false,
            goldBool: false
        },
        priests:{
            string: 'Priests',
            description: ['Dedicated followers gifted a dangeous Tome, they can do many things.'],
            current: 0,
            unplaced: 0,
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
        apprentices:{
            string: 'Apprentices',
            description:["Tricked into reading from dangerous texts, West siphons Vision from their scrambled ravings."],
            current: 0,
            ticCounter: [0, 8],
            outMultiplier: 0.8,
            unlocked: false
        },
        scribes:{
            string: 'Scribes',
            description: ['Priests tuned to channel lost wisdom through automatic writing. (produces Pages)'],
            current: 0,
            level: 1,
            ticCounter: [0, 8],
            unlocked: false
        },
        innocents:{
            string: 'Innocents',
            description: ['Spouses, children, and former loved ones, they are offered up by the Faithful. They may be turned to the cause or sacrificed to it. '],
            current: 000,
            unlocked: false
        },
        insane:{
            string: 'The Insane',
            description: ['The weakest fall to madness forever and are only useful as sacrifice to the Dark Gods.'],
            current: 00,
            unlocked: false
        },
        hybrids:{
            string: 'Hybrids',
            description: ['Human enough to pass in a crowd, but terrible to behold in a dark alley. (count as both Faithful and  Sentinel)'],
            current: 0,
            unplaced: 0,
            placed: 0,
            unlocked: false
        },
        brined:{
            string: 'Brined',
            description: ['Brain in a jar. (count as a Faithful but cannot be converted or placed in altar room)'],
            current: 0,
            unlocked: false
        },
        reanimated:{
            string: 'Reanimated',
            description: ['Flesh risen to ferry Brined to the altar room. (Causes general Terror, counts as a Faithful in altar room)'],
            current: 0,
            unlocked: false
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
            current: 10,
            unlocked: true,
            unlock: ['vision', 10]
        },
        terror:{
            callString: 'terror',
            string: 'Terror',
            description: ['While Love helps, Terror is essential.'],
            current: 00000,
            unlocked: true,
            unlock: ['vision', 10]
        },
        gold:{ //spend as charm bonus or for one offs
            callString: 'gold',
            string: 'Gold',
            description: ['Gold always has its purpose.'],
            current:00000,
            unlocked: true,
            unlock: ['vision', 10]
        },
        flesh:{//feed to deep ones, build servitors
            callString: 'flesh',
            string: 'Flesh',
            description: ['The Natives used every part of the buffalo.'],
            current: 0000,
            unlocked: false
        },
        tome:{
            callString: 'tome',
            string: 'Tome',
            description: ['Found in forgotten places, these can be given to the Faithful to convert them into Priests.'],
            current: 0,
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
            current: 0,
            unlocked: false
        },
        tyog:{
            callString: 'tyog',
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
        outMultiplier: 1,
        costMultiplier: 24,
        shardDiscount: 1,
        unlocked: true,
        purchased: false,
        permanent: true
    },
    indoctrination:{
        callString: 'indoctrination',
        string: 'Indoctrination',
        description: ["Mind 'cleansing' sessions for new Faithful.", 'Cost: Love ', "Benefit: Faithful Gold output increased."],
        func: indoctrination, 
        cost: 848,
        unlocked: false,
        purchased: false,
        permanent: false
    },
    murals:{
        callString: 'murals',
        string: 'Murals',
        description: ["The Faithful adorn the wallls of the altar room with Visions from West's dreams.", 'Cost: Love ', "Benefit: increases only this altar room's output."],
        func: murals, 
        cost: 484,
        benefit:0.16,
        unlocked: false,
        purchased: false,
        permanent: true
    },
    thurifer:{
        callString: 'thurifer',
        string: 'Thurifer',
        description: ["Train one Faithful to endlessly swing the incense brazier over the Faithful.", 'Cost: 1 Faithful, Love ', "Benefit: Faithful produce more Love."],
        func: thurifer, 
        cost: 8448,
        unlocked: false,
        purchased: false,
        permanent: false
    },
    dreamTheft:{
        callString: 'dreamTheft',
        string: 'Dream Theft',
        description: ['Drain the hopes and dreams of an Innocent.', 'Cost: 1 Innocent, Love ', "Benefit: 1 Insane, 484 Vision"],
        unlockText: 'Krueger?',
        lockCost: 'Vision: 848',
        unlockCost: 848,
        func: dreamTheft,  
        cost: 848,
        benefit:88,
        unlocked: false,
        purchased: false,
        permanent: true
    },
    polygamy:{
        callString: 'polygamy',
        string: 'Polygamy',
        description: ['An old practice for gaining Faithful, but you have to let them keep their toys.', 'Cost: 4 Innocents, Love ', "Benefit: 1 Faithful"],
        unlockText: 'Polygamy?',
        lockCost: 'Vision: 484',
        unlockCost: 484,
        func: polygamy, 
        innocents: 4,
        cost: 484,
        unlocked: false,
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
        description: ['With so much Love, there is no longer any need to hide.', 'Cost: Priest 1, Chanters 44, Love  ', "Benefit: larger Altar Room"],
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
    buttonGlow("adorationWrap");
    if(vault.love.current >= loveCrafts.adoration.cost){
        numberChange('vault', 'love', -loveCrafts.adoration.cost, '#FF559D', 'red');
        numberChange('stats', 'charm',  loveCrafts.adoration.benefit, '#FFFF00', 'red');
    }
}

function cChant(){
    if(vault.love.current >=  loveCrafts.convertChanter.cost && cult.faithful.current >= loveCrafts.convertChanter.benefit){
        buttonGlow("convertChanterWrap");
        comment('Another joins the choir.');
        loveCrafts.convertChanter.costMultiplier+=8;
        numberChange('vault', 'love', -loveCrafts.convertChanter.cost, '#FF559D', 'red');
        numberChange('cult', 'faithful', -loveCrafts.convertChanter.benefit, 'green', 'red');
        numberChange('cult', 'chanters', loveCrafts.convertChanter.benefit, 'green', 'red');
    }
};

function indoctrination(){
    if(vault.love.current>=loveCrafts.indoctrination.cost){
        loveCrafts.indoctrination.purchased=true;
        numberChange("vault", "love", -loveCrafts.indoctrination.cost, "", "red");
        cult.faithful.outMultipliers[2]+=0.4;
        flashFade("indoctrinationOneOff");
        comment("At level eight they learn the truth about aliens. (Faithful Gold output increased.)");
    }
}

function murals(){
    if (grids[gridChosen].muralBool === false) {
        if(vault.love.current>=loveCrafts.murals.cost){
            numberChange("vault", "love", -loveCrafts.murals.cost, "", "red");
            buttonGlow("muralsWrap");
            loveCrafts.murals.purchased=true;
            grids[gridChosen].muralBool = true;
            loveCrafts.murals.cost= grids[gridChosen].muralCost;
            document.getElementById("muralsCost").innerHTML= loveCrafts.murals.cost;
            comment("Is that one supposed to be me? How flattering. (increased " + grids[gridChosen].tab + " output)");
        }
    }else{
        comment("Murals already painted in " + grids[gridChosen].tab);
    }
}

function thurifer(){
    if(cult.faithful.current>=1 && vault.love.current>=loveCrafts.thurifer.cost){
        numberChange("cult", "faithful", -1, "", "red");
        numberChange("vault", "love", -loveCrafts.thurifer.cost, "", "red");
        flashFade("thuriferOneOff");
        loveCrafts.thurifer.purchased=true;
        cult.faithful.outMultipliers[0]+=0.4;
        cult.faithful.capMultiplier+=0.04;
        comment("increased Faithful Love and emotional capacity.");
    }
}

function dreamTheft(){
    if(cult.innocents.current>=1 && vault.love.current>=loveCrafts.dreamTheft.cost){
        buttonGlow("dreamTheftWrap");
        numberChange("cult", "innocents", -1, "", "red");
        numberChange("cult", "insane", 1, "red", "");
        numberChange("vault", "love", -loveCrafts.dreamTheft.cost, "", "red");
        numberChange("stats", "vision", loveCrafts.dreamTheft.benefit, "green", "");
    }
}

function polygamy(){
    if(cult.innocents.current>=loveCrafts.polygamy.innocents && vault.love.current>=loveCrafts.polygamy.cost){
        buttonGlow("polygamyWrap");
        numberChange("cult", "innocents", -loveCrafts.polygamy.innocents , "", "red");
        numberChange("cult", "faithful", 1, "pink", "");
        numberChange("vault", "love", -loveCrafts.polygamy.cost, "", "red");
        loveCrafts.polygamy.cost=Math.floor(loveCrafts.polygamy.cost * 1.2);
        loveCrafts.polygamy.innocents +=1;
        document.getElementById("polygamycost").innerHTML="Cost:" +  loveCrafts.polygamy.innocents + " Innocents, Love ";
        document.getElementById("polygamyCost").innerHTML= loveCrafts.polygamy.cost;
    }
}

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
        loveCrafts.murals.unlocked=true;
        document.getElementById("muralsWrap").style.display = "block";
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
        terrorCrafts.compound.unlocked = true;
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
    demandFlesh:{
        callString: 'demandFlesh',
        string: 'Demand Flesh',
        description: ['Exhort the Faithful to find bodies at any cost.', 'Cost: Love ', 'Benefit: Flesh +4','Terror Minimum: 484'],
        madMin: " Minimum Madness: 248",
        unlockText: 'Demand Flesh?',
        lockCost: 'Vision: 484',
        unlockCost: 484,
        externalLock: true,
        func: demandFlesh,  
        cost: 444,
        benefit: 4,
        unlocked: false,
        purchased: false,
        permanent: true
    },
    convertSentinel:{
        callString: 'convertSentinel',
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
        outMultiplier: 1,
        costMultiplier: 48,
        shardDiscount: 1,
        unlocked: true,
        purchased: false,
        permanent: true
    },
  syringe: {
        callString: 'syringe',
        string: 'Little Gold Syringe',
        description: ['A single prick and it begins, the writhing, the agony, then silence. ', ' Cost: 1 Innocent', ' Benefits: 1 Flesh, 1 Radiance, 88 Terror, 88 Madness'],
        madMin: " Minimum Madness: 88 ",
        func: syringe,
        madnessGain: 88,
        unlocked: false,
        purchased: true,
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
        purchased: false,
        permanent: true
    },
    box:{
        callString: 'box',
        string: 'The Box',
        description:['An immersive experience which should bring individuals into the community.', 'Cost: 1 Innocent, Patience ', 'Benefit: 1 Faithful, 88 Terror', ' Terror Minimum: 248'],
        madMin: " Minimum Madness: 248",
        externalLock: true,
        unlockText: 'The Box?',
        lockCost: 'Vision: 444',
        unlockCost: 444,
        func: box, 
        terrorMin: 248,
        cost: '',
        unlocked: false,
        purchased: false,
        permanent: true
    },
    destroyBeauty:{
        callString: 'destroyBeauty',
        string: 'Destroy something beautiful ',
        description: ["I am Jack's rightous wrath.",  "Cost: 1 Faithful, 848 Love, 48 Health", "Benefit: Loss of all Madness, +484 Terror"],
        madMin: " Minimum Madness: 484",
        externalLock: true,
        unlockText: 'Violence?',
        lockCost: 'Vision: 848',
        unlockCost: 848,
        func: destroyBeauty,
        unlocked: false,
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
    breedingPits: {//grow innocents for flesh
        callString: 'breedingPits',
        string: 'Breeding Pits',
        description: ['Lead them into pens and let nature take its course.', 'Cost: Innocents ' , 'Benefits: Passive Terror and Innocent Growth', ' Terror Minimum: 444 '],
        madMin: " Minimum Madness: 168",
        func: pits,
        cost: 4,
        level: 0,
        baseOutput: 1,
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
        description: ['We are done hiding.', 'Cost: Sentinels  ', "Benefit: larger Altar Room", "Minimum Terror 2484 "],
        madMin: " Minimum Madness: 248",
        madCost: 248,
        terrorCost: 2484,
        func: compound,  
        cost: 8,
        unlocked: false,
        purchased: false,
        permanent: false
    },
    silo:{
        callString: 'silo',
        string: 'Abandoned Nuclear Silo',
        description: ['The tunnels can hide any number of indescretions.', 'Cost: Sentinels ', "Benefit: larger Altar Room", "Minimum Terror 8484 "],
        madMin: " Minimum Madness: 848",
        madCost: 848,
        terrorCost: 8484,
        func: silo,  
        cost: 44,
        unlocked: false,
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
        purchased: false,
        permanent: false
    }
};
//================================
//                                     TerrorCrafts Functions
//================================

function demandFlesh(){
    if(vault.love.current>= terrorCrafts.demandFlesh.cost && madMin(248) && vault.terror.current>=484){
        buttonGlow("demandFleshWrap");
        numberChange("vault", "love", -terrorCrafts.demandFlesh.cost, "red", "");
        numberChange("vault", "flesh", terrorCrafts.demandFlesh.benefit, "red", "");
        terrorCrafts.demandFlesh.cost*=2;
        terrorCrafts.demandFlesh.benefit+=2;
        document.getElementById("demandFleshCost").innerHTML=  terrorCrafts.demandFlesh.cost;
        document.getElementById("demandFleshBenefit").innerHTML=  "Benefit: Flesh +" + terrorCrafts.demandFlesh.benefit;
        comment("Pretty sure this is how Manson got caught. (+" + terrorCrafts.demandFlesh.benefit + " Flesh)");
    }
} 
function csentinel(){
    if(vault.love.current >=  terrorCrafts.convertSentinel.cost && cult.faithful.current >= terrorCrafts.convertSentinel.benefit && madMin(48)){
        comment('Forever vigilant.');
        terrorCrafts.convertSentinel.costMultiplier+= 4;
        numberChange('vault', 'love', -terrorCrafts.convertSentinel.cost, '#FF559D', 'red');
        numberChange('cult', 'faithful', -terrorCrafts.convertSentinel.benefit, 'green', 'red');
        numberChange('cult', 'sentinels', terrorCrafts.convertSentinel.benefit, 'green', 'red');
    }
}

function syringe(){
    if(cult.innocents.current>=1 && madMin(88)){
        if(stats.radiance.unlocked===false){
            stats.radiance.unlocked=true;
            document.getElementById("radianceBox").style.display = "block";
        }
        buttonGlow("syringeWrap");
        numberChange("cult", "innocents", -1, "", "red");
        numberChange("stats", "madness", terrorCrafts.syringe.madnessGain, "red", "");
        terrorCrafts.syringe.madnessGain+=22;
        document.getElementById("syringeBenefit").innerHTML= "Benefits: 1 Flesh, 1 Radiance, 88 Terror, " + terrorCrafts.syringe.madnessGain + " Madness";
        numberChange("vault", "terror", 88, "red", "");
        numberChange("vault", "flesh", 1, "red", "");
        numberChange("stats", "radiance", 1, "blue", "");
        comment("Ah, sweet suffering. Like a moth to a flame. (-1 Innocent, +1 Flesh, +1 Radiance");
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
    if(altars.laghA.current===true){
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
            terrorCrafts.convertSentinel.cost = Math.max(cult.sentinels.current * terrorCrafts.convertSentinel.costMultiplier, 22);
            document.getElementById('convertSentinelCost').innerHTML =  terrorCrafts.convertSentinel.cost;
        }else if (type === 'insane'){
            numberChange('cult', 'insane', -1, 'green', 'red');
            numberChange('stats', 'radiance', (2 * altarBump), 'blue', 'red');
            numberChange('vault', 'terror', (22 * terrorCrafts.sacrifice.terrorMultiplier), 'red', 'blue');
            comment("Rhan seems to like this one. (-1 Insane, +" + (2 * altarBump) + " Radiance, " + (22 * terrorCrafts.sacrifice.terrorMultiplier) +" Terror)", 'red');
        }else{
        };
        buttonGlow("sacrificeWrap");
        numberChange('vault', 'flesh', 1, 'red', 'grey');
        godsAppeased.rhanAppeased.hungerCounter = 0;
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
     document.getElementById("sacrificeWrap").querySelector(".craftLabels").innerHTML = temp;
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
 
 function box() {
    if (cult.innocents.current >= 1 && vault.terror.current >= 248 && madMin(248)) {
        buttonGlow("boxWrap");
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
        let boxSpan = document.getElementById("boxWrap");
        let totalDuration = 16000; // Total duration in milliseconds (16 seconds)
        // Disable the button and start the progress bar
        document.getElementById("boxWrap").classList.add("disable-events");
        progressBar.style.width = '0';  // Reset progress bar
        document.querySelector('#boxWrap .craftLabels').textContent = `The Box (${(totalDuration / 1000).toFixed(0)}s)`;  // Initial text
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
            document.querySelector('#boxWrap .craftLabels').textContent = `The Box ${((totalDuration - elapsedTime) / 1000).toFixed(0)}s`;  // Update text with countdown
            progressBar.style.width = `${(elapsedTime / totalDuration) * 100}%`;  // Update progress bar
            if (elapsedTime >= totalDuration) {
                clearInterval(interval);
                clearInterval(flashInterval); // Stop flashing
                progressBar.style.width = '100%';  // Complete the progress bar
                document.querySelector('#boxWrap .craftLabels').textContent = "The Box";  // Reset the text
                // Perform number changes after 16 seconds
                numberChange('cult', 'faithful', 1, 'blue', '');
                document.getElementById("boxWrap").classList.remove("disable-events");
                progressBar.remove(); 
            }
        }, 100);  // Update every 100 milliseconds
    }
}

 function destroyBeauty(){
    if(cult.faithful.current>=1 && vault.love.current>=848 && madMin(484)){
        buttonGlow("destroyBeautyWrap");
        numberChange("cult", "faithful", -1, "", "red");
        numberChange("vault", "love", -848, "red", "");
        numberChange("vault", "terror", 484, "red", "");
        numberChange("stats", "health", -48, "", "red");
        stats.madness.current = 1;
        numberChange("stats", "madness", -1, "", "red");
    }
}



function maw(){
    if(cult.faithful.current>=16 && cult.sentinels.current >=8 && madMin(888)){
        buttonGlow("mawWrap");
        numberChange('cult', 'faithful', -16, '', 'red');
        numberChange('vault', 'terror', 484, 'red', '');
        numberChange('stats', 'radiance', 44, 'blue', '');
        godsAppeased.tsathogguaAppeased.terror =0;
        godsAppeased.tsathogguaAppeased.hungerCounter[0]=0;
        comment("He leaves nothing but the bones. (+44 Radiance, Tsathoggua Terror loop reset)");
    }
}

function pits(){
    if(cult.innocents.current >=  terrorCrafts.breedingPits.cost && vault.terror.current >= 444 && madMin(168)){
        buttonGlow("breedingPitsWrap");
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
    if(cult.sentinels.current >= terrorCrafts.compound.cost && vault.terror.current >= 4444 && madMin(terrorCrafts.compound.madCost)){
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
    if(cult.sentinels.current >= terrorCrafts.silo.cost && vault.terror.current >= terrorCrafts.silo.terrorCost && madMin(terrorCrafts.silo.madCost)){
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
        description: ['Preparations are essential. Supplies must be gathered.', 'Cost: Gold 88'],
        func: expedition,
        unlocked: true,
        purchased: false,
        permanent: false
    },
    censer:{
        callString: 'censer',
        string: 'Censer?',
        description: ['Cost: 848 Vision '],
       func: censer, 
        cost: 848,
        unlocked: false,
        purchased: false,
        permanent: false
    },
    brazier:{
        callString: 'brazier',
        string: 'Brazier',
        description: ["The glow from the inlays of this brazier unnerve the Faithful.", 'Cost: Gold ', "Benefit: Faithful produce more Terror."],
        func: brazier,
        cost: 848,
        unlocked: false,
        purchased: false,
        permanent: false
    },
    incense:{
        callString: 'incense',
        string: 'Incense',
        description: ["Each rare blend is more intoxicating than the last", 'Cost: Gold ', "Benefits: increased Faithful Love and emotional capacity."],
        func: incense, 
        cost: 2484,
        unlocked: false,
        purchased: false,
        permanent: true
    },
    pagentry:{
        callString: 'pagentry',
        string: 'Pagentry?',
        description: ["Cost: 1648 Vision"],
        func: pagentry,  
        cost: 1648,
        unlocked: false,
        purchased: false,
        permanent: false
    },
    choirMaster:{
        callString: 'choirMaster',
        string: 'Choir Master',
        description: ['Promote a Chanter to lead the choir.', 'Cost: 1 Chanter, Gold ', "Benefit: Chanters are more effective."],
        func: cultistUpgrade,  
        cost: 1648,
        unlocked: false,
        purchased: false,
        permanent: false
    },
    scarifier:{
        callString: 'scarifier',
        string: 'Scarifier',
        description: ['Train a Faithful in arcane cutting of the flesh.', 'Cost: 1 Faithful, Gold ', "Benefit. Sentinels are more effective."],
        func: cultistUpgrade,  
        cost: 1648,
        unlocked: false,
        purchased: false,
        permanent: false
    },
    chanterRobes:{
        callString: 'chanterRobes',
        string: 'Chanter Robes',
        description: ['Dress the Chanters in robes of glistening silk.', 'Cost: new Chanters require Gold, Gold ', "Benefit: Chanters are more effective."],
        func: cultistUpgrade,  
        cost: 8448,
        unlocked: false,
        purchased: false,
        permanent: false
    },
    armor:{
        callString: 'armor',
        string: 'Armor',
        description: ['Blackened breastplates covered in horrifying imagery.', 'Cost: new Sentinals require Gold, Gold ', "Benefit: Sentinels are more effective."],
        func: cultistUpgrade,  
        cost: 8448,
        unlocked: false,
        purchased: false,
        permanent: false
    },
    mortuary:{
        callString: 'mortuary',
        string: 'Mortuary',
        description: ['Costly to maintain, but well worth it. (not a toggle!)', 'Cost: 2 Chanters, 4 Sentinels, Gold ', "Benefit: passive Gold into Flesh"],
        func: mortuary,  
        cost: 48484,
        ticCounter:[0,16],
        unlocked: false,
        active: false,
        purchased: false,
        permanent: false
    },
    motel:{
        callString: 'motel',
        string: 'Seedy Motel',
        description: ['Old and ugly, it provides great cover and substantial space.', 'Cost: Gold ', "Benefit: larger Altar Room"],
        func: motel,  
        cost: 2484,
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
        cost: 48484,
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
    if(vault.gold.current >= 88){
        numberChange('vault', 'gold', -88, 'yellow', 'red');
        flashFade('expeditionOneOff');
        eventBox("images/eventImages/expeditions.jpg", "Far off places...", "Having gathered supplies and weathered maps, West is driven to seek out the lost and isolated places where secrets may be uncovered. (Expeditions unlocked)");
        comment('There are layers of mystery in each location.', 'lightgreen', 'ex');
        goldCrafts.expedition.purchased = true;
        domUnlocks.expeditions = true;
        document.getElementById('expeditionsTab').style.display = 'block';
        flash('expeditionsTab', 'lightgreen', 'white');
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

function tithe(tics){
    if(goldCrafts.tithe.timeCounter[0] < goldCrafts.tithe.timeCounter[1]){
        goldCrafts.tithe.timeCounter[0]+=tics;
    }else{
        goldCrafts.tithe.timeCounter[0] -= goldCrafts.tithe.timeCounter[1];
        if(vault.love.current>=16){
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






function censer(){
    if(stats.vision.current>=168){
        numberChange("stats", "vision", -168, "", "red");
        flashFade("censerOneOff");
        goldCrafts.censer.purchased=true;
        goldCrafts.brazier.unlocked=true;
        goldCrafts.incense.unlocked=true;
        setTimeout(() => {
        document.getElementById("brazierOneOff").style.display="block";
        document.getElementById("incenseWrap").style.display="block";
        }, 800);
    }
}

function brazier(){
    if(vault.gold.current>= goldCrafts.brazier.cost){
        numberChange("vault", "gold", -goldCrafts.brazier.cost, "", "red");
        cult.faithful.outMultipliers[1]+=0.4;
        cult.faithful.capMultiplier+=0.04;
        comment("increased Faithful Terror and emotional capacity. (Thurifer unlocked in LoveCrafts)");
        flashFade("brazierOneOff");
        goldCrafts.brazier.purchased=true;
        loveCrafts.thurifer.unlocked=true;
        document.getElementById("thuriferOneOff").style.display="block";
    }
}

function incense(){
    if(vault.gold.current>= goldCrafts.incense.cost){
        numberChange("vault", "gold", -goldCrafts.incense.cost, "", "red");
        goldCrafts.incense.purchased=true;
        buttonGlow("incenseWrap");
        cult.faithful.outMultipliers[0]+=0.4;
        cult.faithful.capMultiplier+=0.04;
        comment("increased Faithful Love and emotional capacity.");
        goldCrafts.incense.cost*=4;
        document.getElementById("incenseCost").innerHTML=goldCrafts.incense.cost;
    }
}

function pagentry(){
    if(stats.vision.current>=248){
        numberChange("stats", "vision", -248, "", "red");
        flashFade("pagentryOneOff");
        goldCrafts.pagentry.purchased=true;
        goldCrafts.chanterRobes.unlocked = true;
        goldCrafts.scarifier.unlocked=true;
        setTimeout(() => {
        document.getElementById('chanterRobesOneOff').style.display="block";
        document.getElementById("scarifierOneOff").style.display="block";
        }, 800);
    }
}

function cultistUpgrade(upgradeKey) {
     let upgrade = goldCrafts[upgradeKey];
     let cost = upgrade.cost;
     let unitCost = null;
     let text = "";
     if(upgradeKey === "choirMaster"){
        unitCost = "chanters";
     }else if(upgradeKey === "scarifier"){
        unitCost = "faithful";
    }
    if (vault.gold.current >= cost && (unitCost === null || cult[unitCost].current >= 1)) {
        numberChange("vault", "gold", -cost, "", "red");
        if (unitCost !== null) numberChange("cult", unitCost, -1, "", "red");
        if (upgradeKey === 'choirMaster' || upgradeKey === 'chanterRobes'){
            text = "Chanters";
            cult.chanters.outMultiplier += 0.4;
        }else if (upgradeKey === 'scarifier' || upgradeKey === 'armor'){
            text="Sentinels";
            cult.sentinels.outMultiplier += 0.4;
        }
        flashFade(upgradeKey + "OneOff");
        goldCrafts[upgradeKey].purchased = true;
        if (upgradeKey === 'chanterRobes'){
            goldCrafts.choirMaster.unlocked = true;
        setTimeout(() => {
            document.getElementById('choirMasterOneOff').style.display="block";
        }, 800);
        }else if (upgradeKey === 'scarifier'){
            goldCrafts.armor.unlocked = true;
            setTimeout(() => {
                document.getElementById('armorOneOff').style.display="block";
            }, 800);
        }
        comment( text + " improved. (does not affect Altar Room)");
    }
}

function mortuary(){
    if(cult.chanters.current>=2 && cult.sentinels.current>=4 && vault.gold.current >= goldCrafts.mortuary.cost){
        numberChange("cult", "chanters", -2, "", "red");
        numberChange("cult", "sentinels", -4, "", "red");
        numberChange('vault', 'gold', -goldCrafts.mortuary.cost, '', 'red');
        flashFade('mortuaryOneOff');
        goldCrafts.mortuary.purchased = true;
    }
}
function mortuaryLoop(tics){
    goldCrafts.mortuary.ticCounter[0]+= tics;
    if(goldCrafts.mortuary.ticCounter[0] >= goldCrafts.mortuary.ticCounter[1]){
        goldCrafts.mortuary.ticCounter[0]=0;
        if(vault.gold.current>=888){
            numberChange("vault", "gold", -888, "red", "");
            numberChange("vault", "flesh", +1, "red", "");
        }
    }
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
        tomeList: [ 'pnak', 'dzyan', 'hsan',  'alch', 'dhol', 'kult', 'necr', 'eibon', 'vermin']
    },
    sculpt:{
        callString: 'sculpt',
        string: 'Sculpture',
        description: ['Create Terrifying Artwork for the Museum. ', 'Cost: Flesh ', 'Benefit: Gold 484'],
        madMin: "Minimum Madness: 164",
        comment: 'reminiscent of Geiger...',
        func: sculpt,
        cost: 8,
        benefit: 484,
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
        description: ['Antagonize the Flock with unique party guests. ',  'Cost: Flesh 4, 1 Innocent, Love -', 'Benefit: +848 Terror, 1 Insane'],
        madMin: "Minimum Madness: 164",
        func: dreadRevel,
        unlockText: 'Revelry?',
        lockCost: 'Vision: 164',
        unlockCost: 164,
        fleshCost: 4,
        cost: 248,
        benefit: 848,
        unlocked: true,
        purchased: false,
        permanent: true
    },
    seance: {
        callString: 'seance',
        string: 'Seance',
        description: ['Commune with the dead through their essential salts.',  'Cost: Flesh ', 'Benefit: Vision'],
        madMin: "Minimum Madness: 248",
        func: seance,
        cost: 4,
        benefit: 444,
        unlocked: false,
        purchased: true,
        permanent: true
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
    feedHungry:{
        callString: 'feedHungry',
        string: 'Feed the Hungry.',
        description: ['Generosity is its own reward. ', 'Cost: Flesh ', 'Benefit: Innocents '],
        madMin: "Minimum Madness: 248",
        func: feedHungry,
        cost: 8,
        benefit: 4,
        multiplier: 1.4,
        unlocked: false,
        purchased: true,
        permanent: true
    },
    deepTrade:{
        callString: 'deepTrade',
        string: 'Trade with Deep Ones.',
        description: ['The need is ever growing. ', 'Cost: Flesh ', 'Benefit: Gold '],
        madMin: "Minimum Madness: 484",
        func: deepTrade,
        cost: 2,
        benefit: 444,
        multiplier: 4,
        unlocked: false,
        purchased: true,
        permanent: true
    },
    crocBargain:{
        callString: 'crocBargain',
        string: 'Crocodilian Bargain',
        description: ['They have stores of lost wisdom, but they hunger for Flesh. ', 'Cost: Flesh ', 'Benefit: loose pages '],
        madMin: "Minimum Madness: 484",
        func: crocBargain,
        cost: 8,
        benefit: 484,
        multiplier: 4,
        unlocked: false,
        purchased: true,
        permanent: true
    },
    transmute:{
        callString: 'transmute',
        string: 'Transmute',
        description: ['The Health benefits are amazing. ', 'Cost: Flesh ', 'Benefit: Ichor '],
        madMin: "Minimum Madness: 484 ",
        comment: 'How inspired! (+1 Ichor)',
        func: transmute,
        cost: 8,
        benefit: 1,
        unlocked: false,
          active: false,
        purchased: true,
        permanent: true
    },
    shoggothFarm:{
        callString: 'shoggothFarm',
        string: 'Shoggoth Farm',
        description: ['It devours Flesh, but it can be harvested periodically. ', 'Cost: Flesh ', 'Benefit: passive Ichor '],
        madMin: "Minimum Madness: 848 ",
        unlockText: 'Shoggoth?',
        lockCost: 'Vision: 848',
        unlockCost: 848,
        func: shoggothFarm,
        counter:[0,88],
        cost: 8,
        benefit: 1,
        unlocked: false,
        active: false,
        purchased: true,
        permanent: true
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
        madMin: "Minimum Madness: 484",
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
    if(vault.flesh.current>= fleshCrafts.leatherBinding.cost && vault.tome.pageCounter >= vault.tome.pagesNeeded && madMin(88)){
        buttonGlow("leatherBindingWrap");
        numberChange('vault', 'flesh', -fleshCrafts.leatherBinding.cost, 'red', 'red');
        fleshCrafts.leatherBinding.cost = Math.ceil(fleshCrafts.leatherBinding.cost * 1.4);
        vault.tome.pageCounter -= vault.tome.pagesNeeded;
        vault.tome.pagesNeeded =  Math.ceil(vault.tome.pagesNeeded * 2.4);
        document.getElementById('pages').innerHTML = Math.floor(vault.tome.pageCounter);
        document.getElementById('leatherBindingcost').innerHTML = 'Cost: ' + vault.tome.pagesNeeded  + ' Pages, Flesh: ';
        document.getElementById('leatherBindingCost').innerHTML = fleshCrafts.leatherBinding.cost;
        const Tome = getTome();
        if(Tome){
        actionUpgrades.study[Tome].unlocked = true;
        document.getElementById(Tome + "Wrap").style.display='block';
        comment('The completed Tome hums slightly and is warm to the touch. (Tome ready for translation in West tab)', 'blue');
        }else{
        numberChange('vault', 'tome', 1, 'blue', 'red');
        studyMultiplier();
        madCapIncrease();
        comment("There are no more unique Tomes to find.");
        }
    }
}

function sculpt(){
    if(vault.flesh.current >=fleshCrafts.sculpt.cost && madMin(164)){
        buttonGlow("sculptWrap");
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
    if(cult.innocents.current>=1 && vault.flesh.current >= fleshCrafts.dreadRevel.fleshCost && vault.love.current >= fleshCrafts.dreadRevel.cost && madMin(164)){
        buttonGlow("dreadRevelWrap");
        numberChange("cult", "innocents", -1, "red", "");
        numberChange("cult", "insane", 1, "red", "");
        numberChange('vault', 'flesh', -fleshCrafts.dreadRevel.fleshCost, 'red', 'red');
        numberChange('vault', 'love', -fleshCrafts.dreadRevel.cost, 'pink', 'red');
        numberChange('vault', 'terror', fleshCrafts.dreadRevel.benefit, 'red', 'red');
        comment("The party is quite a grave affair.(-" + fleshCrafts.dreadRevel.fleshCost + " Flesh, -" + fleshCrafts.dreadRevel.cost + " Love, +" + fleshCrafts.dreadRevel.benefit + " Terror)");
        fleshCrafts.dreadRevel.fleshCost *= Math.floor(fleshCrafts.dreadRevel.fleshCost*1.4);
        fleshCrafts.dreadRevel.cost *=Math.floor(fleshCrafts.dreadRevel.cost*1.4);
        fleshCrafts.dreadRevel.benefit *=Math.floor(fleshCrafts.dreadRevel.benefit*1.4);
        document.getElementById('dreadRevelcost').innerHTML = 'Cost: ' + fleshCrafts.dreadRevel.fleshCost  + ' Flesh,  ';
        document.getElementById('dreadRevelCost').innerHTML = fleshCrafts.dreadRevel.cost + " Love";
        document.getElementById('dreadRevelBenefit').innerHTML = "Benefit: -" + fleshCrafts.dreadRevel.benefit + " Terror";
    }
}

function seance(){
    if(vault.flesh.current >= fleshCrafts.seance.cost && madMin(248)){
        buttonGlow("seanceWrap");
        numberChange('vault', 'flesh', -fleshCrafts.seance.cost, '', 'grey');
        numberChange("stats", "vision", fleshCrafts.seance.benefit, "grey", "");
        fleshCrafts.seance.cost =Math.floor(fleshCrafts.seance.cost*1.4);
        fleshCrafts.seance.benefit =Math.floor(fleshCrafts.seance.benefit*1.4);
        document.getElementById('seanceCost').innerHTML = fleshCrafts.seance.cost;
        document.getElementById('seanceBenefit').innerHTML = "Benefit: " + fleshCrafts.seance.benefit + " Vision";
    }
}

function cannibalism(){
    if(vault.flesh.current >=1 && madMin(248)){
        buttonGlow("cannibalismWrap");
        numberChange('vault', 'flesh', -1, 'red', 'red');
        numberChange('stats', 'health', 88, 'blue', 'red');
        if(fleshCrafts.cannibalism.tentacle === true){
            numberChange('stats', 'radiance', 1, 'blue', 'red');
            numberChange('stats', 'madness', 88, 'red', 'blue');
            numberChange('vault', 'terror', 444, 'red', 'green');
            comment("Where does the little guy hide when it's not eating? (Madness +44, Terror +444, Health +88, Radiance +1)");
        }else{
            numberChange('stats', 'madness', 44, 'red', 'blue');
            numberChange('vault', 'terror', 88, 'red', 'green');
            comment('Waste not, want not (Madness +88, Terror +88, Health +88)');
        }
    }
}

function feedHungry(){
    if(vault.flesh.current>=fleshCrafts.feedHungry.cost && madMin(248)){
        buttonGlow("feedHungryWrap");
        numberChange("vault", "flesh", -fleshCrafts.feedHungry.cost, "red", "");
        numberChange("cult", "innocents", fleshCrafts.feedHungry.benefit, "green", "");
        comment("Fleet Street's finest recipe. (+" + fleshCrafts.feedHungry.benefit + " Innocents lured in.)");
        fleshCrafts.feedHungry.cost=Math.floor(fleshCrafts.feedHungry.cost * fleshCrafts.feedHungry.multiplier);
        fleshCrafts.feedHungry.benefit=Math.floor(fleshCrafts.feedHungry.benefit * fleshCrafts.feedHungry.multiplier);
        document.getElementById('feedHungryCost').innerHTML = fleshCrafts.feedHungry.cost;
        document.getElementById('feedHungryBenefit').innerHTML = "Benefit: Innocents " + fleshCrafts.feedHungry.benefit;
    }
}

function deepTrade(){
    if(vault.flesh.current >= fleshCrafts.deepTrade.cost && madMin(484)){
        buttonGlow("deepTradeWrap");
        numberChange('vault', 'flesh', -fleshCrafts.deepTrade.cost, 'red', 'red');
        numberChange('vault', 'gold', fleshCrafts.deepTrade.benefit, 'yellow', 'red');
        fleshCrafts.deepTrade.cost = fleshCrafts.deepTrade.cost * 4;
        fleshCrafts.deepTrade.benefit = fleshCrafts.deepTrade.benefit * 2;
        document.getElementById('deepTradeCost').innerHTML = fleshCrafts.deepTrade.cost;
        document.getElementById('deepTradeBenefit').innerHTML = "Benefit: Gold " + fleshCrafts.deepTrade.benefit;
        comment('As the Deep Ones sink beneath the waves, oddly carved chests begin to wash ashore. ( +' + fleshCrafts.deepTrade.benefit + ' Gold)');
    }
}

function crocBargain(){
    if(vault.flesh.current >= fleshCrafts.crocBargain.cost && madMin(484)){
        buttonGlow("crocBargainWrap");
        numberChange('vault', 'flesh', -fleshCrafts.crocBargain.cost, 'red', 'red');
        vault.tome.pageCounter+=fleshCrafts.crocBargain.benefit;
        comment("The Crocodilians drop to all fours and tear into the Flesh with abandon. ( +" + fleshCrafts.crocBargain.benefit + ' loose pages)');
        fleshCrafts.crocBargain.cost = fleshCrafts.crocBargain.cost * 4;
        fleshCrafts.crocBargain.benefit = fleshCrafts.crocBargain.benefit * 2;
        document.getElementById('crocBargainCost').innerHTML = fleshCrafts.crocBargain.cost;
        document.getElementById('crocBargainBenefit').innerHTML = "Benefit:" + fleshCrafts.crocBargain.benefit + " loose pages";
    }
}

function transmute(){
    if(vault.flesh.current>=fleshCrafts.transmute.cost && madMin(484)){
        buttonGlow("transmuteWrap");
        numberChange('vault', 'flesh', -fleshCrafts.transmute.cost, '', 'red');
        numberChange('vault', 'ichor', fleshCrafts.transmute.benefit, 'blue', 'red');
        if(vault.ichor.unlocked === false){
            vault.ichor.unlocked = true;
            document.getElementById('ichorWrap').style.display='block';
        }
    }
}

 function shoggothFarm(){
    if(vault.flesh.current >=  fleshCrafts.shoggothFarm.cost && madMin(848)){
        fleshCrafts.shoggothFarm.purchased=true;
        buttonGlow("breedingPitsWrap");
        numberChange('vault', 'flesh', - fleshCrafts.shoggothFarm.cost, 'blue', 'red');
        fleshCrafts.shoggothFarm.cost = fleshCrafts.shoggothFarm.cost * 2; 
        fleshCrafts.shoggothFarm.level++;
        document.getElementById('shoggothFarmDesc').innerHTML = "Each harvest produces " + Math.ceil(40/fleshCrafts.shoggothFarm.level) + " Ichor and consumes " + fleshCrafts.shoggothFarm.level * 4 + " Flesh";
        document.getElementById('shoggothFarmCost').innerHTML =  fleshCrafts.breedingPits.cost;
        document.getElementById('shoggothFarmBenefit').innerHTML = "Benefit: produces more Ichor and consumes more Flesh.";
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
    if(vault.flesh.current >= 88 && madMin(484)){
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
    priestVaultActions:{
        callString: 'priestVaultActions',
        string: 'Vault Conversions',
        description: ['Priests can be taught to convert Love, Terror, and Gold into each other much like tithing. Gain/Loss ratio tied to Priest count.', 'Cost: 242 Vision, 2 Chanters, 4 Faithful, 2 Sentinels '],
        func: unlockPriestVault,
        cost: '',
        unlocked: true,
        purchased: false,
        permanent: false
    },
    inn:{
        callString: 'inn',
        string: 'Outreach',
        description: ['Priests lure Innocents into the Flock up to 4x the number of Faithful. The time taken is related to the number of Priests.', 'Cost: 484 Vision, 484 Charm '],
        func: unlockPriestInn,
        cost: '',
        unlocked: true,
        purchased: false,
        permanent: false
    },
    evangelism:{
        callString: 'evangelism',
        string: 'Evangelical Priests',
        description: ['Priests can be taught to fleece the Faithful in the Altar Room.(Priests will produce Gold placement bonuses)', 'Cost: 848 Vision, 848 Gold '],
        func: evangelism,
        cost: '',
        unlocked: true,
        purchased: false,
        permanent: false
    },
    faith:{
        callString: 'faith',
        string: 'Indoctrination',
        description: ['Priests convert Innocents into Faithful once the Innocent capacity (4x Faithful) has been reached. More Priests decreases time.', 'Cost: 4884 Vision, 1 Tome '],
        func: unlockPriestFaith,
        cost: '',
        unlocked: true,
        purchased: false,
        permanent: false
    },
    enscribe:{
        callString: 'enscribe',
        string: 'Scribe Attunement',
        description: ["A Priest may be further attuned to the Gods, though the result isn't attractive and requires attendants. Scribes recieve lost wisdom through automatic writing. (passive Page creation)", "Cost: 1 Priest, 4 Faithful, "," Ichor  Benefit: 1 Scribe "],
        func: enscribe,
        cost: 4,
        unlocked: false,
        purchased: true,
        permanent: true
    },
    trickApprentice:{
        callString: 'trickApprentice',
        string: 'Trick Apprentice',
        description: ["Given pages from lost Tomes, their ravings provide West new insights. Madness Minimum: 484", "Cost: 1 Faithful, pages ","Benefit: Each Apprentice uses pages and provides West new Vision."],
        func: trickApprentice,
        cost: 848,
        unlocked: false,
        purchased: true,
        permanent: true
    }
};



//=============================
//                                      TomeCrafts actions
//=============================
function pages(){
            document.getElementById('tomeCraftsBox').innerHTML+=
                "<div id='pagesDiv'>" +
                "<span id='pagesTitle'>Loose Pages: </span>" +
                "<span id='pages'>0</span>" +
                "</div";
}
function ordain(){ 
    if(cult.faithful.current>0 && vault.tome.current>0 && vault.gold.current >= tomeCrafts.ordain.cost){
        buttonGlow("ordainWrap");
        numberChange('cult', 'faithful', -1, 'blue', 'red');
        numberChange('cult', 'priests', 1, 'blue', 'red');
        numberChange('vault', 'gold', -tomeCrafts.ordain.cost, 'yellow', 'red');
        numberChange('vault', 'tome', -1, 'blue', 'red');
        tomeCrafts.ordain.cost =  Math.floor(tomeCrafts.ordain.cost *  tomeCrafts.ordain.costMultiplier);
        document.getElementById('ordainCost').innerHTML= tomeCrafts.ordain.cost;
        cult.priests.unlocked = true;
        document.getElementById('priestsWrap').style.display='block';
        document.getElementById('priestsPeg').style.display= 'block';
        comment('So much easier this way');
    }
};
//unlocks

function unlockPriestVault(){
    if(stats.vision.current >= 242 && cult.chanters.current>=2 && cult.faithful.current >=4 && cult.sentinels.current >=2){
        numberChange('stats', 'vision', -242, '', 'red');
        numberChange('cult', 'chanters', -2, '', 'red');
        numberChange('cult', 'faithful', -4, '', 'red');
        numberChange('cult', 'sentinels', -2, '', 'red');
        setTimeout(() => {
        document.getElementById('priestActions').style.display='flex';
        }, 800);
        cult.priests.vaultActions = true;
        tomeCrafts.priestVaultActions.purchased= true;
        flashFade('priestVaultActionsOneOff');
    }
}
function unlockPriestInn(){
    if(stats.vision.current >= 484 && stats.charm.current >=484){
        numberChange('stats', 'vision', -484, '', 'red');
        numberChange('stats', 'charm', -484, '', 'red');
        cult.priests.recruitInnocents = true;
        tomeCrafts.inn.purchased= true;
        flashFade('innOneOff');
    }
}
function evangelism(){
    if(stats.vision.current >= 848 && vault.gold.current>=848){
        numberChange('stats', 'vision', -848, '', 'red');
        numberChange('vault', 'gold', -848, '', 'red');
        cult.priests.altar= true;
        tomeCrafts.evangelism.purchased= true;
        flashFade('evangelismOneOff');
    }
}
function unlockPriestFaith(){
    if(stats.vision.current >= 4884 && vault.tome.current>=1){
        numberChange('stats', 'vision', -4884, '', 'red');
        numberChange('vault', 'tome', -1, '', 'red');
        cult.priests.convertFaithful = true;
        tomeCrafts.faith.purchased= true;
        flashFade('faithOneOff');
    }
}

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
    if (firstAssetAmount >= 16 && cult.priests.current>=1) {
        numberChange('vault', firstAsset, -loss, 'blue', 'red');
        numberChange('vault', secondAsset, gain, 'blue', 'red');
    }
}
function buildPriestActions() {
    const tomeCraftsBox = document.getElementById('tomeCraftsBox');
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
    tomeCraftsBox.insertBefore(priestActionsBox, pagesDiv.nextSibling);
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
    if(cult.priests.current >=1 && cult.faithful.current>=4 && vault.ichor.current >= tomeCrafts.enscribe.cost){
        buttonGlow("enscribeWrap");
        numberChange("cult", "priests", -1, "", "purple");
        numberChange("cult", "faithful", -4, "", "purple");
        numberChange("vault", "ichor", -tomeCrafts.enscribe.cost, "", "purple");
        tomeCrafts.enscribe.cost *=2;
        document.getElementById('enscribeCost').innerHTML = tomeCrafts.enscribe.cost;
        if(cult.scribes.current === 0){
            document.getElementById('scribesWrap').style.display = 'block';
        }
        numberChange("cult", "scribes", 1, "purple", "");
        comment("The drool is a little off putting. (+1 Scribe with attendants)");        
    }
};

function trickApprentice(){
    if(cult.faithful.current>=1 && vault.tome.pageCounter>=tomeCrafts.trickApprentice.cost && madMin(484)){
        buttonGlow("trickApprenticeWrap");
        numberChange("cult", "faithful", -1, "", "red");
        vault.tome.pageCounter-=tomeCrafts.trickApprentice.cost;
        document.getElementById("pages").innerHTML= vault.tome.pageCounter;
        if(cult.apprentices.unlocked===false){
            cult.apprentices.unlocked=true;
            document.getElementById("apprenticesWrap").style.display="block";
        }
        numberChange("cult", "apprentices", 1, "green", "");
    }
}

//=======================
//                                      IchorCrafts
//=======================
let ichorCrafts = {
  drinkIchor: {
        callString: 'drinkIchor',
        string: 'Drink',
        description: ['Too salty by far, with a boiled pork scent.', 'Cost: Ichor ', 'Benefit: 44 Health Maximum'],
        madMin: " Minimum Madness: 248",
        func: drinkIchor,
        unlocked: true,
        purchased: true,
        permanent: true
  },
  resonator: {
        callString: 'resonator',
        string: 'Pineal Resonator',
        description: ['Unlocks Vision of things Beyond.', 'Cost: Ichor, possibly an Innocent ', 'Benefits: passive Vision, Madness, Terror'],
        madMin: " Minimum Madness: 444",
        unlockText: 'From Beyond?',
        lockCost: '888 Vision. 888 Pages',
        pagesCost:888,
        unlockCost: 888,
        ticCounter:[0,44],
        toggle: false,
        func: resonatorToggle,
        unlocked: false,
        purchased: false,
        permanent: true
  },
  brainJar: {
        callString: 'brainJar',
        string: 'Brain Jars',
        description: ['Preserving the Faithful in Brain Jars allows West to keep them forever.', 'Cost: 1 Faithful, Ichor ', 'Benefits: 1 Brined'],
        madMin: " Minimum Madness: 888",
        pagesCost:4444,
        unlockText: 'Canning?',
        lockCost: '4444 Vision, 4444 Pages',
        unlockCost: 4444,
        cost: 8,
        func: brainJar,
        unlocked: false,
        purchased: false,
        permanent: true
  },
  reanimate: {
        callString: 'reanimate',
        string: 'Reanimate',
        description: ['Puttin on the Ritz! Requirement: unpaired Brined ', 'Cost: Flesh 8, Ichor ', 'Benefit: 1 Reanimated'],
        madMin: " Minimum Madness: 888",
        pagesCost:4444,
        unlockText: "Its pronounced Egor?",
        lockCost: '4444 Vision, 4444 Pages',
        unlockCost: 4444,
        cost: 4,
        func: reanimate,
        unlocked: false,
        purchased: false,
        permanent: true
  },
  whateley: {
        callString: 'whateley',
        string: 'whateley',
        description: ['It is the Gate and the Key! It is... a small, rather hideous, child right now.', 'Cost: Radiance 1 ,  Ichor ', 'Benefits: Vision, eventually the child will mature.'],
        description2: ['It is the Gate and the Key! It is... a rather ugly little boy who seems to be growing an extra arm.', 'Cost:  Radiance 2 , Ichor ', 'Benefits: more Vision, a growing boy.'],
        description3: ['It is the Gate and the Key! It is... getting to be a little large and has too many eyes by far.', 'Cost: Radiance 4, Ichor ', 'Benefits: more passive Vision, Madness, and Terror, a fearful thing gnawing in the attic.'],
        description4: ['It is the Gate and the Key! It is... ready for the final invocation.', 'Cost: Radiance 88 , Ichor ', 'Benefits: Beware.'],
        cost: 1,
        counter:[0,8],
        stage: 1,
        telepathyBool: false,
        telepathy: 4,
        telepathyCounter: [0, 8],
        func: whateley,
        unlocked: false,
        purchased: false,
        permanent: true
  }
};

//=============================
//                                      IchorCrafts actions
//=============================
function drinkIchor(){
    if(vault.ichor.current>=1 && madMin(248)){
        buttonGlow("drinkIchorWrap");
        numberChange('vault', 'ichor', -1, 'red', 'red');
        comment('+44 Maximum Health', 'green');
        stats.health.max += 44;
        document.getElementById("healthDesc").innerHTML= "Health will drift up or down toward West's base Health, currently: " + Math.floor(stats.health.max);
        numberChange('stats', 'health', (stats.health.max-stats.health.current), 'green', '');
    }
}

function resonatorToggle(){
    if(ichorCrafts.resonator.toggle === false){
    ichorCrafts.resonator.toggle = true;
    document.getElementById('resonatorToggle').style.backgroundColor='green';
    }else{
    ichorCrafts.resonator.toggle = false;
    document.getElementById('resonatorToggle').style.backgroundColor='red';
    }
}

function resonate(tics){
    if(ichorCrafts.resonator.ticCounter[0] < ichorCrafts.resonator.ticCounter[1]){
        ichorCrafts.resonator.ticCounter[0]+=tics;
    }else{
        ichorCrafts.resonator.ticCounter[0] -= ichorCrafts.resonator.ticCounter[1];
        if(vault.ichor.current>=1){
            numberChange("vault", "ichor", -1, "", "red");
            numberChange("stats", "vision", 848, "blue", "");
            numberChange("stats", "madness", 848, "blue", "");
            numberChange("vault", "terror", 848, "blue", "");
            comment("The Resonator echoes in the very soul. (-1 Ichor, 848 Vision, Madness, and Terror caused.", "lavender");
            if (Math.random() < 0.44){
                numberChange("cult", "innocents", -1, "", "blue");
                numberChange("cult", "insane", 1, "blue", "");
                comment("Some can't cope with the Visions the Resonator brings. (-1 Innocent, +1 Insane)", "lightskyblue");
            }
            if (Math.random() < 0.22){
                numberChange("cult", "innocents", -1, "", "blue");
                numberChange("vault", "flesh", 1, "blue", "");
                comment("The Resonator is a door which opens both ways. (-1 Innocent, +1 Flesh)", "red");
            }
        }else{
            resonatorToggle();
        }
    }
}
function addResonator(){//called at crafts creation
    let resonatorW = document.getElementById('resonatorWrap');
    const button = document.createElement("button");
    button.textContent = " ";
    button.id="resonatorToggle"; 
    resonatorW.appendChild(button);
}


function brainJar(){
    if(vault.ichor.current >= ichorCrafts.brainJar.cost && cult.faithful.current>=1 && madMin(888)){
        buttonGlow("brainJarWrap");
        numberChange("vault", "ichor", -ichorCrafts.brainJar.cost, "", "red");
        numberChange("cult", "faithful", -1, "", "red");
        numberChange("cult", "brined", 1, "purple", "");
        permanentChanges.brined++;
        ichorCrafts.brainJar.cost +=8;
        document.getElementById("brainJarCost").innerHTML= ichorCrafts.brainJar.cost;
        comment("Pickled Faithful? How will they get around, I wonder?");
        if(cult.brined.unlocked===false){
            cult.brined.unlocked= true;
            document.getElementById("brinedWrap").style.display="block";
            ichorCrafts.reanimate.unlocked= true;
            document.getElementById("reanimateLock").style.display="block";
        }
    }
}

function reanimate(){
    if(cult.reanimated.current<cult.brined.current){
        if(vault.ichor.current >= ichorCrafts.reanimate.cost && vault.flesh.current>= 8 && madMin(888)){
            buttonGlow("reanimateWrap");
            numberChange("vault", "ichor", -ichorCrafts.reanimate.cost, "", "red");
            numberChange("vault", "flesh", -8, "", "red");
            numberChange("cult", "reanimated", 1, "purple", "");
            ichorCrafts.reanimated.cost +=8;
            document.getElementById("reanimateCost").innerHTML= ichorCrafts.reanimate.cost;
            comment("Family traditions and such.");
            if(cult.reanimated.unlocked===false){
                cult.reanimated.unlocked= true;
                document.getElementById("reanimatedWrap").style.display="block";
            }
        }
    }else{
        comment("Reanimated need Brined for purpose.");
    }
}

function whateleyPay(){
    if (vault.ichor.current >= ichorCrafts.whateley.cost && stats.radiance.current>= ichorCrafts.whateley.cost) {
        numberChange("vault", "ichor", - ichorCrafts.whateley.cost, "", "purple");
        numberChange("stats", "radiance", - ichorCrafts.whateley.cost, "", "purple");
        ichorCrafts.whateley.counter[0]++;
        buttonGlow("whateleyWrap");
        if(ichorCrafts.whateley.counter[0] >= ichorCrafts.whateley.counter[1]){
            ichorCrafts.whateley.stage++;
             ichorCrafts.whateley.cost*=2;
             if( ichorCrafts.whateley.stage===4){
             ichorCrafts.whateley.cost=88;
             }
            ichorCrafts.whateley.counter[0]=0;
            document.getElementById("whateleyDesc").innerHTML=ichorCrafts.whateley["description" + (ichorCrafts.whateley.stage)][0];
            document.getElementById("whateleycost").innerHTML=ichorCrafts.whateley["description" + (ichorCrafts.whateley.stage)][1];
            document.getElementById("whateleyCost").innerHTML=ichorCrafts.whateley.cost;
            document.getElementById("whateleyBenefit").innerHTML=ichorCrafts.whateley["description" + (ichorCrafts.whateley.stage)][2];
            return "staged";
        }
        return true;
    }else{return false;
    }
}

function whateleyTelepathy(tics){
    ichorCrafts.whateley.telepathyCounter[0]+=tics;
    if(ichorCrafts.whateley.telepathyCounter[0] >= ichorCrafts.whateley.telepathyCounter[1]){
        ichorCrafts.whateley.telepathyCounter[0]-=ichorCrafts.whateley.telepathyCounter[1];
            numberChange("stats", "vision", ichorCrafts.whateley.telepathy, "green", "");
            numberChange("stats", "madness", ichorCrafts.whateley.telepathy, "green", "");
            numberChange("cult", "terror", ichorCrafts.whateley.telepathy*8, "green", ""); 
    }
}

function whateley(){
    if(ichorCrafts.whateley.stage===1){
        if(whateleyPay()===true){
                ichorCrafts.whateley.purchased=true;
                numberChange("stats", "vision", 222, "green", "");
                comment("West deciphers ancient patterns from the infant's ceaseless wailing. (+222 Vision)");
        }
    }else if(ichorCrafts.whateley.stage===2){//unlocks dylath leen
        if(whateleyPay() === "staged"){
            dreamEx.dylath.unlocked = true;
            document.getElementById('dylathWrap').style.display='block';
            numberChange("stats", "vision", 444, "green", "");
            eventBox("images/godsAppeased/whateley2.jpg", "Childhood", "The writhing mass has grown several hypnotic eyes and a third arm. It whispers to West that only the Black Ship can travel to Kadath. (Dylath-Leen dream expedition unlocked, +444 Vision)");
        }else if (whateleyPay()===true){
            numberChange("stats", "vision", 444, "green", "");
            comment("It calls out to West late at night, sharing secrets no mortal has ever known. (+444 Vision)");
        }
    }else if(ichorCrafts.whateley.stage===3){//starts telepathy loop
        if(whateleyPay() === "staged"){
            ichorCrafts.whateley.telepathyBool = true;
            eventBox("images/godsAppeased/whateley3.jpg", "Adulthood", "The heaving mass shakes the foundation as it begins to send out telepathic Visons of far off realms and places where space and time collapse. The Faithful fear what this portends. (passive Vision, Madness, and Terror, which grow with each feeding.)");
        }else if (whateleyPay()===true){
            ichorCrafts.whateley.telepathy+=4;
            numberChange("stats", "vision", 888, "green", "");
            comment("Hiding the abomination's bulk is growing difficult to hide, but the ceaseless telepathic Visions it sends out are worth the risk. (increased telepathic Vision, Madness, and Terror)");
        }
    }else if(ichorCrafts.whateley.stage===4){
        if(whateleyPay()===true){
            ichorCrafts.whateley.permanent=false;
            flashFade("whateleyWrap");
            godsAppeased.yogsothothAppeased.unlocked=true;
            ichorCrafts.whateley.telepathy+=52;
            eventBox("images/godsAppeased/whateley4.jpg", "Yog-Sothoth", "Yog-Sothoth knows the gate. Yog-Sothoth is the gate. Yog-Sothoth is the key and guardian of the gate. Past, present, future, all are one in Yog-Sothoth. (Yog-Sothoth in Sacrarium)");
        }
    }
}
  
                                                                          //=========================================
                                                                                //                                      Tyog Crafts
                                                                                //=========================================
                                                                                
tyogCrafts = {
    unlockChoir: {
        callString: 'unlockChoir',
        string: 'Eternal Song',
        description: ["A soul binding ritual to enhance West's Charm", 'Cost: Vision 848, Pages ', 'Benefit: ?'],
        func: unlockChoir,
        cost: 484,
        unlocked: true,
        purchased: false,
        permanent: false
    },
    festival: {
        callString: 'festival',
        string: 'Festival of Open Hands',
        description: ["A joyous time of celebration and giving. Withholding would be...unwise.", 'Cost: 888 Charm, 444 Gold', 'Benefits: increased Gold and Love from Faithful, reduced Terror for 888 tics.'],
        unlockText: 'Open Hands?',
        lockCost: '888 Vision, 888 Pages',
        unlockCost: 888,
        pagesCost: 888,
        counter:[0, 888],
        func: festival,
        unlocked: false,
        active: false,
        purchased: false,
        permanent: true
    },
    mass:{
        callString: 'mass',
        string: 'Black Mass',
        description:["Participants are brought to the heights as Rhan winds her tendrils throughout.", " Cost: 164 Health and Charm, 16 Faithful, 16 Innocents ", " Benefits: 888 Love, 888 Terror, 32 Flesh, 44 Radiance"],
        unlockText: 'Black Mass?',
        lockCost: '848 Vision, 848 Pages',
        unlockCost: 848,
        pagesCost: 848,
        func: mass, 
        cost: '',
        unlocked: true,
        purchased: false,
        permanent: true
    },
    riteSpring: {
        callString: 'riteSpring',
        string: 'Rite of Spring',
        description: ["We send our Love into the Darkness", 'Cost: 1 Chanter, Love ', ' Increases Pit production for 888 tics. Does not stack.'],
        unlockText: 'Rite of Spring?',
        lockCost: '888 Vision, 888 Pages',
        unlockCost: 888,
        pagesCost: 888,
        counter:[0, 888],
        func: riteSpring,
        cost: 888,
        unlocked: false,
        active: false,
        purchased: false,
        permanent: true
    },
    winnowing: {
        callString: 'winnowing',
        string: 'The Winnowing',
        description: ['Let the Innocent prove their worth.',"Cost: 16 Innocents, 444 Love", 'Benefit: +2 Faithful.'],
        unlockText: 'The Winnowing?',
        lockCost: '888 Vision, 888 Pages',
        unlockCost: 888,
        pagesCost: 888,
        func: winnowing,
        cost: "",
        unlocked: false,
        purchased: false,
        permanent: true
    },
    summonShub:{
        callString: 'summonShub',
        string: 'Summon Shub Niggurath ',
        description: ["With aid, T'yog can bring forth the Goddess in a deep wood.","Ritual requires 4 Priests, Cost: Gold , ", 'Benefit: Shub Niggurath summoned (Sacrarium)'],
        func: summonShub,
        cost: 8888,
        unlocked: true,
        purchased: false,
        permanent: false
    },
    snakeHandling:{
        callString: 'snakeHandling',
        string: 'Snake Handling',
        description: ["Proof of Yig's love, this ritual inspires the Faithful, even as it Terrifies.","Cost: 1 unlucky Faithful, Charm ", 'Benefits: increased Love and Terror from Faithful for 888 tics.'],
        unlockText: 'Yig?',
        lockCost: '888 Vision, 888 Pages',
        unlockCost: 888,
        pagesCost: 888,
        func: snakeHandling,
        cost: 888,
        counter:[0, 888],
        unlocked: false,
        active: false,
        purchased: false,
        permanent: true
    },
    invokeYog: {
        callString: 'invokeYog',
        string: 'Invocation of Yog-Sothoth',
        description: ["Bringing forth such Radiance is a dangerous proposition.", 'Cost: 8 Radiance, 88 Health, 8 Innocents', 'Benefits: 8 Flesh, greatly increased Terror from Faithful and Sentinels for 888 tics'],
        unlockText: 'Invocation of Yog-Sothoth?',
        lockCost: '4848 Vision, 4848 Pages',
        unlockCost: 4848,
        pagesCost: 4848,
        counter:[0, 888],
        func: invokeYog,
        cost: "",
        unlocked: false,
        active: false,
        purchased: false,
        permanent: true
    },
    summonYog: {
        callString: 'summonYog',
        string: 'Summon Yog-Sothoth',
        description: ['With deeper understanding, completing the ritual to bring forth the Gate and the Key should take no time at all.', 'Cost: 1 Innocent, Radiance 8, Ichor ', 'Benefit: ?'],
        madMin: " Minimum Madness: 888",
        func: summonYog,
        cost: 8,
        unlocked: false,
        purchased: false,
        permanent: false
    }
};

function unlockChoir(){
    if(vault.tome.pageCounter >= 484 && stats.vision.current>=848){
        numberChange("stats", "vision", -848, "", "purple");
        vault.tome.pageCounter -= 484;
        document.getElementById("pages").innerHTML=vault.tome.pageCounter;
        flashFade("unlockChoirOneOff");
        tyogCrafts.unlockChoir.purchased=true;
        actionUpgrades.chant.choir.unlocked=true;
        document.getElementById("choirWrap").style.display="block";
    }
}

function festival(){
    if(stats.charm.current>=888 && vault.gold.current>=444){
        buttonGlow("festivalWrap");
        numberChange("stats", "charm", -888, "", "purple");
        numberChange("vault", "gold", -444, "", "purple");
        tyogCrafts.festival.active=true;
        comment("The Faithful's Love knows no bounds during this time.");
    }
}

function mass(){
    if(cult.faithful.current>=16 && cult.innocents.current >=16 && stats.health.current>=164 && stats.charm.current>=164){
        buttonGlow("massWrap");
        numberChange('stats', 'health', -164, '', 'purple');
        numberChange('stats', 'charm', -164, '', 'purple');
        numberChange('cult', 'faithful', -16, '', 'red');
        numberChange('cult', 'innocents', -16, '', 'red');
        numberChange('vault', "flesh", +32, 'purple', '');
        numberChange('stats', 'radiance', 44, 'blue', '');
        numberChange("vault", "love", 888, "purple", "");
        numberChange("vault", "terror", 888, "purple", "");
        godsAppeased.rhanAppeased.hungerCounter=0;
        comment("Exhausting, but rewarding. (+888 Love, +888 Terror, +32 Flesh, +44 Radiance)");
    }
}

function riteSpring(){
    if(cult.chanters.current >= 1 && vault.love.current >= 444){
        buttonGlow("riteSpringWrap");
        numberChange("cult", "chanters", -1, "", "red");
        numberChange("vault", "love", -444, "", "red");
        tyogCrafts.riteSpring.active = true;
    }
}

function winnowing(){
    if(cult.innocents.current>=16 && vault.love.current>=444){
        buttonGlow("winnowingWrap");
        numberChange("cult", "innocents", -16, "", "red");
        numberChange("vault", "love", -444, "", "red");
        numberChange("cult", "faithful", +2, "", "red");
        comment("We who are about to die salute you.");
    }
}

function summonShub(){
    if(vault.gold.current>tyogCrafts.summonShub.cost && cult.priests.current>=4){
        numberChange("vault", "gold", -tyogCrafts.summonShub.cost, "", "purple");
        gods.shub.unlocked = true;
        document.getElementById('shubWrap').style.display='block';
        comment("Shub Niggurath waits in the Sacrarium.");
        tyogCrafts.summonShub.purchased=true;
        flashFade("summonShubOneOff");
    }
}

function snakeHandling(){
    if(cult.faithful.current >= 2 && stats.charm.current >= 888){
        buttonGlow("snakeHandlingWrap");
        numberChange("cult", "faithful", -1, "", "red");
        numberChange("stats", "charm", -888, "", "red");
        tyogCrafts.snakeHandling.active = true;
    }
}



function invokeYog(){
    if(cult.innocents.current >= 8 && stats.health.current >= 88 && stats.radiance.current>=8){
        buttonGlow("invokeYogWrap");
        numberChange("cult", "innocents", -8, "", "red");
        numberChange("vault", "flesh", 8, "red", "");
        numberChange("stats", "radiance", -8, "", "purple"); 
        numberChange("stats", "health", -88, "", "red");
        tyogCrafts.invokeYog.active = true;
        comment("A little bleeding from the eyes is good for the tear ducts. Why is everyone so concerned? (Yog-Sothoth invoked)");
    }
}

function summonYog(){
    if(cult.innocents.current>=1 && vault.ichor.current>=8 && stats.radiance.current>=8){
        numberChange("cult", "innocents", -1, "", "purple");
        numberChange("vault", "ichor", -8, "", "purple"); 
        numberChange("stats", "radiance", -8, "", "purple"); 
        ichorCrafts.whateley.unlocked=true;
        document.getElementById("whateleyWrap").style.display = "block";
        flashFade("summonYogOneOff");
        comment("An infant? This will take forever. (Feed Whateley child in IchorCrafts)");
    }
}

                                                                             //=========================================
                                                                                //                                      Build Crafts
                                                                                //=========================================

let craftStringKeys = ['loveCrafts', 'terrorCrafts', 'goldCrafts', 'fleshCrafts', 'tomeCrafts', 'ichorCrafts', 'tyogCrafts'];
let boxStrings = ["Love", "Terror", "Gold", "Flesh", "Tome", "Ichor", "T'yog"];
    let loveKeys = Object.keys(loveCrafts);
    let terrorKeys = Object.keys(terrorCrafts);
    let goldKeys = Object.keys(goldCrafts);
    let fleshKeys = Object.keys(fleshCrafts);
    let tomeKeys = Object.keys(tomeCrafts);
    let ichorKeys = Object.keys(ichorCrafts);
    let tyogKeys = Object.keys(tyogCrafts);
let craftKeys = [loveKeys, terrorKeys, goldKeys, fleshKeys, tomeKeys, ichorKeys, tyogKeys];

function updateCrafts() {
    let craftTypeKeys = [loveCrafts, terrorCrafts, goldCrafts, fleshCrafts, tomeCrafts, ichorCrafts, tyogCrafts];
    for (let i = 0; i < craftKeys.length; i++) {
        for (let j = 0; j < craftKeys[i].length; j++) {
            let key = craftKeys[i][j];
            let craft = craftTypeKeys[i][key];
            // Skip rendering if locked externally or not unlocked
            if (craft.unlocked === false || craft.externalLock === true ) continue;   //completely locked show nothing
            if (craft.unlocked === true && craft.purchased===false && craft.unlockText) {
              //  console.log(key, "lock");
            let lock = document.getElementById(craft.callString + "Lock");                //unlocked not purchased with locktext
                lock.style.display = 'block';
            }else if (craft.unlocked === true && craft.purchased===false && craft.permanent===false){
            let oneOff = document.getElementById(craft.callString  + "OneOff");//unlocked oneoff not purchased with no locktext
                oneOff.style.display = 'block';
                //console.log(key, "no text");
                }
            if (craft.purchased===true && craft.permanent===false){
                if(craft.unlockText){
                    let oneOff = document.getElementById(craft.callString  + "Lock");
                    oneOff.style.display = 'none';
                }
                let oneOff = document.getElementById(craft.callString  + "OneOff"); //remove oneoffs during load
                oneOff.style.display = 'none';
                //console.log(key, "bought oneoff");
            }
            // Show main button if purchased
            if (craft.purchased === true && craft.permanent===true) {
                let wrap = document.getElementById(craft.callString + "Wrap");
                wrap.style.display = 'block';
                if(craft.unlockText){
                    let oneOff = document.getElementById(craft.callString  + "Lock");
                    oneOff.style.display = 'none';
                }
            }
        }
    }
}

function buildCraftBoxes() {
    let craftTypeKeys = [loveCrafts, terrorCrafts, goldCrafts, fleshCrafts, tomeCrafts, ichorCrafts, tyogCrafts];
    for (let i = 0; i < craftKeys.length; i++) {
        // Create container box
        const container = document.createElement("div");
        container.classList.add("craftBox");
        container.id = craftStringKeys[i] + "Box";
        const title = document.createElement("h2");
        title.classList.add("craftTitles");
        title.textContent =  boxStrings[i] + " Crafts";
        container.appendChild(title);
        document.getElementById("right").appendChild(container);
        if (craftKeys[i] === tomeKeys) pages(); // Special case for tomes
        //and individual crafts
        for (let j = 0; j < craftKeys[i].length; j++) {
            let craft = craftTypeKeys[i][craftKeys[i][j]];
            // === Build main button (permanent or one-off) ===
            if (craft.permanent === true) {
                const button = document.createElement("button");
                button.classList.add("craftWraps");
                button.id = craft.callString + "Wrap";
                const span = document.createElement("span");
                span.classList.add("craftLabels");
                span.textContent = craft.string;
                button.appendChild(span);
                container.appendChild(button);
            } else {
                const button = document.createElement("button");
                button.classList.add("craftOneOffs");
                button.id = craft.callString + "OneOff";
                const span = document.createElement("span");
                span.classList.add("craftLabels");
                span.textContent = craft.string;
                button.appendChild(span);
                container.appendChild(button);
            }
            // === Build lock button if unlockText exists ===
            if (craft.unlockText) {
                const lockButton = document.createElement("button");
                lockButton.classList.add("craftLocks");
                lockButton.id = craft.callString + "Lock";
                const lockText = document.createElement("span");
                lockText.classList.add("unlockText");
                lockText.textContent = craft.unlockText;
                lockButton.appendChild(lockText);
                container.appendChild(lockButton);
            }
        }
    }
    ['regaliaOneOff', 'pagentryOneOff', 'devotionalsOneOff'].forEach(id => {//fixing the locks for oneoffs
        const el = document.getElementById(id);
        if (el && el.classList.contains('craftOneOffs')) {
            el.classList.replace('craftOneOffs', 'craftLocks');
        }
    });
    // === Second pass to show/hide after rendering ===
updateCrafts();
}


buildCraftBoxes();
makeSacrificeChoices();
addTithe();
addResonator();
 buildPriestActions();


//priests

