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
            playlistId: ""

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
        $.ajax({
            url: 'http://localhost:3000/playlists/'+id,
            method: "GET",
            dataType: 'json',
            cache: false,
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
        var saveData = 'Name=' + newName + "&TrackId="+tracks;
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

    editPlaylist: function(){
        this.setState({
            listClicked: true,
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

        $.ajax({
            url: 'http://localhost:3000/playlists/'+this.state.playlistId,
            method: "GET",
            dataType: 'json',
            cache: false,
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
        var saveData = 'Name=' + newName + "&TrackId="+tracks;
        $.ajax({
            url: 'http://localhost:3000/playlists/'+id,
            method: "PUT",
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
            listClicked: true,
            newList: false
        });
    },

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
        if (!this.state.listClicked && this.state.newList) {
            return (
                <div className="container">
                    <Heading/>
                    <Playlists
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

    getInitialState: function(){
        return {
            name: "Squiggs' Playlists",
        }
    },

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
                    <th colSpan="2">{this.state.name}</th>
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
                   <button type="submit" onClick={this.props.CreatePlaylist.bind(this, this.state.playlistName, this.state.tracks)} className="btn btn-success pull-right mright">Add Playlist</button>
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
                    <button type="submit" onClick={this.props.UpdatePlaylist.bind(this, this.state.playlistName, this.state.tracks, this.props.selectedPlaylistId)} className="btn btn-success pull-right mright">Update Playlist</button>
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

ReactDOM.render(<PlaylistApp />, document.getElementById('container'));