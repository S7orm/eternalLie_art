/* 
trying to isolate madness copy of stats
    madness: { //main stat//
        callString: 'madness',
        string: 'Madness',
        description: 'Madness rides the star-wind...',
        current: 80,
        madCap: 88,
        unlocked: true,
        madActionBoxUnlocked: false
    }
 */
let permanentMadness = {
    level: 0,
    counter: [0, 8]
};
function loopMadness(tics){
    if(permanentMadness.level>0){
        permanentMadness.counter[0] += tics;
        if(permanentMadness.counter[0] >= permanentMadness.counter[1]){
            permanentMadness.counter[0] = 0;
            numberChange('stats', 'madness', permanentMadness.level, 'blue', 'red');
        }
    }
}

//madness movement
const madnessBox = document.getElementById("madnessBox");
let lastCheckedValue = stats.madness.current;
let initialLeft = 41;
let initialTop = 11;
let countTo1 = 0;
// Function to update the position of the madnessBox
function updateMadnessBoxPosition(moveAmountX, moveAmountY) {
    let madWidth = parseFloat(madnessBox.style.width) || 8;
    let madHeight = parseFloat(madnessBox.style.height) || 7;
    let currentRect = madnessBox.getBoundingClientRect();
    let currentLeftdvw = (currentRect.left / window.innerWidth) * 100;
    let currentTopdvh = (currentRect.top / window.innerHeight) * 100;
    const maxLeft = 92 - madWidth;
    const maxTop = 93 - madHeight;
    const updatedLeftdvw = currentLeftdvw + moveAmountX;
    const updatedTopdvh = currentTopdvh + moveAmountY;
    const newLeftdvw = Math.min(Math.max(updatedLeftdvw, 0), maxLeft);
    const newTopdvh = Math.min(Math.max(updatedTopdvh, 0), maxTop);
    madnessBox.style.left = newLeftdvw + 'dvw';
    madnessBox.style.top = newTopdvh + 'dvh';
    const rotationAmount = moveAmountX *4 ; 
    madnessBox.style.transform = `rotate(${rotationAmount}deg)`; //  Apply rotation
}

