class InvoiceLine < ActiveRecord::Base
    self.table_name = 'InvoiceLine'
    self.primary_key = :InvoiceLineId

end
