

import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import './App.css'
import FeaturedMovie from './components/FeaturedMovie';
import Header from './Header';

// UseState é usado p/ salvar os filmes; 


export default () => {

  const [movieList, setMovieList] = useState([]);
  // lista para ser exibida;

  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {

    const loadAll = async () => {

      // Pegando a lista total;

      let list = await Tmdb.getHomeList();
      setMovieList(list);
      // console.log(list)

      // Pegando o Featured - filme em destaque

      // VAI SER PEGO ALEATORIAMENTE ALGUM FILME DO
      // ORIGINALS NETFLIX

      let originals = list.filter(i=>i.slug === 'originals');
      // Peguei os originais netflix;

      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      // sortea dentre da listagem dos originals netflix;

      let chosen = originals[0].items.results[randomChosen];
      // pega o filme/serie especifico;

      let chosenInfo = await Tmdb.getMovieInfo(chosen.id,'tv');
      // escolhe uma serie que tem temporadas, (o resto da prog está na Tmdb)

      setFeaturedData(chosenInfo);
    }

    loadAll();
    // https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png

  }, []);

  useEffect(()=> {

    const scrollListener = () => {

      if (window.scrollY > 10) {

        setBlackHeader(true);

      } else {

        setBlackHeader(false);

      }

    }

    window.addEventListener('scroll', scrollListener);

    return () => {

      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (

    <div className="page">

      <Header black={blackHeader}/>

      {featuredData &&

        <FeaturedMovie item={featuredData} />

      }

      <section className="lists">

        {movieList.map((item, key) => (

          <div>

            <MovieRow key={key}
            title={item.title}
            items={item.items}
            />

           {/* Criado o Componente do MovieRow*/}
           {/* Passando duas props: A prop Title e Items*/}
          </div>

        ))}

      </section>
      <footer>

          Feito com 
          <span role="img" aria-label="coração"> ♥ </span> pela B7Web<br></br>
          Direitos de Imagem do site Netflix<br></br>
          Dados pegos do site Themoviedb.org
 
      </footer>

          {movieList.length <=0 && 
            <div className="loading">

              <img src="https://64.media.tumblr.com/5bf8ba688ff3553b900a40dad2bbc1e0/tumblr_inline_pl93uu9rT41t9ij1a_1280.gifv"
               alt="Carregando">
              </img>  
            </div>
          }
    </div>

  );
}