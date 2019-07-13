#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created on Sat Jun 29 11:08:53 2019

@author: Coco
"""
#utilisation de Flask comme API pour relier l'app avec la BDD
from flask import Flask, render_template, request
import MySQLdb

app = Flask(__name__)

mysql = MySQLdb.connect(host='localhost',
                      user='Coline',
                      passwd='password',
                      db='chat')


@app.route('/')
def index():
    return render_template("newuser.html")

@app.route('/addUser', methods=['GET', 'POST'])
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
        #cur.fetchall()
        return str(query)
        

@app.route('/usertest')
def users():
    cur = mysql.cursor()
    cur.execute('''SELECT user_name FROM users;''')
    rv = cur.fetchall()
    return str(rv)

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

