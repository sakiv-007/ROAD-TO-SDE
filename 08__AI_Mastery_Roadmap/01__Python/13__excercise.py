# validating the username
# should not be more than 12 characters
# should not contain spaces
# must not contain digits

username = input("Enter a username: ")

if len(username) > 12:
    print("Username cannot be greater than 12 characters")
elif not username.find(" ") == -1:
    print("username cannot contain spaces")
elif not username.isalpha():
    print("Your username cannot contain numbers")
else:
    print(f"Welcome {username}")