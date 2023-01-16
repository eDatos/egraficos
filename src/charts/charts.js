import { getDimensionAggregator, dateFormats as dateFormats$1, legend, labelsOcclusion } from '@rawgraphs/rawgraphs-core';
import { rollups, select, ascending, descending, scaleBand, groups, sum, scaleLinear, timeFormat, extent, axisBottom, axisLeft, forceX, forceY, forceCollide, scalePoint, quantile, line, min, area, maxIndex, hierarchy, pack, arc, cluster, tree, linkRadial, lab, geoPath, range, scan, polygonHull, linkHorizontal, greatest, axisTop, pie, lineRadial, curveLinearClosed, curveBasisClosed, curveCardinalClosed, curveCatmullRomClosed, partition, treemap as treemap$1, selectAll, bin, randomNormal, randomLcg, Delaunay } from 'd3';
import { gridding } from 'd3-gridding';


var img$4 = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3crect class='cls-1' x='21' y='29' width='7' height='19'/%3e %3crect class='cls-1' x='41' y='34' width='7' height='14'/%3e %3c/g%3e %3cg id='primary'%3e %3cpolygon class='cls-2' points='9.185 9.685 7.5 8 5.815 9.685 5.815 11.115 7.003 9.927 7.003 48 7.997 48 7.997 9.927 9.185 11.115 9.185 9.685'/%3e %3crect class='cls-2' x='31' y='22.9517' width='7' height='25.0483'/%3e %3crect class='cls-2' x='11' y='36' width='7' height='12'/%3e %3c/g%3e%3c/svg%3e";

