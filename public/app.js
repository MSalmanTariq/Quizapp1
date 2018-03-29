var usrnm ;
var quizname;
var quiznumber;

function signup_page() {


    window.open("signup1.html", "_self");

}
function login_page() {

    
    window.open("login1.html", "_self");

}


function signup() {
    var username1 = document.getElementById("usern");
    var password1 = document.getElementById("passw");
    var email1 = document.getElementById("email");
    var rollnum1 = document.getElementById("rolln");
    var batchnum1 = document.getElementById("batchn");



    if (username1.value !== "" && password1.value !== "" && email1.value !== "" && rollnum1.value !== "" && batchnum1.value !== "") {
        /* alert("Done"); */
        var getuser = JSON.parse(localStorage.getItem('user'));
        if (getuser != null) {
            for (var i = 0; i < getuser.length; i++) {
                if (getuser[i].username == username1.value.toLowerCase() || getuser[i].email == email1.value) {
                    document.getElementById("md-bd").innerHTML="Sorry! User already register with same username or email id, Try Again";
                    $("#exampleModal").modal();
                  //  alert("Sorry! User already register with same username or email!, Try Again");
                    return;
                }
            }



        }

        else {
            getuser = [];

        }

        var user = {
            username: username1.value.toLowerCase(),
            password: password1.value,
            email: email1.value,
            rollnum: rollnum1.value,
            batchnum: batchnum1.value

        }
        getuser.push(user);
        getuser = JSON.stringify(getuser);
        localStorage.setItem('user', getuser);
       localStorage.setItem('name',username1.value);
        username1.value = "";
        password1.value = "";
        email1.value = "";
        rollnum1.value = "";
        batchnum1.value = "";
        
                        localStorage.setItem('log','1');
                          var win =  window.open("quizmain.html", "_self");
        


    }
    else {
        document.getElementById("md-bd").innerHTML="All feilds are required to procced further!";
        $("#exampleModal").modal();
      //  alert("Required feild/s is/are empty, Please fill all required feilds");
    }
}


function login() {
    var username2 = document.getElementById("log_in1");
    var password2 = document.getElementById("log_in2");

    if (username2.value !== "" && password2.value !== "") {
        var getuser = JSON.parse(localStorage.getItem('user'));
        if (getuser != null) {
            for (var i = 0; i < getuser.length; i++) {
                if (getuser[i].username == username2.value.toLowerCase()) {
                    if (getuser[i].password == password2.value) {
                        usrnm=username2.value;
                       
                        
                        localStorage.setItem('name',username2.value);
                        localStorage.setItem('log','1');
                          var win =  window.open("quizmain.html", "_self");
                       
                        return;
                    }
                    else {
                        document.getElementById("md-bd").innerHTML=username2.value + " Your password is Incorrect!, Try Again";
                        $("#exampleModal").modal();
                        
                        // alert(username2.value + " Your password is Incorrect!, Try Again");
                        password2.value = "";
                        return;
                    }

                }
            }
            document.getElementById("md-bd").innerHTML=username2.value + " you are not registered on this site, Use SIGN UP option to register yourself!";
            $("#exampleModal").modal();
           // alert(username2.value + " you are not registered on this site, Use SIGN UP option to register yourself!");




        }

        else {
            /* document.getElementById("md-bd").innerHTML="No user registered on Site! (DATABASE EMPTY), Use SIGN UP option to register yourself!";
            $("#exampleModal").modal(); */
            alert("No user registered on Site! (DATABASE EMPTY), Use SIGN UP option to register yourself!");
            window.open("signup1.html", "_self");
            return;
        }


    }
    else {
        document.getElementById("md-bd").innerHTML="All feilds are required to procced further!";
        $("#exampleModal").modal();
      //  alert("Required feild/s is/are empty, Please fill all required feilds");
    }
}

