from queue import PriorityQueue
import math

def shortest_path(M, start, goal):
    """
    Find the shorted path from 'start' to 'goal' using A* search algorithm.
    Args:
        M: map representing the road network. Keys are intersections and values are lists of neighboring intersections.
        start: start intersection.
        goal: goal intersection.
        
    Returns:
        list: shortest path from start to goal.
    """
    # frontier: intersections being explored, used to prioritize intersections with lower total estimated cost
    # explored: the path taken to reach each intersection
    # cost_so_far: the cost of reaching each intersection respectively
    frontier = PriorityQueue()
    frontier.put((0, start)) # Tuple of (priority, intersection)
    explored = {start: None}
    cost_so_far = {start: 0}
    
    while not frontier.empty():
        # Retrieve the current_intersection with the lowest cost
        _, current_intersection = frontier.get()
        
        if current_intersection == goal:
            break
        
        # Explores the neighbors of the current intersection
        for next_intersection in M.roads[current_intersection]:
            # Calculate the cost to reach the next intersection via the current intersection
            h = _heuristic(M.intersections[current_intersection], M.intersections[next_intersection])
            new_cost = cost_so_far[current_intersection] + h

            # If the intersection has not been visited yet or cheaper path to this intersection has been found
            if next_intersection not in cost_so_far or new_cost < cost_so_far[next_intersection]:
                # Update the cost of reaching the intersection
                cost_so_far[next_intersection] = new_cost

                # Calculate the estimated cost to the goal from the next intersection
                h = _heuristic(M.intersections[goal], M.intersections[next_intersection])
                priority = new_cost + h

                # Add the next intersection to the frontier with the new priority
                frontier.put((priority, next_intersection))

                # Update the path to reach the next intersection
                explored[next_intersection] = current_intersection
    
    # Reconstruct the path from the start to the goal
    path = []
    current_intersection = goal
    while current_intersection != start:
        path.append(current_intersection)
        current_intersection = explored[current_intersection]
    
    path.append(start)
    path.reverse()
    return path

def _heuristic(point_a, point_b):
    """
    Calculate the Euclidean distance between two points.
    """
    x1 = point_a[0]
    x2 = point_b[0]
    y1 = point_a[1]
    y2 = point_b[1]
    return math.sqrt(math.pow(x1 - x2, 2) + math.pow(y1 - y2, 2))