
          	//=========================================
	//  Gods
	//=========================================
let gods = {
    rhan: {
        string: 'Rhan-Tegoth',
        description: ['She must be awakened first, though she brings Madness, Terror and Death in her wake. Madness Minimum: 168 ', 'Ritual Requires 1 Priest, Offering Required: Insane '],
        cost: 8,
        func: rhan,
        unlocked: false,
        active: false,
        purchased: false
    },
    dagon: {
        string: 'Dagon', 
        description: ['Gain his blessing. Madness Minimum: 484', ' Offering Required: Radiance 88, Ichor '],
        cost: 4,
        radCost: 88,
        func: dagon,
        unlocked: false,
        active: false,
        purchased: false
    },
    yig: {
        string: 'Yig',
        description: ['Yig only blesses those who can withstand her bite. Madness Minimum: 444 ', 'Offering Required: 8 Radiance, 444 Health loss without dropping into a coma.'],
        costs: 444,//added s to prevent dom interference
        radCost: 8,
        func: yig,
        unlocked: false,
        active: false,
        purchased: false
    },
    tsathoggua: {
        string: 'Tsathoggua',
        description: ['In the Black Depths, the gargantuan toad god Tsathoggua waits lazily for sacrifice. Madness Minimum: 888 ', 'Ritual Requires 8 Sentinels, Offering Required: 16 Radiance, Faithful '],
        cost: 16,//faithful
        radCost: 16,
        func: tsathoggua,
        unlocked: false,
          active: false,
        purchased: false
    },
    shub: {
        string: 'Shub Niggurath',
        description: ["Deep within the wood, T'yog weaves a ritual of Summoning. Madness Minimum: 484", 'Offering Required: 84 Innocents, 48 Faithful, 484 Radiance'],
        unlocks: 'darkYoung',
        cost: "",
        radCost: 484,
        func: shub,
        unlocked: false,
          active: false,
        purchased: false
    },
    nyar: {
        string: 'Nyarlathotep',
        description: ['We have waited so long for you to come a calling. Dance with us. Madness Minimum: 248 ', ''],
        unlocks: 'reset1',
        cost: '',
        func:nyar,
        unlocked: false,
          active: false,
        purchased: false
    },
    cthulhu: {
        string: 'Cthulhu',
        description: ["That is not dead which can... well anyway West can feel the God's gaze upon him, urging him onward. Madness Minimum: 848 ", ''],
        unlocks: 'immortality',
        cost: '',
        madCost: 848,
        func:cthulhu,
        unlocked: false,
          active: false,
        purchased: false
    }
};

let godKeys = Object.keys(gods);
function buildGods(){
    for(i=0;i<godKeys.length;i++){
            document.getElementById('gods').innerHTML +=
                "<button class='godsWraps' id='" + godKeys[i] + "Wrap'>" +
                "<span class='godTitles'>" + gods[godKeys[i]].string + "</span>" +
                "</button>";
    }
};
buildGods();

    	//=========================================
	// god events
	//=========================================


function rhan(){
    if(cult.insane.current >= gods.rhan.cost && madMin(168) && cult.priests.current >0){
        numberChange('cult', 'insane', -gods.rhan.cost, 'blue', 'red');
        numberChange('stats', 'radiance', 16, 'blue', 'red');
        numberChange('stats', 'madness', 168, 'blue', 'red');
        numberChange('vault', 'flesh', 8, 'red', 'red');
        numberChange('vault', 'terror', 168, 'red', 'red');
        stats.radiance.unlocked = true;
        vault.flesh.unlocked = true;
        gods.rhan.purchased = true;
        godsAppeased.rhanAppeased.unlocked = true;
        terrorCrafts.sacrifice.unlocked = true;
        terrorCrafts.sacrifice.purchased = true;
        flashFade('rhanWrap');
        godsAppeased.rhanAppeased.unlocked = true;
        document.getElementById('rhanAppeasedWrap').style.display='block';
        document.getElementById('sacToggle').style.display='block';
        document.getElementById('sacrificeWrap').style.display='block';
        document.getElementById('fleshWrap').style.display = 'block';
        document.getElementById('radianceBox').style.display='block';
        eventBox("images/godsAppeased/rhanAppeased.jpg", "Rhan-Tegoth", "She is pleased at the offerings the Priest prepares, but She is ever hungry.(-8 Insane, Madness +168, Terror +168, Radiance +8, Sacrifice unlocked in TerrorCrafts, Rhan in Sacrarium -Rhan will feed if not appeased, preferring the Insane over all others.)" );
        comment('so Hungry...(Sacrifice in TerrorCrafts)', 'pink');
    }
}

