beforeEach(function() {
  this.addMatchers({
    toBePlaying: function(expectedSong) {
      var player = this.actual;
      return player.currentlyPlayingSong === expectedSong && 
             player.isPlaying;
    }
  });
  
  this.addMatchers({
  	containsExactly: function (number, ofWhat) {
  		var numberFound = 0;
  		for(i=0; i< this.actual.length; i++) {
  			if(this.env.equals_(this.actual[i], ofWhat)) {
  				numberFound ++;
  			}
  		}
  		
  		return number == numberFound;
  	}
  });
});

modify = function (game) {
	return {
		replaceDeckWith: function(cards) {
			game.cardsInDeck.length = 0;
			cards.forEach(function(card) {
				game.cardsInDeck.push(card)
			});
		}
	}
}

