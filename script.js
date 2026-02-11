const menu_btn = document.getElementById("menu_btn");
menu_btn.addEventListener("click", menu_animation);

function menu_animation() {
  const menu_ul = document.getElementById("menu_ul");

  const home_link = document.getElementById("home_link");

  if (menu_ul.classList.contains("menu_ul_display")) {
    menu_ul.classList.remove("menu_ul_display");
    menu_ul.classList.remove("shrink");
    menu_ul.classList.add("expand");
    ser_ul.style.display = "block";

    //home link animation on padding
    home_link.classList.add("home_expand");
    home_link.offsetWidth; // Trigger reflow to restart animation
    home_link.classList.remove("home_shrink");
  } else if (menu_ul.classList.contains("shrink")) {
    menu_ul.classList.remove("shrink");
    menu_ul.classList.remove("menu_ul_display");
    menu_ul.classList.add("expand");

    home_link.classList.add("home_expand");
    home_link.offsetWidth; // Trigger reflow to restart animation
    home_link.classList.remove("home_shrink");
  } else {
    home_link.classList.add("home_shrink");
    home_link.offsetWidth; // Trigger reflow to restart animation
    home_link.classList.remove("home_expand");

    menu_ul.classList.remove("expand");
    menu_ul.classList.add("shrink");

    setTimeout(() => {
      menu_ul.classList.add("menu_ul_display");
      ser_ul.style.display = "none"; //hides submenu when menu is closed
    }, (timeout = 470)); //hides menu after the shrink animation
  }
}

const services_link = document.querySelector(".services");
const ser_ul = document.getElementById("ser_ul");

const webSize = window.matchMedia("(min-width: 980px)");

services_link.addEventListener("mouseenter", () => {
  if (webSize.matches) {
    ser_ul.style.display = "block";
  }
});

services_link.addEventListener("mouseleave", () => {
  if (webSize.matches) {
    ser_ul.style.display = "none";
  }
});

ser_ul.addEventListener("mouseenter", () => {
  if (webSize.matches) {
    ser_ul.style.display = "block";
  }
});

ser_ul.addEventListener("mouseleave", () => {
  if (webSize.matches) {
    ser_ul.style.display = "none";
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth < 980) {
    ser_ul.style.display = "block"; //shows submenu when resizing to desktop
  } else {
    ser_ul.style.display = "none"; //hides submenu when resizing to mobile
  }
});

function changeNavBK() {
  const menu_ul = document.getElementById("navbar");
  if (window.scrollY > 0) {
    menu_ul.style.backgroundColor = "#220536";
  } else {
    menu_ul.style.backgroundColor = "transparent";
  }
}
window.addEventListener("scroll", changeNavBK);

// remove spline logo

function removeLogo() {
  var splineElems = document.querySelectorAll("spline-viewer");

  splineElems.forEach((root)=>{
    root.shadowRoot.querySelector("#logo").remove();
    console.log(root);  
  })
}

setTimeout(removeLogo, 3000);




// ******* loading page ********

const loader = document.getElementById("loading");

async function splineLoad() {
  const splineViewer = document.getElementById("my-spline");
  const splineURL = splineViewer.getAttribute("url");
  console.log(splineURL);

  try {
    // 1. Fetch the scene file
    const response = await fetch(splineURL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const contentLength = +response.headers.get("Content-Length");
    let receivedLength = 0;
    let chunks = [];

    // 2. Read the data stream
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      chunks.push(value);
      receivedLength += value.length;

      // 3. Calculate and display the percentage
      const percentage = Math.round((receivedLength / contentLength) * 100);
    }

    // 4. Combine chunks and create a Blob
    let blob = new Blob(chunks);
    let objectURL = URL.createObjectURL(blob);

    // 5. Load the Blob URL into the viewer
    await splineViewer.load(objectURL);

    // The 'start' event is now implicitly handled by awaiting the load.
    // Once loaded, we can hide the loader.
    console.log("Spline application started.");
    loader.style.bottom = "100%";
  } catch (error) {
    console.error("Failed to load Spline scene:", error);
  }

}

function simpleLoader()
{
  loader.style.bottom = "100%";
}
setTimeout(simpleLoader,5000);

