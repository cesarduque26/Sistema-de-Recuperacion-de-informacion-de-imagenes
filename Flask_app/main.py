from flask import Flask, render_template, request
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
import funciones_flask as fun
import pickle

app = Flask(__name__)


# Cargar los datos


@app.route('/')
def index():
    return render_template('resultados.html')


#@app.route('/buscar', methods=['POST'])
#def buscar():
#    render_template('resultados.html')


if __name__ == '__main__':
    app.run(debug=True, port=5005)
    
