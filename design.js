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
    const mobile_nav_first = document.querySelector('.mobile_nav_first');
    const scrollTriggerPosition = 200; // Scroll position at which you want to change the background color
    
    scroll.on('scroll', (e) => {
      const scrollY = e.scroll.y;
    
      if (scrollY >= scrollTriggerPosition) {
        nav.classList.add('change_color_on_scroll');
        mobile_nav_first.classList.add('change_color_on_scroll');
      } else {
        nav.classList.remove('change_color_on_scroll');
        mobile_nav_first.classList.remove('change_color_on_scroll');
    
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
    
    
    // mobile navbar 
    
    function mobileNav() {
        let hamburger = document.getElementById("hamburger");
        let menuCross = document.getElementById("menu-cross");
    
        var tl = gsap.timeline({defaults:{ease: 'expo.inOut', duration:1}})
        hamburger.addEventListener("click", () => {
            menuCross.style.display = 'block';
            hamburger.style.display = 'none';
            
            tl.to(".mobile_nav_second_part", {display : "block",width : "100%",}, '-=1')
            .to(".mobile_nav_second_part ul li a", {opacity:1, stagger:.1})
    
        });
    
        menuCross.addEventListener("click", () => {
            menuCross.style.display = 'none';
            hamburger.style.display = 'block';
    
            tl.to(".mobile_nav_second_part ul li a", {opacity:0, stagger:.1}, '-=1')
            .to(".mobile_nav_second_part", {display : "none",right: '0%',width : "0%",})
    
        });
    
    }
    
    mobileNav();
    

    // design page animations
      
    
    function animateFirstDesign() {
    
        gsap.from('.first_design_txt', {
            duration:.8,
            x:60,
            scrollTrigger:{
                    trigger: '.first_design',
                    scroller: "#main",
                    toggleActions: 'restart',
                    ease: Power1,
                    scrub:true
            }
        })
    
        gsap.from('.first_design .img', {
            duration:.8,
            x:-60,
            scrollTrigger:{
                    trigger: '.first_design',
                    scroller: "#main",
                    toggleActions: 'restart',
                    ease: Power1,
                    scrub:true
            }
        })


        gsap.from('.second_design_txt', {
            duration:.8,
            x:60,
            scrollTrigger:{
                    trigger: '.second_design',
                    scroller: "#main",
                    toggleActions: 'restart',
                    ease: Power1,
                    scrub:true
            }
        })
    
        gsap.from('.second_design .img', {
            duration:.8,
            x:-60,
            scrollTrigger:{
                    trigger: '.second_design',
                    scroller: "#main",
                    toggleActions: 'restart',
                    ease: Power1,
                    scrub:true
            }
        })


        gsap.from('.third_design_txt', {
            duration:.8,
            x:60,
            scrollTrigger:{
                    trigger: '.third_design',
                    scroller: "#main",
                    toggleActions: 'restart',
                    ease: Power1,
                    scrub:true
            }
        })
    
        gsap.from('.third_design .img', {
            duration:.8,
            x:-60,
            scrollTrigger:{
                    trigger: '.third_design',
                    scroller: "#main",
                    toggleActions: 'restart',
                    ease: Power1,
                    scrub:true
            }
        })


        gsap.from('.fourth_design_txt', {
            duration:.8,
            x:60,
            scrollTrigger:{
                    trigger: '.fourth_design',
                    scroller: "#main",
                    toggleActions: 'restart',
                    ease: Power1,
                    scrub:true
            }
        })
    
        gsap.from('.fourth_design .img', {
            duration:.8,
            x:-60,
            scrollTrigger:{
                    trigger: '.fourth_design',
                    scroller: "#main",
                    toggleActions: 'restart',
                    ease: Power1,
                    scrub:true
            }
        })

    }
    
    animateFirstDesign()
    
    
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => scroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
    });
    
    