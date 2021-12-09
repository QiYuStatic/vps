/**
 * Ping 散单图
 * @param {Object} v
 * @param {string} ip
 */
function convert_to_ping_bar(v, ip) {
    if (v.times.length === 0) {
        return null;
    }

    let avg_value = 0;
    v.times.forEach(function (t) {
        avg_value += t;
    })

    return [parseInt((avg_value / v.times.length).toFixed(0)), `${v.host} ${ip}`]
}

function build_ping_bar_echarts_option(title, data_list) {
    const max_value = Math.max(...data_list.map(x => {
        return x[0]
    }));

    return {
        title: {show: true, text: title, left: "center"},
        yAxis: {type: 'category', name: 'IP'},
        xAxis: {type: 'value', axisLabel: {formatter: "{value}ms"}, name: "延迟"},
        series: [{
            type: "bar",
            data: data_list,
        }],
        visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 0,
            max: max_value,
            text: ['高延迟', '低延迟'],
            // Map the score column to color
            dimension: 0,
            inRange: {
                color: ['#65B581', '#FFCE34', '#FD665F']
            }
        },
        tooltip: {trigger: 'axis', order: "valueDesc", axisPointer: {type: 'cross'}},
        grid: {left: "30%"},
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                saveAsImage: {show: true} // SVG 只允许保存 SVG type 的图片
            }
        },
    }
}


function do_render_multi_ping_bar_chart(dom_id, title, series) {
    let e = document.getElementById(dom_id);
    if (series.length <= 0) {
        e.style.display = "none";
        return;
    }

    e.style.height = (200 + 15 * series.length) + "px";

    series.sort((a, b) => {
        return b[0] - a[0];
    })

    let ping_bench_chart = echarts.init(e, null, {renderer: 'svg'});
    let option = build_ping_bar_echarts_option(title, series);
    ping_bench_chart.setOption(option);
    window.addEventListener('resize', function () {
        ping_bench_chart.resize();
    });
}

/**
 * 渲染 ping bar
 * @param {string} dom_id Dom 元素 ID
 * @param {string} title echarts 标题
 * @param {Array} a_raw
 * @param {Array} b_raw
 * @param {string} a_ip a 名称
 * @param {string} b_ip b 名称
 */
function do_render_ping_bar_chart(dom_id, title, a_raw, b_raw, a_ip, b_ip) {
    let e = document.getElementById(dom_id);
    if (a_raw.length + b_raw.length <= 1) {
        e.style.display = "none";
        return;
    }

    let a_list = a_raw.map(function (v) {
        return convert_to_ping_bar(v, a_ip);
    }).filter(x => !!x);

    let b_list = b_raw.map(function (v) {
        return convert_to_ping_bar(v, b_ip);
    }).filter(x => !!x);

    let data_list = a_list.concat(b_list);

    data_list.sort((a, b) => {
        return b[0] - a[0];
    })

    let ping_bench_chart = echarts.init(e, null, {renderer: 'svg'});
    let option = build_ping_bar_echarts_option(title, data_list);
    ping_bench_chart.setOption(option);
    window.addEventListener('resize', function () {
        ping_bench_chart.resize();
    });
}


