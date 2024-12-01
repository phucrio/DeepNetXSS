import csv
import urllib.parse
import html

def decode_multiple_times(payload, max_iterations=5):
    """
    Giải mã payload nhiều lần để xử lý các trường hợp mã hóa nhiều lần.
    Dừng lại sau max_iterations hoặc khi không có thay đổi nào nữa.
    """
    for _ in range(max_iterations):
        decoded_payload = urllib.parse.unquote(payload)
        decoded_payload = html.unescape(decoded_payload)

        # Nếu việc giải mã không thay đổi payload, dừng lại
        if decoded_payload == payload:
            break
        payload = decoded_payload

    return decoded_payload

def is_xss_payload(line):
    """
    Kiểm tra xem một dòng có chứa signature payload XSS sau khi giải mã hay không.
    """
    decoded_line = decode_multiple_times(line)

    # Danh sách signature XSS để kiểm tra
    xss_signatures = [
        '<script', '</script>', 'alert(', 'alert=', 'alert)', 'alert%28',
        'javascript:', 'onerror=', 'onload=', 'string.fromcharcode',
        'onmouseover=', 'alert`1`', '"al"+"ert"', 'onunload=',
        'onanimationcancel=', 'ontransitionrun=', 'ontransitioncancel=',
        'onbeforeprint=', 'onbeforeunload=', 'onhashchange=', 'onmessage=',
        'onpagehide=', 'onpopstate=', 'onresize=', 'atob(', 'onfocus=',
        'onpointerenter=', 'onbegin=', 'onload\r\n=', 'ondblclick=',
        'onloadstart=', 'onclick=', 'onauxclick=', 'onload =', 'ontoggle=',
        'onerror=', '"al"+"ert()"', 'onafterscriptexecute=',
        'al\\\\x65rt', 'al\\\\145rt', 'alert\\', 'onpropertychange=',
        'al\\\\u0065rt(', 'al\\ert\\', 'onpointereenter=', 'eval(',
        'document.domain', 'confirm()', 'onload!', 'ondragover=', 'onmouseleave=',
        'ondragstart=', 'confirm(', 'prompt('
    ]

    # Kiểm tra signature trong dòng gốc và dòng đã giải mã
    for signature in xss_signatures:
        if signature in line.lower() or signature in decoded_line.lower():
            return True
    return False

def append_and_sort_xss(file_name, xss_clean_file):
    """
    Xử lý cả tệp .txt và .csv cho các payload XSS và thêm các payload hợp lệ
    vào tệp sạch được chỉ định.
    """
    with open(xss_clean_file, 'a+', newline='', encoding='utf-8') as clean_file:
        writer = csv.writer(clean_file)
        
        if file_name.endswith('.txt'):
            process_txt_file(file_name, writer)
        elif file_name.endswith('.csv'):
            process_csv_file(file_name, writer)
        else:
            print(f"Định dạng tệp không hỗ trợ: {file_name}")

    # Sau khi xử lý, sắp xếp và xóa các mục trùng lặp trong tệp sạch
    sort_and_remove_duplicates(xss_clean_file)

def process_txt_file(file_name, writer):
    """
    Xử lý một tệp .txt, trong đó mỗi payload là một dòng đơn.
    """
    with open(file_name, 'r', encoding='utf-8') as file:
        non_xss_count = 0
        for line in file:
            line = line.strip()
            if line:
                if is_xss_payload(line):
                    writer.writerow([line])
                else:
                    print(f"Payload không phải XSS: {line}")
                    print('-' * 100)
                    non_xss_count += 1

        print(f"Số lượng payload không phải XSS trong .txt: {non_xss_count}")

def process_csv_file(file_name, writer):
    """
    Xử lý một tệp .csv bằng cách đọc từng hàng và kiểm tra các payload XSS.
    """
    with open(file_name, newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        non_xss_count = 0
        for row in reader:
            if row and len(row[0].strip()) > 0:
                payload = row[0].strip()
                if is_xss_payload(payload):
                    writer.writerow([payload])
                else:
                    print(f"Payload không phải XSS: {payload}")
                    print('-' * 100)
                    non_xss_count += 1

        print(f"Số lượng payload không phải XSS trong .csv: {non_xss_count}")

def check_normal_file_for_xss(file_name):
    """
    Kiểm tra tệp bình thường để phát hiện các payload XSS tiềm năng và in chúng nếu được phát hiện.
    """
    with open(file_name, newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        xss_count = 0
        for row in reader:
            if len(row) > 0:
                payload = row[0]
                if is_xss_payload(payload):
                    print(f"Payload XSS : {payload}")
                    xss_count += 1
            else:
                print("Hàng trống hoặc không hợp lệ trong tệp bình thường đã được phát hiện và bỏ qua")
        
        if xss_count == 0:
            print("Không phát hiện payload XSS")
        else:
            print(f"Tổng số payload XSS: {xss_count}")

def sort_and_remove_duplicates(file_name):
    """
    Sắp xếp nội dung của tệp và xóa các mục trùng lặp.
    """
    with open(file_name, newline='', encoding='utf-8') as f:
        lines = list(csv.reader(f))
    
    unique_lines = sorted(set(tuple(line) for line in lines))
    longest_line = max(unique_lines, key=lambda x: len(str(x)))
    
    with open(file_name, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(unique_lines)
    
    print("Dòng dài nhất:", longest_line)
    print("Độ dài dòng dài nhất:", len(str(longest_line)))

if __name__ == "__main__":
    # Ví dụ sử dụng
    # append_and_sort_xss('fileXSS_dec.txt', 'XSS_clean.csv')
    # append_and_sort_xss('XSSpayloads.csv', 'XSS_clean.csv')
    # append_and_sort_xss('xssed_dec.csv', 'XSS_clean.csv')
    check_normal_file_for_xss('normal_dec.csv')
