#typecasting: Typecasting is a process of converting a variable from one datatype to another 
     # str(), int(), float(), bool()

name = "vikas kumar"
age = 22
gpa =  3.2
is_student = True

#type(name)

print(type(name))

gpa = int(gpa)

print(gpa)

#age = float(age)
#print(age)

age = str(age)
print(type(age))

age += "1"
print(age)

name = bool(name) #if name stirng is left empty only then it's false ence it;'s helpful for checkingi if the user entered the name or not so if it'sfalse we can prompt to enter the name

print(name)