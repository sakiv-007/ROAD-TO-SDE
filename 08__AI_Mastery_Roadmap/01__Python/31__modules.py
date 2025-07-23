# module =  a file containf code yoy want to incluce in your program use 'import' to include a module (built in or your own ) 
# 
# useful to break a large program reusable reparate files



# import math
# import math as m
# from math import pi

# print(round(math.pi, 3))


# importing the self made module

import mymodule

result = mymodule.pi
result = mymodule.square(3)
result = mymodule.circumference(3)
result = mymodule.cube(3)
result = mymodule.area(3)

print(result)
