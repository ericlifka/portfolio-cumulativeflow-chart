Ext.define('CFDCalculator', {
    extend: 'Rally.data.lookback.calculator.TimeSeriesCalculator',

    _buildDerivedFieldOnState: function (state) {
        var self = this;

        return {
            "as": state,
            "f": function (snapshot) {
                return snapshot.ScheduleState === state ? 1 : 0;
            }
        };
    },

    getDerivedFieldsOnInput: function () {
        var self = this,
            derivedFields = [];

        for (var i = 0, length = this.config.scheduleStates.length; i < length; i += 1) {
            var derivedField = this._buildDerivedFieldOnState(this.config.scheduleStates[i]);
            derivedFields.push(derivedField);
        }

        return derivedFields;
    },

    getMetrics: function () {
        var metrics = [],
            scheduleStates = this.config.scheduleStates;

        for (var i = 0, length = scheduleStates.length; i < length; i += 1) {
            var state = scheduleStates[i];
            metrics.push({
                "field": state,
                "as": state,
                "f": "sum",
                "display": "area"
            });
        }

        return metrics;
    }
});