import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap/lib';
import { withAuthenticator } from 'aws-amplify-react';
import { inject }  from 'mobx-react';
const ENTRY_TYPES = ['Video', 'Blog', 'Article', 'Code Repo', 'Book', 'Podcast'];

class CreateEntry extends Component {
  handleSubmit = evt => {
    evt.preventDefault();
    
    const entryData = {
      curricooId: this.props.curricooId,
      index: this.props.newIndex,
      title: this.title.value.trim(),
      notes: this.notes.value.trim(),
      type: this.entryType.value,
      url: this.url.value.trim()
    };

    // TODO: handle properly
    this.props.curricoosStore.createEntry(entryData)
      .then(() => {
        this.props.handleClose();
      });
  }

  render() {
    return (
      <Modal 
        show={this.props.show} 
        onHide={this.props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a new Entry</Modal.Title>
        </Modal.Header>

        <Form onSubmit={this.handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="createEntry.title">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="How to paint a dog" 
                ref={title => this.title = title}
                required
              />
            </Form.Group>
            <Form.Group controlId="createEntry.url">
              <Form.Label>URL</Form.Label>
              <Form.Control 
                type="url" 
                placeholder="http://www.example.com" 
                ref={url => this.url = url}
                required
              />
            </Form.Group>
            <Form.Group controlId="createEntry.type">
              <Form.Label>Entry type</Form.Label>
              <Form.Control 
                as="select"
                ref={type => this.entryType = type}
              >
                { ENTRY_TYPES.map((type, idx) => <option key={idx}>{type}</option>) }
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="createEntry.notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                ref={notes => this.notes = notes}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary" 
              onClick={this.props.handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
            >
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

const ConnectedCreateEntry = inject(
  'curricoosStore',
  'userStore'
)(CreateEntry);
export default withAuthenticator(ConnectedCreateEntry);