from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from __init__ import db # this might be an issue later on...

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=True, nullable=False)