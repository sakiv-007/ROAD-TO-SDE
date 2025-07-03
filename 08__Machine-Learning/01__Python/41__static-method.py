# Staic methods = a method that belongs to a class rather than any object from that class (instance)
#                usually used for general utilty functions

# Instance methods = Best for operations on instances of the class (objects)

# Static methods = best for utility functions that do not need access to class data

class Employee:
    def __init__(self, name, position):
        self.name = name
        self.position = position

    def get_info(self):
        return f"{self.name} = {self.position}"
    

    @ staticmethod
    def is_valid_position(position):
        valid_positions = ["Manager", "Cashier", "Cook", "Janitor"]
        return position in valid_positions


employee1 = Employee("Eugene", "Manager")
employee2 = Employee("vikas", "Cashier")
employee3 = Employee("Sonta", "Cook")

print(Employee.is_valid_position("Cook"))   # Static methods do not need to create object to call the functions

print(employee1.get_info())
print(employee2.get_info())
print(employee3.get_info())