

      var baseURL = "https://global-dashboard-1.webflow.io/";
      var buildUrl = "https://mburlinson.github.io/Interactive/Build";
      var globalunityinstance = null;
      var loaderUrl = buildUrl + "/ISA.loader.js";
      var config = {
        dataUrl: buildUrl + "/ISA.data.unityweb",
        frameworkUrl: buildUrl + "/ISA.framework.js.unityweb",
        codeUrl: buildUrl + "/ISA.wasm.unityweb",
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
        if (txt.trim() == "BTrain") {
          document.getElementById("iframe99").src= baseURL + "/building/BTrain";
        }
        if (txt.trim() == "BWest") {
          document.getElementById("iframe99").src= baseURL + "/building/BWest";
        }

       
        },2500);
       }
   }



   var BTrainOn = false;
   var BWestOn = false;

  
   //

   function sendMessageToUnity0() {
      if (BTrainOn == false){
         BTrainOn = true;
      }
      else {
        BTrainOn = false;
      }
      globalunityinstance.SendMessage('Bridge','BTrainOn');
   }
   function sendMessageToUnity1() {
      if (BWestOn == false){
         BWestOn = true;
      }
      else {
        BWestOn = false;
      }
      globalunityinstance.SendMessage('Bridge','BWestOn');
   }
   function sendMessageToUnityGoBack() {
      globalunityinstance.SendMessage('Bridge','GoBack');
   }
   
   /* not needed
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
  if ( $("#iframe99")[0].src.indexOf("BTrain") > 0){
   sendMessageToUnityGoBack();
  }
  if ( $("#iframe99")[0].src.indexOf("BWest") > 0){
   sendMessageToUnityGoBack();
  }
  $("#iframe99")[0].src ="";
}

$(document).ready(function(){
  $("#close-page").click(function(){ KillIframe(); });

  
   
   ////setTimeout(sendMessageToUnity0, 10000);
      

});