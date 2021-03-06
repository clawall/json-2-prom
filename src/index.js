const flattenDeep = require('lodash/flattenDeep')
const get = require('lodash/get')
const has = require('lodash/has')
const isEmpty = require('lodash/isEmpty')
const lowerCase = require('lodash/lowerCase')
const replace = require('lodash/replace')
const stringifyObject = require('stringify-object')

const promLabelRegex = /:\s/gm
const promLabelSepRegex = /,\s/gm

const extractLabels = (labels) => (!isEmpty(labels)
  ? stringifyObject(labels, {
    singleQuotes: false,
    inlineCharacterLimit: Number.MAX_SAFE_INTEGER
  })
  : '')

const convertSingleMetric = (name, metric, options) => {
  const defaultLabels = get(options, 'defaultLabels', {})

  const labels = {
    ...defaultLabels,
    ...get(metric, 'labels', {})
  }

  const extracted = extractLabels(labels)
  const finalLabel = replace(replace(extracted, promLabelRegex, '='), promLabelSepRegex, ',')

  if (get(options, 'isSummary', false)) {
    return [`${name}_sum${finalLabel} ${get(metric, 'sum')}`, `${name}_count${finalLabel} ${get(metric, 'count')}`]
  }

  return `${name}${finalLabel} ${get(metric, 'value')}`
}

const convertSingleAggregator = (aggr, options) => {
  let resultingLines = []
  const name = get(aggr, 'name', '')

  if (has(aggr, 'help')) {
    resultingLines = [...resultingLines, `# HELP ${name} ${get(aggr, 'help')}`]
  }

  if (has(aggr, 'type')) {
    resultingLines = [...resultingLines, `# TYPE ${name} ${lowerCase(get(aggr, 'type', ''))}`]

    if (get(aggr, 'type') === 'SUMMARY') {
      return [...resultingLines, ...(get(aggr, 'metrics', []).map((metric) => convertSingleMetric(name, metric, { ...options, isSummary: true })))]
    }
  }

  return [...resultingLines, ...(get(aggr, 'metrics', []).map((metric) => convertSingleMetric(name, metric, options)))]
}

const json2Prom = (promJson, options) => {
  if (Array.isArray(promJson)) {
    return flattenDeep(promJson.map((metric) => convertSingleAggregator(metric, options)))
  }

  return flattenDeep([convertSingleAggregator(promJson, options)])
}

module.exports = json2Prom
