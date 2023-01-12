let dataState_full = {"mh":["Maharashtra","mumbai"],"gj":["gujarat","gandhinagar"],"jh":["Jharkhand","Ranchi"],"up":["UP","Lucknow"],"hp":["Himachal","Shimla"],"kl":["Kerala","Trivandrum"],"ka":["Karnataka","Banglore"],"ga":["Goa","Panaji"],"tn":["Tamil Nadu","Chennai"],"ap":["Andhra Pradesh","Amravati"],"tg":["Telangana","Hyderabad"],"ct":["Chattisgarh","Raipur"],"or":["Oddisha","Bhubaneswar"],"br":["Bihar","Patna"],"mp":["Madhya Pradesh", "Bhopal"],"rj":["Rajasthan","Jaipur"],"pb":["Punjab","Chandigarh"],"hr":["Haryana","Chandigarh"],"ut":["Uttarakhand","Dehradun"],"sk":["Sikkim","Gangtok"],"wb":["West Bengal","Kolkatta"],"ar":["Arunachal Pradesh","Itanagar"],"as":["Assam","Dispur"],"nl":["Nagaland","Kohima"],"mn":["Manipur","Imphal"],"mz":["Mizoram","Aizawl"],"tr":["Tripura","Agartala"],"ml":["Meghalaya","Shillong"]};

// let dataState_shortened = {"mh":["Maharashtra","mumbai"],"gj":["gujarat","gandhinagar"],"kl":["Kerala","Trivandrum"],"ka":["Karnataka","Banglore"],"ga":["Goa","Panaji"],"tn":["Tamil Nadu","Chennai"]}
let dataState_shortened = {"mh":["Maharashtra","mumbai"],"gj":["gujarat","gandhinagar"],"wb":["West Bengal","Kolkatta"], "tn":["Tamil Nadu","Chennai"]}

let dataState;

let arrAllStates;
let arrCorrect = [];
let arrWrong = [];
let arrDone = [];

let NUM_STATES;


let str1 = "qwertyuiop"
let str2 = "asdfghjkl"
let str3 = "zxcvbnm"

let arr = [str1, str2, str3]

let arrKeys = [];

function init(){

    let t = window.location.href.split("?");
    if (t.length === 1){
        dataState = JSON.parse(JSON.stringify(dataState_full));
    } else if (t.length > 1){
        dataState = JSON.parse(JSON.stringify(dataState_shortened));
    }

    arrAllStates = Object.keys(dataState);
    NUM_STATES = arrAllStates.length - 1;


     
    arr.forEach(function(elem){
        t = elem.split("");
        arrKeys.push(t); 
    })

    arrKeys.push(["clear", "check"])

    let keysHolder;
    arrKeys.forEach(function(elem, ind){
        keysHolder = document.querySelectorAll(".keyHolderRow")[ind];
        addKeys(keysHolder, elem);
    })


    //for last row keys - check and clear, add identifying classes
    t = Array.from(document.querySelectorAll(".keyHolderRow")[3].children)
    t.forEach(function(elem){
        elem.classList.add("lastRowKey")
    })


    //add bullet holders
    let arrBulletHolders = document.querySelectorAll('.bulletHolder');
    arrBulletHolders.forEach(function(elem){
        addBullets(elem, 14) //28 states in two rows == 14 in each row
    })

    //add event listerners
    addEvntListener();

    //get question
    getNextQuestion();

    $('#capitalAnswer').focus();
}

function addEvntListener(){
    $('.btnClear').on("click", clearClicked);
    $('.capitalAnswer').on("keypress", answerKeyPress);
    $('.btnCheck').on("click", checkClicked);

}

function checkClicked(){
    
    checkAnswer();

}

function answerKeyPress(event){
    // console.log({event})
    // console.log(event.keyCode);
    if (event.keyCode === 13){
        //trigger check
        checkAnswer();
        //clearClicked();
        // $('.capitalAnswer')[0].innerText = "";
        

    }
}

function checkAnswer(){
    let userAnswer = $("#capitalAnswer")[0].value.trim().toLowerCase();

    let correctAnswer = dataState[arrAllStates[currentStateIndex]][1].toLowerCase();

    console.log("userAns ", userAnswer);
    console.log("correct answer ", correctAnswer);

    let bAns; 
    if (userAnswer === correctAnswer){
        bAns = true;
        arrCorrect.push(currentStateIndex)
    } else 
    {
        bAns = false;
        arrWrong.push(currentStateIndex);
    }


    let t = arrDone.length - 1;
    let bulletElem; 

    if (bIsSecondAttempt)
    {   
        bulletElem = $('.wrongBullet')[0];
        bulletElem.classList.remove("wrongBullet");
    }else {
        bulletElem = $('.bullet')[t];
    }

    if (bAns){
        bulletElem.classList.add("correctBullet");
        arrCorrect.push(currentStateIndex);
    }else{
        bulletElem.classList.add("wrongBullet");
    }
    
    // getNextQuestion();

    if (checkIfAllQuestionsDone()){
        // setTimeout(getNextQuestion, 200);
        getNextQuestion();
    } else{
        showTopAlert();
    }

    clearClicked();

}

function clearClicked(event){
    // $('.capitalAnswer')[0].innerText = "";
    $('.capitalAnswer')[0].value = "";

    $('.capitalAnswer').focus();
}

function addKeys(keysHolder, arrKey){
    let oKey;
    arrKey.forEach(function(elem){
        oKey = document.createElement("div");
        oKey.classList.add("indKey");
        oKey.innerText = elem;
        keysHolder.append(oKey)
    })
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
   
    }

    return bProgressNeeded;
}

function addBullets(parentElem, nCount){
    let tBullet;
    for (var i=0; i<nCount; i++){
        tBullet = document.createElement('div');
        tBullet.classList.add("bullet");
        parentElem.append(tBullet);
    }
}

function removeIncorrectFill(){
    a = document.querySelectorAll(".wrongFill");
    a.forEach(function(elem){
        elem.style.fill = "";
        elem.classList.remove("wrongFill");
    })
}

function getRandomNumber(nMax){
    return Math.round(Math.random() * nMax);
}