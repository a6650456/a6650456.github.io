var imgArray =['1','2','3','4','5'];

//获取html里相关文件
 var leftArrow = document.getElementsByClassName('left-arrow')[0];
 var rightArrow = document.getElementsByClassName('right-arrow')[0];
 var userName = document.getElementsByClassName('user-name')[0];
 var loginButton = document.getElementsByClassName('login-button')[0];
 var errorMessage = document.getElementsByClassName('error-message')[0];

 leftArrow.addEventListener('click',function(){
    imgArray.unshift(imgArray[imgArray.length-1]);  //向数组开头添加结尾的数    
    imgArray.pop();
    carouselImg();
});
 rightArrow.addEventListener('click',function(){
    imgArray.push(imgArray[0]);   
    imgArray.shift();
    carouselImg();
 });

function carouselImg() {
    for(var count = 0;count<imgArray.length;count++) {
        document.getElementsByName('img')[count].src = 'img/'+imgArray[count]+'.png';
        document.getElementsByName('img')[count].alt = imgArray[count]+'.png';
    }
}
loginButton.addEventListener('click',function(){
    if(userName.value ==='') {
        errorMessage.innerHTML = 'please type your name';
        errorMessage.style.visibility = 'visible';
    } else {
        window.location.href = 
            encodeURI('chat.html?selectpicture='+document.getElementsByClassName('p3')[0].alt+
        '&username='+userName.value);
    }
});
document.onkeydown = function(event) {

    var e = event || window.event;
    if(e&& e.keyCode === 13) {
        loginButton.click();
    }
    
}