class Employee < ApplicationRecord
  self.table_name = "employees"
  self.primary_key = "emp_no"
end