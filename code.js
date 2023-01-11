let dataState_full = {"mh":["Maharashtra","mumbai"],"gj":["gujarat","gandhinagar"],"jh":["Jharkhand","Ranchi","Jharkhand","Ranchi"],"up":["UP","Lucknow"],"hp":["Himachal","Shimla"],"kl":["Kerala","Trivandrum"],"ka":["Karnataka","Banglore"],"ga":["Goa","Panaji"],"tn":["Tamil Nadu","Chennai"],"ap":["Andhra Pradesh","Amravati"],"tg":["Telangana","Hyderabad"],"ct":["Chattisgarh","Raipur"],"or":["Oddisha","Bhubaneswar"],"br":["Bihar","Patna"],"mp":["Madhya Pradesh"],"rj":["Rajasthan","Jaipur"],"pb":["Punjab","Chandigarh"],"hr":["Haryana","Chandigarh"],"ut":["Uttarakhand","Dehradun"],"sk":["Sikkim","Gangtok"],"wb":["West Bengal","Kolkatta"],"ar":["Arunachal Pradesh","Itanagar"],"as":["Assam","Dispur"],"nl":["Nagaland","Kohima"],"mn":["Manipur","Imphal"],"mz":["Mizoram","Aizawl"],"tr":["Tripura","Agartala"],"ml":["Meghalaya","Shillong"]}

// let dataState_shortened = {"mh":["Maharashtra","mumbai"],"gj":["gujarat","gandhinagar"],"kl":["Kerala","Trivandrum"],"ka":["Karnataka","Banglore"],"ga":["Goa","Panaji"],"tn":["Tamil Nadu","Chennai"]}
let dataState_shortened = {"mh":["Maharashtra","mumbai"],"gj":["gujarat","gandhinagar"],"wb":["West Bengal","Kolkatta"], "tn":["Tamil Nadu","Chennai"]}

let dataState;

let arrAllStates;
let arrCorrect = [];
let arrWrong = [];
let arrDone = [];

let NUM_STATES;

//states WB and TN are made up of paths 
let arrSpecialStates = ["wb", "tn"]

