const FILL_COLOR = "blue"
let dataState;
let questionIndex = [];

let correctlyAns = [];
let arrRem = [];
let questionBank = []

let bPracticeMode = false;
let g_lastElemClicked = [];

// dataState = {"mh":["maharashtra","Mumbai", "nagpur"],"gj":["gujarat","Gandhinagar"]}
districtsData = maharashtraDistricts = {
  PalgharDistrict: ["Palghar", ""],
  ThaneDistrict: ["Thane", ""],
  MumbaiDistrict: ["Mumbai City and Suburban", ""],
  RaigadDistrict: ["Raigad", ""],
  RatnagiriDistrict: ["Ratnagiri", ""],
  SindhudurgDistrict: ["Sindhudurg", "southernmost point of Maharashtra"],
  NashikDistrict: ["Nashik", ""],
  DhuleDistrict: ["Dhule", ""],
  NandurbarDistrict: ["Nandurbar", "northernmost point of Maharashtra"],
  JalgaonDistrict: ["Jalgaon", ""],
  AhmednagarDistrict: ["Ahmednagar", ""],
  PuneDistrict: ["Pune", ""],
  SataraDistrict: ["Satara", ""],
  SangliDistrict: ["Sangli", ""],
  SolapurDistrict: ["Solapur", ""],
  KolhapurDistrict: ["Kolhapur", ""],
  ChhatrapatiSambhajinagarDistrict: ["Aurangabad (Chhatrapati Sambhajinagar)", ""],
  BeedDistrict: ["Beed", ""],
  JalnaDistrict: ["Jalna", ""],
  OsmanabadDistrict: ["Osmanabad (Dharashiv)", ""],
  NandedDistrict: ["Nanded", ""],
  LaturDistrict: ["Latur", ""],
  ParbhaniDistrict: ["Parbhani", ""],
  HingoliDistrict: ["Hingoli", ""],
  BuldhanaDistrict: ["Buldhana", ""],
  AkolaDistrict: ["Akola", ""],
  WashimDistrict: ["Washim", ""],
  AmravatiDistrict: ["Amravati", ""],
  YavatmalDistrict: ["Yavatmal", ""],
  WardhaDistrict: ["Wardha", ""],
  NagpurDistrict: ["Nagpur", ""],
  BhandaraDistrict: ["Bhandara", ""],
  GondiaDistrict: ["Gondia", ""],
  ChandrapurDistrict: ["Chandrapur", ""],
  GadchiroliDistrict: ["Gadchiroli", ""]
};


function init(){

    let t = window.location.href.split("?");
    if (t.length > 1 && t[1] === "pr"){
        bPracticeMode = true;
    }

  ff = Object.keys(dataState);
  questionBank = []
  ff.forEach(function(elem, ind){
      t = [];
      t.push(elem); 
      t.push(dataState[elem][0])
      questionBank.push(t);
      questionIndex.push(ind);

  })

  arrRem = JSON.parse(JSON.stringify(questionIndex));
//   document.addEventListener("")
 
}


let currQues = -1;
let nxtQues = -1;
let arrAsked = [];
let len = -1; 


function showNextQuestion(){
    len = questionIndex.length;
    let str = "";
    if (arrAsked.length === len){
    //if (arrRem.len === 0){
        //alert("ho gaya ab, refresh maaro")
        //alert ("Completed, please refresh to try again");
        str = "you got " + String(arrWrongAns.length) + "wrong. Do you want to try them again";
        if (confirm(str)){
            addWrongAnswersToRemaining();
            showNextQuestion();
        }

    }
    else{
        c = getRandomBetween(0, arrRem.length - 1); 
        cc = arrRem[c];
        arrRem = removeIndex(c, arrRem);

        currQues = questionBank[cc];
        arrAsked.push(cc);
        document.querySelector('.questionHolder').innerText = currQues[1];    
    }
}

function showNextQuestion3(){
    len = questionIndex.length;
    if (arrAsked.length === len){
        alert("ho gaya ab, refresh maaro")
    }
    else{

        do{ 
            g = getRandomBetween(0, len);
            
        } while (arrAsked.indexOf(g) > -1)

        arrAsked.push(g);
        currQues = questionBank[g];
        document.querySelector('.questionHolder').innerText = currQues[1];

    }
}

