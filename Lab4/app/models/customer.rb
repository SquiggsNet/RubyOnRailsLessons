class Customer < ActiveRecord::Base
    self.table_name = 'Customer'
    self.primary_key = :CustomerId

    has_many :invoices, foreign_key: :CustomerId
end
