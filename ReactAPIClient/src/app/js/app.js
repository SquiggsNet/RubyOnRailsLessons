var PlaylistApp = React.createClass({

    //set up initial states
    getInitialState: function(){
        return {
            name: "Squiggs' Playlists",
            playlists: [],
            selesctedplaylistName: '',
            tracklist: [],
            listClicked: false
        }
    },

    //call api to retrieve list of playlists upon load
    componentDidMount: function(){
        $.ajax({
            url: 'http://localhost:3000/playlists',
            method: "GET",
            dataType: 'json',
            cache: false,
            success: function(results) {
                this.setState({playlists: results});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    //call api to retrieve tracks of selected playlist
    displayPlaylist: function(id, event){
        $.ajax({
            url: 'http://localhost:3000/playlists/'+id,
            method: "GET",
            dataType: 'json',
            cache: false,
            success: function(results) {
                console.log(results)
                this.setState({
                    selesctedplaylistName: results.Name,
                    tracklist: results.tracks
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        this.setState({
            listClicked: true
        });
    },

    //call api to create playlist
    createPlaylist: function(newName){
        var saveData = 'Name=' + newName;
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
    },

    //call api to update playlist

    //call api to delete plalist
    deletePlaylist: function(id, event){
        $.ajax({
            url: 'http://localhost:3000/playlists/'+id,
            method: "DELETE",
            dataType: 'json',
            cache: false,
            success: function(results) {
                this.setState({
                    playlists: this.state.playlists.filter(playlist => playlist.PlaylistId !== id)
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    render: function(){
        if (!this.state.listClicked) {
            return (
                <div className="container">
                    <Playlists
                        playlists={this.state.playlists}
                        DeletePlaylist={this.deletePlaylist}
                        DisplayPlaylist={this.displayPlaylist}
                    />
                    <NewPlaylist
                        CreatePlaylist={this.createPlaylist}
                    />
                </div>
            );
        } else {
            return (
                <div className="container">
                    <Playlists
                        playlists={this.state.playlists}
                        DeletePlaylist={this.deletePlaylist}
                        DisplayPlaylist={this.displayPlaylist}
                    />
                    <Playlist
                        selesctedplaylistName={this.state.selesctedplaylistName}
                        tracklist={this.state.tracklist}
                    />
                    {/*<Playlist selesctedplaylistName={this.state.selesctedplaylistName} trackList={this.state.trackList}/>*/}
                </div>
            );
        }

    }
});

var Playlists = React.createClass({

    getInitialState: function(){
        return {
            name: "Squiggs' Playlists",
        }
    },

    render: function(){
        var playlists = this.props.playlists.map((list, index) => {
            return (<tr key={list.PlaylistId}>
                        <td onClick={this.props.DisplayPlaylist.bind(this, list.PlaylistId)} >
                            {list.Name}
                        </td>
                        <td id="buttonCol">
                            <button onClick={this.props.DeletePlaylist.bind(this, list.PlaylistId)} className="btn btn-danger pull-right">
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

                </div>
            </div>
        );
    }
});

var Playlist = React.createClass({

    render: function(){
        var tracks = this.props.tracklist.map(function(track, index){
            return (<tr key={track.TrackId}><td>{track.Name}</td></tr>);
        });

        return (
            <div>
                <h3>{this.props.selesctedplaylistName}</h3>
                <table className= "table table-bordered table-striped third-x2 last" >
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

var NewPlaylist = React.createClass({

    getInitialState: function(){
        return {
            playlistName: "",
        }
    },

    playlistNameChange(event) {
        this.setState({playlistName: event.target.value});
    },

   render: function(){
       return(
           <form className="form-inline third-x2 last">
               <div className="form-group">
                   <label for="newPlaylistName">Name</label>
                   <input type="text" className="form-control" id="newPlaylistName" placeholder="New Playlist" onChange={this.playlistNameChange}/>
               </div>
               <button type="submit" onClick={this.props.CreatePlaylist.bind(this, this.state.playlistName)} className="btn btn-default">Add Playlist</button>
           </form>
       );
   }
});

ReactDOM.render(<PlaylistApp />, document.getElementById('container'));