// show cnn-lstm
var multipleLineChart = document.getElementById('cnv_cnn_lstm_epoc').getContext('2d');
var myMultipleLineChart = new Chart(multipleLineChart, {
type: 'line',
data: {
    labels: [1, 2, 3, 4, 5, 10, 15, 20, 25, 30],
    datasets: [{
        label: "Learning Error",
        borderColor: "#1d7af3",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#1d7af3",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.6312, 0.1682, 0.0328, 0.0157, 0.0129, 0.0077, 0.0039, 0.0024, 0.0011, 0.003],
    },{
        label: "Generalization Error",
        borderColor: "#59d05d",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#59d05d",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.5804, 0.0545, 0.0368, 0.014, 0.0155, 0.0127, 0.0205, 0.0074, 0.0065, 0.0059]
    }]
},
options : {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        position: 'top',
    },
    tooltips: {
        bodySpacing: 4,
        mode:"nearest",
        intersect: 0,
        position:"nearest",
        xPadding:10,
        yPadding:10,
        caretPadding:10
    },
    layout:{
        padding:{left:15,right:15,top:15,bottom:15}
    }
}
});

var multipleLineChart = document.getElementById('cnv_cnn_lstm_ker').getContext('2d');
var myMultipleLineChart = new Chart(multipleLineChart, {
type: 'line',
data: {
    labels: [2, 4, 8, 16, 32, 64, 128],
    datasets: [{
        label: "Learning Error",
        borderColor: "#1d7af3",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#1d7af3",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.6729, 0.7741, 0.7930, 0.8027, 0.8202, 0.8270, 0.8283, 0.8330, 0.8368, 0.8388, 0.8494, 0.8558, 0.8609, 0.8615, 0.8656, 0.8660, 0.8701, 0.8715, 0.8741, 0.8761, 0.8778, 0.8784, 0.8784, 0.8819, 0.8817, 0.8847, 0.8838, 0.8869]
    },{
        label: "Generalization Error",
        borderColor: "#59d05d",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#59d05d",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.8522, 0.9082, 0.8512, 0.8475, 0.8276, 0.8660, 0.8206, 0.8545, 0.8655, 0.8807, 0.8656, 0.8857, 0.8733, 0.8779, 0.8896, 0.8730, 0.9264, 0.9150, 0.8990, 0.9112, 0.9034, 0.8910, 0.9217, 0.8992, 0.8605, 0.8927, 0.9163, 0.9247]
    }]
},
options : {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        position: 'top',
    },
    tooltips: {
        bodySpacing: 4,
        mode:"nearest",
        intersect: 0,
        position:"nearest",
        xPadding:10,
        yPadding:10,
        caretPadding:10
    },
    layout:{
        padding:{left:15,right:15,top:15,bottom:15}
    }
}
});

   var multipleLineChart = document.getElementById('cnv_cnn_lstm_acc').getContext('2d');
var myMultipleLineChart = new Chart(multipleLineChart, {
type: 'line',
data: {
    labels: [1, 2, 3, 4, 5, 10, 15, 20, 25, 30],
    datasets: [{
        label: "Learning Accuracy",
        borderColor: "#1d7af3",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#1d7af3",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.6365, 0.9456, 0.9902, 0.9958, 0.9966, 0.9978, 0.9991, 0.9996, 0.9999, 0.9993]
    },{
        label: "Generalization Accuracy",
        borderColor: "#59d05d",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#59d05d",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.8032, 0.9845, 0.9888, 0.9983, 0.9964, 0.9977, 0.9946, 0.9991, 0.9988, 0.9986]
    }]
},
options : {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        position: 'top',
    },
    tooltips: {
        bodySpacing: 4,
        mode:"nearest",
        intersect: 0,
        position:"nearest",
        xPadding:10,
        yPadding:10,
        caretPadding:10
    },
    layout:{
        padding:{left:15,right:15,top:15,bottom:15}
    }
}
});

