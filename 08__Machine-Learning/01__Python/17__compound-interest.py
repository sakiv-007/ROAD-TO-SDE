# compound interest calculator

principle = 0
rate = 0
time = 0

while principle <= 0:
    principle = float(input("Enter the principle amount: "))
    if principle <= 0:
        print("Principle amount cannot be less than or equal to zero")

while rate <= 0:
    rate = float(input("Enter the interest rate: "))
    if rate <= 0:
        print("interest rate cannot be less than or equal to zero")

while time <= 0:
    time = int(input("Enter the time in years: "))
    if time <= 0:
        print("time cannot be less than or equal to zero")

amount = principle * pow((1 + rate / 100) , time)

print(f"the Balance after {time} year's : ${amount:.2f}")