import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { Button, Card, CardColumns } from 'react-bootstrap/lib';
import CreateCurricooModal from './CreateCuricoo';
import { observer, inject }  from 'mobx-react';

class Home extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  constructor(props) {
    super(props);

    if (props.curricoosStore.curricoos.length === 0) {
      props.curricoosStore.fetchCurricoos();
    }

    this.state = {
      isCreateCurricooOpen: false
    };
  }

  handleCloseCreateCurricoo = () => {
    this.setState({ isCreateCurricooOpen: false });
  }

  showCreateCurricoo = () => {
    this.setState({ isCreateCurricooOpen: true });
  }
  
  renderCurricoos = () => {
    const curricoos = this.props.curricoosStore.curricoos.map(curricoo => 
      <Card style={{ width: '18rem', margin: '1rem' }} key={curricoo.id}>
        <Card.Body>
          <Card.Title>{ curricoo.title }</Card.Title>
          <Card.Text>{ curricoo.description }</Card.Text>
          <Card.Link href='#' onClick={() => this.viewCurricoo(curricoo.id)}>Explore</Card.Link>
        </Card.Body>
      </Card>
    );

    return <CardColumns>{curricoos}</CardColumns>;
  }

  viewCurricoo = curricooId => {
    this.props.curricoosStore.setCurrentCurricoo(curricooId);
    this.props.history.push(`/curricoos/${curricooId}`);
  }

  render() {
    return (
      <div>
        {this.renderCurricoos()}
        <Button 
          variant="success" 
          size="lg" 
          onClick={this.showCreateCurricoo}
        >
          Create a new Curricoo
        </Button>
        <CreateCurricooModal 
          show={this.state.isCreateCurricooOpen} 
          handleClose={this.handleCloseCreateCurricoo}
          history={this.props.history}
        />
      </div>
    );
  }
}

const ConnectedHome = inject(
  'curricoosStore'
)(observer(Home));

export default ConnectedHome;