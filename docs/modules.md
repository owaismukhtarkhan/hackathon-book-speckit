---
sidebar_position: 2
title: Modules Overview
---

# Learning Modules

This book is structured into four main modules that progressively introduce concepts of Physical AI and Humanoid Robotics:

## Module 1: The Robotic Nervous System (ROS 2)

Focus: Middleware for robot control

Required Concepts:
- ROS 2 nodes, topics, services, actions
- Python-based ROS agents using `rclpy`
- Bridging AI logic to robot controllers
- URDF (Unified Robot Description Format) for humanoids

Mandatory Outputs:
- Working ROS 2 packages
- Valid URDF humanoid model

## Module 2: The Digital Twin (Gazebo & Unity)

Focus: Physics simulation and environment modeling

Required Concepts:
- Physics simulation (gravity, collisions)
- Gazebo world building
- Unity-based visualization for HRI
- Sensor simulation (LiDAR, Depth Cameras, IMUs)

Mandatory Outputs:
- Simulated humanoid in Gazebo
- Sensor data streams validated

## Module 3: The AI–Robot Brain (NVIDIA Isaac™)

Focus: Advanced perception, navigation, and training

Required Concepts:
- NVIDIA Isaac Sim (photorealistic simulation)
- Synthetic data generation
- Isaac ROS acceleration
- Visual SLAM (VSLAM)
- Nav2 for humanoid path planning

Mandatory Outputs:
- Working perception pipeline
- Navigating humanoid agent in simulation

## Module 4: Vision–Language–Action (VLA)

Focus: Convergence of LLMs and Robotics

Required Concepts:
- Voice-to-Action pipelines
- Speech recognition
- Cognitive planning via LLMs
- Translation of natural language into ROS 2 action sequences

⚠️ **AI API Rule:**
If external AI APIs are required, **Google Gemini MUST be used**. OpenAI APIs are prohibited.

Mandatory Outputs:
- Natural language command → robot action execution