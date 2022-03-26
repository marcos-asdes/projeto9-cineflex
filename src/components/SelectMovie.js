import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

export default function App() {
    const [movies, setMovies] = useState([]);

	useEffect(() => {
		const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
		promise.then(response => { setMovies(response.data); });
	}, []);

    return (
        <FirstScreen>
            <Header>
                <h1>CINEFLEX</h1>
            </Header>
            <p>Selecione o filme</p>
            <RenderCatalog>
                {
                movies.map(movie => {
                    return (
                    <Movie>
                        <img src={movie.posterURL} alt={movie.tittle} />
                    </Movie>
                    )
                })
                }
            </RenderCatalog>
        </FirstScreen>
    );
}

const FirstScreen = styled.section`
    & {
        background-color: #FFFFFF;
        display: flex;
        flex-direction: column;

    }

    p {
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