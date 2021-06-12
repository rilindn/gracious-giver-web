import React from 'react'
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
						<li className="list-inline-item"><SocialIcon url="https://facebook.com"/></li>
						<li className="list-inline-item"><SocialIcon url="https://twitter.com/jaketrent" /></li>
						<li className="list-inline-item"><SocialIcon url="https://instagram.com" /></li>
						<li className="list-inline-item"><SocialIcon url="https://mail.google.com/" /></li>
						<li className="list-inline-item"><SocialIcon url="https://youtube.com/" /></li>
					</ul>
				</div>
				<div className="col-xs-12 col-sm-4 col-md-3">
					<h5>GETTING ABOUT</h5>
					<ul className="list-unstyled quick-links">
						<li><a href="/home">Home</a></li>
						<li><a href="/register">Join</a></li>
						<li><a href="/">Contact Us</a></li>
						<li><a href="/">List Stuff</a></li>
					</ul>
				</div>
				<div className="col-xs-12 col-sm-4 col-md-3">
					<h5>IMPORTANT STUFF</h5>
					<ul className="list-unstyled quick-links">
						<li><a href="/">About Gracious Giver</a></li>
						<li><a href="/">Privacy Policy</a></li>
						<li><a href="/">Terms of Use</a></li>
						<li><a href="/">Stuff you can't list</a></li>
					</ul>
				</div>
				<div className="col-xs-12 col-sm-4 col-md-3">
					<h5>HELPFUL TIPS</h5>
					<ul className="list-unstyled quick-links">
						<li><a href="/">Etiquette</a></li>
						<li><a href="/">Gracious Giver Articles</a></li>
						<li><a href="/">Gracious Giver Glossary</a></li>
						<li><a href="/">Help</a></li>
					</ul>
				</div>
			</div>
			<div className="d-flex justify-self-center">
				<div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
          <p className="h6">© All right Reserved.<a href="/" className="text-green ml-2" >Gracious Giver</a></p>
				</div>
			</div>	
		</div>
	</section>
    </div>
  )
}

export default Footer
