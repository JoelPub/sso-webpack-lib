import _ from 'lodash';
import numRef from './ref.json';

export function numToWord(num) {
  return _.reduce(
    numRef,
    (accum, ref) => {
      return ref.num === num ? ref.word : accum;
    },
    ''
  );
}

export function sendMsg(frame , target, msg) {
  frame.postMessage(JSON.stringify({ name: 'message', value: '收到信息：' + msg + ' --from sso port！😨' }), target);
}

export function login(frame , target) {
  setCookie('current-user', JSON.stringify({ username: input.value ? input.value : 'blank', password: input.value ? input.value : 'blank', remember: false }), 1);
  var data = getCookie('current-user');
  var obj = data ? { name: 'login', value: JSON.stringify({ username: JSON.parse(data).username }) } : { name: 'logout' };
  frame.postMessage(JSON.stringify(obj), target);
}

export function logout(frame , target) {
  setCookie('current-user', JSON.stringify({}), 0);
  frame.postMessage(JSON.stringify({ name: 'logout' }), target);
}
export function attachEvent(frame , target, span,btn4) {
  window.addEventListener('message', function(event){receiveMessage(event,frame , target, span,btn4)}, false);
  var user = getCookie('current-user');
  //if(!user||typeof(JSON.parse(user)) !=='object') {
  setTimeout(function () {
      frame.postMessage(JSON.stringify({ name: 'check' }), target);
  }, 3000);
  // span.innerHTML ='logout, need login';
  //}
  //else {
  // span.innerHTML =typeof(JSON.parse(user).value) !=='object'?JSON.parse(JSON.parse(user).value).username: JSON.parse(user).value.username;
  //}
  btn4.style.display = 'none';
}
export function attachEventIframe(parentWin,input,span,btn,btn1) {
  window.addEventListener('message', function(event){receiveMessageIframe(event,parentWin,input,span,btn,btn1)} , false);
  document.querySelector('#allow-cookies').style.display = 'none';
  document.querySelector('#allow-cookies').addEventListener('click', function(){makeRequestWithUserGesture(parentWin,input,span,btn)});
  if(btn1) {
    btn1.onclick = function () {
        setCookie('test', JSON.stringify({}), 1);
        // var urlParams = new URLSearchParams(window.location.search);
        // window.location.href=document.referrer+urlParams.get('backpath');
    }
  }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function setCookieIframe(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + ";SameSite=None; Secure";
}

function receiveMessage(event,frame , target, span,btn4) {
  if (event.origin !== target) {
      return false
  }
  var data = event.data;
  if (JSON.parse(data).name === 'login') {
      setCookie('current-user', data, 1);
      var user = getCookie('current-user');
      if (!user || typeof (JSON.parse(user)) !== 'object') {
          span.innerHTML = 'logout, need login';
      }
      else {
          span.innerHTML = typeof (JSON.parse(user).value) !== 'object' ? ('hello ' + JSON.parse(JSON.parse(user).value).username) : ('hello ' + JSON.parse(user).value.username);
      }
  }
  else if (JSON.parse(data).name === 'logout') {
      setCookie('current-user', JSON.stringify({}), 0);
      span.innerHTML = 'logout, need login';
  }
  else if (JSON.parse(data).name === 'popup') {
        btn4.style.display='inline-block';
  }
  else {
      span.innerHTML = data;
  }

}
function receiveMessageIframe(event,parentWin,input,span,btn,btn1) {
    //if (event.origin !== 'http://localhost:3000') {
    if (event.origin !== 'http://localhost:3000'&&
        event.origin !== 'http://localhost:3002'&&
        event.origin !== 'http://localhost:3003'&&
        event.origin !== 'http://localhost:3004'&&
        event.origin !== 'http://18.215.228.3:3000'&&
        event.origin !== 'http://18.215.228.3:3002'&&
        event.origin !== 'http://18.215.228.3:3003'&&
        event.origin !== 'http://18.215.228.3:3004'
    ) {
        return false
    }
    var data = JSON.parse(event.data);
    if (data.name == 'login') {
        setCookieIframe('current-user', data.value, 1);
        if(getCookie('current-user')) {//no ios
            span.innerHTML = data.name;
            parentWin.postMessage(JSON.stringify({ name: 'login', value: data.value }), event.origin);
        }
        else {//ios
            setCookie('current-user', data.value, 1);
            if(getCookie('current-user')) {//ios with permit
                span.innerHTML = data.name;
                parentWin.postMessage(JSON.stringify({ name: 'login', value: data.value }), event.origin);
            }
            else {//ios without permit
                document.querySelector('#post-message').dataset.cookie=JSON.stringify(data);
                document.querySelector('#post-message').dataset.origin=event.origin;
                document.querySelector('#post-message').dataset.type=data.name;
                document.querySelector('#allow-cookies').style.display = 'block';
            }
        }
    }
    else if (data.name == 'logout') {
        setCookieIframe('name', data.name, 1);
        if(getCookie('name')) {//no ios
            setCookieIframe('name', JSON.stringify({}), 0);
            setCookieIframe('current-user', JSON.stringify({}), 0);
            parentWin.postMessage(JSON.stringify({ name: 'logout' }), event.origin);
        }
        else {//ios
            setCookie('name', data.name, 1);
            if(getCookie('name')) {// ios with permit
                setCookie('name', JSON.stringify({}), 0);
                setCookie('current-user', JSON.stringify({}), 0);
                parentWin.postMessage(JSON.stringify({ name: 'logout' }), event.origin);
            }
            else {//ios without permit
                document.querySelector('#post-message').dataset.cookie=JSON.stringify({});
                document.querySelector('#post-message').dataset.origin=event.origin;
                document.querySelector('#post-message').dataset.type=data.name;
                document.querySelector('#allow-cookies').style.display = 'block';
            }
        }
    }
    else if (data.name == 'message') {
        //parentWin.postMessage('我收到你的信息了😀--from 3001 port', 'http://localhost:3000/');
        parentWin.postMessage(JSON.stringify({ name: 'message', value: '我收到你的信息了😀--from sso port' }), event.origin);
    }
    else {
        span.innerHTML = data.name;
        setCookieIframe('name', data.name, 1);
        if(getCookie('name')) {//no ios
            setCookieIframe('name', JSON.stringify({}), 0);
            var data = getCookie('current-user');
            var obj = data ? { name: 'login', value: (JSON.parse(data).value?JSON.parse(data).value:JSON.parse(data)) } : { name: 'logout' };
            parentWin.postMessage(JSON.stringify(obj), event.origin);
        }
        else {//ios

    var promise = document.requestStorageAccess();
    promise.then(
        function () {
        // Storage access was granted.
        // Check whether the user is logged in.
        // If not, do a popup to log the user in.
            console.log('hasStorageAccess');
            btn1.style.display = 'none';
            setCookie('name', data.name, 1);
            if(getCookie('name')) {//ios with permit
                var data = getCookie('current-user');
                setCookie('name', JSON.stringify({}), 0);
                var obj = data ? { name: 'login', value: (JSON.parse(data).value?JSON.parse(data).value:JSON.parse(data)) } : { name: 'logout' };
                parentWin.postMessage(JSON.stringify(obj), event.origin);
            }
            else {//ios without  permit
                document.querySelector('#allow-cookies').style.display = 'block';
                document.querySelector('#post-message').dataset.origin=event.origin;
                document.querySelector('#post-message').dataset.type=data.name;
                parentWin.postMessage(JSON.stringify({ name: 'popup' }), event.origin);
            }
        },
        function () {
        // Storage access was denied.
            console.log('Rejected');
        }
    );

        }
    }
}
function makeRequestWithUserGesture(parentWin,input,span,btn) {
    var promise = document.requestStorageAccess();
    promise.then(
        function () {
        // Storage access was granted.
        // Check whether the user is logged in.
        // If not, do a popup to log the user in.
            console.log('hasStorageAccess');
            document.querySelector('#allow-cookies').style.display = 'none';
            if(document.querySelector('#post-message').dataset.type=='login') {
                setCookie('current-user', JSON.parse(document.querySelector('#post-message').dataset.cookie).value, 1);
                if(getCookie('current-user')) {
                    span.innerHTML = document.querySelector('#post-message').dataset.type;
                    parentWin.postMessage(JSON.stringify({ name: 'login', value: getCookie('current-user') }), document.querySelector('#post-message').dataset.origin);
                }
                // parentWin.postMessage(JSON.stringify({ name: 'login', value: JSON.parse(document.querySelector('#post-message').dataset.cookie).value }), document.querySelector('#post-message').dataset.origin);
            }
            else if(document.querySelector('#post-message').dataset.type=='check') {
                var data = getCookie('current-user');
                var obj = data ? { name: 'login', value: (JSON.parse(data).value?JSON.parse(data).value:JSON.parse(data)) } : { name: 'logout' };
                parentWin.postMessage(JSON.stringify(obj), document.querySelector('#post-message').dataset.origin);
            }
            else if(document.querySelector('#post-message').dataset.type=='logout') {
                setCookie('current-user', JSON.stringify({}), 0);
                parentWin.postMessage(JSON.stringify({ name: 'message', value: 'logout' }), document.querySelector('#post-message').dataset.origin);
            }
        },
        function () {
        // Storage access was denied.
            console.log('Rejected');
        }
    );
};