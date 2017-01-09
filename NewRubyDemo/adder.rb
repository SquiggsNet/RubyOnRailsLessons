class Adder

    def addNum(num1,num2)
      num1 + num2
    end #end of function

    public :addNum

end #end of class

if __FILE__ == $0 then
  myAdder = Adder.new
  puts myAdder.addNum(12,23)
end
