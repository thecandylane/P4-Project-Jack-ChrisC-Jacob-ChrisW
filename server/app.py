#!/usr/bin/env python3

# Standard library imports
# Remote library imports
from flask import request, Flask, make_response, jsonify, session
from flask_restful import Resource, Api
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS

# Local imports
from config import app, db, api
from models import db, User, Project, Task, Activity, UserProject

# Views go here!
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'


bcrypt = Bcrypt(app)
server_session = Session(app)
migrate =  Migrate(app, db)
db.init_app( app )
api = Api(app)

@app.route('/')
def index():
    return '<h1>Welcome to Post-it</h1>'

@app.route('/@me', methods=["GET"])
def get_current_user():
    user_id = session.get("user_id")
    # print(session['user_id'])
    # print(user_id)
    print("Session user_id (in get_current_user):", user_id)
    if not user_id:
        return jsonify({"error":"Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()

    # return jsonify({
    #     "id":user.id,
    #     "email":user.email,
    #     'password':user.password

    # }), 200
    return user.to_dict(), 200


@app.route('/register', methods=["POST"])
def register_user():
    username = request.json['username']
    email = request.json["email"]
    password = request.json["password"]
    admin = request.json['admin'] 

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error":"user already exists"}), 409
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, email=email, password=hashed_password, admin=admin )
    db.session.add(new_user)
    db.session.commit()


    return jsonify({
        "id":new_user.id,
        "email":new_user.email,
        "admin":new_user.admin

    })

@app.route('/login', methods=["POST", "GET"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user =  User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error":"Unauthorized"}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error":"Unauthorized"}), 401
    
    session['user_id'] = user.id
    print("Session user_id:", session['user_id'])

    # return jsonify({
    #     "id": user.id,
    #     "email": user.email
    # })
    return user.to_dict(), 200

@app.route('/logout', methods=["POST"])
def logout():
    session['user_id'] = None
    return{},204


class Users(Resource):
    def get(self):
        users = User.query.all()
        print(users)
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
                admin = data['admin'],
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
        return make_response(u.to_dict(rules=('tasks', 'activities', 'projects')), 200)
    
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
                description = data['description']
                
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
        return make_response(p.to_dict(rules=('users', 'tasks' )), 200)
    
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
api.add_resource(Tasks, '/tasks')

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

# class Teams(Resource):
#     def get(self):
#         teams = Team.query.all()
#         teams_dict_list = [team.to_dict() for team in teams]

#         response = make_response(
#             teams_dict_list,
#             200
#         )
#         return response
#     def post(self):
#         data = request.get_json()
#         try:
#             teams = Teams(
#                 name = data['name'],
#             )
#             db.session.add(teams)
#             db.session.commit()
#         except Exception as e:
#             return make_response({
#                 "errors": [e.__str__()]
#             }, 422)
#         return make_response(teams.to_dict(),201)
    
# api.add_resource(Teams, '/teams')

    
    

# class TeamById(Resource):
#     def get(self, id):
#         t = Team.query.filter_by(id = id).first()
#         if not t:
#             return make_response({
#                 "error": "Team not found"
#             }, 404)
#         return make_response(t.to_dict(), 200)
    
#     def delete(self, id):
#         team = Team.query.filter_by(id = id).first()
#         if not team:
#             return make_response({
#                 "error": "Task not found"
#             }, 404)
#         db.session.delete(team)
#         db.session.commit()
    
# api.add_resource(TeamById, '/teams/<int:id>')


    














if __name__ == '__main__':
    app.run(port=5555, debug=True)
