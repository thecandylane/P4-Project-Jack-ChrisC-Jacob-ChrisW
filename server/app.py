#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, Flask, make_response, jsonify
from flask_restful import Resource, Api
from flask_migrate import Migrate


# Local imports
from config import app, db, api
from models import db, User, Project, Task, Team, Activity

# Views go here!
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate =  Migrate(app, db)
db.init_app( app )
api = Api(app)

@app.route('/')
def index():
    return '<h1>Welcome to Post-it</h1>'

class Users(Resource):
    def get(self):
        users = User.query.all()
        users_dict_list = [user.to_dict() for user in users]

        response = make_response(
            users_dict_list,
            200
        )
        return response
    
    def post(self):
        data = request.get_json()
        try:
            users = User(
                username = data['username'],
                email = data['email'],
                password = data ['password']
            )
            
            db.session.add(users)
            db.session.commit()
        except Exception as e:
            return make_response({
                "errors": [e.__str__()]
            }, 422)
        return make_response(users.to_dict(),201)
api.add_resource(Users, '/users')


class UsersById(Resource):
    def get(self, id):
        u = User.query.filter_by(id = id).first()
        if not u:
            return make_response({
                "error": "User not found"
            }, 404)
        return make_response(u.to_dict(), 200)
    
    def patch(self, id):
        u = User.query.filter_by(id = id).first()
        if not u:
            return make_response({
                "error": "User not found"
            }, 404)
        data = request.get_json()
        for key in data.keys():
            setattr(u, key, data[key])
        db.session.add(u)
        db.session.commit()
        return make_response(u.to_dict(), 200)

    
    def delete(self, id):
        user = User.query.filter_by(id = id).first()
        if not user:
            return make_response({
                "error": "User not found"
            }, 404)
        db.session.delete(user)
        db.session.commit()
api.add_resource(UsersById, '/users/<int:id>')

class Projects(Resource):
    def get(self):
        projects = Project.query.all()
        projects_dict_list = [project.to_dict() for project in projects]

        response = make_response(
            projects_dict_list,
            200
        )
        return response
    
   
    def post(self):
        data = request.get_json()
        try:
            projects = Project(
                name = data['name'],
                description = data['description'],
                
            )
            
            db.session.add(projects)
            db.session.commit()
        except Exception as e:
            return make_response({
                "errors": [e.__str__()]
            }, 422)
        return make_response(projects.to_dict(),201)
api.add_resource(Projects, '/projects')
    
class ProjectsById(Resource):
    def get(self, id):
        p = Project.query.filter_by(id = id).first()
        if not p:
            return make_response({
                "error": "Project not found"
            }, 404)
        return make_response(p.to_dict(), 200)
    
    def patch(self, id):
        p = User.query.filter_by(id = id).first()
        if not p:
            return make_response({
                "error": "Project not found"
            }, 404)
        data = request.get_json()
        for key in data.keys():
            setattr(p, key, data[key])
        db.session.add(p)
        db.session.commit()
        return make_response(p.to_dict(), 200)
    
    def delete(self, id):
        project = Project.query.filter_by(id = id).first()
        if not project:
            return make_response({
                "error": "Project not found"
            }, 404)
        db.session.delete(project)
        db.session.commit()
api.add_resource(ProjectsById, '/projects/<int:id>')


class Tasks(Resource):
    def get(self):
        tasks = Task.query.all()
        tasks_dict_list = [task.to_dict() for task in tasks]

        response = make_response(
            tasks_dict_list,
            200
        )
        return response
    
    def post(self):
        data = request.get_json()
        try:
            tasks = Task(
                title = data['title'],
                description = data['description'],
                status = data ['status'],
                priority = data['priority'],
                due_date = data['due_date']
            )
            
            db.session.add(tasks)
            db.session.commit()
        except Exception as e:
            return make_response({
                "errors": [e.__str__()]
            }, 422)
        return make_response(tasks.to_dict(),201)
api.add_resource(Tasks, '/task')

class TasksById(Resource):
    def get(self, id):
        t = Task.query.filter_by(id = id).first()
        if not t:
            return make_response({
                "error": "Project not found"
            }, 404)
        return make_response(t.to_dict(), 200)
    
    def patch(self, id):
        t = Task.query.filter_by(id = id).first()
        if not t:
            return make_response({
                "error": "Task not found"
            }, 404)
        data = request.get_json()
        for key in data.keys():
            setattr(t, key, data[key])
        db.session.add(t)
        db.session.commit()
        return make_response(t.to_dict(), 200)
    
    def delete(self, id):
        task = Task.query.filter_by(id = id).first()
        if not task:
            return make_response({
                "error": "Task not found"
            }, 404)
        db.session.delete(task)
        db.session.commit()
api.add_resource(TasksById, '/tasks/<int:id>')

class Teams(Resource):
    def get(self):
        teams = Team.query.all()
        teams_dict_list = [team.to_dict() for team in teams]

        response = make_response(
            teams_dict_list,
            200
        )
        return response
    def post(self):
        data = request.get_json()
        try:
            teams = Teams(
                name = data['name'],
            )
            db.session.add(teams)
            db.session.commit()
        except Exception as e:
            return make_response({
                "errors": [e.__str__()]
            }, 422)
        return make_response(teams.to_dict(),201)
    
api.add_resource(Teams, '/teams')

    
    

class TeamById(Resource):
    def get(self, id):
        t = Team.query.filter_by(id = id).first()
        if not t:
            return make_response({
                "error": "Team not found"
            }, 404)
        return make_response(t.to_dict(), 200)
    
    def delete(self, id):
        team = Team.query.filter_by(id = id).first()
        if not team:
            return make_response({
                "error": "Task not found"
            }, 404)
        db.session.delete(team)
        db.session.commit()
    
api.add_resource(TeamById, '/teams/<int:id>')


    














if __name__ == '__main__':
    app.run(port=5555, debug=True)