function nyar(){
    if(madMin(248)){
        godsAppeased.nyarAppeased.unlocked = true;
        document.getElementById('nyarAppeasedWrap').style.display='block';
        shakeBody();
        eventBox("images/godsAppeased/nyarAppeased.jpg", "Destiny", "Shall we dance?");
        let parent = document.getElementById('eventBox');
        let yes =  document.createElement('button');
        yes.id = 'yes';
        yes.innerHTML = 'Yes!';
        parent.appendChild(yes);
        let no =  document.createElement('button');
        no.id = 'no';
        no.innerHTML = 'no...';
        parent.appendChild(no);
        document.getElementById('yes').addEventListener('pointerdown',   () => nyarReset());
        document.getElementById('no').addEventListener('pointerdown',   () => nony());
    }
}
function nony(){
    closeEventBox();
    cancelShakeAnimation();
}

function dagon(){
    if(vault.ichor.current>= gods.dagon.cost && stats.radiance.current >= gods.dagon.radCost){
        numberChange('vault', 'ichor', -gods.dagon.cost, 'red');
        numberChange('stats', 'radiance', -gods.dagon.radCost, 'red');
        eventBox('images/relics/dagonsBlessing.jpg', 'Dagon', 'Seated on a Thone of coral, Dagon silently grants his Blessing. West gains hidden gills, webbing, and immunity to the crushing Depths. (Doubles Reef and Deep Trade effectiveness, Ocean Depths unlocked.)');
        world.reef.description2 =  ['Welcomed as a peer, the Deep Ones solemnly offer their services to West.', 'Cost: Innocents ', 'Benefit: 2 Hybrids'],
        world.reef.stage=3;
        world.depths.unlocked = true;
        document.getElementById('depthsWrap').style.display='block';
        fleshCrafts.deepTrade.benefit = fleshCrafts.deepTrade.benefit * 2;
        document.getElementById('deepTradeBenefit').innerHTML = "Benefit: Gold " + fleshCrafts.deepTrade.benefit;
        relics.dagonsBlessing.unlocked = true;
        document.getElementById('dagonsBlessingWrap').style.display='block';
        gods.dagon.purchased = true;
        flashFade('dagonWrap');
        godsAppeased.dagonAppeased.unlocked = true;
        document.getElementById('dagonAppeasedWrap').style.display='block';
    }
}

function yig(){
    if(stats.radiance.current>=8 && madMin(444) && stats.health.current>=444){
        flashFade('yigWrap');
        numberChange("stats", "health", -444, "", "purple");
        gods.yig.purchased=true;
        godsAppeased.yigAppeased.purchased = true;
        document.getElementById('yigAppeasedWrap').style.display='block';
        stats.health.max*=2;
        document.getElementById("healthDesc").innerHTML= "Health will drift up or down toward West's base Health, currently: " + Math.floor(stats.health.max);
        tyogCrafts.snakeHandling.unlocked=true;
        document.getElementById("snakeHandlingLock").style.display="block";
        eventBox('images/godsAppeased/yig.jpg', 'Yig', "Enduring the agony of the Venom changes West, but the god is pleased. (Health capacity doubled, Snake Handling in TyogCrafts");
       }
}

