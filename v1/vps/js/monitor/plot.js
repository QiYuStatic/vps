/**
 * @param {Object} data
 * @return {*[]}
 */
function convert_to_file_data(data) {
    return [data.ctime, parseFloat((data.file_size / data.consume).toFixed(0))];
}

function build_file_chart_option(title, series) {
    return {
        title: {show: true, text: title, left: "center"},
        xAxis: {
            type: 'time',
            name: '时间'
        },
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: function (v) {
                        if (v < 1024) {
                            return `${v}B/s`;
                        }
                        if (v < 1024 * 1024) {
                            return `${(v / 1024).toFixed(1)}KB/s`;
                        }
                        return `${(v / 1024 / 1024).toFixed(1)}MB/s`;
                    }
                },
                name: "网络速度"
            },
        ],
        legend: {
            show: true,
            x: "center",
            y: "bottom",
        },
        series: series,
        tooltip: {trigger: 'axis', axisPointer: {type: 'cross'}},
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                magicType: {show: true, type: ['line', 'bar']},
                saveAsImage: {show: true} // SVG 只允许保存 SVG type 的图片
            }
        },
    };
}

/**
 * @param {Object} data
 * @param {string} key
 * @return {Array}
 */
function convert_to_ping_data(data, key) {
    return [data.ctime, data[key]];
}

/**
 * @param {Object} data
 */
function convert_to_ping_lost(data) {
    return [data.ctime, (data.sent - data.recv) / data.sent * 100];
}

function build_ping_chart_option(title, series) {
    return {
        title: {show: true, text: title, left: "center"},
        xAxis: {
            type: 'time',
            name: '时间'
        },
        yAxis: [
            {type: 'value', axisLabel: {formatter: "{value}ms"}, name: "耗时"},
            {
                type: 'value',
                boundaryGap: ['0', '100%'],
                axisLabel: {
                    name: "丢包率",
                    formatter: "{value}%"
                },
                scale: true,
                min: 0,
                splitNumber: 10,
                max: 100,
            }
        ],
        series: series,
        tooltip: {trigger: 'axis', axisPointer: {type: 'cross'}},
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                magicType: {show: true, type: ['line', 'bar']},
                saveAsImage: {show: true} // SVG 只允许保存 SVG type 的图片
            }
        },
    };
}
