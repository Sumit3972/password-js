const inputslider=document.querySelector("[data-s]");
const displaynum=document.querySelector("[data-length]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copymsg=document.querySelector("[data-copyMsg]");
const uppercase = document.querySelector("#uppercase");
const lowecase=document.querySelector("#lowercase");
const number=document.querySelector("#numbers");
const symbol=document.querySelector("#symbols");
const indicator=document.querySelector("[ data-indicator]");

const generate=document.querySelector(".genertor-pass");
const allcheck=document.querySelector("input[type=checkbox]");
let password="";
let passwordlength=10;
let checkcount=0;
const symb='~!@#$%&^()_-=+{[}]|:;<,>?/';
// set color to grey




// set pass length
function handleslider(){
inputslider.value=passwordlength;
displaynum.innerText=passwordlength;

}
function setindecator(color){
    indicator.style.backgroundColor=color;
    // shadow


}

function getranint(min,max){
    return Math.floor(Math.random() * (max-min))+min;


}
function grn(){
    return getranint(0,9);

}

function guc(){
return String.fromCharCode( getranint(97,123));


}
function glc()
{
    
return String.fromCharCode( getranint(65,91));


}
function symbols(){
    const random=getranint(0,symb);
    return symb.charAt[random];

}
function calstengtyh(){
   let hasuc=false;
   let haslc=false;
   let hasnum=false;
   let hassyb=false;
if(uppercase.checked)hasuc=true;
if(lowecase.checked)haslc=true;
if(number.checked)hasnum=true;
if(symbol.checked)hassyb=true;

if(hasuc && haslc && (hasnum|| hassyb)&&passwordlength>=8){
    setindecator("#0f0");

}
else if((hasuc||haslc ) && (hasnum|| hassyb) && passwordlength>=6){
    setindecator("#ff0");

}
else{
    setindecator("#f00");
}
}

async function copycontent(){
    try{

await navigator.clipboard.writeText(passwordDisplay);
copymsg.innerText="copied";
    }
    catch(e){
copymsg.innerText="failed";

    }
copymsg.classlist.add("active");
setTimeout(()=>{
    copymsg.classlist.remove("active");

},2000);
}
inputslider.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    handleslider();
})


function handlecheckbox(){
    checkcount=0;
    allcheck.forEach((checkbox)=>{
        if(checkbox.checked){

        
        checkcount++;
        }
    })
}
// specialcse
if(passwordlength<checkcount){
    passwordlength=checkcount;

}


allcheck.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckbox);
})


copymsg.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copycontent();
    }
})


generate.addEventListener('click',()=>{
          //none of check box selected
          if(checkcount==0)return ;
          if(passwordlength < checkcount){
            passwordlength=checkcount;
            handleslider();

          }
          // start to find new password
          // reomve old pass
          password="";



          /*if(uppercase.checked){
            password+=guc();
          }


          if(lowecase.checked){
            password+=glc();
          }
          
          //if(number.checked){
            //password+=grn();
          //}
          
          
         // if(symbol.checked){
            //password+=symbols();
          //}*/
function sufflepass(array){
    // fishers yates method
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=array[temp];


    }
    let str ="";
    array.forEach((el)=>(str+=el));
    return str;

}








          let funarr=[];

if(uppercase.checked){
    funarr.push(guc);

}
if(lowecase.checked){
    funarr.push(glc);
    
}
if(number.checked){
    funarr.push(grn);
    
}

if(symbol.checked){
    funarr.push(symbols);
    
}
for(i=0;i<funarr.length;i++){

    password+=funarr[i]();

}
for(i=0;i<passwordlength-funarr.length;i++){
    let randomidx=getranint(0,funarr.length);
    password+=funarr[randomidx]();

}
// suffle the pss
password=sufflepass(Array.from(password));
// show ui
passwordDisplay.value=password;
/// call strenth
calstengtyh();



});









