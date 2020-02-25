import React, { Component } from 'react';
import './App.css';
import { Provider, connect } from 'react-redux';
import { createStore } from'redux';
import marked from "marked";

// Redux
const ADD = "ADD";

const addText = (text) => {
  return {
  type: ADD,
  text: text
  }
};

const defaultState = {
  text: `# Welcome to my React Markdown Previewer
  ## This is a sub-heading...
  ### And here's some other cool stuff:
    
  Heres some code, \`<div></div>\`, between 2 back-ticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
    
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  
  There's also [links](https://www.freecodecamp.com), and
  > Block Quotes!
    
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbered lists too.
  1. Use just 1s if you want! 
  1. But the list goes on...
  - Even if you use dashes or asterisks.
  * And last but not least, let's not forget embedded images:
  
  ![React Logo w/ Text](https://goo.gl/Umyytc)
  `
};

const textReducer = (state = defaultState, action) => { 
  switch(action.type) {
    case ADD:
    return Object.assign({},state, { text: action.text })
    default:
    return state
  }
};

const store = createStore(textReducer);

// React
 class App extends Component {
  constructor(props){
    super(props)
  this.handleChange = this.handleChange.bind(this);
  
};

  handleChange(e){
    this.props.addText(e.target.value)
  };
  
  render(){
    return(
      <div className="App-header">
        <h1 className="App-title">Editor</h1>
       <textarea  id="editor" className="App-editor" value={this.props.text} onChange={this.handleChange}></textarea>
       <h1 className="App-title">Previewer</h1>
       <div id="preview" className="App-preview" dangerouslySetInnerHTML={ {__html: marked(this.props.text,{sanitize: true, breaks: true}) } }></div>
      </div>
    )
  }
};


// React-Redux
const mapStateToProps = (state) => {
  return {
    text: state.text
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addText: (text) => { 
      dispatch(addText(text))
    }
  }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

// eslint-disable-next-line
export default class AppWrapper extends Component {
  render() {
    return(
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
};