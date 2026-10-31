const menuToggle = document.querySelector(".menuToggle");
const nav = document.querySelector("#nav");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
}


document.querySelectorAll(".imageCarousel").forEach(carousel => {
    const track = carousel.querySelector(".carouselTrack");
    const images = track ? track.querySelectorAll("img") : [];
    const prevButton = carousel.querySelector(".carouselPrev");
    const nextButton = carousel.querySelector(".carouselNext");
    const counter = carousel.querySelector(".carouselCounter");

    if (!track || images.length === 0) return;

    let currentIndex = 0;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        if (counter) {
            counter.textContent = `${currentIndex + 1} / ${images.length}`;
        }

        if (prevButton) {
            prevButton.disabled = currentIndex === 0;
        }

        if (nextButton) {
            nextButton.disabled = currentIndex === images.length - 1;
        }
    }

    if (prevButton) {
        prevButton.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            if (currentIndex < images.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
    }

    updateCarousel();
});


const galleryCards = document.querySelectorAll(".galleryCard");
const imageViewer = document.querySelector(".imageViewer");
const videoViewer = document.querySelector(".videoViewer");

if (imageViewer && videoViewer) {

    const viewerImage = imageViewer.querySelector(".viewerImage");
    const imageCaption = imageViewer.querySelector(".viewerCaption");
    const imageClose = imageViewer.querySelector(".viewerClose");
    const viewerPrev = imageViewer.querySelector(".viewerPrev");
    const viewerNext = imageViewer.querySelector(".viewerNext");
    const viewerCounter = imageViewer.querySelector(".viewerCounter");

    const viewerVideo = videoViewer.querySelector(".viewerVideo");
    const videoCaption = videoViewer.querySelector(".viewerCaption");
    const videoClose = videoViewer.querySelector(".viewerClose");

    let currentImages = [];
    let currentIndex = 0;


    function updateImageViewer() {
        const currentImage = currentImages[currentIndex];

        if (!currentImage || !viewerImage) return;

        viewerImage.src = currentImage.currentSrc || currentImage.src;
        viewerImage.alt = currentImage.alt || "";

        if (viewerCounter) {
            viewerCounter.textContent =
                `${currentIndex + 1} / ${currentImages.length}`;

            viewerCounter.style.display =
                currentImages.length > 1 ? "block" : "none";
        }

        if (viewerPrev) {
            viewerPrev.disabled = currentIndex === 0;
            viewerPrev.style.display =
                currentImages.length > 1 ? "block" : "none";
        }

        if (viewerNext) {
            viewerNext.disabled =
                currentIndex === currentImages.length - 1;

            viewerNext.style.display =
                currentImages.length > 1 ? "block" : "none";
        }
    }


    function openImageViewer(images, caption) {
        currentImages = images;
        currentIndex = 0;

        if (imageCaption) {
            imageCaption.textContent = caption;
        }

        updateImageViewer();
        imageViewer.showModal();
    }


    galleryCards.forEach(card => {
        const media = card.querySelector("img, video");
        const captionElement = card.querySelector("span");

        if (!media) return;

        function checkOrientation() {
            const width = media.tagName === "VIDEO"
                ? media.videoWidth
                : media.naturalWidth;

            const height = media.tagName === "VIDEO"
                ? media.videoHeight
                : media.naturalHeight;

            if (!width || !height) return;

            card.classList.toggle("landscape", width > height);
        }

        if (media.tagName === "VIDEO") {
            media.addEventListener("loadedmetadata", checkOrientation);

            if (media.readyState >= 1) {
                checkOrientation();
            }

        } else if (media.complete) {
            checkOrientation();

        } else {
            media.addEventListener("load", checkOrientation);
        }


        card.addEventListener("click", () => {
            const caption = captionElement
                ? captionElement.textContent.trim()
                : "";

            if (card.dataset.type === "image") {
                const image = card.querySelector("img");

                if (!image) return;

                openImageViewer([image], caption);
            }


            if (card.dataset.type === "carousel") {
                const images = Array.from(
                    card.querySelectorAll("img")
                ).filter(image => image.getAttribute("src"));

                if (images.length === 0) return;

                openImageViewer(images, caption);
            }


            if (card.dataset.type === "video") {
                const videoSource = card.dataset.video;

                if (!videoSource || !viewerVideo) return;

                viewerVideo.src = videoSource;

                if (videoCaption) {
                    videoCaption.textContent = caption;
                }

                videoViewer.showModal();

                viewerVideo.play().catch(() => {});
            }
        });
    });


    const requestedImage = new URLSearchParams(
        window.location.search
    ).get("image");

    if (requestedImage) {
        const matchingCard = Array.from(galleryCards).find(card => {
            const image = card.querySelector("img");

            return image &&
                card.dataset.type === "image" &&
                image.getAttribute("src").split("/").pop() === requestedImage;
        });

        if (matchingCard) {
            matchingCard.click();
        }
    }


    if (viewerPrev) {
        viewerPrev.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateImageViewer();
            }
        });
    }


    if (viewerNext) {
        viewerNext.addEventListener("click", () => {
            if (currentIndex < currentImages.length - 1) {
                currentIndex++;
                updateImageViewer();
            }
        });
    }


    if (imageClose) {
        imageClose.addEventListener("click", () => {
            imageViewer.close();
        });
    }

    imageViewer.addEventListener("click", event => {
        if (event.target === imageViewer) {
            imageViewer.close();
        }
    });


    if (videoClose) {
        videoClose.addEventListener("click", () => {
            videoViewer.close();
        });
    }

    videoViewer.addEventListener("click", event => {
        if (event.target === videoViewer) {
            videoViewer.close();
        }
    });


    videoViewer.addEventListener("close", () => {
        viewerVideo.pause();
        viewerVideo.removeAttribute("src");
        viewerVideo.load();
    });


    imageViewer.addEventListener("close", () => {
        if (viewerImage) {
            viewerImage.removeAttribute("src");
            viewerImage.alt = "";
        }

        currentImages = [];
        currentIndex = 0;
    });
}