var img$5 = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: white%3b %7d .cls-2 %7b fill: %23bee5a0%3b %7d .cls-3 %7b fill: %235e4fa2%3b %7d .cls-4 %7b fill: %23fdbe70%3b %7d .cls-5 %7b fill: %239e0142%3b %7d .cls-6 %7b fill: none%3b stroke: black%3b %7d .cls-7%2c .cls-8 %7b isolation: isolate%3b font-family: Helvetica%3b %7d .cls-7 %7b font-size: 12px%3b %7d .cls-8 %7b font-size: 10px%3b %7d %3c/style%3e %3c/defs%3e %3crect id='backgorund' class='cls-1' width='320' height='160'/%3e %3cg id='viz'%3e %3cg%3e %3cg%3e %3crect id='undefined_-_a' data-name='undefined - a' class='cls-2' x='28.9863' y='18.3333' width='46.1826' height='70'/%3e %3crect id='undefined_-_b' data-name='undefined - b' class='cls-3' x='77.1553' y='78.3333' width='46.1826' height='10'/%3e %3crect id='undefined_-_c' data-name='undefined - c' class='cls-4' x='125.3242' y='88.3333' width='46.1826' height='10'/%3e %3crect id='undefined_-_d' data-name='undefined - d' class='cls-5' x='173.4932' y='88.3333' width='46.1826' height='56.6667'/%3e %3crect id='undefined_-_e' data-name='undefined - e' class='cls-4' x='221.6621' y='88.3333' width='46.1826' height='40'/%3e %3crect id='undefined_-_f' data-name='undefined - f' class='cls-3' x='269.8311' y='58.3333' width='46.1826' height='30'/%3e %3c/g%3e %3cg id='xAxis'%3e %3cpath class='cls-6' d='M27.5%2c88.8333h291'/%3e %3cg%3e %3cline class='cls-6' x1='52.0776' y1='88.3333' x2='52.0776' y2='94.3333'/%3e %3ctext class='cls-7' transform='translate(49.2969 104.4333)'%3ea%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='100.2466' y1='88.3333' x2='100.2466' y2='94.3333'/%3e %3ctext class='cls-7' transform='translate(97.4658 104.4333)'%3eb%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='148.4155' y1='88.3333' x2='148.4155' y2='94.3333'/%3e %3ctext class='cls-7' transform='translate(145.9155 104.4333)'%3ec%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='196.5845' y1='88.3333' x2='196.5845' y2='94.3333'/%3e %3ctext class='cls-7' transform='translate(193.8037 104.4333)'%3ed%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='244.7534' y1='88.3333' x2='244.7534' y2='94.3333'/%3e %3ctext class='cls-7' transform='translate(241.9727 104.4333)'%3ee%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='292.9224' y1='88.3333' x2='292.9224' y2='94.3333'/%3e %3ctext class='cls-7' transform='translate(291.5332 104.4333)'%3ef%3c/text%3e %3c/g%3e %3c/g%3e %3cg id='yAxis'%3e %3cpath class='cls-6' d='M27.5%2c155.5V5.5'/%3e %3cg%3e %3cline class='cls-6' x1='27' y1='155.5' x2='21' y2='155.5'/%3e %3ctext class='cls-8' transform='translate(1.0371 158.7)'%3e%e2%88%9220%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='27' y1='138.8333' x2='21' y2='138.8333'/%3e %3ctext class='cls-8' transform='translate(1.0371 142.0333)'%3e%e2%88%9215%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='27' y1='122.1667' x2='21' y2='122.1667'/%3e %3ctext class='cls-8' transform='translate(1.0371 125.3667)'%3e%e2%88%9210%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='27' y1='105.5' x2='21' y2='105.5'/%3e %3ctext class='cls-8' transform='translate(6.5986 108.7)'%3e%e2%88%925%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='27' y1='88.8333' x2='21' y2='88.8333'/%3e %3ctext class='cls-8' transform='translate(12.4385 92.0333)'%3e0%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='27' y1='72.1667' x2='21' y2='72.1667'/%3e %3ctext class='cls-8' transform='translate(12.4385 75.3667)'%3e5%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='27' y1='55.5' x2='21' y2='55.5'/%3e %3ctext class='cls-8' transform='translate(6.877 58.7)'%3e10%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='27' y1='38.8333' x2='21' y2='38.8333'/%3e %3ctext class='cls-8' transform='translate(6.877 42.0333)'%3e15%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='27' y1='22.1667' x2='21' y2='22.1667'/%3e %3ctext class='cls-8' transform='translate(6.877 25.3666)'%3e20%3c/text%3e %3c/g%3e %3cg%3e %3cline class='cls-6' x1='27' y1='5.5' x2='21' y2='5.5'/%3e %3ctext class='cls-8' transform='translate(6.877 8.7)'%3e25%3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$2 = {
    name: 'Bar chart',
    thumbnail: img$5,
    icon: img$4,
    id: 'bar',
    categories: ['correlations'],
    description: 'It displays a categorical dimension and related amount width is proportional to the quantitative dimension.',
    code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/barchart',
    tutorial: 'https://rawgraphs.io/learning/how-to-make-a-barchart/'
  };
  const dimensions$2 = [{
    id: 'bars',
    name: 'Bars',
    validTypes: ['number', 'string', 'date'],
    required: true,
    operation: 'get'
  }, {
    id: 'size',
    name: 'Size',
    operation: 'get',
    validTypes: ['number'],
    required: false,
    aggregation: true,
    aggregationDefault: 'sum'
  }, {
    id: 'color',
    name: 'Color',
    operation: 'get',
    validTypes: ['number', 'string', 'date'],
    required: false,
    aggregation: true,
    aggregationDefault: {
      number: 'sum',
      string: 'csvDistinct',
      date: 'csvDistinct'
    }
  }, {
    id: 'series',
    name: 'Series',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get'
  }];
  const visualOptions$2 = {
    marginTop: {
      type: 'number',
      label: 'Margin (top)',
      default: 20,
      group: 'artboard'
    },
    marginRight: {
      type: 'number',
      label: 'Margin (right)',
      default: 10,
      group: 'artboard'
    },
    marginBottom: {
      type: 'number',
      label: 'Margin (bottom)',
      default: 20,
      group: 'artboard'
    },
    marginLeft: {
      type: 'number',
      label: 'Margin (left)',
      default: 50,
      group: 'artboard'
    },
    showLegend: {
      type: 'boolean',
      label: 'Show legend',
      default: false,
      group: 'artboard'
    },
    legendWidth: {
      type: 'number',
      label: 'Legend width',
      default: 200,
      group: 'artboard',
      disabled: {
        showLegend: false
      },
      container: 'width',
      containerCondition: {
        showLegend: true
      }
    },
    legendOrient: {
      type: 'text',
      label: 'Legend orient',
      group: 'artboard',
      options: [{
        label: 'Vertical',
        value: 'vertical'
      }, {
        label: 'Horizontal',
        value: 'horizontal'
      }],
      default: 'horizontal',
      disabled: {
        showLegend: false
      }
    },
    legendMarginRight: {
      type: 'number',
      label: 'Legend Margin(Right)',
      default: 'auto',
      group: 'artboard',
      disabled: {
        showLegend: false
      }
    },
    legendMarginTop: {
      type: 'number',
      label: 'Legend Margin(Right)',
      default: 'auto',
      group: 'artboard',
      disabled: {
        showLegend: false
      }
    },
    showToolbox: {
      type: 'boolean',
      label: 'Show Toolbox',
      default: false,
      group: 'artboard'
    },
    padding: {
      type: 'number',
      label: 'Padding',
      default: 1,
      group: 'chart'
    },
    barsOrientation: {
      type: 'text',
      label: 'Bars orientation',
      group: 'chart',
      options: [{
        label: 'Vertically',
        value: 'vertical'
      }, {
        label: 'Horizontally',
        value: 'horizontal'
      }],
      default: 'vertical'
    },
    sortBarsBy: {
      type: 'text',
      label: 'Sort bars by',
      group: 'chart',
      options: [{
        label: 'Size (descending)',
        value: 'totalDescending'
      }, {
        label: 'Size (ascending)',
        value: 'totalAscending'
      }, {
        label: 'Name',
        value: 'name'
      }, {
        label: 'Original',
        value: 'original'
      }],
      default: 'name'
    },
    useSameScale: {
      type: 'boolean',
      label: 'Use same scale',
      default: true,
      group: 'series'
    },
    columnsNumber: {
      type: 'number',
      label: 'Number of columns',
      default: 0,
      group: 'series'
    },
    sortSeriesBy: {
      type: 'text',
      label: 'Sort series by',
      group: 'series',
      options: ['Total value (descending)', 'Total value (ascending)', 'Name', 'Original'],
      default: 'Total value (descending)'
    },
    showSeriesLabels: {
      type: 'boolean',
      label: 'Show series titles',
      default: true,
      group: 'series'
    },
    repeatAxesLabels: {
      type: 'boolean',
      label: 'Repeat axis labels for each series',
      default: false,
      group: 'series'
    },
    showGrid: {
      type: 'boolean',
      label: 'Show series grid',
      default: false,
      group: 'series'
    },
    colorScale: {
      type: 'colorScale',
      label: 'Color scale',
      dimension: 'color',
      default: {
        scaleType: 'ordinal',
        interpolator: 'interpolateSpectral'
      },
      group: 'colors'
    }
  };
  var styles$1 = {"axisLabel":{"fontFamily":"Arial, sans-serif","fontSize":"12px","fill":"#7b7b7b","fontWeight":"bold"},"axisLine":{"stroke":"#ccc"},"labelPrimary":{"fontFamily":"Arial, sans-serif","fontSize":"10px","fill":"black","fontWeight":"bold"},"labelSecondary":{"fontFamily":"Arial, sans-serif","fontSize":"10px","fill":"black","fontWeight":"normal"},"labelItalic":{"fontFamily":"Arial, sans-serif","fontSize":"10px","fill":"black","fontWeight":"normal","fontStyle":"italic"},"seriesLabel":{"fontFamily":"Arial, sans-serif","fontSize":"12px","fill":"black","fontWeight":"bold","dominantBaseline":"hanging"},"labelOutline":{"strokeWidth":"2px","paintOrder":"stroke","stroke":"white","strokeLinecap":"round","strokeLinejoin":"round"}};
