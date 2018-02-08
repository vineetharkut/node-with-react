import React, {Component} from 'react' ;
import StripeCheckout from 'react-stripe-checkout' ;

class Payments extends Component {
	render(){
		return (
			<StripeCheckout 
				name="Emaily"
				description="$5 for 5 email credit"
				amount={500} 
				token={token => console.log(token)} 
				stripeKey="pk_test_LjDquNNb7fLqavmxfa4n1Q3q" 
			>
			<button className="btn">
				Add Credits
			</button>
			</StripeCheckout>
		);
	}
}

export default Payments ;