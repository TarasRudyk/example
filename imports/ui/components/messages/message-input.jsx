import React from 'react';

import { EditorState, Modifier, convertToRaw, SelectionState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import 'draft-js-mention-plugin/lib/plugin.css';

const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin];

export default class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      suggestions: this.props.mentions
    };

    this.mentionUsers = [];

    this.onChange = this.onChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onAddMention = this.onAddMention.bind(this);
    this.focus = this.focus.bind(this);
  }

  onSearchChange({ value }) {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, this.props.mentions)
    });
  }

  onAddMention(mention) {
    const [, link] = mention;
    const userId = link[1].split('/profile/')[1];

    if (!this.mentionUsers.includes(userId)) {
      this.mentionUsers.push(userId);
    }
  }

  onChange(editorState) {
    this.setState({
      editorState
    });
  }

  focus() {
    this.editor.focus();
  }

  handleOnSubmit(event) {
    event.preventDefault();
    let content = this.state.editorState.getCurrentContent();
    if (content.hasText()) {
      const rawContent = convertToRaw(content);
      const message = {
        content: rawContent,
        mentionUsers: this.mentionUsers
      };

      this.props.onSubmit(message);

      this.mentionUsers = [];

      let { editorState } = this.state;
      const firstBlock = content.getFirstBlock();
      const lastBlock = content.getLastBlock();
      const allSelected = new SelectionState({
        anchorKey: firstBlock.getKey(),
        anchorOffset: 0,
        focusKey: lastBlock.getKey(),
        focusOffset: lastBlock.getLength(),
        hasFocus: true
      });
      content = Modifier.removeRange(content, allSelected, 'backward');
      editorState = EditorState.push(editorState, content, 'remove-range');
      this.setState({
        editorState
      });
    }
  }

  render() {
    return (this.props.disabled ?
      <div className="message-input">
        <div className="editor-container">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.state.suggestions}
            onAddMention={this.onAddMention}
          />
        </div>
        <button onClick={this.handleOnSubmit}>Send</button>
      </div> : <div>You can not write messages here</div>
    );
  }
}

MessageInput.propTypes = {
  // initialData: React.PropTypes.string,
  onSubmit: React.PropTypes.func,
  // onChange: React.PropTypes.func,
  disabled: React.PropTypes.bool,
  mentions: React.PropTypes.object
};
