import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import axios from "axios";
import styled from "styled-components";

export default function SelectMovie() {
    const [movies, setMovies] = useState([]);

	useEffect(() => {
		const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
		promise.then(response => setMovies(response.data));
        promise.catch(error => console.log(error.response));
	}, []);

    return (movies.length > 0) ? (
        <FirstScreen>
            <Link to={`/`} style={{ textDecoration: 'none' }}>
            <Header>
                <h1>CINEFLEX</h1>
            </Header>
            </Link>
            <h3>Selecione o filme</h3>
            <RenderCatalog>
                {
                movies.map(movie => {
                    const {id, title, posterURL} = movie;
                    return (
                        <Link to={`/movie/${id}`} key={id}>
                        <Movie>
                            <img src={posterURL} alt={title} />
                        </Movie>
                        </Link>
                    )
                })
                }
            </RenderCatalog>
        </FirstScreen>
    ) : (<p>Loading...</p>) ; /* configurar tela de loading */
}

const FirstScreen = styled.section`
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
const RenderCatalog = styled.div`
    & {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
`
const Movie = styled.div`
    & {
        width: 145px;
        height: 209px;
        background: #FFFFFF;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 11px;
    }

    &:hover {
        cursor: pointer;
    }

    img {
        width: 129px;
        height: 193px;
    }
`