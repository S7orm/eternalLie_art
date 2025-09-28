
        	//=========================================
	// Unlocks and updates
	//========================================= 

function checkUnlocks(){
    for(i=0;i<statKeys.length; i++){ ///main stats
        if(stats[statKeys[i]].unlocked === false ){
            let unlockStat = stats[statKeys[i]].unlock[0];
            let unlockNum = stats[statKeys[i]].unlock[1];
            if(stats[unlockStat].current >= unlockNum){
                stats[statKeys[i]].unlocked = true; 
                document.getElementById(statKeys[i] + 'Box').style.display='block';
            }
        }
    }
///action locks
    if(stats.vision.current >= 4 && actions.chant.unlocked === false && actions.chant.purchased === false){
        document.getElementById('chantLock').style.display='block';
        actions.chant.unlocked = true;
    }
    if(stats.vision.current >= (16) && actions.dream.unlocked === false && actions.dream.purchased === false){
        document.getElementById('dreamLock').style.display='block';
    }
    if(stats.charm.current >=8 && actions.preach.unlocked === false && actions.preach.purchased === false){
        document.getElementById('preachLock').style.display='block';
    }
    if(stats.madness.current >=288 && actionUpgrades.preach.fiction.unlocked === false){
        actionUpgrades.preach.fiction.unlocked = true;
        document.getElementById('fictionWrap').style.display='block';
    }
    //upgrades
    
    
    
    
    if(stats.madness.current >= 48 &&  stats.madness.madActionBoxUnlocked === false){
        stats.madness.madActionBoxUnlocked = true;
        comment("Excess solves nothing. Embrace the truth. (Madness Mitigation available)", 'lavender');
        document.getElementById('madActionBox').style.display='block';
        document.getElementById('drinkWrap').style.display='block';
        document.getElementById('smokeWrap').style.display='block';
    }
    for(i=0;i<madKeys.length; i++){ ///mad actions
        if(madActions[madKeys[i]].unlocked === false ){
            let unlockStat = madActions[madKeys[i]].unlock[0];
            let unlockNum = madActions[madKeys[i]].unlock[1];
            if(madActions[madKeys[i]].costStat === 'health'  && stats.health.current  <= 28 ){
                document.getElementById(madKeys[i] + 'Wrap').style.display='block';
                madActions[madKeys[i]].unlocked = true;
            }else if(unlockStat === 'love' && vault.love.current  >= unlockNum||unlockStat === 'terror' && vault[unlockStat].current  >= unlockNum){
                document.getElementById(madKeys[i] + 'Wrap').style.display='block';
                madActions[madKeys[i]].unlocked = true;
            }
        }
    }
    if(cult.innocents.unlocked=== false && cult.innocents.current>=1){
        cult.innocents.unlocked=true;
        document.getElementById("innocentsWrap").style.display="block";
    }
    if(cult.insane.unlocked=== false && cult.insane.current>=1){
        cult.insane.unlocked=true;
        document.getElementById("insaneWrap").style.display="block";
    }
    if(cult.faithful.current>=12 && loveCrafts.indoctrination.unlocked===false){
         loveCrafts.indoctrination.unlocked=true;
         document.getElementById("indoctrinationOneOff").style.display = "block";
         comment("These people have too many opinions if you ask me. (Indoctrination unlocked in LoveCrafts)");
    }
    if(fleshCrafts.feedHungry.unlocked===false && stats.madness.current>=248 && dreamEx.plateau.purchased===true){
         fleshCrafts.feedHungry.unlocked=true;
         document.getElementById("feedHungryWrap").style.display = "block";
         comment("Have you tried the pie? (Feed the hungry unlocked in FleshCrafts)");
    }
    if(stats.charm.current>=484 && actionUpgrades.chant.regalia.unlocked===false){
         actionUpgrades.chant.regalia.unlocked=true;
         document.getElementById("regaliaWrap").style.display = "block";
         comment("Have you considered upping your game? (Regalia unlocked in West tab.)");
    }
    if(actionUpgrades.dream.laudanum.unlocked=== false && actions.dream.totalDreaming >=88){
        actionUpgrades.dream.laudanum.unlocked=true;
        document.getElementById("laudanumWrap").style.display = "block";
        comment("There are ways to Dream deeper... (Laudanum unlocked in West tab)");
    }
    if(actionUpgrades.dream.absinthe.unlocked=== false && actions.dream.totalDreaming >=248){
        actionUpgrades.dream.absinthe.unlocked=true;
        document.getElementById("absintheWrap").style.display = "block";
        comment("There are ways to Dream darker... (Absinthe unlocked in West tab)");
    }
    if(actionUpgrades.dream.mushroomTea.unlocked=== false && actions.dream.totalDreaming >=484){
        actionUpgrades.dream.mushroomTea.unlocked=true;
        document.getElementById("mushroomTeaWrap").style.display = "block";
        comment("There are ways to Dream better... (Mushroom Tea unlocked in West tab)");
    }
    if(actionUpgrades.dream.mandrake.unlocked=== false && actions.dream.totalDreaming >=848){
        actionUpgrades.dream.mandrake.unlocked=true;
        document.getElementById("mandrakeWrap").style.display = "block";
        comment("The deepest Dreams come from this. (Mandrake unlocked in West tab)");
    }
    if(vault.love.current>=484 && loveCrafts.polygamy.unlocked===false){
         loveCrafts.polygamy.unlocked=true;
         document.getElementById("polygamyLock").style.display = "block";
         comment("Destroy a few lives to ensure loyalty. (Polygamy in LoveCrafts)");
    }
    if(stats.vision.current>=848 && goldCrafts.censer.unlocked===false){
         goldCrafts.censer.unlocked=true;
         document.getElementById("censerOneOff").style.display = "block";
         comment("Can we do something about the smell? (Censer in GoldCrafts)");
    }
    if(cult.chanters.unlocked===true && cult.sentinels.unlocked===true && stats.vision.current>=1468 && goldCrafts.pagentry.unlocked===false){
         goldCrafts.pagentry.unlocked=true;
         document.getElementById("pagentryOneOff").style.display = "block";
         comment("Spread the wealth. (Pagentry in GoldCrafts)");
    }
    if(cult.chanters.unlocked===true && cult.sentinels.unlocked===true && vault.gold.current>=24842 && goldCrafts.mortuary.unlocked===false){
         goldCrafts.mortuary.unlocked=true;
         document.getElementById("mortuaryOneOff").style.display = "block";
         comment("It would be much easier if the Flesh came to us. (Mortuary in GoldCrafts)");
    }
    if(stats.madness.current>=288 && vault.flesh.unlocked === true && terrorCrafts.demandFlesh.unlocked===false){
        terrorCrafts.demandFlesh.unlocked=true;
        terrorCrafts.demandFlesh.externalLock=false;
        document.getElementById("demandFleshLock").style.display="block";
        comment("New possibilities unlocked by West's rising Madness.(TerrorCrafts)");
        terrorCrafts.box.unlocked=true;
        terrorCrafts.box.externalLock=false;
        document.getElementById("boxLock").style.display="block";
    }
    if(stats.madness.current>=484 && madUps.alcoholism.unlocked===false ){
            madUps.alcoholism.unlocked=true;
            document.getElementById("alcoholismOneOff").style.display="block";
            madUps.addiction.unlocked=true;
            document.getElementById("addictionOneOff").style.display="block";
            comment("Truly foolish to avoid the truth. (Madness Mitigation upgrades unlocked.)");
    }
    if(stats.madness.current>=848 && terrorCrafts.destroyBeauty.unlocked===false){
        terrorCrafts.destroyBeauty.unlocked=true;
        terrorCrafts.destroyBeauty.externalLock=false;
        document.getElementById("destroyBeautyLock").style.display="block";
        comment("Violence unlocked by West's rising Madness.(TerrorCrafts)");
    }
    //shard required upgrades
    if(permanentChanges.totalShards>0){
        if(actionUpgrades.chant.mantle.unlocked===false &&  actionUpgrades.chant.scepter.purchased === true){
            actionUpgrades.chant.mantle.unlocked=true;
            document.getElementById("mantleWrap").style.display="block";
            comment("Have your thought about taking up needlework? (Fleshweave Mantle unlocked)");
        }
        if(actionUpgrades.chant.possession.unlocked===false && stats.vision.current>=4884){
            actionUpgrades.chant.possession.unlocked=true;
            document.getElementById("possessionWrap").style.display = "block";
            comment("Did you know you don't have to look that way? (Possession in West tab)");
        }
        if(actionUpgrades.preach.attendants.unlocked===false && stats.vision.current>=8448){
            actionUpgrades.preach.attendants.unlocked=true;
            document.getElementById("attendantsWrap").style.display="block";
            comment("Some of the Faithful are more... pliable than others. (Attendants in West tab)");
        }
        if(actionUpgrades.preach.conduits.unlocked===false && stats.vision.current>=24842){
            actionUpgrades.preach.conduits.unlocked=true;
            document.getElementById("conduitsWrap").style.display="block";
            actionUpgrades.preach.oblations.unlocked=true;
            document.getElementById("oblationsWrap").style.display="block";
            comment("It is the personal touch that makes a room buzz. (Conduits and Oblations in West tab)");
        }
        if(actionUpgrades.preach.eloquence.unlocked===false && stats.vision.current>=48484){
            actionUpgrades.preach.eloquence.unlocked=true;
            document.getElementById("eloquenceWrap").style.display="block";
            comment("Learn to share. It can lead to unexpected results. (Eloquence in West tab)");
        }
    }
}