var multipleLineChart = document.getElementById('cnv_cnn_lstm_lay').getContext('2d');
var myMultipleLineChart = new Chart(multipleLineChart, {
type: 'line',
data: {
    labels: [1, 2, 3, 4, 5],
    datasets: [{
        label: "Learning Error",
        borderColor: "#1d7af3",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#1d7af3",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.61, 0.45, 0.42, 0.46, 0.57]
    },{
        label: "Generalization Error",
        borderColor: "#59d05d",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#59d05d",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.58, 0.42, 0.39, 0.51, 0.65]
    }]
},
options : {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        position: 'top',
    },
    tooltips: {
        bodySpacing: 4,
        mode:"nearest",
        intersect: 0,
        position:"nearest",
        xPadding:10,
        yPadding:10,
        caretPadding:10
    },
    layout:{
        padding:{left:15,right:15,top:15,bottom:15}
    }
}
});

var multipleLineChart = document.getElementById('cnv_cnn_lstm_img').getContext('2d');
var myMultipleLineChart = new Chart(multipleLineChart, {
type: 'line',
data: {
    labels: ['16*16', '32*32', '64*64', '128*128', '256*256'],
    datasets: [{
        label: "Learning Error",
        borderColor: "#1d7af3",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#1d7af3",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [1.2, 0.8, 0.4, 0.41, 0.92]
    },{
        label: "Generalization Error",
        borderColor: "#59d05d",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#59d05d",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [1.01, 0.63, 0.38, 0.35, 1.13]
    }]
},
options : {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        position: 'top',
    },
    tooltips: {
        bodySpacing: 4,
        mode:"nearest",
        intersect: 0,
        position:"nearest",
        xPadding:10,
        yPadding:10,
        caretPadding:10
    },
    layout:{
        padding:{left:15,right:15,top:15,bottom:15}
    }
}
});

function show_chart_cnn_lstm(e) {
        e.preventDefault();
        let id = $(`#${e.target.id}`).html();

        if(id == 'Error by epochs'){
            $('#cnn_lstm_epoc_ch').attr('style', 'display: block');
            $('#cnn_lstm_ker_ch').attr('style', 'display: none');
            $('#cnn_lstm_lay_ch').attr('style', 'display: none');
            $('#cnn_lstm_img_ch').attr('style', 'display: none');
            $('#cnn_lstm_acc_ch').attr('style', 'display: none');
        }else if(id == 'Accuracy by epochs'){
            $('#cnn_lstm_epoc_ch').attr('style', 'display: none');
            $('#cnn_lstm_ker_ch').attr('style', 'display: none');
            $('#cnn_lstm_lay_ch').attr('style', 'display: none');
            $('#cnn_lstm_img_ch').attr('style', 'display: none');
            $('#cnn_lstm_acc_ch').attr('style', 'display: block');
        }else if(id == 'Error by filters'){
            $('#cnn_lstm_epoc_ch').attr('style', 'display: none');
            $('#cnn_lstm_ker_ch').attr('style', 'display: block');
            $('#cnn_lstm_lay_ch').attr('style', 'display: none');
            $('#cnn_lstm_img_ch').attr('style', 'display: none');
            $('#cnn_lstm_acc_ch').attr('style', 'display: none');
        }else if(id == 'Error by layers'){
            $('#cnn_lstm_epoc_ch').attr('style', 'display: none');
            $('#cnn_lstm_ker_ch').attr('style', 'display: none');
            $('#cnn_lstm_lay_ch').attr('style', 'display: block');
            $('#cnn_lstm_img_ch').attr('style', 'display: none');
            $('#cnn_lstm_acc_ch').attr('style', 'display: none');
        }else if(id == 'Error by image size'){
            $('#cnn_lstm_epoc_ch').attr('style', 'display: none');
            $('#cnn_lstm_ker_ch').attr('style', 'display: none');
            $('#cnn_lstm_lay_ch').attr('style', 'display: none');
            $('#cnn_lstm_img_ch').attr('style', 'display: block');
            $('#cnn_lstm_acc_ch').attr('style', 'display: none');
        }
        }


