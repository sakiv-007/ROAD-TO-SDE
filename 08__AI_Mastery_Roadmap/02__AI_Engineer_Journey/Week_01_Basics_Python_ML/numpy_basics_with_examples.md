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


# NumPy Core Concepts

This document summarizes all the key NumPy topics we’ve covered so far with explanations and examples.

---

## 1. Importing NumPy

```python
import numpy as np
```

---

## 2. Creating Arrays

### Using `array()`

```python
arr1 = np.array([1, 2, 3])
print(arr1)  # Output: [1 2 3]
```

### Using `arange()`

Creates evenly spaced values within a given interval.

```python
arr = np.arange(0, 10, 2)
print(arr)  # Output: [0 2 4 6 8]
```

### Using `linspace()`

Returns evenly spaced numbers over a specified interval.

```python
arr = np.linspace(0, 1, 5)
print(arr)  # Output: [0.   0.25 0.5  0.75 1.  ]
```

### Using `zeros()` and `ones()`

```python
print(np.zeros((2, 3)))  # Output: 2x3 matrix of 0s
print(np.ones((2, 3)))   # Output: 2x3 matrix of 1s
```

### Using `eye()` (identity matrix)

```python
print(np.eye(3))  # 3x3 Identity matrix
```

---

## 3. Indexing and Slicing

```python
arr = np.array([10, 20, 30, 40])
print(arr[1])        # Output: 20
print(arr[1:3])      # Output: [20 30]
```

For 2D arrays:

```python
matrix = np.array([[1, 2], [3, 4]])
print(matrix[0, 1])  # Output: 2
```

---

## 4. Array Shape and Reshaping

```python
arr = np.array([[1, 2], [3, 4], [5, 6]])
print(arr.shape)  # Output: (3, 2)

reshaped = arr.reshape(2, 3)
print(reshaped)    # 2x3 reshaped array
```

---

## 5. Aggregation Functions

```python
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(np.sum(arr))         # Output: 21
print(np.min(arr))         # Output: 1
print(np.max(arr))         # Output: 6
print(np.mean(arr))        # Output: 3.5
print(np.std(arr))         # Output: 1.707825127659933
print(np.var(arr))         # Output: 2.9166666666666665
```

Axis-wise operations:

```python
print(np.sum(arr, axis=0))  # Sum by column → [5 7 9]
print(np.sum(arr, axis=1))  # Sum by row → [ 6 15]
```

---

## 6. Boolean Masking and Filtering

```python
arr = np.array([1, 2, 3, 4, 5])
mask = arr > 3
print(mask)        # Output: [False False False  True  True]
print(arr[mask])   # Output: [4 5]
```

You can also do:

```python
print(arr[arr % 2 == 0])  # Output: [2 4]
```

---

## 7. Array Copy vs View

```python
arr = np.array([1, 2, 3])
copy_arr = arr.copy()
view_arr = arr.view()

copy_arr[0] = 100
view_arr[1] = 200

print(arr)       # Original unchanged by copy, changed by view
print(copy_arr)  # Output: [100 2 3]
print(view_arr)  # Output: [1 200 3]
```

---

## 8. Broadcasting

```python
arr = np.array([[1, 2], [3, 4]])
print(arr + 10)
# Output:
# [[11 12]
#  [13 14]]

v = np.array([1, 2])
print(arr + v)
# Output:
# [[2 4]
#  [4 6]]
```

---

## 9. Data Types (dtype)

```python
arr = np.array([1, 2, 3], dtype='float32')
print(arr.dtype)  # Output: float32
```

You can convert:

```python
int_arr = arr.astype('int')
```

---

## ✅ Summary:

You’ve learned:

* Array creation techniques (`array`, `arange`, `linspace`, `zeros`, `ones`, `eye`)
* Indexing, slicing, reshaping, broadcasting
* Aggregations like `sum`, `mean`, `min`, `max`, `std`, etc.
* Boolean filtering and masking
* Copy vs View behavior
* Basic dtype handling

Ready to move to advanced topics like: reshaping, stacking, splitting, random number generation, and performance tips!
