import React, { useState, useEffect } from 'react'
import FadeIn from 'react-fade-in';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { loadUserBoards } from '../../actions/';
import { loadBoard } from '../../actions/board';
import TrelloNav from '../Navbar/TrelloNav';
import $ from 'jquery'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {Avatar} from '@material-ui/core'
import {Link} from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import {useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import { myFirebase } from "../../firebase/firebase";

function BoardCollection({loadUserBoards, loadBoard, boards}) {
    const {access} = useParams();
    const history = useHistory();

    const [bio, setBio] = useState('Loading...');
    var user = JSON.parse(localStorage.getItem('user'));
    const [successMessage, setSuccessMessage] = useState();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState(user?.displayName);

    useEffect(() => {
        setSuccessMessage('');
        myFirebase.database().ref('/users/' + user?.uid).once('value').then((snapshot) => {
            setBio(snapshot.val()?.bio)
          })
        loadUserBoards();
    }, [])

    useEffect(() => {
        if(access == 'boards') {
            setSuccessMessage('');
        }
    }, [access])

    function handleClickBoard(e, boardId) {
            loadBoard(boardId);
            history.push("/board/" + boardId);
    };


    const updateUserProfile = () => {
        setLoading(true);
        if(!fullName) {
            alert("Please provide your name");
            return;
        }

        myFirebase.database().ref('/users/' + user?.uid).update({
            name: fullName,
            bio
        }).then(user2 => {
            myFirebase.auth().currentUser.updateProfile({
                displayName: fullName
            }).then(user3 => {
                user.displayName = fullName;
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(user));
                setLoading(false);
                setSuccessMessage('Your changes were succesfully saved !');
            })
        })
    }

        const useStyle = makeStyles((theme) => ({
            root: {
                width: '100%',
                display: 'flex',
                margin: '0px',
                justifyContent: 'center'
              },
            mainActionArea: {
                display: 'flex',
                marginTop: '70px',
                flexDirection: 'row'
            },
            homePageSidebar:{
                display: 'flex',
                flexDirection: 'column',
                marginRight: '50px',
                marginTop: '6px'
            },
            sidebarTab: {
              borderRadius: '5px',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '7px',
              paddingRight: '7px',
              margin: '5px',
              cursor: 'pointer',
              flexDirection:'row',
              width: '200px'
            },
            sidebarTabSelected: {
                backgroundColor: '#E4F0F6',
                borderRadius: '5px',
              padding: '7px',
              display: 'flex',
              alignItems: 'center',
              margin: '5px',
              cursor: 'pointer',
              flexDirection:'row',
              width: '250px'
            },
            segmentTitle: {
                color: '#172B4D',
                fontSize: '18px',
                fontWeight: '700',
                fontFamily: 'Segoe UI'
            },
            actionPaneTitleSegment: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '10px'
            },
            board: {
                backgroundColor: 'black',
              borderRadius: '5px',
              backgroundColor: '#97a0af',
              backgroundSize: 'cover',
              backgroundPosition: '50%',
              color: 'white',
              lineHeight: '20px',
              padding: '10px',
              paddingRight: '15px',
              position: 'relative',
              textDecoration: 'none',
              width: '190px',
              margin: '7px',
              transform: 'translate(0)',
              cursor: 'pointer',
            },
          
            boardText: {
              fontSize: '17px', 
              fontWeight: '700',
               margin: '0', 
               marginLeft: '7px', 
               color: 'white', 
               fontFamily: 'Segoe UI',
               opacity: '1',
               zIndex: 1,
            },
          
            boardFade: {
              backgroundColor: 'rgba(0,0,0,.3)',
              bottom: '0',
              left: '0',
              position: 'absolute',
              right: '0',
              top: '0',
            },
            boardDetails: {
              display: 'flex',
              height: '80px',
              position: 'relative',
              flexDirection: 'column',
              justifyContent: 'space-between',
            },
          
            allBoards: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
            },
              sidebarActionPane: {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  width: '600px'
              },
              input: {
                  padding: '12px',
              margin: '7px',
              backgroundColor: '#FAFBFC',
              border: '1px solid #DFE1E6',
              borderRadius: '5px',
              outline: '#5FA3FC',
              width: '100%',
              transition: '0.5s',
              '&:focus': {
                  backgroundColor: '#fff',
              }
              },
              profileForm: {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
              },
              bioInput: {
                  padding: '12px',
              margin: '7px',
              backgroundColor: '#FAFBFC',
              border: '1px solid #DFE1E6',
              borderRadius: '5px',
              outline: '#5FA3FC',
              width: '100%',
              transition: '0.5s',
              '&:focus': {
                  backgroundColor: '#fff',
              },
              },
              submitButton: {
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  backgroundColor: '#026AA7',
                  margin: '7px',
                  width: '107%',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  outline: 'none'
              },
              successAlert: {
                  backgroundColor: '#31AC83',
                  borderRadius: '5px',
                  padding: '2px',
                  paddinLeft: '20px',
                  paddingRight: '20px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: '5px'
              },
              successAlertText: {
                  fontFamily: 'Poppins',
                  fontSize: '18px',
                  color: 'white',
                  fontWeight: '400'
              }
        }))

        const classes = useStyle();

        return (
            <>
            <TrelloNav backgroundColor="#026AA7"/>
            <FadeIn>
  <div className={classes.root}>
                
<div className={classes.mainActionArea}>
        <div className={classes.homePageSidebar}>
            <div className={access == 'boards' ? classes.sidebarTabSelected : classes.sidebarTab} onClick={() => history.push('/home/boards')}>
            <svg width="22" height="22" style={{color: access == 'boards' ? '#026AA7' : '#000'}} role="presentation" focusable="false" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 1a1 1 0 011-1h4a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V6zm9-1a1 1 0 00-1 1v6a1 1 0 001 1h4a1 1 0 001-1V6a1 1 0 00-1-1h-4z" fill="currentColor"></path></svg>
            <h1 style={{fontSize: '16px', fontWeight: '700', margin: '0', marginLeft: '7px', color: access == 'boards' ? '#026AA7' : '#000', fontFamily: 'Segoe UI'}}>Boards</h1>
            </div>
            <div className={access == 'profile' ? classes.sidebarTabSelected : classes.sidebarTab} onClick={() => history.push('/home/profile')}>
            <AccountBoxIcon style={{color: access == 'profile' ? '#026AA7' : '#000'}}/>
            <h1 style={{fontSize: '16px', fontWeight: '700', margin: '0', marginLeft: '7px', color: access == 'profile' ? '#026AA7' : '#000', fontFamily: 'Segoe UI'}}>Profile</h1>
            </div>
        </div>
        <div className={classes.sidebarActionPane}>
            <div className={classes.actionPaneTitleSegment}>
            <svg width="22" height="22" style={{color: '#172B4D', marginRight:' 10px'}} role="presentation" focusable="false" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 1a1 1 0 011-1h4a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V6zm9-1a1 1 0 00-1 1v6a1 1 0 001 1h4a1 1 0 001-1V6a1 1 0 00-1-1h-4z" fill="currentColor"></path></svg>
            <h1 className={classes.segmentTitle}>{access == 'boards' ? 'Your Boards' : 'Your profile'}</h1>
            </div>

            {
                successMessage && (
                    <div className={classes.successAlert} onClick={() => setSuccessMessage('')}>
                        <CheckIcon style={{margin: '10px', color: 'white'}}/>
                        <h1 className={classes.successAlertText}>Your changes were successful</h1>
                    </div>
                )
            }

            {
                access == 'boards' ? 
                <div className={classes.allBoards}>
                {
            boards.boards.map((board, index) => (
<div onClick={(e) => handleClickBoard(e, board.boardId)} className={classes.board} style={{backgroundImage: `url(${board.backgroundPhoto})`}}>
<span className={classes.boardFade}></span>
<div className={classes.boardDetails}>
<h1 className={classes.boardText}>{board.title}</h1>
</div>
</div>
            ))
                }

<div className={classes.board} style={{opacity: '0.4'}} onClick={() => $('#topBarAdd').trigger('click')}>
<span className={classes.boardFade}></span>
<div className={classes.boardDetails} style={{justifyContent: 'center', alignItems: 'center'}}>
<h1 className={classes.boardText}>Add a new board</h1>
</div>
</div>
                </div>
                : (
                    <div className={classes.profileForm}>
                        <Avatar src={user?.photoURL} style={{margin: '3px', cursor: 'pointer', textDecoration: 'uppercase', backgroundColor: '#00a3bf', height: '10em', width: '10em'}}>{user?.displayName[0]}</Avatar>
                        <input type="text" placeholder="Full Name" className={classes.input} value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        <textarea placeholder="Enter your Bio" cols={30} rows={10} className={classes.bioInput} value={bio} onChange={(e) => setBio(e.target.value)} />
                        <button className={classes.submitButton} onClick={() => updateUserProfile()}>{loading ? 'Loading...' : 'Submit'}</button>
                    </div>
                )
            }
        </div>
      </div>
  </div>
            </FadeIn>
            </>
        )
    }

const mapStateToProps = state => ({
    boards: state.boards
});

export default connect(mapStateToProps, { loadUserBoards, loadBoard })(BoardCollection);