function tsathoggua(){
    if(cult.sentinels.current>=8 && cult.faithful.current>=16 && madMin(888)){
        numberChange('cult', 'faithful', -16, '', 'red');
        numberChange('stats', 'radiance', -16, 'red', 'red');
        gods.tsathoggua.purchased = true;
        flashFade('tsathogguaWrap');
        godsAppeased.tsathogguaAppeased.unlocked = true;
        document.getElementById('tsathogguaAppeasedWrap').style.display='block';
        eventBox('images/godsAppeased/tsathAppeased.jpg', 'Tsathoggua', "West feels ponderous thoughts drift closer to consciousness as the sacrifices are forced into the creature's gaping maw. Chewing slowly, the god assents to being moved and rewards West with the skill to Dream endlessly. Too lazy to seek out food, his thoughts of hunger stir fear in the Faithful. (Tsathoggua beneath Sacrarium, Dream Toggle in West Tab, Devouring Maw unlocked in TerrorCrafts) ");
        terrorCrafts.maw.unlocked = true;
        document.getElementById('mawWrap').style.display = 'block';
        actions.dream.toggleBool = true;
        document.getElementById('dreamToggle').style.display='block';
        document.getElementById('dreamWrap').removeEventListener("pointerdown", startDreamTimer);
        document.getElementById('dreamWrap').addEventListener('pointerdown',  dreamToggle);
    }
}

function shub(){//Madness Minimum: 484', 'Offering Required: 88 Innocents, 484 Radiance
    if(cult.innocents.current >= 84 && cult.faithful.current >= 48 && stats.radiance.current >= 484 && madMin(484)){
        numberChange('cult', 'innocents', -84, '', 'red');
        numberChange('cult', 'faithful', -48, '', 'red');
        numberChange('stats', 'radiance', -484, 'red', 'red');
        gods.shub.purchased = true;
        flashFade('shubWrap');
        eventBox('images/godsAppeased/shubAppeased.jpg', 'Shub Niggurath', "Iä! Shub Niggurath! Black Goat of the Woods and Mother of 1000! T'yog falls prone at the sight of the Goat and must be prodded to finish the ritual. (Black Goat in Sacrarium, Breeding Pits output quadrupled.)");
        terrorCrafts.breedingPits.shub = true;
        document.getElementById('breedingPitsDesc').innerHTML = "Iä! Current stock produces 4 Innocents every " + Math.ceil(40/terrorCrafts.breedingPits.level) + " seconds.";
        document.getElementById('breedingPitsBenefit').innerHTML = "Increasing the herd size will produce Innocents every " + Math.ceil(40/(terrorCrafts.breedingPits.level + 1)) + " seconds(+88 Terror).";
        relics.goat.unlocked = true;
        document.getElementById("goatWrap").style.display='block';
        godsAppeased.shubAppeased.unlocked = true;
        document.getElementById('shubAppeasedWrap').style.display='block';
    }
}

function cthulhu(){
    if(stats.madness.current >= 848){
        flashFade('cthulhuWrap');
        gods.cth.purchased = true;
        eventBox('images/godsAppeased/cthulhuAppeased.jpg', 'Chtulhu', "A terrible cacophany of sensations registers to West's warped senses as the great being's laughter. West's Essence crystalizes across countless eons as timeless beings take notice. (Immortality gained -view in Sacrarium)");
        relics.immortality.unlocked = true;
        permanentChanges.immortality= true;
        document.getElementById('immortalityWrap').style.display='block';
        godsAppeased.cthAppeased.unlocked = true;
        document.getElementById('cthulhuAppeasedWrap').style.display='block';
       }
}


          	//=========================================
	//  Gods Appeased
	//=========================================

let godsAppeased = {
    rhanAppeased: {
        string: 'Rhan-Tegoth',
        description: ['Brought forth for the Sacrifice, her thoughts echo in the halls. (Passive Vision, Madness and Terror) She must be appeased regularly.'],
        unlocked: false,
        ticCounter: [0,4.4],
        hungerCounter: [0,88]
  },
    nyarAppeased:{
        string: 'Nyarlathotep',
        description: ['Content to wait until you choose to dance with him once more.'],
        unlocked: false
    }, 
    dagonAppeased:{
        string: 'Dagon',
        description: ['Hybrid children will provide Dagon with Flesh regularly, at any cost.'],
        unlocked: false,
        hungerCounter: [0,88.8]
    },
    yigAppeased:{
        string: 'Yig',
        description: ["Yig moves rarely, choosing the Innocents when she hungers. (Yig will consume an Innocent occasionally.)"],
        unlocked: false,
        hungerCounter: [0,444]
    }, 
    tsathogguaAppeased:{
        string: 'Tsathoggua',
        description: ["As his hunger grows, so too will the Terror of the Faithful. (increasing Passive Terror until The Devouring Maw is satiated in TerrorCrafts)"],
        unlocked: false,
        terror: 0,
        hungerCounter: [0,444]
    }, 
    shubAppeased:{
        string: 'Shub-Niggurath',
        description: ["Her presence is more felt than seen, with her herald as a constant reminder."],
        unlocked: false
    }, 
    cthulhuAppeased:{
        string: 'Cthulhu',
        description: ["Though only as a fragment of a dream, great Tulu remembers you fondly. (Immortality achieved."],
        unlocked: false
    }, 
    yogsothothAppeased:{
        string: 'Yog-Sothoth',
        description: ['Through the Opener of Ways, nothing is hidden from West.'],
        unlocked: false
    },
    devourerAppeased:{
        string: 'Dark Devourer',
        description: ['No stars left to glisten in the sky. No light left in the human heart.'],
        unlocked: false
    }
};

