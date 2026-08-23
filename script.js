// =====================================================
// A SOUL DEAR TO ME 🌹
// COMPLETE SCRIPT
// =====================================================


// =====================================================
// ELEMENTS
// =====================================================

const beginBtn = document.getElementById("beginBtn");

const introScene = document.getElementById("introScene");
const bouquetScene = document.getElementById("bouquetScene");

const introCanvas = document.getElementById("introCanvas");


// =====================================================
// INTRO CANVAS
// =====================================================

const ctx = introCanvas.getContext("2d");

let W = 0;
let H = 0;

function resizeCanvas() {
    W = introCanvas.width = window.innerWidth;
    H = introCanvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// =====================================================
// BALLOONS — RISE FROM BOTTOM 🎈
// =====================================================

const balloons = [];

const balloonColors = [
    "#f7a8c4",
    "#e8a9d5",
    "#c7b6f7",
    "#aebff5",
    "#f5c1d9",
    "#d6b4ec"
];


// =====================================================
// CREATE BALLOONS
// =====================================================

function createBalloons() {

    balloons.length = 0;

    for (let i = 0; i < 12; i++) {

        balloons.push({

            // Final horizontal position
            x: 8 + Math.random() * 84,

            // Start BELOW screen
            startY: H + 180 + Math.random() * 250,

            // Final position
            finalY:
                15 +
                Math.random() * 55,

            radius:
                25 + Math.random() * 15,

            color:
                balloonColors[
                    Math.floor(
                        Math.random() *
                        balloonColors.length
                    )
                ],

            // Each balloon appears at a different time
            delay:
                i * 180 +
                Math.random() * 400,

            duration:
                1800 +
                Math.random() * 1000,

            // Slight natural movement after arriving
            floatOffset:
                Math.random() * Math.PI * 2,

            floatSpeed:
                0.0008 +
                Math.random() * 0.0005,

            floatAmount:
                3 +
                Math.random() * 4,

            opacity: 0
        });
    }
}

createBalloons();


// =====================================================
// DRAW BALLOON
// =====================================================

function drawBalloon(balloon, time) {

    const elapsed =
        time - balloon.startTime;


    // ---------------------------------------------
    // Waiting for this balloon's turn
    // ---------------------------------------------

    if (elapsed < balloon.delay) {
        return;
    }


    const animationTime =
        elapsed - balloon.delay;


    // ---------------------------------------------
    // Rise animation
    // ---------------------------------------------

    let progress =
        Math.min(
            animationTime / balloon.duration,
            1
        );


    // Smooth easing
    progress =
        1 -
        Math.pow(
            1 - progress,
            3
        );


    // Position while rising
    let y =
        balloon.startY +
        (balloon.finalY - balloon.startY) *
        progress;


    // ---------------------------------------------
    // Gentle floating after arriving
    // ---------------------------------------------

    if (progress >= 1) {

        y +=
            Math.sin(
                time *
                balloon.floatSpeed +
                balloon.floatOffset
            ) *
            balloon.floatAmount;
    }


    // Fade in
    balloon.opacity =
        Math.min(
            progress * 2,
            1
        );


    // ---------------------------------------------
    // X position
    // ---------------------------------------------

    const x =
        (balloon.x / 100) *
        W;


    const r =
        balloon.radius;


    // ---------------------------------------------
    // DRAW
    // ---------------------------------------------

    ctx.save();

    ctx.globalAlpha =
        balloon.opacity * 0.9;


    // Soft glow
    ctx.shadowColor =
        balloon.color;

    ctx.shadowBlur = 18;


    // Balloon gradient
    const gradient =
        ctx.createRadialGradient(
            x - r * 0.35,
            y - r * 0.45,
            r * 0.1,

            x,
            y,
            r
        );


    gradient.addColorStop(
        0,
        "#ffffff"
    );

    gradient.addColorStop(
        0.25,
        balloon.color
    );

    gradient.addColorStop(
        1,
        balloon.color
    );


    ctx.fillStyle =
        gradient;


    // Balloon body
    ctx.beginPath();

    ctx.ellipse(
        x,
        y,
        r * 0.75,
        r,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // ---------------------------------------------
    // Knot
    // ---------------------------------------------

    ctx.shadowBlur = 0;

    ctx.fillStyle =
        balloon.color;

    ctx.beginPath();

    ctx.moveTo(
        x - 5,
        y + r * 0.85
    );

    ctx.lineTo(
        x + 5,
        y + r * 0.85
    );

    ctx.lineTo(
        x,
        y + r + 8
    );

    ctx.closePath();

    ctx.fill();


    // ---------------------------------------------
    // String
    // ---------------------------------------------

    ctx.strokeStyle =
        "rgba(80, 60, 100, 0.35)";

    ctx.lineWidth = 1;


    ctx.beginPath();

    ctx.moveTo(
        x,
        y + r + 5
    );

    ctx.bezierCurveTo(
        x - 5,
        y + r + 35,
        x + 5,
        y + r + 65,
        x,
        y + r + 100
    );

    ctx.stroke();


    ctx.restore();
}


// =====================================================
// INTRO ANIMATION
// =====================================================

function animateIntro(time) {

    ctx.clearRect(
        0,
        0,
        W,
        H
    );


    // Give every balloon the same animation start time
    balloons.forEach(balloon => {

        if (!balloon.startTime) {
            balloon.startTime = time;
        }

        drawBalloon(
            balloon,
            time
        );

    });


    requestAnimationFrame(
        animateIntro
    );
}


requestAnimationFrame(
    animateIntro
);















// =====================================================
// 💐 NEW MIXED BOUQUET
// 🌹 ROSES + 🌷 TULIPS + 🤍 LILIES
// =====================================================

const finalbouquet =
    document.getElementById("finalBouquet");


// =====================================================
// 🌸 FLOWER ARRANGEMENT
// =====================================================

const bouquetFlowers = [

    // 🌹 BACK / TALL FLOWERS
    { type: "lily",  x: 50, height: 390, angle: 0 },
    { type: "tulip", x: 28, height: 350, angle: -8 },
    { type: "tulip", x: 72, height: 350, angle: 8 },

    // 🌹 MIDDLE FLOWERS
    { type: "rose",  x: 38, height: 315, angle: -5 },
    { type: "rose",  x: 62, height: 315, angle: 5 },

    { type: "lily",  x: 20, height: 300, angle: -13 },
    { type: "lily",  x: 80, height: 300, angle: 13 },

    // 🌷 FRONT FLOWERS
    { type: "tulip", x: 32, height: 270, angle: -10 },
    { type: "rose",  x: 50, height: 285, angle: 0 },
    { type: "tulip", x: 68, height: 270, angle: 10 },

    // 🌹 SMALL SIDE FLOWERS
    { type: "rose",  x: 12, height: 240, angle: -18 },
    { type: "rose",  x: 88, height: 240, angle: 18 }
];


// =====================================================
// 🌿 CREATE FLOWER
// =====================================================

function createFlower(flower, index) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        `final-flower flower-${flower.type}`;

   wrapper.style.left =
    `${flower.x}%`;

wrapper.style.height =
    `${flower.height}px`;

wrapper.style.bottom =
    `105px`;

    wrapper.style.bottom = "25px";

wrapper.style.transform =
    `translateX(-50%) rotate(${flower.angle}deg)`;
    wrapper.style.zIndex =
        10 + index;


    // =================================================
    // 🌿 CURVED STEM
    // =================================================

    const svg =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

    svg.classList.add("final-stem");

    svg.setAttribute(
        "viewBox",
        "0 0 100 390"
    );

    svg.setAttribute(
        "preserveAspectRatio",
        "none"
    );


    const path =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );


    // Slightly different curve for each flower

    const curve =
        45 +
        ((index % 5) * 3);

    path.setAttribute(
        "d",
        `
        M50 390
        C${curve} 330,
         ${50 - flower.angle} 240,
         ${50 + flower.angle} 170
        C${55 - flower.angle} 100,
         50 50,
         50 0
        `
    );


    svg.appendChild(path);

    wrapper.appendChild(svg);


    // =================================================
    // 🍃 LEAVES
    // =================================================

    const leaf1 =
        document.createElement("div");

    leaf1.className =
        "final-leaf leaf-left";

    leaf1.style.bottom =
        `${flower.height * .42}px`;

    leaf1.style.left = "22px";

    wrapper.appendChild(leaf1);


    if (index % 2 === 0) {

        const leaf2 =
            document.createElement("div");

        leaf2.className =
            "final-leaf leaf-right";

        leaf2.style.bottom =
            `${flower.height * .58}px`;

        leaf2.style.right = "18px";

        wrapper.appendChild(leaf2);

    }


    // =================================================
    // 🌸 FLOWER HEAD
    // =================================================

    const head =
        document.createElement("div");

    head.className =
        "flower-head";


    // Flower-specific class

    head.classList.add(
        `${flower.type}-head`
    );


    // Add petals

    const petalCount =
        flower.type === "rose"
            ? 8
            : flower.type === "tulip"
                ? 5
                : 6;


    for (
        let p = 0;
        p < petalCount;
        p++
    ) {

        const petal =
            document.createElement("span");

        petal.style.setProperty(
            "--petal",
            p
        );

        head.appendChild(petal);
    }


    wrapper.appendChild(head);

    finalBouquet.appendChild(wrapper);
}
function createFinalBouquet() {

    if (!finalBouquet) return;

    finalBouquet.innerHTML = "";

    bouquetFlowers.forEach((flower, index) => {
        createFlower(flower, index);
    });
}

