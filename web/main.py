from flask import Flask, render_template, request, make_response, jsonify, redirect, url_for, flash, session
import json
import os
import numpy as np
import csv
import gc
import timeit
import hashlib
import requests
import pandas as pd
import tensorflow as tf
from .model import load_model, predict_xss
from .logger import log_manager, db
from pymongo import MongoClient

app = Flask(__name__)
app.secret_key = 'secret_key'

COLLECTION_NAME = "dataset"
DEFAULT_LIMIT = 1000

collection = db[COLLECTION_NAME]

@app.route('/')
def index():
    return render_template('app/index.html', name='home')

@app.route('/home')
def home():
    """
    Hiển thị trang chính với các log mới nhất.
    """
    data = log_manager.get_latest_logs(limit=1000)
    logs = list(data)
    return render_template('app/index.html', name='home', logs=logs)

@app.route('/dataset', methods=['GET', 'POST'])
def view_dataset():
    limit = request.args.get('limit', default=1000, type=int)
    
    if request.method == 'POST':
        file = request.files['file']
        if file and file.filename.endswith('.csv'):
            try:
                df = pd.read_csv(file)
                records = df.to_dict(orient='records')
                if records:
                    collection.insert_many(records)
                    flash('Dataset uploaded successfully!', 'success')
                else:
                    flash('No data found in the uploaded file.', 'warning')

            except Exception as e:
                flash(f'Error uploading dataset: {e}', 'danger')

            return redirect(url_for('view_dataset'))

    try:
        dataset = list(collection.find({}, {"_id": 0}).limit(limit))
        return render_template('app/dataset.html', dataset=dataset, limit=limit)

    except Exception as e:
        return str(e), 500

@app.route('/model')
def model():
    return render_template('app/models.html')

@app.route('/learning_board')
def learning_board():
    return render_template('app/learning_board.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    """
    Xử lý đăng nhập.
    """
    if request.method == 'POST':
        # Xử lý đăng nhập
        pass
    return render_template('login.html')

# Đường dẫn đến các mô hình
model_paths = {
    "TextCNN": "TextCNN.keras",
    "CNN-LSTM": "CNN-LSTM.keras",
    "BiLSTM": "BiLSTM.keras",
    "BiLSTM-GAP": "BiLSTMxGAP.keras",
    "CNN": "CNN.keras"
}

# Tải mô hình mặc định
current_model_name = "CNN-LSTM"
current_model = load_model(model_paths[current_model_name])

@app.route('/change-model', methods=['POST'])
def change_model():
    """
    Thay đổi mô hình hiện tại.
    """
    global current_model_name, current_model
    data = request.json
    model_name = data.get('model')

    if model_name in model_paths:
        current_model_name = model_name
        current_model = load_model(model_paths[model_name])
        return jsonify({"message": f"Model changed to {model_name}."}), 200
    else:
        return jsonify({"error": f"Model '{model_name}' not found."}), 404

@app.route('/update_log_data')
def update_log_data():
    """
    Lấy dữ liệu log và số lượng XSS.
    """
    xss_counts = log_manager.count_xss_types()
    return jsonify(xss_counts)

@app.route('/get_dataset_data')
def get_dataset_data():
    """
    Lấy dữ liệu về dataset.
    """
    try:
        label_counts = log_manager.count_label_dataset()
        total_records = log_manager.dataset_collection.count_documents({}) 
        response_data = {
            "label_counts": label_counts,
            "total_records": total_records
        }
        return jsonify(response_data)  
    except Exception as e:
        print(f"Error in get_dataset_data: {e}")  
        return jsonify({"error": str(e)}), 500