//TextCNN
var multipleLineChart = document.getElementById('cnv_textcnn_epoc').getContext('2d');
var myMultipleLineChart = new Chart(multipleLineChart, {
type: 'line',
data: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [{
        label: "Learning Error",
        borderColor: "#1d7af3",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#1d7af3",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.3024, 0.0078, 0.0026, 0.0013, 0.00084684, 0.00059954, 0.00040992, 0.00029943, 0.00025443, 0.00018568],
    },{
        label: "Generalization Error",
        borderColor: "#59d05d",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#59d05d",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.014, 0.0044, 0.0024, 0.0014, 0.0011, 0.00085427, 0.00067738, 0.00054912, 0.00070564, 0.00062422]
    }]
},
options : {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        position: 'top',
    },
    tooltips: {
        bodySpacing: 4,
        mode:"nearest",
        intersect: 0,
        position:"nearest",
        xPadding:10,
        yPadding:10,
        caretPadding:10
    },
    layout:{
        padding:{left:15,right:15,top:15,bottom:15}
    }
}
});


var multipleLineChart = document.getElementById('cnv_textcnn_acc').getContext('2d');
var myMultipleLineChart = new Chart(multipleLineChart, {
type: 'line',
data: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [{
        label: "Learning Accuracy",
        borderColor: "#1d7af3",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#1d7af3",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.8559, 0.9976, 0.9994, 0.9998, 0.9999, 0.9999, 1.0, 1.0, 1.0, 1.0]
    },{
        label: "Generalization Accuracy",
        borderColor: "#59d05d",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#59d05d",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.9958, 0.9991, 0.9994, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998]
    }]
},
options : {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        position: 'top',
    },
    tooltips: {
        bodySpacing: 4,
        mode:"nearest",
        intersect: 0,
        position:"nearest",
        xPadding:10,
        yPadding:10,
        caretPadding:10
    },
    layout:{
        padding:{left:15,right:15,top:15,bottom:15}
    }
}
});


var multipleLineChart = document.getElementById('cnv_textcnn_seq').getContext('2d');
var myMultipleLineChart = new Chart(multipleLineChart, {
type: 'line',
data: {
    labels: ['16*16', '32*32', '64*64', '128*128', '256*256'],
    datasets: [{
        label: "Learning Error",
        borderColor: "#1d7af3",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#1d7af3",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [1.2, 0.8, 0.4, 0.41, 0.92]
    },{
        label: "Generalization Error",
        borderColor: "#59d05d",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#59d05d",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [1.01, 0.63, 0.38, 0.35, 1.13]
    }]
},
options : {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        position: 'top',
    },
    tooltips: {
        bodySpacing: 4,
        mode:"nearest",
        intersect: 0,
        position:"nearest",
        xPadding:10,
        yPadding:10,
        caretPadding:10
    },
    layout:{
        padding:{left:15,right:15,top:15,bottom:15}
    }
}
});

function show_chart_textcnn(e) {
    e.preventDefault();
    let id = $(`#${e.target.id}`).html();

    if(id == 'Error by epochs'){
        $('#textcnn_epoc_ch').attr('style', 'display: block');
        $('#textcnn_seq_ch').attr('style', 'display: none');
        $('#textcnn_acc_ch').attr('style', 'display: none');
    }else if(id == 'Accuracy by epochs'){
         $('#textcnn_epoc_ch').attr('style', 'display: none');
        $('#textcnn_seq_ch').attr('style', 'display: none');
        $('#textcnn_acc_ch').attr('style', 'display: block');
    }else if(id == 'Error by sequence length'){
        $('#textcnn_epoc_ch').attr('style', 'display: none');
        $('#textcnn_seq_ch').attr('style', 'display: block');
        $('#textcnn_acc_ch').attr('style', 'display: none');
    }
    }

//cnn

var multipleLineChart = document.getElementById('cnv_cnn_epoc').getContext('2d');
var myMultipleLineChart = new Chart(multipleLineChart, {
type: 'line',
data: {
    labels: [1, 2, 3, 4, 5, 10, 15, 20, 25, 30],
    datasets: [{
        label: "Learning Error",
        borderColor: "#1d7af3",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#1d7af3",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.5242, 0.2182, 0.1086, 0.0821, 0.0701, 0.0301, 0.0121, 0.0076, 0.0017, 0.0072],
    },{
        label: "Generalization Error",
        borderColor: "#59d05d",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#59d05d",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.42, 0.126, 0.0954, 0.0732, 0.068, 0.0484, 0.0604, 0.0367, 0.0521, 0.0356]
    }]
},
options : {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        position: 'top',
    },
    tooltips: {
        bodySpacing: 4,
        mode:"nearest",
        intersect: 0,
        position:"nearest",
        xPadding:10,
        yPadding:10,
        caretPadding:10
    },
    layout:{
        padding:{left:15,right:15,top:15,bottom:15}
    }
}
});

