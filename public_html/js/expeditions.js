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
      string: 'Desolate Crypt',
      description: ['Rifle through the bones of the dead seeking tomes of power. Madness Minimum: 44 ', ' Cost: Gold ', ' Benefits: ?'],
      description2: ['Less interesting crypts remain potentially profitable. Madness Minimum: 44 ', 'Cost: Gold ', 'Benefits: loose pages, Sentinals find Flesh'],
      cost: 248,
      func: crypt,
      unlocked: false,
          active: false,
      purchased: false
  },
  tower: {//unlocked by expeditions
      string: 'Shunned Towers',
      description: ['The locals know to avoid these old ruins at all costs. Madness Minimum: 88 ', ' Cost: Gold ', 'Benefit: ?'],
      description2: ['The moldy bookcases still hold secrets for the patient and careful.', 'Cost: Gold ', 'Benefit: loose pages and slightly improved Study.'],
      cost: 484,
      func: tower,
      loot: ['Shining Trapezohedron'],// unlocks dream expeditions
      unlocks: ['kult'],
      unlocked: false,
          active: false,
      purchased: false
  },
  wax: {//unlocked by expeditions
      string: 'Wax Museum',
      description: ['Something essential whispers from the basement. Madness Minimum: 88 ', 'Cost: Gold ', 'Benefit: ?'],
      description2: ['So many innocents wandering the halls. Madness Minimum: 88 ', 'Cost: Gold ', 'Benefit: Innocents'],
      cost: 848,
      unlocks: ['Rhan-Tegoth'],
      func: wax,
      unlocked: false,
          active: false,
      purchased: false,
      kult: false
  },
  desert: {//unlocked by 
      string: 'Desert Fastness',
      description: ['Buried tombs hide passages into Darkness.  Madness Minimum: 848 ', ' Cost: Gold ', 'Benefit: ?'],
      description2: ['Nothing', 'Cost: Gold ', 'Benefit: nothing'],
      cost: 4848,
      func: desert,
      loot: ['gates'],
      unlocks: ['Yig', 'Nyarlathotep'],
      unlocked: false,
          active: false,
      purchased: false
  },
  estate: {//unlocked by expeditions unlocks reef
      string: 'Ancestral Estate',
      description: ['Flashes of childhood horrors demand a return. Madness Minimum: 888 ', 'Cost: Gold ', 'Benefits: ?'],
      description2: ['Family is so important. Madness Minimum: 888 ', 'Cost: Gold ', 'Benefit: loose pages'],
      cost: 8484,
      func: estate,
      unlocked: false,
          active: false,
      purchased: false
  },
  passage: { //unlocked by eibon
      string: 'Stone Passage',
      description: ["Sealed for centuries, it may only be opened with the Scroll of T'yog. Madness Minimum: 888 ", ' Cost Gold ', "Benefit?"],
      description2: ["K'n-yan does not welcome strangers but the secrets to be had are worth the risk. Madness Minimum: 888 ", ' Cost Gold ', 'Benefit: loose pages'],
      cost: 8484,
      func: passage,
      unlocked: true,
      purchased: false
  },
  reef: {//unlocked by estate bc innsmouth
      string: 'Coral Reef',
      description: ['Things from the Deep meet here for commerce with the surface. Madness Minimum: 888 ', ' Cost: Flesh ', 'Benefit ?'],
      description2: ['Dagon offers a darker sort of trade. Madness Minimum: 888 ', 'Cost: Innocents ', 'Benefits: 1 Hybrid, Gold'],
      cost: 84,
      benefit: 1,
      func: reef,
      unlocked: false,
          active: false,
      purchased: false
  }, 
  depths: {//unlocked by dagon
      string: 'Ocean Depths',
      description: ["Swim through the dangerous ruins of R'lyeh to find a slumbering God. Madness Minimum: 4444 ", "Dagon's Blessing required, Cost: Hybrids ", "Benefit?"],
      description2: ['Secrets abound for the daring. Madness Minimum: 4444 ', 'Cost: Hybrids  ', 'Benefit: loose pages, '],//lagh metal?
      cost: 16,
      func: depths,
      unlocked: false,
          active: false,
      purchased: false
  },
  ant: {//unlocked by kla dream
      string: 'Antarctic Journey',
      description: ['Only the truly foolish would dare the graveyard of an entire species. Madness Mininum: 444444', 'Requires 44 Sentinels Cost: Gold ', "Benefit:?"],
      description2: ['N/A', 'Cost:   ', 'Benefit: N/A '],//lagh metal?
      cost: 484848,
      func: ant,
      loot: ['Darkness'],
      unlocks: [],
      unlocked: false,
          active: false,
      purchased: false
  }
};
let worldKeys = Object.keys(world);
function loadWorldExpeditions() {
    for (let i = 0; i < worldKeys.length; i++) {
        const worlds = document.getElementById('world');
        const button = document.createElement('button');
        
        // Create the image element
        const img = document.createElement('img');
        img.src = `images/world/${worldKeys[i]}.jpg`; // Use the worldKeys variable for the image path
        img.alt = world[worldKeys[i]].string; // Optional: alt text using world string
        img.classList.add('worldImg');
        
        // Create a span for the text
        const textSpan = document.createElement('span');
        textSpan.textContent = world[worldKeys[i]].string;
        textSpan.classList.add('worldTxt');
        
        // Set attributes for the button
        button.classList.add('worldWraps');
        const Id = worldKeys[i] + 'Wrap';
        button.id = Id;

        // Append the image and text to the button
        button.appendChild(img);
        button.appendChild(textSpan);
        
        // Append the button to the world element
        worlds.appendChild(button);
    }
}
loadWorldExpeditions();



        	//=========================================
	// expedition functions
	//========================================= 
        
