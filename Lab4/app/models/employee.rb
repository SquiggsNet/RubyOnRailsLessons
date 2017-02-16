class Employee < ActiveRecord::Base
    self.table_name = 'Employee'
    self.primary_key = :EmployeeId

end