var multipleLineChart = document.getElementById('cnv_cnn_ker').getContext('2d');
var myMultipleLineChart = new Chart(multipleLineChart, {
type: 'line',
data: {
    labels: [2, 4, 8, 16, 32, 64, 128],
    datasets: [{
        label: "Learning Error",
        borderColor: "#1d7af3",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#1d7af3",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.6729, 0.7741, 0.7930, 0.8027, 0.8202, 0.8270, 0.8283, 0.8330, 0.8368, 0.8388, 0.8494, 0.8558, 0.8609, 0.8615, 0.8656, 0.8660, 0.8701, 0.8715, 0.8741, 0.8761, 0.8778, 0.8784, 0.8784, 0.8819, 0.8817, 0.8847, 0.8838, 0.8869]
    },{
        label: "Generalization Error",
        borderColor: "#59d05d",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#59d05d",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.8522, 0.9082, 0.8512, 0.8475, 0.8276, 0.8660, 0.8206, 0.8545, 0.8655, 0.8807, 0.8656, 0.8857, 0.8733, 0.8779, 0.8896, 0.8730, 0.9264, 0.9150, 0.8990, 0.9112, 0.9034, 0.8910, 0.9217, 0.8992, 0.8605, 0.8927, 0.9163, 0.9247]
    }]
},
options : {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        position: 'top',
    },
    tooltips: {
        bodySpacing: 4,
        mode:"nearest",
        intersect: 0,
        position:"nearest",
        xPadding:10,
        yPadding:10,
        caretPadding:10
    },
    layout:{
        padding:{left:15,right:15,top:15,bottom:15}
    }
}
});

   var multipleLineChart = document.getElementById('cnv_cnn_acc').getContext('2d');
var myMultipleLineChart = new Chart(multipleLineChart, {
type: 'line',
data: {
    labels: [1, 2, 3, 4, 5, 10, 15, 20, 25, 30],
    datasets: [{
        label: "Learning Accuracy",
        borderColor: "#1d7af3",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#1d7af3",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.7633, 0.9148, 0.9671, 0.9752, 0.9805, 0.9909, 0.9958, 0.9978, 0.9997, 0.9978]
    },{
        label: "Generalization Accuracy",
        borderColor: "#59d05d",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#59d05d",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.8142, 0.9621, 0.9696, 0.9787, 0.9796, 0.9858, 0.9846, 0.9908, 0.9912, 0.9921]
    }]
},
options : {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        position: 'top',
    },
    tooltips: {
        bodySpacing: 4,
        mode:"nearest",
        intersect: 0,
        position:"nearest",
        xPadding:10,
        yPadding:10,
        caretPadding:10
    },
    layout:{
        padding:{left:15,right:15,top:15,bottom:15}
    }
}
});

var multipleLineChart = document.getElementById('cnv_cnn_lay').getContext('2d');
var myMultipleLineChart = new Chart(multipleLineChart, {
type: 'line',
data: {
    labels: [1, 2, 3, 4, 5],
    datasets: [{
        label: "Learning Error",
        borderColor: "#1d7af3",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#1d7af3",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.61, 0.45, 0.42, 0.46, 0.57]
    },{
        label: "Generalization Error",
        borderColor: "#59d05d",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#59d05d",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.58, 0.42, 0.39, 0.51, 0.65]
    }]
},
options : {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        position: 'top',
    },
    tooltips: {
        bodySpacing: 4,
        mode:"nearest",
        intersect: 0,
        position:"nearest",
        xPadding:10,
        yPadding:10,
        caretPadding:10
    },
    layout:{
        padding:{left:15,right:15,top:15,bottom:15}
    }
}
});

 var multipleLineChart = document.getElementById('cnv_cnn_img').getContext('2d');
