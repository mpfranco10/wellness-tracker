# Product Requirements

## Overview

This project is a wellness tracking app focused on making it easy to keep track of weight, meals, and exercise without requiring extremely detailed logging.

The main idea is to make tracking flexible enough to work in everyday situations, such as eating at restaurants or not knowing the exact calories in a meal, while still providing useful trends and insights over time.

## Goals

- Make daily tracking quick and simple.
- Track weight progress over time.
- Keep a flexible record of meals, including restaurant meals.
- Use AI to help estimate calories and meal information from text or photos.
- Track exercise and estimated calories burned.
- Show useful weekly and monthly trends.
- Keep the experience motivating without relying on strict streaks or perfect logging.

## MVP Features

### Account and Profile

Users can create an account and store basic profile information:

- Weight
- Height
- Age
- Sex/gender information needed for calorie estimates
- Target weight
- Weekly exercise goal

Each user's tracking data is private to their account.

### Weight Tracking

Users can record their weight whenever they choose.

Each entry stores the weight, date, and time.

The app shows:

- Weight history
- Weight trend over time
- Progress toward the target weight

### Meal Tracking

Users can log breakfast, lunch, dinner, snacks, or other meals.

A meal can include:

- Date and time
- Text description
- Photo
- Location: home, restaurant, or other
- Restaurant name when applicable

AI can analyze the description and/or photo to provide an approximate calorie estimate and basic information about the meal.

The user can review and edit the result before saving it.

Calorie estimates should always be presented as approximate rather than exact values.

### Exercise Tracking

Users can record an exercise session with:

- Activity type
- Duration
- Intensity
- Date and time
- Optional notes

The app provides an approximate calorie estimate based on the activity and available profile information.

Users can view their exercise history, number of sessions, and total exercise time.

### Dashboard

The dashboard gives an overview of recent progress and can switch between weekly and monthly views.

It includes information such as:

- Weight trend
- Exercise frequency
- Total exercise time
- Estimated calories burned
- Restaurant meal frequency
- Meal and calorie trends

### Calendar

The calendar provides a simple overview of tracked activity.

Users can see which days they:

- Exercised
- Logged their weight
- Logged meals
- Ate at a restaurant

Selecting a day shows the entries recorded on that date.

### Goals

The MVP includes two types of goals:

- Target weight
- Exercise days per week

### Garden

The MVP includes a small gamification feature where exercise contributes to the growth of a virtual garden.

The garden is designed as a positive representation of accumulated progress. Missing a day does not remove progress or reset the garden.

## Product Principles

### Keep tracking simple

Logging should take as little time as possible. Users should not need exact quantities or nutritional information to record a meal.

### Prefer useful estimates over false precision

AI-generated calorie and meal information should be clearly presented as approximate.

### Focus on progress, not perfection

Missing days or incomplete data should not be treated as failure. The app should help users understand longer-term patterns instead of focusing too heavily on individual days.

## Out of Scope for the MVP

The first version will not include:

- Apple Health or Google Fit integration
- GPS activity tracking
- Social features or leaderboards
- Detailed macro tracking
- Meal or workout plans
- AI coaching
- Advanced game mechanics
- Pets, currencies, shops, or collectibles
- Wearable integrations

These features can be considered after the core tracking experience is working well.
