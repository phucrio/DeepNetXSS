import random
import pandas as pd
from preprocess import merge, shuf
import os

def filter_lines(data):
    return [line for line in data if line.strip() and not line.startswith('&')]

def filter_long_samples(data, max_length=1000):
    return [line for line in data if len(line.strip()) <= max_length]

def clean_data(data):
    xss_data = filter_lines(data)
    xss_data = filter_long_samples(xss_data)
    return xss_data

def create_dataset(xss_needed, normal_needed, output_file):
    # Đọc dữ liệu từ các file XSS
    with open('fileXSS_dec.txt', 'r', encoding='utf-8') as file_xss1, \
         open('xsspayloads.csv', 'r', encoding='utf-8') as file_xss2, \
         open('XSS_clean.csv', 'r', encoding='utf-8') as file_xss3:
        
        xss1 = file_xss1.readlines()
        xss2 = file_xss2.readlines()
        xss3 = file_xss3.readlines()

    # Hợp nhất và lọc dữ liệu XSS không trùng lặp
    if xss_needed < 7000:
        xss_data = clean_data(xss1)
    elif xss_needed < 17000:
        xss_data = clean_data(xss1) + clean_data(xss2)
    else:
        xss_data = clean_data(xss1) + clean_data(xss2) + clean_data(xss3)

    # Loại bỏ trùng lặp trong xss_data
    xss_data = list(set(xss_data))

    # Kiểm tra nếu xss_needed nhỏ hơn số lượng xss_data
    if xss_needed <= len(xss_data):
        # Sử dụng random.sample để đảm bảo không có mẫu trùng lặp
        xss_sample = random.sample(xss_data, xss_needed)
    else:
        # Nếu xss_needed lớn hơn số lượng xss_data, lặp lại quá trình chọn mẫu
        xss_sample = []
        while len(xss_sample) < xss_needed:
            if len(xss_sample) + len(xss_data) >= xss_needed:
                xss_sample.extend(random.sample(xss_data, xss_needed - len(xss_sample)))
                break
            else:
                xss_sample.extend(random.sample(xss_data, len(xss_data)))

    # Đọc dữ liệu từ file normal
    with open('fileNormal.txt', 'r', encoding='utf-8') as file_normal:
        normal_data = clean_data(file_normal.readlines())

    # Đọc dữ liệu từ file normal_dec.csv
    try:
        normal_dec_df = pd.read_csv('normal_dec.csv', header=None, sep=',', on_bad_lines='skip')
        if len(normal_dec_df) == 1:
            normal_dec_df = pd.DataFrame(normal_dec_df.iloc[0, 0].split(','), columns=[0])
    except pd.errors.ParserError as e:
        print(f"Lỗi đọc file CSV: {e}")
        normal_dec_df = pd.DataFrame()

    # Lọc bỏ các dòng trống và dài quá 1000 ký tự
    normal_dec_data = filter_long_samples(normal_dec_df[0].tolist(), max_length=10000)

    # Hợp nhất dữ liệu normal và loại bỏ trùng lặp
    normal_data = list(normal_data)  # Ưu tiên dữ liệu từ fileNormal.txt

    # Lấy hết dữ liệu từ fileNormal.txt trước
    normal_sample = normal_data[:normal_needed] if len(normal_data) >= normal_needed else normal_data

    # Nếu chưa đủ, lấy thêm từ normal_dec.csv
    remaining_needed = normal_needed - len(normal_sample)
    if remaining_needed > 0:
        normal_sample.extend(random.sample(normal_data, min(remaining_needed, len(normal_data))))

    # Ghi ra file tạm thời và gộp
    temp_normal_file = f'{output_file}_normal.txt'
    temp_xss_file = f'{output_file}_XSS.txt'
    
    with open(temp_normal_file, 'w', encoding='utf-8') as normal_output:
        normal_output.writelines([line + '\n' if not line.endswith('\n') else line for line in normal_sample])
        
    with open(temp_xss_file, 'w', encoding='utf-8') as xss_output:
        xss_output.writelines([line + '\n' if not line.endswith('\n') else line for line in xss_sample])

    # Gộp hai file lại
    merge(temp_xss_file, temp_normal_file, 'merged_file_temp.csv')

    # Xáo trộn dữ liệu và ghi ra file cuối cùng
    shuf('merged_file_temp.csv', output_file)

    # Kiểm tra số lượng dòng trong file cuối cùng
    with open(output_file, 'r', encoding='utf-8') as final_file:
        total_lines = len(final_file.readlines())

    print(f"Tổng số dòng trong file {output_file}: {total_lines}")

    # Nếu số lượng dòng ít hơn 12,000, cần bổ sung thêm dữ liệu
    if total_lines < 12000:
        print("Số lượng dòng chưa đủ 12,000, cần bổ sung thêm dữ liệu.")
    
    # Xóa các file tạm
    try:
        os.remove(temp_normal_file)
        os.remove(temp_xss_file)
        os.remove('merged_file_temp.csv')
        print("Đã xóa các file tạm.")
    except OSError as e:
        print(f"Lỗi khi xóa file tạm: {e}")

# Tạo các dataset theo yêu cầu
# create_dataset(10000, 2000, "XSS_dataset_51.csv")
# create_dataset(8000, 4000, "XSS_dataset_21.csv")
create_dataset(7000, 7000, "XSS_dataset_11.csv")
# create_dataset(4000, 8000, "XSS_dataset_12.csv")
# create_dataset(2000, 10000, "XSS_dataset_15.csv")
# create_dataset(10000, 10000, "XSS_dataset_1010.csv")
# create_dataset(20000, 20000, "XSS_dataset_2020.csv")
# create_dataset(30000, 30000, "XSS_dataset_3030.csv")
