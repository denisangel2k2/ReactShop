import {json} from "react-router-dom";

export function ProductReview({jsonItem}) {
    return (
        <div className="product-review">
            <div className={"product-review-header"}>
                <div className={"product-review-title"}>
                    <span>{jsonItem && jsonItem.title}</span>
                </div>
                    <div className={"product-review-score-container"}>
                        <span>{jsonItem && jsonItem.rating}</span><i className="fa-solid fa-star"></i>
                    </div>
                </div>
            <div className={"product-review-text"}>
                <span>
                    {jsonItem && jsonItem.comment}
                </span>
            </div>


        </div>
    )
}