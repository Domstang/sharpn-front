import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Header.css";
import Button from "react-bootstrap/Button";
import {ReactComponent as DataSharing } from '../../assets/home/data-sharing.svg';

export default (function Header() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="main-bg">
            <div className="main-content">
              <Container>
                <Row className="justify-content-md-center align-items-center">
                  <Col md="6" className="left-col">
                    <span className="left-col-text">
                      Make your links shorter & share them around the world!
                    </span>
                    <br />
                    <p className="left-col-subtext mt-3">
                      For a full experience of our URL Shortener, please Sign
                      In/Up so you can retrieve all your links, stats, edit them... and more!
                    </p>
                    <Row className="mt-5">
                      <Col md="auto">
                        <div className="main-btn">
                          <Button size="lg" className="sin-up-btn">
                            SIGN UP
                          </Button>
                          <Button size="lg" className="sin-in-btn">
                            LOG IN
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6" className="d-none d-lg-block">
                    <DataSharing />
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
});
