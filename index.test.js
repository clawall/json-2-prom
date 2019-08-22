const json2Prom = require('./index')
const example = require('./example.json')

describe('Test cases invoking without options.', () => {
    it('Should work with a fully correct example.', () => {
        const expected = [
            "# HELP cowboy_errors_total Total number of Cowboy request errors.",
            "# TYPE cowboy_errors_total counter",
            "# HELP cowboy_early_errors_total Total number of Cowboy early errors.",
            "# TYPE cowboy_early_errors_total counter",
            "cowboy_early_errors_total 0",
            "# HELP rabbitmq_exchange_messages_published_out_total Count of messages published \"out\" of an exchange, i.e. taking account of routing.",
            "# TYPE rabbitmq_exchange_messages_published_out_total counter",
            "rabbitmq_exchange_messages_published_out_total{vhost: \"/\", exchange: \"MY_EXCHANGE\", type: \"headers\"} 0",
            "rabbitmq_exchange_messages_published_out_total{vhost: \"/\", exchange: \"ANOTHER_EXCHANGE\", type: \"x-delayed-message\"} 0"
        ]

        expect(json2Prom(example)).toEqual(expect.arrayContaining(expected))
    })

    it('Should work with an object as argument.', () => {
        const arg = {
            "name": "cowboy_errors_total",
            "help": "Total number of Cowboy request errors.",
            "type": "COUNTER",
            "metrics": []
        }

        expect(json2Prom(arg)).toEqual(expect.arrayContaining([
            "# HELP cowboy_errors_total Total number of Cowboy request errors.",
            "# TYPE cowboy_errors_total counter"
        ]))
    })

    it('Should work without help.', () => {
        const arg = {
            "name": "cowboy_errors_total",
            "type": "COUNTER",
            "metrics": [{
                "value": 10
            }]
        }

        expect(json2Prom(arg)).toEqual(expect.arrayContaining([
            "# TYPE cowboy_errors_total counter",
            "cowboy_errors_total 10"
        ]))
    })

    it('Should work without type.', () => {
        const arg = {
            "name": "cowboy_errors_total",
            "help": "Total number of Cowboy request errors.",
            "metrics": [{
                "value": 10
            }]
        }

        expect(json2Prom(arg)).toEqual(expect.arrayContaining([
            "# HELP cowboy_errors_total Total number of Cowboy request errors.",
            "cowboy_errors_total 10"
        ]))
    })

    it('Should work without type or help.', () => {
        const arg = {
            "name": "cowboy_errors_total",
            "metrics": [{
                "value": 10
            }]
        }

        expect(json2Prom(arg)).toEqual(expect.arrayContaining([
            "cowboy_errors_total 10"
        ]))
    })

    it('Should work without type, help or metric.', () => {
        const arg = {
            "name": "cowboy_errors_total"
        }

        expect(json2Prom(arg)).toEqual(expect.arrayContaining([]))
    })

    it('Should work with an empty object.', () => {
        expect(json2Prom({})).toEqual(expect.arrayContaining([]))
    })
})

describe('Test cases invoking with options set.', () => {
    it('Should work with a fully correct example.', () => {
        const expected = [
            "# HELP cowboy_errors_total Total number of Cowboy request errors.",
            "# TYPE cowboy_errors_total counter",
            "# HELP cowboy_early_errors_total Total number of Cowboy early errors.",
            "# TYPE cowboy_early_errors_total counter",
            "cowboy_early_errors_total{app_name: \"my_app\", another: \"label\"} 0",
            "# HELP rabbitmq_exchange_messages_published_out_total Count of messages published \"out\" of an exchange, i.e. taking account of routing.",
            "# TYPE rabbitmq_exchange_messages_published_out_total counter",
            "rabbitmq_exchange_messages_published_out_total{app_name: \"my_app\", another: \"label\", vhost: \"/\", exchange: \"MY_EXCHANGE\", type: \"headers\"} 0",
            "rabbitmq_exchange_messages_published_out_total{app_name: \"my_app\", another: \"label\", vhost: \"/\", exchange: \"ANOTHER_EXCHANGE\", type: \"x-delayed-message\"} 0"
        ]

        expect(json2Prom(example, { defaultLabels: { 'app_name': 'my_app', another: 'label' } })).toEqual(expect.arrayContaining(expected))
    })

    it('Should work with an object as argument.', () => {
        const arg = {
            "name": "cowboy_errors_total",
            "help": "Total number of Cowboy request errors.",
            "type": "COUNTER",
            "metrics": []
        }

        expect(json2Prom(arg, { defaultLabels: { 'app_name': 'my_app' } })).toEqual(expect.arrayContaining([
            "# HELP cowboy_errors_total Total number of Cowboy request errors.",
            "# TYPE cowboy_errors_total counter"
        ]))
    })

    it('Should work without help.', () => {
        const arg = {
            "name": "cowboy_errors_total",
            "type": "COUNTER",
            "metrics": [{
                "value": 10
            }]
        }

        expect(json2Prom(arg, { defaultLabels: { 'app_name': 'my_app' } })).toEqual(expect.arrayContaining([
            "# TYPE cowboy_errors_total counter",
            "cowboy_errors_total{app_name: \"my_app\"} 10"
        ]))
    })

    it('Should work without type.', () => {
        const arg = {
            "name": "cowboy_errors_total",
            "help": "Total number of Cowboy request errors.",
            "metrics": [{
                "value": 10
            }]
        }

        expect(json2Prom(arg, { defaultLabels: { 'app_name': 'my_app' } })).toEqual(expect.arrayContaining([
            "# HELP cowboy_errors_total Total number of Cowboy request errors.",
            "cowboy_errors_total{app_name: \"my_app\"} 10"
        ]))
    })

    it('Should work without type or help.', () => {
        const arg = {
            "name": "cowboy_errors_total",
            "metrics": [{
                "value": 10
            }]
        }

        expect(json2Prom(arg, { defaultLabels: { 'app_name': 'my_app' } })).toEqual(expect.arrayContaining([
            "cowboy_errors_total{app_name: \"my_app\"} 10"
        ]))
    })

    it('Should work without type, help or metric.', () => {
        const arg = {
            "name": "cowboy_errors_total"
        }

        expect(json2Prom(arg, { defaultLabels: { 'app_name': 'my_app' } })).toEqual(expect.arrayContaining([]))
    })

    it('Should work with an empty object.', () => {
        expect(json2Prom({}, { defaultLabels: { 'app_name': 'my_app' } })).toEqual(expect.arrayContaining([]))
    })
})