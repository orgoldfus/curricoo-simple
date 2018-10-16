import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap/lib';
import CreateCurricooModal from './CreateCuricoo';

export default class Home extends Component {
  static propTypes = {
    prop: PropTypes
  }

  constructor(props) {
    super(props);
    this.state = {
      isCreateCurricooOpen: false
    };
  }

  handleCloseCreateCurricoo = () => {
    this.setState({ isCreateCurricooOpen: false })
  }

  showCreateCurricoo = () => {
    this.setState({ isCreateCurricooOpen: true })
  }

  render() {
    const show = this.state.isCreateCurricooOpen;
    return (
      <div>
        <Button 
          variant="success" 
          size="lg" 
          onClick={this.showCreateCurricoo}
        >
          Create a new Curricoo
        </Button>
        <CreateCurricooModal 
          show={show} 
          handleClose={this.handleCloseCreateCurricoo}
        />
      </div>
    )
  }
}
