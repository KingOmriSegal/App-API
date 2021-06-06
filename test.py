from flask import Flask, jsonify
from datetime import datetime

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return {"status":"success", "time":datetime.now()}

if __name__ == '__main__':
    app.run()
