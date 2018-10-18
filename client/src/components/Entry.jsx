import React, { Component } from 'react'
import { Card, Collapse } from 'react-bootstrap/lib';

export default class Entry extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       open: false
    }
  }
  
  render() {
    const open = this.state.open;
    const entry = this.props.entry;

    return (
      <Card>
        <Card.Header
          as="h5"
          onClick={() => this.setState({ open: !open })}
          aria-controls={entry.id}
          aria-expanded={open}
        >
          { entry.title }
        </Card.Header>
        <Collapse in={open}>
          <Card.Body>
            <div id={entry.id}>
              <h1>{ entry.title }</h1>
              <h3>{ entry.type }</h3>
              <h3><a href={entry.url}>{ entry.url }</a></h3>
              <p>{ entry.notes }</p>
            </div>
          </Card.Body>
        </Collapse>
      </Card>
    )
  }
}
