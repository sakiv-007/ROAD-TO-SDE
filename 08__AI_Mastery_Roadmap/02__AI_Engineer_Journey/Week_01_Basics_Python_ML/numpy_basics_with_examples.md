# NumPy Basics with Examples

> This document covers key foundational concepts in NumPy for beginners with explanations, code examples, and expected outputs.

---

## 1. Importing NumPy

```python
import numpy as np
```

---

## 2. Creating Arrays

### `np.array()`

Creates a NumPy array from a list.

```python
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

### `np.zeros(shape)` and `np.ones(shape)`

Create arrays filled with zeros or ones.

```python
print(np.zeros((2, 3)))
print(np.ones((2, 2)))
```

### `np.eye(n)`

Creates an identity matrix of size `n x n`.

```python
print(np.eye(3))
```

---

## 3. Indexing, Slicing, and Masking

### 1D Indexing and Slicing

```python
arr = np.array([10, 20, 30, 40])
print(arr[0])       # 10
print(arr[-1])      # 40
print(arr[1:3])     # [20 30]
print(arr[::2])     # [10 30]
```

### 2D Indexing and Slicing

```python
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])
print(matrix[0][1])     # 2
print(matrix[2, 2])     # 9
print(matrix[0:2, 1:3])
```

### Boolean Indexing & Filtering

```python
arr = np.array([1, 2, 3, 4, 5])
print(arr[arr > 3])          # [4 5]
print(arr[arr % 2 == 0])     # [2 4]
```

### Fancy Indexing

```python
arr = np.array([10, 20, 30, 40])
print(arr[[0, 2]])  # [10 30]
```

---

## 4. Shape & Reshaping

```python
arr = np.array([[1, 2], [3, 4], [5, 6]])
print(arr.shape)  # (3, 2)
reshaped = arr.reshape(2, 3)
print(reshaped)
```

---

## 5. Aggregation Functions

```python
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(np.sum(arr))         # 21
print(np.min(arr))         # 1
print(np.max(arr))         # 6
print(np.mean(arr))        # 3.5
print(np.std(arr))         # 1.707...
print(np.var(arr))         # 2.91...
```

### Axis-based Aggregation

```python
print(np.sum(arr, axis=0))  # [5 7 9]
print(np.sum(arr, axis=1))  # [6 15]
```

---

## 6. Copy vs View

```python
arr = np.array([1, 2, 3])
copy_arr = arr.copy()
view_arr = arr.view()
copy_arr[0] = 100
view_arr[1] = 200

print(arr)       # [1 200 3]
print(copy_arr)  # [100 2 3]
print(view_arr)  # [1 200 3]
```

---

## 7. Broadcasting

```python
arr = np.array([[1, 2], [3, 4]])
print(arr + 10)

v = np.array([1, 2])
print(arr + v)
```

---

## 8. Data Types (dtype)

```python
arr = np.array([1, 2, 3], dtype='float32')
print(arr.dtype)
int_arr = arr.astype('int')
```

---

## 9. Useful NumPy Utilities

### `np.unique()`

```python
arr = np.array([1, 2, 2, 3, 3, 3])
print(np.unique(arr))  # [1 2 3]
vals, counts = np.unique(arr, return_counts=True)
print(vals, counts)    # [1 2 3] [1 2 3]
```

### `np.sort()` vs `np.argsort()`

```python
a = np.array([10, 5, 2])
print(np.sort(a))       # [2 5 10]
print(np.argsort(a))    # [2 1 0]
```

### `np.where()`

```python
arr = np.array([1, 2, 3, 4, 5])
print(np.where(arr > 3))  # (array([3, 4]),)
print(np.where(arr > 3, "High", "Low"))
```

### `np.isnan()` and `np.isinf()`

```python
arr = np.array([1, 2, np.nan, np.inf])
print(np.isnan(arr))  # [False False  True False]
print(np.isinf(arr))  # [False False False  True]
```

### `np.clip()`

```python
arr = np.array([1, 5, 10, 15])
print(np.clip(arr, 3, 12))  # [ 3  5 10 12]
```

---

## 10. Random Module (`np.random`)

### `np.random.rand()`

```python
np.random.rand(2, 3)  # Uniform distribution
```

### `np.random.randn()`

```python
np.random.randn(2, 3)  # Normal distribution
```

### `np.random.randint()`

```python
np.random.randint(1, 10, size=(2, 3))
```

### `np.random.choice()`

```python
arr = [10, 20, 30, 40]
np.random.choice(arr, size=2)
```

### `np.random.shuffle()`

```python
arr = np.array([1, 2, 3, 4, 5])
np.random.shuffle(arr)
print(arr)
```

### `np.random.seed()`

```python
np.random.seed(42)
print(np.random.rand(3))
```

---

## ✅ Summary:

You’ve learned:

* Array creation: `array`, `arange`, `linspace`, `zeros`, `ones`, `eye`
* Indexing, slicing, masking, filtering
* Shape, reshaping
* Aggregations: `sum`, `mean`, `min`, `max`, etc.
* Copy vs View
* Broadcasting and dtype handling
* Utility functions: `unique`, `sort`, `where`, `clip`, `isnan`, `isinf`
* Random module: `rand`, `randn`, `randint`, `choice`, `shuffle`, `seed`

🎉 You're now ready to move on to **Pandas** or other intermediate NumPy tasks!
