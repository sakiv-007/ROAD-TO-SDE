# Exception = an event that interrupt the flow of a program (ZeroDivisionError, TypeError, ValueError)

#            1.try,    2.except,   3.finally

try:
    number = int(input("Enter a number: "))
    print(1/number)

except ZeroDivisionError:
    print("You can't divide by zero IDIOT!")

except ValueError:
    print("Enter only numbers please!")

except Exception:
    print("Something went wrong!")

finally:
    print("Do some cleanup here")