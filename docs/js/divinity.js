/* 
 * 3 books needed azat damn necro
 * 2 locations mountain and antart
 * 2 dreams moon kadath
 * choir
 * ok
 */
let permanentChanges = {
    totalShards: 0,  
    immortality: false,
    mist: false,
    darkDevourer:false,
    brined: 0,
    lastReset: "none",
    resetting:false,//tells game we are running one of the resets
    shardBuys:{},
    immortalStats:stats
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
function shardsBoughtLoad() {
    let inReset = permanentChanges.lastReset !== "none";
    if (inReset && permanentChanges.mist === true) {
        stats.madness.madCap *= 4; // base 4x bonus
        updateMadnessSlider();
        document.getElementById("madnessDesc").innerHTML = "Madness rides the star-wind... MadCap: " + Math.floor(stats.madness.madCap);
        actions.study.level *= 4;
        actions.dream.level *= 4;
    }
    let savedShardBuys = permanentChanges.shardBuys;//keeps funcs intact.
    for (const category in savedShardBuys) {
        const savedUpgrades = savedShardBuys[category];
        for (const key in savedUpgrades) {
            if (shardBuys[category] && shardBuys[category][key]) {
                // Only restore cost and level from saved data
                shardBuys[category][key].level = savedUpgrades[key].level;
                shardBuys[category][key].cost = savedUpgrades[key].cost;
            }
        }
    }
    for (const category in shardBuys) {
        const upgrades = shardBuys[category];
        for (const key in upgrades) {
            const upgrade = upgrades[key];
            updateShardUI(key, upgrade);
            if ((inReset && upgrade.permanent) || !upgrade.permanent) {
                const levelsToApply = upgrade.level - 1;
                if (levelsToApply > 0) {
                    if(category === "actions"){
                        for (let i = 0; i < levelsToApply; i++) {
                            shardActionMultiplier(key, true);
                        }
                    }else if(category ===  'madReducers'){
                        // These don’t store func, use madReducer
                        for (let i = 0; i < levelsToApply; i++) {
                            madReducer(key, true);
                        }
                    }else if (category ===  'cultists'){
                        for (let i = 0; i < levelsToApply; i++) {
                            if (key.startsWith('shardFaithfulMultiplier')) {
                                const multiplierNum = key.replace('shardFaithfulMultiplier', '');
                                shardFaithfulMultiplier(parseInt(multiplierNum), true);
                            }
                        }
                    }else if (typeof upgrade.func === 'function') {
                        for (let i = 0; i < levelsToApply; i++) {
                            upgrade.func(true);
                        }
                    }
                }
            handleSpecialUpgrades(key, upgrade);
            }
        }
    }
}

function updateShardUI(key, upgrade) {
    const levelEl = document.getElementById(key + 'Level');
    if (levelEl) levelEl.innerText = upgrade.level;
    const costEl = document.getElementById(key + 'Cost');
    if (costEl) costEl.innerText = upgrade.cost;
    const buttonCostEl = document.getElementById(key + 'ButtonCost');
    if (buttonCostEl) buttonCostEl.innerText = upgrade.description[1] + upgrade.cost;
}

function handleSpecialUpgrades(key, upgrade) {
    if (key === "functionalAlcoholic" && upgrade.purchased) {
        const sliderBox = document.getElementById("functionalAlcoholicSliderBox");
        if (sliderBox) sliderBox.style.display = "inline-block";
    }
    if (key === "functionalAddict" && upgrade.purchased) {
        const sliderBox = document.getElementById("functionalAddictSliderBox");
        if (sliderBox) sliderBox.style.display = "inline-block";
    }
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


//stats
function shardPurchases(path){
    let divineShards = stats.shards.current;
    if(permanentChanges.darkDevourer===true){
        divineShards= stats.shards.current + stats.radiance.current;
    }
    if (divineShards >= path.cost) {
        if(stats.radiance.current>=path.cost){
            numberChange('stats', 'radiance', -path.cost, "blue", "red");
        }else{
            let temp = path.cost - stats.radiance.current;
             numberChange('stats', 'radiance', -stats.radiance.current, "blue", "red");
             numberChange('stats', 'shards', -temp, "blue", "red");
         }
        return true; 
    } else {
        return false; 
    }
}
function shardHealth(skipPay = false){
    if (skipPay===false && !shardPurchases(shardBuys.stats.shardHealth)) {
        return;
    }
    stats.health.max+=88;
    document.getElementById("healthDesc").innerHTML= "Health will drift up or down toward West's base Health, currently: " + Math.floor(stats.health.max);
    if (skipPay===false) {
        comment("+88 maximum Health");
        shardBuys.stats.shardHealth.level++;
        shardBuys.stats.shardHealth.cost +=4;
        document.getElementById('shardHealthLevel').innerText = shardBuys.stats.shardHealth.level;
        document.getElementById('shardHealthCost').innerText =  shardBuys.stats.shardHealth.cost;
        document.getElementById('shardHealthButtonCost').innerText =  shardBuys.stats.shardHealth.description[1] + shardBuys.stats.shardHealth.cost;
    }
}

function shardMadCap(skipPay = false){
    if (!skipPay && !shardPurchases(shardBuys.stats.shardMadCap)) {
        return;
    }
    stats.madness.madCap+=88;
    updateMadnessSlider();
    if (!skipPay) {
        comment("+88 maximum Madness");
        shardBuys.stats.shardMadCap.level++;
        shardBuys.stats.shardMadCap.cost +=4;
        document.getElementById('madnessDesc').innerText = "Madness rides the star-wind... MadCap: " + Math.floor(stats.madness.madCap);
        document.getElementById('shardMadCapLevel').innerText = shardBuys.stats.shardMadCap.level;
        document.getElementById('shardMadCapCost').innerText =  shardBuys.stats.shardMadCap.cost;
        document.getElementById('shardMadCapButtonCost').innerText =   shardBuys.stats.shardMadCap.description[1] + shardBuys.stats.shardMadCap.cost;
    }
}

function shardActionMultiplier(action, skipPay = false) {
    if (!skipPay && !shardPurchases(shardBuys.actions[action])) {
        return;
    }
    let actionM = action.slice(0, -1);  
    if(action === "preachM"){
        actions[actionM].level +=1;
    }else{
        actions[actionM].level +=0.8;
    }
    if (!skipPay) {
        shardBuys.actions[action].level++;
        shardBuys.actions[action].cost *= 2;
        if(action === "preachM"){//doubled again to 4x
            shardBuys.actions[action].cost *= 2;
        }
        document.getElementById(action + 'Level').innerText = shardBuys.actions[action].level;
        document.getElementById(action + 'Cost').innerText = shardBuys.actions[action].cost;
        document.getElementById(action + 'ButtonCost').innerText =   shardBuys.actions[action].description[1] + shardBuys.actions[action].cost;
        comment(`West can now ${actionM.charAt(0).toUpperCase() + actionM.slice(1)} more effectively.`, "green");
    }
}

function madReducer(actionMR, skipPay = false){
    if (!skipPay && !shardPurchases(shardBuys.madReducers[actionMR])) {
        return;
    }
    let action = actionMR.slice(0, -2);           
    actions[action].madnessChance *= 0.875;
    if (!skipPay) {
        shardBuys.madReducers[actionMR].level++;
        shardBuys.madReducers[actionMR].cost *=2;
        document.getElementById(actionMR + 'Level').innerText = shardBuys.madReducers[actionMR].level;
        document.getElementById(actionMR + 'Cost').innerText =  shardBuys.madReducers[actionMR].cost;
        document.getElementById(actionMR + 'ButtonCost').innerText =  shardBuys.madReducers[actionMR].description[1] + shardBuys.madReducers[actionMR].cost;
        comment(action.charAt(0).toUpperCase() + action.slice(1) + ` Madness chance reduced by 1/8.`, "blue");
    }
}

function functionalAlcoholic(skipPay = false){
    if (!skipPay && !shardPurchases(shardBuys.madActions.functionalAlcoholic)) {
        return;
    }
    shardBuys.madActions.functionalAlcoholic.purchased=true;
    if (!skipPay) {
        flashFade("functionalAlcoholicShardBuyOneOff");
        setTimeout(() => {
            document.getElementById("functionalAlcoholicSliderBox").style.display="inline-block";
        }, 800);
    } else {
        document.getElementById("functionalAlcoholicSliderBox").style.display="inline-block";
    }
}

function functionalAddict(skipPay = false){
    if (!skipPay && !shardPurchases(shardBuys.madActions.functionalAddict)) {
        return;
    }
    shardBuys.madActions.functionalAddict.purchased=true;
    if (!skipPay) {
        flashFade("functionalAddictShardBuyOneOff");
        setTimeout(() => {
            document.getElementById("functionalAddictSliderBox").style.display="inline-block";
        }, 800);
    } else {
        document.getElementById("functionalAddictSliderBox").style.display="inline-block";
    }
}

function pMadReducer(skipPay = false){
    if (!skipPay && !shardPurchases(shardBuys.madActions.pMadReducer)) {
        return;
    }
    let temp = Math.min(permanentMadness.level, 4);
    permanentMadness.level -= temp;
    
    if (!skipPay) {
        shardBuys.madActions.pMadReducer.level++;
        shardBuys.madActions.pMadReducer.cost *=2;
        document.getElementById('pMadReducerLevel').innerText = shardBuys.madActions.pMadReducer.level;
        document.getElementById('pMadReducerCost').innerText =  shardBuys.madActions.pMadReducer.cost;
        document.getElementById('pMadReducerButtonCost').innerText =  shardBuys.madActions.pMadReducer.description[1] + shardBuys.madActions.pMadReducer.cost;
        comment("Permanent Madness reduced by " + temp, "blue");
    }
}

//helper to call on madcap change
function updateMadnessSlider() {
    const madCap = stats.madness.madCap;
    [{ id: "functionalAlcoholic", key: "alcoholism" }, { id: "functionalAddict",    key: "addiction" }].forEach(({ id, key }) => {
        const slider = document.getElementById(id + "Slider");
        const center = document.getElementById(id + "SliderNum");
        const capDisplay = document.getElementById(id + "MadCap");
        slider.value = madUps[key].madMaintain; // check chosen madness
        center.textContent = madUps[key].madMaintain;
        slider.max = madCap; 
        capDisplay.textContent = madCap;  
    });
}
function updateMadnessSliderValue(madKey, domIdPrefix) {
  const slider = document.getElementById(domIdPrefix + "Slider");
  const center = document.getElementById(domIdPrefix + "SliderNum");
  const value = Math.floor(slider.value);
  center.textContent = value;
  madUps[madKey].madMaintain = value;
}


function buildFunctionalMadnessManager(upgradeKey, actionName, container) {
    const madSliderBox = document.createElement("div");
    madSliderBox.className = "madSliderBoxes";
    madSliderBox.id = upgradeKey + "SliderBox";
    // Row 1: Title
    const title = document.createElement("div");
    title.textContent = "Manage " + (actionName === "drink" ? "Drinking" : "Smoking");
    title.className = "madSliderTitles";
    madSliderBox.appendChild(title);
    // Row 2: Range display
    const rangeRow = document.createElement("div");
    rangeRow.className="slideInfoRow";
    const left = document.createElement("div");
    left.textContent = "0";
    left.className = "madSliderNums";
    const center = document.createElement("div");
    center.className = "madSliderNums";
    center.id = upgradeKey + "SliderNum";
    const right = document.createElement("div");
    right.textContent = stats.madness.madCap;
    right.className = "madSliderNums";
    right.id = upgradeKey +"MadCap";
    rangeRow.appendChild(left);
    rangeRow.appendChild(center);
    rangeRow.appendChild(right);
    madSliderBox.appendChild(rangeRow);
    // Row 3: Slider
    const slider = document.createElement("input");
    slider.className = "madSliders";
    slider.id = upgradeKey + "Slider";
    slider.type = "range";
    slider.min = 0;
    slider.max = stats.madness.madCap;
    slider.value = Math.floor(stats.madness.madCap / 2);
    center.textContent = slider.value;
    slider.addEventListener("input", function () {
        center.textContent = slider.value;
    });
    madSliderBox.appendChild(slider);
    container.appendChild(madSliderBox);
}

function shardFaithfulCost(skipPay = false){
    if (!skipPay && !shardPurchases(shardBuys.cultists.shardFaithfulCost)) {
        return;
    }
    actions.preach.shardDiscount-=0.08;
    if (!skipPay) {
        shardBuys.cultists.shardFaithfulCost.level++;
        shardBuys.cultists.shardFaithfulCost.cost *=2;
        document.getElementById('shardFaithfulCostLevel').innerText = shardBuys.cultists.shardFaithfulCost.level;
        document.getElementById('shardFaithfulCostCost').innerText = shardBuys.cultists.shardFaithfulCost.cost;
        document.getElementById('shardFaithfulCostButtonCost').innerText =  shardBuys.cultists.shardFaithfulCost.description[1] +  shardBuys.cultists.shardFaithfulCost.cost;
        comment("Faithful Charm cost reduced.");
        if(actions.preach.shardDiscount <= 0.48){
            document.getElementById('shardFaithfulCostShardBuyWrap').style.backgroundColor = "grey";
            shardBuys.cultists.shardFaithfulCost.cost = "Max Level";
            document.getElementById('shardFaithfulCostCost').innerText = "";
            document.getElementById('shardFaithfulCostButtonCost').innerText ="";
            document.getElementById("shardFaithfulCostWrap").removeEventListener('pointerdown', shardFaithfulCost);
        }
    }
}

function shardFaithfulMultiplier(num, skipPay = false){
    const itemKey = `shardFaithfulMultiplier${num}`;
    const item = shardBuys.cultists[itemKey];
    if (!skipPay && !shardPurchases(item)) {
        return;
    }
    cult.faithful.outMultipliers[num] += 0.4;
    if (!skipPay) {
        item.level++;
        item.cost *= 2;
        document.getElementById(`${itemKey}Level`).innerText = item.level;
        document.getElementById(`${itemKey}Cost`).innerText = item.cost;
        document.getElementById(`${itemKey}ButtonCost`).innerText = item.description[1] + item.cost;
        const multiplierNames = ["Love", "Terror", "Gold"];
        comment(`Faithful ${multiplierNames[num]} increased.`);
    }
}

function shardFaithfulCap(skipPay = false){
    if (!skipPay && !shardPurchases(shardBuys.cultists.shardFaithfulCap)) {
        return;
    }
    cult.faithful.capMultiplier+=0.08;
    if (!skipPay) {
        shardBuys.cultists.shardFaithfulCap.level++;
        shardBuys.cultists.shardFaithfulCap.cost *=2;
        document.getElementById('shardFaithfulCapLevel').innerText = shardBuys.cultists.shardFaithfulCap.level;
        document.getElementById('shardFaithfulCapCost').innerText = shardBuys.cultists.shardFaithfulCap.cost;
        document.getElementById('shardFaithfulCapButtonCost').innerText = shardBuys.cultists.shardFaithfulCap.description[1] + shardBuys.cultists.shardFaithfulCap.cost;
        comment("Faithful emotion capacity increased.");
    }
}

function shardChanterCost(skipPay = false) {
    if (!skipPay && !shardPurchases(shardBuys.cultists.shardChanterCost)) {
        return;
    }
    loveCrafts.convertChanter.shardDiscount-=0.08;
    if (!skipPay) {
        shardBuys.cultists.shardChanterCost.level++;
        shardBuys.cultists.shardChanterCost.cost *=2;
        document.getElementById('shardChanterCostLevel').innerText = shardBuys.cultists.shardChanterCost.level;
        document.getElementById('shardChanterCostCost').innerText = shardBuys.cultists.shardChanterCost.cost;
        document.getElementById('shardChanterCostButtonCost').innerText = shardBuys.cultists.shardChanterCost.description[1] + shardBuys.cultists.shardChanterCost.cost;
        comment("Chanter cost reduced by 8%");
        if(loveCrafts.convertChanter.shardDiscount <= 0.48){
            document.getElementById('shardChanterCostShardBuyWrap').style.backgroundColor = "grey";
            shardBuys.cultists.shardChanterCost.cost = "Max Level";
            document.getElementById('shardChanterCostCost').innerText = "";
            document.getElementById('shardChanterCostButtonCost').innerText ="";
            document.getElementById("shardChanterCostWrap").removeEventListener('pointerdown', shardChanterCost);
        }
    }
}

function shardSentinelCost(skipPay = false) {
    if (!skipPay && !shardPurchases(shardBuys.cultists.shardSentinelCost)) {
        return;
    }
    terrorCrafts.convertSentinel.shardDiscount -= 0.08;
    if (!skipPay) {
        terrorCrafts.convertSentinel.costMultiplier -= 4;
        shardBuys.cultists.shardSentinelCost.level++;
        shardBuys.cultists.shardSentinelCost.cost *= 2;
        document.getElementById('shardSentinelCostLevel').innerText = shardBuys.cultists.shardSentinelCost.level;
        document.getElementById('shardSentinelCostCost').innerText = shardBuys.cultists.shardSentinelCost.cost;
        document.getElementById('shardSentinelCostButtonCost').innerText =  shardBuys.cultists.shardSentinelCost.description[1] + shardBuys.cultists.shardSentinelCost.cost;
        comment(" Sentinel cost reduced by 8%");
        if(terrorCrafts.convertSentinel.shardDiscount <= 0.48){
            document.getElementById('shardSentinelCostShardBuyWrap').style.backgroundColor = "grey";
            shardBuys.cultists.shardSentinelCost.cost = "Max Level";
            document.getElementById('shardSentinelCostCost').innerText = "";
            document.getElementById('shardSentinelCostButtonCost').innerText = "";
            document.getElementById("shardSentinelCostWrap").removeEventListener('pointerdown', shardSentinelCost);
        }
    }
}

function shardChanterMultiplier(skipPay = false) {
    if (!skipPay && !shardPurchases(shardBuys.cultists.shardChanterMultiplier)) {
        return;
    }
    cult.chanters.outMultiplier+=0.4;
    if (!skipPay) {
        comment("Chanter output increased.");
        shardBuys.cultists.shardChanterMultiplier.level++;
        shardBuys.cultists.shardChanterMultiplier.cost *= 2;
        document.getElementById('shardChanterMultiplierLevel').innerText = shardBuys.cultists.shardChanterMultiplier.level;
        document.getElementById('shardChanterMultiplierCost').innerText = shardBuys.cultists.shardChanterMultiplier.cost;
        document.getElementById('shardChanterMultiplierButtonCost').innerText =shardBuys.cultists.shardChanterMultiplier.description[1] + shardBuys.cultists.shardChanterMultiplier.cost;
    }
}

function shardSentinelMultiplier(skipPay = false) {
    if (!skipPay && !shardPurchases(shardBuys.cultists.shardSentinelMultiplier)) {
        return;
    }
    cult.sentinels.outMultiplier+=0.4;
    if (!skipPay) {
        comment("Sentinel output increased.");
        shardBuys.cultists.shardSentinelMultiplier.level++;
        shardBuys.cultists.shardSentinelMultiplier.cost *= 2;
        document.getElementById('shardSentinelMultiplierLevel').innerText = shardBuys.cultists.shardSentinelMultiplier.level;
        document.getElementById('shardSentinelMultiplierCost').innerText = shardBuys.cultists.shardSentinelMultiplier.cost;
        document.getElementById('shardSentinelMultiplierButtonCost').innerText =shardBuys.cultists.shardSentinelMultiplier.description[1] + shardBuys.cultists.shardSentinelMultiplier.cost;
    }
}
function shardChanterCap(skipPay = false) {
    if (!skipPay && !shardPurchases(shardBuys.cultists.shardChanterCap)) {
        return;
    }
    cult.chanters.capMultiplier += 4;
    if (!skipPay) {
        shardBuys.cultists.shardChanterCap.level++;
        shardBuys.cultists.shardChanterCap.cost *= 2;
        document.getElementById('shardChanterCapLevel').innerText = shardBuys.cultists.shardChanterCap.level;
        document.getElementById('shardChanterCapCost').innerText = shardBuys.cultists.shardChanterCap.cost;
        document.getElementById('shardChanterCapButtonCost').innerText =shardBuys.cultists.shardChanterCap.description[1] + shardBuys.cultists.shardChanterCap.cost;
        comment("Chanter Love capacity increased");
    }
}

function shardSentinelCap(skipPay = false) {
    if (!skipPay && !shardPurchases(shardBuys.cultists.shardSentinelCap)) {
        return;
    }
    cult.sentinels.capMultiplier += 4;
    if (!skipPay) {
        shardBuys.cultists.shardSentinelCap.level++;
        shardBuys.cultists.shardSentinelCap.cost *= 2;
        document.getElementById('shardSentinelCapLevel').innerText = shardBuys.cultists.shardSentinelCap.level;
        document.getElementById('shardSentinelCapCost').innerText = shardBuys.cultists.shardSentinelCap.cost;
        document.getElementById('shardSentinelCapButtonCost').innerText = shardBuys.cultists.shardSentinelCap.description[1] + shardBuys.cultists.shardSentinelCap.cost;
        comment("Sentinel capacity increased");
    }
}

// altar room
function echoes(skipPay = false) {
    if (!skipPay && !shardPurchases(shardBuys.altarRoom.echoes)) {
        return;
    }
    adjacentNumbers.shardLove += 0.08;
    if (!skipPay) {
        shardBuys.altarRoom.echoes.level++;
        shardBuys.altarRoom.echoes.cost *= 2;
        document.getElementById('echoesLevel').innerText = shardBuys.altarRoom.echoes.level;
        document.getElementById('echoesCost').innerText = shardBuys.altarRoom.echoes.cost;
        document.getElementById('echoesButtonCost').innerText = shardBuys.altarRoom.echoes.description[1] +  shardBuys.altarRoom.echoes.cost;
        comment("Chanters in altar room more effective.");
    }
}

function bleedingPillars(skipPay = false) {
    if (!skipPay && !shardPurchases(shardBuys.altarRoom.bleedingPillars)) {
        return;
    }
    adjacentNumbers.shardTerror += 0.08;
    if (!skipPay) {
        shardBuys.altarRoom.bleedingPillars.level++;
        shardBuys.altarRoom.bleedingPillars.cost *= 2;
        document.getElementById('bleedingPillarsLevel').innerText = shardBuys.altarRoom.bleedingPillars.level;
        document.getElementById('bleedingPillarsCost').innerText = shardBuys.altarRoom.bleedingPillars.cost;
        document.getElementById('bleedingPillarsButtonCost').innerText = shardBuys.altarRoom.bleedingPillars.description[1] + shardBuys.altarRoom.bleedingPillars.cost;
        comment("Sentinels in altar room more effective.");
    }
}

function wraithlit(skipPay = false) {
    if (!skipPay && !shardPurchases(shardBuys.altarRoom.wraithlit)) {
        return;
    }
    adjacentNumbers.shardGold += 0.08;
    if (!skipPay) {
        shardBuys.altarRoom.wraithlit.level++;
        shardBuys.altarRoom.wraithlit.cost *= 2;
        document.getElementById('wraithlitLevel').innerText = shardBuys.altarRoom.wraithlit.level;
        document.getElementById('wraithlitCost').innerText = shardBuys.altarRoom.wraithlit.cost;
        document.getElementById('wraithlitButtonCost').innerText =  shardBuys.altarRoom.wraithlit.description[1] + shardBuys.altarRoom.wraithlit.cost;
        comment("Priests in altar room more effective.");
    }
}

function pulsingEarth(skipPay = false) {
    if (!skipPay && !shardPurchases(shardBuys.altarRoom.pulsingEarth)) {
        return;
    }
    adjacentNumbers.shardAll += 0.08;
    if (!skipPay) {
        shardBuys.altarRoom.pulsingEarth.level++;
        shardBuys.altarRoom.pulsingEarth.cost *= 2;
        document.getElementById('pulsingEarthLevel').innerText = shardBuys.altarRoom.pulsingEarth.level;
        document.getElementById('pulsingEarthCost').innerText = shardBuys.altarRoom.pulsingEarth.cost;
        document.getElementById('pulsingEarthButtonCost').innerText =   shardBuys.altarRoom.pulsingEarth.description[1] + shardBuys.altarRoom.pulsingEarth.cost;
        comment("Everyone in altar room more effective.");
    }
}


let shardBuys = {
    stats: {
        shardHealth: {
            string: "Shard Infusion",
            description: ['+88 Health maximum', 'Shards: '],
            cost: 4,
            benefitType: "health",
            color: "#004000",
            level: 1,
            func: shardHealth,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        shardMadCap: {
            string: "MadCap",
            description: ['+88 Madness capacity', 'Shards: '],
            cost: 8,
            benefitType: "madness",
            color: "#004000",
            level: 1,
            func: shardMadCap,
            unlocked: true,
            purchased: true,
            permanent: true
        }
    },
    actions: {
        studyM: {
            string: 'Deeper Reading',
            description: ['Permanently increases gains from Studying', 'Shards: '],
            cost: 4,
            benefitType: "study",
            color: "#105954",
            level: 1,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        chantM: {
            string: 'Silver Tongue',
            description: ['Permanently increases gains from Chanting', 'Shards: '],
            cost: 4,
            benefitType: "chant",
            color: "#105954",
            level: 1,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        dreamM: {
            string: "On Raven's Wings",
            description: ['Permanently increases gains from Dreaming', 'Shards: '],
            cost: 4,
            benefitType: "dream",
            color: "#105954",
            level: 1,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        preachM: {
            string: 'Magnetism',
            description: ['Permanently increases Faithful and Innocent gain from Preaching', 'Shards: '],
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
        studyMR: {
            string: 'Warded Study',
            description: ['Reduces current Madness chance from Studying by 1/8.', 'Shards: '],
            cost: 4,
            benefitType: "study",
            color: "#240048",
            level: 1,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        chantMR: {
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
        dreamMR: {
            string: "Lucidity",
            description: ['Reduces current Madness chance from Dreaming by 1/8', 'Shards: '],
            cost: 4,
            benefitType: "dream",
            color: "#240048",
            level: 1,
            unlocked: true,
            purchased: true,
            permanent: true
        }
    },
    madActions:{
        functionalAlcoholic: {
            string: "Functional Alcoholic",
            description: ['Replaces automatic drinking with a slider to set Madness level.', 'Shards: '],
            cost: 16,
            benefitType: "dream",
            color: "#240048",
            level: 1,
            func: functionalAlcoholic,
            unlocked: true,
            purchased: false,
            permanent: false
        },
        functionalAddict: {
            string: "Functional Addict",
            description: ['Replaces automatic smoking with a slider to set Madness level.', 'Shards: '],
            cost: 16,
            benefitType: "madness",
            color: "#240048",
            level: 1,
            func: functionalAddict,
            unlocked: true,
            purchased: false,
            permanent: false
        },
        pMadReducer: {
            string: "Clarity",
            description: ['Reduces permanent Madness by 4', 'Shards: '],
            cost: 16,
            benefitType: "madness",
            color: "#240048",
            level: 1,
            func: pMadReducer,
            unlocked: true,
            purchased: true,
            permanent: true
        }
    },
    cultists: {
        shardFaithfulCost: {
            string: "Glamour",
            description: ['Charm cost for Faithful reduced.', 'Shards: '],
            cost: 8,
            color: "#6e0a1e",
            level: 1,
            func: shardFaithfulCost,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        shardFaithfulMultiplier0: {
            string: "Allure",
            description: ['Increased Love from Faithful ', 'Shards: '],
            cost: 8,
            color: "#6e0a1e",
            level: 1,
            func: shardFaithfulMultiplier,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        shardFaithfulMultiplier1: {
            string: "Menace",
            description: ['Increased Terror from Faithful ', 'Shards: '],
            cost: 8,
            color: "#6e0a1e",
            level: 1,
            func: shardFaithfulMultiplier,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        shardFaithfulMultiplier2: {
            string: "Largess",
            description: ['Increased Gold from Faithful ', 'Shards: '],
            cost: 8,
            color: "#6e0a1e",
            level: 1,
            func: shardFaithfulMultiplier,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        shardFaithfulCap: {
            string: "Inspiring Aura",
            description: ['Increased Faithful emotional capacity', 'Shards: '],
            cost: 8,
            color: "#6e0a1e",
            level: 1,
            func: shardFaithfulCap,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        shardChanterCost: {
            string: "Rhythm",
            description: ['Reduce Chanter cost by 8%', 'Shards: '],
            cost: 8,
            color: "#6e0a1e",
            level: 1,
            func: shardChanterCost,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        shardChanterMultiplier: {
            string: "Tempo",
            description: ['Increased Chanter effectiveness', 'Shards: '],
            cost: 8,
            color: "#6e0a1e",
            level: 1,
            func: shardChanterMultiplier,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        shardChanterCap: {
            string: "Harmony",
            description: ['Increased Chanter Love capacity', 'Shards: '],
            cost: 8,
            color: "#6e0a1e",
            level: 1,
            func: shardChanterCap,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        shardSentinelCost: {
            string: "Dominion",
            description: ['Reduce Sentinel cost by 8%', 'Shards: '],
            cost: 8,
            color: "#6e0a1e",
            level: 1,
            func: shardSentinelCost,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        shardSentinelMultiplier: {
            string: "Dread",
            description: ['Increased Sentinel effectiveness', 'Shards: '],
            cost: 8,
            color: "#6e0a1e",
            level: 1,
            func: shardSentinelMultiplier,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        shardSentinelCap: {
            string: "Anoint",
            description: ['Increased Sentinel Terror capacity', 'Shards: '],
            cost: 8,
            color: "#6e0a1e",
            level: 1,
            func: shardSentinelCap,
            unlocked: true,
            purchased: true,
            permanent: true
        }
    },
    altarRoom: {
        echoes: {
            string: "Echoes",
            description: ['Increased altar room Love.', 'Shards: '],
            cost: 8,
            color: "#6e0a1e",
            level: 1,
            func: echoes,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        bleedingPillars: {
            string: "Bleeding Pillars",
            description: ['Increased altar room Terror.', 'Shards: '],
            cost: 8,
            color: "#6e0a1e",
            level: 1,
            func: bleedingPillars,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        wraithlit: {
            string: "Wraithlit Priests",
            description: ['An unearthly halo -increased altar room Gold output', 'Shards: '],
            cost: 8,
            color: "#6e0a1e",
            level: 1,
            func: wraithlit,
            unlocked: true,
            purchased: true,
            permanent: true
        },
        pulsingEarth: {
            string: "Pulsing Earth",
            description: ['An eternal thudding heartbeat. -increased altar room output.', 'Shards: '],
            cost: 8,
            color: "#6e0a1e",
            level: 1,
            func: pulsingEarth,
            unlocked: true,
            purchased: true,
            permanent: true
        }
    }
};

function buildDivinity() {
    // Mapping of category to the corresponding container div
    const sectionMap = {
        stats: 'shardStatsBox',
        actions: 'shardActionsBox',
        madReducers: 'shardMadActionsBox',
        madActions: 'shardMadActionsBox',
        cultists: 'shardCultistsBox',
        altarRoom: 'shardAltarRoomBox'
    };
    for (const category in shardBuys) {
        const containerId = sectionMap[category];
        if (!containerId) continue;
        const container = document.getElementById(containerId);
        const upgrades = shardBuys[category];
        for (const key in upgrades) {
            const upgrade = upgrades[key];
            if (!upgrade.unlocked) continue;
            const button = document.createElement('button');
            if(upgrade.permanent===true){
                button.className = 'shardBuyWraps';
                button.id = key + 'ShardBuyWrap';
            }else{
                button.className = 'shardBuyOneOffs';
                button.id = key + 'ShardBuyOneOff';
            }
            button.style.backgroundColor = upgrade.color || '#222';
            const textDiv = document.createElement('div');
            textDiv.className = 'shardBuyTitle';
            textDiv.textContent = upgrade.string;
            const costDiv = document.createElement('div');
            costDiv.className = 'shardBuyCost';
            costDiv.id=key + "ButtonCost";
            costDiv.textContent = upgrade.description[1] + upgrade.cost;
            const levelTextDiv = document.createElement('div');
            levelTextDiv.className = 'shardLvlTxt';
            levelTextDiv.textContent = 'Level:';
            const levelDiv = document.createElement('div');
            levelDiv.className = 'shardBuyLevel';
            levelDiv.id = key + 'Level';
            levelDiv.textContent = upgrade.level;
            // Assemble the button
            button.appendChild(textDiv);
            button.appendChild(costDiv);
            button.appendChild(levelTextDiv);
            button.appendChild(levelDiv);
            container.appendChild(button);
                        // Special slider box generation
            if (key === "functionalAlcoholic") {
                buildFunctionalMadnessManager(key, "drink", container);
                
            } else if (key === "functionalAddict") {
                buildFunctionalMadnessManager(key, "smoke", container);
            }
        }
    }
[
  { id: "functionalAlcoholic", key: "alcoholism" },
  { id: "functionalAddict",    key: "addiction" }
].forEach(({ id, key }) => {
  const slider = document.getElementById(id + "Slider");
  const listener = () => updateMadnessSliderValue(key, id);
  slider.addEventListener('input', listener);
  slider._madListener = listener;
});
};

buildDivinity();