import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap/lib';
import { shorten } from '../utils/string';

function CurricooCard({ 
  curricoo: { id, title, description }, 
  viewCurricoo
}) {
  return (
    <Card style={{ maxWidth: '18rem', maxHeight: '20rem' }} >
      <Card.Body>
        <Card.Title>{ shorten(title, 50) }</Card.Title>
        <Card.Text>{ shorten(description, 200) }</Card.Text>
        <Card.Link
          href='#' 
          onClick={() => viewCurricoo(id)}
          style={{ float: 'right', paddingBottom: '0.85rem' }}
        >
          Explore
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

CurricooCard.propTypes = {
  curricoo: PropTypes.object.required,
  viewCurricoo: PropTypes.func.required
};

export default CurricooCard;

