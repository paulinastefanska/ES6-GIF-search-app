var GIPHY_API_URL = "https://api.giphy.com";
var GIPHY_PUB_KEY = "JvDoogqisJ3QDO86lI9O33K2NLzvEOwA";

App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function(searchingText) {  
        this.setState({
          loading: true  
        });
        this.getGif(searchingText)  
          .then (gif =>
            this.setState({  
            loading: false,  
            gif: gif,  
            searchingText: searchingText  
          })
        )
        .catch(error => console.error("Something went wrong", error)); 
    },

    getGif: searchingText => {
        const url = `${GIPHY_API_URL} /v1/gifs/random?api_key= ${GIPHY_PUB_KEY} &tag= ${searchingText}`; 
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.onload = function() {
                if (this.status === 200) {
                    var data = JSON.parse(xhr.responseText).data; 
                    var gif = {  
                        url: data.fixed_width_downsampled_url,
                        sourceUrl: data.url
                    };
                    resolve(gif);
                } else {
                    reject(new Error(this.statusText));
                }
            };
            request.onerror = function() {
                reject(new Error(`XMLHttpRequest Error: ${this.statusText}`));
            };
            request.open("GET, url");
            request.send();
        });
    },

    render: function() {
        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>GIF Search Engine!</h1>
                <p>Find GIF on <a href='http://giphy.com'>giphy</a>. Press Enter to find another GIF.</p>
                <Search onSearch={this.handleSearch}/>
            <Gif 
                loading={this.state.loading}
                url={this.state.gif.url}
                sourceUrl={this.state.gif.sourceUrl}
            />
          </div>
        );
    }
});