#!/usr/bin/env python3

# Standard library imports
# from random import randint, choice as rc
import random

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Project, Task, Team, Activity, UserTeam, UserProject

fake = Faker()

def make_users():
    User.query.delete()
    users = []
    for i in range(20):
        user = User(
            username=fake.name(),
            admin=random.randint(0,1),
            email=fake.email(),
            password=str(random.randint(10000000,20000000))
        )
        users.append(user)
    db.session.add_all(users)
    db.session.commit()

def make_teams():
    Team.query.delete()
    teams = []
    for i in range(5):
        team = Team(
            name="team " + str(i + 1)
        )
        teams.append(team)
    db.session.add_all(teams)
    db.session.commit()

def make_projects():
    Project.query.delete()
    projects = []
    for i in range(10):
        project = Project(
            name="Project " + str(i + 1),
            description="Project description " + str(i + 1)
        )
        projects.append(project)
    db.session.add_all(projects)
    db.session.commit()

def make_tasks():
    Task.query.delete()
    tasks = []
    for i in range(40):
        task = Task(
            title="task " + str(i+ 1),
            description="task description " + str(i + 1),
            status="task " + str(i + 1) + " status",
            priority=random.randint(1, 10),
            due_date=fake.date,
            user_id=random.randint(1, 20),
            project_id=random.randint(1, 10)
        )
        tasks.append(task)
    db.session.add_all(tasks)
    db.session.commit()

def make_activities():
    Activity.query.delete()
    activities = []
    for i in range(30):
        activity = Activity(
            action="activity " + str(i + 1),
            timestamp=fake.date_time(),
            user_id=random.randint(1, 20)
        )
        activities.append(activity)
    db.session.add_all(activities)
    db.session.commit()

def make_user_teams():
    UserTeam.query.delete()
    user_teams = []
    for i in range(2):
        for j in range (1, 21):
            user_team = UserTeam(
                user_id=j,
                team_id=random.randint(1, 5)
            )
            user_teams.append(user_team)
    db.session.add_all(user_teams)
    db.session.commit()

def make_user_projects():
    UserProject.query.delete()
    user_projects = []
    for i in range(2):
        for j in range (1, 21):
            user_project = UserProject(
                user_id=j,
                project_id=random.randint(1, 5)
            )
            user_projects.append(user_project)
    db.session.add_all(user_projects)
    db.session.commit()

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        make_users()
        # Seed code goes here!
