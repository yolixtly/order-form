var React = require('react');
var ReactDOM = require('react-dom');

var Task = React.createClass({
    getInitialState: function(){
            return { active : false };
    },
    clickHandler: function(){
        var active = !this.state.active;
        this.setState({
            active : active
        });
        // value ? true : false; ternary operator 
        // 10
        // -5
        // 20
        // = 25;
        if (active){
            this.props.addTotal(this.props.price);
        } else {
            this.props.addTotal(-this.props.price);

        }
        // this.props.addTotal( active ? this.props.price : -this.props.price);
    },
    render: function(){
        return (
           <div className="taskContainer" id="services">
                <h3 className={this.state.active ?  'active' : ''} onClick={this.clickHandler}>
                {this.props.name}<b> ${this.props.price.toFixed(2)}</b>
                </h3> 
           </div> 
    );
    }
});

var TaskList = React.createClass ({
    getInitialState: function(){
        return {
            total : 0, 
            valueText : "",
            valueNumber : 0
        }
    },
    addTotal: function(price){
            this.setState({
                total : this.state.total + price 
            });
    },
    onSubmit: function(event) {
        event.preventDefault();
        // this
        console.log(this.state, this.props);
        // this.setState({
        //         valueText : ""
        //         valueNumber : this.s // retrieve values from the Inputs.
        // })
        // alert("Ouch... stop clicking.");
    },
    onTextInputChanged: function(event) {
    event.preventDefault();
    this.setState({
      valueText: event.target.value
    })
    console.log(event.target.value, 'Input text Changed')
  },
  onNumberInputChanged: function(event) {
    event.preventDefault();
    this.setState({
      valueNumber: event.target.value
    })
    console.log(event.target.value, 'Input num Changed')
  },
    render: function(){
        var self = this;
        var tasks = this.props.data.map(function(value, index){
            return <Task key={index} name={value.name} price={value.price} active={value.active} addTotal={self.addTotal}/>
        })
        return (
        <div>
        {tasks}
        <h3 id="total">Total <b>${this.state.total.toFixed(2)}</b></h3>
        </div>
    );
        }

});

var Form = function(props) {
    return (
        <form onSubmit={props.onSubmit}>
            <input type="text" value={props.valueText} onTextInputChanged={props.onTextInputChanged} />
            <button type="submit">Click Here</button>
        </form>
    )
}

var services = [
    { name: 'Web Development', price: 300 },
    { name: 'Design', price: 400 },
    { name: 'Integration', price: 250 },
    { name: 'Training', price: 220 }
];
document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<TaskList data={services} />, document.getElementById('app'));
});