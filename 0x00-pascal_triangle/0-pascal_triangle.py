#!/usr/bin/python3
"""A module for working with Pascal's triangle."""


def pascal_triangle(n):
    """Creates a list of lists of integers representing
    the Pascal's triangle of a given integer.
    """
    triangle = []
    if n <= 0:
        return triangle
    for i in range(n):
        new_line = [1]
        if i == 0:
            triangle.append(new_line)
        else:
            base_line = triangle[-1].copy()
            base_line.append(0)
            for j in range(len(base_line) - 1):
                new_line.append(base_line[j] + base_line[j + 1])
            triangle.append(new_line)

    return triangle
