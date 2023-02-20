let dataState_full = {"mh":["Maharashtra","mumbai"],"gj":["gujarat","gandhinagar"],"jh":["Jharkhand","Ranchi"],"up":["Uttar Pradesh","Lucknow"],"hp":["Himachal","Shimla"],"kl":["Kerala","Trivandrum"],"ka":["Karnataka","Banglore"],"ga":["Goa","Panaji"],"tn":["Tamil Nadu","Chennai"],"ap":["Andhra Pradesh","Amravati"],"tg":["Telangana","Hyderabad"],"ct":["Chattisgarh","Raipur"],"or":["Odisha","Bhubaneswar"],"br":["Bihar","Patna"],"mp":["Madhya Pradesh", "Bhopal"],"rj":["Rajasthan","Jaipur"],"pb":["Punjab","Chandigarh"],"hr":["Haryana","Chandigarh"],"ut":["Uttarakhand","Dehradun"],"sk":["Sikkim","Gangtok"],"wb":["West Bengal","Kolkatta"],"ar":["Arunachal Pradesh","Itanagar"],"as":["Assam","Dispur"],"nl":["Nagaland","Kohima"],"mn":["Manipur","Imphal"],"mz":["Mizoram","Aizawl"],"tr":["Tripura","Agartala"],"ml":["Meghalaya","Shillong"]};

// let dataState_shortened = {"mh":["Maharashtra","mumbai"],"gj":["gujarat","gandhinagar"],"kl":["Kerala","Trivandrum"],"ka":["Karnataka","Banglore"],"ga":["Goa","Panaji"],"tn":["Tamil Nadu","Chennai"]}
let dataState_shortened = {"mh":["Maharashtra","mumbai"],"gj":["gujarat","gandhinagar"],"wb":["West Bengal","Kolkatta"], "tn":["Tamil Nadu","Chennai"]}

let dataState_shortenedNE = {"sk":["Sikkim","Gangtok"],"ar":["Arunachal Pradesh","Itanagar"],"as":["Assam","Dispur"],"nl":["Nagaland","Kohima"],"mn":["Manipur","Imphal"],"mz":["Mizoram","Aizawl"],"tr":["Tripura","Agartala"],"ml":["Meghalaya","Shillong"]};

let dataState;

let arrAllStates;

let NUM_STATES;

let currSection;

let str1 = "qwertyuiop"
let str2 = "asdfghjkl"
let str3 = "zxcvbnm"

let arr = [str1, str2, str3]

let arrKeys = [];

function init(){
// alert("A")
    let t = window.location.href.split("?");
    if (t.length === 1){
        dataState = JSON.parse(JSON.stringify(dataState_full));
    } else if (t.length > 1){
        if (t[1].indexOf("NE") > -1){
            dataState = JSON.parse(JSON.stringify(dataState_shortenedNE));
        } else {
            dataState = JSON.parse(JSON.stringify(dataState_shortened));
        }
        
    }

    arrAllStates = Object.keys(dataState);
    NUM_STATES = arrAllStates.length - 1;

    arrIndices = [];
    for (var i=0; i<=NUM_STATES; i++){
        arrIndices.push(i);
    }

    //add group HTML
    addGroups();

    //get order to be displayed
    getOrder();

    //add labels - data of states and capitals
    addLabels();

    currSection = -1;

    updateSectionNum("nxt");
    updateTiles();

    AddEventListeners()
}

function AddEventListeners(){
    $('.tile').on("click", tileClicked)
}

function tileClicked(event){
    // console.log("tileClicked >> event ", event);
    // console.log("tileClicked >> event.currentTarget ", event.currentTarget);
    

}

