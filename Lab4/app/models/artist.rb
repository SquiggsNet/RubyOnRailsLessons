class Artist < ActiveRecord::Base
    self.table_name = 'Artist'
    self.primary_key = :ArtistId

end
