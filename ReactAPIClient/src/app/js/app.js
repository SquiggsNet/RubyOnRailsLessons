const urlForPlaylists = 'localhost:3000/playlists';

var PlaylistApp = React.createClass({
    render: function(){
        return (
            <div>
                <Playlists />
                <Playlist />
            </div>
        );
    }
});

var Playlists = React.createClass({

    getInitialState: function(){
        return {
            name: "Squiggs' Playlists",
            playlistLists: []
        }
    },

    componentDidMount: function(){
        axios.get('http://localhost:3000/playlists').then(results => {
            this.setState({
                playlistLists: results.data
            })
        })
    },

    newPlaylist: function(){
        this.setState({
            playlistLists: this.state.playlistLists.concat('new list')
        });
        alert('add new playlist!');
    },

    render: function(){

        console.log(this.state.playlistLists)

        var playlists = this.state.playlistLists.map(function(list, index){
            return (<tr key={index}><td>{list.Name}</td></tr>);
        });

        return (
            <div>
                <table className="table table-bordered table-striped">
                    <thead>
                        <th>{this.state.name}</th>
                    </thead>
                    <tbody>
                        {playlists}
                    </tbody>
                </table>
                <button onClick={this.newPlaylist} className="btn btn-primary">Create New Playlist</button>
            </div>
        );
    }
});

var Playlist = React.createClass({

    getInitialState: function(){
      return {
          trackList: ['coding', 'writing', 'skiing']
      }
    },

    render: function(){
        var tracks = this.state.trackList.map(function(track, index){
            return (<tr key={index}><td>{track}</td></tr>);
        });

        return (
            <div>
                <table className= "table table-bordered table-striped" >
                    <thead>
                        <th>Tracks</th>
                    </thead>
                    <tbody>
                        {tracks}
                    </tbody>
                </table>
            </div>
        );
    }
});

ReactDOM.render(<PlaylistApp />, document.getElementById('container')
);