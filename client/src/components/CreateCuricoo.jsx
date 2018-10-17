import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap/lib'
import { withAuthenticator } from 'aws-amplify-react';
import { inject }  from 'mobx-react'

class CreateCuricoo extends Component {
  handleSubmit = evt => {
    evt.preventDefault();
    
    const curricooData = {
      title: this.title.value,
      description: this.description.value,
      ownerId: this.props.userStore.user.attributes.sub
    }

    // TODO: handle properly
    this.props.curricoosStore.createCurricoo(curricooData)
      .then(curricooId => {
        if (curricooId) {
          this.props.handleClose();
          this.props.history.push(`/curricoos/${curricooId}`);
        }
      });
  }

  render() {
    return (
      <Modal 
        show={this.props.show} 
        onHide={this.props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a new Curricoo</Modal.Title>
        </Modal.Header>

        <Form onSubmit={this.handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="createCurricoo.title">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Javascript for musicians" 
                ref={title => this.title = title}
                required
              />
            </Form.Group>
            <Form.Group controlId="createCurricoo.description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                ref={description => this.description = description}
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
    )
  }
}

const ConnectedCreateCuricoo = inject(
  'curricoosStore',
  'userStore'
)(CreateCuricoo);
export default withAuthenticator(ConnectedCreateCuricoo);