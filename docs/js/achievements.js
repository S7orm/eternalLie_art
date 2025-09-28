//extras colonel kurtz
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

let achievements = {
    west:{
        pythia:{
            string: "Pythia",
            description: ["A true Visionary, ", "Next level: Vision"],
            req: ["vision", 444],
            cost: 444,
            achieved: false,
            level:0,
            color: "#00008b" 
        },
        svengali:{
            string: "Svengali",
            description: ["Mesmerizing, ", "Next Level: Charm "],
            req: ["charm", 444],
            cost: 444,
            achieved: false,
            level:0,
            color: "#6e0a1e" 
        },
        morpheus:{
            string: "Morpheus",
            description: ["Slept a lot,", " Next level: Dream time: "],
            req: ["dream", 444],
            cost: 444,
            achieved: false,
            level:0,
            color: "#0C4185"
        },
        curie:{
            string: "Curie",
            description: ["Radiant,", " Next level: Radiance: "],
            req: ["radiance", 44],
            cost: 44,
            achieved: false,
            level:0,
            color: "#105954"
        },
        hubbard:{
            string: "Hubbard",
            description: ["Recruited 8 cultists", " Next level: Faithful "],
            req: ["faithful", 8],
            cost: 8,
            achieved: false,
            level:0,
            color: "#11549C" 
        },
        machiavelli:{
            string: "Machiavelli",
            description: ["Translated 4 Tomes", " Next level: Tomes "],
            req: ["tomes", 4],
            cost: 4,
            achieved: false,
            level:0,
            color: "#5E3B07" 
        },
        nero:{//maybe make this a list of madmen
            string: "Nero",
            description: ["Lost your marbles", " Next level: Madness "],
            req: ["madness", 248],
            cost: 248,
            achieved: false,
            level:0,
            color: "#7D0720"
        }
    },
    cult:{
        gregorian:{
            string: "Gregorian",
            description: ["Hypnotized 8 Chanters", " Next level: "],
            req: ["chanters", 8],
            cost: 444,
            achieved: false,
            level:0,
            color: "#17052E" 
        },
        lobotomist:{
            string: "Lobotomist",
            description:["Produce 8 Sentinels", " Next level: "],
            req: ["sentinels", 8],
            cost: 8,
            achieved: false,
            level:0,
            color: "#520E02" 
        },
        preceptor:{
            string: "Preceptor",
            description:[ "Trained 4 Priests", " Next level: "],
            req: ["priests", 4],
            cost: 4,
            achieved: false,
            level:0,
            color: "#590773"
        },
        marsh:{
            string: "Capt. Marsh",
            description: ["Trade for 4 Hybrids", " Next level: "],
            req: ["hybrids", 4],
            cost: 4,
            achieved: false,
            level:0,
            color: "#006400" 
        },
        magister:{
            string: "Magister",
            description: ["Warp 4 scribes", " Next level: "],
            req: ["scribes", 4],
            cost: 4,
            achieved: false,
            level:0,
            color: "#823B14" 
        }
    },
    vault:{
        caligula:{
            string: "Caligula",
            description: ["What wild abandon, ", " Next level: Love "],
            req: ["love", 888],
            cost: 444,
            achieved: false,
            level:0,
            color: "#750000" 
        },
        manson:{
            string: "Manson",
            description: ["Helter Skelter, ", " Next level: Terror "],
            req: ["terror", 888],
            cost: 444,
            achieved: false,
            level:0,
            color: "#A31207" 
        },
        mcDuck:{
            string: "McDuck",
            description: ["Gold Fever!", " Next level: Gold "],
            req: ["gold", 888],
            cost: 444,
            achieved: false,
            level:0,
            color: "#C27913"
        },
        mengele:{
            string: "Mengele",
            description: ["For research purposes, ", " Next level: Flesh "],
            req: ["flesh", 88],
            cost: 444,
            achieved: false,
            level:0,
            color: "#400A0A" 
        },
        reanimator:{
            string: "Reanimator",
            description: ["Is that you Herbert?", " Next level: Ichor "],
            req: ["ichor", 44],
            cost: 444,
            achieved: false,
            level:0,
            color: "#6B661F" 
        }
    },
    relics:{
        crystallomancer :{
            string: "Crystallomancer",
            description: ["Trapezohedron staring contest."],
            req: ["trapezohedron", 1],
            achieved: false,
            color: "#4169E1" 
        },
        phelps:{
            string: "Phelps",
            description: ["Like a horny dolphin."],
            req: ["blessing", 1],
            achieved: false,
            color: "#008B8B"
        },
        haruspex:{
            string: "Haruspex",
            description: ["Master of Ceremonies"],
            req: ["rhan", 1],
            achieved: false,
            color: "#556B2F" 
        }
    },
    gods:{
        executioner :{
            string: "Executioner",
            description: ["Fed Rhan."],
            req: ["rhan", 1],
            achieved: false,
            color: "#4169E1"
        },
        froggy :{
            string: "Froggy",
            description: ["Fed Tsathoggua."],
            req: ["tsathoggua", 1],
            achieved: false,
            color: "#1C5E11" 
        }
    } 
};

