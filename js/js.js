////////////////////////////////variables

//resourse of flag country
var imageNameArr = ["images/1/canada.png", "images/1/egypt.png", "images/1/france.png", "images/1/germany.png", "images/1/uk.png", "images/1/usa.png", "images/1/italy.png", "images/1/uae.png"];
//resourse of country name
var imageCounteryName = ["images/2/canada.png", "images/2/egypt.png", "images/2/france.png", "images/2/germany.png", "images/2/uk.png", "images/2/usa.png", "images/2/italy.png", "images/2/uae.png"];
//resourse of capital name
var imageCapitalName = ["images/3/canada.png", "images/3/egypt.png", "images/3/france.png", "images/3/germany.png", "images/3/uk.png", "images/3/usa.png", "images/3/italy.png", "images/3/uae.png"];
//temp variable
var y;
//array of randomNumber
var imagePos = new Array();
//variable of user
var chances = 40, score = 0;
//flag about sound "enable or disable"
var soundMuted = false;
//varablie have boolen value change if click on img
var boolClick = false;
//varavlie have num of level
var levelNum = 1;
//user name
var userName = "";
//varavlie incerent when user match to img
var match = 0;
//varalie have num of clicked *number of img click by user*
var clickNum = 0;
//array have the object of img has beeen clicked by user
var imgClicked = [];

/////////////////////////////////////////function

