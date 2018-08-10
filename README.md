# ScheduleMe
A web app that checks for time conflicts between a user's classes that they want to take
rather than having to sit down and check for conflicts themselves.

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
#
password - String
#
classes - array of Class objects (ref)
#
### Class
name - String
#
days - array [m, t, w, tr, f]
#
start-time - String (that includes ':' && 'am' or 'pm')
#
end-time - "" "" "" ""
#
## Views

## Routes
GET '/' - renders the Welcome page where users will be required to sign in
#
GET '/home' - renders the home screen after users sign in where users are able to see their classes
              and create new ones
#
GET '/logout' - destroys a user's session and redirects them back to the welcome page
#
#                 
POST '/login' - requests the user's homepage
#
POST '/class/new' - saves a class to the user's list of classes after checking for time conflicts
#
POST '/delete' - pulls a user's classes from the database and wipes their list of classes clean
#
#
#
#
## Other
Encrypting package to encrypt user passwords

### Concerns:
How do I keep checking for conflicts short? I don't want to iterate through a gigantic list for every new class. (A: Promises) 

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
Connect classes to user so that each user has access to theoir own classes
Finish updating the Class model do that it can include start time and end time as well as days
### Tuesday
Get classes properly rendered to users
### Wednesday
Enable users to add a class to the schedule view & start checking for time conflicts
### Thursday
Finish checking for time conflicts
### Friday
Have all core features complete and working without bugs -> conflict check, deleting all classes at once,

## Week 3 - Polishing

# Future Features
Enable users to delete individual classes()
#
Enable users to add classes to a list of interested ones so automatic conflict checking doesn't happen
#
Alert the user of time conflicts
