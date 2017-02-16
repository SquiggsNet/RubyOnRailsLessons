class PlaylistTrack < ActiveRecord::Base
    self.table_name = 'PlaylistTrack'
    self.primary_key = :["PlaylistId", "TrackId"]

end
