require_relative 'adder'

class Calculator
  def add(num1, num2)
    myAdder = Adder.new
    myAdder.addNum(num1, num2)
  end
end

myCalculator = Calculator.new
puts myCalculator.add(10,65)