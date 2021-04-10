var app = new Vue(
  {
    el: '#root',
    data:{
      movieHome:[],
      name: '',
      urlImg: 'https://image.tmdb.org/t/p/w500',
      searchMovie:[],
      searchTv: [],
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
      ]
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
        }
      })
    },
    methods:{
      search: function() {
        const self = this;
        self.searchMovie = [];
        self.searchTv = [];
        if ( self.name != '') {
          axios.get('https://api.themoviedb.org/3/search/movie', {
            params:{
              api_key: '1824bf509354c7052f4a42663578bec1',
              query: self.name,
              language: self.lang
            }
          }).then(function (response){
            for (var i = 0; i < response.data.results.length; i++) {
              self.searchMovie.push(response.data.results[i]);
              self.searchMovie[i].vote_average = Math.ceil(self.searchMovie[i].vote_average / 2);
              for (var j = 0; j < self.languages.length; j++) {
                if ( self.searchMovie[i].original_language == self.languages[j].originalLanguage ) {
                  self.searchMovie[i].original_language = self.languages[j].flag;
                }
              }
            }
          });
          axios.get('https://api.themoviedb.org/3/search/tv', {
            params:{
              api_key: '1824bf509354c7052f4a42663578bec1',
              query: self.name,
              language: self.lang
            }
          }).then(function (response){
            for (var i = 0; i < response.data.results.length; i++) {
              self.searchTv.push(response.data.results[i]);
              self.searchTv[i].vote_average = Math.ceil(self.searchTv[i].vote_average / 2);
            }
          });
        }

      }
    }
  }
);