let arrAllStatesCapitals;
let arrAllStatesNames, arrAllCapitalsNames;
function addLabels(){

    let arrIndices;
    let arrStates = [];
    let arrCapitals = [];
    let stateCode;

    
    let arrStateLabels, arrCapitalLabels;

    // let arrAllStatesCapitals = [];
    arrAllStatesCapitals = [];
    arrShuffledSplit.forEach(function(elem){
        // let arrIndices = arrShuffledSplit[currSection];
        arrIndices = elem;
        arrStates = [];
        arrCapitals = [];
         
        arrIndices.forEach(function(elem2){
            stateCode = arrAllStates[elem2];
    
            arrStates.push(dataState[stateCode][0]);
            arrCapitals.push(dataState[stateCode][1]);
        })

        shuffle(arrCapitals);
        arrAllStatesCapitals.push([arrStates, arrCapitals]); 
    })

    arrAllStatesNames = [];
    arrAllCapitalsNames = [];
    arrAllStatesCapitals.forEach(function(elem){
        arrStateLabels = elem[0];
        arrCapitalLabels = elem[1];

        arrStateLabels.forEach(function(elem2, ind2){
            arrAllStatesNames.push(elem2);
            arrAllCapitalsNames.push(arrCapitalLabels[ind2]);
        })

    })


    let grps = Array.from(document.querySelectorAll('.group'));
    let arrChlds; 
    grps.forEach(function(elem, ind){
        arrChlds = Array.from(elem.querySelectorAll('.lbl'));
        $(arrChlds[0]).html(arrAllStatesNames[ind]);
        $(arrChlds[1]).html(arrAllCapitalsNames[ind]);
    })

}


let strGroupHTML = '<div class="flx group hdn"><div class="flx vrt statesCont tileCont"><div class="tile"><div class="lbl"></div></div></div><div class="flx vrt capitalCont tileCont"><div class="tile"><div class="lbl"></div></div></div></div>'

function addGroups(){
    // let numGroups = arrAllStates.length;
    let strHTML = '';
    arrAllStates.forEach(function(){
        strHTML += strGroupHTML;
    })

    $('.mainBodyContainer').html('');
    $('.mainBodyContainer').html(strHTML);
}

function updateTiles(){

    let nStart = currSection * 7;
    let nEnd = nStart + 7;

    let arrGrpElems = Array.from(document.querySelectorAll('.group'));
    for (i = nStart; i<nEnd; i++){
        arrGrpElems[i].classList.remove("hdn");
    }

    // let arrData = arrShuffledSplit[currSection];
    

    // let arrStates = [];
    // let arrCapitals = [];

    // let stateCode; 
    // arrIndices.forEach(function(elem){
    //     stateCode = arrAllStates[elem];

    //     arrStates.push(dataState[stateCode][0]);
    //     arrCapitals.push(dataState[stateCode][1]);
    // })

    

    // console.log(arrStates)
    // console.log(arrCapitals)
}

function updateSectionNum(param){
    if (param === "nxt"){
        if (currSection < arrShuffledSplit.length -1)
        currSection++;
    }else if (param === "prv"){
        if (currSection > 0)
        currSection--;
    }

    // console.log("updateSectionNum >> currSection is ", currSection)
}


let g_arrSectionBreak = [];
g_arrSectionBreak.push([0,7])
g_arrSectionBreak.push([0,7])
g_arrSectionBreak.push([0,7])
g_arrSectionBreak.push([0,7])

//function to decide the order in which the states and capitals will be picked
//for now going with 7-7-7-7 
//alternate options are 
// (a) 7-7-6-8 [NE last]
// (b) 10-10-8 [Jam combines]

function getOrder(){
    shuffle(arrIndices);

    g_arrSectionBreak.forEach(function(elem){
        arrShuffledSplit.push(arrIndices.splice(elem[0], elem[1]))
    })

    /* arrShuffledSplit.push(arrIndices.splice(0, 7))
    arrShuffledSplit.push(arrIndices.splice(0, 7))
    arrShuffledSplit.push(arrIndices.splice(0, 7))
    arrShuffledSplit.push(arrIndices.splice(0, 7)) */


    // arrShuffledSplit.push(arrIndices.splice(7, 14))
    // arrShuffledSplit.push(arrIndices.splice(14, 21))
    // arrShuffledSplit.push(arrIndices.splice(21, 28))

}


let arrIndices = [];
let arrShuffledSplit = [];

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function getRandomNumber(nMax){
    return Math.round(Math.random() * nMax);
}