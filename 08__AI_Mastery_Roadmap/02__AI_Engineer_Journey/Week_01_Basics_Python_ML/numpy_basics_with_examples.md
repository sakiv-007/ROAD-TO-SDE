# NumPy Basics with Examples

> This document covers key foundational concepts in NumPy for beginners with explanations, code examples, and expected outputs.

---

## 1. Creating Arrays

### `np.array()`
Creates a NumPy array from a list.
```python
import numpy as np
arr = np.array([1, 2, 3])
print(arr)  # Output: [1 2 3]
```

### `np.arange(start, stop, step)`
Returns evenly spaced values within a given interval.
```python
arr = np.arange(0, 10, 2)
print(arr)  # Output: [0 2 4 6 8]
```

### `np.linspace(start, stop, num)`
Returns `num` evenly spaced values between `start` and `stop`.
```python
arr = np.linspace(0, 1, 5)
print(arr)  # Output: [0.   0.25 0.5  0.75 1.  ]
```

### `np.zeros(shape)`
Creates an array filled with zeros.
```python
zeros = np.zeros((2, 3))
print(zeros)
# Output:
# [[0. 0. 0.]
#  [0. 0. 0.]]
```

### `np.ones(shape)`
Creates an array filled with ones.
```python
ones = np.ones((2, 2))
print(ones)
# Output:
# [[1. 1.]
#  [1. 1.]]
```

### `np.eye(n)`
Creates an identity matrix of size `n x n`.
```python
identity = np.eye(3)
print(identity)
# Output:
# [[1. 0. 0.]
#  [0. 1. 0.]
#  [0. 0. 1.]]
```

---

## 2. Indexing & Slicing

### Basic Indexing (1D)
```python
arr = np.array([10, 20, 30, 40])
print(arr[0])     # Output: 10
print(arr[-1])    # Output: 40
```

### Slicing (1D)
```python
print(arr[1:3])   # Output: [20 30]
print(arr[::2])   # Output: [10 30]
```

### 2D Indexing
```python
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])
print(matrix[0][1])     # Output: 2
print(matrix[2, 2])     # Output: 9
```

### 2D Slicing
```python
print(matrix[0:2, 1:3])
# Output:
# [[2 3]
#  [5 6]]
```

### Boolean Indexing
```python
arr = np.array([1, 2, 3, 4, 5])
print(arr[arr > 3])
# Output: [4 5]
```

### Fancy Indexing
```python
arr = np.array([10, 20, 30, 40])
print(arr[[0, 2]])
# Output: [10 30]
```

---

## Practice Task Example
```python
matrix = np.arange(1, 17).reshape(4, 4)
print("Matrix:\n", matrix)

# First row
print("First row:", matrix[0])

# Last column
print("Last column:", matrix[:, -1])

# Elements greater than 10
print(">10:", matrix[matrix > 10])

# Middle 2x2 block
print("Middle 2x2:\n", matrix[1:3, 1:3])
```

### Output:
```
Matrix:
 [[ 1  2  3  4]
  [ 5  6  7  8]
  [ 9 10 11 12]
  [13 14 15 16]]
First row: [1 2 3 4]
Last column: [ 4  8 12 16]
>10: [11 12 13 14 15 16]
Middle 2x2:
 [[ 6  7]
  [10 11]]
```

---

