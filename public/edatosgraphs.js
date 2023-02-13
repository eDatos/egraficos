function renderGraph(options, divId) {
    const dom = document.getElementById(divId);
    const myChart = echarts.init(dom, null, {
        renderer: 'svg',
        useDirtyRect: false
    });
    myChart.setOption(options);
    window.addEventListener('resize', myChart.resize);
}