function showNextQuestion2(){
    if (questionIndex.length > 0){
        nxtQues = getNextQuestion();
        questionIndex = removeIndex(nxtQues, questionIndex);
        //currQues = questionBank[nxtQues]; 
        currQues = questionBank[questionIndex[nxtQues]]; 
        document.querySelector('.questionHolder').innerText = currQues[1];
        
    }
    else {
        alert ("ho gaya ab, refresh maaro")
    }
    
}

function getNextQuestion(){
    let tNxtQues = -1; 
    tNxtQues = getRandomBetween(0, questionIndex.length - 1); 
    return tNxtQues;
}

function onBodyLoad()
{

    //add eventlistener for district
    $('.district').on("click", districtClicked);
    return;

    //localStorage.stateData ? dataState = JSON.parse(localStorage.stateData) : dataState = {};
    //dataState = {"mh":["maharashtra","mumbai"],"gj":["gujarat","gandhinagar"],"jh":["Jharkhand","Ranchi"],"up":["UP","Lucknow"],"hp":["Himachal","Shimla"]}
    
    dataState = {"mh":["maharashtra","Mumbai", "nagpur"],"gj":["gujarat","Gandhinagar"],"jh":["Jharkhand","Ranchi"],"up":["UP","Lucknow"],"hp":["Himachal","Shimla", "Dharamshala"],"kl":["Kerala","Thiruvananthapuram"],"ka":["Karnataka","Bengaluru"],"ga":["Goa","Panaji"],"path1280":["Tamil Nadu","Chennai"],"ap":["Andhra Pradesh","Amravati"],"tg":["Telangana","Hyderabad"],"ct":["Chattisgarh","Raipur"],"or":["Oddisha","Bhubaneswar"],"br":["Bihar","Patna"],"mp":["Madhya Pradesh", "Bhopal"],"rj":["Rajasthan","Jaipur"],"pb":["Punjab","Chandigarh"],"hr":["Haryana","Chandigarh"],"ut":["Uttarakhand","Bhararisain", "Dehradun"],"sk":["Sikkim","Gangtok"],"path1315":["West Bengal","Kolkatta"],"ar":["Arunachal Pradesh","Itanagar"],"as":["Assam","Dispur"],"nl":["Nagaland","Kohima"],"mn":["Manipur","Imphal"],"mz":["Mizoram","Aizawl"],"tr":["Tripura","Agartala"],"ml":["Meghalaya","Shillong"]}

    init();

    $('.cls-2').on("click", stateClicked);

    if (!bPracticeMode)
    {
        showNextQuestion();    
    } else {
        document.querySelector('.questionHolder').innerText = "Select a state to see it's name"
    }
    

}

function districtClicked(event){
    let elemClicked = event.currentTarget
    
    $('.questionHolder')[0].innerText = districtsData[event.currentTarget.id][0];

    console.log(elemClicked.nodeName)
    // console.log(event.currentTarget.nodeName)

    if (g_lastElemClicked[0]){
        resetLastElemClicked();
    }

    rememberClickedElemStyle(elemClicked);

    if (elemClicked.nodeName === "path"){
        elemClicked.style.fill = FILL_COLOR;
    } else{
        elemClicked.querySelector("path").style.fill = FILL_COLOR;
    }


}

function rememberClickedElemStyle(param){
    g_lastElemClicked = [param];
    let color = ""
    if (param.nodeName === "path"){
        color = param.style.fill;
    } else {
        color = param.querySelector("path").style.fill;
    }

    g_lastElemClicked.push(color);

}

function resetLastElemClicked(){
    if (g_lastElemClicked[0].nodeName === "path"){ 
        g_lastElemClicked[0].style.fill = g_lastElemClicked[1]
    } else{
        g_lastElemClicked[0].querySelector("path").style.fill = g_lastElemClicked[1];
    }
    
}

let arrCorrectAns = [];
let arrWrongAns = [];

let tOb = -1;

