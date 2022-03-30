import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import axios from "axios";
import styled from "styled-components";

export default function SelectSeats({completePurchase}) {
    const [seats, setSeats] = useState([]);
    const [selecteds, setSelecteds] = useState(new Map());
    const [info1, setInfo1] = useState([]);
    const [info2, setInfo2] = useState([]);
    const [info3, setInfo3] = useState([]);
    const [dataClient, setDataClient] = useState({clientName:"", clientCPF:""});
    const {sessionId} = useParams();
    const navigate = useNavigate();

	useEffect(() => {
		const promise = axios.get(`
        https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`);
		promise.then(response =>  {
            setSeats(response.data.seats);
            setInfo1(response.data);
            setInfo2(response.data.movie);
            setInfo3(response.data.day);
        });
        promise.catch(error => console.log(error.response));
	}, []);

    return (seats.length > 0) ? (
        <ThirdScreen>
            <Top />
            <Seats seats={seats} selecteds={selecteds} setSelecteds={setSelecteds}/>
            <UserInformations completePurchase={completePurchase} info1={info1} info2={info2} info3={info3} 
            navigate={navigate} selecteds={selecteds} dataClient={dataClient} setDataClient={setDataClient}/>
            <Bottom info1={info1} info2={info2} info3={info3}/>
        </ThirdScreen>
    ) : (<p>Loading...</p>); /* configurar tela de loading */
}

function Top() {
    return (
        <>
            <Link to={`/`} style={{ textDecoration: 'none' }}>
            <Header>
                <h1>CINEFLEX</h1>
            </Header>
            </Link>
            <h3>Selecione o(s) assento(s)</h3>
        </>
    )
}

function Seats({seats, selecteds, setSelecteds}) {
    return (
        <>
            <DisplaySeats seats={seats}>
                {
                    seats.map(seat => {
                        const {id, name, isAvailable} = seat;
                        return <Seat key={id} id={id} name={name} isAvailable={isAvailable} 
                        selecteds={selecteds} setSelecteds={setSelecteds}></Seat>
                    })
                }
            </DisplaySeats>
            <LegendStatus></LegendStatus>
        </>
    )
}

function Seat({id, name, isAvailable, selecteds, setSelecteds}) {

    function selectOnClick() {
        const selected  = selecteds.has(id); 
        if (selected) {
            selecteds.delete(id);
            setSelecteds(new Map(selecteds));
        } else {
            setSelecteds(new Map(selecteds.set(id, name)));
        }
    }

    function checkIsAvailable(){
        if (isAvailable){
            return <button key={id} className={selecteds.has(id) ? 'selected' : ''} 
            onClick={selectOnClick}>{name}</button>
        } else {
            return <button key={id} className='unavailable' 
            onClick={() => alert("Este assento já está ocupado!")}>{name}</button>
        }
    }

    return (
        <Seat_>
            {checkIsAvailable()}
        </Seat_>
    )
}

function LegendStatus() {
    return (
        <Legend>
            <div>
                <div className="selected"></div>
                <p>Selecionado</p>
            </div>
            <div>
                <div className="available"></div>
                <p>Disponível</p>
            </div>
            <div>
                <div className="unavailable"></div>
                <p>Indisponível</p>
            </div>
        </Legend>
    )
}

function UserInformations({completePurchase, navigate, info1, info2, info3, selecteds, dataClient, setDataClient}) {

    function confirmPurchase(event) {
        event.preventDefault();
        const URL = 'https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many';
        const promise = axios.post(URL, {
            ids: [...selecteds.keys()], 
            name: dataClient.clientName, 
            cpf: dataClient.clientCPF
        })
        promise.then(response => {
            completePurchase({
                movie: info2.title,
                day: info3.date,
                showtime: info1.name,
                seats: selecteds, 
                client: dataClient
            })
            navigate("/sucess");
        })
    }

    return (
        <>
            <Forms onSubmit={confirmPurchase}>
                <label htmlFor="clientName">Nome do cliente:</label>
                <input type="text" id="clientName" placeholder="Digite seu nome..." required 
                onChange={(e) => setDataClient({...dataClient, clientName: e.target.value})} />
                <label htmlFor="clientCPF">CPF do cliente:</label>
                <input type="text" id="clientCPF" placeholder="Digite seu CPF..." required 
                onChange={(e) => setDataClient({...dataClient, clientCPF: e.target.value})} />
                <div>
                    <button>Reservar assento(s)</button>
                </div>
            </Forms>
        </>
    )
}