let godsAppeasedKeys = Object.keys(godsAppeased);
function buildGodsAppeased(){
    const godsAppeasedContainer = document.getElementById('godsAppeased');
    godsAppeasedKeys.forEach(key => {
        const godsAppeasedWrap = document.createElement('span');
        godsAppeasedWrap.className = 'godsAppeasedWraps';
        godsAppeasedWrap.id = `${key}Wrap`;
        const godsAppeasedImage = document.createElement('img');
        godsAppeasedImage.src = `images/godsAppeased/${key}.jpg`;
        godsAppeasedImage.alt = key;
        godsAppeasedImage.className = 'godsAppeasedImage';
        godsAppeasedWrap.appendChild(godsAppeasedImage);
        const godsAppeasedText = document.createElement('span');
        godsAppeasedText.className = 'godsAppeasedText';
        godsAppeasedText.textContent = godsAppeased[key].string; 
        godsAppeasedWrap.appendChild(godsAppeasedText);
        godsAppeasedContainer.appendChild(godsAppeasedWrap);
    });
}
buildGodsAppeased();

          	//=========================================
	//  God loops
	//=========================================
        
function rhanAppeased(){
    godsAppeased.rhanAppeased.ticCounter[0]++;
    if(godsAppeased.rhanAppeased.ticCounter[0] >=  godsAppeased.rhanAppeased.ticCounter[1]){
        godsAppeased.rhanAppeased.ticCounter[0] -=  godsAppeased.rhanAppeased.ticCounter[1];
        numberChange('stats', 'madness', 2, 'red', 'blue');
        numberChange('stats', 'vision', 2, '#40E0D0', 'red');
        numberChange('vault', 'terror', 4, 'red', 'blue');
    }
    //hunger resets on sac
    godsAppeased.rhanAppeased.hungerCounter[0]++;
    if(godsAppeased.rhanAppeased.hungerCounter[0]>=godsAppeased.rhanAppeased.hungerCounter[1]){
        godsAppeased.rhanAppeased.hungerCounter[0] = 0;
        rhanSac();
    }
}


function yigAppeased(){
    godsAppeased.yigAppeased.hungerCounter[0]++;
    if(godsAppeased.yigAppeased.hungerCounter[0] >= godsAppeased.yigAppeased.hungerCounter[1]){
        godsAppeased.yigAppeased.hungerCounter[0] -= godsAppeased.yigAppeased.hungerCounter[1];
        if(cult.innocents.current>=1){
            numberChange("cult", "innocents", -1, "", "red");
            comment("Yig has fed. (-1 Innocent)");
        }else{
            flashFade('yigAppeasedWrap');
            gods.yig.purchased = false;
            godsAppeased.yigAppeased.unlocked = false;
            document.getElementById('yigWrap').style.display='block';
            document.getElementById('yigAppeasedWrap').style.display='none';
            stats.health.max=stats.health.max/2;
            document.getElementById("healthDesc").innerHTML= "Health will drift up or down toward West's base Health, currently: " + Math.floor(stats.health.max);
            comment("Displeased that its preferred meal (Innocents) was missing, Yig has abandoned West and must be appeased once more. (Health capacity halved)");
        }
    }
}

