import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GitHubIcon from '@material-ui/icons/GitHub';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: "70%",
    top: '10%',
    left: "15%",
    textAlign: 'center',
    backgroundColor: "#242127",
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: '80vh',
    overflowY: 'scroll',
  },
  close:{
    position: 'fixed',
    right: 20,
    top: 20,
  },
  icon:{
    width: '40px',
    height: '40px',
  }
}));

const ModalWrapper = ({open, handleClose, title, children, url}) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      <div style={modalStyle} style={{width: "100%"}}>
      <div className={classes.paper}>
        <div >
          <IconButton
            onClick={handleClose}
            className={classes.close}
          >
            <CloseIcon className={classes.icon}/>
          </IconButton>

          <div style={{fontSize: "27px", fontWeight: 600, margin: "30px 0"}}>
            {title}
            <a  className="sns"target='_brank' href={url}>
            <GitHubIcon/>
            </a>
          </div>
            {children}
          </div>
        </div>

        </div>
      </Modal>
    )
}

export default ModalWrapper
