

//top tabs
function toggleMenu(){
let menu = document.getElementById("menuBox");
    if(menu.style.display === 'none'){
        menu.style.display = 'flex';
    }else{
         menu.style.display = 'none';
    }
}

function changeTab(temp){
    //change display
    var parentID = document.getElementById('mainWrapper');
    var subs = parentID.getElementsByClassName('bigBox');
    for(var i = 0; i < subs.length; i++){
        var a = subs[i];
        a.style.display = 'none';
        var elementName = subs[i].id;
        var tabName = elementName + 'Tab';
        if (elementName === temp && elementName !== 'altarRoom') {
            document.getElementById(tabName).style.backgroundColor = 'black'; // Active tab
        }else if( elementName !== 'altarRoom'){
            document.getElementById(tabName).style.backgroundColor = '#424242'; // Inactive tabs

        }
    }
    document.getElementById(temp).style.display = 'block';
}
function changeCraftBox(temp){
    //change display
    var parentID = document.getElementById('right');
    var subs = parentID.getElementsByClassName('craftBox');
    for(var i = 0; i < subs.length; i++){
        var a = subs[i];
        a.style.display = 'none';
    }
    document.getElementById(temp + 'Box').style.display = 'block';
}

//flash
var flashingElements = {};
function flash(div, startC, endColor){
if (!flashingElements[div]) {
    flashingElements[div] = true;
    document.getElementById(div).style.color = startC;
    function temp() {
      document.getElementById(div).style.color = endColor;
      flashingElements[div] = false;
  }
  setTimeout(temp, 500);
  }
}

function numberChange(parent, stat, change, pColor, nColor) {
    if (parent === 'stats') {
        stats[stat].current += change;
        document.getElementById(stat).innerHTML = Math.floor(stats[stat].current);
        //shard- health ratio
        if(stat === 'shards'){
            stats.health.max -= change;
        }
    } else if (parent === 'cult') {
        cult[stat].current += change;
        document.getElementById(stat).innerHTML = cult[stat].current;
        //reset costs
        if(stat === "faithful"){
            cult.faithful.purchased++;//grid
        }
        actions.preach.cost = Math.max((cult.faithful.current * actions.preach.multiplier) + cult.faithful.purchased, 8);
        document.getElementById('preachCost').innerHTML = actions.preach.cost;
        document.getElementById('preachWrapCost').innerHTML = actions.preach.cost;
        loveCrafts.convertChanter.cost =  Math.max(cult.chanters.current * loveCrafts.convertChanter.multiplier, 24);
        document.getElementById('convertChanterCost').innerHTML =  loveCrafts.convertChanter.cost;
        terrorCrafts.convertsentinel.cost = Math.max(cult.sentinels.current * terrorCrafts.convertsentinel.multiplier, 48);
        document.getElementById('convertsentinelCost').innerHTML =  terrorCrafts.convertsentinel.cost;
        // Call the new peg logic function
        numberChangePeg(stat, change);
    } else if (parent === 'vault') {
        vault[stat].current += change;
        document.getElementById(stat).innerHTML = Math.floor(vault[stat].current);
    }

    // Color update logic for positive and negative changes
    if (change > 0) {
        document.getElementById(stat).style.color = pColor;
        setTimeout(() => { document.getElementById(stat).style.color = 'white'; }, 250);
    } else if (change < 0) {
        document.getElementById(stat).style.color = nColor;
        setTimeout(() => { document.getElementById(stat).style.color = 'white'; }, 250);
    }
    if(stat === "madness"){
    checkMadnessValue();
    }
}

