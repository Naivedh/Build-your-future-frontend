import React from 'react';
import '../css/Footer.css'
const Footer = (props) => {
    return (
        <footer className='text-center text-lg-start text-white'>
            <div className="container footer__container">
            <section className="">
                <div className="row">
                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold">
                    Build your Future
                    </h6>
                    <p>
                    Welcome to Build Your Future, your one stop destination to your goals where you can see the tutors details and book an Appointments with them.
                    </p>
                </div>

                <hr className="w-100 clearfix d-md-none" />

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold">Services</h6>
                    <p>
                    <a href="/#"className="text-white">Appointment</a>
                    </p>
                    <p>
                    <a href="/#" className="text-white">Tutors</a>
                    </p>
                
                </div>
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                    <p><i className="fas fa-home mr-3"></i> Dallas, 75252</p>
                    <p><i className="fas fa-envelope mr-3"></i> xyz@gmail.com</p>
                    <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3 text-center">
                    <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>

                    <a href="/#" role="button" className="a_color"><i className="fab_class fab fa-lg fa-facebook-f"></i></a>

                    <a href="/#" role="button" className="a_color"><i className="fab_class fab fa-lg fa-twitter"></i></a>

                    <a href="/#" role="button" className="a_color"><i className="fab_class fab fa-lg fa-google"></i></a>

                    <a href="/#" role="button" className="a_color"><i className="fab_class fab fa-lg fa-instagram"></i></a>

                    <a href="/#" role="button" className="a_color"><i className="fab_class fab fa-lg fa-linkedin"></i></a>

                    <a href="/#" role="button" className="a_color"><i className="fab_class fab fa-lg fa-github"></i></a>
                </div>
                </div>
            </section>
            </div>
            <div
                className="text-center p-3"
                style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
                >
            © 2022 Copyright:
            <a className="text-white" href="/#"
                >buildyourfuture.com</a
                >
            </div>
        </footer>
    );
}

export default Footer; 