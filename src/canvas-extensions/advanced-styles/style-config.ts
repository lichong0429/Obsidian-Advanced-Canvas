import { CanvasNodeType } from "src/@types/AdvancedJsonCanvas"
import TextHelper from "src/utils/text-helper"

export interface StyleAttributeOption {
  icon: string
  label: string
  value: string | null // The element with the null value is the default
}

export interface StyleAttribute {
  key: string
  icon?: string
  label: string
  nodeTypes?: CanvasNodeType[]
  options: StyleAttributeOption[]
}

export function styleAttributeValidator(json: Record<string, unknown>): StyleAttribute | null {
  const hasKey = json.key !== undefined
  const hasLabel = json.label !== undefined
  const hasOptions = Array.isArray(json.options)

  if (!hasKey) console.error('样式属性缺少 “key” 字段')
  if (!hasLabel) console.error('样式属性缺少 “label” 字段')
  if (!hasOptions) console.error('样式属性缺少 “options” 字段，或该字段不是数组')

  json.key = TextHelper.toCamelCase(json.key as string)

  let optionsValid = true
  let hasDefault = false
  for (const option of json.options as Record<string, unknown>[]) {
    const hasIcon = option.icon !== undefined
    const hasLabel = option.label !== undefined
    const hasValue = option.value !== undefined

    if (!hasIcon) console.error(`Style attribute option (${String(option.value ?? option.label)}) is missing the "icon" property`)
    if (!hasLabel) console.error(`Style attribute option (${String(option.value)}) is missing the "label" property`)
    if (!hasValue) console.error(`Style attribute option (${String(option.label)}) is missing the "value" property`)

    if (!hasIcon || !hasLabel || !hasValue) optionsValid = false
    if (option.value === null) hasDefault = true
  }
  if (!hasDefault) console.error('样式属性缺少默认选项（value 为 null 的选项）')

  const isValid = hasKey && hasLabel && hasOptions && optionsValid && hasDefault
  return isValid ? json as unknown as StyleAttribute : null
}

export const BUILTIN_NODE_STYLE_ATTRIBUTES: StyleAttribute[] = [
  {
    key: 'textAlign',
    icon: 'align-left',
    label: '文本对齐',
    nodeTypes: ['text'],
    options: [
      {
        icon: 'align-left',
        label: '左',
        value: null
      },
      {
        icon: 'align-center',
        label: '中',
        value: 'center'
      },
      {
        icon: 'align-right',
        label: '右',
        value: 'right'
      }
    ]
  },
  {
    key: 'shape',
    icon: 'shapes',
    label: '形状',
    nodeTypes: ['text'],
    options: [
      {
        icon: 'rectangle-horizontal',
        label: '圆角矩形',
        value: null
      },
      {
        icon: 'shape-pill',
        label: '胶囊形',
        value: 'pill'
      },
      {
        icon: 'diamond',
        label: '菱形',
        value: 'diamond'
      },
      {
        icon: 'shape-parallelogram',
        label: '平行四边形',
        value: 'parallelogram'
      },
      {
        icon: 'circle',
        label: '圆形',
        value: 'circle'
      },
      {
        icon: 'shape-predefined-process',
        label: '预定义流程',
        value: 'predefined-process'
      },
      {
        icon: 'shape-document',
        label: '文档',
        value: 'document'
      },
      {
        icon: 'shape-database',
        label: '数据库',
        value: 'database'
      }
    ]
  },
  {
    key: 'border',
    icon: 'square-dashed-bottom',
    label: '边框',
    options: [
      {
        icon: 'border-solid',
        label: '实线',
        value: null
      },
      {
        icon: 'border-dashed',
        label: '虚线',
        value: 'dashed'
      },
      {
        icon: 'border-dotted',
        label: '点线',
        value: 'dotted'
      },
      {
        icon: 'eye-off',
        label: '不可见',
        value: 'invisible'
      }
    ]
  }
] satisfies StyleAttribute[]

export const BUILTIN_EDGE_STYLE_ATTRIBUTES: StyleAttribute[] = [
  {
    key: 'path',
    icon: 'path-solid',
    label: '路径样式',
    options: [
      {
        icon: 'path-solid',
        label: '实线',
        value: null
      },
      {
        icon: 'path-dotted',
        label: '点线',
        value: 'dotted'
      },
      {
        icon: 'path-short-dashed',
        label: '短虚线',
        value: 'short-dashed'
      },
      {
        icon: 'path-long-dashed',
        label: '长虚线',
        value: 'long-dashed'
      }
    ]
  },
  {
    key: 'arrow',
    icon: 'play',
    label: '箭头样式',
    options: [
      {
        icon: 'arrow-triangle',
        label: '三角形',
        value: null
      },
      {
        icon: 'arrow-triangle-outline',
        label: '三角轮廓',
        value: 'triangle-outline'
      },
      {
        icon: 'arrow-thin-triangle',
        label: '细三角',
        value: 'thin-triangle'
      },
      {
        icon: 'arrow-halved-triangle',
        label: '半三角',
        value: 'halved-triangle'
      },
      {
        icon: 'arrow-diamond',
        label: '菱形',
        value: 'diamond'
      },
      {
        icon: 'arrow-diamond-outline',
        label: '菱形轮廓',
        value: 'diamond-outline'
      },
      {
        icon: 'arrow-circle',
        label: '圆形',
        value: 'circle'
      },
      {
        icon: 'arrow-circle-outline',
        label: '圆形轮廓',
        value: 'circle-outline'
      },
      {
        icon: 'tally-1',
        label: '平头',
        value: 'blunt'
      }
    ]
  },
  {
    key: 'pathfindingMethod',
    icon: 'pathfinding-method-square',
    label: '寻路方式',
    options: [
      {
        icon: 'pathfinding-method-bezier',
        label: '贝塞尔',
        value: null
      },
      {
        icon: 'slash',
        label: '直线',
        value: 'direct'
      },
      {
        icon: 'pathfinding-method-square',
        label: '方形',
        value: 'square'
      },
      {
        icon: 'map',
        label: 'A*',
        value: 'a-star'
      }
    ]
  }
] satisfies StyleAttribute[]
