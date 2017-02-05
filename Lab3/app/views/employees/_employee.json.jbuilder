json.extract! employee, :id, :first_name, :last_name, :birth_date, :hire_date, :gender, :created_at, :updated_at
json.url employee_url(employee, format: :json)