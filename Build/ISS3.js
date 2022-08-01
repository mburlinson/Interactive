

      var baseURL = "https://global-dashboard-1.webflow.io/";
      var buildUrl = "https://mburlinson.github.io/Interactive/Build";
      var globalunityinstance = null;
      var loaderUrl = buildUrl + "/ISS3.loader.js";
      var config = {
        dataUrl: buildUrl + "/ISS3.data.unityweb",
        frameworkUrl: buildUrl + "/ISS3.framework.js.unityweb",
        codeUrl: buildUrl + "/ISS3.wasm.unityweb",
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
 
    ///this section helps with the hover phase cards.

   function receiveMessageFromUnity(txt) {
     
        if (txt.trim() == "over0") {
          $("#phasecard0show")[0].click();
          }
       if (txt.trim() == "out0") {
          $("#phasecard0hide")[0].click();
          }
       if (txt.trim() == "over1") {
          $("#phasecard1show")[0].click();
          }
       if (txt.trim() == "out1") {
          $("#phasecard1hide")[0].click();
          }
       if (txt.trim() == "over2") {
          $("#phasecard2show")[0].click();
          }
       if (txt.trim() == "out2") {
          $("#phasecard2hide")[0].click();
          } 
       if (txt.trim() == "over3") {
          $("#phasecard3show")[0].click();
          }
       if (txt.trim() == "out3") {
          $("#phasecard3hide")[0].click();
          }    
       if (txt.trim() == "over4") {
          $("#phasecard4show")[0].click();
          }
       if (txt.trim() == "out4") {
          $("#phasecard4hide")[0].click();   
       	  }	
       if (txt.trim() == "over5") {
          $("#phasecard5show")[0].click();
          }
       if (txt.trim() == "out5") {
          $("#phasecard5hide")[0].click();   
       		}	
       if (txt.trim() == "over6") {
          $("#phasecard6show")[0].click();
          }
       if (txt.trim() == "out6") {
          $("#phasecard6hide")[0].click();   
       		} 
       if (txt.trim() == "over7") {
          $("#phasecard7show")[0].click();
          }
       if (txt.trim() == "out7") {
          $("#phasecard7hide")[0].click();   
       		} 
       if (txt.trim() == "over8") {
          $("#phasecard8show")[0].click();
          }
       if (txt.trim() == "out8") {
          $("#phasecard8hide")[0].click();   
       		}   
       if (txt.trim() == "over9") {
          $("#phasecard9show")[0].click();
          }
       if (txt.trim() == "out9") {
          $("#phasecard9hide")[0].click();   
       		}   
       if (txt.trim() == "over10") {
          $("#phasecard10show")[0].click();
          }
       if (txt.trim() == "out10") {
          $("#phasecard10hide")[0].click();   
       		}   
					
     if ((txt.trim().indexOf("Detail") >= 0) || (txt.trim().indexOf("Overview") >= 0)  ){
      setTimeout(function(){
        $("#page-block").show();
        if (txt.trim() == "b109") {
          document.getElementById("iframe99").src= baseURL + "/building/b109";
        }
        if (txt.trim() == "b110") {
          document.getElementById("iframe99").src= baseURL + "/building/b110";
        }
        if (txt.trim() == "b112") {
          document.getElementById("iframe99").src= baseURL + "/building/b112";
        }
        if (txt.trim() == "b140") {
          document.getElementById("iframe99").src= baseURL + "/building/b140";
        }

       // location.href="/page-2";
       //
        },4000);
       }
   }



   var b109_on = false;
   var b110_on = false;
   var b112_on = false;
   var b140_on = false;
   var phase_4_on = false;
   var phase_5_on = false;
   var phase_6_on = false;
   var phase_7_on = false;
   var phase_8_on = false;
   var phase_9_on = false;
   var phase_10_on = false;
   var phase_11_on = false;
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
      globalunityinstance.SendMessage('Bridge','b140on');
   }
   function sendMessageToUnityGoBack() {
      globalunityinstance.SendMessage('Bridge','GoBack');
   }
   /*
   function sendMessageToUnitydetail1() {
      globalunityinstance.SendMessage('bldg_f_1a','OnMouseDown');
   }
   function sendMessageToUnitydetail2() {
      globalunityinstance.SendMessage('bldg_f_2','OnMouseDown');
   }
   function sendMessageToUnitydetail2b() {
      globalunityinstance.SendMessage('bldg_f_2_b','OnMouseDown');
   }
   function sendMessageToUnitydetail3() {
      globalunityinstance.SendMessage('amc_future','OnMouseDown');
   }
   function sendMessageToUnitydetail4() {
      globalunityinstance.SendMessage('bldg_f_4','OnMouseDown');
   }
   function sendMessageToUnitydetail5() {
      globalunityinstance.SendMessage('bldg_f_5','OnMouseDown');
   }
   function sendMessageToUnitydetail6() {
      globalunityinstance.SendMessage('bldg_f_6','OnMouseDown');
   }
   function sendMessageToUnitydetail7() {
      globalunityinstance.SendMessage('bldg_f_7','OnMouseDown');
   }
   function sendMessageToUnitydetail8() {
      globalunityinstance.SendMessage('PH4abc','OnMouseDown');
   }
   function sendMessageToUnitydetail9() {
      globalunityinstance.SendMessage('bldg_f_9','OnMouseDown');
   }
   function sendMessageToUnitydetail10() {
      globalunityinstance.SendMessage('bldg_f_10','OnMouseDown');
   }
   */
   //
   function sendMessageToUnityCloseAll() {
////      globalunityinstance.SendMessage('Bridge','CloseAll');
        if (b109_on == true) {
          $("#b109")[0].click();
        }
        if (b110_on == true) {
          $("#b110")[0].click();
        }
        if (b112_on == true) {
          $("#b112")[0].click();
        }
        if (b140_on == true) {
          $("#b140")[0].click();
        }
        if (phase_4_on == true) {
          $("#phase-4-button")[0].click();
        }
        if (phase_5_on == true) {
          $("#phase-5-button")[0].click();
        }
        if (phase_6_on == true) {
          $("#phase-6-button")[0].click();
        }
        if (phase_7_on == true) {
          $("#phase-7-button")[0].click();
        }
        if (phase_8_on == true) {
          $("#phase-8-button")[0].click();
        }
        if (phase_9_on == true) {
          $("#phase-9-button")[0].click();
        }
        if (phase_10_on == true) {
          $("#phase-10-button")[0].click();
        }
        if (phase_11_on == true) {
          $("#phase-11-button")[0].click();
        }
        
   }
              function sendMessageToUnitySubwayOff() {
      globalunityinstance.SendMessage('Bridge','SubwayOff');
   }
              function sendMessageToUnityView1() {
      globalunityinstance.SendMessage('Bridge','View1');
   }
              function sendMessageToUnityView2() {
      globalunityinstance.SendMessage('Bridge','View2');
   }      
              function sendMessageToUnityView3() {
      globalunityinstance.SendMessage('Bridge','View3');
   }    
              function sendMessageToUnityView4() {
      globalunityinstance.SendMessage('Bridge','View4');
   }    
              function sendMessageToUnityView5() {
      globalunityinstance.SendMessage('Bridge','View5');
   }   
              function sendMessageToUnityView6() {
      globalunityinstance.SendMessage('Bridge','View6');
   } 
            function sendMessageToUnityOrbit() {
      globalunityinstance.SendMessage('Bridge','Orbit');
   }

