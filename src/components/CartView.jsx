import { useEffect, useState } from "react";
import { calculateCartTotal } from "../services/productService";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

export const CartView = ({ cartItems, handlerRemoveProductFromCart, handlerUpdateQuantity }) => {
    const [cartTotal, setCartTotal] = useState(0);
    const [iconAnimations, setIconAnimations] = useState({});

    useEffect(() => {
        setCartTotal(calculateCartTotal(cartItems));
    }, [cartItems]);

    const onRemoveProductFromCart = (productId) => {
        setIconAnimations((prevAnimations) => ({
            ...prevAnimations,
            [productId]: true,
        }));

        setTimeout(() => {
            handlerRemoveProductFromCart(productId);
            setIconAnimations((prevAnimations) => ({
                ...prevAnimations,
                [productId]: false,
            }));
        }, 1000);
    };

    const onUpdateQuantity = (item, increment) => {
        const newQuantity = item.quantity + increment;
        const newStock = item.product.stock - increment;

        if (newQuantity > 0 && newQuantity <= item.product.stock) {
            handlerUpdateQuantity(item, increment);
        } else if (newQuantity > item.product.stock) {
            Swal.fire({
                icon: 'error',
                title: 'Stock insuficiente',
                text: 'La cantidad deseada es mayor que el stock disponible.',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <>
            <div className="container d-flex flex-column align-items-center justify-content-center my-4">
                <div className="d-flex justify-content-between w-100">
                    <div>
                        <h3>Tu carrito!</h3>
                    </div>
                    <div className=" text-end">
                        <NavLink className="btn btn-info"
                            to="/catalog">
                            seguir comprando!
                        </NavLink>
                    </div>
                </div>
                {cartItems.map((item) => (

                    <div className="card m-3 p-2 w-75"
                        key={item.product.id}>
                        <div className="row g-0">
                            <div className="col-md-2">
                                <img src="./src/assets/ssd.jpg" className="img-fluid rounded-start" alt={item.product.name} />
                            </div>
                            <div className="col-md-10">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="card-title">{item.product.name}</h5>
                                            <p className="card-text m-1">precio unitario: ${item.product.price}</p>
                                            {(item.product.stock < 6 && item.product.stock != 0) && <p className="text-success">¡Últimas Existencias!</p>}
                                            <p className={`card-text m-1 ${item.product.stock === 0 ? 'text-danger' : ''}`}>Stock: <span>{item.product.stock}</span></p>
                                            <p className="card-text m-1"><span className="fw-semibold">Subtotal:</span> ${item.quantity * item.product.price}</p>
                                        </div>
                                        <div className="col">
                                            <div className="d-flex align-items-center">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-primary m-2 d-flex align-items-center justify-content-center"
                                                    onClick={() => onUpdateQuantity(item, 1)}
                                                >
                                                    <span className="material-symbols-outlined">add</span>
                                                </button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-warning m-2 d-flex align-items-center justify-content-center"
                                                    onClick={() => onUpdateQuantity(item, -1)}
                                                >
                                                    <span className="material-symbols-outlined text-light">remove</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm d-flex align-items-center justify-content-center m-2"
                                                    onClick={() => onRemoveProductFromCart(item.product.id)}
                                                >
                                                    <span
                                                        className={`material-symbols-outlined ${iconAnimations[item.product.id] ? 'icon-animation-remove' : ''}`}
                                                    >
                                                        remove_shopping_cart
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                    <p className="card-text text-center"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="w-75 d-flex justify-content-end">
                    <div className="alert alert-dark w-50 text-end" role="alert">
                        <span className="fw-semibold">Total: </span>${cartTotal}
                    </div>
                </div>
            </div>
        </>
    );
};