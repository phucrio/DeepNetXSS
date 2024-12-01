import re


with open('log.txt', 'r') as file:
    log_data = file.read()
    
# Biểu thức chính quy để tìm tất cả các giá trị trong một dòng duy nhất
pattern = r'loss: ([\d\.e-]+) - accuracy: ([\d\.]+) - val_loss: ([\d\.e-]+) - val_accuracy: ([\d\.]+)'

# Khởi tạo các danh sách để lưu trữ các giá trị
loss_values = []
accuracy_values = []
val_loss_values = []
val_accuracy_values = []

# Sử dụng re.finditer để duyệt qua từng dòng và trích xuất các giá trị
for match in re.finditer(pattern, log_data):
    loss_values.append(float(match.group(1)))
    accuracy_values.append(float(match.group(2)))
    val_loss_values.append(float(match.group(3)))
    val_accuracy_values.append(float(match.group(4)))

# print("Loss values:", len(loss_values))
# print("Accuracy values:", len(accuracy_values))
# print("Val Loss values:", len(val_loss_values))
# print("Val Accuracy values:", len(val_accuracy_values))
# Chỉ số cần tra cứu
labels = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30]
# labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

loss_values_at_labels = []
accuracy_values_at_labels = []
val_loss_values_at_labels = []
val_accuracy_values_at_labels = []

# Hàm để lấy giá trị tại chỉ số từ danh sách, nếu chỉ số nằm trong phạm vi
def get_value_at_index(values, index):
    if 0 <= index < len(values):
        return values[index]
    return None

# Thêm giá trị vào các mảng mới
for label in labels:
    loss_value = get_value_at_index(loss_values, label - 1)  
    accuracy_value = get_value_at_index(accuracy_values, label - 1)  
    val_loss_value = get_value_at_index(val_loss_values, label - 1) 
    val_accuracy_value = get_value_at_index(val_accuracy_values, label - 1)  

    loss_values_at_labels.append(loss_value)
    accuracy_values_at_labels.append(accuracy_value)
    val_loss_values_at_labels.append(val_loss_value)
    val_accuracy_values_at_labels.append(val_accuracy_value)
print("Label:", labels)
print("Learning Error:", loss_values_at_labels)
print("Generalization Error:", val_loss_values_at_labels)
print("Learning Accuracy values:", accuracy_values_at_labels)
print("Val Accuracy values at labels:", val_accuracy_values_at_labels)