let achievementTotal = 0;
let achievementsKeys = Object.keys(achievements);

function buildAchievements() {
    const achievementsContainer = document.getElementById('achievementsFlex');
    for (let i = 0; i < achievementsKeys.length; i++) {
        const category = achievementsKeys[i];
        let box = document.createElement('div');
        box.id=category + "AchBox";
        box.classList.add('achBox');
        let text = document.createElement('span');
        text.classList.add("achCategories");
        text.textContent=category.charAt(0).toUpperCase() + category.slice(1);
        box.appendChild(text);
        const categoryAchievements = Object.keys(achievements[category]);
        for (let j = 0; j < categoryAchievements.length; j++) {
            const achievement = categoryAchievements[j];
            const achievementData = achievements[category][achievement];
            const div = document.createElement('div');
            div.style.backgroundColor = achievements[category][achievement].color;
            const text = document.createElement('span');
            text.id = achievement + 'Text';
            text.textContent = achievementData.string;
            if (achievementData.level && achievementData.level > 1) {
                text.textContent += ' ' + achievementData.level; 
            }
            text.classList.add('achievementsText');
            div.classList.add('achievementsWraps');
            div.id = achievement + 'Wrap';
            div.appendChild(text);
            box.appendChild(div);
        }
        achievementsContainer.appendChild(box);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    buildAchievements();
});

function achieved(category, achievement) {
    if(domUnlocks.achievements===false){
        domUnlocks.achievements=true;
        document.getElementById("achievementsTab").style.display="block";
    }
    achievements[category][achievement].achieved = true;
    document.getElementById(achievement + "Wrap").style.display="flex";
    if (achievements[category][achievement].hasOwnProperty('level')) {
        achievements[category][achievement].level++;
        achievements[category][achievement].req[1] *=2;
        document.getElementById(achievement + "Cost").innerHTML=  achievements[category][achievement].req[1];
        let textElement = document.getElementById(achievement + "Text");
        let displayText = achievements[category][achievement].string;
        displayText += ' ' + achievements[category][achievement].level;
        textElement.innerHTML = displayText;
    }
    achievementTotal++; 
    achPing = document.getElementById("achPing");
    achPing.style.display="inline-block";
    achPing.style.animation = "achFlash 0.4s ease-in-out 2";
    setTimeout(() => {
        achPing.style.display="none";
        achPing.style.animation = ""; 
    }, 800);
}

function checkAchievements(parent, stat) {
    if (stat === 'dream' || parent === 'relics') {
        return;
    }
    if(parent === "stats") parent = "west";
    if (achievements[parent]) {
        for (let achievementKey in achievements[parent]) {
            let achievement = achievements[parent][achievementKey];
            if (achievement.achieved && !achievement.hasOwnProperty('level')) {
                continue;
            }
            if (achievement.req[0] === stat) {
                let currentValue;
                if (parent === 'west') {
                    currentValue = stats[stat].current;
                } else if (parent === 'cult') {
                    currentValue = cult[stat].current;
                } else if (parent === 'vault') {
                    currentValue = vault[stat].current;
                }
                if (currentValue >= achievement.req[1]) {
                    achieved(parent, achievementKey);
                }
            }
        }
    }
}