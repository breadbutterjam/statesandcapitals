function onBodyLoad()
{
    // alert("AA")
    // document.getElementById('jam')
    console.log("document loaded")

    // $('.cls-2').on("click", stateClicked)
    $('.cls-2').on("click", stateClicked2)
    init();
    

    localStorage.stateData ? dataState = JSON.parse(localStorage.stateData) : dataState = {};

    // $('.cls-2').on("click", function(){alert("FF")})
    addEventListeners()

}

function addEventListeners(){

    document.querySelector('.popBG').addEventListener("click", hidePopup)
    $('.popBtn').on("click", YesNoBtnClicked)
    // document.querySelector('.popBtn').addEventListener("click", YesNoBtnClicked)    

}

let g_YesNo = -1;
let g_stateClicked = -1;
function YesNoBtnClicked(event)
{
    let elemClicked = event.target;
    console.log({elemClicked});
    let yesNo = elemClicked.getAttribute("data");
    g_YesNo = yesNo;
    console.log(yesNo);
    hidePopup();

    stateClicked2();
    
}

function hidePopup(){
    // console.log("AA");
    document.querySelector('.popContainer').classList.add("hiddenTillShown")    
}

let arrData = []

function init()
{
    let oStateFound = createDataObject('stateFound', '#93ffbe', 'states');
    let oCaptialFound = createDataObject('capitalFound', '#9a93ff', 'capitals');
    arrData.push(oStateFound);
    arrData.push(oCaptialFound);

    /* TODO: generate table dynamically based on the data in arrData */


}

function createDataObject(classToAdd, bgColor, dataClass)
{
    let retObj = {};
    retObj.classToAdd = classToAdd;
    retObj.bgColor = bgColor;
    retObj.dataClass = dataClass
    return retObj;
}

dataState = {};
function RecordData(event)
{
    stateName = prompt("Please enter name of the state", "State Name");
    stateClicked = event.target;

    stateClicked.stateName = stateName;

    // console.log(stateClicked.id)
    if(dataState[stateClicked.id] === undefined)
    {
        dataState[stateClicked.id] = [];
    }

    dataState[stateClicked.id].push(stateName);
    
    // addTextElement(event, stateName);

    /* TODO: allow ability to edit data */
}

function addTextElement(event, textToAdd)
{
    a = document.createElement('div');
    // a.innerText = "Hello World";

    a.innerText = textToAdd;
    document.body.append(a);
    a.style.position = 'absolute';
    a.style.top = String(event.pageY) + 'px';
    a.style.left = String(event.pageX) + 'px';


}

function stateClicked2(event)
{
    let stateClicked;
    let level = -1; 
    let strAns;
    if (event)
    {
        
        console.log({event})
        stateClicked = event.target;
        g_stateClicked = stateClicked
        // console.log({stateClicked})
        

        if(stateClicked.level === undefined)
        {
            level = 0;
        }
        else
        {
            
            level = stateClicked.level;
            level++;
        }

        // if (dataState[stateClicked.id] === undefined)
        if (event.shiftKey)
        {
            RecordData(event);
            return;
        }
        else if (dataState[stateClicked.id] != undefined)
        {
            strAns = dataState[stateClicked.id][level]
            console.log(stateClicked.id, strAns);    


            // else if (event.shiftKey)
            document.querySelector('.popMessage').innerText = strAns;
            document.querySelector('.popContainer').classList.remove("hiddenTillShown")
            return;
        }
        else {
            /* TEMPORY TILL WE ADD DATA FOR ALL or FIND A BETTER WAY TO DEAL WITH THIS */
            g_YesNo = "yes";
            // g_stateClicked = 
            stateClicked2();

        }
    }
    else if (g_YesNo === "yes")
    {
        stateClicked = g_stateClicked;
        // let level = -1;
        //condition ? exprIfTrue : exprIfFalse

        // stateClicked.level ? level = stateClicked.level : level = 0;
        if(stateClicked.level === undefined)
        {
            level = 0;
        }
        else
        {
            
            level = stateClicked.level;
            level++;
        }

        stateClicked.level = level;

        //get corresponding level data
        levelData = arrData[level];

        //add corresponding level's class
        stateClicked.classList.add(levelData.classToAdd);

        //add styling
        stateClicked.style.fill = levelData.bgColor;

        //increment number in data table
        $('.' + levelData.dataClass)[0].innerText = $('.' + levelData.classToAdd).length;

        g_YesNo = -1;
        g_stateClicked = -1;
    } else if (g_YesNo === "no")
    {
        g_YesNo = -1;
        g_stateClicked = -1;
    }

    

}

function SaveData()
{
    /* TODO: save saved state names */

    //remove the class list added to each path tags. 
    //save inner html of svg to 

    localStorage.stateData = JSON.stringify(dataState)
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

/* UTILS functions end */