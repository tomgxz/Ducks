const REDUCEDMOTION = !!(window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true)
/*
import { Application } from "https://cdn.skypack.dev/@splinetool/runtime@0.9.416";

const canvas = document.getElementById('3d-duck-canvas');
const app = new Application(canvas);
app.load('https://prod.spline.design/SX5LhLlxiO5h1SUh/scene.splinecode');
*/

// TYPING ANIMATION
// #region

if (!REDUCEDMOTION) {

    $("[data-anim-typing]").each(function(){
        var el = $(this),
            startdelay = parseInt(el.attr("data-typing-start-delay")),
            typingdelay = parseInt(el.attr("data-typing-typing-delay")), 
            letterduration = parseInt(el.attr("data-typing-letter-duration")),
            text = el.attr("data-typing-text");

        el.html("&nbsp;")

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

} else {

    $("[data-anim-typing]").each(function(){
        var el = $(this), text = el.attr("data-typing-text");
        el.text(text)
    })

}

// #endregion

// FADE IN ANIMATION
// #region

if (!REDUCEDMOTION) {
    $("[data-anim-fadein]").each(function(){   
        var el = $(this),
            delay = parseInt(el.attr("data-fadein-delay")),
            duration = parseInt(el.attr("data-fadein-duration"));
    
        console.log(el)
    
        el.css({opacity:0})
        el.delay(delay).animate({opacity:1},duration)
    })
} else {
    $("[data-anim-fadein]").css({opacity:1})
}

// #endregion


// CONTENT SLIDE HIDE WHILST ANIMATIONS ARE RUNNING
// #region

if (!REDUCEDMOTION) {
    $(".content-slide").css({display:"none"})
    setTimeout(function(){$(".content-slide").css({display:"flex"})},6000)    
} else {
    $(".content-slide").css({display:"flex"})
}

// #endregion

// SCROLLING CARD
// #region 


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

// #endregion