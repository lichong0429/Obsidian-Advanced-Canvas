import { Canvas, CanvasNode } from 'src/@types/Canvas'
import CanvasExtension from './canvas-extension'
import { Menu } from 'obsidian'
import { AbstractSelectionModal } from 'src/utils/modal-helper'

export default class NodeRatioCanvasExtension extends CanvasExtension {
  isEnabled() { return true }

  init() {
    this.plugin.registerEvent(this.plugin.app.workspace.on(
      'canvas:node-menu',
      (menu: Menu, node: CanvasNode) => this.onNodeMenu(menu, node)
    ))

    this.plugin.registerEvent(this.plugin.app.workspace.on(
      'advanced-canvas:node-resized',
      (canvas: Canvas, node: CanvasNode) => this.onNodeResized(canvas, node)
    ))
  }

  private onNodeMenu(menu: Menu, node: CanvasNode) {
    if (!this.plugin.settings.getSetting('aspectRatioControlFeatureEnabled')) return

    menu.addItem((item) => {
      item.setTitle('设置宽高比')
        .setIcon('aspect-ratio')
        .onClick(async () => {
          const NO_RATIO = '不强制宽高比'
          const newRatioString = await new AbstractSelectionModal(this.plugin.app, '输入宽高比（宽:高）', ['16:9', '4:3', '3:2', '1:1', NO_RATIO])
            .promise

          const nodeData = node.getData()

          // Remove the ratio if the user selected "不强制宽高比"
          if (newRatioString === NO_RATIO) {
            node.setData({
              ...nodeData,
              ratio: undefined
            })

            return
          }

          // Otherwise, parse the ratio and set it
          const [width, height] = newRatioString.split(':').map(Number)
          if (width && height) {
            node.setData({
              ...nodeData,
              ratio: width / height
            })

            node.setData({
              ...node.getData(),
              width: nodeData.height * (width / height),
            })
          }
        })
    })
  }

  private onNodeResized(_canvas: Canvas, node: CanvasNode) {
    const nodeData = node.getData()
    if (!nodeData.ratio) return

    const nodeSize = { width: node.width, height: node.height }
    const nodeAspectRatio = nodeSize.width / nodeSize.height

    if (nodeAspectRatio < nodeData.ratio)
      nodeSize.width = nodeSize.height * nodeData.ratio
    else nodeSize.height = nodeSize.width / nodeData.ratio

    node.setData({
      ...nodeData,
      width: nodeSize.width,
      height: nodeSize.height
    })
  }
}
