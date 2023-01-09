let dataState2 = {"mh":["Maharashtra","mumbai"],"gj":["gujarat","gandhinagar"],"jh":["Jharkhand","Ranchi","Jharkhand","Ranchi"],"up":["UP","Lucknow"],"hp":["Himachal","Shimla"],"kl":["Kerala","Trivandrum"],"ka":["Karnataka","Banglore"],"ga":["Goa","Panaji"],"tn":["Tamil Nadu","Chennai"],"ap":["Andhra Pradesh","Amravati"],"tg":["Telangana","Hyderabad"],"ct":["Chattisgarh","Raipur"],"or":["Oddisha","Bhubaneswar"],"br":["Bihar","Patna"],"mp":["Madhya Pradesh"],"rj":["Rajasthan","Jaipur"],"pb":["Punjab","Chandigarh"],"hr":["Haryana","Chandigarh"],"ut":["Uttarakhand","Dehradun"],"sk":["Sikkim","Gangtok"],"wb":["West Bengal","Kolkatta"],"ar":["Arunachal Pradesh","Itanagar"],"as":["Assam","Dispur"],"nl":["Nagaland","Kohima"],"mn":["Manipur","Imphal"],"mz":["Mizoram","Aizawl"],"tr":["Tripura","Agartala"],"ml":["Meghalaya","Shillong"]}

let dataState = {"mh":["Maharashtra","mumbai"],"gj":["gujarat","gandhinagar"],"kl":["Kerala","Trivandrum"],"ka":["Karnataka","Banglore"],"ga":["Goa","Panaji"],"tn":["Tamil Nadu","Chennai"]}

let arrAllStates = Object.keys(dataState);
let arrCorrect = [];
let arrWrong = [];
let arrDone = [];

let NUM_STATES = arrAllStates.length - 1;

// console.log("127");
function init(){

    // Add question indicators - referred here as bullets
    let arrBulletHolders = document.querySelectorAll('.bulletHolder');
    arrBulletHolders.forEach(function(elem){
        addBullets(elem, 14) //28 states in two rows == 14 in each row
    })

    //add event listenes
    addEventListeners();

    getNextQuestion();

}

function addEventListeners(){
    $('.cls-2').on("click", stateClicked)
    // $('.cls-2').on("click", stateClicked2)
}

let currentStateIndex;

function getNextQuestion(){
    if (arrDone.length === arrAllStates.length){
        
        /* if (arrWrong.length > 0){
            let t = confirm("done. do you want to attempt the wrong ones again?")
            if (t){
                arrDone = JSON.parse(JSON.stringify(arrCorrect));
                arrWrong = [];
                getNextQuestion();
            }
        } else {
            alert ("done. refresh page to start again.");
        } */

        alert ("done. refresh page to start again.");
        return;
    } 

    let nCurrentIndex
    do {
        t = getRandomNumber(NUM_STATES);
    } while (arrDone.indexOf(t) > -1)

    currentStateIndex = t; 
    arrDone.push(t);
    //$('.questionHolder').text(dataState["mh"][0])
    let strStateCode = arrAllStates[t];
    let strStateName = dataState[strStateCode][0]
    $('.questionHolder').text(strStateName);    


}


function stateClicked(event){
    //console.log(event.target.id);
    let clickedStateId = event.target.id;
    let correctAns = arrAllStates[currentStateIndex];

    // console.log("clickedStateId", clickedStateId);
    // console.log("correctAns", correctAns);


    if (clickedStateId === correctAns){
        // alert("correct")
        console.log("correct");
        markAns("correct");
    } else {
        console.log("wrong");
        markAns("wrong");
    }

    getNextQuestion();
}

function markAns(param){
    let t = arrDone.length - 1;
    let elem = $('.bullet')[t];

    let statePathID = arrAllStates[currentStateIndex];
    let statePath = $("#" + statePathID)[0];

    if (param === "correct"){
        arrCorrect.push(currentStateIndex);
        elem.classList.add("correctBullet");
        statePath.style.fill = "lightgreen";

    
    } else if (param === "wrong"){
        arrWrong.push(currentStateIndex);
        elem.classList.add("wrongBullet");
    }
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