//


function KillIframe(){
  if ( $("#iframe99")[0].src.indexOf("b109") > 0){
  	sendMessageToUnityGoBack();
  }
  if ( $("#iframe99")[0].src.indexOf("b110") > 0){
  	sendMessageToUnityGoBack();
  }
  if ( $("#iframe99")[0].src.indexOf("b112") > 0){
  	sendMessageToUnityGoBack();
  }
   if ( $("#iframe99")[0].src.indexOf("b140") > 0){
   sendMessageToUnityGoBack();
  }
  if ( $("#iframe99")[0].src.indexOf("east-end") > 0){
  	sendMessageToUnityGoBack();
  }
  if ( $("#iframe99")[0].src.indexOf("terrace-c") > 0){
  	sendMessageToUnityGoBack();
  }
  if ( $("#iframe99")[0].src.indexOf("j-block") > 0){
  	sendMessageToUnityGoBack();
  }
  if ( $("#iframe99")[0].src.indexOf("leesburg-pike") > 0){
  	sendMessageToUnityGoBack();
  }
  if ( $("#iframe99")[0].src.indexOf("lux-entry") > 0){
  	sendMessageToUnityGoBack();
  }
  if ( $("#iframe99")[0].src.indexOf("terrace-a") > 0){
  	sendMessageToUnityGoBack();
  }
  if ( $("#iframe99")[0].src.indexOf("pearl-parcel") > 0){
  	sendMessageToUnityGoBack();
  }
  if ( $("#iframe99")[0].src.indexOf("fashion-blvd") > 0){
  	sendMessageToUnityGoBack();
  }
  if ( $("#iframe99")[0].src.indexOf("overview") > 0){
    sendMessageToUnityGoBack();
  }
  $("#iframe99")[0].src ="";
}

$(document).ready(function(){
  $("#close-page").click(function(){ KillIframe(); });

  
   
   ////setTimeout(sendMessageToUnity0, 10000);
      

});