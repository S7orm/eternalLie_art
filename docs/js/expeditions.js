/* 
Thalarion, the City of a Thousand Wonders ruled by Lathi -huge carven gate Akariel unlocked
Xura, the Land of Pleasures Unattained
Far reaches of dream:
moon-wine of the zoogs
Oriab
 */
            	//=========================================
                        //                                      World Expeditions
	//=========================================
        
let world = {
  crypt: {//unlocked by expeditions
      string: 'Desolate Crypts',
      description: ['Rifle through the bones of ancestors seeking Tomes of power. Madness Minimum: 44 ', ' Cost: Gold ', ' Benefits: ?'],
      description2: ['There must be more. Madness Minimum: 44 ', 'Cost: Gold ', 'Benefits: information, loose pages, Sentinals find Flesh'],
      description3: ['Less interesting crypts remain potentially profitable. Madness Minimum: 44 ', 'Cost: Gold ', 'Benefits: loose pages, Sentinals find Flesh'],
      cost: 88,
      func: crypt,
      unlocked: true,
      purchased: false,
      permanent:true,
      stage: 1
  },
  antiquarian: {//unlocked by expeditions
      string: 'Antiquarian Shops',
      description: ['The shady old shopkeep promises the unseen painting is worth the price. Madness Minimum: 88', 'Cost: Gold ', 'Benefit: ?'],
      description2: ['Far down a hidden street, an old woman beckons West with a crooked finger. Madness Minimum: 88', 'Cost: Gold ', 'Benefit: ?'],
      description3: ['West is intrigued as the callous shopkeep tries to hide the leaden case. Madness Minimum: 88', 'Cost: Sentinel 1, Gold ', 'Benefit: ?'],
      description4: ['Rare books hide secrets hidden in code. Madness Minimum: 88', 'Cost: Gold ', 'Benefit: loose pages'],
      cost: 248,
      func: antiquarian,
      unlocked: true,
      purchased: false,
      permanent:true,
      stage: 1
  },
  tower: {
      string: 'Shunned Towers',
      description: ['The locals avoid these old ruins at all costs. Madness Minimum: ', ' Cost: Gold ', 'Benefit: ?'],
      description2: ['Hidden experiments gone wrong still yield secrets. Madness Minimum: ', 'Cost: Gold ', 'Benefit: ?'],
      description3: ["Potentially there are labs From Beyond. Madness Minimum: ", 'Cost: Gold ', 'Benefit: ?'],
      description4: ['The moldy bookcases still hold secrets for the patient. Madness Minimum: ', 'Cost: Gold ', 'Benefit: loose pages.'],
      madMin: 164,
      cost: 484,
      func: tower,
      unlocked: true,
      purchased: false,
      permanent:true,
      stage: 1
  },
  estate: {
      string: 'Ancestral Estate',
      description: ['Flashes of childhood dreams lure West to the attic. Madness Minimum: ', 'Cost: Gold ', 'Benefits: ?'],
      description2: ['Returning to delve deeper. Madness Minimum: ', 'Cost: Gold ', 'Benefit: ?'],
      description3: ['Family history links West to a sea captain named Marsh. Madness Minimum: ', 'Cost: Gold ', 'Benefit: ?'],
      description4: ['Strange sightings in the hills invite investigation. Madness Minimum: ', 'Cost: Innocents 8, Gold ', 'Benefit: ?'],
      description5: ['Rooting through the past. Madness Minimum: ', 'Cost: Gold ', 'Benefit: loose pages, Sentinals find Flesh'],
      madMin: 88,
      cost: 848,
      func: estate,
      unlocked: false,
      purchased: false,
      permanent:true,
      stage: 1
  },
  wax: {//unlocked by expeditions
      string: 'Wax Museum',
      description: ['Something essential whispers from the basement. Madness Minimum: ', 'Cost: Gold ', 'Benefit: ?'],
      description2: ['So many innocents wandering the halls. Madness Minimum: ', 'Cost: Gold ', 'Benefit: Innocents'],
      madMin: 164,
      cost: 848,
      func: wax,
      unlocked: false,
      purchased: false,
      permanent:true,
      kult: false,
      stage: 1
  },
  desert: {//unlocked by 
      string: 'Desert Fastness',
      description: ["Whispers push West into the deep desert searching for... searching. Madness Minimum: 248", 'Cost: Gold ', 'Benefit: ?'], 
      description2: ['Buried ruins rise and fall in the shifting sands.  Madness Minimum: 248 ', ' Requirement: 8 Sentinels Cost: Gold ', 'Benefit: ?'],
      description3: ["Mirages of ancient cities and lost wisdom taunt and mock the seeker.", 'Cost: Gold ', 'Benefit: loose pages, Vision'],
      cost: 2484,
      func: desert,
      unlocked: false,
      purchased: false,
      permanent:true,
      stage: 1
  },
  mound: { //unlocked by eibon
      string: 'The Mound',
      description: ["Sealed for centuries, only T'yog still remembers how to pass through the stone unhindered. Madness Minimum: 484 ", "Requires: T'yog, 8 Sentinels, Cost: Gold ", "Benefit?"],
      cost: 2484,
      func: mound,
      unlocked: false,
      purchased: false,
      permanent:false
  },
  tsath: { //unlocked by mound
      string: 'Tsath',
      description: ["T'yog believes he can make the right kind of introduction to the secretive K'n-yan. Madness Minimum: ", 'Requires: 16 Sentinels, Cost: Gold ', "Benefit?"],
      description2: ["Returning empty handed seems rude. Madness Minimum: ", 'Requires: 8 Sentinels, Cost: 1 Tome, Gold ', "Benefit?"],
      description3: ["They happily offer to trade Visions. Madness Minimum: ", 'Requires: 4 Sentinels, Cost: Vision 8448 Gold ', "Benefit?"],
      description4: ["West must find a way to repay the kindness of the K'n-yan. Madness Minimum: ", 'Cost: Ichor 16, Gold ', "Benefit?"],
      description5: ["The K'n-yan still have much to teach West. Madness Minimum: ", 'Cost: Gold ', "Benefit: increased Health, loose pages"],
      madMin: 248,
      cost: 4884,
      func: tsath,
      unlocked: false,
      purchased: false,
      permanent:true,
      stage: 1
  },
  yoth: {  //unlocked by mound
      string: 'Dead Yoth',
      description: ["The former home of a reptilian race, it lies abandoned. Madness Minimum: 484 ", 'Requires: 8 Sentinels, Cost: Gold ', "Benefit?"],
      cost: 8448,
      func: yoth,
      unlocked: false,
      purchased: false,
      permanent:false
  },
  nkai: {  //unlocked by yoth
      string: "Lightless N'kai",
      description: ["Even T'yog hesitates before stepping into lightless N'kai. Madness Minimum: 848 ", 'Cost: Gold ', "Benefit?"],
      cost: 48484,
      func: nkai,
      unlocked: false,
      purchased: false,
      permanent:false
  },
  reef: {//unlocked by estate bc innsmouth
      string: 'Coral Reef',
      description: ['Things from the Deep meet here for commerce with the surface. Madness Minimum: 484 ', ' Cost: Flesh ', 'Benefit ?'],
      description2: ['Dagon offers a darker sort of trade. Madness Minimum: 484 ', 'Cost: Innocents ', 'Benefits: 1 Hybrid, Gold'],
      cost: 84,
      benefit: 1,
      func: reef,
      unlocked: false,
      purchased: false,
      permanent:true,
      stage: 1
  }, 
  depths: {//unlocked by dagon
      string: 'Ocean Depths',
      description: ["Swim through the dangerous ruins of R'lyeh to find a slumbering God. Madness Minimum: 484 ", "Dagon's Blessing required, Cost: Hybrids ", "Benefit?"],
      description2: ['Secrets abound for the daring. Madness Minimum: 484 ', 'Cost: Hybrids  ', 'Benefit: loose pages, '],//lagh metal?
      cost: 16,
      func: depths,
      unlocked: false,
      purchased: false,
      permanent:true,
      stage: 1
  },
  ant: {
      string: 'Antarctic Journey',
      description: ['Only the truly foolish would dare the graveyard of an entire species. Madness Mininum: 848', 'Requires 44 Sentinels, Cost: Sentinels, Gold ', "Benefit:?"],
      description2: ['A glimpse of something beyond the ancient pentagonal city Madness Mininum: 848', 'Requires 44 Sentinels, Cost: Gold ', 'Benefit: Darkness'],
      cost: 848484,
      func: ant,
      unlocked: false,
      purchased: false,
      permanent:true,
      stage: 1
  }
};
let worldKeys = Object.keys(world);
function loadWorldExpeditions() {
    for (let i = 0; i < worldKeys.length; i++) {
        const worlds = document.getElementById('world');
        const button = document.createElement('button');
        const img = document.createElement('img');
        img.src = `images/world/${worldKeys[i]}.jpg`; 
        img.alt = world[worldKeys[i]].string; 
        img.classList.add('worldImg');
        const textSpan = document.createElement('span');
        textSpan.textContent = world[worldKeys[i]].string;
        textSpan.classList.add('worldTxt');
        button.classList.add('worldWraps');
        let Id="";
        if(world[worldKeys[i]].permanent===true){
            Id = worldKeys[i] + 'Wrap';
        }else{
            Id = worldKeys[i] + 'OneOff';
        }
        button.id = Id;
        button.appendChild(img);
        button.appendChild(textSpan);
        worlds.appendChild(button);
        if(world[worldKeys[i]].purchased=== true && world[worldKeys[i]].permanent=== false){
        }else if(world[worldKeys[i]].unlocked === true && world[worldKeys[i]].permanent=== true){
            document.getElementById(worldKeys[i] + "Wrap").style.display="block";
        }
    }
}
loadWorldExpeditions();



        	//=========================================
	// expedition functions
	//========================================= 
        
