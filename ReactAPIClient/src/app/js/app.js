var PlaylistApp = React.createClass({

    //set up initial states
    getInitialState: function(){
        return {
            name: "Squiggs' Playlists",
            playlists: [],
            selesctedplaylistName: '',
            tracklist: [],
            selectedTracks: [],
            listClicked: false,
            newList: true,
            playlistId: "",
            token: "3d23386cd2fc740a13ea9b369ec2e128",
            user: "SquiggsNet",
            loggedIn: false,
            userId: "29",
        }
    },

    //4fc96b19879ce2063f899be826502f0a

    //call api to retrieve list of playlists upon load
    componentDidMount: function(){
        var user = this.state.userId;
        var userData = "&ApiKeyId="+user;
        var token = this.state.token;
        $.ajax({
            url: 'http://localhost:3000/playlists',
            method: "GET",
            dataType: 'json',
            cache: false,
            data: userData,
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', 'Token token='+token);
            },
            success: function(results) {
                this.setState({playlists: results});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        $.ajax({
            url: 'http://localhost:3000/tracks',
            method: "GET",
            dataType: 'json',
            cache: false,
            success: function(results) {
                this.setState({tracklist: results});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    //call api to retrieve tracks of selected playlist
    displayPlaylist: function(id, event){
        var token = this.state.token;
        $.ajax({
            url: 'http://localhost:3000/playlists/'+id,
            method: "GET",
            dataType: 'json',
            cache: false,
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', 'Token token='+token);
            },
            success: function(results) {
                console.log(results);
                this.setState({
                    selesctedplaylistName: results.Name,
                    tracklist: results.tracks,
                    playlistId: results.PlaylistId
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        this.setState({
            listClicked: true,
            newList: false
        });
    },

    newPlaylist: function(){
        this.setState({
            listClicked: false,
            newList: true
        });

        $.ajax({
            url: 'http://localhost:3000/tracks',
            method: "GET",
            dataType: 'json',
            cache: false,
            success: function(results) {
                this.setState({tracklist: results});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    //call api to create playlist
    createPlaylist: function(newName, tracks){
        var token = this.state.token;
        var user = this.state.userId;
        var saveData = 'Name=' + newName + "&TrackId="+tracks+ "&ApiKeyId="+user;
        $.ajax({
            url: 'http://localhost:3000/playlists/',
            method: "POST",
            dataType: 'json',
            cache: false,
            data: saveData,
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', 'Token token='+token);
            },
            success: function(results) {
                this.setState({playlistId: results.PlaylistId})
                this.componentDidMount()
                this.displayPlaylist(this.state.playlistId)
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    editPlaylist: function(){
        this.setState({
            listClicked: true,
            newList: true
        });
        var token = this.state.token;

        $.ajax({
            url: 'http://localhost:3000/tracks',
            method: "GET",
            dataType: 'json',
            cache: false,
            success: function(results) {
                this.setState({tracklist: results});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        $.ajax({
            url: 'http://localhost:3000/playlists/'+this.state.playlistId,
            method: "GET",
            dataType: 'json',
            cache: false,
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', 'Token token='+token);
            },
            success: function(results) {
                console.log(results);
                this.setState({
                    selesctedplaylistName: results.Name,
                    selectedTracks: results.tracks,
                    playlistId: results.PlaylistId
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    //call api to update playlist
    updatePlaylist: function(newName, tracks, id){
        var token = this.state.token;
        var user = this.state.userId;
        var saveData = 'Name=' + newName + "&TrackId="+tracks+ "&ApiKeyId="+user;
        $.ajax({
            url: 'http://localhost:3000/playlists/'+id,
            method: "PUT",
            dataType: 'json',
            cache: false,
            data: saveData,
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', 'Token token='+token);
            },
            success: function(results) {
                console.log(results)
                this.displayPlaylist(id)
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });


    },

    //call api to delete plalist
    deletePlaylist: function(id, event){
        var token = this.state.token;
        $.ajax({
            url: 'http://localhost:3000/playlists/'+id,
            method: "DELETE",
            dataType: 'json',
            cache: false,
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', 'Token token='+token);
            },
            success: function(results) {
                this.setState({
                    playlists: this.state.playlists.filter(playlist => playlist.PlaylistId !== id)
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        if(this.state.playlistId===id){
            this.componentDidMount()
        }
    },

    createUser: function(newName){
        var saveData = 'name=' + newName;
        $.ajax({
            url: 'http://localhost:3000/api_keys/',
            method: "POST",
            dataType: 'json',
            cache: false,
            data: saveData,
            success: function(results) {
                console.log(results)
                this.setState({
                    user: results.name,
                    token: results.access_token,
                    userId: results.id
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    login: function(){
        this.setState({loggedIn: true});
        this.componentDidMount();
    },

    render: function(){
        if (this.state.token===""&&!this.state.loggedIn){
            return (
                <div className="container">
                    <NewUser
                        CreateUser={this.createUser}
                    />
                </div>
            );
        } else if (!this.state.loggedIn){
            return (
                <div className="container">
                    <UserInfo
                        User={this.state.user}
                        Token={this.state.token}
                        Login={this.login}
                    />
                </div>
            );
        } else if (!this.state.listClicked) {
            return (
                <div className="container">
                    <Heading/>
                    <Playlists
                        User={this.state.user}
                        playlists={this.state.playlists}
                        DeletePlaylist={this.deletePlaylist}
                        DisplayPlaylist={this.displayPlaylist}
                    />
                    <NewPlaylist
                        CreatePlaylist={this.createPlaylist}
                        tracklist={this.state.tracklist}
                    />
                </div>
            );
        } else if (this.state.listClicked && !this.state.newList){
            return (
                <div className="container">
                    <Heading/>
                    <Playlists
                        User={this.state.user}
                        playlists={this.state.playlists}
                        DeletePlaylist={this.deletePlaylist}
                        DisplayPlaylist={this.displayPlaylist}
                    />
                    <Playlist
                        NewPlaylist={this.newPlaylist}
                        EditPlaylist={this.editPlaylist}
                        selesctedPlaylistName={this.state.selesctedplaylistName}
                        tracklist={this.state.tracklist}
                    />
                </div>
            );
        } else if(this.state.listClicked && this.state.newList){
            return (
                <div className="container">
                    <Heading/>
                    <Playlists
                        User={this.state.user}
                        playlists={this.state.playlists}
                        DeletePlaylist={this.deletePlaylist}
                        DisplayPlaylist={this.displayPlaylist}
                    />
                    <UpdatePlaylist
                        UpdatePlaylist={this.updatePlaylist}
                        selesctedPlaylistName={this.state.selesctedplaylistName}
                        selectedPlaylistId={this.state.playlistId}
                        tracklist={this.state.tracklist}
                        selectedTracks={this.state.selectedTracks}
                    />
                </div>
            );
        }
    }
});

var Playlists = React.createClass({

    render: function(){
        var playlists = this.props.playlists.map((list, index) => {
            return (<tr key={list.PlaylistId}>
                        <td>{list.PlaylistId}</td>
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
            <div className="third lists">
                <table className="table table-bordered table-striped">
                    <thead>
                    <th></th>
                    <th colSpan="2">{this.props.User}'s Playlists</th>
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
            return (<tr key={track.TrackId}><td>{track.TrackId}</td><td>{track.Name}</td><td>{track.UnitPrice}</td></tr>);
        });

        return (
            <div className= "third-x2 last list">
                <h3 className="text-center">{this.props.selesctedPlaylistName}</h3>
                <div className="pbottom">
                    <button onClick={this.props.NewPlaylist} className="btn btn-primary mright pull-right">Create New Playlist</button>
                    <button onClick={this.props.EditPlaylist} className="btn btn-warning mleft">Edit Selected Playlist</button>
                </div>
                <table className= "table table-bordered table-striped" >
                    <thead>
                        <th>Track Id</th>
                        <th>Tracks</th>
                        <th>Unit Price</th>
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
            tracks: []
        }
    },

    playlistNameChange(event) {
        this.setState({playlistName: event.target.value});
    },

    handleChangeChk(event) {
        if (event.currentTarget.checked){
            var newArray = this.state.tracks.slice();
            newArray.push(event.target.value);
            this.setState({tracks:newArray});
        }else{
            var newArray = this.state.tracks;
            var index = newArray.indexOf(event.target.value)
            newArray.splice(index, 1);
            this.setState({tracks: newArray });
        }
    },

    render: function(){
       var tracks = this.props.tracklist.map((track, index) =>{
           return (
                    <tr key={track.TrackId}>
                        <td>{track.TrackId}</td>
                        <td>{track.Name}</td>
                        <td>{track.UnitPrice}</td>
                        <td>
                            <input
                                value={track.TrackId}
                                type="checkbox"
                                onChange={this.handleChangeChk}
                            />
                        </td>
                    </tr>);
       });

       return(
           <div className="third-x2 last list">
               <h3 className="text-center">Create a New Playlist</h3>
               <form className="form-inline">
                   <div className="form-group mleft">
                       <label for="newPlaylistName">Name</label>
                       <input type="text" className="form-control" id="newPlaylistName" placeholder="New Playlist" onChange={this.playlistNameChange}/>
                   </div>
                   <button type="button" onClick={this.props.CreatePlaylist.bind(this, this.state.playlistName, this.state.tracks)} className="btn btn-success pull-right mright">Add Playlist</button>
               </form>

               <h3>{this.props.selesctedplaylistName}</h3>
               <table className= "table table-bordered table-striped mAll" >
                   <thead>
                    <th>Track Id</th>
                    <th>Tracks</th>
                    <th>Unit Price</th>
                    <th></th>
                   </thead>
                   <tbody>
                    {tracks}
                   </tbody>
               </table>
           </div>
       );
   }
});

var UpdatePlaylist = React.createClass({

    getInitialState: function(){
        return {
            playlistName: this.props.selesctedPlaylistName,
            tracks: []
        }
    },

    playlistNameChange(event) {
        this.setState({playlistName: event.target.value});
    },

    handleChangeChk(event) {
        if (event.currentTarget.checked){
            var newArray = this.state.tracks.slice();
            newArray.push(event.target.value);
            this.setState({tracks:newArray});
        }else{
            var newArray = this.state.tracks;
            var index = newArray.indexOf(event.target.value)
            newArray.splice(index, 1);
            this.setState({tracks: newArray });
        }
    },

    render: function(){

        var tracks = this.props.tracklist.map((track, index) =>{

            // if (this.props.selectedTracks.includes(track.TrackId)){
            //     return (
            //         <tr key={track.TrackId}>
            //             <td>{track.TrackId}</td>
            //             <td>{track.Name}</td>
            //             <td>{track.UnitPrice}</td>
            //             <td>
            //                 <input
            //                     value={track.TrackId}
            //                     type="checkbox"
            //                     onChange={this.handleChangeChk}
            //                     checked = 'true'
            //                 />
            //             </td>
            //         </tr>);
            // }else{
                return (
                    <tr key={track.TrackId}>
                        <td>{track.TrackId}</td>
                        <td>{track.Name}</td>
                        <td>{track.UnitPrice}</td>
                        <td>
                            <input
                                value={track.TrackId}
                                type="checkbox"
                                onChange={this.handleChangeChk}
                            />
                        </td>
                    </tr>);
            // }
        });

        return(
            <div className="third-x2 last list">
                <h3 className="text-center">Update Playlist</h3>
                <form className="form-inline">
                    <div className="form-group mleft">
                        <label for="newPlaylistName">Name</label>
                        <input type="text" className="form-control" id="newPlaylistName" defaultValue={this.props.selesctedPlaylistName} onChange={this.playlistNameChange}/>
                    </div>
                    <button type="button" onClick={this.props.UpdatePlaylist.bind(this, this.state.playlistName, this.state.tracks, this.props.selectedPlaylistId)} className="btn btn-success pull-right mright">Update Playlist</button>
                </form>

                <h3>{this.props.selesctedplaylistName}</h3>
                <table className= "table table-bordered table-striped mAll" >
                    <thead>
                    <th>Track Id</th>
                    <th>Tracks</th>
                    <th>Unit Price</th>
                    <th></th>
                    </thead>
                    <tbody>
                    {tracks}
                    </tbody>
                </table>
            </div>
        );
    }
});

var Heading = React.createClass({
   render: function(){
       return(
         <div>
             <h1 className="text-center pbottom">React Playlist Client</h1>
         </div>
       );
   }
});

var NewUser = React.createClass({

    getInitialState: function(){
        return {
            userName: {},
        }
    },

    userNameChange(event) {
        this.setState({userName: event.target.value});
    },
    render: function(){
        return(
          <div>
              <h3 className="text-center">Create a New User</h3>
              <form className="form-inline">
                  <div className="form-group mleft">
                      <label for="userName">Name</label>
                      <input type="text" className="form-control" id="userName" placeholder="New User" onChange={this.userNameChange}/>
                  </div>
                  <button type="button" onClick={this.props.CreateUser.bind(this, this.state.userName)} className="btn btn-success">Create User</button>
              </form>
          </div>
        );
    }
});

var UserInfo = React.createClass({

    render: function(){
        return(
            <div>
                <h3 className="text-center">Welcome {this.props.User}</h3>
                <p>You're token is {this.props.Token}</p>
                <button type="button" onClick={this.props.Login} className="btn btn-success">Login into app with token</button>
            </div>
        );
    }
});

ReactDOM.render(<PlaylistApp />, document.getElementById('container'));