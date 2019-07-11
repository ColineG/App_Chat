#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created on Sat Jun 29 11:08:53 2019

@author: Coco
"""
from flask import Flask

#from flask_mysqldb import MySQL

app = Flask(__name__)

#app.config['MYSQL_HOST'] = 'localhost'
#app.config['MYSQL_USER'] = 'Coline'
#app.config['MYSQL_PASSWORD'] = 'password'
#app.config['MYSQL_DB'] = 'chat'

import MySQLdb
mysql = MySQLdb.connect(host='localhost',
                      user='Coline',
                      passwd='password',
                      db='chat')


@app.route('/', methods=['GET', 'POST'])
def index():
    return "Hello Nuclear Geeks"


@app.route('/user')
def users():
    cur = mysql.cursor()
    cur.execute('''SELECT user_name FROM users;''')
    rv = cur.fetchall()
    return str(rv)

@app.route('/user/<int:user_id>')
def get_user(user_id):
    cur = mysql.cursor()
    cur.execute(f'''SELECT user_name FROM users WHERE user_id={user_id};''')
    rv = cur.fetchall()
    return str(rv)

#for users in chat('select * from users'):
#    print(str(users['user_name'], 'has the id', users['user_id']))


if __name__ == '__main__':
    app.run(debug=True)

