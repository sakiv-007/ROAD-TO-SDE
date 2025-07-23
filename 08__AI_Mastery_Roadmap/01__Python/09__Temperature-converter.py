unit = input("is this temperature in Farenhite or Celcius: (F/C)")
temp = float(input("Enter the temperature: "))

if unit == "C" or "c":
    temp = round((9 * temp) / 5 + 32, 1)
    print(f"The temperature in Farenhite is: {temp}°F")

elif unit == "F" or "f":
    temp = round((temp - 32) * 5 / 9, 1)
    print(f"The temperature in Celcius is: {temp}°C")

else:
    print(f"the {unit} temperature is invalid")