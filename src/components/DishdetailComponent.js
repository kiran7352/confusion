import React, { Component } from 'react';
import { Card, CardImg , CardTitle, CardText, CardBody,
     Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalHeader, Col, Row, Label, Button } from 'reactstrap';
import {LocalForm, Errors, Control} from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(values) {
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        this.toggleModal();
    };

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    render(){
        return(
            <div>
            <Button outline onClick={this.toggleModal}>Post Comment</Button>    
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Enter Comment</ModalHeader>
                    <ModalBody>
                     <div className="container">
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating"> Rating</Label>
                            <Control.select model=".rating" name="rating" className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author">Name</Label>
                                    <Control.text model=".author" name="author" id="author" placeholder="Full name"  className="form-control"
                                     validators={{
                                         required,
                                         minLength: minLength(3),
                                         maxLength: maxLength(15)
                                     }} />
                                     <Errors
                                        className="text-danger" model=".author" show="touched"
                                        messages={{
                                        required: "Required ",
                                         minLength: "must be greater than 2 character",
                                         maxLength:"must be less than 15 charecter ",
                                        }}
                                    />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" name="comment" id="comment" className="form-control" />
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                    Post Comment
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                    </ModalBody>
            </Modal>
            </div>
        );
    }
}

function RenderDish({dish}){
    return (
        <FadeTransform in transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
            <Card key={dish.id}>
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText> {dish.description} </CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

function RenderComments({comments, postComment, dishId}) {
    return(
        <ul>
            <Stagger in>
                {comments.map((comment)=>{
                    return (
                        <Fade in>
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        </Fade>
                    );
                })}
            </Stagger>
            <li>
                <CommentModal dishId={dishId} postComment={postComment} />
            </li>
        </ul>                  
    )   
};

const DishDetail = (props)=> {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess){
        return(
         <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null){
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 col-sm-12 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-md-5 col-sm-12 m-1">
                        <RenderComments comments={props.comments} dishId={props.dish.id} postComment={props.postComment}  />
                    </div>
                </div>
            </div>
        );
    }else {
        return (
            <div></div>
        );
    }

}

export default DishDetail;