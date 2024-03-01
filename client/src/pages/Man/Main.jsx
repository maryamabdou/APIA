import * as bootstrap from 'bootstrap';
import SimpleLightbox from 'simplelightbox';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useEffect } from "react";
import "./css/styles.css"


function Main() {
    window.addEventListener('DOMContentLoaded', event => {

        // Navbar shrink function
        var navbarShrink = function () {
            const navbarCollapsible = document.body.querySelector('#mainNav');
            if (!navbarCollapsible) {
                return;
            }
            if (window.scrollY === 0) {
                navbarCollapsible.classList.remove('navbar-shrink')
            } else {
                navbarCollapsible.classList.add('navbar-shrink')
            }

        };

        // Shrink the navbar 
        navbarShrink();

        // Shrink the navbar when page is scrolled
        document.addEventListener('scroll', navbarShrink);

        // Activate Bootstrap scrollspy on the main nav element
        const mainNav = document.body.querySelector('#mainNav');
        if (mainNav) {
            new bootstrap.ScrollSpy(document.body, {
                target: '#mainNav',
                rootMargin: '0px 0px -40%',
            });
        };

        // Collapse responsive navbar when toggler is visible
        const navbarToggler = document.body.querySelector('.navbar-toggler');
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

        // Activate SimpleLightbox plugin for portfolio items
        new SimpleLightbox({
            elements: '#portfolio a.portfolio-box'
        });

    });

    return(
        <div>
            {/* Navigation */}
            <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
                <div class="container px-4 px-lg-5">
                    <a class="navbar-brand" href="#page-top">Login</a>
                    <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <a class="navbar-brand" href="#page-top">Sign Up</a>
                    <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ms-auto my-2 my-lg-0">
                            <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                            <li class="nav-item"><a class="nav-link" href="#services">Services</a></li>
                            <li class="nav-item"><a class="nav-link" href="#portfolio">Portfolio</a></li>
                            <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Masthead */}
            <header class="masthead">
                <div class="container px-4 px-lg-5 h-100">
                    <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                        <div class="col-lg-8 align-self-end">
                            <h1 class="text-white font-weight-bold">APIA</h1>
                            <h3 class="text-white-75 mb-5">Your Interview Performance, Our Expertise</h3>
                            <hr class="divider" />
                        </div>
                        <div class="col-lg-8 align-self-baseline">
                        <h4 class="text-white-75 mb-5">Sharpen your interview edge. Simulate real-world scenarios with advanced AI coaching.</h4>
                            <a class="btn btn-primary btn-xl" href="#about">Find Out More</a>
                        </div>
                    </div>
                </div>
            </header>

            {/* About */}
            <section class="page-section bg-primary" id="about">
                <div class="container px-4 px-lg-5">
                    <div class="row gx-4 gx-lg-5 justify-content-center">
                        <div class="col-lg-8 text-center">
                            <h2 class="text-white mt-0">We've got what you need!</h2>
                            <hr class="divider divider-light" />
                            <p class="text-white-75 mb-4">Unleash the power of AI in your job search! Meet APIA, the intelligent interview companion designed to elevate your performance and boost your confidence.</p>
                            <a class="btn btn-light btn-xl" href="#services">Get Started!</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section class="page-section" id="services">
                <div class="container px-4 px-lg-5">
                    <h2 class="text-center mt-0">At Your Service</h2>
                    <hr class="divider" />
                    <div class="row gx-4 gx-lg-5">
                        <div class="col-lg-3 col-md-6 text-center">
                            <div class="mt-5">
                                <div class="mb-2"><span id="boot-icon" class="bi bi-robot" style="font-size: 45px; color: rgb(237, 95, 30); opacity: 1; -webkit-text-stroke-width: 0px;"></span></div>
                                <h3 class="h4 mb-2">Real Human-Like Avatar</h3>
                                <p class="text-muted mb-0">Experience the future of interaction. Engage with lifelike AI avatars, indistinguishable from real humans</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 text-center">
                            <div class="mt-5">
                                <div class="mb-2"><span id="boot-icon" class="bi bi-eye" style="font-size: 45px; color: rgb(237, 95, 30);"></span></div>
                                <h3 class="h4 mb-2">Eye Tracking</h3>
                                <p class="text-muted mb-0">Unlock deeper insights. Understand user behavior and optimize experiences with real-time eye tracking</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 text-center">
                            <div class="mt-5">
                                <div class="mb-2"><span id="boot-icon" class="bi bi-emoji-neutral" style="font-size: 45px; color: rgb(237, 95, 30);"></span></div>
                                <h3 class="h4 mb-2">Facial Emotional Recognition</h3>
                                <p class="text-muted mb-0">Uncover hidden insights. Gain valuable customer sentiment analysis through advanced facial emotional recognition.</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 text-center">
                            <div class="mt-5">
                                <div class="mb-2"><span id="boot-icon" class="bi bi-calculator" style="font-size: 45px; color: rgb(237, 95, 30);"></span></div>
                                <h3 class="h4 mb-2">Scoring System</h3>
                                <p class="text-muted mb-0">Evaluate interviews objectively: Score key attributes and store data.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Portfolio */}
            <div id="portfolio">
                <div class="container-fluid p-0">
                    <div class="row g-0">
                    <div class="col-lg-4 col-sm-6">
                            <a class="portfolio-box" href="assets/img/portfolio/fullsize/1.jpg" title="Project Name">
                                <img class="img-fluid" src="assets/img/portfolio/thumbnails/1.jpg" alt="..." />
                                <div class="portfolio-box-caption">
                                    <div class="project-category text-white-50">Category</div>
                                    <div class="project-name">Simulated Interview</div>
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <a class="portfolio-box" href="assets/img/portfolio/fullsize/2.jpg" title="Project Name">
                                <img class="img-fluid" src="assets/img/portfolio/thumbnails/2.jpg" alt="..." />
                                <div class="portfolio-box-caption">
                                    <div class="project-category text-white-50">Category</div>
                                    <div class="project-name">Facial Emotional Recognition</div>
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <a class="portfolio-box" href="assets/img/portfolio/fullsize/3.jpg" title="Project Name">
                                <img class="img-fluid" src="assets/img/portfolio/thumbnails/3.jpg" alt="..." />
                                <div class="portfolio-box-caption">
                                    <div class="project-category text-white-50">Category</div>
                                    <div class="project-name">Eye Tracking</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact */}
            <section class="page-section" id="contact">
                <div class="container px-4 px-lg-5">
                    <div class="row gx-4 gx-lg-5 justify-content-center">
                        <div class="col-lg-8 col-xl-6 text-center">
                            <h2 class="mt-0">Let's Get In Touch!</h2>
                            <hr class="divider" />
                            <p class="text-muted mb-5">For any inquiries, send us a message and we will get back to you as soon as possible!</p>
                        </div>
                    </div>
                    <div class="row gx-4 gx-lg-5 justify-content-center mb-5">
                        <div class="col-lg-6">
                            <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                                {/* <!-- Name input--> */}
                                <div class="form-floating mb-3">
                                    <input class="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                                    <label for="name">Full name</label>
                                    <div class="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                                </div>
                                {/* <!-- Email address input--> */}
                                <div class="form-floating mb-3">
                                    <input class="form-control" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" />
                                    <label for="email">Email address</label>
                                    <div class="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                    <div class="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                                </div>
                                {/* <!-- Phone number input--> */}
                                <div class="form-floating mb-3">
                                    <input class="form-control" id="phone" type="tel" placeholder="(123) 456-7890" data-sb-validations="required" />
                                    <label for="phone">Phone number</label>
                                    <div class="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                                </div>
                                {/* <!-- Message input--> */}
                                <div class="form-floating mb-3">
                                    <textarea class="form-control" id="message" type="text" placeholder="Enter your message here..." style="height: 10rem" data-sb-validations="required"></textarea>
                                    <label for="message">Message</label>
                                    <div class="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                                </div>
                                {/* Submit success message

                                This is what your users will see when the form
                                has successfully submitted */}
                                <div class="d-none" id="submitSuccessMessage">
                                    <div class="text-center mb-3">
                                        <div class="fw-bolder">Form submission successful!</div>
                                        To activate this form, sign up at
                                        <br />
                                        <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                    </div>
                                </div>
                                {/* <!-- Submit error message-->
                                <!---->
                                <!-- This is what your users will see when there is-->
                                <!-- an error submitting the form--> */}
                                <div class="d-none" id="submitErrorMessage"><div class="text-center text-danger mb-3">Error sending message!</div></div>
                                {/* <!-- Submit Button--> */}
                                <div class="d-grid"><button class="btn btn-primary btn-xl disabled" id="submitButton" type="submit">Submit</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer class="bg-light py-5">
                <div class="container px-4 px-lg-5"><div class="small text-center text-muted">Copyright &copy; 2024 - APIA</div></div>
            </footer>

        </div>
    );
};
export default Main;
