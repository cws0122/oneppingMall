import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Nav} from "react-bootstrap";
// import styled from 'styled-components';

// CSS파일 안쓰고 JS로 스타일 하는법. styled-components , props로 변수로 받아 사용이 가능함.
// let YellowBtn = styled.button`
//     background : ${props => props.bg === 'blue' ? 'white' : 'black'};
//     color : black;
//     padding : 10px;
// `


function Detail(props) {

    // mount , update시 코드 실행
    // useEffect 안의 코드는 html 렌더링 후 동작.
    useEffect(() => {
        let timer = setTimeout(() => {
            setShowAlert(false);
        }, 2000)

        // useEffect의 return은 useEffect 동작 전에 실행되는 코드. clean up function이라고 함.
        // mount시는 실행 안되지만 unmount는 실행됨.
        return () => {
            // 타이머 제거 함수.
            clearTimeout(timer);
        }


        // []은 useEffect 실행조건을 넣을 수 있음.
        // []안에 있는 변수가 바뀔때마다 (update) 실행됨. mount될때는 한번 꼭 실행하고.
        // 컴포넌트가 mount될때만 실행되게 하고싶으면 [] 빈값으로 하면 된다.
    }, []);

    let [inputValue , setInputValue] = useState(null);

    useEffect(() => {
        let value = inputValue;

        if (value === '' || isNaN(Number(value))) {
            setShowText(true);
        }else{
            setShowText(false);
        }

    }, [inputValue]);

    let [showAlert , setShowAlert] = useState(true);
    let [showText , setShowText] = useState(false);
    let [tab , setTab] = useState(0);
    let [fade , setFade] = useState('');

    useEffect(() => {
        setTimeout(() => { setFade('end') } , 100);
        return (() => {
            setFade('');
        })
    }, []);


    // url 파라미터를 받는 함수.
    let {seq} = useParams();

    const isValidSeq = !isNaN(Number(seq)) && Number(seq) >= 0 && Number(seq) < props.shoose.length;

    return (
        <div className={`container start ` + fade}>
            {
                isValidSeq ? (
                    <div className="row">
                        {
                            showAlert === true ? <Al></Al> : null
                        }
                        {/*<BlackBox>*/}
                        {/*    <YellowBtn bg="green">버튼</YellowBtn>*/}
                        {/*    <YellowBtn bg="blue">버튼</YellowBtn>*/}
                        {/*</BlackBox>*/}
                        <div className="col-md-6">
                            <img src={`https://codingapple1.github.io/shop/shoes${parseInt(seq) + 1}.jpg`}
                                 width="100%"/>
                        </div>
                        <div className="col-md-6">
                            <h4 className="pt-5">{props.shoose[seq].title}</h4>
                            <p>{props.shoose[seq].content}</p>
                            <p>{props.shoose[seq].price}</p>
                            <button className="btn btn-danger">주문하기</button>
                        </div>
                        <input type="text" onChange={(value) => {
                            setInputValue(value.target.value);
                        }}/>
                        {
                            showText === true ? <p>그러지마세요</p> : null
                        }
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-md-12 text-center my-5">
                            <h4>찾으시는 상품이 없습니다.</h4>
                        </div>
                    </div>
                )
            }

            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={() => {
                        setTab(0);
                    }} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => {
                        setTab(1);
                    }} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => {
                        setTab(2);
                    }} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab}/>
        </div>
    );
}

function TabContent(props){
    // if(props.tab === 0){
    //     return <div>내용0</div>
    // }else if(props.tab === 1) {
    //     return <div>내용1</div>
    // }else if(props.tab === 2) {
    //     return <div>내용2</div>
    // }
    let [fade, setFade] = useState('');

    useEffect(() => {
        let a = setTimeout(() => { setFade('end') }, 100);

        // useEffect가 실행되기 전에 실행.
        return () =>{
            clearTimeout(a);
            setFade('');
        }
    }, [props.tab]);

    return (<div className={'start ' + fade}>
        {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.tab]}
    </div>)
}

function Al(){
    return (
        <div id="alert" className="alert alert-warning">
            2초이내 구매시 할인.
        </div>
    );
}

export default Detail