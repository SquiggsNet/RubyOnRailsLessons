class Employee < ApplicationRecord
  self.primary_key = "emp_no"
  enum gender: [ :M, :F ]

  validates :emp_no, presence: true,
            length: { minimum: 5 }

  validates :birth_date, presence: true

  validates :first_name, presence: true,
            length: { minimum: 3 }

  validates :last_name, presence: true,
            length: { minimum: 3 }

  validates :gender, presence: true

  validates :hire_date, presence: true
end
