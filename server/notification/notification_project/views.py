from flask import Blueprint, jsonify, request, abort
from flask_mail import Message
from dotenv import load_dotenv
import re

import os
load_dotenv()


regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'

def check(email):
    if(re.fullmatch(regex, email)):
        return True
    return False

views = Blueprint("",__name__)

@views.route("/")
def index():
    response = {"message": "ping"}
    return jsonify(response)

@views.route("/contact", methods = ["POST"])
def contact():
    from . import mail, db
    from .models import ContactMessage
    if not request.get_json():
        abort(400, description="Not a JSON")
    data = request.get_json()
    email = data.get("email")
    if not check(email):
        abort(400, description="Invalid email format")
    name = data.get("name")
    body = data.get("body")
    msg = Message("FOG Agricultural service", sender = os.getenv("email"), recipients = [email])
    msg.body = f'Dear {name},\n\n\nThank you for taking your time to reach out to FOG agricultural services, We sincerely do appreciate it\n\nPlease note that your message will be looked into and feedback will be sent to you within a short period of time.\n\nOnce again, thanks for your time.\n\nWarm Regards,\n\nAina Adeyemi\n\nMD FOG Agric.'
    mail.send(msg)
    msg = Message("New Contact message Notification", sender = os.getenv("email"), recipients = ["akinolasamson1234@gmail.com"])
    msg.body = f"A new contact message received from {name} with email {email}"
    mail.send(msg)
    new_contact = ContactMessage(
        name = name,
        email = email,
        body = body
    )
    db.session.add(new_contact)
    db.session.commit()
    return jsonify({"message": "ok"}, 200)

@views.route("/sub", methods=["GET", "POST"])
def sub():
    from .models import newsletter
    if request.method == "GET":
        subscribers = newsletter.query.all()
        return jsonify(subscribers, 200)
    else:
        data = request.get_json()
        email = data.get("email")
        new_subscriber = newsletter(email = email)
        db.session.add(new_subscriber)
        db.session.commit()
        return jsonify({"message":"ok"}, 200)

@views.route("/unsub", method = ["POST"])
def un_sub():
    data = request.get_json()
    email = data.get("email")
    subscriber = newsletter.query.filter_by(email=email).first()
    if not subscriber:
        abort(400, description="User not a subscriber")
    db.session.delete(subscriber)
    db.session.commit()
    return jsonify({"message":"ok"}, 200)

@views.route("/news", method=["POST"])
def news():
    data = request.get_json()
    message = data.get("message")
    subject = data.get("subject")
    if (len(message) < 1 or len(subject) < 1):
        abort(400, description="Field can not be empty")
    subscribers = Newletter.query.all()
    recipients = []
    for sub in subscribers:
        recipients.append(sub.email)
    msg = Message(subject, sender = os.getenv("email"), recipients = recipients)
    msg.body = message
    mail.send(msg)
    return jsonify({"message":"ok"}, 200)
