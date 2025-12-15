---
sidebar_position: 6
title: Module 1 - The Robotic Nervous System (ROS 2)
---

# Module 1: The Robotic Nervous System (ROS 2)

## Overview

This module introduces the Robot Operating System (ROS 2), which serves as the "nervous system" for robots, providing the middleware necessary for different components to communicate effectively.

## Learning Objectives

By the end of this module, you will:
- Understand the core concepts of ROS 2
- Create and run ROS 2 nodes, topics, services, and actions
- Build simple ROS 2 packages
- Work with URDF for robot description

## Topics Covered

1. [ROS 2 Architecture](#ros-2-architecture)
2. [Nodes, Topics, Services, and Actions](#nodes-topics-services-and-actions)
3. [Creating ROS 2 Packages](#creating-ros-2-packages)
4. [Working with URDF](#working-with-urdf)

## ROS 2 Architecture

ROS 2 provides a flexible framework for developing robot applications. It includes:

- A communication layer that enables different software components to communicate
- Tools for building, running, and debugging robot applications
- Hardware abstraction and device drivers
- Libraries for common robot functions

## Hands-on Exercise: Your First ROS 2 Node

<InteractiveExercise
  exerciseId="module1-ex1"
  title="Creating Your First ROS 2 Node"
  description="In this exercise, you'll create a simple ROS 2 node that publishes a message to a topic."
  initialCode={`// TODO: Create a simple ROS 2 publisher node
// 1. Import necessary ROS 2 libraries
// 2. Create a node class
// 3. Create a publisher
// 4. Publish a message periodically`}
  solution={`// Example Python code for a ROS 2 publisher node
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):

    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World: %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher()
    rclpy.spin(minimal_publisher)
    minimal_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()`}
/>

<ProgressTracker contentId="module1" title="Module 1 - ROS 2" />

## Summary

This module provides the foundation for understanding how robots communicate internally. ROS 2 serves as the middleware that allows different components to work together seamlessly. In the next module, we'll explore how to simulate these systems in virtual environments.