// console.log("127");
function init(){
    let arrBulletHolders = document.querySelectorAll('.bulletHolder');
    arrBulletHolders.forEach(function(elem){
        addBullets(elem, 14) //28 states in two rows == 14 in each row
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