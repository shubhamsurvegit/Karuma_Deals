# from flask import Flask,render_template,request,redirect
# from flask_cors import CORS,cross_origin
# import pickle
# import pandas as pd
# import numpy as np

# app=Flask(__name__)
# cors=CORS(app)
# car=pd.read_csv('Cleaned.csv')
# # model=pickle.read(open('lrm.pkl','rb'))

import os

folder = '../flask'

sub_folders = [name for name in os.listdir(folder) if os.path.isdir(os.path.join(folder, name))]

print(sub_folders)
