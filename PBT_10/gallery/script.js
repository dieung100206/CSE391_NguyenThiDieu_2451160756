const gallery = document.getElementById("gallery");
const loading = document.getElementById("loading");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close-btn");

let page = 1;
let isLoading = false;

async function loadMorePhotos() {

    if(isLoading) return;

    isLoading = true;

    loading.style.display = "block";

    try {

        const response = await fetch(
            `https://picsum.photos/v2/list?page=${page}&limit=20`
        );

        if(!response.ok){
            throw new Error("Lỗi tải ảnh");
        }

        const photos = await response.json();

        renderPhotos(photos);

        page++;

    } catch(error){

        console.error(error);

    } finally {

        loading.style.display = "none";

        isLoading = false;
    }
}

function renderPhotos(photos){

    photos.forEach(photo => {

        const card = document.createElement("div");

        card.className = "photo-card";

        card.innerHTML = `
            <img
                data-src="${photo.download_url}"
                alt="${photo.author}"
                class="lazy-image"
            >
        `;

        gallery.appendChild(card);

        card.addEventListener("click", () => {
            openLightbox(photo.download_url);
        });
    });

    lazyLoadImages();
}

function lazyLoadImages(){

    const lazyImages =
        document.querySelectorAll(".lazy-image");

    const imageObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if(entry.isIntersecting){

                        const img = entry.target;

                        img.src =
                            img.dataset.src;

                        observer.unobserve(img);
                    }

                });

            },
            {
                threshold:0.1
            }
        );

    lazyImages.forEach(img => {

        if(!img.src){

            imageObserver.observe(img);

        }

    });
}

function openLightbox(src){

    lightbox.style.display = "flex";

    lightboxImg.src = src;
}

function closeLightbox(){

    lightbox.style.display = "none";

    lightboxImg.src = "";
}

closeBtn.addEventListener(
    "click",
    closeLightbox
);

lightbox.addEventListener(
    "click",
    e => {

        if(e.target === lightbox){

            closeLightbox();

        }

    }
);

/*
    Infinite Scroll
*/

const observer =
    new IntersectionObserver(
        entries => {

            if(entries[0].isIntersecting){

                loadMorePhotos();

            }

        },
        {
            threshold:0.1
        }
    );

observer.observe(
    document.querySelector("#load-trigger")
);

/*
    Load lần đầu
*/

loadMorePhotos();