// console.log("127");
function init(){

    let t = window.location.href.split("?");
    if (t.length === 1){
        dataState = JSON.parse(JSON.stringify(dataState_full));
    } else if (t.length > 1){
        dataState = JSON.parse(JSON.stringify(dataState_shortened));
    }

    arrAllStates = Object.keys(dataState);
    NUM_STATES = arrAllStates.length - 1;

    //add cls-2 for event listeners to all paths that have two character IDs - that is all states and Delhi
    document.querySelectorAll("path").forEach(function(elem){
        if (elem.id.length === 2){
            elem.classList.add("cls-2");
        }
    })

    
    
    arrSpecialStates.forEach(function(elem){
        document.querySelector("#" + elem).classList.add("cls-2");
    })


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

let bIsSecondAttempt = false;
function getNextQuestion(){
     

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
    // event.stopPropogation();
    // console.log("A")
    // console.log(event.target.id);
    let clickedStateId = event.target.id;
    
    //for wb and tn
    if (clickedStateId.indexOf("path") === 0){
        clickedStateId = document.querySelector("#" + clickedStateId).parentElement.id;
        // console.log("updated clickedStateId is", clickedStateId)
    }

    

    let correctAns = arrAllStates[currentStateIndex];

    // console.log("clickedStateId", clickedStateId);
    // console.log("correctAns", correctAns);


    if (clickedStateId === correctAns){
        // alert("correct")
        // console.log("correct");
        markAns("correct", clickedStateId);
    } else {
        // console.log("wrong");
        markAns("wrong", clickedStateId);
    }

    //wait for some time before going to next question. fixes issue of alert appearing before color change
    //setTimeout(getNextQuestion, 100);

    if (checkIfAllQuestionsDone()){
        // setTimeout(getNextQuestion, 200);
        getNextQuestion();
    } else{
        showTopAlert();
    }
}

function showTopAlert(){
    let topAlertHolder = $(".topAlertHolder")[0];
    topAlertHolder.classList.remove("hddn");
    let strMessage = "";

    if (arrWrong.length === 0){
        
        topAlertHolder.classList.add("noWrong");
        $(".alertMessage")[0].innerText = "You have identified all states correctly."
    } else {
        topAlertHolder.classList.add("someWrong");
        $('.dvLink')[0].classList.remove("dsplyNone");
        $('.dvLink').on("click", TryingAgain)
        strMessage = "you got " + String(arrWrong.length) + "states wrong."
        $('.alertMessage')[0].innerText = strMessage;

    }

}

function TryingAgain(){
    //reset top header
    $('.dvLink')[0].classList.add("dsplyNone");
    $(".topAlertHolder")[0].classList.add("hddn");
    $(".topAlertHolder")[0].classList.remove("noWrong");
    $(".topAlertHolder")[0].classList.remove("someWrong");

    //set second attempt flag and restart
    bIsSecondAttempt = true;
    arrDone = JSON.parse(JSON.stringify(arrCorrect));
    arrWrong = [];
    getNextQuestion();
    
}

function checkIfAllQuestionsDone(){
    let bProgressNeeded = true;

    if (arrDone.length === arrAllStates.length){
    bProgressNeeded = false;
        
        /* if (arrWrong.length > 0){
            let t = confirm("done. do you want to attempt the wrong ones again?")
            if (t){
                bIsSecondAttempt = true;
                arrDone = JSON.parse(JSON.stringify(arrCorrect));
                arrWrong = [];
                bProgressNeeded = true;
            }else{
                bProgressNeeded = false;
            }
        } else {
            bProgressNeeded = false;
            //alert ("all complete. refresh page to start again.");
            console.log ("all complete. refresh page to start again.");
            
        } */

    // alert ("done. refresh page to start again.");
    
    }

    return bProgressNeeded;
}


function markAns(param, clickedStateId){
    // console.log("marking ans", param)
    let t = arrDone.length - 1;
    
    

    let elem;
    let clickedElem = $("#" + clickedStateId)[0];
    
    if (bIsSecondAttempt)
    {   
        elem = $('.wrongBullet')[0];
        elem.classList.remove("wrongBullet");
    }else {
        elem = $('.bullet')[t];
    }
    

    let statePathID = arrAllStates[currentStateIndex];
    let statePath = $("#" + statePathID)[0];

    if (param === "correct"){
        arrCorrect.push(currentStateIndex);
        elem.classList.add("correctBullet");

        /* if (arrSpecialStates.indexOf(clickedStateId) > -1){
            fillAllPaths()
        }
        statePath.style.fill = "lightgreen"; */
        fillColor(clickedStateId, "correct");

        playSound("correct");
    
    } else if (param === "wrong"){
        arrWrong.push(currentStateIndex);
        elem.classList.add("wrongBullet");

        /* if (arrSpecialStates.indexOf(clickedStateId) > -1){
            fillAllPaths(clickedStateId);
        }
        else {
            clickedElem.style.fill = "lightsalmon";
            clickedElem.classList.add("wrongFill");
        } */
        fillColor(clickedStateId, "incorrect");
        playSound("incorrect");
        
        setTimeout(removeIncorrectFill, 500)

    }
}

function fillColor(clickedStateId, correctIncorrect){
    //console.log(clickedStateId, correctIncorrect)

    let colorToFill = "";
    if (correctIncorrect === "correct"){
        colorToFill = "lightgreen";
    }else {
        colorToFill = "lightsalmon";
    }

    let bIsSpecialState = false;
    if (arrSpecialStates.indexOf(clickedStateId) > -1){
        bIsSpecialState = true;
    }

    if (bIsSpecialState){
        let arrC = Array.from($("#" + clickedStateId).children());
        arrC.forEach(function(elem){
            elem.style.fill = colorToFill;
            if (correctIncorrect === "incorrect"){
                elem.classList.add("wrongFill");
            }
        })
    } else {
        $("#" + clickedStateId)[0].style.fill = colorToFill;
        if (correctIncorrect === "incorrect"){
            $("#" + clickedStateId)[0].classList.add("wrongFill");
        }
    }

    if (correctIncorrect === "incorrect")
    {
        setTimeout(removeIncorrectFill, 500)
    }
    

}

function playSound(param){
    let oAudio;
    if (param === "correct"){
        oAudio = document.querySelector("#correctAudio");
    }else{
        oAudio = document.querySelector("#inCorrectAudio");
    }
    
    oAudio.play();
}

function fillAllPaths(param){
    
}

function removeIncorrectFill(){
    a = document.querySelectorAll(".wrongFill");
    a.forEach(function(elem){
        elem.style.fill = "";
        elem.classList.remove("wrongFill");
    })
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