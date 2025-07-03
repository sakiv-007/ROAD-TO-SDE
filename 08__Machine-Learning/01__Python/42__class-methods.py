# class methods = allows operations related to the class itself

#     Take (cls) as the firs parameter, which reperesnts ths class itself

class Student:

    count = 0
    total_gpa = 0

    def __init__(self, name, gpa):
        self.name = name
        self.gpa = gpa
        Student.count += 1
        Student.total_gpa += gpa

    def get_info(self):
        return f"{self.name} {self.gpa}"
    
    @classmethod
    def get_count(cls):
        return f"Total # of students: {cls.count}"
    
    @classmethod
    def get_average_gpa(cls):
        if cls.count == 0:
            return 0
        else:
            return f"{cls.total_gpa / cls.count:.2f}"
    
student1 = Student("vikas", 8.5)
student2 = Student("sonta", 7.5)
student3 = Student("chirag", 8.0)

print(Student.get_count())
print(Student.get_average_gpa())