function tsathogguaAppeased(){
    godsAppeased.tsathogguaAppeased.hungerCounter[0]++;
    if(godsAppeased.tsathogguaAppeased.hungerCounter[0]>godsAppeased.tsathogguaAppeased.hungerCounter[1]){
        godsAppeased.tsathogguaAppeased.hungerCounter[0]=0;
        godsAppeased.tsathogguaAppeased.terror  += 4;
        numberChange('vault', 'terror', godsAppeased.tsathogguaAppeased.terror, 'purple', '');
    }
}

function dagonAppeased(){
    godsAppeased.dagonAppeased.hungerCounter[0]++;
    if(godsAppeased.dagonAppeased.hungerCounter[0] >= godsAppeased.dagonAppeased.hungerCounter[1]){
        godsAppeased.dagonAppeased.hungerCounter[0] -= godsAppeased.dagonAppeased.hungerCounter[1];
        if(vault.flesh.current>=1){
            numberChange("vault", "flesh", -1, "", "red");
            numberChange("vault", "gold", 88, "blue", "red");
            comment("Dagon has been fed. (-1 Flesh, +88 Gold)");
        }else if(cult.innocents.current>=1){
            numberChange("cult", "innocents", -1, "", "red");
            numberChange("vault", "gold", 88, "blue", "red");
            comment("Dagon has been fed. (-1 Innocent, +88 Gold)");
        }else if(cult.insane.current>=1){
            numberChange("cult", "insane", -1, "", "red");
            numberChange("vault", "gold", 88, "blue", "red");
            comment("Dagon has been fed. (-1 Insane, +88 Gold)");
        }else if(cult.faithful.current>=1){
            numberChange("cult", "faithful", -1, "", "red");
            numberChange("vault", "gold", 88, "blue", "red");
            comment("Dagon has been fed. (-1 Faithful, +88 Gold)");
        }else if(cult.chanters.current>=1){
            numberChange("cult", "chanters", -1, "", "red");
            numberChange("vault", "gold", 88, "blue", "red");
            comment("Dagon has been fed. (-1 Chanter, +88 Gold)");
        }else if(cult.sentinels.current>=1){
            numberChange("cult", "sentinels", -1, "", "red");
            numberChange("vault", "gold", 88, "blue", "red");
            comment("Dagon has been fed. (-1 Sentinel, +88 Gold)");
        }else if(cult.hybrids.current>=1){
            numberChange("cult", "hybrids", -1, "", "red");
            numberChange("vault", "gold", 88, "blue", "red");
            comment("Dagon has been fed. (-1 Hybrid, +88 Gold)");
        }else{
            numberChange("stats", "health", -88, "", "red");
            numberChange("vault", "gold", 88, "blue", "red");
            comment("Dagon has been fed. (-88 Health, +88 Gold)");
        }
    }
}

function godsTic(tics){
    for(i=0; i<tics; i++){
        for(let i = 0; i < godsAppeasedKeys.length; i++){
            let key = godsAppeasedKeys[i];
            if (godsAppeased[key].unlocked && (godsAppeased[key].ticCounter || godsAppeased[key].hungerCounter)) {
                window[key]();
            }
        }
    }
}

          	//=========================================
	//  Relics
	//=========================================

