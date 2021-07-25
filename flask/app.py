from flask import Flask,request,redirect
import pandas as pd
import pickle 
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

car=pd.read_csv("Cleaned.csv")
model=pickle.load(open("lrm.pkl","rb"))


@app.route('/predict',methods=['POST']) 
@cross_origin()
def pre():
    car_model=request.get_json().get('model')
    brand=request.get_json().get('brand')
    year=request.get_json().get('year')
    kms_driven=request.get_json().get('kms_driven')
    fuel_type=request.get_json().get('fuel_type')
    prediction=model.predict(pd.DataFrame([[car_model,brand,year,kms_driven,fuel_type]],columns=["name",'company','year','kms_driven','fuel_type']))
    return str(prediction[0])

if __name__=="__main__":
    app.run(debug=True)