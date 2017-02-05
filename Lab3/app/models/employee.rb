class Employee < ApplicationRecord
  self.primary_key = "emp_no"
  enum gender: [ :m, :f ]
end
