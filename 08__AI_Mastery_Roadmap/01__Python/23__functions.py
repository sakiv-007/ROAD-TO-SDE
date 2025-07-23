# functions = A block of reusable code
#   place () after the function name to invoke it


'''
def happy_bday(name, age):
    print(f"Happy birthday to {name}!")
    print(f"You are {age} years old")
    print("Happy birthday to you!")

happy_bday("vikas", 22)
happy_bday("sonta", 20)
happy_bday("chirag", 21)

'''



'''
def display_invoice(username, amount, due_date):
    print(f"Hello {username}")
    print(f"Your Bill of ${amount:.2f} is due: {due_date}")

display_invoice("vikas", 502.0, "30/06")

'''


'''
# return = statement used to end a funtion
#  and send a result back to the caller

def add(x,y):
    z = x + y
    return z

def sub(x,y):
    z = x - y
    return z

def mul(x,y):
    z = x * y
    return z

def div(x,y):
    z = x / y
    return z


print(add(2,5))   # print(7)
print(sub(2,5))   # print(-3)
print(mul(2,5))
print(div(2,5))

'''



def create_name(first, last):
    first = first.capitalize()
    last  = last.capitalize()
    return first + " " + last

full_name = create_name("vikas", "kumar")

print(full_name)