// Function to check for changes in stats.madness.current
function checkMadnessValue() {
    let currentValue = stats.madness.current; 
    let madDelta =  lastCheckedValue - currentValue; //changes in madness positive values are madness going down
    let moveAmountX = 0;
    let moveAmountY = 0;
    const fonts = [
        'Helvetica, sans-serif',
        'Arial, sans-serif',
        'Arial Black, sans-serif',
        'Verdana, sans-serif',
        'Tahoma, sans-serif',
        'Trebuchet MS, sans-serif',
        'Impact, sans-serif',
        'Gill Sans, sans-serif',
        'Times New Roman, serif',
        'Georgia, serif',
        'Palatino, serif',
        'Baskerville, serif',
        'Andalé Mono, monospace',
        'Courier, monospace',
        'Lucida, monospace',
        'Monaco, monospace',
        'Bradley Hand, cursive',
        'Brush Script MT, cursive',
        'Luminari, fantasy',
        'Comic Sans MS, cursive'
    ];
    if(madDelta< 0){ // If the madness goes up by 1, generate positive and negative random movement
        if (stats.madness.current > (stats.madness.madCap* 0.66)) {
            moveAmountX = (Math.random() * 2 - 1) *  (stats.madness.current * 0.08) * (88/stats.madness.madCap);
            moveAmountY = (Math.random() * 2 - 1) *  (stats.madness.current * 0.08) * (88/stats.madness.madCap);
            updateMadnessBoxPosition(moveAmountX, moveAmountY);                            
    //bigger box
            let madWidth = ((stats.madness.current /6 ) * (88/stats.madness.madCap) )+ 'dvw';
            document.getElementById('madnessBox').style.width=madWidth;
            let madHeight = ((stats.madness.current /6) * (88/stats.madness.madCap)) + 'dvh';
            document.getElementById('madnessBox').style.height=madHeight;   
            //font and text size
            let madText = document.getElementById("madnessText");
            const currentFont = getComputedStyle(madText).fontFamily; // Get the current font
            let randomFont;
            do{
                randomFont = fonts[Math.floor(Math.random() * fonts.length)];
                } while (randomFont === currentFont); // Keep generating until a different font is selected
            let madNum = document.getElementById("madness");
            madText.style.fontFamily = randomFont;
            madText.style.fontSize = ((stats.madness.current/20) * (88/stats.madness.madCap))  + 'dvh';
            madNum.style.fontSize = ((stats.madness.current/20) * (88/stats.madness.madCap))  + 'dvh';
            madText.style.lineHeight = ((stats.madness.current/20) * (88/stats.madness.madCap))  + 'dvh';
            madNum.style.lineHeight = ((stats.madness.current/20) * (88/stats.madness.madCap))  + 'dvh';
            madText.style.lineHeight = ((stats.madness.current/20 + 1) * (88/stats.madness.madCap)) + 'dvh';
            madNum.style.fontFamily = randomFont;
            madNum.style.fontSize = ((stats.madness.current/20) * (88/stats.madness.madCap))  + 'dvh';
            madNum.style.lineHeight = ((stats.madness.current/20 + 1) * (88/stats.madness.madCap)) + 'dvh';

        }
            document.getElementById("madnessBox").style.backgroundColor="#8000FF"; 
            setTimeout(() => { document.getElementById("madnessBox").style.backgroundColor="#240048"; }, 100); //color flash
    } else if (madDelta > 0) {    // If the madness goes down
        // Calculate the position of madnessBox
        let currentRect = madnessBox.getBoundingClientRect();
        let currentLeftdvw = (currentRect.left / window.innerWidth) * 100;
        let currentTopdvh = (currentRect.top / window.innerHeight) * 100;
        const deltaX = 41 - currentLeftdvw;
        const deltaY = 11.2 - currentTopdvh;
        // Gradually return to centered position
        let currentLeft = parseFloat(madnessBox.style.left.replace('dvw', ''));
        let currentTop = parseFloat(madnessBox.style.top.replace('dvh', '')); 
        madnessBox.style.left = currentLeft + (initialLeft - currentLeft) * 0.25 + 'dvw'; 
        madnessBox.style.top = currentTop + (initialTop - currentTop) * 0.25 + 'dvh';
                    // Gradually realign rotation
       let currentRotation = parseFloat(madnessBox.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
        let newRotation = currentRotation * 0.44;
        if (Math.abs(currentRotation) <= 8) {
            newRotation = 0; // Snap to zero when close enough
        }
        madnessBox.style.transform = `rotate(${newRotation}deg)`; // Apply adjusted rotation
                    //reset box size
        let currentWidth = parseFloat(document.getElementById('madnessBox').style.width);
        if (currentWidth > 8) {
            // Update the width and height
            document.getElementById('madnessBox').style.width = Math.max(8, ((stats.madness.current /6 ) * (88/stats.madness.madCap))) + 'dvw';
            document.getElementById('madnessBox').style.height = Math.max(7, ((stats.madness.current /6 ) * (88/stats.madness.madCap))) + 'dvh';
        }else{
            document.getElementById('madnessBox').style.width = 8 + 'dvw';
            document.getElementById('madnessBox').style.height = 7 + 'dvh';
        }
        let madText = document.getElementById("madnessText");
        let madNum = document.getElementById("madness");
        if(parseFloat(document.getElementById('madness').style.fontSize) > 3){
            const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
            madText.style.fontFamily = randomFont;
            madText.style.fontSize = ((stats.madness.current/20) * (88/stats.madness.madCap))  + 'dvh';
            madText.style.lineHeight = ((stats.madness.current/20 + 1) * (88/stats.madness.madCap)) + 'dvh';
            madNum.style.fontFamily = randomFont;
            madNum.style.fontSize = ((stats.madness.current/20) * (88/stats.madness.madCap))  + 'dvh';
            madNum.style.lineHeight = ((stats.madness.current/20 + 1) * (88/stats.madness.madCap)) + 'dvh';
        }else{
            madText.style.fontFamily =  "Papyrus", "Arial", 'sans-serif';
            madText.style.fontSize = 3 + 'dvh';
            madText.style.lineHeight = 3 + 'dvh';
            madNum.style.fontFamily = "Papyrus", "Arial", 'sans-serif';
            madNum.style.fontSize = 3 + 'dvh';
            madNum.style.lineHeight = 3 + 'dvh';
        }
    }                                             
    // Update the last checked value
    lastCheckedValue = currentValue;
};

let isDragging = false;
let startPosition = { x: 0, y: 0 };

madnessBox.addEventListener("pointerdown", (e) => {
    isDragging = true;
    startPosition.x = e.clientX - madnessBox.getBoundingClientRect().left;
    startPosition.y = e.clientY - madnessBox.getBoundingClientRect().top;
    madnessBox.classList.add("dragging");
    madnessBox.style.cursor = "grabbing";
});

document.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const newX = e.clientX - startPosition.x;
    const newY = e.clientY - startPosition.y;
    madnessBox.style.left = `${newX}px`;
    madnessBox.style.top = `${newY}px`;
    
});

