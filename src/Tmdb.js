

const API_KEY = '8199da3af0bfd0ed7d9f197618af7578';
// minha chave da API;

const API_BASE = 'https://api.themoviedb.org/3';
// base de dados de onde eu tirei os filmes

/*
- originais da netflix;
- recomendados (filmes em destaque - trending);
- em alta (top rated);
- ação
- comédia
- terror
- romance
- documentários

 */

/* Pega o resultado do JSON para cada um dos generos;
retorna um JSON para cada um dos;

async: FAZ UMA REQUISICAO PARA UM SERVIÇO EXTERNO
await: faz a requisicao e espera a resposta pra poder 
armazenar no array item */

const basicFecth = async (endpoint) => {

    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();

    return json;
}

export default { // pega todas as listas e coloca todas em seu lugar;

    getHomeList: async () => {

        return [

            // Originais Netflix
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                // faz a requisicao e 
                // retorna aquele tipo de seriado/filme
                items : await basicFecth(`/discover/tv/?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },

            // Recomendados
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items : await basicFecth(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },

            // Em Alta
            {
                slug: 'toprated',
                title: 'Em Alta',
                items : await basicFecth(`/movie/top_rated?&language=pt-BR&api_key=${API_KEY}`)
            },

            // Gêneros

            // Ação
            {
                slug: 'action',
                title: 'Ação',
                items : await basicFecth(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },

            // Comédia
            {
                slug: 'comedy',
                title: 'Comédia',
                items : await basicFecth(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },

            // Terror
            {
                slug: 'horror',
                title: 'Terror',
                items : await basicFecth(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },

            // Romance
            {
                slug: 'romance',
                title: 'Romance',
                items : await basicFecth(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },

            // Documentários
            {
                slug: 'documentary',
                title: 'Documentários',
                items : await basicFecth(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },



            /* Resultado: Peguei a lista de TODOS os filmes que eu
            quero. Cada um com sua chave específica. */

        ];
    },

    getMovieInfo: async (movieId,type) => {

        let info = {};

        if (movieId) {

            switch (type) {

                case 'movie':

                    info = await basicFecth(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)

                break;

                case 'tv': 

                    info = await basicFecth(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)

                break;

                default: 

                    info = null;
                break;

            }
        

        }

        return info;


    }
}