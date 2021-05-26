import React from 'react'
import { Form,Button,Col, Navbar, NavLink, Nav, Container, Image, Media } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import quoteA from "../../images/alice.png"
import quoteS from "../../images/sandra.png"
import quoteJ from "../../images/jack.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faAngleLeft,faAngleRight,faQuoteLeft,faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import arrowIcon from '../../images/arrowIcon.png'

export const WelcomePage = () => {
    return (
        <div>
        <Navbar className="d-flex justify-content-end" bg="" expand="lg">
          <Nav style={{margin:"10px 30px 0 0"}}>
            <NavLink className="d-inline text-black font-weight-bold" style={{marginRight:"20px"}} to="/">
              Log In
            </NavLink>
            <NavLink
              className="d-inline sign-up-btn text-white font-weight-bold"
              to="/department"
            >
              Sign Up
            </NavLink>
          </Nav>
      </Navbar>
      <div className="d-flex justify-content-starts align-items-center bg-img">
        <div className="d-flex flex-column review-inner-container">
        <h1 style={{fontSize:"60px"}}>Want free stuff?</h1>
        <h6>or</h6>
        <h1 style={{fontSize:"60px"}}>Got stuff to give away?</h1>
        <p style={{fontSize:"19pt"}} >Millions of people around the world are giving and 
         <br/> getting free things in their local communities.</p>
        <div className="d-flex align-items-center give-browse">
        
          <Button className="give-browse-btn text-30 font-weight-bold"><FontAwesomeIcon style={{marginRight:"15px"}} icon={faPlus}/>Give</Button>
          <h4 className="give-browse-btn-text font-weight-bold">or</h4>
          <Button className="give-browse-btn font-weight-bold">Browse<img src={arrowIcon} style={{width:"30px",margin:"0 0 10px 8px"}}></img> </Button>
          <h4 className="give-browse-btn-text font-weight-bold">items</h4>
          </div>
          </div>
          
      </div>
        <h1>What people say ...</h1>
<Carousel className="mx-auto" style={{width:"920px"}}>
  <Carousel.Item>
  <div className="carousel-inner px-5 pb-4">
                            <div className="carousel-item active">
                                <Media className="media"><Image className="rounded-circle img-thumbnail" src={quoteA} alt="" width="75"/>
                                    <div className="media-body ml-3">
                                        <blockquote className="blockquote border-0 p-0">
                                            <p className="font-italic lead"><FontAwesomeIcon className="mr-3" icon={faQuoteLeft}/>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<FontAwesomeIcon className="ml-3" icon={faQuoteRight}/></p>
                                            <footer className="blockquote-footer">Someone famous in
                                                <cite title="Source Title">Source Title</cite>
                                            </footer>
                                        </blockquote>
                                    </div>
                                </Media>
                                <Media><Image className="rounded-circle img-thumbnail" src={quoteS} alt="" width="75"/>
                                    <div className="media-body ml-3">
                                        <blockquote className="blockquote border-0 p-0">
                                        <p className="font-italic lead"><FontAwesomeIcon className="mr-3" icon={faQuoteLeft}/>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<FontAwesomeIcon className="ml-3" icon={faQuoteRight}/></p>                                            <footer className="blockquote-footer">Someone famous in
                                                <cite title="Source Title">Source Title</cite>
                                            </footer>
                                        </blockquote>
                                    </div>
                                </Media>
                                <div className="media"><img className="rounded-circle img-thumbnail" src={quoteJ} alt="" width="75"/>
                                    <div className="media-body ml-3">
                                        <blockquote className="blockquote border-0 p-0">
                                        <p className="font-italic lead"><FontAwesomeIcon className="mr-3" icon={faQuoteLeft}/>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<FontAwesomeIcon className="ml-3" icon={faQuoteRight}/></p>                                            <footer className="blockquote-footer">Someone famous in
                                                <cite title="Source Title">Source Title</cite>
                                            </footer>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        </div>
  </Carousel.Item>
  <Carousel.Item>
  <div className="carousel-inner px-5 pb-4">
                            <div className="carousel-item active">
                                <Media className="media"><Image className="rounded-circle img-thumbnail" src={quoteA} alt="" width="75"/>
                                    <div className="media-body ml-3">
                                        <blockquote className="blockquote border-0 p-0">
                                            <p className="font-italic lead"><FontAwesomeIcon className="mr-3" icon={faQuoteLeft}/>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<FontAwesomeIcon className="ml-3" icon={faQuoteRight}/></p>
                                            <footer className="blockquote-footer">Someone famous in
                                                <cite title="Source Title">Source Title</cite>
                                            </footer>
                                        </blockquote>
                                    </div>
                                </Media>
                                <Media><Image className="rounded-circle img-thumbnail" src={quoteS} alt="" width="75"/>
                                    <div className="media-body ml-3">
                                        <blockquote className="blockquote border-0 p-0">
                                        <p className="font-italic lead"><FontAwesomeIcon className="mr-3" icon={faQuoteLeft}/>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<FontAwesomeIcon className="ml-3" icon={faQuoteRight}/></p>                                            <footer className="blockquote-footer">Someone famous in
                                                <cite title="Source Title">Source Title</cite>
                                            </footer>
                                        </blockquote>
                                    </div>
                                </Media>
                                <div className="media"><img className="rounded-circle img-thumbnail" src={quoteJ} alt="" width="75"/>
                                    <div className="media-body ml-3">
                                        <blockquote className="blockquote border-0 p-0">
                                        <p className="font-italic lead"><FontAwesomeIcon className="mr-3" icon={faQuoteLeft}/>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<FontAwesomeIcon className="ml-3" icon={faQuoteRight}/></p>                                            <footer className="blockquote-footer">Someone famous in
                                                <cite title="Source Title">Source Title</cite>
                                            </footer>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        </div>
  </Carousel.Item>
  <Carousel.Item>
  <div className="carousel-inner px-5 pb-4">
                            <div className="carousel-item active">
                                <Media className="media"><Image className="rounded-circle img-thumbnail" src={quoteA} alt="" width="75"/>
                                    <div className="media-body ml-3">
                                        <blockquote className="blockquote border-0 p-0">
                                            <p className="font-italic lead"><FontAwesomeIcon className="mr-3" icon={faQuoteLeft}/>Really great app, helping to keep reusable/upcyclable "waste" out of landfill!<FontAwesomeIcon className="ml-3" icon={faQuoteRight}/></p>
                                            <footer className="blockquote-footer">Someone famous in
                                                <cite title="Source Title">Source Title</cite>
                                            </footer>
                                        </blockquote>
                                    </div>
                                </Media>
                                <Media><Image className="rounded-circle img-thumbnail" src={quoteS} alt="" width="75"/>
                                    <div className="media-body ml-3">
                                        <blockquote className="blockquote border-0 p-0">
                                        <p className="font-italic lead"><FontAwesomeIcon className="mr-3" icon={faQuoteLeft}/>People helping people - it doesn't get better than this!<FontAwesomeIcon className="ml-3" icon={faQuoteRight}/></p>                                            
                                        <footer className="blockquote-footer">Someone famous in
                                                <cite title="Source Title">Source Title</cite>
                                            </footer>
                                        </blockquote>
                                    </div>
                                </Media>
                                <div className="media"><img className="rounded-circle img-thumbnail" src={quoteJ} alt="" width="75"/>
                                    <div className="media-body ml-3">
                                        <blockquote className="blockquote border-0 p-0">
                                        <p className="font-italic lead"><FontAwesomeIcon className="mr-3" icon={faQuoteLeft}/>Wonderful service. I have found several items and always had a great experience. I also gave away several items and it was quick and easy.<FontAwesomeIcon className="ml-3" icon={faQuoteRight}/></p>                                            
                                        <footer className="blockquote-footer">Someone famous in
                                                <cite title="Source Title">Source Title</cite>
                                            </footer>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        </div>
  </Carousel.Item>
  
</Carousel>
<a className="carousel-control-prev" href="#projectCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
</a>
<a className="carousel-control-next" href="#projectCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon"></span>
</a>
</div>
    )
}
export default WelcomePage

