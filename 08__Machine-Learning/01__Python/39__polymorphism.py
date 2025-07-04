# polymorphism = Greek word that mean to "have many forms or faces" 

#            poly = many
#            Morphe = Form


#         TWO WAYS TO ACHIEVE POLYMORPHISM
#         1. inheritance = An object could be treated of the same type as a parent class
#         2. "Duck typing" = Object must have becessary attributes/methods

# from abc import ABC, abstractmethod

class Shape:

    # @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius **2

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side **2

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return self.base * self.height * 0.5
    

class Pizza(Circle):
    def __init__(self, topping, radius):
        super().__init__(radius)
        self.topping = topping


shapes = [Circle(4), Square(5), Triangle(6, 8), Pizza("pepperoni", 15)]

for shape in shapes:
    print(shape.area())