//function change img of sound and change flage of sound
function muteSound() {
    if (!soundMuted) {
        document.querySelector(".gameSound button").style.backgroundImage = 'url(images/NoAudio_35px.png)';
        soundMuted = true;
    } else {
        document.querySelector(".gameSound button").style.backgroundImage = 'url(images/Speaker_35px.png)';
        soundMuted = false;
    }
}
//genetera number
function randomPosition() {
    if (levelNum < 5) {
        return Math.floor(Math.random() * 16);
    }
    else if (levelNum === 5) {
        return Math.floor(Math.random() * 24);
    }
}
//function make array of genetera number with random sorting 
function createImagePosition() {
    var loopLength = 0;
    if (levelNum === 5) {
        loopLength = 24;
    }
    else if (levelNum < 5) {
        loopLength = 16;
    }
    for (var i = 0; i < loopLength; i++) {
        var x = randomPosition();
        while (imagePos.indexOf(x) != -1) {
            x = randomPosition();
        }
        imagePos[i] = x;
    }
}
//function take index of image as para and return position of in speiail array 'resourses' base on levelnum
function matchArray(index) {
    switch (levelNum) {
        case 1:
            var x = imagePos.indexOf(index);
            if (x < 8)
                return imageNameArr[x];
            else if (x >= 8)
                return imageNameArr[x - 8];
            break;
 
        case 2:
            var x = imagePos.indexOf(index);
            if (x < 8)
                return imageNameArr[x];
            else if (x >= 8)
                return imageCounteryName[x - 8];
            break;

        case 3:
            var x = imagePos.indexOf(index);
            if (x < 8)
                return imageNameArr[x];
            else if (x >= 8)
                return imageCapitalName[x - 8];
            break;

        case 4:
            var x = imagePos.indexOf(index);
            if (x < 8)
                return imageCounteryName[x];
            else if (x >= 8)
                return imageCapitalName[x - 8];
            break;

        case 5:
            var x = imagePos.indexOf(index);
            if (x < 8)
                return imageNameArr[x];
            else if (x >= 8 && x < 16)
                return imageCounteryName[x - 8];
            else if (x >= 16 && x < 24)
                return imageCapitalName[x - 16];
            break;

        default:
            break;
    }  
}
//function "hideTarget" hide list of img already is the same ,work from 'arguments'
function hideTarget() {
    var dec = 0.3;
    var listArg = arguments;
    if (soundMuted === false) {
        var audio = new Audio('sound/2.wav');
        audio.play();
    }
    var handlerFadeOut = setInterval(function () {
        for (var imgOP = 0; imgOP < listArg.length; imgOP++) {
            listArg[imgOP].parentElement.parentElement.parentElement.style.opacity = "" + (1 - dec);
        }
        dec += 0.1;
        if (dec > 1) {
            clearInterval(handlerFadeOut);
        }
    }, 150);
}
//function take "name,score" return score as number
function helper(str) {
    var tempHelper = str.split(',');
    return parseInt(tempHelper[1]);
}
//function take "name,score" return name
function helper2(str) {
    var tempHelper2 = str.split(',');
    return tempHelper2[0];
}
//function retun to intro section
function back() {
    document.getElementById('highscore').style.display = "none";
    document.getElementById('difficulity').style.display = "block";
}
//function take list of users score user by score "sort by selection sort"  then return list of user
function selectionSortForUser(listUser) {
    for (var i = 0; i < listUser.length; i++) {
        //set min to the current iteration of i
        var min = i;
        for (var j = i + 1; j < listUser.length; j++) {
            if (helper(listUser[j]) < helper(listUser[min])) {
                min = j;
            }
        }
        var tempe = listUser[i];
        listUser[i] = listUser[min];
        listUser[min] = tempe;
    }
    return listUser.reverse();
}
//function highScore reWirte top 10 user into html table
function highScore(list) {
    tableHighScore.innerHTML = "";
    var headOfTable = " <thead><tr><td>No.</td><td>Name</td><td>Score</td></tr></thead>";
    tableHighScore.innerHTML += headOfTable;
    for (var ii = 0; ii < 10; ii++) {
        var dumpvar = ii;
        dumpvar += 1
        var tr = "<tr><td>" + dumpvar + "</td><td>" + helper2(list[ii]) + "</td><td>" + helper(list[ii]) + "</td></tr>";
        tableHighScore.innerHTML += tr;
    }
}
//function storageUser check of score of user in top 10 or not if save userscore and his name
function storageUser(name3, score3) {
    var listOfUser = [];
    var temp = 1;
    for (var i = 0; i < 10; i++) {
        var t = temp + "";
        listOfUser[i] = get(t);
        temp++;
    }
    var tt = name3 + "," + score3;
    listOfUser.push(tt);
    listOfUser = selectionSortForUser(listOfUser);
    temp = 1;
    for (var i = 0; i < 10; i++) {
        var t = temp + "";
        save(t + "", listOfUser[i]);
        temp++;
    }
    highScore(listOfUser);
}
//function game over call when user his chances equal zero "that method when run end the game "
function gameOver() {
    if (soundMuted === false) {
        var audio = new Audio('sound/1.mp3');
        audio.play();
    }
    var allDiv = document.querySelectorAll('.container');
    for (var p = 0; p < allDiv.length; p++) {
        allDiv[p].style.opacity = "" + 1;

    }
    var allCard = document.getElementsByClassName('card');
    for (var pp = 0; pp < allCard.length; pp++) {
        if (allCard[pp].className === "card flipped") {
            allCard[pp].classList.toggle('flipped');
        }
    }
    imgClicked = [];
    match = 0;
    storageUser(userName, score);
    document.getElementById('game').style.display = "none";
    document.getElementById('gameover').style.display = "block";
    setTimeout(function () {
        document.getElementById('highscore').style.display = "block";
        document.getElementById('gameover').style.display = "none";
    }, 2500);
}
//function levelup that call when user finish level ,method make all div visible and rerandom imgpos
function levelUp() {
    if (soundMuted === false) {
        var audio = new Audio('sound/ff.mp3');
        audio.play();
    }
    var allCard = document.querySelectorAll('.card');
    for (var pp = 0; pp < allCard.length; pp++) {
        if (allCard[pp].className === "card flipped") {
            allCard[pp].classList.toggle('flipped');
        }
    }
    var allDiv = document.querySelectorAll('.container');
    for (var p = 0; p < allDiv.length; p++) {

        allDiv[p].style.opacity = "" + 1;

    }
    imgClicked = [];
    match = 0;
    if (levelNum < 5) {
        imagePos = new Array();
        createImagePosition();
    }
    if (levelNum === 5) {
        appendHTmlLevelFive();
        imagePos = new Array();
        createImagePosition();
    }
    else if (levelNum > 5) {
        gameOver();
    }
}
//function save storage
function save(name1, value1) {
    // Store
    localStorage.setItem(name1, value1);
}
//function get storage
function get(name2) {
    // Retrieve
    return localStorage.getItem(name2);
}
//function matchImgTrue
function matchImgTrue(listImg) {
    match++;
    setTimeout(function () {
        score += 100;
        spanScore.innerText = score;
        if (listImg.length === 3) {
            hideTarget(listImg[0], listImg[1], listImg[2]);
        }
        else {
            hideTarget(listImg[0], listImg[1]);
        }
        spanScore.innerText = score;
    }, 1000);
    if (match == 8) {
        //new game with level++
        levelNum++;
        match = 0;
        setTimeout(function () {
            if (levelNum <= 5) {
                document.getElementById('levelnum').innerText = levelNum;
                msgLeveling(levelNum);
            }
            levelUp();
        }, 3000);
    }
}
//function matchImgFalse
function matchImgFalse(listImg2) {
    chances--;
    spanChances.innerText = chances;
    setTimeout(function () {
        listImg2[0].parentNode.parentNode.classList.toggle('flipped');
    }, 750);
    setTimeout(function () {
        listImg2[1].parentNode.parentNode.classList.toggle('flipped');
    }, 750);
    if (listImg2.length === 3) {
        setTimeout(function () {
            listImg2[2].parentNode.parentNode.classList.toggle('flipped');
        }, 750);
    }
    //check that user have chanec to countine game or game over
    if (chances <= 0) {
         setTimeout(function () {
                gameOver();
            }, 1000);
    }
}
//function 'msgLeveling' take levelnumber then show to user message about level 
function msgLeveling(k) {
    switch (k) {
        case 1:
            document.getElementById('msgbetween').innerHTML = '<h3>Level 1</h3><p>Match<br/>Countries Flags<br/>Vs.<br/>Countries Flags</p>';
            break;
        case 2:
            document.getElementById('msgbetween').innerHTML = '<h3>Level 2</h3><p>Match<br/>Countries Flags<br/>Vs.<br/>Countries Names</p>';
            break;
        case 3:
            document.getElementById('msgbetween').innerHTML = '<h3>Level 3</h3><p>Match<br/>Countries Flags<br/>Vs.<br/>Countries Capitals</p>';
            break;
        case 4:
            document.getElementById('msgbetween').innerHTML = '<h3>Level 4</h3><p>Match<br/>Countries Names<br/>Vs.<br/>Countries Capitals</p>';
            break;
        case 5:
            document.getElementById('msgbetween').innerHTML = '<h3>Level 5</h3><p>Match<br/>Countries Flags<br/>Vs.<br/>Countries Names<br/>Vs.<br/>Countries Capitals</p>';
            break;
        default:

    }
    document.getElementById('game').style.display = "none";
    document.getElementById('msgbetween').style.display = "block";
    setTimeout(function () {
        document.getElementById('game').style.display = "block";
        document.getElementById('msgbetween').style.display = "none";
    }, 3500);
}
//function "checkTarget" check is two images are equal in src or not to filp images back to default
function checkTarget(listImgClicked) {
    var tt1 = listImgClicked[listImgClicked.length - 1].src;
    var tt2 = listImgClicked[listImgClicked.length - 2].src;
    tt1 = tt1.slice(-6);
    tt2 = tt2.slice(-6);
    if (tt1 === tt2) {
        if (levelNum < 5) {
            matchImgTrue(listImgClicked);
        }
        else if (levelNum===5) {
            return true;
        }
    }
    else {
        matchImgFalse(listImgClicked);
    }
}
//reset game 
function reNewGame() {
    try {
        var rowss = document.getElementById('playground').getElementsByTagName("tr").length;
        document.getElementById('infoHeader').style.height = '760px';
        if (rowss === 6) {
            document.getElementById('playground').deleteRow(5);
            document.getElementById('playground').deleteRow(4);
            imagePos = new Array();
            createImagePosition();

        }
        var allCard = document.getElementsByClassName('card');
        for (var pp = 0; pp < allCard.length; pp++) {
            if (allCard[pp].className === "card flipped") {
                allCard[pp].classList.toggle('flipped');
            }
        }
    }
    catch  {
        //nothing
    }
}
//function level ==> user choose difficulty
function level(e) {
    switch (e.id) {
        case "easy":
            chances = 40;
            break;
        case "medium":
            chances = 30;
            break;
        case "hard":
            chances = 20;
            break;
        default:

    }
    levelNum = 1;
    imgClicked = [];
    imagePos = new Array();
    createImagePosition();
    userName = document.getElementById('name').value;
    if (userName === "") {
        document.getElementById('name').focus();
    }
    else {
        score = 0;
        document.getElementById('difficulity').style.display = "none";
        document.getElementById('game').style.display = "block";
        document.getElementById('chances').innerText = chances;
        document.getElementById('score').innerText = score;
        msgLeveling(levelNum);
        if (soundMuted === false) {
            var audio = new Audio('sound/ff.mp3');
            audio.play();
        }
    }
    reNewGame();
}
//function click call only in by function runFivr in level 5 
function click(img) {
    var imgTempIdAsNumber = parseInt(img.id.slice(-2));
    if (imgTempIdAsNumber < 16) {
        img.parentNode.nextElementSibling.childNodes[1].src = y;
        imgClicked.push(img.parentNode.nextElementSibling.childNodes[1]);
    }
    else {
        debugger
        img.parentNode.nextElementSibling.childNodes[0].src = y;
        imgClicked.push(img.parentNode.nextElementSibling.childNodes[0]);
    }
}
//function "run" get two img has been clicked and pass them to check method
function run(target) {
    debugger
    if (clickNum === 0) {
        y = "";
        switch (target.id) {
            case "img00":
                y = matchArray(0);
                break;
            case "img01":
                y = matchArray(1);
                break;
            case "img02":
                y = matchArray(2);
                break;
            case "img03":
                y = matchArray(3);
                break;
            case "img04":
                y = matchArray(4);
                break;
            case "img05":
                y = matchArray(5);
                break;
            case "img06":
                y = matchArray(6);
                break;
            case "img07":
                y = matchArray(7);
                break;
            case "img08":
                y = matchArray(8);
                break;
            case "img09":
                y = matchArray(9);
                break;
            case "img10":
                y = matchArray(10);
                break;
            case "img11":
                y = matchArray(11);
                break;
            case "img12":
                y = matchArray(12);
                break;
            case "img13":
                y = matchArray(13);
                break;
            case "img14":
                y = matchArray(14);
                break;
            case "img15":
                y = matchArray(15);
                break;
            case "img16":
                y = matchArray(16);
                break;
            case "img17":
                y = matchArray(17);
                break;
            case "img18":
                y = matchArray(18);
                break;
            case "img19":
                y = matchArray(19);
                break;
            case "img20":
                y = matchArray(20);
                break;
            case "img21":
                y = matchArray(21);
                break;
            case "img22":
                y = matchArray(22);
                break;
            case "img23":
                y = matchArray(23);
                break;
            default:
        }
        click(target);
        clickNum++;
    }
    else if (clickNum === 1) {
        if (target.id !== imgClicked[0].id) {
            y = "";
            switch (target.id) {
                case "img00":
                    y = matchArray(0);
                    break;
                case "img01":
                    y = matchArray(1);
                    break;
                case "img02":
                    y = matchArray(2);
                    break;
                case "img03":
                    y = matchArray(3);
                    break;
                case "img04":
                    y = matchArray(4);
                    break;
                case "img05":
                    y = matchArray(5);
                    break;
                case "img06":
                    y = matchArray(6);
                    break;
                case "img07":
                    y = matchArray(7);
                    break;
                case "img08":
                    y = matchArray(8);
                    break;
                case "img09":
                    y = matchArray(9);
                    break;
                case "img10":
                    y = matchArray(10);
                    break;
                case "img11":
                    y = matchArray(11);
                    break;
                case "img12":
                    y = matchArray(12);
                    break;
                case "img13":
                    y = matchArray(13);
                    break;
                case "img14":
                    y = matchArray(14);
                    break;
                case "img15":
                    y = matchArray(15);
                    break;
                case "img16":
                    y = matchArray(16);
                    break;
                case "img17":
                    y = matchArray(17);
                    break;
                case "img18":
                    y = matchArray(18);
                    break;
                case "img19":
                    y = matchArray(19);
                    break;
                case "img20":
                    y = matchArray(20);
                    break;
                case "img21":
                    y = matchArray(21);
                    break;
                case "img22":
                    y = matchArray(22);
                    break;
                case "img23":
                    y = matchArray(23);
                    break;
                default:
            }
            if (levelNum < 5) {
                click(target);
                clickNum = 0;
                checkTarget(imgClicked);
                imgClicked = new Array();
            }
            else if (levelNum === 5) {
                click(target);
                if (checkTarget(imgClicked)) {
                    clickNum++;
                }
                else {
                    clickNum = 0;
                    imgClicked = new Array();
                }
            }
        }
    }
    else if (clickNum === 2 && levelNum === 5) {
        y = "";
        switch (target.id) {
            case "img00":
                y = matchArray(0);
                break;
            case "img01":
                y = matchArray(1);
                break;
            case "img02":
                y = matchArray(2);
                break;
            case "img03":
                y = matchArray(3);
                break;
            case "img04":
                y = matchArray(4);
                break;
            case "img05":
                y = matchArray(5);
                break;
            case "img06":
                y = matchArray(6);
                break;
            case "img07":
                y = matchArray(7);
                break;
            case "img08":
                y = matchArray(8);
                break;
            case "img09":
                y = matchArray(9);
                break;
            case "img10":
                y = matchArray(10);
                break;
            case "img11":
                y = matchArray(11);
                break;
            case "img12":
                y = matchArray(12);
                break;
            case "img13":
                y = matchArray(13);
                break;
            case "img14":
                y = matchArray(14);
                break;
            case "img15":
                y = matchArray(15);
                break;
            case "img16":
                y = matchArray(16);
                break;
            case "img17":
                y = matchArray(17);
                break;
            case "img18":
                y = matchArray(18);
                break;
            case "img19":
                y = matchArray(19);
                break;
            case "img20":
                y = matchArray(20);
                break;
            case "img21":
                y = matchArray(21);
                break;
            case "img22":
                y = matchArray(22);
                break;
            case "img23":
                y = matchArray(23);
                break;
            default:
        }
        click(target);
        if (checkTarget(imgClicked)) {
            matchImgTrue(imgClicked);  
        }
        else {
        }
        imgClicked = new Array();
        clickNum = 0;
    }
}

