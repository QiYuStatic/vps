/**
 * 转换为速度点
 *
 * @param {Object}v
 * @param {string} name
 * @param {'dl'|'up'} mode
 * @return {(number|string)[]}
 */
function convert_to_speed_point(v, name, mode) {
    if (v.ping > 1000) {
        v.ping = 1000;
    }

    if (mode === 'dl') {
        return [parseInt(1000.0 / v.ping), parseInt(v.download), `${name} ${v.server.host}`];
    }
    return [parseInt(1000.0 / v.ping), parseInt(v.upload), `${name} ${v.server.host}`];
}

function do_multi_render_speed_scatter(dom_id, title, series) {
    let e = document.getElementById(dom_id);
    if (series.length < 1) {
        e.style.display = "none";
        return;
    }

    let chart = echarts.init(e, null, {renderer: 'svg'});
    let option = build_multi_speed_scatter_echarts_option(title, series);
    chart.setOption(option);
    window.addEventListener('resize', function () {
        chart.resize();
    });
}


/**
 *
 * @param {string}dom_id
 * @param {string}title
 * @param a_raw
 * @param b_raw
 * @param {string}a_name
 * @param {string}b_name
 * @param {'dl'|'up'} mode
 */
function do_render_speed_scatter(dom_id, title, a_raw, b_raw, a_name, b_name, mode) {
    let e = document.getElementById(dom_id);
    if (a_raw.length + b_raw.length <= 1) {
        e.style.display = "none";
        return;
    }

    let a_list = a_raw.map(function (v) {
        return convert_to_speed_point(v, a_name, mode);
    }).filter(x => !!x);

    let b_list = b_raw.map(function (v) {
        return convert_to_speed_point(v, b_name, mode);
    }).filter(x => !!x);

    let chart = echarts.init(e, null, {renderer: 'svg'});
    let option = build_speed_scatter_echarts_option(title, a_list, a_name, b_list, b_name);
    chart.setOption(option);
    window.addEventListener('resize', function () {
        chart.resize();
    });
}

function build_multi_speed_scatter_echarts_option(title, series) {


    function to_speed_string(v) {
        if (v > 1024 * 1024) {
            return `${parseFloat(v / 1024 / 1024 / 8).toFixed(1)} MB/s`;
        }
        if (v > 1024) {
            return `${parseFloat(v / 1024 / 8).toFixed(1)} KB/s`;
        }
        return `${v / 8} B/s`;
    }

    return {
        title: {show: true, text: title, left: "center"},
        yAxis: {
            type: 'value', name: '速度',
            axisLabel: {formatter: to_speed_string}
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                formatter: function (v) {
                    let t = parseInt(1000.0 / v);
                    return `${t}ms`;
                }
            },
            name: "延迟"
        },
        series: series,
        grid: {left: "20%"},
        legend: {
            show: true,
            x: "center",
            y: "bottom",
        },
        tooltip: {
            trigger: 'item',
            formatter: function (param) {
                let data = param.data;

                return `${data[2]}<br/>
延迟: ${parseInt(1000 / data[0])}ms<br/>
速度: ${to_speed_string(data[1])} `;
            }
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

function build_speed_scatter_echarts_option(title, data_a, a_name, data_b, b_name) {
    const series = [
        {type: 'scatter', data: data_a, name: a_name},
        {type: 'scatter', data: data_b, name: b_name},
    ];

    return build_multi_speed_scatter_echarts_option(title, series)
}
