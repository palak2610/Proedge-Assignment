import {React, Component} from "react";
import './Main.css';

class Main extends Component {

    state = {
        data: [],
        loading: false,
        text: ''
    }

    submit = () => {
        if(this.state.text === ""){
            alert('Invalid Input');
            return;
        }
        
        this.setState({ loading: true });
        fetch('https://proedge-node.herokuapp.com/result/'+this.state.text)
        .then(res => res.json())
        .then((data) => {
            this.setState({ data: data });
            this.setState({ loading: false });
            this.setState({ text: '' });
        }).catch(()=>{
            alert("Error");
            this.setState({ loading: false });
        });
    }

    render(){       
        const { data, loading } = this.state;
        return (
            <div className="Main">
                <div className="assignment-section">
                    <h1>Assignment</h1>
                    <div>
                        <span>Enter comma seperated Roll Numbers:</span>
                        <input 
                            className="input" 
                            type="text" 
                            onChange={event => this.setState({ text: event.target.value }) } 
                            value={this.state.text}
                            />
                        { loading ? <div className="loader"></div> : <button onClick={this.submit}>Submit</button>}
                    </div>
                    
                    { data.length !==0 && 
                        <div>
                            <h2>Result:</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Roll No.</th>
                                        <th>Result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(a => <tr key={a.rollNo}><td>{a.rollNo}</td><td>{a.result}</td></tr>)}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Main;