function loosePages(cost){
    let pages=Math.floor((cost*0.04) +(Math.random()*0.08* cost));
        vault.tomes.pageCounter += pages;
        comment("loose pages...(+ " + pages + " pages)");
        document.getElementById('pages').innerHTML = Math.floor(vault.tomes.pageCounter);
        if(vault.tomes.pageCounter >= vault.tomes.pagesNeeded){
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
        let temp = Math.ceil(cult.sentinels.outMultiplier * (Math.max((Math.random() * cult.sentinels.current), 1))); //always flesh in a crypt
        numberChange('vault', 'flesh', temp, 'red', 'red');
        comment("The Sentinels found some Flesh +" + temp, "red");
        }
}
function crypt(){
    if(vault.gold.current > world.crypt.cost && madMin(44)){
        numberChange('vault', 'gold', -world.crypt.cost, '', 'red');
        loosePages(world.crypt.cost);
        if(cult.sentinels.current >0){
            sentinelEx();
        }
        if(world.crypt.purchased === false){
            world.crypt.purchased = true;
            vault.tomes.unlocked = true;
            document.getElementById('tomesWrap').style.display='block';
            document.getElementById('tomes').innerHTML = vault.tomes.current;
            comment('A unique find! (Professor West)', 'lightblue', 'crypt');
            eventBox('images/eventImages/manuscript.jpg', 'Pnakotic Manuscripts', 'A unique find. Translation (West tab) will improve Studying and Mental Fortitude. More can be Forged in FleshCrafts.');
            document.getElementById('pnakWrap').style.display='block';
            actionUpgrades.study.pnak.unlocked = true;
            document.getElementById('cryptWrap').style.backgroundColor='grey';
            document.getElementById('cryptDesc').innerHTML = world.crypt.description2[0];
            document.getElementById('cryptBenefit').innerHTML = world.crypt.description2[2];
        }

        world.crypt.cost = Math.ceil(world.crypt.cost * 1.4);
        document.getElementById('cryptCost').innerHTML= world.crypt.cost;
    }
}

