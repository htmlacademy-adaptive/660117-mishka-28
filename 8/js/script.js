let navMain=document.querySelector(".nav"),navToggle=document.querySelector(".nav__button");navMain.classList.remove("nav--nojs"),navToggle.addEventListener("click",(function(){navMain.classList.contains("nav--closed")?(navMain.classList.remove("nav--closed"),navMain.classList.add("nav--opened")):(navMain.classList.add("nav--closed"),navMain.classList.remove("nav--opened"))}));