// =====================================================
// 💐 BUILD COMPLETE BOUQUET
// =====================================================
function animateFullBouquet() {

    if (!finalBouquet) return;

    const flowers =
        finalBouquet.querySelectorAll(".final-flower");

    flowers.forEach((flower, index) => {

        const angle =
            bouquetFlowers[index].angle;

        // Start inside the wrapping
        flower.style.opacity = "0";

        flower.style.transform =
            `translateX(-50%) translateY(80px) scale(0.2) rotate(${angle}deg)`;


        setTimeout(() => {

            flower.style.opacity = "1";

            flower.style.transition =
                "transform 1.8s cubic-bezier(.16,1,.3,1), opacity 1s ease";

            flower.style.transform =
                `translateX(-50%) translateY(0) scale(1) rotate(${angle}deg)`;


            setTimeout(() => {

                flower.classList.add("grow");

            }, 200);

        }, 500 + index * 220);

    });
}



// =====================================================
// 🌸 CREATE IT
// =====================================================

createFinalBouquet();
// =====================================================
// 🌹 BEGIN BUTTON → BOUQUET
// =====================================================

beginBtn.addEventListener("click", () => {

    console.log("🔥 BEGIN BUTTON CLICKED!");

    beginBtn.disabled = true;

    introScene.classList.remove("active");
    bouquetScene.classList.add("active");

    setTimeout(() => {

        createFinalBouquet();

        bouquetScene.classList.add("bouquet-show");

        animateFullBouquet();

    }, 500);

});
/* ==========================================
   SCENE 3: REALISTIC ULTRA-CHOCOLATE CAKE
   ========================================== */

