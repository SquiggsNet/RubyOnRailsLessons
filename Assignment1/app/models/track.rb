class Track < ApplicationRecord
  self.table_name ="Track"
  self.primary_key = "TrackId"

  has_and_belongs_to_many :playlists, :join_table => "PlaylistTrack", :association_foreign_key => "PlaylistId", :foreign_key => "TrackId"
end
