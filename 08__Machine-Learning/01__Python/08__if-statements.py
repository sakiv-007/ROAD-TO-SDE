age = int(input("Enter your age: "))

if age >= 100:
    print("you are too old")
elif age >= 18:
    print("You are allowed to vote!")
elif age <= 0:
    print("invalid age entry")
else:
    print("You are not allowed to vote!")
