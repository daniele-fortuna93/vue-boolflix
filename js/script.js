// FUNZIONI
function searchMovie(arrayRisultati, arrayChiamata, arrayBandiere) {
  for (var i = 0; i < arrayChiamata.length; i++) {
    arrayRisultati.push(arrayChiamata[i]);
    arrayRisultati[i].vote_average = Math.ceil(arrayRisultati[i].vote_average / 2);
    arrayRisultati[i].media_type = 'Movie';
    for (let j = 0; j < arrayBandiere.length; j++) {
      if ( arrayRisultati[i].original_language == arrayBandiere[j].originalLanguage ) {
        arrayRisultati[i].original_language = arrayBandiere[j].flag;
      }
    }
  }
}
function searchTv(arrayRisultati, arrayChiamata, arrayBandiere){
  for (var i = 0; i < arrayChiamata.length; i++) {
    arrayRisultati.push(arrayChiamata[i]);
    arrayRisultati[i].vote_average = Math.ceil(arrayRisultati[i].vote_average / 2);
    arrayRisultati[i].media_type = 'Tv Series';
    arrayRisultati[i].title = arrayRisultati[i].name;
    arrayRisultati[i].original_title = arrayRisultati[i].original_name;
    for (let j = 0; j < arrayBandiere.length; j++) {
      if ( arrayRisultati[i].original_language == arrayBandiere[j].originalLanguage ) {
        arrayRisultati[i].original_language = arrayBandiere[j].flag;
      }
    }
  }
}
function searchMulti(arrayRisultati, arrayChiamata, arrayBandiere) {
  for (var i = 0; i < arrayChiamata.length; i++) {
    if ( arrayChiamata[i].media_type == 'movie') {
      arrayRisultati.push(arrayChiamata[i]);
      arrayRisultati[i].vote_average = Math.ceil(arrayRisultati[i].vote_average / 2);
      arrayRisultati[i].media_type = 'Movie';
      for (let j = 0; j < arrayBandiere.length; j++) {
        if ( arrayRisultati[i].original_language == arrayBandiere[j].originalLanguage ) {
          arrayRisultati[i].original_language = arrayBandiere[j].flag;
        }
      }
    } else if ( arrayChiamata[i].media_type == 'tv'){
      arrayRisultati.push(arrayChiamata[i]);
      arrayRisultati[i].vote_average = Math.ceil(arrayRisultati[i].vote_average / 2);
      arrayRisultati[i].media_type = 'Tv Series';
      arrayRisultati[i].title = arrayRisultati[i].name;
      arrayRisultati[i].original_title = arrayRisultati[i].original_name;
      for (let j = 0; j < arrayBandiere.length; j++) {
        if ( arrayRisultati[i].original_language == arrayBandiere[j].originalLanguage ) {
          arrayRisultati[i].original_language = arrayBandiere[j].flag;
        }
      }
    } else if ( arrayChiamata[i].media_type == 'person' ){
      arrayRisultati.push(arrayChiamata[i]);
      arrayRisultati[i].vote_average = Math.ceil(arrayRisultati[i].popularity / 2);
      arrayRisultati[i].media_type = 'Person';
      arrayRisultati[i].title = arrayRisultati[i].name;
      arrayRisultati[i].original_title = arrayRisultati[i].name;
      arrayRisultati[i].poster_path = arrayRisultati[i].profile_path;
      }
    }
}
var app = new Vue(
  {
    el: '#root',
    data:{
      movieHome:[], //arrai schermata iniziale
      name: '', // valore della ricerca
      urlImg: 'https://image.tmdb.org/t/p/w500',
      searchResults:[], // array dei risultati della ricerca
      lang: 'it-IT', // valore lingua selezionata
      languages:[
        {
          originalLanguage: 'it',
          flag: 'img/it.gif'
        },
        {
          originalLanguage: 'en',
          flag: 'img/en.gif'
        },
        {
          originalLanguage: 'fr',
          flag: 'img/fr.gif'
        },
        {
          originalLanguage: 'es',
          flag: 'img/es.gif'
        },
        {
          originalLanguage: 'de',
          flag: 'img/de.gif'
        },
        {
          originalLanguage: 'sv',
          flag: 'img/sv.gif'
        }
      ], // array bandiere lingue
      typeSearch: 'all', // tipo di ricerca selezionata
      titleLang: 'Titolo',
      originalTitleLang: 'Titolo originale',
      nameLang: 'Nome',
      voteLang: 'Voto',
      totalPag: 1, // pagine totali dei risultati ottenuti con la ricerca
      currentPage: 1, // pagina attuale
      searchShow: false, // variabile per mostrare la barra di ricerca
      pageShow: 0,
      n: 1,
    },
    mounted: function(){
      const self = this;
      axios.get('https://api.themoviedb.org/3/search/movie', {
        params:{
          api_key: '1824bf509354c7052f4a42663578bec1',
          query: 'ritorno al futuro',
          language: self.lang
        }
      }).then(function (response){
        searchMovie(self.movieHome, response.data.results, self.languages);
      })
    },
    methods:{
      search: function() {
        const self = this;
        self.totalPag = 1;
        self.searchResults = [];
        if ( self.name != '') {
          if ( self.typeSearch == 'movie') {
            axios.get('https://api.themoviedb.org/3/search/movie', {
              params:{
                  api_key: '1824bf509354c7052f4a42663578bec1',
                  query: self.name,
                  language: self.lang
              }
            }).then(function (response){
              self.totalPag = response.data.total_pages;
              searchMovie(self.searchResults, response.data.results, self.languages);
            });
          } else if ( self.typeSearch == 'tv' ) {
            axios.get('https://api.themoviedb.org/3/search/tv', {
              params:{
                  api_key: '1824bf509354c7052f4a42663578bec1',
                  query: self.name,
                  language: self.lang
              }
            }).then(function (response){
              self.totalPag = response.data.total_pages;
              searchTv(self.searchResults, response.data.results, self.languages);
            });
          } else {
            axios.get('https://api.themoviedb.org/3/search/multi', {
              params:{
                  api_key: '1824bf509354c7052f4a42663578bec1',
                  query: self.name,
                  language: self.lang
              }
            }).then(function (response){
              self.totalPag = response.data.total_pages;
              searchMulti(self.searchResults, response.data.results, self.languages);
            });
          }
        }
      },
      changePage: function(pagina) {
        const self = this;
        self.searchResults = [];
        if ( self.typeSearch == 'movie') {
        axios.get('https://api.themoviedb.org/3/search/movie', {
          params:{
              api_key: '1824bf509354c7052f4a42663578bec1',
              query: self.name,
              language: self.lang,
              page: pagina
          }
        }).then(function (response){
          searchMovie(self.searchResults, response.data.results, self.languages);
        });
        } else if ( self.typeSearch == 'tv' ) {
          axios.get('https://api.themoviedb.org/3/search/tv', {
            params:{
                api_key: '1824bf509354c7052f4a42663578bec1',
                query: self.name,
                language: self.lang,
                page: pagina
            }
        }).then(function (response){
          searchTv(self.searchResults, response.data.results, self.languages);
        });
        } else {
          axios.get('https://api.themoviedb.org/3/search/multi', {
            params:{
                api_key: '1824bf509354c7052f4a42663578bec1',
                query: self.name,
                language: self.lang,
                page: pagina
            }
        }).then(function (response){
          searchMulti(self.searchResults, response.data.results, self.languages);
        });
        }
      },
      getPage: function(){
        if ( this.currentPage > 10) {
          return this.pageShow = this.currentPage - 10;
        }
        return this.pageShow = 0;
      },
      firstPage: function(n){
        const self = this;
        self.searchResults = [];
        if ( self.typeSearch == 'movie') {
        axios.get('https://api.themoviedb.org/3/search/movie', {
          params:{
              api_key: '1824bf509354c7052f4a42663578bec1',
              query: self.name,
              language: self.lang,
              page: n
          }
        }).then(function (response){
          searchMovie(self.searchResults, response.data.results, self.languages);
        });
        } else if ( self.typeSearch == 'tv' ) {
          axios.get('https://api.themoviedb.org/3/search/tv', {
            params:{
                api_key: '1824bf509354c7052f4a42663578bec1',
                query: self.name,
                language: self.lang,
                page: n
            }
        }).then(function (response){
          searchTv(self.searchResults, response.data.results, self.languages);
        });
        } else {
          axios.get('https://api.themoviedb.org/3/search/multi', {
            params:{
                api_key: '1824bf509354c7052f4a42663578bec1',
                query: self.name,
                language: self.lang,
                page: n
            }
        }).then(function (response){
          searchMulti(self.searchResults, response.data.results, self.languages);
        });
        }
      },
      lastPage: function(ultimaPag){
        const self = this;
        self.searchResults = [];
        if ( self.typeSearch == 'movie') {
        axios.get('https://api.themoviedb.org/3/search/movie', {
          params:{
              api_key: '1824bf509354c7052f4a42663578bec1',
              query: self.name,
              language: self.lang,
              page: ultimaPag
          }
        }).then(function (response){
          searchMovie(self.searchResults, response.data.results, self.languages);
        });
        } else if ( self.typeSearch == 'tv' ) {
          axios.get('https://api.themoviedb.org/3/search/tv', {
            params:{
                api_key: '1824bf509354c7052f4a42663578bec1',
                query: self.name,
                language: self.lang,
                page: ultimaPag
            }
        }).then(function (response){
          searchTv(self.searchResults, response.data.results, self.languages);
        });
        } else {
          axios.get('https://api.themoviedb.org/3/search/multi', {
            params:{
                api_key: '1824bf509354c7052f4a42663578bec1',
                query: self.name,
                language: self.lang,
                page: ultimaPag
            }
        }).then(function (response){
          searchMulti(self.searchResults, response.data.results, self.languages);
        });
        }
      }
    }
  }
);
