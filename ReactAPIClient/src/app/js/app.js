const urlForPlaylists = 'localhost:3000/playlists';

var PlaylistApp = React.createClass({
    render: function(){
        return (
            <div className="container">
                <Playlists />
            </div>
        );
    }
});

var Playlists = React.createClass({

    getInitialState: function(){
        return {
            name: "Squiggs' Playlists",
            playlistLists: [],
            createNew: false
        }
    },

    playlistNameChange(event) {
        this.setState({playlistName: event.target.value});
    },

    componentDidMount: function(){
        $.ajax({
            url: 'http://localhost:3000/playlists',
            method: "GET",
            dataType: 'json',
            cache: false,
            success: function(results) {
                this.setState({playlistLists: results});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    newPlaylist: function(){
        this.setState({
            createNew: true
        });
    },

    createPlaylist: function(){
        var saveData = 'Name=' + this.state.playlistName;
        $.ajax({
            url: 'http://localhost:3000/playlists/',
            method: "POST",
            dataType: 'json',
            cache: false,
            data: saveData,
            success: function(results) {
                console.log(results)
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        this.setState({
            createNew: false
        });
    },

    deletePlaylist: function(id, event){
        $.ajax({
            url: 'http://localhost:3000/playlists/'+id,
            method: "DELETE",
            dataType: 'json',
            cache: false,
            success: function(results) {
                this.setState({
                    playlistLists: this.state.playlistLists.filter(playlist => playlist.PlaylistId !== id)
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    renderNew: function(){
        var playlists = this.state.playlistLists.map((list, index) => {
            return (<tr key={list.PlaylistId}>
                <td>
                    {list.Name}
                </td>
                <td id="buttonCol">
                    <button onClick={this.deletePlaylist.bind(this, list.PlaylistId)} className="btn btn-danger pull-right">
                        <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                    </button>
                </td>
            </tr>);
        });

        return (
            <div>
                <table className="table table-bordered table-striped third">
                    <thead>
                    <th colSpan="2">{this.state.name}<button onClick={this.newPlaylist} className="btn btn-primary pull-right">Create New Playlist</button></th>
                    </thead>
                    <tbody>
                    {playlists}
                    </tbody>
                </table>
                <div className="third-x2 last">
                    <form className="form-inline">
                        <div className="form-group">
                            <label for="newPlaylistName">Name</label>
                            <input type="text" className="form-control" id="newPlaylistName" placeholder="New Playlist"  value={this.state.playlistName} onChange={this.playlistNameChange}/>
                        </div>
                        <button type="submit" onClick={this.createPlaylist} className="btn btn-default">Add Playlist</button>
                    </form>
                    <Playlist />
                </div>
            </div>
        );
    },

    renderNormal: function(){
        var playlists = this.state.playlistLists.map((list, index) => {
            return (<tr key={list.PlaylistId}>
                        <td onClick={this.displayPlaylist.bind(this, list.PlaylistId)} >
                            {list.Name}
                        </td>
                        <td id="buttonCol">
                            <button onClick={this.deletePlaylist.bind(this, list.PlaylistId)} className="btn btn-danger pull-right">
                                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                            </button>
                        </td>
                    </tr>);
        });

        return (
            <div>
                <table className="table table-bordered table-striped third">
                    <thead>
                    <th colSpan="2">{this.state.name}<button onClick={this.newPlaylist} className="btn btn-primary pull-right">Create New Playlist</button></th>
                    </thead>
                    <tbody>
                    {playlists}
                    </tbody>
                </table>
                <div className="third-x2 last">
                    <Playlist />
                </div>
            </div>
        );
    },

    render: function(){
        if(this.state.createNew){
            return this.renderNew();
        }else{
            return this.renderNormal();
        }
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