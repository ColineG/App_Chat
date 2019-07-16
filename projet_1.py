#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created on Sat Jun 29 11:08:53 2019

@author: Coco
"""
#utilisation de Flask comme API pour relier l'app avec la BDD
from flask import Flask, render_template, request, redirect, url_for
import MySQLdb

app = Flask(__name__)

mysql = MySQLdb.connect(host='localhost',
                      user='Coline',
                      passwd='password',
                      db='chat')


@app.route('/session')
def session():
    return render_template("chat.html")

#@app.route('/login', methods=['GET', 'POST'])
#def login():
#    if request.method == 'POST':
#        return do_the_login()
#    else:
#        return show_the_login_form()

@app.route('/')
def index():
    if request.method == 'POST':
        return redirect(url_for('form_example'))
    return '''<form action="/" method="POST">
              <fieldset class="form-group">
                 <legend>Me connecter : </legend>
                 <input type="submit" value="Me connecter"><br>
              </form>
              <form action="/" method="POST">
                  <legend>Créer mon compte : </legend>
                  <input type="submit" value="M'inscrire" value="http://localhost:5000/home"><br>
                  <button onclick="/home.href = 'form_example';" id="myButton" class="float-left submit-button" >Home</button>
                  <td><a href="{{ url_for( 'form_example' , table='Merged' ) }}">View Merged Data</a></td>
              </form> 
              
              '''
    
@app.route('/home', methods=['GET', 'POST']) #allow both GET and POST requests
def form_example():
    if request.method == 'POST':
        return 'Submitted post'
    
    return '''<form method="POST">
                  Pseudo: <input type="text" name="pseudo"><br>
                  Email: <input type="text" name="email"><br>
                  <input type="submit" value="Se connecter"><br>
              </form>
              <form method="POST">
                  Pseudo: <input type="text" name="pseudo"><br>
                  Email: <input type="text" name="email"><br>
                  Mot de passe: <input type="text" name="pwd"><br>
                  Confirmer votre mot de passe: <input type="text" name="pwd_confirmation"><br>
                  <input type="submit" value="Valider son inscription"><br>
              </form> 
              '''



@app.route('/addUser', methods=['POST'])
def create_user():
    if request.method == 'POST':
        result = request.form
        cur = mysql.cursor()
        query = f'''
        INSERT INTO users (user_name, email, user_pwd) 
        VALUES ("{result['myPseudo']}", "{result['mail']}", "{result['mdp']}") 
        '''
        cur.execute(query)
        mysql.commit()
#        return "lol"
        return str(query)
    
@app.route('/deleteUser', methods=['GET', 'POST'])
def delete_user():
    query_parameters = request.form
    
    
#    id = 
    if request.method == 'POST':
        result = request.form
        cur = mysql.cursor()
        query = f'''
        UPDATE users
        SET user_status = REPLACE(user_status, '0', '1')
        WHERE user_id = {result['user_id']}
        '''
        cur.execute(query)
        mysql.commit()
        return str(query)
    
@app.route('/updatePsw', methods=['POST'])
def update_psw():
    if request.method == 'POST':
        result = request.form
        cur = mysql.cursor()
        query = f'''
        UPDATE users
        SET user_pwd = {result['mdp']}
        WHERE user_id = {result['user_id']}
        '''
        cur.execute(query)
        mysql.commit()
        return str(query)


@app.route('/updateUsername', methods=['POST'])
def update_username():
    if request.method == 'POST':
        result = request.form
        cur = mysql.cursor()
        query = f'''
        UPDATE users
        SET user_name = {result['myPseudo']}
        WHERE user_id = {result['user_id']}
        '''
        cur.execute(query)
        mysql.commit()
        return str(query)
    
@app.route('/addMsg', methods=['POST'])
def add_msg():
    if request.method == 'POST':
        result = request.form
        cur = mysql.cursor()
        query = f'''
        INSERT INTO messages(msg_body, user_id)
        VALUES({result['msg_body']}, {result['user_id']})
        WHERE user_id = {result['user_id']} AND user_status = '0' 
        '''
        cur.execute(query)
        mysql.commit()
        return str(query)

@app.route('/showMsg', methods=['GET'])
def show_msg():
    if request.method == 'GET':
        #result = request.form
        cur = mysql.cursor()
        query = f'''
        SELECT users.user_name, messages.msg_body
        FROM users
        JOIN messages ON users.user_id = messages.user_id
        ORDER BY date_creation DESC
        LIMIT 10; 
        '''
        cur.execute(query)
        mysql.commit()
        return str(query)
    
    
    

@app.route('/user/<int:user_id>')
def get_user(user_id):
    cur = mysql.cursor()
    cur.execute(f'''SELECT * FROM users WHERE user_id={user_id};''')
    rv = cur.fetchall()
    return str(rv)


#create user old version
'''@app.route('/create_user/<user_name>/<email>/<user_pwd>', methods=['GET', 'POST'])
def create_user_old(user_name, email, user_pwd):
    cur = mysql.cursor()
    cur.execute('INSERT INTO users (user_name, email, user_pwd) VALUES ("%s", "%s", "%s") ' % (user_name, email, user_pwd))
    mysql.commit()
    rv = cur.fetchall()
    return str(rv)'''






if __name__ == '__main__':
    app.run(debug=True)

