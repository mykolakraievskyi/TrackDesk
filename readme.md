## Frontend Setup

To run the frontend (FE), you need to have Node.js installed on your machine. Follow the steps below:

### 1. Install Node.js

Download the installer from the official Node.js website:

[Download Node.js](https://nodejs.org/en/download/prebuilt-installer)

### 2. Verify Installation

Open your terminal and run the following command to verify that Node.js is installed:

```bash 
npm -v
```

### 3. Install Angular CLI

Next, you need to install Angular CLI to run the frontend. In the terminal, run:
```bash 
npm install -g angular/cli
```

### 4. Further actions
All further actions are explained in the frontend project's README file.

## Git flow
### 1. Do not push in main please)
### 2. New task - new branch
When working on a new task, create a branch from main and name it with your tasks's name, for example
```git
git checkout -b adding-new-button
```
when finished, push your branch and create a pull request  
It is done in GitHub  
Then you just pull main and can start to work on a new task!
```git
git pull
```

### 3. Meaningful commits
Please, be aware of how you name commits. It is better for everyone if commit message describes what functionality was added  
To make your commit message even better, you can navigate to .git (this folder is hidden, you may need to change your laptops setting)  
And navigate to folder ***hooks***  
There change the name of *prepare-commit-msg.sample* to *prepare-commit-msg*  
That will automatically add a branches name to a commit message  
_And you're all set!_