let relics = {
    marceline:{
        string: 'Marceline',
        description: ["The painting provokes Visions in West, but the garrote of human hair stalking the night worries the Faithful. (passive Vision and Madness, occasional Terror and loss of an Innocent)"],
        unlocked: false,
        ticCounter: [0, 8.8],
        hairCounter: [0,88.8]
    }, 
    amulet:{
        string: 'Hound Amulet',
        description: ["The Hound is helpful in procuring Flesh, though it takes its toll. (Sentinels are twice as effective on expeditions but the Hound plays with one each time.)"],
        unlocked: false
    }, 
    key:{
        string: 'The Silver Key',
        description: ['With its power West may step bodily into the Dreamlands, probably... (passive Madness, Dream expeditions possible, Dreaming is more effective.)'],
        unlocked: false,
        ticCounter: [0, 2.4]
    }, 
    trap:{
        string: 'Shining Trapezohedron',
        description: ['Visions of other realms abound, but what watches back through the shining crystal facets? (Passive Vision and Madness.)'],
        unlocked: false,
        ticCounter: [0, 4.2]
    }, 
    bast:{
        string: 'Bast',
        description: ['A friendly cat from Ulthar has taken up residence. Very calming. (Passive Charm, Passive Madness reduction)'],
        unlocked: false,
        ticCounter: [0,4.2],
        hungerCounter: [0,44]
    }, 
    viol:{
        string: 'Viol of Erich Zann',
        description: ['Playing the Viol gives West a warm glow. (Chanting produces Love in addition to Charm.)'],
        unlocked: false
    }, 
    goldSyringe:{
        string: 'Little Gold Syringe',
        description: ['Holding it feels good, using it feels better. (TerrorCrafts, Passive Madness)'],
        unlocked: false,
        ticCounter:[0,8.4]
    }, 
    resonatorRelic:{
        string: 'Pineal Resonator',
        description: ['Though its inventor died horribly, it could be used properly. (IchorCrafts)'],
        unlocked: false
    }, 
    scrollTyog:{
        string: 'Scroll of Tyog',
        description: ['Sealed in metals from Yuggoth, the scroll opens sealed Stone Passages and provides Immunity to Petrification.'],
        unlocked: false
    }, 
    jenkin:{
        string: 'Brown Jenkin',
        description: ["The bastard bites. (periodic bites reduce Health and Madness, while his existence raises Terror)"],
        unlocked: false,
        hungerCounter: [0,44.4]
    },
    goat:{
        string: 'The Black Goat',
        description: ['Darker than the deepest Pitch, eyes flashing like starlight, the Black Goat brays endlessly. (Innocents go Insane, Passive Terror, Madness)'],
        unlocked: false,
        ticCounter: [0,48.8]
    },
    dagonsBlessing:{
        string: 'Dagons Blessing',
        description: ['Gills and webbing appear in the presence of sea water, provoking better relations. (Deep Trade and Reef expedition effectiveness doubled, Depths unlocked.)'],
        unlocked: false,
        hungerCounter: [0,88.8]
    },
    immortality: {
        string: 'Immortal',
        description: ["West's struggle having been noticed by an Old One, West's Essence now persists across the countless eons. (West's Stats, including Madness, are immune to the call of Nyarlathotep, the waters of the Nameless Mist, and quite possibly even the Darkness herself.)"],
        unlocked: false
    }
};

function marceline(){
    relics.marceline.ticCounter[0]++;
    if(relics.marceline.ticCounter[0]>= relics.marceline.ticCounter[1]){
        relics.marceline.ticCounter[0] -= relics.marceline.ticCounter[1];
        numberChange('stats', 'madness', 2, 'red', 'blue');
        numberChange('stats', 'vision', 2, '#40E0D0', 'red');
    }
    relics.marceline.hairCounter[0]++;
    if(relics.marceline.hairCounter[0]>= relics.marceline.hairCounter[1]){
        relics.marceline.hairCounter[0] -= relics.marceline.hairCounter[1];
        if(cult.innocents.current>0 || cult.insane.current>0){
            let chance = Math.random();
            if(chance >=0.66 && chance <0.88 && cult.innocents.current>0){
            numberChange("cult", "innocents", -1, "", "brown");
            numberChange("vault", "flesh", 1, "brown", "");
            numberChange("vault", "terror", 88, "brown", "");
            comment("Strands of dark, curly hair still stuck to the throat. (-1 Innocent, +1 Flesh, +88 Terror)", "tan");
            }else if(chance>0.88 && cult.insane.current>0){
                numberChange("cult", "insane", -1, "", "brown");
                numberChange("vault", "flesh", 1, "brown", "");
                numberChange("vault", "terror", 44, "brown", "");
                comment("Strands of dark, curly hair still stuck to the throat. (-1 Insane, +1 Flesh, +44 Terror)", "tan");
            }
        }
    }
}
function key(){
    relics.key.ticCounter[0]++;
    if(relics.key.ticCounter[0]>= relics.key.ticCounter[1]){
        relics.key.ticCounter[0] -= relics.key.ticCounter[1];
        numberChange('stats', 'madness', 1, 'red', 'silver');
    }
}



