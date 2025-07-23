# Object =  a "bundle" of related attributes (variables) and methods (functions) 

# eg. phone, cup, book

# you need a "class" to create many objects

# class = (blueprint) used to design the structure and layout of an object


class Car:
    def __init__(self, model, year, color, for_sale):
        self.model = model
        self.year = year
        self.color = color
        self.for_sale = for_sale


    def drive(self):
        print("You drive the car")

    def stop(self):
        print("you stop the car")

# car1 = car("mustang", 2025, "red", False)
# car2 = car("corvette", 2022, "blue", True)

# print(car1.model)
# print(car1.year)
# print(car1.color)
# print(car1.for_sale)

Car.drive()
Car.stop()