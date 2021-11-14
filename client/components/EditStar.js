/*import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSingleStar, updateStarInDb } from '../store/singleStar'

class EditStar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            starName = ''
        }
        this.id = this.props.match.params.id 
    }

    handleChange(e) {

    }

    handleSubmit(e) {
		e.preventDefault();
		this.props.updateProject(this.id, this.state);
		this.setState({
			starName = ''
		});
	}

    render() {
        return (
            <div>
                <form>
                    <input type="text"></input>
                </form>
                <button type="submit">Add To Cart</button>
            </div>
            
        )
    }

}

const mapState = (state) => ({
    
})

const mapDispatch = (state) => ({

})

export default connect(mapState, mapDispatch)(EditStar)