/**
 * @param {Object[]} data
 */
function convert_to_disk_r_w_data(data) {
    let keys = ["seq", "seq_re", "reverse", "stride", "rand"];

    let r = keys.map(function (key) {
        return data[key]["r_speed"]
    })

    let w = keys.map(function (k) {
        return data[k]["w_speed"]
    })

    let v_r = disk_read_x_values();

    let r1 = r.map(function (i, index) {
        return [i.toFixed(1), v_r[index]]
    });


    let v_w = disk_write_x_values();

    let w1 = w.map(function (i, index) {
        return [i.toFixed(1), v_w[index]]
    });

    return [r1, w1];
}

function disk_read_x_values() {
    return ["顺序读", "顺序重读", "倒序读", "跳跃读", "随机读"]
}

function disk_write_x_values() {
    return ["顺序写", "顺序重写", "倒序写", "跳跃写", "随机写"]
}

function build_multi_disk_bar_echarts_option(title, series) {
    return {
        title: {show: true, text: title, left: "center"},
        yAxis: {type: 'category', name: '类型'},
        xAxis: {type: 'value', axisLabel: {formatter: "{value}MB/s"}, name: "速度"},
        series: series,
        tooltip: {trigger: 'axis', order: "valueDesc", axisPointer: {type: 'cross'}},
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                saveAsImage: {show: true} // SVG 只允许保存 SVG type 的图片
            }
        },
    }
}


// use multi for build
function build_disk_bar_echarts_option(title, a, a_name, b, b_name) {

    return {
        title: {show: true, text: title, left: "center"},
        yAxis: {type: 'category', name: '类型'},
        xAxis: {type: 'value', axisLabel: {formatter: "{value}MB/s"}, name: "速度"},
        series: [
            {type: "bar", data: a, name: a_name},
            {type: "bar", data: b, name: b_name},
        ],
        legend: {
            show: true,
            left: 'center',
            top: 'bottom'
        },
        tooltip: {trigger: 'axis', order: "valueDesc", axisPointer: {type: 'cross'}},
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                saveAsImage: {show: true} // SVG 只允许保存 SVG type 的图片
            }
        },
    }
}
