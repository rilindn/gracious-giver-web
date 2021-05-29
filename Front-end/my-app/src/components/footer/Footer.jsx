import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Container, Row,ListGroup } from 'react-bootstrap'
import { SocialIcon } from 'react-social-icons';


export const Footer = () => {
  return (
    <div>
      <section id="footer">
		<div className="container">
			<div className="d-flex justify-content-center text-center text-xs-center text-sm-left text-md-left">
				<div className="d-flex flex-column justify-content-center col-xs-12 col-sm-4 col-md-5">
					<h5>Follow Us</h5>
					<ul className="d-flex list-unstyled list-inline social text-center">
						<li className="list-inline-item"><a><SocialIcon url="https://facebook.com"/></a></li>
						<li className="list-inline-item"><a><SocialIcon url="https://twitter.com/jaketrent" /></a></li>
						<li className="list-inline-item"><a><SocialIcon url="https://instagram.com" /></a></li>
						<li className="list-inline-item"><a><SocialIcon url="https://mail.google.com/" /></a></li>
						<li className="list-inline-item"><a><SocialIcon url="https://youtube.com/" /></a></li>
					</ul>
				</div>
				<div className="col-xs-12 col-sm-4 col-md-3">
					<h5>GETTING ABOUT</h5>
					<ul className="list-unstyled quick-links">
						<li><a>Home</a></li>
						<li><a>Join</a></li>
						<li><a>Contact Us</a></li>
						<li><a>List Stuff</a></li>
					</ul>
				</div>
				<div className="col-xs-12 col-sm-4 col-md-3">
					<h5>IMPORTANT STUFF</h5>
					<ul className="list-unstyled quick-links">
						<li><a>About Gracious Giver</a></li>
						<li><a>Privacy Policy</a></li>
						<li><a>Terms of Use</a></li>
						<li><a>Stuff you can't list</a></li>
					</ul>
				</div>
				<div className="col-xs-12 col-sm-4 col-md-3">
					<h5>HELPFUL TIPS</h5>
					<ul className="list-unstyled quick-links">
						<li><a >Etiquette</a></li>
						<li><a >Gracious Giver Articles</a></li>
						<li><a >Gracious Giver Glossary</a></li>
						<li><a >Help</a></li>
					</ul>
				</div>
			</div>
			<div className="d-flex justify-self-center">
				<div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
          <p className="h6">© All right Reversed.<a className="text-green ml-2" >Gracious Giver</a></p>
				</div>
			</div>	
		</div>
	</section>
    </div>
  )
}

export default Footer
