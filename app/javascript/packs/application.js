// ############ page#home
$(document).ready(function(){
  $('.hover').hover(function(){
    $(this).addClass('flip');
  },function(){
    $(this).removeClass('flip');
  });
});

const collapses = document.querySelectorAll(".my-collapse");
collapses.forEach((collapse) => {
  collapse.addEventListener("mouseenter", (e)=> {
    const card = e.currentTarget.querySelector(".card");
    card.classList.remove("d-none");
  });
  collapse.addEventListener("mouseleave", (e)=> {
    const card = e.currentTarget.querySelector(".card");
    card.classList.add("d-none");
  });
});

const bookWrappers = document.querySelectorAll(".book-wrapper");
bookWrappers.forEach((bookWrapper) => {
  bookWrapper.addEventListener("mouseenter", (e)=> {
    const hover = e.currentTarget.querySelector(".book-hover");
    hover.classList.remove("d-none");
  });
  bookWrapper.addEventListener("mouseleave", (e)=> {
    const hover = e.currentTarget.querySelector(".book-hover");
    hover.classList.add("d-none");
  });
});


// ############ survey#new

// ajax radio_buton
const sessionButton = document.querySelector("#update-session");
const radios = document.querySelectorAll(".number");
radios.forEach((radio)=>{
  radio.addEventListener("click", (e)=>{
    e.preventDefault();
    sessionButton.href = `${sessionButton.innerText}?question_id=${e.currentTarget.dataset.qid}&score=${e.currentTarget.innerText}`;
    sessionButton.click();
  });
});

// scroll progress bar
if (document.querySelector(".total-score-wrapper")) {
  const delta = document.querySelector(".total-score-wrapper").offsetTop;
  $(document).on('scroll',function(){
    if ($(document).scrollTop() > delta + 30) {
     $('#total-scores').addClass('fixed')
     $('#wrapper-after-progress-bar').addClass('margin-for-progress-bar-fixed')
    } else {
     $('#total-scores').removeClass('fixed')
     $('#wrapper-after-progress-bar').removeClass('margin-for-progress-bar-fixed')
    }
  });
}

// scroll progress bar
$(document).on('scroll',function(){
  if ($(document).scrollTop() > ($(document).height()- $(window).height() - 100)) {
   $('#btn-survey').addClass('bottom-100px')
  } else {
   $('#btn-survey').removeClass('bottom-100px')
  }
});

// ############ survey#show

const run = () => {
  const circles = document.querySelectorAll('.js-circle')
  circles.forEach((circle) => {
    const radius = circle.getAttribute('r')
    const val = circle.getAttribute('score')
    const diameter = Math.round(Math.PI * radius * 2)
    circle.style.strokeDashoffset = Math.round(1100 - diameter * val / 100)
  })
}
document.addEventListener('DOMContentLoaded', () => setTimeout(run, 10))