document.addEventListener("pointerup", () => {
    if (isDragging) {
        isDragging = false;
        madnessBox.classList.remove("dragging");
        madnessBox.style.cursor = "grab";
        const startLocation = { x: 41 * window.innerWidth / 100, y: 11.2 * window.innerHeight / 100 }; // Updated start location based on CSS values
        const currentLocation = madnessBox.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(currentLocation.left - startLocation.x, 2) +
            Math.pow(currentLocation.top - startLocation.y, 2)
        );

        if (distance < 50) { // Adjust this threshold as needed
            // Move the box back to the start location
            madnessBox.style.left = `${startLocation.x}px`;
            madnessBox.style.top = `${startLocation.y}px`;
            //realign angle
            madnessBox.style.transform = `rotate(0deg)`; // Apply adjusted rotation
        }
    }
});
    

function madLock(){
    comment('Your weakness has allowed Madness to overwhelm you. (only Dream and Madness Mitigation actions possible)', 'red');
    changeTab('west');
// Disable events
document.getElementById("cultTab").classList.add("disable-events");
document.getElementById("expeditionsTab").classList.add("disable-events");
document.getElementById("sacrariumTab").classList.add("disable-events");
document.getElementById("divinityTab").classList.add("disable-events");
document.getElementById("studyWrap").classList.add("disable-events");
document.getElementById("chantWrap").classList.add("disable-events");
document.getElementById("preachWrap").classList.add("disable-events");
document.getElementById("fictionWrap").classList.add("disable-events");
madBools[1] = true;
}
function madUnlock(){
    comment('Ah, you have returned to yourself. (Madness has been reduced enough for now.)', 'green');
    document.getElementById("cultTab").classList.remove("disable-events");
    document.getElementById("expeditionsTab").classList.remove("disable-events");
    document.getElementById("sacrariumTab").classList.remove("disable-events");
    document.getElementById("divinityTab").classList.remove("disable-events");
    document.getElementById("studyWrap").classList.remove("disable-events");
    document.getElementById("chantWrap").classList.remove("disable-events");
    document.getElementById("preachWrap").classList.remove("disable-events");
    document.getElementById("fictionWrap").classList.remove("disable-events");
    madBools[1] = false;
}

let madCheckCounter = [0, 2];
let madBools = [false, false];
function madCheck(){
    if(madCheckCounter[0] < madCheckCounter[1]){
        madCheckCounter[0] += 1;
    }else{
        madCheckCounter[0] = 0;
    
        if( madBools[1]=== false){//bool 1 for 2/3
            if(stats.madness.current >= (stats.madness.madCap * 2/3) && madBools[0] === false){
                madBools[0] = true;
                comment('Do not listen to the fools who say you must keep your Madness in check. (high Madness causes Terror in the Faithful )', 'pink');
            }else if(stats.madness.current >= (stats.madness.madCap * 2/3) && madBools[0] === true){
                let tempTerror = Math.sqrt(stats.madness.current * cult.faithful.current) / 8;//supposed to scale from 1-400
                numberChange("vault", "terror", tempTerror, "red");
            }else if(stats.madness.current < (stats.madness.madCap /2) && madBools[0] === true){
                madBools[0] = false;
            }
            if(stats.madness.current >= stats.madness.madCap){
                madLock();
            }
        }else{
            if(stats.madness.current <= (stats.madness.madCap * 2/3)){
                madUnlock();
            }
        }
    }
}

function madMin(min){
    if(stats.madness.current >= min){
        return true;
    }else{
        return false;
    }
}