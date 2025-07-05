# Multithreading = /Used to perform multple tasks concurrently (multitasking)  
#                 goood for I/O bound tasks like reading files or fetching data from API's threading. Thread (target = my_function)


import threading
import time

def walk_dog(first, last):
    time.sleep(8)
    print(f"You finish walking {first} {last}")

def take_out_trash():
    time.sleep(2)
    print("You take out the trash")

def get_mail():
    time.sleep(4)
    print("You get the mail")



chore1 = threading.Thread(target=walk_dog, args=("Scooby", "Doo"))     # the comma is needed to tell the puthon that it's a tuple
chore1.start()


chore2 = threading.Thread(target=take_out_trash)
chore2.start()

chore3 = threading.Thread(target=get_mail)
chore3.start()

chore1.join()  # without this the further code will execute before waiting for the threads to finish
chore2.join()
chore3.join()

print("You completed all the chores")