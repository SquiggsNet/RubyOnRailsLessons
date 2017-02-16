class Album < ActiveRecord::Base
    self.table_name = 'Album'
    self.primary_key = :AlbumId

end
