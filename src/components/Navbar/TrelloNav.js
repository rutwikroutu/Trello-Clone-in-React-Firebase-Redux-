import React, {useState, useEffect} from 'react';
import { connect, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppsIcon from '@material-ui/icons/Apps';
import { HomeOutlined } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Dialog from '@material-ui/core/Dialog';
import {Avatar} from '@material-ui/core';

import { logoutUser } from "../../actions";
import { createBoard, loadUserBoards } from '../../actions/';

function TrelloNav({backgroundColor, createBoard, loadUserBoards}) {
  const [open, setOpen] = useState(false);
  const [boardName, setBoardName] = useState('')
  const user = JSON.parse(localStorage.getItem('user'));

    const dispatch = useDispatch();
    const history = useHistory();

    function handleClose(){
      setOpen(false);
    };

    function handleSignOut(){
      dispatch(logoutUser());
      history.push('/signin');
    }
    
    function handleClickOpen() {
   setOpen(true);
    };

    function createNewBoard(e){
      e.preventDefault();
        createBoard(boardName);
        loadUserBoards();
        handleClose();
      }

    const useStyle = makeStyles((theme) => ({
        root: {
          display: 'flex',
          alignItems: 'center',
          marginBottom: theme.spacing(2),
          backgroundColor: backgroundColor,
          width: '100%',
          height: '45px',
          justifyContent: 'space-between',
          position: 'fixed',
          top: 0,
          zIndex: 2,
        },
        headerLeftSection: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        },
        headerButtonIcon: {
          backgroundColor: 'hsla(0,0%,100%,.3);',
          borderRadius: '5px',
          padding: '5px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '7px',
          paddingRight: '7px',
          margin: '2px',
          cursor: 'pointer',
          flexDirection:'row',
          '&:hover': {
            backgroundColor: 'hsla(0,0%,100%,.2)',
          }
        },
        imageContainer: {
          display: 'flex',
          alignItems: 'center'
        },
        trelloHeaderImage: {
          backgroundImage: 'url(https://a.trellocdn.com/prgb/dist/images/header-logo-2x.01ef898811a879595cea.png)',
          backgroundPosition: '100% 0',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '80px 30px',
          cursor: 'pointer',
          display: 'inline-block',
          height: '30px',
          width: '80px',
          opacity: 0.5,
          transition: '0.08s',
          '&:hover': {
            opacity: 0.8
          }
        },
        headerActions: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        },
        modalFade: {
          backgroundColor: 'rgba(0,0,0,.3)',
          bottom: '0',
          left: '0',
          position: 'absolute',
          right: '0',
          top: '0',
        },
        modalContainer: {
          backgroundColor: 'black',
        borderRadius: '5px',
        backgroundImage: 'url(https://images.unsplash.com/photo-1612854931622-b723240cb6f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfA&ixlib=rb-1.2.1&q=80&w=400)',
        backgroundColor: '#97a0af',
        backgroundSize: 'cover',
        backgroundPosition: '50%',
        color: 'white',
        lineHeight: '20px',
        padding: '10px',
        paddingRight: '15px',
        position: 'relative',
        textDecoration: 'none',
        transform: 'translate(0)',
        cursor: 'pointer',
        height: '106px',
        width: '316px',
        },
    
        modalInput: {
          marginTop: '15px',
          display: 'flex',
          backgroundColor: 'transparent',
          fontFamily: 'Segoe UI',
          border: 'none',
          fontSize: '18px',
            fontWeight: '700',
            color: 'white',
            opacity: 1,
          outline: 'none',
          '&::placeholder': {
            color: '#C1C2C2',
            fontFamily: 'Segoe UI',
            fontSize: '18px',
            fontWeight: '700'
          }
        },
    
        modalMainAction: {
          display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
        },
    
        modalButton: {
          color: 'white',
          fontFamily: 'Segoe UI',
          fontWeight: '700',
          fontSize: '17px',
          border: 'none',
          outline: 'none',
          borderRadius: '5px',
          backgroundColor: '#026AA7',
          cursor: 'pointer',
          width: '160px',
          height: '35px',
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }));
    
      const classes = useStyle();
    return(
        <div className={classes.root}>
<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div class={classes.modalContainer}>
          <span class={classes.modalFade} />
          <div className={classes.modalMainAction}>
          <input type="text" value={boardName} placeholder="Enter Board name" onChange={(e) => setBoardName(e.target.value)} className={classes.modalInput} required/>
          <button className={classes.modalButton} onClick={(e) => createNewBoard(e)}>Create Board</button>
          </div>  
        </div>
      </Dialog>
      <div className={classes.headerLeftSection}>
        <div className={classes.headerButtonIcon}>
          <AppsIcon style={{color: 'white'}} />
        </div>
        <Link to="/home">
        <div className={classes.headerButtonIcon}>
          <HomeOutlined style={{color: 'white'}}/>
        </div>
        </Link>

        <div className={classes.headerButtonIcon}>
        <svg width="22" height="22" style={{color: 'white'}} role="presentation" focusable="false" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 1a1 1 0 011-1h4a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V6zm9-1a1 1 0 00-1 1v6a1 1 0 001 1h4a1 1 0 001-1V6a1 1 0 00-1-1h-4z" fill="currentColor"></path></svg>
        <Link to="/home/boards"><h1 style={{fontSize: '16px', fontWeight: '700', margin: '0', marginLeft: '7px', color: 'white', fontFamily: 'Segoe UI'}}>Boards</h1></Link>
        </div>  
      </div>

      <div className={classes.imageContainer} onClick={() => history.push('/')}>
        <span className={classes.trelloHeaderImage} />
      </div>

      <div className={classes.headerActions}>
      <div className={classes.headerButtonIcon} style={{backgroundColor: '#ab1818'}} onClick={() => handleSignOut()}>
          <ExitToAppIcon style={{color: 'white'}}/>
          <h1 style={{fontSize: '16px', fontWeight: '400', margin: '0', marginLeft: '10px', color: 'white', fontFamily: 'Segoe UI'}}>Logout</h1>
        </div>

      <div className={classes.headerButtonIcon} id="topBarAdd" onClick={() => handleClickOpen()}>
      <AddIcon style={{color: 'white'}}/>
        </div>

          <Link to="/home/profile"><Avatar src={user?.photoURL} style={{margin: '3px', cursor: 'pointer', textDecoration: 'uppercase', backgroundColor: '#00a3bf'}}>{user?.displayName[0]}</Avatar></Link>
      </div>

    </div>
    );
}

export default connect(null, { createBoard, loadUserBoards })(TrelloNav);