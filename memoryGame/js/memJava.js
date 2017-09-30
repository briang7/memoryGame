
// array of unicode characters
var uni = ["&#931;", "&#916;", "&#920;", "&#936;", "&#937;", "&#974;", "&#1046;", "&#960;"];

// This is a lot simpler way of duplicating the unicode characters
var duplicate = uni.concat(uni);

// // duplicates array of unicode charachters
// uni.duplicate = function() {
//     for(var i = 0; i < uni.length; i++) {
//         for(var e = 0; e < 2; e++) {
//             duplicate.push(uni[i]);
//         };
//     };
//     console.log(duplicate)
// };

// uni.duplicate();

var box = [];
//randomizes the duplicated array of unicode charachters and append
//them into the array of boxes.  Also hidding them with display:none. 
var boxes = function() {
     var num = [];
    while(num.length < 16) {
        var rand = 0 + Math.floor(Math.random() * 16);   
        if(num.indexOf(rand) < 0){
            num.push(rand);
            console.log(num)
        };
    };
    for(var i = 0; i < 16; i++) {
        box.push($("#box" + i));
        box[i].css({"display": "none", "font-size": "10vw"});
        box[i].append(duplicate[num[i]]);
    };
    
    console.log(box);
};

boxes();

// I have broken up my big click function into smaller functions.

var sec = 0;

function pad ( val ) { return val > 9 ? val : "0" + val; }
setInterval( function(){
    $(".sec").html("Time " + pad(++sec%1000));
}, 1000);


var reStart = function() {
    $(".restart").click(function() {
    location.reload()
});
};

reStart();


var count = 0;
var moves = 0;

var move = function(){
    if(count > 1){
        moves+=1
        $(".yup").html(moves);
        count = 0
        if(moves === 10){
            $(".star").html("&#9734; &#9734; &#9733;");
        } else if(moves === 14){
            $(".star").html("&#9734; &#9733; &#9733;");
        };
    };
};

var modal = function(){
    $(".secs").html("It Took You " + sec + " Seconds to Win!!");
    $(".clicks").html("It Only Took You " + moves + " Moves!"); 
    $(".myModal").fadeIn("slow");
    $(".restart").click(function() {
        $(".myModal").fadeOut("slow");
        $(".inner").fadeOut("slow");
        location.reload()
    });
};

var splice0 = function(){
    names.splice(0);
    boxOpen.splice(0);
    boxX.splice(0);
};

var boxOpen = [];
var boxX = [];
var names = [];

var click = function() {
    var winCount = 0; 
    for(var i = 0; i < 16; i++) {
        box[i].parent().click(function() {      
            count +=1
            var that = $(this).children();
            var thing = $(this);
            var className = $(this).attr('class');
            names.push(className);
            boxX.push(thing);
            boxOpen.push(that.text());
            if(names[0] === names[1]){
                names.splice(1);
                boxOpen.splice(1);
                boxX.splice(1);
            } else if(names[0] != names[1]){
                that.toggle('slow');         
                if(boxOpen.length > 1){
                    if(boxOpen[0] != boxOpen[1]){
                        boxX[0].children().delay(1000).toggle('slow');
                        that.delay(500).toggle('slow');
                        move();
                        splice0();
                    } else if(boxOpen[0] === boxOpen[1]){
                        if(names[0] != names[1]){
                            thing.delay(1000).toggle('slow');
                            boxX[0].delay(1000).toggle('slow');
                            move();
                            splice0();
                            winCount += 1;
                            if(winCount === 8) {
                                modal();
                            };
                        };             
                    };
                };
            };
        });
    };
    
    
};

click()