/* Anchor element animation */
function smoothScrollTo(target, duration) { // duration in ms
  const targetPos = target.getBoundingClientRect().top + window.scrollY - 100 ; //distance from the top of the viewport to the element. + where page scrol is.
  console.log(targetPos);
  
  const startPos = window.scrollY; //the current scroll position when the animation starts.
  const distance = targetPos - startPos;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime; //    Calculates how much time has passed since the animation began.
    const progress = Math.min(elapsed / duration, 1); //Converts elapsed time into a normalized progress from 0 to 1. | 0 → start, 1 → animation complete.

    // Ease-in-out cubic
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPos + distance * ease);

    if (elapsed < duration) requestAnimationFrame(animation); //If the animation is not finished, request the browser to call animation again on the next frame.
    //the function is used to runs your function just before the browser draws the next frame,It’s used for smooth animations because it syncs with the browser’s rendering cycle.
  }

  requestAnimationFrame(animation); //Starts the animation by requesting the first frame.
}

 const anchor = document.getElementById("pointer");
const target = document.getElementById("services_viewport")

anchor.addEventListener("click",()=>{

  smoothScrollTo(target,1500);
})



function anchorAnimation(){ // a simpler way to smooth animation.
  const anchor = document.getElementById("pointer");
  const target = document.getElementById("services_viewport");

  anchor.addEventListener("click",()=>{
    target.scrollIntoView({
      behavior:"smooth"
    })
  })
}


/* Services Area visibility animation */

function visibilityServiceAnimation(){
  const title = document.getElementById("services_title");
  const cards = document.getElementsByClassName("services_cards");
  const phrase = document.getElementById("services_phrase");
  const btn = document.getElementById("services_btn");

  const selected = [title,...cards,phrase,btn];

  const obser = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if(entry.isIntersecting){
       
        entry.target.classList.add("visib_trans");
        //setTimeout(()=>{ entry.target.classList.add("visib_trans")},500)
        obser.unobserve(entry.target);
      }

      // Optional: stop observing once it’s visible
    });
    
    /*
      0.1 → 10% of the element’s area must be inside the viewport to count as “visible.”
      0 → Triggers as soon as even 1 pixel is visible.
      1 → Triggers only when the entire element is in view.
    */
  },{threshold:0.1})

  // Start observing each selected element
  selected.forEach((el)=> obser.observe(el));

}

setTimeout(visibilityServiceAnimation,5000)


/*the benefits spline loading*/

function benefitSplineLoad(){
document.addEventListener("DOMContentLoaded", () => {
  const splineEl = document.getElementById("benefites_viewport");

  // After it has had time to load, move it where you want it
  setTimeout(() => {
    splineEl.style.position = "static";
    document.getElementById("target").appendChild(splineEl);
  }, 1000);
});

}
//benefitSplineLoad();



/**************************** ourwork viewport background moving */
  const moving_bg = document.querySelector("#ourwork_viewport");
  let bgY = 0;
  let isVisible = false;

     // Create observer ONCE
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (!isVisible) {
        moving_bg.style.backgroundPositionY = '0px'; // reset when hidden
        bgY = 0;
      }
    });
  }, { threshold: 0 });

  observer.observe(moving_bg);


  // Listen to scroll
  window.addEventListener("scroll", () => {

   

    if (isVisible) {
    if (window.scrollY > lastScroll && bgY < 150) { /* if you press wheel to auto scroll the bg will leave the page this the limit to prevent */
      // scrolling down
      bgY += 2;
    } else {
      // scrolling up
      bgY -= 2;
    }
    moving_bg.style.backgroundPositionY = `${bgY}px`;
  }
  lastScroll = window.scrollY;
  });

/**************************** benefit viewport resize (because of position absolute) */

const viewport = document.getElementById("benefites_viewport");
const benefits = document.getElementById("benefits_container");

function resizeViewport() {
  if(window.matchMedia("(max-width: 980px)").matches){
    viewport.style.height = (benefits.clientHeight) + "px";
  }
  else {
    console.log("else branch");
   viewport.style.setProperty("height", "1000px", "important");
  }
}

window.addEventListener("resize", resizeViewport);

