import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Button, 
  Input, 
  Col, 
  Row, 
  Label,
  Alert
} from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      arrInput : [{
        prdName : "",
        prdPrice : 0,
        qty : 1,
        total : 0
      }],
      isError : false,
      msgError : "",
      grandTotal : 0
    }
}

  handleInput = () => {
    const item = {
      prdName : "",
      prdPrice : 0,
      qty : 1,
      total : 0,
    }
    this.setState({
      arrInput: [...this.state.arrInput,item],
    });
  }

  handlePrice = (e,i) => {
    if (e.target.value < 0) {
      this.setState({isError : true, msgError : "Harga Tidak Boleh Kurang dari 0"})
      this.state.arrInput[i].total = 0
    }else{
      this.setState({isError : false})
      this.state.arrInput[i].total = this.state.arrInput[i].qty * e.target.value
    }

    this.state.arrInput[i].prdPrice = e.target.value
    this.setState({arrInput : this.state.arrInput})
    this.calculateTotal()
  }

  handleQty = (e,i) => {
    if (e.target.value < 0) {
      this.setState({isError : true, msgError : "Quantity Tidak Boleh Kurang dari 0"})
      this.state.arrInput[i].total = 0
    }else{
      this.setState({isError : false})
      this.state.arrInput[i].total = this.state.arrInput[i].prdPrice * e.target.value
    }
    this.state.arrInput[i].qty = e.target.value
    this.setState({arrInput : this.state.arrInput})
    this.calculateTotal()
  }

  calculateTotal = () => {
    let total = 0

    this.state.arrInput.forEach(e => {
      total += e.total
    });

    this.setState({grandTotal : total})
  }

  removeInput = () => {
    this.state.arrInput.splice(this.state.arrInput.length-1,1)
    this.setState({arrInput : this.state.arrInput})
    this.calculateTotal()
  }

  formInput = () => {
    return this.state.arrInput.map((el, i) =>
      <Row className='mx-2 mt-4' key={i}>
          <Col xs={2}>
            <Label>Product Name</Label>
            <Input 
                placeholder = 'Product Name'
                value = {el.prdName}
                onChange = {e => {
                  this.state.arrInput[i].prdName = e.target.value
                  this.setState({arrInput : this.state.arrInput})
                }}
            />
          </Col>
          <Col xs={2}>
            <Label>Product Price</Label>
            <Input 
                value = {el.prdPrice}
                onChange = {e => { this.handlePrice(e,i) }}
            />
          </Col>
          <Col xs={2}>
            <Label>Qty</Label>
            <Input 
                value = {el.qty}
                onChange = {e => { this.handleQty(e,i) }}
            />
          </Col>
          <Col xs={2}>
            <Label>Total</Label>
            <Input 
                value = {el.total}
                readOnly
            />
          </Col>
          <Col className='xs-2 mt-4'>
          {
            i === this.state.arrInput.length-1 && i > 0
            ? <Button size='lg' color='danger' onClick={() => this.removeInput()}>Delete</Button>
            : <div></div>
          }
          </Col>
      </Row>
    )
  }

  render() {
    

    return (
        <Row className="mx-2 mt-4">
          {
            this.state.isError
            ? <Alert
                color="danger"
              >
                {this.state.msgError}
              </Alert>
            : <div></div>
          }
          <Row>
            <Col>
              <Button className='mx-2' color='success' onClick={() => this.handleInput()} >New</Button>
            </Col>
          </Row>
          <Row>
            {this.formInput()}
          </Row>
          <Row className='mx-2 mt-4'>
            <Col xs={2}>
              <Label>Grand Total</Label>
              <Input 
                  value = {this.state.grandTotal}
                  readOnly
              />
            </Col>
          </Row>  
        </Row>
    );
  }
}

export default App;
