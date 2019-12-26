window.addEventListener('DOMContentLoaded', function() {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        descriptionBtn = document.querySelectorAll('.description-btn'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    };

    function addModalOnDescriptionBtn(c) {
        descriptionBtn[c].addEventListener('click', function(){
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    }

    hideTabContent(1);
    addModalOnDescriptionBtn(0);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    addModalOnDescriptionBtn(i);
                    break;
                }
            }
        }

    });

    // Timer 

    let deadline = '2018-11-21';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
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

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
            
        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num){
                        if(num <= 9) {
                            return '0' + num;
                        } else return num;
                    };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }

    setClock('timer', deadline);

    // Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // form

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        secondForm = document.querySelector('form'),
        secondFormInput = secondForm.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
        
    statusMessage.classList.add('status');

    function sendForm(elem){
        elem.addEventListener('submit', function(e){
            e.preventDefault();
            let input = elem.getElementsByTagName('input');
            elem.appendChild(statusMessage);
            let formData = new FormData(elem);

            function postData(data){

                return new Promise(function(resolve,reject){
                    
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    request.onreadystatechange = function(){
                        if(request.readyState < 4){
                            resolve()
                        }else if (request.readyState === 4){
                            if(request.status == 200 && request.status < 3){
                                resolve()
                            }
                            else{
                                reject()
                            }
                        }
                    }
                    request.send(data);
                })

            }// end postdata

            function clearInput(){
                for( let i = 0; i<input.length; i++){
                    input[i].value = '';
                }
            }
            postData(formData)
                .then(()=> statusMessage.innerHTML = message.loading)
                .then(()=>statusMessage.innerHTML = message.success)
                .catch(()=>statusMessage.innerHTML = message.failure)
                .then(clearInput)

        })
    }

    sendForm(form);
    sendForm(secondForm);
    // form.addEventListener('submit', function(event){

    //     function sendForm(){
    //         console.log('started promise fnc')
    //         return new Promise(function(resolve, reject){
               
                

               
                
                

               

                
    //         })
    //     };

    //     sendForm().then(()=>alert('nice'))
    //               .catch(()=>alert('not nice'))


        
       
    // });



//     secondForm.addEventListener('submit', function(event){
//         event.preventDefault();
//         secondForm.appendChild(statusMessage);
        

//         let request = new XMLHttpRequest();
//         request.open('POST', 'server.php');
//         request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

//         let formData = new FormData(secondForm);
//         //  Convert FormData To JSON Object
//         let obj = {};
//         formData.forEach(function(value,key){
//             obj[key] = value;
//         });

//         let json = JSON.stringify(obj);
//         request.send(json);

//         request.addEventListener('readystatechange', function(){
//             if(request.readyState < 4){
//                 statusMessage.innerHTML = message.loading;
//             } else if(request.readyState === 4 && request.status == 200){
//                 statusMessage.innerHTML = message.success;
//             }else{ 
//                 statusMessage.innerHTML = message.failure;
//             }

//             for (let i = 0;i<input.length;i++){
//                 secondFormInput[i].value = ''
//             };
//         });

//     });

});
