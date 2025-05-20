import {useParams} from "react-router-dom";
import styled from 'styled-components';

// CSS파일 안쓰고 JS로 스타일 하는법. styled-components , props로 변수로 받아 사용이 가능함.
let YellowBtn = styled.button`
    background : ${props => props.bg === 'blue' ? 'white' : 'black'};
    color : black;
    padding : 10px;
`

let BlackBox = styled.div`
    background: grey;
    padding: 20px;
`

function Detail(props) {

    // url 파라미터를 받는 함수.
    let {seq} = useParams();

    const isValidSeq = !isNaN(Number(seq)) && Number(seq) >= 0 && Number(seq) < props.shoose.length;

    return (
        <div className="container">
            {
                isValidSeq ? (
                    <div className="row">
                        <BlackBox>
                            <YellowBtn bg="green">버튼</YellowBtn>
                            <YellowBtn bg="blue">버튼</YellowBtn>
                        </BlackBox>
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
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-md-12 text-center my-5">
                            <h4>찾으시는 상품이 없습니다.</h4>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Detail