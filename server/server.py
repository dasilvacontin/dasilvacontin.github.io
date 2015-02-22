import requests
from flask import Flask
app = Flask(__name__)

tokens = {}
for token in ['STALKD', 'FORKD', 'RICKROLLD', 'HAXD']:
    tokens[token] = raw_input('Please enter Yo API Token for ' + token + ' : ')
port = raw_input("Plese enter HTTP port: ")
haxd_token = tokens['HAXD']

def reqyo(token):
    requests.post(
        "http://api.justyo.co/yo/",
        data={'api_token': token, 'username': 'dasilvacontin'}
    )

@app.route("/<action>")
def react(action):
    token = tokens.get(action, haxd_token)
    reqyo(token)
    return 'K' if token != haxd_token else 'pls no copy pasterino'

if __name__ == "__main__":
    app.run("0.0.0.0", int(port))
