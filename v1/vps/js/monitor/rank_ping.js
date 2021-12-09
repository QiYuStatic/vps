function build_rank_ping_bar_echarts_option(data) {

    return {
        title: {show: true, text: "网络延迟(Ping)排行榜", left: "center"},
        yAxis: {type: 'category', name: '类型'},
        xAxis: {type: 'value', axisLabel: {formatter: "{value}ms"}, name: "延迟"},
        series: [
            {type: "bar", data: data},
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
        grid: {
            left: "30%"
        },
        visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: data[data.length - 1][0],
            max: data[0][0],
            text: ['高延迟', '低延迟'],
            // Map the score column to color
            dimension: 0,
            inRange: {
                color: ['#65B581', '#FFCE34', '#FD665F']
            }
        },
    }
}
