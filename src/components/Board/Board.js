import React, { Component } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import FadeIn from 'react-fade-in';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { listenBoard, loadBoard, sort, updateBoard, loadBoardMembers } from '../../actions/board';
import { myFirebase } from '../../firebase/firebase';
import BoardNav from '../Navbar/BoardNav';
import TrelloNav from '../Navbar/TrelloNav';
import ActionButton from './ActionButton';
import List from './List';

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 91px;
`;

const BoardStyle = styled.div`
    position: absolute;
`;

class Board extends Component {

    constructor(props) {
        super(props);

        const boardId = this.props.match.params.id;
        this.props.loadBoard(boardId);
        this.props.loadBoardMembers(boardId);
    }

    componentDidMount() {
        const boardId = this.props.match.params.id;
        this.props.listenBoard(boardId);
    }

    componentDidUpdate() {
        if(this.props.isAuthenticated == false) {
            this.props.history.push('/signin');
        }
        const user = JSON.parse(localStorage.getItem('user'));

        if(this.props.board.boardMembers != null && user != null && this.props.board.boardMembers.length != 0) {
            if(!this.props.board.boardMembers.includes(user.uid)) {
                this.props.history.push('/home/boards');
            }
        }

        document.body.style.backgroundImage = `url(${this.props.board.backgroundPhoto})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = '50%';
            document.body.style.width = '100vl';
            document.body.style.height = '100vh';
            document.body.style.backgroundAttachment = 'fixed';
    }

    componentWillUnmount() {
        document.body.style.backgroundImage = '';
        document.body.style.backgroundSize = '';
        document.body.style.backgroundPosition = '';
        document.body.style.width = '';
        document.body.style.height = '';
    
        // props.getPhotosList("ocean");
    }

    onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;
        if (!destination) {
            return;
        }
        this.props.sort(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index,
            draggableId,
            type
        );
        this.props.updateBoard(this.props.board);
    }

    render() {
        const { lists } = this.props.board;

        return (
            <div>
                <TrelloNav backgroundColor="rgba(0,0,0,0.32)"/>
            <FadeIn>
                {this.props.auth.isAuthenticated && <BoardNav boardId={this.props.match.params.id} />}
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <BoardStyle>
                        <Droppable droppableId="all-lists" direction="horizontal" type="list">
                            {provided => (
                                <ListsContainer {...provided.droppableProps} ref={provided.innerRef}>
                                    {(lists != null) ? lists.map((list, index) => (
                                        <List index={index}
                                            listID={list.id}
                                            title={list.title}
                                            key={list.id}
                                            cards={list.cards}
                                        />
                                    )) : null}
                                    {provided.placeholder}
                                    <ActionButton type='list' />
                                </ListsContainer>
                            )}
                        </Droppable>
                    </BoardStyle>
                </DragDropContext>
            </FadeIn>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    board: state.board,
    auth: state.auth,
});

export default connect(mapStateToProps, { sort, updateBoard, loadBoard, listenBoard, loadBoardMembers })(Board);
