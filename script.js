let hourHand= document.getElementById('hourHand');
let minuteHand = document.getElementById('minuteHand');
let secondHand = document.getElementById('secondHand');
let alarmTimeInput =document.getElementById('alarmTime');
let alarmButton =document.getElementById('alarmButton');
let sound = document.getElementById('sound');
let snoozeBtn=document.getElementById('Snooze');
let stopBtn=document.getElementById('stop');
let alarmOptions=document.getElementById('alarmOptions');
let hexTime=document.getElementById('Hextime');
let HexColor=document.getElementById('Hexcolor');
let hexContainer=document.getElementsByClassName('containerHex')[0];

function initClock(){
	let date = new Date();
	let hours=date.getHours()  % 12;
	let minutes =date.getMinutes();
	let seconds=date.getSeconds();

	let hourDeg=(hours*30)+(minutes*0.5);
	let minuteDeg=(minutes*6)+(0.1*seconds);
	let secondDeg=seconds*6;

	hourHand.style.transform = `rotate(${hourDeg}deg)`;
	minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
	secondHand.style.transform = `rotate(${secondDeg}deg)`;
	setTimeout(initClock,1000);
};

const setAlarm = () => {
	let ms = alarmTimeInput.valueAsNumber;
	if(isNaN(ms)){
		alert('INVALID TIME! Try Again.\npress \'ok\' to continue...'); 
		return;
	}
	let alarm = new Date(ms);
	let alarmTime=new Date(alarm.getUTCFullYear(),
		alarm.getUTCMonth(),alarm.getUTCDate(),
		alarm.getUTCHours(),alarm.getUTCMinutes(),
		alarm.getUTCSeconds()
	);
	let cur= new Date();
	let diffInMS = alarmTime.getTime() - cur.getTime();
	if(diffInMS <0){
		alert("time reached");
		alarmTimeInput.value='';
		return;
	}
	else{
		setTimeout(initAlarm, diffInMS);
	}

	
	// alarmTimeInput.value='';

	return;
};

const stopAlarm =() => {
	sound.pause();
	sound.currentTime=0;
	alarmOptions.style.display="none";
}

const snoozeAlarm =()=> {
	stopAlarm();
	setTimeout(initAlarm,5*60*1000);
}

const initAlarm = () =>{
	sound.play();
	alarmOptions.style.display="flex";
};

function initTime(){

	let d= new Date();

	let hour=d.getHours();
	let minute=d.getMinutes();
	let second=d.getSeconds();
	let ampm=(hour>=12)?'PM':'AM';
	hour=hour%12;
	if(minute<10){
		minute=`0${minute}`;
	}
	if(hour<10){
		hour=`0${hour}`;
	}
	if(second<10){
		second=`0${second}`;
	}

	let hexColor=`#${hour}${minute}${second}`;
	let timeStr=`${hour}:${minute}:${second}`;
	hexTime.innerHTML=timeStr;
	HexColor.innerHTML=hexColor;
	hexContainer.style.backgroundColor=hexColor;
	setTimeout(initTime,1000);
}

initTime();
initClock();
alarmButton.addEventListener("click",setAlarm);

alarmTimeInput.addEventListener("keydown",function(event){
	if(event.which===13){
		setAlarm();
	}
});

stopBtn.addEventListener("click",stopAlarm);

snoozeBtn.addEventListener("click",snoozeAlarm);
