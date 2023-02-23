baby = "";
objects = [];
Status = "";
alarm = "";
function preload() {
    alarm = loadSound("sound.mp3");
}
function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    cam = createCapture(VIDEO);
    cam.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";


}
function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
function draw() {
    image(cam, 0, 0, 500, 400);
    objectDetector.detect(cam, gotResults);
    for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Object Is Detected";
        baby = objects[0].label;
        stroke("red");
        noFill();
        rect(objects[0].x - 300, objects[0].y - 100, objects[0].width - 200, objects[0].height - 300);
        text(baby, objects[0].x - 295, objects[0].y - 90);
        if (baby == "person") {
            document.getElementById("status").innerHTML = "Baby Is Detected";
            alarm.stop();
            console.log("stoped");
        }
        else {
            document.getElementById("status").innerHTML = "Baby Is Not Detected";
            alarm.play();
            console.log("play");
        }


    }
    if (objects.length == 0) {
        document.getElementById("status").innerHTML = "Baby Is Not Detected";
        alarm.play();
        console.log("play");
    }
}
function modelLoaded() {
    console.log("model Loaded");
}