//in Last level
////these method run only on level number five
//function call when user resach to level '5' that function write html to make game 4*6
function appendHTmlLevelFive() {
    document.getElementById('infoHeader').style.height = '865px';
    var tableLevelFive = document.getElementById('playground');
    var td1 = "<tr><td><section class=\"container\"><div class=\"card\"><div class=\"front\"><img id=\"img16\" src=\"images/hidden.png\" /></div><div class=\"back\"><img id=\"img" + 66 + "\" /></div></div></section></td>";
    var td2 = "<td><section class=\"container\"><div class=\"card\"><div class=\"front\"><img id=\"img17\" src=\"images/hidden.png\" /></div><div class=\"back\"><img id=\"img" + 67 + "\" /></div></div></section></td>";
    var td3 = "<td><section class=\"container\"><div class=\"card\"><div class=\"front\"><img id=\"img18\" src=\"images/hidden.png\" /></div><div class=\"back\"><img id=\"img" + 68 + "\" /></div></div></section></td>";
    var td4 = "<td><section class=\"container\"><div class=\"card\"><div class=\"front\"><img id=\"img19\" src=\"images/hidden.png\" /></div><div class=\"back\"><img id=\"img" + 69 + "\" /></div></div></section></td></tr>";
    var td5 = "<tr><td><section class=\"container\"><div class=\"card\"><div class=\"front\"><img id=\"img20\" src=\"images/hidden.png\" /></div><div class=\"back\"><img id=\"img" + 70 + "\" /></div></div></section></td>";
    var td6 = "<td><section class=\"container\"><div class=\"card\"><div class=\"front\"><img id=\"img21\" src=\"images/hidden.png\" /></div><div class=\"back\"><img id=\"img" + 71 + "\" /></div></div></section></td>";
    var td7 = "<td><section class=\"container\"><div class=\"card\"><div class=\"front\"><img id=\"img22\" src=\"images/hidden.png\" /></div><div class=\"back\"><img id=\"img" + 72 + "\" /></div></div></section></td>";
    var td8 = "<td><section class=\"container\"><div class=\"card\"><div class=\"front\"><img id=\"img23\" src=\"images/hidden.png\" /></div><div class=\"back\"><img id=\"img" + 73 + "\" /></div></div></section></td></tr>";
    tableLevelFive.innerHTML = tableLevelFive.innerHTML + td1 + td2 + td3 + td4 + td5 + td6 + td7 + td8;
}