json.extract! employee, :id, :emp_no, :birth_date, :first_name, :last_name, :gender, :hire_date, :created_at, :updated_at
json.url employee_url(employee, format: :json)