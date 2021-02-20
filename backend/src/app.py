from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)

#Constantes globales
PSQL_HOST = 'db_pg'
PSQL_PORT = '5432'
PSQL_USER = 'postgres'
PSQL_PASS = 'pass_test'
PSQL_DB = 'CoordenadasDB'

#Se arma la cadena de conexion a la BD
connection_address = """
host=%s port=%s user=%s password=%s dbname=%s
""" % (PSQL_HOST, PSQL_PORT, PSQL_USER, PSQL_PASS, PSQL_DB)

#Se realiza la conexión a la BD
connection = psycopg2.connect(connection_address)

#Habilitar las CORS
CORS(app)

#Endpoint que recibe latitud y longitud y retorna los puntos dentro de un radio no mayor a 1KM
@app.route('/puntos/<lat>/<long>', methods=['GET'])
def get_puntos(lat, long):

    cursor = connection.cursor()

    #Query
    SQL = 'SELECT color, ST_Y(geom) as lat, ST_X(geom) as lng FROM tbl_puntos A WHERE ST_DWithin(A.geom, ST_SetSRID(ST_MakePoint(' + long + ',' + lat + '),4326), (1.0/110));'
    cursor.execute(SQL)

    #Obtener valores
    rows = cursor.fetchall()

    cursor.close()

    lista = []

    for row in rows:
        lista.append({ "color":row[0], "lat":row[1], "lng":row[2] })

    return jsonify(lista)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000, debug=True)
