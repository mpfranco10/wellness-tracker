# User Flows

This document describes the main user flows for the MVP. The goal is to keep common actions quick while allowing users to review and correct their data when needed.

## 1. Account & Onboarding

New users must complete onboarding before accessing the main app.

```text
Open App
   ↓
Sign Up / Log In
   ↓
Existing account?
   ├── Yes → Dashboard
   │
   └── No → Create Account
                ↓
             Profile
        - Height
        - Current weight
        - Age
        - Sex
                ↓
              Goals
        - Target weight
        - Exercise days/week
                ↓
             Dashboard
```

The weight entered during onboarding becomes the user's first weight entry.

Onboarding progress is not saved until it is completed. If the user leaves before finishing, they will start the onboarding again.

---

## 2. Log Weight

Weight can be logged from any main section of the app using the global add button.

```text
Any Main Screen
      ↓
      +
      ↓
    Weight
      ↓
Enter Weight
      ↓
Review Date & Time
      ↓
     Save
      ↓
  Dashboard
```

Date and time are filled automatically but can be edited.

Multiple weight entries on the same day are allowed.

Existing entries can be edited or deleted.

---

## 3. Log Meal

Meals can be logged using text, a photo, or both.

```text
Any Main Screen
      ↓
      +
      ↓
     Meal
      ↓
Enter Meal Information
      ↓
  Analyze?
   /     \
 Yes      No
  ↓        ↓
AI Analysis
  ↓        │
Review     │
  ↓        │
Edit       │
  \        /
     Save
      ↓
  Dashboard
```

Meal information includes:

- Date and time
- Meal type
- Location
- Description
- Photo

### Meal Type

The meal type is suggested automatically based on the selected time:

- 05:00–11:59 → Breakfast
- 12:00–14:59 → Lunch
- 15:00–17:59 → Snack
- 18:00–04:59 → Dinner

The suggestion can always be changed manually. If the user manually selects a meal type, their selection should be respected.

### Location

Users can select:

- Home
- Restaurant
- Other

When Restaurant is selected, an optional restaurant name field is shown.

### AI Analysis

AI analysis only starts when the user selects **Analyze**.

The analysis can suggest:

- Meal components
- Estimated calories for each component
- Estimated total calories
- Food categories such as protein, carbohydrates, vegetables, and fruit

All AI-generated information can be edited. Users can also add or remove components.

Calories can be entered manually without using AI.

If AI analysis fails, the user can retry or save the meal without analysis.

---

## 4. Log Exercise

```text
Any Main Screen
      ↓
      +
      ↓
   Exercise
      ↓
Select Activity
      ↓
Enter Duration & Intensity
      ↓
Estimated Calories
      ↓
Review / Replace Estimate
      ↓
     Save
      ↓
Garden Progress Updated
```

Date and time are filled automatically but can be edited.

Duration is required.

Users can select an activity from the default list or create their own. Custom activities are private to the user and become available for future entries.

Calories burned are estimated using the exercise information and user profile. The estimate can be manually replaced.

### Garden Progress

Every **25 accumulated minutes of exercise** grows one plant.

For example:

```text
Previous progress: 10 min
Exercise:          +45 min
                   -------
Total:              55 min

→ 2 plants grown
→ 5 min carried over
```

When one or more plants are created after saving, the user sees a short celebration message:

```text
🌱 You grew 2 new plants!

5 min toward your next plant.
```

If a plant is not created, the user sees their current progress:

```text
🌱 Almost there!

7 more minutes to grow your next plant.
```

Editing or deleting exercise entries recalculates garden progress based on the current exercise history.

---

## 5. Dashboard & Progress

The dashboard provides two views:

```text
[ Week | Month ]
```

Changing the period updates the dashboard as a whole.

The dashboard includes:

- Current weight and weight trend
- Exercise days and progress toward the weekly goal
- Total exercise time
- Estimated calories burned
- Average logged meal calories
- Number of restaurant meals during the selected period
- Garden progress

Average meal calories only use days with logged meal data. Missing days are not treated as zero-calorie days.

Dashboard sections can be opened to view their related history.

```text
Weight   → Weight History
Exercise → Exercise History
Meals    → Meal History
Garden   → Garden
```

---

## 6. Calendar & History

The calendar provides a visual overview of tracked activity.

Days use small indicators for the types of data recorded:

- ⚖️ Weight
- 🍱 Meal
- 🍜 Restaurant meal
- 🏃 Exercise

Multiple entries of the same type do not require multiple icons.

```text
Calendar
   ↓
Select Day
   ↓
Day Summary
   ↓
┌─────────────────┐
│ Weight entries  │
│ Meals           │
│ Exercise        │
└─────────────────┘
   ↓
Select Entry
   ↓
View / Edit / Delete
```

Deleting an entry requires confirmation.

When viewing a specific date, the global add button can be used to create a new entry with that date already selected.

Editing or deleting exercise entries also updates the garden progress.

---

## Empty States

When there is not enough data to display a chart, statistic, history, or garden progress, the app should show a helpful empty state instead of an empty visualization or zero-filled statistics.

For example:

```text
No weight entries yet.

Add your first measurement to start tracking your progress.
```

Empty states should guide the user toward the relevant first action.
