require_relative 'student'

class Course
  attr_reader :course_code
  attr_reader :studentOne

  #constructor for course class
  def initialize(cCode)
    @course_code = cCode
  end

  #add student to class
  def addStudent(studentId, fName, lName)
    @studentOne = Student.new(studentId, fName, lName)
  end

  #main method
  if __FILE__ == $0 then
    puts "The class size limit is " + Student.MAX_CLASS_SIZE.to_s
    myCourse = Course.new("WEBD3101")
    myCourse.addStudent("w8584021","Squiggs", "Net")

    puts "The student list for " + myCourse.course_code
    puts myCourse.studentOne.reportInfo
  end

end