function loosePages(cost){
    let pages=Math.floor((cost*0.08) +(Math.random()*0.08* cost));
        vault.tome.pageCounter += pages;
        comment("loose pages...(+ " + pages + " pages)");
        document.getElementById('pages').innerHTML = Math.floor(vault.tome.pageCounter);
        if(vault.tome.pageCounter >= vault.tome.pagesNeeded){
            comment('West has enough pages to assemble a Tome. (Fleshcrafts)', 'pink', 'purple');
        }
}

function sentinelEx(){
    if(cult.sentinels.unlocked === true){
        if(vault.flesh.unlocked === false){
            vault.flesh.unlocked = true;
            document.getElementById('fleshWrap').style.display = 'block';
            comment("Waste not, want not. (FleshCrafts unlocked in Obsidian Vault.)");
        }
        let temp = Math.ceil(cult.sentinels.outMultiplier * (Math.max((Math.random() * (cult.sentinels.current/2) + cult.sentinels.current/2), 1))); //always flesh in a crypt
        if(relics.amulet.unlocked===true){
            if(cult.sentinels.current>0){
                temp*=2;
                numberChange("cult", "sentinels", -1, "", "red"); 
                temp++;
                numberChange('vault', 'flesh', temp, 'red', 'red');
                comment("With the Hound to guide them, the Sentinels found more Flesh +" + temp + " (-1 Sentinel)", "red");
            }else if(cult.innocents.current>0){
                numberChange("cult", "innocents", -1, "", "red");
                comment("The Hound was displeased there were no Sentinels left to play with. (-1 Innocent)");
            }else{
                numberChange("stats", "health", -88, "", "red");
                comment("The Hound snaps at West for lack of toys to play with. (-88 Health)");
            }
        }else{
            numberChange('vault', 'flesh', temp, 'red', 'red');
            comment("The Sentinels found some Flesh +" + temp, "red");
        }
    }
}

function crypt(){
    if(vault.gold.current > world.crypt.cost && madMin(44)){
        buttonGlow("cryptWrap");
        numberChange('vault', 'gold', -world.crypt.cost, '', 'red');
        loosePages(world.crypt.cost);
        if(cult.sentinels.current >0){
            sentinelEx();
        }
        if(world.crypt.stage===1){
            vault.tome.unlocked = true;
            document.getElementById('tomeWrap').style.display='block';
            document.getElementById('tome').innerHTML = vault.tome.current;
            comment('A unique find! (Professor West)', 'lightblue', 'crypt');
            eventBox('images/eventImages/manuscript.jpg', 'Liber Damnatus', "Even with Sentinels to assist, it seemed like a futile endeavor to rummage through the bones of the dead. Ia!  In the tomb of a despised ancestor, still clutched in the corpse's final embrace, this Tome glows with power. (Translate Tomes in West tab.)");
            document.getElementById('damnWrap').style.display='block';
            actionUpgrades.study.damn.unlocked = true;
            world.crypt.stage=2;
            document.getElementById('cryptDesc').innerHTML = world.crypt.description2[0];
            document.getElementById('cryptBenefit').innerHTML = world.crypt.description2[2];
        }else if(world.crypt.stage===2){
            world.estate.unlocked=true;
            document.getElementById("estateWrap").style.display="block";
            eventBox('images/world/estate.jpg', 'Ancestral Estates', "West's ancestors took their secrets with them when they died. Buried in layers of bone dust, inlaid case of brittle deeds looks authentic. (Ancestral Estate expedition unlocked, Sentinels find Flesh, loose pages acquired)");
            world.crypt.stage=3;
            document.getElementById('cryptDesc').innerHTML = world.crypt.description3[0];
            document.getElementById('cryptBenefit').innerHTML = world.crypt.description3[2];
            world.crypt.purchased = true;
            document.getElementById('cryptWrap').style.backgroundColor='#301934';
        }
        world.crypt.cost = Math.ceil(world.crypt.cost * 1.4);
        document.getElementById('cryptCost').innerHTML= world.crypt.cost;
    }
}

function antiquarian(){
    if(vault.gold.current >= world.antiquarian.cost && madMin(88)){
        buttonGlow("antiquarianWrap");
        if(world.antiquarian.stage===1){
            document.getElementById('antiquarianDesc').innerHTML = world.antiquarian.description2[0];
            document.getElementById('antiquariancost').innerHTML = world.antiquarian.description2[1];
            document.getElementById('antiquarianBenefit').innerHTML = world.antiquarian.description3[2];
            document.getElementById('sacrariumTab').style.display='block';
            domUnlocks.sacrarium = true;
            relics.marceline.unlocked= true;
            document.getElementById("marcelineWrap").style.display="block";
            eventBox("images/relics/marceline.jpg", "Marceline ", "The subject is a woman of breathtaking beauty, whose hair waves in an unearthly breeze. The longer West looks, the more the landscape seems to show glimpses of unknown worlds. (Marceline painting in Sacrarium.)");
            world.antiquarian.stage++;
        }else if(world.antiquarian.stage===2){
            document.getElementById('antiquarianDesc').innerHTML = world.antiquarian.description3[0];
            document.getElementById('antiquariancost').innerHTML = world.antiquarian.description3[1];
            document.getElementById('antiquarianBenefit').innerHTML = world.antiquarian.description3[2];
            relics.viol.unlocked= true;
            document.getElementById("violWrap").style.display="block";
            document.getElementById("chantBenefit").innerHTML= "Benefits: Love and Charm";
            eventBox("images/relics/viol.jpg", "Ia! The Viol of Erich Zahn!", "Lost these many years, Its strings still hum with emotional resonance. (Viol placed in Sacrarium)");
            world.antiquarian.stage = 3;
        }else if(world.antiquarian.stage === 3){
            numberChange("cult", "sentinels", -1, "", ""); 
            numberChange("vault", "flesh", 1, "", "");
            document.getElementById('antiquarianDesc').innerHTML = world.antiquarian.description4[0];
            document.getElementById('antiquariancost').innerHTML = world.antiquarian.description4[1];
            document.getElementById('antiquarianBenefit').innerHTML = world.antiquarian.description4[2];
            relics.amulet.unlocked=true;
            document.getElementById("amuletWrap").style.display = "block";
            eventBox("images/relics/amulet.jpg", "Hound Amulet", "Found sealed in a leaden casket, holding the amulet summons a deadly beast. West calls out its true name and the winged, snarling, creature screeches its acquiescence before turning on a nearby Sentinel and tearing out his throat. West silently accepts the price for the beast's aid. (-1 Sentinel, +1 Flesh, Sentinels find twice as much Flesh. One is lost to the Hound each trip, Hound Amulet in Sacrarium)");
            world.antiquarian.stage = 4;
            world.antiquarian.purchased = true;
            document.getElementById('antiquarianWrap').style.backgroundColor='#301934';
        }else{
            loosePages(world.antiquarian.cost);
        }
        numberChange('vault', 'gold', -world.antiquarian.cost, 'yellow', 'red');
        world.antiquarian.cost = Math.ceil(world.antiquarian.cost * 1.8);
        document.getElementById('antiquarianCost').innerHTML = world.antiquarian.cost;
    }
}


