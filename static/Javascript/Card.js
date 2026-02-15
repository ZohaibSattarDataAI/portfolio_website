window.addEventListener("load", () => {
        const slider = document.getElementById("slider");
        const track = document.getElementById("cardTrack");

        // Duplicate cards for infinite scrolling
        const originals = [...track.children];
        originals.forEach(card => track.appendChild(card.cloneNode(true)));

        let isDown = false;
        let startX, scrollLeft;
        let autoSpeed = 1.5; // pixels per frame (~30px/sec)
        let lastTime = 0;

        // Drag (desktop)
        slider.addEventListener("mousedown", (e) => {
            isDown = true;
            slider.classList.add("interacting");
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener("mouseleave", () => {
            isDown = false;
            slider.classList.remove("interacting");
        });

        slider.addEventListener("mouseup", () => {
            isDown = false;
            slider.classList.remove("interacting");
        });

        slider.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.2;
            slider.scrollLeft = scrollLeft - walk;
        });

        // Touch (mobile)
        slider.addEventListener("touchstart", () => slider.classList.add("interacting"));
        slider.addEventListener("touchend", () => slider.classList.remove("interacting"));

        // Infinite wrap logic
        slider.addEventListener("scroll", () => {
            const half = track.scrollWidth / 2;
            if (slider.scrollLeft >= half) {
            slider.scrollLeft -= half;
            } else if (slider.scrollLeft <= 0) {
            slider.scrollLeft += half;
            }
        });

        // JS-only smooth auto-scroll (no CSS animation)
        function animate(time) {
            const delta = time - lastTime;
            lastTime = time;

            if (!slider.classList.contains("interacting")) {
            slider.scrollLeft += autoSpeed * (delta / 16); // normalize speed
            }
            // Pause on hover
            slider.addEventListener("mouseenter", () => slider.classList.add("interacting"));
            slider.addEventListener("mouseleave", () => slider.classList.remove("interacting"));

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
        });