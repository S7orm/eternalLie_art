/* 
        sacrarium
list of the Great Old Ones minor dieties
    ruled by  Nyarlathotep
    Lobon gift of Sacred Spear multiplies sacrifice effect
    Nath-Horthath -valor and vengeance
    Oukranos Temple of Loveliness -charm multiplier
    Tamash god of illusion, mysticism and the wise lol beard of tamash radiance boost
    Zo-Kalar  providing healthy children and peaceful deaths bonus to breeding pits and sacrifice of innocents
    Karakal Master of the Flames bonus to magic damage?

 */
let gods = {
    rhan: {
        string: 'Rhan-Tegoth',
        description: ['She must be awakened first, though she brings Madness, Terror and Death in her wake. Madness Minimum: 248 ', 'Ritual Requires 1 Priest, Offering Required: Innocents '],
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
    tsath: {
        string: 'Tsathoggua',
        description: ['In the Black Depths, the gargantuan toad god Tsathoggua waits lazily for sacrifice. Madness Minimum: 888 ', 'Ritual Requires 8 Sentinels, Offering Required: 16 Radiance, Faithful '],
        unlocks: '',
        cost: 16,//faithful
        radCost: 16,
        func: tsath,
        unlocked: false,
          active: false,
        purchased: false
    },
    shub: {
        string: 'Shub Niggurath',
        description: ["Deep within the wood, T'yog weaves a ritual of Summoning. Madness Minimum: 8448", 'Offering Required: 88 Innocents, 44 Faithful, 484 Radiance'],
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
        description: ['We have waited so long for you to come a calling. Dance with us. Madness Minimum: 484 ', ''],
        unlocks: 'reset1',
        cost: '',
        func:nyar,
        unlocked: false,
          active: false,
        purchased: false
    },
    cth: {
        string: 'Cthulhu',
        description: ["That is not dead which can... well anyway West can feel the God's gaze upon him, urging him onward. Madness Minimum: 8888 ", ''],
        unlocks: 'immortality',
        cost: '',
        madCost: 8888,
        func:cth,
        unlocked: false,
          active: false,
        purchased: false
    }
};
let godKeys = Object.keys(gods);

function makeSacrarium(){
    document.getElementById('sacrarium').innerHTML =
            "<div id='sacLeft'>" +
            "<div id='bookshelf'><div id='shelf'></div></div>" +
            "<h2 id='godTitle'>Invoke the Old Ones</h2>" +
            "<div id='gods'>" +
            "</div></div>" +
            "<div id='sacRight'>" +
            "<h2 id='relicTitle'>Gods appeased / Relics obtained</h2>" +
            "<div id='relics'>" +
            "</div></div>";

    for(i=0;i<godKeys.length;i++){
            document.getElementById('gods').innerHTML +=
                "<button class='godsWraps' id='" + godKeys[i] + "Wrap'>" +
                "<span class='godTitles'>" + gods[godKeys[i]].string + "</span>" +
                "</button>";
    }
};
makeSacrarium();

    	//=========================================
	// god events
	//=========================================


function rhan(){
    if(cult.innocents.current >= gods.rhan.cost){
        numberChange('cult', 'innocents', -gods.rhan.cost, 'blue', 'red');
        numberChange('stats', 'radiance', 8, 'blue', 'red');
        numberChange('stats', 'madness', 44, 'blue', 'red');
        numberChange('vault', 'flesh', 8, 'red', 'red');
        numberChange('vault', 'terror', 88, 'red', 'red');
        stats.radiance.unlocked = true;
        vault.flesh.unlocked = true;
        gods.rhan.purchased = true;
        relics.rhanRelic.unlocked = true;
        terrorCrafts.sacrifice.unlocked = true;
        terrorCrafts.sacrifice.purchased = true;
        flashFade('rhanWrap');
        document.getElementById('rhanWrap').style.display='none';
        document.getElementById('rhanRelicWrap').style.display='block';
        document.getElementById('sacToggle').style.display='block';
        document.getElementById('sacrificeWrap').style.display='block';
        document.getElementById('fleshWrap').style.display = 'block';
        document.getElementById('radianceBox').style.display='block';
        eventBox("images/relics/rhanRelic.jpg", "Rhan-Tegoth", "She is pleased at the offerings the Priest prepares, but She is ever hungry.(-8 Innocents, Madness +44, Terror +88, Radiance +8, Sacrifice unlocked in TerrorCrafts, Rhan in Sacrarium -Rhan will feed if not appeased, preferring the Insane over all others.)" );
        comment('so Hungry...(Sacrifice in TerrorCrafts)', 'pink');
    }
}

function dagon(){
    if(vault.ichor.current>= gods.dagon.cost && stats.radiance.current >= gods.dagon.radCost){
        numberChange('vault', 'ichor', -gods.dagon.cost, 'red');
        numberChange('stats', 'radiance', -gods.dagon.radCost, 'red');
        eventBox('images/relics/dagonsBlessing.jpg', 'Dagon', 'Seated on a Thone of coral, Dagon silently grants his Blessing. West can now breathe underwater. (Doubles Reef and Deep Trade effectiveness, Access to Ocean Depths.)');
        world.reef.description2 =  ['Welcomed as a peer, the Deep Ones solemnly offer their services.', 'Cost: Innocents ', 'Benefit: 2 Hybrids'],
       world.reef.benefit = 2; 
        world.depths.unlocked = true;
        document.getElementById('depthsWrap').style.display='block';
        fleshCrafts.deepTrade.benefit = fleshCrafts.deepTrade.benefit * 2;
        document.getElementById('deepTradeBenefit').innerHTML = "Benefit: Gold " + fleshCrafts.deepTrade.benefit;
        relics.dagonsBlessing.unlocked = true;
        document.getElementById('dagonsBlessingWrap').style.display='block';
        gods.dagon.purchased = true;
        flashFade('dagonWrap');
        comment('(Ocean Depths unlocked)');
    }
}

function tsath(){
    if(cult.sentinels.current>=8 && cult.faithful.current>=16 && madMin(888)){
        numberChange('cult', 'faithful', -16, '', 'red');
        numberChange('stats', 'radiance', -16, 'red', 'red');
        gods.tsath.purchased = true;
        flashFade('tsathWrap');
        relics.tsathRelic.unlocked = true;
        document.getElementById('tsathRelicWrap').style.display='block';
        eventBox('images/gods/tsath.jpg', 'Tsathoggua', "West feels ponderous thoughts drift closer to consciousness as the sacrifices are forced into the creature's gaping maw. Chewing slowly, the god assents to being moved and rewards West with the skill to Dream endlessly. Too lazy to seek out food, his thoughts of hunger stir fear in the Faithful. (Tsathoggua beneath Sacrarium, Dream Toggle in West Tab, Devouring Maw unlocked in TerrorCrafts) ");
        terrorCrafts.maw.unlocked = true;
        document.getElementById('mawWrap').style.display = 'block';
        actions.dream.toggleBool = true;
        document.getElementById('dreamToggle').style.display='block';
        document.getElementById('dreamWrap').removeEventListener("pointerdown", startDreamTimer);
        document.getElementById('dreamWrap').addEventListener('pointerdown',  dreamToggle);
    }
}

function shub(){//Madness Minimum: 848', 'Offering Required: 88 Innocents, 444 Radiance
    window.console.log("1",cult.innocents.current,cult.faithful.current, stats.radiance.current);
    if(cult.innocents.current >= 88 && cult.faithful.current >= 44 && stats.radiance.current >= 484 && madMin(8448)){
        window.console.log("2");
        numberChange('cult', 'innocents', -88, '', 'red');
        numberChange('cult', 'faithful', -44, '', 'red');
        numberChange('stats', 'radiance', -484, 'red', 'red');
        gods.shub.purchased = true;
        flashFade('shubWrap');
        eventBox('images/gods/shub.jpg', 'Shub Niggurath', "Iä! Shub Niggurath! Black Goat of the Woods and Mother of 1000! T'yog falls prone at the sight of the Goat and must be prodded to finish the ritual. (Black Goat in Sacrarium, Breeding Pits output quadrupled.)");
        terrorCrafts.breedingPits.shub = true;
        document.getElementById('breedingPitsDesc').innerHTML = "Iä! Current stock produces 4 Innocents every " + Math.ceil(40/terrorCrafts.breedingPits.level) + " seconds.";
        document.getElementById('breedingPitsBenefit').innerHTML = "Increasing the herd size will produce Innocents every " + Math.ceil(40/(terrorCrafts.breedingPits.level + 1)) + " seconds(+88 Terror).";
        relics.goat.unlocked = true;
        document.getElementById("goatWrap").style.display='block';
    }
}

function cth(){
    if(stats.madness.current >= 8888){
        flashFade('cthWrap');
        gods.cth.purchased = true;
        eventBox('images/gods/cth.jpg', 'Chtulhu', "A terrible cacophany of sensations registers to West's warped senses as the great being's laughter. West's Essence crystalizes across countless eons as timeless beings take notice. (Immortality gained -view in Sacrarium)");
        relics.immortality.unlocked = true;
        permanentChanges.immortality= true;
        document.getElementById('immortalityWrap').style.display='block';
        
    }
}

function nyar(){
    if(madMin(484)){
        shakeBody();
        eventBox("images/gods/nyar.jpg", "Destiny", "Shall we dance?");
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
//bookshelf
//writing-mode: sideways-lr;
function addTome(tome) {
    const shelf = document.getElementById('shelf');
    if (!shelf) return;
    const tomeDiv = document.createElement('div');
    tomeDiv.className = 'tome';
    const spine = document.createElement('div');
    spine.className = 'spine';
    spine.textContent = actionUpgrades.study[tome].string;
    const pixelHeight = (window.innerHeight * 9) / 100; 
    spine.style.writingMode = 'sideways-lr';
    spine.style.transform = 'rotate(180deg)';
    shelf.appendChild(tomeDiv);
    tomeDiv.appendChild(spine);
    const textWidth = spine.scrollWidth;
        if (textWidth > pixelHeight) {
            //determine how many lines are needed.
            //determine line height
            //change width of tomeDiv and spine by the needed amount.
            //add //writing-mode: sideways-lr to spine text.
    }
}
//addTome('pnak');
//addTome('kult');


let relics = {
    rhanRelic: {
        string: 'Rhan-Tegoth',
        description: ['Brought forth for the Sacrifice, her thoughts echo in the halls. (Passive Vision, Madness and Terror) She must be appeased regularly.'],
        unlocked: false,
          active: false,
        ticCounter: 0,
        tics: 4.4,
        hungerCounter: 0,
        hungerMax: 88
  },
    trap:{
        string: 'Shining Trapezohedron',
        description: ['Visions of other realms abound, but what watches back through the shining crystal facets? (Passive Vision and Madness.)'],
        unlocked: false,
          active: false,
        ticCounter: 0,
        tics: 4.2
    }, 
    bast:{
        string: 'Bast',
        description: ['A friendly cat from Ulthar has taken up residence. Very calming. ( Passive Charm, Passive Madness reduction)'],
        unlocked: false,
          active: false,
        ticCounter: 1,
        tics: 4.08,
        hungerCounter: 0,
        hungerMax: 44
    }, 
    tsathRelic:{
        string: 'Tsathoggua',
        description: ["As his hunger grows, so too will the Terror of the Faithful. (Increasing Passive Terror until The Devouring Maw is satiated -TerrorCrafts)"],
        unlocked: false,
          active: false,
        terror: 0,
        hungerCounter: [0,444]
    }, 
    dagonsBlessing:{
        string: 'Dagons Blessing',
        description: ['West gasps in surprise as gill membranes spread across his body in response to the salty water. (West can now travel the Depths. Hybrid children will provide Dagon with Flesh regularly.)'],
        unlocked: false,
          active: false,
        hungerCounter: [0,88.8]
    },
    scrollTyog:{
        string: 'Scroll of Tyog',
        description: ['Sealed in metals from Yuggoth, the scroll opens sealed Stone Passages and provides Immunity to Petrification.'],
        unlocked: false
    }, 
    jenkin:{
        string: 'Brown Jenkin',
        description: ["The bastard bites. (periodic bites reduce Health and Madness, while raising Terror)"],
        unlocked: false,
          active: false,
        hungerCounter: [0,44.4]
    },
    goat:{
        string: 'The Black Goat',
        description: ['Darker than the deepest Pitch, eyes flashing like starlight, the Black Goat brays endlessly. (Innocents go Insane, Passive Terror, Madness)'],
        unlocked: false,
          active: false,
        goatTics: [0,48.8]
    },
    immortality: {
        string: 'Immortal',
        description: ["Having been noticed by one of the Old Ones, West's Essence now persists across the countless eons. (West and his stats including Madness are immune to the call of Nyarlathotep and the waters of the Nameless Mist.)"],
        unlocked: false
    }
};

function bastHunger(){
    if(relics.bast.hungerCounter< relics.bast.hungerMax){
        relics.bast.hungerCounter++;
    }else{
        relics.bast.hungerCounter = 0;
        if (Math.random() < 0.6) {  // 60% chance
            numberChange('cult', 'innocents', 1, 'green', 'red');  // +1 to 'innocent'
            comment("Bast has lured someone in from the street.(+1 Innocent)", 'pink');
        } else {  // 40% chance
            numberChange('cult', 'innocents', -1, 'red', 'green');  // -1 to 'innocent'
            numberChange('vault', 'terror', 88, 'red', 'red');
            comment("Bast has been affectionate, but missing at mealtime. (-1 Innocent, + 88 Terror)", "red");
        }
    }
}
function dagonsBlessing(){
    relics.dagonsBlessing.hungerCounter[0]++;
    if(relics.dagonsBlessing.hungerCounter[0] >= relics.dagonsBlessing.hungerCounter[1]){
        relics.dagonsBlessing.hungerCounter[0] -= relics.dagonsBlessing.hungerCounter[1];
        if(vault.flesh.current>=1){
            numberChange("vault", "flesh", -1, "", "red");
            numberChange("vault", "gold", 88, "blue", "red");
            comment("Dagon has been fed. (-1 Flesh, +88 Gold)");
        }else if(cult.innocents.current>=1){
            numberChange("cult", "innocents", -1, "", "red");
            numberChange("vault", "gold", 88, "blue", "red");
            comment("Dagon has been fed. (-1 Innocent, +88 Gold)");
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

function goat(){
    relics.goat.goatTics[0]++;
    if(relics.goat.goatTics[0] >= relics.goat.goatTics[1]){
        relics.goat.goatTics[0] -= relics.goat.goatTics[1];
        if(cult.innocents.current>=1){
            numberChange('vault','terror', 44, 'purple', '');
            numberChange('stats','madness', 4, 'purple', '');
            numberChange('cult','innocents', -1, 'green', 'purple');
            numberChange('cult','insane', 1, 'purple', 'red');
            comment("The endless braying has driven an Innocent Insane. (+44 Terror, +4 Madness)");
        }
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

function relicsTic(){
    for(i=0;i<relicKeys.length;i++){
        if(relics[relicKeys[i]].unlocked === true){
            if(relicKeys[i] === 'rhanRelic'){
                if(relics.rhanRelic.ticCounter< relics.rhanRelic.tics){
                    relics.rhanRelic.ticCounter++;
                }else{
                    relics.rhanRelic.ticCounter -=  relics.rhanRelic.tics;
                    numberChange('stats', 'madness', 2, 'red', 'blue');
                    numberChange('stats', 'vision', 2, '#40E0D0', 'red');
                    numberChange('vault', 'terror', 4, 'red', 'blue');
                }
                //hunger resets on sac
                if(relics.rhanRelic.hungerCounter< relics.rhanRelic.hungerMax){
                    relics.rhanRelic.hungerCounter++;
                }else{
                    relics.rhanRelic.hungerCounter = 0;
                    rhanSac();
                }
            }
            if(relicKeys[i] === 'trap'){
                if(relics.trap.ticCounter< relics.trap.tics){
                    relics.trap.ticCounter++;
                }else{
                    relics.trap.ticCounter -= relics.trap.tics;
                    numberChange('stats', 'madness', 2, 'red', 'blue');
                    numberChange('stats', 'vision', 2, '#40E0D0', 'red');
                }
            }
            if(relicKeys[i] === 'bast'){
                bastHunger();
                if(relics.bast.ticCounter< relics.bast.tics){
                    relics.bast.ticCounter++;
                }else{
                    relics.bast.ticCounter -= relics.bast.tics;
                    if(stats.madness.current>1){
                    numberChange('stats', 'madness', -2, 'red', 'blue');
                }
                    numberChange('stats', 'charm', 2, 'yellow', 'red');
                }
            }
            if(relicKeys[i] === 'jenkin'){
                if(relics.jenkin.hungerCounter[0]< relics.jenkin.hungerCounter[1]){
                    relics.jenkin.hungerCounter[0]++;
                }else{
                    relics.jenkin.hungerCounter[0] -= relics.jenkin.hungerCounter[1];
                    numberChange("stats", "health", -8, "", "red");
                    let temp = 44;//might need adjustment
                    if(stats.madness.current>= 44){
                    }else{
                        temp = 44-stats.madness.current;
                    }
                    numberChange('stats', 'madness', -temp, 'red', 'blue');
                    numberChange('vault', 'terror', +(temp*4), 'purple', '');
                }
            }
            if(relicKeys[i] === 'tsathRelic'){
                if(relics.tsathRelic.hungerCounter[0]<relics.tsathRelic.hungerCounter[1]){
                    relics.tsathRelic.hungerCounter[0]++;
                }else{
                    relics.tsathRelic.hungerCounter[0] -=relics.tsathRelic.hungerCounter[1];
                    relics.tsathRelic.terror  += 4;
                    numberChange('vault', 'terror', relics.tsathRelic.terror, 'purple', '');
                }
            }
            if(relicKeys[i] === 'dagonsBlessing'){
                dagonsBlessing();
            }
            if(relicKeys[i] === 'goat'){
                goat();
            }
        }
    }
};