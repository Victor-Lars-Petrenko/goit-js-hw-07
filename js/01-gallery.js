import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallery = document.querySelector(".gallery");

const galleryItemsMarkup = galleryItems.map(({ preview, original, description }) => 
    `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </li>`
).join("");

gallery.insertAdjacentHTML("afterbegin", galleryItemsMarkup);

gallery.addEventListener("click", evt => {
    evt.preventDefault();
    if (!evt.target.classList.contains("gallery__image")) {
        return
    };
    const modal = basicLightbox.create(`
        <img src="${evt.target.dataset.source}" width="800" height="600">
    `, {
        onShow: (modal) => {
            document.addEventListener("keydown", closeModalOnEsc)
        },
        onClose: (modal) => {
            document.removeEventListener("keydown", closeModalOnEsc)
        }
    });
    const closeModalOnEsc = event => {
        if (event.key === "Escape") {
            modal.close();
        }
    };
    modal.show();
})