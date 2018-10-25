import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, CardColumns } from 'react-bootstrap/lib';
import { observer, inject }  from 'mobx-react';
import {
  CurricooCard,
  CreateCurricoo as CreateCurricooModal
} from '../components';

class Home extends Component {
  constructor(props) {
    super(props);

    if (props.curricoosStore.curricoos.length <= 1) {
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

  viewCurricoo = curricooId => {
    this.props.curricoosStore.setCurrentCurricoo(curricooId);
    this.props.history.push(`/curricoos/${curricooId}`);
  }

  render() {
    const { userStore, curricoosStore, history } = this.props;
    const { isCreateCurricooOpen } = this.state;
    return (
      <div style={{ backgroundColor: '#f4f7f9', padding: '1.5rem 1rem' }}>
        <CardColumns>
          {curricoosStore.curricoos.map(curricoo => 
            <CurricooCard
              key={curricoo.id}
              curricoo={curricoo}
              viewCurricoo={this.viewCurricoo}
            />
          )}
        </CardColumns>
        <Button 
          variant="success" 
          size="lg" 
          onClick={this.showCreateCurricoo}
        >
          Create a new Curricoo
        </Button>
        {(userStore.isUserConnected || isCreateCurricooOpen) && 
        <CreateCurricooModal 
          show={isCreateCurricooOpen} 
          handleClose={this.handleCloseCreateCurricoo}
          history={history}
        />}
      </div>
    );
  }
}

Home.propTypes = {
  curricoosStore: PropTypes.object,
  userStore: PropTypes.object,
  history: PropTypes.object
};

const ConnectedHome = inject(
  'curricoosStore',
  'userStore'
)(observer(Home));

export default ConnectedHome;