function setname(){
    if(localStorage.getItem('log')==='1'){
    
   var element = document.getElementById("usrname");
   var text = document.createTextNode(localStorage.getItem('name'));
   element.appendChild(text);
    }
else{
    document.getElementById("md-bd").innerHTML="Login first!";
    $("#exampleModal").modal();
    alert("Login First!");
    login_page();
}
}
function setname2(){  if(localStorage.getItem('log')==='1'){
    
   var element = document.getElementById("usrname");
   var text = document.createTextNode(localStorage.getItem('name'));
   element.appendChild(text);
   quizload();
    }
else{
    document.getElementById("md-bd").innerHTML="Login first!";
    $("#exampleModal").modal();
   alert("Login First!");
    login_page();
}}
function setname3(){  if(localStorage.getItem('log')==='1'){
    
   var element = document.getElementById("usrname");
   var text = document.createTextNode(localStorage.getItem('name'));
   element.appendChild(text);
   quizdetail();
 
    }
else{
    document.getElementById("md-bd").innerHTML="Login first!";
    $("#exampleModal").modal();
     alert("Login First!");
    login_page();
}}
function setname4(){  if(localStorage.getItem('log')==='1'){
    
   var element = document.getElementById("usrname");
   var text = document.createTextNode(localStorage.getItem('name'));
   element.appendChild(text);
  quizgen();
 
    }
else{
    document.getElementById("md-bd").innerHTML="Login first!";
    $("#exampleModal").modal();
     alert("Login First!");
    login_page();
}}
function setname5(){  if(localStorage.getItem('log')==='1'){
    
   var element = document.getElementById("usrname");
   var text = document.createTextNode(localStorage.getItem('name'));
   element.appendChild(text);
  showresult();
 
    }
else{
    document.getElementById("md-bd").innerHTML="Login first!";
    $("#exampleModal").modal();
     alert("Login First!");
    login_page();
}}
function logout(){
    localStorage.setItem('log','0');
    login_page();
}
function quizselect(){

    window.open("quizselect.html", "_self");
}
var quizno;
var count =0;
var names = [];
function quizload(){

    var db = firebase.database();
    var ref = db.ref("/");
    
    
    ref.on("value", function(snapshot) {
      
        quizno=snapshot.val().quizes;
       setTimeout(quizload1,3000);
      
      
      
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

}

function quizload1(){

    console.log(quizno);
    if(count===quizno){

        console.log("finish");
        document.getElementById("loading").style.visibility='hidden';
       uicreator1();
    }
    else{
        getquiz(count);
      
    }
    
}

function getquiz(i){

    
     var x= i+1;
    var str = "quiz"+"-"+x;

    var db = firebase.database();
    var ref = db.ref(str+"/name");
    
    
    ref.on("value", function(snapshot) {
       
        console.log(str);
       
       
       
        names.push(snapshot.val());
        count++;
        quizload();
      
      
      
      
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

}

function uicreator1(){
    var i = 0;
    while(i<quizno){
    var list = document.getElementById("list");
    var li = document.createElement("a");
    var text = document.createTextNode(names[i]);
    li.setAttribute("class","list-group-item list-group-item-action list-group-item-primary listclr");
    li.setAttribute("href","javascript:openquiz("+i+");");
    
    li.setAttribute("id",i);
    li.appendChild(text);
    list.appendChild(li);
    i++;
    


}




}
function openquiz(params){
    console.log(params);
   
   
    localStorage.setItem("quizname",document.getElementById(""+params+"").innerHTML);
    localStorage.setItem("quiznumber",params+1);
    window.open("quizdetail.html", "_self");

  
   
}


function quizdetail(){
    quizname = localStorage.getItem("quizname");
    quiznumber = localStorage.getItem("quiznumber");
    var detail;
    var db = firebase.database();
    var ref = db.ref("quiz-"+quiznumber+"/detail");
   
    
    ref.on("value", function(snapshot) {
       
        
       
        detail =snapshot.val();

      //  console.log(detail );
        
        setTimeout(quizdetail2(detail),3000);
      
      
      
      
      
      
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
   

}


function quizdetail2(detail){

console.log(detail);
    document.getElementById("loading2").style.visibility='hidden';
    var splitstr = detail.split(",");
 //   console.log(splitstr);
   
   // console.log(quizname);

 var text1 = document.createTextNode(quizname);
 document.getElementById("detail_quizname").appendChild(text1);


 document.getElementById("detail_quizdetail").innerHTML = quizname+" contain questions about "+splitstr[0]+"</br>Total Questions = "+splitstr[1]+" questions </br> You have to pass = "+splitstr[2]+" questions </br>Duration of quiz = "+splitstr[3]+" minutes</br>Best of Luck! ";
localStorage.setItem("duration",splitstr[3]);
localStorage.setItem("tquestion",splitstr[1]);
localStorage.setItem("plantques",splitstr[2]);

}
var duration ;
var time_in_minutes ;
var current_time;
var deadline;
function setdateval(){
 current_time = Date.parse(new Date());
 deadline = new Date(current_time + time_in_minutes*60*1000);
}

function time_remaining(endtime){
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60) % 60 );
	var hours = Math.floor( (t/(1000*60*60)) % 24 );
	var days = Math.floor( t/(1000*60*60*24) );
	return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}
function run_clock(id,endtime){
	var clock = document.getElementById(id);
	function update_clock(){
		var t = time_remaining(endtime);
		clock.innerHTML = 'Time Left: '+t.minutes+':'+t.seconds;
        if(t.total<=0){ clearInterval(timeinterval); 
        console.log("finish");
        localStorage.setItem("result",cquestion);
        window.open("result.html", "_self");
    }
	}
	update_clock(); // run function once at first to avoid delay
	var timeinterval = setInterval(update_clock,1000);
}
var qcount = 0;
var tquestion ;
var cquestion=0;
var flag1 ;
function quizgen(){
   duration = +localStorage.getItem("duration");
   time_in_minutes = duration;
   setdateval();
   run_clock('clockdiv',deadline);
  tquestion =localStorage.getItem("tquestion");
  flag1=false;
  quizgen2();

}
var question;
function quizgen2(){
    if(qcount==tquestion){
        localStorage.setItem("result",cquestion);
        console.log("finish")
        window.open("result.html", "_self");
    }
    else{
        if(flag1==true){
            document.getElementById("optcont").remove();
            document.getElementById("quesionbox").innerHTML = "";
        }
    qcount++;
    document.getElementById("qremain").innerHTML = "Question: "+qcount+"/"+tquestion;
    var db = firebase.database();
    var ref = db.ref("quiz-"+localStorage.getItem("quiznumber")+"/q"+qcount);
   console.log("quiz-"+localStorage.getItem("quiznumber")+"q"+qcount);
    
    ref.on("value", function(snapshot) {
       
        
       
       question =snapshot.val();
       setTimeout(quizgen3(),3000);


       
        
        
      
      
      
      
      
      
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    
    }

}
var correct;
function quizgen3(){
    var i ;
    var spt = question.split(",");
    var ques = spt[0];
    var options = [];
    correct = +spt[6];
        var j =+spt[1];
    for(i=2;i<j+2;i++){
        options.push(spt[i]);


    }
   
  document.getElementById("quesionbox").innerHTML = ques;
  var x =0;
  var contain = document.getElementById("options");
  var div = document.createElement("div");
  div.setAttribute("id","optcont");
  while(x!=spt[1]){
      var y = x+1;
    
    var div1 = document.createElement("div");
    div1.setAttribute("class","form-check");
    var label1 =document.createElement("label");
    label1.setAttribute("class","form-check-label");
    var input1 = document.createElement("input");
    input1.setAttribute("class","form-check-input");
    input1.setAttribute("type","radio");
    input1.setAttribute("name","exampleRadios");
    input1.setAttribute("id","exampleRadios"+y+"");
    input1.setAttribute("value",""+y+"");
    var text = document.createTextNode(options[x]);
    label1.appendChild(input1);
    label1.appendChild(text);
    div1.appendChild(label1);
    div.appendChild(div1);
    contain.appendChild(div);
    x++;
    flag1=true;


  }
}

function calculatenum(){
var selectedans;
 if(document.getElementById("exampleRadios1").checked){
   selectedans = 1;
 }
 else if (document.getElementById("exampleRadios2").checked){
    selectedans = 2;
 }
 else if (document.getElementById("exampleRadios3").checked){
    selectedans = 3;
}
else if (document.getElementById("exampleRadios4").checked){
    selectedans = 4;
}

resultnum(selectedans);

}

function resultnum(selected){

    if(correct === selected){
       cquestion++;
        quizgen2();
    }
    else{
        console.log("false");
        quizgen2();
    }
}

function showresult(){
    var  question1 = +localStorage.getItem("result");
    var question2  = +localStorage.getItem("plantques");
    var question3 = +localStorage.getItem("tquestion");
    var namestr = localStorage.getItem("name");
    var percent = (question1*100)/question3;
  if(question1>=question2){
         var divresult = document.getElementById("card");
         divresult.setAttribute("class","card text-white bg-success text-center");


        document.getElementById("heading").innerHTML = "Congratulations! "+namestr+"";
        document.getElementById("body1").innerHTML = "You have passed the quiz!";


        var h61 = document.createElement("h6");
        var h61txt = document.createTextNode("Total Questions in quiz: "+localStorage.getItem("tquestion"));
        h61.appendChild(h61txt);


        var h62 = document.createElement("h6");
        var h62txt = document.createTextNode("Correct Answers: "+question1);
        h62.appendChild(h62txt);


        var h63 = document.createElement("h6");
        var h63txt = document.createTextNode("You Scored: "+percent.toFixed(2)+"%");
        h63.appendChild(h63txt);
       

        var bodycont = document.getElementById("body2");
        bodycont.appendChild(h61);
        bodycont.appendChild(h62);
        bodycont.appendChild(h63);
       

        

  }


  else{
    var divresult = document.getElementById("card");
    divresult.setAttribute("class","card text-white bg-danger text-center");


   document.getElementById("heading").innerHTML = "Sorry! "+namestr+"";
   document.getElementById("body1").innerHTML = "You have failed the quiz!";


   var h61 = document.createElement("h6");
   var h61txt = document.createTextNode("Total Questions in quiz: "+localStorage.getItem("tquestion"));
   h61.appendChild(h61txt);


   var h62 = document.createElement("h6");
   var h62txt = document.createTextNode("Correct Answers: "+question1);
   h62.appendChild(h62txt);


   var h63 = document.createElement("h6");
   var h63txt = document.createTextNode("You Scored: "+percent.toFixed(2)+"%");
   h63.appendChild(h63txt);
  

   var bodycont = document.getElementById("body2");
   bodycont.appendChild(h61);
   bodycont.appendChild(h62);
   bodycont.appendChild(h63);
  

   

}

}

function contact(){
    
    document.getElementById("md-bd1").innerHTML="<b>Muhammad Salman Tariq</b></br>Facebook:<a href='https://www.facebook.com/salmaaan.khaan' target='_blank'>Salmaan Khan</a></br>Email:<a href='mailto:salmaankhaan028@gmail.com' >Send Mail</a>";
    document.getElementById("exampleModalLabel1").innerHTML = "Contact";
    $("#exampleModal1").modal();

}

function about(){
    document.getElementById("md-bd1").innerHTML="<b>Developed by:</b> Muhammad Salman Tariq</br><b>With the help of: </b>Sir Haider, Sir Majid, Sir Hanzala, Sir Ali Mughal<b></br>Organisation: </b>Saylani Welfare Trust - Mobile Software Development Training, Batch 4.2";
    document.getElementById("exampleModalLabel1").innerHTML = "About Us";
    $("#exampleModal1").modal();
}