function towerUpdater(load){
    if(!load){
        buttonGlow("towerWrap");
        loosePages(world.tower.cost);
        sentinelEx();
        world.tower.cost = Math.floor(world.tower.cost * 1.8);
    }
    document.getElementById("towerCost").innerHTML=world.tower.cost;
    if(world.tower.stage===2 || world.tower.stage===3 || world.tower.stage===4){
        document.getElementById("towerDesc").innerHTML=world.tower["description" + (world.tower.stage)][0];
        document.getElementById("towerMadMin").innerHTML=world.tower.madMin;
        document.getElementById("towercost").innerHTML=world.tower["description" + (world.tower.stage)][1];
        document.getElementById("towerBenefit").innerHTML=world.tower["description" + (world.tower.stage)][2];
    }
}
function tower(){
    if(world.tower.stage===1){//syringe for early murder
        if(vault.gold.current >= world.tower.cost && madMin(164)){
            numberChange('vault', 'gold', -world.tower.cost, 'yellow', 'red');
            document.getElementById('sacrariumTab').style.display='block';
            domUnlocks.sacrarium = true;
            relics.goldSyringe.unlocked = true;
            document.getElementById('goldSyringeWrap').style.display = 'block';
            terrorCrafts.syringe.unlocked= true;
            document.getElementById("syringeWrap").style.display="block";
            world.tower.stage=2;
            world.tower.madMin=248;
            eventBox("images/relics/goldSyringe.jpg", "Little Gold Syringe", "Inside a locked case is a little gold syringe. It appears harmless.(TerrorCrafts, Gold Syringe in Sacrarium");
            towerUpdater(false);
        }
    }else if(world.tower.stage===2){
        if(vault.gold.current >= world.tower.cost && madMin(248)){
            numberChange('vault', 'gold', -world.tower.cost, 'yellow', 'red');
            fleshCrafts.seance.unlocked= true;
            document.getElementById("seanceWrap").style.display="block";
            eventBox("images/eventImages/saltNotes.jpg", "Notes on Essential Salts", "Hidden in a false wall, these crumbling notes detail how to force secrets from the dust of the dead. (Séance in FleshCrafts)");
            world.tower.stage=3;
            world.tower.madMin=484;
            towerUpdater(false);
        }
     }else if(world.tower.stage===3){
        if(vault.gold.current >= world.tower.cost && madMin(484)){
            numberChange('vault', 'gold', -world.tower.cost, 'yellow', 'red');
            ichorCrafts.resonator.unlocked= true;
            relics.resonatorRelic.unlocked = true;
            document.getElementById('resonatorRelicWrap').style.display = 'block';
            document.getElementById("resonatorLock").style.display="block";
            eventBox("images/relics/resonatorRelic.jpg", "Pineal Resonator", "This mysterous blending of machine and Madness is a triumph of engineering.(IchorCrafts, Pineal Resonator in Sacrarium)");
            world.tower.stage=4;
            world.tower.madMin=848;
            towerUpdater(false);
        }
     }else if(world.tower.stage===4){
        if(vault.gold.current >= world.tower.cost && madMin(848)){
            numberChange('vault', 'gold', -world.tower.cost, 'yellow', 'red');
            relics.trap.unlocked = true;
            document.getElementById('trapWrap').style.display='block';
            actionUpgrades.study.sublimate.unlocked=true;
            document.getElementById("sublimateWrap").style.display = "block";
            eventBox('images/relics/trap.jpg', 'Shining Trapezohedron', "While West is transfixed by the vistas shown in the crystal's facets, another, hungrier presence stares back. (Sublimate unlocked in West tab, Trapezohedron placed in Sacrarium.)");
            document.getElementById('towerWrap').style.backgroundColor='#301934';
            world.tower.purchased = true;
            world.tower.stage++;
            world.tower.madMin=164;
            towerUpdater(false);
        }
    }else{
        if(vault.gold.current >= world.tower.cost && madMin(164)){
            numberChange('vault', 'gold', -world.tower.cost, 'yellow', 'red');
            towerUpdater(false);
        }
    }
}

function estateUpdater(load){
    buttonGlow("estateWrap");
    document.getElementById("estateDesc").innerHTML=world.estate["description" + (world.estate.stage)][0];
    document.getElementById("estateMadMin").innerHTML=world.estate.madMin;
    document.getElementById("estatecost").innerHTML=world.estate["description" + (world.estate.stage)][1];
    if(load !== "load"){
    loosePages(world.estate.cost);
    sentinelEx();
    world.estate.cost = Math.floor(world.estate.cost * 2.4);
    }
    document.getElementById("estateCost").innerHTML=world.estate.cost;
    document.getElementById("estateBenefit").innerHTML=world.estate["description" + (world.estate.stage)][2];
}
function estate(){
    if(world.estate.stage===1){
        if(vault.gold.current >= world.estate.cost && madMin(world.estate.madMin)){
            numberChange('vault', 'gold', -world.estate.cost, '', 'red');
            world.estate.stage=2;
            world.estate.madMin=164;
            eventBox('images/relics/key.jpg', 'The Silver Key!', "West searches wildly, drawn as a moth to a flame to the box etched with sigils in the attic. Inside is the Silver Key and a tattered parchment. Touching the Key, West has a vision of what could only be unknown Kadath where the old Gods of Earth dance, so they say. West's dreams are now filled with the search for that fabled locale.  (Silver Key placed in Sacrarium, Dreaming is more effective, Dream Expeditions unlocked.");
            actions.dream.level+=0.8;
            relics.key.unlocked = true;
            document.getElementById("keyWrap").style.display = "block";
            domUnlocks.sacrarium = true;
            document.getElementById('sacrariumTab').style.display='block';
            dreamEx.pillar.dreamUnlocked=true;
            setTimeout(function() {
            document.getElementById('dreamEx').style.display = 'flex';
            }, 2000);
            comment('Dream a little dream for me...', 'lightblue', 'blue');
            estateUpdater();
        }
    }else if(world.estate.stage===2){
        if(vault.gold.current >= world.estate.cost && madMin(world.estate.madMin)){
            numberChange('vault', 'gold', -world.estate.cost, '', 'red');
            world.estate.stage=3;
            world.estate.madMin=248;
            eventBox('images/world/estate.jpg', 'Buried Secrets', "Beneath the facade of genteel society lies a monstrous creation. (Breeding Pits in FleshCrafts)'");
            terrorCrafts.breedingPits.unlocked = true;
            document.getElementById('breedingPitsWrap').style.display='block';
            estateUpdater();
        }
    }else if (world.estate.stage===3){
        if(vault.gold.current >= world.estate.cost && madMin(world.estate.madMin)){
            numberChange('vault', 'gold', -world.estate.cost, '', 'red');
            world.estate.stage=4;
            world.estate.madMin=484;
            eventBox('images/world/estate.jpg', 'Innsmouth Harbor', "An ornate metal anchor hidden in a false wall gives West a rare opportunity. (Coral Reef expedition unlocked)");
            world.reef.unlocked = true;
            document.getElementById('reefWrap').style.display='block';
            estateUpdater();
        }
    }else if(world.estate.stage===4){
        if(cult.innocents.current>=8 && vault.gold.current >= world.estate.cost && madMin(world.estate.madMin)){
            numberChange("cult", "innocents", -8, "", "");
            numberChange('vault', 'gold', -world.estate.cost, '', 'red');
            ichorCrafts.brainJar.unlocked=true;
            document.getElementById("brainJarLock").style.display = "block";
            eventBox("images/eventImages/migo.jpg", "Mi-Go", "The winged crustaceans from Yuggoth are friendlier than they seem. They offer West one of their brain transport cylinders for study in exchange for only a few Innocents. (Brain Jars unlocked in IchorCrafts)");
            world.estate.stage=5;
            world.estate.madMin=88;
            world.estate.purchased = true;
            document.getElementById('estateWrap').style.backgroundColor='#301934';
            estateUpdater();
        }
    }else{
        if(vault.gold.current >= world.estate.cost && madMin(world.estate.madMin)){
            estateUpdater();
        }
    }
}