export const barchart = {
    metadata: metadata$2,
    dimensions: dimensions$2,
    getChartOptions: getChartOptions$2,
    visualOptions: visualOptions$2,
    styles: styles$1
  };

  var img$E = "data:image/svg+xml,%3csvg id='rawgraphs-icons' xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %2395e5c0%3b %7d .cls-2 %7b fill: %2306c26c%3b %7d %3c/style%3e %3c/defs%3e %3cg id='secundary'%3e %3cpath class='cls-1' d='M29%2c7.0059A20.3962%2c20.3962%2c0%2c0%2c1%2c47.9209%2c20.92L29%2c26.82Z'/%3e %3cpath class='cls-1' d='M30.4805%2c27.4062%2c48.2178%2c21.875a20.556%2c20.556%2c0%2c0%2c1%2c.4384%2c9.36Z'/%3e %3c/g%3e %3cg id='primary'%3e %3cpath class='cls-2' d='M28.5%2c48A20.5%2c20.5%2c0%2c0%2c1%2c28%2c7.0059v20.9l20.4512%2c4.3086A20.5831%2c20.5831%2c0%2c0%2c1%2c28.5%2c48Z'/%3e %3c/g%3e%3c/svg%3e";

var img$F = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'%3e %3cdefs%3e %3cstyle%3e .cls-1 %7b fill: %239e0142%3b %7d .cls-1%2c .cls-2%2c .cls-3%2c .cls-4 %7b stroke: white%3b %7d .cls-2 %7b fill: %23fdbe70%3b %7d .cls-3 %7b fill: %23bee5a0%3b %7d .cls-4 %7b fill: %235e4fa2%3b %7d %3c/style%3e %3c/defs%3e %3cg id='viz'%3e %3cg id='pie'%3e %3cpath class='cls-1' d='M40%2c12.15253A27.84746%2c27.84746%2c0%2c0%2c1%2c63.049%2c55.62764L40%2c40Z'/%3e %3cpath class='cls-2' d='M63.049%2c55.62764a27.84753%2c27.84753%2c0%2c0%2c1-6.19647%2c6.54154L40%2c40Z'/%3e %3cpath class='cls-3' d='M56.85257%2c62.16918A27.84747%2c27.84747%2c0%2c0%2c1%2c13.16757%2c32.55L40%2c40Z'/%3e %3cpath class='cls-4' d='M13.16757%2c32.55A27.84747%2c27.84747%2c0%2c0%2c1%2c40%2c12.15253V40Z'/%3e %3c/g%3e %3cg id='pie-2' data-name='pie'%3e %3cpath class='cls-1' d='M120%2c10.51994a29.48006%2c29.48006%2c0%2c0%2c1%2c7.055%2c58.10348L120%2c40Z'/%3e %3cpath class='cls-2' d='M127.055%2c68.62342A29.48007%2c29.48007%2c0%2c0%2c1%2c90.73488%2c36.44657L120%2c40Z'/%3e %3cpath class='cls-3' d='M90.73488%2c36.44657A29.48008%2c29.48008%2c0%2c0%2c1%2c106.29993%2c13.8967L120%2c40Z'/%3e %3cpath class='cls-4' d='M106.29993%2c13.8967A29.48%2c29.48%2c0%2c0%2c1%2c120%2c10.51994V40Z'/%3e %3c/g%3e %3cg id='pie-3' data-name='pie'%3e %3cpath class='cls-1' d='M200%2c10.74759a29.25242%2c29.25242%2c0%2c0%2c1%2c22.61242%2c47.81L200%2c40Z'/%3e %3cpath class='cls-2' d='M222.61242%2c58.55754a29.25243%2c29.25243%2c0%2c0%2c1-48.41075-4.76805L200%2c40Z'/%3e %3cpath class='cls-3' d='M174.20167%2c53.78949a29.25244%2c29.25244%2c0%2c0%2c1%2c22.93109-42.901L200%2c40Z'/%3e %3cpath class='cls-4' d='M197.13276%2c10.88844q1.42931-.14076%2c2.86724-.14085V40Z'/%3e %3c/g%3e %3cg id='pie-4' data-name='pie'%3e %3cpath class='cls-1' d='M280%2c14.93194a25.06805%2c25.06805%2c0%2c0%2c1%2c15.53592%2c5.39466L280%2c40Z'/%3e %3cpath class='cls-2' d='M295.53592%2c20.3266A25.06806%2c25.06806%2c0%2c1%2c1%2c256.607%2c30.99035L280%2c40Z'/%3e %3cpath class='cls-3' d='M256.607%2c30.99035A25.068%2c25.068%2c0%2c0%2c1%2c267.2249%2c18.43141L280%2c40Z'/%3e %3cpath class='cls-4' d='M267.2249%2c18.43141A25.068%2c25.068%2c0%2c0%2c1%2c280%2c14.93194V40Z'/%3e %3c/g%3e %3cg id='pie-5' data-name='pie'%3e %3cpath class='cls-1' d='M40%2c107.33333a12.6667%2c12.6667%2c0%2c0%2c1%2c10.96966%2c6.33334L40%2c120Z'/%3e %3cpath class='cls-2' d='M50.96966%2c113.66667a12.66667%2c12.66667%2c0%2c0%2c1-4.63633%2c17.303L40%2c120Z'/%3e %3cpath class='cls-3' d='M46.33333%2c130.96966a12.66667%2c12.66667%2c0%2c0%2c1-17.303-17.303L40%2c120Z'/%3e %3cpath class='cls-4' d='M29.03034%2c113.66667A12.6667%2c12.6667%2c0%2c0%2c1%2c40%2c107.33333V120Z'/%3e %3c/g%3e %3cg id='pie-6' data-name='pie'%3e %3cpath class='cls-1' d='M120%2c82a38%2c38%2c0%2c0%2c1%2c36.4036%2c48.89852L120%2c120Z'/%3e %3cpath class='cls-2' d='M156.4036%2c130.89852a38%2c38%2c0%2c0%2c1-15.52226%2c20.85L120%2c120Z'/%3e %3cpath class='cls-3' d='M140.88134%2c151.74854a38%2c38%2c0%2c0%2c1-56.58966-44.74531L120%2c120Z'/%3e %3cpath class='cls-4' d='M84.29168%2c107.00323A38%2c38%2c0%2c0%2c1%2c120%2c82v38Z'/%3e %3c/g%3e %3cg id='pie-7' data-name='pie'%3e %3cpath class='cls-1' d='M200%2c94.93194a25.06806%2c25.06806%2c0%2c0%2c1%2c1.67436%2c50.08014L200%2c120Z'/%3e %3cpath class='cls-2' d='M201.67436%2c145.01208a25.06806%2c25.06806%2c0%2c0%2c1-11.46066-48.091L200%2c120Z'/%3e %3cpath class='cls-3' d='M190.2137%2c96.9211a25.068%2c25.068%2c0%2c0%2c1%2c6.44506-1.76549L200%2c120Z'/%3e %3cpath class='cls-4' d='M196.65876%2c95.15561A25.069%2c25.069%2c0%2c0%2c1%2c200%2c94.93194V120Z'/%3e %3c/g%3e %3cg id='pie-8' data-name='pie'%3e %3cpath class='cls-1' d='M280%2c89.40709a30.59291%2c30.59291%2c0%2c0%2c1%2c8.13884%2c60.08334L280%2c120Z'/%3e %3cpath class='cls-2' d='M288.13884%2c149.49043a30.59291%2c30.59291%2c0%2c0%2c1-23.82992-55.75287L280%2c120Z'/%3e %3cpath class='cls-3' d='M264.30892%2c93.73756a30.59275%2c30.59275%2c0%2c0%2c1%2c10.22851-3.83882L280%2c120Z'/%3e %3cpath class='cls-4' d='M274.53743%2c89.89874A30.59179%2c30.59179%2c0%2c0%2c1%2c280%2c89.40709V120Z'/%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