function AddCapital(stateID){
    // let str = '<br><span class="capitalFontSize"></span>'
    let elemBR = document.createElement("br");
    let elemSpan = document.createElement("span");
    elemSpan.classList.add("capitalFontSize");

    let stateSelected = dataState[stateID];
    let strCapital = "";
    if (stateSelected.length === 2) //state has only one capital 
    {
        strCapital = stateSelected[1];
    } else { // state has 2 capitals
        strCapital = stateSelected[1] + " / " + stateSelected[2];
    }
    
    elemSpan.innerText = strCapital;

    document.querySelector('.questionHolder').appendChild(elemBR);
    document.querySelector('.questionHolder').appendChild(elemSpan);

}

function stateClicked(evnt){
    //console.log("A");
    let t; 

    let currId = evnt.currentTarget.id;

    //tOb = evnt;
    if (bPracticeMode){
        //
        let bSecondClick = $(evnt.currentTarget).hasClass('selectedState');
        if (bSecondClick){
            //if user is clicking on already clicked state, show capital
            // document.querySelector('.questionHolder').innerText = dataState[currId][0];    
            if ($('.questionHolder')[0].children.length === 0){
                AddCapital(currId); //only add capital once, for subsequent clicks ignore. 
            }
            
        }
        else {
            //if first click, show state 
            $('.selectedState').removeClass('selectedState');
            $(evnt.currentTarget).addClass('selectedState');
            document.querySelector('.questionHolder').innerText = dataState[currId][0];
        }
        

        console.log(evnt.currentTarget.id);

    }
    else {
        if (evnt.currentTarget.id === currQues[0]){
            $(evnt.currentTarget).addClass('crrctState');
            $(evnt.currentTarget).removeClass('wrngState');
            t = arrWrongAns.indexOf(currQues);
            if (t > -1){
                arrWrongAns = removeIndex(t, arrWrongAns);
            } 
        } else {
            $(evnt.currentTarget).addClass('wrngState');
            arrWrongAns.push(currQues);
        }

        showNextQuestion();
    }

    

}

function addWrongAnswersToRemaining(){
    arrWrongAns.forEach(function(elem){
        t = questionBank.indexOf(elem);
        arrAsked = removeIndex(t, arrAsked);
        arrRem.push(t);

    })
}

/* UTILS functions start */

let svgHt = 1680;
let svgWt = 1513;
let svgDim = getHtWiObj(svgHt, svgWt)
//width="1513" height="1680"

function getImageDimensions(ogImageDimensions)
{
    let ogHt = ogImageDimensions.h;
    let ogWt = ogImageDimensions.w;

    let avHt = window.innerHeight;
    let avWt = window.innerWidth;

    let aR = ogHt / ogWt;

    

    console.log("aR", aR)

    // if (aR > 1)
    if (avHt < avWt)
    { 
        // if available orientation is landscape - ht is less than width; 
        // fit height to available height and then match width as per AR. 
        retHt = avHt; 
        retW = retHt / aR;

        /* if (retW > avWt)
        {
            retW = avWt;
            retHt = ogWt * aR;
        } */
    }
    else
    {
        retW = avWt;
        retHt = retW * aR;
    }

    let oRet = getHtWiObj(retHt, retW)

    return oRet;

    /* let avHt = window.innerHeight;
    let avWt = window.innerWidth;

    let retHt, retW; 

    

    if (retW > avWt)
    {
        
    }

   let oRet = getHtWiObj(retHt, retW)

    return oRet; */
}

function getHtWiObj(ht, wi)
{
    let oRet = {
        h: +ht.toFixed(2), 
        w: +wi.toFixed(2),
    }

    return oRet;
}

function getRandomBetween(min, max){
    diff = max - min 
    return Math.round(Math.random() * diff) + min 
    
}

function removeIndex(ind, arr){
    let tArrRet = [];
    let tArr = JSON.parse(JSON.stringify(arr));
    for (var i=0; i<tArr.length; i++){
        if (i === ind){
            //do nothing
        } else{
            tArrRet.push(tArr[i])
        }
    }

    return tArrRet; 
    
}
/* UTILS functions end */