function wax(){
    if(vault.gold.current > world.wax.cost && madMin(world.wax.madMin)){
        buttonGlow("waxWrap");
        numberChange('vault', 'gold', -world.wax.cost, 'yellow', 'red');
        if(world.wax.stage===1){
            document.getElementById('rhanWrap').style.display='block';
            eventBox("images/godsAppeased/rhanAppeased.jpg", "Rhan-Tegoth!", "She was hidden there, locked away in the basement, waiting as she had waited Eons in the frozen North. The Harbinger of the Gods, Rhan is the Vessel of Transmutation. (Rhan waits in the Sacrarium)");
            comment('Free her... feed her... She is the harbinger.');
            document.getElementById('waxDesc').innerHTML = world.wax.description2[0];
            document.getElementById('waxBenefit').innerHTML = world.wax.description2[2];
            document.getElementById('sacrariumTab').style.display='block';
            domUnlocks.sacrarium = true;
            gods.rhan.unlocked = true;
            world.wax.stage++;
            world.wax.madMin=44;
            document.getElementById("waxMadMin").innerHTML=world.wax.madMin;
            world.wax.purchased = true;
            document.getElementById('waxWrap').style.backgroundColor='#301934';
        }else if(world.wax.kult === true){
            document.getElementById('waxWrap').style.backgroundColor='#301934';
            document.getElementById('waxDesc').innerHTML = world.wax.description2[0];
            document.getElementById('waxBenefit').innerHTML = world.wax.description2[2];
            world.wax.madMin=44;
            document.getElementById("waxMadMin").innerHTML=world.wax.madMin;
            world.wax.kult = false;
            vault.tyog.unlocked = true;
            world.mound.unlocked=true;
            document.getElementById("moundOneOff").style.display="block";
            document.getElementById('tyogWrap').style.display = 'block';
            eventBox('images/eventImages/mummy.jpg', "The Mummy.", "West finds T'yog propped up in a corner, bandaged arms raised to amuse the foolish. Petrified by dread Ghatanothoa in Ancient Mu, it is only with the Scroll that he may be freed. T'yog gratefully offers service as a High Priest, capable of specialized rituals. (T'yogCrafts unlocked, The Mound expedition unlocked.)");
        }else{
            document.getElementById('waxDesc').innerHTML = world.wax.description2[0];
            document.getElementById('waxBenefit').innerHTML = world.wax.description2[2];
            let temp = Math.ceil(Math.random() * world.wax.cost/400);
            numberChange('cult', 'innocents', temp, 'green', 'red');
            comment("many visitors means many opportunities... (+" + temp + "Innocents)", "green");
        }
    world.wax.cost = Math.ceil(world.wax.cost * 1.4);
    document.getElementById('waxCost').innerHTML = world.wax.cost;
    }
}


function desert(){
    if(world.desert.stage===1){
        if(vault.gold.current >= world.desert.cost && madMin(248)){
            numberChange('vault', 'gold', -world.desert.cost, 'yellow', 'red');
            loosePages(world.desert.cost);
            world.desert.cost=Math.floor(world.desert.cost * 1.8);
            document.getElementById("desertCost").innerHTML=world.desert.cost;
            buttonGlow("desertWrap");
            gods.nyar.unlocked = true;
            document.getElementById('nyarWrap').style.display='block';
            eventBox('images/world/desert.jpg', 'Hidden Passage', 'Having breached the ancient wall, West gazes into the depths and hears a faint piping. There is a flash like lightning and then laughter. (Nyarlathotep waits in the Sacrarium)'); 
            world.desert.stage=2;
            document.getElementById('desertDesc').innerHTML = world.desert.description2[0];
            document.getElementById('desertcost').innerHTML = world.desert.description2[1];
            document.getElementById('desertBenefit').innerHTML = world.desert.description2[2];
        }
    }else if(world.desert.stage===2){
        if(cult.sentinels.current>=8 && vault.gold.current >= world.desert.cost && madMin(248)){
            numberChange('vault', 'gold', -world.desert.cost, 'yellow', 'red');
            loosePages(world.desert.cost);
            world.desert.cost=Math.floor(world.desert.cost * 1.8);
            document.getElementById("desertCost").innerHTML=world.desert.cost;
            fleshCrafts.crocBargain.unlocked=true;
            document.getElementById("crocBargainWrap").style.display = "block";
            eventBox('images/world/desert.jpg', 'Irem?', 'Opening trade with the ancient Crocodilian civilzation was perilous, but West is sure they have much to offer. (Crocodilian Bargains)');
            document.getElementById('desertDesc').innerHTML = world.desert.description3[0];
            document.getElementById('desertcost').innerHTML = world.desert.description3[1];
            document.getElementById('desertBenefit').innerHTML = world.desert.description3[2];
            world.desert.stage++;
            world.desert.purchased=true;
            document.getElementById('desertWrap').style.backgroundColor='#301934';
        }
    }else if(world.desert.stage>2){
        if(vault.gold.current >= world.desert.cost && madMin(248)){
            numberChange('vault', 'gold', -world.desert.cost, 'yellow', 'red');
            loosePages(world.desert.cost);
            numberChange("stats", "vision", world.desert.cost/8, "yellow", "");
            world.desert.cost=Math.floor(world.desert.cost * 1.4);
            document.getElementById("desertCost").innerHTML=world.desert.cost;
        }
    }
}

//K’n-yan all dwelt in the great, tall city of Tsath Yoth valley of Do-Hna
function mound() {
    if (vault.gold.current >= world.mound.cost && cult.sentinels.current>=8 && madMin(484) && relics.scrollTyog.unlocked === true) {
        world.mound.purchased = true;
        flashFade("moundOneOff");
        let gold=Math.floor((world.mound.cost/2) + (Math.random() * 8 * (world.mound.cost/4)));
        numberChange("vault", "gold", gold, "", "");
        eventBox("images/eventImages/passage.jpg", "The Entrance", "The rock face melts with a wave of the Scroll of T'yog, revealing a dark passage into the Earth. West reaches the bottom only to discover a cavern of unimaginable proportions. With rations running low, West sends out Sentinels to gather what they can before vowing to return better equipped. (Tsath and Yoth expeditions unlocked, Gold acquired: " + gold);
        setTimeout(() => {
            world.tsath.unlocked=true;
            document.getElementById("tsathWrap").style.display="block";
            world.yoth.unlocked=true;
            document.getElementById("yothOneOff").style.display="block";
        }, 800);
    }
}


