import numpy as np
import pandas as pd
import os
import cv2
import pickle
import tensorflow as tf
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
import re
# Giảm thiểu thông tin log của TensorFlow
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

def load_model(model: str):
    """
    Load mô hình từ file.
    
    Parameters:
    - model: Tên file mô hình cần load.
    
    Returns:
    - model: Mô hình đã load.
    """
    path = os.path.join(os.getcwd(), "web", "models", model)
    print(f"Loading model from: {path}")
    
    try:
        model = tf.keras.models.load_model(path)
        print("Model loaded successfully")
        return model
    except Exception as e:
        print(f"Error loading model: {e}")
        raise

def tfidf_process_input(sentence):
    """
    Tiền xử lý đầu vào bằng TF-IDF và TruncatedSVD,
    sau đó định dạng lại thành (28, 28, 1) để đưa vào mô hình.
    
    Parameters:
    - sentence: Chuỗi đầu vào cần xử lý.
    
    Returns:
    - Reshaped array (28, 28, 1) đưa vào mô hình.
    """
    # Load pre-trained TF-IDF vectorizer và SVD model
    with open('web/models/tfidf_vectorizer.pkl', 'rb') as f:
        tfidf_vectorizer = pickle.load(f)

    with open('web/models/svd_model.pkl', 'rb') as f:
        svd_model = pickle.load(f)

    X_tfidf = tfidf_vectorizer.transform([sentence]).toarray()
    X_reduced = svd_model.transform(X_tfidf)
    X_reshaped = X_reduced.reshape(1, 28, 28, 1)

    return X_reshaped

def convert_to_ascii(sentence):
    """
    Chuyển đổi chuỗi thành giá trị ASCII.
    
    Parameters:
    - sentence: Chuỗi đầu vào cần chuyển đổi.
    
    Returns:
    - zer: Mảng numpy định dạng (100, 100).
    """
    sentence_ascii = []
    
    for i in sentence:
        # Một số ký tự có giá trị lớn hơn 8222 (ví dụ: ký tự Trung Quốc)
        # Xóa bỏ các ký tự có giá trị lớn hơn 8222
        if ord(i) < 8222:  # ” có ASCII là 8221
            if ord(i) == 8217:  # ’ :  8217
                sentence_ascii.append(134)
            if ord(i) == 8221:  # ” :  8221
                sentence_ascii.append(129)
            if ord(i) == 8220:  # “ :  8220
                sentence_ascii.append(130)
            if ord(i) == 8216:  # ‘ :  8216
                sentence_ascii.append(131)
            if ord(i) == 8211:  # – :  8211
                sentence_ascii.append(133)
            if ord(i) <= 128:  # Lưu các giá trị nhỏ hơn 128
                sentence_ascii.append(ord(i))

    zer = np.zeros((10000))
    
    for i in range(len(sentence_ascii)):
        zer[i] = sentence_ascii[i]
    
    zer.shape = (100, 100)
    
    return zer

def data2char_index(X, max_len):
    """
    Chuyển đổi dữ liệu thành chỉ số ký tự.
    
    Parameters:
    - X: Danh sách chuỗi đầu vào.
    - max_len: Độ dài tối đa của mỗi chuỗi đầu ra.
    
    Returns:
    - X_char: Mảng chứa các chỉ số ký tự.
    """
    alphabet = " abcdefghijklmnopqrstuvwxyz0123456789-,;.!?:'\"/\\|_@#$%^&*~`+-=<>()[]{}"
    result = []
    
    for data in X:
        mat = []
        for ch in data:
            if ch not in alphabet:
                continue
            mat.append(alphabet.index(ch))
        result.append(mat)
    
    X_char = tf.keras.preprocessing.sequence.pad_sequences(
        np.array(result, dtype=object), 
        padding='post', 
        truncating='post', 
        maxlen=max_len
    )
    
    return X_char 

def validate_payload(payload):
    if len(payload) < 20:
        return False
    if re.fullmatch(r'^[a-fA-F0-9]{32}$', payload):
        return False
    
    return True

def predict_xss(model, payload, model_name='CNN-LSTM'):
    """
    Dự đoán liệu payload có phải là XSS hay không.
    
    Parameters:
    - model: Mô hình đã được huấn luyện để phát hiện XSS.
    - payload: Chuỗi dữ liệu (payload) cần kiểm tra.
    - model_name: Loại mô hình ('CNN-LSTM', 'TextCNN', hoặc các loại khác).
    
    Returns:
    - Dự đoán (1 cho XSS, 0 cho non-XSS).
    """
    if not validate_payload(payload):
        return 0
    # Độ dài tối đa của mỗi đoạn payload
    max_chunk_length = 1000

    # Kiểm tra loại mô hình và xử lý payload
    if model_name == 'CNN-LSTM':
        x = tfidf_process_input(payload)  # Xử lý đầu vào cho mô hình CNN-LSTM
    elif model_name == 'TextCNN':
        max_len = 1000  # Đảm bảo sử dụng cùng max_len như khi huấn luyện
        x = data2char_index([payload], max_len)  # Chuyển đổi ký tự thành index
    else:
        image = convert_to_ascii(payload)  # Chuyển đổi thành ảnh ASCII cho các mô hình khác
        x = np.asarray(image, dtype='float')
        image = cv2.resize(x, dsize=(100, 100), interpolation=cv2.INTER_CUBIC)
        image /= 128.0
        x = image.reshape(1, 100, 100, 1)

    # Dự đoán
    pred = model.predict(x)

    if pred[0] > 0.85:
        print("Detected XSS:", payload)
        return 1
    
    return 0
