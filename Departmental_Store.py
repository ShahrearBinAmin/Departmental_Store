import base64
import gc
from functools import wraps
from datetime import date
from json import dumps
from flask import Flask, render_template, request, flash, session, url_for, redirect, jsonify, make_response, json
from flaskext.mysql import MySQL

from jinja2 import Environment
from Update import ClassUpdate
from Util import db_pass

import formencode_jinja2
jinja_env = Environment(extensions=['jinja2.ext.loopcontrols'])
jinja_env.add_extension(formencode_jinja2.formfill)


app = Flask(__name__)
mysql = MySQL()
app.jinja_env.add_extension('jinja2.ext.loopcontrols')
app.secret_key = "super secret key"
app.config['UPLOAD_FOLDER'] = 'UPLOAD_FOLDER'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = db_pass
app.config['MYSQL_DATABASE_DB'] = "Departmental_store"
mysql.init_app(app)

username = "Guest"

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/index')
def home():
    return render_template('index.html')

@app.route('/admin')
def admin():
    return render_template('admin.html')

@app.route('/signup', methods=["GET", "POST"])
def signup():
    return render_template('signup.html')

@app.route('/signup_helper', methods=["GET", "POST"])
def signup_helper():
    global logged_in
    try:
        query = request.args['query']
        query = json.loads(query)
        conn = mysql.connect()
        x = conn.cursor()




        y = x.execute("SELECT * FROM Registration WHERE username = (%s)", (query[0],))
        if int(y) > 0:
            return "Exist"

        else:
            data = (query[0], query[1], query[2], query[3], query[4])

            x.execute("INSERT INTO Registration (username,email,password,phone,dept) VALUES (%s, %s, %s, %s, %s)",
                          data)
            flash('Thanks for Registering')
            conn.commit()
            conn.close()
            gc.collect()
            session['logged_in'] = True
            session['username'] = username
            return "OK"
        return "ERROR"

    except Exception as e:
        return (str(e))
@app.route('/login', methods=["GET", "POST"])
def login():
    return render_template('login.html')

@app.route('/login_helper', methods=["GET", "POST"])
def login_helper():
    error = ''
    try:
        query = request.args['query']
        query = json.loads(query)
        conn = mysql.connect()
        c = conn.cursor()
        print(query[0])
        print(query[1])
        if query[2]=="ADMIN":
            data = c.execute("SELECT * FROM Admin WHERE username = (%s) AND password = (%s)",
                             (query[0], query[1]))
            if int(data) > 0:
                session['logged_in'] = True
                session['username'] = query[0]
                gc.collect()
                return "OK_Admin"
        elif query[2]=="USER":
            data = c.execute("SELECT * FROM Registration WHERE username = (%s) AND password = (%s)",
                             (query[0], query[1]))
            if int(data) > 0:
                session['logged_in'] = True
                session['username'] = query[0]
                gc.collect()
                return "OK_User"

        return "error"


    except Exception as e:
        # flash(e)
        error = "Invalid credentials, try again."
        return "Error"
#This is only for user before booking
@app.route('/login_user', methods=["GET", "POST"])
def login_user():
    error = ''
    try:
        query = request.args['query']
        query = json.loads(query)
        conn = mysql.connect()
        c = conn.cursor()
        data = c.execute("SELECT * FROM Registration WHERE username = (%s) AND password = (%s)",
                         (query[0], query[1]))
        if int(data) > 0:
            session['logged_in'] = True
            session['username'] = query[0]
            gc.collect()
            return "OK_User"

        return "error"


    except Exception as e:
        # flash(e)
        error = "Invalid credentials, try again."
        return "Error"


def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            return redirect(url_for('login'))

    return wrap


@app.route("/logout")
@login_required
def logout():
    session.clear()
    gc.collect()
    return render_template("index.html")

#Class update method
@app.route('/product',methods=['GET'])
#all available classes would be shown
def class_info():
    return ClassUpdate(mysql).class_info()

@app.route('/product_delete')
#admin can delete classroom
def class_delete():
    return ClassUpdate(mysql).class_delete()

@app.route('/product_update_data',methods=['GET'])
#admin can update class info
def class_update():
    return ClassUpdate(mysql).class_update()

@app.route('/product_insert_data',methods=['GET'])
#admin can add new class
def class_insert():
    return ClassUpdate(mysql).class_insert()


if __name__ == '__main__':
    app.debug = True
    app.run(host='127.0.0.1', port=5000)