function tsathUpdater(){
    buttonGlow("tsathWrap");
    document.getElementById("tsathDesc").innerHTML=world.tsath["description" + (world.tsath.stage)][0];
    document.getElementById("tsathMadMin").innerHTML=world.tsath.madMin;
    document.getElementById("tsathcost").innerHTML=world.tsath["description" + (world.tsath.stage)][1];
    document.getElementById("tsathCost").innerHTML=world.tsath.cost;
    document.getElementById("tsathBenefit").innerHTML=world.tsath["description" + (world.tsath.stage)][2];
}
function tsath(){
    if(world.tsath.stage===1){
        if (vault.gold.current >= world.tsath.cost && cult.sentinels.current>=16 && madMin(world.tsath.madMin)) {
            numberChange("vault", "gold", -world.tsath.cost, "", "");
            tyogCrafts.winnowing.unlocked=true;
            document.getElementById("winnowingWrap").style.display="block";
            tyogCrafts.riteSpring.unlocked=true;
            document.getElementById("riteSpringWrap").style.display="block";
            world.tsath.cost =Math.ceil( world.tsath.cost * 1.8);
            world.tsath.stage++;
            world.tsath.madMin=484;
            tsathUpdater();
            eventBox("images/world/tsath.jpg", "Tsath", "With a Sentinel honor guard, T'yog greets the K'n-yan in their ancient tongue; both facts impressing the strange cavern dwellers. In the days after, West learns much from the decadent people. (Rite of Spring?, The Winnowing?)"); 
        }
    }else if(world.tsath.stage===2){
        if (vault.gold.current >= world.tsath.cost && cult.sentinels.current>=8 && madMin(world.tsath.madMin) && vault.tome.current>=1) {
            numberChange("vault", "gold", -world.tsath.cost, "", "red");
            numberChange("vault", "tome", -1, "", "red");
            tomeCrafts.enscribe.unlocked = true;
            document.getElementById('enscribeWrap').style.display='block';
            world.tsath.cost =Math.ceil( world.tsath.cost * 1.8);
            world.tsath.stage++;
            world.tsath.madMin=484;
            tsathUpdater();
            eventBox("images/world/tsath.jpg", "Scribes", "Pleased at the gift, the K'n-yan leaders show West their Grand Library and the Scribes who filled it. (Scribes unlocked in TomeCrafts)");
        }
    }else if(world.tsath.stage===3){
        if (vault.gold.current >= world.tsath.cost && cult.sentinels.current>=4 && madMin(world.tsath.madMin) && stats.vision.current>=8448) {
            numberChange("vault", "gold", -world.tsath.cost, "", "red"); 
            numberChange("stats", "vision", -8448, "", "red");
            loveCrafts.dreamTheft.unlocked=true;
            document.getElementById("dreamTheftLock").style.display="block";
            tomeCrafts.trickApprentice.unlocked=true;
            document.getElementById("trickApprenticeWrap").style.display = "block";
            world.tsath.cost =Math.ceil( world.tsath.cost * 1.8);
            world.tsath.stage++;
            world.tsath.madMin=484;
            tsathUpdater();
            eventBox("images/world/tsath.jpg", "Telepathic Communion", "The K'n-yan scholars drain West of his Visions of the upper Earth, but teach West a rudimentary telepathy. (Krueger? in LoveCrafts, Apprentices unlocked in TomeCrafts)");
        }
    }else if(world.tsath.stage===4){
        if (vault.gold.current >= world.tsath.cost && madMin(world.tsath.madMin) && vault.ichor.current>=8) {
            numberChange("vault", "gold", -world.tsath.cost, "", "red");
            numberChange("vault", "ichor", -8, "", "red");
            altars.tulu.purchased=true;
            document.getElementById('tuluWrap').style.display='flex';
            world.tsath.cost =Math.ceil( world.tsath.cost * 1.8);
            world.tsath.stage++;
            world.tsath.purchased=true;
            document.getElementById('tsathWrap').style.backgroundColor='#301934';
            world.tsath.madMin=248;
            tsathUpdater();
            eventBox("images/altar/tulu.jpg", "Tulu Altar", "Composed of an alloy brought to Earth by Great Tulu himself, the Altar hums with invisble energies. (Tulu Altar in altar room -this relic which is dangerous to use.)");
        }
    }else if(world.tsath.stage===5){
        if (vault.gold.current >= world.tsath.cost && madMin(world.tsath.madMin)) {
            numberChange("vault", "gold", -world.tsath.cost, "", "red");
            world.tsath.cost =Math.ceil( world.tsath.cost * 1.8);
            stats.health.max+=88;
            document.getElementById("healthDesc").innerHTML= "Health will drift up or down toward West's base Health, currently: " + Math.floor(stats.health.max);
            comment("increased Health capacity");
            loosePages(world.tsath.cost);
        }
    }
}

function yoth(){
     if (vault.gold.current >= world.yoth.cost && cult.sentinels.current>=8 && madMin(484)) {
        numberChange("vault", "gold", -world.yoth.cost, "", "red");
        gods.yig.unlocked = true;
        document.getElementById('yigWrap').style.display = 'block';
        world.yoth.purchased=true;
        flashFade('yothOneOff');
        eventBox("images/world/yoth.jpg", "Yoth", "Beneath the heart of dead Yoth lie the looted vaults of Zin. At T'yog's reptilian hiss, a shrine to Yig, the prehuman snake diety, is revealed. West is sure that with more funding, the entrance to lightless N'kai would be found. (N'kai expedition unlocked, Yig in Sacrarium)"); 
        world.nkai.unlocked=true;
        document.getElementById("nkaiOneOff").style.display="block";
    }
}

function nkai(){
     if (vault.gold.current >= world.nkai.cost && cult.sentinels.current>=8 && madMin(848)) {
        numberChange('vault', 'gold', -world.nkai.cost, '', 'red');
        world.nkai.purchased=true;
        eventBox('images/world/nkai.jpg',"N'kai","West fearfully approaches lightless N'kai and communes with the slippery things that dwell there. In an underground lake sits massive Tsathoggua, mouth still agape waiting lazily for the sacrifice. (Tsathoggua in Sacrarium)");
        gods.tsathoggua.unlocked = true;
        document.getElementById('tsathogguaWrap').style.display = 'block';
        flashFade('nkaiOneOff');
    }
}


function reef(){
    if(world.reef.stage===1){
        if(vault.flesh.current >= world.reef.cost && madMin(484)){
            buttonGlow("reefWrap");
            numberChange('vault', 'flesh', -world.reef.cost, 'yellow', 'red');
            world.reef.cost = 2;
            gods.dagon.unlocked = true;
            document.getElementById('dagonWrap').style.display = 'block';
            document.getElementById('sacrariumTab').style.display='block';
            domUnlocks.sacrarium = true;
            fleshCrafts.deepTrade.unlocked = true;
            fleshCrafts.deepTrade.purchased = true;
            document.getElementById('deepTradeWrap').style.display = 'block';
            eventBox('images/world/reef.jpg', 'Coral Reef', 'Using the Emerald Soapstone, West summons the Deep Ones. They offer trade and passage to their master Dagon. (Dagon unlocked in sacrarium, Deep Trade in FleshCrafts)');
            world.reef.stage=2;
            document.getElementById('reefDesc').innerHTML = world.reef.description2[0];
            document.getElementById('reefcost').innerHTML = world.reef.description2[1];
            document.getElementById('reefCost').innerHTML = world.reef.cost;
            document.getElementById('reefBenefit').innerHTML = world.reef.description2[2];
            world.reef.purchased = true;
            document.getElementById('reefWrap').style.backgroundColor='#301934';
        }
    }else if(world.reef.stage>=2){
        if(cult.innocents.current>world.reef.cost){
            buttonGlow("reefWrap");
            numberChange('cult', 'innocents', -world.reef.cost, '', 'red');
            numberChange('vault', 'gold', (world.reef.cost * 88), 'yellow', 'red');
            cult.hybrids.unlocked = true;
            document.getElementById('hybridsWrap').style.display='block'; 
            document.getElementById('hybridsPeg').style.display='block';
            world.reef.cost = Math.floor(world.reef.cost * 1.4);
            document.getElementById('reefCost').innerHTML = world.reef.cost + " Innocents";
            if(world.reef.stage>2){
                numberChange('cult', 'hybrids', 2, 'green', 'red');
                comment("Hybrid children watch the sea... (+2 Hybrids, + " + (world.reef.cost * 88) + " Gold)");
            }else{
                numberChange('cult', 'hybrids', 1, 'green', 'red');
                comment("Hybrid children watch the sea... (+1 Hybrid, + " + (world.reef.cost * 88) + " Gold)");
            }
        }
    }
}


