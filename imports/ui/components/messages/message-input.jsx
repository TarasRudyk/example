import React from 'react';

import { EditorState, Modifier, convertToRaw, SelectionState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import 'draft-js-mention-plugin/lib/plugin.css';

const positionSuggestions = ({ state, props }) => {
  let transform;
  let transition;

  if (state.isActive && props.suggestions.size > 0) {
    transform = 'scaleY(1)';
    transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
  } else if (state.isActive) {
    transform = 'scaleY(0)';
    transition = 'all 0.25s cubic-bezier(.3,1,.2,1)';
  }

  return {
    transform,
    transition,
    marginTop: '-20px'
  };
};
const mentionPlugin = createMentionPlugin({
  positionSuggestions
});
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
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.state.suggestions}
            onAddMention={this.onAddMention}
          />
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
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