function numberChangePeg(stat, change) {//check in numberChange for peg counts
    if (pegTypes.includes(stat)) {
        const pegContainer = document.getElementById(`${stat}Unplaced`);

        // If the change is positive, add to the unplaced peg pool
        if (change > 0) {
            cult[stat].unplaced += change;
            pegContainer.innerText = cult[stat].unplaced;
        } 
        // If the change is negative, remove from the unplaced peg pool or the grid
        else if (change < 0) {
            const totalUnplaced = cult[stat].unplaced;

            // Check if there are enough unplaced pegs to remove
            if (totalUnplaced >= Math.abs(change)) {
                cult[stat].unplaced += change;  // Remove from unplaced pool
                pegContainer.innerText = cult[stat].unplaced;
            } 
            // If no unplaced pegs left, remove the remaining from the grid
            else {
                const pegsToRemove = Math.abs(change) - totalUnplaced;

                cult[stat].unplaced = 0;  // Set unplaced pegs to 0
                pegContainer.innerText = cult[stat].unplaced;

                // Remove pegs from the grid
                removePegsFromGrid(stat, pegsToRemove);
            }
        }
    }
}


//audio 

var chanting = new Audio("audio/chant.mp3");
var studying = new Audio("audio/studying.mp3");
var preaching = new Audio("audio/preaching.mp3");
var dreaming = new Audio("audio/dreaming.mp3");

 function plays(x){
         if(mute === false){
         if(x === chanting || x === dreaming){
              x.loop = true;
          };
          x.play();
  }
 }
 function pauses(x){
     x.pause();
     x.loop = false;
}
function stop(x) {
    x.pause();         // Pause the audio
    x.currentTime = 0; // Reset playback position to the beginning
    x.loop = false;    // Ensure looping is turned off
}
function playWithLowVolume(x) {
    x.volume = 0.7;  // Lower volume (30%)
    plays(x);
    window.console.log("3");
}
//mute
let mute = false;
    // Mute button to toggle global mute
function muteToggle(){
    if(mute === false){
        mute = true;
        document.getElementById('mute').innerText = "Muted";
    }else{
        mute = false;
        document.getElementById('mute').innerText = "Mute";
    }
}

//border shadows
function shadows(){
const allElements = document.querySelectorAll('*');

// Loop through each element
allElements.forEach(element => {
    // Get the computed style for the element
    const computedStyle = getComputedStyle(element);
    
    // Check if the element has a border property
    if (
        computedStyle.getPropertyValue('border-top-style') !== 'none' &&
        computedStyle.getPropertyValue('border-right-style') !== 'none' &&
        computedStyle.getPropertyValue('border-bottom-style') !== 'none' &&
        computedStyle.getPropertyValue('border-left-style') !== 'none') {
        // Add your custom styles here
        element.style.boxShadow = '0.2dvw 0.2dvh 4px grey';
    }
});
};


function comment(commentText, rating, classy) {
    const commentaryElement = document.getElementById('commentary');
    const lastComment = commentaryElement.lastElementChild;

    // If there is a last comment, remove any (xN) multiplier from it
    const lastCommentBaseText = lastComment ? lastComment.textContent.replace(/\s*\(x\d+\)$/, '') : '';

    // Compare the new comment to the base text of the last comment
    if (lastCommentBaseText === commentText) {
        // If there's a multiplier, increment it; if not, start with (x2)
        const multiplierMatch = lastComment.textContent.match(/\(x(\d+)\)$/);
        const multiplier = multiplierMatch ? parseInt(multiplierMatch[1], 10) + 1 : 2;

        // Update the last comment with the new multiplier
        lastComment.innerHTML = lastCommentBaseText + ` (x${multiplier})`;
    } else {
        // Create a new comment element
        const newComment = document.createElement('p');
        newComment.textContent = commentText;
        if (rating !== null) {
            newComment.style.color = rating;
        }
        if (classy !== null) {
            newComment.className = `${classy}C`;
        }
        // Append the new comment as a Node to avoid innerHTML replacements
        commentaryElement.appendChild(newComment);
    }

    // Check if the user is near the bottom before auto-scrolling
    const scrollBuffer = 16 * window.innerHeight / 100; // Adjust for how close to the bottom the user needs to be
    const isNearBottom = commentaryElement.scrollHeight - commentaryElement.scrollTop <= commentaryElement.clientHeight + scrollBuffer;

    if (isNearBottom) {
        commentaryElement.scrollTop = commentaryElement.scrollHeight;
    }
}


