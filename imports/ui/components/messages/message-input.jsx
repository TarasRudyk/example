import React from 'react';

import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';

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

  onAddMention() {
    // get the mention object selected
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
    // this.props.onSubmit(this.state.value);
  }

  render() {
    return (this.props.disabled ?
      <div className="message-input">
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
        <button onClick={this.handleOnSubmit}>Send</button>
      </div> : <div>You can not write messages here</div>
    );
  }
}

MessageInput.propTypes = {
  // initialData: React.PropTypes.string,
  // onSubmit: React.PropTypes.func,
  // onChange: React.PropTypes.func,
  disabled: React.PropTypes.bool,
  mentions: React.PropTypes.object
};
