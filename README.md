# ScheduleMe
A web app that allows users to check for time conflicts between classes that they want to take 
instead of having to sit down and check for conflicts themselves.

## Audience
The audience would primarily be students who don't have access to scheduling software via their school
and instead have to sit down with student advisors for extended periods of time.

## Experience
A user who opens the app is automatically taken to a sign in page where they will either log in or sign up. 
Upon logging in after making an account, they will be taken to a home page where they will either be able to add a class or 
check what they already have added to their schedule. 

If they choose to add a class, they will be prompted for the name of the class, 
the days which it takes place and the start and end times. When adding a class, if the user already has a class saved, the
times of the new class will be compared against those of othe classes already saved to see if there are any conflicts with scheduling.
If there appear to be no conflicts, the class will then be added to a saved list of classes for the user.

If the user chooses to view what they have scheduled, they will be able to view the classes they have saved. From here they 
will also be able to clear their list of classes, to add more classes, or subtract classes.

# Technical
## Models
### User
username - String

email - String

password - String

classes - array of Class objects

### Class
name - String 

days - array [m, t, w, tr, f]

start-time - String (that includes ':' && 'am' or 'pm')

end-time - "" "" "" ""

## Views

## Routes

## Other
Encrypting package to encrypt user passwords (BCRYPT DID NOT WORK ON MY COMPUTER)

Concerns: How do I keep checking for conflicts short? I don't want to iterate through a gigantic list for every new class.

# Weekly Milestones
## Week 1 - Usable Build
### Monday 
Finish design docs, get a green light on scope
### Tuesday
Set directories up as well as database, define models, set up views
### Wednesday
Implement login / logout and make sure pages are all "viewable" (if user enters URL, things get properly rendered)
### Thursday
Implement adding / deleting classes 
### Friday
Have a usable build where users are able to sign up & login and view the home page as well as add classes.

## Week 2 - Feature Complete
### Monday
### Tuesday
### Wednesday
### Thursday
### Friday
Have all core features complete and working without bugs -> conflict check, deleting all classes at once,

## Week 3 - Polishing
