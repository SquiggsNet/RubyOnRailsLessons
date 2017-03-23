class EmployeesController < ApplicationController
  before_action :set_employee, only: [:show, :update, :destroy]

  http_basic_authenticate_with name: "Squiggs", password: "Net", except: [:index, :show]

  # GET /employees
  def index
    @employees = Employee.all.limit(10)

    render json: @employees
  end

  # GET /employees/1
  def show
    render json: @employee
  end

  # POST /employees
  def create
    @employee = Employee.new(employee_params)

    if @employee.save
      render json: @employee, status: :created, location: @employee
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /employees/1
  def update
    if @employee.update(employee_params)
      render json: @employee
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end

  # DELETE /employees/1
  def destroy
    @employee.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_employee
      @employee = Employee.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def employee_params
      params.permit(:first_name, :last_name, :gender, :birth_date, :hire_date, :emp_no)
    end
end
