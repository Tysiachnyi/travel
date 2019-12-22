window.addEventListener('DOMContentLoaded', function(){
'use strict';

let tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContent = document.querySelectorAll('.info-tabcontent'),
    descriptionBtn = document.querySelectorAll('.description-btn');

function hideTabContent(a){
    for (let i = a;i < tabContent.length;i++){
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');

    }
}

function addModalOnDescriptionBtn(c){
    descriptionBtn[c].addEventListener('click', function(){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });
}

hideTabContent(1);
addModalOnDescriptionBtn(0);

function showTabContent(b){
    if (tabContent[b].classList.contains('hide')){
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}

info.addEventListener('click', function(event){
    let target = event.target;
    if(target && target.classList.contains('info-header-tab')){
        for(let i = 0;i < tab.length;i++){
            if(target == tab[i]){
                hideTabContent(0);
                showTabContent(i);
                addModalOnDescriptionBtn(i);
                break;
            }
        }
    }
});

let deadLine = '2019-12-22';

 function getTimeRemaining(endTime){
    let t = Date.parse(endTime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
 }

 function setClock(id,endtime){
     
        let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds');
        if(Date.parse(endtime) < Date.parse(new Date())){
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
        }else{
            timeInterval = setInterval(updateClock, 1000);
        }
       

    function updateClock(){
        let t = getTimeRemaining(endtime);
        hours.textContent = ('0' + t.hours).slice(-2);
        minutes.textContent = ('0' + t.minutes).slice(-2);
        seconds.textContent = ('0' + t.seconds).slice(-2);

        if(t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
    

    }

    setClock('timer', deadLine);

    // Modal window

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function(){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function(){
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
    });

    
        


});