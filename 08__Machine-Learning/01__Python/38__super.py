# super() = Function used in a child class to call mehods from a parent class (superclass).
#           Allows you to extend the functionality of the inherited methods


class Shape:
    def __init__(self, color, is_filled):
        self.color = color
        self.is_filled = is_filled

    def describe(self):
        print(f"It is {self.color} and {'filled' if self.is_filled else 'not filled'}")

class Circle(Shape):
    def __init__(self, color, is_filled, radius):
        super().__init__(color, is_filled)
        self.radius = radius

    def describe(self):
        print(f"It is a circle with an area of {3.14 * self.radius * self.radius} cm^2")
        super().describe()

class Square(Shape):
    def __init__(self, color, is_filled, width):
        super().__init__(color, is_filled)
        self.width = width

    def describe(self):
        print(f"It is a Square with an area of {self.width * self.width} cm^2")
        super().describe()

class Triangle(Shape):
    def __init__(self, color, is_filled, width, height):
        super().__init__(color, is_filled)
        self.width = width
        self.height = height

    def describe(self):
        print(f"It is a Triangle with an area of {self.width * self.height / 2} cm^2")
        super().describe()
 
circle = Circle("red", True, radius=5)
square = Square("blue", False, width=9)
triangle = Triangle("yellow", True, width=7, height= 8)

# print(circle.color)
# print(circle.is_filled)
# print(circle.radius)
# print(square.is_filled)
# print(square.width)
# print(triangle.width)
# print(triangle.height)


circle.describe()
square.describe()
triangle.describe()
