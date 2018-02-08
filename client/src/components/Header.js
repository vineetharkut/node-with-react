import React ,{Component} from 'react' ;
import {connect} from 'react-redux' ;
import {Link} from 'react-router-dom' ;
import Payments from './Payments' ;

class Header extends Component {
	renderContent(){
		switch(this.props.auth){
			case null :
				return '' ; //'Still deciding';
			case false : 
				return <li><a href="/auth/google">Login with Google</a></li> ;
			default : 
				return [<li key="1"><Payments /></li>,<li key="2"><a href="/api/logout">Logout</a></li>];		
		}
	}
	renderLogo(){
		switch(this.props.auth){
			case null :
				return ;
			case false :
				return <Link className="left brand-logo" to="/">Emaily</Link> ;
			default : 
				return <Link className="left brand-logo" to="/surveys">Emaily</Link> ; 	 	
		}
	}
	render(){
		console.log(this.props);
		return (
			<nav>
			    <div className="nav-wrapper">
			      {this.renderLogo()}
			      <ul id="nav-mobile" className="right hide-on-med-and-down">
			        {this.renderContent()}
			      </ul>
			    </div>
			  </nav>    
		)
	}
}

function mapStateToProps(state){
	return {auth : state.auth}
}

export default connect(mapStateToProps)(Header) ;