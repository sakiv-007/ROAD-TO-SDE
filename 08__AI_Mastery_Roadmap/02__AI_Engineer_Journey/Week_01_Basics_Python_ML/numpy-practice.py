# numpy

# practice tasks

import numpy as np

# arr1 = np.array([1,2,3])
# arr2 = np.array([[1,2],[3,4],[3,4]])

# print(arr1)
# print(arr2)

# print(arr2.shape)
# print(arr2.dtype)



'''

# From a list
arr1 = np.array([1, 2, 3])
print(arr1)

# From a list of lists (matrix)
arr2 = np.array([[1, 2], [3, 4]])
print(arr2)

# Using arange
arr3 = np.arange(0, 10, 2)
print(arr3)

# Using linspace (evenly spaced values)
arr4 = np.linspace(0, 1, 5)
print(arr4)

# Zeros and ones
zeros = np.zeros((2, 3))
ones = np.ones((3, 2))
print(ones)

# Identity matrix
identity = np.eye(3)
print(identity)

arr = np.array([10, 20, 30, 40, 50])
indexes = [1, 3, 4]
print(arr[indexes])  # Output: [20 40 50]


'''



'''

# Step 1: Create a 4×4 matrix with numbers from 1 to 16
matrix = np.arange(1, 17).reshape(4, 4)
print("Original 4x4 Matrix:\n", matrix)

# Step 2: Print the first row
print("\nFirst Row:", matrix[0])

# Step 3: Print the last column
print("\nLast Column:", matrix[:, -1])

# Step 4: Print all elements greater than 10
print("\nElements Greater Than 10:", matrix[matrix > 10])

# Step 5: Submatrix of the middle 2×2 block
# Middle block = rows 1-2 (index 1,2) and columns 1-2 (index 1,2)
middle_block = matrix[1:3, 1:3]
print("\nMiddle 2x2 Submatrix:\n", middle_block)


'''


# arr = np.array([1, 2, 3])
# print(arr.shape)  # (3,)

# arr2 = np.expand_dims(arr, axis=0)
# print(arr2.shape)  # (1, 3)

# arr3 = np.expand_dims(arr, axis=1)
# print(arr3.shape)  # (3, 1)


# a = np.array([[1, 2], [3, 4]])
# b = np.array([[5, 6], [7, 8]])

# print(a * b)

# print(np.dot(a, b))

# print(a@b)


# a = np.array([[1, 2, 3], [4, 5, 6]])
# b = np.array([1, 5, 1])

# print(a + b)


# a = np.array([[1, 2], [3, 4]])
# b = np.array([[5, 6]])

# # Join along axis 0 (rows)
# result = np.concatenate((a, b), axis=0)

# print(result)


# a = np.array([1, 2, 3])
# b = np.array([4, 5, 6])

# stacked = np.stack((a, b), axis=1)
# print(stacked)
# # Output:
# # [[1 2 3]
# #  [4 5 6]]

# print(stacked.shape)  # (2, 3)


a = np.array([1.2345, 2.6789])

print(np.round(a, 2))      # [1.23 2.68]
print(np.clip(a, 1.5, 2.5)) # [1.5 2.5]