var myMultipleLineChart = new Chart(multipleLineChart, {
type: 'line',
data: {
    labels: ['16*16', '32*32', '64*64', '128*128', '256*256'],
    datasets: [{
        label: "Learning Error",
        borderColor: "#1d7af3",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#1d7af3",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [1.2, 0.8, 0.4, 0.41, 0.92]
    },{
        label: "Generalization Error",
        borderColor: "#59d05d",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#59d05d",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [1.01, 0.63, 0.38, 0.35, 1.13]
    }]
},
options : {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        position: 'top',
    },
    tooltips: {
        bodySpacing: 4,
        mode:"nearest",
        intersect: 0,
        position:"nearest",
        xPadding:10,
        yPadding:10,
        caretPadding:10
    },
    layout:{
        padding:{left:15,right:15,top:15,bottom:15}
    }
}
});

function show_chart_cnn(e) {
        e.preventDefault();
        let id = $(`#${e.target.id}`).html();

        if(id == 'Error by epochs'){
            $('#cnn_epoc_ch').attr('style', 'display: block');
            $('#cnn_ker_ch').attr('style', 'display: none');
            $('#cnn_lay_ch').attr('style', 'display: none');
            $('#cnn_img_ch').attr('style', 'display: none');
            $('#cnn_acc_ch').attr('style', 'display: none');
        }else if(id == 'Accuracy by epochs'){
            $('#cnn_epoc_ch').attr('style', 'display: none');
            $('#cnn_ker_ch').attr('style', 'display: none');
            $('#cnn_lay_ch').attr('style', 'display: none');
            $('#cnn_img_ch').attr('style', 'display: none');
            $('#cnn_acc_ch').attr('style', 'display: block');
        }else if(id == 'Error by filters'){
            $('#cnn_epoc_ch').attr('style', 'display: none');
            $('#cnn_ker_ch').attr('style', 'display: block');
            $('#cnn_lay_ch').attr('style', 'display: none');
            $('#cnn_img_ch').attr('style', 'display: none');
            $('#cnn_acc_ch').attr('style', 'display: none');
        }else if(id == 'Error by layers'){
            $('#cnn_epoc_ch').attr('style', 'display: none');
            $('#cnn_ker_ch').attr('style', 'display: none');
            $('#cnn_lay_ch').attr('style', 'display: block');
            $('#cnn_img_ch').attr('style', 'display: none');
            $('#cnn_acc_ch').attr('style', 'display: none');
        }else if(id == 'Error by image size'){
            $('#cnn_epoc_ch').attr('style', 'display: none');
            $('#cnn_ker_ch').attr('style', 'display: none');
            $('#cnn_lay_ch').attr('style', 'display: none');
            $('#cnn_img_ch').attr('style', 'display: block');
            $('#cnn_acc_ch').attr('style', 'display: none');
        }
        }


//BiLSTM
var multipleLineChart = document.getElementById('cnv_bilstm_epoc').getContext('2d');
var myMultipleLineChart = new Chart(multipleLineChart, {
type: 'line',
data: {
    labels: [1, 2, 3, 4, 5, 10, 15, 20, 25, 30],
    datasets: [{
        label: "Learning Error MSE",
        borderColor: "#1d7af3",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#1d7af3",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.5562, 0.2929, 0.2076, 0.1779, 0.1576, 0.1339, 0.1028, 0.0826, 0.0759, 0.0567]
    },{
        label: "Generalization Error MSE",
        borderColor: "#59d05d",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#59d05d",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.3418, 0.3033, 0.1882, 0.2144, 0.179, 0.1458, 0.1408, 0.1507, 0.1241, 0.1163]
    }]
},
options : {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        position: 'top',
    },
    tooltips: {
        bodySpacing: 4,
        mode:"nearest",
        intersect: 0,
        position:"nearest",
        xPadding:10,
        yPadding:10,
        caretPadding:10
    },
    layout:{
        padding:{left:15,right:15,top:15,bottom:15}
    }
}
});

