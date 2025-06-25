# Membership operators =  used to test whetehr a value or variables is found in a sequence (string, list, tuple, set, or dictionary)

#     1. in
#     2. not in


'''

word = "APPLE"

letter = input("Guess a letter in the secret word: ")

if letter in word:
    print(f"There is a {letter} in the word")
else:
    print("This letter is not found in the word")

'''


'''
students = ("vikas", "chrag", "karan", "Sonta")

student = input("Enter the name of student: ")

if student not in students:
    print(f"{student} not found")
    
else:
    print(f"{student} was found")

'''



email = "vikas@gmailcom"

if "@" in email and "." in email:
    print("valid email")
else:
    print("Invalid email")