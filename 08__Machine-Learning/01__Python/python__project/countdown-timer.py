import time

my_time = int(input("Enter the time in seconds"))

# for x in reversed(range(0,my_time)):
for x in reversed(range(my_time, 0, -1)):
    print(x)
    time.sleep(1)

print("Time's Up")
