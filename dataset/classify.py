import pandas as pd
import urllib.parse
import html
import os

def classify(input_file, file_XSS, file_normal):
# Đọc dữ liệu từ tệp CSV
    df = pd.read_csv(input_file)

    # Tách dữ liệu theo Label
    df_A = df[df['Label'] == 1].copy()
    df_B = df[df['Label'] == 0].copy()

    # Hàm để xóa khoảng trắng ở đầu nếu không phải là khoảng trắng hoàn toàn
    def strip_leading_whitespace(value):
        return value.lstrip() if value.strip() else value

    # Áp dụng hàm cho cột 'Sentence'
    df_A['Sentence'] = df_A['Sentence'].apply(strip_leading_whitespace)
    df_B['Sentence'] = df_B['Sentence'].apply(strip_leading_whitespace)

    # Ghi dữ liệu vào tệp với escapechar
    df_A['Sentence'].to_csv(file_XSS, index=False, header=False, quoting=3, escapechar='\\')
    df_B['Sentence'].to_csv(file_normal, index=False, header=False, quoting=3, escapechar='\\')

    print("Dữ liệu đã được phân loại và lưu vào fileA.txt và fileB.txt")
# classify('XSS_dataset.csv', 'xssdata.csv', 'nordata.csv')