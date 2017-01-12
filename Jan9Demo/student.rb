require_relative('person')

class Student < Person

  @@MAX_CLASS_SIZE = 30

  attr_accessor :student_id   #give me auto get and set

  #constructor for Student class
  def initialize(studentId, fName, lName)
    super(fName,lName)
    @student_id = studentId
  end #end of constructor

  #Getter for class variable
  def self.MAX_CLASS_SIZE()
    @@MAX_CLASS_SIZE
  end

  #format student report
  def reportInfo()
    "Student ID: " + @student_id.to_s + " Name: " + @last_name + "," + @first_name
  end

  #essentially a main method
  if __FILE__ == $0 then
    puts "The max class size is " + @@MAX_CLASS_SIZE.to_s

    student_no = 0

    loop do
      print("Please enter your student number: ")
      student_no = gets.chomp
      if not student_no.empty? and student_no.to_i.to_s == student_no then
        break
      end
      puts("***Sorry this is not a valid input!")
    end
    student_no = student_no.to_i



    print("Please enter your first name: ")
    first_name = gets.chomp

    print("Please enter your last name: ")
    last_name = gets.chomp

    myStudent = Student.new(student_no, first_name, last_name)

    # myStudent = Student.new("w0218584", "Scott", "Rafael")
    puts myStudent.reportInfo
  end

end #end of class