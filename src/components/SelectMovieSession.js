import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; 
import axios from "axios";
import styled from "styled-components";

export default function SelectMovieSession() {
    const [sessions, setSessions] = useState([]);
    const [movie, setMovie] = useState({});
    const {movieId} = useParams();

	useEffect(() => {
		const promise = axios.get(`
        https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`);
		promise.then(response =>  {
            setSessions(response.data.days);
            setMovie(response.data);
        });
        promise.catch(error => console.log(error.response));
	}, []);

    return (sessions.length > 0) ? (
        <SecondScreen>
            <Link to={`/`} style={{ textDecoration: 'none' }}>
            <Header>
                <h1>CINEFLEX</h1>
            </Header>
            </Link>
            <h3>Selecione o horário</h3>
            <RenderSessions>
                {
                sessions.map(session => {
                    const {id, weekday, date, showtimes} = session;
                    return (
                        <Day key={id}>
                            <div>
                                <p>{weekday} - {date}</p>
                            </div>
                            <Showtimes>
                            {
                                showtimes.map(showtime => {
                                    const {name, id} = showtime;
                                    return (
                                        <Link to={`/session/${id}`} key={id} style={{ textDecoration: 'none' }}>
                                        <button>{name}</button>
                                        </Link>
                                    )

                                })
                            }
                            </Showtimes>
                        </Day>
                    )
                })
                }
            </RenderSessions>
            <Footer>
                <Poster>
                    <img src={movie.posterURL} alt={movie.title}/>
                </Poster>
                <h2>{movie.title}</h2>
            </Footer>
        </SecondScreen>
    ) : (<p>Loading...</p>); /* configurar tela de loading */
}

const SecondScreen = styled.section`
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
const RenderSessions = styled.div`
    & {
        display: flex;
        flex-direction: column;
    }
`
const Day = styled.div`
    & {
        display: flex;
        flex-direction: column;
        margin-left: 24px;
    }

    p {
        width: calc(100vw - 48px);
        height: 35px;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        display: flex;
        align-items: center;
        justify-content: start;
        letter-spacing: 0.02em;
        color: #293845;
    }
`
const Showtimes = styled.div`
    & {
        display: flex;
    }

    button {
        width: 83px;
        height: 43px;
        background: #E8833A;
        border-radius: 3px;
        border-color: #E8833A;
        border-style: none;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.02em;
        color: #FFFFFF;
        justify-content: center;
        margin: 22px 8px 23px 0;
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