#!/usr/bin/env python3

# Standard library imports
# from random import randint, choice as rc
import random

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Project, Task, Team, Activity

fake = Faker()

def make_users():
    User.query.delete()
    
    users = []

    for i in range(20):
        user = User(
            username=fake.name(),
            admin=random.randint(0,1),
            email=fake.email(),
            password=str(random.randint(0,1000))
        )
        users.append(user)
    
    db.session.add_all(users)
    db.session.commit()

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        make_users()
        # Seed code goes here!
