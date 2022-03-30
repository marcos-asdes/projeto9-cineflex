/* import { useState, useEffect } from "react";
 */import { Link } from "react-router-dom"; 
/* import axios from "axios"; */
import styled from "styled-components";


export default function RequestCompleted() {
    return (
        <FourthScreen>
            <Top></Top>
            {/* <Main></Main> */}
        </FourthScreen>
    )
}

function Top(){
    return (
        <>
            <Link to={`/`} style={{ textDecoration: 'none' }}>
            <Header>
                <h1>CINEFLEX</h1>
            </Header>
            </Link>
            <h3>Pedido feito com sucesso!</h3>
        </>
    )
}

const FourthScreen = styled.section`
    & {
        background-color: #FFFFFF;
        display: flex;
        flex-direction: column;
    }

    h3 {
        width: 100vw;
        height: 110px;
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.04em;
        color: #293845;
        align-items: center;
        justify-content: center;
        margin-top: 67px;
    }
`
const Header = styled.div`
    & {
        background-color: #C3CFD9;
        width: 100vw;
        height: 67px;
        left: 0px;
        top: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
    }

    h1 {
        font-style: normal;
        font-weight: 400;
        font-size: 34px;
        line-height: 40px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #E8833A;
    }
`