//unlocks

function unlock(button, parent){
    // Create an array of matched pairs (string and object)
    const craftPairs = [
        ['loveCrafts', loveCrafts],
        ['terrorCrafts', terrorCrafts],
        ['goldCrafts', goldCrafts],
        ['fleshCrafts', fleshCrafts],
        ['tomeCrafts', tomeCrafts],
        ['ichorCrafts', ichorCrafts]
    ];
    // Convert to an object for quick lookup
    const craftMap = Object.fromEntries(craftPairs);
    if(parent === 'actions'){
        if(stats.vision.current >= actions[button]['unlockCost']){
            stats.vision.current -= actions[button]['unlockCost']; 
            document.getElementById('vision').innerHTML= Math.floor(stats.vision.current);
            flashFade(button + 'Lock');
            setTimeout(() => {document.getElementById(button + 'Wrap').style.display='block';}, 1500);
            if(actions[button]['comment']){
                comment(actions[button]['comment']);
            }
            actions[button].purchased = true;
        }
    }else{
    const craftGroup = craftMap[parent]; // Lookup the object using the string
        if (craftGroup && stats.vision.current >= craftGroup[button]['unlockCost']) {
            numberChange('stats', 'vision', -craftGroup[button]['unlockCost'], '', 'red' );
            
            flashFade(button + 'Lock');
            setTimeout(() => {
                document.getElementById(button + 'Wrap').style.display = 'block';
            }, 1500);
            craftGroup[button].purchased = true;
            //extras
            if(button ===  'convertChanter'){
                cult.chanters.unlocked = true;
                document.getElementById('chantersWrap').style.display='block';
                document.getElementById('chantersPeg').style.display= 'block';
                comment('What a lovely voice.', 'lightgreen', 'ch');
                }
            if(button === 'convertsentinel'){
                cult.sentinels.unlocked = true;
                comment('Perhaps you could save the leftovers for a soup?', 'lightred', 'sent');
                document.getElementById('sentinelsWrap').style.display= 'block';
                document.getElementById('sentinelsPeg').style.display= 'block';
            }
            if(button === 'tithe'){
                    document.getElementById('titheToggle').style.display='block';
            }
        }
    }
};

function flashFade(div){
    div = document.getElementById(div);
    div.style.pointerEvents='none';
        // Apply CSS animations to the provided div
    div.style.backgroundImage = 'none';
    div.style.animation = "flash 0.5s alternate 2";
    
    // After the flash animation, add a fade-out animation
    setTimeout(() => {
        div.style.animation = "fade-out 1s";
        
        // After the fade-out animation, hide the div
        setTimeout(() => {
            div.style.display = "none";
        }, 500); // Adjust the time according to your preference
    }, 1000); // Adjust the time according to your preference
}

 
// Prevent default behavior when interacting with the dropdown button
function preventButtonDrag(e) {
    e.preventDefault();
}
//invisible scroll on commentary

function addMouseWheelListener(element) {
  element.addEventListener("wheel", function(event){ scrollDiv(event, element)}, { passive: false });
}

function removeMouseWheelListener(element) {
  element.removeEventListener("wheel", scrollDiv);
}

function scrollDiv(event, element) {
  event.preventDefault();
  const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
  element.scrollTop -= delta * 8; // Adjust the scrolling speed as needed
}


var shakeAnimationId;
function shakeBody() {
  var eventBox = document.getElementById('eventBox');
  var move = 10;
  var delay = 50; 
  function shake() {
    document.body.style.transform = 'translate(' + move + 'px,' + move + 'px)';
    eventBox.style.transform = 'translate(' + -move + 'px,' + -move + 'px)';
    move = -move; 
    shakeAnimationId = setTimeout(shake, delay);
  }

  shake();
}

function cancelShakeAnimation() {
  clearTimeout(shakeAnimationId);
  document.body.style.transform = '';
  var eventBox = document.getElementById('eventBox');
  eventBox.style.transform = '';
}