function depths(){
    if(cult.hybrids.current >= world.depths.cost && relics.dagonsBlessing.unlocked === true && madMin(848)){
        buttonGlow("depthsWrap");
        if(world.depths.stage===1){
            world.depths.purchased = true;
            document.getElementById('depthsWrap').style.backgroundColor='#301934';
            gods.cth.unlocked = true;
            document.getElementById('cthWrap').style.display = 'block';
            eventBox('images/world/depths.jpg', "R'lyeh", "Despite the predations of sharks and other, less wholesome, creatures of the depths, West manages to find the sunken city. Swimming through its Cyclopean ruins, his essence is warped enough to catch the notice of the sleeper. (Cthulhu unlocked in Sacrarium)");
            world.depths.stage++;
        }else{
            loosePages(8888);
        }
    }
}

function ant(){
    if(vault.gold.current >= world.ant.cost && cult.sentinels.current >=44 && madMin(2484)){
        buttonGlow("antWrap");
        if(world.ant.stage === 1){
            numberChange('vault', 'gold', -world.ant.cost, 'yellow', 'red');
            numberChange('cult', 'sentinels', -16, '', 'red');
            eventBox("images/world/ant.jpg", "Antarctica", "Its existence concealed by fearful governments, the eons old city lies empty. Its inhabitants killed by their own creation. Arriving with knowledge both ancient and modern, West's Sentinels subdue a portion of the amorphous beast for study before fleeing. (-16 Sentinels, Shoggoth Farming in FleshCrafts)");
            document.getElementById("antDesc").innerHTML=world.ant.description2[0];
            document.getElementById("antBenefit").innerHTML=world.ant.description2[2];
            world.ant.cost= Math.floor(world.ant.cost * 4);
            document.getElementById("antCost").innerHTML= world.ant.cost;
            fleshCrafts.shoggothFarm.unlocked=true;
            document.getElementById("shoggothFarmLock").style.display = "block";
            world.ant.purchased = true;
            world.ant.stage++;
            document.getElementById('antWrap').classList.add("pulsingDarkness");
        }else if(world.ant.stage===2){
            darkDevourerReset();
        }
    }
}

            	//=========================================
                        //                                      Dream Expeditions
	//=========================================
let dreamEx = {
    pillar: {//unlocked by trap
      string: 'Pillar of Flame',
      description: ['The nearest landmark in the Dreaming.', ' Cost: 84 Vision, Radiance '],
      cost: 8,
      visionCost: 84,
      func: pillar,
      unlocked: true,
      active: false,
      purchased: false,
      dreamUnlocked: false//nested to avoid problems
          },
  zoog: {//unlocked by trap
      string: 'Zoog Village',
      description: ['The Zoog know much of the Dreaming.', ' Cost: 84 Vision, Radiance '],
      cost: 8,
      visionCost: 84,
      func: zoog,
      unlocked: true,
      active: false,
      purchased: false
  },
  ulthar: {//unlocked by trap
      string: 'Ulthar',
      description: ['Harm no cat in Ulthar.', ' Cost: 168 Vision, Radiance '],
      cost: 16,
      visionCost: 168,
      func: ulthar,
      unlocked: false,
      active: false,
      purchased: false
  },
  plateau: {
      string: 'Plateau of Leng',
      description: ['Few return from the Plateau of Leng. Madness Minimum: 248 ', ' Cost: 248 Vision, Radiance '],
      cost: 24,
      visionCost: 248,
      func: plateau,
      unlocked: true,
      active: false,
      purchased: false
  },
  zar: {//unlocked by hsan
      string: 'Zar',
      description: ['The Land of Forgotten Beauty', ' Cost: Vision 848 Radiance '],
      cost: 84,
      visionCost: 848,
      func: zar,
      unlocked: false,
      active: false,
      purchased: false
  },
   cele: {
      string: 'Celephaïs',
      description: ['One of the largest cities in the Dreaming, its dreamer Kuranes reigns there eternally.', ' Cost: 848 Vision, Radiance '],
      cost: 84,
      visionCost: 848,
      func: cele,
      unlocked: false,
      active: false,
      purchased: false
  },
  thar: {//unlocked by white ship
      string: 'Thalarion',
      description:[ 'The City of a Thousand Wonders.', 'Requires West has at least 1 Shard Cost: 848 Vision, Radiance '],
      cost: 84,
      visionCost: 848,
      func: thar,
      unlocked: false,
      active: false,
      purchased: false
  },
  xura: {//unlocked by white ship unlocks antart
      string: 'Xura',
      description: ['The Land of Pleasures Unattained.', ' Cost: Vision 484, Radiance '],
      cost: 48,
      visionCost: 484,
      func: xura,
      unlocked: false,
      active: false,
      purchased: false
  },
  sona: {//unlocked by white ship
      string: 'Sona-Nyl',
      description: ['Land of Fancy.', '  Cost: Vision 2484, Radiance '],
      cost: 248,
      visionCost: 2484,
      func: sona,
      unlocked: false,
      active: false,
      purchased: false
  },  
  dylath: {//unlocked by yog-sothoth
      string: 'Dylath-Leen',
      description:['The largest port in the Dreaming. Madness Minimum: 888 ', ' Cost: 4848 Vision, Radiance '],
      cost: 484,
      visionCost:4848,
      func: dylath,
      unlocked: false,
      active: false,
      purchased: false
  },
  kla: {//unlocked by 
      string: 'Hatheg-Kla',
      description: ['They say the gods of earth still gather here on cold and cloudy nights', ' Cost: 8484 Vision, 484 Health, 848 Radiance '],
      cost: 84848,
      func: kla,
      loot: ['nug', 'yeb', ''],
      unlocked: false,
      active: false,
      purchased: false
  }, 
  basalt: {//unlocked by white ship /black ship
      string: 'Basalt Pillars',
      description: ['Beyond which lies unknown Kadath, so they say. Madness Minimum: 555', ' Cost: 555 Vision, Radiance '],
      cost: 55,
      visionCost: 555,
      func: basalt,
      unlocked: false,
      active: false,
      purchased: false
  },  
  moon: {//unlocked by black ship
      string: 'The Moon',
      description: ['The Moon not implemented', 'Cost: 8484 Vision, Radiance '],
      cost: 848,
      visionCost: 8484,
      func: moon,
      unlocked: false,
      active: false,
      purchased: false
  },  
  kadath: {//unlocked by black ship
      string: 'Unknown Kadath',
      description: ['not implemented, but planned is the wooing of the minor gods of earth ', 'Cost: Radiance '],
      cost: 8484,
      visionCost: 84848,
      func: kadath,
      unlocked: false,
      active: false,
      purchased: false
  },  
  throne: {//unlocked by darkness
      string: "Throne of Azathoth",
      description: ['Beyond the collapse of the self and the other, beyond Yog-Sothoth, beyond light and Darkness, lies the Throne.', 'Cost: Radiance '],
      cost: 48484,
      visionCost: 484848,
      func: throne,
      unlocked: false,
      active: false,
      purchased: false
  }
};
let dreamExKeys = Object.keys(dreamEx);
function loadDreamExpeditions() {
    for (let i = 0; i < dreamExKeys.length; i++) {
        const dreamExDiv = document.getElementById('dreamEx');
        const button = document.createElement('button');
        
        // Create the image element
        const img = document.createElement('img');
        img.src = `images/dreamEx/${dreamExKeys[i]}.jpg`; 
        img.alt = dreamEx[dreamExKeys[i]].string; 
        img.classList.add('dreamExImg');
        
        // Create a span for the text
        const textSpan = document.createElement('span');
        textSpan.textContent = dreamEx[dreamExKeys[i]].string;
        textSpan.classList.add('dreamExTxt');
        
        // Set attributes for the button
        button.classList.add('dreamExWraps');
        const Id = dreamExKeys[i] + 'Wrap';
        button.id = Id;

        // Append the image and text to the button
        button.appendChild(img);
        button.appendChild(textSpan);
        if(dreamEx[dreamExKeys[i]].unlocked === true && dreamEx[dreamExKeys[i]].purchased === false){
            button.style.display='block';
        };
        // Append the button to the world element
        dreamExDiv.appendChild(button);

    }
}
 loadDreamExpeditions();


        	//=========================================
	// dream expedition functions
	//========================================= 

