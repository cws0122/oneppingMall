import './App.css'
import {Container, Navbar, Nav, Row, Col} from 'react-bootstrap';
import {useState} from "react";
import product from './data.js';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import Detail from './components/Detail.jsx';
import axios from "axios";


function App() {

    let [shoose, setShoose] = useState(product);
    let navigate = useNavigate();
    let [buttonCnt, setButtonCnt] = useState(0);

    return (
        <div className="App">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container fluid className="navTitle">
                    <Navbar.Brand onClick={() => {
                        navigate('/');
                    }}>oneppingMall</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => {
                            navigate('/');
                        }}>홈</Nav.Link>
                        <Nav.Link onClick={() => {
                            navigate('/detail');
                        }}>상세 페이지</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>


            {/* Routes는 Route를 감싸는 컨테이너 역할 */}
            <Routes>
                {/*
                특정 경로에 어떤 component를 보여줄지 정하는 태그.
              */}
                <Route path="/" element={
                    <>
                        <div className="main-bg"></div>
                        <Container>
                            <Row>
                                {
                                    shoose.map(function (value, idx) {
                                        return (
                                            <Col key={idx}>
                                                <img src={`https://codingapple1.github.io/shop/shoes${idx + 1}.jpg`}
                                                     width="80%" alt=""/>
                                                <h4>{value.title}</h4>
                                                <p>{value.content}</p>
                                                <p>{value.price}원</p>
                                            </Col>
                                        );
                                    })
                                }
                            </Row>
                        </Container>
                    </>
                }/>

                {/* :/ -> url 파라미터. */}
                <Route path="/detail/:seq" element={
                    <Detail shoose={shoose}/>
                }/>

                <Route path="/about" element={
                    <About/>
                }/>


                {/*
                이렇게 작성 시 계층형 구조처럼 /about/member로 접속 시 /about도 보여주고 member도 보여준다.
                허나 최상위 Route에서 <Outlet>을 사용하여 자식 Route가 보여질 위치를 정해주지 않는다면 보이지 않는다.
              */}
                <Route path="/about" element={<About/>}>
                    <Route path="member" element={<div>멤버임</div>}/>
                    <Route path="location" element={<div> 위치 정보임. </div>}/>
                </Route>

                <Route path="/event" element={<Event/>}>
                    <Route path="firstorder" element={<div>첫 주문시 양배추즙 서비스</div>}/>
                    <Route path="birthday" element={<div>생일기념 쿠폰받기</div>}/>
                </Route>

                {/* 404페이지는 *로 만들면 된다. */}
                <Route path="*" element={
                    <div>없는 페이지입니다.</div>
                }/>

            </Routes>

            <button onClick={() => {
                if (buttonCnt === 0) {
                    axios.get('https://codingapple1.github.io/shop/data2.json')
                        .then((response) => {
                            let copyShose = [...shoose];
                            for (const item of response.data) {
                                copyShose.push(item);
                            }
                            setShoose(copyShose);
                        })
                        .catch((reason) => { // 예외처리 시 사용.
                            console.log(reason.message);
                        });
                    setButtonCnt(buttonCnt + 1);
                } else if (buttonCnt === 1) {
                    axios.get('https://codingapple1.github.io/shop/data3.json')
                        .then((response) => {
                            let copyShose = [...shoose, ...response.data];
                            setShoose(copyShose);
                        })
                        .catch((reason) => { // 예외처리 시 사용.
                            console.log(reason.message);
                        });
                    setButtonCnt(buttonCnt + 1);
                } else {
                    alert('상품이 모두 표시중입니다.');
                }

                // ajax post로 보내는 방법.
                axios.post('/test', {name: 'kim'});

                // 여러가지 요청을 함께 보낼때 , 모든 요청이 끝나고 then을 하고싶을 떄
                Promise.all([axios.get('/url1'), axios.get('/url1')])
                    .then()
            }}>버튼
            </button>

        </div>
    );
}

function About() {
    return (
        <div>
            <h4>회사정보임</h4>
            {/* nested routes의 element를 보여주는걸 설정하는 Outlet */}
            <Outlet></Outlet>
        </div>
    );
}

function Event() {
    return (
        <div>
            <h4>오늘의 이벤트</h4>
            {/* nested routes의 element를 보여주는걸 설정하는 Outlet */}
            <Outlet></Outlet>
        </div>
    );
}

export default App
