var app = new Vue(
  {
    el: '#root',
    data:{
      movieHome:[],
      name: '',
      urlImg: 'https://image.tmdb.org/t/p/w500',
      searchResults:[],
      lang: 'it-IT',
      languages:[
        {
          originalLanguage: 'it',
          flag: 'https://www.33ff.com/flags/S_flags/flags_of_Italy.gif'
        },
        {
          originalLanguage: 'en',
          flag: 'https://www.33ff.com/flags/S_flags/flags_of_United-Kingdom.gif'
        },
        {
          originalLanguage: 'fr',
          flag: 'https://www.33ff.com/flags/S_flags/flags_of_France.gif'
        },
        {
          originalLanguage: 'es',
          flag: 'https://www.33ff.com/flags/S_flags/flags_of_Spain.gif'
        },
        {
          originalLanguage: 'de',
          flag: 'https://www.33ff.com/flags/S_flags/flags_of_Germany.gif'
        },
        {
          originalLanguage: 'sv',
          flag: 'https://www.33ff.com/flags/S_flags/flags_of_Sweden.gif'
        },
        {
          originalLanguage: 'pt',
          flag: 'https://www.33ff.com/flags/S_flags/flags_of_Sweden.gif'
        }
      ],
      typeSearch: 'all',
      titleLang: 'Titolo',
      originalTitleLang: 'Titolo originale',
      nameLang: 'Nome',
      voteLang: 'Voto',
      totalPag: 1,
      currentPage: 1,
      searchShow: false
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
        for (var i = 0; i < response.data.results.length; i++) {
          self.movieHome.push(response.data.results[i]);
          self.movieHome[i].vote_average = Math.ceil(self.movieHome[i].vote_average / 2);
          self.movieHome[i].type = 'Film';
        }
      })
    },
    methods:{
      search: function() {
        const self = this;
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
              for (var i = 0; i < response.data.results.length; i++) {
                self.searchResults.push(response.data.results[i]);
                self.searchResults[i].vote_average = Math.ceil(self.searchResults[i].vote_average / 2);
                self.searchResults[i].media_type = 'Movie';
                for (let j = 0; j < self.languages.length; j++) {
                  if ( self.searchResults[i].original_language == self.languages[j].originalLanguage ) {
                    self.searchResults[i].original_language = self.languages[j].flag;
                  }
                }
              }
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
              for (var i = 0; i < response.data.results.length; i++) {
                self.searchResults.push(response.data.results[i]);
                self.searchResults[i].vote_average = Math.ceil(self.searchResults[i].vote_average / 2);
                self.searchResults[i].media_type = 'Tv Series';
                self.searchResults[i].title = self.searchResults[i].name;
                self.searchResults[i].original_title = self.searchResults[i].original_name;
                for (let j = 0; j < self.languages.length; j++) {
                  if ( self.searchResults[i].original_language == self.languages[j].originalLanguage ) {
                    self.searchResults[i].original_language = self.languages[j].flag;
                  }
                }
              }
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
              for (var i = 0; i < response.data.results.length; i++) {
                if ( response.data.results[i].media_type == 'movie') {
                  self.searchResults.push(response.data.results[i]);
                  self.searchResults[i].vote_average = Math.ceil(self.searchResults[i].vote_average / 2);
                  self.searchResults[i].media_type = 'Movie';
                  for (let j = 0; j < self.languages.length; j++) {
                    if ( self.searchResults[i].original_language == self.languages[j].originalLanguage ) {
                      self.searchResults[i].original_language = self.languages[j].flag;
                    }
                  }
                } else if ( response.data.results[i].media_type == 'tv'){
                  self.searchResults.push(response.data.results[i]);
                  self.searchResults[i].vote_average = Math.ceil(self.searchResults[i].vote_average / 2);
                  self.searchResults[i].media_type = 'Tv Series';
                  self.searchResults[i].title = self.searchResults[i].name;
                  self.searchResults[i].original_title = self.searchResults[i].original_name;
                  for (let j = 0; j < self.languages.length; j++) {
                    if ( self.searchResults[i].original_language == self.languages[j].originalLanguage ) {
                      self.searchResults[i].original_language = self.languages[j].flag;
                    }
                  }
                } else {
                  self.searchResults.push(response.data.results[i]);
                  self.searchResults[i].vote_average = Math.ceil(self.searchResults[i].popularity / 2);
                  self.searchResults[i].media_type = 'Person';
                  self.searchResults[i].title = self.searchResults[i].name;
                  self.searchResults[i].original_title = self.searchResults[i].name;
                  self.searchResults[i].poster_path = self.searchResults[i].profile_path;
                  }
                }
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
          for (var i = 0; i < response.data.results.length; i++) {
            self.searchResults.push(response.data.results[i]);
            self.searchResults[i].vote_average = Math.ceil(self.searchResults[i].vote_average / 2);
            self.searchResults[i].media_type = 'Movie';
            for (let j = 0; j < self.languages.length; j++) {
              if ( self.searchResults[i].original_language == self.languages[j].originalLanguage ) {
                self.searchResults[i].original_language = self.languages[j].flag;
              }
            }
          }
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
          for (var i = 0; i < response.data.results.length; i++) {
            self.searchResults.push(response.data.results[i]);
            self.searchResults[i].vote_average = Math.ceil(self.searchResults[i].vote_average / 2);
            self.searchResults[i].media_type = 'Tv Series';
            self.searchResults[i].title = self.searchResults[i].name;
            self.searchResults[i].original_title = self.searchResults[i].original_name;
            for (let j = 0; j < self.languages.length; j++) {
              if ( self.searchResults[i].original_language == self.languages[j].originalLanguage ) {
                self.searchResults[i].original_language = self.languages[j].flag;
              }
            }
          }
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
          for (var i = 0; i < response.data.results.length; i++) {

            if ( response.data.results[i].media_type == 'movie') {
              self.searchResults.push(response.data.results[i]);
              self.searchResults[i].vote_average = Math.ceil(self.searchResults[i].vote_average / 2);
              self.searchResults[i].media_type = 'Movie';
              for (let j = 0; j < self.languages.length; j++) {
                if ( self.searchResults[i].original_language == self.languages[j].originalLanguage ) {
                  self.searchResults[i].original_language = self.languages[j].flag;
                }
              }
            } else if ( response.data.results[i].media_type == 'tv'){
              self.searchResults.push(response.data.results[i]);
              self.searchResults[i].vote_average = Math.ceil(self.searchResults[i].vote_average / 2);
              self.searchResults[i].media_type = 'Tv Series';
              self.searchResults[i].title = self.searchResults[i].name;
              self.searchResults[i].original_title = self.searchResults[i].original_name;
              for (let j = 0; j < self.languages.length; j++) {
                if ( self.searchResults[i].original_language == self.languages[j].originalLanguage ) {
                  self.searchResults[i].original_language = self.languages[j].flag;
                }
              }
            } else {
              self.searchResults.push(response.data.results[i]);
              self.searchResults[i].vote_average = Math.ceil(self.searchResults[i].popularity / 2);
              self.searchResults[i].media_type = 'Person';
              self.searchResults[i].title = self.searchResults[i].name;
              self.searchResults[i].original_title = self.searchResults[i].name;
              self.searchResults[i].poster_path = self.searchResults[i].profile_path;
              }
            }
        });
      }
      }
    }
  }
);