var multipleLineChart = document.getElementById('cnv_bilstm_acc').getContext('2d');
var myMultipleLineChart = new Chart(multipleLineChart, {
type: 'line',
data: {
    labels: [1, 2, 3, 4, 5, 10, 15, 20, 25, 30],
    datasets: [{
        label: "Learning Bin Accuracy",
        borderColor: "#1d7af3",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#1d7af3",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.7023, 0.8884, 0.924, 0.9371, 0.9463, 0.9532, 0.9664, 0.9724, 0.9743, 0.9818]
        },{
        label: "Generalization Bin Accuracy",
        borderColor: "#59d05d",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#59d05d",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.8583, 0.8712, 0.9367, 0.9212, 0.94, 0.9492, 0.9533, 0.9588, 0.9596, 0.9696]
    }]
},
options : {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        position: 'top',
    },
    tooltips: {
        bodySpacing: 4,
        mode:"nearest",
        intersect: 0,
        position:"nearest",
        xPadding:10,
        yPadding:10,
        caretPadding:10
    },
    layout:{
        padding:{left:15,right:15,top:15,bottom:15}
    }
}
});

var multipleLineChart = document.getElementById('cnv_bilstm_cap').getContext('2d');
var myMultipleLineChart = new Chart(multipleLineChart, {
type: 'line',
data: {
    labels: [2,4,8,16,32,64,92,128,192,256,512],
    datasets: [{
        label: "Learning Error",
        borderColor: "#1d7af3",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#1d7af3",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [3.651, 3.256, 2.46, 1.98, 1.67, 0.984, 0.524, 0.18, 0.228, 0.89, 1.78]
    },{
        label: "Generalization Error",
        borderColor: "#59d05d",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#59d05d",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [2.56, 2.40, 2.12, 2.30, 1.95, 1.2, 0.57, 0.23, 0.46, 1.2, 3.4]
    }]
},
options : {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        position: 'top',
    },
    tooltips: {
        bodySpacing: 4,
        mode:"nearest",
        intersect: 0,
        position:"nearest",
        xPadding:10,
        yPadding:10,
        caretPadding:10
    },
    layout:{
        padding:{left:15,right:15,top:15,bottom:15}
    }
}
});

var multipleLineChart = document.getElementById('cnv_bilstm_lay').getContext('2d');
var myMultipleLineChart = new Chart(multipleLineChart, {
type: 'line',
data: {
    labels: [1, 2, 3, 4, 5],
    datasets: [{
        label: "Learning Error",
        borderColor: "#1d7af3",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#1d7af3",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.45, 0.26, 0.11, 0.40, 0.8]
    },{
        label: "Generalization Error",
        borderColor: "#59d05d",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#59d05d",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.6, 0.31, 0.14, 0.64, 1.3]
    }]
},
options : {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        position: 'top',
    },
    tooltips: {
        bodySpacing: 4,
        mode:"nearest",
        intersect: 0,
        position:"nearest",
        xPadding:10,
        yPadding:10,
        caretPadding:10
    },
    layout:{
        padding:{left:15,right:15,top:15,bottom:15}
    }
}
});

var multipleLineChart = document.getElementById('cnv_bilstm_seq').getContext('2d');
var myMultipleLineChart = new Chart(multipleLineChart, {
type: 'line',
data: {
    labels: [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
    datasets: [{
        label: "Learning Error",
        borderColor: "#1d7af3",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#1d7af3",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.01, 0.05, 0.5, 0.8, 0.10, 0.11, 0.13, 0.29, 0.94, 2.4]
    },{
        label: "Generalization Error",
        borderColor: "#59d05d",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#59d05d",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: true,
        borderWidth: 2,
        data: [0.78, 0.65, 0.49, 0.52, 0.32, 0.19, 0.16, 0.41, 1.13, 2.9]
    }]
},
options : {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        position: 'top',
    },
    tooltips: {
        bodySpacing: 4,
        mode:"nearest",
        intersect: 0,
        position:"nearest",
        xPadding:10,
        yPadding:10,
        caretPadding:10
    },
    layout:{
        padding:{left:15,right:15,top:15,bottom:15}
    }
}
});


