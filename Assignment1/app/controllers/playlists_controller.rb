include ActionController::HttpAuthentication::Token::ControllerMethods
class PlaylistsController < ApplicationController
  # before_filter :restrict_access
  before_action :set_playlist, only: [:show, :update, :destroy]

  # GET /playlists
  def index
    @playlists = Playlist.all

    render json: @playlists, include: ['tracks']
  end

  # GET /playlists/1
  def show
    render json: @playlist, include: ['tracks']
  end

  # POST /playlists
  def create
    @playlist = Playlist.new(playlist_params)

    if @playlist.save
      add_tracks_to_playlist
      render json: @playlist, include: ['tracks'], status: :created, location: @playlist
    else
      render json: @playlist.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /playlists/1
  def update
    if @playlist.update(playlist_params)
      add_tracks_to_playlist
      render json: @playlist, include: ['tracks']
    else
      render json: @playlist.errors, status: :unprocessable_entity
    end
  end

  # DELETE /playlists/1
  def destroy
    @playlist.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_playlist
      @playlist = Playlist.find(params[:id])
    end

    def add_tracks_to_playlist
      @track = Track.find(params[:TrackId].split(','))
      @playlist.tracks = @track
    end

    # Only allow a trusted parameter "white list" through.
    def playlist_params
      params.permit(:PlaylistID, :Name )
    end

    def restrict_access
      authenticate_or_request_with_http_token do |token, options|
        ApiKey.exists?(access_token: token)
      end
    end
end
