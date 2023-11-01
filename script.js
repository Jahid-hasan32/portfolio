document.addEventListener("DOMContentLoaded", function () {
    
// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


// Initialize ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
scroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });


// navbar animation

// bg color change on scroll

const nav = document.querySelector('.nav');
const scrollTriggerPosition = 200; // Scroll position at which you want to change the background color

scroll.on('scroll', (e) => {
  const scrollY = e.scroll.y;

  if (scrollY >= scrollTriggerPosition) {
    nav.classList.add('change_color_on_scroll');
  } else {
    nav.classList.remove('change_color_on_scroll');
  }
});


function navAnimation() {

    gsap.from("nav .logo, .second_part ul li, .third_part", {
        x: -100,
        opacity: 0,
        delay: 0.6,
        duration: 0.7,
        stagger: 0.4
    });
}

navAnimation();

//  spin animation
function spinAnimation() {
    gsap.from(".spin_main", {
        y: 100,
        opacity : 0, 
        delay : 1.8,
        duration : .5
    })
}

spinAnimation()

// page one h1 animations

function page1Animation () {
    gsap.from("#page1 h1", {
        y:100, 
        opacity : 0, 
        delay : .6,
        duration : .6,
        stagger: .3
    })
}

page1Animation()

// cursor1 animations

function cursor1Animation() {
    var PageCursor = document.getElementById("cursor1");
    var homePage       = document.getElementById("page1");
    homePage.addEventListener("mousemove", function(dets){
        gsap.to(PageCursor, {
            left: dets.x,
            top:dets.y,
            opacity :1,
            scale : .5, 
        })
    })

    homePage.addEventListener("mouseleave", function(dets){
        gsap.to(PageCursor, {
            left: dets.x,
            top:dets.y,
            opacity :0,
            scale : 0, 
        })
    })
}

cursor1Animation()

// cursor2 animations

function cursor2Animation() {
    var PageCursor = document.querySelector(".cursor2");
    var page3       = document.getElementById("page3");
    page3.addEventListener("mousemove", function(dets){
        var mouseX = dets.clientX;
        var mouseY = dets.clientY;
        gsap.to(PageCursor, {
            left: mouseX,
            top:mouseY,
            opacity :1,
            scale : 3, 
        })
    })

    page3.addEventListener("mouseleave", function(dets){
        gsap.to(PageCursor, {
            left: dets.x,
            top:dets.y,
            opacity :0,
            scale : 0, 
        })
    })
}

cursor2Animation()


// page3container Animation function
function page3container() {
    var tl = gsap.timeline({});

    gsap.from(".slogan", {
        x: -100,
        opacity: 0,
        scrollTrigger: {
            trigger: ".page3container", // Check that this is the correct trigger element
            scroller: "#main",
            start: "5% 100%", // Adjust as needed
            end: "40% 20%", // Adjust as needed
            scrub: true,
        },
    });

    gsap.from(".page3container .desc", {
        x: 100,
        opacity: 0,
        scrollTrigger: {
            trigger: ".page3container", // Check that this is the correct trigger element
            scroller: "#main",
            start: "5% 100%", // Adjust as needed
            end: "40% 20%", // Adjust as needed
            scrub: true,
        },
    });

    gsap.from(".page3container .desc .btn", {
        y: -100,
        delay: 1, 
        opacity: 0,
        scrollTrigger: {
            trigger: ".page3container", // Check that this is the correct trigger element
            scroller: "#main",
            start: "5% 100%", // Adjust as needed
            end: "40% 20%", // Adjust as needed
            scrub: true,
        },
    });

    // page3 seconde part. 

    gsap.to(".about_text", {
        x: -50,
        duration:1,
        opacity: 1,
        scrollTrigger: {
            trigger: ".about", // Check that this is the correct trigger element
            scroller: "#main",
            start: "17% 100%", // Adjust as needed
            end: "30% 30%", // Adjust as needed
            scrub: true,
            // markers : true
        },
    });

    gsap.to(".about_img", {
        x: 50,
        duration :2,
        opacity: 1,
        scrollTrigger: {
            trigger: ".about", 
            scroller: "#main",
            start: "50% 100%", 
            end: "80% 50%", 
            scrub: true,
            // markers : true
        },
    }); 
}

page3container();


// services animation

function servAnim() {
    let servElem = document.querySelectorAll(".services_box .elem");

    // image show on hover animation

    let current_mouse_location = 0;
    var next_mouse_location = 0;

    servElem.forEach(function (elem) {
        elem.addEventListener("mousemove", (details) => {
            current_mouse_location = details.clientX - next_mouse_location;
            next_mouse_location = details.clientX;

            let moveY = details.clientY - elem.getBoundingClientRect().top;
            let moveX = details.clientX - elem.getBoundingClientRect().left;

            console.log(elem.getBoundingClientRect());

            gsap.to(elem.querySelector("img"), {
                opacity: 1,
                duration: .4,
                top : (moveY),
                left : (moveX - 100),
                ease: Power1,
                rotate : gsap.utils.clamp(-20 , 20, current_mouse_location)                
            })

        })
    })

    // image hide 
    servElem.forEach(function (elem) {
        elem.addEventListener("mouseleave", (details) => {

            gsap.to(elem.querySelector("img"), {
                opacity: 0,
                duration: .4,
                
            })

        })
    })

    // heading tag animation

    gsap.to('.services_box .elem', {
        y: -40,
        // bottom: -90,
        stagger : .5,
        // opacity : 0, 
        ease: Power1,
        scrollTrigger : {
            trigger: ".services_box", 
            scroller: "#main",
            start: "50% 100%", 
            end: "80% 50%", 
            // markers : true
        },
    })

}

servAnim()


// Assessed 

function assessedAnimation() {
    let slide = document.getElementById("slide");
    let uparrow = document.getElementById("uparrow");
    let downarrow = document.getElementById("downarrow");
    let x = 0;

    uparrow.addEventListener('click', () => {
        
        if (x > "-1200") {
            x = x -245;
            slide.style.top = x + "px";    
        }
        
    })

    downarrow.addEventListener('click', () => {

        if (x < 0) {
            x = x + 250;
            slide.style.top = x + "px";    
        }

    })

}

assessedAnimation()


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => scroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

});
