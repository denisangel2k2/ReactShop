import {useEffect} from "react";

export function ProductImages({jsonItem}) {
    let currentImageIndex = 0;
    function showCurrentImage(index) {
        const imagesContainer = document.querySelector(".images");
        const images = imagesContainer.querySelectorAll("img");

        for (let i = 0; i < images.length; i++) {
            images[i].classList.toggle("hidden",i!==index);
        }
    }
    useEffect(() => {
        showCurrentImage(currentImageIndex);
    }, [jsonItem]);

    function nextImage() {

        currentImageIndex++;
        const imagesContainer = document.querySelector(".images");
        const width = imagesContainer.clientWidth;
        const translateX = currentImageIndex * width;

        if (currentImageIndex >= jsonItem.images.length) {
            currentImageIndex = -1;
            imagesContainer.style.transform = `translateX(0)`;
            showCurrentImage(currentImageIndex + 1);
        } else {
            imagesContainer.style.transform = `translateX(-${translateX}px)`;
            showCurrentImage(currentImageIndex);
        }

    }

    function prevImage() {

        const imagesContainer = document.querySelector(".images");
        const width = imagesContainer.clientWidth;
        currentImageIndex--;

        if (currentImageIndex < 0) {
            currentImageIndex = jsonItem.images.length - 1;
            imagesContainer.style.transform = `translateX(-${currentImageIndex * width}px)`;
            showCurrentImage(currentImageIndex);
        } else {
            const translateX = currentImageIndex * width;
            imagesContainer.style.transform = `translateX(-${translateX}px)`;
            showCurrentImage(currentImageIndex);
        }

    }

    return (
        <div>
            <div className="images">
                {jsonItem.images.map((image, index) => {
                        return (
                            <img key={index} src={image} alt="product" className={"hidden"}/>
                        );
                    }
                )}
            </div>
            <div className="actions">
                <div className="arrow-transparent left-arrow" onClick={prevImage}>
                    <i className="fa-solid fa-chevron-left"></i>
                </div>
                <div className="right-arrow arrow-transparent" onClick={nextImage}>
                    <i className="fa-solid fa-chevron-right"></i>
                </div>
            </div>
        </div>
    );
}