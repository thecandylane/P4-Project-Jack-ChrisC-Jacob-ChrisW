from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

# db = SQLAlchemy()

from config import *

# Models go here!


# Association table for many-to-many relationships between users and projects
user_project = db.Table(
    'user_project',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('project_id', db.Integer, db.ForeignKey('projects.id'))
)

# Association table for many-to-many relationships between users and teams
user_team = db.Table(
    'user_team',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('team_id', db.Integer, db.ForeignKey('teams.id'))
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    admin = db.Column(db.Boolean, default=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    projects = db.relationship('Project', secondary=user_project, back_populates='members')
    tasks = db.relationship('Task', backref='assignee', lazy=True)
    teams = db.relationship('Team', secondary=user_team, back_populates='members')
    activities = db.relationship('Activity', backref='user', lazy=True)

class Project(db.Model):
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=True)

    members = db.relationship('User', secondary=user_project, back_populates='projects')
    tasks = db.relationship('Task', backref='project', lazy=True)
    activities = db.relationship('Activity', backref='project', lazy=True)

class Task(db.Model, SerializerMixin):
    __tablename__ = 'tasks'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    status = db.Column(db.String(80), nullable=False)
    priority = db.Column(db.Integer, nullable=False)
    due_date = db.Column(db.DateTime, nullable=True)

    assignee_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)

class Team(db.Model, SerializerMixin):
    __tablename__ = 'teams'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    members = db.relationship('User', secondary=user_team, back_populates='teams')

class Activity(db.Model, SerializerMixin):
    __tablename__ = 'activities'
    
    id = db.Column(db.Integer, primary_key=True)
    action = db.Column(db.String(80), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)