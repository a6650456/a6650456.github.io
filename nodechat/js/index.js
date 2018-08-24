//var url = decodeURI(location.href).split('?')[1].split('&');
var chatContent = document.getElementsByClassName('chat-content')[0];
var editBox = document.getElementsByClassName('edit-box')[0];
var editButton = document.getElementsByClassName('edit-button')[0];
var userName = document.getElementsByClassName('user-name')[0];
var onlineCount = document.getElementsByClassName('online-count')[0];

//userName.innerHTML = url[1].split('=')[1];
var userImg = document.getElementsByClassName('user-img')[0];
//userImg.src = 'img/'+url[0].split('=')[1];
var logOut = document.getElementsByClassName('log-out')[0];

//绑定按钮事件
editButton.addEventListener('click',sendMessage);
logOut.addEventListener('click',closePage);

document.onkeydown = function(event) {
    var e = event || window.event;
    if(e && e.keyCode === 13) {
        if(editBox.value!=='') {
            editButton.click();
        }
    }
};

function closePage() {
    //获得用户代理的值
    var userAgent = navigator.userAgent;
    //使用火狐和谷歌时候
    if(userAgent.indexOf("Firefox")!=-1 || userAgent.indexOf("Chrome")!=-1)
    {
        window.location.href = "about:blank";
    }
    else 
    {
        window.open = null;
        window.open("","_self");
        window.close();
    }
}
//创建浏览器端的 socket.io对象
var socket = io();

socket.on('connected',function(onlineCount){
    console.log(onlineCount);
    onlineCount.innerHTML = 'Online:'+onlineCount;
});

//绑定生成他机生成的聊天信息
socket.on('message',function(information){
   // if(information.name!=userName.textContent) {
        createrOtherMessage(information);
   // }
});

function sendMessage() {
    if(editBox.value!='') {
        var myInformation = {
            name:userName.textContent,
            chatContent:editBox.value,
            img:userImg.src
        };
        //发送这些消息到服务端
        socket.emit('message',myInformation);
        createMyMessage();
        editBox.value='';
    }
}
function createMyMessage() {
    var myMessageBox = document.createElement('div');
    myMessageBox.className = 'my-message-box';
    var messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    var text = document.createElement('span');
    text.innerHTML = editBox.value; 
    messageContent.appendChild(text);
    myMessageBox.appendChild(messageContent);

    var arrow = document.createElement('div');
    arrow.className = 'message-arrow';
    myMessageBox.appendChild(arrow);

    var userInformation = document.createElement('div');
    userInformation.className = 'user-information';
    var userChatImg = document.createElement('img');
    userChatImg.className = 'user-chat-img';
    userChatImg.src = userImg.src;
    var userChatName = document.createElement('div');
    userChatName.className = 'user-chat-name';
    userChatName.innerHTML = userName.textContent;
    userInformation.appendChild(userChatImg);
    userInformation.appendChild(userChatName);
    myMessageBox.appendChild(userInformation);

    chatContent.appendChild(myMessageBox);
    chatContent.scrollTop = chatContent.scrollHeight;

}
function createrOtherMessage(informaition) {
    var otherMessageBox = document.createElement('div');
    otherMessageBox.className = 'other-message-box';
    
    var otherUserInformation = document.createElement('div');
        otherUserInformation.className = 'other-user-informaition';
    var otherUserChatImg = document.createElement('img');
        otherUserChatImg.className = 'other-chat-img';
        otherUserChatImg.src = informaition.img;
    var otherUserChatName = document.createElement('span');
        otherUserChatName.className = 'other-chat-name';
        otherUserChatName.innerHTML = informaition.name;
        otherUserInformation.appendChild(otherUserChatImg);
        otherUserInformation.appendChild(otherUserChatName);
        otherMessageBox.appendChild(otherUserInformation);

    var otherMessageArrow = document.createElement('div');
        otherMessageArrow.className = 'other-message-arrow';
        otherMessageBox.appendChild(otherMessageArrow);
    var otherMessageContent = document.createElement('div');
        otherMessageContent.className = 'other-message-content';
    var text = document.createElement('span');
        text.innerHTML = informaition.chatContent;
        otherMessageContent.appendChild(text);
        otherMessageBox.appendChild(otherMessageContent);

        chatContent.appendChild(otherMessageBox);
      chatContent.scrollTop = chatContent.scrollHeight;

}