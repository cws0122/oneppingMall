import './App.css'
import {Container, Navbar, Nav, Row, Col} from 'react-bootstrap';
import {useState} from "react";
import product from './data.js';

function App() {

    let [shoose, setShoose] = useState(product);

  return (
      <div className="App">
          <Navbar bg="dark" data-bs-theme="dark">
              <Container fluid className="navTitle">
                  <Navbar.Brand href="#home">oneppingMall</Navbar.Brand>
                  <Nav className="me-auto">
                      <Nav.Link href="#home">Home</Nav.Link>
                      <Nav.Link href="#features">Features</Nav.Link>
                      <Nav.Link href="#pricing">Pricing</Nav.Link>
                  </Nav>
              </Container>
          </Navbar>

          <div className="main-bg"></div>

          <Container>
              <Row>
                  {
                      shoose.map(function (value, idx){
                         return (
                             <Col key={idx}>
                                 <img src={`https://codingapple1.github.io/shop/shoes${idx + 1}.jpg`} width="80%" alt=""/>
                                 <h4>{value.title}</h4>
                                 <p>{value.content}</p>
                                 <p>{value.price}원</p>
                             </Col>
                         );
                      })
                  }
              </Row>
          </Container>

      </div>
  )
}

export default App
