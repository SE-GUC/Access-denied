import DropdownButton from 'react-bootstrap/DropdownButton'
import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { Button } from 'react-bootstrap'

//so that the partner can choose the payment method for the task
class PaymentMethodList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cash: false,
      visa: false,
      fawry: false,
      creditCard: false,
      PayPal: false,
      CIBTransfer: false
    }
    this.Cash = this.Cash.bind(this)
    this.CreditCard = this.CreditCard.bind(this)
    this.Fawry = this.Fawry.bind(this)
    this.Visa = this.Visa.bind(this)
    this.Transfer = this.Transfer.bind(this)
    this.paypal = this.paypal.bind(this)
  }

  Cash() {
    this.setState({
      cash: true,
      visa: false,
      fawry: false,
      creditCard: false,
      PayPal: false,
      CIBTransfer: false
    })
  }

  Visa() {
    this.setState({
      visa: true,
      cash: false,

      fawry: false,
      creditCard: false,
      PayPal: false,
      CIBTransfer: false
    })
  }

  Fawry() {
    this.setState({
      fawry: true,
      cash: false,
      visa: false,

      creditCard: false,
      PayPal: false,
      CIBTransfer: false
    })
  }

  CreditCard() {
    this.setState({
      cash: false,
      visa: false,
      fawry: false,
      creditCard: true,
      PayPal: false,
      CIBTransfer: false
    })
  }

  paypal() {
    this.setState({
      cash: false,
      visa: false,
      fawry: false,
      creditCard: false,
      PayPal: true,
      CIBTransfer: false
    })
  }

  Transfer() {
    this.setState({
      cash: false,
      visa: false,
      fawry: false,
      creditCard: false,
      PayPal: true,
      CIBTransfer: true
    })
  }

  render() {
    return (
      <div>
        <br />
        <label>Welcome to LirtenHub</label>
        <br />
        <label>Please choose from the drop down menu who you are</label>
        <br />
        <DropdownButton id="dropdown-item-button" title="choose">
          <Dropdown.Item as="button" onClick={this.Cash}>
            cash
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={this.Visa}>
            visa
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={this.Fawry}>
            fawry
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={this.CreditCard}>
            creditCard
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={this.paypal}>
            PayPal
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={this.Transfer}>
            CIBTransfer
          </Dropdown.Item>
        </DropdownButton>
      </div>
    )
  }
}

export default PaymentMethodList
