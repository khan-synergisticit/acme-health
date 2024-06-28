import React from "react";
import Nav from "react-bootstrap/Nav";
import {Carousel} from "react-bootstrap";
import img1 from "../../../public/images/slider-img.jpg"
import img2 from "../../../public/images/slider-img1.jpg"
import img3 from "../../../public/images/slider-img2.jpg"
import "./home.css"


export default function HomePage({props}){
    return(
        <div className="home-page-content">
            <Carousel>
                <Carousel.Item>
                    <Nav.Link href="#" className="ti-arrow-right">
                        <img src={img1} className="w-100" alt="first"/>
                        <div className="slide-info">
                            <div className="slide-con">
                                <b>Healthcare</b>
                                <h3>Health Insurance</h3>
                                <p>For individuals or family, we have you covered.</p>
                            </div>
                        </div>
                    </Nav.Link>
                </Carousel.Item>
                <Carousel.Item>
                    <Nav.Link href="#" className="ti-arrow-right">
                        <img src={img2} className=" w-100" alt="second"/>
                        <div className="slide-info">
                            <div className="slide-con">
                                <b>Lifecare</b>
                                <h3>Peace of Mind</h3>
                                <p>24/7 support, we're always by your side.</p>
                            </div>
                        </div>
                    </Nav.Link>
                </Carousel.Item>
                <Carousel.Item>
                    <Nav.Link href="#" className="ti-arrow-right">
                        <img src={img3} className=" w-100" alt="third"/>
                        <div className="slide-info">
                            <div className="slide-con">
                                <b>Healthcare</b>
                                <h3>Affordable</h3>
                                <p>With the largest selection, we are the most competitive.</p>
                            </div>
                        </div>
                    </Nav.Link>
                </Carousel.Item>
            </Carousel>
            <div className="container">
                <div className="row">
                    <section className="col">
                        <div className="intro">
                            <h2>Welcome to ACME Insurance</h2>
                            <p>We have the largest selection of health plans in the state.</p>
                            <ul className="row">
                                <li className="col-sm-4">
                                    <i className="ti-headphone-alt"></i>
                                    <h3>27x7 Support</h3>
                                    <p>Our agents are available around the clock.</p>
                                </li>
                                <li className="col-sm-4">
                                    <i className="ti-marker-alt"></i>
                                    <h3>Easy Claim system</h3>
                                    <p>Fast and easy approval</p>
                                </li>
                                <li className="col-sm-4">
                                    <i className="ti-email"></i>
                                    <h3>Get Started with us</h3>
                                    <p>Shop for plans by clicking the shop plans button above.</p>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}