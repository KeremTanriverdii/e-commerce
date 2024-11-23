import React from 'react';

function Footer() {
    return (
        <footer>
            <div className='footer-container'>
                <div className="row">
                    <div className="col">
                        <img src="logo.png" alt="Logo" />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quae obcaecati sed tenetur iusto! Veritatis voluptatem commodi illum placeat fugit! Perferendis quas praesentium expedita delectus? Assumenda impedit quae mollitia deleniti?</p>
                    </div>
                    <div className="col">
                        <h3>Office</h3>
                        <p>lorem dipisicing elit. Molestiae quae obcaecati sed tenetur iusto! Veritatis voluptatem commodi illum,Turkey</p>
                        <p>ahmetk.tanriverdi@gmail.com</p>
                        <p>+90-0123456789</p>
                    </div>
                    <div className="col">
                        <h3>Category</h3>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/features">Features</a></li>
                            <li><a href="/contacts">Contacts</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3 className='responsive-footer'>Newsletter</h3>
                        <form className='responsive-footer'>
                            <input type="email" placeholder="Enter your email id" />
                            <button type="submit">→</button>
                        </form>
                        <ul className="social-icons">
                            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="copyright">
                    <p>Easy Tutorials © 2021 - All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;