function show_chart_bilstm(e) {
        e.preventDefault();
        let id = $(`#${e.target.id}`).html();

        if(id == 'Error by epochs'){
            $('#bilstm_epoc_ch').attr('style', 'display: block');
            $('#bilstm_cap_ch').attr('style', 'display: none');
            $('#bilstm_lay_ch').attr('style', 'display: none');
            $('#bilstm_seq_ch').attr('style', 'display: none');
            $('#bilstm_acc_ch').attr('style', 'display: none');
        }else if(id == 'Accuracy by epochs'){
             $('#bilstm_epoc_ch').attr('style', 'display: none');
            $('#bilstm_cap_ch').attr('style', 'display: none');
            $('#bilstm_lay_ch').attr('style', 'display: none');
            $('#bilstm_seq_ch').attr('style', 'display: none');
            $('#bilstm_acc_ch').attr('style', 'display: block');
        }else if(id == 'Error by capacity'){
            $('#bilstm_epoc_ch').attr('style', 'display: none');
            $('#bilstm_cap_ch').attr('style', 'display: block');
            $('#bilstm_lay_ch').attr('style', 'display: none');
            $('#bilstm_seq_ch').attr('style', 'display: none');
            $('#bilstm_acc_ch').attr('style', 'display: none');
        }else if(id == 'Error by layers'){
            $('#bilstm_epoc_ch').attr('style', 'display: none');
            $('#bilstm_cap_ch').attr('style', 'display: none');
            $('#bilstm_lay_ch').attr('style', 'display: block');
            $('#bilstm_seq_ch').attr('style', 'display: none');
            $('#bilstm_acc_ch').attr('style', 'display: none');
        }else if(id == 'Error by sequence length'){
            $('#bilstm_epoc_ch').attr('style', 'display: none');
            $('#bilstm_cap_ch').attr('style', 'display: none');
            $('#bilstm_lay_ch').attr('style', 'display: none');
            $('#bilstm_seq_ch').attr('style', 'display: block');
            $('#bilstm_acc_ch').attr('style', 'display: none');
        }
        }
    

// Dữ liệu cho các mô hình
const labels = ['Accuracy', 'Precision', 'Recall', 'F1-Score'];

const data = {
    labels: labels,
    datasets: [
        {
            label: 'BiLSTM',
            backgroundColor: '#4FFF4F',
            borderColor: '#00FF00',
            borderWidth: 1,
            data: [0.9696 ,0.9671 , 0.9712 , 0.9691], // Thay số liệu tương ứng
        },
        {
            label: 'BiLSTM-GAP',
            backgroundColor: '#513AFD',
            borderColor: '#1B00FF',
            borderWidth: 1,
            data: [0.9558, 0.9459, 0.9665, 0.9561], // Thay số liệu tương ứng
        },
        {
            label: 'CNN',
            backgroundColor: '#FFF54B',
            borderColor: '#FBF200',
            borderWidth: 1,
            data: [0.9862, 0.9908, 0.9888, 0.9798], // Thay số liệu tương ứng
        },
        {
            label: 'CNN-LSTM',
            backgroundColor: '#FFA732',
            borderColor: '#FF8F00',
            borderWidth: 1,
            data: [0.9986, 0.9983, 0.9988, 0.9986], // Thay số liệu tương ứng
        },
        {
            label: 'TextCNN',
            backgroundColor: '#FF4444',
            borderColor: '#FF0000',
            borderWidth: 1,
            data: [0.9998, 1.0, 0.9995, 0.9998], // Thay số liệu tương ứng
        }
    ]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 1, // Giá trị tối đa của trục y là 1
                ticks: {
                    font: {
                        size: 16, // Kích thước chữ cho trục y
                        weight: 'bold' // Đậm chữ cho trục y
                    }
                }
            },
            x: {
                ticks: {
                    font: {
                        size: 16, // Kích thước chữ cho trục x
                        weight: 'bold' // Đậm chữ cho trục x
                    }
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 16, // Kích thước chữ cho legend
                        weight: 'bold' // Đậm chữ cho legend
                    },
                    padding: 20
                }
            },
            tooltip: {
                enabled: true
            }
        }
    }
};

// Vẽ biểu đồ
var modelComparisonChart = new Chart(
    document.getElementById('modelComparisonChart').getContext('2d'),
    config
);

