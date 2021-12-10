song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
song1_status="";
score_leftWrist=0;
function setup() {
    canvas=createCanvas(550,550);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("poseNet is Initialized");
}
function draw() {
    image(video,0,0,550,550)
    song1_status=song1.isPlaying();
    fill("#0501FF");
    stroke("#0501FF");
    if(score_leftWrist > 0.2) {
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if (song1_status ==false) {
            song1.play();
            document.getElementById("song").innerHTML="Playing Peter Pan";
        }
    }
}
function preload() {
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function play() {
    song1.play();
    song1.setVolume(0.5);
    song1.rate(1);
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        score_leftWrist=results[0].pose.keypoints[9].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX+",leftWristY ="+ leftWristY);
        
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWritsX = " + rightWristX+",rightWristY ="+ rightWristY);
    }
}