function pillar(){
    if(stats.radiance.current>=dreamEx.pillar.cost && stats.vision.current >= dreamEx.pillar.visionCost){
        numberChange('stats', 'radiance', -dreamEx.pillar.cost, 'blue', 'red');
        numberChange('stats', 'vision', -dreamEx.pillar.visionCost, 'blue', 'red');
        dreamEx.pillar.purchased = true;
        flashFade('pillarWrap');
        document.getElementById('dreamChosen').style.display='block';
        document.getElementById('dreamDropBtn').style.display='block';
        document.getElementById('mindAloneChoice').style.display='block';
        document.getElementById('lighthouseChoice').style.display='block';
        flash('westTab', 'lightblue', 'white');
        eventBox('images/eventImages/lighthouse.jpg', 'Lighthouse', 'In a nearby cavern West finds the bearded priests Nasht and Kaman-Thah. They warn him not to seek Unknown Kadath, where the Gods dwell, but agree to keep the Lighthouse burning in exchange for a bit of Radiance.(Dream Options Unlocked in West Tab)');
        comment('upgraded Dreaming available -West');
    }
}

function zoog(){
    if(stats.radiance.current>=dreamEx.zoog.cost && stats.vision.current >= dreamEx.zoog.visionCost){
        numberChange('stats', 'radiance', -dreamEx.zoog.cost, 'blue', 'red');
        numberChange('stats', 'vision', -dreamEx.zoog.visionCost, 'blue', 'red');
        dreamEx.zoog.purchased = true;
        flashFade('zoogWrap');
        dreamEx.ulthar.unlocked = true;
        document.getElementById('ultharWrap').style.display='block';
        madActions.drink.benefit*=8;
        document.getElementById('drinkBenefit').innerHTML= " Benefit: -" +madActions.drink.benefit + " Madness";     
        eventBox("images/dreamEx/zoog.jpg", "Zoog Village", "Speaking in their fluttering tongue, the Zoog know not where to find Kadath, where the Gods dwell. They urge West on to Ulthar and gift him a bottle of Moon-Wine. (Ulthar expedition, 4 x Drinking effectiveness)");
    }
}

function ulthar(){
    if(stats.radiance.current>=dreamEx.ulthar.cost && stats.vision.current >= dreamEx.ulthar.visionCost){
        numberChange('stats', 'radiance', -dreamEx.ulthar.cost, 'blue', 'red');
        numberChange('stats', 'vision', -dreamEx.ulthar.visionCost, 'blue', 'red');
        dreamEx.ulthar.purchased = true;
        flashFade('ultharWrap');
        document.getElementById('bastWrap').style.display='block';
        relics.bast.unlocked = true;
            document.getElementById('sacrariumTab').style.display='block';
            domUnlocks.sacrarium = true;
        flash('sacrariumTab', 'lightgreen', 'white');
        eventBox('images/relics/bast.jpg', 'Cats of Ulthar', 'A friendly Abyssinian adopts  West as he passes through the quiet city streets. Its Chaming presence proves very calming. (Bast is lounging in the Sacrarium)');
        comment('A magnificent creature (Bast lounging in Sacrarium)');
    }
}

function plateau(){
    if(stats.radiance.current>=dreamEx.plateau.cost && stats.vision.current >= dreamEx.plateau.visionCost  && madMin(248)){
        numberChange('stats', 'radiance', -dreamEx.plateau.cost, 'blue', 'red');
        numberChange('stats', 'vision', -dreamEx.plateau.visionCost, 'blue', 'red');
        dreamEx.plateau.purchased = true;
        flashFade('plateauWrap');
        world.desert.unlocked = true;
        setTimeout(() => {document.getElementById('desertWrap').style.display='block';}, 2000);
        document.getElementById('goulWrap').style.display = 'block';
        actionUpgrades.study.goul.unlocked = true;
        numberChange('vault', 'tome', 1, 'blue', 'red');
        eventBox('images/eventImages/leng.jpg', 'Men of Leng', 'Dangerous looking men invite West to a feast. As he dines, they share stories of secrets buried in the desert. West is so invigorated by the repast he asks for the recipe. They happily oblige and he awakens with a Tome in hands. (Cultes des Goules in West tab, Desert Expedition Unlocked)');
    }
}

function zar(){
    if(stats.radiance.current>=dreamEx.zar.cost && stats.vision.current >= dreamEx.zar.visionCost){
        numberChange('stats', 'radiance', -dreamEx.zar.cost, 'blue', 'red');
        numberChange('stats', 'vision', -dreamEx.zar.visionCost, 'blue', 'red');
        dreamEx.zar.purchased = true;
        flashFade('zarWrap');
        eventBox("images/dreamEx/zar.jpg", "Land of Zar", "The dreams of dead poets gift West stirring words to sway the Faithful.. (Preach effectiveness increased. Love from Faithful increased)");
        actions.preach.level++;
        cult.faithful.outMultipliers[0] += 0.8;
    } 
}

function cele(){
    if(stats.radiance.current>=dreamEx.cele.cost && stats.vision.current >= dreamEx.cele.visionCost){
        numberChange('stats', 'radiance', -dreamEx.cele.cost, 'blue', 'red');
        numberChange('stats', 'vision', -dreamEx.cele.visionCost, 'blue', 'red');
        dreamEx.cele.purchased = true;
        flashFade('celeWrap');
        eventBox('images/dreamEx/cele.jpg', 'Celephaïs', 'In his gloried city, the Dream Master Kuranes shows West nautical maps of faraway lands including the Basalt Pillars, beyond which it is rumored lies unkown Kadath. The captain of a gleaming White Ship offers him passage for a price. (White Ship dream option unlocked, new Dream Expeditions available.)');
        dreamChoices.whiteShip.unlocked = true;
        document.getElementById('whiteShipChoice').style.display='block';
        dreamEx.thar.unlocked = true;
        dreamEx.xura.unlocked = true;
        dreamEx.sona.unlocked = true;
        dreamEx.basalt.unlocked = true;
       //dreamEx.kla.unlocked = true;
        document.getElementById('tharWrap').style.display='block';
        document.getElementById('xuraWrap').style.display='block';
        document.getElementById('sonaWrap').style.display='block';
        document.getElementById('basaltWrap').style.display='block';
        //document.getElementById('klaWrap').style.display='block';
    }
    
}

function thar(){
    if(stats.radiance.current>=dreamEx.thar.cost && stats.vision.current >= dreamEx.thar.visionCost && stats.shards.current>=1){
        numberChange('stats', 'radiance', -dreamEx.thar.cost, 'blue', 'red');
        numberChange('stats', 'vision', -dreamEx.thar.visionCost, 'blue', 'red');
        dreamEx.thar.purchased = true;
        flashFade('tharWrap');
        eventBox("images/dreamEx/thar.jpg", "Thalarion", "At the gate Akariel, West submits himself for judgement by the eidolon Lathi. She notes the Shards of the divine in his eyes and grants him passage, yet he does not leave that place unscathed. He dreams only of giant penguins when he sleeps and wakes chilled to the bone.  (Shards doubled, Antarctica expedition unlocked, Dreaming Health benefit halved)");
        stats.shards.current*=2;
        document.getElementById('shards').innerHTML= stats.shards.current;
        world.ant.unlocked = true;
        document.getElementById('antWrap').style.display='block';
        //using ant unlock as condition for health in dream
    } 
}

