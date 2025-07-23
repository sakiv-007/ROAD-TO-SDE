# *args       =  allows you to pass multiple non key arguments
#  **kwargs   = allows you to pass multiple keyword arguments
#           * = unpacking operator
#    1. positional 2. default 3. KEYWORD 4.arbirary (varying number of arguments that a user may pass)


'''
def add(*args):
    total = 0
    for arg in args:
        total += arg
    return total

print(add(2,3,5,6))

'''




'''
def display_name(*args):
    for arg in args:
        print(arg, end=" ")

display_name("Mr.", "vikas", "kumar", "shah" )

'''



'''
def print_address(**kwargs):
    for key, value in kwargs.items():
         print(f"{key} : {value}")

print_address(street="123 Street", 
              city="Detroit", 
              state="Punjab", 
              zip="12354" )

'''



def shipping_label(*args, **kwargs):
    for arg in args:
        print(arg, end=" ")
    print()
    
    print(f"{kwargs.get('street')}")
    print(f"{kwargs.get('city')} {kwargs.get('state')} {kwargs.get('zip')}")

shipping_label("Dr.", "vikas", "kumar", "shah",
               street="123",
               apt="456",
               city="batala",
               state="Punjab",
               zip="15456")