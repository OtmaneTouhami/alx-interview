#!/usr/bin/python3
"""A module for working with Pascal's triangle."""


def pascal_triangle(n):
    """Creates a list of lists of integers representing
    the Pascal's triangle of a given integer.
    """
    result = [[1]]
    for _ in range(1, n):
        previous_row = result[-1]
        new_row = [a + b for a, b in zip(previous_row, previous_row[1:])]
        new_row = [1] + new_row + [1]
        result.append(new_row)

    return result
