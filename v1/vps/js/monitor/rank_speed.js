function build_rank_speed_bar_echarts_option(data) {

    return {
        title: {show: true, text: "网络速度排行榜", left: "center"},
        yAxis: {type: 'category', name: '类型'},
        xAxis: {
            type: 'value', axisLabel: {
                formatter: function (v) {
                    if (v < 1024) {
                        return `${v}B/s`;
                    }
                    if (v < 1024 * 1024) {
                        return `${(v / 1024).toFixed(1)}KB/s`;
                    }
                    return `${(v / 1024 / 1024).toFixed(1)}MB/s`;
                }
            }, name: "网速"
        },
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
            text: ['速度快', '速度慢'],
            // Map the score column to color
            dimension: 0,
            inRange: {
                color: ['#FD665F', '#FFCE34', '#65B581']
            }
        },
    }
}