function trap(){
        relics.trap.ticCounter[0]++;
        if(relics.trap.ticCounter[0]>= relics.trap.ticCounter[1]){
        relics.trap.ticCounter[0] -= relics.trap.ticCounter[1];
        numberChange('stats', 'madness', 4, 'red', 'blue');
        numberChange('stats', 'vision', 4, '#40E0D0', 'red');
    }
}

function bast(){
    relics.bast.ticCounter[0]++;
    if(relics.bast.ticCounter[0]>=relics.bast.ticCounter[1]){
        relics.bast.ticCounter[0] -= relics.bast.ticCounter[1];
        if(stats.madness.current>2){
        numberChange('stats', 'madness', -2, 'red', 'blue');
        }
        numberChange('stats', 'charm', 2, 'yellow', 'red');
    }
    relics.bast.hungerCounter[0]++;
    if(relics.bast.hungerCounter[0]>=relics.bast.hungerCounter[1]){
        relics.bast.hungerCounter[0] = 0;
        if (Math.random() < 0.6 || cult.innocents.current===0) {  // 60% chance
            numberChange('cult', 'innocents', 1, 'green', 'red');  // +1 to 'innocent'
            comment("Bast has lured someone in from the street.(+1 Innocent)", 'pink');
        } else {  // 40% chance
            numberChange('cult', 'innocents', -1, 'red', 'green');  // -1 to 'innocent'
            numberChange('vault', 'terror', 88, 'red', 'red');
            comment("Bast has been affectionate, but missing at mealtime. (-1 Innocent, + 88 Terror)", "red");
        }
    }
}

function goldSyringe(){
    relics.goldSyringe.ticCounter[0]++;
    if(relics.goldSyringe.ticCounter[0]>=relics.goldSyringe.ticCounter[1]){
        relics.goldSyringe.ticCounter[0]-=relics.goldSyringe.ticCounter[1];
        numberChange("stats", "madness", 4, "blue", "");
    }
}

function goat(){
    relics.goat.ticCounter[0]++;
    if(relics.goat.ticCounter[0] >= relics.goat.ticCounter[1]){
        relics.goat.ticCounter[0] -= relics.goat.ticCounter[1];
        if(cult.innocents.current>=1){
            numberChange('vault','terror', 44, 'purple', '');
            numberChange('stats','madness', 4, 'purple', '');
            numberChange('cult','innocents', -1, 'green', 'purple');
            numberChange('cult','insane', 1, 'purple', 'red');
            comment("The endless braying has driven an Innocent Insane. (+44 Terror, +4 Madness)");
        }
    }
}

function jenkin(){
    relics.jenkin.hungerCounter[0]++;
    if(relics.jenkin.hungerCounter[0]>=relics.jenkin.hungerCounter[1]){
        relics.jenkin.hungerCounter[0] -= relics.jenkin.hungerCounter[1];
        numberChange("stats", "health", -8, "", "red");
        let temp = 44;//might need adjustment
        if(stats.madness.current< 44) temp = stats.madness.current;
        numberChange('stats', 'madness', -temp, 'red', 'blue');
        numberChange('vault', 'terror', +(temp*4), 'purple', '');
    }
}


let relicKeys = Object.keys(relics);
function buildRelics(){
    const relicsContainer = document.getElementById('relics');
    relicKeys.forEach(key => {
        const relicWrap = document.createElement('span');
        relicWrap.className = 'relicWraps';
        relicWrap.id = `${key}Wrap`;
        const relicImage = document.createElement('img');
        relicImage.src = `images/relics/${key}.jpg`;
        relicImage.alt = `${key} relic`;
        relicImage.className = 'relicImg';
        relicWrap.appendChild(relicImage);
        const relicText = document.createElement('span');
        relicText.className = 'relicTxt';
        relicText.textContent = relics[key].string; 
        relicWrap.appendChild(relicText);
        relicsContainer.appendChild(relicWrap);
    });
}
buildRelics();

function relicsTic(tics){
    for(i=0; i<tics; i++){
        for(let i = 0; i < relicKeys.length; i++){
            let key = relicKeys[i];
            if (relics[key].unlocked && (relics[key].ticCounter || relics[key].hungerCounter)) {
                window[key]();
            }
        }
    }
}
