# json-2-prom
[![npm version](https://badge.fury.io/js/json-2-prom.svg)](https://www.npmjs.com/package/json-2-prom)&middot;![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

Converts prom2json's format back to prometheus text.
---

The result of this function is an array containing each line of the resulting prometheus format.

## Usage:
```javascript
const json2Prom = require('./json-2-prom')

const prometheusFormat = json2Prom({
            "name": "cowboy_errors_total",
            "help": "Total number of Cowboy request errors.",
            "type": "COUNTER",
            "metrics": []
        })

console.log(prometheusFormat)
//["# HELP cowboy_errors_total Total number of Cowboy request errors.", "# TYPE cowboy_errors_total counter"]
```

## Custom options
It's possible to increment the resulting Prometheus format.  Currently the only option available is to add constant labels to every metric:

## Usage:
```javascript
const json2Prom = require('./json-2-prom')

const options = {
    defaultLabels: {
        'app_name': 'my_app',
        another: 'label'
    }
}

const prometheusFormat = json2Prom({
            "name": "cowboy_errors_total",
            "help": "Total number of Cowboy request errors.",
            "metrics": [{
                "value": 10
            }]
        }, options)

console.log(prometheusFormat)
//["# HELP cowboy_errors_total Total number of Cowboy request errors.", "cowboy_errors_total{app_name: \"my_app\", another: \"label\"} 10"]
```