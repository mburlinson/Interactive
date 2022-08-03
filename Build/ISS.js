

      var baseURL = "https://global-dashboard-1.webflow.io/";
      var buildUrl = "https://mburlinson.github.io/Interactive/Build";
      var globalunityinstance = null;
      var loaderUrl = buildUrl + "/ISS.loader.js";
      var config = {
        dataUrl: buildUrl + "/ISS.data.unityweb",
        frameworkUrl: buildUrl + "/ISS.framework.js.unityweb",
        codeUrl: buildUrl + "/ISS.wasm.unityweb",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "Global Dashboard",
        productVersion: "1.1",
      };
      var container = document.querySelector("#unity-container");
      var canvas = document.querySelector("#unity-canvas");
      var loadingBar = document.querySelector("#unity-loading-bar");
      var progressBarFull = document.querySelector("#unity-progress-bar-full");
      var fullscreenButton = document.querySelector("#unity-fullscreen-button");
      var mobileWarning = document.querySelector("#unity-mobile-warning");


      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        container.className = "unity-mobile";
        // Avoid draining fillrate performance on mobile devices,
        // and default/override low DPI mode on mobile browsers.
        config.devicePixelRatio = 1;
        mobileWarning.style.display = "block";
        setTimeout(() => {
          mobileWarning.style.display = "none";
        }, 5000);
      } else {
     //  canvas.style.width = "1280px";
     //  canvas.style.height = "720px";
      }
      loadingBar.style.display = "block";

      var script = document.createElement("script");
      script.src = loaderUrl;
      script.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
          progressBarFull.style.width = 100 * progress + "%";
        }).then((unityInstance) => {
          loadingBar.style.display = "none";
          globalunityinstance = unityInstance;
          //fullscreenButton.onclick = () => {
           //unityInstance.SetFullscreen(1);
          //};
        }).catch((message) => {
          alert(message);
        });
      };
      document.body.appendChild(script);
 

  function receiveMessageFromUnity(txt) {

					
     if ((txt.trim().indexOf("") >= 0) || (txt.trim().indexOf("") >= 0)  ){
      setTimeout(function(){
        $("#page-block").show();
        if (txt.trim() == "B109") {
          document.getElementById("iframe99").src= baseURL + "/building/b109";
        }
        if (txt.trim() == "B110") {
          document.getElementById("iframe99").src= baseURL + "/building/b110";
        }
        if (txt.trim() == "B112") {
          document.getElementById("iframe99").src= baseURL + "/building/b112";
        }
        if (txt.trim() == "B140") {
          document.getElementById("iframe99").src= baseURL + "/building/b140";
        }

       
        },4000);
       }
   }



   var b109_on = false;
   var b110_on = false;
   var b112_on = false;
   var b140_on = false;
  
   //

   function sendMessageToUnity0() {
      if (b109_on == false){
      	b109_on = true;
      }
      else {
        b109_on = false;
      }
      globalunityinstance.SendMessage('Bridge','B109on');
   }
   function sendMessageToUnity1() {
      if (b110_on == false){
         b110_on = true;
      }
      else {
        b110_on = false;
      }
      globalunityinstance.SendMessage('Bridge','B110on');
   }
   function sendMessageToUnity2() {
      if (b112_on == false){
         b112_on = true;
      }
      else {
        b112_on = false;
      }
      globalunityinstance.SendMessage('Bridge','B112on');
   }
   function sendMessageToUnity3() {
      if (b140_on == false){
         b140_on = true;
      }
      else {
        b140_on = false;
      }
      globalunityinstance.SendMessage('Bridge','B140on');
   }
   function sendMessageToUnityGoBack() {
      globalunityinstance.SendMessage('Bridge','GoBack');
   }
   
   /*
   function sendMessageToUnityCloseAll() {
////      globalunityinstance.SendMessage('Bridge','CloseAll');
        if (b109_on == true) {
          $("#B109")[0].click();
        }
        if (b110_on == true) {
          $("#B110")[0].click();
        }
        if (b112_on == true) {
          $("#B112")[0].click();
        }
        if (b140_on == true) {
          $("#B140")[0].click();
        }
       
   }
      */ 

function KillIframe(){
  if ( $("#iframe99")[0].src.indexOf("B109") > 0){
  	sendMessageToUnityGoBack();
  }
  if ( $("#iframe99")[0].src.indexOf("B110") > 0){
  	sendMessageToUnityGoBack();
  }
  if ( $("#iframe99")[0].src.indexOf("B112") > 0){
  	sendMessageToUnityGoBack();
  }
   if ( $("#iframe99")[0].src.indexOf("B140") > 0){
   sendMessageToUnityGoBack();
  }
  $("#iframe99")[0].src ="";
}

$(document).ready(function(){
  $("#close-page").click(function(){ KillIframe(); });

  
   
   ////setTimeout(sendMessageToUnity0, 10000);
      

});