function Bottom({info1, info2, info3}) {
    return (
        <Footer>
            <Poster>
                <img src={info2.posterURL} alt={info2.title}/>
            </Poster>
            <div>
                <h2>{info2.title}</h2>
                <h4>{info3.weekday} - {info1.name}</h4>
            </div>
        </Footer>
    )
}

const ThirdScreen = styled.section`
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
const DisplaySeats = styled.section`
    & {
        max-width: 330px;
        display: flex;
        flex-wrap: wrap;
        margin: 0px auto 0px auto;
    }
`
const Seat_ = styled.div`
    button {
        width: 26px;
        height: 25px;
        box-sizing: border-box;
        border-radius: 12px;
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.04em;
        color: #000000;
        justify-content: center;
        padding: 1px 0px 0px 1px;
        margin: 0px 7px 18px 0px;
        background: #C3CFD9;
        border: 1px solid #808F9D;
    }

    button.selected {
        background: #8DD7CF;
        border: 1px solid #45BDB0;
    }

    button.unavailable {
        background: #FBE192;
        border: 1px solid #F7C52B;
    }
`
const Legend = styled.div`
    & {
        width: 100vw;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    p {
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 15px;
        display: flex;
        align-items: center;
        letter-spacing: -0.013em;
        color: #4E5A65;
        margin-top: 7px;
    }

    .selected {
        width: 25px;
        height: 25px;
        box-sizing: border-box;
        border-radius: 17px;
        background: #8DD7CF;
        border: 1px solid #45BDB0;
    }

    .available {
        width: 25px;
        height: 25px;
        box-sizing: border-box;
        border-radius: 17px;
        background: #C3CFD9;
        border: 1px solid #808F9D;
    }

    .unavailable {
        width: 25px;
        height: 25px;
        box-sizing: border-box;
        border-radius: 17px;
        background: #FBE192;
        border: 1px solid #F7C52B;
    }
`
const Forms = styled.form`
    & {
        width: calc(100vw - 48px);
        margin: 42px auto 57px auto;
        display: flex;
        flex-direction: column;
        align-self: start;
    }

    * {
        margin: 5px 0 0 0;
    }

    input {
        width: 100%;
        height: 51px;
        padding-left: 18px;
        font-style: italic;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        color: #AFAFAF;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 3px;
        margin: 7px 0px 15px 0px;
    }

    button {
        width: 225px;
        height: 42px;
        background: #E8833A;
        border-radius: 3px;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.04em;
        color: #FFFFFF;
        justify-content: center;
        border-style: none;
        margin-bottom: 117px;
    }

    div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
const Footer = styled.div`
    & {
        position: fixed;
        width: 100vw;
        height: 117px;
        left: 0px;
        bottom: 0px;
        background: #DFE6ED;
        border-top: 1px solid #9EADBA;
        display: flex;
        align-items: center;
    }

    h2 {
        width: 240px;
        height: 40px;
        font-style: normal;
        font-weight: 400;
        font-size: 26px;
        line-height: 30px;
        display: flex;
        align-items: center;
        color: #293845;
    }

    h4 {
        width: 240px;
        height: 40px;
        font-style: normal;
        font-weight: 400;
        font-size: 26px;
        line-height: 30px;
        display: flex;
        align-items: center;
        color: #293845;
    }
`
const Poster = styled.div`
    & {
        width: 64px;
        height: 89px;
        background: #FFFFFF;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
        margin-right: 14px;
    }

    img {
        width: 48px;
        height: 72px;
    }
`