function xura(){
    if(stats.radiance.current>=dreamEx.xura.cost && stats.vision.current >= dreamEx.xura.visionCost){
        numberChange('stats', 'radiance', -dreamEx.xura.cost, 'blue', 'red');
        numberChange('stats', 'vision', -dreamEx.xura.visionCost, 'blue', 'red');
        dreamEx.xura.purchased = true;
        flashFade('xuraWrap');
        eventBox("images/dreamEx/xura.jpg", "Xura", "In the land of pleasures unattained, they smoke a strange oil to forget the pains of life. (Smoke effectiveness greatly increased.)");
        madActions.smoke.cost*=8;
        madActions.smoke.benefit*=22;
        document.getElementById('smokeCost').innerHTML= madActions.smoke.cost;
        document.getElementById('smokeBenefit').innerHTML= " Benefit: -" +madActions.smoke.benefit + " Madness";
    }
    
}

function sonaStay() {
    if (!closeCheck) {
            numberChange('stats', 'vision', 44, 'blue', '');
            numberChange('stats', 'charm', 44, 'green', '');
            numberChange('stats', 'radiance', 4, 'blue', '');
        setTimeout(sonaStay, 1000);
    }
}
function sona(){
    if(stats.radiance.current>=dreamEx.sona.cost && stats.vision.current >= dreamEx.sona.visionCost){
        numberChange('stats', 'radiance', -dreamEx.sona.cost, 'blue', 'red');
        numberChange('stats', 'vision', -dreamEx.sona.visionCost, 'blue', 'red');
        dreamEx.sona.purchased = true;
        flashFade('sonaWrap');
        eventBox('images/dreamEx/sona.jpg', 'Sona-Nyl', 'The Land of Fancy captivates and enriches the soul. (Time continues to pass. West gains idle Vision, Charm, and Radiance until this window is closed and West leaves Sona-Nyl behind forever.)');
        setTimeout(timeOn, 1000);
        sonaStay();
    }
}

function dylath(){//88 rad unlock black ship
    if(stats.radiance.current>=dreamEx.dylath.cost && stats.vision.current >= dreamEx.dylath.visionCost  && madMin(888)){
        numberChange('stats', 'radiance', -dreamEx.dylath.cost, 'blue', 'red');
        numberChange('stats', 'vision', -dreamEx.dylath.visionCost, 'blue', 'red');
        dreamEx.dylath.purchased = true;
        flashFade('dylathWrap');
        dreamChoices.blackShip.unlocked = true;
        document.getElementById('blackShipChoice').style.display='block';//need black ship img
        eventBox('images/dreamEx/dylath.jpg', 'Dylath-Leen', 'In the docks of Dylath-Leen, the Black Ship awaits. The filthy turbans worn by the sailors do little to hide something even more unclean underneath. They offer West passage to regions untouched by men.(Black Ship dream option in West Tab -very expensive.)');
    }
}
function kla(){
    //mountain peak, nub and yig,
}
function basalt(){
    if(stats.radiance.current>=dreamEx.basalt.cost && stats.vision.current >= dreamEx.basalt.visionCost  && madMin(555)){
        //choice of ship
        eventBox("images/dreamEx/basalt.jpg", "A Choice", "Black Ship option costs 88 extra Radiance");
        let parent = document.getElementById('eventBox');
            let white =  document.createElement('button');
            white.className = "eventButtonsLeft";
            white.id = "white";
            white.innerHTML = 'White Ship';
            white.addEventListener('pointerdown',   () => basaltWhite());
            parent.appendChild(white);
            let black =  document.createElement('button');
            black.className = "eventButtonsRight";
            black.id = "black";
            if(stats.radiance.current>=(dreamEx.basalt.cost + 88)){
                black.style.backgroundColor = 'black';
                black.addEventListener('pointerdown',   () => basaltBlack());
            }
            black.innerHTML = 'Black Ship';
            parent.appendChild(black);
        if(dreamChoices.whiteShip.unlocked!==true){
            document.getElementById('white').style.backgroundColor="grey";
            document.getElementById('white').style.pointerEvents = "none";
            document.getElementById('white').style.cursor = "default";
        }
        if(dreamChoices.blackShip.unlocked!==true){
            document.getElementById('black').style.backgroundColor="grey";
            document.getElementById('black').style.pointerEvents = "none";
            document.getElementById('black').style.cursor = "default";
        }
    }
}
function basaltWhite(){
    numberChange('stats', 'radiance', -dreamEx.basalt.cost, 'blue', 'red');
    numberChange('stats', 'vision', -dreamEx.basalt.visionCost, 'blue', 'red');
    closeEventBox();
    setTimeout(() => {
        eventBox('images/dreamEx/crash.jpg', 'Crashed', 'A cruel joke, to think that the Gods could be so easily attained. Passing through the Pillars, the ship is caught in a vast whirlpool. Tumbling down, the White Ship is torn asunder. West can awaken in a cold sweat having lost the White Ship or face the Nameless Mist.');
        let parent = document.getElementById('eventBox');
        let no =  document.createElement('button');
        no.className = "eventButtonsLeft";
        no.innerHTML = 'Waken in Terror.';
        no.addEventListener('pointerdown',   () => basaltWhiteNo());
        parent.appendChild(no);
        let yes =  document.createElement('button');
        yes.className = "eventButtonsRight";
        yes.innerHTML = 'Accept Fate';
        yes.addEventListener('pointerdown',   () => basaltWhiteYes());
        parent.appendChild(yes);
    }, 800);
}
function basaltWhiteYes(){
    mistReset();
}
function basaltWhiteNo(){
    closeEventBox();
    dreamChoices.whiteShip.unlocked=false;
    document.getElementById('whiteShipChoice').style.display='none';
    comment("Waking in a cold sweat, West feels defeated, a sliver of white wood clutched tightly. (Radiance wasted, White Ship destroyed.)");
}
function basaltBlack(){
        numberChange('stats', 'radiance', -(dreamEx.basalt.cost + 88), 'blue', 'red');
        numberChange('stats', 'vision', -dreamEx.basalt.visionCost, 'blue', 'red');
            eventBox('images/dreamEx/flight.jpg', 'Ascent', "Passing near the yawning abyss gives West pause, but the Black Ship lurches into the sky, oars rowing the empty air wildly. The masters of the ship laugh cruelly at his discomfort and point to a map of the heavens hanging in the navigator's room. (Several new Expeditions available.)");
            dreamEx.basalt.purchased = true;
            flashFade('basaltWrap');
            dreamEx.moon.unlocked = true;
            dreamEx.kadath.unlocked = true;
            document.getElementById('moonWrap').style.display='block';
            document.getElementById('kadathWrap').style.display='block';
}

function moon(){
    if(stats.radiance.current>=dreamEx.moon.cost && stats.vision.current >= dreamEx.moon.visionCost){
        numberChange('stats', 'radiance', -dreamEx.moon.cost, 'blue', 'red');
        numberChange('stats', 'vision', -dreamEx.moon.visionCost, 'blue', 'red');
        dreamEx.moon.purchased = true;
        flashFade('moonWrap');
        comment("nothing here, probably gonna sell rubies.");
    }
}

function kadath(){
    if(stats.radiance.current>=dreamEx.kadath.cost && stats.vision.current >= dreamEx.kadath.visionCost){
        numberChange('stats', 'radiance', -dreamEx.kadath.cost, 'blue', 'red');
        numberChange('stats', 'vision', -dreamEx.kadath.visionCost, 'blue', 'red');
        dreamEx.kadath.purchased = true;
        flashFade('kadathWrap');
        eventBox("images/dreamEx/kadath.jpg", "Kadath", "Congrats! Here are all the gods. Sorry, not implemented yet");
    }
}

function throne(){
    if(stats.radiance.current>=dreamEx.throne.cost && stats.vision.current >= dreamEx.throne.visionCost){
        numberChange('stats', 'radiance', -dreamEx.throne.cost, 'blue', 'red');
        numberChange('stats', 'vision', -dreamEx.throne.visionCost, 'blue', 'red');
        dreamEx.throne.purchased = true;
        flashFade('throneWrap');
        eventBox("images/dreamEx/throne.jpg", "Sign the Book.",  "End this charade. (Book of Azathoth in West tab)");
        document.getElementById("azatWrap").style.display="block";
    }
}