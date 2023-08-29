import {ProductReview} from "./ProductReview";
import {useAddReviewMutation, useGetReviewsQuery} from "../../redux/apis";
import {useEffect, useState} from "react";

export function ProductReviews({id}) {
    const {
        data: reviews,
    } = useGetReviewsQuery(id);
    const [addReview] = useAddReviewMutation();

    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewScore, setReviewScore] = useState(0);
    const [reviewText, setReviewText] = useState("");

    async function addReviewHandler() {
        // debugger;
        const token = localStorage.getItem("authKey");
        addReview([id, reviewScore, reviewText, reviewTitle, token]).then((json) => {
            console.log('Fetched reviews successfully');
            if (json.error) {
                alert("Error adding review!");
                return;
            }
        })
            .catch((err) => {
                alert("Error adding review!"+err);

            });
    }

    return (
        <div className="product-reviews">
            <div className="product-reviews-container">
                {reviews &&
                    reviews.map((item, index) => (
                        <DelayedProductReview key={item._id} jsonItem={item} index={index}/>
                    ))}
            </div>
            <div className="add-review-textarea">
                <div className={"review-info"}>
                    <div className={"review-title-score-container"}>
                        <input type={"text"} placeholder={"Title"} onChange={(event) => {
                            setReviewTitle(event.target.value);
                        }}/>
                        <input type={"number"} max={5} min={1} onChange={(event) => {
                            setReviewScore(event.target.value);
                        }}/>
                        <i id={"add-review-star"} className="fa-solid fa-star"></i>
                    </div>

                    <textarea maxLength={300} placeholder={"Add a review"} onChange={(event) => {
                        setReviewText(event.target.value);
                    }}/>
                </div>
                <button onClick={addReviewHandler}>Submit</button>
            </div>

        </div>
    );
}

const DelayedProductReview = ({jsonItem, index}) => {
    const [showReview, setShowReview] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowReview(true);
            const container = document.querySelector(".product-reviews-container");
            const scrollToHeight = container.scrollHeight;
            container.scrollTo({
                top: scrollToHeight,
                behavior: "smooth"
            });

        }, 1000 * index);

        return () => clearTimeout(timeoutId);
    }, [jsonItem, index]);

    return showReview ? <ProductReview jsonItem={jsonItem}/> : null;
};