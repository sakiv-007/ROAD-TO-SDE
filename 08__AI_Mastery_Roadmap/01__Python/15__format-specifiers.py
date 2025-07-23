# format specifiers = {:flags} format a value based on what flags are inserted

# .(number)f  = round to that many decimal places (fxed point)

# :(number) = allocate that many spaces

# :03 = allocate and zero pad that many spaces

# :< = left jusify

# :> = right justify

# : = center align

# :+ = use a plus sign to indicate positive value

# :=  = place sign to leftmost position

# :  = insert a space before positive numbers

# :, = comma separator


#examples

price1 = 3.1452
price2 = -5286.548
price3 = 15562.34

print(f"Price 1 is ${price1:.2f}")
print(f"Price 2 is ${price2:.2f}")
print(f"Price 3 is ${price3:.2f}")

print(f"Price 1 is ${price1:}")
print(f"Price 2 is ${price2:}")
print(f"Price 3 is ${price3:}")

print(f"Price 1 is ${price1:,}")
print(f"Price 2 is ${price2:,}")
print(f"Price 3 is ${price3:,}")