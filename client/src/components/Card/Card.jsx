import React from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';

import './Card.css';

const Modal = ({ visible, onYesClicked, onNoClicked }) =>
  visible ? (
    <div className="modal__concent">
      <span>Are you sure?</span>
      <button type="button" onClick={onYesClicked}>
        Yes
      </button>
      <button type="button" onClick={onNoClicked}>
        No
      </button>
    </div>
  ) : null;

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showSubMenu: false,
    };
  }

  render() {
    const { data, onDoneClicked, onRemoveCard } = this.props;
    const { showModal } = this.state;

    return (
      <div
        className="card"
        onMouseLeave={() => this.setState({ showModal: false })}
      >
        <Modal
          visible={showModal}
          onYesClicked={() => {
            this.setState({ showModal: false });
            return onRemoveCard(data.id);
          }}
          onNoClicked={() => this.setState({ showModal: false })}
        />
        <div className="card__info--hover">
          {/* <ReactSVG
            className="card__action card__action--add"
            src={`${process.env.PUBLIC_URL}/add.svg`}
          /> */}
          <ReactSVG
            className="card__action card__action--done"
            src={`${process.env.PUBLIC_URL}/done.svg`}
            onClick={() => this.setState({ showModal: true })}
          />
          <ReactSVG
            className="card__action card__action--remove"
            src={`${process.env.PUBLIC_URL}/remove.svg`}
            onClick={() => this.setState({ showModal: true })}
          />
        </div>
        <div
          className="card__img"
          style={{ backgroundImage: `url(${data.image})` }}
        />
        <a href="#" className="card__link">
          <div
            className="card__img--hover"
            style={{ backgroundImage: `url(${data.image})` }}
          />
        </a>
        <div className="card__info">
          <h3 className="card__title">{data.name}</h3>
          <span className="card__rating">{data.rating}</span>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  data: PropTypes.object,
  onDoneClicked: PropTypes.func,
  onRemoveCard: PropTypes.func,
};

export default Card;