function tower(){
    if(vault.gold.current >= world.tower.cost && madMin(88)){
        numberChange('vault', 'gold', -world.tower.cost, 'yellow', 'red');
        loosePages(world.tower.cost);
        if(world.tower.purchased === false){
            world.tower.purchased = true;
            relics.trap.unlocked = true;
            dreamEx.pillar.dreamUnlocked = true;
            document.getElementById('trapWrap').style.display='block';
            document.getElementById('sacrariumTab').style.display='block';
            domUnlocks.sacrarium = true;
            setTimeout(function() {
                document.getElementById('dreamEx').style.display = 'flex';
            }, 2000);
            dreamEx.pillar.unlocked = true;
            dreamEx.plateau.unlocked = true;
            dreamEx.zoog.unlocked = true;
            document.getElementById('pillarWrap').style.display='block';
            document.getElementById('plateauWrap').style.display='block';
            document.getElementById('zoogWrap').style.display='block';
            comment('Dream a little dream for me...', 'lightblue', 'blue');
            eventBox('images/relics/trap.jpg', 'Shining Trapezohedron', "Its facets reveal the infinite Realms beyond. West catches a glimpse of what could be Unknown Kadath where the gods dwell, so they say. West's dreams are now filled with the search for that fabled locale. (Dream Expeditions unlocked. Trapezohedron placed in Sacrarium.)");
            document.getElementById('towerWrap').style.backgroundColor='grey';
            document.getElementById('towerDesc').innerHTML = world.tower.description2[0];
            document.getElementById('towerBenefit').innerHTML = world.tower.description2[2];
        }
        actions.study.level+=0.4;
        world.tower.cost = Math.ceil(world.tower.cost * 1.4);
        document.getElementById('towerCost').innerHTML = world.tower.cost;
    }
}


function wax(){
    if(vault.gold.current > world.wax.cost && madMin(88)){
        numberChange('vault', 'gold', -world.wax.cost, 'yellow', 'red');
        if(world.wax.purchased === false){
            document.getElementById('rhanWrap').style.display='block';
            eventBox("images/relics/rhanRelic.jpg", "Rhan-Tegoth!", "She was hidden there, locked away in the basement, waiting as she had waited Eons in the frozen North. The Harbinger of the Gods, Rhan is the Vessel of Transmutation. (Rhan waits in the Sacrarium)");
            comment('Free her... feed her... She is the harbinger.');
            document.getElementById('waxWrap').style.backgroundColor='grey';
            document.getElementById('waxDesc').innerHTML = world.wax.description2[0];
            document.getElementById('waxBenefit').innerHTML = world.wax.description2[2];
            document.getElementById('sacrariumTab').style.display='block';
            domUnlocks.sacrarium = true;
            gods.rhan.unlocked = true;
            world.wax.purchased = true;
    }else{
        let temp = Math.floor(Math.random() * world.wax.cost/400) + cult.sentinels.current;
        numberChange('cult', 'innocents', temp, 'green', 'red');
        comment("many visitors means many opportunities... (+" + temp + "Innocents)", "green");
    }
    if(world.wax.kult === true){
        document.getElementById('waxWrap').style.backgroundColor='grey';
        world.wax.kult = false;
        gods.shub.unlocked = true;
        document.getElementById('shubWrap').style.display='block';
            vault.tyog.unlocked = true;
            document.getElementById('tyogWrap').style.display = 'block';
//        terrorCrafts.mass.unlocked = true;
//            document.getElementById('massWrap').style.display='block';
        eventBox('images/eventImages/mummy.jpg', "The Mummy.", "West finds T'yog propped up in a corner, bandaged arms raised to amuse the foolish. Petrified by dread Ghatanothoa in Ancient Mu, it is only with the Scroll that he may be freed. T'yog gratefully offers service as a High Priest, capable of specialized rituals and the blessing of his patron. (T'yog Rituals in Cult, Shub-Niggurath in Sacrarium)");
        }
    world.wax.cost = Math.ceil(world.wax.cost * 1.4);
    document.getElementById('waxCost').innerHTML = world.wax.cost;
    }
}

function desert(){
    if(vault.gold.current >= world.desert.cost && madMin(848)){
        numberChange('vault', 'gold', -world.desert.cost, 'yellow', 'red');
        world.desert.purchased = true;
        flashFade('desertWrap');
        gods.nyar.unlocked = true;
        document.getElementById('nyarWrap').style.display='block';
            document.getElementById('sacrariumTab').style.display='block';
            domUnlocks.sacrarium = true;
        eventBox('images/world/desert.jpg', 'Hidden Passage', 'Having breached the ancient wall, West gazes into the depths and hears a faint piping. There is a flash like lightning and then laughter. (Nyarlathotep waits in the Sacrarium)');
        loosePages(world.desert.cost);
    }
}

