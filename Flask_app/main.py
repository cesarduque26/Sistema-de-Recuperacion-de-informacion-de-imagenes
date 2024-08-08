from flask import Flask, render_template, request
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
import funciones_flask as fun
import pickle
import os

app = Flask(__name__)


# Cargar los datos


@app.route('/')
def index():
    image_folder = os.path.join(app.static_folder, 'img')
    # Listar todos los archivos en la carpeta
    image_files = [f for f in os.listdir(image_folder) if os.path.isfile(os.path.join(image_folder, f))]
    return render_template('resultados.html', images=image_files)




if __name__ == '__main__':
    app.run(debug=True, port=5005)
    
