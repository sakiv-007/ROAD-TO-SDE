# Inheritance = Allows a class to inherit attributes and methods from another class 
#      Helps with code reusability and extensibility
#        class Child(Parent)

class Animal:
    def __init__(self, name):
        self.name = name
        self.is_alive = True

    def eat(self):
        print(f"{self.name} is eating")

    def sleep(self):
        print(f"{self.name} is sleeping")


class Dog(Animal):
    pass

class Cat(Animal):
    pass

class Mouse(Animal):
    pass


dog = Dog("Scooby")
cat = Cat("Garfiled")
mouse = Mouse("Mickey")

print(dog.name)
print(dog.is_alive)
dog.eat()
dog.sleep()