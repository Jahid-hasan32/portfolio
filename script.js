const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


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

// cursor animations

function cursorAnimation() {
    var PageCursor = document.getElementById("cursor");
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

cursorAnimation()


// skills

function skillAnimations() {
    let circles = document.querySelectorAll(".circle");
    let intervalDuration = 80;

    circles.forEach((circle) => {
        let value = circle.querySelector(".wrapper span").textContent;
        let setValue = circle.querySelector(".wrapper span");
        let startValue = 0;
        console.log(value);

        let progress = setInterval(() => {
            startValue++;
            circle.style.background = `conic-gradient(#3586FF ${startValue * 3.6}deg, #777 0deg)`;
            setValue.textContent = startValue;

            if (startValue == value) {
                clearInterval(progress);
            }
        }, intervalDuration);
    });
}

skillAnimations();

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