function estate(){//unlocks reef bc innsmouth
    if(vault.gold.current >= world.estate.cost && madMin(888)){
        numberChange('vault', 'gold', -world.estate.cost, '', 'red');
        world.estate.cost = Math.floor(world.estate.cost * 1.4);
        document.getElementById('estateCost').innerHTML = world.estate.cost;
        if(world.estate.purchased === false){
            world.estate.purchased = true;
            document.getElementById('estateWrap').style.backgroundColor='grey';
            document.getElementById('estateDesc').innerHTML = world.estate.description2[0];
            document.getElementById('estateBenefit').innerHTML = world.estate.description2[2];
            eventBox('images/world/estate.jpg', 'Innsmouth Estate', "Mouldy and delapidated, West's childhood home brings back memories of Family secrets under the earth and what lies beyond the Reef. (Breeding Pits in FleshCrafts, Reef Expedition)'");
            terrorCrafts.breedingPits.unlocked = true;
            document.getElementById('breedingPitsWrap').style.display='block';
            world.reef.unlocked = true;
            document.getElementById('reefWrap').style.display='block';
        }
        loosePages(world.estate.cost);
        sentinelEx();
    }
}
//K’n-yan all dwelt in the great, tall city of Tsath Yoth valley of Do-Hna
function passage(){
    if(vault.gold.current >= world.passage.cost && madMin(888) && relics.tyog.unlocked === true){
        numberChange('vault', 'gold', -world.passage.cost, '', 'red');
        world.passage.cost = Math.floor(world.passage.cost * 1.4);
        document.getElementById('passageCost').innerHTML = world.passage.cost;
        if(world.passage.purchased === false){
            world.passage.purchased = true;
            document.getElementById('passageWrap').style.backgroundColor='grey';
            document.getElementById('passageDesc').innerHTML = world.estate.description2[0];
            document.getElementById('passageBenefit').innerHTML = world.estate.description2[2];
            eventBox('images/world/passage.jpg', "N'kai", "The sealed stone melts with a wave of the Scroll of T'yog, revealing passages winding ever deeper into the Earth. Moving through the viscious realm of the K’n-yan, beneath the blood red plains of Yoth, West fearfully approaces lightless N'kai. Massive Tsathoggua sits lazily in the darkness there, mouth still agape for the sacrifice. (Tsathoggua in Sacrarium)");
            gods.tsath.unlocked = true;
            document.getElementById('tsathWrap').style.display = 'block';
            document.getElementById('sacrariumTab').style.display='block';
            domUnlocks.sacrarium = true;
        }
        loosePages(world.passage.cost);
    }
}
function reef(){
    if(world.reef.purchased === false){
        if(vault.flesh.current >= world.reef.cost && madMin(888)){
            numberChange('vault', 'flesh', -world.reef.cost, 'yellow', 'red');
            world.reef.cost = 2;
            world.reef.purchased = true;
            gods.dagon.unlocked = true;
            document.getElementById('dagonWrap').style.display = 'block';
            document.getElementById('sacrariumTab').style.display='block';
            domUnlocks.sacrarium = true;
            fleshCrafts.deepTrade.unlocked = true;
            fleshCrafts.deepTrade.purchased = true;
            document.getElementById('deepTradeWrap').style.display = 'block';
            eventBox('images/world/reef.jpg', 'Coral Reef', 'Using the Emerald Soapstone, West summons the Deep Ones. They offer trade and passage to their master Dagon. (Dagon unlocked in sacrarium, Deep Trade in FleshCrafts)');
            document.getElementById('reefWrap').style.backgroundColor='grey';
            document.getElementById('reefDesc').innerHTML = world.reef.description2[0];
            document.getElementById('reefcost').innerHTML = world.reef.description2[1];
            document.getElementById('reefCost').innerHTML = world.reef.cost;
            document.getElementById('reefBenefit').innerHTML = world.reef.description2[2];
        }
    }else if(cult.innocents.current>world.reef.cost){
            numberChange('cult', 'innocents', -world.reef.cost, '', 'red');
            numberChange('vault', 'gold', (world.reef.cost * 88), 'yellow', 'red');
            cult.hybrids.unlocked = true;
            document.getElementById('hybridsWrap').style.display='block'; 
            document.getElementById('hybridsPeg').style.display='block';
            comment("Hybrid children watch the sea... (+" + world.reef.benefit + " Hybrid, + " + (world.reef.cost * 88) + " Gold)");
            world.reef.cost = world.reef.cost * 2;
            document.getElementById('reefCost').innerHTML = world.reef.cost + " Innocents";
            document.getElementById('reefBenefit').innerHTML = world.reef.benefit + " Hybrid";
            numberChange('cult', 'hybrids', world.reef.benefit, 'green', 'red');
    }        
}


