# "Duck Typing" = another way to achieve polymorphism besides inheritance

# Object must have the minimum necessary attributes/methods
#  "If it all looks like a duck and quacks like a duckm it must be a duck."


class Animal:
    alive = True

class Dog(Animal):
    def speak(self):
        print("WOOF!")

class Cat(Animal):
    def speak(self):
        print("MEOW!")

class Car:
    alive = False
    def speak(self):
        print("HONK!")

animals = [Dog(), Cat(), Car()]

for animal in animals:
    animal.speak()
    print(animal.alive)