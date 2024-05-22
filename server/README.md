
The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.

HackerPost

# Shoppy Shoperson 

## Overview

This is a website where you can create posts containing your GitHub projects.  You have your own personal page availibe to display your own personal projects. 


## Data Model

The application will store Users and submissions

Users will have their usernames, possibly password (hash), their personal pages (seperate class), and Hackathons that they are/were running (seperate class).

Submissions will have their GitHub link, and their description


An Example User:

```javascript
{
  username: "Hacker1",
  password_hash: // a password hash,
  personal_page: // object containing the information for personal page
  hackathons: // object containing the information for hackathon page
}
```

An Example Submissions

```javascript
{
  source_code: //uploaded from github API and displayed on website, if not the user can copy and paste code in here and organize code by file,
  name: //username from user,
  bio: "My name is Ron, I am a Junior at NYU!"
}
```



## [Link to Commented First Draft Schema](db.mjs) 

in db.mjs in same directory
final-project-Rishi-Rana1/db.mjs



## Wireframes



(__TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc.)

/list/create - page for creating post

![list create](documentation/CreatePost.heic)

/list/create - page for creating hackathon

![list](documentation/CreateHackathon.heic)

/list/slug - page for showing hackathon

![list](documentation/HackathonPage.heic)

/list/create - page for Project Page

![list create](documentation/ProjectPage.heic)

/list - page for personal page

![list](documentation/PersonalPage.heic)

/list - page for showing homepage

![list](documentation/Homepage.heic)

/list - page for logging in/creating new account

![list](documentation/CreateUser.heic)
## Site map

![list](documentation/map.heic)

## User Stories or Use Cases

(__TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://en.wikipedia.org/wiki/Use_case))

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can view the homepage
4. as a user, I can create a new post on my account
5. as a user, I can view other profiles

## Research Topics

    -6 points: React.JS, which is a frontend framework that can be used to make web apps more responsive. This is worth 6 points and the reason to use it is because I want to learn more about react and because I want a more responsive web app that can change more dynamically.

    -4 pounts: Call GitHub API to get repository link and size

    10/10 points

10 points total out of 10 required points (___TODO__: addtional points will __not__ count for extra credit)


## [Link to Initial Main Project File](app.mjs) 

(__TODO__: create a skeleton Express application with a package.json, app.mjs, views folder, etc. ... and link to your initial app.mjs)

## Annotations / References Used

(__TODO__: list any tutorials/references/etc. that you've based your code off of)

1. [React.js tutorial](https://www.theodinproject.com/paths/full-stack-javascript/courses/react) - simple tutorials on a website

