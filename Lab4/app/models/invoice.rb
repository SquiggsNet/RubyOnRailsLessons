class Invoice < ActiveRecord::Base
    self.table_name = 'Invoice'
    self.primary_key = :InvoiceId

end
