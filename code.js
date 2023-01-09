let dataState = {"mh":["Maharashtra","mumbai"],"gj":["gujarat","gandhinagar"],"jh":["Jharkhand","Ranchi","Jharkhand","Ranchi"],"up":["UP","Lucknow"],"hp":["Himachal","Shimla"],"kl":["Kerala","Trivandrum"],"ka":["Karnataka","Banglore"],"ga":["Goa","Panaji"],"tn":["Tamil Nadu","Chennai"],"ap":["Andhra Pradesh","Amravati"],"tg":["Telangana","Hyderabad"],"ct":["Chattisgarh","Raipur"],"or":["Oddisha","Bhubaneswar"],"br":["Bihar","Patna"],"mp":["Madhya Pradesh"],"rj":["Rajasthan","Jaipur"],"pb":["Punjab","Chandigarh"],"hr":["Haryana","Chandigarh"],"ut":["Uttarakhand","Dehradun"],"sk":["Sikkim","Gangtok"],"wb":["West Bengal","Kolkatta"],"ar":["Arunachal Pradesh","Itanagar"],"as":["Assam","Dispur"],"nl":["Nagaland","Kohima"],"mn":["Manipur","Imphal"],"mz":["Mizoram","Aizawl"],"tr":["Tripura","Agartala"],"ml":["Meghalaya","Shillong"]}

let arrAllStates = Object.keys(dataState);
let arrCorrect = [];
let arrWrong = [];
let arrDone = [];


// console.log("127");
function init(){

    // Add question indicators - referred here as bullets
    let arrBulletHolders = document.querySelectorAll('.bulletHolder');
    arrBulletHolders.forEach(function(elem){
        addBullets(elem, 14) //28 states in two rows == 14 in each row
    })

    //add event listenes
    addEventListeners();

}

function addEventListeners(){
    $('.cls-2').on("click", stateClicked)
    // $('.cls-2').on("click", stateClicked2)
}


function getNextQuestion(){
    if (arrDone.length === arrAllStates.length){
        alert ("done. refresh page to start again.");
        return;
    } 

    let nCurrentIndex
    do {
        t = getRandomNumber(27);
    } while (arrDone.indexOf(t) > -1)

    arrDone.push(t);
    //$('.questionHolder').text(dataState["mh"][0])
    let strStateCode = arrAllStates[t];
    let strStateName = dataState[strStateCode][0]
    $('.questionHolder').text(strStateName);
}


function stateClicked(event){
    console.log(event.target.id);
}

function addBullets(parentElem, nCount){
    let tBullet;
    for (var i=0; i<nCount; i++){
        tBullet = document.createElement('div');
        tBullet.classList.add("bullet");
        parentElem.append(tBullet);
    }
}

function getRandomNumber(nMax){
    return Math.round(Math.random() * nMax);
}