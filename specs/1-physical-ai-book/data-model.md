# Data Model: Physical AI & Humanoid Robotics Book

## Book Content Entity
- **ID**: Unique identifier for the content piece
- **Title**: Human-readable title
- **Content**: MDX content body
- **Module**: Associated learning module (1-4)
- **Week**: Associated week in the progression (1-13)
- **Type**: Content type (text, code, exercise, assessment)
- **Difficulty**: Beginner, Intermediate, Advanced
- **Prerequisites**: List of required concepts
- **LearningObjectives**: List of objectives covered
- **Validation**: Criteria for completion

## Learning Module Entity
- **ID**: Unique identifier for the module
- **Title**: Module title
- **Description**: Brief description
- **WeekRange**: Start and end weeks
- **Topics**: List of topics covered
- **LearningObjectives**: List of module objectives
- **Prerequisites**: Prerequisites for the module
- **Assessments**: Associated assessments
- **Resources**: Additional resources

## Assessment Entity
- **ID**: Unique identifier for the assessment
- **Title**: Assessment title
- **ModuleID**: Associated module
- **Questions**: Array of questions with type and options
- **PassingScore**: Minimum score required
- **TimeLimit**: Optional time limit in minutes
- **Type**: Quiz, Practical, Project-based
- **Feedback**: Feedback for each answer option

## Progress Tracking Entity
- **UserID**: Anonymous user identifier (browser-based)
- **ContentID**: ID of the content being tracked
- **Status**: Not Started, In Progress, Completed
- **CompletionDate**: Date of completion
- **Score**: For assessments
- **TimeSpent**: Time spent on content in seconds
- **LastAccessed**: Last time the content was accessed