const metadata$l = {
  name: 'Pie chart',
  id: 'piec',
  thumbnail: img$F,
  icon: img$E,
  categories: ['proportions'],
  description: 'It allows you to see the proportions between values that make up a whole, by using arcs composing a circle.',
  code: 'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/piechart',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-pie-chart/'
};

const dimensions$l = [{
  id: 'arcs',
  name: 'Arcs',
  validTypes: ['number'],
  required: true,
  multiple: true,
  operation: 'get',
  aggregation: true,
  aggregationDefault: {
    number: 'sum'
  }
}, {
  id: 'series',
  name: 'Series',
  validTypes: ['number', 'date', 'string'],
  required: false,
  operation: 'get'
}];
const visualOptions$l = {
  // Artboard
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard'
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 2,
    group: 'artboard'
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 2,
    group: 'artboard'
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 2,
    group: 'artboard'
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard'
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 500,
    group: 'artboard',
    disabled: {
      showLegend: false
    }
  },
  legendOrient: {
    type: 'text',
    label: 'Legend orient',
    group: 'artboard',
    options: [{
      label: 'Vertical',
      value: 'vertical'
    }, {
      label: 'Horizontal',
      value: 'horizontal'
    }],
    default: 'horizontal',
    disabled: {
      showLegend: false
    }
  },
  legendMarginRight: {
    type: 'number',
    label: 'Legend Margin(Right)',
    default: 'auto',
    group: 'artboard',
    disabled: {
      showLegend: false
    }
  },
  legendMarginTop: {
    type: 'number',
    label: 'Legend Margin(Right)',
    default: 'auto',
    group: 'artboard',
    disabled: {
      showLegend: false
    }
  },
  showToolbox: {
    type: 'boolean',
    label: 'Show Toolbox',
    default: false,
    group: 'artboard'
  },
  // chart
  drawDonut: {
    type: 'boolean',
    label: 'Draw as donuts',
    default: false,
    group: 'chart'
  },
  arcTichkness: {
    type: 'number',
    label: 'Donut thickness',
    default: 10,
    group: 'chart',
    disabled: {
      drawDonut: false
    }
  },
  sortArcsBy: {
    type: 'text',
    label: 'Sort arcs by',
    group: 'series',
    options: [{
      label: 'Size (descending)',
      value: 'totalDescending'
    }, {
      label: 'Size (ascending)',
      value: 'totalAscending'
    }, {
      label: 'Name',
      value: 'name'
    }, {
      label: 'Original',
      value: 'original'
    }],
    default: 'name'
  },
  // colors
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    domain: 'colorDomain',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'colors'
  },
  // labels
  showSeriesLabels: {
    type: 'boolean',
    label: 'Show pies titles',
    default: true,
    group: 'labels'
  },
  showArcValues: {
    type: 'boolean',
    label: 'Show values on arcs',
    default: false,
    group: 'labels'
  },
  // series
  // sortPiesBy: {
  //   type: 'text',
  //   label: 'Sort pies by',
  //   group: 'series',
  //   options: [{
  //     label: 'Size (descending)',
  //     value: 'totalDescending'
  //   }, {
  //     label: 'Size (ascending)',
  //     value: 'totalAscending'
  //   }, {
  //     label: 'Name',
  //     value: 'name'
  //   }, {
  //     label: 'Original',
  //     value: 'original'
  //   }],
  //   default: 'name'
  // },
  rowsNumber: {
    type: 'number',
    label: 'Grid rows',
    default: 1,
    group: 'series'
  },
};
function colorDomain$2(data, mapping) {
  const domain = mapping.arcs.value;
  return {
    domain,
    type: 'number'
  };
}
export const piechart = {
  metadata: metadata$l,
  dimensions: dimensions$l,
  getChartOptions: getChartOptions$3,
  visualOptions: visualOptions$l,
  styles: styles$1,
  colorDomain: colorDomain$2
};
const getxAxis = (visualOptions, datachart, resultMap) => {
  return {
      type: 'category',
      data: resultMap.map(res =>res.bars),
      axisLabel: {
        //rotate: 90
        fontSize:10
    },
  }
}
const getyAxis = (visualOptions, datachart, resultMap) => {
return {
type: 'value'
}
}
const barsSortings = {
totalDescending: function (a, b) {
return descending(a[1], b[1]);
},
totalAscending: function (a, b) {
return ascending(a[1], b[1]);
},
name: function (a, b) {
return ascending(a[0], b[0]);
},
original: function (a, b) {
return true;
}
}; // bars domain
const getMappedDataPieChar = (data, mapping, dataTypes, dimensions) => {
  // define aggregators
  // as we are working on a multiple dimension (bars), `getDimensionAggregator` will return an array of aggregator functions
  // the order of aggregators is the same as the value of the mapping
  const arcsAggregators = getDimensionAggregator('arcs', mapping, dataTypes, dimensions); // we will use rollup to populate a flat array of objects
  // that will be passed to the render
  if (mapping.series === undefined) {
    mapping.series = {
      value: undefined
    };
  }
  let results = [];
  rollups(data, v => {
    let item = {
      series: v[0][mapping.series.value]
    };
    mapping.arcs.value.forEach((arcName, i) => {
      // getting i-th aggregator
      const aggregator = arcsAggregators[i]; // use it

      item[arcName] = aggregator(v.map(d => d[arcName]));
    });
    results.push(item);
  }, d => d[mapping.series.value] // series grouping
  );
  return results;
};
const getMappedDataBarChar = (data, mapping, dataTypes, dimensions) => {
const colorAggregator = getDimensionAggregator('color', mapping, dataTypes, dimensions);
const sizeAggregator = getDimensionAggregator('size', mapping, dataTypes, dimensions); // add the non-compulsory dimensions.
mapping.color = {
value: undefined
};
mapping.series = {
  value: undefined
};
mapping.size = {
value: undefined
};
let results = [];
rollups(data, v => {
const item = {
series: v[0][mapping.series.value],
// get the first one since it's grouped
bars: v[0][mapping.bars.value],
// get the first one since it's grouped
size: mapping.size.value ? sizeAggregator(v.map(d => d[mapping.size.value])) : v.length,
// aggregate. If not mapped, give 1 as size
color: mapping.color.value ? colorAggregator(v.map(d => d[mapping.color.value])) : 'default' // aggregate, by default single color.

};
results.push(item);
return item;
}, d => d[mapping.series.value], // series grouping
d => d[mapping.bars.value].toString() // bars grouping. toString() to enable grouping on dates
);
return results;
}
function getChartOptions$3 (visualOptions, datachart, mapping, dataTypes, dimensions){
  console.log('getChartOptionsvisualOptions', visualOptions)
console.log('getChartOptionsdatachart', datachart)
console.log('getChartOptionsmapping', mapping)
const resultMap = getMappedDataPieChar(datachart,mapping, dataTypes,dimensions)
resultMap.forEach(d => {
  // compute the total value for each pie
  d.totalValue = sum(mapping.arcs.value.map(arc => d[arc]));
});
console.log('getChartOptionsresultMap', resultMap)
// const arcsSize = mapping.arcs.value.map(arc => ({
//   name: arc,
//   value: sum(resultMap.map(d => d[arc]))
// })); // sort it, will be used later
const filas = visualOptions.rowsNumber;
const spam = Math.max((Math.floor(100 / Math.ceil(resultMap.length/filas))-10),6)
console.log('spam', spam)
const regforraw = Math.ceil(resultMap.length/filas)
console.log('regforraw', regforraw)
var spamfilas = 100/filas-10;
console.log('calculo spamfilas', spamfilas)

var countreg = 0
var left = 0;
var top = 0;
function calculoradio(radius) {
  if (visualOptions.drawDonut) {
    return [radius - visualOptions.arcTichkness + '%', visualOptions.arcTichkness + '%']
  } else {
    return radius + '%'
  }
}
const pieSeries = resultMap.map(function (item, index) {
  console.log('pieSeriesitem', item)
  countreg= countreg +1;
  console.log('countreg', countreg)
  const map2 = new Map(Object.entries(item))
  const valuedentro = mapping.arcs.value.map(arc => ({
    name: arc,
    value: map2.get(arc)
  }));

  var total = resultMap.length
  var radius = spam
  var filastop = 50/filas;
  //left = (countreg <= regforraw) ? left + spam : 10
  if (countreg <= regforraw) {
    top = spamfilas
    left = left + spam
  } else {
    top = top + spamfilas
    spamfilas = top
    countreg = 0
    left = spam
  }
  //top = (index < regforraw) ? spamfilas: top+spamfilas
  left = total === 1 ? 50 : left
  top = (total === 1 || filas===1) ? 50 : top
  radius = total === 1 ? 95 : radius
  console.log('pieSeriesitemvaluedentroscountreg', countreg)
  console.log('pieSeriesitemvaluedentroindex', index)
  console.log('pieSeriesitemvaluedentrotop', top)
  console.log('pieSeriesitemvaluedentroleft', left)
  return {
    name: item.series,
    type: 'pie',
    id: item.series,
    title: {
      text: item.series,
      show: true
    },
    radius: calculoradio(radius),
    center: [left + '%', top + '%'],
    // label: {
    //   show: false
    // },
    // labelLine: {
    //   show: false
    // },
    emphasis: {
      focus: 'series',
      blurScope: 'coordinateSystem'
  },
    data: valuedentro,
    top: visualOptions.marginTop,
    left: visualOptions.marginLeft,
    right:visualOptions.marginRight,
    color: visualOptions.colorScale.userScaleValues.map(res =>res.range),
  };
});
console.log('pieSeries', pieSeries)
  return {
    legend: {
      show:visualOptions.showLegend,
      width:visualOptions.legendWidth, 
      orient:visualOptions.legendOrient,
      right:visualOptions.legendMarginRight,
      top:visualOptions.legendMarginTop

  },
  tooltip: {},//añadir a las opciones
  toolbox: {//añadir a las opciones
    show: visualOptions.showToolbox,
    feature: {
        saveAsImage: {},
        dataView: {
          title: 'Vista de datos'
      },
    }
  },
   series: [
    ...pieSeries,
  ],
};
}  
function getChartOptions$2 (visualOptions, datachart, mapping, dataTypes, dimensions){
console.log('getChartOptionsvisualOptions', visualOptions)
console.log('getChartOptionsdatachart', datachart)
console.log('getChartOptionsmapping', mapping)
const resultMap = getMappedDataBarChar(datachart,mapping, dataTypes,dimensions)
console.log('getMappedDataBarCharresultMap', resultMap)
const barsDomain = rollups(resultMap, v => sum(v, d => d.size), d => d.bars, d => d.colors).sort(barsSortings[visualOptions.totalAscending]); // add grid
console.log('getChartOptionsbarsDomain', barsDomain)

return {
  legend: {
      show:visualOptions.showLegend,
      width:visualOptions.legendWidth, 
      orient:visualOptions.legendOrient,
      right:visualOptions.legendMarginRight,
      top:visualOptions.legendMarginTop


  },
  tooltip: {},//añadir a las opciones
  toolbox: {//añadir a las opciones
    show: visualOptions.showToolbox,
    feature: {
        saveAsImage: {},
        dataView: {
          title: 'Vista de datos'
      },
    }
},
  xAxis:getxAxis(visualOptions,datachart, resultMap),
  yAxis:getyAxis(visualOptions,datachart, resultMap),
   series: [{
      name: mapping.bars.value[0],
      type: 'bar',
      data: resultMap.map(res =>res.size),
      //añadir a las opciones
      //showBackground: true,
      // backgroundStyle: {
      //     color: visualOptions.background
      //   }
   }],
   color: visualOptions.colorScale.defaultColor
};
}
