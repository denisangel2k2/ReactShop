import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function getProduct(id) {
    return fetch(`https://dummyjson.com/products/${id}`).then((response) => {
        return response.json();
    });
}

function ProductImages({jsonItem}) {



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

function ProductPageProduct({jsonItem}) {
    const discountPrice = (jsonItem.price * (1 - jsonItem.discountPercentage / 100)).toFixed(2);
    return (
        <div className="product">
            <ProductImages jsonItem={jsonItem}/>
            <div className="info">
                <div className="main-info">
                    <h1>{jsonItem.title}</h1>
                    <p>Price: ${discountPrice}</p>
                </div>
                <div className="item-section-2">
                    <p>Rating: {jsonItem.rating}</p>
                    <p>Stock: {jsonItem.stock}</p>
                </div>

                <p>{jsonItem.description}</p>

                <div className="item-section-1">
                    <p>Category: {jsonItem.category}</p>
                    <p>Brand: {jsonItem.brand}</p>
                </div>
            </div>
        </div>
    );
}

export function ProductPage() {
    const params = useParams();
    const [item, setItem] = useState(null);
    useEffect(() => {
        getProduct(params.id).then((json) => {
            setItem(json);
        });
    }, [params.id]);

    return (
        <div>
            {item && <ProductPageProduct jsonItem={item}/>}
        </div>
    );
}