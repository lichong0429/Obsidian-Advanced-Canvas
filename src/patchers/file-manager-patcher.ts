import { DataWriteOptions, TFile } from "obsidian"
import Patcher, { invoke } from "./patcher"

export default class FileManagerPatcher extends Patcher {
  protected async patch() {
    if (!this.plugin.settings.getSetting('canvasMetadataCompatibilityEnabled')) return

    const that = this // eslint-disable-line @typescript-eslint/no-this-alias -- For patcher
    Patcher.patch(this.plugin, this.plugin.app.fileManager, {
      processFrontMatter: Patcher.OverrideExisting(next => async function (file: TFile, fn: (frontmatter: unknown) => void, options?: DataWriteOptions) {
        // Check if the file is a canvas file
        if (file?.extension === 'canvas') {
          that.plugin.app.vault.process(file, (data: string) => {
            const content = JSON.parse(data) as { metadata: { frontmatter: unknown } }

            fn(content.metadata.frontmatter)

            return JSON.stringify(content, null, 2)
          }).catch(() => console.error("无法更新白板文件中的元数据对象。"))

          return
        }

        // Otherwise, call the original method
        return invoke(next, this, file, fn, options)
      }),
    })
  }
}
