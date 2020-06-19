import React, { Component } from 'react';
import { Card,CardImg, Label, CardBody, CardText,CardTitle,Breadcrumb,BreadcrumbItem,Button, Modal, ModalHeader, ModalBody,Row,Col } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderComments({comments, postComment, dishId}) {
        if(comments==null){
            return(
                <div></div>
            );
        }
        else{
            const cmnts=comments.map((comment)=>{
                return(
                        <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(comment.date))}
                    </p>
                </li>
                )
            })
            return (
                <div className='col-12 col-md-5 m-1'>
                    <h4> Comments </h4>
                    <ul className='list-unstyled'>
                        {cmnts}
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment} />
    
                </div>
            )
        }
    }
    
    function RenderDish({dish}){
        if(dish!=null){
            return(
                <div class="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top  src={baseUrl+ dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
                
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }

    const DishDetail=(props)=>{
                
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) 
        const dish=props.dish;
        if(dish==null){
            return(<div></div>)
        }
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments}
                     postComment={props.postComment}
                        dishId={props.dish.id}
                    />
                </div>
            </div>
        )
    }

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        };
    }

    toggleModal=()=>{
        this.setState({
            isModalOpen:!this.state.isModalOpen
        });
    }

    handleSubmit=(values)=>{
        alert("Input is:"+JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
            <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Form</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="model" name="rating"
                                    className="form-control">
                                        <option>1</option>
                                        <option>2</option>   
                                        <option>3</option>   
                                        <option>4</option>   
                                        <option>5</option>   
                                        <option>6</option>      
                                        <option>7</option>   
                                        <option>8</option>   
                                        <option>9</option>   
                                        <option>10</option>      
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={12}>Full Name</Label>
                                <Col md={12}>
                                    <Control.text model=".name" id="name" name="name"
                                    placeholder="Full Name"
                                    className="form-control"
                                    validators={{
                                        maxLength:maxLength(15),minLength:minLength(3)
                                    }}/>
                                    <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                    }}
                                    />


                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Button outline color="info" onClick={this.toggleModal}>
                    <span><i class="fa fa-pencil" aria-hidden="true"></i></span> Submit Comment
                </Button>
            </div>
        );
    }
}
        

                

export default DishDetail;