function depths(){
    if(cult.hybrids.current >= world.depths.cost && relics.dagonsBlessing.unlocked === true && madMin(4444)){
        if(world.depths.purchased === false){
            world.depths.purchased = true;
            document.getElementById('depthsWrap').style.backgroundColor='grey';
            gods.cth.unlocked = true;
            document.getElementById('cthWrap').style.display = 'block';
            eventBox('images/world/depths.jpg', "R'lyeh", "Despite the predations of sharks and other, less wholesome, creatures of the depths, West manages to find the sunken city. Swimming through its Cyclopean ruins, his essence is warped enough to catch the notice of the sleeper. (Cthulhu unlocked in Sacrarium)");
        }else{
            loosePages(8888);
        }
    }
}

function ant(){
    if(vault.gold.current >= world.ant.cost && cult.sentinels.current >=44 && madMin(444444)){
        if(world.ant.purchased === false){
            numberChange('vault', 'gold', -world.ant.cost, 'yellow', 'red');
            numberChange('cult', 'sentinels', -44, '', 'red');
            eventBox("images/world/ant.jpg", "Antarctica", "Gonna be a whole new reset mechanic here... someday...");
            world.ant.purchased = true;
            document.getElementById('antWrap').style.backgroundColor='grey';
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
      unlocked: false,
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
      unlocked: false,
          active: false,
      purchased: false
  },
  ulthar: {//unlocked by trap
      string: 'Ulthar',
      description: ['Harm no cat in Ulthar.', ' Cost: 248 Vision, Radiance '],
      cost: 24,
      visionCost: 248,
      func: ulthar,
      unlocked: false,
          active: false,
      purchased: false
  },
  plateau: {// Men of Leng satyrs who eat people
      string: 'Plateau of Leng',
      description: ['Few return from the Plateau of Leng. Madness Minimum: 444 ', ' Cost: 484 Vision, Radiance '],
      cost: 48,
      visionCost: 484,
      func: plateau,
      unlocked: false,
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
   cele: {//unlocked by hsan quadruples dream power white ship
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
  dylath: {//unlocked by hsan
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
      description: ['not implemented ', 'Cost: Radiance '],
      cost: 8484,
      visionCost: 84848,
      func: kadath,
      loot: [''],
      unlocked: false,
          active: false,
      purchased: false
  },  
  throne: {//unlocked by jenkin
      string: "Throne of Azathoth",
      description: ['Promises made by the murderous Brown Jenkin say it lies at the center of existence.', 'Cost: Radiance '],
      cost: 8484,
      visionCost: 84848,
      func: throne,
      loot: [''],
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
    if(stats.radiance.current>=dreamEx.plateau.cost && stats.vision.current >= dreamEx.plateau.visionCost  && madMin(444)){
        numberChange('stats', 'radiance', -dreamEx.plateau.cost, 'blue', 'red');
        numberChange('stats', 'vision', -dreamEx.plateau.visionCost, 'blue', 'red');
        dreamEx.plateau.purchased = true;
        flashFade('plateauWrap');
        world.desert.unlocked = true;
        setTimeout(() => {document.getElementById('desertWrap').style.display='block';}, 2000);
        document.getElementById('goulWrap').style.display = 'block';
        actionUpgrades.study.goul.unlocked = true;
        numberChange('vault', 'tomes', 1, 'blue', 'red');
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
        madActions.smoke.cost*=44;
        madActions.smoke.benefit*=222;
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
    if(stats.radiance.current>=dreamEx.basalt.cost && stats.vision.current >= dreamEx.basalt.visionCost  && madMin(5)){
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
            document.getElementById('white').style.cursor = "default";
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
    comment("Radiance wasted, White Ship destroyed.");
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