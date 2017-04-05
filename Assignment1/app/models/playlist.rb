class Playlist < ApplicationRecord
  self.table_name ="Playlist"
  self.primary_key = "PlaylistId"

  has_and_belongs_to_many :tracks, :join_table => "PlaylistTrack", :association_foreign_key => "TrackId", :foreign_key => "PlaylistId"
  belongs_to :api_key, :foreign_key => "ApiKeyId", :primary_key => "id"
end