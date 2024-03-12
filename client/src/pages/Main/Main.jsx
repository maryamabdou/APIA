import {React, useEffect, useState} from "react";
import * as bootstrap from 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import simInt_image from "../../assets/images/portfolio/thumbnails/1.jpg";
import emotionRecog_image from "../../assets/images/portfolio/thumbnails/2.jpg";
import eyeTrack_image from "../../assets/images/portfolio/thumbnails/3.jpg";
import "./styles.css";
import Model from 'react-modal';
import Login_Popup from "../../components/Login_Popup";
import Signin_popup from "../../components/Signin_popup";

function Main() {
    const[visible,setvisible]=useState(false)
    const[visible2,setvisible2]=useState(false)

    useEffect(() => {
        // Navbar shrink function
        const navbarShrink = () => {
            const navbarCollapsible = document.getElementById('mainNav');
            if (!navbarCollapsible) {
                return;
            }
            if (window.scrollY === 0) {
                navbarCollapsible.classList.remove('navbar-shrink');
            } else {
                navbarCollapsible.classList.add('navbar-shrink');
            }
        };

        // Shrink the navbar
        navbarShrink();

        // Shrink the navbar when the page is scrolled
        document.addEventListener('scroll', navbarShrink);

        // Activate Bootstrap scrollspy on the main nav element
        const mainNav = document.getElementById('mainNav');
        if (mainNav) {
            new bootstrap.ScrollSpy(document.body, {
                target: '#mainNav',
                rootMargin: '0px 0px -40%',
            });
        }

        // Collapse responsive navbar when toggler is visible
        const navbarToggler = document.querySelector('.navbar-toggler');
        const responsiveNavItems = [].slice.call(
            document.querySelectorAll('#navbarResponsive .nav-link')
        );
        responsiveNavItems.map(function (responsiveNavItem) {
            responsiveNavItem.addEventListener('click', () => {
                if (window.getComputedStyle(navbarToggler).display !== 'none') {
                    navbarToggler.click();
                }
            });
        });

    }, []);

    return (
        <div>
            {/* Navigation */}
            <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
                <div className="container px-4 px-lg-5">

                    

                <a className="navbar-brand" onClick={()=>setvisible(true)}>Login</a>
                    <Model isOpen={visible} onRequestClose={()=>setvisible(false)} style={{
                        overlay: { // Style for the overlay (background)
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black overlay with reduced opacity
                        },
                        content:{width:'40%',
                        height:'70%',
                        margin: 'auto',
                        backgroundColor: "#B8A995",
                      } 
                }}>
                        <Login_Popup/>
                        
                        {/* <a onClick={()=>setvisible(false)}>close model</a> */}
                    </Model>

                    <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" onClick={()=>setvisible2(true)}>Sign Up</a>
                    <Model isOpen={visible2} onRequestClose={()=>setvisible2(false)} style={{
                        overlay: { // Style for the overlay (background)
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black overlay with reduced opacity
                        },
                        content:{width:'40%',
                        height:'70%',
                        margin: 'auto',
                        backgroundColor: "#B8A995",
                      } 
                }}>
                    

                        <Signin_popup/>
                        {/* <a onClick={()=>setvisible(false)}>close model</a> */}
                    </Model>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto my-2 my-lg-0">
                            <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                            <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
                            <li className="nav-item"><a className="nav-link" href="#portfolio">Portfolio</a></li>
                            <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Masthead */}
            <header className="masthead">
                <div className="container px-4 px-lg-5 h-100">
                    <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-end">
                            <h1 className="text-white font-weight-bold">APIA</h1>
                            <h3 className="text-white-75 mb-5">Your Interview Performance, Our Expertise</h3>
                            <hr className="divider" />
                        </div>
                        <div className="col-lg-8 align-self-baseline">
                            <h4 className="text-white-75 mb-5">Sharpen your interview edge. Simulate real-world scenarios with advanced AI coaching.</h4>
                            <a className="btn btn-primary btn-xl" href="#about">Find Out More</a>
                        </div>
                    </div>
                </div>
            </header>

            {/* About */}
            <section className="page-section bg-primary" id="about">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="text-white mt-0">We've got what you need!</h2>
                            <hr className="divider divider-light" />
                            <p className="text-white-75 mb-4">Unleash the power of AI in your job search! Meet APIA, the intelligent interview companion designed to elevate your performance and boost your confidence.</p>
                            <a className="btn btn-light btn-xl" href="#services">Get Started!</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="page-section" id="services">
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">At Your Service</h2>
                    <hr className="divider" />
                    <div className="row gx-4 gx-lg-5">
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="mt-5">
                                <div className="mb-2"><span id="boot-icon" className="bi bi-robot" style={{ fontSize: '45px', color: 'rgb(237, 95, 30)', opacity: 1, WebkitTextStrokeWidth: 0 }}></span></div>
                                <h3 className="h4 mb-2">Real Human-Like Avatar</h3>
                                <p className="text-muted mb-0">Experience the future of interaction. Engage with lifelike AI avatars, indistinguishable from real humans</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="mt-5">
                                <div className="mb-2"><span id="boot-icon" className="bi bi-eye" style={{ fontSize: '45px', color: 'rgb(237, 95, 30)' }}></span></div>
                                <h3 className="h4 mb-2">Eye Tracking</h3>
                                <p className="text-muted mb-0">Unlock deeper insights. Understand user behavior and optimize experiences with real-time eye tracking</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="mt-5">
                                <div className="mb-2"><span id="boot-icon" className="bi bi-emoji-neutral" style={{ fontSize: '45px', color: 'rgb(237, 95, 30)' }}></span></div>
                                <h3 className="h4 mb-2">Facial Emotional Recognition</h3>
                                <p className="text-muted mb-0">Uncover hidden insights. Gain valuable customer sentiment analysis through advanced facial emotional recognition.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="mt-5">
                                <div className="mb-2"><span id="boot-icon" className="bi bi-calculator" style={{ fontSize: '45px', color: 'rgb(237, 95, 30)' }}></span></div>
                                <h3 className="h4 mb-2">Scoring System</h3>
                                <p className="text-muted mb-0">Evaluate interviews objectively: Score key attributes and store data.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Portfolio */}
            <div id="portfolio">
                <div className="container-fluid p-0">
                    <div className="row g-0">
                        <div className="col-lg-4 col-sm-6">
                            <a className="portfolio-box" href="src/pages/Man/assets/img/portfolio/thumbnails/1.jpg" title="APIA">
                                <img className="img-fluid" src={simInt_image} alt="..." />
                                <div className="portfolio-box-caption">
                                    <div className="project-category text-white-50">Category</div>
                                    <div className="project-name">Simulated Interview</div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <a className="portfolio-box" href="src/pages/Man/assets/img/portfolio/fullsize/2.jpg" title="APIA">
                                <img className="img-fluid" src={emotionRecog_image} alt="..." />
                                <div className="portfolio-box-caption">
                                    <div className="project-category text-white-50">Category</div>
                                    <div className="project-name">Facial Emotional Recognition</div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <a className="portfolio-box" href="src/pages/Man/assets/img/portfolio/fullsize/3.jpg" title="APIA">
                                <img className="img-fluid" src={eyeTrack_image} alt="..." />
                                <div className="portfolio-box-caption">
                                    <div className="project-category text-white-50">Category</div>
                                    <div className="project-name">Eye Tracking</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact */}
            <section className="page-section" id="contact">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6 text-center">
                            <h2 className="mt-0">Let's Get In Touch!</h2>
                            <hr className="divider" />
                            <p className="text-muted mb-5">For any inquiries, send us a message, and we will get back to you as soon as possible!</p>
                        </div>
                    </div>
                    <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
                        <div className="col-lg-6">
                            <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                                {/* Name input */}
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                                    <label htmlFor="name">Full name</label>
                                    <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                                </div>
                                {/* Email address input */}
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" />
                                    <label htmlFor="email">Email address</label>
                                    <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                    <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                                </div>
                                {/* Phone number input */}
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="phone" type="tel" placeholder="(123) 456-7890" data-sb-validations="required" />
                                    <label htmlFor="phone">Phone number</label>
                                    <div className="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                                </div>
                                {/* Message input */}
                                <div className="form-floating mb-3">
                                    <textarea className="form-control" id="message" type="text" placeholder="Enter your message here..." style={{ height: '10rem' }} data-sb-validations="required"></textarea>
                                    <label htmlFor="message">Message</label>
                                    <div className="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                                </div>
                                {/* Submit success message */}
                                <div className="d-none" id="submitSuccessMessage">
                                    <div className="text-center mb-3">
                                        <div className="fw-bolder">Form submission successful!</div>
                                        To activate this form, sign up at
                                        <br />
                                        <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                    </div>
                                </div>
                                {/* Submit error message */}
                                <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
                                {/* Submit Button */}
                                <div className="d-grid"><button className="btn btn-primary btn-xl disabled" id="submitButton" type="submit">Submit</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-light py-5">
                <div className="container px-4 px-lg-5">
                    <div className="small text-center text-muted">Copyright &copy; 2024 - APIA</div>
                </div>
            </footer>
        </div>
    );
};
export default Main;
