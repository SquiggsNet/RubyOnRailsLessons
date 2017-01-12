class Person

  attr_accessor :first_name   #give me auto get and set
  attr_accessor :last_name    #give me auto get and set

  #constructor for Person class
  def initialize(fName, lName)
    @first_name = fName
    @last_name = lName
  end #end of constructor

end