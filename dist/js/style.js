const header = document.querySelector('.header')
const menu = document.querySelector('.nav__menu');
const menuBtn = document.querySelector('.nav__menu-btn');
const navList = document.querySelector('.nav__list');
const navLink = document.querySelectorAll('.nav__list-link');
const navLogo = document.querySelector('.nav__logo');

//Click logo=========================================================================
// navLogo.addEventListener('click', () => {
//     gsap.to(navLogo, {scale: .95, yoyo: true, duration: .2, repeat: 1});
// });

//Scroll text animation=========================================================================
const tlScrl = gsap.timeline({
    defaults: { duration: .75, ease: "Power3.easeOut", delay: 3.5}
})
const scrl = document.querySelector('.scroll-text');
const letters = scrl.textContent.split("");

scrl.textContent= "";

letters.forEach(letter => {
    scrl.innerHTML += '<span class="letter">' + letter +'</span>';
});

gsap.set('.letter', {display: 'inline-block'});
tlScrl.fromTo('.letter', {x:15}, {x:0, stagger: .2, yoyo: true, repeat: -1});

// About page animation=========================================================================
const tlAbout = gsap.timeline({
    scrollTrigger: {
        trigger: '.about',
        // markers: {startColor: 'blue', endColor: 'blue'},
        scrub: false,
        start: '-40%',
        end: '40%'
    }
});

tlAbout.to('.about__heading-line', {scale: 1, duration: 2, delay: .5});

// Skills page animation=========================================================================
const tlSkills = gsap.timeline({
    scrollTrigger: {
        trigger: '.skills',
        // markers: {startColor: 'blue', endColor: 'blue'},
        scrub: false,
        start: '-40%',
        end: '40%'
    }
});

tlSkills.to('.skills__heading-line', {scale: 1, duration: 2, delay: .5});

// Contact page animation=========================================================================
const tlContact = gsap.timeline({
    scrollTrigger: {
        trigger: '.contact',
        // markers: {startColor: 'blue', endColor: 'blue'},
        scrub: false,
        start: '-40%',
        end: '40%'
    }
});

tlContact.to('.contact__heading-line', {scale: 1, duration: 2, delay: .5});

// Show navbar list when you click the burger button=========================================================================
let showMenu = false;

menu.addEventListener('click', toggleMenu);

function toggleMenu(){
    if(!showMenu) {
        menuBtn.classList.add('open');
        navList.classList.add('open');
        
        showMenu = true;
    }

    else {
        menuBtn.classList.remove('open');
        navList.classList.remove('open');
        // navLogo.classList.remove('scroll-logo');

        showMenu = false;
    }
}

// Close navbar list by clicking a link=========================================================================
function linkAction(){
    navList.classList.remove('open');
    menuBtn.classList.remove('open');

    showMenu = false;
}
navLink.forEach(n => n.addEventListener('click', linkAction))

