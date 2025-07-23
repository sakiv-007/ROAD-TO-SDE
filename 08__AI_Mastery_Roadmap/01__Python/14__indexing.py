# string indexing - accessing elements of a sequence using [] (indexing operator) 

# [start : end : step]   start is inclusive end is exclusive

credit_number = "1234 5678-9655"

print(credit_number[4])

print(credit_number[0:4]) # also
print(credit_number[:4])  # does the same
print(credit_number[5:])  # returns from index 5 to the end of the list
print(credit_number[-4])  # starts from the end side
print(credit_number[::2])  # step:  returns every second number and skips the between



#### Program to find the last four digits of the credit card

last_digits = credit_number[-4:]
print(f"XXXX-XXXX-XXXX-{last_digits}")


#### Program to reverse numbers

credit_number = credit_number[::-1]
print(credit_number)