let dataState;
let questionIndex = [];

let correctlyAns = [];
let arrRem = [];
let questionBank = []

let bPracticeMode = false;

const intFacts  = {
  mh: ["Maharashtra is India's wealthiest state and home to Bollywood."],
  gj: ["Gujarat has the longest coastline in India."],
  jh: ["Jharkhand produces over 40% of India's mineral wealth."],
  up: ["Uttar Pradesh has the most districts of any Indian state (75)."],
  hp: ["Himachal Pradesh has Asia's only natural ice hockey rink."],
  kl: ["Kerala has the highest literacy rate in India."],
  ka: ["Karnataka has Asia's largest freshwater island, Srirangapatna, on the Kaveri River."],
  ga: ["Goa was a Portuguese colony for 451 years, the longest European rule in India."],
  path1280: ["Tamil Nadu has the most UNESCO World Heritage Sites among Indian states."],
  ap: ["Andhra Pradesh is home to Tirupati, one of the world's most visited pilgrimage sites."],
  tg: ["Telangana houses the world's largest film studio, Ramoji Film City."],
  ct: ["Chhattisgarh has Asia's largest man-made dam at Hirakud."],
  or: ["Odisha's Chilika Lake is Asia's largest brackish water lagoon."],
  br: ["Bihar was the cradle of Buddhism and Jainism."],
  mp: ["Madhya Pradesh has the largest tiger population in the country."],
  rj: ["Rajasthan is the largest Indian state by area."],
  pb: ["The Golden Temple in Amritsar has a free kitchen (langar) that feeds over 100,000 people daily."],
  hr: ["Haryana has one of the largest solar power plants in India, located in Panipat."],
  ut: ["Uttarakhand is the origin of the Ganga and Yamuna rivers."],
  sk: ["Sikkim is India's first fully organic state and home to Kanchenjunga."],
  path1315: ["West Bengal gave India its first Nobel laureate, Rabindranath Tagore."],
  ar: ["Arunachal Pradesh is called the 'Land of the Rising Sun' and shares borders with three countries."],
  as: ["Assam is the largest tea-producing state in India and home to the one-horned rhinoceros."],
  nl: ["Nagaland is one of four states in India where English is the official language."],
  mn: ["Manipur is the birthplace of modern polo."],
  mz: ["Mizoram's Dampa Tiger Reserve is the largest wildlife sanctuary in the state."],
  tr: ["Tripura's capital Agartala is the only state capital that touches an international border."],
  ml: ["Meghalaya is the wettest place on Earth (Mawsynram) and famous for living root bridges."]
};

//karnataka, Odisha, Punjab, haryana, nagaland, mizoram, tripura

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

    //localStorage.stateData ? dataState = JSON.parse(localStorage.stateData) : dataState = {};
    //dataState = {"mh":["maharashtra","mumbai"],"gj":["gujarat","gandhinagar"],"jh":["Jharkhand","Ranchi"],"up":["UP","Lucknow"],"hp":["Himachal","Shimla"]}
    dataState = {"mh":["maharashtra","Mumbai", "nagpur"],"gj":["gujarat","Gandhinagar"],"jh":["Jharkhand","Ranchi"],"up":["UP","Lucknow"],"hp":["Himachal","Shimla", "Dharamshala"],"kl":["Kerala","Thiruvananthapuram"],"ka":["Karnataka","Bengaluru"],"ga":["Goa","Panaji"],"path1280":["Tamil Nadu","Chennai"],"ap":["Andhra Pradesh","Amravati"],"tg":["Telangana","Hyderabad"],"ct":["Chattisgarh","Raipur"],"or":["Oddisha","Bhubaneswar"],"br":["Bihar","Patna"],"mp":["Madhya Pradesh", "Bhopal"],"rj":["Rajasthan","Jaipur"],"pb":["Punjab","Chandigarh"],"hr":["Haryana","Chandigarh"],"ut":["Uttarakhand","Bhararisain", "Dehradun"],"sk":["Sikkim","Gangtok"],"path1315":["West Bengal","Kolkatta"],"ar":["Arunachal Pradesh","Itanagar"],"as":["Assam","Dispur"],"nl":["Nagaland","Kohima"],"mn":["Manipur","Imphal"],"mz":["Mizoram","Aizawl"],"tr":["Tripura","Agartala"],"ml":["Meghalaya","Shillong"]}



    init();

    $('.cls-2').on("click", stateClicked);

    if (!bPracticeMode)
    {
        document.querySelector('.questionHolder').classList.remove("smallerTitle")
        showNextQuestion();    
    } else {
        document.querySelector('.questionHolder').innerText = "Select a state to see it's name"
        document.querySelector('.questionHolder').classList.add('smallerTitle');
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
        document.querySelector('.factHolder').innerText = intFacts[currId];
        
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