// Scroll sections active link=========================================================================
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 100;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__list a[href*=' + sectionId +']').classList.add('active-link')
        }else{
            document.querySelector('.nav__list a[href*=' + sectionId +']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

// Change navbar on scroll=========================================================================
function scrollHeader(){
    if(this.scrollY >= 80) {
        navList.classList.add('scroll-bg'); 
        menuBtn.classList.add('scroll-btn');
        header.classList.add('scroll-bg1');
        navLogo.classList.add('scroll-logo');
    }
    else{
        navList.classList.remove('scroll-bg');
        menuBtn.classList.remove('scroll-btn');
        header.classList.remove('scroll-bg1');
        navLogo.classList.remove('scroll-logo');
    } 
} 
window.addEventListener('scroll', scrollHeader)

// Scroll behavior for all browsers and platforms with jQuery=========================================================================
$('.nav a').on('click', function(e){
    if(e.currentTarget.getAttribute("href") !== ''){
        e.preventDefault();

        const navID = e.currentTarget.getAttribute("href");

        $('html, body').animate({
            scrollTop: $(navID).offset().top
        }, 800);
    }
})

// Contact form=========================================================================
const form = document.querySelector(".contact__form")
const formButton = document.querySelector('.contact__btn');
const containers = document.querySelectorAll(".contact__box");
const nameInput = document.querySelector("#nameInput");
const surnameInput = document.querySelector("#surnameInput");
const emailInput = document.querySelector("#emailInput");
const subjectInput = document.querySelector("#subjectInput");
const msg = document.querySelector("#message");
const msgError = document.querySelector(".contact__message-error");
const msgComplete = document.querySelector(".contact__message-complete");
const validsvg = document.querySelectorAll(".contact__validation-tick");


// Tables of the messages after submiting the form
const message_option = 
[ "Please check if you miss a field.",
    "Please check if all the fields are correct.",
        "Thanks for reaching out. You will hear from me as soon as possible."];

    containers.forEach((container) =>{
        const input = container.querySelector(".contact__input");
        const validForm = container.querySelectorAll(".contact__validation-tick");
        const validFormFalse = container.querySelectorAll(".contact__validation-false");
        input.addEventListener('input', (e) =>{
            //Name validation
            if(e.target.type == 'text'){
                let inputText = e.target.value;
                if(inputText.length > 2 ){
                    check(validForm, validFormFalse);
                }
                else{
                    check(validFormFalse, validForm);
                }
            }
            //Email validation
            if(e.target.type == 'email'){
                let valid = validateEmail(e.target.value);
                if(valid){
                    check(validForm, validFormFalse); 
                }
                else{
                    check(validFormFalse, validForm);
                }
            }

            if(e.target.type == 'text' || e.target.type == 'email'){
                let empty = e.target.value;
                if(empty == ""){
                    checkEmpty(validFormFalse, validForm);
                }
            }
        }); 
    });

    let formIsValid = false;

    const validateInputs = () => {
        formIsValid = true;
        if(!nameInput.value || !surnameInput.value || !emailInput.value || !subjectInput.value || !msg.value){
            formIsValid = false;
            msgError.innerHTML = message_option[0];
        } else if (nameInput.value.length < 3 || surnameInput.value.length < 3 || subjectInput.value.length < 3 ) {
            formIsValid = false;
            msgError.innerHTML = message_option[1];
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        validateInputs();
        gsap.to(".contact__message-complete", {opacity: 0, duration: 1});
        gsap.to(".contact__message-error", {opacity: 0, duration: 1});
        if(!formIsValid){
            gsap.to(".contact__message-error", {opacity: 1, duration: 1});
            // e.preventDefault();
        } 
        else{
            msgComplete.innerHTML = message_option[2];
            gsap.to(".contact__message-error", {opacity: 0, duration: 1});
            gsap.to(".contact__message-complete", {opacity: 1, duration: 1});
            form.reset();
            gsap.set(validsvg,  {opacity: 0, duration: 1});
            return true;
        }
    });  

//Colorize function
function check(container1, container2){
    gsap.to(container1, {opacity: 1, duration: .75});
    gsap.to(container2, {opacity: 0, duration: .75});
}

function checkEmpty(container1, container2){
    gsap.to(container1, {opacity: 0, duration: .75});
    gsap.to(container2, {opacity: 0, duration: .75});
}

//Checking email and phone validation
function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}

//Empty textarea onload
function emptyTextarea() {
    document.getElementById("message").value = "";
}
window.onload = emptyTextarea;

//Active links=========================================================================

// function addLink(){

//     const iconfblink = document.querySelector("#fb_icon");
//     iconfblink.href = "https://www.facebook.com/people/%CE%98%CE%B1%CE%BD%CE%AC%CF%83%CE%B7%CF%82-%CE%A4%CF%81%CE%AC%CE%B9%CF%84%CF%83%CE%B7%CF%82/100004362453627/";

//     const iconinstalink = document.querySelector("#insta_icon");
//     iconinstalink.href = "https://www.instagram.com/thanasis_traitsis/";

// }

// const iconfb = document.querySelector(".uil uil-facebook-f");

// iconfblink.addEventListener('click', () => {
   
// });


//=================================================================================
// Scroll behavior for all browsers and platforms
// navLink.forEach(n => n.addEventListener('click', smoothScroll))

// function smoothScroll(event){
//     event.preventDefault();
//     const targetId = event.currentTarget.getAttribute("href");
//     window.scrollTo({
//         top: document.querySelector(targetId).offsetTop,
//         behavior: "smooth"
//     });
// }

// Section lines scrolling effect=========================================================================
// const observer = new IntersectionObserver(entries => {
//     // Loop over the entries
//     entries.forEach(entry => {
//       // If the element is visible
//       if (entry.isIntersecting) {
//         // Add the animation class
//         entry.target.classList.add('animation');
//       }
//     });
//   });
  
//   observer.observe(document.querySelector('.skills__heading-line'));
//   observer.observe(document.querySelector('.contact__heading-line'));
    

    


    
