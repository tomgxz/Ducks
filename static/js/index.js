gsap.registerPlugin(ScrollTrigger)

const REDUCEDMOTION = !!(window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true)

import { Application } from "https://cdn.skypack.dev/@splinetool/runtime";


function onpagerelease(app, duck, camera) {
    $(".content-slide").css({display:"flex"})
    $(".footer").css({display:"block"})

    const st = {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        markers: false,
    }

    gsap.to(duck.rotation, { z:12, scrollTrigger: st })
    gsap.to(camera.position, { y:-50, z:1500, scrollTrigger: st })
    gsap.to(camera.rotation, { x:0, scrollTrigger: st })
    
    $(".card-scrolling-text-wrapper").each(function(){
        var el = $(this),
            content = el.html();
    
        el.html("");
    
        el.append(
            $("<div/>")
                .addClass("scrolling-text")
                .addClass("scrolling-text-1")
                .html(content)
        )
    
        el.append(
            $("<div/>")
                .addClass("scrolling-text")
                .addClass("scrolling-text-2")
                .html(content)
        )
    
        var sc1 = $(el.children(".scrolling-text-1").get(0)),
            sc2 = $(el.children(".scrolling-text-2").get(0)),
            height = sc1.height(),
            time_s = 60,
            time_ms = time_s * 1000;
    
        function anim() {
    
            console.log("anim_start_1")
    
            gsap.fromTo(sc1,{y:0},{y:-height, duration: time_s, ease: "none"})
            gsap.fromTo(sc2,{y:height},{y:0, duration: time_s, ease: "none"})
    
            setTimeout(function(){
    
                console.log("anim_start_2")
    
                gsap.fromTo(sc1,{y:height},{y:0, duration: time_s, ease: "none"})
                gsap.fromTo(sc2,{y:0},{y:-height, duration: time_s, ease: "none"})
    
            },time_ms)
        }
    
        anim()
        setInterval(anim,time_ms*2)
    
    })

}

function onpageload(app) {

    if (!REDUCEDMOTION) {

        $("[data-anim-typing]").each(function(){
            var el = $(this),
                startdelay = parseInt(el.attr("data-typing-start-delay")),
                typingdelay = parseInt(el.attr("data-typing-typing-delay")), 
                letterduration = parseInt(el.attr("data-typing-letter-duration")),
                text = el.attr("data-typing-text");

            setTimeout(function(){

                var cursorInterval = setInterval(function(){
                    el.text("_");
                    setTimeout(function(){el.html("&nbsp;")},250);
                },500);

                setTimeout(function(){
                    clearInterval(cursorInterval)

                    setTimeout(function(){
                        el.html("&nbsp;")

                        var letter = 0;

                        var typinginterval = setInterval(function(){
                            el.text(el.text() + text[letter])
                            letter++
                        },letterduration)

                        // timer to clear typinginterval once finished
                        setTimeout(function(){clearInterval(typinginterval);el.text(text)},letterduration*text.length)
                    
                    },500)

                },typingdelay)

            },startdelay)

        })

        $("[data-anim-fadein]").each(function(){   
            var el = $(this),
                delay = parseInt(el.attr("data-fadein-delay")),
                duration = parseInt(el.attr("data-fadein-duration"));
        
            el.delay(delay).animate({opacity:1},duration)
        })

    }

    const duck = app.findObjectByName("duckmain");
    const camera = app.findObjectByName("Camera");

    gsap.set(duck.position, {x:0, y:0, z:0})
    gsap.set(duck.rotation, {x:-90, y:0, z:0})

    gsap.set(camera.position, {x:0, y:1500, z:1000})
    gsap.set(camera.rotation, {x:-.8, y:0, z:0})

    gsap.to(camera.position, {x:0, y:600, z:1000, duration:5})
    gsap.to(camera.rotation, {x:-.6, y:0, z:0, duration:5})

    setTimeout(function(){
        onpagerelease(app,duck,camera)
    },6000)

}

function onscriptload() {
    
    if (!REDUCEDMOTION) {

        $("[data-anim-typing]").html("&nbsp;")
        $("[data-anim-fadein]").css({opacity:0})
        $(".content-slide").css({display:"none"})
        $(".footer").css({display:"none"})

    } else {

        $("[data-anim-typing]").each(function(){
            var el = $(this), text = el.attr("data-typing-text");
            el.text(text)
        })
        
        $("[data-anim-fadein]").css({opacity:1})
        $(".content-slide").css({display:"flex"})
        $(".footer").css({display:"block"})
    }

    const canvas = document.getElementById('duck-canvas');

    $(canvas).width($("#duck-column").width())
    $(canvas).height($(window).height()-$(".header-wrapper").height())

        
    const app = new Application(canvas);
    app
        .load('https://prod.spline.design/h-4PqbjeF-ZwULl8/scene.splinecode')
        .then(() => {

            onpageload(app)

        })

}





onscriptload()