class BirthdayCakeScene {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    
    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.progress = 0;
    this.animationDuration = 10000;
    this.startTime = null;
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = this.canvas.parentElement ? this.canvas.parentElement.clientWidth : window.innerWidth;
    this.canvas.height = this.canvas.parentElement ? this.canvas.parentElement.clientHeight : window.innerHeight;
    this.centerX = this.canvas.width / 2;
    this.baseY = this.canvas.height * 0.70;
    this.tier1Width = Math.min(this.canvas.width * 0.48, 340);
    this.tier2Width = this.tier1Width * 0.65;
    this.tierHeight = 55;
  }

  lerp(start, end, t) {
    return start + (end - start) * Math.max(0, Math.min(1, t));
  }

  // Dark slate-blue background with horizontal stripes & bokeh
  drawBackground() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#2c3e50');
    bgGrad.addColorStop(0.5, '#34495e');
    bgGrad.addColorStop(1, '#1a252f');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    const stripeH = h / 6;
    for (let i = 0; i < 6; i += 2) {
      ctx.fillRect(0, i * stripeH, w, stripeH);
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    const bokehSpots = [
      { x: w * 0.2, y: h * 0.3, r: 60 },
      { x: w * 0.35, y: h * 0.25, r: 40 },
      { x: w * 0.75, y: h * 0.35, r: 70 },
      { x: w * 0.85, y: h * 0.2, r: 45 }
    ];
    bokehSpots.forEach(b => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Blue display plate
  drawPlate(p) {
    if (p <= 0) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = Math.min(1, p * 2);

    const x = this.centerX;
    const y = this.baseY + 15;
    const w = this.tier1Width * 1.35;

    ctx.fillStyle = '#81d4fa';
    ctx.beginPath();
    ctx.ellipse(x, y, w / 2, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#4fc3f7';
    ctx.beginPath();
    ctx.ellipse(x, y - 2, w / 2 - 10, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // Moist chocolate sponge tier with cream/fudge layers
  drawStripedTier(yPos, width, height, progress) {
    if (progress <= 0) return;
    const ctx = this.ctx;
    const currentY = yPos + (1 - progress) * 50;

    ctx.save();
    ctx.globalAlpha = Math.min(1, progress * 1.5);

    const spongeGrad = ctx.createLinearGradient(this.centerX - width / 2, 0, this.centerX + width / 2, 0);
    spongeGrad.addColorStop(0, '#3e2723');
    spongeGrad.addColorStop(0.3, '#5d4037');
    spongeGrad.addColorStop(0.7, '#4e342e');
    spongeGrad.addColorStop(1, '#2c1d11');

    ctx.fillStyle = spongeGrad;
    ctx.beginPath();
    ctx.ellipse(this.centerX, currentY, width / 2, 16, 0, 0, Math.PI);
    ctx.ellipse(this.centerX, currentY - height, width / 2, 16, 0, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(this.centerX - width / 2, currentY - height, width, height);

    ctx.beginPath();
    ctx.ellipse(this.centerX, currentY - height, width / 2, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffcc80';
    const stripeY1 = currentY - height * 0.65;
    const stripeY2 = currentY - height * 0.3;

    ctx.fillRect(this.centerX - width / 2 + 2, stripeY1, width - 4, 6);
    ctx.fillRect(this.centerX - width / 2 + 1, stripeY2, width - 2, 6);

    ctx.fillStyle = '#1c0a05';
    ctx.fillRect(this.centerX - width / 2 + 2, stripeY1 + 6, width - 4, 2);
    ctx.fillRect(this.centerX - width / 2 + 1, stripeY2 + 6, width - 2, 2);

    ctx.restore();
  }

  // Dark Chocolate Drip Frosting
  drawChocolateDrips(topY, width, progress) {
    if (progress <= 0) return;
    const ctx = this.ctx;
    const halfW = width / 2;

    ctx.save();
    const frostGrad = ctx.createLinearGradient(this.centerX - halfW, 0, this.centerX + halfW, 0);
    frostGrad.addColorStop(0, '#120502');
    frostGrad.addColorStop(0.2, '#2a0e06');
    frostGrad.addColorStop(0.5, '#3d180a');
    frostGrad.addColorStop(0.8, '#260b04');
    frostGrad.addColorStop(1, '#100401');

    ctx.fillStyle = frostGrad;

    const coatP = Math.min(1, progress * 1.4);
    ctx.beginPath();
    ctx.ellipse(this.centerX, topY, halfW * coatP, 16 * coatP, 0, 0, Math.PI * 2);
    ctx.fill();

    if (coatP > 0.5) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(this.centerX - halfW * 0.2, topY - 2, halfW * 0.5, 7, -0.05, Math.PI * 0.8, Math.PI * 1.8);
      ctx.stroke();
    }

    if (progress > 0.35) {
      const dripP = (progress - 0.35) / 0.65;
      const dripSpecs = [
        { offset: -0.42, maxH: 26, r: 5 },
        { offset: -0.28, maxH: 38, r: 7 },
        { offset: -0.12, maxH: 20, r: 4 },
        { offset: 0.05,  maxH: 42, r: 8 },
        { offset: 0.22,  maxH: 28, r: 6 },
        { offset: 0.38,  maxH: 34, r: 7 }
      ];

      dripSpecs.forEach(drip => {
        const x = this.centerX + halfW * drip.offset;
        const currentH = drip.maxH * dripP;
        const dripY = topY + currentH;

        ctx.beginPath();
        ctx.moveTo(x - drip.r, topY);
        ctx.lineTo(x - drip.r, dripY);
        ctx.arc(x, dripY, drip.r, Math.PI, 0, true);
        ctx.lineTo(x + drip.r, topY);
        ctx.fill();

        if (dripP > 0.6) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.beginPath();
          ctx.arc(x - drip.r * 0.3, dripY - drip.r * 0.2, drip.r * 0.35, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = frostGrad;
        }
      });
    }

    ctx.restore();
  }

  // 5 Tall Striped Candles
  drawCandles(topY, progress, time) {
    if (progress <= 0) return;
    const ctx = this.ctx;
    const candleCount = 5;
    const candleWidth = 7;
    const maxCandleHeight = 42;
    const currentH = maxCandleHeight * Math.min(1, progress * 1.4);
    const spacing = this.tier2Width / (candleCount + 1);

    const colors = ['#e53935', '#ffb300', '#43a047', '#ffb300', '#00acc1'];

    for (let i = 0; i < candleCount; i++) {
      const x = (this.centerX - this.tier2Width / 2) + spacing * (i + 1);
      const color = colors[i];

      ctx.save();

      ctx.fillStyle = color;
      ctx.fillRect(x - candleWidth / 2, topY - currentH, candleWidth, currentH);

      ctx.fillStyle = '#ffffff';
      for (let s = 6; s < currentH; s += 12) {
        ctx.fillRect(x - candleWidth / 2, topY - s, candleWidth, 3);
      }

      if (progress > 0.7) {
        const flameP = (progress - 0.7) / 0.3;
        const flicker = Math.sin(time * 0.012 + i) * 1.5;
        const flameY = topY - currentH - 8;

        ctx.strokeStyle = '#212121';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, topY - currentH);
        ctx.lineTo(x, topY - currentH - 5);
        ctx.stroke();

        const glowGrad = ctx.createRadialGradient(x, flameY, 2, x, flameY, 20);
        glowGrad.addColorStop(0, 'rgba(255, 235, 59, 0.9)');
        glowGrad.addColorStop(1, 'rgba(255, 152, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(x, flameY, 20 * flameP, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ff9800';
        ctx.beginPath();
        ctx.ellipse(x + flicker, flameY, 4 * flameP, 8 * flameP, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.ellipse(x + flicker * 0.5, flameY + 2, 2 * flameP, 4 * flameP, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  render(timestamp) {
    if (!this.startTime) this.startTime = timestamp;
    const elapsed = timestamp - this.startTime;
    this.progress = Math.min(1, elapsed / this.animationDuration);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawBackground();

    const pPlate = this.lerp(0, 1, this.progress / 0.15);
    const pTier1 = this.lerp(0, 1, (this.progress - 0.12) / 0.22);
    const pDrip1 = this.lerp(0, 1, (this.progress - 0.34) / 0.22);
    const pTier2 = this.lerp(0, 1, (this.progress - 0.56) / 0.22);
    const pDrip2 = this.lerp(0, 1, (this.progress - 0.78) / 0.22);
    const pCandles = this.lerp(0, 1, (this.progress - 0.85) / 0.15);

    const y1 = this.baseY - 10;
    const y2 = y1 - this.tierHeight - 10;

    this.drawPlate(pPlate);

    // Bottom Tier + Drips
    this.drawStripedTier(y1, this.tier1Width, this.tierHeight, pTier1);
    this.drawChocolateDrips(y1 - this.tierHeight, this.tier1Width, pDrip1);

    // Top Tier + Drips
    this.drawStripedTier(y2, this.tier2Width, this.tierHeight, pTier2);
    this.drawChocolateDrips(y2 - this.tierHeight, this.tier2Width, pDrip2);

    // Candles
    this.drawCandles(y2 - this.tierHeight, pCandles, timestamp);

    requestAnimationFrame((t) => this.render(t));
  }

  start() {
    requestAnimationFrame((t) => this.render(t));
  }
}

/* ==========================================
   AUTOMATIC SCENE SWITCHER (#bouquetScene -> #cakeScene)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const BOUQUET_DISPLAY_TIME = 10000; // 10 seconds display time

  setTimeout(() => {
    const bouquetScene = document.getElementById('bouquetScene');
    const cakeScene = document.getElementById('cakeScene');

    if (bouquetScene && cakeScene) {
      bouquetScene.classList.remove('active');
      bouquetScene.style.opacity = '0';

      setTimeout(() => {
        bouquetScene.style.display = 'none';
      }, 1500);

      cakeScene.style.display = 'block';
      setTimeout(() => {
        cakeScene.classList.add('active');
        cakeScene.style.opacity = '1';

        const cakeAnimation = new BirthdayCakeScene('cakeCanvas');
        cakeAnimation.resize();
        cakeAnimation.start();
      }, 50);
    }
  }, BOUQUET_DISPLAY_TIME);
});

/* ==========================================
   SCENE TRANSITION (FLOWER -> CAKE)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const flowerScene = document.getElementById('flowerScene');
  const cakeScene = document.getElementById('cakeScene');
  const tapPrompt = document.getElementById('tapPrompt');

  // Adjust this (in milliseconds) to match how long your flowers take to bloom:
  // 15000 = 15 seconds
  const BLOOM_TIME = 15000; 

  setTimeout(() => {
    // Show the subtle prompt after flowers finish blooming
    if (tapPrompt) tapPrompt.classList.add('visible');
    
    // Enable tap/click anywhere to move to the cake scene
    const handleTransition = () => {
      if (flowerScene && cakeScene) {
        flowerScene.classList.remove('active');
        cakeScene.classList.add('active');

        // Start Cake Scene Animation
        const cakeAnimation = new BirthdayCakeScene('cakeCanvas');
        cakeAnimation.resize();
        cakeAnimation.start();
      }
    };

    document.addEventListener('click', handleTransition, { once: true });
    document.addEventListener('touchend', handleTransition, { once: true });
  }, BLOOM_TIME);
});


/* ==========================================
   AUTOMATIC SCENE SWITCHER (BOUQUET -> CAKE)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Delay in milliseconds before transitioning (10000 = 10 seconds)
  const BOUQUET_DISPLAY_TIME = 10000; 

  setTimeout(() => {
    // Exact IDs matching your HTML structure
    const bouquetScene = document.getElementById('bouquetScene');
    const cakeScene = document.getElementById('cakeScene');

    if (bouquetScene && cakeScene) {
      // 1. Gently fade out your bouquet scene
      bouquetScene.classList.remove('active');
      bouquetScene.style.opacity = '0';
      
      setTimeout(() => {
        bouquetScene.style.display = 'none';
      }, 1500); // Wait for fade out to complete

      // 2. Bring up Scene 3 (Cake)
      cakeScene.style.display = 'block';
      setTimeout(() => {
        cakeScene.classList.add('active');
        cakeScene.style.opacity = '1';

        // 3. Fire up the layered cake animation
        const cakeAnimation = new BirthdayCakeScene('cakeCanvas');
        cakeAnimation.resize();
        cakeAnimation.start();
      }, 50);
    }
  }, BOUQUET_DISPLAY_TIME);
});

