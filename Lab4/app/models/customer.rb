class Customer < ActiveRecord::Base
    self.table_name = 'Customer'
    self.primary_key = :CustomerId

end
