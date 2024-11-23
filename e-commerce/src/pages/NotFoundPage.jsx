import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return <div className="d-flex flex-col gap-2">
        404 Not Found
        <Link to='/'>Return to Home</Link>
    </div>
}