import { Button, Card } from "react-bootstrap";
import '../css/Card.css'
function ProductCard({ productDetails }) {
    const thumbnail = productDetails.imageUrl?.length ? productDetails.imageUrl[0] : null;

    return (
        <Card className="" >
            {
                thumbnail &&
                <Card.Img src={thumbnail} alt="header" className="img-fluid" />
            }
            {
                !thumbnail &&
                <Card.Img
                    src="https://miro.medium.com/v2/resize:fit:1200/1*y6C4nSvy2Woe0m7bWEn4BA.png" alt="header"
                />
            }
            <Card.Body>
                <Card.Text className="">{productDetails.name}</Card.Text>
                <Card.Text >{productDetails.price}$</Card.Text>
                <Button>Add to Basket</Button>
            </Card.Body>
        </Card>
    )
}

export default ProductCard
