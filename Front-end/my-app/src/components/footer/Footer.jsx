import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Container, Row,ListGroup } from 'react-bootstrap'
import { List } from 'semantic-ui-react'
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons'
import { SocialIcon } from 'react-social-icons';


export const Footer = () => {
  return (
    <div>
      <section id="footer">
        <Container>
          <Row className="text-center text-xs-center text-sm-left text-md-left">
            <Col className="col-xs-12 col-sm-4 col-md-4">
              <h5>Quick links</h5>
              <ListGroup className="list-unstyled quick-links">
                <List.Item>
                  <a href="https://www.fiverr.com/share/qb8D02">
                  <FontAwesomeIcon icon={faAngleDoubleRight}/>Home
                  </a>
                </List.Item>
                <List.Item>
                  <a href="https://www.fiverr.com/share/qb8D02">
                  <FontAwesomeIcon icon={faAngleDoubleRight}/>Home
                  </a>
                </List.Item>
                <List.Item>
                  <a href="https://www.fiverr.com/share/qb8D02">
                  <FontAwesomeIcon icon={faAngleDoubleRight}/>Home
                  </a>
                </List.Item>
                <List.Item>
                  <a href="https://www.fiverr.com/share/qb8D02">
                  <FontAwesomeIcon icon={faAngleDoubleRight}/>Home
                  </a>
                </List.Item>
              </ListGroup>
            </Col>
            <Col className="col-xs-12 col-sm-4 col-md-4">
              <h5>Quick links</h5>
              <ListGroup className="list-unstyled quick-links">
                <List.Item>
                  <a href="https://www.fiverr.com/share/qb8D02">
                  <FontAwesomeIcon icon={faAngleDoubleRight}/>Home
                  </a>
                </List.Item>
                <List.Item>
                  <a href="https://www.fiverr.com/share/qb8D02">
                  <FontAwesomeIcon icon={faAngleDoubleRight}/>Home
                  </a>
                </List.Item>
                <List.Item>
                  <a href="https://www.fiverr.com/share/qb8D02">
                  <FontAwesomeIcon icon={faAngleDoubleRight}/>Home
                  </a>
                </List.Item>
                <List.Item>
                  <a href="https://www.fiverr.com/share/qb8D02">
                  <FontAwesomeIcon icon={faAngleDoubleRight}/>Home
                  </a>
                </List.Item>
              </ListGroup>
            </Col>
            <Col className="col-xs-12 col-sm-4 col-md-4">
              <h5>Quick links</h5>
              <ListGroup className="list-unstyled quick-links">
                <List.Item>
                  <a href="https://www.fiverr.com/share/qb8D02">
                    <FontAwesomeIcon icon={faAngleDoubleRight}/>Home
                  </a>
                </List.Item>
                <List.Item>
                  <a href="https://www.fiverr.com/share/qb8D02">
                  <FontAwesomeIcon icon={faAngleDoubleRight}/>Home
                  </a>
                </List.Item>
                <List.Item>
                  <a href="https://www.fiverr.com/share/qb8D02">
                  <FontAwesomeIcon icon={faAngleDoubleRight}/>Home
                  </a>
                </List.Item>
                <List.Item>
                  <a href="https://www.fiverr.com/share/qb8D02">
                  <FontAwesomeIcon icon={faAngleDoubleRight}/>Home
                  </a>
                </List.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
              <ListGroup className="d-flex list-unstyled list-inline social text-center">
                <List.Item className="list-inline-item">
                  <a href="https://www.fiverr.com/share/qb8D02">
                    <SocialIcon url="https://facebook.com"></SocialIcon>
                  </a>
                </List.Item>
                <List.Item className="list-inline-item">
                  <a href="https://www.fiverr.com/share/qb8D02">
                  <SocialIcon url="https://instagram.com"></SocialIcon>
                  </a>
                </List.Item>
                <List.Item className="list-inline-item">
                  <a href="https://www.fiverr.com/share/qb8D02">
                  <SocialIcon url="https://twitter.com/jaketrent" />
                  </a>
                </List.Item>
                <List.Item className="list-inline-item">
                  <a href="https://www.fiverr.com/share/qb8D02">
                  <SocialIcon url="https://mail.google.com/" />
                  </a>
                </List.Item>
                <List.Item className="list-inline-item">
                  <a href="https://www.fiverr.com/share/qb8D02" target="_blank">
                    <i className="fa fa-envelope"></i>
                  </a>
                </List.Item>
              </ListGroup>
            </Col>
          </Row>
          <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-12  mt-2 mt-sm-1 text-center text-white">
             
              <p className="h6">
                © All right Reversed.
                <a
                  className="text-green ml-2"
                  href="https://www.sunlimetech.com"
                  target="_blank"
                >
                  Sunlimetech
                </a>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default Footer
