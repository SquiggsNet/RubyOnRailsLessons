class Playlist < ActiveRecord::Base
    self.table_name = 'Playlist'
    self.primary_key = :PlaylistId

end
