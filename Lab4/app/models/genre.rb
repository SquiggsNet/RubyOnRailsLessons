class Genre < ActiveRecord::Base
    self.table_name = 'Genre'
    self.primary_key = :GenreId

end
