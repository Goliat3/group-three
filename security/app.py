from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/login')
def login():
    return send_from_directory('.', 'login.html')

@app.route('/signup')
def signup():
    return send_from_directory('.', 'signup.html')

if __name__ == '__main__':
    app.run(debug=True)
