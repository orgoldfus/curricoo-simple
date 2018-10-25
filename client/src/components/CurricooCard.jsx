import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap/lib';
import { shorten } from '../utils/string';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CardWrapper = styled(Card)`
  max-width: 18rem;
  max-height: 20rem;
`;

function CurricooCard({ 
  curricoo: { id, title, description }
}) {
  return (
    <CardWrapper>
      <Card.Body>
        <Card.Title>{ shorten(title, 50) }</Card.Title>
        <Card.Text>{ shorten(description, 200) }</Card.Text>
        <Link
          to={`/curricoos/${id}`}
          style={{ float: 'right', paddingBottom: '0.85rem' }}
        >
          Explore
        </Link>
      </Card.Body>
    </CardWrapper>
  );
}

CurricooCard.propTypes = {
  curricoo: PropTypes.object.required,
  viewCurricoo: PropTypes.func.required
};

export default CurricooCard;

