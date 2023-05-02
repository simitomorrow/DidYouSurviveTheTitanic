[Part of a course at HSLU](https://github.com/digitalideation/compp_f2301) 

# Did you survive the Titanic? Ask an AI to find out!

This Project was inspired by the beginner [kaggle](https://www.kaggle.com/competitions/titanic/overview) challenge about the Titanic.

Goal of the challenge is to create an AI that is able to predict whether or not a person survived the disastrous events years ago, given a set of data about each passenger. 

To me the prospect of an AI predicting the outcome of a person's survival sounded ridiculous, how is that possible? This question made for a fun idea to make a website out of, for people to play around with.

- What kind of person do I need to be to survive?
- Was the saying Women and Children first followed back then?
- Does it matter where people boarded the ship?

## Implementation

As a novice in Artificial Intelligence I followed Ken Jee's guide. Because I am not fluent in Python and using the language in a web environment, I used JavaScript-ported versions of the many Python libraries used in the guide.

For the algorithm I chose Naive Bayes, as it seemed to be the simplest to use. Not having to create an algorithm myself, left the bulk of work in preparing the data and creating visual parts of the webpage. 

### References for building the AI
- https://www.youtube.com/watch?v=I3FBJdiExcg
- https://www.kaggle.com/code/kenjee/titanic-project-example/notebook

### Libraries
- https://scikitjs.org/
- https://www.papaparse.com/


## Dimensions of the data used:
|Label          |Description                    |Format|
| -----------   | -----------                   |----------- |
Survival        |Survival                       |0 = No, 1 = Yes
Pclass          |Ticket class                   |1 = 1st, 2 = 2nd, 3 = 3rd
Name            |Passengername                  |String
Sex 	        |Sex 	                        |male, female
Age 	        |Age in years 	                |int
SibSp           |Nr. of siblings/spouses aboard |int
Parch           |Nr. of parents/children aboard |int
Ticket 	        |Ticket number 	                |String
Fare 	        |Passenger fare 	            |Float
Cabin 	        |Cabin number 	                |String (A-G) followed with number
Embarked        |Port of Embarkation            |C = Cherbourg, Q = Queenstown, S = Southampton