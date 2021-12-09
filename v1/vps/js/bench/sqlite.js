/**
 * @param {Object[]} data
 */
function convert_to_sqlite_data(data) {
    let keys = ["rand_read_tps", "rand_update_tps", "seq_delete_tps", "seq_insert_tps", "seq_read_tps", "seq_update_tps", "skip_read_tps"];
    let zh_cn = ["随机读取", "随机更新", "顺序删除", "顺序插入", "顺序读取", "顺序更新", "跳跃读取"];

    let r = keys.map(function (key) {
        return data[key]
    })


    return r.map(function (i, index) {
        return [i.toFixed(0), zh_cn[index]]
    });

}

function build_multi_sqlite_bar_echarts_option(title, series) {
    return {
        title: {show: true, text: title, left: "center"},
        yAxis: {type: 'category', name: '类型'},
        xAxis: {type: 'value', axisLabel: {formatter: "{value}TPS"}, name: "速度"},
        series: series,
        tooltip: {trigger: 'axis', order: "valueDesc", axisPointer: {type: 'cross'}},
        legend: {
            show: true,
            left: 'center',
            top: 'bottom'
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                saveAsImage: {show: true} // SVG 只允许保存 SVG type 的图片
            }
        },
    }
}

function build_sqlite_bar_echarts_option(title, a, a_name, b, b_name) {

    return {
        title: {show: true, text: title, left: "center"},
        yAxis: {type: 'category', name: '类型'},
        xAxis: {type: 'value', axisLabel: {formatter: "{value}TPS"}, name: "速度"},
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
