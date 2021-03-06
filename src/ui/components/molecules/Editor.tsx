import React from "react"
import { connect } from "react-redux"
import { RootState } from "../../reducers"
import * as EditorActions from "../../reducers/editor"
import { EditorState } from "../../reducers/editor"
import { JavaScriptEditor } from "../atoms/JavaScriptEditor"
import { MarkdownEditor } from "../atoms/MarkdownEditor"

const selector = (state: RootState) => {
  return state.editor
}

const actions = {
  loadFile: EditorActions.loadFile,
  updateValue: EditorActions.updateValue
}

type Props = (typeof actions) & EditorState
type State = { value: string }

export const Editor = connect(
  selector,
  actions
)(
  class extends React.Component<Props, State> {
    render() {
      const key = this.props.filePath || "unknown"
      switch (this.props.fileType) {
        case "javascript": {
          return (
            <JavaScriptEditor
              key={key}
              initialValue={this.props.value || ""}
              onSave={newValue => {
                console.log("on save", newValue)
              }}
              onChange={async newValue => {
                if (this.props.filePath) {
                  this.props.updateValue(this.props.filePath, newValue)
                }
              }}
            />
          )
        }
        case "markdown": {
          return (
            <MarkdownEditor
              key={key}
              initialValue={this.props.value || ""}
              onSave={newValue => {
                console.log("on save", newValue)
                // this.setState({ editorValue: value })
              }}
              onChange={async newValue => {
                if (this.props.filePath) {
                  this.props.updateValue(this.props.filePath, newValue)
                }
              }}
            />
          )
        }
        case "text": {
          return (
            <MarkdownEditor
              key={key}
              initialValue={this.props.value || ""}
              onSave={newValue => {
                console.log("on save", newValue)
                // this.setState({ editorValue: value })
              }}
              onChange={async newValue => {
                if (this.props.filePath) {
                  this.props.updateValue(this.props.filePath, newValue)
                }
              }}
            />
          )
        }
        default: {
          return <span>"Loading..."</span>
        }
      }
    }
  }
)
