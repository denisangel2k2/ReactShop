import {json} from "react-router-dom";
import {useAuth} from "../login_page/Login";

export function ProductReview({jsonItem}) {

    async function getUserByToken(token) {
        return await fetch(`http://localhost:3001/token/${token}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });
    }

    const {authKey} = useAuth();

    async function deleteReview() {
        return await getUserByToken(authKey).then(
            (response) => {
                return response.json();
            }).then((user) => {
            if (jsonItem.userId !== user._id)
                throw new Error('Not your review');
            return fetch(`http://localhost:3001/reviews/delete/${jsonItem._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': authKey
                }
            });
        })
    }

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
            <button className={"delete-review-btn"} onClick={() => {
                deleteReview()
                    .then((resp) => {
                        alert('Review deleted');
                    }).catch((err) => {
                    alert(err);
                })

            }}>Delete
            </button>
        </div>
    )
}