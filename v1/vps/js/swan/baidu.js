// 兼容百度小程序
if (typeof swan !== 'undefined' || navigator.userAgent.includes("baiduboxapp")) {
    console.log('in baidu swan');
    window.addEventListener('load', function () {
        let links = document.querySelectorAll('a');
        console.log({a: links});
        links.forEach(function (item) {
            if (item.host.includes("vps.qiyutech.tech")) {
                return;
            }

            let url = item.href;
            item.href = "javascript:void(0)";
            item.onclick = async function () {
                await navigator.clipboard.writeText(url);
                alert("网址已复制");
            }
        })
    })
}
