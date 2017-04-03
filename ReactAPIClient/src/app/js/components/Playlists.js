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