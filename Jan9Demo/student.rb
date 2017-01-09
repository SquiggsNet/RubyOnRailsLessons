class Student

  @@MAX_CLASS_SIZE = 30

  #constructor for Student class
  def initialize(studentId, fName, lName)
    @student_id = studentId
    @first_name = fName
    @last_name = lName
  end #end of constructor

  #Getter for class variable
  def self.MAX_CLASS_SIZE()
    @@MAX_CLASS_SIZE
  end

  #format student report
  def reportInfo()
    "Student ID: " + @student_id + " Name: " + @last_name + "," + @first_name
  end

  #essentially a main method
  if __FILE__ == $0 then
    puts "The max class size is " + @@MAX_CLASS_SIZE.to_s
    myStudent = Student.new("w0218584", "Scott", "Rafael")
    puts myStudent.reportInfo
  end

end #end of class