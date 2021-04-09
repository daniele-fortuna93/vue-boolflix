var app = new Vue(
  {
    el: '#root',
    data:{
      movieHome:[],
      name: '',
      urlImg: 'https://image.tmdb.org/t/p/w500',
      searchMovie:[],
      lang: 'it-IT'
    },
    mounted: function(){
      const self = this;
      axios.get('https://api.themoviedb.org/3/search/movie', {
        params:{
          api_key: '1824bf509354c7052f4a42663578bec1',
          query: 'ritorno al futuro',
          language: 'it-IT'
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
            }
          });
        }

      }
    }
  }
);
