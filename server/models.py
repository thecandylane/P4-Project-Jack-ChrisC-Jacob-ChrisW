from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

# db = SQLAlchemy()

from config import *

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # attributes
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    admin = db.Column(db.Boolean, default=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # relationships
    tasks = db.relationship('Task', backref='user')
    activities = db.relationship('Activity', backref='user')
    user_teams = db.relationship('UserTeam', backref='user')
    user_projects = db.relationship('UserProject', backref='user')
    teams = association_proxy('user_teams', 'team')
    projects = association_proxy('user_projects', 'project')

    # serialize rules
    serialize_rules = ('-created_at', '-updated_at', '-user_teams', '-user_projects')

    # validations
    @validates('username')
    def validate_username(self, key, user):
       if user in [user.username for user in User.query.all()]:
           raise ValueError("Username already taken")
       return user


    @validates('email')
    def validate_email(self, key, address):
       if '@' not in address:
           raise ValueError("Must provide a valid email address")
       return address
  
    @validates('password')
    def validate_password(self, key, pw):
       if len(pw) < 8:
           raise ValueError("Password must be 8 characters or longer")
       return pw

class Team(db.Model, SerializerMixin):
    __tablename__ = 'teams'
    
    # attributes
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # relationships
    projects = db.relationship('Projects', backref='team')
    user_teams = db.relationship('UserTeam', backref='team')
    users = association_proxy('user_teams', 'user')

    # serialize rules
    serialize_rules = ('-created_at', '-updated_at', '-user_teams')

    

class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'
    
    # attributes
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    # relationships
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'))
    tasks = db.relationship('Task', backref='project')
    users_projects = db.relationship('UserProject', backref='project')
    users = association_proxy('user_projects', 'user')

    # serialize rules
    serialize_rules = ('-created_at', '-updated_at', '-user_projects')

class Task(db.Model, SerializerMixin):
    __tablename__ = 'tasks'
    
    # attributes
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    status = db.Column(db.String(80), nullable=False)
    priority = db.Column(db.Integer, nullable=False)
    due_date = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    # relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))

    # serialize rules
    serialize_rules = ('-created_at', '-updated_at')

class Activity(db.Model, SerializerMixin):
    __tablename__ = 'activities'
    
    # attributes
    id = db.Column(db.Integer, primary_key=True)
    action = db.Column(db.String(80), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    # relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # serialize rules
    serialize_rules = ('-created_at', '-updated_at')

class UserTeam(db.Model, SerializerMixin):
    __tablename__ = 'user_teams'

    # attributes
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    # relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))

    # serialize rules
    serialize_rules = ('-created_at', '-updated_at')

class UserProject(db.Model, SerializerMixin):
    __tablename__ = 'user_projects'

    # attributes
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    # relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))

    # serialize rules
    serialize_rules = ('-created_at', '-updated_at')