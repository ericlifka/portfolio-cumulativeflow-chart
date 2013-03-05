var MY_PORTFOLIO_ITEM_ID = 5103028089;

Ext.define('CFDChartApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    items: [
        {
            xtype: 'rallychart',

            storeType: 'Rally.data.lookback.SnapshotStore',
            storeConfig: {
                rawFind: {
                    '_TypeHierarchy': 'HierarchicalRequirement',
                    '_ItemHierarchy': MY_PORTFOLIO_ITEM_ID,
                    'Children': null,
                    '_ValidFrom': {
                        '$gte': '2012-04-01T00:00:00.000Z'
                    }
                },
                fetch: ['ScheduleState', 'PlanEstimate'],
                hydrate: ['ScheduleState']
            },

            calculatorType: 'CFDCalculator',
            calculatorConfig: {
                scheduleStates: ['Idea', 'Defined', 'In-Progress', 'Completed', 'Accepted', 'Released'],
                chartAggregationType: 'storycount'
            },

            chartColors: [],

            chartConfig: {
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: 'Cumulative Flow Diagram'
                },
                xAxis: {
                    tickmarkPlacement: 'on',
                    tickInterval: 20,
                    title: {
                        text: 'Days'
                    }
                },
                yAxis: [
                    {
                        title: {
                            text: 'Count'
                        }
                    }
                ],
                plotOptions: {
                    series: {
                        marker: {
                            enabled: false
                        }
                    },
                    area: {
                        stacking: 'normal'
                    }
                }
            }
        }
    ]
});
